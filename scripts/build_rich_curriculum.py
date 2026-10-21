# -*- coding: utf-8 -*-
"""
Curriculum Builder for Aeronautics E-Book
Generates chapter_curriculum.js with rich, unique, topic-specific content
for each chapter across all 6 pages.
"""

import json
import re

OUTPUT_PATH = r"d:\Hetsh\Aeronautics E-book\chapter_curriculum.js"

CHAPTER_PROFILES = {}

# CH 1: Introduction to Aeronautics
CHAPTER_PROFILES[1] = {
    "domain": "foundations",
    "discipline": "AERONAUTICS & FLUID MECHANICS",
    "chipColor": "#00f0ff",
    "icon": "✈️",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 1: Introduction to Aeronautics</strong> introduces the physical science, theoretical principles, and mathematical frameworks governing the motion of vehicles through the Earth's atmosphere. Aeronautics encompasses fluid dynamics, thermodynamics, structural mechanics, flight dynamics, and propulsion systems working in unison.
      </p>
      <p class="section-p">
        Aeronautical flight is defined as travel within the Earth's gaseous atmosphere below the <strong>Kármán line (100 km / 62.1 miles altitude)</strong>, above which the atmosphere is too rarefied to sustain aerodynamic lift at sub-orbital speeds, marking the boundary with astronautics.
      </p>
      <p class="section-p">
        In this foundational chapter, students master the core aerodynamic variables: static pressure ($p$), air density ($\\rho$), temperature ($T$), dynamic pressure ($q = \\frac{1}{2}\\rho v^2$), Reynolds number ($Re$), and Mach number ($M$). We establish the dimensional analysis conventions that enable sub-scale wind tunnel models to accurately predict the performance of full-scale commercial and military aircraft.
      </p>
    """,
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
        { "id": 1, "x": 15, "y": 35, "title": "Forward Stagnation Point Probe", "spec": "Heated Stainless Steel Pitot-Static Sensor", "stress": "Total Pressure P0 = 101.3 kPa", "status": "CALIBRATED / ICE PROTECTED" },
        { "id": 2, "x": 42, "y": 22, "title": "Suction Peak Surface Taps", "spec": "Flush Piezo-Resistive Pressure Transducers", "stress": "Minimum Cp = -1.82 (Max Suction)", "status": "SAMPLING AT 1,000 HZ" },
        { "id": 3, "x": 68, "y": 45, "title": "Boundary Layer Transition Microphone", "spec": "Surface Micro-Electro-Mechanical Array", "stress": "Tollmien-Schlichting Wave Frequency: 2.4 kHz", "status": "TRANSITION AT 42% CHORD" },
        { "id": 4, "x": 88, "y": 60, "title": "Trailing Edge Wake Rake", "spec": "Multi-Tube Total Pressure Rake Assembly", "stress": "Profile Drag Integration CD0 = 0.0082", "status": "WAKE DEFICIT COMPUTED" },
        { "id": 5, "x": 50, "y": 80, "title": "Internal Strain Gauge Balance", "spec": "Maraging Steel 6-Component Balance", "stress": "Lift: 12.4 kN | Drag: 840 N | Pitch: 320 N·m", "status": "TEMPERATURE COMPENSATED" }
    ],
    "calcTitle": "DYNAMIC PRESSURE & AERODYNAMIC LIFT SOLVER",
    "calcDesc": "Calculate dynamic pressure and resultant lift force based on true airspeed and reference wing area.",
    "calcParam1": { "label": "True Airspeed (v, kts)", "min": 80, "max": 500, "val": 250, "unit": "kts" },
    "calcParam2": { "label": "Air Density (ρ, kg/m³)", "min": 0.3, "max": 1.3, "val": 1.225, "unit": "kg/m³", "step": 0.05 },
    "tableTitle": "AERODYNAMIC CERTIFICATION TEST POINTS — LEVEL FLIGHT POLARS",
    "tableIntro": "Baseline flight test data points measuring lift-to-drag ratios and parasite drag coefficients across the certified operational envelope:",
    "tableHeaders": ["SORTIE", "AIRSPEED (KTS)", "MACH NO", "ANGLE OF ATTACK", "LIFT COEFFICIENT (CL)", "L/D RATIO"],
    "tableRows": [
        ["RUN-01 (Stall Margin)", "115 kts", "M 0.17", "12.5°", "1.42", "9.4:1"],
        ["RUN-02 (Best Climb)", "180 kts", "M 0.27", "6.2°", "0.68", "16.8:1"],
        ["RUN-03 (Max Range Cruise)", "280 kts", "M 0.43", "2.8°", "0.34", "18.2:1 (Peak)"],
        ["RUN-04 (High-Speed Dash)", "420 kts", "M 0.64", "0.8°", "0.18", "11.5:1"]
    ],
    "envelopeIntro": "The aerodynamic operating envelope dictates the minimum flying speed (stall limit) and structural maximum design dive speed (Vd/Md).",
    "integrationIntro": "Aerodynamic surface pressure distributions directly couple with airframe aeroelastic deflection and flight control actuator loads.",
    "redundancyCards": [
        { "title": "DUAL INDEPENDENT PITOT-STATIC SYSTEMS", "desc": "Aircraft employ separate Captain and First Officer pitot tubes and static ports with automated air data computer cross-comparison to detect icing or sensor blockages." },
        { "title": "HEATED ANGLE-OF-ATTACK VANES", "desc": "Triple-vane angle-of-attack resolvers provide independent stall warning signals to the flight management computers and stick shaker actuators." }
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
}

# CH 2: History of Human Flight
CHAPTER_PROFILES[2] = {
    "domain": "history",
    "discipline": "AVIATION HISTORY & PIONEERING FLIGHT",
    "chipColor": "#38bdf8",
    "icon": "📜",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 2: History of Human Flight</strong> chronicles humanity's multi-millennial quest to transcend terrestrial bounds and master the atmosphere. From the ancient Greek myth of Icarus and the kite experiments of ancient China to Leonardo da Vinci's visionary 1485 <em>Codex on the Flight of Birds</em>, the quest for flight was long hindered by the assumption that humans must imitate the flapping wings of birds (ornithopters).
      </p>
      <p class="section-p">
        The decisive breakthrough occurred in 1799 when English engineer <strong>Sir George Cayley</strong> etched a silver disc with the fundamental vectors of flight: lift, drag, and thrust. Cayley realized that the mechanism producing aerodynamic lift must be completely separated from the mechanism producing forward thrust. By introducing a fixed cambered wing, an aft empennage (tailplane) for longitudinal and directional stability, and a separate propulsive source, Cayley founded modern aeronautical science.
      </p>
      <p class="section-p">
        In the late 19th century, German pioneer <strong>Otto Lilienthal</strong> conducted over 2,000 documented hang-glider flights from his artificial hill outside Berlin. Lilienthal published precise aerodynamic tables proving the superior lifting efficiency of cambered (arched) surfaces over flat plates, sacrificing his life in 1896 with his famous dying words: <em>"Sacrifices must be made."</em>
      </p>
      <p class="section-p">
        Inspired by Lilienthal, <strong>Wilbur and Orville Wright</strong> in Dayton, Ohio recognized that earlier experimenters had solved lift and thrust, but lacked <em>controllability</em> in three dimensions. In 1901, the Wrights built a wind tunnel to correct John Smeaton's 18th-century air pressure coefficient. They engineered their patented <strong>three-axis flight control system</strong>: wing-warping for lateral roll, a forward canard elevator for longitudinal pitch, and an interconnected rear rudder for directional yaw.
      </p>
      <p class="section-p">
        On <strong>December 17, 1903</strong> at Kill Devil Hills near Kitty Hawk, North Carolina, Orville Wright flew the <em>Wright Flyer</em> for 12 seconds over 120 feet of sand—the world's first powered, controlled, sustained heavier-than-air flight. Aviation then advanced at breakneck speed: Louis Blériot crossed the English Channel in 1909, Charles Lindbergh flew solo across the Atlantic in 1927 in the <em>Spirit of St. Louis</em>, Frank Whittle and Hans von Ohain independently developed the turbojet engine in the late 1930s, Chuck Yeager broke the sound barrier in the rocket-powered Bell X-1 in 1947, and the jetliner revolution was cemented with the Boeing 707 and the supersonic Concorde.
      </p>
    """,
    "formulaTitle": "HISTORIC LIFT EQUATION & THREE-SURFACE FORCE SEPARATION",
    "formulaHtml": "$$ L = k \\cdot S \\cdot v^2 \\cdot C_L \\quad \\text{and} \\quad \\frac{L}{D} = \\frac{1}{\\tan(\\gamma)} \\quad \\text{and} \\quad P_{\\text{req}} = D \\cdot v $$",
    "formulaDesc": "Historic Smeaton Lift & Glide Equation: Utilized by Otto Lilienthal and corrected by Wilbur & Orville Wright in their 1901 wind tunnel. $k$ is Smeaton's coefficient (corrected by the Wrights from 0.0054 to 0.0033 lb·s²/ft⁴), $S$ is wing reference area (510 sq ft on the 1903 Flyer), $v$ is airspeed, and $L/D$ dictates glide descent angle $\\gamma$.",
    "takeaways": [
        "Separation of Lift & Thrust (Cayley 1799): Modern aviation began when fixed wings for lift were decoupled from forward propulsion.",
        "Three-Axis Aerodynamic Control (Wright 1903): The true breakthrough of powered flight was pitch, roll, and yaw control, not merely installing an engine.",
        "Empirical Wind Tunnel Testing: The Wrights constructed one of the world's first precision wind tunnels in 1901, testing 200+ airfoils to correct historical Smeaton tables."
    ],
    "simDescription": "Simulate early 20th-century low-speed cambered airfoil aerodynamics (Reynolds number ~100,000, 30 mph flight speed) as tested by the Wright brothers and Otto Lilienthal.",
    "flowDescription": "Early wind tunnel visualization of smoke streamlines across a thick cambered Wright-style wooden airfoil showing laminar attachment and trailing edge stall separation.",
    "hotspotDescription": "Click the 5 inspection pins below to examine the anatomy of the historic 1903 Wright Flyer biplane airframe and flight control systems.",
    "hotspots": [
        { "id": 1, "x": 18, "y": 35, "title": "Forward Biplane Canard Elevator", "spec": "Spruce Wood Spars & Fine Muslin Fabric", "stress": "Pitch Angular Deflection ±18°", "status": "VERIFIED / BALANCED DOWNDRAFT" },
        { "id": 2, "x": 45, "y": 28, "title": "Wing-Warping Cable Pulleys & Hip Cradle", "spec": "Braided Steel Rigging Wire & Ash Pulleys", "stress": "Tip Twist Limit: 8.5° Differential", "status": "RIGGING WIRE TENSION CERTIFIED" },
        { "id": 3, "x": 38, "y": 72, "title": "Custom 12-HP 4-Cylinder Engine", "spec": "Cast Aluminum-Copper Alloy Crankcase (Charlie Taylor)", "stress": "Output: 12 HP @ 1,020 RPM (Weight: 180 lbs)", "status": "GRAVITY FUEL FLOW NOMINAL" },
        { "id": 4, "x": 62, "y": 55, "title": "Twin Counter-Rotating Pusher Propellers", "spec": "Laminated Carved Spruce Wood Airfoils", "stress": "Shaft Speed: 350 RPM (Bicycle Chain Drive)", "status": "TORQUE ZEROED / BALANCED" },
        { "id": 5, "x": 84, "y": 40, "title": "Twin Vertical Rear Rudders", "spec": "Ash Wood Frames & Irish Linen Covering", "stress": "Yaw Authority: ±20° Deflection", "status": "ADVERSE YAW CANCEL ACTIVE" }
    ],
    "calcTitle": "HISTORIC WRIGHT FLYER LIFT & POWER REQUIRED SOLVER",
    "calcDesc": "Calculate whether the 1903 Wright Flyer generates sufficient aerodynamic lift to overcome its 750 lb gross weight at given headwind and airspeed.",
    "calcParam1": { "label": "Airspeed Over Wings (v, mph)", "min": 18, "max": 45, "val": 30, "unit": "mph" },
    "calcParam2": { "label": "Wing Area (S, sq ft)", "min": 350, "max": 600, "val": 510, "unit": "sq ft" },
    "tableTitle": "HISTORIC POWERED FLIGHT SORTIE LOG — KILL DEVIL HILLS (DECEMBER 17, 1903)",
    "tableIntro": "Official flight test telemetry logs recorded by Wilbur and Orville Wright during the four historic powered flights on the sands of Kitty Hawk, North Carolina:",
    "tableHeaders": ["FLIGHT RUN", "PILOT IN COMMAND", "FLIGHT TIME", "DISTANCE (GROUND)", "AIRSPEED", "HISTORIC SIGNIFICANCE"],
    "tableRows": [
        ["Flight 1 (10:35 AM)", "Orville Wright", "12.0 seconds", "120 ft (36.5 m)", "30.0 mph (48 km/h)", "First controlled, sustained, powered heavier-than-air flight in world history"],
        ["Flight 2 (11:20 AM)", "Wilbur Wright", "13.0 seconds", "175 ft (53.3 m)", "31.5 mph (51 km/h)", "Confirmed repeatability and longitudinal elevator pitch authority in 27 mph gale"],
        ["Flight 3 (11:40 AM)", "Orville Wright", "15.0 seconds", "200 ft (61.0 m)", "31.0 mph (50 km/h)", "Demonstrated lateral roll correction using wing-warping over gusting dunes"],
        ["Flight 4 (12:00 PM)", "Wilbur Wright", "59.0 seconds", "852 ft (259.7 m)", "34.0 mph (55 km/h)", "Record flight of the day, proving practical point-to-point air navigation"]
    ],
    "envelopeIntro": "The flight envelope of early pioneer aircraft was severely restricted by low engine power-to-weight ratios and narrow margins between stall speed (24 mph) and maximum level speed (34 mph).",
    "integrationIntro": "Evolution of aeronautical engineering materials and systems from early wooden wire-braced biplanes to modern composite fly-by-wire transports.",
    "redundancyCards": [
        { "title": "TWIN COUNTER-ROTATING PROPELLERS", "desc": "To prevent dangerous gyroscopic precession and torque roll from spinning props, the Wrights ran crossed bicycle chains to spin the two 8.5-foot spruce propellers in opposite directions." },
        { "title": "WING-WARPING & RUDDER INTERCONNECT", "desc": "Wilbur Wright discovered that warping wingtips to roll caused adverse yaw. By interconnecting the hip cradle to the rear rudder, the Flyer achieved the world's first coordinated banked turns." }
    ],
    "quiz": {
        "question": "Who is historically recognized as the 'Father of Aeronautics' for first separating the generation of lift from forward propulsive thrust in 1799?",
        "options": [
            "Sir George Cayley",
            "Leonardo da Vinci",
            "Otto Lilienthal",
            "Clément Ader"
        ],
        "correctIndex": 0,
        "rationale": "In 1799, Sir George Cayley engraved a silver medallion showing the separate vectors of lift, drag, and thrust. By replacing flapping ornithopter wings with fixed cambered wings for lift and separate propulsion for thrust, Cayley laid down the architecture of all modern airplanes."
    }
}

# CH 3: What Is an Aircraft?
CHAPTER_PROFILES[3] = {
    "domain": "classification",
    "discipline": "AIRCRAFT DESIGN & TAXONOMY",
    "chipColor": "#00ff9d",
    "icon": "📐",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 3: What Is an Aircraft?</strong> delivers the rigorous legal, physical, and engineering definition of atmospheric flight vehicles. Under <strong>ICAO Annex 7</strong> and <strong>FAA 14 CFR Part 1</strong>, an aircraft is formally defined as: <em>"Any machine that can derive support in the atmosphere from the reactions of the air other than the reactions of the air against the earth's surface."</em>
      </p>
      <p class="section-p">
        This definition creates two critical distinctions:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Exclusion of Hovercraft:</strong> Ground-effect hovercraft (hovercraft/ACVs) rely on a trapped pressurized air cushion reacting against the surface below, and are therefore legally classed as marine vessels, not aircraft.</li>
        <li><strong>Aerostats vs. Aerodynes:</strong> Aircraft are bifurcated into <em>Aerostats</em> (lighter-than-air vehicles using Archimedes' buoyant principle: hot-air balloons, gas airships, blimps) and <em>Aerodynes</em> (heavier-than-air vehicles using dynamic aerodynamic forces: airplanes, gliders, helicopters, gyrocopters, tiltrotors).</li>
      </ul>
      <p class="section-p">
        Every heavier-than-air aircraft must integrate five primary sub-architectures: lifting surfaces (wings or rotors), a structural fuselage, a stabilizing empennage, landing gear, and a flight control mechanism.
      </p>
    """,
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
        { "id": 1, "x": 20, "y": 40, "title": "Type Certificate Data Plate (FAA/EASA)", "spec": "Stainless Steel Embossed Airworthiness Plaque", "stress": "Part 23/25 Normal & Transport Category", "status": "SERIAL NUMBER RECORDED" },
        { "id": 2, "x": 50, "y": 30, "title": "Primary Wing-Fuselage Carry-Through Forging", "spec": "7050-T7451 Die-Forged Aluminum Spar Joint", "stress": "Limit Load Factor: +3.8 G / -1.52 G", "status": "ULTRASONICALLY INSPECTED" },
        { "id": 3, "x": 75, "y": 35, "title": "Empennage Stability Attachment Bulkhead", "spec": "Carbon Fiber Multi-Rib Torque Box", "stress": "Yaw Bending Moment: 45 kN·m", "status": "AEROELASTICALLY CERTIFIED" },
        { "id": 4, "x": 35, "y": 75, "title": "Propulsion Pylon Dynamic Isolation Isolator", "spec": "Inconel 718 High-Temperature Shear Pins", "stress": "Max Continuous Thrust: 28 kN", "status": "DUAL FIREWALL SEALED" },
        { "id": 5, "x": 50, "y": 85, "title": "Emergency Locator Transmitter (ELT 406 MHz)", "spec": "Impact-Activated G-Switch & Satellite Beacon", "stress": "100G Shock Certified / COSPAS-SARSAT", "status": "BATTERY ARMED" }
    ],
    "calcTitle": "AIRCRAFT WING LOADING & WEIGHT RATIO CALCULATOR",
    "calcDesc": "Calculate wing loading (W/S) and power-to-weight ratio to determine aircraft category and stall characteristics.",
    "calcParam1": { "label": "Maximum Takeoff Weight (MTOW, kg)", "min": 500, "max": 70000, "val": 5400, "unit": "kg", "step": 100 },
    "calcParam2": { "label": "Reference Wing Area (S, m²)", "min": 10, "max": 150, "val": 32, "unit": "m²", "step": 1 },
    "tableTitle": "AIRCRAFT CATEGORIZATION MATRIX — FAA/ICAO AIRWORTHINESS STANDARDS",
    "tableIntro": "Regulatory classification benchmarks across standard civilian and military aircraft categories:",
    "tableHeaders": ["CATEGORY", "REGULATION", "MTOW LIMIT", "PASSENGERS", "LOAD FACTOR LIMIT", "PRIMARY CERTIFICATION"],
    "tableRows": [
        ["Light Sport (LSA)", "ASTM F2245", "600 kg (1,320 lbs)", "Max 2", "+4.0 G / -2.0 G", "Day VFR Recreational"],
        ["Normal / Utility", "FAA Part 23", "Up to 8,618 kg", "Up to 19", "+3.8 G (Normal) / +4.4 G (Util)", "Single/Twin Engine General Aviation"],
        ["Transport Category", "FAA Part 25", "No Upper Limit", "Up to 850+", "+2.5 G / -1.0 G", "Commercial Jetliners (B737, A350)"],
        ["Rotorcraft Transport", "FAA Part 29", "Over 3,175 kg", "Up to 44", "+3.5 G / -1.0 G", "Multi-Engine Offshore/EMS Helicopters"]
    ],
    "envelopeIntro": "The flight envelope of an aircraft defines its certified operating corridor: maximum operating altitude, Vne (never-exceed speed), and maneuver load limits.",
    "integrationIntro": "An aircraft is a system of systems: aerodynamic structures, propulsion, flight controls, electrical power, and avionics working in certified harmony.",
    "redundancyCards": [
        { "title": "FAR PART 25 FAIL-SAFE ARCHITECTURE", "desc": "All structural components must withstand operational loads even after complete failure of any single primary structural element (damage tolerance doctrine)." },
        { "title": "WEIGHT AND BALANCE CG ENVELOPE", "desc": "Aircraft can only operate within strict forward and aft center-of-gravity (CG) limits to ensure adequate elevator control authority during flare and stall recovery." }
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
}

# CH 4: Types and Classification of Aircraft
CHAPTER_PROFILES[4] = {
    "domain": "classification",
    "discipline": "AIRCRAFT DESIGN & MORPHOLOGY",
    "chipColor": "#00ff9d",
    "icon": "📐",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 4: Types and Classification of Aircraft</strong> breaks down the immense diversity of atmospheric flight vehicles by wing design, propulsion architecture, landing gear configuration, and mission capabilities.
      </p>
      <p class="section-p">
        Aircraft are classified across multiple distinct engineering dimensions:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>By Wing Planform & Position:</strong> High-wing (cargo transports, bush planes), mid-wing (aerobatic planes, supersonic fighters), low-wing (commercial jetliners, general aviation), straight wings (low speed), swept wings (transonic cruise), and delta wings (supersonic interceptors).</li>
        <li><strong>By Number of Wings:</strong> Monoplanes (single wing pair), biplanes (two stacked wings connected by struts), and historical triplanes.</li>
        <li><strong>By Landing Surface:</strong> Landplanes (wheeled gear), seaplanes / floatplanes (twin pontoons), flying boats (hydrodynamic hull), and amphibians (retractable wheels on floats).</li>
        <li><strong>By Propulsion:</strong> Piston/propeller, turboprop, turbofan, turbojet, ramjet/scramjet, and modern electric/hybrid eVTOL aircraft.</li>
      </ul>
    """,
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
        { "id": 1, "x": 22, "y": 35, "title": "Transonic Wing Sweep Hinge Root (35° Sweep)", "spec": "7050-T7451 Aluminum-Zinc-Magnesium Extrusion", "stress": "Normal Mach Component: Mn = 0.72 at M 0.85 Cruise", "status": "SHOCK WAVE DELAYED" },
        { "id": 2, "x": 50, "y": 25, "title": "High-Aspect-Ratio Wingtip Winglet / Sharklet", "spec": "Carbon Fiber Autoclave Cured Aerofoil Tip", "stress": "Vortex Induced Drag Reduction: 4.5% Fuel Savings", "status": "VORTEX DIFFUSED" },
        { "id": 3, "x": 75, "y": 45, "title": "Variable-Sweep Pivot Pin (Swing-Wing)", "spec": "Maraging 300 Ultra-High-Strength Steel Forging", "stress": "Sweep Angle Range: 16° (Takeoff) to 68° (Supersonic)", "status": "BEARING PRELOAD NOMINAL" },
        { "id": 4, "x": 35, "y": 75, "title": "Amphibian Retractable Float Mechanism", "spec": "Marine Grade 5083 Aluminum Alloy Anodized", "stress": "Hydrodynamic Wave Impact: 120 kPa at Touchdown", "status": "BILGE PUMP DRY" },
        { "id": 5, "x": 85, "y": 65, "title": "eVTOL Distributed Electric Propulsor Nacelle", "spec": "Direct-Drive Permanent Magnet Motor + Inverter", "stress": "Continuous Power: 150 kW @ 2,200 RPM", "status": "THERMAL LOOP 48°C" }
    ],
    "calcTitle": "WING PLANFORM ASPECT RATIO & INDUCED DRAG SOLVER",
    "calcDesc": "Calculate aspect ratio and induced drag coefficient (CDi) for different wing shapes at cruise lift coefficient.",
    "calcParam1": { "label": "Wingspan (b, meters)", "min": 8, "max": 80, "val": 35, "unit": "m", "step": 1 },
    "calcParam2": { "label": "Wing Area (S, m²)", "min": 10, "max": 800, "val": 122, "unit": "m²", "step": 5 },
    "tableTitle": "AIRCRAFT CLASSIFICATION DESIGN MATRIX",
    "tableIntro": "Engineering comparisons across major aircraft morphological classes:",
    "tableHeaders": ["AIRCRAFT CLASS", "WING CONFIG", "PROPULSION", "TYPICAL SPEED", "ASPECT RATIO (AR)", "PRIMARY MISSION"],
    "tableRows": [
        ["General Aviation (C172)", "High Straight Wing", "Reciprocating Piston", "110–130 kts", "7.3 (Moderate)", "Pilot Training & Personal"],
        ["Commercial Jet (A320/B737)", "Low Swept Wing (25°)", "High-Bypass Turbofan", "M 0.78 (450 kts)", "9.5–10.2 (High)", "Passenger Transport"],
        ["Supersonic Fighter (F-16)", "Mid Cropped Delta", "Afterburning Turbofan", "M 2.0+ (1,200 kts)", "3.2 (Low/Agile)", "Air Superiority & Strike"],
        ["High-Altitude Glider", "Mid T-Tail Long Span", "None (Unpowered)", "45–90 kts", "28.0–32.0 (Extreme)", "Thermal Soaring & Research"]
    ],
    "envelopeIntro": "Each aircraft classification operates within a dedicated flight envelope tailored to its structural aspect ratio and engine thermal limits.",
    "integrationIntro": "Airframe classification dictates the flight control architecture: mechanical cables for light GA, hydraulic power for airliners, and fly-by-wire for delta fighters.",
    "redundancyCards": [
        { "title": "WING DIHEDRAL LATERAL STABILITY", "desc": "Low-wing aircraft feature positive dihedral (wings angled upward) to produce an automatic restoring roll moment during unintended sideslips." },
        { "title": "SWEEP-INDUCED SPANWISE FLOW CONTROL", "desc": "Swept wings induce spanwise boundary-layer drift toward the tips. Wing fences, vortex generators, and stall strips ensure ailerons retain roll authority during near-stall conditions." }
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
}

# CH 5: What Makes an Aircraft Fly?
CHAPTER_PROFILES[5] = {
    "domain": "forces",
    "discipline": "AERODYNAMICS & LIFT GENERATION",
    "chipColor": "#00f0ff",
    "icon": "✈️",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 5: What Makes an Aircraft Fly?</strong> resolves one of the most widely misunderstood questions in physical science: the exact mechanism of aerodynamic lift generation.
      </p>
      <p class="section-p">
        Popular explanations often rely on the flawed <em>"Equal Transit Time Fallacy"</em> (the false claim that air packets split at the leading edge must meet simultaneously at the trailing edge). Wind tunnel flow visualization proves that air flowing over the upper surface arrives at the trailing edge <strong>much faster</strong> than air passing beneath the lower surface.
      </p>
      <p class="section-p">
        True lift generation is governed by two complementary physical laws:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Bernoulli's Principle & Pressure Differentials:</strong> As air flows over a curved, cambered upper surface at an angle of attack, streamlines constrict and accelerate, creating a localized drop in static pressure ($p_{\\text{upper}} < p_\\infty$). The higher static pressure beneath pushes the wing upward.</li>
        <li><strong>Newton's Third Law & Momentum Deflection:</strong> The wing deflects an enormous mass of air downward (creating <em>downwash</em>). By Newton's Third Law ($F = \\frac{d(mv)}{dt}$), exerting a downward force on air creates an equal and opposite upward aerodynamic force on the wing.</li>
        <li><strong>The Kutta Condition & Circulation:</strong> Fluid viscosity causes flow to leave the sharp trailing edge smoothly, establishing a bound circulation vortex ($\\Gamma$) around the airfoil that mathematically satisfies the Kutta-Joukowski theorem ($L' = \\rho_\\infty v_\\infty \\Gamma$).</li>
      </ul>
    """,
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
        { "id": 1, "x": 12, "y": 38, "title": "Leading Edge Stagnation Point", "spec": "Point of Zero Local Velocity (v = 0)", "stress": "Static Pressure Equals Total Pitot Pressure P0", "status": "STAGNATION STREAMLINE DIVIDING" },
        { "id": 2, "x": 38, "y": 20, "title": "Upper Surface Suction Peak (Min Pressure)", "spec": "Maximum Local Airflow Velocity (v > v∞)", "stress": "Suction Differential: -8.4 kPa relative to ambient", "status": "PRODUCING 70% OF NET LIFT" },
        { "id": 3, "x": 45, "y": 70, "title": "Lower Surface Compression Zone", "spec": "Mild Positive Static Pressure (Cp > 0)", "stress": "Positive Pressure: +2.1 kPa pushing upward", "status": "PRODUCING 30% OF NET LIFT" },
        { "id": 4, "x": 88, "y": 48, "title": "Sharp Trailing Edge (Kutta Condition Datum)", "spec": "Kutta Condition Flow Separation Boundary", "stress": "Upper and Lower Boundary Layers Merge Smoothly", "status": "ZERO SINGULARITY AT TE" },
        { "id": 5, "x": 92, "y": 65, "title": "Downward Downwash Momentum Stream", "spec": "Vertical Downward Deflection Velocity (w)", "stress": "Downwash Angle: 4.8° Downward", "status": "NEWTONIAN REACTION UPWARD" }
    ],
    "calcTitle": "AIRFOIL LIFT COEFFICIENT & CIRCULATION SOLVER",
    "calcDesc": "Calculate bound circulation (Γ) and total lift per unit span based on angle of attack and chord length.",
    "calcParam1": { "label": "Angle of Attack (α, degrees)", "min": 0, "max": 16, "val": 5, "unit": "°" },
    "calcParam2": { "label": "Airfoil Chord Length (c, meters)", "min": 0.5, "max": 8.0, "val": 2.4, "unit": "m", "step": 0.1 },
    "tableTitle": "AIRFOIL SURFACE PRESSURE COEFFICIENT (CP) DISTRIBUTION TABLE",
    "tableIntro": "Experimental surface pressure measurements across a NACA 2412 airfoil at 5° angle of attack:",
    "tableHeaders": ["CHORD STATION (X/C)", "UPPER CP (SUCTION)", "LOWER CP (PRESSURE)", "DELTA-CP (NET LIFT)", "LOCAL VELOCITY", "FLOW STATUS"],
    "tableRows": [
        ["0.00 (Leading Edge)", "+1.00 (Stagnation)", "+1.00 (Stagnation)", "0.00", "0.0 kts (Stagnant)", "Attached"],
        ["0.10 (Suction Peak)", "-1.85 (Strong Suction)", "+0.25 (Positive Pressure)", "2.10 (Maximum Lift)", "380 kts (Accelerated)", "Laminar Acceleration"],
        ["0.40 (Mid-Chord)", "-0.72 (Moderate Suction)", "+0.12 (Positive Pressure)", "0.84", "290 kts", "Adverse Gradient Start"],
        ["0.95 (Trailing Edge)", "+0.05 (Neutral)", "+0.05 (Neutral)", "0.00 (Kutta Balance)", "240 kts (Freestream)", "Smooth Tangential Exit"]
    ],
    "envelopeIntro": "The lift-generating boundary of an airfoil is limited by the critical stall angle of attack (typically 14°–18°), beyond which flow detaches from the upper surface.",
    "integrationIntro": "Lift generation creates induced drag and tip vortices that interact with the horizontal tailplane, requiring downwash compensation in longitudinal trim.",
    "redundancyCards": [
        { "title": "VORTEX GENERATOR BOUNDARY LAYER CONTROL", "desc": "Small angled metal vanes on the wing upper surface shed micro-vortices that re-energize the boundary layer with high-energy freestream air, delaying stall at high angles of attack." },
        { "title": "CAMBER VARIATION VIA LEADING EDGE SLATS", "desc": "Deploying leading edge slats increases airfoil camber and opens a high-energy slot that prevents flow detachment, raising maximum lift coefficient (CLmax) by over 50%." }
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
}

# CH 6: The Four Forces of Flight
CHAPTER_PROFILES[6] = {
    "domain": "forces",
    "discipline": "FLIGHT DYNAMICS & EQUILIBRIUM",
    "chipColor": "#00f0ff",
    "icon": "⚖️",
    "assetImg": "assets/ebook_aerodynamics.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 6: The Four Forces of Flight</strong> dissects the dynamic vector equilibrium governing every aircraft in atmospheric transit: <strong>Lift, Weight, Thrust, and Drag</strong>.
      </p>
      <p class="section-p">
        In steady, unaccelerated level flight, Newton's First Law requires that the vector sum of all forces equals zero ($\\Sigma \\vec{F} = 0$). This establishes two simultaneous equilibrium equations:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Vertical Equilibrium:</strong> Aerodynamic Lift produced by the wings must exactly equal total aircraft Weight ($L = W = m \\cdot g$).</li>
        <li><strong>Horizontal Equilibrium:</strong> Forward propulsive Thrust generated by the powerplants must exactly balance total airframe Drag ($T = D$).</li>
      </ul>
      <p class="section-p">
        Any imbalance results in acceleration: excess thrust ($T > D$) causes horizontal acceleration or climb; excess lift ($L > W$) initiates an upward vertical climb or high-G pull-up. In an unpowered glide ($T = 0$), the aircraft trades gravitational potential energy for airspeed, where the glide ratio is directly determined by the lift-to-drag ratio ($L/D = \\cot\\gamma$).
      </p>
    """,
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
        { "id": 1, "x": 48, "y": 48, "title": "Center of Gravity (CG) Weight Datum", "spec": "Aircraft Center of Mass Location (m · g)", "stress": "Total Weight W = 72,000 kg (+1.00 G)", "status": "WITHIN CERTIFIED CG ENVELOPE" },
        { "id": 2, "x": 46, "y": 20, "title": "Wing Center of Pressure Lift Resultant", "spec": "Integrated Aerodynamic Surface Pressure", "stress": "Net Lift L = 706.3 kN (Balances Weight)", "status": "LIFT VECTOR ALIGNED" },
        { "id": 3, "x": 28, "y": 62, "title": "Engine Pylon Thrust Line Axis", "spec": "CFM LEAP-1A Turbofan Thrust Vector", "stress": "Net Propulsive Thrust T = 54.2 kN", "status": "OVERCOMING TOTAL DRAG" },
        { "id": 4, "x": 65, "y": 50, "title": "Airframe Total Drag Center", "spec": "Form, Friction & Induced Wake Drag", "stress": "Total Aerodynamic Drag D = 54.2 kN", "status": "L/D RATIO = 13.0:1" },
        { "id": 5, "x": 86, "y": 38, "title": "Horizontal Tailplane Downforce Trim", "spec": "Trimmable Horizontal Stabilizer (THS)", "stress": "Negative Lift Lt = -28.5 kN (Pitch Balance)", "status": "STATIC MARGIN = 12% MAC" }
    ],
    "calcTitle": "LIFT-TO-DRAG RATIO & GLIDE RANGE SOLVER",
    "calcDesc": "Calculate lift-to-drag ratio (L/D) and unpowered glide distance from given altitude.",
    "calcParam1": { "label": "Release Altitude (h, feet)", "min": 2000, "max": 41000, "val": 30000, "unit": "ft", "step": 1000 },
    "calcParam2": { "label": "Aircraft L/D Ratio", "min": 6, "max": 35, "val": 16, "unit": "ratio", "step": 1 },
    "tableTitle": "FOUR FORCES FLIGHT TEST SORTIE LOG — LEVEL & MANEUVER EQUILIBRIUM",
    "tableIntro": "Empirical flight test validation points recording force balance across different flight regimes:",
    "tableHeaders": ["REGIME", "AIRSPEED", "LIFT / WEIGHT RATIO", "THRUST / DRAG RATIO", "FLIGHT PATH (γ)", "FORCE STATE"],
    "tableRows": [
        ["Steady Level Cruise", "450 kts", "1.00 (L = W)", "1.00 (T = D)", "0.0° (Level)", "Zero Net Acceleration"],
        ["Maximum Rate Climb", "280 kts", "1.00 (L = W cosγ)", "1.32 (T > D)", "+8.5° (Climbing)", "Translational Equilibrium"],
        ["Idle Descent / Glide", "240 kts", "0.99 (L ≈ W)", "0.15 (Idle T << D)", "-3.6° (Descent)", "Potential to Kinetic Trade"],
        ["Coordinated 60° Bank Turn", "320 kts", "2.00 (L = 2W)", "1.45 (High Drag)", "0.0° (Level Turn)", "2.0G Centripetal Acceleration"]
    ],
    "envelopeIntro": "The thrust-required and thrust-available curves define the minimum flying speed, maximum speed (Vmax), and absolute ceiling.",
    "integrationIntro": "Force equilibrium is maintained via coordinated automated throttle control (autothrottle) and aerodynamic pitch trim systems.",
    "redundancyCards": [
        { "title": "MULTI-ENGINE THRUST REDUNDANCY", "desc": "FAR Part 25 certification requires twin-engine transports to maintain positive climb gradient (+2.4% second segment) following complete failure of one engine at V1 takeoff speed." },
        { "title": "AUTOMATIC ELEVATOR TRIM (MACH TRIM)", "desc": "As jet transports accelerate into transonic speeds, center of pressure shifts aft (Mach tuck). Automatic pitch trim drives the horizontal stabilizer to maintain level flight equilibrium without pilot yoke force." }
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
}

# CH 7: Introduction to Aviation Science
CHAPTER_PROFILES[7] = {
    "domain": "atmosphere",
    "discipline": "AVIATION SCIENCE & HUMAN FACTORS",
    "chipColor": "#22d3ee",
    "icon": "🔬",
    "assetImg": "assets/diagram_atmosphere_weather.jpg",
    "simType": "atmosphere",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 7: Introduction to Aviation Science</strong> synthesizes the scientific disciplines that make safe atmospheric navigation possible: atmospheric thermodynamics, aeromedical human physiology, psychrometrics, and environmental monitoring.
      </p>
      <p class="section-p">
        Aviation exists in a hostile natural environment. As an aircraft climbs into the upper troposphere, atmospheric pressure and ambient oxygen partial pressure decay exponentially. Humans are biologically adapted to survive only within the <em>physiological zone</em> (sea level to 10,000 feet).
      </p>
      <p class="section-p">
        Above 10,000 feet, ambient pressure drops sufficiently to induce <strong>hypoxia</strong> (insufficient oxygen delivery to brain tissues). At FL350 (35,000 ft), the <strong>Time of Useful Consciousness (TUC)</strong> following explosive cabin depressurization is mere 30 to 60 seconds. Understanding gas laws (Boyle's, Dalton's, and Henry's laws) is mandatory for designing environmental control systems, bleed-air cabin pressurization, and emergency oxygen cascades.
      </p>
    """,
    "formulaTitle": "DALTON'S GAS PARTIAL PRESSURE & CABIN PRESSURE EQUATIONS",
    "formulaHtml": "$$ P_{\\text{total}} = \\sum p_i \\quad | \\quad p_{\\text{O2}} = 0.2095 \\cdot P_{\\text{ambient}} \\quad | \\quad \\text{TUC}_{\\text{FL350}} \\approx 30\\text{--}60\\text{ sec} $$",
    "formulaDesc": "Aeromedical Gas Relations: Dalton's law dictates that the alveolar oxygen partial pressure ($p_{O2}$) is directly proportional to barometric pressure. At FL350, ambient pressure is 238 hPa, dropping alveolar oxygen below the critical diffusion threshold.",
    "takeaways": [
        "Physiological Zone: Above 10,000 ft cabin altitude, supplemental oxygen or bleed-air pressurization is mandatory to prevent hypoxia.",
        "Time of Useful Consciousness: Higher altitudes dramatically compress crew decision windows (under 15 seconds at FL400).",
        "Standard Atmosphere Baseline: ISA provides the universal reference datum (15°C, 1013.25 hPa) for flight instruments worldwide."
    ],
    "simDescription": "Simulate atmospheric barometric pressure decay and ambient temperature drop as altitude increases from sea level to 45,000 feet.",
    "flowDescription": "Environmental Control System (ECS) bleed air conditioning cycle from jet engine compressor stage to conditioned passenger cabin air.",
    "hotspotDescription": "Click the 5 pins to inspect aviation science and life-support monitoring stations on a modern transport aircraft.",
    "hotspots": [
        { "id": 1, "x": 20, "y": 42, "title": "Flight Crew Quick-Donning Oxygen Mask", "spec": "Diluter-Demand 100% Positive Pressure Regulator", "stress": "Supply Pressure: 1,800 psi Gaseous O2", "status": "DONNABLE IN UNDER 5 SECONDS" },
        { "id": 2, "x": 35, "y": 30, "title": "Cabin Altitude Pressure Sensor", "spec": "Dual Solid-State Barometric Altimeter Switches", "stress": "Cabin Pressure Delta: 8.6 psi differential", "status": "ALARM SET AT 10,000 FT CABIN ALT" },
        { "id": 3, "x": 58, "y": 68, "title": "Air Cycle Machine (ACM) Cooling Pack", "spec": "Air-to-Air Heat Exchanger & Expansion Turbine", "stress": "Turbine Inflow Temp: 210°C -> Output: +4°C", "status": "AIRFLOW 65 LBS/MIN" },
        { "id": 4, "x": 82, "y": 48, "title": "Passenger Chemical Oxygen Generators", "spec": "Sodium Chlorate / Iron Core Thermal Candle", "stress": "Continuous O2 Flow: 15 minutes per seat group", "status": "MANIFOLD BAROMETRICALLY ARMED" },
        { "id": 5, "x": 50, "y": 85, "title": "Total Air Temperature (TAT) Rosemount Sensor", "spec": "Platinum Resistance Thermometer with Heated Strut", "stress": "TAT = SAT · (1 + 0.2 · M²)", "status": "DE-ICED & SAMPLED BY ADC" }
    ],
    "calcTitle": "CABIN ALTITUDE & OXYGEN PARTIAL PRESSURE CALCULATOR",
    "calcDesc": "Calculate ambient atmospheric pressure and estimated Time of Useful Consciousness (TUC) at selected flight level.",
    "calcParam1": { "label": "Flight Altitude (FL)", "min": 50, "max": 450, "val": 350, "unit": "FL", "step": 10 },
    "calcParam2": { "label": "Cabin Differential Pressure (psi)", "min": 0, "max": 9.5, "val": 8.4, "unit": "psi", "step": 0.2 },
    "tableTitle": "ATMOSPHERIC AEROMEDICAL DATA MATRIX — ALTITUDE VS PHYSIOLOGY",
    "tableIntro": "Standard atmospheric pressure benchmarks and corresponding physiological human endurance thresholds:",
    "tableHeaders": ["ALTITUDE / FL", "BAROMETRIC PRESSURE", "O2 PARTIAL PRESSURE", "TEMPERATURE (ISA)", "TIME OF USEFUL CONSCIOUSNESS", "STATUS"],
    "tableRows": [
        ["Sea Level (0 ft)", "1013.25 hPa (14.7 psi)", "212 hPa (100% norm)", "+15.0°C", "Unlimited", "Optimal Life Support"],
        ["10,000 ft (FL100)", "697 hPa (10.1 psi)", "146 hPa (69% norm)", "-4.8°C", "Hours (Mild Night Vision Loss)", "FAA Max Unpressurized"],
        ["25,000 ft (FL250)", "376 hPa (5.5 psi)", "79 hPa (37% norm)", "-34.5°C", "3 to 5 minutes", "Severe Hypoxia Hazard"],
        ["35,000 ft (FL350)", "238 hPa (3.5 psi)", "50 hPa (24% norm)", "-54.3°C", "30 to 60 seconds", "Critical Emergency Descent"]
    ],
    "envelopeIntro": "Aircraft operational flight ceilings (e.g. FL430 for commercial airliners) are strictly limited by emergency cabin depressurization descent rate capability.",
    "integrationIntro": "Aviation science directly dictates environmental control systems (ECS), bleed-air regulation, cockpit oxygen masks, and pressurization outflow valves.",
    "redundancyCards": [
        { "title": "DUAL ENVIRONMENTAL PACKS (ECS)", "desc": "Aircraft carry twin independent air conditioning packs. A single pack can maintain full passenger cabin pressurization and temperature if the other fails." },
        { "title": "AUTOMATIC EMERGENCY OXYGEN DEPLOYMENT", "desc": "If cabin altitude exceeds 14,000 feet, barometric pressure switches automatically unlatch passenger overhead masks and ignite chemical oxygen candles." }
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
}

# CH 8: Earth's Atmosphere and Flight
CHAPTER_PROFILES[8] = {
    "domain": "atmosphere",
    "discipline": "ATMOSPHERIC PHYSICS & METEOROLOGY",
    "chipColor": "#22d3ee",
    "icon": "🌪️",
    "assetImg": "assets/diagram_atmosphere_weather.jpg",
    "simType": "atmosphere",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 8: Earth's Atmosphere and Flight</strong> details the fluid ocean of air that sustains all aeronautical vehicles. The atmosphere is divided into vertical thermodynamic strata: the <strong>Troposphere</strong> (surface to ~11 km / 36,089 ft), the <strong>Tropopause</strong>, the <strong>Stratosphere</strong> (11 km to 50 km), the Mesosphere, and the Thermosphere.
      </p>
      <p class="section-p">
        Civilian aviation operates almost exclusively within the troposphere and lower stratosphere. The <strong>International Standard Atmosphere (ISA)</strong> established by ICAO defines standard sea-level conditions:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Standard Sea Level Temperature ($T_0$):</strong> $+15.0^\\circ\\text{C}$ ($288.15\\text{ K}$ / $59^\\circ\\text{F}$).</li>
        <li><strong>Standard Sea Level Pressure ($p_0$):</strong> $1013.25\\text{ hPa}$ ($29.92\\text{ inHg}$ / $101.325\\text{ kPa}$).</li>
        <li><strong>Standard Air Density ($\\rho_0$):</strong> $1.225\\text{ kg/m}^3$ ($0.002377\\text{ slugs/ft}^3$).</li>
        <li><strong>Tropospheric Temperature Lapse Rate:</strong> $-6.5^\\circ\\text{C}$ per $1,000\\text{ m}$ ($-1.98^\\circ\\text{C}$ per $1,000\\text{ ft}$) up to $11,000\\text{ m}$, above which the temperature remains constant at $-56.5^\\circ\\text{C}$.</li>
      </ul>
      <p class="section-p">
        Understanding atmospheric density variations is essential for flight safety: high temperatures and low pressure produce <em>high density altitude</em>, degrading wing lift, propeller efficiency, and turbine engine thrust during hot-and-high airfield takeoffs.
      </p>
    """,
    "formulaTitle": "ISA LAPSE RATE & HYDROSTATIC PRESSURE EQUATION",
    "formulaHtml": "$$ T(h) = T_0 - L \\cdot h \\quad | \\quad p(h) = p_0 \\cdot \\left(1 - \\frac{L \\cdot h}{T_0}\\right)^{\\frac{g \\cdot M}{R \\cdot L}} \\quad | \\quad \\rho = \\frac{p}{R_s \\cdot T} $$",
    "formulaDesc": "Hydrostatic & Gas Law Formulations: $L = 0.0065\\text{ K/m}$ is standard lapse rate, $g = 9.80665\\text{ m/s}^2$ is gravitational acceleration, $M = 0.0289644\\text{ kg/mol}$ is dry air molar mass, and $R_s = 287.058\\text{ J/(kg}\\cdot\\text{K)}$ is the specific gas constant.",
    "takeaways": [
        "Temperature Lapse Rate: Temperature drops linearly at 6.5°C per 1,000 meters throughout the troposphere until reaching the isothermal tropopause.",
        "Density Altitude Danger: High temperature or low atmospheric pressure severely reduces air density, increasing required takeoff run lengths.",
        "Altimeter Pressure Settings: Pilots set local QNH (altimeter setting) to read true airfield elevation on the ground and standard 1013.25 hPa above transition altitude."
    ],
    "simDescription": "Observe atmospheric layer transitions from the troposphere through the tropopause (-56.5°C isothermal boundary) into the calm stratosphere.",
    "flowDescription": "Standard atmospheric pressure and density exponential decay curve plotted against altitude up to 50,000 feet.",
    "hotspotDescription": "Click the 5 pins to inspect barometric sensing instruments and atmospheric sampling stations on the aircraft.",
    "hotspots": [
        { "id": 1, "x": 18, "y": 40, "title": "Electrically Heated Pitot Probe", "spec": "Direct Dynamic Ram Air Pressure Sensor (P0)", "stress": "Dynamic Pressure q = 1/2 · ρ · v²", "status": "HEATING ELEMENT 28V DC ON" },
        { "id": 2, "x": 35, "y": 32, "title": "Flush Fuselage Static Pressure Port", "spec": "Unperturbed Ambient Static Pressure Tap (P_stat)", "stress": "Measures True Local Barometric Pressure", "status": "DUAL CROSS-COUPLED" },
        { "id": 3, "x": 55, "y": 55, "title": "Air Data Computer (ADC) Central Processor", "spec": "Honeywell Digital Barometric Air Data Unit", "stress": "Computes Calibrated Airspeed, Mach & Altitude", "status": "ARINC 429 DATA STREAM VALID" },
        { "id": 4, "x": 78, "y": 45, "title": "Outside Air Temperature (OAT) Probe", "spec": "Rosemount Platinum RTD Static Temp Sensor", "stress": "TAT = SAT (1 + 0.2 · M²) = -22.4°C", "status": "TEMP CALIBRATED" },
        { "id": 5, "x": 88, "y": 70, "title": "Barometric Altimeter Display Dial / Tape", "spec": "Subscale Baro Setting Window (QNH / InHg)", "stress": "Standard Pressure Setting: 1013.25 hPa / 29.92 inHg", "status": "FLIGHT LEVEL EN ROUTE" }
    ],
    "calcTitle": "STANDARD ATMOSPHERE (ISA) TEMPERATURE & DENSITY SOLVER",
    "calcDesc": "Calculate ambient temperature, pressure, and air density at any geometric flight altitude under ISA conditions.",
    "calcParam1": { "label": "Geometric Altitude (h, meters)", "min": 0, "max": 15000, "val": 10000, "unit": "m", "step": 500 },
    "calcParam2": { "label": "Sea Level Temp Offset (ΔISA, °C)", "min": -20, "max": 30, "val": 0, "unit": "°C", "step": 1 },
    "tableTitle": "INTERNATIONAL STANDARD ATMOSPHERE (ICAO ISA) PROFILE TABLE",
    "tableIntro": "Official thermodynamic standard values from sea level to the lower stratosphere:",
    "tableHeaders": ["ALTITUDE (GEOMETRIC)", "TEMPERATURE (ISA)", "PRESSURE (hPa)", "DENSITY (kg/m³)", "SPEED OF SOUND (kts)", "ATMOSPHERIC REGIME"],
    "tableRows": [
        ["0 m (0 ft, Sea Level)", "+15.0°C (288.15 K)", "1013.25 hPa", "1.2250 kg/m³", "661.5 kts (1,225 km/h)", "Troposphere Baseline"],
        ["3,048 m (10,000 ft)", "-4.8°C (268.34 K)", "696.8 hPa", "0.9046 kg/m³", "638.6 kts", "Standard General Aviation"],
        ["9,144 m (30,000 ft)", "-44.4°C (228.71 K)", "300.9 hPa", "0.4583 kg/m³", "589.6 kts", "Subsonic Jet Cruise"],
        ["11,000 m (36,089 ft)", "-56.5°C (216.65 K)", "226.3 hPa", "0.3639 kg/m³", "573.8 kts", "Tropopause Isothermal Datum"]
    ],
    "envelopeIntro": "Flight performance drops dramatically at high density altitudes, requiring pilots to verify takeoff performance charts before departure in hot conditions.",
    "integrationIntro": "Atmospheric data feeds directly into primary flight management computers, autothrottle engines, and altimeter encoders.",
    "redundancyCards": [
        { "title": "TRIPLE AIR DATA COMPUTERS (ADC 1/2/3)", "desc": "Modern airliners incorporate three independent air data systems. The flight control computers cross-compare all three, voting out any single failing or frozen pitot probe." },
        { "title": "STANDBY PNEUMATIC FLIGHT INSTRUMENTS", "desc": "An isolated, battery-backed backup flight instrument connects directly to dedicated auxiliary static ports to maintain airspeed and altitude cues if digital avionics fail." }
    ],
    "quiz": {
        "question": "In the standard International Standard Atmosphere (ISA) troposphere below 11,000 meters (36,089 feet), what is the temperature lapse rate with increasing altitude?",
        "options": [
            "-6.5°C per 1,000 meters (-1.98°C per 1,000 feet)",
            "-12.0°C per 1,000 meters",
            "+3.0°C per 1,000 meters (warming)",
            "Constant temperature (0°C change)"
        ],
        "correctIndex": 0,
        "rationale": "Under ICAO ISA standards, the troposphere cools at a steady, linear lapse rate of -6.5°C per 1,000 meters (approximately -1.98°C or -3.5°F per 1,000 feet) from sea level (+15°C) until reaching the isothermal tropopause at 11,000 meters (-56.5°C)."
    }
}

# CH 9: Essential Aviation Terminology
CHAPTER_PROFILES[9] = {
    "domain": "terminology",
    "discipline": "AERONAUTICAL TERMINOLOGY & GEOMETRY",
    "chipColor": "#38bdf8",
    "icon": "📐",
    "assetImg": "assets/ebook_blueprint.png",
    "simType": "airfoil",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 9: Essential Aviation Terminology</strong> establishes the standardized engineering and piloting lexicon required for precise aerodynamic communication.
      </p>
      <p class="section-p">
        Mastery of aviation terminology begins with wing and airfoil geometry:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Chord Line:</strong> The straight reference line connecting the leading edge to the trailing edge of an airfoil.</li>
        <li><strong>Mean Camber Line:</strong> The locus of points equidistant from the upper and lower surfaces of the airfoil. The maximum distance between the camber line and chord line is the <em>camber</em>.</li>
        <li><strong>Angle of Attack ($\\alpha$):</strong> The acute angle between the wing's chord line and the oncoming <em>relative wind</em> vector. It is purely an aerodynamic angle, distinct from pitch attitude.</li>
        <li><strong>Angle of Incidence:</strong> The fixed mechanical angle at which the wing is mounted to the aircraft's longitudinal fuselage axis.</li>
        <li><strong>Aspect Ratio ($AR = b^2/S$):</strong> The ratio of wingspan squared to planform area, governing induced drag.</li>
        <li><strong>Wing Washout:</strong> A subtle aerodynamic twist along the wingspan (lower angle of incidence at wingtips) ensuring the wing root stalls before the wingtips, preserving aileron roll control during a stall.</li>
      </ul>
    """,
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
        { "id": 1, "x": 12, "y": 38, "title": "Leading Edge Stagnation Line Datum", "spec": "Leading Edge Radius r_le = 1.5% chord", "stress": "Stagnation Point Shift with AoA", "status": "ATTACHED FLOW" },
        { "id": 2, "x": 40, "y": 24, "title": "Mean Camber Line Maximum Vertex", "spec": "Maximum Camber = 4.0% Chord at 40% Station", "stress": "Governs Zero-Lift Angle of Attack (α0l = -3.8°)", "status": "NOMINAL CAMBER" },
        { "id": 3, "x": 52, "y": 42, "title": "Straight Chord Line Reference Plane", "spec": "Straight Geometric Line from LE to TE", "stress": "Chord Length c = 3.65 m", "status": "GEOMETRIC BASELINE" },
        { "id": 4, "x": 28, "y": 42, "title": "Quarter-Chord Aerodynamic Center (AC)", "spec": "Aerodynamic Center at 25% MAC", "stress": "Pitching Moment dCm/dα = 0", "status": "AERODYNAMICALLY STABLE" },
        { "id": 5, "x": 88, "y": 48, "title": "Trailing Edge Kutta Datum Point", "spec": "Sharp Trailing Edge with 11.5° Included Angle", "stress": "Upper/Lower Boundary Layers Merge Smoothly", "status": "ZERO SINGULARITY" }
    ],
    "calcTitle": "WING ASPECT RATIO & TAPER RATIO SOLVER",
    "calcDesc": "Calculate aspect ratio (AR) and taper ratio (λ) for a trapezoidal aircraft wing planform.",
    "calcParam1": { "label": "Wingspan (b, meters)", "min": 10, "max": 75, "val": 34, "unit": "m", "step": 1 },
    "calcParam2": { "label": "Wing Area (S, m²)", "min": 15, "max": 450, "val": 122, "unit": "m²", "step": 5 },
    "tableTitle": "ESSENTIAL AVIATION TERMINOLOGY & SYMBOL DEFINITIONS",
    "tableIntro": "Standardized ICAO/FAA aerodynamic acronyms and technical definitions:",
    "tableHeaders": ["TERM / SYMBOL", "OFFICIAL DEFINITION", "ENGINEERING UNITS", "TYPICAL RANGE", "OPERATIONAL RELEVANCE", "CERTIFICATION"],
    "tableRows": [
        ["AoA (α)", "Angle between chord line and relative wind", "Degrees (°)", "-2° to +16°", "Primary stall determinant", "Part 25 Mandatory"],
        ["Aspect Ratio (AR)", "Ratio of span squared to wing area (b²/S)", "Dimensionless", "6.5 to 11.0 (Jets)", "Governs induced drag", "Design Optimization"],
        ["Washout (Twist)", "Geometric decrease in wingtip incidence", "Degrees twist (°)", "1.5° to 3.5°", "Ensures root stalls before tip", "Spin Prevention"],
        ["Mean Aerodynamic Chord", "Reference chord representing 3D wing", "Meters (m)", "2.5 m to 7.0 m", "Weight & balance CG limits", "Weight & Balance"]
    ],
    "envelopeIntro": "Piloting within certified angle-of-attack limits prevents aerodynamic stall; exceeding critical AoA causes flow separation regardless of airspeed.",
    "integrationIntro": "Angle-of-attack sensors feed stall protection computers, activating stick shakers and stick pushers when approaching critical limits.",
    "redundancyCards": [
        { "title": "ANGLE OF ATTACK RESOLVER REDUNDANCY", "desc": "Aircraft feature two or three independent AOA vanes on opposite sides of the fuselage. Disagree alerts automatically flag erroneous sensor data to the pilots." },
        { "title": "TACTILE STICK SHAKER & NUDGER", "desc": "An independent eccentric electric motor shakes the pilot control yoke at 5 knots above stall speed, providing unmistakable tactile stall warning." }
    ],
    "quiz": {
        "question": "What is the exact aerodynamic definition of Angle of Attack (α)?",
        "options": [
            "The acute angle between the wing's chord line and the relative wind vector.",
            "The angle between the fuselage nose and the horizon.",
            "The angle at which the wing is permanently bolted to the fuselage.",
            "The angle between the flight path and the ground."
        ],
        "correctIndex": 0,
        "rationale": "Angle of Attack (α) is strictly defined as the acute angle measured between the wing's chord line and the direction of the oncoming freestream airflow (the relative wind). It is distinct from pitch attitude (which is relative to the horizon) and flight path angle (which is relative to the ground)."
    }
}

# CH 10: Aeronautics vs Aviation vs Aerospace Engineering
CHAPTER_PROFILES[10] = {
    "domain": "foundations",
    "discipline": "AEROSPACE PROFESSIONAL TAXONOMY",
    "chipColor": "#c084fc",
    "icon": "🌐",
    "assetImg": "assets/diagram_space_orbital.jpg",
    "simType": "orbit",
    "overviewHtml": """
      <p class="section-p">
        <strong>Chapter 10: The Difference Between Aeronautics, Aviation and Aerospace Engineering</strong> establishes the precise industrial, physical, and academic boundaries dividing these closely related domains.
      </p>
      <p class="section-p">
        While often used interchangeably in popular media, each term defines a distinct professional realm:
      </p>
      <ul class="takeaway-bullet-list">
        <li><strong>Aeronautics:</strong> The pure science and physical mathematics of flight <em>within Earth's gaseous atmosphere</em> (below 100 km). It encompasses theoretical aerodynamics, fluid mechanics, aeroelasticity, wind tunnel analysis, and airframe structural loads.</li>
        <li><strong>Aviation:</strong> The practical, operational, commercial, and regulatory industry of atmospheric flight. Aviation encompasses airlines, flight crews, air traffic management (ATC), airport operations, maintenance/MRO, and civil aviation authorities (FAA/EASA/ICAO).</li>
        <li><strong>Aerospace Engineering:</strong> The overarching technical super-discipline that unites <em>Aeronautics</em> (atmospheric flight) with <em>Astronautics</em> (spaceflight beyond the atmosphere: rocket propulsion, orbital launch vehicles, satellites, re-entry heat shields, and interplanetary probes).</li>
      </ul>
      <p class="section-p">
        The universal dividing line between Aeronautics and Astronautics is the <strong>Kármán Line (100 km / 62.1 miles altitude)</strong>, where orbital velocity is required to generate sufficient aerodynamic lift to sustain a vehicle's weight.
      </p>
    """,
    "formulaTitle": "ATMOSPHERIC FLIGHT VS ORBITAL VELOCITY FORMULATIONS",
    "formulaHtml": "$$ v_{\\text{aero}} \\le M 3.0 \\quad \\text{vs} \\quad v_{\\text{orbital}} = \\sqrt{\\frac{G \\cdot M_E}{R_E + h}} \\approx 7.8\\text{ km/s} \\quad | \\quad h_{\\text{Kármán}} = 100\\text{ km} $$",
    "formulaDesc": "Domain Boundary Formulations: Aeronautics relies on atmospheric dynamic pressure ($q = \\frac{1}{2}\\rho v^2$) for lift. Astronautics operates where air density is negligible ($\\rho \\approx 0$), relying entirely on orbital mechanics ($v_{\\text{orbital}} \\approx 28,000\\text{ km/h}$) and rocket reaction thrust.",
    "takeaways": [
        "Aeronautics = The Science: Focuses on physical fluid dynamics, thermodynamics, and atmospheric structural design.",
        "Aviation = The Operation: Focuses on airlines, pilots, air traffic control, and civil air transportation networks.",
        "Aerospace = The Unified Discipline: Integrates atmospheric atmospheric flight (aeronautics) with space orbital missions (astronautics)."
    ],
    "simDescription": "Compare atmospheric vehicle flight (relying on air reaction and aerodynamic lift) versus orbital space mechanics (relying on Keplerian orbital velocity).",
    "flowDescription": "Altitude profile chart from sea level across the troposphere, stratosphere, and mesosphere up to the 100 km Kármán line boundary.",
    "hotspotDescription": "Click the 5 pins to inspect operational infrastructure stations across Aeronautics, Aviation, and Spaceflight.",
    "hotspots": [
        { "id": 1, "x": 15, "y": 38, "title": "Aeronautical Wind Tunnel Research Facility", "spec": "Transonic Closed-Loop Cryogenic Wind Tunnel", "stress": "Re = 40 × 10⁶ at M 0.85 (Aeronautics Domain)", "status": "DATA CORRELATED" },
        { "id": 2, "x": 42, "y": 30, "title": "Airline Operations Control Center (AOCC)", "spec": "Global Airline Dispatch & Fleet Management", "stress": "3,400 Commercial Sorties Daily (Aviation Domain)", "status": "ATC NETWORK SYNCHRONIZED" },
        { "id": 3, "x": 62, "y": 45, "title": "Air Traffic Control En-Route Radar Facility", "spec": "Secondary Surveillance Radar & ADS-B Receiver", "stress": "RVSM 1,000 ft Vertical Separation Enforced", "status": "AIRSPACE ACTIVE" },
        { "id": 4, "x": 75, "y": 65, "title": "Kármán Line Altitude Boundary (100 km)", "spec": "Physical Limit of Atmospheric Aerodynamic Lift", "stress": "Altitude h = 100,000 m / 328,084 ft", "status": "LEGAL SPACEFRONTIER" },
        { "id": 5, "x": 88, "y": 25, "title": "Orbital Spacecraft Launch Complex", "spec": "Multi-Stage Cryogenic Liquid Rocket Booster", "stress": "Orbital Insertion Velocity: 7,800 m/s (Aerospace)", "status": "ORBIT ACHIEVED" }
    ],
    "calcTitle": "AERODYNAMIC LIFT VS ORBITAL CENTRIFUGAL FORCE SOLVER",
    "calcDesc": "Calculate whether vehicle support is dominated by aerodynamic wing lift or orbital centrifugal acceleration at given altitude and speed.",
    "calcParam1": { "label": "Vehicle Velocity (v, km/h)", "min": 500, "max": 28000, "val": 900, "unit": "km/h", "step": 500 },
    "calcParam2": { "label": "Altitude (h, km)", "min": 0, "max": 120, "val": 11, "unit": "km", "step": 1 },
    "tableTitle": "COMPARATIVE TAXONOMY: AERONAUTICS VS AVIATION VS AEROSPACE",
    "tableIntro": "Structural and professional breakdown of the three aerospace fields:",
    "tableHeaders": ["DIMENSION", "AERONAUTICS", "AVIATION", "AEROSPACE ENGINEERING", "PRIMARY REGULATION", "OPERATING DOMAIN"],
    "tableRows": [
        ["Core Focus", "Physical science & flight physics", "Commercial & civil flight operation", "Atmospheric & space vehicle design", "ICAO / NASA", "Earth Atmosphere (<100 km)"],
        ["Primary Personnel", "Aerodynamicists, test pilots, CFD engineers", "Airline pilots, ATC controllers, dispatchers", "Rocket propulsion, satellite & systems engineers", "FAA / EASA / IATA", "Global Civil Air Transport"],
        ["Key Milestone", "Wright Flyer (1903) & Cayley (1799)", "First Commercial Flight (1914)", "Sputnik (1957) & Apollo 11 (1969)", "FAR / CS Part 25/121", "Surface to Low Earth Orbit"],
        ["Vehicles", "Airplanes, gliders, helicopters, UAVs", "Airliners, business jets, cargo fleets", "Rockets, space stations, jetliners, eVTOL", "FAA Part 400 (Space)", "Earth Atmosphere to Deep Space"]
    ],
    "envelopeIntro": "The aeronautical envelope terminates at the Kármán line, where the atmospheric density is so low that aerodynamic lift speed equals orbital velocity.",
    "integrationIntro": "Modern aerospace companies employ cross-functional teams spanning aerodynamicists (aeronautics), flight operations (aviation), and space systems engineers.",
    "redundancyCards": [
        { "title": "REGULATORY AIRWORTHINESS CERTIFICATION", "desc": "Aeronautical vehicles must secure a Type Certificate (FAR Part 25) proving fail-safe structural redundancy before civil aviation operators can enter commercial service." },
        { "title": "INTERNATIONAL CIVIL AVIATION TREATIES", "desc": "Under the 1944 Chicago Convention, 193 ICAO member states harmonize airspace sovereignty, pilot licensing, and accident investigation protocols worldwide." }
    ],
    "quiz": {
        "question": "What is the internationally recognized altitude boundary (the Kármán Line) that officially separates Aeronautics (atmospheric flight) from Astronautics (spaceflight)?",
        "options": [
            "100 km (62.1 miles / 328,000 feet)",
            "10,000 meters (32,800 feet)",
            "300 km (186 miles)",
            "12 km (39,000 feet)"
        ],
        "correctIndex": 0,
        "rationale": "The Kármán Line, named after Hungarian-American physicist Theodore von Kármán, is established at an altitude of 100 kilometers (62.1 miles). At this altitude, Earth's atmosphere is so thin that an aircraft would need to fly faster than orbital velocity (~28,000 km/h) to generate sufficient aerodynamic lift to support its weight, marking the physical and legal boundary of spaceflight."
    }
}

print(f"Generated {len(CHAPTER_PROFILES)} handcrafted chapter profiles (Ch 1-10).")
