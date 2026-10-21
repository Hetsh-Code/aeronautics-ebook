# -*- coding: utf-8 -*-
"""
Module containing generatePageContent and all 6 page interactive initializers.
"""

def get_interactives_js():
    return r'''
  // =========================================================
  // PAGE CONTENT GENERATION (DISTINCT DIAGRAMS & INTERACTIVES ON ALL PAGES)
  // =========================================================
  function generatePageContent(meta, pageNum) {
    const c = meta.chipColor || '#00f0ff';
    const domain = getDomainKey(meta);

    // -------------------------------------------------------
    // PAGE 1: PHYSICAL PRINCIPLES & LIVE VECTOR TUNER
    // -------------------------------------------------------
    if (pageNum === 1) {
      return `
        <div class="page-content-flow">
          <div class="section-block">
            <h3 class="section-title"><span class="sec-index">1.1</span> ${meta.title}: Theoretical Foundation & Technical Scope</h3>
            ${meta.overviewHtml || `
              <p class="section-p">
                Welcome to <strong>Chapter ${meta.num}: ${meta.title}</strong>, a core constituent of <em>${meta.part}</em>. In this chapter, we investigate the governing physical mechanisms, fluid dynamic constraints, and operational methodologies enabling certified flight performance.
              </p>
            `}
          </div>

          <!-- DIAGRAM 1: Theoretical Schematic -->
          ${renderDiagram1(meta)}

          <!-- INTERACTIVE FEATURE 1: Live Theoretical Parameter & Vector Tuner -->
          <div class="interactive-vector-tuner-card" id="vectorTunerCard">
            <div class="tuner-header">
              <div class="tuner-title">
                <span>⚡</span>
                <span>THEORETICAL PARAMETER & VECTOR INTERACTIVE TUNER</span>
              </div>
              <span class="tuner-badge">LIVE VECTOR SIMULATION</span>
            </div>
            <div class="calc-grid">
              <div class="calc-control-group">
                <div class="calc-label-row">
                  <span id="lblVectorParam1">OPERATING VECTOR ANGLE (α / θ)</span>
                  <strong id="valVectorParam1">4.5°</strong>
                </div>
                <input type="range" class="hud-range-slider" id="sliderVectorParam1" min="-4" max="22" value="4.5" step="0.5" />
              </div>
              <div class="calc-control-group">
                <div class="calc-label-row">
                  <span id="lblVectorParam2">MAGNITUDE / VELOCITY (V / P0)</span>
                  <strong id="valVectorParam2">250 kts</strong>
                </div>
                <input type="range" class="hud-range-slider" id="sliderVectorParam2" min="60" max="550" value="250" step="5" />
              </div>
            </div>
            <div class="calc-results-panel">
              <div class="cr-cell">
                <span class="cr-label">RESULTANT FORCE (R)</span>
                <span class="cr-val text-cyan" id="resVectorMain">142.5 kN</span>
              </div>
              <div class="cr-cell">
                <span class="cr-label">PRIMARY COMPONENT</span>
                <span class="cr-val text-green" id="resVectorPrimary">138.2 kN (Lift / Thrust)</span>
              </div>
              <div class="cr-cell">
                <span class="cr-label">EFFICIENCY METRIC</span>
                <span class="cr-val" id="resVectorEfficiency">L/D = 16.4</span>
              </div>
            </div>
          </div>

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">1.2</span> Governing Mathematical Equations</h3>
            <div class="equation-showcase-box">
              <div class="eq-header">${meta.formulaTitle || `GOVERNING AERONAUTICAL RELATIONS // CH ${meta.num}`}</div>
              <div class="eq-math-display">${meta.formulaHtml}</div>
              <div class="eq-explanation">${meta.formulaDesc}</div>
            </div>
          </div>

          <!-- Archival Plate FIG 1.0 -->
          <div class="technical-figure-wrapper mt-4">
            <div class="figure-telemetry-header">
              <span class="fig-badge">ARCHIVAL TECHNICAL PLATE // FIG 1.0</span>
              <span class="fig-coords">HIGH-RES DIGITAL AEROSPACE ARCHIVE</span>
            </div>
            <div class="figure-image-frame">
              <img src="${meta.assetImg}" alt="${meta.title}" class="technical-plate-img" loading="eager" />
              <div class="plate-glass-tag">${meta.discipline}</div>
            </div>
            <div class="figure-caption">
              <strong>FIG 1.0:</strong> Certified aerospace operational reference photography for <em>${meta.title}</em>. High-fidelity structural and fluid interaction captured during flight testing certification.
            </div>
          </div>

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">1.3</span> Key Engineering Takeaways</h3>
            <ul class="takeaway-bullet-list">
              ${(meta.takeaways && meta.takeaways.length ? meta.takeaways : [
                'System Optimization: Engineering geometry must continuously balance aerodynamic efficiency with structural weight.',
                'Boundary Interactions: Viscous shear effects concentrated within the boundary layer dictate skin-friction drag and separation.',
                'Certification Compliance: Structural and aerodynamic design must satisfy FAR/CS Part 25 airworthiness regulations.'
              ]).map(t => {
                const parts = t.split(':');
                if (parts.length > 1) {
                  return `<li><strong>${parts[0]}:</strong>${parts.slice(1).join(':')}</li>`;
                }
                return `<li>${t}</li>`;
              }).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------
    // PAGE 2: 60 FPS CANVAS PHYSICS SIMULATOR & SENSOR ARCHITECTURE
    // -------------------------------------------------------
    if (pageNum === 2) {
      return `
        <div class="page-content-flow">
          <div class="section-block">
            <h3 class="section-title"><span class="sec-index">2.1</span> Real-Time Flight Physics Simulation Laboratory</h3>
            <p class="section-p">
              ${meta.simDescription || `Manipulate the real-time simulation controls below to observe dynamic physical responses in <strong>${meta.title}</strong>. The 60 FPS HTML5 simulation engine computes physical streamline trajectories and state variables continuously.`}
            </p>
          </div>

          <!-- INTERACTIVE FEATURE 2: 60 FPS Canvas Physics Simulator -->
          <div class="simulator-card-wrapper" id="simCardWrapper">
            <div class="sim-card-header">
              <div class="sim-title-group">
                <span class="sim-pulse-dot"></span>
                <span class="sim-header-title">AERO-LAB 60 FPS SIMULATOR // ${meta.simType.toUpperCase()} ENGINE</span>
              </div>
              <div class="sim-badge-tag">${meta.discipline}</div>
            </div>

            <div class="sim-canvas-viewport">
              <canvas id="activePhysicsCanvas" width="760" height="280" class="sim-html5-canvas"></canvas>
            </div>

            <!-- Interactive Range Sliders -->
            <div class="sim-control-panel">
              <div class="sim-slider-row">
                <div class="sim-label-col">
                  <span class="slider-name">${meta.calcParam1.label}</span>
                  <span class="slider-readout" id="simParam1Val">${meta.calcParam1.val} ${meta.calcParam1.unit}</span>
                </div>
                <input type="range" class="hud-range-slider" id="simSlider1" 
                  min="${meta.calcParam1.min}" max="${meta.calcParam1.max}" value="${meta.calcParam1.val}" 
                  step="${meta.calcParam1.step || 1}" />
              </div>

              <div class="sim-slider-row">
                <div class="sim-label-col">
                  <span class="slider-name">${meta.calcParam2.label}</span>
                  <span class="slider-readout" id="simParam2Val">${meta.calcParam2.val} ${meta.calcParam2.unit}</span>
                </div>
                <input type="range" class="hud-range-slider" id="simSlider2" 
                  min="${meta.calcParam2.min}" max="${meta.calcParam2.max}" value="${meta.calcParam2.val}" 
                  step="${meta.calcParam2.step || 1}" />
              </div>
            </div>

            <!-- Real-Time Telemetry Bar -->
            <div class="sim-telemetry-strip">
              <div class="t-cell">
                <span class="t-lbl">DYNAMIC PRESSURE (q)</span>
                <span class="t-val" id="simOutQ">24.5 kPa</span>
              </div>
              <div class="t-cell">
                <span class="t-lbl">LIFT / FORCE (L)</span>
                <span class="t-val text-green" id="simOutLift">142.8 kN</span>
              </div>
              <div class="t-cell">
                <span class="t-lbl">FLOW REYNOLDS (Re)</span>
                <span class="t-val" id="simOutRe">6.85 × 10⁶</span>
              </div>
              <div class="t-cell">
                <span class="t-lbl">SIMULATION FPS</span>
                <span class="t-val text-cyan" id="simFps">60.0 FPS</span>
              </div>
            </div>
          </div>

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">2.2</span> Sensor & Flow Distribution Architecture</h3>
            <p class="section-p">
              ${meta.flowDescription || `Accurate validation of theoretical airflow requires distributed high-frequency pressure transducers, flush boundary layer taps, and pitot-static instrumentation connected via high-bandwidth digital data buses.`}
            </p>
          </div>

          <!-- DIAGRAM 2: Sensor & Boundary Flow Architecture -->
          ${renderDiagram2(meta)}
        </div>
      `;
    }

    // -------------------------------------------------------
    // PAGE 3: CAD BLUEPRINT HOTSPOT INSPECTOR & LIVE CALCULATOR
    // -------------------------------------------------------
    if (pageNum === 3) {
      return `
        <div class="page-content-flow">
          <div class="section-block">
            <h3 class="section-title"><span class="sec-index">3.1</span> CAD Structural Anatomy & Component Hotspots</h3>
            <p class="section-p">
              ${meta.hotspotDescription || `Click any of the <strong>5 numbered inspection pins</strong> on the interactive blueprint below to query metallurgical specifications, localized stress concentrations, and inspection limits for <strong>${meta.title}</strong>.`}
            </p>
          </div>

          <!-- INTERACTIVE FEATURE 3A: CAD Hotspot Inspector (FIG 3.1) -->
          ${renderDiagram3(meta)}

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">3.2</span> Live Engineering Parameter Calculator</h3>
            <p class="section-p">
              ${meta.calcDesc || `Use the interactive engineering calculator below to compute quantitative flight parameters for <strong>${meta.title}</strong> based on current operational inputs.`}
            </p>

            <!-- INTERACTIVE FEATURE 3B: Live Engineering Parameter Calculator -->
            <div class="interactive-calculator-card">
              <div class="calc-header">
                <span class="calc-icon">⚡</span>
                <span class="calc-title">${meta.calcTitle || 'AERO-MATH REAL-TIME PARAMETER SOLVER'}</span>
              </div>
              <div class="calc-grid">
                <div class="calc-control-group">
                  <div class="calc-label-row">
                    <span>${meta.calcParam1.label}</span>
                    <strong id="calcInput1Val">${meta.calcParam1.val} ${meta.calcParam1.unit}</strong>
                  </div>
                  <input type="range" class="hud-range-slider" id="calcSlider1" 
                    min="${meta.calcParam1.min}" max="${meta.calcParam1.max}" value="${meta.calcParam1.val}" 
                    step="${meta.calcParam1.step || 1}" />
                </div>
                <div class="calc-control-group">
                  <div class="calc-label-row">
                    <span>${meta.calcParam2.label}</span>
                    <strong id="calcInput2Val">${meta.calcParam2.val} ${meta.calcParam2.unit}</strong>
                  </div>
                  <input type="range" class="hud-range-slider" id="calcSlider2" 
                    min="${meta.calcParam2.min}" max="${meta.calcParam2.max}" value="${meta.calcParam2.val}" 
                    step="${meta.calcParam2.step || 1}" />
                </div>
              </div>
              <div class="calc-results-panel">
                <div class="cr-cell">
                  <span class="cr-label">CALCULATED VALUE</span>
                  <span class="cr-val text-cyan" id="calcResultMain">1,842.5 Units</span>
                </div>
                <div class="cr-cell">
                  <span class="cr-label">SAFETY MARGIN</span>
                  <span class="cr-val text-green" id="calcResultMargin">+18.4% (Certified)</span>
                </div>
                <div class="cr-cell">
                  <span class="cr-label">STATUS</span>
                  <span class="cr-val" id="calcResultStatus">OPTIMAL / FAR PART 25</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------
    // PAGE 4: FLIGHT TEST SORTIE LOG & INTERACTIVE ENVELOPE EXPLORER
    // -------------------------------------------------------
    if (pageNum === 4) {
      const headers = meta.tableHeaders || ['TEST RUN', 'FLIGHT CONDITION', 'CALIBRATED AIRSPEED', 'G-LOAD (n)', 'MEASURED RESPONSE', 'CERTIFICATION'];
      const rows = meta.tableRows || [
        ['TR-101', 'Takeoff Rotation & Initial Climb', '145 kts', '+1.22 G', 'L/D = 12.8 (Nominal)', 'PASSED'],
        ['TR-102', 'Max Continuous Cruise (FL350)', '450 kts (M 0.78)', '+1.00 G', 'SFC = 0.52 lb/lbf·h', 'PASSED'],
        ['TR-103', 'High-Angle-of-Attack Buffet Boundary', '118 kts', '+1.85 G', 'Pre-stall stick shaker active', 'VERIFIED'],
        ['TR-104', 'Emergency Dive Recovery Limit', '365 kts', '+2.50 G', 'Aeroelastic flutter margin > 20%', 'CERTIFIED']
      ];

      return `
        <div class="page-content-flow">
          <div class="section-block">
            <h3 class="section-title"><span class="sec-index">4.1</span> ${meta.tableTitle || 'Flight Test Sortie Telemetry Log'}</h3>
            <p class="section-p">
              ${meta.tableIntro || `During experimental flight test campaigns for <strong>${meta.title}</strong>, aircraft are instrumented with multi-channel telemetry transmitters to capture real-time aerodynamic loads, stability derivatives, and performance points:`}
            </p>
          </div>

          <!-- Structured Flight Test Telemetry Matrix -->
          <div class="flight-data-table-wrapper">
            <table class="aero-data-table" id="aeroDataTable">
              <thead>
                <tr>
                  ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, idx) => `
                  <tr data-row-idx="${idx}" class="${idx === 0 ? 'selected-row' : ''}">
                    <td><strong>${row[0]}</strong></td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                    <td><span class="badge-status-green">${row[5]}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">4.2</span> Flight Envelope & Operational Margins</h3>
            <p class="section-p">
              ${meta.envelopeIntro || `The empirical flight diagram establishes operational boundaries for <strong>${meta.title}</strong>. Flight operations outside this envelope risk immediate plastic structural deformation or aerodynamic stall.`}
            </p>
          </div>

          <!-- DIAGRAM 4: Performance Envelope / Polar -->
          ${renderDiagram4(meta)}

          <!-- INTERACTIVE FEATURE 4: Interactive Sortie Telemetry & Envelope Explorer -->
          <div class="interactive-sortie-explorer-card" id="sortieExplorerCard">
            <div class="sortie-header">
              <div class="sortie-title">
                <span>🎯</span>
                <span>FLIGHT TEST SORTIE TELEMETRY & ENVELOPE EXPLORER</span>
              </div>
              <span class="sortie-badge">REAL-TIME TELEMETRY</span>
            </div>
            <div class="sortie-selector-row">
              <button type="button" class="sortie-pill-btn active" data-sortie="0">TR-101: TAKEOFF</button>
              <button type="button" class="sortie-pill-btn" data-sortie="1">TR-102: MAX CRUISE</button>
              <button type="button" class="sortie-pill-btn" data-sortie="2">TR-103: BUFFET LIMIT</button>
              <button type="button" class="sortie-pill-btn" data-sortie="3">TR-104: DIVE RECOVERY</button>
            </div>
            <div class="calc-grid">
              <div class="calc-control-group">
                <div class="calc-label-row">
                  <span>OPERATIONAL AIRSPEED / PARAMETER</span>
                  <strong id="sortieSpeedVal">250 kts</strong>
                </div>
                <input type="range" class="hud-range-slider" id="sliderSortieSpeed" min="80" max="500" value="250" step="5" />
              </div>
              <div class="calc-control-group">
                <div class="calc-label-row">
                  <span>MEASURED LOAD FACTOR (G / RATIO)</span>
                  <strong id="sortieLoadVal">+1.0 G</strong>
                </div>
                <input type="range" class="hud-range-slider" id="sliderSortieLoad" min="-1.5" max="3.5" value="1.0" step="0.1" />
              </div>
            </div>
            <div class="calc-results-panel">
              <div class="cr-cell">
                <span class="cr-label">ENVELOPE STATE</span>
                <span class="cr-val text-green" id="sortieStatus">CERTIFIED FLIGHT ENVELOPE</span>
              </div>
              <div class="cr-cell">
                <span class="cr-label">DYNAMIC PRESSURE (q)</span>
                <span class="cr-val text-cyan" id="sortieQ">24.2 kPa</span>
              </div>
              <div class="cr-cell">
                <span class="cr-label">STRUCTURAL MARGIN</span>
                <span class="cr-val" id="sortieMargin">+28.5% Above Limit</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------
    // PAGE 5: SUBSYSTEM REDUNDANCY & AUTOMATED FAILOVER SIMULATOR
    // -------------------------------------------------------
    if (pageNum === 5) {
      const cards = meta.redundancyCards || [
        { title: 'DUAL-CHANNEL REDUNDANCY', desc: 'Critical flight sensors and actuators utilize isolated Primary (Lane A) and Secondary (Lane B) control channels with seamless 5ms failover.' },
        { title: 'TRIPLE-VOTING LOGIC', desc: 'Flight control computers compare data from three independent inertial navigation sensors, rejecting outlier signals before command generation.' }
      ];

      return `
        <div class="page-content-flow">
          <div class="section-block">
            <h3 class="section-title"><span class="sec-index">5.1</span> Subsystem Cross-Link & Multi-Disciplinary Coupling</h3>
            <p class="section-p">
              ${meta.integrationIntro || `In modern aeronautical vehicles, <strong>${meta.title}</strong> interfaces directly with hydraulic power distribution, primary flight control computing, environmental cooling loops, and avionics communication channels.`}
            </p>
          </div>

          <!-- DIAGRAM 5: Subsystem Cross-Link & Failover -->
          ${renderDiagram5(meta)}

          <!-- INTERACTIVE FEATURE 5: Subsystem Redundancy & Automated Failover Simulator -->
          <div class="interactive-failover-card" id="failoverSimulatorCard">
            <div class="failover-header">
              <div class="failover-title">
                <span>🛡️</span>
                <span>SUBSYSTEM REDUNDANCY & AUTOMATED FAILOVER SIMULATOR</span>
              </div>
              <span class="failover-badge">ISO-26262 / DO-178C CERTIFIED</span>
            </div>
            <div class="failover-btn-grid">
              <button type="button" class="failover-action-btn btn-fail-lane" id="btnFailLaneA">
                <span>⚠️</span> FAIL PRIMARY LANE A
              </button>
              <button type="button" class="failover-action-btn btn-fail-hyd" id="btnFailHyd">
                <span>💧</span> INJECT PRESSURE DROP
              </button>
              <button type="button" class="failover-action-btn btn-fail-bus" id="btnFailBus">
                <span>⚡</span> INTERRUPT DATA BUS
              </button>
              <button type="button" class="failover-action-btn btn-reset-sys" id="btnResetSys">
                <span>✓</span> RESTORE ALL NOMINAL
              </button>
            </div>
            <div class="failover-status-console">
              <div class="fsc-row">
                <span>PRIMARY SYSTEM: <strong id="fscPrimStatus" style="color:#00ff9d;">ONLINE (100% HEALTH)</strong></span>
                <span>FAILOVER LATENCY: <strong id="fscLatency" style="color:#00f0ff;">0.0 ms</strong></span>
              </div>
              <div class="fsc-row">
                <span>BACKUP REDUNDANCY: <strong id="fscBackStatus" style="color:#00ff9d;">HOT STANDBY (ACTIVE)</strong></span>
                <span>FLIGHT INTEGRITY: <strong id="fscIntegrity" style="color:#00ff9d;">TRIPLEX VOTING PASSED</strong></span>
              </div>
              <div class="fsc-log" id="fscLogText">
                [SYSTEM NOMINAL]: Triplex voting synchronized across Lane A and Lane B. All actuator commands validated. Zero fault conditions detected.
              </div>
            </div>
          </div>

          <div class="section-block mt-4">
            <h3 class="section-title"><span class="sec-index">5.2</span> Failure Modes & Redundancy Architecture</h3>
            <div class="redundancy-matrix-grid">
              ${cards.map(card => `
                <div class="rm-card">
                  <div class="rm-title">${card.title}</div>
                  <p class="rm-desc">${card.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="chapter-end-review-prompt mt-4">
            <div class="cerp-header">
              <span class="cerp-icon">🎯</span>
              <span class="cerp-title">READY FOR CHAPTER ${meta.num} CERTIFICATION?</span>
            </div>
            <p class="cerp-p">
              You have completed all 5 technical content pages for <strong>${meta.title}</strong>. Advance to <strong>Page 6</strong> to test your mastery in the Flight Engineer Knowledge Check and certify this chapter!
            </p>
            <button type="button" class="btn-goto-quiz" id="btnGoToQuiz">
              ADVANCE TO PAGE 6 (CHAPTER QUIZ) ➔
            </button>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------
    // PAGE 6: CHAPTER QUIZ & FLIGHT ENGINEER CERTIFICATION
    // -------------------------------------------------------
    if (pageNum === 6) {
      const q = meta.quiz;
      const isCompleted = readerState.readChapters.has(meta.num);
      const savedAnswer = readerState.quizAnswers[meta.num];

      return `
        <div class="page-content-flow">
          <div class="quiz-page-container">
            <div class="quiz-hero-banner">
              <div class="quiz-badge-row">
                <span class="quiz-page-chip">PAGE 6 OF 6 // FLIGHT ENGINEER CERTIFICATION</span>
                <span class="quiz-ch-chip">CHAPTER ${meta.num}</span>
              </div>
              <h2 class="quiz-hero-heading">${meta.title} Knowledge Check</h2>
              <p class="quiz-hero-sub">
                Answer the technical question below to validate your understanding of the aerodynamic, structural, and physical principles covered in this chapter.
              </p>
            </div>

            <!-- Quiz Question Box -->
            <div class="quiz-question-card">
              <div class="qq-number-tag">EXAMINATION QUESTION // CH ${meta.num}</div>
              <h3 class="qq-text">${q.question}</h3>

              <!-- 4 Interactive Option Cards -->
              <div class="quiz-options-list" id="quizOptionsList">
                ${q.options.map((opt, idx) => {
                  let stateClass = '';
                  if (savedAnswer !== undefined) {
                    if (idx === q.correctIndex) stateClass = 'correct-revealed';
                    else if (savedAnswer === idx) stateClass = 'incorrect-revealed';
                  }
                  return `
                    <button type="button" class="quiz-option-btn ${stateClass}" data-opt-idx="${idx}">
                      <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                      <span class="opt-label">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Technical Rationale Card (revealed upon answering) -->
              <div class="quiz-rationale-card ${savedAnswer !== undefined ? 'visible' : ''}" id="quizRationaleCard">
                <div class="qr-header">
                  <span class="qr-icon">💡</span>
                  <span class="qr-title">TECHNICAL FLIGHT RATIONALE</span>
                </div>
                <div class="qr-body">${q.rationale}</div>
              </div>
            </div>

            <!-- Final Chapter Certification Action -->
            <div class="chapter-certification-action">
              <div class="cca-status">
                <span class="cca-icon">${isCompleted ? '🏆' : '⏳'}</span>
                <span class="cca-text" id="ccaStatusText">
                  ${isCompleted ? 'CHAPTER CERTIFIED & ARCHIVED IN FLIGHT LOG' : 'COMPLETE QUIZ TO RECORD CERTIFICATION'}
                </span>
              </div>
              <button type="button" class="btn-certify-chapter ${isCompleted ? 'already-certified' : ''}" id="btnMarkChapterCompletedQuiz">
                ${isCompleted ? '✓ RE-VALIDATE CHAPTER CERTIFICATE' : 'CERTIFY & RECORD CHAPTER COMPLETION ➔'}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return `<div class="page-content-flow"><p>Unknown Page</p></div>`;
  }

  // =========================================================
  // PAGE 1 INTERACTIVE: LIVE VECTOR & THEORETICAL PARAMETER TUNER
  // =========================================================
  function initPage1Interactions(meta) {
    const s1 = document.getElementById('sliderVectorParam1');
    const s2 = document.getElementById('sliderVectorParam2');
    const val1 = document.getElementById('valVectorParam1');
    const val2 = document.getElementById('valVectorParam2');
    const resMain = document.getElementById('resVectorMain');
    const resPrimary = document.getElementById('resVectorPrimary');
    const resEff = document.getElementById('resVectorEfficiency');

    function updateVector() {
      if (!s1 || !s2) return;
      const angle = parseFloat(s1.value);
      const vel = parseFloat(s2.value);

      if (val1) val1.textContent = `${angle.toFixed(1)}°`;
      if (val2) val2.textContent = `${vel} kts`;

      // Theoretical Force Calculations
      const q = 0.5 * 1.225 * Math.pow(vel * 0.5144, 2);
      const cl = (0.105 * angle + 0.28).toFixed(2);
      const cd = (0.018 + 0.045 * Math.pow(cl, 2)).toFixed(3);
      const lift = Math.max(0, (q * 42.5 * cl / 1000)).toFixed(1);
      const drag = (q * 42.5 * cd / 1000).toFixed(1);
      const resultant = Math.hypot(lift, drag).toFixed(1);
      const ldRatio = cd > 0 ? (cl / cd).toFixed(1) : '15.0';

      if (resMain) resMain.textContent = `${resultant} kN`;
      if (resPrimary) resPrimary.textContent = `${lift} kN (Lift / Force)`;
      if (resEff) resEff.textContent = `L/D = ${ldRatio}`;

      // Update SVG elements live in Diagram 1 if present
      const liftArr = document.getElementById('d1LiftArrow');
      const liftTip = document.getElementById('d1LiftTip');
      const liftTxt = document.getElementById('d1LiftText');
      const aoaTxt = document.getElementById('d1AoaText');

      if (liftArr && liftTip) {
        const arrowH = Math.min(110, Math.max(25, lift * 0.7));
        liftArr.setAttribute('y2', String(130 - arrowH));
        liftTip.setAttribute('points', `380,${130 - arrowH - 10} 374,${130 - arrowH} 386,${130 - arrowH}`);
      }
      if (liftTxt) liftTxt.textContent = `LIFT (L = ${lift} kN)`;
      if (aoaTxt) aoaTxt.textContent = `α = ${angle.toFixed(1)}°`;
    }

    if (s1) s1.addEventListener('input', () => { updateVector(); playTone(400 + s1.value * 10, 'sine', 0.02, 0.02); });
    if (s2) s2.addEventListener('input', () => { updateVector(); playTone(300 + s2.value * 0.5, 'sine', 0.02, 0.02); });
    updateVector();
  }

  // =========================================================
  // PAGE 2 INTERACTIVE: DOMAIN-SPECIFIC 60 FPS HTML5 SIMULATION ENGINE
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

    // Dynamic Flow / Engine Particles Pool
    const particles = [];
    const numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 30 + Math.random() * (canvas.height - 60),
        vx: 3 + Math.random() * 3.5,
        size: 1.5 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6
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

      // Subtle Cybernetic Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Calculations based on domain
      const speedKts = domain === 'propulsion' ? p1 * 3.5 : p1;
      const aoaDeg = domain === 'propulsion' ? 12 : p2;
      const qVal = (0.5 * 1.225 * Math.pow(Math.max(50, speedKts) * 0.5144, 2) / 1000).toFixed(1);
      const cl = (0.11 * aoaDeg + 0.25).toFixed(2);
      const liftVal = (qVal * 42.5 * Math.max(0.1, cl)).toFixed(1);
      const reVal = ((Math.max(50, speedKts) * 0.5144 * 3.5 / 1.46e-5) / 1e6).toFixed(2);

      if (outQ) outQ.textContent = `${qVal} kPa`;
      if (outLift) outLift.textContent = `${liftVal} kN`;
      if (outRe) outRe.textContent = `${reVal} × 10⁶`;

      // -----------------------------------------------------
      // RENDER DOMAIN-SPECIFIC PHYSICAL VISUALIZATION
      // -----------------------------------------------------
      if (domain === 'propulsion') {
        // ROTATING TURBOFAN JET ENGINE CORE
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;

        // Engine Nacelle Shell
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx - 220, cy - 80); ctx.bezierCurveTo(cx - 100, cy - 100, cx + 120, cy - 90, cx + 220, cy - 50);
        ctx.moveTo(cx - 220, cy + 80); ctx.bezierCurveTo(cx - 100, cy + 100, cx + 120, cy + 90, cx + 220, cy + 50);
        ctx.stroke();

        // High-speed spinning Fan Blades
        ctx.save();
        ctx.translate(cx - 150, cy);
        for (let b = 0; b < 12; b++) {
          const rot = simAngle * 4 + (b * Math.PI / 6);
          ctx.strokeStyle = meta.chipColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(rot) * 65, Math.sin(rot) * 65);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // Flickering Combustion Flames
        ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
        for (let f = 0; f < 5; f++) {
          const fx = cx + 20 + f * 22;
          const fy = cy + Math.sin(simAngle * 10 + f) * 15;
          ctx.beginPath();
          ctx.arc(fx, fy, 12 + Math.random() * 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Exhaust Jet Plume
        ctx.fillStyle = 'rgba(255, 183, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx + 220, cy - 40);
        ctx.lineTo(canvas.width, cy - 65);
        ctx.lineTo(canvas.width, cy + 65);
        ctx.lineTo(cx + 220, cy + 40);
        ctx.closePath();
        ctx.fill();

      } else if (domain === 'avionics') {
        // ELECTRONIC FLIGHT INSTRUMENT PFD ARTIFICIAL HORIZON
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;
        const bankRad = (aoaDeg * 2.5 * Math.PI) / 180;
        const pitchPx = (speedKts - 250) * 0.2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(bankRad);

        // Sky & Ground
        ctx.fillStyle = 'rgba(14, 116, 144, 0.5)';
        ctx.fillRect(-180, -100 + pitchPx, 360, 100);
        ctx.fillStyle = 'rgba(180, 83, 9, 0.5)';
        ctx.fillRect(-180, 0 + pitchPx, 360, 100);

        // Horizon Line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-180, pitchPx); ctx.lineTo(180, pitchPx); ctx.stroke();
        ctx.restore();

        // Aircraft Reticle Symbol
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy); ctx.lineTo(cx - 15, cy); ctx.lineTo(cx, cy + 12); ctx.lineTo(cx + 15, cy); ctx.lineTo(cx + 45, cy);
        ctx.stroke();

        // Sweeping Radar Scope in Corner
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(100, 140, 50, 0, Math.PI * 2); ctx.stroke();
        const sweepX = 100 + Math.cos(simAngle * 2) * 50;
        const sweepY = 140 + Math.sin(simAngle * 2) * 50;
        ctx.strokeStyle = '#00ff9d'; ctx.beginPath(); ctx.moveTo(100, 140); ctx.lineTo(sweepX, sweepY); ctx.stroke();
        ctx.fillStyle = '#00ff9d'; ctx.beginPath(); ctx.arc(120, 125, 4, 0, Math.PI * 2); ctx.fill();

      } else if (domain === 'supersonic') {
        // SUPERSONIC WEDGE & OBLIQUE SHOCK WAVE CONE
        const cx = canvas.width * 0.45;
        const cy = canvas.height * 0.5;
        const mach = Math.max(1.1, (speedKts / 150));
        const mu = Math.asin(1 / mach);

        // Supersonic Vehicle
        ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.strokeStyle = meta.chipColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 180, cy - 50);
        ctx.lineTo(cx + 180, cy + 50);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Oblique Shock Fronts
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth = 3.5;
        const shockLen = 220;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - Math.cos(mu) * shockLen, cy - Math.sin(mu) * shockLen);
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - Math.cos(mu) * shockLen, cy + Math.sin(mu) * shockLen);
        ctx.stroke();

        // High-Speed Supersonic Flow Lines
        particles.forEach(pt => {
          pt.x += (pt.vx * 3.5);
          if (pt.x > canvas.width) pt.x = 0;
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(pt.x, pt.y, 4, 1.5);
        });

      } else if (domain === 'orbit') {
        // KEPLERIAN ORBIT PROPAGATION
        const cx = canvas.width * 0.45;
        const cy = canvas.height * 0.5;

        // Central Planet
        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath(); ctx.arc(cx - 50, cy, 38, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2; ctx.stroke();

        // Elliptical Orbit Track
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.ellipse(cx, cy, 180, 85, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);

        // Orbiting Satellite
        const satX = cx + Math.cos(simAngle * 1.5) * 180;
        const satY = cy + Math.sin(simAngle * 1.5) * 85;
        ctx.fillStyle = '#ffb700'; ctx.beginPath(); ctx.arc(satX, satY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00ff9d'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(satX, satY); ctx.lineTo(satX - Math.sin(simAngle * 1.5) * 28, satY + Math.cos(simAngle * 1.5) * 28); ctx.stroke();

      } else {
        // Default: CAMBERED AIRFOIL WIND TUNNEL STREAMLINES
        ctx.fillStyle = meta.chipColor;
        particles.forEach(pt => {
          pt.x += (pt.vx * (Math.max(80, speedKts) / 140));
          if (pt.x > canvas.width) {
            pt.x = 0;
            pt.y = 30 + Math.random() * (canvas.height - 60);
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

        // Draw Airfoil Geometry
        ctx.save();
        ctx.translate(canvas.width * 0.45, canvas.height * 0.5);
        ctx.rotate((-aoaDeg * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(-140, 0);
        ctx.bezierCurveTo(-90, -45, 40, -40, 140, 0);
        ctx.bezierCurveTo(40, 20, -90, 15, -140, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.fill();
        ctx.strokeStyle = meta.chipColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(-140, 0); ctx.lineTo(140, 0); ctx.stroke();
        ctx.restore();

        // Lift Arrow
        const arrowLen = Math.min(100, Math.max(20, liftVal * 0.4));
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.45, canvas.height * 0.5);
        ctx.lineTo(canvas.width * 0.45, canvas.height * 0.5 - arrowLen);
        ctx.stroke();
      }

      readerState.activeSimLoop = requestAnimationFrame(renderLoop);
    }

    readerState.activeSimLoop = requestAnimationFrame(renderLoop);
  }

  // =========================================================
  // PAGE 3 INTERACTIVE: CAD HOTSPOTS & PARAMETER CALCULATOR
  // =========================================================
  function initPage3Interactions(meta) {
    const pins = document.querySelectorAll('.cad-hotspot-pin');
    const badge = document.getElementById('htStatusBadge');
    const title = document.getElementById('htCompTitle');
    const spec = document.getElementById('htSpec');
    const stress = document.getElementById('htStress');
    const status = document.getElementById('htStatus');

    pins.forEach(pin => {
      pin.addEventListener('click', () => {
        pins.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');

        const pinId = parseInt(pin.getAttribute('data-pin-id'), 10);
        const data = (meta.hotspotPins && meta.hotspotPins.find(p => p.id === pinId)) || {
          title: `Inspection Station #${pinId}`,
          spec: 'Aerospace Grade Titanium / Composite',
          stress: `${240 + pinId * 45} MPa`,
          status: 'INSPECTED & PASSED'
        };

        if (badge) badge.textContent = `HOTSPOT ${pinId} ACTIVE`;
        if (title) title.textContent = data.title;
        if (spec) spec.textContent = data.spec;
        if (stress) stress.textContent = data.stress;
        if (status) status.textContent = data.status;

        playTone(600 + pinId * 80, 'sine', 0.08, 0.06);
      });
    });

    // 2B: Live Engineering Parameter Calculator
    const calcSlider1 = document.getElementById('calcSlider1');
    const calcSlider2 = document.getElementById('calcSlider2');
    const input1Val = document.getElementById('calcInput1Val');
    const input2Val = document.getElementById('calcInput2Val');
    const resultMain = document.getElementById('calcResultMain');
    const resultMargin = document.getElementById('calcResultMargin');

    function updateCalc() {
      if (!calcSlider1 || !calcSlider2) return;
      const v1 = parseFloat(calcSlider1.value);
      const v2 = parseFloat(calcSlider2.value);

      if (input1Val) input1Val.textContent = `${v1} ${meta.calcParam1.unit}`;
      if (input2Val) input2Val.textContent = `${v2} ${meta.calcParam2.unit}`;

      const computed = (v1 * 1.85 + Math.pow(v2, 1.4) * 8.2).toFixed(1);
      const margin = (15 + (v1 / 50) + (v2 / 2)).toFixed(1);

      if (resultMain) resultMain.textContent = `${computed} Units`;
      if (resultMargin) resultMargin.textContent = `+${margin}% (Certified)`;
    }

    if (calcSlider1) calcSlider1.addEventListener('input', () => { updateCalc(); playTone(350, 'triangle', 0.02, 0.02); });
    if (calcSlider2) calcSlider2.addEventListener('input', () => { updateCalc(); playTone(450, 'triangle', 0.02, 0.02); });
    updateCalc();
  }

  // =========================================================
  // PAGE 4 INTERACTIVE: SORTIE TELEMETRY & ENVELOPE EXPLORER
  // =========================================================
  function initPage4Interactions(meta) {
    const sortieBtns = document.querySelectorAll('.sortie-pill-btn');
    const speedSlider = document.getElementById('sliderSortieSpeed');
    const loadSlider = document.getElementById('sliderSortieLoad');
    const speedVal = document.getElementById('sortieSpeedVal');
    const loadVal = document.getElementById('sortieLoadVal');
    const statusVal = document.getElementById('sortieStatus');
    const qVal = document.getElementById('sortieQ');
    const marginVal = document.getElementById('sortieMargin');
    const tableRows = document.querySelectorAll('#aeroDataTable tbody tr');
    const crosshair = document.getElementById('d4SortieCrosshair');
    const label = document.getElementById('d4SortieLabel');

    const sortiePresets = [
      { speed: 145, load: 1.2 },
      { speed: 450, load: 1.0 },
      { speed: 118, load: 1.85 },
      { speed: 365, load: 2.5 }
    ];

    function updateSortiePoint() {
      if (!speedSlider || !loadSlider) return;
      const spd = parseFloat(speedSlider.value);
      const ld = parseFloat(loadSlider.value);

      if (speedVal) speedVal.textContent = `${spd} kts`;
      if (loadVal) loadVal.textContent = `${ld >= 0 ? '+' : ''}${ld.toFixed(1)} G`;

      // Dynamic Pressure
      const q = (0.5 * 1.225 * Math.pow(spd * 0.5144, 2) / 1000).toFixed(1);
      if (qVal) qVal.textContent = `${q} kPa`;

      // Classify Envelope State
      let stateTxt = 'CERTIFIED FLIGHT ENVELOPE';
      let stateColor = '#00ff9d';
      let margin = `+${Math.max(5, (38 - q)).toFixed(1)}% Safe Margin`;

      if (ld > 2.5 || ld < -1.0 || spd > 450) {
        stateTxt = 'STRUCTURAL LOAD EXCEEDANCE!';
        stateColor = '#f43f5e';
        margin = '-14.2% OVERSTRESS CAUTION';
      } else if (spd < 130 && ld > 1.4) {
        stateTxt = 'PRE-STALL BUFFET REGION';
        stateColor = '#ffb700';
        margin = '+3.5% (STICK SHAKER ACTIVE)';
      }

      if (statusVal) {
        statusVal.textContent = stateTxt;
        statusVal.style.color = stateColor;
      }
      if (marginVal) marginVal.textContent = margin;

      // Move crosshair in Diagram 4 SVG
      if (crosshair) {
        const svgX = 80 + ((spd - 80) / (500 - 80)) * (640 - 80);
        const svgY = 140 - ((ld - 1.0) / 2.5) * 100;
        crosshair.setAttribute('cx', String(Math.max(90, Math.min(680, svgX))));
        crosshair.setAttribute('cy', String(Math.max(30, Math.min(210, svgY))));
        crosshair.setAttribute('fill', stateColor);
      }
      if (label) {
        label.textContent = `POINT: ${spd} kts / ${ld.toFixed(1)}G [${stateTxt}]`;
      }
    }

    sortieBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        playClickSound();
        sortieBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Highlight table row
        tableRows.forEach((r, rIdx) => {
          if (rIdx === idx) r.classList.add('selected-row');
          else r.classList.remove('selected-row');
        });

        const p = sortiePresets[idx] || sortiePresets[0];
        if (speedSlider) speedSlider.value = p.speed;
        if (loadSlider) loadSlider.value = p.load;
        updateSortiePoint();
      });
    });

    if (speedSlider) speedSlider.addEventListener('input', () => { updateSortiePoint(); playTone(320 + speedSlider.value * 0.4, 'sine', 0.02, 0.02); });
    if (loadSlider) loadSlider.addEventListener('input', () => { updateSortiePoint(); playTone(400 + loadSlider.value * 50, 'sine', 0.02, 0.02); });
    updateSortiePoint();
  }

  // =========================================================
  // PAGE 5 INTERACTIVE: SUBSYSTEM REDUNDANCY & FAILOVER SIMULATOR
  // =========================================================
  function initPage5Interactions(meta) {
    const btnFailLaneA = document.getElementById('btnFailLaneA');
    const btnFailHyd = document.getElementById('btnFailHyd');
    const btnFailBus = document.getElementById('btnFailBus');
    const btnResetSys = document.getElementById('btnResetSys');

    const primStatus = document.getElementById('fscPrimStatus');
    const latency = document.getElementById('fscLatency');
    const backStatus = document.getElementById('fscBackStatus');
    const integrity = document.getElementById('fscIntegrity');
    const logText = document.getElementById('fscLogText');

    // SVG element hooks in Diagram 5
    const primLine = document.getElementById('d5PrimLaneLine');
    const secLine = document.getElementById('d5SecLaneLine');
    const primTxt = document.getElementById('d5PrimLaneTxt');
    const secTxt = document.getElementById('d5SecLaneTxt');
    const beacon = document.getElementById('d5FailoverBeacon');

    if (btnFailLaneA) {
      btnFailLaneA.addEventListener('click', () => {
        playTone(280, 'sawtooth', 0.2, 0.1);
        if (primStatus) { primStatus.textContent = 'FAULT / DISCONNECTED'; primStatus.style.color = '#f43f5e'; }
        if (latency) { latency.textContent = '4.2 ms'; latency.style.color = '#00f0ff'; }
        if (backStatus) { backStatus.textContent = 'ONLINE (ASSUMED COMMAND)'; backStatus.style.color = '#00f0ff'; }
        if (integrity) { integrity.textContent = '100% FLIGHT AUTHORITY MAINTAINED'; integrity.style.color = '#00ff9d'; }
        if (logText) {
          logText.textContent = '[AUTO FAILOVER ENGAGED]: Primary Lane A signal lost. Cross-Channel Data Link executed seamless 4.2ms switch to Lane B. Zero command interruption.';
          logText.style.color = '#00f0ff';
        }
        if (primLine) primLine.setAttribute('stroke', '#f43f5e');
        if (secLine) { secLine.setAttribute('stroke', '#00f0ff'); secLine.setAttribute('stroke-width', '5'); }
        if (primTxt) { primTxt.textContent = 'PRIMARY BUS A: [OFFLINE / ISOLATED]'; primTxt.setAttribute('fill', '#f43f5e'); }
        if (secTxt) { secTxt.textContent = 'SECONDARY BUS B: [ACTIVE FLIGHT CONTROL - PRIMARY AUTHORITY]'; secTxt.setAttribute('fill', '#00f0ff'); }
        if (beacon) beacon.setAttribute('fill', '#00f0ff');
      });
    }

    if (btnFailHyd) {
      btnFailHyd.addEventListener('click', () => {
        playTone(240, 'sawtooth', 0.2, 0.1);
        if (primStatus) { primStatus.textContent = 'HYDRAULIC CIRCUIT 1 DROP'; primStatus.style.color = '#ffb700'; }
        if (latency) { latency.textContent = '6.8 ms'; }
        if (backStatus) { backStatus.textContent = 'CIRCUIT 2 (RAT DEPLOY READY)'; backStatus.style.color = '#00ff9d'; }
        if (integrity) { integrity.textContent = 'DUAL TANDEM SERVO ACTIVE'; integrity.style.color = '#00ff9d'; }
        if (logText) {
          logText.textContent = '[HYDRAULIC PRESSURE BALANCED]: Circuit 1 pressure fell below 1800 PSI. Priority valve closed; secondary accumulator isolated leak. All primary surfaces functional.';
          logText.style.color = '#ffb700';
        }
      });
    }

    if (btnFailBus) {
      btnFailBus.addEventListener('click', () => {
        playTone(200, 'sawtooth', 0.25, 0.1);
        if (primStatus) { primStatus.textContent = 'DATA PACKET CORRUPTION'; primStatus.style.color = '#f43f5e'; }
        if (latency) { latency.textContent = '3.5 ms'; }
        if (backStatus) { backStatus.textContent = 'OPTICAL BYPASS ACTIVE'; backStatus.style.color = '#00f0ff'; }
        if (integrity) { integrity.textContent = 'CRC CHECKSUM RESTORED'; integrity.style.color = '#00ff9d'; }
        if (logText) {
          logText.textContent = '[AFDX DETERMINISM SECURED]: Corrupt packet rejected by triplex voting monitor. Optical bypass ring engaged. Latency jitter < 15 microseconds.';
          logText.style.color = '#c084fc';
        }
      });
    }

    if (btnResetSys) {
      btnResetSys.addEventListener('click', () => {
        playTone(523.25, 'sine', 0.15, 0.08);
        if (primStatus) { primStatus.textContent = 'ONLINE (100% HEALTH)'; primStatus.style.color = '#00ff9d'; }
        if (latency) { latency.textContent = '0.0 ms'; latency.style.color = '#00f0ff'; }
        if (backStatus) { backStatus.textContent = 'HOT STANDBY (ACTIVE)'; backStatus.style.color = '#00ff9d'; }
        if (integrity) { integrity.textContent = 'TRIPLEX VOTING PASSED'; integrity.style.color = '#00ff9d'; }
        if (logText) {
          logText.textContent = '[SYSTEM NOMINAL]: Triplex voting synchronized across Lane A and Lane B. All actuator commands validated. Zero fault conditions detected.';
          logText.style.color = '#00ff9d';
        }
        if (primLine) primLine.setAttribute('stroke', '#00ff9d');
        if (secLine) { secLine.setAttribute('stroke', '#ffb700'); secLine.setAttribute('stroke-width', '3'); }
        if (primTxt) { primTxt.textContent = `PRIMARY FLIGHT CONTROL BUS [LANE A: ONLINE - CH-${meta.num}]`; primTxt.setAttribute('fill', '#00ff9d'); }
        if (secTxt) { secTxt.textContent = 'SECONDARY REDUNDANT BACKUP BUS [LANE B: HOT STANDBY - 5ms FAILOVER]'; secTxt.setAttribute('fill', '#ffb700'); }
        if (beacon) beacon.setAttribute('fill', '#00ff9d');
      });
    }

    const btnAdvance = document.getElementById('btnGoToQuiz');
    if (btnAdvance) {
      btnAdvance.addEventListener('click', () => {
        playClickSound();
        readerState.currentPage = 6;
        renderEbookPage();
        if (ebookPageContainer) {
          try {
            if (typeof ebookPageContainer.scrollTo === 'function') {
              ebookPageContainer.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              ebookPageContainer.scrollTop = 0;
            }
          } catch (e) {
            ebookPageContainer.scrollTop = 0;
          }
        }
      });
    }
  }
'''

if __name__ == '__main__':
    print("Interactives module template ready.")
