# Permit Readiness Check

Free beta: a pre-submission self-check for permit packages in Osceola County and Orange County, Florida.

Open `index.html` in any browser. Pick the county and the project type, tick off what your package has, and get a readiness report listing the gaps. Nothing uploads anywhere. Everything runs in your browser.

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
