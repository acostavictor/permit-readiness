/* Permit Readiness: PDF package analysis engine.
   Reads each PDF's text in the browser via PDF.js and returns per-file
   findings plus the evidence keys the checklist uses. Nothing uploads. */
(function () {
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  function classifyFile(name, text) {
    var n = name.toLowerCase(), t = text.toLowerCase();
    var hay = n + " " + t;
    var types = [];
    if (hay.indexOf("site plan") >= 0 || hay.indexOf("siteplan") >= 0) types.push("sitePlan");
    if (hay.indexOf("energy") >= 0 || hay.indexOf("rescheck") >= 0 || hay.indexOf("comcheck") >= 0 || hay.indexOf("form 600") >= 0 || hay.indexOf("form 405") >= 0 || hay.indexOf("manual j") >= 0) types.push("energyForm");
    if (hay.indexOf("product approval") >= 0 || hay.indexOf("notice of acceptance") >= 0 || hay.indexOf("noa") >= 0) types.push("productApproval");
    if (hay.indexOf("truss") >= 0) types.push("trussDrawing");
    if (hay.indexOf("structural") >= 0) types.push("structural");
    return types;
  }

  function keywordFlags(text) {
    var low = text.toLowerCase();
    return {
      seal: /(seal|signed|signature|licensed|p\.e\.|r\.a\.)/i.test(text),
      soilReport: low.indexOf("soil analysis") >= 0 || low.indexOf("geotechnical") >= 0 || low.indexOf("soil report") >= 0 || low.indexOf("soils report") >= 0,
      metalBuilding: low.indexOf("metal building") >= 0,
      steelStairs: low.indexOf("steel stair") >= 0,
      septic: low.indexOf("septic") >= 0,
      gradingPlan: low.indexOf("grading") >= 0 || low.indexOf("drainage") >= 0,
      windCriteria: low.indexOf("vult") >= 0 || low.indexOf("vasd") >= 0 || low.indexOf("wind speed") >= 0 || low.indexOf("wind zone") >= 0 || low.indexOf("exposure category") >= 0,
      liveLoads: low.indexOf("live load") >= 0 || low.indexOf("psf") >= 0,
      mepLayouts: low.indexOf("mechanical") >= 0 && low.indexOf("electrical") >= 0 && low.indexOf("plumbing") >= 0,
      survey: low.indexOf("survey") >= 0,
      noc: low.indexOf("notice of commencement") >= 0,
      stormwater: low.indexOf("stormwater") >= 0 || low.indexOf("swppp") >= 0,
      impervious: low.indexOf("impervious") >= 0,
      manualJ: low.indexOf("manual j") >= 0 || low.indexOf("load sizing") >= 0,
      floodZone: low.indexOf("flood zone") >= 0 || low.indexOf("base flood elevation") >= 0 || low.indexOf("elevation certificate") >= 0,
      erosion: low.indexOf("erosion") >= 0
    };
  }

  function analyzeOne(file) {
    return file.arrayBuffer().then(function (buf) {
      return pdfjsLib.getDocument({ data: buf }).promise.then(function (pdf) {
        var pageJobs = [];
        for (var i = 1; i <= pdf.numPages; i++) {
          pageJobs.push(pdf.getPage(i).then(function (page) {
            return page.getTextContent().then(function (tc) {
              var v = page.getViewport({ scale: 1 });
              var minFont = null;
              var strs = tc.items.map(function (it) {
                var tr = it.transform || [0, 0, 0, 0, 0, 0];
                var size = Math.sqrt(tr[0] * tr[0] + tr[1] * tr[1]);
                if (size > 0 && (minFont === null || size < minFont)) minFont = size;
                return it.str;
              });
              return { text: strs.join(" "), wIn: v.width / 72, hIn: v.height / 72, minFont: minFont };
            });
          }));
        }
        return Promise.all(pageJobs).then(function (pages) {
          var text = pages.map(function (p) { return p.text; }).join(" ");
          var sizes = {};
          pages.forEach(function (p) {
            sizes[Math.round(p.wIn * 10) / 10 + "x" + Math.round(p.hIn * 10) / 10] = true;
          });
          var fonts = pages.map(function (p) { return p.minFont; }).filter(function (f) { return f !== null; });
          var minFont = fonts.length ? Math.min.apply(null, fonts) : null;
          var sheets = text.match(/\b[ACGMEPST]-\d{3}\b/g) || [];
          var uniqSheets = [];
          sheets.forEach(function (s) { if (uniqSheets.indexOf(s) < 0) uniqSheets.push(s); });
          var dupSheets = [];
          var counts = {};
          sheets.forEach(function (s) { counts[s] = (counts[s] || 0) + 1; if (counts[s] === 2) dupSheets.push(s); });
          var low = text.toLowerCase();
          var signals = ["project", "sheet", "scale", "drawn", "checked", "date"];
          var foundSignals = signals.filter(function (w) { return low.indexOf(w) >= 0; }).length;
          var flags = keywordFlags(text);
          var types = classifyFile(file.name, text);
          types.forEach(function (t) { flags[t] = true; });
          return {
            name: file.name, pages: pdf.numPages, textChars: text.length,
            sizes: Object.keys(sizes), minFont: minFont,
            sheets: uniqSheets, dupSheets: dupSheets,
            titleSignals: foundSignals, sealSignal: flags.seal,
            types: types, flags: flags, text: text
          };
        });
      });
    });
  }

  window.PermitCheck = { analyzeOne: analyzeOne, classifyFile: classifyFile, keywordFlags: keywordFlags };
})();
