/* Permit Readiness: UI flow.
   1. Pick a jurisdiction (county or city). 2. Drop the package.
   3. Results: missing items, found items, human prechecks, and a checklist
   generated from the package evidence. */
(function () {
  var jurisSel = document.getElementById("jurisdiction");
  var projectSel = document.getElementById("project");
  var infoEl = document.getElementById("jurisdictionInfo");
  var noteEl = document.getElementById("projectNote");
  var listEl = document.getElementById("checklist");
  var meterFill = document.getElementById("meterFill");
  var meterLabel = document.getElementById("meterLabel");
  var dropzone = document.getElementById("dropzone");
  var fileInput = document.getElementById("fileInput");
  var chipsEl = document.getElementById("chips");
  var fileStatus = document.getElementById("fileStatus");
  var resultsEl = document.getElementById("results");
  var stepsEl = document.getElementById("steps");

  var packageFiles = [];
  var packageResults = [];
  var packageEvidence = {};

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function current() {
    for (var i = 0; i < JURISDICTIONS.length; i++) {
      if (JURISDICTIONS[i].id === jurisSel.value) return JURISDICTIONS[i];
    }
    return JURISDICTIONS[0];
  }
  function allGroups() {
    return current().groups.concat([DRAWING]);
  }
  function setStep(n) {
    var steps = stepsEl.querySelectorAll(".step");
    steps.forEach(function (s, i) {
      s.classList.toggle("active", i + 1 === n);
      s.classList.toggle("done", i + 1 < n);
    });
  }

  function renderJurisdictionSelect() {
    var counties = JURISDICTIONS.filter(function (j) { return j.kind === "county"; });
    var cities = JURISDICTIONS.filter(function (j) { return j.kind === "city"; });
    function opts(list) {
      return list.map(function (j) { return '<option value="' + j.id + '">' + j.name + '</option>'; }).join("");
    }
    jurisSel.innerHTML = '<optgroup label="Counties">' + opts(counties) + '</optgroup><optgroup label="Cities">' + opts(cities) + '</optgroup>';
  }

  function renderJurisdictionInfo() {
    var j = current();
    infoEl.innerHTML = "<strong>" + j.name + ".</strong> " + j.portal + ". " + j.phone + '. <a href="' + j.portalUrl + '">Official page</a>';
    var p = projectSel.value;
    noteEl.style.display = "none";
    if (j.notes) {
      if (j.id === "osceola" && p === "quick" && j.notes.quick) {
        noteEl.style.display = "block";
        noteEl.innerHTML = "<strong>Quick permits in Osceola County:</strong> " + j.notes.quick.replace(/^Quick permits in Osceola County:\s*/, "");
      }
      if (j.id === "orange" && p === "accessory" && j.notes.accessory) {
        noteEl.style.display = "block";
        noteEl.innerHTML = "<strong>Accessory structures in Orange County:</strong> " + j.notes.accessory.replace(/^Accessory structures in Orange County:\s*/, "");
      }
    }
  }

  function renderChecklist() {
    var html = "";
    allGroups().forEach(function (g, gi) {
      html += '<div class="group"><h3 class="group-head">' + g.title + ' <span class="collapse-hint">hide / show</span></h3><div class="group-body"><p class="src">' + g.src + '</p>';
      g.items.forEach(function (item, ii) {
        var id = "c" + gi + "_" + ii;
        var found = item.ev && packageEvidence[item.ev];
        var tag = (g === DRAWING) ? "DRAWING" : "COUNTY";
        if (current().kind === "city" && g !== DRAWING) tag = "CITY";
        html += '<div class="item"><input type="checkbox" id="' + id + '" data-text="' + esc(item.t) + '"' + (found ? " checked" : "") + '><label for="' + id + '">' + item.t + '</label>' + (found ? '<span class="tag ev">Found in your package</span>' : '<span class="tag">' + tag + '</span>') + '</div>';
      });
      html += "</div></div>";
    });
    listEl.innerHTML = html;
    listEl.querySelectorAll("input").forEach(function (box) { box.addEventListener("change", updateMeter); });
    listEl.querySelectorAll(".group-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var body = head.nextElementSibling;
        body.style.display = (body.style.display === "none") ? "" : "none";
      });
    });
    updateMeter();
  }

  function updateMeter() {
    var boxes = listEl.querySelectorAll("input");
    var done = listEl.querySelectorAll("input:checked").length;
    meterFill.style.width = (boxes.length ? Math.round(done / boxes.length * 100) : 0) + "%";
    meterLabel.textContent = done + " of " + boxes.length + " confirmed";
  }

  function renderChips() {
    chipsEl.innerHTML = packageFiles.map(function (f, i) {
      return '<span class="chip">' + esc(f.name) + ' <button class="chip-x" data-i="' + i + '" title="Remove this file">x</button></span>';
    }).join("");
    chipsEl.querySelectorAll(".chip-x").forEach(function (btn) {
      btn.addEventListener("click", function () {
        packageFiles.splice(parseInt(btn.getAttribute("data-i"), 10), 1);
        if (packageFiles.length) { runAnalysis(); }
        else { resetPackage(); }
      });
    });
  }

  function resetPackage() {
    packageResults = [];
    packageEvidence = {};
    resultsEl.style.display = "none";
    chipsEl.innerHTML = "";
    fileInput.value = "";
    fileStatus.textContent = "No package yet. You can also tick the checklist below by hand.";
    setStep(1);
    renderChecklist();
  }

  function handleFiles(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    var pdfs = files.filter(function (f) { return f.name.toLowerCase().slice(-4) === ".pdf"; });
    if (!window.pdfjsLib || !window.PermitCheck) {
      fileStatus.textContent = "The PDF engine did not load. Check your connection and retry. The checklist below still works by hand.";
      return;
    }
    if (!pdfs.length) {
      fileStatus.textContent = "No PDFs selected. This beta reads PDFs only.";
      return;
    }
    pdfs.forEach(function (f) {
      if (packageFiles.map(function (x) { return x.name; }).indexOf(f.name) < 0) packageFiles.push(f);
    });
    renderChips();
    runAnalysis();
  }

  function runAnalysis() {
    var j = current();
    fileStatus.textContent = "Reading " + packageFiles.length + " PDF(s) in your browser...";
    setStep(2);
    var jobs = packageFiles.map(function (f) {
      return PermitCheck.analyzeOne(f).catch(function () {
        return { name: f.name, pages: 0, textChars: 0, sizes: [], minFont: null, sheets: [], dupSheets: [], titleSignals: 0, sealSignal: false, types: [], flags: {}, error: true };
      });
    });
    Promise.all(jobs).then(function (results) {
      packageResults = results;
      packageEvidence = {};
      var allSheets = {}, anyDup = false, sizeSet = {}, anyText = false, anySeal = false;
      var typeLabels = { sitePlan: "site plan", energyForm: "energy form", productApproval: "product approval", trussDrawing: "truss drawing", structural: "structural" };
      results.forEach(function (r) {
        if (r.error) return;
        if (r.textChars > 0) anyText = true;
        if (r.sealSignal) anySeal = true;
        Object.keys(r.flags).forEach(function (k) { if (r.flags[k]) packageEvidence[k] = true; });
        r.sheets.forEach(function (s) {
          if (!allSheets[s]) allSheets[s] = [];
          allSheets[s].push(r.name);
        });
        if (r.dupSheets.length) anyDup = true;
        r.sizes.forEach(function (s) { sizeSet[s] = true; });
      });
      if (results.length) packageEvidence.pdfOnly = true;
      var crossDups = Object.keys(allSheets).filter(function (s) { return allSheets[s].length > 1; });
      if (Object.keys(allSheets).length && !anyDup && !crossDups.length) packageEvidence.sheetPattern = true;

      var missing = [], found = [], human = [];
      if (!anyText) {
        document.getElementById("missingTitle").textContent = "Could not verify from this package";
        missing.push("This package has no extractable text layer (the drawings are images or vector lines, not searchable text), so the app could not search its contents. The items below are unverifiable from this file, not confirmed missing. A human must confirm each one.");
        j.missing.forEach(function (m) { missing.push("Could not verify: " + m.label + "."); });
      } else {
        document.getElementById("missingTitle").textContent = "Missing from your package";
        j.missing.forEach(function (m) {
          if (!packageEvidence[m.key]) missing.push(m.text);
        });
      }
      results.forEach(function (r) {
        if (r.error) {
          human.push("File could not be read: " + r.name + ". Confirm it is a valid PDF and re-upload it.");
          return;
        }
        var typeTxt = r.types.length ? r.types.map(function (t) { return typeLabels[t] || t; }).join(", ") : "drawing set";
        if (r.textChars === 0) {
          human.push("No extractable text in " + r.name + ". It may be a scan. Text-based checks cannot run on it, so a human must review every sheet.");
        } else {
          found.push(r.name + " (" + typeTxt + "): " + r.pages + " pages, " + r.sizes.join(" / ") + " in, " + r.titleSignals + " of 6 title block signals found.");
          if (r.minFont !== null) found.push(r.name + ": smallest text found is about " + Math.round(r.minFont * 10) / 10 + " pt (estimate). A human confirms it against the 1/8 inch plotted minimum.");
        }
        if (r.dupSheets.length) human.push("Duplicate sheet number inside " + r.name + ": " + r.dupSheets.join(", ") + ". Confirm which sheet is current.");
      });
      crossDups.forEach(function (s) {
        human.push("Sheet number " + s + " appears in more than one file (" + allSheets[s].join(", ") + "). Confirm which file is current before submitting.");
      });
      if (Object.keys(sizeSet).length > 1) human.push("Mixed page sizes detected across the package (" + Object.keys(sizeSet).join(", ") + " in). Confirm all sheets match the size you intend to submit.");
      (j.human || []).forEach(function (t) { human.push(t); });
      (j.humanIf || []).forEach(function (h) { if (packageEvidence[h.ev]) human.push(h.text); });
      human.push("Title block signals above are keyword matches only. A human confirms every title block is actually complete on every sheet.");

      var autoChecked = 0, totalItems = 0;
      allGroups().forEach(function (g) {
        g.items.forEach(function (item) {
          totalItems++;
          if (item.ev && packageEvidence[item.ev]) autoChecked++;
        });
      });
      document.getElementById("statFiles").textContent = results.length;
      document.getElementById("statSheets").textContent = Object.keys(allSheets).length;
      document.getElementById("statFound").textContent = autoChecked;
      document.getElementById("statMissing").textContent = missing.length;
      document.getElementById("missingList").innerHTML = missing.length ? missing.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") : "<li>Nothing missing that the automated checks can see. The jurisdiction still makes the final call.</li>";
      document.getElementById("foundList").innerHTML = found.length ? found.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") : "<li>No readable files in this package.</li>";
      document.getElementById("humanList").innerHTML = human.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
      resultsEl.style.display = "block";
      setStep(3);
      fileStatus.textContent = "Package analyzed: " + results.length + " file(s). Your checklist below is now filled in from what the package contains. Confirm each auto-checked item.";
      renderChecklist();
      resultsEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  dropzone.addEventListener("click", function () { fileInput.click(); });
  dropzone.addEventListener("dragover", function (e) { e.preventDefault(); dropzone.classList.add("over"); });
  dropzone.addEventListener("dragleave", function () { dropzone.classList.remove("over"); });
  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("over");
    handleFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener("change", function () { handleFiles(fileInput.files); fileInput.value = ""; });
  document.getElementById("resetBtn").addEventListener("click", function () { packageFiles = []; resetPackage(); });
  jurisSel.addEventListener("change", function () {
    renderJurisdictionInfo();
    renderChecklist();
    if (packageFiles.length) runAnalysis();
  });
  projectSel.addEventListener("change", renderJurisdictionInfo);

  renderJurisdictionSelect();
  renderJurisdictionInfo();
  renderChecklist();
  setStep(1);
})();
