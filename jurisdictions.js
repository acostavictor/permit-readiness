function it(t, ev) { return { t: t, ev: ev || null }; }

var DRAWING = { title: "Drawing quality", src: "Checks reused from Markup & Validate (drawing quality, not code compliance)", items: [
  it("Title block complete on every sheet (project, sheet number and title, date, scale, drawn by, checked by)"),
  it("Sheet numbers follow one pattern, no duplicates", "sheetPattern"),
  it("All required sheets present"),
  it("Annotation text meets minimum plotted text height (1/8 inch)"),
  it("Revision clouds have register entries"),
  it("Dimensions agree with the geometry they annotate"),
  it("Schedule values match the values the model and tags actually carry")
]};

var JURISDICTIONS = [
  {
    id: "osceola", name: "Osceola County", kind: "county",
    portal: "Online Permit Center: permits.osceola.org",
    portalUrl: "https://www.osceola.org/Doing-Business/Building-and-Permits/Apply-for-a-Building-Permit",
    phone: "Building office: 407-742-0200",
    groups: [
      { title: "Application package", src: "Osceola County published pages", items: [
        it("Project address confirmed (new address: 911 Addressing Office, 407-742-5911)"),
        it("Parcel ID confirmed via the Property Appraiser search"),
        it("Owner and contractor information complete"),
        it("Building plans digitally signed and sealed by an architect or engineer (online submittal)", "seal"),
        it("Florida Product Approval sheets ready (windows, doors, roofing, shutters, panel walls, structural components)", "productApproval"),
        it("Owner-Builder Statement/Affidavit ready, only if the owner acts as own contractor (delivered in person or by mail, not online)")
      ]},
      { title: "Site plan: the county's frequent omissions", src: "Osceola County Frequent Omissions page", items: [
        it("Accessible route from the building to the public way"),
        it("Accessible route on accessible exits, from the back of the building to an accessible sidewalk on front"),
        it("Sidewalks on accessible means of egress, minimum 44 inches"),
        it("Passing area of 60 inches minimum every 200 ft of accessible route"),
        it("Accessible parking distributed throughout the entire parking area"),
        it("Accessible parking width of 12 ft on center of markings"),
        it("Signage on accessible parking indicating a maximum fine of $250.00 per FS 316.008"),
        it("Detectable warnings on curb ramps covering the full length and width"),
        it("Dissimilar textures on curb ramp surfaces (raised strips or exposed aggregate)"),
        it("Distinctive color on curb ramp surfaces"),
        it("Detectable warnings on blended curbs, 36 inches minimum width")
      ]},
      { title: "Application package: more frequent omissions", src: "Osceola County Frequent Omissions page", items: [
        it("Energy compliance forms signed and sealed by the design professional and signed by the owner representative (commercial) or signed by the owner representative (residential)", "energyForm"),
        it("Soil analysis report signed and sealed by a professional engineer (commercial)", "soilReport"),
        it("Engineered roof truss drawings signed and sealed by a professional engineer", "trussDrawing"),
        it("Manufacturer data, installation instructions, letter of approval or notice of acceptance for envelope products (windows, exterior doors, skylights, roofing, panel walls, structural components, innovative products)", "productApproval"),
        it("Engineered structural drawings for metal buildings, signed and sealed by a professional engineer", "metalBuilding"),
        it("Engineered structural drawings for steel stairs, signed and sealed by a professional engineer", "steelStairs")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. It is required." },
      { key: "energyForm", label: "energy forms present", text: "Energy compliance forms: none detected. Osceola requires them, signed and sealed by the design professional." },
      { key: "productApproval", label: "product approvals present", text: "Florida product approvals: none detected. Osceola requires approval sheets for windows, doors, roofing, shutters, panel walls and structural components." },
      { key: "seal", label: "documents signed and sealed", text: "Signed and sealed documents: no seal or signature signals found in any file. A human must verify every required document is actually signed and sealed." }
    ],
    human: [
      "Osceola County: confirm accessible route, parking and curb ramp items from the frequent omissions list against the site plan by hand."
    ],
    notes: {
      quick: "Quick permits in Osceola County: residential roofing, re-roofing, A/C change-outs and water heater / plumbing change-outs can be issued immediately online or over the counter, and only require the Florida product approvals. The full checklist below still helps, but the approvals are the gating item."
    }
  },
  {
    id: "orange", name: "Orange County", kind: "county",
    portal: "Fast Track Online Services (one set of electronically signed and sealed documents; PDF files only)",
    portalUrl: "https://ocfl.net/PermitsLicenses/One-StopPermittingServices.aspx",
    phone: "Fast Track Customer Service: EPlanCOM@ocfl.net or 407-836-8160",
    groups: [
      { title: "Application package", src: "Orange County Fast Track pages", items: [
        it("One set of electronically signed and sealed construction documents", "seal"),
        it("PDF files only, with file names following the Fast Track User Guide naming conventions", "pdfOnly"),
        it("Property address and parcel confirmed"),
        it("Owner and contractor information complete")
      ]},
      { title: "Site plan", src: "Orange County published pages and plan review checklist", items: [
        it("Site plan or survey showing the location of the proposed structure (zoning questions: Zoning@ocfl.net or 407-836-3111)", "sitePlan"),
        it("Site plan includes septic tank and drain field location, if applicable", "septic"),
        it("Site plan and building plan correspond (FBC 107)"),
        it("Lot grading and drainage plan and finished floor elevation (development engineering: 407-836-3111)", "gradingPlan"),
        it("Orientation of the structure is the same on the site plan and on all plan pages (flipped or mirror-imaged plans are not acceptable, FBC 107)")
      ]},
      { title: "Drawings and engineering", src: "Orange County published pages and plan review checklist", items: [
        it("Construction plans prepared by a Florida licensed professional engineer or registered architect, per the current Residential Florida Building Code", "seal"),
        it("All documents properly signed, dated and sealed as required for the method of submittal", "seal"),
        it("Wind criteria shown: ultimate design wind speed (Vult) and 3-second gust / nominal wind speed (Vasd) in mph, wind exposure, and risk category (FBC-Residential 301)", "windCriteria"),
        it("Live loads documented (uninhabitable attic without storage 10 psf, with limited storage 20 psf, habitable attics and attics served with fixed stairs 30 psf)", "liveLoads"),
        it("Mechanical, electrical and plumbing layouts, when applicable", "mepLayouts"),
        it("Energy calculations, when applicable", "energyForm"),
        it("Truss engineering by a Florida licensed professional engineer or registered architect as part of the initial review, when applicable, and the manufacturer truss layout matches the roof framing plans", "trussDrawing")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. It is required." },
      { key: "energyForm", label: "energy calculations present", text: "Energy calculations: none detected. Orange requires them when applicable, so confirm whether they apply to this project." },
      { key: "seal", label: "documents signed and sealed", text: "Signed and sealed documents: no seal or signature signals found in any file. A human must verify every required document is actually signed and sealed." },
      { key: "windCriteria", label: "wind criteria shown", text: "Wind criteria: no Vult, Vasd or wind speed values detected. Orange requires wind criteria on the plans (FBC-Residential 301)." },
      { key: "gradingPlan", label: "grading and drainage plan present", text: "Grading and drainage plan: none detected. Orange requires a lot grading and drainage plan with finished floor elevation." }
    ],
    human: [
      "Orange County (FBC 107): confirm the structure orientation on the site plan matches every plan page. Flipped or mirror-imaged plans are not acceptable, and software cannot reliably confirm this."
    ],
    humanIf: [
      { ev: "trussDrawing", text: "Truss drawings detected: confirm the manufacturer truss layout matches the roof framing plans." }
    ],
    notes: {
      accessory: "Accessory structures in Orange County: the minimum submission is a site plan or survey, a lot grading and drainage plan with finished floor elevation, and construction plans by a Florida licensed professional. The full checklist below covers those plus the plan review items."
    }
  },
  {
    id: "orlando", name: "City of Orlando", kind: "city",
    portal: "ProjectDox digital submission (orlando.gov)",
    portalUrl: "https://www.orlando.gov/Building-Development/Permits-Inspections/Submit-Construction-Project-Plans?lang_update=638570470931310524",
    phone: "Digital permits: digitalpermits@orlando.gov. City Hall, Permitting Services Division, 400 South Orange Avenue, 1st floor, Orlando, FL 32801",
    groups: [
      { title: "Application package", src: "City of Orlando published pages", items: [
        it("Completed building permit application"),
        it("Project address, parcel ID, owner and contractor information complete"),
        it("Plans digitally signed and sealed with a third-party verified digital signature (for plans requiring sign and seal)", "seal"),
        it("Commercial projects: 25% non-refundable plan review deposit paid before plan upload"),
        it("Notice of Commencement filed for work valued over $5,000, posted at the job site", "noc")
      ]},
      { title: "Plans and files", src: "City of Orlando: Submit Construction Project Plans", items: [
        it("Drawing files are single-page files, maximum 1 GB each"),
        it("File names match the plan sheet index or file guideline"),
        it("Plans dimensioned and drawn to scale"),
        it("Site plan or survey showing existing and proposed conditions", "sitePlan"),
        it("Impervious surface calculations included", "impervious"),
        it("Erosion control details included", "erosion"),
        it("Energy compliance documentation included", "energyForm")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Orlando requires site plans or surveys showing existing and proposed conditions." },
      { key: "energyForm", label: "energy documentation present", text: "Energy compliance documentation: none detected. Orlando requires it with the plans." },
      { key: "seal", label: "plans digitally signed and sealed", text: "Digitally signed and sealed plans: no seal or signature signals found in any file. Orlando requires a third-party verified digital signature and seal for plans that require sign and seal." },
      { key: "impervious", label: "impervious surface calculations present", text: "Impervious surface calculations: none detected. Orlando requires them with the plans." },
      { key: "erosion", label: "erosion control details present", text: "Erosion control details: none detected. Orlando requires erosion control details." },
      { key: "noc", label: "Notice of Commencement present", text: "Notice of Commencement: none detected. Required for work valued over $5,000." }
    ],
    human: [
      "City of Orlando: uploads that do not follow the file requirements are returned before plan review, so confirm file names match the plan sheet index and each drawing is a single-page file."
    ]
  },
  {
    id: "tampa", name: "City of Tampa", kind: "city",
    portal: "Accela Citizen Access (aca.tampagov.net)",
    portalUrl: "https://www.tampa.gov/construction-services/how-do-i",
    phone: "Construction Services: (813) 274-3100",
    groups: [
      { title: "Site and survey", src: "City of Tampa commercial new construction permit application guide", items: [
        it("Site plan signed and sealed by a Florida licensed architect or engineer", "seal"),
        it("Site plan shows distances between proposed structures, existing structures and property lines", "sitePlan"),
        it("Drainage plan with cross sections", "gradingPlan"),
        it("Soil report, notes and calculations", "soilReport"),
        it("Site utility plan"),
        it("Easements, public and private, shown"),
        it("Topographical survey signed and sealed by a Florida licensed surveyor (elevations NAVD 88, flood zone identification)", "survey")
      ]},
      { title: "Building plans", src: "City of Tampa commercial new construction permit application guide", items: [
        it("Sheet index included"),
        it("Code identification listing all applicable FBC, NFPA, FFPC and NEC references"),
        it("Construction type, scope of work, occupancy and use stated"),
        it("Scaled floor plan with room labels and dimensions"),
        it("Florida product approvals included", "productApproval"),
        it("Structural design criteria: wind speed and pressure", "windCriteria"),
        it("Roof and floor live and dead loads documented", "liveLoads"),
        it("Foundation plan, sections and details; floor and roof framing plans"),
        it("Life safety (egress) plan"),
        it("Building plans signed and sealed by a Florida licensed architect or engineer", "seal"),
        it("Mechanical, electrical and plumbing plans", "mepLayouts")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Tampa requires one showing distances to existing structures and property lines." },
      { key: "gradingPlan", label: "drainage plan present", text: "Drainage plan: none detected. Tampa requires a drainage plan with cross sections." },
      { key: "soilReport", label: "soil report present", text: "Soil report: none detected. Tampa requires a soil report, notes and calculations." },
      { key: "survey", label: "topographical survey present", text: "Topographical survey: none detected. Tampa requires a survey signed and sealed by a Florida licensed surveyor, with NAVD 88 elevations and flood zone identification." },
      { key: "productApproval", label: "product approvals present", text: "Florida product approvals: none detected. Tampa requires them in the building plans." },
      { key: "windCriteria", label: "wind speed and pressure shown", text: "Wind speed and pressure: none detected. Tampa requires structural design criteria including wind speed and pressure." },
      { key: "seal", label: "plans signed and sealed", text: "Signed and sealed plans: no seal or signature signals found in any file. Tampa requires building plans signed and sealed by a Florida licensed architect or engineer." }
    ],
    human: [
      "City of Tampa: residential site plans have no signature requirement, but building plans must be signed and sealed by a Florida licensed architect. Confirm which rule applies to each sheet."
    ]
  },
  {
    id: "miami", name: "City of Miami", kind: "city",
    portal: "iBuild portal (apps.miamigov.com) and ProjectDox / ePlan",
    portalUrl: "https://www.miami.gov/Services/Guide-to-Getting-a-Permit",
    phone: "ePlan help: ePlanBuilding@miamigov.com or (305) 416-1605",
    groups: [
      { title: "Application package", src: "City of Miami published pages", items: [
        it("Completed permit application with project address, scope and valuation"),
        it("All plans submitted digitally in PDF format", "pdfOnly"),
        it("File names follow the City's standard naming convention (names cannot change once given)"),
        it("Plans digitally signed and sealed where the City requires it", "seal"),
        it("Owner-builder verification form, if applicable"),
        it("Application fee paid ($40 plus plan review deposit)")
      ]},
      { title: "Plans and supporting documents", src: "City of Miami published pages", items: [
        it("Construction plans"),
        it("Site plan", "sitePlan"),
        it("Energy compliance forms", "energyForm"),
        it("Stormwater requirements checklist", "stormwater"),
        it("Product approvals / NOA certificates for applicable materials", "productApproval"),
        it("Landscape and irrigation plans signed and sealed by a landscape architect, where required")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Miami requires one with the application." },
      { key: "energyForm", label: "energy compliance forms present", text: "Energy compliance forms: none detected. Miami requires them with the application." },
      { key: "productApproval", label: "product approvals / NOA present", text: "Product approvals / NOA certificates: none detected. Miami requires NOA certificates for applicable materials." },
      { key: "stormwater", label: "stormwater checklist present", text: "Stormwater checklist: none detected. Miami requires a stormwater requirements checklist." },
      { key: "seal", label: "plans digitally signed and sealed", text: "Digitally signed and sealed plans: no seal or signature signals found in any file. Miami requires digital sign and seal where the City requires certification." }
    ],
    human: [
      "City of Miami: files that are not named correctly are returned before the prescreen phase, so confirm every file follows the City's naming convention."
    ]
  },
  {
    id: "fortlauderdale", name: "City of Fort Lauderdale", kind: "city",
    portal: "LauderBuild Plan Room (LPR)",
    portalUrl: "https://www.fortlauderdale.gov/files/assets/public/v/2/development-services/documents/lpr_quickstart_v32.pdf",
    phone: "Development Services Department, 700 NW 19th Avenue, Fort Lauderdale, FL 33311",
    groups: [
      { title: "Application package", src: "City of Fort Lauderdale published pages", items: [
        it("Completed building permit application"),
        it("Proof of ownership (deed or title)"),
        it("Contractor information and license number, plus proof of general liability insurance"),
        it("Primary permit filed with all required secondary permits submitted (a primary permit is not issued until secondaries are in)")
      ]},
      { title: "Plans and supporting documents", src: "City of Fort Lauderdale LauderBuild signed and sealed guide", items: [
        it("Plans digitally signed and sealed, drawn to scale, in PDF format", "seal"),
        it("Site plans showing existing and proposed conditions", "sitePlan"),
        it("Energy calculations signed and sealed", "energyForm"),
        it("Geotechnical reports signed and sealed", "soilReport"),
        it("Erosion and sediment control plan signed and sealed", "erosion"),
        it("Current survey signed and sealed", "survey"),
        it("Product approvals / NOA for applicable components", "productApproval"),
        it("Stormwater management plan (Natural Resources Protection Code and SFWMD)", "stormwater"),
        it("Flood zone determination (FEMA flood maps)", "floodZone")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Fort Lauderdale requires site plans showing existing and proposed conditions." },
      { key: "energyForm", label: "energy calculations present", text: "Energy calculations: none detected. Fort Lauderdale requires energy calculations signed and sealed." },
      { key: "soilReport", label: "geotechnical report present", text: "Geotechnical report: none detected. Fort Lauderdale requires geotechnical reports signed and sealed." },
      { key: "survey", label: "current survey present", text: "Current survey: none detected. Fort Lauderdale requires a current survey signed and sealed." },
      { key: "stormwater", label: "stormwater management plan present", text: "Stormwater management plan: none detected. Fort Lauderdale requires one under the Natural Resources Protection Code and SFWMD." },
      { key: "floodZone", label: "flood zone determination present", text: "Flood zone determination: none detected. Check FEMA flood maps for the property." },
      { key: "seal", label: "plans digitally signed and sealed", text: "Digitally signed and sealed plans: no seal or signature signals found in any file. Fort Lauderdale requires plans digitally signed and sealed, drawn to scale, in PDF format." }
    ],
    human: [
      "City of Fort Lauderdale: the HB 803 small residential exemption (under $7,500, single-family, outside flood-hazard areas) needs a written approval before work starts. It is not automatic."
    ]
  },
  {
    id: "jacksonville", name: "City of Jacksonville", kind: "city",
    portal: "JaxEPICS portal (jaxepics.coj.net)",
    portalUrl: "https://www.jacksonville.gov/departments/planning-and-development/building-inspection-division/residential-permits",
    phone: "Zoning: (904) 255-8300",
    groups: [
      { title: "Application package", src: "City of Jacksonville published pages", items: [
        it("Completed building permit application (generated in JaxEPICS)"),
        it("Real estate tax number (RE number) and project address on the application"),
        it("Zoning designation, height, lot size and coverage, and setbacks confirmed"),
        it("Recorded plat and covenants / deed restrictions on file, if not already")
      ]},
      { title: "Plans and documents", src: "City of Jacksonville published pages", items: [
        it("Architectural plans, digitally signed and sealed", "seal"),
        it("Scaled site plan and/or survey showing dimensions of structures and distances from property lines", "sitePlan"),
        it("Truss engineering, when necessary", "trussDrawing"),
        it("Energy calculations and Manual J for new heated or cooled space", "energyForm"),
        it("Product approvals / NOAs and flood certificates, where required", "productApproval"),
        it("Septic tank construction permit (new homes) or re-certification (additions), where applicable", "septic")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Jacksonville requires a scaled site plan or survey showing dimensions and distances from property lines." },
      { key: "energyForm", label: "energy calculations and Manual J present", text: "Energy calculations and Manual J: none detected. Jacksonville requires them for new heated or cooled space." },
      { key: "trussDrawing", label: "truss engineering present", text: "Truss engineering: none detected. Jacksonville requires truss engineering when necessary, so confirm whether it applies." },
      { key: "productApproval", label: "product approvals present", text: "Product approvals / NOAs: none detected. Jacksonville requires them where applicable." },
      { key: "seal", label: "plans digitally signed and sealed", text: "Digitally signed and sealed plans: no seal or signature signals found in any file. Jacksonville requires digitally signed and sealed architectural plans." }
    ],
    human: [
      "City of Jacksonville: commercial applications must be submitted as PDFs with digital signatures per Florida statute. Confirm every document carries a valid digital signature."
    ]
  },
  {
    id: "stpete", name: "City of St. Petersburg", kind: "city",
    portal: "ePlan submittal (stpete.org)",
    portalUrl: "https://www.stpete.org/Business/Building Forms & Applications/Residential_Plan_Review_Checklist 2020.pdf?t=202607081538090",
    phone: "Permits@stpete.org, 727-893-7231. ePlan: eplanreview@stpete.org, 727-893-7230",
    groups: [
      { title: "Application package", src: "City of St. Petersburg ePlan checklists", items: [
        it("Completed building permit application, signed / notarized (or electronic signature affidavit attached)"),
        it("Agency or board approvals submitted before permit approval, where required")
      ]},
      { title: "Plans and documents", src: "City of St. Petersburg ePlan checklists", items: [
        it("Complete set of digitally signed and sealed plans, including cover sheet with sheet index", "seal"),
        it("Site plan", "sitePlan"),
        it("Floor plans"),
        it("Energy calculations", "energyForm"),
        it("Manual J or Manual N (FL)", "manualJ"),
        it("Product approvals and/or NOAs for all cladding components", "productApproval"),
        it("Wall sections and details"),
        it("Foundation plan footprint and orientation matches floor plan and site plan"),
        it("Wind zone or wind speed, exposure category, risk category and design loads shown (FBC-R R301.2.1)", "windCriteria"),
        it("Flood zone, elevation and FBC-R R322 compliance shown, where applicable (base flood elevation + 2 ft FEMA)", "floodZone")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. St. Petersburg requires one in the signed and sealed set." },
      { key: "energyForm", label: "energy calculations present", text: "Energy calculations: none detected. St. Petersburg requires them in the plan set." },
      { key: "manualJ", label: "Manual J or N present", text: "Manual J or Manual N: none detected. St. Petersburg requires Manual J or N-FL." },
      { key: "productApproval", label: "product approvals present", text: "Product approvals / NOAs: none detected. St. Petersburg requires product approvals and NOAs for all cladding components." },
      { key: "windCriteria", label: "wind zone and loads shown", text: "Wind zone, wind speed, exposure and risk category: none detected. St. Petersburg requires them under FBC-R R301.2.1." },
      { key: "floodZone", label: "flood zone and elevation shown", text: "Flood zone and elevation: none detected. Show flood zone, elevation and FBC-R R322 compliance where applicable." },
      { key: "seal", label: "plans digitally signed and sealed", text: "Digitally signed and sealed plans: no seal or signature signals found in any file. St. Petersburg requires a complete set of digitally signed and sealed plans." }
    ],
    human: [
      "City of St. Petersburg: confirm the foundation plan footprint and orientation match the floor plan and the site plan. That mismatch is a named checklist item."
    ]
  },
  {
    id: "portstlucie", name: "City of Port St. Lucie", kind: "city",
    portal: "Contractor E-Permitting Portal (cityofpsl.com)",
    portalUrl: "https://www.cityofpsl.com/Government/Your-City-Government/Departments/Building/Building-Permits-Applications-Fees-and-Checklists",
    phone: "121 SW Port St. Lucie Blvd, Port St. Lucie, FL 34984, 772-871-1775",
    groups: [
      { title: "Application package", src: "City of Port St. Lucie published pages", items: [
        it("Completed permit application: site address, legal description, parcel ID, owner, contractor and architect / engineer information, description of work, valuation"),
        it("Notarized contractor or homeowner-builder signature"),
        it("Recorded Notice of Commencement for work valued at $5,000 or more (before first inspection)", "noc"),
        it("Subcontractor permit applications, if applicable")
      ]},
      { title: "Plans and documents", src: "City of Port St. Lucie published pages", items: [
        it("Original plans signed and sealed by a Florida licensed architect or engineer", "seal"),
        it("Survey showing structures, dimensions, setbacks, flood zone line and base flood elevation, finished floor elevations", "survey"),
        it("Site plan", "sitePlan"),
        it("Manual J, if applicable", "manualJ"),
        it("Truss cut sheets and layout, if applicable", "trussDrawing"),
        it("Stormwater ERU calculation form, signed by the engineer and owner (commercial site work)", "stormwater"),
        it("Stormwater pollution prevention plan (SWPPP) for projects disturbing one acre or more", "stormwater")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Port St. Lucie requires one." },
      { key: "survey", label: "survey present", text: "Survey: none detected. Port St. Lucie requires a survey showing structures, dimensions, setbacks, flood zone and finished floor elevations." },
      { key: "manualJ", label: "Manual J present", text: "Manual J: none detected. Required where applicable, so confirm whether it applies." },
      { key: "trussDrawing", label: "truss cut sheets present", text: "Truss cut sheets and layout: none detected. Required where applicable." },
      { key: "stormwater", label: "stormwater ERU calculation present", text: "Stormwater ERU calculation: none detected. Required for commercial site work." },
      { key: "noc", label: "Notice of Commencement present", text: "Notice of Commencement: none detected. Required for work valued at $5,000 or more." },
      { key: "seal", label: "plans signed and sealed", text: "Signed and sealed plans: no seal or signature signals found in any file. Port St. Lucie requires original plans signed and sealed by a Florida licensed architect or engineer." }
    ],
    human: [
      "City of Port St. Lucie: for site work disturbing one acre or more, confirm the SWPPP and the FDEP notice of intent are in the package."
    ]
  },
  {
    id: "capecoral", name: "City of Cape Coral", kind: "city",
    portal: "EnerGov Citizen Self-Service (CapeCoral.gov/EnerGov)",
    portalUrl: "https://www.capecoral.gov/departments/development_services/permitting_services_division/join_a_line_schedule_an_appt.php",
    phone: "1015 Cultural Park Blvd, Cape Coral, FL 33990, (239) 574-0401",
    groups: [
      { title: "Application package", src: "City of Cape Coral published pages", items: [
        it("Completed residential new construction application, with address and/or parcel ID and all sections completed"),
        it("Contractor information current on file"),
        it("Address block on every plan page (street address, block, lot)")
      ]},
      { title: "Plans and documents", src: "City of Cape Coral residential plan review guideline", items: [
        it("Complete set of building plans signed and sealed by a Florida registered architect or engineer (structural + architectural)", "seal"),
        it("Manufacturer truss layout with specific uplift and reaction list and Engineer of Record acknowledgement", "trussDrawing"),
        it("Energy form package signed and sealed, including Form 405, Manual J and cover sheet", "energyForm"),
        it("Site plan with drainage information (pre-existing and proposed post-development conditions)", "sitePlan"),
        it("Sealed survey less than 1 year old", "survey"),
        it("Product approval worksheets for doors, windows, garage door, shutters, siding, soffits, roofing, skylights and roof vents", "productApproval"),
        it("Impervious surface calculation sheet, completed with printed name, signature and date", "impervious"),
        it("Burrowing owl / gopher tortoise affidavit")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan with drainage present", text: "Site plan with drainage information: none detected. Cape Coral requires a site plan with pre-existing and proposed drainage conditions." },
      { key: "survey", label: "sealed survey present", text: "Sealed survey: none detected. Cape Coral requires a sealed survey less than 1 year old." },
      { key: "productApproval", label: "product approval worksheets present", text: "Product approval worksheets: none detected. Cape Coral requires them for doors, windows, garage door, shutters, siding, soffits, roofing, skylights and roof vents." },
      { key: "impervious", label: "impervious surface calculation present", text: "Impervious surface calculation sheet: none detected. Cape Coral requires one, completed with name, signature and date." },
      { key: "trussDrawing", label: "truss layout present", text: "Truss layout: none detected. Cape Coral requires the manufacturer truss layout with uplift and reaction list and Engineer of Record acknowledgement." },
      { key: "energyForm", label: "energy form package present", text: "Energy form package: none detected. Cape Coral requires the energy form package signed and sealed, including Form 405, Manual J and cover sheet." },
      { key: "seal", label: "plans signed and sealed", text: "Signed and sealed plans: no seal or signature signals found in any file. Cape Coral requires a complete set signed and sealed by a Florida registered architect or engineer." }
    ],
    human: [
      "City of Cape Coral: permit applications run through EnerGov CSS. Confirm every plan page carries the address block (street address, block, lot)."
    ]
  },
  {
    id: "tallahassee", name: "City of Tallahassee", kind: "city",
    portal: "Growth Management permit portal (talgov.com)",
    portalUrl: "https://receiver-www.talgov.com/Uploads/Public/Documents/growth/checklists/check_res_building.pdf",
    phone: "Growth Management, City of Tallahassee",
    groups: [
      { title: "Application package", src: "City of Tallahassee published pages", items: [
        it("Completed and signed building permit application"),
        it("Land use compliance, where required")
      ]},
      { title: "Plans and documents", src: "City of Tallahassee published pages", items: [
        it("Two sets of construction plans, signed and sealed (commercial)", "seal"),
        it("Floor plan at 1/4 inch scale, elevations of all views, foundation or floor framing plan, wall sections, roof plan"),
        it("Mechanical, electrical and plumbing sheets (or marked N/A)", "mepLayouts"),
        it("Florida Building Code energy conservation form C502 or C506, signed and sealed", "energyForm"),
        it("HVAC load sizing calculation for all new or replaced HVAC equipment", "manualJ"),
        it("Signed and sealed soils report, if new building footprint is over 400 sq ft", "soilReport"),
        it("Triplex site plans drawn to an engineered scale", "sitePlan"),
        it("File names use the discipline prefix and three-digit number (for example A-001)")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. Tallahassee requires triplex site plans drawn to an engineered scale." },
      { key: "energyForm", label: "energy form present", text: "Energy conservation form C502 or C506: none detected. Tallahassee requires one, signed and sealed." },
      { key: "manualJ", label: "HVAC load sizing present", text: "HVAC load sizing calculation: none detected. Tallahassee requires one for all new or replaced HVAC equipment." },
      { key: "soilReport", label: "soils report present", text: "Soils report: none detected. Required, signed and sealed, when the new footprint is over 400 sq ft." },
      { key: "mepLayouts", label: "MEP sheets present", text: "MEP sheets: none detected. Tallahassee requires mechanical, electrical and plumbing sheets (or marked N/A)." },
      { key: "seal", label: "plans signed and sealed", text: "Signed and sealed plans: no seal or signature signals found in any file. Tallahassee requires construction plans signed and sealed." }
    ],
    human: [
      "City of Tallahassee: file names must use the discipline prefix and three-digit number (A-001). Renaming a digitally signed file with Save As can break the signature, so rename in the folder view instead."
    ]
  },
  {
    id: "westpalmbeach", name: "City of West Palm Beach", kind: "city",
    portal: "Enterprise Permitting and Licensing (EPL) via Civic Access",
    portalUrl: "https://www.wpb.org/Departments/Development-Services/Building-Division",
    phone: "401 Clematis Street, West Palm Beach, FL 33401, (561) 822-2222. Development Services: ds@wpb.org, (561) 822-6700",
    groups: [
      { title: "Application package", src: "City of West Palm Beach published pages", items: [
        it("Completed permit application with project description, square footage and value"),
        it("Owner-builder affidavit (notarized), if applicable"),
        it("Recorded Notice of Commencement (FS 713)", "noc"),
        it("Palm Beach County impact fees paid, plans stamped by the county, receipt returned to the City (before issuance)")
      ]},
      { title: "Plans and documents", src: "City of West Palm Beach published pages", items: [
        it("Site plans showing existing and proposed conditions", "sitePlan"),
        it("Engineering drawings with calculations"),
        it("Stormwater management plans (ERM and SFWMD)", "stormwater"),
        it("Erosion control plans", "erosion"),
        it("Property surveys", "survey"),
        it("Flood zone determination (FEMA flood maps)", "floodZone"),
        it("Energy performance evaluation form, signed by the owner or agent", "energyForm"),
        it("Truss drawings signed and sealed and reviewed and approved by the designer of record", "trussDrawing"),
        it("Exposure category shown (exposure C governs where it applies)", "windCriteria")
      ]}
    ],
    missing: [
      { key: "sitePlan", label: "site plan present", text: "Site plan: no file in this package looks like a site plan. West Palm Beach requires site plans showing existing and proposed conditions." },
      { key: "stormwater", label: "stormwater plan present", text: "Stormwater management plan: none detected. West Palm Beach requires one under ERM and SFWMD." },
      { key: "erosion", label: "erosion control plan present", text: "Erosion control plan: none detected. West Palm Beach requires one." },
      { key: "survey", label: "survey present", text: "Property survey: none detected. West Palm Beach requires property surveys." },
      { key: "floodZone", label: "flood zone determination present", text: "Flood zone determination: none detected. Check FEMA flood maps; an elevation certificate is required in AO flood zones." },
      { key: "energyForm", label: "energy form present", text: "Energy performance evaluation form: none detected. West Palm Beach requires one, signed by the owner or agent." },
      { key: "trussDrawing", label: "truss drawings present", text: "Truss drawings: none detected. West Palm Beach requires truss drawings signed and sealed and approved by the designer of record." },
      { key: "noc", label: "Notice of Commencement present", text: "Notice of Commencement: none detected. A recorded NOC is required (FS 713)." },
      { key: "windCriteria", label: "exposure category shown", text: "Exposure category: none detected. West Palm Beach requires the exposure category on the plans." }
    ],
    human: [
      "City of West Palm Beach: the printed name of the person sealing a document must appear in the title block on each sheet (FAC 61G-16.004(6)). Confirm it on every sheet."
    ]
  }
];
