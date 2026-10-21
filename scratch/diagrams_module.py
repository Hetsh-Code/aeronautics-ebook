# -*- coding: utf-8 -*-
"""
Builder for distinct diagrams and distinct interactives on every page of Aeronautics E-book.
"""

import sys

def get_diagrams_js():
    return r'''
  // =========================================================
  // DOMAIN CLASSIFIER FOR BESPOKE MULTI-DISCIPLINARY SCHEMATICS
  // =========================================================
  function getDomainKey(meta) {
    if (!meta) return 'aerodynamics';
    const t = (meta.title || '').toLowerCase();
    const d = (meta.domain || '').toLowerCase();
    const sim = (meta.simType || '').toLowerCase();
    const disc = (meta.discipline || '').toLowerCase();

    if (d === 'propulsion' || sim === 'engine' || t.includes('engine') || t.includes('propul') || t.includes('turb') || t.includes('thrust') || disc.includes('propulsion')) return 'propulsion';
    if (d === 'avionics' || sim === 'pfd' || t.includes('avionics') || t.includes('cockpit') || t.includes('radar') || t.includes('instrument') || disc.includes('avionics')) return 'avionics';
    if (d === 'supersonic' || sim === 'mach' || t.includes('supersonic') || t.includes('mach') || t.includes('shock') || t.includes('compressib') || disc.includes('shock')) return 'supersonic';
    if (d === 'orbit' || sim === 'orbit' || t.includes('orbit') || t.includes('space') || t.includes('rocket') || t.includes('satellite') || disc.includes('space')) return 'orbit';
    if (d === 'controls' || sim === 'controls' || t.includes('control') || t.includes('stability') || t.includes('rudder') || t.includes('elevator') || t.includes('aileron')) return 'controls';
    if (d === 'structure' || sim === 'structure' || t.includes('structure') || t.includes('fuselage') || t.includes('wing') || t.includes('spar') || t.includes('gear') || t.includes('material')) return 'structure';
    if (d === 'rotorcraft' || sim === 'rotor' || t.includes('rotor') || t.includes('helicopter') || t.includes('vtol')) return 'rotorcraft';
    if (d === 'atmosphere' || sim === 'atmosphere' || t.includes('atmosphere') || t.includes('weather') || t.includes('meteorol') || t.includes('air')) return 'atmosphere';
    if (d === 'history' || t.includes('history') || t.includes('wright') || t.includes('lilienthal') || meta.num === 2) return 'history';
    return 'aerodynamics';
  }

  // Helper for blueprint background grid & linear gradient
  function getTechDefs(idPrefix, chipColor) {
    return `
      <defs>
        <pattern id="${idPrefix}-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        </pattern>
        <linearGradient id="${idPrefix}-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${chipColor}" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="${chipColor}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#00ff9d" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#${idPrefix}-grid)" />
    `;
  }

  // ---------------------------------------------------------
  // DIAGRAM 1: THEORETICAL SCHEMATIC & VECTOR DECOMPOSITION (Page 1)
  // ---------------------------------------------------------
  function renderDiagram1(meta) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);
    const p = getChapterDiagramParams(meta.num, 1);
    let svg = '';

    if (domain === 'propulsion') {
      svg = `
        ${getTechDefs(`d1-eng-${p.n}`, c)}
        <line x1="40" y1="130" x2="720" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4" stroke-width="1.5"/>
        <path d="M 70 50 C 200 35, 480 40, 680 85 L 660 110 C 480 90, 200 85, 100 95 Z" fill="rgba(255,255,255,0.06)" stroke="${c}" stroke-width="2"/>
        <path d="M 70 210 C 200 225, 480 220, 680 175 L 660 150 C 480 170, 200 175, 100 165 Z" fill="rgba(255,255,255,0.06)" stroke="${c}" stroke-width="2"/>
        <path d="M 80 130 C 105 105, 135 105, 140 130 C 135 155, 105 155, 80 130 Z" fill="${c}" stroke="#ffffff" stroke-width="1.5"/>
        <g stroke="${c}" stroke-width="3">
          <line x1="140" y1="55" x2="150" y2="205"/>
          <line x1="150" y1="58" x2="160" y2="202"/>
        </g>
        <text x="125" y="45" fill="${c}" font-family="monospace" font-size="10" font-weight="bold">FAN (N1) // PR ${p.pressureRatio}</text>
        <path d="M 180 100 L 520 100 L 580 120 L 520 140 L 180 140" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <path d="M 180 160 L 520 160 L 580 140 L 520 120 L 180 120" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <g stroke="#00ff9d" stroke-width="2.5">
          <line x1="210" y1="102" x2="210" y2="158"/><line x1="235" y1="104" x2="235" y2="156"/><line x1="260" y1="106" x2="260" y2="154"/><line x1="285" y1="108" x2="285" y2="152"/>
        </g>
        <text x="215" y="92" fill="#00ff9d" font-family="monospace" font-size="9">COMPRESSOR (N2)</text>
        <rect x="330" y="106" width="60" height="15" fill="rgba(244,63,94,0.4)" stroke="#f43f5e" stroke-width="2" rx="3"/>
        <rect x="330" y="139" width="60" height="15" fill="rgba(244,63,94,0.4)" stroke="#f43f5e" stroke-width="2" rx="3"/>
        <text x="335" y="92" fill="#f43f5e" font-family="monospace" font-size="9" font-weight="bold">COMBUSTOR // T4 = ${p.stationTemp} K</text>
        <g stroke="#ffb700" stroke-width="2.5">
          <line x1="420" y1="108" x2="420" y2="152"/><line x1="445" y1="104" x2="445" y2="156"/><line x1="470" y1="102" x2="470" y2="158"/>
        </g>
        <text x="425" y="92" fill="#ffb700" font-family="monospace" font-size="9">TURBINE (HP/LP)</text>
        <line x1="680" y1="130" x2="745" y2="130" stroke="#f43f5e" stroke-width="4" id="d1PropVectorThrust"/>
        <polygon points="755,130 740,124 740,136" fill="#f43f5e"/>
        <text x="635" y="120" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="bold" id="d1PropThrustTxt">Fn = ${p.airflowCfs}</text>
        <text x="70" y="245" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="9">STA 0 (AMB) &bull; STA 2 (FAN) &bull; STA 3 (P3=${p.pressureRatio}) &bull; STA 4 (T4=${p.stationTemp}K) &bull; TOL: ${p.tolerance}</text>
      `;
    } else if (domain === 'avionics') {
      const currentSpeed = 240 + p.camberOffset;
      const currentAlt = 10000 + p.sparOffset * 100;
      svg = `
        ${getTechDefs(`d1-pfd-${p.n}`, c)}
        <rect x="180" y="15" width="400" height="230" rx="10" fill="#040914" stroke="${c}" stroke-width="2.5"/>
        <rect x="230" y="35" width="300" height="75" fill="rgba(14, 116, 144, 0.4)"/>
        <rect x="230" y="110" width="300" height="75" fill="rgba(180, 83, 9, 0.4)"/>
        <line x1="230" y1="110" x2="530" y2="110" stroke="#ffffff" stroke-width="2" id="d1PfdHorizon"/>
        <line x1="340" y1="85" x2="420" y2="85" stroke="#ffffff" stroke-width="1.5"/><text x="425" y="88" fill="#ffffff" font-family="monospace" font-size="9">+10°</text>
        <line x1="340" y1="135" x2="420" y2="135" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,2"/><text x="425" y="138" fill="#ffffff" font-family="monospace" font-size="9">-10°</text>
        <path d="M 360 110 L 375 110 L 380 115 L 385 110 L 400 110" fill="none" stroke="#f43f5e" stroke-width="3"/>
        <circle cx="380" cy="110" r="3" fill="#ffb700"/>
        <rect x="190" y="35" width="38" height="150" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="193" y="65" fill="#ffffff" font-family="monospace" font-size="9">${currentSpeed + 20}</text>
        <rect x="188" y="100" width="42" height="20" fill="#00ff9d" rx="2"/>
        <text x="192" y="114" fill="#040914" font-family="monospace" font-size="11" font-weight="bold">${currentSpeed}</text>
        <text x="193" y="160" fill="#ffffff" font-family="monospace" font-size="9">${currentSpeed - 20}</text>
        <rect x="532" y="35" width="44" height="150" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="535" y="65" fill="#ffffff" font-family="monospace" font-size="9">${currentAlt + 400}</text>
        <rect x="530" y="100" width="48" height="20" fill="#00ff9d" rx="2"/>
        <text x="533" y="114" fill="#040914" font-family="monospace" font-size="10" font-weight="bold">${currentAlt}</text>
        <text x="535" y="160" fill="#ffffff" font-family="monospace" font-size="9">${currentAlt - 400}</text>
        <path d="M 280 215 C 330 195, 430 195, 480 215" fill="none" stroke="${c}" stroke-width="2"/>
        <polygon points="380,195 375,203 385,203" fill="#ffb700"/>
        <text x="355" y="222" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">HDG ${String((p.n * 17) % 360).padStart(3, '0')}°</text>
      `;
    } else if (domain === 'supersonic') {
      const shockAng = parseFloat(p.shockAngle);
      svg = `
        ${getTechDefs(`d1-mach-${p.n}`, c)}
        <line x1="40" y1="130" x2="720" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
        <polygon points="320,130 580,85 580,175" fill="rgba(244,63,94,0.12)" stroke="${c}" stroke-width="2.5"/>
        <line x1="320" y1="130" x2="160" y2="${130 - Math.tan(shockAng * Math.PI / 180) * 160}" stroke="#00ff9d" stroke-width="3" id="d1ShockUpper"/>
        <line x1="320" y1="130" x2="160" y2="${130 + Math.tan(shockAng * Math.PI / 180) * 160}" stroke="#00ff9d" stroke-width="3" id="d1ShockLower"/>
        <path d="M 240 130 A 80 80 0 0 0 255 105" fill="none" stroke="#ffb700" stroke-width="2"/>
        <text x="210" y="100" fill="#ffb700" font-family="monospace" font-size="11" font-weight="bold">SHOCK ANGLE β = ${p.shockAngle}°</text>
        <text x="60" y="70" fill="#00ff9d" font-family="monospace" font-size="12" font-weight="bold">SUPERSONIC UPSTREAM: ${p.machNum}</text>
        <text x="440" y="60" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="10">WEDGE HALF-ANGLE θ = 12.0°</text>
        <text x="360" y="195" fill="${c}" font-family="monospace" font-size="10">SUBSONIC / COMPRESSED FLOW DOWNSTREAM</text>
      `;
    } else if (domain === 'orbit') {
      svg = `
        ${getTechDefs(`d1-orb-${p.n}`, c)}
        <ellipse cx="380" cy="130" rx="260" ry="90" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="6,3" id="d1OrbitEllipse"/>
        <circle cx="300" cy="130" r="38" fill="url(#d1-orb-${p.n}-glow)" stroke="#00f0ff" stroke-width="2"/>
        <text x="278" y="135" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">EARTH</text>
        <g transform="translate(640, 130)">
          <rect x="-10" y="-8" width="20" height="16" fill="#ffb700" rx="3"/>
          <line x1="-22" y1="0" x2="-10" y2="0" stroke="#00f0ff" stroke-width="3"/>
          <line x1="10" y1="0" x2="22" y2="0" stroke="#00f0ff" stroke-width="3"/>
          <text x="-20" y="24" fill="#ffb700" font-family="monospace" font-size="10">APOGEE (ra)</text>
        </g>
        <line x1="640" y1="130" x2="640" y2="70" stroke="#00ff9d" stroke-width="2.5"/>
        <polygon points="640,60 635,75 645,75" fill="#00ff9d"/>
        <text x="650" y="75" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">VELOCITY v_a</text>
        <text x="110" y="135" fill="#ff3366" font-family="monospace" font-size="10">PERIGEE (rp)</text>
        <text x="280" y="240" fill="${c}" font-family="monospace" font-size="10">HOHMANN ΔV = ${p.burnDeltaV} km/s &bull; SPEC: ${p.specCode}</text>
      `;
    } else if (domain === 'controls') {
      svg = `
        ${getTechDefs(`d1-ctrl-${p.n}`, c)}
        <line x1="60" y1="130" x2="680" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
        <line x1="380" y1="30" x2="380" y2="230" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
        <path d="M 120 130 C 180 115, 300 115, 600 128 L 640 100 L 645 130 L 640 160 L 600 132 C 300 145, 180 145, 120 130 Z" fill="rgba(0, 240, 255, 0.08)" stroke="${c}" stroke-width="2"/>
        <polygon points="340,120 480,45 520,48 390,124" fill="rgba(0,255,157,0.1)" stroke="#00ff9d" stroke-width="2"/>
        <polygon points="340,140 480,215 520,212 390,136" fill="rgba(0,255,157,0.1)" stroke="#00ff9d" stroke-width="2"/>
        <rect x="460" y="48" width="50" height="10" fill="rgba(244,63,94,0.4)" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="430" y="38" fill="#f43f5e" font-family="monospace" font-size="9">L. AILERON (δa = ${p.aoa})</text>
        <circle cx="340" cy="130" r="7" fill="#ffb700" stroke="#ffffff" stroke-width="1.5"/>
        <text x="310" y="110" fill="#ffb700" font-family="monospace" font-size="10" font-weight="bold">CG</text>
        <circle cx="380" cy="130" r="7" fill="#00f0ff" stroke="#ffffff" stroke-width="1.5"/>
        <text x="385" y="110" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">AC (b/2 = ${p.wingSpan})</text>
        <text x="170" y="165" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">ROLL (X-AXIS)</text>
        <text x="330" y="55" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">PITCH (Y-AXIS)</text>
        <text x="580" y="180" fill="#ffb700" font-family="monospace" font-size="10" font-weight="bold">YAW (Z-AXIS)</text>
      `;
    } else if (domain === 'structure') {
      svg = `
        ${getTechDefs(`d1-str-${p.n}`, c)}
        <polygon points="80,180 620,180 580,80 120,80" fill="rgba(0, 255, 157, 0.08)" stroke="${c}" stroke-width="2"/>
        <line x1="120" y1="80" x2="80" y2="180" stroke="#00ff9d" stroke-width="4"/>
        <text x="50" y="70" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">FRONT SPAR (WEB t=2.5mm)</text>
        <line x1="580" y1="80" x2="620" y2="180" stroke="#ffb700" stroke-width="3"/>
        <text x="540" y="70" fill="#ffb700" font-family="monospace" font-size="10">REAR SPAR</text>
        <line x1="80" y1="130" x2="620" y2="130" stroke="rgba(255,255,255,0.3)" stroke-dasharray="4,4"/>
        <text x="320" y="125" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">NEUTRAL AXIS (N.A.)</text>
        <g stroke="#f43f5e" stroke-width="2">
          <line x1="200" y1="65" x2="260" y2="65"/><polygon points="270,65 258,60 258,70" fill="#f43f5e"/>
        </g>
        <text x="280" y="68" fill="#f43f5e" font-family="monospace" font-size="10">COMPRESSION (-σ)</text>
        <g stroke="#00f0ff" stroke-width="2">
          <line x1="260" y1="195" x2="200" y2="195"/><polygon points="190,195 202,190 202,200" fill="#00f0ff"/>
        </g>
        <text x="280" y="198" fill="#00f0ff" font-family="monospace" font-size="10">TENSION (+σ = ${p.stressMpa})</text>
        <text x="140" y="240" fill="${c}" font-family="monospace" font-size="10">SHEAR FLOW q = VQ/I &bull; MATERIAL: 7075-T6 ALCLAD &bull; TOL: ${p.tolerance}</text>
      `;
    } else if (domain === 'atmosphere') {
      svg = `
        ${getTechDefs(`d1-atm-${p.n}`, c)}
        <line x1="120" y1="20" x2="120" y2="220" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <line x1="120" y1="220" x2="680" y2="220" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <text x="30" y="30" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">ALTITUDE (km)</text>
        <text x="600" y="245" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">TEMP (°C)</text>
        <line x1="110" y1="180" x2="680" y2="180" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3,3"/><text x="40" y="185" fill="#00f0ff" font-family="monospace" font-size="10">11 km (FL360)</text>
        <line x1="110" y1="100" x2="680" y2="100" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3,3"/><text x="40" y="105" fill="#c084fc" font-family="monospace" font-size="10">20 km (STRAT)</text>
        <polyline points="480,220 260,180 260,100 320,30" fill="none" stroke="#00f0ff" stroke-width="3.5" id="d1AtmCurve"/>
        <text x="490" y="215" fill="#00ff9d" font-family="monospace" font-size="10">+15°C (MSL)</text>
        <text x="180" y="170" fill="#f43f5e" font-family="monospace" font-size="10">-56.5°C (TROPOPAUSE)</text>
        <text x="270" y="90" fill="#c084fc" font-family="monospace" font-size="10">ISOTHERMAL LAYER</text>
        <text x="220" y="245" fill="${c}" font-family="monospace" font-size="10">LAPSE RATE: -6.5°C/km &bull; ρ0 = 1.225 kg/m³ &bull; P0 = 101.3 kPa</text>
      `;
    } else if (domain === 'rotorcraft') {
      svg = `
        ${getTechDefs(`d1-rot-${p.n}`, c)}
        <ellipse cx="380" cy="130" rx="260" ry="60" fill="rgba(0, 240, 255, 0.05)" stroke="${c}" stroke-width="2"/>
        <line x1="380" y1="130" x2="380" y2="40" stroke="#ffb700" stroke-width="4"/>
        <polygon points="380,30 374,45 386,45" fill="#ffb700"/>
        <text x="395" y="40" fill="#ffb700" font-family="monospace" font-size="11" font-weight="bold">ROTOR THRUST (T)</text>
        <line x1="140" y1="130" x2="620" y2="130" stroke="#00ff9d" stroke-width="3.5"/>
        <circle cx="380" cy="130" r="10" fill="${c}"/>
        <text x="500" y="115" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">ADVANCING: V + ΩR</text>
        <text x="160" y="115" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="bold">RETREATING: V - ΩR</text>
        <path d="M 380 90 A 40 40 0 0 1 420 130" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,3"/>
        <polygon points="420,130 415,120 425,120" fill="#ffffff"/>
        <text x="430" y="105" fill="#ffffff" font-family="monospace" font-size="10">Ω (ROTATION)</text>
        <text x="220" y="225" fill="${c}" font-family="monospace" font-size="10">TIP SPEED = 215 m/s &bull; FLAPPING HINGE δβ = ${p.aoa} &bull; CODE: ${p.specCode}</text>
      `;
    } else if (domain === 'history') {
      svg = `
        ${getTechDefs(`d1-hist-${p.n}`, c)}
        <line x1="60" y1="130" x2="700" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4"/>
        <!-- Biplane Upper & Lower Wings -->
        <path d="M 220 70 C 300 55, 460 55, 540 70" fill="none" stroke="#ffb700" stroke-width="3"/>
        <path d="M 220 130 C 300 115, 460 115, 540 130" fill="none" stroke="#ffb700" stroke-width="3"/>
        <line x1="260" y1="70" x2="260" y2="130" stroke="rgba(255,255,255,0.6)" stroke-width="1.8"/>
        <line x1="380" y1="65" x2="380" y2="125" stroke="rgba(255,255,255,0.6)" stroke-width="1.8"/>
        <line x1="500" y1="70" x2="500" y2="130" stroke="rgba(255,255,255,0.6)" stroke-width="1.8"/>
        <line x1="260" y1="70" x2="380" y2="125" stroke="rgba(0,240,255,0.4)" stroke-dasharray="3,3"/>
        <line x1="380" y1="65" x2="260" y2="130" stroke="rgba(0,240,255,0.4)" stroke-dasharray="3,3"/>
        <text x="270" y="45" fill="#ffb700" font-family="monospace" font-size="11" font-weight="bold">1903 WRIGHT BIPLANE TRUSS</text>
        <circle cx="370" cy="120" r="7" fill="#f43f5e"/>
        <text x="350" y="105" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="bold">CG</text>
        <line x1="370" y1="120" x2="370" y2="35" stroke="#00ff9d" stroke-width="3.5"/>
        <polygon points="370,25 364,40 376,40" fill="#00ff9d"/>
        <text x="385" y="35" fill="#00ff9d" font-family="monospace" font-size="11" font-weight="bold">LIFT (L)</text>
        <text x="120" y="170" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="10">CANARD PITCH EQUILIBRIUM</text>
        <text x="440" y="170" fill="${c}" font-family="monospace" font-size="10">WING WARPING LATERAL CONTROL</text>
        <text x="180" y="235" fill="${c}" font-family="monospace" font-size="10">GLIDE RATIO: 6.5:1 &bull; POWER: 12 HP ENGINE &bull; REF: KITTY HAWK 1903</text>
      `;
    } else {
      // Default Aerodynamics (Cambered Airfoil)
      const yUp = 45 - p.camberOffset;
      const yLo = 165 + p.thicknessOffset/2;
      svg = `
        ${getTechDefs(`d1-airf-${p.n}`, c)}
        <line x1="40" y1="130" x2="720" y2="130" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6,4" stroke-width="1.5"/>
        <line x1="380" y1="20" x2="380" y2="240" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" stroke-width="1"/>
        <path d="M 120 130 C 200 ${yUp}, 480 ${yUp + 10}, 620 130 C 480 ${yLo}, 220 ${yLo - 5}, 120 130 Z" fill="rgba(0, 240, 255, 0.08)" stroke="${c}" stroke-width="2.5" id="d1AirfoilPath"/>
        <path d="M 60 70 C 220 ${yUp - 15}, 480 ${yUp - 10}, 700 80" fill="none" stroke="url(#d1-airf-${p.n}-glow)" stroke-width="2" stroke-dasharray="4,2"/>
        <path d="M 60 100 C 210 ${yUp + 15}, 490 ${yUp + 20}, 700 110" fill="none" stroke="url(#d1-airf-${p.n}-glow)" stroke-width="2.5"/>
        <line x1="380" y1="130" x2="380" y2="35" stroke="#00ff9d" stroke-width="3.5" id="d1LiftArrow"/>
        <polygon points="380,25 374,40 386,40" fill="#00ff9d" id="d1LiftTip"/>
        <text x="395" y="45" fill="#00ff9d" font-family="monospace" font-size="12" font-weight="bold" id="d1LiftText">LIFT VECTOR (L)</text>
        <line x1="380" y1="130" x2="520" y2="130" stroke="#f43f5e" stroke-width="3" id="d1DragArrow"/>
        <polygon points="530,130 515,124 515,136" fill="#f43f5e" id="d1DragTip"/>
        <text x="535" y="135" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="bold" id="d1DragText">DRAG (D)</text>
        <circle cx="120" cy="130" r="5" fill="#ffb700"/>
        <text x="55" y="125" fill="#ffb700" font-family="monospace" font-size="10">STAGNATION (p0)</text>
        <circle cx="280" cy="${yUp + 30}" r="5" fill="${c}"/>
        <text x="230" y="${yUp + 15}" fill="${c}" font-family="monospace" font-size="10">MIN PRESSURE (-Cp)</text>
        <path d="M 170 130 A 50 50 0 0 0 165 110" fill="none" stroke="#ffb700" stroke-width="1.8"/>
        <text x="180" y="120" fill="#ffb700" font-family="monospace" font-size="10" id="d1AoaText">α = ${p.aoa}</text>
      `;
    }

    return `
      <div class="technical-figure-wrapper">
        <div class="figure-telemetry-header">
          <span class="fig-badge">DIAGRAM 1 // THEORETICAL SCHEMATIC (${meta.discipline})</span>
          <span class="fig-coords">SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}</span>
        </div>
        <div class="figure-svg-container">
          <svg viewBox="0 0 760 260" class="tech-schematic-svg" xmlns="http://www.w3.org/2000/svg">
            ${svg}
          </svg>
        </div>
        <div class="figure-caption">
          <strong>FIG 1.1:</strong> Theoretical Schematic for <em>${meta.title}</em> (Spec: <code>${p.specCode}</code>). Reynolds: <strong>${p.reynoldsNum}</strong>, Mach: <strong>${p.machNum}</strong>, Tolerance: <strong>${p.tolerance}</strong>.
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // DIAGRAM 2: FLOW ARCHITECTURE & SENSOR DISTRIBUTION (Page 2)
  // ---------------------------------------------------------
  function renderDiagram2(meta) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);
    const p = getChapterDiagramParams(meta.num, 2);
    let svg = '';

    if (domain === 'propulsion') {
      svg = `
        ${getTechDefs(`d2-prop-${p.n}`, c)}
        <rect x="60" y="40" width="640" height="150" rx="8" fill="rgba(255, 183, 0, 0.04)" stroke="${c}" stroke-width="2"/>
        <circle cx="140" cy="115" r="45" fill="none" stroke="#f43f5e" stroke-width="3"/>
        <circle cx="140" cy="115" r="15" fill="#ffb700"/>
        <text x="85" y="180" fill="#ffb700" font-family="monospace" font-size="10">SWIRLER NOZZLE (N=18)</text>
        <!-- Flame Cone Flow -->
        <path d="M 185 90 C 260 70, 420 80, 520 115 C 420 150, 260 160, 185 140 Z" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" stroke-width="2"/>
        <text x="260" y="120" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">PRIMARY COMBUSTION FLAME ZONE</text>
        <!-- Dilution Air Holes -->
        <circle cx="340" cy="65" r="12" fill="none" stroke="#00f0ff" stroke-width="2.5"/><line x1="340" y1="45" x2="340" y2="85" stroke="#00f0ff" stroke-width="2"/>
        <circle cx="440" cy="65" r="16" fill="none" stroke="#00f0ff" stroke-width="2.5"/><line x1="440" y1="45" x2="440" y2="85" stroke="#00f0ff" stroke-width="2"/>
        <circle cx="340" cy="165" r="12" fill="none" stroke="#00f0ff" stroke-width="2.5"/><line x1="340" y1="145" x2="340" y2="185" stroke="#00f0ff" stroke-width="2"/>
        <circle cx="440" cy="165" r="16" fill="none" stroke="#00f0ff" stroke-width="2.5"/><line x1="440" y1="145" x2="440" y2="185" stroke="#00f0ff" stroke-width="2"/>
        <text x="350" y="55" fill="#00f0ff" font-family="monospace" font-size="9">SECONDARY DILUTION PORTS</text>
        <line x1="520" y1="115" x2="680" y2="115" stroke="#ffb700" stroke-width="4"/>
        <polygon points="690,115 675,109 675,121" fill="#ffb700"/>
        <text x="560" y="105" fill="#ffb700" font-family="monospace" font-size="10">TURBINE INLET (TIT)</text>
      `;
    } else if (domain === 'supersonic') {
      svg = `
        ${getTechDefs(`d2-mach-${p.n}`, c)}
        <rect x="60" y="170" width="640" height="25" fill="rgba(255,255,255,0.1)" stroke="${c}" stroke-width="1.5"/>
        <text x="70" y="187" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">SUPERSONIC INLET BOUNDARY WALL (M=${p.machNum})</text>
        <!-- Incident & Reflected Shock forming Lambda -->
        <line x1="160" y1="40" x2="360" y2="140" stroke="#f43f5e" stroke-width="3"/>
        <line x1="360" y1="140" x2="330" y2="170" stroke="#f43f5e" stroke-width="2.5"/>
        <line x1="360" y1="140" x2="400" y2="170" stroke="#f43f5e" stroke-width="2.5"/>
        <line x1="360" y1="140" x2="560" y2="40" stroke="#00ff9d" stroke-width="3"/>
        <ellipse cx="365" cy="165" rx="35" ry="8" fill="rgba(244,63,94,0.3)" stroke="#ffb700" stroke-width="1.5"/>
        <text x="290" y="130" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="bold">LAMBDA SHOCK FOOT (λ)</text>
        <text x="280" y="188" fill="#ffb700" font-family="monospace" font-size="9">SEPARATION BUBBLE</text>
        <text x="440" y="60" fill="#00ff9d" font-family="monospace" font-size="10">REFLECTED SHOCK</text>
      `;
    } else if (domain === 'avionics') {
      svg = `
        ${getTechDefs(`d2-avi-${p.n}`, c)}
        <!-- AFDX Dual Ring Architecture -->
        <rect x="80" y="40" width="600" height="140" rx="20" fill="none" stroke="#00f0ff" stroke-width="3"/>
        <rect x="95" y="55" width="570" height="110" rx="15" fill="none" stroke="#ffb700" stroke-width="2" stroke-dasharray="5,3"/>
        <text x="110" y="32" fill="#00f0ff" font-family="monospace" font-size="11" font-weight="bold">PRIMARY AFDX RING (LANE A - 100 Mbps)</text>
        <text x="110" y="195" fill="#ffb700" font-family="monospace" font-size="10">SECONDARY AFDX RING (LANE B - HOT STANDBY)</text>
        <!-- Nodes -->
        <rect x="140" y="70" width="80" height="45" rx="4" fill="#040914" stroke="#00ff9d" stroke-width="2"/><text x="150" y="97" fill="#00ff9d" font-family="monospace" font-size="10">FMC 1</text>
        <rect x="290" y="70" width="80" height="45" rx="4" fill="#040914" stroke="#00f0ff" stroke-width="2"/><text x="300" y="97" fill="#00f0ff" font-family="monospace" font-size="10">ADC 1</text>
        <rect x="440" y="70" width="80" height="45" rx="4" fill="#040914" stroke="#c084fc" stroke-width="2"/><text x="450" y="97" fill="#c084fc" font-family="monospace" font-size="10">IRS 1</text>
        <rect x="560" y="70" width="80" height="45" rx="4" fill="#040914" stroke="#f43f5e" stroke-width="2"/><text x="570" y="97" fill="#f43f5e" font-family="monospace" font-size="10">FCC 1</text>
      `;
    } else if (domain === 'orbit') {
      svg = `
        ${getTechDefs(`d2-orb-${p.n}`, c)}
        <!-- De Laval Nozzle Flow -->
        <path d="M 100 60 L 260 95 L 340 95 L 620 40 L 620 180 L 340 125 L 260 125 L 100 160 Z" fill="rgba(168, 85, 247, 0.08)" stroke="${c}" stroke-width="2"/>
        <line x1="300" y1="95" x2="300" y2="125" stroke="#f43f5e" stroke-width="3"/>
        <text x="250" y="85" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="bold">THROAT (M = 1.0)</text>
        <text x="120" y="115" fill="#ffb700" font-family="monospace" font-size="10">SUBSONIC (M < 1)</text>
        <text x="440" y="115" fill="#00ff9d" font-family="monospace" font-size="11" font-weight="bold">SUPERSONIC BELL (M > 3.5)</text>
        <line x1="620" y1="110" x2="710" y2="110" stroke="#00ff9d" stroke-width="3.5"/>
        <polygon points="720,110 705,104 705,116" fill="#00ff9d"/>
        <text x="630" y="95" fill="#00ff9d" font-family="monospace" font-size="10">ISP = 345 s</text>
      `;
    } else {
      // Default: Boundary layer velocity gradient
      svg = `
        ${getTechDefs(`d2-gen-${p.n}`, c)}
        <rect x="50" y="170" width="660" height="25" fill="rgba(255,255,255,0.12)" stroke="${c}" stroke-width="1.5" />
        <text x="60" y="187" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="11">AERODYNAMIC BOUNDARY SURFACE // MAT: TITANIUM ALLOY (y = 0)</text>
        <path d="M 140 170 C 140 130, 220 90, ${260 + p.sparOffset/2} 90 L ${260 + p.sparOffset/2} 50" fill="none" stroke="#00ff9d" stroke-width="2.5" />
        <line x1="140" y1="170" x2="140" y2="50" stroke="rgba(255,255,255,0.25)" stroke-dasharray="3,3" />
        <line x1="140" y1="150" x2="${165 + p.camberOffset/4}" y2="150" stroke="#00ff9d" stroke-width="1.5" />
        <line x1="140" y1="130" x2="${195 + p.camberOffset/3}" y2="130" stroke="#00ff9d" stroke-width="1.5" />
        <line x1="140" y1="110" x2="${230 + p.camberOffset/2}" y2="110" stroke="#00ff9d" stroke-width="1.5" />
        <text x="${270 + p.sparOffset/2}" y="95" fill="#00ff9d" font-family="monospace" font-size="11">u(y) = 0.99 U∞ (${p.machNum})</text>
        <g transform="translate(380, 110)">
          <rect x="0" y="0" width="16" height="60" fill="${c}" rx="2" />
          <circle cx="8" cy="0" r="6" fill="#ffb700" />
          <text x="-40" y="-12" fill="#ffb700" font-family="monospace" font-size="11">PITOT-STATIC RAKE [P-01]</text>
        </g>
        <g transform="translate(560, 130)">
          <rect x="0" y="0" width="14" height="40" fill="#ec4899" rx="2" />
          <circle cx="7" cy="0" r="5" fill="#ffffff" />
          <text x="-35" y="-10" fill="#ec4899" font-family="monospace" font-size="11">HOT-FILM SENSOR [HF-04]</text>
        </g>
      `;
    }

    return `
      <div class="technical-figure-wrapper">
        <div class="figure-telemetry-header">
          <span class="fig-badge">DIAGRAM 2 // DYNAMIC FLOW ARCHITECTURE & SENSOR MATRIX</span>
          <span class="fig-coords">SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}</span>
        </div>
        <div class="figure-svg-container">
          <svg viewBox="0 0 760 220" class="tech-schematic-svg" xmlns="http://www.w3.org/2000/svg">
            ${svg}
          </svg>
        </div>
        <div class="figure-caption">
          <strong>FIG 2.1:</strong> Operational Flow Gradient & Sensor Array for <em>${meta.title}</em> (Spec: <code>${p.specCode}</code>). Wall Shear Stress: <strong>${p.stressMpa}</strong>, Temperature: <strong>${p.temperatureK}</strong>.
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // DIAGRAM 3: CAD STRUCTURAL ARCHITECTURE & HOTSPOT INSPECTOR (Page 3)
  // ---------------------------------------------------------
  function renderDiagram3(meta) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);
    const p = getChapterDiagramParams(meta.num, 3);
    let svgBlueprint = '';

    if (domain === 'propulsion') {
      svgBlueprint = `
        <polygon points="120,60 520,40 560,220 160,210" fill="rgba(255, 183, 0, 0.04)" stroke="${c}" stroke-width="2"/>
        <!-- Turbine Fir-Tree Root & Blade -->
        <path d="M 240 60 C 260 90, 270 150, 240 210" fill="none" stroke="#00ff9d" stroke-width="3"/>
        <path d="M 380 50 C 410 90, 420 160, 390 215" fill="none" stroke="#00ff9d" stroke-width="3"/>
        <!-- Cooling Passages -->
        <line x1="280" y1="80" x2="360" y2="80" stroke="#00f0ff" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="285" y1="120" x2="365" y2="120" stroke="#00f0ff" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="290" y1="160" x2="370" y2="160" stroke="#00f0ff" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="260" y="45" fill="#00ff9d" font-family="monospace" font-size="11">COOLED TURBINE AEROFOIL (TBC COATING)</text>
        <text x="270" y="235" fill="#ffb700" font-family="monospace" font-size="11">FIR-TREE ROTOR DISC ATTACHMENT</text>
      `;
    } else if (domain === 'supersonic') {
      svgBlueprint = `
        <polygon points="100,60 660,60 620,210 140,210" fill="rgba(244, 63, 94, 0.04)" stroke="${c}" stroke-width="2"/>
        <polyline points="140,210 280,150 460,110 620,110" fill="none" stroke="#f43f5e" stroke-width="3.5"/>
        <text x="160" y="140" fill="#f43f5e" font-family="monospace" font-size="11">1ST COMPRESSION RAMP (14°)</text>
        <text x="320" y="100" fill="#ffb700" font-family="monospace" font-size="11">2ND VARIABLE RAMP</text>
        <line x1="460" y1="110" x2="460" y2="160" stroke="#00ff9d" stroke-width="2" stroke-dasharray="3,3"/>
        <text x="470" y="145" fill="#00ff9d" font-family="monospace" font-size="10">BLEED AIR SCOOP</text>
        <line x1="100" y1="240" x2="660" y2="240" stroke="${c}" stroke-width="1.5"/>
        <text x="300" y="255" fill="${c}" font-family="monospace" font-size="11">DIFFUSER LENGTH L = 4.85 m</text>
      `;
    } else if (domain === 'avionics') {
      svgBlueprint = `
        <rect x="120" y="40" width="520" height="190" rx="6" fill="rgba(0, 240, 255, 0.04)" stroke="${c}" stroke-width="2"/>
        <rect x="140" y="60" width="140" height="150" fill="rgba(255,255,255,0.05)" stroke="#00ff9d" stroke-width="1.5"/><text x="150" y="80" fill="#00ff9d" font-family="monospace" font-size="10">SLOT 1: DUAL DSP</text>
        <rect x="310" y="60" width="140" height="150" fill="rgba(255,255,255,0.05)" stroke="#00f0ff" stroke-width="1.5"/><text x="320" y="80" fill="#00f0ff" font-family="monospace" font-size="10">SLOT 2: POWER MOD</text>
        <rect x="480" y="60" width="140" height="150" fill="rgba(255,255,255,0.05)" stroke="#c084fc" stroke-width="1.5"/><text x="490" y="80" fill="#c084fc" font-family="monospace" font-size="10">SLOT 3: ARINC 600</text>
        <text x="240" y="245" fill="${c}" font-family="monospace" font-size="11">INTEGRATED MODULAR AVIONICS (IMA) 4-MCU CHASSIS</text>
      `;
    } else if (domain === 'orbit') {
      svgBlueprint = `
        <polygon points="180,50 560,50 500,220 240,220" fill="rgba(168, 85, 247, 0.05)" stroke="${c}" stroke-width="2"/>
        <ellipse cx="370" cy="80" rx="90" ry="25" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
        <text x="310" y="75" fill="#f43f5e" font-family="monospace" font-size="10">INJECTOR DOME (COAXIAL)</text>
        <line x1="280" y1="80" x2="260" y2="200" stroke="#00ff9d" stroke-width="3"/>
        <line x1="460" y1="80" x2="480" y2="200" stroke="#00ff9d" stroke-width="3"/>
        <text x="270" y="140" fill="#00ff9d" font-family="monospace" font-size="10">REGENERATIVE CHANNELS</text>
        <text x="250" y="245" fill="${c}" font-family="monospace" font-size="11">CRYOGENIC COMBUSTION LINER (NARLOY-Z)</text>
      `;
    } else {
      // Default: Wing Spar & CAD Rib Structure
      svgBlueprint = `
        <polygon points="100,80 650,50 620,220 120,200" fill="rgba(0, 240, 255, 0.04)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <line x1="160" y1="80" x2="630" y2="55" stroke="#00ff9d" stroke-width="3.5" />
        <line x1="140" y1="180" x2="615" y2="195" stroke="#00ff9d" stroke-width="3" />
        <text x="170" y="70" fill="#00ff9d" font-family="monospace" font-size="11">FRONT SPAR (CANTILEVER LOAD BEARING)</text>
        <text x="150" y="215" fill="#00ff9d" font-family="monospace" font-size="11">REAR SPAR (CONTROL SURFACE HINGE LINE)</text>
        <line x1="220" y1="78" x2="200" y2="185" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="300" y1="73" x2="280" y2="188" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="380" y1="68" x2="360" y2="190" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <line x1="460" y1="63" x2="440" y2="192" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <rect x="${290 + p.sparOffset/2}" y="90" width="150" height="80" fill="rgba(255, 183, 0, 0.08)" stroke="#ffb700" stroke-dasharray="4,3" stroke-width="1.5" />
        <text x="${305 + p.sparOffset/2}" y="135" fill="#ffb700" font-family="monospace" font-size="11">INTERNAL FUEL CELL BAY</text>
        <line x1="100" y1="240" x2="620" y2="240" stroke="${c}" stroke-width="1.5" />
        <text x="300" y="255" fill="${c}" font-family="monospace" font-size="11">SEMISPAN b/2 = ${p.wingSpan}</text>
      `;
    }

    const pins = meta.hotspotPins || [
      { id: 1, x: 22, y: 35, title: 'Primary Forward Spar Cap', spec: 'Titanium Ti-6Al-4V', stress: '320 MPa', status: 'CERTIFIED' },
      { id: 2, x: 42, y: 28, title: 'Rib Station 4 Shear Web', spec: '7075-T6 Aluminum', stress: '195 MPa', status: 'INSPECTED' },
      { id: 3, x: 62, y: 32, title: 'Upper Compression Skin', spec: 'Toray T800 Carbon', stress: '280 MPa', status: 'ULTRASONIC OK' },
      { id: 4, x: 50, y: 68, title: 'Lower Tension Skin', spec: '2024-T3 Aluminum', stress: '310 MPa', status: 'VERIFIED' },
      { id: 5, x: 78, y: 72, title: 'Rear Aileron Hinge Lug', spec: 'Stainless Steel 15-5PH', stress: '410 MPa', status: 'CALIBRATED' }
    ];

    return `
      <div class="technical-figure-wrapper">
        <div class="figure-telemetry-header">
          <span class="fig-badge">DIAGRAM 3 // CAD STRUCTURAL HOTSPOT INSPECTOR</span>
          <span class="fig-coords">SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}</span>
        </div>
        <div class="figure-svg-container" style="position: relative;">
          <svg viewBox="0 0 760 280" class="tech-schematic-svg" xmlns="http://www.w3.org/2000/svg">
            ${getTechDefs(`d3-cad-${p.n}`, c)}
            ${svgBlueprint}
          </svg>
          ${pins.map(pin => `
            <button type="button" class="cad-hotspot-pin ${pin.id === 1 ? 'active' : ''}" data-pin-id="${pin.id}" style="left: ${pin.x}%; top: ${pin.y}%;" title="${pin.title}">
              <span class="pin-radar-ring"></span>
              <span class="pin-core">${pin.id}</span>
            </button>
          `).join('')}
        </div>
        <div class="hotspot-telemetry-card" id="hotspotTelemetryCard">
          <div class="ht-header">
            <span class="ht-status-pill" id="htStatusBadge">HOTSPOT 1 ACTIVE</span>
            <span class="ht-comp-title" id="htCompTitle">${pins[0].title}</span>
          </div>
          <div class="ht-grid">
            <div class="ht-cell"><span class="ht-lbl">MATERIAL ALLOY</span><span class="ht-val" id="htSpec">${pins[0].spec}</span></div>
            <div class="ht-cell"><span class="ht-lbl">STRESS LOAD</span><span class="ht-val" id="htStress">${pins[0].stress || p.stressMpa}</span></div>
            <div class="ht-cell"><span class="ht-lbl">CERTIFICATION STATUS</span><span class="ht-val text-cyan" id="htStatus">${pins[0].status}</span></div>
          </div>
        </div>
        <div class="figure-caption">
          <strong>FIG 3.1:</strong> CAD Structural Architecture for <em>${meta.title}</em> (Spec: <code>${p.specCode}</code>). Click pins 1-5 to inspect metallurgy, load tolerance (<strong>${p.tolerance}</strong>), and sensor bounds.
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // DIAGRAM 4: EMPIRICAL PERFORMANCE CHARTS & ENVELOPES (Page 4)
  // ---------------------------------------------------------
  function renderDiagram4(meta) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);
    const p = getChapterDiagramParams(meta.num, 4);
    let svg = '';

    if (domain === 'propulsion') {
      svg = `
        ${getTechDefs(`d4-eng-${p.n}`, c)}
        <line x1="80" y1="20" x2="80" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <line x1="80" y1="210" x2="720" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <text x="20" y="30" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">PR (πc)</text>
        <text x="620" y="235" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">CORRECTED MASS FLOW</text>
        <!-- Surge Line -->
        <path d="M 120 190 Q 220 100, 480 35" fill="none" stroke="#f43f5e" stroke-width="3"/>
        <text x="190" y="80" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="bold">SURGE MARGIN LIMIT</text>
        <!-- Operating Line -->
        <path d="M 140 200 Q 260 130, 560 70" fill="none" stroke="#00ff9d" stroke-width="3"/>
        <text x="360" y="115" fill="#00ff9d" font-family="monospace" font-size="10" font-weight="bold">STEADY-STATE OPERATING LINE</text>
        <circle cx="380" cy="115" r="7" fill="#ffb700" stroke="#ffffff" stroke-width="2" id="d4SortieCrosshair"/>
        <text x="395" y="110" fill="#ffb700" font-family="monospace" font-size="10" font-weight="bold">MAX CONTINUOUS (MCR)</text>
      `;
    } else if (domain === 'supersonic') {
      svg = `
        ${getTechDefs(`d4-mach-${p.n}`, c)}
        <line x1="80" y1="20" x2="80" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <line x1="80" y1="210" x2="720" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <text x="25" y="30" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">DRAG (CD)</text>
        <text x="640" y="235" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">MACH NUMBER (M)</text>
        <!-- Transonic Drag Rise Curve -->
        <path d="M 80 180 L 280 180 Q 340 180, 380 60 Q 420 70, 700 130" fill="none" stroke="#f43f5e" stroke-width="3.5"/>
        <line x1="280" y1="20" x2="280" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3"/><text x="240" y="225" fill="#ffb700" font-family="monospace" font-size="10">M_crit (0.78)</text>
        <line x1="380" y1="20" x2="380" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3"/><text x="350" y="225" fill="#f43f5e" font-family="monospace" font-size="10">M_peak (1.05)</text>
        <circle cx="380" cy="60" r="7" fill="#00f0ff" stroke="#ffffff" stroke-width="2" id="d4SortieCrosshair"/>
        <text x="395" y="55" fill="#00f0ff" font-family="monospace" font-size="10" font-weight="bold">WAVE DRAG PEAK</text>
      `;
    } else {
      // Default: V-n Flight Envelope
      svg = `
        ${getTechDefs(`d4-env-${p.n}`, c)}
        <line x1="80" y1="20" x2="80" y2="210" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <line x1="80" y1="140" x2="720" y2="140" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
        <text x="30" y="30" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">+G (n)</text>
        <text x="30" y="145" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">1.0G</text>
        <text x="30" y="210" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">-1.0G</text>
        <text x="680" y="160" fill="rgba(255,255,255,0.8)" font-family="monospace" font-size="11">V (kts)</text>
        <path d="M 80 140 Q 180 140, ${220 + p.camberOffset/2} 40 L ${540 + p.sparOffset/2} 40 L 640 140 L 580 200 L 260 200 Q 180 140, 80 140 Z" fill="rgba(0, 255, 157, 0.08)" stroke="#00ff9d" stroke-width="2.5" />
        <line x1="${220 + p.camberOffset/2}" y1="40" x2="${220 + p.camberOffset/2}" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3" />
        <text x="${200 + p.camberOffset/2}" y="225" fill="#ffb700" font-family="monospace" font-size="10">VA (165 kts)</text>
        <line x1="${540 + p.sparOffset/2}" y1="40" x2="${540 + p.sparOffset/2}" y2="210" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3" />
        <text x="${520 + p.sparOffset/2}" y="225" fill="${c}" font-family="monospace" font-size="10">VC (${p.machNum})</text>
        <circle cx="380" cy="140" r="7" fill="#00f0ff" stroke="#ffffff" stroke-width="2" id="d4SortieCrosshair"/>
        <text x="400" y="135" fill="#00f0ff" font-family="monospace" font-size="11" font-weight="bold" id="d4SortieLabel">SORTIE TEST POINT (1.0G / 250 kts)</text>
      `;
    }

    return `
      <div class="technical-figure-wrapper">
        <div class="figure-telemetry-header">
          <span class="fig-badge">DIAGRAM 4 // EMPIRICAL PERFORMANCE & CERTIFIED ENVELOPE</span>
          <span class="fig-coords">SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}</span>
        </div>
        <div class="figure-svg-container">
          <svg viewBox="0 0 760 250" class="tech-schematic-svg" xmlns="http://www.w3.org/2000/svg">
            ${svg}
          </svg>
        </div>
        <div class="figure-caption">
          <strong>FIG 4.1:</strong> Empirical Operational Envelope for <em>${meta.title}</em> (Spec: <code>${p.specCode}</code>). Dynamic Pressure Limit: <strong>${p.pressureRatio}</strong>, Stress Limit: <strong>${p.stressMpa}</strong>.
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // DIAGRAM 5: SUBSYSTEM CROSS-LINK & FAILOVER ARCHITECTURE (Page 5)
  // ---------------------------------------------------------
  function renderDiagram5(meta) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);
    const p = getChapterDiagramParams(meta.num, 5);
    return `
      <div class="technical-figure-wrapper">
        <div class="figure-telemetry-header">
          <span class="fig-badge">DIAGRAM 5 // SUBSYSTEM CROSS-LINK & FAILOVER ARCHITECTURE</span>
          <span class="fig-coords">SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}</span>
        </div>
        <div class="figure-svg-container">
          <svg viewBox="0 0 760 250" class="tech-schematic-svg" xmlns="http://www.w3.org/2000/svg" id="svgDiagram5Root">
            ${getTechDefs(`d5-bus-${p.n}`, c)}
            <!-- Primary & Secondary High-Bandwidth Data Buses -->
            <line x1="60" y1="120" x2="700" y2="120" stroke="#00ff9d" stroke-width="4" id="d5PrimLaneLine"/>
            <line x1="60" y1="145" x2="700" y2="145" stroke="#ffb700" stroke-width="3" id="d5SecLaneLine"/>
            <text x="65" y="110" fill="#00ff9d" font-family="monospace" font-size="10" id="d5PrimLaneTxt">PRIMARY FLIGHT CONTROL BUS [LANE A: ONLINE - CH-${p.n}]</text>
            <text x="65" y="162" fill="#ffb700" font-family="monospace" font-size="10" id="d5SecLaneTxt">SECONDARY REDUNDANT BACKUP BUS [LANE B: HOT STANDBY - 5ms FAILOVER]</text>
            
            <!-- Subsystem Node 1: Flight Computing -->
            <rect x="80" y="25" width="160" height="65" rx="6" fill="rgba(0, 240, 255, 0.12)" stroke="${c}" stroke-width="2" id="d5NodeFcc"/>
            <text x="95" y="48" fill="${c}" font-family="monospace" font-size="11" font-weight="bold">FLIGHT CONTROL (FCC)</text>
            <text x="95" y="65" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">REYNOLDS: ${p.reynoldsNum}</text>
            <line x1="160" y1="90" x2="160" y2="120" stroke="${c}" stroke-width="2" stroke-dasharray="2,2" />
            
            <!-- Subsystem Node 2: Hydraulics / Power -->
            <rect x="290" y="25" width="180" height="65" rx="6" fill="rgba(0, 255, 157, 0.12)" stroke="#00ff9d" stroke-width="2" id="d5NodeHyd"/>
            <text x="305" y="48" fill="#00ff9d" font-family="monospace" font-size="11" font-weight="bold">HYDRAULICS & ACTUATION</text>
            <text x="305" y="65" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">PRESSURE: 3000 PSI</text>
            <line x1="380" y1="90" x2="380" y2="120" stroke="#00ff9d" stroke-width="2" stroke-dasharray="2,2" />
            
            <!-- Subsystem Node 3: Propulsion & Sensors -->
            <rect x="520" y="25" width="160" height="65" rx="6" fill="rgba(255, 183, 0, 0.12)" stroke="#ffb700" stroke-width="2" id="d5NodeProp"/>
            <text x="535" y="48" fill="#ffb700" font-family="monospace" font-size="11" font-weight="bold">PROPULSION FADEC</text>
            <text x="535" y="65" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">FLOW: ${p.airflowCfs}</text>
            <line x1="600" y1="90" x2="600" y2="120" stroke="#ffb700" stroke-width="2" stroke-dasharray="2,2" />

            <!-- Active Failover Pulse Marker -->
            <circle cx="380" cy="120" r="6" fill="#00ff9d" id="d5FailoverBeacon"/>
            <text x="240" y="225" fill="${c}" font-family="monospace" font-size="10">TRIPLEX VOTING ACTIVE &bull; AUTOMATIC 5ms BUS ARBITRATION CERTIFIED</text>
          </svg>
        </div>
        <div class="figure-caption">
          <strong>FIG 5.1:</strong> Multi-Disciplinary Systems Topology for <em>${meta.title}</em> (Spec: <code>${p.specCode}</code>). Subsystem Interface: <strong>${p.dinCode}</strong>.
        </div>
      </div>
    `;
  }
'''

if __name__ == '__main__':
    print("Diagrams module template ready.")
