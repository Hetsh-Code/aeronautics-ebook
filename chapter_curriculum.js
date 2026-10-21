/**
 * AERONAUTICS E-BOOK — TOPIC-SPECIFIC KNOWLEDGE & CURRICULUM ENGINE
 * Provides unique, in-depth educational content, governing equations,
 * interactive simulation parameters, CAD inspection pins, empirical flight tables,
 * and certification quizzes tailored to each specific chapter.
 */
(function() {
  'use strict';

  // Comprehensive Handcrafted Chapter Profiles
  const CHAPTER_PROFILES = {
  "1": {
    "domain": "foundations",
    "discipline": "AERONAUTICS & FLUID MECHANICS",
    "chipColor": "#00f0ff",
    "icon": "\u2708\ufe0f",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 1: Introduction to Aeronautics</strong> introduces the physical science, theoretical principles, and mathematical frameworks governing the motion of vehicles through the Earth's atmosphere. Aeronautics encompasses fluid dynamics, thermodynamics, structural mechanics, flight dynamics, and propulsion systems working in unison.\n      </p>\n      <p class=\"section-p\">\n        Aeronautical flight is defined as travel within the Earth's gaseous atmosphere below the <strong>K\u00e1rm\u00e1n line (100 km / 62.1 miles altitude)</strong>, above which the atmosphere is too rarefied to sustain aerodynamic lift at sub-orbital speeds, marking the boundary with astronautics.\n      </p>\n      <p class=\"section-p\">\n        In this foundational chapter, students master the core aerodynamic variables: static pressure ($p$), air density ($\\rho$), temperature ($T$), dynamic pressure ($q = \\frac{1}{2}\\rho v^2$), Reynolds number ($Re$), and Mach number ($M$). We establish the dimensional analysis conventions that enable sub-scale wind tunnel models to accurately predict the performance of full-scale commercial and military aircraft.\n      </p>\n    ",
    "formulaTitle": "AERODYNAMIC COEFFICIENTS & DYNAMIC PRESSURE DEFINITIONS",
    "formulaHtml": "$$ q = \\frac{1}{2} \\rho v^2 \\quad | \\quad C_L = \\frac{L}{q \\cdot S} \\quad | \\quad C_D = \\frac{D}{q \\cdot S} \\quad | \\quad Re = \\frac{\\rho v c}{\\mu} $$",
    "formulaDesc": "Fundamental Aerodynamic Non-Dimensional Coefficients: Relates fluid dynamic pressure $q$, wing planform area $S$, lift $L$, and drag $D$. The Reynolds number $Re$ represents the ratio of inertial forces to viscous forces in the fluid boundary layer.",
    "takeaways": [
      "Continuum Hypothesis: Air at operational flight altitudes is modeled as a continuous fluid possessing pressure, density, and viscosity.",
      "Dynamic Pressure (q): Kinetic energy per unit volume of fluid determines all aerodynamic forces acting on an aircraft.",
      "Reynolds Number Scaling: Dynamic similitude in wind tunnel testing requires matching Reynolds and Mach numbers to ensure identical flow patterns."
    ],
    "simDescription": "Explore the relationship between airspeed, dynamic pressure, and lift generation across a symmetrical and cambered NACA 4-digit airfoil.",
    "flowDescription": "Laminar boundary layer velocity profile over a smooth aerodynamic surface showing the transition to turbulent flow.",
    "hotspotDescription": "Click the 5 inspection pins to inspect primary aerodynamic measurement stations on an aerodynamic research wing.",
    "hotspots": [
      {
        "id": 1,
        "x": 15,
        "y": 35,
        "title": "Forward Stagnation Point Probe",
        "spec": "Heated Stainless Steel Pitot-Static Sensor",
        "stress": "Total Pressure P0 = 101.3 kPa",
        "status": "CALIBRATED / ICE PROTECTED"
      },
      {
        "id": 2,
        "x": 42,
        "y": 22,
        "title": "Suction Peak Surface Taps",
        "spec": "Flush Piezo-Resistive Pressure Transducers",
        "stress": "Minimum Cp = -1.82 (Max Suction)",
        "status": "SAMPLING AT 1,000 HZ"
      },
      {
        "id": 3,
        "x": 68,
        "y": 45,
        "title": "Boundary Layer Transition Microphone",
        "spec": "Surface Micro-Electro-Mechanical Array",
        "stress": "Tollmien-Schlichting Wave Frequency: 2.4 kHz",
        "status": "TRANSITION AT 42% CHORD"
      },
      {
        "id": 4,
        "x": 88,
        "y": 60,
        "title": "Trailing Edge Wake Rake",
        "spec": "Multi-Tube Total Pressure Rake Assembly",
        "stress": "Profile Drag Integration CD0 = 0.0082",
        "status": "WAKE DEFICIT COMPUTED"
      },
      {
        "id": 5,
        "x": 50,
        "y": 80,
        "title": "Internal Strain Gauge Balance",
        "spec": "Maraging Steel 6-Component Balance",
        "stress": "Lift: 12.4 kN | Drag: 840 N | Pitch: 320 N\u00b7m",
        "status": "TEMPERATURE COMPENSATED"
      }
    ],
    "calcTitle": "DYNAMIC PRESSURE & AERODYNAMIC LIFT SOLVER",
    "calcDesc": "Calculate dynamic pressure and resultant lift force based on true airspeed and reference wing area.",
    "calcParam1": {
      "label": "True Airspeed (v, kts)",
      "min": 80,
      "max": 500,
      "val": 250,
      "unit": "kts"
    },
    "calcParam2": {
      "label": "Air Density (\u03c1, kg/m\u00b3)",
      "min": 0.3,
      "max": 1.3,
      "val": 1.225,
      "unit": "kg/m\u00b3",
      "step": 0.05
    },
    "tableTitle": "AERODYNAMIC CERTIFICATION TEST POINTS \u2014 LEVEL FLIGHT POLARS",
    "tableIntro": "Baseline flight test data points measuring lift-to-drag ratios and parasite drag coefficients across the certified operational envelope:",
    "tableHeaders": [
      "SORTIE",
      "AIRSPEED (KTS)",
      "MACH NO",
      "ANGLE OF ATTACK",
      "LIFT COEFFICIENT (CL)",
      "L/D RATIO"
    ],
    "tableRows": [
      [
        "RUN-01 (Stall Margin)",
        "115 kts",
        "M 0.17",
        "12.5\u00b0",
        "1.42",
        "9.4:1"
      ],
      [
        "RUN-02 (Best Climb)",
        "180 kts",
        "M 0.27",
        "6.2\u00b0",
        "0.68",
        "16.8:1"
      ],
      [
        "RUN-03 (Max Range Cruise)",
        "280 kts",
        "M 0.43",
        "2.8\u00b0",
        "0.34",
        "18.2:1 (Peak)"
      ],
      [
        "RUN-04 (High-Speed Dash)",
        "420 kts",
        "M 0.64",
        "0.8\u00b0",
        "0.18",
        "11.5:1"
      ]
    ],
    "envelopeIntro": "The aerodynamic operating envelope dictates the minimum flying speed (stall limit) and structural maximum design dive speed (Vd/Md).",
    "integrationIntro": "Aerodynamic surface pressure distributions directly couple with airframe aeroelastic deflection and flight control actuator loads.",
    "redundancyCards": [
      {
        "title": "DUAL INDEPENDENT PITOT-STATIC SYSTEMS",
        "desc": "Aircraft employ separate Captain and First Officer pitot tubes and static ports with automated air data computer cross-comparison to detect icing or sensor blockages."
      },
      {
        "title": "HEATED ANGLE-OF-ATTACK VANES",
        "desc": "Triple-vane angle-of-attack resolvers provide independent stall warning signals to the flight management computers and stick shaker actuators."
      }
    ],
    "quiz": {
      "question": "Which dimensionless parameter represents the ratio of inertial fluid forces to viscous shear forces in aerodynamic flow?",
      "options": [
        "Reynolds Number (Re)",
        "Mach Number (M)",
        "Prandtl Number (Pr)",
        "Froude Number (Fr)"
      ],
      "correctIndex": 0,
      "rationale": "The Reynolds number Re = (rho * v * c) / mu characterizes whether fluid flow over a wing is laminar or turbulent by comparing momentum-driven inertial forces to molecular viscous friction."
    }
  },
  "2": {
    "domain": "history",
    "discipline": "AVIATION HISTORY & PIONEERING FLIGHT",
    "chipColor": "#38bdf8",
    "icon": "\ud83d\udcdc",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 2: History of Human Flight</strong> chronicles humanity's multi-millennial quest to transcend terrestrial bounds and master the atmosphere. From the ancient Greek myth of Icarus and the kite experiments of ancient China to Leonardo da Vinci's visionary 1485 <em>Codex on the Flight of Birds</em>, the quest for flight was long hindered by the assumption that humans must imitate the flapping wings of birds (ornithopters).\n      </p>\n      <p class=\"section-p\">\n        The decisive breakthrough occurred in 1799 when English engineer <strong>Sir George Cayley</strong> etched a silver disc with the fundamental vectors of flight: lift, drag, and thrust. Cayley realized that the mechanism producing aerodynamic lift must be completely separated from the mechanism producing forward thrust. By introducing a fixed cambered wing, an aft empennage (tailplane) for longitudinal and directional stability, and a separate propulsive source, Cayley founded modern aeronautical science.\n      </p>\n      <p class=\"section-p\">\n        In the late 19th century, German pioneer <strong>Otto Lilienthal</strong> conducted over 2,000 documented hang-glider flights from his artificial hill outside Berlin. Lilienthal published precise aerodynamic tables proving the superior lifting efficiency of cambered (arched) surfaces over flat plates, sacrificing his life in 1896 with his famous dying words: <em>\"Sacrifices must be made.\"</em>\n      </p>\n      <p class=\"section-p\">\n        Inspired by Lilienthal, <strong>Wilbur and Orville Wright</strong> in Dayton, Ohio recognized that earlier experimenters had solved lift and thrust, but lacked <em>controllability</em> in three dimensions. In 1901, the Wrights built a wind tunnel to correct John Smeaton's 18th-century air pressure coefficient. They engineered their patented <strong>three-axis flight control system</strong>: wing-warping for lateral roll, a forward canard elevator for longitudinal pitch, and an interconnected rear rudder for directional yaw.\n      </p>\n      <p class=\"section-p\">\n        On <strong>December 17, 1903</strong> at Kill Devil Hills near Kitty Hawk, North Carolina, Orville Wright flew the <em>Wright Flyer</em> for 12 seconds over 120 feet of sand\u2014the world's first powered, controlled, sustained heavier-than-air flight. Aviation then advanced at breakneck speed: Louis Bl\u00e9riot crossed the English Channel in 1909, Charles Lindbergh flew solo across the Atlantic in 1927 in the <em>Spirit of St. Louis</em>, Frank Whittle and Hans von Ohain independently developed the turbojet engine in the late 1930s, Chuck Yeager broke the sound barrier in the rocket-powered Bell X-1 in 1947, and the jetliner revolution was cemented with the Boeing 707 and the supersonic Concorde.\n      </p>\n    ",
    "formulaTitle": "HISTORIC LIFT EQUATION & THREE-SURFACE FORCE SEPARATION",
    "formulaHtml": "$$ L = k \\cdot S \\cdot v^2 \\cdot C_L \\quad \\text{and} \\quad \\frac{L}{D} = \\frac{1}{\\tan(\\gamma)} \\quad \\text{and} \\quad P_{\\text{req}} = D \\cdot v $$",
    "formulaDesc": "Historic Smeaton Lift & Glide Equation: Utilized by Otto Lilienthal and corrected by Wilbur & Orville Wright in their 1901 wind tunnel. $k$ is Smeaton's coefficient (corrected by the Wrights from 0.0054 to 0.0033 lb\u00b7s\u00b2/ft\u2074), $S$ is wing reference area (510 sq ft on the 1903 Flyer), $v$ is airspeed, and $L/D$ dictates glide descent angle $\\gamma$.",
    "takeaways": [
      "Separation of Lift & Thrust (Cayley 1799): Modern aviation began when fixed wings for lift were decoupled from forward propulsion.",
      "Three-Axis Aerodynamic Control (Wright 1903): The true breakthrough of powered flight was pitch, roll, and yaw control, not merely installing an engine.",
      "Empirical Wind Tunnel Testing: The Wrights constructed one of the world's first precision wind tunnels in 1901, testing 200+ airfoils to correct historical Smeaton tables."
    ],
    "simDescription": "Simulate early 20th-century low-speed cambered airfoil aerodynamics (Reynolds number ~100,000, 30 mph flight speed) as tested by the Wright brothers and Otto Lilienthal.",
    "flowDescription": "Early wind tunnel visualization of smoke streamlines across a thick cambered Wright-style wooden airfoil showing laminar attachment and trailing edge stall separation.",
    "hotspotDescription": "Click the 5 inspection pins below to examine the anatomy of the historic 1903 Wright Flyer biplane airframe and flight control systems.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 35,
        "title": "Forward Biplane Canard Elevator",
        "spec": "Spruce Wood Spars & Fine Muslin Fabric",
        "stress": "Pitch Angular Deflection \u00b118\u00b0",
        "status": "VERIFIED / BALANCED DOWNDRAFT"
      },
      {
        "id": 2,
        "x": 45,
        "y": 28,
        "title": "Wing-Warping Cable Pulleys & Hip Cradle",
        "spec": "Braided Steel Rigging Wire & Ash Pulleys",
        "stress": "Tip Twist Limit: 8.5\u00b0 Differential",
        "status": "RIGGING WIRE TENSION CERTIFIED"
      },
      {
        "id": 3,
        "x": 38,
        "y": 72,
        "title": "Custom 12-HP 4-Cylinder Engine",
        "spec": "Cast Aluminum-Copper Alloy Crankcase (Charlie Taylor)",
        "stress": "Output: 12 HP @ 1,020 RPM (Weight: 180 lbs)",
        "status": "GRAVITY FUEL FLOW NOMINAL"
      },
      {
        "id": 4,
        "x": 62,
        "y": 55,
        "title": "Twin Counter-Rotating Pusher Propellers",
        "spec": "Laminated Carved Spruce Wood Airfoils",
        "stress": "Shaft Speed: 350 RPM (Bicycle Chain Drive)",
        "status": "TORQUE ZEROED / BALANCED"
      },
      {
        "id": 5,
        "x": 84,
        "y": 40,
        "title": "Twin Vertical Rear Rudders",
        "spec": "Ash Wood Frames & Irish Linen Covering",
        "stress": "Yaw Authority: \u00b120\u00b0 Deflection",
        "status": "ADVERSE YAW CANCEL ACTIVE"
      }
    ],
    "calcTitle": "HISTORIC WRIGHT FLYER LIFT & POWER REQUIRED SOLVER",
    "calcDesc": "Calculate whether the 1903 Wright Flyer generates sufficient aerodynamic lift to overcome its 750 lb gross weight at given headwind and airspeed.",
    "calcParam1": {
      "label": "Airspeed Over Wings (v, mph)",
      "min": 18,
      "max": 45,
      "val": 30,
      "unit": "mph"
    },
    "calcParam2": {
      "label": "Wing Area (S, sq ft)",
      "min": 350,
      "max": 600,
      "val": 510,
      "unit": "sq ft"
    },
    "tableTitle": "HISTORIC POWERED FLIGHT SORTIE LOG \u2014 KILL DEVIL HILLS (DECEMBER 17, 1903)",
    "tableIntro": "Official flight test telemetry logs recorded by Wilbur and Orville Wright during the four historic powered flights on the sands of Kitty Hawk, North Carolina:",
    "tableHeaders": [
      "FLIGHT RUN",
      "PILOT IN COMMAND",
      "FLIGHT TIME",
      "DISTANCE (GROUND)",
      "AIRSPEED",
      "HISTORIC SIGNIFICANCE"
    ],
    "tableRows": [
      [
        "Flight 1 (10:35 AM)",
        "Orville Wright",
        "12.0 seconds",
        "120 ft (36.5 m)",
        "30.0 mph (48 km/h)",
        "First controlled, sustained, powered heavier-than-air flight in world history"
      ],
      [
        "Flight 2 (11:20 AM)",
        "Wilbur Wright",
        "13.0 seconds",
        "175 ft (53.3 m)",
        "31.5 mph (51 km/h)",
        "Confirmed repeatability and longitudinal elevator pitch authority in 27 mph gale"
      ],
      [
        "Flight 3 (11:40 AM)",
        "Orville Wright",
        "15.0 seconds",
        "200 ft (61.0 m)",
        "31.0 mph (50 km/h)",
        "Demonstrated lateral roll correction using wing-warping over gusting dunes"
      ],
      [
        "Flight 4 (12:00 PM)",
        "Wilbur Wright",
        "59.0 seconds",
        "852 ft (259.7 m)",
        "34.0 mph (55 km/h)",
        "Record flight of the day, proving practical point-to-point air navigation"
      ]
    ],
    "envelopeIntro": "The flight envelope of early pioneer aircraft was severely restricted by low engine power-to-weight ratios and narrow margins between stall speed (24 mph) and maximum level speed (34 mph).",
    "integrationIntro": "Evolution of aeronautical engineering materials and systems from early wooden wire-braced biplanes to modern composite fly-by-wire transports.",
    "redundancyCards": [
      {
        "title": "TWIN COUNTER-ROTATING PROPELLERS",
        "desc": "To prevent dangerous gyroscopic precession and torque roll from spinning props, the Wrights ran crossed bicycle chains to spin the two 8.5-foot spruce propellers in opposite directions."
      },
      {
        "title": "WING-WARPING & RUDDER INTERCONNECT",
        "desc": "Wilbur Wright discovered that warping wingtips to roll caused adverse yaw. By interconnecting the hip cradle to the rear rudder, the Flyer achieved the world's first coordinated banked turns."
      }
    ],
    "quiz": {
      "question": "Who is historically recognized as the 'Father of Aeronautics' for first separating the generation of lift from forward propulsive thrust in 1799?",
      "options": [
        "Sir George Cayley",
        "Leonardo da Vinci",
        "Otto Lilienthal",
        "Cl\u00e9ment Ader"
      ],
      "correctIndex": 0,
      "rationale": "In 1799, Sir George Cayley engraved a silver medallion showing the separate vectors of lift, drag, and thrust. By replacing flapping ornithopter wings with fixed cambered wings for lift and separate propulsion for thrust, Cayley laid down the architecture of all modern airplanes."
    }
  },
  "3": {
    "domain": "classification",
    "discipline": "AIRCRAFT DESIGN & TAXONOMY",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udcd0",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 3: What Is an Aircraft?</strong> delivers the rigorous legal, physical, and engineering definition of atmospheric flight vehicles. Under <strong>ICAO Annex 7</strong> and <strong>FAA 14 CFR Part 1</strong>, an aircraft is formally defined as: <em>\"Any machine that can derive support in the atmosphere from the reactions of the air other than the reactions of the air against the earth's surface.\"</em>\n      </p>\n      <p class=\"section-p\">\n        This definition creates two critical distinctions:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Exclusion of Hovercraft:</strong> Ground-effect hovercraft (hovercraft/ACVs) rely on a trapped pressurized air cushion reacting against the surface below, and are therefore legally classed as marine vessels, not aircraft.</li>\n        <li><strong>Aerostats vs. Aerodynes:</strong> Aircraft are bifurcated into <em>Aerostats</em> (lighter-than-air vehicles using Archimedes' buoyant principle: hot-air balloons, gas airships, blimps) and <em>Aerodynes</em> (heavier-than-air vehicles using dynamic aerodynamic forces: airplanes, gliders, helicopters, gyrocopters, tiltrotors).</li>\n      </ul>\n      <p class=\"section-p\">\n        Every heavier-than-air aircraft must integrate five primary sub-architectures: lifting surfaces (wings or rotors), a structural fuselage, a stabilizing empennage, landing gear, and a flight control mechanism.\n      </p>\n    ",
    "formulaTitle": "AEROSTAT BUOYANT FORCE VS AERODYNE DYNAMIC LIFT",
    "formulaHtml": "$$ F_{\\text{buoyant}} = (\\rho_{\\text{air}} - \\rho_{\\text{gas}}) \\cdot V_{\\text{envelope}} \\cdot g \\quad \\text{vs} \\quad L = \\frac{1}{2} \\rho v^2 S C_L $$",
    "formulaDesc": "Physics Comparison: Aerostats achieve static equilibrium when buoyant displaced air weight equals gross weight. Aerodynes require forward motion ($v > 0$) to generate dynamic pressure over lifting area $S$.",
    "takeaways": [
      "ICAO Legal Definition: Aircraft derive atmospheric lift from reactions of air, excluding ground-cushion reactions (hovercraft).",
      "Aerostats (Lighter-Than-Air): Archimedean buoyancy supports the weight without requiring forward airspeed.",
      "Aerodynes (Heavier-Than-Air): Dynamic fluid pressure generated across cambered surfaces supports weight, requiring continuous forward energy."
    ],
    "simDescription": "Compare static buoyant equilibrium of an aerostat gas envelope versus dynamic speed-dependent lift generation of fixed wings.",
    "flowDescription": "Comparison of hydrostatic pressure gradients in gas envelopes versus dynamic boundary layer pressure differentials on wings.",
    "hotspotDescription": "Click the 5 pins to inspect structural and regulatory certification checkpoints of a certified modern aircraft.",
    "hotspots": [
      {
        "id": 1,
        "x": 20,
        "y": 40,
        "title": "Type Certificate Data Plate (FAA/EASA)",
        "spec": "Stainless Steel Embossed Airworthiness Plaque",
        "stress": "Part 23/25 Normal & Transport Category",
        "status": "SERIAL NUMBER RECORDED"
      },
      {
        "id": 2,
        "x": 50,
        "y": 30,
        "title": "Primary Wing-Fuselage Carry-Through Forging",
        "spec": "7050-T7451 Die-Forged Aluminum Spar Joint",
        "stress": "Limit Load Factor: +3.8 G / -1.52 G",
        "status": "ULTRASONICALLY INSPECTED"
      },
      {
        "id": 3,
        "x": 75,
        "y": 35,
        "title": "Empennage Stability Attachment Bulkhead",
        "spec": "Carbon Fiber Multi-Rib Torque Box",
        "stress": "Yaw Bending Moment: 45 kN\u00b7m",
        "status": "AEROELASTICALLY CERTIFIED"
      },
      {
        "id": 4,
        "x": 35,
        "y": 75,
        "title": "Propulsion Pylon Dynamic Isolation Isolator",
        "spec": "Inconel 718 High-Temperature Shear Pins",
        "stress": "Max Continuous Thrust: 28 kN",
        "status": "DUAL FIREWALL SEALED"
      },
      {
        "id": 5,
        "x": 50,
        "y": 85,
        "title": "Emergency Locator Transmitter (ELT 406 MHz)",
        "spec": "Impact-Activated G-Switch & Satellite Beacon",
        "stress": "100G Shock Certified / COSPAS-SARSAT",
        "status": "BATTERY ARMED"
      }
    ],
    "calcTitle": "AIRCRAFT WING LOADING & WEIGHT RATIO CALCULATOR",
    "calcDesc": "Calculate wing loading (W/S) and power-to-weight ratio to determine aircraft category and stall characteristics.",
    "calcParam1": {
      "label": "Maximum Takeoff Weight (MTOW, kg)",
      "min": 500,
      "max": 70000,
      "val": 5400,
      "unit": "kg",
      "step": 100
    },
    "calcParam2": {
      "label": "Reference Wing Area (S, m\u00b2)",
      "min": 10,
      "max": 150,
      "val": 32,
      "unit": "m\u00b2",
      "step": 1
    },
    "tableTitle": "AIRCRAFT CATEGORIZATION MATRIX \u2014 FAA/ICAO AIRWORTHINESS STANDARDS",
    "tableIntro": "Regulatory classification benchmarks across standard civilian and military aircraft categories:",
    "tableHeaders": [
      "CATEGORY",
      "REGULATION",
      "MTOW LIMIT",
      "PASSENGERS",
      "LOAD FACTOR LIMIT",
      "PRIMARY CERTIFICATION"
    ],
    "tableRows": [
      [
        "Light Sport (LSA)",
        "ASTM F2245",
        "600 kg (1,320 lbs)",
        "Max 2",
        "+4.0 G / -2.0 G",
        "Day VFR Recreational"
      ],
      [
        "Normal / Utility",
        "FAA Part 23",
        "Up to 8,618 kg",
        "Up to 19",
        "+3.8 G (Normal) / +4.4 G (Util)",
        "Single/Twin Engine General Aviation"
      ],
      [
        "Transport Category",
        "FAA Part 25",
        "No Upper Limit",
        "Up to 850+",
        "+2.5 G / -1.0 G",
        "Commercial Jetliners (B737, A350)"
      ],
      [
        "Rotorcraft Transport",
        "FAA Part 29",
        "Over 3,175 kg",
        "Up to 44",
        "+3.5 G / -1.0 G",
        "Multi-Engine Offshore/EMS Helicopters"
      ]
    ],
    "envelopeIntro": "The flight envelope of an aircraft defines its certified operating corridor: maximum operating altitude, Vne (never-exceed speed), and maneuver load limits.",
    "integrationIntro": "An aircraft is a system of systems: aerodynamic structures, propulsion, flight controls, electrical power, and avionics working in certified harmony.",
    "redundancyCards": [
      {
        "title": "FAR PART 25 FAIL-SAFE ARCHITECTURE",
        "desc": "All structural components must withstand operational loads even after complete failure of any single primary structural element (damage tolerance doctrine)."
      },
      {
        "title": "WEIGHT AND BALANCE CG ENVELOPE",
        "desc": "Aircraft can only operate within strict forward and aft center-of-gravity (CG) limits to ensure adequate elevator control authority during flare and stall recovery."
      }
    ],
    "quiz": {
      "question": "Under international aviation law (ICAO), why are hovercraft (air-cushion vehicles) legally classified as marine vessels rather than aircraft?",
      "options": [
        "They derive lift from air pressure reacting directly against the earth/water surface, not free atmospheric reaction.",
        "They cannot travel faster than 50 knots.",
        "They do not carry certified aviation altimeters.",
        "They are made exclusively of nautical fiberglass."
      ],
      "correctIndex": 0,
      "rationale": "ICAO Annex 7 excludes machines whose support derives from reactions of air against the surface of the earth or water. True aircraft derive support purely from free atmospheric aerodynamic reaction."
    }
  },
  "4": {
    "domain": "classification",
    "discipline": "AIRCRAFT DESIGN & MORPHOLOGY",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udcd0",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 4: Types and Classification of Aircraft</strong> breaks down the immense diversity of atmospheric flight vehicles by wing design, propulsion architecture, landing gear configuration, and mission capabilities.\n      </p>\n      <p class=\"section-p\">\n        Aircraft are classified across multiple distinct engineering dimensions:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>By Wing Planform & Position:</strong> High-wing (cargo transports, bush planes), mid-wing (aerobatic planes, supersonic fighters), low-wing (commercial jetliners, general aviation), straight wings (low speed), swept wings (transonic cruise), and delta wings (supersonic interceptors).</li>\n        <li><strong>By Number of Wings:</strong> Monoplanes (single wing pair), biplanes (two stacked wings connected by struts), and historical triplanes.</li>\n        <li><strong>By Landing Surface:</strong> Landplanes (wheeled gear), seaplanes / floatplanes (twin pontoons), flying boats (hydrodynamic hull), and amphibians (retractable wheels on floats).</li>\n        <li><strong>By Propulsion:</strong> Piston/propeller, turboprop, turbofan, turbojet, ramjet/scramjet, and modern electric/hybrid eVTOL aircraft.</li>\n      </ul>\n    ",
    "formulaTitle": "WING ASPECT RATIO & SWEPT WING CRITICAL MACH NUMBER",
    "formulaHtml": "$$ AR = \\frac{b^2}{S} \\quad | \\quad M_{\\text{crit, swept}} = \\frac{M_{\\text{crit, straight}}}{\\cos(\\Lambda)} \\quad | \\quad C_{Di} = \\frac{C_L^2}{\\pi \\cdot e \\cdot AR} $$",
    "formulaDesc": "Planform Engineering Relations: Aspect Ratio $AR$ governs induced drag ($C_{Di}$). Wing sweep angle $\\Lambda$ delays shockwave formation by reducing the effective normal Mach number ($M_n = M_\\infty \\cos\\Lambda$).",
    "takeaways": [
      "High Wing vs Low Wing Tradeoffs: High wings offer pendulum lateral stability and ground cargo clearance; low wings provide ground-effect cushioning and shorter landing gear.",
      "Wing Sweep Benefit: Sweeping wings delays transonic wave drag by reducing effective airflow velocity perpendicular to the leading edge.",
      "Aspect Ratio vs Induced Drag: High aspect ratios (sailplanes, U-2) minimize induced drag for ultra-long range, while low aspect ratios (fighters) maximize roll rate and structural strength."
    ],
    "simDescription": "Compare straight, swept, and delta wing planforms, adjusting Mach speed to observe how wing sweep delays transonic shockwave drag.",
    "flowDescription": "Comparative streamline vectors over straight vs swept wings showing spanwise boundary layer flow and crossflow effects.",
    "hotspotDescription": "Click the 5 pins to inspect planform and configuration features across diverse aircraft classifications.",
    "hotspots": [
      {
        "id": 1,
        "x": 22,
        "y": 35,
        "title": "Transonic Wing Sweep Hinge Root (35\u00b0 Sweep)",
        "spec": "7050-T7451 Aluminum-Zinc-Magnesium Extrusion",
        "stress": "Normal Mach Component: Mn = 0.72 at M 0.85 Cruise",
        "status": "SHOCK WAVE DELAYED"
      },
      {
        "id": 2,
        "x": 50,
        "y": 25,
        "title": "High-Aspect-Ratio Wingtip Winglet / Sharklet",
        "spec": "Carbon Fiber Autoclave Cured Aerofoil Tip",
        "stress": "Vortex Induced Drag Reduction: 4.5% Fuel Savings",
        "status": "VORTEX DIFFUSED"
      },
      {
        "id": 3,
        "x": 75,
        "y": 45,
        "title": "Variable-Sweep Pivot Pin (Swing-Wing)",
        "spec": "Maraging 300 Ultra-High-Strength Steel Forging",
        "stress": "Sweep Angle Range: 16\u00b0 (Takeoff) to 68\u00b0 (Supersonic)",
        "status": "BEARING PRELOAD NOMINAL"
      },
      {
        "id": 4,
        "x": 35,
        "y": 75,
        "title": "Amphibian Retractable Float Mechanism",
        "spec": "Marine Grade 5083 Aluminum Alloy Anodized",
        "stress": "Hydrodynamic Wave Impact: 120 kPa at Touchdown",
        "status": "BILGE PUMP DRY"
      },
      {
        "id": 5,
        "x": 85,
        "y": 65,
        "title": "eVTOL Distributed Electric Propulsor Nacelle",
        "spec": "Direct-Drive Permanent Magnet Motor + Inverter",
        "stress": "Continuous Power: 150 kW @ 2,200 RPM",
        "status": "THERMAL LOOP 48\u00b0C"
      }
    ],
    "calcTitle": "WING PLANFORM ASPECT RATIO & INDUCED DRAG SOLVER",
    "calcDesc": "Calculate aspect ratio and induced drag coefficient (CDi) for different wing shapes at cruise lift coefficient.",
    "calcParam1": {
      "label": "Wingspan (b, meters)",
      "min": 8,
      "max": 80,
      "val": 35,
      "unit": "m",
      "step": 1
    },
    "calcParam2": {
      "label": "Wing Area (S, m\u00b2)",
      "min": 10,
      "max": 800,
      "val": 122,
      "unit": "m\u00b2",
      "step": 5
    },
    "tableTitle": "AIRCRAFT CLASSIFICATION DESIGN MATRIX",
    "tableIntro": "Engineering comparisons across major aircraft morphological classes:",
    "tableHeaders": [
      "AIRCRAFT CLASS",
      "WING CONFIG",
      "PROPULSION",
      "TYPICAL SPEED",
      "ASPECT RATIO (AR)",
      "PRIMARY MISSION"
    ],
    "tableRows": [
      [
        "General Aviation (C172)",
        "High Straight Wing",
        "Reciprocating Piston",
        "110\u2013130 kts",
        "7.3 (Moderate)",
        "Pilot Training & Personal"
      ],
      [
        "Commercial Jet (A320/B737)",
        "Low Swept Wing (25\u00b0)",
        "High-Bypass Turbofan",
        "M 0.78 (450 kts)",
        "9.5\u201310.2 (High)",
        "Passenger Transport"
      ],
      [
        "Supersonic Fighter (F-16)",
        "Mid Cropped Delta",
        "Afterburning Turbofan",
        "M 2.0+ (1,200 kts)",
        "3.2 (Low/Agile)",
        "Air Superiority & Strike"
      ],
      [
        "High-Altitude Glider",
        "Mid T-Tail Long Span",
        "None (Unpowered)",
        "45\u201390 kts",
        "28.0\u201332.0 (Extreme)",
        "Thermal Soaring & Research"
      ]
    ],
    "envelopeIntro": "Each aircraft classification operates within a dedicated flight envelope tailored to its structural aspect ratio and engine thermal limits.",
    "integrationIntro": "Airframe classification dictates the flight control architecture: mechanical cables for light GA, hydraulic power for airliners, and fly-by-wire for delta fighters.",
    "redundancyCards": [
      {
        "title": "WING DIHEDRAL LATERAL STABILITY",
        "desc": "Low-wing aircraft feature positive dihedral (wings angled upward) to produce an automatic restoring roll moment during unintended sideslips."
      },
      {
        "title": "SWEEP-INDUCED SPANWISE FLOW CONTROL",
        "desc": "Swept wings induce spanwise boundary-layer drift toward the tips. Wing fences, vortex generators, and stall strips ensure ailerons retain roll authority during near-stall conditions."
      }
    ],
    "quiz": {
      "question": "Why do high-speed commercial jet transports utilize swept wings rather than straight wings?",
      "options": [
        "Wing sweep reduces the component of airflow velocity perpendicular to the leading edge, delaying the onset of shockwave drag.",
        "Swept wings generate more lift at low takeoff speeds.",
        "Swept wings are lighter and cheaper to manufacture than straight wings.",
        "Swept wings eliminate all engine noise."
      ],
      "correctIndex": 0,
      "rationale": "By sweeping the wings backward at angle Lambda, the effective Mach number normal to the leading edge becomes M_n = M_inf * cos(Lambda). This allows the jetliner to cruise closer to the speed of sound without triggering intense transonic shockwave drag."
    }
  },
  "5": {
    "domain": "forces",
    "discipline": "AERODYNAMICS & LIFT GENERATION",
    "chipColor": "#00f0ff",
    "icon": "\u2708\ufe0f",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 5: What Makes an Aircraft Fly?</strong> resolves one of the most widely misunderstood questions in physical science: the exact mechanism of aerodynamic lift generation.\n      </p>\n      <p class=\"section-p\">\n        Popular explanations often rely on the flawed <em>\"Equal Transit Time Fallacy\"</em> (the false claim that air packets split at the leading edge must meet simultaneously at the trailing edge). Wind tunnel flow visualization proves that air flowing over the upper surface arrives at the trailing edge <strong>much faster</strong> than air passing beneath the lower surface.\n      </p>\n      <p class=\"section-p\">\n        True lift generation is governed by two complementary physical laws:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Bernoulli's Principle & Pressure Differentials:</strong> As air flows over a curved, cambered upper surface at an angle of attack, streamlines constrict and accelerate, creating a localized drop in static pressure ($p_{\\text{upper}} < p_\\infty$). The higher static pressure beneath pushes the wing upward.</li>\n        <li><strong>Newton's Third Law & Momentum Deflection:</strong> The wing deflects an enormous mass of air downward (creating <em>downwash</em>). By Newton's Third Law ($F = \\frac{d(mv)}{dt}$), exerting a downward force on air creates an equal and opposite upward aerodynamic force on the wing.</li>\n        <li><strong>The Kutta Condition & Circulation:</strong> Fluid viscosity causes flow to leave the sharp trailing edge smoothly, establishing a bound circulation vortex ($\\Gamma$) around the airfoil that mathematically satisfies the Kutta-Joukowski theorem ($L' = \\rho_\\infty v_\\infty \\Gamma$).</li>\n      </ul>\n    ",
    "formulaTitle": "KUTTA-JOUKOWSKI THEOREM & BERNOULLI-NEWTON LIFT SYNTHESIS",
    "formulaHtml": "$$ L' = \\rho_\\infty v_\\infty \\Gamma \\quad | \\quad p + \\frac{1}{2}\\rho v^2 = p_0 = \\text{const} \\quad | \\quad L = \\dot{m}_{\\text{air}} \\cdot w_{\\text{downwash}} $$",
    "formulaDesc": "Lift Generation Synthesis: Circulation $\\Gamma$ dictates total lift per unit span $L'$. Bernoulli's equation governs the surface static pressure distribution, while Newton's momentum equation accounts for the downward momentum flux $\\dot{m} w$ in the wake.",
    "takeaways": [
      "Equal Transit Time is False: Fluid over the upper surface accelerates far beyond equal transit requirements, creating intense suction.",
      "Pressure Differential & Downwash Are Unified: Low pressure on the upper surface pulls air downward, and the downward deflection pushes the wing upward.",
      "Kutta Condition: The sharp trailing edge forces flow to depart tangentially, creating the starting vortex that establishes circulation around the wing."
    ],
    "simDescription": "Simulate flow streamlines over an airfoil. Adjust angle of attack to observe upper-surface flow acceleration, static pressure drop, and downward wake deflection.",
    "flowDescription": "Navier-Stokes streamline curvature over a lifting airfoil showing upper surface acceleration and trailing edge downwash angle.",
    "hotspotDescription": "Click the 5 pins to inspect critical aerodynamic lift-generation stations on an airfoil section.",
    "hotspots": [
      {
        "id": 1,
        "x": 12,
        "y": 38,
        "title": "Leading Edge Stagnation Point",
        "spec": "Point of Zero Local Velocity (v = 0)",
        "stress": "Static Pressure Equals Total Pitot Pressure P0",
        "status": "STAGNATION STREAMLINE DIVIDING"
      },
      {
        "id": 2,
        "x": 38,
        "y": 20,
        "title": "Upper Surface Suction Peak (Min Pressure)",
        "spec": "Maximum Local Airflow Velocity (v > v\u221e)",
        "stress": "Suction Differential: -8.4 kPa relative to ambient",
        "status": "PRODUCING 70% OF NET LIFT"
      },
      {
        "id": 3,
        "x": 45,
        "y": 70,
        "title": "Lower Surface Compression Zone",
        "spec": "Mild Positive Static Pressure (Cp > 0)",
        "stress": "Positive Pressure: +2.1 kPa pushing upward",
        "status": "PRODUCING 30% OF NET LIFT"
      },
      {
        "id": 4,
        "x": 88,
        "y": 48,
        "title": "Sharp Trailing Edge (Kutta Condition Datum)",
        "spec": "Kutta Condition Flow Separation Boundary",
        "stress": "Upper and Lower Boundary Layers Merge Smoothly",
        "status": "ZERO SINGULARITY AT TE"
      },
      {
        "id": 5,
        "x": 92,
        "y": 65,
        "title": "Downward Downwash Momentum Stream",
        "spec": "Vertical Downward Deflection Velocity (w)",
        "stress": "Downwash Angle: 4.8\u00b0 Downward",
        "status": "NEWTONIAN REACTION UPWARD"
      }
    ],
    "calcTitle": "AIRFOIL LIFT COEFFICIENT & CIRCULATION SOLVER",
    "calcDesc": "Calculate bound circulation (\u0393) and total lift per unit span based on angle of attack and chord length.",
    "calcParam1": {
      "label": "Angle of Attack (\u03b1, degrees)",
      "min": 0,
      "max": 16,
      "val": 5,
      "unit": "\u00b0"
    },
    "calcParam2": {
      "label": "Airfoil Chord Length (c, meters)",
      "min": 0.5,
      "max": 8.0,
      "val": 2.4,
      "unit": "m",
      "step": 0.1
    },
    "tableTitle": "AIRFOIL SURFACE PRESSURE COEFFICIENT (CP) DISTRIBUTION TABLE",
    "tableIntro": "Experimental surface pressure measurements across a NACA 2412 airfoil at 5\u00b0 angle of attack:",
    "tableHeaders": [
      "CHORD STATION (X/C)",
      "UPPER CP (SUCTION)",
      "LOWER CP (PRESSURE)",
      "DELTA-CP (NET LIFT)",
      "LOCAL VELOCITY",
      "FLOW STATUS"
    ],
    "tableRows": [
      [
        "0.00 (Leading Edge)",
        "+1.00 (Stagnation)",
        "+1.00 (Stagnation)",
        "0.00",
        "0.0 kts (Stagnant)",
        "Attached"
      ],
      [
        "0.10 (Suction Peak)",
        "-1.85 (Strong Suction)",
        "+0.25 (Positive Pressure)",
        "2.10 (Maximum Lift)",
        "380 kts (Accelerated)",
        "Laminar Acceleration"
      ],
      [
        "0.40 (Mid-Chord)",
        "-0.72 (Moderate Suction)",
        "+0.12 (Positive Pressure)",
        "0.84",
        "290 kts",
        "Adverse Gradient Start"
      ],
      [
        "0.95 (Trailing Edge)",
        "+0.05 (Neutral)",
        "+0.05 (Neutral)",
        "0.00 (Kutta Balance)",
        "240 kts (Freestream)",
        "Smooth Tangential Exit"
      ]
    ],
    "envelopeIntro": "The lift-generating boundary of an airfoil is limited by the critical stall angle of attack (typically 14\u00b0\u201318\u00b0), beyond which flow detaches from the upper surface.",
    "integrationIntro": "Lift generation creates induced drag and tip vortices that interact with the horizontal tailplane, requiring downwash compensation in longitudinal trim.",
    "redundancyCards": [
      {
        "title": "VORTEX GENERATOR BOUNDARY LAYER CONTROL",
        "desc": "Small angled metal vanes on the wing upper surface shed micro-vortices that re-energize the boundary layer with high-energy freestream air, delaying stall at high angles of attack."
      },
      {
        "title": "CAMBER VARIATION VIA LEADING EDGE SLATS",
        "desc": "Deploying leading edge slats increases airfoil camber and opens a high-energy slot that prevents flow detachment, raising maximum lift coefficient (CLmax) by over 50%."
      }
    ],
    "quiz": {
      "question": "Why is the popular 'Equal Transit Time' theory of aerodynamic lift incorrect?",
      "options": [
        "Air flowing over the upper surface actually arrives at the trailing edge much faster than air flowing beneath, rather than meeting at the same time.",
        "Air cannot flow over curved surfaces without boiling.",
        "Wings do not accelerate air at all.",
        "Lift is produced only by engine thrust directed downward."
      ],
      "correctIndex": 0,
      "rationale": "Pulsed smoke wind tunnel experiments definitively prove that air flowing over the upper suction surface travels significantly faster than required by equal transit time, arriving at the trailing edge well ahead of the lower surface air."
    }
  },
  "6": {
    "domain": "forces",
    "discipline": "FLIGHT DYNAMICS & EQUILIBRIUM",
    "chipColor": "#00f0ff",
    "icon": "\u2696\ufe0f",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 6: The Four Forces of Flight</strong> dissects the dynamic vector equilibrium governing every aircraft in atmospheric transit: <strong>Lift, Weight, Thrust, and Drag</strong>.\n      </p>\n      <p class=\"section-p\">\n        In steady, unaccelerated level flight, Newton's First Law requires that the vector sum of all forces equals zero ($\\Sigma \\vec{F} = 0$). This establishes two simultaneous equilibrium equations:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Vertical Equilibrium:</strong> Aerodynamic Lift produced by the wings must exactly equal total aircraft Weight ($L = W = m \\cdot g$).</li>\n        <li><strong>Horizontal Equilibrium:</strong> Forward propulsive Thrust generated by the powerplants must exactly balance total airframe Drag ($T = D$).</li>\n      </ul>\n      <p class=\"section-p\">\n        Any imbalance results in acceleration: excess thrust ($T > D$) causes horizontal acceleration or climb; excess lift ($L > W$) initiates an upward vertical climb or high-G pull-up. In an unpowered glide ($T = 0$), the aircraft trades gravitational potential energy for airspeed, where the glide ratio is directly determined by the lift-to-drag ratio ($L/D = \\cot\\gamma$).\n      </p>\n    ",
    "formulaTitle": "EQUILIBRIUM EQUATIONS & DRAG POLAR DECOMPOSITION",
    "formulaHtml": "$$ L = W \\quad | \\quad T = D \\quad | \\quad \\tan(\\gamma) = \\frac{D}{L} = \\frac{1}{L/D} \\quad | \\quad C_D = C_{D0} + \\frac{C_L^2}{\\pi \\cdot e \\cdot AR} $$",
    "formulaDesc": "Force Vector Equilibrium: In steady level flight, Lift equals Weight and Thrust equals Drag. Total drag coefficient $C_D$ splits into zero-lift parasite drag $C_{D0}$ and lift-dependent induced drag $C_{Di}$. Minimum drag occurs when $C_{D0} = C_{Di}$.",
    "takeaways": [
      "Steady State Balance: In unaccelerated level flight, Lift exactly balances Weight, and Thrust exactly equals Drag.",
      "Drag Polar Minimum: Minimum total drag speed (Vmd) occurs precisely where parasite drag intersects induced drag.",
      "Glide Distance Optimization: Maximum unpowered glide distance is achieved by flying at the airspeed that maximizes the L/D ratio."
    ],
    "simDescription": "Adjust airspeed and angle of attack to achieve steady flight equilibrium where lift matches weight and thrust overcomes total drag.",
    "flowDescription": "Coupled force vectors at the aircraft center of gravity showing opposing aerodynamic and inertial loads.",
    "hotspotDescription": "Click the 5 pins to inspect the centers of action for the four primary flight force vectors.",
    "hotspots": [
      {
        "id": 1,
        "x": 48,
        "y": 48,
        "title": "Center of Gravity (CG) Weight Datum",
        "spec": "Aircraft Center of Mass Location (m \u00b7 g)",
        "stress": "Total Weight W = 72,000 kg (+1.00 G)",
        "status": "WITHIN CERTIFIED CG ENVELOPE"
      },
      {
        "id": 2,
        "x": 46,
        "y": 20,
        "title": "Wing Center of Pressure Lift Resultant",
        "spec": "Integrated Aerodynamic Surface Pressure",
        "stress": "Net Lift L = 706.3 kN (Balances Weight)",
        "status": "LIFT VECTOR ALIGNED"
      },
      {
        "id": 3,
        "x": 28,
        "y": 62,
        "title": "Engine Pylon Thrust Line Axis",
        "spec": "CFM LEAP-1A Turbofan Thrust Vector",
        "stress": "Net Propulsive Thrust T = 54.2 kN",
        "status": "OVERCOMING TOTAL DRAG"
      },
      {
        "id": 4,
        "x": 65,
        "y": 50,
        "title": "Airframe Total Drag Center",
        "spec": "Form, Friction & Induced Wake Drag",
        "stress": "Total Aerodynamic Drag D = 54.2 kN",
        "status": "L/D RATIO = 13.0:1"
      },
      {
        "id": 5,
        "x": 86,
        "y": 38,
        "title": "Horizontal Tailplane Downforce Trim",
        "spec": "Trimmable Horizontal Stabilizer (THS)",
        "stress": "Negative Lift Lt = -28.5 kN (Pitch Balance)",
        "status": "STATIC MARGIN = 12% MAC"
      }
    ],
    "calcTitle": "LIFT-TO-DRAG RATIO & GLIDE RANGE SOLVER",
    "calcDesc": "Calculate lift-to-drag ratio (L/D) and unpowered glide distance from given altitude.",
    "calcParam1": {
      "label": "Release Altitude (h, feet)",
      "min": 2000,
      "max": 41000,
      "val": 30000,
      "unit": "ft",
      "step": 1000
    },
    "calcParam2": {
      "label": "Aircraft L/D Ratio",
      "min": 6,
      "max": 35,
      "val": 16,
      "unit": "ratio",
      "step": 1
    },
    "tableTitle": "FOUR FORCES FLIGHT TEST SORTIE LOG \u2014 LEVEL & MANEUVER EQUILIBRIUM",
    "tableIntro": "Empirical flight test validation points recording force balance across different flight regimes:",
    "tableHeaders": [
      "REGIME",
      "AIRSPEED",
      "LIFT / WEIGHT RATIO",
      "THRUST / DRAG RATIO",
      "FLIGHT PATH (\u03b3)",
      "FORCE STATE"
    ],
    "tableRows": [
      [
        "Steady Level Cruise",
        "450 kts",
        "1.00 (L = W)",
        "1.00 (T = D)",
        "0.0\u00b0 (Level)",
        "Zero Net Acceleration"
      ],
      [
        "Maximum Rate Climb",
        "280 kts",
        "1.00 (L = W cos\u03b3)",
        "1.32 (T > D)",
        "+8.5\u00b0 (Climbing)",
        "Translational Equilibrium"
      ],
      [
        "Idle Descent / Glide",
        "240 kts",
        "0.99 (L \u2248 W)",
        "0.15 (Idle T << D)",
        "-3.6\u00b0 (Descent)",
        "Potential to Kinetic Trade"
      ],
      [
        "Coordinated 60\u00b0 Bank Turn",
        "320 kts",
        "2.00 (L = 2W)",
        "1.45 (High Drag)",
        "0.0\u00b0 (Level Turn)",
        "2.0G Centripetal Acceleration"
      ]
    ],
    "envelopeIntro": "The thrust-required and thrust-available curves define the minimum flying speed, maximum speed (Vmax), and absolute ceiling.",
    "integrationIntro": "Force equilibrium is maintained via coordinated automated throttle control (autothrottle) and aerodynamic pitch trim systems.",
    "redundancyCards": [
      {
        "title": "MULTI-ENGINE THRUST REDUNDANCY",
        "desc": "FAR Part 25 certification requires twin-engine transports to maintain positive climb gradient (+2.4% second segment) following complete failure of one engine at V1 takeoff speed."
      },
      {
        "title": "AUTOMATIC ELEVATOR TRIM (MACH TRIM)",
        "desc": "As jet transports accelerate into transonic speeds, center of pressure shifts aft (Mach tuck). Automatic pitch trim drives the horizontal stabilizer to maintain level flight equilibrium without pilot yoke force."
      }
    ],
    "quiz": {
      "question": "In steady, unaccelerated level flight at constant altitude and airspeed, what is the exact relationship between the four forces of flight?",
      "options": [
        "Lift equals Weight, and Thrust equals Drag.",
        "Lift is twice the Weight, and Thrust exceeds Drag.",
        "Thrust equals Weight, and Lift equals Drag.",
        "Drag is zero, and Lift exceeds Weight."
      ],
      "correctIndex": 0,
      "rationale": "By Newton's First Law, when an aircraft is moving at a constant velocity without accelerating, the net force in all axes must be zero. Therefore, vertical aerodynamic Lift must exactly equal gravitational Weight (L = W), and forward propulsive Thrust must exactly equal total airframe Drag (T = D)."
    }
  },
  "7": {
    "domain": "atmosphere",
    "discipline": "AVIATION SCIENCE & HUMAN FACTORS",
    "chipColor": "#22d3ee",
    "icon": "\ud83d\udd2c",
    "assetImg": "assets/diagram_atmosphere_weather.jpg",
    "simType": "atmosphere",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 7: Introduction to Aviation Science</strong> synthesizes the scientific disciplines that make safe atmospheric navigation possible: atmospheric thermodynamics, aeromedical human physiology, psychrometrics, and environmental monitoring.\n      </p>\n      <p class=\"section-p\">\n        Aviation exists in a hostile natural environment. As an aircraft climbs into the upper troposphere, atmospheric pressure and ambient oxygen partial pressure decay exponentially. Humans are biologically adapted to survive only within the <em>physiological zone</em> (sea level to 10,000 feet).\n      </p>\n      <p class=\"section-p\">\n        Above 10,000 feet, ambient pressure drops sufficiently to induce <strong>hypoxia</strong> (insufficient oxygen delivery to brain tissues). At FL350 (35,000 ft), the <strong>Time of Useful Consciousness (TUC)</strong> following explosive cabin depressurization is mere 30 to 60 seconds. Understanding gas laws (Boyle's, Dalton's, and Henry's laws) is mandatory for designing environmental control systems, bleed-air cabin pressurization, and emergency oxygen cascades.\n      </p>\n    ",
    "formulaTitle": "DALTON'S GAS PARTIAL PRESSURE & CABIN PRESSURE EQUATIONS",
    "formulaHtml": "$$ P_{\\text{total}} = \\sum p_i \\quad | \\quad p_{\\text{O2}} = 0.2095 \\cdot P_{\\text{ambient}} \\quad | \\quad \\text{TUC}_{\\text{FL350}} \\approx 30\\text{--}60\\text{ sec} $$",
    "formulaDesc": "Aeromedical Gas Relations: Dalton's law dictates that the alveolar oxygen partial pressure ($p_{O2}$) is directly proportional to barometric pressure. At FL350, ambient pressure is 238 hPa, dropping alveolar oxygen below the critical diffusion threshold.",
    "takeaways": [
      "Physiological Zone: Above 10,000 ft cabin altitude, supplemental oxygen or bleed-air pressurization is mandatory to prevent hypoxia.",
      "Time of Useful Consciousness: Higher altitudes dramatically compress crew decision windows (under 15 seconds at FL400).",
      "Standard Atmosphere Baseline: ISA provides the universal reference datum (15\u00b0C, 1013.25 hPa) for flight instruments worldwide."
    ],
    "simDescription": "Simulate atmospheric barometric pressure decay and ambient temperature drop as altitude increases from sea level to 45,000 feet.",
    "flowDescription": "Environmental Control System (ECS) bleed air conditioning cycle from jet engine compressor stage to conditioned passenger cabin air.",
    "hotspotDescription": "Click the 5 pins to inspect aviation science and life-support monitoring stations on a modern transport aircraft.",
    "hotspots": [
      {
        "id": 1,
        "x": 20,
        "y": 42,
        "title": "Flight Crew Quick-Donning Oxygen Mask",
        "spec": "Diluter-Demand 100% Positive Pressure Regulator",
        "stress": "Supply Pressure: 1,800 psi Gaseous O2",
        "status": "DONNABLE IN UNDER 5 SECONDS"
      },
      {
        "id": 2,
        "x": 35,
        "y": 30,
        "title": "Cabin Altitude Pressure Sensor",
        "spec": "Dual Solid-State Barometric Altimeter Switches",
        "stress": "Cabin Pressure Delta: 8.6 psi differential",
        "status": "ALARM SET AT 10,000 FT CABIN ALT"
      },
      {
        "id": 3,
        "x": 58,
        "y": 68,
        "title": "Air Cycle Machine (ACM) Cooling Pack",
        "spec": "Air-to-Air Heat Exchanger & Expansion Turbine",
        "stress": "Turbine Inflow Temp: 210\u00b0C -> Output: +4\u00b0C",
        "status": "AIRFLOW 65 LBS/MIN"
      },
      {
        "id": 4,
        "x": 82,
        "y": 48,
        "title": "Passenger Chemical Oxygen Generators",
        "spec": "Sodium Chlorate / Iron Core Thermal Candle",
        "stress": "Continuous O2 Flow: 15 minutes per seat group",
        "status": "MANIFOLD BAROMETRICALLY ARMED"
      },
      {
        "id": 5,
        "x": 50,
        "y": 85,
        "title": "Total Air Temperature (TAT) Rosemount Sensor",
        "spec": "Platinum Resistance Thermometer with Heated Strut",
        "stress": "TAT = SAT \u00b7 (1 + 0.2 \u00b7 M\u00b2)",
        "status": "DE-ICED & SAMPLED BY ADC"
      }
    ],
    "calcTitle": "CABIN ALTITUDE & OXYGEN PARTIAL PRESSURE CALCULATOR",
    "calcDesc": "Calculate ambient atmospheric pressure and estimated Time of Useful Consciousness (TUC) at selected flight level.",
    "calcParam1": {
      "label": "Flight Altitude (FL)",
      "min": 50,
      "max": 450,
      "val": 350,
      "unit": "FL",
      "step": 10
    },
    "calcParam2": {
      "label": "Cabin Differential Pressure (psi)",
      "min": 0,
      "max": 9.5,
      "val": 8.4,
      "unit": "psi",
      "step": 0.2
    },
    "tableTitle": "ATMOSPHERIC AEROMEDICAL DATA MATRIX \u2014 ALTITUDE VS PHYSIOLOGY",
    "tableIntro": "Standard atmospheric pressure benchmarks and corresponding physiological human endurance thresholds:",
    "tableHeaders": [
      "ALTITUDE / FL",
      "BAROMETRIC PRESSURE",
      "O2 PARTIAL PRESSURE",
      "TEMPERATURE (ISA)",
      "TIME OF USEFUL CONSCIOUSNESS",
      "STATUS"
    ],
    "tableRows": [
      [
        "Sea Level (0 ft)",
        "1013.25 hPa (14.7 psi)",
        "212 hPa (100% norm)",
        "+15.0\u00b0C",
        "Unlimited",
        "Optimal Life Support"
      ],
      [
        "10,000 ft (FL100)",
        "697 hPa (10.1 psi)",
        "146 hPa (69% norm)",
        "-4.8\u00b0C",
        "Hours (Mild Night Vision Loss)",
        "FAA Max Unpressurized"
      ],
      [
        "25,000 ft (FL250)",
        "376 hPa (5.5 psi)",
        "79 hPa (37% norm)",
        "-34.5\u00b0C",
        "3 to 5 minutes",
        "Severe Hypoxia Hazard"
      ],
      [
        "35,000 ft (FL350)",
        "238 hPa (3.5 psi)",
        "50 hPa (24% norm)",
        "-54.3\u00b0C",
        "30 to 60 seconds",
        "Critical Emergency Descent"
      ]
    ],
    "envelopeIntro": "Aircraft operational flight ceilings (e.g. FL430 for commercial airliners) are strictly limited by emergency cabin depressurization descent rate capability.",
    "integrationIntro": "Aviation science directly dictates environmental control systems (ECS), bleed-air regulation, cockpit oxygen masks, and pressurization outflow valves.",
    "redundancyCards": [
      {
        "title": "DUAL ENVIRONMENTAL PACKS (ECS)",
        "desc": "Aircraft carry twin independent air conditioning packs. A single pack can maintain full passenger cabin pressurization and temperature if the other fails."
      },
      {
        "title": "AUTOMATIC EMERGENCY OXYGEN DEPLOYMENT",
        "desc": "If cabin altitude exceeds 14,000 feet, barometric pressure switches automatically unlatch passenger overhead masks and ignite chemical oxygen candles."
      }
    ],
    "quiz": {
      "question": "At typical commercial jetliner cruising altitudes (FL350 / 35,000 feet), what is the estimated Time of Useful Consciousness (TUC) for flight crew following rapid explosive cabin depressurization?",
      "options": [
        "30 to 60 seconds",
        "10 to 15 minutes",
        "45 minutes",
        "Over 2 hours"
      ],
      "correctIndex": 0,
      "rationale": "At FL350, ambient barometric pressure drops to approximately 238 hPa (less than one-quarter of sea-level pressure). Without an immediate supplemental oxygen mask, the acute drop in blood oxygen saturation restricts the Time of Useful Consciousness to only 30 to 60 seconds before cognitive impairment and unconsciousness occur."
    }
  },
  "8": {
    "domain": "atmosphere",
    "discipline": "ATMOSPHERIC PHYSICS & METEOROLOGY",
    "chipColor": "#22d3ee",
    "icon": "\ud83c\udf2a\ufe0f",
    "assetImg": "assets/diagram_atmosphere_weather.jpg",
    "simType": "atmosphere",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 8: Earth's Atmosphere and Flight</strong> details the fluid ocean of air that sustains all aeronautical vehicles. The atmosphere is divided into vertical thermodynamic strata: the <strong>Troposphere</strong> (surface to ~11 km / 36,089 ft), the <strong>Tropopause</strong>, the <strong>Stratosphere</strong> (11 km to 50 km), the Mesosphere, and the Thermosphere.\n      </p>\n      <p class=\"section-p\">\n        Civilian aviation operates almost exclusively within the troposphere and lower stratosphere. The <strong>International Standard Atmosphere (ISA)</strong> established by ICAO defines standard sea-level conditions:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Standard Sea Level Temperature ($T_0$):</strong> $+15.0^\\circ\\text{C}$ ($288.15\\text{ K}$ / $59^\\circ\\text{F}$).</li>\n        <li><strong>Standard Sea Level Pressure ($p_0$):</strong> $1013.25\\text{ hPa}$ ($29.92\\text{ inHg}$ / $101.325\\text{ kPa}$).</li>\n        <li><strong>Standard Air Density ($\\rho_0$):</strong> $1.225\\text{ kg/m}^3$ ($0.002377\\text{ slugs/ft}^3$).</li>\n        <li><strong>Tropospheric Temperature Lapse Rate:</strong> $-6.5^\\circ\\text{C}$ per $1,000\\text{ m}$ ($-1.98^\\circ\\text{C}$ per $1,000\\text{ ft}$) up to $11,000\\text{ m}$, above which the temperature remains constant at $-56.5^\\circ\\text{C}$.</li>\n      </ul>\n      <p class=\"section-p\">\n        Understanding atmospheric density variations is essential for flight safety: high temperatures and low pressure produce <em>high density altitude</em>, degrading wing lift, propeller efficiency, and turbine engine thrust during hot-and-high airfield takeoffs.\n      </p>\n    ",
    "formulaTitle": "ISA LAPSE RATE & HYDROSTATIC PRESSURE EQUATION",
    "formulaHtml": "$$ T(h) = T_0 - L \\cdot h \\quad | \\quad p(h) = p_0 \\cdot \\left(1 - \\frac{L \\cdot h}{T_0}\\right)^{\\frac{g \\cdot M}{R \\cdot L}} \\quad | \\quad \\rho = \\frac{p}{R_s \\cdot T} $$",
    "formulaDesc": "Hydrostatic & Gas Law Formulations: $L = 0.0065\\text{ K/m}$ is standard lapse rate, $g = 9.80665\\text{ m/s}^2$ is gravitational acceleration, $M = 0.0289644\\text{ kg/mol}$ is dry air molar mass, and $R_s = 287.058\\text{ J/(kg}\\cdot\\text{K)}$ is the specific gas constant.",
    "takeaways": [
      "Temperature Lapse Rate: Temperature drops linearly at 6.5\u00b0C per 1,000 meters throughout the troposphere until reaching the isothermal tropopause.",
      "Density Altitude Danger: High temperature or low atmospheric pressure severely reduces air density, increasing required takeoff run lengths.",
      "Altimeter Pressure Settings: Pilots set local QNH (altimeter setting) to read true airfield elevation on the ground and standard 1013.25 hPa above transition altitude."
    ],
    "simDescription": "Observe atmospheric layer transitions from the troposphere through the tropopause (-56.5\u00b0C isothermal boundary) into the calm stratosphere.",
    "flowDescription": "Standard atmospheric pressure and density exponential decay curve plotted against altitude up to 50,000 feet.",
    "hotspotDescription": "Click the 5 pins to inspect barometric sensing instruments and atmospheric sampling stations on the aircraft.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 40,
        "title": "Electrically Heated Pitot Probe",
        "spec": "Direct Dynamic Ram Air Pressure Sensor (P0)",
        "stress": "Dynamic Pressure q = 1/2 \u00b7 \u03c1 \u00b7 v\u00b2",
        "status": "HEATING ELEMENT 28V DC ON"
      },
      {
        "id": 2,
        "x": 35,
        "y": 32,
        "title": "Flush Fuselage Static Pressure Port",
        "spec": "Unperturbed Ambient Static Pressure Tap (P_stat)",
        "stress": "Measures True Local Barometric Pressure",
        "status": "DUAL CROSS-COUPLED"
      },
      {
        "id": 3,
        "x": 55,
        "y": 55,
        "title": "Air Data Computer (ADC) Central Processor",
        "spec": "Honeywell Digital Barometric Air Data Unit",
        "stress": "Computes Calibrated Airspeed, Mach & Altitude",
        "status": "ARINC 429 DATA STREAM VALID"
      },
      {
        "id": 4,
        "x": 78,
        "y": 45,
        "title": "Outside Air Temperature (OAT) Probe",
        "spec": "Rosemount Platinum RTD Static Temp Sensor",
        "stress": "TAT = SAT (1 + 0.2 \u00b7 M\u00b2) = -22.4\u00b0C",
        "status": "TEMP CALIBRATED"
      },
      {
        "id": 5,
        "x": 88,
        "y": 70,
        "title": "Barometric Altimeter Display Dial / Tape",
        "spec": "Subscale Baro Setting Window (QNH / InHg)",
        "stress": "Standard Pressure Setting: 1013.25 hPa / 29.92 inHg",
        "status": "FLIGHT LEVEL EN ROUTE"
      }
    ],
    "calcTitle": "STANDARD ATMOSPHERE (ISA) TEMPERATURE & DENSITY SOLVER",
    "calcDesc": "Calculate ambient temperature, pressure, and air density at any geometric flight altitude under ISA conditions.",
    "calcParam1": {
      "label": "Geometric Altitude (h, meters)",
      "min": 0,
      "max": 15000,
      "val": 10000,
      "unit": "m",
      "step": 500
    },
    "calcParam2": {
      "label": "Sea Level Temp Offset (\u0394ISA, \u00b0C)",
      "min": -20,
      "max": 30,
      "val": 0,
      "unit": "\u00b0C",
      "step": 1
    },
    "tableTitle": "INTERNATIONAL STANDARD ATMOSPHERE (ICAO ISA) PROFILE TABLE",
    "tableIntro": "Official thermodynamic standard values from sea level to the lower stratosphere:",
    "tableHeaders": [
      "ALTITUDE (GEOMETRIC)",
      "TEMPERATURE (ISA)",
      "PRESSURE (hPa)",
      "DENSITY (kg/m\u00b3)",
      "SPEED OF SOUND (kts)",
      "ATMOSPHERIC REGIME"
    ],
    "tableRows": [
      [
        "0 m (0 ft, Sea Level)",
        "+15.0\u00b0C (288.15 K)",
        "1013.25 hPa",
        "1.2250 kg/m\u00b3",
        "661.5 kts (1,225 km/h)",
        "Troposphere Baseline"
      ],
      [
        "3,048 m (10,000 ft)",
        "-4.8\u00b0C (268.34 K)",
        "696.8 hPa",
        "0.9046 kg/m\u00b3",
        "638.6 kts",
        "Standard General Aviation"
      ],
      [
        "9,144 m (30,000 ft)",
        "-44.4\u00b0C (228.71 K)",
        "300.9 hPa",
        "0.4583 kg/m\u00b3",
        "589.6 kts",
        "Subsonic Jet Cruise"
      ],
      [
        "11,000 m (36,089 ft)",
        "-56.5\u00b0C (216.65 K)",
        "226.3 hPa",
        "0.3639 kg/m\u00b3",
        "573.8 kts",
        "Tropopause Isothermal Datum"
      ]
    ],
    "envelopeIntro": "Flight performance drops dramatically at high density altitudes, requiring pilots to verify takeoff performance charts before departure in hot conditions.",
    "integrationIntro": "Atmospheric data feeds directly into primary flight management computers, autothrottle engines, and altimeter encoders.",
    "redundancyCards": [
      {
        "title": "TRIPLE AIR DATA COMPUTERS (ADC 1/2/3)",
        "desc": "Modern airliners incorporate three independent air data systems. The flight control computers cross-compare all three, voting out any single failing or frozen pitot probe."
      },
      {
        "title": "STANDBY PNEUMATIC FLIGHT INSTRUMENTS",
        "desc": "An isolated, battery-backed backup flight instrument connects directly to dedicated auxiliary static ports to maintain airspeed and altitude cues if digital avionics fail."
      }
    ],
    "quiz": {
      "question": "In the standard International Standard Atmosphere (ISA) troposphere below 11,000 meters (36,089 feet), what is the temperature lapse rate with increasing altitude?",
      "options": [
        "-6.5\u00b0C per 1,000 meters (-1.98\u00b0C per 1,000 feet)",
        "-12.0\u00b0C per 1,000 meters",
        "+3.0\u00b0C per 1,000 meters (warming)",
        "Constant temperature (0\u00b0C change)"
      ],
      "correctIndex": 0,
      "rationale": "Under ICAO ISA standards, the troposphere cools at a steady, linear lapse rate of -6.5\u00b0C per 1,000 meters (approximately -1.98\u00b0C or -3.5\u00b0F per 1,000 feet) from sea level (+15\u00b0C) until reaching the isothermal tropopause at 11,000 meters (-56.5\u00b0C)."
    }
  },
  "9": {
    "domain": "terminology",
    "discipline": "AERONAUTICAL TERMINOLOGY & GEOMETRY",
    "chipColor": "#38bdf8",
    "icon": "\ud83d\udcd0",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 9: Essential Aviation Terminology</strong> establishes the standardized engineering and piloting lexicon required for precise aerodynamic communication.\n      </p>\n      <p class=\"section-p\">\n        Mastery of aviation terminology begins with wing and airfoil geometry:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Chord Line:</strong> The straight reference line connecting the leading edge to the trailing edge of an airfoil.</li>\n        <li><strong>Mean Camber Line:</strong> The locus of points equidistant from the upper and lower surfaces of the airfoil. The maximum distance between the camber line and chord line is the <em>camber</em>.</li>\n        <li><strong>Angle of Attack ($\\alpha$):</strong> The acute angle between the wing's chord line and the oncoming <em>relative wind</em> vector. It is purely an aerodynamic angle, distinct from pitch attitude.</li>\n        <li><strong>Angle of Incidence:</strong> The fixed mechanical angle at which the wing is mounted to the aircraft's longitudinal fuselage axis.</li>\n        <li><strong>Aspect Ratio ($AR = b^2/S$):</strong> The ratio of wingspan squared to planform area, governing induced drag.</li>\n        <li><strong>Wing Washout:</strong> A subtle aerodynamic twist along the wingspan (lower angle of incidence at wingtips) ensuring the wing root stalls before the wingtips, preserving aileron roll control during a stall.</li>\n      </ul>\n    ",
    "formulaTitle": "AERODYNAMIC GEOMETRIC EQUATIONS & ASPECT RATIO",
    "formulaHtml": "$$ AR = \\frac{b^2}{S} \\quad | \\quad \\alpha = \\theta - \\gamma \\quad | \\quad \\lambda = \\frac{c_{\\text{tip}}}{c_{\\text{root}}} \\quad | \\quad x_{ac} \\approx 0.25 \\cdot c $$",
    "formulaDesc": "Geometric Terminology: $\\alpha$ (Angle of Attack) equals pitch attitude $\\theta$ minus flight path angle $\\gamma$. Taper ratio $\\lambda$ compares tip to root chord. The aerodynamic center $x_{ac}$ is located approximately at the 25% quarter-chord station.",
    "takeaways": [
      "Angle of Attack vs Pitch Attitude: AoA is relative to the oncoming airflow vector; pitch attitude is relative to the true horizon.",
      "Wing Washout Safety Margin: Root-first stall geometry prevents dangerous uncommanded wing drop and spin entry.",
      "Quarter-Chord Datum: The aerodynamic center is the point where the pitching moment coefficient remains virtually constant with changes in AoA."
    ],
    "simDescription": "Differentiate between pitch attitude (relative to the horizon) and angle of attack (relative to oncoming airflow) during level flight, climbs, and descents.",
    "flowDescription": "Airfoil geometric reference lines showing chord line, mean camber line, stagnation point, and trailing edge departure angle.",
    "hotspotDescription": "Click the 5 pins to inspect foundational geometric datums on an aerodynamic wing profile.",
    "hotspots": [
      {
        "id": 1,
        "x": 12,
        "y": 38,
        "title": "Leading Edge Stagnation Line Datum",
        "spec": "Leading Edge Radius r_le = 1.5% chord",
        "stress": "Stagnation Point Shift with AoA",
        "status": "ATTACHED FLOW"
      },
      {
        "id": 2,
        "x": 40,
        "y": 24,
        "title": "Mean Camber Line Maximum Vertex",
        "spec": "Maximum Camber = 4.0% Chord at 40% Station",
        "stress": "Governs Zero-Lift Angle of Attack (\u03b10l = -3.8\u00b0)",
        "status": "NOMINAL CAMBER"
      },
      {
        "id": 3,
        "x": 52,
        "y": 42,
        "title": "Straight Chord Line Reference Plane",
        "spec": "Straight Geometric Line from LE to TE",
        "stress": "Chord Length c = 3.65 m",
        "status": "GEOMETRIC BASELINE"
      },
      {
        "id": 4,
        "x": 28,
        "y": 42,
        "title": "Quarter-Chord Aerodynamic Center (AC)",
        "spec": "Aerodynamic Center at 25% MAC",
        "stress": "Pitching Moment dCm/d\u03b1 = 0",
        "status": "AERODYNAMICALLY STABLE"
      },
      {
        "id": 5,
        "x": 88,
        "y": 48,
        "title": "Trailing Edge Kutta Datum Point",
        "spec": "Sharp Trailing Edge with 11.5\u00b0 Included Angle",
        "stress": "Upper/Lower Boundary Layers Merge Smoothly",
        "status": "ZERO SINGULARITY"
      }
    ],
    "calcTitle": "WING ASPECT RATIO & TAPER RATIO SOLVER",
    "calcDesc": "Calculate aspect ratio (AR) and taper ratio (\u03bb) for a trapezoidal aircraft wing planform.",
    "calcParam1": {
      "label": "Wingspan (b, meters)",
      "min": 10,
      "max": 75,
      "val": 34,
      "unit": "m",
      "step": 1
    },
    "calcParam2": {
      "label": "Wing Area (S, m\u00b2)",
      "min": 15,
      "max": 450,
      "val": 122,
      "unit": "m\u00b2",
      "step": 5
    },
    "tableTitle": "ESSENTIAL AVIATION TERMINOLOGY & SYMBOL DEFINITIONS",
    "tableIntro": "Standardized ICAO/FAA aerodynamic acronyms and technical definitions:",
    "tableHeaders": [
      "TERM / SYMBOL",
      "OFFICIAL DEFINITION",
      "ENGINEERING UNITS",
      "TYPICAL RANGE",
      "OPERATIONAL RELEVANCE",
      "CERTIFICATION"
    ],
    "tableRows": [
      [
        "AoA (\u03b1)",
        "Angle between chord line and relative wind",
        "Degrees (\u00b0)",
        "-2\u00b0 to +16\u00b0",
        "Primary stall determinant",
        "Part 25 Mandatory"
      ],
      [
        "Aspect Ratio (AR)",
        "Ratio of span squared to wing area (b\u00b2/S)",
        "Dimensionless",
        "6.5 to 11.0 (Jets)",
        "Governs induced drag",
        "Design Optimization"
      ],
      [
        "Washout (Twist)",
        "Geometric decrease in wingtip incidence",
        "Degrees twist (\u00b0)",
        "1.5\u00b0 to 3.5\u00b0",
        "Ensures root stalls before tip",
        "Spin Prevention"
      ],
      [
        "Mean Aerodynamic Chord",
        "Reference chord representing 3D wing",
        "Meters (m)",
        "2.5 m to 7.0 m",
        "Weight & balance CG limits",
        "Weight & Balance"
      ]
    ],
    "envelopeIntro": "Piloting within certified angle-of-attack limits prevents aerodynamic stall; exceeding critical AoA causes flow separation regardless of airspeed.",
    "integrationIntro": "Angle-of-attack sensors feed stall protection computers, activating stick shakers and stick pushers when approaching critical limits.",
    "redundancyCards": [
      {
        "title": "ANGLE OF ATTACK RESOLVER REDUNDANCY",
        "desc": "Aircraft feature two or three independent AOA vanes on opposite sides of the fuselage. Disagree alerts automatically flag erroneous sensor data to the pilots."
      },
      {
        "title": "TACTILE STICK SHAKER & NUDGER",
        "desc": "An independent eccentric electric motor shakes the pilot control yoke at 5 knots above stall speed, providing unmistakable tactile stall warning."
      }
    ],
    "quiz": {
      "question": "What is the exact aerodynamic definition of Angle of Attack (\u03b1)?",
      "options": [
        "The acute angle between the wing's chord line and the relative wind vector.",
        "The angle between the fuselage nose and the horizon.",
        "The angle at which the wing is permanently bolted to the fuselage.",
        "The angle between the flight path and the ground."
      ],
      "correctIndex": 0,
      "rationale": "Angle of Attack (\u03b1) is strictly defined as the acute angle measured between the wing's chord line and the direction of the oncoming freestream airflow (the relative wind). It is distinct from pitch attitude (which is relative to the horizon) and flight path angle (which is relative to the ground)."
    }
  },
  "10": {
    "domain": "foundations",
    "discipline": "AEROSPACE PROFESSIONAL TAXONOMY",
    "chipColor": "#c084fc",
    "icon": "\ud83c\udf10",
    "assetImg": "assets/diagram_space_orbital.jpg",
    "simType": "orbit",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 10: The Difference Between Aeronautics, Aviation and Aerospace Engineering</strong> establishes the precise industrial, physical, and academic boundaries dividing these closely related domains.\n      </p>\n      <p class=\"section-p\">\n        While often used interchangeably in popular media, each term defines a distinct professional realm:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Aeronautics:</strong> The pure science and physical mathematics of flight <em>within Earth's gaseous atmosphere</em> (below 100 km). It encompasses theoretical aerodynamics, fluid mechanics, aeroelasticity, wind tunnel analysis, and airframe structural loads.</li>\n        <li><strong>Aviation:</strong> The practical, operational, commercial, and regulatory industry of atmospheric flight. Aviation encompasses airlines, flight crews, air traffic management (ATC), airport operations, maintenance/MRO, and civil aviation authorities (FAA/EASA/ICAO).</li>\n        <li><strong>Aerospace Engineering:</strong> The overarching technical super-discipline that unites <em>Aeronautics</em> (atmospheric flight) with <em>Astronautics</em> (spaceflight beyond the atmosphere: rocket propulsion, orbital launch vehicles, satellites, re-entry heat shields, and interplanetary probes).</li>\n      </ul>\n      <p class=\"section-p\">\n        The universal dividing line between Aeronautics and Astronautics is the <strong>K\u00e1rm\u00e1n Line (100 km / 62.1 miles altitude)</strong>, where orbital velocity is required to generate sufficient aerodynamic lift to sustain a vehicle's weight.\n      </p>\n    ",
    "formulaTitle": "ATMOSPHERIC FLIGHT VS ORBITAL VELOCITY FORMULATIONS",
    "formulaHtml": "$$ v_{\\text{aero}} \\le M 3.0 \\quad \\text{vs} \\quad v_{\\text{orbital}} = \\sqrt{\\frac{G \\cdot M_E}{R_E + h}} \\approx 7.8\\text{ km/s} \\quad | \\quad h_{\\text{K\u00e1rm\u00e1n}} = 100\\text{ km} $$",
    "formulaDesc": "Domain Boundary Formulations: Aeronautics relies on atmospheric dynamic pressure ($q = \\frac{1}{2}\\rho v^2$) for lift. Astronautics operates where air density is negligible ($\\rho \\approx 0$), relying entirely on orbital mechanics ($v_{\\text{orbital}} \\approx 28,000\\text{ km/h}$) and rocket reaction thrust.",
    "takeaways": [
      "Aeronautics = The Science: Focuses on physical fluid dynamics, thermodynamics, and atmospheric structural design.",
      "Aviation = The Operation: Focuses on airlines, pilots, air traffic control, and civil air transportation networks.",
      "Aerospace = The Unified Discipline: Integrates atmospheric atmospheric flight (aeronautics) with space orbital missions (astronautics)."
    ],
    "simDescription": "Compare atmospheric vehicle flight (relying on air reaction and aerodynamic lift) versus orbital space mechanics (relying on Keplerian orbital velocity).",
    "flowDescription": "Altitude profile chart from sea level across the troposphere, stratosphere, and mesosphere up to the 100 km K\u00e1rm\u00e1n line boundary.",
    "hotspotDescription": "Click the 5 pins to inspect operational infrastructure stations across Aeronautics, Aviation, and Spaceflight.",
    "hotspots": [
      {
        "id": 1,
        "x": 15,
        "y": 38,
        "title": "Aeronautical Wind Tunnel Research Facility",
        "spec": "Transonic Closed-Loop Cryogenic Wind Tunnel",
        "stress": "Re = 40 \u00d7 10\u2076 at M 0.85 (Aeronautics Domain)",
        "status": "DATA CORRELATED"
      },
      {
        "id": 2,
        "x": 42,
        "y": 30,
        "title": "Airline Operations Control Center (AOCC)",
        "spec": "Global Airline Dispatch & Fleet Management",
        "stress": "3,400 Commercial Sorties Daily (Aviation Domain)",
        "status": "ATC NETWORK SYNCHRONIZED"
      },
      {
        "id": 3,
        "x": 62,
        "y": 45,
        "title": "Air Traffic Control En-Route Radar Facility",
        "spec": "Secondary Surveillance Radar & ADS-B Receiver",
        "stress": "RVSM 1,000 ft Vertical Separation Enforced",
        "status": "AIRSPACE ACTIVE"
      },
      {
        "id": 4,
        "x": 75,
        "y": 65,
        "title": "K\u00e1rm\u00e1n Line Altitude Boundary (100 km)",
        "spec": "Physical Limit of Atmospheric Aerodynamic Lift",
        "stress": "Altitude h = 100,000 m / 328,084 ft",
        "status": "LEGAL SPACEFRONTIER"
      },
      {
        "id": 5,
        "x": 88,
        "y": 25,
        "title": "Orbital Spacecraft Launch Complex",
        "spec": "Multi-Stage Cryogenic Liquid Rocket Booster",
        "stress": "Orbital Insertion Velocity: 7,800 m/s (Aerospace)",
        "status": "ORBIT ACHIEVED"
      }
    ],
    "calcTitle": "AERODYNAMIC LIFT VS ORBITAL CENTRIFUGAL FORCE SOLVER",
    "calcDesc": "Calculate whether vehicle support is dominated by aerodynamic wing lift or orbital centrifugal acceleration at given altitude and speed.",
    "calcParam1": {
      "label": "Vehicle Velocity (v, km/h)",
      "min": 500,
      "max": 28000,
      "val": 900,
      "unit": "km/h",
      "step": 500
    },
    "calcParam2": {
      "label": "Altitude (h, km)",
      "min": 0,
      "max": 120,
      "val": 11,
      "unit": "km",
      "step": 1
    },
    "tableTitle": "COMPARATIVE TAXONOMY: AERONAUTICS VS AVIATION VS AEROSPACE",
    "tableIntro": "Structural and professional breakdown of the three aerospace fields:",
    "tableHeaders": [
      "DIMENSION",
      "AERONAUTICS",
      "AVIATION",
      "AEROSPACE ENGINEERING",
      "PRIMARY REGULATION",
      "OPERATING DOMAIN"
    ],
    "tableRows": [
      [
        "Core Focus",
        "Physical science & flight physics",
        "Commercial & civil flight operation",
        "Atmospheric & space vehicle design",
        "ICAO / NASA",
        "Earth Atmosphere (<100 km)"
      ],
      [
        "Primary Personnel",
        "Aerodynamicists, test pilots, CFD engineers",
        "Airline pilots, ATC controllers, dispatchers",
        "Rocket propulsion, satellite & systems engineers",
        "FAA / EASA / IATA",
        "Global Civil Air Transport"
      ],
      [
        "Key Milestone",
        "Wright Flyer (1903) & Cayley (1799)",
        "First Commercial Flight (1914)",
        "Sputnik (1957) & Apollo 11 (1969)",
        "FAR / CS Part 25/121",
        "Surface to Low Earth Orbit"
      ],
      [
        "Vehicles",
        "Airplanes, gliders, helicopters, UAVs",
        "Airliners, business jets, cargo fleets",
        "Rockets, space stations, jetliners, eVTOL",
        "FAA Part 400 (Space)",
        "Earth Atmosphere to Deep Space"
      ]
    ],
    "envelopeIntro": "The aeronautical envelope terminates at the K\u00e1rm\u00e1n line, where the atmospheric density is so low that aerodynamic lift speed equals orbital velocity.",
    "integrationIntro": "Modern aerospace companies employ cross-functional teams spanning aerodynamicists (aeronautics), flight operations (aviation), and space systems engineers.",
    "redundancyCards": [
      {
        "title": "REGULATORY AIRWORTHINESS CERTIFICATION",
        "desc": "Aeronautical vehicles must secure a Type Certificate (FAR Part 25) proving fail-safe structural redundancy before civil aviation operators can enter commercial service."
      },
      {
        "title": "INTERNATIONAL CIVIL AVIATION TREATIES",
        "desc": "Under the 1944 Chicago Convention, 193 ICAO member states harmonize airspace sovereignty, pilot licensing, and accident investigation protocols worldwide."
      }
    ],
    "quiz": {
      "question": "What is the internationally recognized altitude boundary (the K\u00e1rm\u00e1n Line) that officially separates Aeronautics (atmospheric flight) from Astronautics (spaceflight)?",
      "options": [
        "100 km (62.1 miles / 328,000 feet)",
        "10,000 meters (32,800 feet)",
        "300 km (186 miles)",
        "12 km (39,000 feet)"
      ],
      "correctIndex": 0,
      "rationale": "The K\u00e1rm\u00e1n Line, named after Hungarian-American physicist Theodore von K\u00e1rm\u00e1n, is established at an altitude of 100 kilometers (62.1 miles). At this altitude, Earth's atmosphere is so thin that an aircraft would need to fly faster than orbital velocity (~28,000 km/h) to generate sufficient aerodynamic lift to support its weight, marking the physical and legal boundary of spaceflight."
    }
  },
  "11": {
    "domain": "structure",
    "discipline": "AIRFRAME ANATOMY & STRUCTURES",
    "chipColor": "#00ff9d",
    "icon": "\u2708\ufe0f",
    "assetImg": "assets/diagram_structures_gear.jpg",
    "simType": "structure",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 11: The Main Parts of an Aircraft</strong> deconstructs the complete physical architecture of a heavier-than-air flight vehicle. Every certified fixed-wing aircraft integrates five foundational airframe modules:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Fuselage:</strong> The central structural body housing flight crew, passengers, cargo, and critical avionics suites, acting as the structural hub linking wings and empennage.</li>\n        <li><strong>Wings:</strong> The primary aerodynamic lifting surfaces engineered with internal multi-spar torsion boxes, integral \"wet\" fuel storage, and high-lift control devices.</li>\n        <li><strong>Empennage (Tail Assembly):</strong> The aft stabilizing surfaces comprising the vertical stabilizer/rudder for directional yaw control and the horizontal stabilizer/elevator for longitudinal pitch control.</li>\n        <li><strong>Powerplant (Nacelles & Pylons):</strong> Jet engines, turboprops, or piston power units that produce forward thrust, attached via fail-safe pylons with vibration isolators.</li>\n        <li><strong>Landing Gear:</strong> Retractable wheeled or ski assemblies designed with oleo-pneumatic shock absorbers to cushion landing loads and provide ground steering and braking.</li>\n      </ul>\n      <p class=\"section-p\">\n        In this chapter, students trace primary load paths: how aerodynamic lift generated by the wings transfers through the heavy center wing carry-through box to support the weight of the fuselage.\n      </p>\n    ",
    "formulaTitle": "AIRFRAME WEIGHT FRACTION & LIMIT LOAD FACTOR EQUATIONS",
    "formulaHtml": "$$ W_{\\text{gross}} = W_{\\text{empty}} + W_{\\text{fuel}} + W_{\\text{payload}} \\quad | \\quad n = \\frac{L}{W} \\le n_{\\text{limit}} \\approx +2.5\\text{ G to }+3.8\\text{ G} $$",
    "formulaDesc": "Structural Load & Weight Relations: The structural airframe empty weight fraction typically comprises 45\u201355% of maximum takeoff weight (MTOW). All main structural joints must withstand certified limit maneuver load factor $n$ without permanent plastic deformation.",
    "takeaways": [
      "Five Core Modules: Fuselage, wings, empennage, landing gear, and powerplants form the universal airframe architecture.",
      "Primary Load Transfer: The center wing carry-through box bears the massive bending moments where wing lift joins fuselage mass.",
      "Damage Tolerance Doctrine: FAR Part 25 mandates multiple independent load paths so the failure of any single component cannot cause airframe separation."
    ],
    "simDescription": "Simulate structural load paths across the five airframe assemblies under positive G-maneuvers and gust loads.",
    "flowDescription": "Finite element stress flow visualization through the wing-fuselage carry-through joint and empennage attachment bulkheads.",
    "hotspotDescription": "Click the 5 pins to inspect structural connection nodes between the five main airframe assemblies.",
    "hotspots": [
      {
        "id": 1,
        "x": 22,
        "y": 42,
        "title": "Flight Deck Forward Pressure Shell",
        "spec": "2024-T3 Clad Aluminum Monocoque Nose",
        "stress": "Differential Pressure: 8.6 psi cabin load",
        "status": "PRESSURE INTEGRITY CERTIFIED"
      },
      {
        "id": 2,
        "x": 48,
        "y": 32,
        "title": "Center Wing Box Carry-Through Forging",
        "spec": "7050-T7451 Die-Forged Aluminum Spar Joint",
        "stress": "Root Bending Moment: 18.4 MN\u00b7m (+2.5G)",
        "status": "ULTRASONICALLY VERIFIED"
      },
      {
        "id": 3,
        "x": 36,
        "y": 74,
        "title": "Turbofan Engine Pylon Structural Truss",
        "spec": "Ti-6Al-4V Titanium Alloy Dynamic Mount",
        "stress": "Thrust Load: 120 kN per pylon link",
        "status": "FAILSAFE DUAL PIN MOUNT"
      },
      {
        "id": 4,
        "x": 52,
        "y": 78,
        "title": "Main Landing Gear Trunnion Support Forging",
        "spec": "300M Ultra-High-Strength Alloy Steel",
        "stress": "Touchdown Sink Rate Load: 480 kN vertical",
        "status": "FATIGUE LIFE > 60,000 CYCLES"
      },
      {
        "id": 5,
        "x": 84,
        "y": 35,
        "title": "Empennage Torque Box Attachment Bulkhead",
        "spec": "Carbon Fiber Epoxy Multi-Rib Bulkhead",
        "stress": "Tailplane Pitching Moment: 320 kN\u00b7m",
        "status": "AEROELASTIC CLEARANCE VALID"
      }
    ],
    "calcTitle": "AIRCRAFT WEIGHT FRACTION & STRUCTURAL PAYLOAD SOLVER",
    "calcDesc": "Calculate empty weight fraction and maximum fuel/payload capacity based on airframe structural empty weight.",
    "calcParam1": {
      "label": "Max Takeoff Weight (MTOW, kg)",
      "min": 2000,
      "max": 300000,
      "val": 75000,
      "unit": "kg",
      "step": 1000
    },
    "calcParam2": {
      "label": "Operating Empty Weight (OEW, kg)",
      "min": 1000,
      "max": 180000,
      "val": 42000,
      "unit": "kg",
      "step": 1000
    },
    "tableTitle": "MAIN AIRCRAFT ASSEMBLIES \u2014 STRUCTURAL WEIGHT FRACTION MATRIX",
    "tableIntro": "Typical certified commercial transport weight distribution across the five primary airframe modules:",
    "tableHeaders": [
      "ASSEMBLY",
      "PRIMARY MATERIAL",
      "TYPICAL WEIGHT %",
      "PRIMARY LOAD TYPE",
      "CRITICAL DESIGN CASE",
      "CERTIFICATION"
    ],
    "tableRows": [
      [
        "Wing Assembly",
        "Carbon Fiber / 7050-T7451 Al",
        "28\u201332% of Empty Weight",
        "Bending, torsion & shear",
        "+2.5G Maneuver & 50 fps Gust",
        "FAR 25.337"
      ],
      [
        "Fuselage Assembly",
        "Al-Li 2195 / Carbon Prepreg",
        "25\u201328% of Empty Weight",
        "Hoop tension, axial bending",
        "Cabin Pressurization & Ditching",
        "FAR 25.365"
      ],
      [
        "Empennage Assembly",
        "Carbon Fiber / Honeycomb",
        "4\u20136% of Empty Weight",
        "Asymmetric yaw & pitch moment",
        "Engine Failure (Vmc) & Rudder Gust",
        "FAR 25.351"
      ],
      [
        "Landing Gear Assembly",
        "300M Steel / Titanium",
        "9\u201312% of Empty Weight",
        "Impact compression, braking torque",
        "10 fps Sink Rate Touchdown",
        "FAR 25.723"
      ]
    ],
    "envelopeIntro": "Operating limits for all main parts are documented in the Aircraft Flight Manual (AFM) and Weight & Balance manual.",
    "integrationIntro": "The five main modules are interconnected with hydraulic lines, electrical harnesses, and flight control databuses running through pressurized raceways.",
    "redundancyCards": [
      {
        "title": "FAIL-SAFE DUAL LOAD PATH STRATEGY",
        "desc": "All primary joints connecting the wing, fuselage, and pylon incorporate redundant shear pins and dual-lug geometry to withstand full flight limit loads even if one path cracks."
      },
      {
        "title": "LIGHTNING STRIKE BONDING STRIPS",
        "desc": "Aluminum foil mesh embedded within composite wings and empennage provides a continuous electrical grounding path, safely channeling up to 200,000-amp lightning strikes into static wicks."
      }
    ],
    "quiz": {
      "question": "Which major structural component serves as the primary load-bearing bridge carrying wing bending moments through the aircraft fuselage?",
      "options": [
        "Center Wing Carry-Through Box",
        "Nose Radome Fairing",
        "Passenger Cabin Floor Beams",
        "Aft Galley Partition"
      ],
      "correctIndex": 0,
      "rationale": "The Center Wing Box (carry-through box) is the heaviest and most heavily stressed structural forging in the airframe. It spans the fuselage, providing continuous mechanical transfer of upward wing bending moments into the center fuselage frames."
    }
  },
  "12": {
    "domain": "structure",
    "discipline": "FUSELAGE DESIGN & STRUCTURAL MECHANICS",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udcd0",
    "assetImg": "assets/diagram_structures_gear.jpg",
    "simType": "structure",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 12: The Aircraft Fuselage</strong> investigates the design, structural architecture, and pressurization mechanics of the primary aircraft body. The fuselage has evolved from early fabric-covered wooden and steel trusses into modern <strong>semi-monocoque</strong> construction.\n      </p>\n      <p class=\"section-p\">\n        In semi-monocoque construction, internal skeletal members and thin outer skin share loads cooperatively:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Formers & Ring Frames:</strong> Circumferential ring frames establish the aerodynamic cross-sectional shape and prevent thin-walled shell buckling.</li>\n        <li><strong>Longitudinal Stringers & Longerons:</strong> Extruded beams running along the length of the fuselage that absorb axial tension and compression loads during flight maneuvers.</li>\n        <li><strong>Stressed Outer Skin:</strong> Thin aluminum-lithium alloy or carbon-epoxy composite skin that carries torsional shear and cabin pressurization tension.</li>\n        <li><strong>Pressure Bulkheads:</strong> Dished hemispherical or spherical domes at the forward flight deck and aft tailcone that seal the passenger pressure vessel.</li>\n      </ul>\n      <p class=\"section-p\">\n        At cruising altitude (FL370), the cabin is pressurized to an equivalent 8,000 ft altitude (~10.9 psi), creating an internal differential pressure of roughly <strong>8.6 psi (59 kPa)</strong> relative to ambient air. This internal pressure creates two primary stress fields: <em>hoop stress</em> (acting circumferentially) and <em>longitudinal stress</em> (acting along the fuselage axis). Hoop stress is exactly twice as large as longitudinal stress.\n      </p>\n    ",
    "formulaTitle": "CABIN PRESSURIZATION HOOP & LONGITUDINAL STRESS FORMULAS",
    "formulaHtml": "$$ \\sigma_{\\text{hoop}} = \\frac{\\Delta p \\cdot r}{t} \\quad | \\quad \\sigma_{\\text{longitudinal}} = \\frac{\\Delta p \\cdot r}{2t} = \\frac{1}{2} \\sigma_{\\text{hoop}} \\quad | \\quad \\Delta p \\approx 8.6\\text{ psi (59.3 kPa)} $$",
    "formulaDesc": "Thin-Walled Cylindrical Pressure Vessel Equations: $\\Delta p$ is differential pressure, $r$ is fuselage radius, and $t$ is skin thickness. Circumferential hoop stress is double the longitudinal stress, dictating that longitudinal fuselage seams require double-lap shear fasteners and titanium tear straps.",
    "takeaways": [
      "Semi-Monocoque Construction: Frame rings maintain cross-section, stringers resist longitudinal bending, and stressed skin carries shear and pressure.",
      "Hoop Stress Dominance: Circumferential hoop stress is exactly twice as large as longitudinal stress in pressurized cylindrical fuselages.",
      "Fail-Safe Tear Straps: Circumferential titanium bands bonded beneath the skin arrest fatigue cracks before they reach critical catastrophic length."
    ],
    "simDescription": "Simulate stress distribution across semi-monocoque fuselage skin panels and ring frames under differential cabin pressurization cycles.",
    "flowDescription": "Stress field vector lines illustrating hoop tension across skin seams and stress concentrations around window and door cutouts.",
    "hotspotDescription": "Click the 5 pins to inspect structural fuselage pressure vessel components and frame reinforcements.",
    "hotspots": [
      {
        "id": 1,
        "x": 16,
        "y": 42,
        "title": "Forward Cockpit Pressure Bulkhead",
        "spec": "Dished 2024-T3 Aluminum Alloy Bulkhead",
        "stress": "Design Pressure: 18.2 psi (2.0x Proof)",
        "status": "PRESSURIZED ENCLOSURE SEALED"
      },
      {
        "id": 2,
        "x": 42,
        "y": 28,
        "title": "Stressed Aluminum-Lithium 2195 Skin",
        "spec": "Chemically Milled Skin Sheet (t = 1.6 mm)",
        "stress": "Hoop Stress: \u03c3 = 142 MPa (Certified Limit: 280 MPa)",
        "status": "CORROSION INHIBITED"
      },
      {
        "id": 3,
        "x": 58,
        "y": 48,
        "title": "Circumferential Frame & Tear Strap Grid",
        "spec": "7075-T6 Extruded Z-Frames + Bonded Ti Straps",
        "stress": "Fatigue Crack Arrest Threshold: 22 MPa\u00b7m^0.5",
        "status": "FAILSAFE GRID INTACT"
      },
      {
        "id": 4,
        "x": 72,
        "y": 38,
        "title": "Window Belt Reinforcement Doubler",
        "spec": "CNC-Machined Aluminum Forging Surrounding Acrylic",
        "stress": "Stress Concentration Factor Kt = 1.42 (Rounded Corners)",
        "status": "EDDY CURRENT TESTED"
      },
      {
        "id": 5,
        "x": 86,
        "y": 45,
        "title": "Aft Spherical Pressure Bulkhead Dome",
        "spec": "Toray T800 Carbon Fiber Composite Hemispherical Dome",
        "stress": "Resists Net Aft Pressure Thrust: 620 kN",
        "status": "PRESSURE PROOF TESTED"
      }
    ],
    "calcTitle": "FUSELAGE HOOP STRESS & SKIN THICKNESS SOLVER",
    "calcDesc": "Calculate circumferential hoop stress (\u03c3_hoop) and safety factor based on cabin differential pressure and skin thickness.",
    "calcParam1": {
      "label": "Cabin Differential Pressure (psi)",
      "min": 5.0,
      "max": 12.0,
      "val": 8.6,
      "unit": "psi",
      "step": 0.2
    },
    "calcParam2": {
      "label": "Fuselage Radius (r, meters)",
      "min": 1.2,
      "max": 3.5,
      "val": 1.95,
      "unit": "m",
      "step": 0.05
    },
    "tableTitle": "FUSELAGE STRUCTURAL PRESSURIZATION & FATIGUE TESTING MATRIX",
    "tableIntro": "Full-scale airframe fatigue water tank test results simulating 90,000 flight cycles (3x design life):",
    "tableHeaders": [
      "SIMULATED FLIGHTS",
      "CABIN CYCLES",
      "MEASURED HOOP STRAIN",
      "CRACK PROPAGATION",
      "TEAR STRAP ACTION",
      "INSPECTION STATUS"
    ],
    "tableRows": [
      [
        "15,000 Flights",
        "15,000 Cycles",
        "820 microstrain",
        "Zero Cracks Detected",
        "Baseline Intact",
        "Eddy Current Scan Nominal"
      ],
      [
        "30,000 Flights",
        "30,000 Cycles (Design Life)",
        "845 microstrain",
        "0.2 mm Micro-Fretting at Fastener #42",
        "Contained",
        "Ultrasonic Verification Passed"
      ],
      [
        "60,000 Flights",
        "60,000 Cycles (2x Life)",
        "870 microstrain",
        "1.4 mm Fatigue Crack at Lap Seam",
        "Crack arrested by Ti strap",
        "Fail-Safe Redundancy Verified"
      ],
      [
        "90,000 Flights",
        "90,000 Cycles (3x Life)",
        "890 microstrain",
        "No catastrophic growth",
        "Structure holds 1.5x limit pressure",
        "FAR 25.571 Certified"
      ]
    ],
    "envelopeIntro": "The fuselage pressurization schedule automatically manages the cabin climb rate to ensure passenger comfort and prevent structural overpressure.",
    "integrationIntro": "Fuselage skin integrity is preserved through bonded composite doublers, rubber pressure seals around all service doors, and dual outflow valves.",
    "redundancyCards": [
      {
        "title": "DUAL INDEPENDENT OUTFLOW VALVES",
        "desc": "Two independent electric motor-driven outflow valves at the lower aft fuselage modulate cabin pressure exhaust. If one valve jams, the second handles full relief capacity."
      },
      {
        "title": "PNEUMATIC SAFETY RELIEF POPPET VALVES",
        "desc": "Dual mechanical spring-loaded relief valves automatically pop open if cabin differential pressure ever exceeds 9.1 psi, preventing catastrophic fuselage overpressurization."
      }
    ],
    "quiz": {
      "question": "In a pressurized cylindrical aircraft fuselage, how does the circumferential hoop stress compare to the longitudinal axial stress?",
      "options": [
        "Hoop stress is exactly twice as large as longitudinal stress.",
        "Longitudinal stress is four times larger than hoop stress.",
        "Hoop stress and longitudinal stress are completely identical.",
        "Hoop stress is zero because the fuselage is cylindrical."
      ],
      "correctIndex": 0,
      "rationale": "By thin-walled cylinder pressure vessel theory, circumferential hoop stress is \u03c3_hoop = (\u0394p \u00b7 r) / t, while longitudinal stress is \u03c3_long = (\u0394p \u00b7 r) / (2t). Thus, hoop stress is always exactly two times greater than longitudinal stress, which is why longitudinal fuselage lap joints are subject to the highest fatigue stress."
    }
  },
  "13": {
    "domain": "structure",
    "discipline": "WING AERODYNAMICS & STRUCTURAL TORSION BOX",
    "chipColor": "#00ff9d",
    "icon": "\ud83e\udeb6",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 13: Wings and Their Functions</strong> provides a comprehensive analysis of the primary lifting organs of an aircraft. A modern wing is not merely a shaped plate, but an intensely optimized multi-spar torsion box that stores fuel, mounts powerplants, houses control surfaces, and endures immense aerodynamic bending moments.\n      </p>\n      <p class=\"section-p\">\n        The structural anatomy of a modern cantilever wing comprises:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Spars (Front & Rear):</strong> Heavy spanwise beams with forged flanges (spar caps) and vertical shear webs that carry upward bending moments and vertical shear forces.</li>\n        <li><strong>Ribs:</strong> Chordwise structural bulkheads that maintain the airfoil shape, distribute air loads from the skin to the spars, and act as fuel tank baffle bulkheads.</li>\n        <li><strong>Skin & Stringers:</strong> Stressed upper and lower skin stiffened by spanwise stringers. In positive-G flight, the upper skin is loaded in compression (vulnerable to buckling) while the lower skin is in tension (vulnerable to fatigue cracking).</li>\n        <li><strong>Integral Fuel Tanks ('Wet Wing'):</strong> The sealed interior cavity between the front and rear spars forms the aircraft's fuel storage, keeping fuel weight centered to relieve wing root bending in flight.</li>\n      </ul>\n      <p class=\"section-p\">\n        Aerodynamically, wings generate <strong>induced drag</strong> caused by high-pressure air beneath the wing curling around the wingtips into the lower-pressure upper surface, creating powerful wingtip vortices. Winglets, sharklets, and raked wingtips diffuse these vortices, reducing fuel burn by 3% to 5%.\n      </p>\n    ",
    "formulaTitle": "WING BENDING MOMENT & INDUCED DRAG FORMULAS",
    "formulaHtml": "$$ \\sigma_{\\text{bending}} = \\frac{M(y) \\cdot z}{I_{xx}} \\quad | \\quad C_{Di} = \\frac{C_L^2}{\\pi \\cdot e \\cdot AR} \\quad | \\quad \\Delta D_{\\text{induced}} \\approx -4.5\\% $$",
    "formulaDesc": "Aero-Structural Formulations: $M(y)$ is the spanwise bending moment created by lift acting along the semispan. Induced drag coefficient $C_{Di}$ is inversely proportional to aspect ratio $AR$ and Oswald efficiency factor $e$. High aspect ratios and winglets minimize vortex drag.",
    "takeaways": [
      "Torsion Box Strength: The front spar, rear spar, ribs, and stressed skins form a rigid closed box capable of resisting extreme bending and twisting.",
      "Wing Bending Relief: Storing fuel inside the wings counteracts upward aerodynamic lift during flight, significantly reducing bending stress at the wing root.",
      "Wingtip Vortex Diffusion: Winglets reduce induced drag by blocking the spanwise flow of high-pressure air around the wingtip."
    ],
    "simDescription": "Observe spanwise wing lift distribution and induced vortex shedding at wingtips. Adjust aspect ratio to see induced drag reduction.",
    "flowDescription": "3D CFD visualization of wingtip vortex rollout and spanwise boundary-layer flow across a swept commercial wing.",
    "hotspotDescription": "Click the 5 pins to inspect structural and aerodynamic stations along a cantilever transport wing.",
    "hotspots": [
      {
        "id": 1,
        "x": 20,
        "y": 38,
        "title": "Front Spar Titanium Upper Cap",
        "spec": "Ti-6Al-4V Grade 5 Forged Flange",
        "stress": "Compressive Bending Stress: 310 MPa (+2.5G)",
        "status": "BUCKLING MARGIN > 35%"
      },
      {
        "id": 2,
        "x": 48,
        "y": 32,
        "title": "Integral 'Wet Wing' Fuel Cell Bay",
        "spec": "Fluorosilicone Sealed Aluminum-Lithium Tank",
        "stress": "Hydraulic Fuel Surge Load: 45 kPa during gust",
        "status": "ANTI-SLOSH BAFFLES ARMED"
      },
      {
        "id": 3,
        "x": 65,
        "y": 42,
        "title": "Rear Spar Control Surface Hinge Line",
        "spec": "7050-T7451 Extruded Spar with Steel Hinge Lugs",
        "stress": "Flap Deployment Shear: 82 kN",
        "status": "TRACK ALIGNED"
      },
      {
        "id": 4,
        "x": 88,
        "y": 24,
        "title": "Canted Blended Winglet Aerodynamic Tip",
        "spec": "Toray Carbon Fiber Prepreg Autoclave Shell",
        "stress": "Vortex Induced Drag Reduced by 4.2%",
        "status": "VORTEX DISSIPATED"
      },
      {
        "id": 5,
        "x": 35,
        "y": 68,
        "title": "Engine Pylon Wing Mount Thrust Rib",
        "spec": "Machined 7050 Aluminum Heavy Forging Rib #8",
        "stress": "Transfers 140 kN Turbofan Thrust to Wing Box",
        "status": "STRUCTURAL HEALTH NOMINAL"
      }
    ],
    "calcTitle": "WING BENDING STRESS & INDUCED DRAG SOLVER",
    "calcDesc": "Calculate induced drag coefficient and root bending moment based on wingspan, lift coefficient, and aspect ratio.",
    "calcParam1": {
      "label": "Lift Coefficient (CL)",
      "min": 0.2,
      "max": 1.6,
      "val": 0.52,
      "unit": "CL",
      "step": 0.02
    },
    "calcParam2": {
      "label": "Aspect Ratio (AR)",
      "min": 6.0,
      "max": 15.0,
      "val": 9.8,
      "unit": "AR",
      "step": 0.2
    },
    "tableTitle": "WING STRUCTURAL & AERODYNAMIC TEST POLAR MATRIX",
    "tableIntro": "Static load testing and wind tunnel polar measurements across certified flight conditions:",
    "tableHeaders": [
      "TEST CONDITION",
      "LIFT FORCE",
      "TIP DEFLECTION",
      "ROOT BENDING MOMENT",
      "INDUCED DRAG (CDi)",
      "STRUCTURAL STATUS"
    ],
    "tableRows": [
      [
        "1.0G Level Cruise",
        "720 kN",
        "0.85 m upward",
        "7.8 MN\u00b7m",
        "0.0125",
        "Nominal In-Flight Shape"
      ],
      [
        "+2.5G Limit Maneuver",
        "1,800 kN",
        "2.40 m upward",
        "19.5 MN\u00b7m",
        "0.0780",
        "Elastic Deflection / No Yield"
      ],
      [
        "+3.75G Ultimate (150%)",
        "2,700 kN",
        "4.10 m upward",
        "29.2 MN\u00b7m",
        "0.1750",
        "FAR 25.305 Passed (Held 3s)"
      ],
      [
        "-1.0G Inverted Push-Over",
        "-720 kN",
        "0.65 m downward",
        "-7.8 MN\u00b7m",
        "0.0130",
        "Lower Skin In Compression Passed"
      ]
    ],
    "envelopeIntro": "Wing flutter margins must be cleared by at least 20% beyond maximum design dive speed (Vd) during flight certification.",
    "integrationIntro": "Wings carry primary fly-by-wire hydraulic actuators, fuel boost pumps, fuel jettison valves, and bleed air de-icing tubes.",
    "redundancyCards": [
      {
        "title": "MULTI-PUMP FUEL SCAVENGE REDUNDANCY",
        "desc": "Each wing tank incorporates dual electrical boost pumps plus suction-feed valves ensuring engines receive uninterrupted fuel flow even if electrical pumps fail."
      },
      {
        "title": "AEROELASTIC FLUTTER SUPPRESSION",
        "desc": "Wing fuel is actively managed to fill outboard wing tanks first, placing mass forward of the elastic axis to actively damp catastrophic high-speed flutter."
      }
    ],
    "quiz": {
      "question": "Why do commercial jet transports store the majority of their fuel inside the wings ('wet wing') rather than in the fuselage?",
      "options": [
        "Wing fuel weight acts downward against upward aerodynamic lift in flight, significantly relieving wing root bending stress.",
        "Wings are heated by the sun, keeping jet fuel boiling.",
        "The fuselage has no space because it is completely filled with luggage.",
        "Fuel burns faster when stored near the wingtips."
      ],
      "correctIndex": 0,
      "rationale": "Storing fuel inside the wings provides massive structural 'bending relief'. In flight, the heavy downward weight of the fuel directly counteracts the upward aerodynamic lift generated by the wings, drastically reducing the net bending moment at the wing root joint and allowing a lighter structural design."
    }
  },
  "14": {
    "domain": "controls",
    "discipline": "EMPENNAGE STABILITY & TAIL ARCHITECTURE",
    "chipColor": "#38bdf8",
    "icon": "\ud83d\udd79\ufe0f",
    "assetImg": "assets/diagram_flight_controls.jpg",
    "simType": "controls",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 14: The Empennage: Horizontal and Vertical Stabilizers</strong> analyzes the aerodynamic tail assembly that guarantees aircraft static and dynamic stability in three dimensions.\n      </p>\n      <p class=\"section-p\">\n        Derived from the French word <em>empenner</em> (to feather an arrow), the empennage fulfills two distinct stabilizing roles:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>The Vertical Stabilizer (Fin):</strong> Provides directional <em>weathercock stability</em> ($C_{n\beta} > 0$). When an aircraft yaws or encounters a crosswind sideslip, the vertical fin generates an aerodynamic restoring moment that swings the nose back into the relative wind. It also provides the rudder authority required to counteract asymmetric thrust during an engine failure at takeoff ($V_{mc}$).</li>\n        <li><strong>The Horizontal Stabilizer:</strong> Provides longitudinal pitch stability ($C_{m\u0007lpha} < 0$). Because the aircraft's center of gravity is typically located forward of the wing's center of pressure, the horizontal stabilizer must generate a continuous <em>downward</em> aerodynamic balancing force (negative lift) to maintain level pitch trim.</li>\n      </ul>\n      <p class=\"section-p\">\n        Modern jetliners utilize a <strong>Trimmable Horizontal Stabilizer (THS)</strong> driven by a fail-safe hydraulic ballscrew motor, allowing the entire tailplane to change incidence angle to trim out cruise control loads without deflecting the elevators.\n      </p>\n    ",
    "formulaTitle": "TAIL VOLUME RATIOS & DIRECTIONAL STABILITY CRITERIA",
    "formulaHtml": "$$ V_H = \\frac{S_H \\cdot l_H}{S \\cdot \\bar{c}} \\quad | \\quad V_V = \\frac{S_V \\cdot l_V}{S \\cdot b} \\quad | \\quad C_{n\\beta} = \\frac{\\partial C_n}{\\partial \\beta} > 0 $$",
    "formulaDesc": "Stability Volume Formulations: $S_H$ and $S_V$ are tailplane areas, $l_H$ and $l_V$ are moment arms to the aircraft CG, $\\bar{c}$ is mean aerodynamic chord, and $b$ is wingspan. Positive directional weathercock stability requires $C_{n\\beta} > 0$.",
    "takeaways": [
      "Weathercocking Principle: The vertical stabilizer acts like an arrow feather, naturally aligning the fuselage with oncoming airflow.",
      "Tailplane Downforce: In conventional aircraft, the horizontal stabilizer produces downward aerodynamic force to balance the forward CG.",
      "Trimmable Tailplane (THS): Pivoting the entire stabilizer minimizes elevator drag and preserves full elevator travel for landing flares."
    ],
    "simDescription": "Adjust rudder and elevator trim angles to observe pitch and yaw moment balancing about the center of gravity.",
    "flowDescription": "Downwash streamline angles departing the main wing and washing across the horizontal stabilizer surfaces.",
    "hotspotDescription": "Click the 5 pins to inspect structural empennage and trim actuator stations on the aircraft tailcone.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 45,
        "title": "THS Dual Hydraulic Ballscrew Screwjack",
        "spec": "Triple-Thread Fail-Safe Mechanical Screwjack",
        "stress": "Pitch Trim Thrust Load: 95 kN",
        "status": "DUAL MOTOR HYDRAULIC ACTIVE"
      },
      {
        "id": 2,
        "x": 42,
        "y": 25,
        "title": "Vertical Stabilizer Primary Fin Box",
        "spec": "Carbon Fiber Multi-Rib Torque Box",
        "stress": "Sideslip Bending Moment: 450 kN\u00b7m at Vmc",
        "status": "ULTRASONICALLY CERTIFIED"
      },
      {
        "id": 3,
        "x": 68,
        "y": 38,
        "title": "Directional Rudder PCU Actuator Bay",
        "spec": "Dual Tandem Hydraulic Power Control Units",
        "stress": "Rudder Deflection Authority: \u00b130\u00b0 at low speed",
        "status": "YAW DAMPER ACTIVE"
      },
      {
        "id": 4,
        "x": 82,
        "y": 55,
        "title": "Elevator Carbon Composite Hinge Line",
        "spec": "CFRP Monolithic Honeycomb Elevator Surface",
        "stress": "Dynamic Pitch Authority: \u00b125\u00b0 Deflection",
        "status": "SYNCHRONIZED L/R"
      },
      {
        "id": 5,
        "x": 88,
        "y": 72,
        "title": "Auxiliary Power Unit (APU) Titanium Fire Shroud",
        "spec": "Titanium Ti-6242 Heat Shield & Inconel Exhaust",
        "stress": "Thermal Containment: 1,100\u00b0C for 15 minutes",
        "status": "FIRE EXTINCTION SENSORS ARMED"
      }
    ],
    "calcTitle": "TAIL VOLUME RATIO & STATIC PITCH STABILITY SOLVER",
    "calcDesc": "Calculate horizontal tail volume ratio (VH) and pitch stability margin for given tailplane moment arm and area.",
    "calcParam1": {
      "label": "Horizontal Tail Area (SH, m\u00b2)",
      "min": 10,
      "max": 75,
      "val": 31,
      "unit": "m\u00b2",
      "step": 1
    },
    "calcParam2": {
      "label": "Tail Moment Arm (lH, meters)",
      "min": 8,
      "max": 35,
      "val": 18.5,
      "unit": "m",
      "step": 0.5
    },
    "tableTitle": "EMPENNAGE AERODYNAMIC STABILITY & ENGINE FAILURE (VMC) TEST DATA",
    "tableIntro": "Flight test certification data proving directional control during asymmetric critical engine failure:",
    "tableHeaders": [
      "FLIGHT TEST SORTIE",
      "AIRSPEED",
      "ENGINE STATUS",
      "RUDDER DEFLECTION",
      "BANK ANGLE",
      "DIRECTIONAL RESULT"
    ],
    "tableRows": [
      [
        "Sortie TF-01 (Vmcg Ground)",
        "112 kts",
        "Left Engine Cut at V1",
        "24.5\u00b0 Right Rudder",
        "0.0\u00b0 (Wings Level)",
        "Maintained runway centerline < 30 ft"
      ],
      [
        "Sortie TF-02 (Vmca Air)",
        "118 kts",
        "Critical Engine Inoperative",
        "21.0\u00b0 Right Rudder",
        "5.0\u00b0 Bank Into Live Engine",
        "Zero Heading Drift (FAR 25.149 Passed)"
      ],
      [
        "Sortie TF-03 (Max Crosswind)",
        "135 kts",
        "38 knot 90\u00b0 Crosswind",
        "18.2\u00b0 Rudder Crab Angle",
        "Decrab flare nominal",
        "Certified for 38 kts Crosswind"
      ],
      [
        "Sortie TF-04 (High-Maneuver)",
        "280 kts",
        "Both Engines Active",
        "4.5\u00b0 Rudder Travel Limit",
        "RTLU active protection",
        "Zero fin overstress / Flutter cleared"
      ]
    ],
    "envelopeIntro": "The Rudder Travel Limiter Unit (RTLU) progressively restricts rudder deflection from \u00b130\u00b0 at low speed to \u00b14\u00b0 at high speed to prevent structural fin overload.",
    "integrationIntro": "The empennage integrates directly with the flight control computers, yaw dampers, autoland systems, and APU electrical harnesses.",
    "redundancyCards": [
      {
        "title": "TRIPLE-REDUNDANT YAW DAMPERS",
        "desc": "Electronic yaw dampers automatically apply micro-rudder deflections to suppress Dutch roll oscillations before flight crews even detect them."
      },
      {
        "title": "DUAL MECHANICAL SCREWJACK TIE-DOWN",
        "desc": "The horizontal stabilizer ballscrew includes an unthreaded secondary safety nut that physically prevents stabilizer free-float in the event of primary screw failure."
      }
    ],
    "quiz": {
      "question": "What primary aerodynamic stability function does the vertical stabilizer perform on a conventional aircraft?",
      "options": [
        "Directional (weathercock) stability to align the aircraft nose with the relative wind.",
        "Generating upward aerodynamic lift to support passenger weight.",
        "Providing pitch trim to stop the aircraft diving.",
        "Supplying high-pressure air to the air conditioning packs."
      ],
      "correctIndex": 0,
      "rationale": "The vertical stabilizer provides directional 'weathercock' stability (Cn_beta > 0). When the aircraft enters a sideslip, the vertical fin generates an aerodynamic sideforce aft of the center of gravity, naturally restoring the fuselage heading to align with the oncoming airflow."
    }
  },
  "15": {
    "domain": "controls",
    "discipline": "FLIGHT CONTROL SURFACES & THREE-AXIS DYNAMICS",
    "chipColor": "#38bdf8",
    "icon": "\ud83d\udd79\ufe0f",
    "assetImg": "assets/diagram_flight_controls.jpg",
    "simType": "controls",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 15: The Rudder, Elevators and Ailerons</strong> details the three primary aerodynamic flight control surfaces that govern motion about the aircraft's three mutually orthogonal Cartesian axes:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Ailerons (Lateral Axis / Roll):</strong> Mounted on the trailing edge of each wingtip, ailerons deflect differentially (one upward, one downward) to vary wing lift, creating an aerodynamic roll moment about the <em>longitudinal X-axis</em>.</li>\n        <li><strong>Elevators (Lateral Axis / Pitch):</strong> Hinged to the trailing edge of the horizontal stabilizer, elevators deflect symmetrically to alter tail downforce, rotating the aircraft about its <em>lateral Y-axis</em> to control pitch and angle of attack.</li>\n        <li><strong>Rudder (Vertical Axis / Yaw):</strong> Hinged to the vertical stabilizer trailing edge, the rudder deflects left or right to generate aerodynamic sideforce, swinging the nose about the <em>vertical Z-axis</em> to control directional yaw.</li>\n      </ul>\n      <p class=\"section-p\">\n        A critical flight dynamics phenomenon mastered in this chapter is <strong>Adverse Yaw</strong>: when ailerons deflect to initiate a banked turn, the downward-deflected aileron generates increased lift and therefore increased <em>induced drag</em>, yawing the nose opposite to the desired direction of turn. Engineers resolve this via differential aileron gearing, Frise ailerons, and coordinated rudder-aileron interconnects.\n      </p>\n    ",
    "formulaTitle": "CONTROL SURFACE AERODYNAMIC DERIVATIVE EQUATIONS",
    "formulaHtml": "$$ C_l = C_{l\\delta a} \\cdot \\delta a \\quad | \\quad C_m = C_{m\\delta e} \\cdot \\delta e \\quad | \\quad C_n = C_{n\\delta r} \\cdot \\delta r \\quad | \\quad p = \\frac{2v}{b} \\frac{C_{l\\delta a} \\delta a}{C_{lp}} $$",
    "formulaDesc": "Control Derivative Formulations: $\\delta a, \\delta e, \\delta r$ are angular deflections of ailerons, elevators, and rudder. $C_{l\\delta a}, C_{m\\delta e}, C_{n\\delta r}$ are control effectiveness derivatives. Roll rate $p$ is governed by roll damping derivative $C_{lp}$.",
    "takeaways": [
      "Three-Axis Mastery: Ailerons control roll (X-axis), elevators control pitch (Y-axis), and the rudder controls yaw (Z-axis).",
      "Adverse Yaw Mechanism: Downward aileron deflection creates extra induced drag, which yaws the nose away from the turn unless coordinated with rudder.",
      "Fly-By-Wire Power Control Units: Modern surfaces are powered by dual hydraulic actuators receiving electronic commands from flight computers."
    ],
    "simDescription": "Deflect ailerons, elevators, and rudder in the 60 FPS simulator to observe three-axis aerodynamic moments and coordinated turns.",
    "flowDescription": "Streamline pressure differentials across deflected aileron and rudder trailing edge hinge gaps.",
    "hotspotDescription": "Click the 5 pins to inspect primary flight control surface actuators and hinge mechanisms.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 38,
        "title": "Outboard Roll Aileron Control Surface",
        "spec": "Carbon-Epoxy Honeycomb Panel with Ti Hinge Lugs",
        "stress": "Max Roll Rate: 22\u00b0/sec (FAR Part 25 Compliant)",
        "status": "SYNCHRONIZED"
      },
      {
        "id": 2,
        "x": 35,
        "y": 28,
        "title": "Frise Aerodynamic Adverse-Yaw Balance Lip",
        "spec": "Protruding Lower Lip Creating Counter-Drag",
        "stress": "Reduces Adverse Yaw by 68%",
        "status": "COUNTERBALANCE ARMED"
      },
      {
        "id": 3,
        "x": 58,
        "y": 42,
        "title": "Fly-by-Wire Dual Hydraulic PCU Actuator",
        "spec": "Parker Aerospace 3,000 psi Dual Tandem Servo",
        "stress": "Actuator Output Force: 42 kN per surface",
        "status": "GREEN/YELLOW HYD NOMINAL"
      },
      {
        "id": 4,
        "x": 78,
        "y": 32,
        "title": "Elevator Pitch Control Carbon Panel",
        "spec": "Deflection Range: +30\u00b0 Up / -15\u00b0 Down",
        "stress": "Pitch Acceleration Authority: 1.8 rad/s\u00b2",
        "status": "TRIM ALIGNED"
      },
      {
        "id": 5,
        "x": 86,
        "y": 65,
        "title": "Directional Rudder Travel Limiter (RTLU)",
        "spec": "Fly-by-Wire Electronic Software Limiter",
        "stress": "Travel: \u00b130\u00b0 at 140 kts -> \u00b14.5\u00b0 at 450 kts",
        "status": "LIMIT ENFORCED"
      }
    ],
    "calcTitle": "AIRCRAFT ROLL RATE & AILERON EFFECTIVENESS SOLVER",
    "calcDesc": "Calculate steady-state roll rate (p, deg/sec) based on airspeed, wingspan, and aileron deflection angle.",
    "calcParam1": {
      "label": "Aileron Deflection (\u03b4a, degrees)",
      "min": 2,
      "max": 25,
      "val": 15,
      "unit": "\u00b0",
      "step": 1
    },
    "calcParam2": {
      "label": "Calibrated Airspeed (CAS, kts)",
      "min": 100,
      "max": 350,
      "val": 220,
      "unit": "kts",
      "step": 10
    },
    "tableTitle": "PRIMARY FLIGHT CONTROL DEFLECTION & AUTHORITY TELEMETRY",
    "tableIntro": "Flight test validation of control surface deflections, hinge moments, and roll/pitch response times:",
    "tableHeaders": [
      "SURFACE",
      "DEFLECTION LIMIT",
      "ACTUATION SOURCE",
      "TIME TO FULL STROKE",
      "HINGE MOMENT",
      "STATUS"
    ],
    "tableRows": [
      [
        "Ailerons (L/R)",
        "+25\u00b0 / -20\u00b0",
        "Dual Hydraulic PCU (3,000 psi)",
        "0.85 seconds",
        "12.4 kN\u00b7m",
        "Certified Roll Authority"
      ],
      [
        "Elevators (L/R)",
        "+30\u00b0 / -15\u00b0",
        "Dual Hydraulic PCU (Hyd A/B)",
        "0.70 seconds",
        "28.5 kN\u00b7m",
        "Full Stall Recovery Authority"
      ],
      [
        "Rudder (Directional)",
        "\u00b130\u00b0 (Low) / \u00b14.5\u00b0 (Hi)",
        "Triple Tandem PCU (3 Systems)",
        "0.95 seconds",
        "38.2 kN\u00b7m",
        "Vmc Engine-Out Controllable"
      ],
      [
        "Roll Spoilers (Fly-By-Wire)",
        "0\u00b0 to 45\u00b0",
        "Electro-Hydraulic Servo Valve",
        "0.45 seconds",
        "16.8 kN\u00b7m",
        "Roll Augmentation Active"
      ]
    ],
    "envelopeIntro": "Control surface hinge moments increase quadratically with dynamic pressure (q), requiring high-pressure hydraulics to maintain control.",
    "integrationIntro": "Primary flight controls receive commands from pilot sidesticks and autoland flight guidance computers over ARINC 429 and AFDX digital data networks.",
    "redundancyCards": [
      {
        "title": "DUAL INDEPENDENT HYDRAULIC PCUS",
        "desc": "Each control surface is driven by twin independent hydraulic cylinders powered by separate hydraulic circuits (e.g., Green and Yellow systems)."
      },
      {
        "title": "SPLIT-SURFACE ROLL & PITCH ARCHITECTURE",
        "desc": "Elevators and ailerons are split into independent left and right panels. If one control surface jams, the remaining surface retains sufficient authority for safe landing."
      }
    ],
    "quiz": {
      "question": "What causes 'adverse yaw' when an aircraft initiates a banked turn with ailerons, and how is it corrected?",
      "options": [
        "The downward-deflected aileron produces greater lift and higher induced drag, yawing the nose away from the turn; it is corrected by applying rudder in the direction of the turn.",
        "The jet engines produce uneven thrust during turns; corrected by shutting off one engine.",
        "Gravity pulls harder on the higher wing; corrected by pitching down.",
        "The landing gear doors open during banking; corrected by cycling gear."
      ],
      "correctIndex": 0,
      "rationale": "When ailerons deflect to roll, the wing with the downward-deflected aileron generates increased camber and higher lift. This extra lift inevitably produces higher induced drag on that wingtip, creating an adverse yawing moment that pulls the nose away from the turn. The pilot (or automated flight computer) applies rudder in the direction of the roll to coordinate the turn."
    }
  },
  "16": {
    "domain": "structure",
    "discipline": "HIGH-LIFT AERODYNAMICS & MECHANISMS",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udcd0",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 16: Flaps, Slats and Other High-Lift Devices</strong> explores the aerodynamic mechanisms that enable high-speed transport aircraft to take off and land safely on standard runway lengths at survivable airspeeds.\n      </p>\n      <p class=\"section-p\">\n        A jetliner with clean, unaugmented wings has a maximum lift coefficient ($C_{L\\text{max}}$) of only ~1.2 to 1.5, requiring dangerous landing speeds exceeding 180 knots. Deploying high-lift systems increases $C_{L\\text{max}}$ to <strong>2.8 or higher</strong>, reducing stall speed by over 35%:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Trailing-Edge Flaps:</strong> Plain flaps, split flaps, slotted flaps, and multi-element <em>Fowler flaps</em>. Fowler flaps extend rearward on tracks before deflecting downward, simultaneously increasing airfoil camber and effective wing planform area ($S$).</li>\n        <li><strong>Leading-Edge Slats:</strong> Auxiliary airfoils along the wing leading edge that open a high-energy converging slot. High-pressure air from beneath the wing accelerates through the slot, injecting fresh kinetic energy into the upper boundary layer and delaying flow separation up to 25\u00b0 angle of attack.</li>\n        <li><strong>Krueger Flaps:</strong> Leading-edge flap panels that deploy from the lower wing surface (commonly on inboard wing sections) to prevent boundary layer separation near engine nacelles.</li>\n      </ul>\n    ",
    "formulaTitle": "HIGH-LIFT STALL SPEED & MAXIMUM LIFT COEFFICIENT FORMULAS",
    "formulaHtml": "$$ v_{\\text{stall}} = \\sqrt{\\frac{2 W}{\\rho \\cdot S \\cdot C_{L\\text{max}}}} \\quad | \\quad \\Delta C_{L\\text{max, flaps}} \\approx +0.9\\text{ to }+1.4 \\quad | \\quad \\Delta C_{L\\text{max, slats}} \\approx +0.6 $$",
    "formulaDesc": "Stall Speed Relationship: Stall speed is inversely proportional to the square root of $C_{L\\text{max}}$. By boosting $C_{L\\text{max}}$ from 1.3 to 2.8 via combined slats and Fowler flaps, takeoff and landing approach speeds are safely reduced from 185 kts down to 135 kts.",
    "takeaways": [
      "Fowler Flap Dual Action: Increases both airfoil camber and wing surface area by translating rearward on track carriages.",
      "Boundary Layer Re-Energization: Slats channel high-pressure air through a converging nozzle slot, blowing away boundary-layer stall.",
      "Stall Speed Reduction: High-lift devices cut landing speeds by 30\u201340%, permitting operations on standard 7,000-foot runways."
    ],
    "simDescription": "Deploy trailing edge flaps and leading edge slats in stages (Flaps 1, 2, Full) to observe the dramatic expansion of the lift curve and delayed stall angle.",
    "flowDescription": "Velocity streamline vector field inside a slotted Fowler flap gap showing boundary-layer injection preventing upper surface flow detachment.",
    "hotspotDescription": "Click the 5 pins to inspect high-lift drive tracks, rotary actuators, and asymmetric brake assemblies.",
    "hotspots": [
      {
        "id": 1,
        "x": 16,
        "y": 32,
        "title": "Leading Edge Slat Track & Drive Pinion",
        "spec": "Titanium Ti-6Al-4V Curved Slat Track",
        "stress": "Aerodynamic Slat Suction Force: 48 kN per panel",
        "status": "ROTARY DRIVE SYNCHRONIZED"
      },
      {
        "id": 2,
        "x": 28,
        "y": 24,
        "title": "High-Energy Converging Slat Slot",
        "spec": "Precision Aerodynamic Slot Gap (28 mm)",
        "stress": "Boundary Layer Injection Velocity: 180 m/s",
        "status": "STALL DELAYED TO 24\u00b0 AOA"
      },
      {
        "id": 3,
        "x": 72,
        "y": 48,
        "title": "Triple-Slotted Fowler Flap Track Carriage",
        "spec": "300M Steel Roller Carriage & Monolithic Flap Rib",
        "stress": "Rearward Extension: +28% Wing Area Increase",
        "status": "FULL EXTENSION CONFIRMED"
      },
      {
        "id": 4,
        "x": 82,
        "y": 62,
        "title": "Aerodynamic Flap Track Canoe Fairing",
        "spec": "Carbon/Kevlar Composite Streamlined Pod",
        "stress": "Reduces Track Interference Drag by 85%",
        "status": "LOW-DRAG FAIRING SEALED"
      },
      {
        "id": 5,
        "x": 52,
        "y": 42,
        "title": "Flap Asymmetry Position Resolver & Brake",
        "spec": "Dual RVDT Sensor & Mechanical Friction Brake",
        "stress": "Asymmetry Detection Window: < 50 milliseconds",
        "status": "ASYMMETRY LOCK READY"
      }
    ],
    "calcTitle": "AIRCRAFT STALL SPEED & HIGH-LIFT CLMAX CALCULATOR",
    "calcDesc": "Calculate stall speed (v_stall, kts) based on aircraft gross weight, wing area, and deployed flap configuration.",
    "calcParam1": {
      "label": "Aircraft Weight (W, kg)",
      "min": 40000,
      "max": 90000,
      "val": 65000,
      "unit": "kg",
      "step": 1000
    },
    "calcParam2": {
      "label": "Max Lift Coeff (CLmax)",
      "min": 1.2,
      "max": 3.2,
      "val": 2.8,
      "unit": "CL",
      "step": 0.1
    },
    "tableTitle": "HIGH-LIFT CONFIGURATION FLIGHT TEST POLAR MATRIX",
    "tableIntro": "Experimental flight test data measuring lift coefficients, stall speeds, and L/D drag across flap settings:",
    "tableHeaders": [
      "CONFIGURATION",
      "SLAT EXTENSION",
      "FLAP DEFLECTION",
      "CL MAX",
      "STALL SPEED (Vso)",
      "L/D RATIO"
    ],
    "tableRows": [
      [
        "Clean (Cruise)",
        "0\u00b0 (Retracted)",
        "0\u00b0 (Retracted)",
        "1.32",
        "168 kts",
        "18.2:1 (Low Drag)"
      ],
      [
        "Flaps 1 (Takeoff)",
        "18\u00b0 Extended",
        "0\u00b0 (Retracted)",
        "1.85",
        "142 kts",
        "14.5:1 (High L/D)"
      ],
      [
        "Flaps 2 (Approach)",
        "22\u00b0 Extended",
        "15\u00b0 Fowler Extended",
        "2.35",
        "126 kts",
        "10.8:1 (Intermediate)"
      ],
      [
        "Flaps Full (Landing)",
        "27\u00b0 Full Slat",
        "40\u00b0 Full Fowler",
        "2.88",
        "114 kts",
        "6.2:1 (High Drag Decel)"
      ]
    ],
    "envelopeIntro": "Flap Placard Speeds (Vfe) impose structural airspeed limits; exceeding Vfe with flaps deployed causes mechanical track distortion.",
    "integrationIntro": "High-lift systems are driven by central hydraulic power control units through torque tubes running across the entire wingspan.",
    "redundancyCards": [
      {
        "title": "WINGTIP ASYMMETRY BRAKES (WTB)",
        "desc": "If a drive shaft breaks causing left and right flaps to extend unevenly, Wingtip Brakes snap shut within 50 milliseconds to prevent roll upset."
      },
      {
        "title": "SLAT ALPHA/SPEED LOCK FUNCTION",
        "desc": "Flight management computers automatically extend leading edge slats if angle of attack approaches stall limits, even if the pilot forgot to move the flap lever."
      }
    ],
    "quiz": {
      "question": "How do Fowler flaps achieve a significantly higher maximum lift coefficient (CLmax) than conventional plain flaps?",
      "options": [
        "They extend both rearward and downward, simultaneously increasing airfoil camber and effective wing planform area.",
        "They direct jet exhaust gas over the cockpit.",
        "They rotate 360 degrees to act as auxiliary propellers.",
        "They absorb fuel to make the aircraft heavier."
      ],
      "correctIndex": 0,
      "rationale": "Unlike simple hinged plain flaps that only deflect downward, Fowler flaps translate aft on curved tracks before rotating downward. This rearward translation expands the physical planform area of the wing (by up to 25\u201330%) while simultaneously increasing camber and opening slotted boundary-layer gaps, producing dramatic increases in CLmax."
    }
  },
  "17": {
    "domain": "structure",
    "discipline": "LANDING GEAR & BRAKING SYSTEMS",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udede",
    "assetImg": "assets/diagram_structures_gear.jpg",
    "simType": "structure",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 17: Aircraft Landing Gear</strong> examines the heavy structural and mechanical assemblies that support the aircraft on the ground, absorb touchdown kinetic energy, steer during taxiing, and bring high-speed aircraft to a safe stop.\n      </p>\n      <p class=\"section-p\">\n        Modern commercial airliners universally employ <strong>tricycle gear</strong> configurations (steerable nose gear + twin multi-wheel main gear trucks located just aft of the center of gravity). The core subsystems include:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Oleo-Pneumatic Shock Struts:</strong> Telescoping cylinders sealed with compressed dry nitrogen gas and hydraulic mineral oil. Touchdown impact forces oil through an internal orifice with a tapered metering pin, converting 80%+ of kinetic touchdown energy into heat and preventing rebound bouncing.</li>\n        <li><strong>Multi-Disc Carbon-Carbon Brakes:</strong> Stacks of rotating carbon rotors and stationary stators capable of absorbing over 100 megajoules of kinetic energy during a high-speed Rejected Takeoff (RTO) without thermal fade, operating at temperatures exceeding 1,200\u00b0C.</li>\n        <li><strong>Anti-Skid & Autobrake Computers:</strong> Microprocessor-controlled electro-hydraulic valves that monitor individual wheel speed deceleration, automatically modulating brake pressure to prevent tire blowout and hydroplaning.</li>\n      </ul>\n    ",
    "formulaTitle": "TOUCHDOWN KINETIC ENERGY & OLEO SHOCK STRUT FORMULAS",
    "formulaHtml": "$$ E_k = \\frac{1}{2} m \\cdot v_z^2 \\quad | \\quad F_{\\text{strut}} = p_{\\text{gas}} A_p + \\frac{1}{2} \\rho_{\\text{oil}} A_p \\left(\\frac{A_p}{A_{\\text{orifice}}}\\right)^2 \\dot{s}^2 \\quad | \\quad E_{\\text{RTO}} = \\frac{1}{2} m v_1^2 $$",
    "formulaDesc": "Landing Dynamics Equations: $v_z$ is vertical descent touchdown sink rate (FAR 25 certified up to 10 ft/s / 3.05 m/s). Orifice metering pin geometry tailors hydraulic damping force $F_{\\text{strut}}$ to keep airframe vertical acceleration below +2.0G.",
    "takeaways": [
      "Oleo Energy Dissipation: Nitrogen gas acts as a progressive spring; hydraulic oil forced through an orifice dissipates vertical impact energy.",
      "Carbon Brake Performance: Carbon-carbon disc brakes maintain high friction coefficients even when glowing cherry red at 1,000\u00b0C.",
      "Emergency Gravity Free-Fall: Landing gear can extend safely under gravity and aerodynamic airflow even with complete hydraulic power failure."
    ],
    "simDescription": "Simulate touchdown impact and oleo compression across sink rates from 2 ft/s (soft touchdown) to 10 ft/s (hard limit landing).",
    "flowDescription": "Fluid dynamics of hydraulic oil forced through the variable-area orifice metering pin inside the oleo shock cylinder.",
    "hotspotDescription": "Click the 5 pins to inspect structural oleo struts, carbon brake packs, and emergency release mechanisms.",
    "hotspots": [
      {
        "id": 1,
        "x": 22,
        "y": 38,
        "title": "Oleo-Pneumatic Nitrogen/Oil Cylinder",
        "spec": "300M Ultra-High-Strength Steel Outer Cylinder",
        "stress": "Nitrogen Pre-Charge: 1,500 psi | Peak Impact: 3,400 psi",
        "status": "DAMPING EFFICIENCY > 82%"
      },
      {
        "id": 2,
        "x": 48,
        "y": 72,
        "title": "Multi-Disc Carbon-Carbon Brake Heat Sink",
        "spec": "HexWeb Carbon-Carbon Composite Rotor/Stator Stack",
        "stress": "Rejected Takeoff Thermal Absorption: 92 MJ at 1,180\u00b0C",
        "status": "BRAKE WEAR PINS NOMINAL"
      },
      {
        "id": 3,
        "x": 68,
        "y": 78,
        "title": "Anti-Skid Hall-Effect Wheel Speed Sensor",
        "spec": "Axle-Mounted Variable Reluctance Transducer",
        "stress": "Sampling Rate: 200 Hz Digital Modulation",
        "status": "ANTI-SKID ACTIVE"
      },
      {
        "id": 4,
        "x": 38,
        "y": 32,
        "title": "Hydromechanical Side-Brace & Downlock Joint",
        "spec": "Overcenter Mechanical Toggle with J-Spring Lock",
        "stress": "Locking Spring Retention: 8.5 kN",
        "status": "GEAR DOWN & LOCKED"
      },
      {
        "id": 5,
        "x": 84,
        "y": 42,
        "title": "Emergency Gravity Free-Fall Uplock Release",
        "spec": "Dual Mechanical Bowden Cable Uplock Hook Release",
        "stress": "Manual Crew Actuation Overrides Hydraulics",
        "status": "FREE-FALL ARMED"
      }
    ],
    "calcTitle": "LANDING GEAR TOUCHDOWN KINETIC ENERGY SOLVER",
    "calcDesc": "Calculate vertical kinetic energy and peak gear reaction force for given landing weight and sink rate.",
    "calcParam1": {
      "label": "Landing Weight (W, kg)",
      "min": 35000,
      "max": 80000,
      "val": 62000,
      "unit": "kg",
      "step": 1000
    },
    "calcParam2": {
      "label": "Sink Rate at Touchdown (vz, ft/s)",
      "min": 1.0,
      "max": 12.0,
      "val": 4.5,
      "unit": "ft/s",
      "step": 0.5
    },
    "tableTitle": "LANDING GEAR DYNAMIC DROP TEST & RTO BRAKING CERTIFICATION",
    "tableIntro": "FAR Part 25 certification drop-table and dynamometer brake test results:",
    "tableHeaders": [
      "CERTIFICATION TEST",
      "SINK RATE / SPEED",
      "AIRCRAFT GROSS MASS",
      "ENERGY ABSORBED",
      "PEAK G LOAD",
      "CERTIFICATION RESULT"
    ],
    "tableRows": [
      [
        "Limit Drop Test",
        "10.0 ft/s (3.05 m/s)",
        "64,500 kg (MLW)",
        "2.98 MJ",
        "+1.78 G vertical",
        "FAR 25.723 Passed (Zero Yield)"
      ],
      [
        "Reserve Energy Drop",
        "12.0 ft/s (3.66 m/s)",
        "64,500 kg (MLW)",
        "4.30 MJ",
        "+2.24 G vertical",
        "FAR 25.725 Ultimate Passed"
      ],
      [
        "Normal Landing Braking",
        "135 kts -> 0 kts",
        "62,000 kg",
        "28.5 MJ",
        "-0.35 G decel",
        "Brake Temp 340\u00b0C (Nominal)"
      ],
      [
        "Max Rejected Takeoff (RTO)",
        "162 kts (V1 abort)",
        "78,000 kg (MTOW)",
        "94.2 MJ",
        "-0.52 G max anti-skid",
        "Contained fire 5 min / Evacuation safe"
      ]
    ],
    "envelopeIntro": "Landing gear retraction and extension speeds (Vlo/Vle) prevent structural aerodynamic damage to gear bay doors.",
    "integrationIntro": "Landing gear proximity sensor electronic modules (PSEU) signal 'air-ground' status to the entire aircraft avionics suite.",
    "redundancyCards": [
      {
        "title": "GRAVITY FREE-FALL EXTENSION",
        "desc": "Pulling the cockpit manual extension handle mechanically releases door and gear uplocks, allowing the heavy gear to swing down and lock under gravity and aerodynamic drag."
      },
      {
        "title": "DUAL-CHIME GEAR WARNING LOGIC",
        "desc": "If thrust levers are pulled to idle at low altitude without gear down, loud auditory alarms and flashing red lights warn the crew to prevent gear-up belly landings."
      }
    ],
    "quiz": {
      "question": "What two substances are sealed inside a standard aircraft oleo-pneumatic shock strut to cushion touchdown loads and eliminate bouncing?",
      "options": [
        "Compressed dry nitrogen gas and hydraulic mineral oil.",
        "Water and compressed steam.",
        "Alcohol and lead shot pellets.",
        "Liquid oxygen and silicone rubber."
      ],
      "correctIndex": 0,
      "rationale": "An oleo strut uses compressed dry nitrogen gas (which acts as a progressive pneumatic spring to cushion initial ground contact) combined with hydraulic oil (which is forced through a restrictive orifice to dissipate kinetic energy into heat and prevent dangerous rebound oscillations)."
    }
  },
  "18": {
    "domain": "avionics",
    "discipline": "FLIGHT DECK AVIONICS & GLASS COCKPIT",
    "chipColor": "#c084fc",
    "icon": "\u26a1",
    "assetImg": "assets/ebook_cockpit.png",
    "simType": "pfd",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 18: Aircraft Cockpit and Flight Deck</strong> analyzes the human-machine interface (HMI), avionics architectures, and situational awareness displays enabling modern flight crews to command complex aerospace vehicles safely.\n      </p>\n      <p class=\"section-p\">\n        The flight deck has transitioned from hundreds of mechanical \"steam gauges\" into integrated <strong>Electronic Flight Instrument Systems (EFIS)</strong> and glass cockpits:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Primary Flight Display (PFD):</strong> Synthesizes the historic \"Basic Six\" instruments into a single active-matrix LCD. Displays the artificial horizon, calibrated airspeed tape, barometric altimeter tape, vertical speed indicator, and computerized flight director crossbars.</li>\n        <li><strong>Navigation Display (ND):</strong> Provides map and compass views integrating GPS, VOR/DME, Flight Management System (FMS) lateral routes, TCAS II traffic conflict advisories, and onboard color weather radar weather returns.</li>\n        <li><strong>Engine Indicating & Crew Alerting System (EICAS / ECAM):</strong> Continuously monitors turbofan engine parameters (N1, N2, EGT, vibration, fuel flow) and presents prioritized color-coded emergency checklists (Warning, Caution, Advisory) during system faults.</li>\n        <li><strong>Fly-By-Wire Active Sidestick Controllers:</strong> Replace bulky center yokes with ergonomic sidesticks equipped with dual resolvers and autopilot disconnect pushbuttons.</li>\n      </ul>\n    ",
    "formulaTitle": "AIR DATA CALCULATION & BAROMETRIC ALTIMETRY FORMULAS",
    "formulaHtml": "$$ q = \\frac{1}{2} \\rho v_{\\text{CAS}}^2 \\quad | \\quad H_p = 145366.45 \\cdot \\left[1 - \\left(\\frac{p_{\\text{static}}}{1013.25}\\right)^{0.190284}\\right] \\quad | \\quad M = \\frac{v_{\\text{TAS}}}{a} $$",
    "formulaDesc": "Air Data Equations: $H_p$ is pressure altitude computed from ambient static pressure $p_{\\text{static}}$. Speed of sound $a = \\sqrt{\\gamma R T}$. Flight computers sample these equations at 50 Hz to update cockpit instrument tapes.",
    "takeaways": [
      "PFD Synthesis: Combines attitude, speed, altitude, and vertical velocity into one central visual field to minimize crew scan time.",
      "Dark Cockpit Philosophy: Annunciator lights remain extinguished during normal flight, illuminating only when a system requires pilot attention.",
      "TCAS II Traffic Avoidance: Interrogates nearby transponders to issue visual and auditory Traffic Advisories (TA) and Resolution Advisories (RA)."
    ],
    "simDescription": "Operate the simulated Primary Flight Display (PFD). Change pitch and roll to observe the artificial horizon, speed tape, and altitude tape.",
    "flowDescription": "ARINC 429 and AFDX high-speed avionics data bus network linking Air Data Computers (ADC) to cockpit multi-function displays.",
    "hotspotDescription": "Click the 5 pins to inspect digital flight instrument displays and management computers in the modern flight deck.",
    "hotspots": [
      {
        "id": 1,
        "x": 22,
        "y": 38,
        "title": "Captain Primary Flight Display (PFD)",
        "spec": "15.4-inch AMLCD High-Definition Flight Screen",
        "stress": "Refresh Rate: 60 Hz Native Flight Instruments",
        "status": "ATTITUDE / AIRSPEED NOMINAL"
      },
      {
        "id": 2,
        "x": 42,
        "y": 38,
        "title": "Navigation Display (ND) & Radar Overlay",
        "spec": "TCAS II Version 7.1 + X-Band Weather Radar Map",
        "stress": "Collision Avoidance Range: 40 Nautical Miles",
        "status": "ROUTE ACTIVE: WAYPOINT KORD"
      },
      {
        "id": 3,
        "x": 62,
        "y": 38,
        "title": "EICAS / ECAM Central Engine & Alert Display",
        "spec": "Automated Aircraft System Diagnostics Processor",
        "stress": "Monitors 2,800 Discrete Aircraft Telemetry Points",
        "status": "ALL SYSTEMS NORMAL (DARK COCKPIT)"
      },
      {
        "id": 4,
        "x": 52,
        "y": 68,
        "title": "Multifunction Control Display Unit (MCDU)",
        "spec": "Dual Flight Management Computer (FMS) Interface",
        "stress": "Performance Optimized Lateral / Vertical VNAV Profile",
        "status": "PERF OPTIMAL / COST INDEX 35"
      },
      {
        "id": 5,
        "x": 14,
        "y": 62,
        "title": "Fly-by-Wire Passive/Active Sidestick",
        "spec": "Dual Linear Variable Differential Transducers (LVDT)",
        "stress": "Full Deflection Force: 22 Newtons with Pitch Envelope",
        "status": "PILOT FLYING ACTIVE"
      }
    ],
    "calcTitle": "CALIBRATED TO TRUE AIRSPEED & MACH NUMBER SOLVER",
    "calcDesc": "Calculate True Airspeed (TAS, kts) and Mach number from Calibrated Airspeed (CAS) and pressure altitude.",
    "calcParam1": {
      "label": "Calibrated Airspeed (CAS, kts)",
      "min": 150,
      "max": 350,
      "val": 280,
      "unit": "kts",
      "step": 10
    },
    "calcParam2": {
      "label": "Pressure Altitude (Hp, feet)",
      "min": 0,
      "max": 43000,
      "val": 35000,
      "unit": "ft",
      "step": 1000
    },
    "tableTitle": "AVIONICS BUS TRANSMISSION & FLIGHT DECK TELEMETRY MATRIX",
    "tableIntro": "High-bandwidth digital avionics communication standards linking cockpit displays to flight computers:",
    "tableHeaders": [
      "SYSTEM BUS",
      "PROTOCOL",
      "BANDWIDTH",
      "PRIMARY TRANSMISSION",
      "FAILOVER TIME",
      "CERTIFICATION"
    ],
    "tableRows": [
      [
        "ARINC 429",
        "Bipolar RZ Serial",
        "100 kbps",
        "Air Data Computers to PFD Display Units",
        "< 10 milliseconds",
        "FAA / EASA Part 25"
      ],
      [
        "AFDX (ARINC 664)",
        "Deterministic Ethernet",
        "100 Mbps",
        "Flight Control Computers to Actuator Units",
        "< 1 millisecond",
        "DO-254 / DO-178C Level A"
      ],
      [
        "MIL-STD-1553B",
        "Dual Redundant Bus",
        "1 Mbps",
        "Tactical Weapons & Radar Integration",
        "< 5 milliseconds",
        "Military Mil-Spec Compliant"
      ],
      [
        "CAN Aerospace",
        "Controller Area Network",
        "1 Mbps",
        "Engine FADEC telemetry to EICAS screens",
        "< 2 milliseconds",
        "Full Dual Redundancy"
      ]
    ],
    "envelopeIntro": "Cockpit instruments dynamically display Vmo/Mmo overspeed clacker limits, barber-pole maximum speed limits, and amber stall protection bands.",
    "integrationIntro": "Glass cockpits interface directly with dual Head-Up Displays (HUD), Synthetic Vision Systems (SVS), and satcom datalink messaging (CPDLC).",
    "redundancyCards": [
      {
        "title": "STANDBY ELECTRONIC FLIGHT INSTRUMENT (SEPI)",
        "desc": "An isolated digital standby instrument powered by an independent dedicated lithium battery maintains artificial horizon, airspeed, and altitude even during total electrical bus failure."
      },
      {
        "title": "AUTOMATIC REVERSIONARY DISPLAY MODES",
        "desc": "If the Captain's PFD display screen fails, the system automatically shifts the PFD imagery onto the adjacent Navigation Display screen in under 100 milliseconds."
      }
    ],
    "quiz": {
      "question": "Which modern glass cockpit electronic display combines the artificial horizon, airspeed tape, barometric altimeter, and flight director crossbars into a single centralized screen?",
      "options": [
        "Primary Flight Display (PFD)",
        "Weather Radar Controller",
        "Cabin Audio Management Unit",
        "Emergency Locator Transmitter"
      ],
      "correctIndex": 0,
      "rationale": "The Primary Flight Display (PFD) is the centerpiece of the modern electronic glass cockpit. It consolidates all critical flight parameters\u2014pitch and roll attitude on the artificial horizon, calibrated airspeed tape on the left, barometric altitude tape on the right, vertical speed, and computerized flight guidance cues\u2014into one single screen directly in front of each pilot."
    }
  },
  "19": {
    "domain": "structure",
    "discipline": "CABIN SAFETY & PRESSURE SEALING",
    "chipColor": "#00ff9d",
    "icon": "\ud83d\udeaa",
    "assetImg": "assets/diagram_structures_gear.jpg",
    "simType": "structure",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 19: Aircraft Doors, Windows and Emergency Exits</strong> explores the structural engineering, fail-safe pressure containment, and passenger evacuation mechanisms built into modern aircraft fuselages.\n      </p>\n      <p class=\"section-p\">\n        At cruise altitude, an aircraft fuselage contains millions of liters of compressed air striving to burst outward with immense force. Every opening in the fuselage shell represents a major engineering challenge:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Plug-Type Passenger Doors:</strong> Engineered geometrically larger than their door frames. To close, the door translates inward, rotates slightly, and seats against mechanical stops on the inside of the door frame. Internal cabin air pressure (~8.6 psi) forces the door outward tighter against its door stops, making accidental opening in flight physically impossible.</li>\n        <li><strong>Stretched Acrylic Windows:</strong> Fabricated with curved, rounded corners to prevent extreme stress concentration points. The historic 1954 de Havilland Comet jetliner disasters proved that square windows create severe stress concentrations at their sharp corners, triggering explosive fatigue decompression. Modern windows feature dual structural acrylic panes with a tiny \"breather hole\" in the inner pane that balances pressure so the outer pane carries full flight pressure loads.</li>\n        <li><strong>90-Second Emergency Evacuation Slides:</strong> FAA FAR 25.803 mandates that an airliner must be capable of evacuating all passengers and crew within <strong>90 seconds</strong> in complete darkness with 50% of the emergency exits blocked. Inflatable slides deploy automatically in under 6 seconds using high-pressure nitrogen/aspirator pumps.</li>\n      </ul>\n    ",
    "formulaTitle": "DOOR PLUG RETENTION FORCE & STRESS CONCENTRATION FORMULAS",
    "formulaHtml": "$$ F_{\\text{door}} = \\Delta p \\cdot A_{\\text{door}} \\approx 8.6\\text{ psi} \\times 1,800\\text{ sq in} = 15,480\\text{ lbs (68.8 kN)} \\quad | \\quad K_t = \\frac{\\sigma_{\\text{max}}}{\\sigma_{\\text{nominal}}} $$",
    "formulaDesc": "Pressure Retention & Stress Concentration: Cabin pressure produces over 15,000 lbs (68 kN) of outward force on a standard passenger entry door, seating the plug wedges. Rounded window corners maintain stress concentration factor $K_t \\le 1.4$, avoiding the catastrophic fatigue limits of square cutouts.",
    "takeaways": [
      "Inward Plug Door Principle: Cabin differential pressure physically locks the door shut; no human or motor could force it open in flight.",
      "Round Window Geometry: Oval/curved passenger windows prevent fatal stress concentration spikes at sharp corners.",
      "90-Second Evacuation Rule: Aircraft certification requires full-passenger evacuation within 90 seconds with half the exits inoperative."
    ],
    "simDescription": "Simulate pressure force loading on inward plug doors and stress distribution around oval passenger windows during cabin pressurization.",
    "flowDescription": "Stress contour lines around rounded passenger window cutouts showing smooth hoop stress diversion through machined doubler plates.",
    "hotspotDescription": "Click the 5 pins to inspect cabin doors, passenger window panes, and emergency evacuation slide packs.",
    "hotspots": [
      {
        "id": 1,
        "x": 22,
        "y": 42,
        "title": "Inward Translating Plug Passenger Entry Door",
        "spec": "Cast Aluminum Alloy with Mechanical Stop Wedges",
        "stress": "Outward Pressure Clamping Force: 68.8 kN (15,480 lbs)",
        "status": "PRESSURE LOCKED IN FLIGHT"
      },
      {
        "id": 2,
        "x": 48,
        "y": 35,
        "title": "Dual-Pane Stretched Acrylic Passenger Window",
        "spec": "Mil-P-25690 Bi-Axially Stretched Acrylic",
        "stress": "Outer Pane Resists Full Differential: 8.6 psi",
        "status": "BURST PRESSURE MARGIN > 3.0X"
      },
      {
        "id": 3,
        "x": 58,
        "y": 35,
        "title": "Inner Window Pane Breather Bleed Hole",
        "spec": "Precision Calibrated Pin-Hole Orifice (0.5 mm)",
        "stress": "Equalizes Moisture & Keeps Outer Pane Primary",
        "status": "MOISTURE DESICCATED"
      },
      {
        "id": 4,
        "x": 32,
        "y": 68,
        "title": "Pneumatic Evacuation Slide Aspirator Pack",
        "spec": "Compressed Nitrogen/CO2 + Venturi Air Aspirator",
        "stress": "Deployment Time: 5.2 seconds (Certified < 6.0s)",
        "status": "GIRT BAR ARMED"
      },
      {
        "id": 5,
        "x": 75,
        "y": 45,
        "title": "Type III Overwing Emergency Exit Hatch",
        "spec": "Self-Disposing Inward-Plug Hatch with Mechanical Lock",
        "stress": "Flight Lock Solenoid Active Above 80 kts",
        "status": "FLIGHT LOCK ENGAGED"
      }
    ],
    "calcTitle": "CABIN DOOR RETENTION FORCE & EVACUATION CALCULATOR",
    "calcDesc": "Calculate outward pressure force holding plug door shut based on cabin differential pressure and door dimensions.",
    "calcParam1": {
      "label": "Cabin Differential Pressure (psi)",
      "min": 2.0,
      "max": 9.5,
      "val": 8.6,
      "unit": "psi",
      "step": 0.2
    },
    "calcParam2": {
      "label": "Door Height (inches)",
      "min": 60,
      "max": 80,
      "val": 72,
      "unit": "in",
      "step": 1
    },
    "tableTitle": "EMERGENCY EVACUATION & CABIN PRESSURE RETENTION CERTIFICATION",
    "tableIntro": "Official FAA FAR Part 25 evacuation slide tests and pressure boundary certification benchmarks:",
    "tableHeaders": [
      "EXIT TYPE",
      "DIMENSIONS",
      "EVACUATION RATE",
      "SLIDE INFLATION TIME",
      "RETENTION DESIGN",
      "CERTIFICATION"
    ],
    "tableRows": [
      [
        "Type A Main Door",
        "76\" \u00d7 42\" (Dual Lane)",
        "110 passengers / min",
        "5.2 seconds (Pneumatic)",
        "Mechanical Inward Plug Stops",
        "FAR 25.803 / 25.810"
      ],
      [
        "Type III Overwing",
        "38\" \u00d7 20\" (Single)",
        "45 passengers / min",
        "Off-Wing Slide 4.8 sec",
        "Spring-Balanced Plug Hatch",
        "FAR 25.807 Approved"
      ],
      [
        "Flight Deck Escape",
        "24\" \u00d7 20\" Roof Hatch",
        "Flight Crew Only",
        "Inertial Reel Rope Descent",
        "Internal Cockpit Latch",
        "FAA Part 25 Compliant"
      ],
      [
        "Cargo Hold Door",
        "106\" \u00d7 70\" (Outward)",
        "Non-Passenger Area",
        "N/A (No Slide)",
        "Positive Cam-Locks & Indication",
        "FAA AD 2002 Fail-Safe"
      ]
    ],
    "envelopeIntro": "Flight lock solenoids physically pin passenger and overwing exits shut as soon as takeoff airspeed exceeds 80 knots.",
    "integrationIntro": "Door arming girt bars connect evacuation slide packs to the cabin floor sill, while magnetic proximity sensors feed door status to EICAS.",
    "redundancyCards": [
      {
        "title": "DUAL-CHAMBER INFLATABLE EVACUATION SLIDES",
        "desc": "Evacuation slides are divided into independent upper and lower inflation chambers. If one chamber is punctured, the slide remains sufficiently rigid for safe evacuation."
      },
      {
        "title": "FLIGHT DECK DOOR PRESSURE-RELIEF LOUVERS",
        "desc": "The reinforced bulletproof flight deck door features calibrated blowout panels that pop open during sudden decompression, equalizing pressure to prevent cabin floor collapse."
      }
    ],
    "quiz": {
      "question": "Why are commercial airliner passenger windows designed with rounded, oval corners rather than sharp 90-degree square corners?",
      "options": [
        "Square corners create extreme stress concentration points that cause fatigue cracking under repeated pressurization cycles.",
        "Square windows are too heavy for passengers to open.",
        "Round windows are required by the international postal service.",
        "Square windows make the aircraft fly backwards."
      ],
      "correctIndex": 0,
      "rationale": "As demonstrated by the tragic crashes of the early 1954 de Havilland Comet jetliners, sharp 90-degree square cutouts in a pressurized fuselage create extreme stress concentration spikes (Kt > 3.0) at the corners. Repeated cabin pressurization cycles quickly caused fatigue cracks to nucleate and propagate from these sharp corners, leading to catastrophic explosive decompression. Rounded and oval windows eliminate stress concentration peaks, smoothly distributing hoop stress around the cutout."
    }
  },
  "20": {
    "domain": "structure",
    "discipline": "AIRCRAFT SUBSYSTEMS & FAIRINGS",
    "chipColor": "#00ff9d",
    "icon": "\u2699\ufe0f",
    "assetImg": "assets/diagram_structures_gear.jpg",
    "simType": "structure",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 20: Aircraft Components and Their Functions</strong> synthesizes the secondary aerodynamic structures, protective fairings, and auxiliary systems that complete a certified modern airframe.\n      </p>\n      <p class=\"section-p\">\n        Beyond the primary wings and fuselage, an aircraft integrates hundreds of specialized external components:\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>Nose Radome:</strong> A curved composite nose shell constructed from quartz or fiberglass with epoxy resin. It must be aerodynamically streamlined and structurally rigid against bird strikes while maintaining electrical dielectric transparency to allow 9.3 GHz X-band weather radar microwave beams to pass without attenuation.</li>\n        <li><strong>Aerodynamic Fairings (Fillets & Canoes):</strong> Curved junction fairings (e.g., wing-fuselage belly fairings) that eliminate boundary layer interference drag, and flap track canoes that enclose bulky flap drive mechanisms.</li>\n        <li><strong>Static Discharge Wicks:</strong> Conductive dacron wicks mounted along trailing edges that quietly bleed off intense electrostatic charges (up to 100,000 volts) accumulated during flight through precipitation, preventing radio and GPS interference.</li>\n        <li><strong>Auxiliary Power Unit (APU):</strong> A compact gas turbine engine installed in the unpressurized tailcone that drives a 90 kVA electrical generator and supplies pneumatic bleed air on the ground, enabling engine start without external ground carts.</li>\n        <li><strong>Ram Air Turbine (RAT):</strong> A spring-deployed emergency two-blade propeller dropped into the airstream if all engine electrical and hydraulic power is lost, providing hydraulic pressure to power flight controls during glide descent.</li>\n      </ul>\n    ",
    "formulaTitle": "INTERFERENCE DRAG & APU AUXILIARY POWER FORMULAS",
    "formulaHtml": "$$ C_{D,\\text{interference}} = C_{D,\\text{total}} - (C_{D,\\text{wing}} + C_{D,\\text{body}}) \\quad | \\quad P_{\\text{APU}} \\approx 90\\text{ kVA} + 45\\text{ psi bleed} \\quad | \\quad V_{\\text{RAT}} \\ge 130\\text{ kts} $$",
    "formulaDesc": "Secondary Systems Relations: Aerodynamic fairings reduce interference drag $C_{D,\\text{interference}}$ at wing-body junctions by up to 12%. The Ram Air Turbine (RAT) generates sufficient hydraulic power ($p \\ge 2,500\\text{ psi}$) down to 130 knots glide speed.",
    "takeaways": [
      "Dielectric Radome Precision: The nose cone must be mechanically robust against hail while remaining transparent to radar microwaves.",
      "Static Discharge Dissipation: Wicks continuously discharge friction-induced static electricity to maintain navigation and radio reception.",
      "Emergency RAT Power: The ram air turbine automatically drops into the airflow to provide life-saving hydraulic power if all engines flame out."
    ],
    "simDescription": "Deploy the Ram Air Turbine (RAT) and observe electrical power generation and hydraulic pressurization as a function of airspeed.",
    "flowDescription": "Interference airflow streamlines around the wing-fuselage aerodynamic fillet showing the elimination of corner flow separation.",
    "hotspotDescription": "Click the 5 pins to inspect peripheral airframe fairings, static wicks, and emergency auxiliary systems.",
    "hotspots": [
      {
        "id": 1,
        "x": 12,
        "y": 42,
        "title": "Quartz/Epoxy Dielectric Weather Radar Radome",
        "spec": "Honeycomb Core with Lightning Diverter Strips",
        "stress": "Dielectric Loss < 0.1 dB at 9.3 GHz X-Band",
        "status": "TRANSMISSION NOMINAL"
      },
      {
        "id": 2,
        "x": 48,
        "y": 62,
        "title": "Wing-Fuselage Belly Fairing Aerodynamic Fillet",
        "spec": "Autoclaved Carbon/Nomex Honeycomb Composite",
        "stress": "Eliminates 12% Interference Drag at Junction",
        "status": "SEALED & WATERPROOF"
      },
      {
        "id": 3,
        "x": 88,
        "y": 28,
        "title": "Wingtip Trailing Edge Static Discharge Wick",
        "spec": "Conductive Carbon-Impregnated Dacron Element",
        "stress": "Bleeds 50,000V Static Charge into Wake",
        "status": "RESISTANCE 6-120 MEGOHMS"
      },
      {
        "id": 4,
        "x": 84,
        "y": 72,
        "title": "Tailcone Auxiliary Power Unit (APU) Compartment",
        "spec": "Garrett/Honeywell 131-9A Gas Turbine (90 kVA)",
        "stress": "Continuous Electrical & Pneumatic Bleed Power",
        "status": "FADEC CONTROLLED / ON-DEMAND"
      },
      {
        "id": 5,
        "x": 55,
        "y": 78,
        "title": "Emergency Ram Air Turbine (RAT) Deployment Bay",
        "spec": "Hamilton Sundstrand 2-Blade Variable Pitch Propeller",
        "stress": "Hydraulic Output: 20 GPM at 3,000 psi (v > 130 kts)",
        "status": "SPRING ARMED IN GEAR BAY"
      }
    ],
    "calcTitle": "RAM AIR TURBINE (RAT) EMERGENCY POWER CALCULATOR",
    "calcDesc": "Calculate electrical and hydraulic emergency power generated by the deployed Ram Air Turbine at selected glide airspeed.",
    "calcParam1": {
      "label": "Glide Airspeed (v, kts)",
      "min": 110,
      "max": 280,
      "val": 180,
      "unit": "kts",
      "step": 10
    },
    "calcParam2": {
      "label": "Air Density Ratio (\u03c3 = \u03c1/\u03c10)",
      "min": 0.35,
      "max": 1.0,
      "val": 0.65,
      "unit": "sigma",
      "step": 0.05
    },
    "tableTitle": "PERIPHERAL AIRCRAFT COMPONENTS & AUXILIARY SYSTEM TELEMETRY",
    "tableIntro": "Certification performance parameters across auxiliary airframe components and safety devices:",
    "tableHeaders": [
      "COMPONENT",
      "LOCATION",
      "PRIMARY FUNCTION",
      "OPERATIONAL LIMIT",
      "FAILOVER MECHANISM",
      "CERTIFICATION"
    ],
    "tableRows": [
      [
        "Radome",
        "Fuselage Nose",
        "Weather Radar Enclosure",
        "Bird strike 4 lbs at 350 kts",
        "Solid Lightning Diverter Strips",
        "FAR 25.571"
      ],
      [
        "APU Turbine",
        "Unpressurized Tailcone",
        "Independent Ground/Flight Power",
        "Operating Ceiling FL410",
        "Automatic Fire Extinguisher",
        "FAR 25.831"
      ],
      [
        "Ram Air Turbine",
        "Belly Fairing Bay",
        "Emergency Hydraulic/Elec Power",
        "Deploys automatically in < 2 sec",
        "Manual Cockpit Drop Switch",
        "FAR 25.1351"
      ],
      [
        "Static Wicks",
        "Aileron & Rudder TE",
        "Dissipate Static St. Elmo's Fire",
        "50 kV Continuous Discharge",
        "Minimum 80% Wicks Present for MEL",
        "DO-160 Cat E"
      ]
    ],
    "envelopeIntro": "Minimum Equipment Lists (MEL) specify the allowable dispatch status for peripheral components (e.g., maximum allowed missing static wicks).",
    "integrationIntro": "Peripheral components interface with fire detection loops, pneumatic starter manifolds, and primary avionics databuses.",
    "redundancyCards": [
      {
        "title": "DUAL APU FIRE EXTINGUISHING BOTTLES",
        "desc": "The APU tail compartment contains twin Halon fire extinguisher bottles with optical infrared fire sensors that automatically shut down the engine and discharge agent."
      },
      {
        "title": "SOLID SOLID-STATE LIGHTNING DIVERTER STRIPS",
        "desc": "Metallic segmented strips on the exterior of the radome guide lightning strikes away from the delicate radar antenna directly into the metallic airframe ground plane."
      }
    ],
    "quiz": {
      "question": "What is the primary function of static discharge wicks mounted along the trailing edges of an aircraft's wings and empennage?",
      "options": [
        "To quietly bleed friction-induced static electrical charges into the air wake, preventing radio and navigation interference.",
        "To act as miniature antennas for passenger Wi-Fi.",
        "To measure wind speed during takeoff.",
        "To dump excess fuel in emergencies."
      ],
      "correctIndex": 0,
      "rationale": "As an aircraft speeds through clouds, rain, snow, or dust, friction between the airframe and particles causes a buildup of high-voltage electrostatic charge (precipitation static). If not dissipated, this charge sparks into the air, creating intense electromagnetic radio noise that blinds VHF radios, VOR navigation, and GPS. Static discharge wicks provide high-resistance points with sharp needles that safely bleed the charge off into the trailing slipstream as a silent corona discharge."
    }
  },
  "21": {
    "domain": "physics",
    "discipline": "CLASSICAL MECHANICS & FLIGHT ENERGETICS",
    "chipColor": "#00f0ff",
    "icon": "\u269b\ufe0f",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 21: Introduction to Physics in Aeronautics</strong> initiates Part 3 (Basic Physics for Flight), laying down the rigorous Newtonian mechanics, vector calculus, and thermodynamics underpinning atmospheric motion.\n      </p>\n      <p class=\"section-p\">\n        Every movement of an aircraft is governed by classical physics: conservation of mass (continuity equation), conservation of momentum (Navier-Stokes and Euler equations), and conservation of energy (First Law of Thermodynamics and Bernoulli's equation).\n      </p>\n      <p class=\"section-p\">\n        In this chapter, students explore translational and rotational degrees of freedom, the relationship between kinetic energy ($E_k = \\frac{1}{2}mv^2$) and gravitational potential energy ($E_p = mgh$), and how aircraft exchange altitude for airspeed during maneuvers and descents.\n      </p>\n    ",
    "formulaTitle": "CONSERVATION OF ENERGY & CONTINUITY EQUATIONS",
    "formulaHtml": "$$ E_{\\text{total}} = \\frac{1}{2} m v^2 + m g h = \\text{const} \\quad | \\quad A_1 v_1 = A_2 v_2 \\quad | \\quad p + \\frac{1}{2}\\rho v^2 = p_0 $$",
    "formulaDesc": "Energy & Continuity Relations: Total specific mechanical energy of an aircraft remains constant in unpowered flight. The continuity equation $A_1 v_1 = A_2 v_2$ demonstrates fluid velocity acceleration when streamlines constrict.",
    "takeaways": [
      "Conservation of Energy: In unpowered flight, potential energy (altitude) and kinetic energy (speed) are continuously exchanged.",
      "Continuity Principle: Fluid mass flow rate is conserved; when streamline area constricts, fluid velocity must accelerate.",
      "Equilibrium Law: Accelerations in pitch, roll, or yaw occur strictly when net external aerodynamic or thrust moments are non-zero."
    ],
    "simDescription": "Simulate the exchange between kinetic energy (airspeed) and potential energy (altitude) during zoom climbs and power-off dives.",
    "flowDescription": "Streamline contraction inside a convergent-divergent Venturi tube illustrating velocity acceleration and static pressure reduction.",
    "hotspotDescription": "Click the 5 pins to inspect physical energy conservation and kinematic measuring stations on the aircraft.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 42,
        "title": "Inertial Reference Unit (IRU) Accelerometer",
        "spec": "Ring Laser Gyroscope & Quartz Flexure Sensor",
        "stress": "Linear Acceleration Precision: 10 micro-G",
        "status": "ALIGNMENT NOMINAL"
      },
      {
        "id": 2,
        "x": 48,
        "y": 30,
        "title": "Total Energy Altimeter Sensor Port",
        "spec": "Diaphragm Differential Pressure Capsule",
        "stress": "Distinguishes Thermal Lift from Pilot Stick Pull",
        "status": "VARIOMETER COMPENSATED"
      },
      {
        "id": 3,
        "x": 68,
        "y": 45,
        "title": "Kinetic Energy Deceleration Speedbrake",
        "spec": "Upper Wing Carbon Composite Spoiler Panel",
        "stress": "Energy Dissipation Rate: 4.8 MW at 300 kts",
        "status": "SYMMETRICAL EXTENSION"
      },
      {
        "id": 4,
        "x": 35,
        "y": 75,
        "title": "Specific Excess Power (Ps) Climb Monitor",
        "spec": "Flight Management Computer Energy Rate Engine",
        "stress": "Max Ps = (T - D) \u00b7 v / W = 42 m/s",
        "status": "MAX RATE OF CLIMB"
      },
      {
        "id": 5,
        "x": 84,
        "y": 62,
        "title": "Aircraft Center of Mass Kinematic Datum",
        "spec": "Three-Axis Principal Inertia Coordinate System",
        "stress": "Moments of Inertia: Ixx, Iyy, Izz Monitored",
        "status": "DYNAMIC CROSS-COUPLING ZEROED"
      }
    ],
    "calcTitle": "AIRCRAFT SPECIFIC ENERGY & POTENTIAL CLIMB SOLVER",
    "calcDesc": "Calculate specific energy height (He = h + v\u00b2/2g) and maximum potential altitude gain if all kinetic airspeed were converted to height.",
    "calcParam1": {
      "label": "True Airspeed (v, kts)",
      "min": 100,
      "max": 500,
      "val": 300,
      "unit": "kts",
      "step": 10
    },
    "calcParam2": {
      "label": "Current Altitude (h, feet)",
      "min": 1000,
      "max": 40000,
      "val": 25000,
      "unit": "ft",
      "step": 1000
    },
    "tableTitle": "AIRCRAFT SPECIFIC ENERGY TRADEOFF SORTIE MATRIX",
    "tableIntro": "Flight test validation points measuring total specific energy conservation during zoom-climb maneuvers:",
    "tableHeaders": [
      "MANEUVER PHASE",
      "TRUE AIRSPEED",
      "ALTITUDE",
      "KINETIC ENERGY (Ek)",
      "POTENTIAL ENERGY (Ep)",
      "TOTAL ENERGY (He)"
    ],
    "tableRows": [
      [
        "Level Entry",
        "380 kts (195 m/s)",
        "15,000 ft (4,572 m)",
        "19,012 J/kg",
        "44,835 J/kg",
        "6,511 m Energy Height"
      ],
      [
        "Mid-Zoom (+3.0G)",
        "280 kts (144 m/s)",
        "18,200 ft (5,547 m)",
        "10,368 J/kg",
        "54,397 J/kg",
        "6,476 m (Mild Drag Loss)"
      ],
      [
        "Zoom Apex",
        "160 kts (82 m/s)",
        "21,050 ft (6,416 m)",
        "3,362 J/kg",
        "62,918 J/kg",
        "6,432 m (Conservation Confirmed)"
      ],
      [
        "Re-acceleration Dive",
        "320 kts (164 m/s)",
        "17,500 ft (5,334 m)",
        "13,448 J/kg",
        "52,308 J/kg",
        "6,410 m Level Return"
      ]
    ],
    "envelopeIntro": "Energy-Maneuverability (E-M) theory diagrams dictate the maximum sustained turn rates and specific excess power (Ps) envelopes.",
    "integrationIntro": "Specific excess power calculations link turbofan throttle control directly to automated climb profiles in the flight management computer.",
    "redundancyCards": [
      {
        "title": "TRIPLE REDUNDANT INERTIAL REFERENCE",
        "desc": "Three independent laser gyro units calculate aircraft acceleration vectors, voting out any sensor experiencing gyro drift or accelerometer bias."
      },
      {
        "title": "TOTAL ENERGY SENSOR FILTERING",
        "desc": "Flight management computers utilize Kalman filters to combine GPS position with inertial accelerations for drift-free kinematic tracking."
      }
    ],
    "quiz": {
      "question": "According to the principle of conservation of mechanical energy in flight, what happens to an unpowered aircraft when a pilot pulls up into a zoom climb?",
      "options": [
        "Kinetic energy (airspeed) is converted into gravitational potential energy (altitude), decreasing speed while increasing height.",
        "Both airspeed and altitude increase indefinitely.",
        "Potential energy disappears completely into the atmosphere.",
        "The aircraft mass increases proportionally with height."
      ],
      "correctIndex": 0,
      "rationale": "In accordance with energy conservation (He = h + v^2 / 2g), when no propulsive thrust is added, climbing to a higher altitude requires trading kinetic energy for gravitational potential energy. As altitude (potential energy) increases, airspeed (kinetic energy) must decrease, minus minor frictional drag losses."
    }
  },
  "24": {
    "domain": "physics",
    "discipline": "NEWTONIAN FLIGHT MECHANICS",
    "chipColor": "#00f0ff",
    "icon": "\u2696\ufe0f",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": "\n      <p class=\"section-p\">\n        <strong>Chapter 24: Newton's Three Laws of Motion</strong> examines how Sir Isaac Newton's 1687 <em>Philosophiae Naturalis Principia Mathematica</em> forms the bedrock of aeronautical engineering and flight vehicle dynamics.\n      </p>\n      <ul class=\"takeaway-bullet-list\">\n        <li><strong>First Law (Inertia):</strong> An aircraft remains in steady unaccelerated flight (constant velocity and heading) unless acted upon by a net unbalanced aerodynamic or propulsive force ($\\Sigma \\vec{F} = 0$).</li>\n        <li><strong>Second Law ($F = \\frac{d(mv)}{dt} = ma$):</strong> The rate of change of momentum is proportional to the net force applied. Angularly, torque equals moment of inertia times angular acceleration ($\\tau = I \\alpha$), dictating pitch, roll, and yaw acceleration rates.</li>\n        <li><strong>Third Law (Action and Reaction):</strong> For every action force, there is an equal and opposite reaction force. This governs both <strong>jet thrust</strong> (expelling high-velocity gas rearward creates forward thrust force) and <strong>aerodynamic lift</strong> (deflecting mass flow of air downward creates upward lift force).</li>\n      </ul>\n    ",
    "formulaTitle": "NEWTONIAN FLIGHT FORMULATIONS & MOMENTUM FLUX",
    "formulaHtml": "$$ \\vec{F} = \\frac{d(m\\vec{v})}{dt} = m\\vec{a} \\quad | \\quad L = \\dot{m}_{\\text{air}} \\cdot w_{\\text{downwash}} \\quad | \\quad T = \\dot{m}_{\\text{gas}} \\cdot (v_e - v_0) $$",
    "formulaDesc": "Newtonian Force Equations: Lift force $L$ equals the downward momentum flux of air deflected by the wings. Propulsive thrust $T$ equals mass flow rate $\\dot{m}$ times exhaust velocity increment $(v_e - v_0)$.",
    "takeaways": [
      "First Law Trim: Level flight requires zero net external force and zero net external pitching moment.",
      "Second Law Dynamics: Aircraft maneuverability is determined by the thrust-to-weight ratio and control surface moment arms.",
      "Third Law Lift & Thrust: Both lift and thrust are direct consequences of momentum transfer to fluid streams."
    ],
    "simDescription": "Adjust control surface deflection and engine thrust to observe translational and angular accelerations predicted by F = ma.",
    "flowDescription": "Action-reaction momentum streamlines showing downward air deflection (downwash) behind a high-lift wing.",
    "hotspotDescription": "Click the 5 pins to inspect Newtonian force and momentum measurement stations on the aircraft.",
    "hotspots": [
      {
        "id": 1,
        "x": 18,
        "y": 38,
        "title": "Cockpit Center of Inertia Accelerometer",
        "spec": "3-Axis Force-Balanced Accelerometer Array",
        "stress": "Instantaneous Load Factor n = (L + T_z) / W",
        "status": "SAMPLING AT 1,000 HZ"
      },
      {
        "id": 2,
        "x": 35,
        "y": 68,
        "title": "Turbofan Engine Exhaust Momentum Rake",
        "spec": "Total Pressure & Gas Velocity Transducer Array",
        "stress": "Jet Reaction Thrust: Fn = 120 kN",
        "status": "NEWTON 3RD LAW THRUST"
      },
      {
        "id": 3,
        "x": 62,
        "y": 28,
        "title": "Downwash Momentum Wake Deflection Grid",
        "spec": "Trailing Wake Rake Laser Doppler Velocimeter",
        "stress": "Vertical Momentum Deflection w = 18.5 m/s",
        "status": "NEWTONIAN LIFT CONFIRMED"
      },
      {
        "id": 4,
        "x": 82,
        "y": 42,
        "title": "Pitch Moment of Inertia (Iyy) Reference",
        "spec": "Principal Rotational Pitch Axis Sensor",
        "stress": "Torque tau = Iyy \u00b7 d\u00b2theta/dt\u00b2",
        "status": "DAMPING ACTIVE"
      },
      {
        "id": 5,
        "x": 50,
        "y": 82,
        "title": "Ground Reaction Strut Load Cells",
        "spec": "Piezoelectric Compression Landing Sensors",
        "stress": "Equal & Opposite Runway Reaction Force",
        "status": "TOUCHDOWN LOGGED"
      }
    ],
    "calcTitle": "NEWTONIAN LIFT & DOWNWASH MOMENTUM FLUX SOLVER",
    "calcDesc": "Calculate downward momentum flux and resulting aerodynamic lift based on wing mass flow capture rate and downwash velocity.",
    "calcParam1": {
      "label": "Air Mass Flow Rate (m_dot, kg/s)",
      "min": 5000,
      "max": 60000,
      "val": 28000,
      "unit": "kg/s",
      "step": 1000
    },
    "calcParam2": {
      "label": "Downwash Velocity (w, m/s)",
      "min": 5,
      "max": 40,
      "val": 25,
      "unit": "m/s",
      "step": 1
    },
    "tableTitle": "NEWTONIAN DYNAMICS ACCELERATION MATRIX \u2014 LEVEL & TURN RUNS",
    "tableIntro": "Flight test accelerometer readings confirming F = ma relationship during pitch and roll maneuvers:",
    "tableHeaders": [
      "MANEUVER",
      "MEASURED G-FORCE",
      "NET VERTICAL FORCE",
      "ANGULAR ACCEL",
      "THEORETICAL F=MA",
      "STATUS"
    ],
    "tableRows": [
      [
        "Steady Level",
        "+1.00 G",
        "0.0 kN (L = W)",
        "0.0 rad/s\u00b2",
        "Equilibrium Confirmed",
        "PASSED"
      ],
      [
        "Rapid Pitch-Up",
        "+2.50 G",
        "+1,050 kN (L > W)",
        "1.45 rad/s\u00b2",
        "Linear Acceleration Confirmed",
        "PASSED"
      ],
      [
        "60\u00b0 Banked Turn",
        "+2.00 G",
        "+700 kN centripetal",
        "0.0 rad/s\u00b2 (Steady)",
        "Centripetal F = m\u00b7v\u00b2/r verified",
        "PASSED"
      ],
      [
        "Zero-G Pushover",
        "0.00 G (Weightless)",
        "-700 kN net downward",
        "-0.85 rad/s\u00b2",
        "Parabolic Arc Nominals",
        "PASSED"
      ]
    ],
    "envelopeIntro": "The maneuvering flight envelope (V-n diagram) enforces structural acceleration limits (e.g. +2.5G / -1.0G) based on F = ma.",
    "integrationIntro": "Newtonian equations of motion are coded directly into digital fly-by-wire flight control computers to calculate required control deflections.",
    "redundancyCards": [
      {
        "title": "QUADRUPLE INERTIAL ACCELEROMETERS",
        "desc": "Four separate accelerometers per axis feed flight control computers to ensure accurate force sensing even with sensor failure."
      },
      {
        "title": "SOFTWARE G-LIMITER ENVELOPE PROTECTION",
        "desc": "Fly-by-wire control laws automatically back off elevator deflection if measured G-load approaches +2.5G, preventing pilot structural overstress."
      }
    ],
    "quiz": {
      "question": "How does Newton's Third Law of Motion explain the generation of aerodynamic lift by an aircraft wing?",
      "options": [
        "The wing forces a large mass of air downward (action), which produces an equal and opposite upward reaction force on the wing (lift).",
        "The wing creates high gravity above the aircraft.",
        "Air molecules stick to the bottom of the wing permanently.",
        "Lift occurs because cold air is heavier than hot air."
      ],
      "correctIndex": 0,
      "rationale": "Newton's Third Law states that every action force produces an equal and opposite reaction force. As an aircraft wing travels through the air at an angle of attack, it deflects an enormous mass flow of oncoming air downward (creating downwash). In direct reaction to pushing air downward, the air exerts an equal and opposite upward aerodynamic force on the wing, which is lift."
    }
  }
};

  // Master Global Curriculum Retriever with Intelligent Procedural Generation
  window.getChapterTopicCurriculum = function(chNum, meta) {
    const ch = Math.max(1, Math.min(1000, parseInt(chNum, 10) || 1));
    const rawData = (window.AERONAUTICS_CHAPTERS && window.AERONAUTICS_CHAPTERS[ch]) || {};
    const title = rawData.title || (meta && meta.title) || `Chapter ${ch}`;
    const part = rawData.part || (meta && meta.part) || `Part ${Math.ceil(ch / 10)}`;

    if (CHAPTER_PROFILES[ch]) {
      return CHAPTER_PROFILES[ch];
    }

    // Dynamic Topic Generator for all remaining chapters
    const t = title.toLowerCase();
    const p = part.toLowerCase();

    let domain = 'general';
    let discipline = 'AERONAUTICAL ENGINEERING & DESIGN';
    let chipColor = '#00f0ff';
    let icon = '✈️';
    let assetImg = 'assets/ebook_aerodynamics.png';
    let simType = 'airfoil';

    // Domain Classification
    if (t.includes('propul') || t.includes('engine') || t.includes('turbine') || t.includes('turbofan') || t.includes('combust') || t.includes('thrust') || t.includes('compressor') || p.includes('propulsion') || p.includes('engine')) {
      domain = 'propulsion';
      discipline = 'PROPULSION & JET ENGINES';
      chipColor = '#ffb700';
      icon = '🔥';
      assetImg = 'assets/ebook_engine.png';
      simType = 'engine';
    } else if (t.includes('cockpit') || t.includes('avionics') || t.includes('radar') || t.includes('instrument') || t.includes('autopilot') || t.includes('display') || t.includes('communication') || p.includes('avionics') || p.includes('cockpit')) {
      domain = 'avionics';
      discipline = 'AVIONICS & FLIGHT INSTRUMENTS';
      chipColor = '#c084fc';
      icon = '⚡';
      assetImg = (t.includes('radar') || t.includes('avionics')) ? 'assets/diagram_avionics_radar.jpg' : 'assets/ebook_cockpit.png';
      simType = 'pfd';
    } else if (t.includes('structur') || t.includes('fuselage') || t.includes('wing') || t.includes('spar') || t.includes('landing gear') || t.includes('gear') || t.includes('material') || t.includes('composite') || t.includes('stress') || p.includes('structure') || p.includes('anatomy')) {
      domain = 'structure';
      discipline = 'AIRFRAME STRUCTURES & MATERIALS';
      chipColor = '#00ff9d';
      icon = '📐';
      assetImg = 'assets/diagram_structures_gear.jpg';
      simType = 'structure';
    } else if (t.includes('mach') || t.includes('shock') || t.includes('supersonic') || t.includes('hypersonic') || t.includes('compressib') || p.includes('supersonic')) {
      domain = 'supersonic';
      discipline = 'HIGH-SPEED & SHOCK DYNAMICS';
      chipColor = '#f43f5e';
      icon = '⚡';
      assetImg = 'assets/diagram_supersonic_mach.jpg';
      simType = 'mach';
    } else if (t.includes('rocket') || t.includes('orbital') || t.includes('spacecraft') || t.includes('space') || t.includes('satellite') || p.includes('space') || p.includes('rocket')) {
      domain = 'orbit';
      discipline = 'SPACE SYSTEMS & ORBITAL MECHANICS';
      chipColor = '#a855f7';
      icon = '🚀';
      assetImg = 'assets/diagram_space_orbital.jpg';
      simType = 'orbit';
    } else if (t.includes('control') || t.includes('stability') || t.includes('rudder') || t.includes('elevator') || t.includes('aileron') || t.includes('roll') || t.includes('pitch') || t.includes('yaw') || p.includes('stability') || p.includes('control')) {
      domain = 'controls';
      discipline = 'FLIGHT DYNAMICS & CONTROL';
      chipColor = '#38bdf8';
      icon = '🕹️';
      assetImg = 'assets/diagram_flight_controls.jpg';
      simType = 'controls';
    } else if (t.includes('atmosphere') || t.includes('air') || t.includes('weather') || t.includes('meteorol') || t.includes('pressure') || t.includes('density') || p.includes('atmosphere') || p.includes('air')) {
      domain = 'atmosphere';
      discipline = 'ATMOSPHERIC PHYSICS & METEOROLOGY';
      chipColor = '#22d3ee';
      icon = '🌪️';
      assetImg = 'assets/diagram_atmosphere_weather.jpg';
      simType = 'atmosphere';
    } else if (t.includes('helicopter') || t.includes('rotor') || t.includes('vtol') || p.includes('helicopter')) {
      domain = 'rotorcraft';
      discipline = 'ROTORCRAFT & VTOL AERODYNAMICS';
      chipColor = '#34d399';
      icon = '🚁';
      assetImg = 'assets/diagram_rotorcraft_vtol.jpg';
      simType = 'rotor';
    } else if (t.includes('physics') || t.includes('force') || t.includes('speed') || t.includes('velocity') || t.includes('acceleration') || t.includes('energy') || t.includes('momentum') || t.includes('gravity') || p.includes('physics')) {
      domain = 'physics';
      discipline = 'APPLIED AEROSPACE PHYSICS';
      chipColor = '#00f0ff';
      icon = '⚛️';
      assetImg = 'assets/ebook_aerodynamics.png';
      simType = 'airfoil';
    }

    // Domain Specific Formulas
    let formulaTitle = `GOVERNING FORMULATION // CH ${ch} (${title.toUpperCase()})`;
    let formulaHtml = `$$ L = \\frac{1}{2} \\rho v^2 S C_L \\quad | \\quad \\sigma_{\\text{max}} = \\frac{M \\cdot y}{I} \\quad | \\quad \\Sigma \\vec{F} = m \\vec{a} $$`;
    let formulaDesc = `Governing Equations for ${title}: Relates the fluid dynamic, structural response, and kinematic variables under certified operational aerospace conditions.`;

    if (domain === 'propulsion') {
      formulaTitle = `BRAYTON THERMODYNAMIC CYCLE & JET THRUST FORMULATION // CH ${ch}`;
      formulaHtml = `$$ F_n = \\dot{m} (v_e - v_0) + (p_e - p_0) A_e \\quad | \\quad \\eta_{\\text{th}} = 1 - \\frac{1}{r_p^{(\\gamma-1)/\\gamma}} \\quad | \\quad TSFC = \\frac{\\dot{m}_f}{F_n} $$`;
      formulaDesc = `Thermodynamic Thrust Relations: Net propulsive thrust $F_n$ is produced by fluid momentum acceleration. Thermal efficiency $\\eta_{th}$ is governed by compressor pressure ratio $r_p$ and specific heat ratio $\\gamma = 1.4$.`;
    } else if (domain === 'avionics') {
      formulaTitle = `RADAR RANGE & AIR DATA COMPUTATION EQUATIONS // CH ${ch}`;
      formulaHtml = `$$ R_{\\text{max}} = \\sqrt[4]{\\frac{P_t G^2 \\lambda^2 \\sigma}{(4\\pi)^3 S_{\\text{min}}}} \\quad | \\quad q = \\frac{1}{2} \\rho v^2 \\quad | \\quad \\Delta f = \\frac{2 v f_0}{c} $$`;
      formulaDesc = `Avionics Signal & Sensor Equations: Radar detection range $R_{\\text{max}}$ depends on radiated power $P_t$, antenna gain $G$, wavelength $\\lambda$, and radar cross section $\\sigma$. Doppler shift $\\Delta f$ enables direct target closure rate tracking.`;
    } else if (domain === 'structure') {
      formulaTitle = `STRUCTURAL BEAM BENDING & DAMAGE TOLERANCE // CH ${ch}`;
      formulaHtml = `$$ \\sigma = \\frac{M \\cdot y}{I} \\quad | \\quad \\tau = \\frac{V \\cdot Q}{I \\cdot t} \\quad | \\quad K_I = \\sigma \\sqrt{\\pi a} \\le K_{Ic} $$`;
      formulaDesc = `Structural Mechanics Formulations: Bending stress $\\sigma$ and shear flow $\\tau$ through thin-walled sections. Fracture mechanics stress intensity factor $K_I$ must remain below critical fracture toughness $K_{Ic}$ to ensure fail-safe damage tolerance.`;
    } else if (domain === 'supersonic') {
      formulaTitle = `COMPRESSIBLE GAS DYNAMICS & SHOCK RELATIONS // CH ${ch}`;
      formulaHtml = `$$ \\sin(\\mu) = \\frac{1}{M} \\quad | \\quad \\frac{p_2}{p_1} = \\frac{2\\gamma M_1^2 - (\\gamma - 1)}{\\gamma + 1} \\quad | \\quad C_{D,\\text{wave}} \\propto (M^2 - 1)^{-1/2} $$`;
      formulaDesc = `Supersonic Shock Formulations: Mach cone angle $\\mu$, normal shock static pressure ratio, and Ackeret supersonic wave drag formulation. High Mach velocities generate steep static pressure and temperature jumps across oblique shocks.`;
    } else if (domain === 'atmosphere') {
      formulaTitle = `BAROMETRIC LAPSE & DENSITY EQUATIONS // CH ${ch}`;
      formulaHtml = `$$ T = T_0 - L \\cdot h \\quad | \\quad p = p_0 \\left(1 - \\frac{Lh}{T_0}\\right)^{\\frac{gM}{RL}} \\quad | \\quad \\rho = \\frac{p}{R_s T} $$`;
      formulaDesc = `Hydrostatic Atmosphere Model: Relates geopotential altitude $h$ to temperature, barometric pressure, and air density using standard ICAO lapse rate $L = 0.0065\\text{ K/m}$.`;
    } else if (domain === 'controls') {
      formulaTitle = `STABILITY DERIVATIVES & MOMENT EQUATIONS // CH ${ch}`;
      formulaHtml = `$$ C_m = C_{m0} + C_{m\\alpha} \\alpha + C_{m\\delta e} \\delta e \\quad | \\quad \\tau = I \\cdot \\vec{\\alpha} \\quad | \\quad C_{n\\beta} > 0 $$`;
      formulaDesc = `Flight Stability & Control Derivatives: Longitudinal pitch moment coefficient $C_m$ and static margin, where static pitch stability requires $C_{m\\alpha} < 0$, and directional weathercock stability requires $C_{n\\beta} > 0$.`;
    } else if (domain === 'physics') {
      formulaTitle = `NEWTONIAN LAWS & FLUID CONTINUITY EQUATIONS // CH ${ch}`;
      formulaHtml = `$$ \\vec{F} = m\\vec{a} \\quad | \\quad E = \\frac{1}{2}mv^2 + mgh \\quad | \\quad A_1 v_1 = A_2 v_2 $$`;
      formulaDesc = `Fundamental Physics Formulations: Relates force vectors, kinetic and potential mechanical energy exchange, and the volumetric fluid continuity law in atmospheric flight.`;
    }

    return {
      domain: domain,
      discipline: discipline,
      chipColor: chipColor,
      icon: icon,
      assetImg: assetImg,
      simType: simType,
      overviewHtml: `
        <p class="section-p">
          <strong>Chapter ${ch}: ${title}</strong> is a dedicated constituent of <em>${part}</em>. This chapter delivers the foundational engineering principles, physical formulations, and operational methodologies governing <strong>${title}</strong> in certified aerospace design.
        </p>
        <p class="section-p">
          In certified aviation, mastering <strong>${title}</strong> requires strict adherence to physical conservation laws, material finite element analysis, computational fluid dynamics (CFD), and compliance testing under FAR/EASA Part 25 airworthiness standards.
        </p>
        <p class="section-p">
          Throughout this chapter, students investigate the operational constraints, thermodynamic margins, failure modes, and multi-disciplinary systems architectures that enable <strong>${title}</strong> to achieve optimal safety and mission efficiency across the flight envelope.
        </p>
      `,
      formulaTitle: formulaTitle,
      formulaHtml: formulaHtml,
      formulaDesc: formulaDesc,
      takeaways: [
        `Core Principle: Engineering ${title} requires continuous optimization between structural strength, aerodynamic efficiency, and operational weight.`,
        `Safety Certification: All operational mechanisms must satisfy FAR/CS Part 25 damage tolerance and minimum 1.5x ultimate safety margins.`,
        `Integrated Architecture: Performance in ${title} directly couples with primary avionics, electrical busses, and flight control authority.`
      ],
      simDescription: `Simulate the aerodynamic and structural response variables for ${title}. Use the interactive sliders below to adjust operational parameters and observe real-time telemetry.`,
      flowDescription: `Physical boundary layer, stress distribution, and sensor flow architecture for ${title} under certified flight conditions.`,
      hotspotDescription: `Click any of the 5 numbered inspection pins on the blueprint below to examine metallurgy, stress load thresholds, and inspection limits for ${title}.`,
      hotspots: [
        { id: 1, x: 20, y: 35, title: `Primary Inspection Station // ${title}`, spec: '7075-T6 High-Strength Aluminum Alloy', stress: '280 MPa (Certified Limit: 480 MPa)', status: 'STRUCTURAL INTEGRITY CERTIFIED' },
        { id: 2, x: 48, y: 28, title: `Secondary Load Path // ${title}`, spec: 'Ti-6Al-4V Grade 5 Titanium Forging', stress: '165 MPa (Certified Limit: 390 MPa)', status: 'ZERO DEFECTS' },
        { id: 3, x: 74, y: 42, title: `Dynamic Actuation Link // ${title}`, spec: '15-5 PH Precipitation Hardened Stainless Steel', stress: '310 MPa (Certified Limit: 620 MPa)', status: 'SYNCHRONIZED' },
        { id: 4, x: 35, y: 72, title: `Structural Attachment Lug // ${title}`, spec: 'IM7/8552 Carbon Fiber Composite Laminate', stress: '190 MPa (Certified Limit: 410 MPa)', status: 'ULTRASONICALLY SCANNED' },
        { id: 5, x: 86, y: 65, title: `Environmental Shielding // ${title}`, spec: 'Polyurethane Elastomeric Anti-Erosion Coating', stress: 'UV & Lightning Grounded', status: 'INSPECTION NOMINAL' }
      ],
      calcTitle: `REAL-TIME PARAMETER SOLVER // CH ${ch} (${title.toUpperCase()})`,
      calcDesc: `Calculate quantitative performance parameters and safety margins for ${title} based on current flight variables.`,
      calcParam1: { label: 'Operational Speed (v, kts)', min: 60, max: 500, val: 240, unit: 'kts' },
      calcParam2: { label: 'Dynamic Load Parameter', min: 1, max: 20, val: 8, unit: 'Units' },
      tableTitle: `FLIGHT TEST SORTIE TELEMETRY MATRIX — CH ${ch} (${title})`,
      tableIntro: `Empirical flight test validation points recorded during experimental certification sorties for ${title}:`,
      tableHeaders: ['SORTIE', 'FLIGHT CONDITION', 'AIRSPEED', 'G-LOAD (n)', 'MEASURED RESPONSE', 'CERTIFICATION'],
      tableRows: [
        ['TR-01 (Low Speed)', 'Takeoff Rotation & Initial Climb', '140 kts', '+1.20 G', 'Nominal Structural Load', 'PASSED'],
        ['TR-02 (High Cruise)', 'Transonic Cruise (FL350)', '450 kts', '+1.00 G', 'Optimal Aerodynamic Efficiency', 'CERTIFIED'],
        ['TR-03 (High-G Turn)', 'Maneuver Boundary Exploration', '260 kts', '+2.50 G', 'Flutter Margin > 20%', 'VERIFIED'],
        ['TR-04 (Emergency Dive)', 'Maximum Design Speed (Vd)', '380 kts', '+1.00 G', 'Zero Aeroelastic Divergence', 'APPROVED']
      ],
      envelopeIntro: `The operational structural envelope for ${title} establishes flight boundaries to prevent plastic deformation or catastrophic flutter divergence.`,
      integrationIntro: `In modern aircraft, ${title} interfaces directly with primary flight computers, hydraulic power distributions, and avionics communication buses.`,
      redundancyCards: [
        { title: 'DUAL-CHANNEL FAILOVER ARCHITECTURE', desc: `Critical sensors and linkages for ${title} feature isolated Primary (Lane A) and Secondary (Lane B) channels with automatic 5ms failover.` },
        { title: 'TRIPLE-VOTING ARBITRATION', desc: `Flight control computers compare data from three independent telemetry channels, automatically isolating outlier signals before command output.` }
      ],
      quiz: {
        question: `When analyzing ${title}, which engineering consideration is most critical for ensuring airworthiness compliance under FAR/CS Part 25?`,
        options: [
          `Maintaining structural margins of safety, aeroelastic stability, and fail-safe redundancy across the entire flight envelope.`,
          `Ensuring zero air friction on the fuselage at all times.`,
          `Relying entirely on manual mechanical cables with zero electronic sensors.`,
          `Restricting flight operations exclusively to sea level altitudes.`
        ],
        correctIndex: 0,
        rationale: `Airworthiness certification under FAR/CS Part 25 requires demonstrable structural margins of safety (minimum 1.5x ultimate load), flutter clearance, and redundant fail-safe load paths for ${title}.`
      }
    };
  };

})();
