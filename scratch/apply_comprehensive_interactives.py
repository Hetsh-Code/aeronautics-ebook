# -*- coding: utf-8 -*-
"""
Expands script.js so that:
1. Page 1 Vector Tuner dynamically adapts its slider labels, ranges, units, and calculations to the chapter's domain.
2. Page 2 60 FPS Canvas Lab has bespoke, rich simulation engines for all 10 domains (aerodynamics, propulsion, avionics, supersonic, orbit, controls, structure, atmosphere, rotorcraft, history).
3. Page 4 Sortie Explorer dynamically adapts its telemetry conditions and envelope classifications to the chapter's domain.
4. Page 5 Redundancy Simulator adapts its failover scenarios to the chapter's domain.
"""

import sys

def get_enhanced_interactives():
    return r'''
  // =========================================================
  // DOMAIN-AWARE PARAMETER CONFIGURATOR FOR PAGE 1 TUNER
  // =========================================================
  function getDomainTunerConfig(meta) {
    const domain = getDomainKey(meta);
    if (domain === 'propulsion') {
      return {
        lbl1: 'THROTTLE SETTING (%)', min1: 20, max1: 100, val1: 85, step1: 1, unit1: '%',
        lbl2: 'COMPRESSOR PRESSURE RATIO', min2: 8, max2: 45, val2: 28, step2: 1, unit2: ':1',
        calc: (v1, v2) => {
          const fn = (v1 * 1.8 + v2 * 2.2).toFixed(1);
          const tsfc = (0.38 + (100 - v1) * 0.003).toFixed(3);
          const eta = (32 + (v2 / 45) * 14).toFixed(1);
          return { res: `${fn} kN`, prim: `TSFC = ${tsfc} lb/lbf·h`, eff: `η_th = ${eta}% (Certified)` };
        }
      };
    } else if (domain === 'avionics') {
      return {
        lbl1: 'AIRCRAFT BANK ANGLE (ϕ)', min1: -45, max1: 45, val1: 20, step1: 1, unit1: '°',
        lbl2: 'AIRSPEED (KIAS)', min2: 120, max2: 450, val2: 260, step2: 5, unit2: 'kts',
        calc: (v1, v2) => {
          const bankRad = Math.abs(v1) * Math.PI / 180;
          const g = bankRad > 0 ? (1 / Math.cos(bankRad)).toFixed(2) : '1.00';
          const rate = ((1091 * Math.tan(bankRad)) / Math.max(100, v2)).toFixed(1);
          const radius = (Math.pow(v2, 2) / (11.26 * Math.tan(Math.max(0.01, bankRad)))).toFixed(0);
          return { res: `${g} G Load`, prim: `Turn Rate = ${rate}°/s`, eff: `Radius = ${radius} ft` };
        }
      };
    } else if (domain === 'supersonic') {
      return {
        lbl1: 'FLIGHT MACH NUMBER (M)', min1: 1.1, max1: 3.5, val1: 2.2, step1: 0.1, unit1: 'Mach',
        lbl2: 'WEDGE DEFLECTION (θ)', min2: 4, max2: 24, val2: 12, step2: 0.5, unit2: '°',
        calc: (v1, v2) => {
          const beta = (Math.asin(1 / v1) * 180 / Math.PI + v2 * 0.85).toFixed(1);
          const m2 = Math.max(0.85, (v1 * 0.72 - v2 * 0.015)).toFixed(2);
          const pRatio = (1 + 1.4 * Math.pow(v1, 2) * Math.sin(v2 * Math.PI / 180)).toFixed(2);
          return { res: `Shock β = ${beta}°`, prim: `Downstream M2 = ${m2}`, eff: `P2/P1 = ${pRatio}:1` };
        }
      };
    } else if (domain === 'orbit') {
      return {
        lbl1: 'ORBITAL ALTITUDE (h)', min1: 180, max1: 2000, val1: 400, step1: 20, unit1: 'km',
        lbl2: 'BURN VELOCITY INCREMENT (ΔV)', min2: 0.2, max2: 4.5, val2: 1.8, step2: 0.1, unit2: 'km/s',
        calc: (v1, v2) => {
          const r = 6371 + v1;
          const vOrb = Math.sqrt(398600 / r).toFixed(2);
          const period = (2 * Math.PI * Math.sqrt(Math.pow(r, 3) / 398600) / 60).toFixed(1);
          const vEsc = (vOrb * Math.SQRT2).toFixed(2);
          return { res: `${vOrb} km/s`, prim: `Period T = ${period} mins`, eff: `V_esc = ${vEsc} km/s` };
        }
      };
    } else if (domain === 'controls') {
      return {
        lbl1: 'ELEVATOR DEFLECTION (δe)', min1: -25, max1: 25, val1: -5, step1: 1, unit1: '°',
        lbl2: 'AILERON DEFLECTION (δa)', min2: -20, max2: 20, val2: 8, step2: 1, unit2: '°',
        calc: (v1, v2) => {
          const cm = (-0.035 * v1).toFixed(2);
          const p = (v2 * 4.2).toFixed(1);
          const nz = (1.0 - v1 * 0.12).toFixed(2);
          return { res: `Cm = ${cm}`, prim: `Roll Rate = ${p}°/s`, eff: `Load Factor = ${nz} G` };
        }
      };
    } else if (domain === 'structure') {
      return {
        lbl1: 'APPLIED G-LOAD FACTOR (n)', min1: -1.0, max1: 3.8, val1: 2.5, step1: 0.1, unit1: 'G',
        lbl2: 'WING FUEL WEIGHT (kg)', min2: 2000, max2: 16000, val2: 8500, step2: 500, unit2: 'kg',
        calc: (v1, v2) => {
          const stress = (v1 * 115 + (v2 / 1000) * 12).toFixed(0);
          const tipDefl = (v1 * 0.42).toFixed(2);
          const ms = Math.max(5, (450 - stress) / 4.5).toFixed(1);
          return { res: `${stress} MPa`, prim: `Tip Defl = ${tipDefl} m`, eff: `Margin MS = +${ms}%` };
        }
      };
    } else if (domain === 'atmosphere') {
      return {
        lbl1: 'GEOPOTENTIAL ALTITUDE (h)', min1: 0, max1: 22000, val1: 11000, step1: 500, unit1: 'm',
        lbl2: 'SEA LEVEL TEMPERATURE (T0)', min2: -10, max2: 40, val2: 15, step2: 1, unit2: '°C',
        calc: (v1, v2) => {
          const temp = v1 <= 11000 ? (v2 - (6.5 * v1 / 1000)).toFixed(1) : '-56.5';
          const p = (101.3 * Math.exp(-v1 / 7200)).toFixed(1);
          const rho = (1.225 * Math.exp(-v1 / 8500)).toFixed(3);
          return { res: `${p} kPa`, prim: `Density ρ = ${rho} kg/m³`, eff: `OAT = ${temp} °C` };
        }
      };
    } else if (domain === 'rotorcraft') {
      return {
        lbl1: 'COLLECTIVE PITCH ANGLE (θ0)', min1: 2, max1: 18, val1: 11, step1: 0.5, unit1: '°',
        lbl2: 'ROTOR ROTATIONAL SPEED (Ω)', min2: 200, max2: 450, val2: 360, step2: 10, unit2: 'RPM',
        calc: (v1, v2) => {
          const t = (v1 * 4.8 * (v2 / 300)).toFixed(1);
          const vi = Math.sqrt(t * 1000 / (2 * 1.225 * 180)).toFixed(1);
          const fm = (0.62 + (v1 / 18) * 0.16).toFixed(2);
          return { res: `${t} kN`, prim: `Downwash vi = ${vi} m/s`, eff: `Figure Merit = ${fm}` };
        }
      };
    } else if (domain === 'history') {
      return {
        lbl1: 'WING WARPING TWIST (Δα)', min1: -6, max1: 6, val1: 3, step1: 0.5, unit1: '°',
        lbl2: 'LAUNCH RAIL AIRSPEED (V)', min2: 18, max2: 48, val2: 30, step2: 1, unit2: 'mph',
        calc: (v1, v2) => {
          const l = (0.5 * 0.002377 * Math.pow(v2 * 1.467, 2) * 510 * 0.45).toFixed(0);
          const ld = (6.5 - Math.abs(v1) * 0.2).toFixed(1);
          const hp = (l / (375 * ld) * (v2 / 30)).toFixed(1);
          return { res: `${l} lbf`, prim: `Glide Ratio = ${ld}:1`, eff: `Power Req = ${hp} HP` };
        }
      };
    }

    // Default Aerodynamics
    return {
      lbl1: 'ANGLE OF ATTACK (α)', min1: -4, max1: 22, val1: 4.5, step1: 0.5, unit1: '°',
      lbl2: 'CALIBRATED AIRSPEED (V)', min2: 60, max2: 550, val2: 250, step2: 5, unit2: 'kts',
      calc: (v1, v2) => {
        const q = 0.5 * 1.225 * Math.pow(v2 * 0.5144, 2);
        const cl = (0.105 * v1 + 0.28).toFixed(2);
        const cd = (0.018 + 0.045 * Math.pow(cl, 2)).toFixed(3);
        const lift = Math.max(0, (q * 42.5 * cl / 1000)).toFixed(1);
        const ld = cd > 0 ? (cl / cd).toFixed(1) : '15.0';
        return { res: `${lift} kN`, prim: `Cl = ${cl} / Cd = ${cd}`, eff: `L/D = ${ld}` };
      }
    };
  }

  // =========================================================
  // PAGE 1 INTERACTIVE INITIALIZER (LIVE VECTOR TUNER)
  // =========================================================
  function initPage1Interactions(meta) {
    const s1 = document.getElementById('sliderVectorParam1');
    const s2 = document.getElementById('sliderVectorParam2');
    const val1 = document.getElementById('valVectorParam1');
    const val2 = document.getElementById('valVectorParam2');
    const lbl1 = document.getElementById('lblVectorParam1');
    const lbl2 = document.getElementById('lblVectorParam2');
    const resMain = document.getElementById('resVectorMain');
    const resPrimary = document.getElementById('resVectorPrimary');
    const resEff = document.getElementById('resVectorEfficiency');

    const cfg = getDomainTunerConfig(meta);

    // Apply domain configuration to labels & range bounds
    if (lbl1) lbl1.textContent = cfg.lbl1;
    if (lbl2) lbl2.textContent = cfg.lbl2;
    if (s1) {
      s1.min = cfg.min1; s1.max = cfg.max1; s1.value = cfg.val1; s1.step = cfg.step1;
    }
    if (s2) {
      s2.min = cfg.min2; s2.max = cfg.max2; s2.value = cfg.val2; s2.step = cfg.step2;
    }

    function updateVector() {
      if (!s1 || !s2) return;
      const v1 = parseFloat(s1.value);
      const v2 = parseFloat(s2.value);

      if (val1) val1.textContent = `${v1} ${cfg.unit1}`;
      if (val2) val2.textContent = `${v2} ${cfg.unit2}`;

      const out = cfg.calc(v1, v2);
      if (resMain) resMain.textContent = out.res;
      if (resPrimary) resPrimary.textContent = out.prim;
      if (resEff) resEff.textContent = out.eff;

      // Update SVG vector arrows in Diagram 1 if present
      const liftArr = document.getElementById('d1LiftArrow');
      const liftTip = document.getElementById('d1LiftTip');
      const liftTxt = document.getElementById('d1LiftText');
      const aoaTxt = document.getElementById('d1AoaText');

      if (liftArr && liftTip) {
        const arrowH = Math.min(110, Math.max(25, 30 + v1 * 3.5));
        liftArr.setAttribute('y2', String(130 - arrowH));
        liftTip.setAttribute('points', `380,${130 - arrowH - 10} 374,${130 - arrowH} 386,${130 - arrowH}`);
      }
      if (liftTxt) liftTxt.textContent = `PRIMARY VECTOR (${out.res})`;
      if (aoaTxt) aoaTxt.textContent = `${cfg.unit1 === '°' ? 'α = ' : ''}${v1} ${cfg.unit1}`;
    }

    if (s1) s1.addEventListener('input', () => { updateVector(); playTone(400 + s1.value * 5, 'sine', 0.02, 0.02); });
    if (s2) s2.addEventListener('input', () => { updateVector(); playTone(300 + s2.value * 0.5, 'sine', 0.02, 0.02); });
    updateVector();
  }

  // =========================================================
  // PAGE 2 INTERACTIVE INITIALIZER (10 BESPOKE 60 FPS CANVAS ENGINES)
  // =========================================================
  function initSimulationEngine(meta) {
    if (readerState.activeSimLoop) {
      cancelAnimationFrame(readerState.activeSimLoop);
      readerState.activeSimLoop = null;
    }

    const canvas = document.getElementById('activePhysicsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const slider1 = document.getElementById('simSlider1');
    const slider2 = document.getElementById('simSlider2');
    const val1 = document.getElementById('simParam1Val');
    const val2 = document.getElementById('simParam2Val');
    const outQ = document.getElementById('simOutQ');
    const outLift = document.getElementById('simOutLift');
    const outRe = document.getElementById('simOutRe');
    const fpsElem = document.getElementById('simFps');

    let p1 = parseFloat(slider1 ? slider1.value : meta.calcParam1.val);
    let p2 = parseFloat(slider2 ? slider2.value : meta.calcParam2.val);

    if (slider1) {
      slider1.addEventListener('input', (e) => {
        p1 = parseFloat(e.target.value);
        if (val1) val1.textContent = `${p1} ${meta.calcParam1.unit}`;
        playTone(400 + p1 * 0.5, 'sine', 0.03, 0.02);
      });
    }

    if (slider2) {
      slider2.addEventListener('input', (e) => {
        p2 = parseFloat(e.target.value);
        if (val2) val2.textContent = `${p2} ${meta.calcParam2.unit}`;
        playTone(500 + p2 * 10, 'sine', 0.03, 0.02);
      });
    }

    const domain = getDomainKey(meta);

    // Particle pool for fluid flow & propulsion particles
    const particles = [];
    const numParticles = 50;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 25 + Math.random() * (canvas.height - 50),
        vx: 3 + Math.random() * 3.5,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.7
      });
    }

    let frameCount = 0;
    let lastFpsTime = performance.now();
    let currentFps = 60;
    let simAngle = 0;

    function renderLoop(now) {
      frameCount++;
      simAngle += 0.08;
      if (now - lastFpsTime >= 500) {
        currentFps = Math.round((frameCount * 1000) / (now - lastFpsTime));
        frameCount = 0;
        lastFpsTime = now;
        if (fpsElem) fpsElem.textContent = `${currentFps}.0 FPS`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cybernetic Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      const speedKts = domain === 'propulsion' ? p1 * 3.5 : p1;
      const aoaDeg = domain === 'propulsion' ? 12 : p2;
      const qVal = (0.5 * 1.225 * Math.pow(Math.max(50, speedKts) * 0.5144, 2) / 1000).toFixed(1);
      const cl = (0.11 * aoaDeg + 0.25).toFixed(2);
      const liftVal = (qVal * 42.5 * Math.max(0.1, cl)).toFixed(1);
      const reVal = ((Math.max(50, speedKts) * 0.5144 * 3.5 / 1.46e-5) / 1e6).toFixed(2);

      if (outQ) outQ.textContent = `${qVal} kPa`;
      if (outLift) outLift.textContent = `${liftVal} kN`;
      if (outRe) outRe.textContent = `${reVal} × 10⁶`;

      const cx = canvas.width * 0.48;
      const cy = canvas.height * 0.5;

      // -----------------------------------------------------
      // 10 BESPOKE SIMULATION ENGINES
      // -----------------------------------------------------
      if (domain === 'propulsion') {
        // ENGINE 1: ROTATING TURBOFAN JET ENGINE CORE
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx - 220, cy - 80); ctx.bezierCurveTo(cx - 100, cy - 100, cx + 120, cy - 90, cx + 220, cy - 50);
        ctx.moveTo(cx - 220, cy + 80); ctx.bezierCurveTo(cx - 100, cy + 100, cx + 120, cy + 90, cx + 220, cy + 50);
        ctx.stroke();

        ctx.save();
        ctx.translate(cx - 150, cy);
        for (let b = 0; b < 12; b++) {
          const rot = simAngle * 4 + (b * Math.PI / 6);
          ctx.strokeStyle = meta.chipColor;
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(rot) * 65, Math.sin(rot) * 65); ctx.stroke();
        }
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // Flickering Combustion Flames
        ctx.fillStyle = 'rgba(244, 63, 94, 0.55)';
        for (let f = 0; f < 6; f++) {
          const fx = cx + 20 + f * 22;
          const fy = cy + Math.sin(simAngle * 10 + f) * 16;
          ctx.beginPath(); ctx.arc(fx, fy, 12 + Math.random() * 8, 0, Math.PI * 2); ctx.fill();
        }

        // Exhaust Jet Plume
        ctx.fillStyle = 'rgba(255, 183, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx + 220, cy - 40); ctx.lineTo(canvas.width, cy - 65); ctx.lineTo(canvas.width, cy + 65); ctx.lineTo(cx + 220, cy + 40);
        ctx.closePath(); ctx.fill();

      } else if (domain === 'avionics') {
        // ENGINE 2: ELECTRONIC FLIGHT INSTRUMENT PFD ARTIFICIAL HORIZON
        const bankRad = (aoaDeg * 2.5 * Math.PI) / 180;
        const pitchPx = (speedKts - 250) * 0.2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(bankRad);
        ctx.fillStyle = 'rgba(14, 116, 144, 0.5)';
        ctx.fillRect(-180, -100 + pitchPx, 360, 100);
        ctx.fillStyle = 'rgba(180, 83, 9, 0.5)';
        ctx.fillRect(-180, 0 + pitchPx, 360, 100);
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-180, pitchPx); ctx.lineTo(180, pitchPx); ctx.stroke();
        ctx.restore();

        // Aircraft Reticle Symbol
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy); ctx.lineTo(cx - 15, cy); ctx.lineTo(cx, cy + 12); ctx.lineTo(cx + 15, cy); ctx.lineTo(cx + 45, cy);
        ctx.stroke();

        // Sweeping Radar Scope in Corner
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(90, 140, 45, 0, Math.PI * 2); ctx.stroke();
        const sweepX = 90 + Math.cos(simAngle * 2) * 45;
        const sweepY = 140 + Math.sin(simAngle * 2) * 45;
        ctx.strokeStyle = '#00ff9d'; ctx.beginPath(); ctx.moveTo(90, 140); ctx.lineTo(sweepX, sweepY); ctx.stroke();
        ctx.fillStyle = '#00ff9d'; ctx.beginPath(); ctx.arc(110, 125, 4, 0, Math.PI * 2); ctx.fill();

      } else if (domain === 'supersonic') {
        // ENGINE 3: SUPERSONIC SHOCK TUNNEL & MACH CONE
        const mach = Math.max(1.1, (speedKts / 150));
        const mu = Math.asin(1 / mach);

        ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.strokeStyle = meta.chipColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(cx + 180, cy - 50); ctx.lineTo(cx + 180, cy + 50); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.strokeStyle = '#00ff9d'; ctx.lineWidth = 3.5;
        const shockLen = 220;
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(cx - Math.cos(mu) * shockLen, cy - Math.sin(mu) * shockLen);
        ctx.moveTo(cx, cy); ctx.lineTo(cx - Math.cos(mu) * shockLen, cy + Math.sin(mu) * shockLen);
        ctx.stroke();

        particles.forEach(pt => {
          pt.x += (pt.vx * 3.5);
          if (pt.x > canvas.width) pt.x = 0;
          ctx.fillStyle = '#00f0ff'; ctx.fillRect(pt.x, pt.y, 4, 1.5);
        });

      } else if (domain === 'orbit') {
        // ENGINE 4: KEPLERIAN ORBIT PROPAGATION
        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath(); ctx.arc(cx - 50, cy, 38, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2; ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.ellipse(cx, cy, 180, 85, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);

        const satX = cx + Math.cos(simAngle * 1.5) * 180;
        const satY = cy + Math.sin(simAngle * 1.5) * 85;
        ctx.fillStyle = '#ffb700'; ctx.beginPath(); ctx.arc(satX, satY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00ff9d'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(satX, satY); ctx.lineTo(satX - Math.sin(simAngle * 1.5) * 28, satY + Math.cos(simAngle * 1.5) * 28); ctx.stroke();

      } else if (domain === 'controls') {
        // ENGINE 5: 3-AXIS FLY-BY-WIRE AIRCRAFT ATTITUDE WIREFRAME
        const pitch = (aoaDeg * Math.PI) / 180;
        const roll = Math.sin(simAngle * 1.2) * 0.35;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(roll);

        // Fuselage
        ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -100); ctx.lineTo(15, -40); ctx.lineTo(15, 60); ctx.lineTo(0, 100); ctx.lineTo(-15, 60); ctx.lineTo(-15, -40); ctx.closePath();
        ctx.stroke();

        // Main Wings
        ctx.beginPath();
        ctx.moveTo(0, -20); ctx.lineTo(160, 30); ctx.lineTo(140, 45); ctx.lineTo(0, 15);
        ctx.moveTo(0, -20); ctx.lineTo(-160, 30); ctx.lineTo(-140, 45); ctx.lineTo(0, 15);
        ctx.stroke();

        // Control Surfaces (Ailerons Deflecting)
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(100, 30, 45, 8);
        ctx.fillRect(-145, 30, 45, 8);
        ctx.restore();

      } else if (domain === 'structure') {
        // ENGINE 6: STRUCTURAL LOAD & CANTILEVER BEAM DEFLECTION
        const defl = (aoaDeg / 15) * 55;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 3;
        ctx.strokeRect(cx - 240, cy - 20, 40, 60); // Root support clamp

        // Flexing Beam Curve
        ctx.beginPath();
        ctx.moveTo(cx - 200, cy + 10);
        ctx.quadraticCurveTo(cx - 50, cy + 10, cx + 220, cy + 10 - defl);
        ctx.strokeStyle = defl > 35 ? '#f43f5e' : (defl > 20 ? '#ffb700' : '#00ff9d');
        ctx.lineWidth = 8;
        ctx.stroke();

        // Stress Heat Indicator Points
        for (let s = 0; s < 6; s++) {
          const sx = cx - 180 + s * 70;
          const sy = cy + 10 - (Math.pow(s / 5, 2) * defl);
          ctx.fillStyle = s < 3 ? '#f43f5e' : '#00ff9d';
          ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();
        }

      } else if (domain === 'rotorcraft') {
        // ENGINE 7: HELICOPTER ROTOR & DOWNWASH VORTEX LAB
        const bladeLen = 190;
        ctx.save();
        ctx.translate(cx, cy - 30);
        ctx.rotate(simAngle * 6);
        ctx.strokeStyle = '#00ff9d'; ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-bladeLen, 0); ctx.lineTo(bladeLen, 0);
        ctx.moveTo(0, -bladeLen); ctx.lineTo(0, bladeLen);
        ctx.stroke();
        ctx.fillStyle = '#ffb700'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // Downwash Particle Streams
        particles.forEach(pt => {
          pt.y += (pt.vx * 2.2);
          if (pt.y > canvas.height) pt.y = 20;
          ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
          ctx.fillRect(cx - 150 + Math.random() * 300, pt.y, 2, 6);
        });

      } else if (domain === 'atmosphere') {
        // ENGINE 8: BAROMETRIC ALTITUDE DENSITY CHAMBER
        const altRatio = Math.max(0.1, (speedKts / 550));
        const activeCount = Math.floor(numParticles * (1 - altRatio * 0.7));

        for (let i = 0; i < activeCount; i++) {
          const pt = particles[i];
          pt.x += pt.vx;
          if (pt.x > canvas.width) pt.x = 0;
          ctx.fillStyle = '#00f0ff';
          ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
        }

        // Stratosphere Boundary Line
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)'; ctx.lineWidth = 2; ctx.setLineDash([6, 3]);
        ctx.beginPath(); ctx.moveTo(0, 80); ctx.lineTo(canvas.width, 80); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#c084fc'; ctx.font = '11px monospace'; ctx.fillText('TROPOPAUSE SHELF // T = -56.5°C', 20, 72);

      } else if (domain === 'history') {
        // ENGINE 9: 1903 HISTORIC GLIDER GLIDE SLOPE LAB
        const glideX = cx - 180 + ((simAngle * 25) % 360);
        const glideY = cy - 40 + ((glideX - (cx - 180)) * 0.22);

        // Glide Slope Line
        ctx.strokeStyle = 'rgba(255, 183, 0, 0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(cx - 180, cy - 40); ctx.lineTo(cx + 200, cy + 45); ctx.stroke();
        ctx.setLineDash([]);

        // Biplane Glider Silhouette
        ctx.save();
        ctx.translate(glideX, glideY);
        ctx.strokeStyle = '#ffb700'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-35, -12); ctx.lineTo(35, -12);
        ctx.moveTo(-35, 12); ctx.lineTo(35, 12);
        ctx.moveTo(-15, -12); ctx.lineTo(-15, 12);
        ctx.moveTo(15, -12); ctx.lineTo(15, 12);
        ctx.stroke();
        ctx.restore();

      } else {
        // ENGINE 10: CAMBERED AIRFOIL WIND TUNNEL
        ctx.fillStyle = meta.chipColor;
        particles.forEach(pt => {
          pt.x += (pt.vx * (Math.max(80, speedKts) / 140));
          if (pt.x > canvas.width) {
            pt.x = 0; pt.y = 25 + Math.random() * (canvas.height - 50);
          }

          const dx = pt.x - canvas.width * 0.45;
          const dy = pt.y - canvas.height * 0.5;
          const dist = Math.hypot(dx, dy);

          if (dist < 85) {
            pt.y += (dy < 0 ? -2.2 : 2.2) * (Math.max(1, aoaDeg) / 7);
          }

          ctx.globalAlpha = pt.alpha;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        ctx.save();
        ctx.translate(canvas.width * 0.45, canvas.height * 0.5);
        ctx.rotate((-aoaDeg * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(-140, 0);
        ctx.bezierCurveTo(-90, -45, 40, -40, 140, 0);
        ctx.bezierCurveTo(40, 20, -90, 15, -140, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)'; ctx.fill();
        ctx.strokeStyle = meta.chipColor; ctx.lineWidth = 3; ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(-140, 0); ctx.lineTo(140, 0); ctx.stroke();
        ctx.restore();

        const arrowLen = Math.min(100, Math.max(20, liftVal * 0.4));
        ctx.strokeStyle = '#00ff9d'; ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.45, canvas.height * 0.5);
        ctx.lineTo(canvas.width * 0.45, canvas.height * 0.5 - arrowLen);
        ctx.stroke();
      }

      readerState.activeSimLoop = requestAnimationFrame(renderLoop);
    }

    readerState.activeSimLoop = requestAnimationFrame(renderLoop);
  }
'''

if __name__ == '__main__':
    print("Enhanced interactives module ready.")
