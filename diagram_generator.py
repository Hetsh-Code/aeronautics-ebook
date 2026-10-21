"""
Aeronautics E-book — 5,000 Technical Diagrams SVG Generator
Generates high-precision, standalone aerospace engineering blueprint SVGs
for all 1,000 chapters and 5 diagrams per chapter (5,000 unique diagrams).
"""

import math

def get_chapter_diagram_params(ch_num, diagram_index):
    n = max(1, min(1000, int(ch_num or 1)))
    d = max(1, min(5, int(diagram_index or 1)))

    seed = (n * 9301 + d * 49297) % 233280
    f1 = (seed % 100) / 100.0
    f2 = ((seed * 3) % 100) / 100.0
    f3 = ((seed * 7) % 100) / 100.0
    f4 = ((seed * 11) % 100) / 100.0

    return {
        "n": n,
        "d": d,
        "specCode": f"AER-{n:04d}-D{d}",
        "dinCode": f"DIN-EN-9100 / CH-{n} // REV.{(seed % 9) + 1}",
        "tolerance": f"±{(0.012 + f1 * 0.045):.3f} mm",
        "reynoldsNum": f"{(1.45 + f2 * 6.2):.2f} × 10⁶",
        "machNum": f"M {(0.22 + f3 * 1.75):.2f}",
        "wingSpan": f"{(14.2 + f4 * 28.5):.2f} m",
        "chord": f"{(1.85 + f1 * 3.4):.2f} m",
        "aoa": f"{(1.8 + f2 * 11.4):.1f}°",
        "pressureRatio": f"{(14.5 + f3 * 26.2):.1f}:1",
        "stressMpa": f"{int(210 + f4 * 380)} MPa",
        "temperatureK": f"{int(280 + f1 * 1350)} K",
        "airflowCfs": f"{int(850 + f2 * 2800)} kg/s",
        "camberOffset": int((f1 - 0.5) * 36),
        "thicknessOffset": int((f2 - 0.5) * 20),
        "sparOffset": int((f3 - 0.5) * 40),
        "nozzleAngle": f"{(12 + f4 * 16):.1f}",
        "shockAngle": f"{(28 + f1 * 24):.1f}",
        "stationTemp": int(1200 + f2 * 550),
        "burnDeltaV": f"{(1.2 + f3 * 2.8):.2f}"
    }

def get_chapter_sim_type(ch_num):
    # Deterministic mapping matching syllabus domains
    ch = max(1, min(1000, int(ch_num or 1)))
    part = ((ch - 1) // 10) + 1
    
    # Check parts:
    # Part 3: Propulsion (21-30), Part 8: Propulsion, Part 15: Engines, Part 35: Turbofans
    if part in [3, 8, 15, 23, 35, 42, 51, 68, 77, 89]:
        return "engine", "#ffb700", "PROPULSION & JET ENGINES"
    elif part in [2, 5, 12, 19, 27, 39, 48, 56, 65, 84]:
        return "structure", "#00ff9d", "AIRFRAME STRUCTURES & MATERIALS"
    elif part in [4, 9, 14, 22, 31, 44, 53, 62, 79, 91]:
        return "pfd", "#c084fc", "AVIONICS & FLIGHT INSTRUMENTS"
    elif part in [6, 11, 18, 26, 37, 46, 59, 72, 85, 96]:
        return "mach", "#f43f5e", "HIGH-SPEED & SHOCK DYNAMICS"
    elif part in [7, 16, 25, 34, 45, 58, 69, 81, 93, 100]:
        return "orbit", "#a855f7", "SPACE SYSTEMS & ORBITAL MECHANICS"
    elif part in [10, 20, 30, 40, 50, 60, 70, 80, 90]:
        return "controls", "#38bdf8", "FLIGHT DYNAMICS & CONTROL"
    elif part in [1, 13, 24, 33, 47, 57, 71, 83, 95]:
        return "atmosphere", "#22d3ee", "ATMOSPHERIC PHYSICS & METEOROLOGY"
    elif part in [17, 28, 38, 49, 61, 74, 86, 97]:
        return "rotor", "#34d399", "ROTORCRAFT & VTOL AERODYNAMICS"
    else:
        return "airfoil", "#00f0ff", "AERODYNAMICS & AIRFLOW"

def generate_diagram_svg(ch_num, diagram_index):
    p = get_chapter_diagram_params(ch_num, diagram_index)
    sim, color, discipline = get_chapter_sim_type(ch_num)
    d = p["d"]
    n = p["n"]

    id_prefix = f"aer-{n}-{d}"

    defs = f"""
    <defs>
      <pattern id="{id_prefix}-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
      <linearGradient id="{id_prefix}-glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="{color}" stop-opacity="0.15"/>
        <stop offset="50%" stop-color="{color}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#00ff9d" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#07101e" />
    <rect width="100%" height="100%" fill="url(#{id_prefix}-grid)" />
    <!-- Header Border & Watermark -->
    <rect x="10" y="10" width="740" height="240" fill="none" stroke="rgba(0,240,255,0.2)" stroke-width="1.5" rx="6"/>
    <text x="25" y="30" fill="rgba(255,255,255,0.4)" font-family="monospace" font-size="9" letter-spacing="1">AERONAUTICS CERTIFIED CAD // ISO-1151 SPEC</text>
    <text x="735" y="30" text-anchor="end" fill="{color}" font-family="monospace" font-size="9" font-weight="bold">{p['dinCode']}</text>
    <text x="735" y="240" text-anchor="end" fill="rgba(0,255,157,0.7)" font-family="monospace" font-size="9">{p['specCode']} &bull; TOL {p['tolerance']}</text>
    """

    content = ""

    if d == 1:
        # DIAGRAM 1: THEORETICAL SCHEMATIC
        if sim == "engine":
            content = f"""
            <line x1="40" y1="130" x2="720" y2="130" stroke="rgba(255,255,255,0.3)" stroke-dasharray="6,4" stroke-width="1.5"/>
            <path d="M 70 {40 + p['camberOffset']//2} C 200 25, 480 30, 680 {75 + p['thicknessOffset']} L 660 100 C 480 80, 200 75, 100 85 Z" fill="rgba(255,255,255,0.06)" stroke="{color}" stroke-width="2"/>
            <path d="M 70 {220 - p['camberOffset']//2} C 200 235, 480 230, 680 {185 - p['thicknessOffset']} L 660 160 C 480 180, 200 185, 100 175 Z" fill="rgba(255,255,255,0.06)" stroke="{color}" stroke-width="2"/>
            <path d="M 80 130 C 105 105, 135 105, 140 130 C 135 155, 105 155, 80 130 Z" fill="{color}" stroke="#ffffff" stroke-width="1.5"/>
            <g stroke="{color}" stroke-width="3">
              <line x1="140" y1="45" x2="150" y2="215"/>
              <line x1="150" y1="48" x2="160" y2="212"/>
            </g>
            <text x="125" y="42" fill="{color}" font-family="monospace" font-size="10" font-weight="bold">FAN (N1) // PR {p['pressureRatio']}</text>
            <path d="M 180 90 L 520 90 L 580 115 L 520 145 L 180 145" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
            <path d="M 180 170 L 520 170 L 580 145 L 520 115 L 180 115" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
            <g stroke="#00ff9d" stroke-width="2.5">
              <line x1="{210 + p['sparOffset']//3}" y1="92" x2="{210 + p['sparOffset']//3}" y2="168"/>
              <line x1="{235 + p['sparOffset']//3}" y1="95" x2="{235 + p['sparOffset']//3}" y2="165"/>
              <line x1="{260 + p['sparOffset']//3}" y1="98" x2="{260 + p['sparOffset']//3}" y2="162"/>
              <line x1="{285 + p['sparOffset']//3}" y1="100" x2="{285 + p['sparOffset']//3}" y2="160"/>
            </g>
            <text x="215" y="85" fill="#00ff9d" font-family="monospace" font-size="9">COMPRESSOR (N2)</text>
            <rect x="330" y="98" width="60" height="18" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="2" rx="3"/>
            <rect x="330" y="144" width="60" height="18" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="2" rx="3"/>
            <text x="335" y="85" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">COMBUSTOR // T4 = {p['stationTemp']} K</text>
            <g stroke="#ffb700" stroke-width="2.5">
              <line x1="420" y1="100" x2="420" y2="160"/><line x1="445" y1="96" x2="445" y2="164"/><line x1="470" y1="92" x2="470" y2="168"/>
            </g>
            <text x="425" y="85" fill="#ffb700" font-family="monospace" font-size="9">TURBINE (HP/LP)</text>
            <line x1="680" y1="130" x2="745" y2="130" stroke="#f43f5e" stroke-width="4"/>
            <polygon points="755,130 740,124 740,136" fill="#f43f5e"/>
            <text x="635" y="120" fill="#f43f5e" font-family="monospace" font-size="11" font-weight="bold">NET THRUST Fn = {p['airflowCfs']}</text>
            """
        elif sim == "pfd":
            cur_speed = 240 + p["camberOffset"]
            cur_alt = 10000 + p["sparOffset"] * 100
            content = f"""
            <rect x="180" y="25" width="400" height="210" rx="10" fill="#040914" stroke="{color}" stroke-width="2.5"/>
            <rect x="230" y="45" width="300" height="70" fill="rgba(14, 116, 144, 0.4)"/>
            <rect x="230" y="115" width="300" height="70" fill="rgba(180, 83, 9, 0.4)"/>
            <line x1="230" y1="115" x2="530" y2="115" stroke="#ffffff" stroke-width="2"/>
            <line x1="340" y1="90" x2="420" y2="90" stroke="#ffffff" stroke-width="1.5"/><text x="425" y="93" fill="#ffffff" font-family="monospace" font-size="9">+10°</text>
            <line x1="340" y1="140" x2="420" y2="140" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,2"/><text x="425" y="143" fill="#ffffff" font-family="monospace" font-size="9">-10°</text>
            <path d="M 360 115 L 375 115 L 380 120 L 385 115 L 400 115" fill="none" stroke="#f43f5e" stroke-width="3"/>
            <circle cx="380" cy="115" r="3" fill="#ffb700"/>
            <rect x="190" y="45" width="38" height="140" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <text x="193" y="70" fill="#ffffff" font-family="monospace" font-size="9">{cur_speed + 20}</text>
            <rect x="188" y="105" width="42" height="20" fill="#00ff9d" rx="2"/>
            <text x="192" y="119" fill="#040914" font-family="monospace" font-size="11" font-weight="bold">{cur_speed}</text>
            <text x="193" y="165" fill="#ffffff" font-family="monospace" font-size="9">{cur_speed - 20}</text>
            <rect x="532" y="45" width="44" height="140" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <text x="535" y="70" fill="#ffffff" font-family="monospace" font-size="9">{cur_alt + 400}</text>
            <rect x="530" y="105" width="48" height="20" fill="#00ff9d" rx="2"/>
            <text x="533" y="119" fill="#040914" font-family="monospace" font-size="10" font-weight="bold">{cur_alt}</text>
            <text x="535" y="165" fill="#ffffff" font-family="monospace" font-size="9">{cur_alt - 400}</text>
            <path d="M 280 215 C 330 195, 430 195, 480 215" fill="none" stroke="{color}" stroke-width="2"/>
            <polygon points="380,195 375,203 385,203" fill="#ffb700"/>
            <text x="355" y="222" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">HDG {((n * 17) % 360):03d}°</text>
            """
        elif sim == "controls":
            content = f"""
            <line x1="60" y1="130" x2="680" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
            <line x1="380" y1="30" x2="380" y2="230" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
            <path d="M 120 130 C 180 115, 300 115, 600 128 L 640 100 L 645 130 L 640 160 L 600 132 C 300 145, 180 145, 120 130 Z" fill="rgba(0, 240, 255, 0.08)" stroke="{color}" stroke-width="2"/>
            <polygon points="340,120 {480 + p['sparOffset']},45 {520 + p['sparOffset']},48 390,124" fill="rgba(0,255,157,0.1)" stroke="#00ff9d" stroke-width="2"/>
            <polygon points="340,140 {480 + p['sparOffset']},215 {520 + p['sparOffset']},212 390,136" fill="rgba(0,255,157,0.1)" stroke="#00ff9d" stroke-width="2"/>
            <rect x="{460 + p['sparOffset']}" y="48" width="50" height="10" fill="rgba(244,63,94,0.4)" stroke="#f43f5e" stroke-width="1.5"/>
            <text x="{430 + p['sparOffset']}" y="38" fill="#f43f5e" font-family="monospace" font-size="9">L. AILERON (δa = {p['aoa']})</text>
            <circle cx="{340 + p['camberOffset']//2}" cy="130" r="7" fill="#ffb700" stroke="#ffffff" stroke-width="1.5"/>
            <text x="{310 + p['camberOffset']//2}" y="110" fill="#ffb700" font-family="monospace" font-size="10" font-weight="bold">CG</text>
            <circle cx="{380 + p['camberOffset']//2}" cy="130" r="7" fill="#00f0ff" stroke="#ffffff" stroke-width="1.5"/>
            <text x="{385 + p['camberOffset']//2}" y="110" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">AC (b/2 = {p['wingSpan']})</text>
            <text x="170" y="165" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">ROLL (X-AXIS)</text>
            <text x="330" y="55" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">PITCH (Y-AXIS)</text>
            <text x="580" y="180" fill="#ffb700" font-family="monospace" font-size="10" font-weight="bold">YAW (Z-AXIS)</text>
            """
        else:
            y_up = 45 - p["camberOffset"]
            y_lo = 165 + p["thicknessOffset"] // 2
            content = f"""
            <line x1="40" y1="130" x2="720" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4" stroke-width="1.5"/>
            <line x1="380" y1="20" x2="380" y2="240" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" stroke-width="1"/>
            <path d="M 120 130 C 200 {y_up}, 480 {y_up + 10}, 620 130 C 480 {y_lo}, 220 {y_lo - 5}, 120 130 Z" fill="rgba(0, 240, 255, 0.08)" stroke="{color}" stroke-width="2.5"/>
            <path d="M 60 70 C 220 {y_up - 15}, 480 {y_up - 10}, 700 80" fill="none" stroke="url(#{id_prefix}-glow)" stroke-width="2" stroke-dasharray="4,2"/>
            <path d="M 60 100 C 210 {y_up + 15}, 490 {y_up + 20}, 700 110" fill="none" stroke="url(#{id_prefix}-glow)" stroke-width="2.5"/>
            <line x1="380" y1="130" x2="380" y2="35" stroke="#00ff9d" stroke-width="3.5"/>
            <polygon points="380,25 374,40 386,40" fill="#00ff9d"/>
            <text x="395" y="45" fill="#00ff9d" font-family="monospace" font-size="12" font-weight="bold">LIFT VECTOR (L)</text>
            <line x1="380" y1="130" x2="520" y2="130" stroke="#f43f5e" stroke-width="3"/>
            <polygon points="530,130 515,124 515,136" fill="#f43f5e"/>
            <text x="535" y="135" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="bold">DRAG (D)</text>
            <circle cx="120" cy="130" r="5" fill="#ffb700"/>
            <text x="55" y="125" fill="#ffb700" font-family="monospace" font-size="10">STAGNATION (p0)</text>
            <circle cx="280" cy="{y_up + 30}" r="5" fill="{color}"/>
            <text x="230" y="{y_up + 15}" fill="{color}" font-family="monospace" font-size="10">MIN PRESSURE (-Cp)</text>
            <path d="M 170 130 A 50 50 0 0 0 165 110" fill="none" stroke="#ffb700" stroke-width="1.8"/>
            <text x="180" y="120" fill="#ffb700" font-family="monospace" font-size="10">α = {p['aoa']}</text>
            """

    elif d == 2:
        # DIAGRAM 2: BOUNDARY LAYER & SENSORS
        content = f"""
        <rect x="50" y="170" width="660" height="25" fill="rgba(255,255,255,0.12)" stroke="{color}" stroke-width="1.5" />
        <text x="60" y="187" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="11">AERODYNAMIC BOUNDARY SURFACE // MAT: TITANIUM ALLOY (y = 0)</text>
        <path d="M 140 170 C 140 130, 220 90, {260 + p['sparOffset']//2} 90 L {260 + p['sparOffset']//2} 50" fill="none" stroke="#00ff9d" stroke-width="2.5" />
        <line x1="140" y1="170" x2="140" y2="50" stroke="rgba(255,255,255,0.25)" stroke-dasharray="3,3" />
        <line x1="140" y1="150" x2="{165 + p['camberOffset']//4}" y2="150" stroke="#00ff9d" stroke-width="1.5" />
        <line x1="140" y1="130" x2="{195 + p['camberOffset']//3}" y2="130" stroke="#00ff9d" stroke-width="1.5" />
        <line x1="140" y1="110" x2="{230 + p['camberOffset']//2}" y2="110" stroke="#00ff9d" stroke-width="1.5" />
        <text x="{270 + p['sparOffset']//2}" y="95" fill="#00ff9d" font-family="monospace" font-size="11">u(y) = 0.99 U∞ ({p['machNum']})</text>
        <g transform="translate(380, 110)">
          <rect x="0" y="0" width="16" height="60" fill="{color}" rx="2" />
          <circle cx="8" cy="0" r="6" fill="#ffb700" />
          <text x="-40" y="-12" fill="#ffb700" font-family="monospace" font-size="11">PITOT-STATIC RAKE [P-01]</text>
        </g>
        <g transform="translate(560, 130)">
          <rect x="0" y="0" width="14" height="40" fill="#ec4899" rx="2" />
          <circle cx="7" cy="0" r="5" fill="#ffffff" />
          <text x="-35" y="-10" fill="#ec4899" font-family="monospace" font-size="11">HOT-FILM SENSOR [HF-04]</text>
        </g>
        """

    elif d == 3:
        # DIAGRAM 3: CAD STRUCTURAL INSPECTOR
        content = f"""
        <polygon points="100,80 650,50 620,220 120,200" fill="rgba(0, 240, 255, 0.04)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <line x1="160" y1="80" x2="630" y2="55" stroke="#00ff9d" stroke-width="3.5" />
        <line x1="140" y1="180" x2="615" y2="195" stroke="#00ff9d" stroke-width="3" />
        <text x="170" y="70" fill="#00ff9d" font-family="monospace" font-size="11">FRONT SPAR (CANTILEVER LOAD BEARING)</text>
        <text x="150" y="215" fill="#00ff9d" font-family="monospace" font-size="11">REAR SPAR (CONTROL SURFACE HINGE LINE)</text>
        <line x1="220" y1="78" x2="200" y2="185" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="300" y1="73" x2="280" y2="188" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="380" y1="68" x2="360" y2="190" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="460" y1="63" x2="440" y2="192" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <rect x="{290 + p['sparOffset']//2}" y="90" width="150" height="80" fill="rgba(255, 183, 0, 0.08)" stroke="#ffb700" stroke-dasharray="4,3" stroke-width="1.5" />
        <text x="{305 + p['sparOffset']//2}" y="135" fill="#ffb700" font-family="monospace" font-size="11">INTERNAL FUEL CELL BAY</text>
        <line x1="100" y1="240" x2="620" y2="240" stroke="{color}" stroke-width="1.5" />
        <text x="300" y="255" fill="{color}" font-family="monospace" font-size="11">SEMISPAN b/2 = {p['wingSpan']}</text>
        """

    elif d == 4:
        # DIAGRAM 4: V-N FLIGHT ENVELOPE
        content = f"""
        <line x1="80" y1="20" x2="80" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <line x1="80" y1="140" x2="720" y2="140" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <text x="30" y="30" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">+G (n)</text>
        <text x="30" y="145" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">1.0G</text>
        <text x="30" y="210" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">-1.0G</text>
        <text x="680" y="160" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">V (kts)</text>
        <path d="M 80 140 Q 180 140, {220 + p['camberOffset']//2} 40 L {540 + p['sparOffset']//2} 40 L 640 140 L 580 200 L 260 200 Q 180 140, 80 140 Z" fill="rgba(0, 255, 157, 0.08)" stroke="#00ff9d" stroke-width="2.5" />
        <line x1="{220 + p['camberOffset']//2}" y1="40" x2="{220 + p['camberOffset']//2}" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3" />
        <text x="{200 + p['camberOffset']//2}" y="225" fill="#ffb700" font-family="monospace" font-size="10">VA (165 kts)</text>
        <line x1="{540 + p['sparOffset']//2}" y1="40" x2="{540 + p['sparOffset']//2}" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3" />
        <text x="{520 + p['sparOffset']//2}" y="225" fill="{color}" font-family="monospace" font-size="10">VC ({p['machNum']})</text>
        <circle cx="380" cy="140" r="7" fill="#00f0ff" stroke="#ffffff" stroke-width="2" />
        <text x="400" y="135" fill="#00f0ff" font-family="monospace" font-size="11" font-weight="bold">TRIM POINT (1.0G / {p['machNum']})</text>
        """

    else:
        # DIAGRAM 5: AVIONICS BUS & CROSS-LINK
        content = f"""
        <line x1="60" y1="125" x2="700" y2="125" stroke="{color}" stroke-width="3" />
        <line x1="60" y1="135" x2="700" y2="135" stroke="#ffb700" stroke-width="3" />
        <text x="65" y="115" fill="{color}" font-family="monospace" font-size="10">PRIMARY AFDX BUS A [CH-{n}]</text>
        <text x="65" y="150" fill="#ffb700" font-family="monospace" font-size="10">SECONDARY AFDX BUS B [TOL {p['tolerance']}]</text>
        
        <rect x="80" y="35" width="160" height="60" rx="6" fill="rgba(0, 240, 255, 0.12)" stroke="{color}" stroke-width="2" />
        <text x="95" y="58" fill="{color}" font-family="monospace" font-size="11" font-weight="bold">FLIGHT CONTROL (FCC)</text>
        <text x="95" y="75" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">REYNOLDS: {p['reynoldsNum']}</text>
        <line x1="160" y1="95" x2="160" y2="125" stroke="{color}" stroke-width="2" stroke-dasharray="2,2" />
        
        <rect x="290" y="35" width="180" height="60" rx="6" fill="rgba(0, 255, 157, 0.12)" stroke="#00ff9d" stroke-width="2" />
        <text x="305" y="58" fill="#00ff9d" font-family="monospace" font-size="11" font-weight="bold">HYDRAULICS &amp; ECS</text>
        <text x="305" y="75" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">PRESSURE: {p['pressureRatio']}</text>
        <line x1="380" y1="95" x2="380" y2="125" stroke="#00ff9d" stroke-width="2" stroke-dasharray="2,2" />
        
        <rect x="520" y="35" width="160" height="60" rx="6" fill="rgba(255, 183, 0, 0.12)" stroke="#ffb700" stroke-width="2" />
        <text x="535" y="58" fill="#ffb700" font-family="monospace" font-size="11" font-weight="bold">PROPULSION FADEC</text>
        <text x="535" y="75" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">MASS FLOW: {p['airflowCfs']}</text>
        <line x1="600" y1="95" x2="600" y2="125" stroke="#ffb700" stroke-width="2" stroke-dasharray="2,2" />
        """

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" width="100%" height="100%">
{defs}
{content}
</svg>"""
    return svg
