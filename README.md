# Permit Readiness Check

Free beta: a pre-submission self-check for permit packages in Florida counties and cities.

Open `index.html` in any browser. Pick the jurisdiction and the project type, drop in the package PDFs, and the app tells you what is missing and builds your checklist from what it found. Nothing uploads anywhere. Everything runs in your browser.

## V3: multi-file app, 12 jurisdictions (Oct 23, 2026)

The app is no longer one big HTML file. It is a small static app:

- `index.html`: page shell only.
- `styles.css`: all styling.
- `jurisdictions.js`: one profile object per jurisdiction (2 counties, 10 cities), plus the shared drawing-quality group. Each profile carries its portal, contact, checklist groups (each item with an optional evidence key), the missing-item messages keyed by evidence, and the jurisdiction-specific human prechecks.
- `pdfcheck.js`: the PDF analysis engine (PDF.js text extraction, document-type classification, keyword evidence flags).
- `app.js`: the UI flow (jurisdiction picker, dropzone, file chips with remove and re-analyze, results, checklist, print).

To add a new city: copy one profile object in `jurisdictions.js`, fill in its portal, groups, missing messages and human notes from that city's own published pages, and it appears in the picker automatically. No other file changes.

Covered jurisdictions: Osceola County, Orange County, City of Orlando, City of Tampa, City of Miami, City of Fort Lauderdale, City of Jacksonville, City of St. Petersburg, City of Port St. Lucie, City of Cape Coral, City of Tallahassee, City of West Palm Beach.

Hosting note: this is a static app served by GitHub Pages, which cannot run PHP. A PHP version would need hosting that executes PHP (for example HostGator) and a reason to run code on the server; right now everything the app does runs in the browser, which is also what keeps the privacy promise (nothing uploads). If a server side is wanted later, `jurisdictions.js` is already pure data and can be served as JSON.

## V2: package first, checklist second (redesigned Oct 23, 2026)

The flow is now: pick county and project type, drop the package, get results. Analysis runs automatically on upload. The checklist is generated from the package: each requirement has an evidence rule (for example, a file that looks like an energy form checks the energy item, seal or signature signals check the signed-and-sealed items, detected sheet numbers with no duplicates check the sheet-numbering item), and matched items show a "Found in your package" badge. The user still confirms each auto-checked item by hand.

Results show four stats (files analyzed, sheet numbers found, checklist items found in package, items still missing) plus three panels: Missing from your package (required document types and criteria not detected, phrased per county, with "when applicable" items flagged as confirm-whether-they-apply), Found in your package (per-file summaries), and Verify by hand (inconsistencies and items software cannot confirm).

## V1: upload the package

Step 3 accepts PDFs. The app reads each PDF's text in the browser (PDF.js from cdnjs) and checks it against the county list, then reports:

- Per file: page count, page sizes, sheet numbers found (A-101 form), title block keyword signals, smallest text size (estimate), and a best-guess document type (site plan, energy form, product approval, truss drawing, structural).
- Cross-file inconsistencies, listed as human prechecks: duplicate sheet numbers inside one file or across files, a missing site plan, a missing energy form, a missing product approval (Osceola), no seal or signature signals anywhere, mixed page sizes, and scanned files with no extractable text (text checks cannot run on those).
- County-specific human checks that software cannot reliably confirm: structure orientation matching the site plan on all pages (Orange County, FBC 107), wind criteria (Orange), accessible route and parking items (Osceola).

Automated findings are heuristic, keyword and text signals, not proof. Every flagged item needs a human to confirm it. The county still makes the final call.

## What this is not

This is a pre-submission self-check, not a permit approval, not a code compliance review, and not a substitute for the county's plan review or your design professional's seal. Requirements change. Always confirm against the county's own pages before you submit.

If the property is inside Orlando city limits, that is a different office (City of Orlando permitting), not Orange County Fast Track.

## Where the requirements come from

Every county requirement in the checklist is drawn from the county's own published pages, checked October 2026:

- Osceola County: Apply for a Building Permit (https://www.osceola.org/Doing-Business/Building-and-Permits/Apply-for-a-Building-Permit)
- Osceola County: Frequent Omissions (https://www.osceola.org/Doing-Business/Building-and-Permits/Building-Office-Plan-Review/Frequent-Omissions)
- Orange County: Residential Accessory Structures, minimum submission requirements (https://www.orangecountyfl.net/PermitsLicenses/Permits/ResidentialAccessoryStructures.aspx)
- Orange County: Residential Building Code Plan Review Checklist (https://Orangecountyfl.net/Portals/0/resource library/permits - licenses/A Guide for Residential Plan Approval-CERT.pdf)
- Orange County: One-Stop Permitting Services, Fast Track (https://ocfl.net/PermitsLicenses/One-StopPermittingServices.aspx)
- Orange County Fast Track: Permitting FAQs (https://engageorange.ocfl.net/fast-track-permitting-services/widgets/118242/faqs)

Drawing-quality checks are reused from Markup & Validate (https://markupvalidate.com): title block completeness, sheet numbering, required sheets, text height, revision clouds, dimensions, schedule values.

## Structure

V0 is a single self-contained file (`index.html`) so it works anywhere, including straight from GitHub Pages. The planned next step is one JSON profile per county, so adding a county means adding a file, not editing the app.

## To publish

GitHub Pages: repo Settings, Pages, deploy from the `main` branch. The live page is then `https://acostavictor.github.io/permit-readiness/`.
