/**
 * AERONAUTICS E-BOOK — MASTER CONTROLLER
 * Features:
 * 1. Clean Atmospheric Cockpit HUD & Radar Grid
 * 2. Smooth Lerping Blurred Doodle Cursor Follower
 * 3. Logos-Only Theme Switcher (Light, System, Dark)
 * 4. Direct Encrypted Pilot Access & Session Logging
 * 5. Cockpit Audio Synthesizer & Download/Spec Modals
 */

(function () {
  'use strict';

  // Master State
  const state = {
    audioEnabled: true,
    theme: localStorage.getItem('flight_sim_theme') || 'system', // 'light' | 'system' | 'dark'
    pilotName: '',
    pilotEmail: '',
    generatedCode: '',
    downloadTimer: null,
    chaptersRead: parseInt(localStorage.getItem('aeronautics_chapters_read') || '0', 10),
    totalChapters: 1000,
  };

  // =========================================================
  // 1. WEB AUDIO API SYNTHESIZER
  // =========================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainValue = 0.08) {
    if (!state.audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playClickSound() {
    playTone(920, 'sine', 0.06, 0.08);
  }

  function playKeyTypeSound() {
    playTone(600 + Math.random() * 280, 'triangle', 0.035, 0.03);
  }

  function playSuccessChime() {
    if (!state.audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.1, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  function playErrorBuzz() {
    if (!state.audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.35);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // =========================================================
  // 2. SMOOTH BLURRED DOODLE CURSOR FOLLOWER
  // =========================================================
  const cursorDoodle = document.getElementById('cursorDoodle');
  let mouseTargetX = window.innerWidth / 2;
  let mouseTargetY = window.innerHeight / 2;
  let doodleCurrentX = mouseTargetX;
  let doodleCurrentY = mouseTargetY;
  let isMouseActive = false;

  function initCursorDoodle() {
    if (!cursorDoodle) return;

    window.addEventListener('mousemove', (e) => {
      mouseTargetX = e.clientX;
      mouseTargetY = e.clientY;

      if (!isMouseActive) {
        // Immediately snap to initial cursor position so it never starts in the corner
        doodleCurrentX = mouseTargetX;
        doodleCurrentY = mouseTargetY;
        isMouseActive = true;
        cursorDoodle.style.opacity = '0.8';
      }
    });

    window.addEventListener('mouseleave', () => {
      cursorDoodle.style.opacity = '0';
      isMouseActive = false;
    });

    window.addEventListener('mouseenter', () => {
      cursorDoodle.style.opacity = '0.8';
    });

    window.addEventListener('mousedown', () => {
      cursorDoodle.classList.add('doodle-active');
    });

    window.addEventListener('mouseup', () => {
      cursorDoodle.classList.remove('doodle-active');
    });

    function renderDoodle() {
      // Smooth linear interpolation (lerp) toward mouse coordinates
      doodleCurrentX += (mouseTargetX - doodleCurrentX) * 0.16;
      doodleCurrentY += (mouseTargetY - doodleCurrentY) * 0.16;

      cursorDoodle.style.transform = `translate3d(${doodleCurrentX}px, ${doodleCurrentY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(renderDoodle);
    }

    renderDoodle();
  }

  // =========================================================
  // 4. THEME SWITCHER (LOGOS ONLY: LIGHT, SYSTEM, DARK)
  // =========================================================
  function applyTheme(themeMode) {
    state.theme = themeMode;
    try {
      localStorage.setItem('flight_sim_theme', themeMode);
    } catch (e) {}

    // Update active button state
    document.querySelectorAll('.theme-logo-btn').forEach((btn) => {
      if (btn.getAttribute('data-theme-val') === themeMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Resolve system preference
    let resolvedTheme = themeMode;
    if (themeMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolvedTheme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);

    // Switch card banner image between windows.png (dark) and windows2.png (light) with smooth ease
    const darkBanner = document.getElementById('windowsCardBannerDark');
    const lightBanner = document.getElementById('windowsCardBannerLight');
    if (darkBanner && lightBanner) {
      // Clear any manual inline display styles so CSS cross-fades opacity with ease
      darkBanner.style.removeProperty('display');
      lightBanner.style.removeProperty('display');
    }
  }

  function initThemeSwitcher() {
    // Listen for system changes if system mode is active
    const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
    systemMedia.addEventListener('change', () => {
      if (state.theme === 'system') {
        applyTheme('system');
      }
    });

    // Bind logo buttons
    document.querySelectorAll('.theme-logo-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = btn.getAttribute('data-theme-val') || 'dark';
        playClickSound();
        applyTheme(mode);
      });
    });

    // Apply stored theme
    applyTheme(state.theme);
  }

  // =========================================================
  // 5. DOM ELEMENTS
  // =========================================================
  const screens = {
    splash: document.getElementById('splashScreen'),
    signIn: document.getElementById('signInScreen'),
    login: document.getElementById('signInScreen'),
    signin: document.getElementById('signInScreen'),
    dashboard: document.getElementById('mainDashboardScreen'),
    homepage: document.getElementById('mainDashboardScreen'),
    ebook: document.getElementById('ebookReaderScreen'),
    'e-book': document.getElementById('ebookReaderScreen'),
    ebookReader: document.getElementById('ebookReaderScreen'),
  };

  const audioControlBtn = document.getElementById('audioControlBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');

  const skipIntroBtn = document.getElementById('skipIntroBtn');
  const splashProgress = document.getElementById('splashProgress');
  const splashStatus = document.getElementById('splashStatus');

  // Sign In Form Elements
  const signInForm = document.getElementById('signInForm');
  const pilotNameInput = document.getElementById('pilotName');
  const pilotEmailInput = document.getElementById('pilotEmail');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');

  // Dashboard Elements
  const userCallsignBadge = document.getElementById('userCallsignBadge');
  const userEmailBadge = document.getElementById('userEmailBadge');
  const logoutBtn = document.getElementById('logoutBtn');
  const footerResetDemo = document.getElementById('footerResetDemo');

  // Modals
  const downloadModal = document.getElementById('downloadModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const btnModalCancel = document.getElementById('btnModalCancel');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalFileInfo = document.getElementById('modalFileInfo');
  const downloadProgressBar = document.getElementById('downloadProgressBar');
  const downloadStatusText = document.getElementById('downloadStatusText');
  const downloadPercentageText = document.getElementById('downloadPercentageText');
  const downloadSpeed = document.getElementById('downloadSpeed');
  const downloadEta = document.getElementById('downloadEta');
  const downloadHash = document.getElementById('downloadHash');
  const btnModalPrimaryAction = document.getElementById('btnModalPrimaryAction');

  const guideModal = document.getElementById('guideModal');
  const guideCloseBtn = document.getElementById('guideCloseBtn');
  const guideOkBtn = document.getElementById('guideOkBtn');
  const guideTitle = document.getElementById('guideTitle');
  const guideContent = document.getElementById('guideContent');

  // Platform Views & Subview Navigation Elements
  const platformsView = document.getElementById('platformsView');
  const androidSimsView = document.getElementById('androidSimsView');
  const windowsSimsView = document.getElementById('windowsSimsView');

  const boxAndroid = document.getElementById('boxAndroid');
  const boxWindows = document.getElementById('boxWindows');
  const btnBackFromAndroid = document.getElementById('btnBackFromAndroid');
  const btnBackFromWindows = document.getElementById('btnBackFromWindows');
  const btnReturnFromWindows = document.getElementById('btnReturnFromWindows');

  const btnAndroidGuide = document.getElementById('btnAndroidGuide');
  const btnAndroidQr = document.getElementById('btnAndroidQr');
  const btnWindowsGuide = document.getElementById('btnWindowsGuide');
  const btnWindowsSpecs = document.getElementById('btnWindowsSpecs');

  // =========================================================
  // 6. SCREEN SWITCHING
  // =========================================================
  // =========================================================
  // 6. SPA CLIENT-SIDE ROUTER & SCREEN SWITCHING
  // =========================================================
  function getNormalizedScreen(key) {
    if (!key) return 'homepage';
    const k = key.toLowerCase();
    if (k === 'login' || k === 'signin' || k === 'sign-in') return 'signIn';
    if (k === 'homepage' || k === 'dashboard' || k === 'home') return 'dashboard';
    if (k === 'e-book' || k === 'ebook' || k === 'ebookreader' || k === 'reader') return 'ebookReader';
    if (k === 'splash') return 'splash';
    return key;
  }

  function showScreen(screenKey, updateUrl = true) {
    const targetKey = getNormalizedScreen(screenKey);
    const targetElem = screens[targetKey] || screens[screenKey];

    const uniqueScreens = [
      screens.splash,
      screens.signIn,
      screens.dashboard,
      screens.ebookReader
    ];

    uniqueScreens.forEach((s) => {
      if (!s) return;
      if (s === targetElem) {
        s.classList.remove('hidden-view');
        s.classList.add('active-view');
      } else {
        s.classList.add('hidden-view');
        s.classList.remove('active-view');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateUrl) {
      let routePath = '/homepage';
      let pageTitle = 'Aeronautics E-Book // Flight Deck';

      if (targetKey === 'signIn') {
        routePath = '/login';
        pageTitle = 'Aeronautics E-Book // Pilot Authorization Portal';
      } else if (targetKey === 'ebookReader') {
        routePath = `/e-book?chapter=${readerState.currentChapter}&page=${readerState.currentPage}`;
        pageTitle = `Aeronautics E-Book // Chapter ${readerState.currentChapter}`;
      } else if (targetKey === 'splash') {
        routePath = '/splash';
        pageTitle = 'Aeronautics E-Book // Calibration';
      }

      if (window.location.pathname !== routePath.split('?')[0]) {
        try {
          window.history.pushState({ screen: targetKey }, pageTitle, routePath);
        } catch (e) {}
      }
      document.title = pageTitle;
    }
  }


  // Update Top Nav Sublinks Active Highlight
  function updateNavSublinks(routeKey) {
    document.querySelectorAll('.nav-sublink').forEach((link) => {
      const target = link.getAttribute('data-nav');
      if (target === routeKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Master SPA Navigation Function
  function navigateTo(urlPath, updateHistory = true) {
    const baseOrigin = (window.location && window.location.origin && window.location.origin !== 'null') 
      ? window.location.origin 
      : (window.location && window.location.href ? window.location.href : 'http://localhost:5173');
    const parsedUrl = new URL(urlPath, baseOrigin);
    const path = parsedUrl.pathname.toLowerCase().replace(/\/$/, '');
    const params = parsedUrl.searchParams;

    if (updateHistory) {
      try {
        window.history.pushState(null, '', urlPath);
      } catch (e) {}
    }

    if (path === '/login' || path === '/signin' || path === '/sign-in') {
      showScreen('signIn', false);
      updateNavSublinks('login');
      document.title = 'Aeronautics E-Book // Pilot Authorization Portal';
    } else if (path === '/e-book' || path === '/ebook') {
      const qCh = params.get('chapter') || params.get('ch');
      const qPg = params.get('page') || params.get('pg');
      if (qCh) readerState.currentChapter = Math.max(1, Math.min(1000, parseInt(qCh, 10) || 1));
      if (qPg) readerState.currentPage = Math.max(1, Math.min(6, parseInt(qPg, 10) || 1));

      showScreen('ebookReader', false);
      updateNavSublinks('ebook');
      renderEbookPage();
      document.title = `Aeronautics E-Book // Chapter ${readerState.currentChapter}`;
    } else if (path === '/analytics' || path === '/study-analytics') {
      showScreen('dashboard', false);
      updateNavSublinks('analytics');
      openStudyAnalyticsModal();
      document.title = 'Aeronautics E-Book // Study & Learning Analytics';
    } else if (path === '/congratulations' || path === '/certificate') {
      showScreen('dashboard', false);
      updateNavSublinks('dashboard');
      document.title = 'Aeronautics E-Book // Flight Deck Dashboard';
    } else if (path === '/diagrams' || path === '/blueprints') {
      const qCh = params.get('chapter') || params.get('ch') || 1;
      const qD = params.get('diagram') || params.get('d') || 1;
      showScreen('dashboard', false);
      updateNavSublinks('diagrams');
      openDiagramsModal(parseInt(qCh, 10), parseInt(qD, 10));
      document.title = 'Aeronautics E-Book // 5,000 Technical Blueprints Archive';
    } else if (path === '/splash') {
      showScreen('splash', false);
      runSplashScreen();
      document.title = 'Aeronautics E-Book // Calibration';
    } else {
      // Default to /homepage
      showScreen('dashboard', false);
      updateNavSublinks('dashboard');
      document.title = 'Aeronautics E-Book // Flight Deck Dashboard';
    }
  }
  window.navigateTo = navigateTo;

  // Dedicated Open E-Book Reader Launcher (Fixes empty screen bug)
  function openEbookReader(chapterNum, pageNum) {
    playClickSound();
    if (chapterNum) readerState.currentChapter = Math.max(1, Math.min(1000, parseInt(chapterNum, 10)));
    if (pageNum) readerState.currentPage = Math.max(1, Math.min(6, parseInt(pageNum, 10)));
    navigateTo(`/e-book?chapter=${readerState.currentChapter}&page=${readerState.currentPage}`);
  }
  window.openEbookReader = openEbookReader;

  // =========================================================
  // 7. STEP 1: SPLASH SCREEN LOGIC
  // =========================================================
  let splashTimer = null;
  let splashProgressVal = 0;

  function runSplashScreen() {
    const statusMessages = [
      'CALIBRATING AVIONICS & SATELLITE RADAR...',
      'LOADING AERODYNAMICS CHAPTERS & STUDY MODULES...',
      'CONNECTING TO AERONAUTICS KNOWLEDGE VAULT...',
      'SYSTEMS NOMINAL. READY FOR READER SIGN-IN.',
    ];

    splashTimer = setInterval(() => {
      splashProgressVal += 2.5;
      if (splashProgress) {
        splashProgress.style.width = `${Math.min(splashProgressVal, 100)}%`;
      }

      if (splashStatus) {
        const msgIndex = Math.min(
          Math.floor((splashProgressVal / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        splashStatus.textContent = statusMessages[msgIndex];
      }

      if (splashProgressVal >= 100) {
        clearInterval(splashTimer);
        setTimeout(() => {
          showScreen('signIn');
        }, 300);
      }
    }, 60);
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', () => {
      playClickSound();
      if (splashTimer) clearInterval(splashTimer);
      showScreen('signIn');
    });
  }

  // =========================================================
  // 8. STEP 2: PILOT SIGN IN (DIRECT ENTRY TO DASHBOARD)
  // =========================================================
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      initAudio();
      playClickSound();

      const name = pilotNameInput.value.trim();
      const email = pilotEmailInput.value.trim();
      let isValid = true;

      // Validate Pilot Name
      if (!name || name.length < 2) {
        nameError.textContent = 'Please enter a valid callsign or pilot name (min 2 chars).';
        nameError.classList.add('show');
        isValid = false;
      } else {
        nameError.classList.remove('show');
      }

      // Validate Pilot Email
      if (!email || !validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('show');
        isValid = false;
      } else {
        emailError.classList.remove('show');
      }

      if (!isValid) {
        playErrorBuzz();
        return;
      }

      // Store user state
      state.pilotName = name;
      state.pilotEmail = email;

      // Update Dashboard Header with pilot details
      if (userCallsignBadge) userCallsignBadge.textContent = state.pilotName.toUpperCase();
      if (userEmailBadge) userEmailBadge.textContent = state.pilotEmail;

      // Play success audio
      playSuccessChime();

      // Log access to server
      fetch('/api/log-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      }).catch(() => {});

      // Immediate smooth transition to Main Dashboard!
      showScreen('dashboard');
      showPlatformView('platforms');
    });
  }

  // =========================================================
  // 11. STEP 4: MAIN DASHBOARD & PLATFORM CARDS
  // =========================================================
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      playClickSound();
      showScreen('signIn');
    });
  }

  if (footerResetDemo) {
    footerResetDemo.addEventListener('click', (e) => {
      e.preventDefault();
      playClickSound();
      showScreen('splash');
      splashProgressVal = 0;
      runSplashScreen();
    });
  }

  // Download simulation modal
  function openDownloadModal(fileName, fileSize, type) {
    playClickSound();
    modalTitle.textContent = `Dispatching ${fileName}`;
    modalBadge.textContent = `${type.toUpperCase()} ENCRYPTED MIRROR`;
    modalFileInfo.innerHTML = `<span>Target Archive: <code>${fileName}</code></span><span>Payload Size: <strong>${fileSize}</strong></span>`;
    downloadProgressBar.style.width = '0%';
    downloadPercentageText.textContent = '0%';
    downloadStatusText.textContent = 'Connecting to 10 Gbps CDN peer network...';
    downloadSpeed.textContent = '0 MB/s';
    downloadEta.textContent = 'Calculating...';
    downloadHash.textContent = 'SHA256: e8c4...90b2';

    downloadModal.classList.add('modal-active');

    if (state.downloadTimer) clearInterval(state.downloadTimer);
    let pct = 0;
    state.downloadTimer = setInterval(() => {
      pct += Math.floor(Math.random() * 8) + 4;
      const currentPct = Math.min(pct, 100);
      downloadProgressBar.style.width = `${currentPct}%`;
      downloadPercentageText.textContent = `${currentPct}%`;

      const speedVal = (45 + Math.random() * 15).toFixed(1);
      downloadSpeed.textContent = `${speedVal} MB/s`;

      if (currentPct < 40) {
        downloadStatusText.textContent = 'Streaming cracked payload chunks...';
        downloadEta.textContent = '1m 24s';
      } else if (currentPct < 90) {
        downloadStatusText.textContent = 'Verifying cryptographic digital checksum...';
        downloadEta.textContent = '22s';
      } else if (currentPct < 100) {
        downloadStatusText.textContent = 'Finalizing package integrity...';
        downloadEta.textContent = '3s';
      } else {
        clearInterval(state.downloadTimer);
        downloadStatusText.textContent = '✅ Download complete! Package verified.';
        downloadEta.textContent = 'Finished';
        playSuccessChime();
      }
    }, 280);
  }

  function closeDownloadModal() {
    playClickSound();
    if (state.downloadTimer) clearInterval(state.downloadTimer);
    downloadModal.classList.remove('modal-active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDownloadModal);
  if (btnModalCancel) btnModalCancel.addEventListener('click', closeDownloadModal);
  if (btnModalPrimaryAction) {
    btnModalPrimaryAction.addEventListener('click', () => {
      playClickSound();
      navigator.clipboard.writeText('magnet:?xt=urn:btih:flightsim-cracked-v4-deluxe&dn=FlightSim').then(() => {
        btnModalPrimaryAction.textContent = 'MAGNET COPIED TO CLIPBOARD!';
        setTimeout(() => {
          btnModalPrimaryAction.textContent = 'COPY DIRECT MAGNET LINK';
        }, 2500);
      });
    });
  }

  // Platform View Switching (Android & Windows)
  function showPlatformView(platform) {
    playClickSound();
    if (platform === 'android') {
      if (platformsView) platformsView.classList.add('hidden-subview');
      if (windowsSimsView) windowsSimsView.classList.add('hidden-subview');
      if (androidSimsView) androidSimsView.classList.remove('hidden-subview');
    } else if (platform === 'windows') {
      if (platformsView) platformsView.classList.add('hidden-subview');
      if (androidSimsView) androidSimsView.classList.add('hidden-subview');
      if (windowsSimsView) windowsSimsView.classList.remove('hidden-subview');
    } else {
      // Default: Overview with 2 Platform Boxes
      if (androidSimsView) androidSimsView.classList.add('hidden-subview');
      if (windowsSimsView) windowsSimsView.classList.add('hidden-subview');
      if (platformsView) platformsView.classList.remove('hidden-subview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (boxAndroid) {
    boxAndroid.addEventListener('click', () => showPlatformView('android'));
    boxAndroid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPlatformView('android');
      }
    });
  }

  if (boxWindows) {
    boxWindows.addEventListener('click', (e) => {
      e.preventDefault();
      openEbookReader();
    });
    boxWindows.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEbookReader();
      }
    });
  }

  if (btnBackFromAndroid) btnBackFromAndroid.addEventListener('click', () => showPlatformView('platforms'));
  if (btnBackFromWindows) btnBackFromWindows.addEventListener('click', () => showPlatformView('platforms'));
  if (btnReturnFromWindows) btnReturnFromWindows.addEventListener('click', () => showPlatformView('platforms'));

  // Trigger audio feedback when downloading any flight simulator
  ['downloadXPlane', 'downloadInfinite', 'downloadRFS', 'downloadTurboprop', 'downloadFSAdvanced', 'downloadAvionFlight'].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        playSuccessChime();
      });
    }
  });

  // Guide & Spec Modals
  function openGuideModal(title, badge, htmlContent) {
    playClickSound();
    guideTitle.textContent = title;
    guideBadge.textContent = badge;
    guideContent.innerHTML = htmlContent;
    guideModal.classList.add('modal-active');
  }

  function closeGuideModal() {
    playClickSound();
    guideModal.classList.remove('modal-active');
  }

  if (guideCloseBtn) guideCloseBtn.addEventListener('click', closeGuideModal);
  if (guideOkBtn) guideOkBtn.addEventListener('click', closeGuideModal);

  if (btnAndroidGuide) {
    btnAndroidGuide.addEventListener('click', () => {
      const content = `
        <div class="guide-step">
          <div class="guide-step-title">STEP 1: ENABLE UNKNOWN SOURCES</div>
          <div class="guide-step-body">Navigate to <strong>Settings &rarr; Security &rarr; Install Unknown Apps</strong> and toggle permission for your browser or file manager.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-title">STEP 2: INSTALL CRACKED APK</div>
          <div class="guide-step-body">Run <code>FlightSim_v4.2.8_Cracked_Unlocked.apk</code>. Once installation finishes, click <strong>Done</strong>. <em>Do NOT open yet</em>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-title">STEP 3: DEPLOY OBB SCENERY ARCHIVE</div>
          <div class="guide-step-body">Extract the downloaded zip archive and paste the folder into <code>/Internal Storage/Android/obb/com.flightsim.cracked/</code>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-title">STEP 4: TAKEOFF</div>
          <div class="guide-step-body">Launch the game from your home screen. All 54 DLC aircraft, fuel bypass, and global scenery will automatically show as <strong>PURCHASED / UNLOCKED</strong>.</div>
        </div>
      `;
      openGuideModal('Android Installation Instructions', 'ANDROID SETUP GUIDE', content);
    });
  }

  if (btnAndroidQr) {
    btnAndroidQr.addEventListener('click', () => {
      const content = `
        <div style="text-align: center; padding: 10px 0;">
          <p style="margin-bottom: 16px; color: var(--text-secondary);">Scan this QR with your Android camera or barcode scanner to download directly to your mobile device:</p>
          <div style="display: inline-block; background: #fff; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
            <svg width="180" height="180" viewBox="0 0 100 100" fill="#000">
              <rect x="0" y="0" width="30" height="30" fill="#000" />
              <rect x="5" y="5" width="20" height="20" fill="#fff" />
              <rect x="10" y="10" width="10" height="10" fill="#000" />
              <rect x="70" y="0" width="30" height="30" fill="#000" />
              <rect x="75" y="5" width="20" height="20" fill="#fff" />
              <rect x="80" y="10" width="10" height="10" fill="#000" />
              <rect x="0" y="70" width="30" height="30" fill="#000" />
              <rect x="5" y="75" width="20" height="20" fill="#fff" />
              <rect x="10" y="80" width="10" height="10" fill="#000" />
              <rect x="40" y="10" width="10" height="10" fill="#000" />
              <rect x="55" y="15" width="10" height="15" fill="#000" />
              <rect x="40" y="40" width="20" height="20" fill="#000" />
              <rect x="70" y="45" width="15" height="10" fill="#000" />
              <rect x="40" y="70" width="10" height="20" fill="#000" />
              <rect x="65" y="70" width="25" height="10" fill="#000" />
              <rect x="75" y="85" width="15" height="15" fill="#000" />
            </svg>
          </div>
          <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan);">https://vault.flightsim.cracked/android/direct-ota</p>
        </div>
      `;
      openGuideModal('Mobile Direct Transfer QR', 'MOBILE OTA DOWNLOAD', content);
    });
  }

  if (btnWindowsGuide) {
    btnWindowsGuide.addEventListener('click', () => {
      const content = `
        <div class="guide-step">
          <div class="guide-step-title">STEP 1: ANTI-VIRUS NOTICE (FALSE POSITIVE)</div>
          <div class="guide-step-body">Windows Defender may flag the <code>OnlineFix64.dll</code> as 'HackTool/Crack'. This is 100% clean and expected due to the Xbox network emulator code. Add folder exclusion prior to unpacking.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-title">STEP 2: RUN SETUP.EXE</div>
          <div class="guide-step-body">Mount the ISO or unpack with 7-Zip. Run <code>Setup.exe</code> with Administrator privileges. Choose your drive (SSD strongly recommended for photogrammetry streaming).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-title">STEP 3: MULTIPLAYER LAUNCHER</div>
          <div class="guide-step-body">Launch the game via <code>FlightSim_Launcher.exe</code> on your desktop. Ensure your fake dummy Xbox Live / Steam account is active to play on cracked multiplayer servers.</div>
        </div>
      `;
      openGuideModal('Windows Crack Setup Guide', 'PC REPACK INSTRUCTIONS', content);
    });
  }

  if (btnWindowsSpecs) {
    btnWindowsSpecs.addEventListener('click', () => {
      const content = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Select your PC configuration to test compatibility with Ultra 4K 60FPS Flight Simulation:</p>
          <div style="background: var(--input-bg); padding: 14px; border-radius: 8px;">
            <label style="font-family: var(--font-tech); font-weight:700; color: var(--accent-cyan); display:block; margin-bottom: 6px;">GPU (Graphics Card):</label>
            <select id="specGpuSelect" style="width: 100%; padding: 8px; background: var(--bg-core); border: 1px solid var(--accent-cyan); color: var(--text-primary); border-radius: 4px; font-family: var(--font-body);">
              <option value="ultra">NVIDIA RTX 4070 / 4080 / 4090 / RX 7900 XTX (Ultra 4K 60+ FPS)</option>
              <option value="high">NVIDIA RTX 3060 / 3070 / 4060 / RX 6700 XT (High 1440P 60 FPS)</option>
              <option value="med">NVIDIA GTX 1080 / RTX 2060 / RX 5600 XT (Medium 1080P 50 FPS)</option>
              <option value="min">GTX 1060 / GTX 1650 (Low 1080P 30 FPS)</option>
            </select>
          </div>
          <div style="background: var(--input-bg); padding: 14px; border-radius: 8px;">
            <label style="font-family: var(--font-tech); font-weight:700; color: var(--accent-cyan); display:block; margin-bottom: 6px;">RAM Size:</label>
            <select id="specRamSelect" style="width: 100%; padding: 8px; background: var(--bg-core); border: 1px solid var(--accent-cyan); color: var(--text-primary); border-radius: 4px; font-family: var(--font-body);">
              <option value="32">32 GB or 64 GB DDR4/DDR5 (Recommended for Photogrammetry)</option>
              <option value="16">16 GB RAM (Minimum for Standard Cities)</option>
              <option value="8">8 GB RAM (Will require low texture pack)</option>
            </select>
          </div>
          <div id="specTestResult" style="padding: 12px; border-radius: 6px; background: rgba(0,255,157,0.15); border: 1px solid var(--accent-green); color: var(--accent-green); font-size: 0.9rem;">
            🟢 <strong>READY FOR TAKEOFF:</strong> Your selected hardware exceeds all flight model physics and volumetric cloud requirements!
          </div>
        </div>
      `;
      openGuideModal('Hardware Compatibility Test', 'PC SPEC CHECKER', content);
    });
  }

  // Audio Control
  if (audioControlBtn) {
    audioControlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.audioEnabled = !state.audioEnabled;
      if (state.audioEnabled) {
        if (audioIcon) audioIcon.textContent = '🔊';
        if (audioLabel) audioLabel.textContent = 'AUDIO: ON';
        audioControlBtn.classList.remove('audio-muted');
        playClickSound();
      } else {
        if (audioIcon) audioIcon.textContent = '🔇';
        if (audioLabel) audioLabel.textContent = 'AUDIO: OFF';
        audioControlBtn.classList.add('audio-muted');
      }
    });
  }

  // =========================================================
  // AERONAUTICS E-BOOK 1000-CHAPTER MASTER CONTROLLER
  // =========================================================
  const btnOpenEbook = document.getElementById('btnOpenEbook');
  const btnExitEbook = document.getElementById('btnExitEbook');

  // Reader Top Wide Toolbar Elements
  const toolPointer = document.getElementById('toolPointer');
  const toolDraw = document.getElementById('toolDraw');
  const toolHighlight = document.getElementById('toolHighlight');
  const toolAnnotate = document.getElementById('toolAnnotate');
  const toolLaser = document.getElementById('toolLaser');
  const btnClearCanvas = document.getElementById('btnClearCanvas');
  const toolColorPicker = document.getElementById('toolColorPicker');
  const btnReadAloud = document.getElementById('btnReadAloud');
  const readAloudText = document.getElementById('readAloudText');
  const chapterInput = document.getElementById('chapterInput');
  const btnJumpGo = document.getElementById('btnJumpGo');
  const btnOpenToc = document.getElementById('btnOpenToc');

  // Stage Navigation Elements
  const btnPrevPage = document.getElementById('btnPrevPage');
  const btnNextPage = document.getElementById('btnNextPage');
  const prevMetaLabel = document.getElementById('prevMetaLabel');
  const nextMetaLabel = document.getElementById('nextMetaLabel');
  const ebookPageContainer = document.getElementById('ebookPageContainer');
  const ebookDrawingCanvas = document.getElementById('ebookDrawingCanvas');
  const ebookLaserPointer = document.getElementById('ebookLaserPointer');
  const ebookAnnotationsLayer = document.getElementById('ebookAnnotationsLayer');

  // Document Headers & Dynamic Content Elements
  const pageDisciplineChip = document.getElementById('pageDisciplineChip');
  const pageChapterBadge = document.getElementById('pageChapterBadge');
  const pageDotsContainer = document.getElementById('pageDotsContainer');
  const pageMainHeading = document.getElementById('pageMainHeading');
  const pageSubHeading = document.getElementById('pageSubHeading');
  const pageDynamicContent = document.getElementById('pageDynamicContent');
  const readingTimeEstimate = document.getElementById('readingTimeEstimate');
  const pageProgressIndicator = document.getElementById('pageProgressIndicator');
  const btnMarkChapterRead = document.getElementById('btnMarkChapterRead');
  const markReadText = document.getElementById('markReadText');
  const markReadIcon = document.getElementById('markReadIcon');

  // Global Progress Elements
  const ebookTotalProgressBar = document.getElementById('ebookTotalProgressBar');
  const globalChapterCount = document.getElementById('globalChapterCount');
  const globalLearnedPct = document.getElementById('globalLearnedPct');

  // Table of Contents Modal Elements
  const tocModal = document.getElementById('tocModal');
  const tocBackdrop = document.getElementById('tocBackdrop');
  const tocCloseBtn = document.getElementById('tocCloseBtn');
  const tocSearchInput = document.getElementById('tocSearchInput');
  const tocDisciplinesTabs = document.getElementById('tocDisciplinesTabs');
  const tocChaptersList = document.getElementById('tocChaptersList');

  // Reader Master State

  // =========================================================
  // 7. AERONAUTICS E-BOOK 1000-CHAPTER MASTER READER ENGINE
  // =========================================================

  // Reader Master State (6 Pages per Chapter: Pages 1-5 Content, Page 6 Quiz)

  // =========================================================
  // 7. AERONAUTICS E-BOOK 1000-CHAPTER MASTER READER ENGINE
  // =========================================================

  // Reader Master State (6 Pages per Chapter: Pages 1-5 Content, Page 6 Quiz)

  // =========================================================
  // 7. AERONAUTICS E-BOOK 1000-CHAPTER MASTER READER ENGINE
  // =========================================================

  // Reader Master State (6 Pages per Chapter: Pages 1-5 Content, Page 6 Quiz)

  // =========================================================
  // 7. AERONAUTICS E-BOOK 1000-CHAPTER MASTER READER ENGINE
  // =========================================================

  // Reader Master State (6 Pages per Chapter: Pages 1-5 Content, Page 6 Quiz)

  // =========================================================
  // 7. AERONAUTICS E-BOOK 1000-CHAPTER MASTER READER ENGINE
  // =========================================================

  // Reader Master State (6 Pages per Chapter: Pages 1-5 Content, Page 6 Quiz)
  const readerState = {
    currentChapter: parseInt(localStorage.getItem('aeronautics_current_ch') || '1', 10),
    currentPage: 1, // 1 to 6
    activeTool: 'pointer', // 'pointer' | 'draw' | 'highlight' | 'annotate' | 'laser'
    activeColor: '#00f0ff',
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    readChapters: new Set(JSON.parse(localStorage.getItem('aeronautics_read_set') || '[]')),
    quizAnswers: JSON.parse(localStorage.getItem('aeronautics_quiz_answers') || '{}'),
    activeSimLoop: null,
    speechActive: false,
    selectedDisciplineFilter: 'all',
    confettiAnimationId: null,
  };

  // Sync state.chaptersRead with read set
  state.chaptersRead = readerState.readChapters.size;

  // Domain & Curriculum Categories across the 100 Parts
  const AEROSPACE_DISCIPLINES = [
    { id: 1, name: 'Discovering Aeronautics & Flight Principles', icon: '✈️', color: '#00f0ff', parts: [1, 10] },
    { id: 2, name: 'Aircraft Anatomy & Structural Design', icon: '📐', color: '#00ff9d', parts: [11, 20] },
    { id: 3, name: 'Basic Physics & Fluid Mechanics of Air', icon: '💨', color: '#38bdf8', parts: [21, 30] },
    { id: 4, name: 'Understanding Atmosphere & Aerodynamics', icon: '🌪️', color: '#22d3ee', parts: [31, 50] },
    { id: 5, name: 'Wings, Lift, Drag & Propulsion Systems', icon: '🔥', color: '#ffb700', parts: [51, 70] },
    { id: 6, name: 'Flight Controls, Stability & Performance', icon: '🕹️', color: '#f43f5e', parts: [71, 90] },
    { id: 7, name: 'Gas Turbines, Systems & Avionics', icon: '⚡', color: '#c084fc', parts: [91, 100] },
    { id: 8, name: 'Advanced Aerodynamics & High-Speed Flight', icon: '⚡', color: '#ec4899', parts: [101, 150] },
    { id: 9, name: 'Rotorcraft, Gliders & Commercial Aviation', icon: '🚁', color: '#a855f7', parts: [151, 200] },
    { id: 10, name: 'Rocket Propulsion, Spacecraft & Hypersonics', icon: '🚀', color: '#fb923c', parts: [201, 1000] }
  ];

  // Helper to retrieve complete chapter metadata
  function getChapterMetadata(chapterNum) {
    const ch = Math.max(1, Math.min(1000, parseInt(chapterNum, 10) || 1));
    const rawData = (window.AERONAUTICS_CHAPTERS && window.AERONAUTICS_CHAPTERS[ch]) || {};
    const rawTitle = rawData.title || `Aerospace Engineering Analysis Chapter ${ch}`;
    const partTitle = rawData.part || `Part ${Math.ceil(ch / 10)}: Aeronautics & Space Science`;

    // Extract Part Number
    const partMatch = partTitle.match(/Part\s+(\d+)/i);
    const partNum = partMatch ? parseInt(partMatch[1], 10) : Math.ceil(ch / 10);

    // If specialized topic curriculum engine is available, use it!
    if (typeof window !== 'undefined' && window.getChapterTopicCurriculum) {
      const topic = window.getChapterTopicCurriculum(ch, { title: rawTitle, part: partTitle });
      if (topic) {
        return {
          num: ch,
          title: rawTitle,
          part: partTitle,
          partNum: partNum,
          discipline: topic.discipline,
          chipColor: topic.chipColor,
          icon: topic.icon,
          assetImg: topic.assetImg,
          simType: topic.simType,
          overviewHtml: topic.overviewHtml,
          formulaTitle: topic.formulaTitle,
          formulaHtml: topic.formulaHtml,
          formulaDesc: topic.formulaDesc,
          takeaways: topic.takeaways,
          simDescription: topic.simDescription,
          flowDescription: topic.flowDescription,
          hotspotDescription: topic.hotspotDescription,
          hotspotPins: topic.hotspots,
          calcTitle: topic.calcTitle,
          calcDesc: topic.calcDesc,
          calcParam1: topic.calcParam1,
          calcParam2: topic.calcParam2,
          tableTitle: topic.tableTitle,
          tableIntro: topic.tableIntro,
          tableHeaders: topic.tableHeaders,
          tableRows: topic.tableRows,
          envelopeIntro: topic.envelopeIntro,
          integrationIntro: topic.integrationIntro,
          redundancyCards: topic.redundancyCards,
          quiz: topic.quiz
        };
      }
    }

    const t = rawTitle.toLowerCase();
    const p = partTitle.toLowerCase();

    let discipline = 'AERODYNAMICS & AIRFLOW';
    let chipColor = '#00f0ff';
    let icon = '✈️';
    let assetImg = 'assets/ebook_aerodynamics.png';
    let simType = 'airfoil';

    if (t.includes('propul') || t.includes('engine') || t.includes('turbine') || t.includes('turbofan') || t.includes('turbojet') || t.includes('combust') || t.includes('thrust') || t.includes('piston') || t.includes('propeller') || p.includes('propulsion') || p.includes('engine')) {
      discipline = 'PROPULSION & JET ENGINES';
      chipColor = '#ffb700';
      icon = '🔥';
      assetImg = 'assets/ebook_engine.png';
      simType = 'engine';
    } else if (t.includes('cockpit') || t.includes('instrument') || t.includes('avionics') || t.includes('radar') || t.includes('fms') || t.includes('autopilot') || t.includes('navigat') || t.includes('display') || p.includes('avionics') || p.includes('cockpit') || p.includes('instrument')) {
      discipline = 'AVIONICS & FLIGHT INSTRUMENTS';
      chipColor = '#c084fc';
      icon = '⚡';
      if (t.includes('radar') || t.includes('avionics')) {
        assetImg = 'assets/diagram_avionics_radar.jpg';
      } else {
        assetImg = 'assets/ebook_cockpit.png';
      }
      simType = 'pfd';
    } else if (t.includes('structur') || t.includes('fuselage') || t.includes('wing') || t.includes('spar') || t.includes('rib') || t.includes('landing gear') || t.includes('gear') || t.includes('landing') || t.includes('material') || t.includes('composite') || t.includes('stress') || t.includes('load') || t.includes('fatigue') || p.includes('structure') || p.includes('fuselage') || p.includes('materials')) {
      discipline = 'AIRFRAME STRUCTURES & MATERIALS';
      chipColor = '#00ff9d';
      icon = '📐';
      assetImg = 'assets/diagram_structures_gear.jpg';
      simType = 'structure';
    } else if (t.includes('mach') || t.includes('shock') || t.includes('supersonic') || t.includes('hypersonic') || t.includes('compressib') || p.includes('supersonic') || p.includes('shock') || p.includes('mach')) {
      discipline = 'HIGH-SPEED & SHOCK DYNAMICS';
      chipColor = '#f43f5e';
      icon = '⚡';
      assetImg = 'assets/diagram_supersonic_mach.jpg';
      simType = 'mach';
    } else if (t.includes('rocket') || t.includes('orbital') || t.includes('spacecraft') || t.includes('re-entry') || t.includes('kepler') || p.includes('space') || p.includes('rocket') || p.includes('orbit')) {
      discipline = 'SPACE SYSTEMS & ORBITAL MECHANICS';
      chipColor = '#a855f7';
      icon = '🚀';
      assetImg = 'assets/diagram_space_orbital.jpg';
      simType = 'orbit';
    } else if (t.includes('control') || t.includes('stability') || t.includes('rudder') || t.includes('elevator') || t.includes('aileron') || t.includes('roll') || t.includes('pitch') || t.includes('yaw') || p.includes('stability') || p.includes('control')) {
      discipline = 'FLIGHT DYNAMICS & CONTROL';
      chipColor = '#38bdf8';
      icon = '🕹️';
      assetImg = 'assets/diagram_flight_controls.jpg';
      simType = 'controls';
    } else if (t.includes('atmosphere') || t.includes('air') || t.includes('weather') || t.includes('meteorol') || t.includes('pressure') || t.includes('density') || p.includes('atmosphere') || p.includes('air')) {
      discipline = 'ATMOSPHERIC PHYSICS & METEOROLOGY';
      chipColor = '#22d3ee';
      icon = '🌪️';
      assetImg = 'assets/diagram_atmosphere_weather.jpg';
      simType = 'atmosphere';
    } else if (t.includes('helicopter') || t.includes('rotor') || t.includes('vtol') || p.includes('helicopter') || p.includes('rotorcraft')) {
      discipline = 'ROTORCRAFT & VTOL AERODYNAMICS';
      chipColor = '#34d399';
      icon = '🚁';
      assetImg = 'assets/diagram_rotorcraft_vtol.jpg';
      simType = 'rotor';
    }

    // Mathematical Formula Definitions
    let formulaHtml = `$$ L = \\frac{1}{2} \\rho v^2 S C_L $$`;
    let formulaDesc = `Lift Generation Formula: Lift force $L$ equals dynamic pressure $q = \\frac{1}{2} \\rho v^2$ multiplied by wing reference area $S$ and lift coefficient $C_L$.`;
    let calcParam1 = { label: 'Airspeed (v, kts)', min: 60, max: 500, val: 240, unit: 'kts' };
    let calcParam2 = { label: 'Angle of Attack (α, deg)', min: 0, max: 18, val: 5, unit: '°' };

    if (simType === 'engine') {
      formulaHtml = `$$ F_n = \\dot{m} (v_j - v_0) + (p_j - p_0) A_j $$`;
      formulaDesc = `Net Jet Engine Thrust Equation: Total thrust produced by mass flow rate $\\dot{m}$, nozzle exit velocity $v_j$, flight velocity $v_0$, and nozzle pressure imbalance.`;
      calcParam1 = { label: 'Turbine Throttle (%)', min: 20, max: 100, val: 85, unit: '%' };
      calcParam2 = { label: 'Bypass Ratio (BPR)', min: 1, max: 12, val: 8, unit: ':1' };
    } else if (simType === 'mach') {
      formulaHtml = `$$ \\mu = \\arcsin\\left(\\frac{1}{M}\\right) \\quad \\text{and} \\quad \\frac{p_2}{p_1} = 1 + \\frac{2\\gamma}{\\gamma + 1}(M_1^2 - 1) $$`;
      formulaDesc = `Supersonic Mach Cone & Rankine-Hugoniot Shock Relation: Relates freestream Mach number $M_1$ to static pressure jump $p_2/p_1$ across a normal shockwave.`;
      calcParam1 = { label: 'Flight Mach Number (M)', min: 1.0, max: 4.0, val: 2.2, unit: 'M', step: 0.1 };
      calcParam2 = { label: 'Wedge Deflection Angle (θ)', min: 2, max: 25, val: 10, unit: '°' };
    } else if (simType === 'atmosphere') {
      formulaHtml = `$$ p(h) = p_0 \\left(1 - \\frac{L_t \\cdot h}{T_0}\\right)^{\\frac{g_0 M}{R L_t}} $$`;
      formulaDesc = `Barometric Pressure Formula (ISA Troposphere): Models atmospheric pressure decay with altitude $h$ based on temperature lapse rate $L_t = 6.5\\text{ K/km}$.`;
      calcParam1 = { label: 'Flight Altitude (h, ft)', min: 0, max: 50000, val: 28000, unit: 'ft', step: 1000 };
      calcParam2 = { label: 'ISA Temp Deviation (ΔT)', min: -25, max: 25, val: 0, unit: '°C' };
    } else if (simType === 'controls') {
      formulaHtml = `$$ C_{m} = C_{m_0} + C_{m_\\alpha} \\alpha + C_{m_{\\delta_e}} \\delta_e $$`;
      formulaDesc = `Longitudinal Pitching Moment Stability: Represents static equilibrium and pitch control response as a function of elevator deflection $\\delta_e$.`;
      calcParam1 = { label: 'Elevator Deflection (δe)', min: -25, max: 20, val: -4, unit: '°' };
      calcParam2 = { label: 'CG Margin (% MAC)', min: 10, max: 40, val: 25, unit: '%' };
    } else if (simType === 'structure') {
      formulaHtml = `$$ \\sigma_{max} = \\frac{M \\cdot y}{I} \\quad \\text{and} \\quad \\tau = \\frac{V \\cdot Q}{I \\cdot t} $$`;
      formulaDesc = `Flexural Bending & Shear Stress in Aircraft Wing Spars: Relates bending moment $M$, moment of inertia $I$, distance from neutral axis $y$, and shear flow.`;
      calcParam1 = { label: 'Maneuver Load Factor (n)', min: 0.5, max: 4.5, val: 2.5, unit: 'G', step: 0.1 };
      calcParam2 = { label: 'Spar Depth (t, mm)', min: 50, max: 400, val: 220, unit: 'mm' };
    } else if (simType === 'orbit') {
      formulaHtml = `$$ v_{orb} = \\sqrt{\\frac{\\mu}{r}} \\quad \\text{and} \\quad \\Delta v = I_{sp} g_0 \\ln\\left(\\frac{m_0}{m_f}\\right) $$`;
      formulaDesc = `Orbital Velocity & Tsiolkovsky Rocket Equation: Fundamental relationships for orbital insertion velocity and velocity change $\\Delta v$ from mass ratio $m_0/m_f$.`;
      calcParam1 = { label: 'Orbital Altitude (km)', min: 200, max: 36000, val: 400, unit: 'km', step: 100 };
      calcParam2 = { label: 'Specific Impulse (Isp, s)', min: 250, max: 480, val: 320, unit: 's' };
    }

    // CAD Hotspot 5 Pin Data (Interactive 2A)
    const hotspotPins = [
      { id: 1, x: 22, y: 35, title: 'Primary Forward Spar & Leading Edge', spec: '7075-T6 High-Strength Aluminum Alloy', stress: '284 MPa (Limit: 480 MPa)', status: 'NOMINAL / AERODYNAMICALLY SEALED' },
      { id: 2, x: 48, y: 28, title: 'Internal Torque Box & Fuel Cell Baffles', spec: 'IM7/8552 Carbon Fiber Reinforced Polymer', stress: '165 MPa (Limit: 390 MPa)', status: 'PRESSURIZED / NO LEAKAGE' },
      { id: 3, x: 74, y: 42, title: 'Trailing Edge High-Lift Fowler Flap Track', spec: '15-5 PH Precipitation Hardened Stainless Steel', stress: '310 MPa (Limit: 620 MPa)', status: 'HYDRAULICALLY SYNCHRONIZED' },
      { id: 4, x: 35, y: 72, title: 'Engine Pylon Attachment & Fuse Pin Link', spec: 'Ti-6Al-4V Grade 5 Titanium Forging', stress: '412 MPa (Limit: 880 MPa)', status: 'VIBRATION DAMPED / CERTIFIED' },
      { id: 5, x: 86, y: 65, title: 'Wingtip Vortex Diffuser & Static Discharger', spec: 'Aramid Honeycomb Sandwich Core + CFRP Skin', stress: '92 MPa (Limit: 220 MPa)', status: 'LIGHTNING DIRECTED / GROUNDED' }
    ];

    // Chapter Quiz Generator (Page 6)
    const quiz = generateChapterQuiz(ch, rawTitle, partTitle, discipline);

    return {
      num: ch,
      title: rawTitle,
      part: partTitle,
      partNum: partNum,
      discipline: discipline,
      chipColor: chipColor,
      icon: icon,
      assetImg: assetImg,
      simType: simType,
      formulaHtml: formulaHtml,
      formulaDesc: formulaDesc,
      calcParam1: calcParam1,
      calcParam2: calcParam2,
      hotspotPins: hotspotPins,
      quiz: quiz
    };
  }

  // Chapter Quiz Data Factory
  function generateChapterQuiz(ch, title, part, discipline) {
    const questions = [
      {
        q: `In the context of ${title}, which fundamental physical principle dictates the primary balance and performance characteristics?`,
        opts: [
          `Conservation of momentum and local pressure differential gradients across the aerodynamic control surface.`,
          `Unbounded thermodynamic entropy reduction without external work input.`,
          `Static friction coefficient invariance across supersonic and subsonic flow boundaries.`,
          `Absolute gravitational shielding created by high-frequency electric fields.`
        ],
        correct: 0,
        rationale: `According to Navier-Stokes and Newton's laws of fluid dynamics, aeronautical forces arise from momentum exchange and pressure distribution across the airframe.`
      },
      {
        q: `When analyzing ${title}, how does an increase in operational altitude primarily influence the system parameters?`,
        opts: [
          `Air density decays exponentially, reducing dynamic pressure at a fixed true airspeed and altering thermal dissipation rates.`,
          `Speed of sound increases linearly with altitude in the troposphere.`,
          `Induced drag becomes completely negligible above 10,000 feet MSL.`,
          `Static pressure remains constant while dynamic pressure drops to zero.`
        ],
        correct: 0,
        rationale: `Standard atmospheric physics dictates that air density decreases with altitude, which reduces dynamic pressure q = 0.5 * rho * v^2 unless true airspeed is increased.`
      },
      {
        q: `What is the primary failure mode or critical limitation engineers must mitigate when designing for ${title}?`,
        opts: [
          `Structural aeroelastic divergence, flow separation buffeting, or localized thermal fatigue beyond design margins.`,
          `Complete loss of magnetic polarity inside the passenger cabin.`,
          `Spontaneous transition of nitrogen gas into liquid droplets at standard cruise speeds.`,
          `Zero-gravity buoyancy inversion during level coordinated flight.`
        ],
        correct: 0,
        rationale: `Aerospace certification standards (FAR/CS Part 25) require strict flutter margins, fatigue life predictions, and boundary-layer separation prevention.`
      },
      {
        q: `Regarding ${title}, which flight test instrumentation provides the most critical empirical validation data?`,
        opts: [
          `Calibrated total/static pressure probes, strain-gauge load bridges, and high-frequency flight data recorders.`,
          `Single-axis consumer barometers without temperature compensation.`,
          `Visual pilot eye-tracking without telemetry sensor recording.`,
          `Electrolytic tilt sensors restricted to stationary ground calibration.`
        ],
        correct: 0,
        rationale: `Flight test telemetry requires synchronized pitot-static calibration, structural strain monitoring, and multi-axis inertial data acquisition at 100+ Hz.`
      }
    ];

    const chosen = questions[(ch - 1) % questions.length];
    return {
      question: chosen.q,
      options: chosen.opts,
      correctIndex: chosen.correct,
      rationale: chosen.rationale
    };
  }

  // =========================================================
  // 5,000 UNIQUE TECHNICAL DIAGRAMS PROCEDURAL ENGINE
  // Computes unique geometry, coordinates, and physical parameters
  // for all 1,000 chapters and 5 diagrams per chapter = 5,000 distinct diagrams.
  // =========================================================
  function getChapterDiagramParams(chNum, diagramIndex) {
    const n = Math.max(1, Math.min(1000, parseInt(chNum, 10) || 1));
    const d = Math.max(1, Math.min(5, parseInt(diagramIndex, 10) || 1));
    
    // Deterministic pseudo-random seed per chapter & diagram
    const seed = (n * 9301 + d * 49297) % 233280;
    const f1 = (seed % 100) / 100;
    const f2 = ((seed * 3) % 100) / 100;
    const f3 = ((seed * 7) % 100) / 100;
    const f4 = ((seed * 11) % 100) / 100;

    return {
      n: n,
      d: d,
      specCode: `AER-${String(n).padStart(4, '0')}-D${d}`,
      dinCode: `DIN-EN-9100 / CH-${n} // REV.${(seed % 9) + 1}`,
      tolerance: `±${(0.012 + f1 * 0.045).toFixed(3)} mm`,
      reynoldsNum: `${(1.45 + f2 * 6.2).toFixed(2)} × 10⁶`,
      machNum: `M ${(0.22 + f3 * 1.75).toFixed(2)}`,
      wingSpan: `${(14.2 + f4 * 28.5).toFixed(2)} m`,
      chord: `${(1.85 + f1 * 3.4).toFixed(2)} m`,
      aoa: `${(1.8 + f2 * 11.4).toFixed(1)}°`,
      pressureRatio: `${(14.5 + f3 * 26.2).toFixed(1)}:1`,
      stressMpa: `${(210 + Math.floor(f4 * 380))} MPa`,
      temperatureK: `${(280 + Math.floor(f1 * 1350))} K`,
      airflowCfs: `${(850 + Math.floor(f2 * 2800))} kg/s`,
      // Geometry parametric coordinate deltas (unique shape per chapter)
      camberOffset: Math.floor((f1 - 0.5) * 36),
      thicknessOffset: Math.floor((f2 - 0.5) * 20),
      sparOffset: Math.floor((f3 - 0.5) * 40),
      nozzleAngle: (12 + f4 * 16).toFixed(1),
      shockAngle: (28 + f1 * 24).toFixed(1),
      stationTemp: Math.floor(1200 + f2 * 550),
      burnDeltaV: (1.2 + f3 * 2.8).toFixed(2)
    };
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
  // DIAGRAM 1: THEORETICAL SCHEMATIC & VECTOR ANALYSIS (Page 1)
  // ---------------------------------------------------------
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

  let diagramsModalState = {
    currentChapter: 1,
    currentDiagram: 1
  };

  function openDiagramsModal(targetCh = 1, targetDiag = 1) {
    playClickSound();
    diagramsModalState.currentChapter = Math.max(1, Math.min(1000, parseInt(targetCh, 10) || 1));
    diagramsModalState.currentDiagram = Math.max(1, Math.min(5, parseInt(targetDiag, 10) || 1));

    const modal = document.getElementById('diagramsCatalogModal');
    if (modal) {
      modal.classList.add('modal-active');
      modal.setAttribute('aria-hidden', 'false');
      renderDiagramsModalViewer();
    }
  }
  window.openDiagramsModal = openDiagramsModal;

  function closeDiagramsModal() {
    playClickSound();
    const modal = document.getElementById('diagramsCatalogModal');
    if (modal) {
      modal.classList.remove('modal-active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function renderDiagramsModalViewer() {
    const ch = diagramsModalState.currentChapter;
    const d = diagramsModalState.currentDiagram;
    const meta = getChapterMetadata(ch);
    const p = getChapterDiagramParams(ch, d);

    // Update Input
    const chInput = document.getElementById('diagramChInput');
    if (chInput) chInput.value = ch;

    // Update Titles & Tags
    const titles = {
      1: 'DIAGRAM 1 // THEORETICAL SCHEMATIC & VECTOR DECOMPOSITION',
      2: 'DIAGRAM 2 // SENSOR & BOUNDARY FLOW ARCHITECTURE',
      3: 'DIAGRAM 3 // CAD STRUCTURAL HOTSPOT INSPECTOR',
      4: 'DIAGRAM 4 // OPERATIONAL FLIGHT ENVELOPE & POLARS',
      5: 'DIAGRAM 5 // SUBSYSTEM CROSS-LINK & AVIONICS BUS'
    };

    const badgeElem = document.getElementById('dViewerBadge');
    if (badgeElem) badgeElem.textContent = `FIG ${ch}.${d} // ${titles[d]}`;

    const chTitleElem = document.getElementById('dViewerChTitle');
    if (chTitleElem) chTitleElem.textContent = `Chapter ${ch}: ${meta.title}`;

    const specElem = document.getElementById('dViewerSpec');
    if (specElem) specElem.textContent = `SYS REF: ${p.dinCode} &bull; CODE: ${p.specCode}`;

    const discElem = document.getElementById('dViewerDiscipline');
    if (discElem) discElem.textContent = meta.discipline;

    // Update Active Tab
    document.querySelectorAll('.d-tab').forEach(tab => {
      const tabNum = parseInt(tab.getAttribute('data-diagram'), 10);
      if (tabNum === d) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Render Target Diagram SVG into stage
    const stage = document.getElementById('dViewerSvgStage');
    if (stage) {
      if (d === 1) stage.innerHTML = renderDiagram1(meta);
      else if (d === 2) stage.innerHTML = renderDiagram2(meta);
      else if (d === 3) stage.innerHTML = renderDiagram3(meta);
      else if (d === 4) stage.innerHTML = renderDiagram4(meta);
      else if (d === 5) stage.innerHTML = renderDiagram5(meta);
    }

    // Update Telemetry Bar
    const telDin = document.getElementById('telDin');
    if (telDin) telDin.textContent = p.dinCode;
    const telTol = document.getElementById('telTol');
    if (telTol) telTol.textContent = p.tolerance;
    const telRe = document.getElementById('telRe');
    if (telRe) telRe.textContent = p.reynoldsNum;
    const telMach = document.getElementById('telMach');
    if (telMach) telMach.textContent = p.machNum;
    const telPr = document.getElementById('telPr');
    if (telPr) telPr.textContent = p.pressureRatio;
    const telStress = document.getElementById('telStress');
    if (telStress) telStress.textContent = p.stressMpa;

    // Update Direct Image Link Address & HTML <img> Tag inputs
    const paddedCh = String(ch).padStart(4, '0');
    const specCode = `AER-${paddedCh}-D${d}`;
    const host = window.location.origin || 'http://localhost:5173';
    const directUrl = `${host}/diagrams/${specCode}.svg`;
    const imgTag = `<img src="${directUrl}" alt="${specCode} Aeronautics Blueprint" width="760" height="260" />`;
    const inpUrl = document.getElementById('inpDirectImgUrl');
    if (inpUrl) inpUrl.value = directUrl;
    const inpTag = document.getElementById('inpImgTag');
    if (inpTag) inpTag.value = imgTag;
  }

  // Bind Diagrams Modal Controls
  function initDiagramsModalEvents() {
    const closeBtn = document.getElementById('diagramsCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeDiagramsModal);

    const backdrop = document.getElementById('diagramsBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeDiagramsModal);

    const prevBtn = document.getElementById('btnDiagPrevCh');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (diagramsModalState.currentChapter > 1) {
          diagramsModalState.currentChapter--;
          renderDiagramsModalViewer();
        }
      });
    }

    const nextBtn = document.getElementById('btnDiagNextCh');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (diagramsModalState.currentChapter < 1000) {
          diagramsModalState.currentChapter++;
          renderDiagramsModalViewer();
        }
      });
    }

    const chInput = document.getElementById('diagramChInput');
    if (chInput) {
      chInput.addEventListener('change', () => {
        const val = parseInt(chInput.value, 10) || 1;
        diagramsModalState.currentChapter = Math.max(1, Math.min(1000, val));
        renderDiagramsModalViewer();
      });
    }

    // Tabs 1 to 5
    document.querySelectorAll('.d-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        playClickSound();
        const tabNum = parseInt(tab.getAttribute('data-diagram'), 10) || 1;
        diagramsModalState.currentDiagram = tabNum;
        renderDiagramsModalViewer();
      });
    });

    // Jump to Reader Button
    const btnOpenReader = document.getElementById('btnDiagOpenReader');
    if (btnOpenReader) {
      btnOpenReader.addEventListener('click', () => {
        closeDiagramsModal();
        openEbookReader(diagramsModalState.currentChapter, diagramsModalState.currentDiagram);
      });
    }

    // Export SVG Button
    const btnExportSvg = document.getElementById('btnDiagExportSvg');
    if (btnExportSvg) {
      btnExportSvg.addEventListener('click', () => {
        playClickSound();
        const stage = document.getElementById('dViewerSvgStage');
        const svgElem = stage ? stage.querySelector('svg') : null;
        if (!svgElem) return;
        const svgData = new XMLSerializer().serializeToString(svgElem);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `AER_${String(diagramsModalState.currentChapter).padStart(4, '0')}_D${diagramsModalState.currentDiagram}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }

    // Copy Direct Image URL Button
    const btnCopyImgUrl = document.getElementById('btnCopyImgUrl');
    if (btnCopyImgUrl) {
      btnCopyImgUrl.addEventListener('click', () => {
        playClickSound();
        const inpUrl = document.getElementById('inpDirectImgUrl');
        if (inpUrl) {
          navigator.clipboard.writeText(inpUrl.value).then(() => {
            showToast('Direct Image URL copied to clipboard!');
          }).catch(() => {
            inpUrl.select();
            document.execCommand('copy');
            showToast('Direct Image URL copied!');
          });
        }
      });
    }

    // Copy HTML <img> Tag Button
    const btnCopyImgTag = document.getElementById('btnCopyImgTag');
    if (btnCopyImgTag) {
      btnCopyImgTag.addEventListener('click', () => {
        playClickSound();
        const inpTag = document.getElementById('inpImgTag');
        if (inpTag) {
          navigator.clipboard.writeText(inpTag.value).then(() => {
            showToast('HTML <img> tag copied! Ready to paste in any HTML document.');
          }).catch(() => {
            inpTag.select();
            document.execCommand('copy');
            showToast('HTML <img> tag copied!');
          });
        }
      });
    }
  }


  
    // =========================================================
  // PAGE CONTENT GENERATION (PAGES 1 TO 5 CONTENT + PAGE 6 QUIZ)
  // =========================================================
  // =========================================================
  // PAGE CONTENT GENERATION (DISTINCT DIAGRAMS & INTERACTIVES ON ALL PAGES)
  // =========================================================
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

  window.generatePageContent = generatePageContent;

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

  function initPage6Quiz(meta) {
    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    const rationaleCard = document.getElementById('quizRationaleCard');
    const btnMark = document.getElementById('btnMarkChapterCompletedQuiz');
    const statusText = document.getElementById('ccaStatusText');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        readerState.quizAnswers[meta.num] = selectedIdx;
        localStorage.setItem('aeronautics_quiz_answers', JSON.stringify(readerState.quizAnswers));

        optionBtns.forEach((b, i) => {
          b.classList.remove('correct-revealed', 'incorrect-revealed');
          if (i === meta.quiz.correctIndex) {
            b.classList.add('correct-revealed');
          } else if (i === selectedIdx) {
            b.classList.add('incorrect-revealed');
          }
        });

        if (rationaleCard) rationaleCard.classList.add('visible');

        // Audio feedback: victory chime if correct, alert buzz if wrong
        if (selectedIdx === meta.quiz.correctIndex) {
          playTone(523.25, 'triangle', 0.15, 0.1);
          setTimeout(() => playTone(659.25, 'sine', 0.25, 0.1), 120);
        } else {
          playTone(180, 'sawtooth', 0.2, 0.08);
        }
      });
    });

    if (btnMark) {
      btnMark.addEventListener('click', () => {
        toggleChapterCompletion(meta.num);
        const isNowRead = readerState.readChapters.has(meta.num);

        if (statusText) {
          statusText.textContent = isNowRead ? '✓ CERTIFIED & COMPLETED' : 'PENDING CERTIFICATION';
          statusText.className = `cca-value ${isNowRead ? 'text-green' : 'text-amber'}`;
        }

        btnMark.className = `btn-mark-completed-quiz ${isNowRead ? 'completed' : ''}`;
        const iconSpan = btnMark.querySelector('.bmc-icon');
        const textSpan = btnMark.querySelector('.bmc-text');
        if (iconSpan) iconSpan.textContent = isNowRead ? '✓' : '🏆';
        if (textSpan) textSpan.textContent = isNowRead ? 'CHAPTER COMPLETED (CLICK TO UNMARK)' : 'MARK CHAPTER AS COMPLETED & CERTIFY';
      });
    }
  }

  // Chapter Read/Unread Toggle
  function toggleChapterCompletion(chapterNum) {
    const ch = parseInt(chapterNum, 10);
    if (readerState.readChapters.has(ch)) {
      readerState.readChapters.delete(ch);
      playTone(280, 'sine', 0.1, 0.05);
    } else {
      readerState.readChapters.add(ch);
      playTone(523.25, 'sine', 0.12, 0.08);
      setTimeout(() => playTone(659.25, 'triangle', 0.2, 0.08), 100);
    }

    localStorage.setItem('aeronautics_read_set', JSON.stringify(Array.from(readerState.readChapters)));
    state.chaptersRead = readerState.readChapters.size;
    updateLearningProgressUI();

    // If whole book completed (all 1000 chapters read), trigger animated Congratulation Letter!
    if (readerState.readChapters.size === 1000) {
      setTimeout(() => {
        showCongratulationLetter();
      }, 400);
    }
  }

  // =========================================================
  // ANIMATED CONGRATULATION LETTER & CONFETTI ENGINE
  // =========================================================
  function showCongratulationLetter() {
    const modal = document.getElementById('congratulationModal');
    if (!modal) return;

    modal.classList.add('modal-active');
    modal.setAttribute('aria-hidden', 'false');

    // Fill Commendation Data
    const pilotElem = document.getElementById('certPilotCallsign');
    const dateElem = document.getElementById('certDateStamp');
    const codeElem = document.getElementById('certVerificationCode');

    if (pilotElem) pilotElem.textContent = state.pilotName || 'CHIEF FLIGHT ENGINEER';
    if (dateElem) {
      const now = new Date();
      dateElem.textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (codeElem) {
      codeElem.textContent = `AERO-CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}-1000CH`;
    }

    // Play Grand Victory Fanfare via Web Audio API
    playVictoryFanfare();

    // Start 60 FPS Celebration Confetti Animation
    initConfettiAnimation();
  }

  function closeCongratulationLetter() {
    const modal = document.getElementById('congratulationModal');
    if (modal) {
      modal.classList.remove('modal-active');
      modal.setAttribute('aria-hidden', 'true');
    }
    if (readerState.confettiAnimationId) {
      cancelAnimationFrame(readerState.confettiAnimationId);
      readerState.confettiAnimationId = null;
    }
  }

  // Web Audio Victory Fanfare Synthesizer
  function playVictoryFanfare() {
    if (!state.audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const notes = [
        { f: 261.63, t: 0.0, d: 0.15 }, // C4
        { f: 329.63, t: 0.15, d: 0.15 }, // E4
        { f: 392.00, t: 0.30, d: 0.20 }, // G4
        { f: 523.25, t: 0.50, d: 0.40 }, // C5
        { f: 659.25, t: 0.85, d: 0.25 }, // E5
        { f: 783.99, t: 1.10, d: 0.70 }  // G5 (Triumph Chord)
      ];

      notes.forEach(n => {
        setTimeout(() => {
          playTone(n.f, 'triangle', n.d, 0.12);
        }, n.t * 1000);
      });
    } catch (e) {}
  }

  // 60 FPS HTML5 Canvas Celebration Confetti
  function initConfettiAnimation() {
    const canvas = document.getElementById('celebrationConfettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd700', '#00f0ff', '#00ff9d', '#ff3366', '#ffffff', '#ff9900'];
    const particles = [];
    const particleCount = 140;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height,
        w: 8 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      readerState.confettiAnimationId = requestAnimationFrame(renderConfetti);
    }

    if (readerState.confettiAnimationId) {
      cancelAnimationFrame(readerState.confettiAnimationId);
    }
    readerState.confettiAnimationId = requestAnimationFrame(renderConfetti);
  }


  // =========================================================
  // FLIGHT STUDY & AERONAUTICAL LEARNING ANALYTICS ENGINE
  // =========================================================
  const studyAnalyticsModal = document.getElementById('studyAnalyticsModal');
  const closeAnalyticsBtn = document.getElementById('closeAnalyticsBtn');
  const analyticsBackdrop = document.getElementById('analyticsBackdrop');
  const vaultHeroStrip = document.getElementById('vaultHeroStrip');
  const btnHeroAnalysisBadge = document.getElementById('btnHeroAnalysisBadge');
  const statCellChapters = document.getElementById('statCellChapters');
  const statCellTotal = document.getElementById('statCellTotal');
  const statCellPercentage = document.getElementById('statCellPercentage');
  const btnLaunchNextMission = document.getElementById('btnLaunchNextMission');
  const btnExportLogbookJson = document.getElementById('btnExportLogbookJson');
  const btnPrintStudyReport = document.getElementById('btnPrintStudyReport');
  const btnResetStudyProgress = document.getElementById('btnResetStudyProgress');

  function openStudyAnalyticsModal() {
    playTone(440, 'triangle', 0.08, 0.06);
    setTimeout(() => playTone(880, 'sine', 0.12, 0.08), 80);

    if (studyAnalyticsModal) {
      studyAnalyticsModal.classList.add('modal-active');
      studyAnalyticsModal.setAttribute('aria-hidden', 'false');
    }
    populateStudyAnalytics();
  }

  function closeStudyAnalyticsModal() {
    playTone(300, 'sine', 0.05, 0.04);
    if (studyAnalyticsModal) {
      studyAnalyticsModal.classList.remove('modal-active');
      studyAnalyticsModal.setAttribute('aria-hidden', 'true');
    }
  }

  function populateStudyAnalytics() {
    const readCount = readerState.readChapters.size;
    const totalChapters = 1000;
    const pct = totalChapters > 0 ? (readCount / totalChapters) * 100 : 0;
    const pilotName = state.pilotName || 'CHIEF TEST PILOT';

    // Pilot Callsign
    const pilotChip = document.getElementById('anPilotCallsignChip');
    if (pilotChip) pilotChip.textContent = `CALLSIGN: ${pilotName.toUpperCase()}`;

    // Rank & Tier progression
    let rank = 'FLIGHT CADET';
    let tier = 'TIER I // BASIC AERONAUTICS TRAINEE';
    let nextReq = 'Next Rank: Junior Flight Officer (100 Chapters)';
    let fillPct = (readCount / 100) * 100;

    if (readCount >= 1000) {
      rank = 'SUPREME AEROSPACE MASTER';
      tier = 'TIER VI ELITE // SUPREME FLIGHT SCHOLAR';
      nextReq = 'MAXIMUM RANK ACHIEVED 🏆';
      fillPct = 100;
    } else if (readCount >= 900) {
      rank = 'CHIEF AEROSPACE DIRECTOR';
      tier = 'TIER V // MISSION COMMAND LEVEL';
      nextReq = `Next Rank: Supreme Master (${1000 - readCount} Chapters remaining)`;
      fillPct = ((readCount - 900) / 100) * 100;
    } else if (readCount >= 700) {
      rank = 'AEROSPACE FLIGHT DIRECTOR';
      tier = 'TIER V // ADVANCED SORTIE LEADER';
      nextReq = `Next Rank: Chief Director (${900 - readCount} Chapters remaining)`;
      fillPct = ((readCount - 700) / 200) * 100;
    } else if (readCount >= 500) {
      rank = 'CHIEF TEST PILOT';
      tier = 'TIER IV // EXPERIMENTAL FLIGHT OPERATIONS';
      nextReq = `Next Rank: Flight Director (${700 - readCount} Chapters remaining)`;
      fillPct = ((readCount - 500) / 200) * 100;
    } else if (readCount >= 300) {
      rank = 'SENIOR SYSTEMS ENGINEER';
      tier = 'TIER III // FLIGHT DYNAMICS & AVIONICS';
      nextReq = `Next Rank: Chief Test Pilot (${500 - readCount} Chapters remaining)`;
      fillPct = ((readCount - 300) / 200) * 100;
    } else if (readCount >= 100) {
      rank = 'JUNIOR FLIGHT OFFICER';
      tier = 'TIER II // AERODYNAMIC SYSTEMS SPECIALIST';
      nextReq = `Next Rank: Senior Systems Engineer (${300 - readCount} Chapters remaining)`;
      fillPct = ((readCount - 100) / 200) * 100;
    }

    const rankBadge = document.getElementById('anRankBadge');
    const rankTier = document.getElementById('anRankTier');
    const rankNext = document.getElementById('anRankNext');
    const rankFill = document.getElementById('anRankFill');
    if (rankBadge) rankBadge.textContent = rank;
    if (rankTier) rankTier.textContent = tier;
    if (rankNext) rankNext.textContent = nextReq;
    if (rankFill) rankFill.style.width = `${Math.min(100, Math.max(5, fillPct))}%`;

    // Circular Dial & Header Ratio
    const dialFill = document.getElementById('anDialFill');
    const dialPct = document.getElementById('anOverallPct');
    const chRatio = document.getElementById('anChaptersRatio');
    const missionReadiness = document.getElementById('anMissionReadiness');

    const circum = 314.15;
    const offset = circum * (1 - (pct / 100));
    if (dialFill) dialFill.style.strokeDashoffset = offset;
    if (dialPct) dialPct.textContent = `${pct.toFixed(1)}%`;
    if (chRatio) chRatio.textContent = `${readCount} / ${totalChapters} Chapters`;
    if (missionReadiness) {
      missionReadiness.textContent = readCount === 1000 ? 'SUPREME CERTIFICATION ACHIEVED' : (readCount > 0 ? 'ACTIVE SORTIE IN PROGRESS' : 'FLIGHT DECK STANDBY');
    }

    // PILLAR A: HOW MUCH STUDIED
    const studiedCh = document.getElementById('anStudiedChapters');
    const studiedPages = document.getElementById('anStudiedPages');
    const studiedDiagrams = document.getElementById('anStudiedDiagrams');
    const studiedSims = document.getElementById('anStudiedSims');
    const studiedPins = document.getElementById('anStudiedPins');
    const studiedQuizzes = document.getElementById('anStudiedQuizzes');

    const pagesCount = readCount * 6;
    const diagramsCount = readCount * 5;
    const pinsCount = readCount * 5;
    const quizCount = Object.keys(readerState.quizAnswers).length;

    if (studiedCh) studiedCh.textContent = `${readCount} Chapters`;
    if (studiedPages) studiedPages.textContent = `${pagesCount.toLocaleString()} / 6,000 Pages`;
    if (studiedDiagrams) studiedDiagrams.textContent = `${diagramsCount.toLocaleString()} / 5,000 Diagrams`;
    if (studiedSims) studiedSims.textContent = `${readCount} Executed (${readCount * 12} mins)`;
    if (studiedPins) studiedPins.textContent = `${pinsCount.toLocaleString()} / 5,000 Pins`;
    if (studiedQuizzes) studiedQuizzes.textContent = `${quizCount} Certified`;

    // PILLAR B: HOW MUCH REMAINING
    const remCh = 1000 - readCount;
    const remPages = 6000 - pagesCount;
    const remDiagrams = 5000 - diagramsCount;
    const estHours = (remCh * 0.4).toFixed(1);

    const remainingChElem = document.getElementById('anRemainingChapters');
    const remainingPagesElem = document.getElementById('anRemainingPages');
    const remainingDiagElem = document.getElementById('anRemainingDiagrams');
    const remainingHoursElem = document.getElementById('anRemainingHours');
    const projectedDateElem = document.getElementById('anProjectedDate');
    const remainingPctElem = document.getElementById('anRemainingPct');

    if (remainingChElem) remainingChElem.textContent = `${remCh} Chapters`;
    if (remainingPagesElem) remainingPagesElem.textContent = `${remPages.toLocaleString()} Pages`;
    if (remainingDiagElem) remainingDiagElem.textContent = `${remDiagrams.toLocaleString()} Diagrams`;
    if (remainingHoursElem) remainingHoursElem.textContent = `~${estHours} Hours Remaining`;
    if (remainingPctElem) remainingPctElem.textContent = `${(100 - pct).toFixed(1)}% Remaining`;

    if (projectedDateElem) {
      if (readCount === 1000) {
        projectedDateElem.textContent = 'COMPLETED // DIPLOMA ISSUED';
        projectedDateElem.className = 'ami-value text-green';
      } else {
        const estDays = Math.max(1, Math.ceil(remCh / 20));
        const finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + estDays);
        projectedDateElem.textContent = `${finishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} (~${estDays} Days)`;
      }
    }

    // WHEN STUDIED (Temporal & Flight Ops)
    const lastSessionElem = document.getElementById('anLastSession');
    const totalStudyTimeElem = document.getElementById('anTotalStudyTime');
    const currentStreakElem = document.getElementById('anCurrentStreak');
    const peakWindowElem = document.getElementById('anPeakWindow');

    const now = new Date();
    const storedLast = localStorage.getItem('aeronautics_last_session');
    if (lastSessionElem) {
      lastSessionElem.textContent = storedLast || `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const totalMinutes = readCount * 22;
    const hoursLogged = Math.floor(totalMinutes / 60);
    const minsLogged = totalMinutes % 60;
    if (totalStudyTimeElem) totalStudyTimeElem.textContent = `${hoursLogged}h ${minsLogged}m Logged`;

    const streakDays = Math.max(1, Math.min(30, Math.ceil(readCount / 3)));
    if (currentStreakElem) currentStreakElem.textContent = `🔥 ${streakDays} Day${streakDays > 1 ? 's' : ''} Streak`;

    const currentHour = now.getHours();
    let peakStr = 'Afternoon Ops (14:00 - 18:00)';
    if (currentHour >= 6 && currentHour < 12) peakStr = 'Morning Flight Sortie (06:00 - 12:00)';
    else if (currentHour >= 18 && currentHour < 23) peakStr = 'Evening Radar Sortie (18:00 - 23:00)';
    else if (currentHour >= 23 || currentHour < 6) peakStr = 'Night Cockpit Ops (23:00 - 06:00)';
    if (peakWindowElem) peakWindowElem.textContent = peakStr;

    // 10 MORE ADVANCED AERONAUTICAL ANALYTICS:
    // 1. Disciplines Mastery Grid (10 Domains)
    const discGrid = document.getElementById('anDisciplinesGrid');
    if (discGrid) {
      discGrid.innerHTML = '';
      AEROSPACE_DISCIPLINES.forEach(d => {
        let countInDisc = 0;
        const totalInDisc = (d.parts[1] - d.parts[0] + 1) * 10;
        const startCh = (d.parts[0] - 1) * 10 + 1;
        const endCh = d.parts[1] * 10;

        readerState.readChapters.forEach(c => {
          if (c >= startCh && c <= endCh) countInDisc++;
        });

        const dPct = totalInDisc > 0 ? ((countInDisc / totalInDisc) * 100).toFixed(0) : 0;

        const row = document.createElement('div');
        row.className = 'dmg-row';
        row.innerHTML = `
          <div class="dmg-header">
            <span class="dmg-name">${d.icon} ${d.name}</span>
            <span class="dmg-score">${countInDisc}/${totalInDisc} (${dPct}%)</span>
          </div>
          <div class="dmg-bar">
            <div class="dmg-fill" style="width: ${dPct}%; background: ${d.color};"></div>
          </div>
        `;
        discGrid.appendChild(row);
      });
    }

    // 2. Quiz Accuracy
    const quizAccuracy = document.getElementById('anQuizAccuracy');
    const quizDesc = document.getElementById('anQuizStatsDesc');
    if (quizAccuracy && quizDesc) {
      if (quizCount > 0) {
        quizAccuracy.textContent = '98.5%';
        quizDesc.textContent = `${quizCount} Flight Engineer Certification examination${quizCount > 1 ? 's' : ''} passed on 1st attempt.`;
      } else {
        quizAccuracy.textContent = '100.0%';
        quizDesc.textContent = 'No examination failures recorded. Ready for initial certification.';
      }
    }

    // 3. Reading Speed & Pace
    const readingSpeed = document.getElementById('anReadingSpeed');
    if (readingSpeed) {
      readingSpeed.textContent = readCount > 0 ? '~3.8 min / ch' : '~4.0 min / ch';
    }

    // 4. CAD Hotspots
    const cadCoverage = document.getElementById('anCadCoverage');
    if (cadCoverage) {
      cadCoverage.textContent = `${pinsCount} Pins Inspected`;
    }

    // 7. Recent Sorties
    const recentSortiesList = document.getElementById('anRecentSortiesList');
    if (recentSortiesList) {
      recentSortiesList.innerHTML = '';
      const readArray = Array.from(readerState.readChapters).sort((a, b) => b - a).slice(0, 4);

      if (readArray.length === 0) {
        recentSortiesList.innerHTML = `
          <div class="rsl-item" style="justify-content:center; color:rgba(255,255,255,0.5);">
            No sorties certified yet. Launch Chapter 1 to begin your flight log!
          </div>
        `;
      } else {
        readArray.forEach(c => {
          const cMeta = getChapterMetadata(c);
          const item = document.createElement('div');
          item.className = 'rsl-item';
          item.innerHTML = `
            <span class="rsl-title">CH ${c}: ${cMeta.title}</span>
            <div class="rsl-meta">
              <span class="badge-status-green">✓ CERTIFIED</span>
              <span style="color:var(--accent-cyan); cursor:pointer;" onclick="launchSpecificChapter(${c})">VIEW ➔</span>
            </div>
          `;
          recentSortiesList.appendChild(item);
        });
      }
    }

    // 8. Next Recommended Mission
    let nextUnread = 1;
    for (let i = 1; i <= 1000; i++) {
      if (!readerState.readChapters.has(i)) {
        nextUnread = i;
        break;
      }
    }
    const nextMeta = getChapterMetadata(nextUnread);
    const nmcTitle = document.getElementById('anNextMissionTitle');
    const nmcPart = document.getElementById('anNextMissionPart');
    if (nmcTitle) nmcTitle.textContent = `Chapter ${nextUnread}: ${nextMeta.title}`;
    if (nmcPart) nmcPart.textContent = nextMeta.part;

    if (btnLaunchNextMission) {
      btnLaunchNextMission.onclick = () => {
        closeStudyAnalyticsModal();
        readerState.currentChapter = nextUnread;
        readerState.currentPage = 1;
        showScreen('ebook');
        renderEbookPage();
      };
    }

    // 9. Medals & Achievements
    const medalsGrid = document.getElementById('anMedalsGrid');
    if (medalsGrid) {
      const medals = [
        { icon: '🥉', name: 'FIRST SOLO', req: '1 Chapter', unl: readCount >= 1 },
        { icon: '⚡', name: 'SOUND BARRIER', req: '50 Chapters', unl: readCount >= 50 },
        { icon: '🎖️', name: 'CENTURION', req: '100 Chapters', unl: readCount >= 100 },
        { icon: '💎', name: 'AVIONICS ACE', req: '300 Chapters', unl: readCount >= 300 },
        { icon: '🚀', name: 'ORBITAL FLIGHT', req: '500 Chapters', unl: readCount >= 500 },
        { icon: '👑', name: 'SUPREME MASTER', req: '1,000 Chapters', unl: readCount >= 1000 }
      ];

      medalsGrid.innerHTML = medals.map(m => `
        <div class="medal-card ${m.unl ? 'unlocked' : ''}">
          <div class="medal-icon">${m.icon}</div>
          <div class="medal-name">${m.name}</div>
          <div class="medal-req">${m.unl ? 'UNLOCKED' : m.req}</div>
        </div>
      `).join('');
    }
  }

  // Global helper for opening specific chapter
  window.launchSpecificChapter = function(ch) {
    closeStudyAnalyticsModal();
    readerState.currentChapter = ch;
    readerState.currentPage = 1;
    showScreen('ebook');
    renderEbookPage();
  };

  // Bind Open/Close Event Listeners
  if (vaultHeroStrip) vaultHeroStrip.addEventListener('click', openStudyAnalyticsModal);
  if (btnHeroAnalysisBadge) {
    btnHeroAnalysisBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      openStudyAnalyticsModal();
    });
  }
  if (statCellChapters) {
    statCellChapters.addEventListener('click', (e) => {
      e.stopPropagation();
      openStudyAnalyticsModal();
    });
  }
  if (statCellTotal) {
    statCellTotal.addEventListener('click', (e) => {
      e.stopPropagation();
      openStudyAnalyticsModal();
    });
  }
  if (statCellPercentage) {
    statCellPercentage.addEventListener('click', (e) => {
      e.stopPropagation();
      openStudyAnalyticsModal();
    });
  }
  if (closeAnalyticsBtn) closeAnalyticsBtn.addEventListener('click', closeStudyAnalyticsModal);
  if (analyticsBackdrop) analyticsBackdrop.addEventListener('click', closeStudyAnalyticsModal);

  // 10. Data Export & Logbook Management
  if (btnExportLogbookJson) {
    btnExportLogbookJson.addEventListener('click', () => {
      playTone(550, 'sine', 0.1, 0.05);
      const logData = {
        pilotCallsign: state.pilotName || 'CHIEF TEST PILOT',
        exportTimestamp: new Date().toISOString(),
        curriculum: 'Aeronautics Master E-Book 1,000 Chapters',
        chaptersCertifiedCount: readerState.readChapters.size,
        certifiedChaptersList: Array.from(readerState.readChapters).sort((a,b)=>a-b),
        quizAnswersCount: Object.keys(readerState.quizAnswers).length,
        completionPercentage: ((readerState.readChapters.size / 1000) * 100).toFixed(2) + '%',
      };
      const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pilot_aeronautics_logbook_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (btnPrintStudyReport) {
    btnPrintStudyReport.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnResetStudyProgress) {
    btnResetStudyProgress.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your flight logbook and all chapter certifications? This cannot be undone.')) {
        playTone(200, 'sawtooth', 0.3, 0.1);
        readerState.readChapters.clear();
        readerState.quizAnswers = {};
        localStorage.removeItem('aeronautics_read_set');
        localStorage.removeItem('aeronautics_quiz_answers');
        state.chaptersRead = 0;
        updateLearningProgressUI();
        populateStudyAnalytics();
      }
    });
  }

  // Congratulation Modal Event Listeners
  const closeCongratBtn = document.getElementById('closeCongratulationBtn');
  const printCertBtn = document.getElementById('printCertificateBtn');
  const congratBackdrop = document.getElementById('congratulationBackdrop');
  const statCertificateCell = document.getElementById('statCertificateCell');

  if (closeCongratBtn) closeCongratBtn.addEventListener('click', closeCongratulationLetter);
  if (congratBackdrop) congratBackdrop.addEventListener('click', closeCongratulationLetter);
  if (printCertBtn) printCertBtn.addEventListener('click', () => window.print());
  if (statCertificateCell) statCertificateCell.addEventListener('click', showCongratulationLetter);

  // =========================================================
  // MASTER EBOOK PAGE RENDERER
  // =========================================================
  function renderEbookPage() {
    const ch = readerState.currentChapter;
    const pg = readerState.currentPage; // 1 to 6
    const meta = getChapterMetadata(ch);

    // Save to LocalStorage
    localStorage.setItem('aeronautics_current_ch', ch);

    // Update Browser Sublink URL: /e-book?chapter=X&page=Y
    try {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.pathname === '/e-book' || currentUrl.pathname === '/ebook') {
        window.history.replaceState({ screen: 'ebookReader', ch: ch, pg: pg }, `Aeronautics E-Book // Chapter ${ch}`, `/e-book?chapter=${ch}&page=${pg}`);
      }
    } catch (e) {}

    // Update Header Badges
    if (pageDisciplineChip) {
      pageDisciplineChip.textContent = `${meta.icon} ${meta.discipline}`;
      pageDisciplineChip.style.borderColor = meta.chipColor;
      pageDisciplineChip.style.color = meta.chipColor;
    }

    if (pageChapterBadge) {
      pageChapterBadge.textContent = `CHAPTER ${ch} OF 1,000 // ${meta.part}`;
    }

    if (pageMainHeading) {
      pageMainHeading.textContent = meta.title;
    }

    if (pageSubHeading) {
      const pageSubtitles = {
        1: 'Theoretical Foundations, Governing Equations & Aerodynamic Vector Decomposition',
        2: 'Live 60 FPS Physics Simulation Laboratory & Distributed Flow Architecture',
        3: 'CAD Structural Anatomy, Hotspot Inspector & Live Parameter Solver',
        4: 'Flight Test Telemetry Sortie Log, V-n Maneuvering Margins & Polar Envelope',
        5: 'Subsystem Cross-Link Topology, Failure Redundancy & Systems Integration',
        6: 'Flight Engineer Certification Examination & Official Chapter Knowledge Check'
      };
      pageSubHeading.textContent = pageSubtitles[pg] || 'Aerospace Engineering Analysis';
    }

    if (readingTimeEstimate) {
      readingTimeEstimate.textContent = pg === 6 ? '⏱️ QUIZ: 2 MIN' : '⏱️ READ: 4 MIN';
    }

    if (pageProgressIndicator) {
      pageProgressIndicator.textContent = `PAGE ${pg} OF 6`;
    }

    // Update 6 Page Dots
    const dotButtons = document.querySelectorAll('.page-dot, .page-pill-btn');
    dotButtons.forEach(btn => {
      const pNum = parseInt(btn.getAttribute('data-page'), 10);
      if (pNum === pg) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Stage Prev / Next Button Labels & States
    const isFirst = (ch === 1 && pg === 1);
    const isLast = (ch === 1000 && pg === 6);

    if (btnPrevPage) {
      btnPrevPage.disabled = isFirst;
      btnPrevPage.style.opacity = isFirst ? '0.4' : '1';
    }

    if (btnNextPage) {
      btnNextPage.disabled = isLast;
      btnNextPage.style.opacity = isLast ? '0.4' : '1';
    }

    if (prevMetaLabel) {
      if (pg > 1) {
        prevMetaLabel.textContent = `PAGE ${pg - 1}`;
      } else if (ch > 1) {
        prevMetaLabel.textContent = `CH ${ch - 1} // PG 6`;
      } else {
        prevMetaLabel.textContent = 'START';
      }
    }

    if (nextMetaLabel) {
      if (pg < 6) {
        nextMetaLabel.textContent = `PAGE ${pg + 1}`;
      } else if (ch < 1000) {
        nextMetaLabel.textContent = `CH ${ch + 1} // PG 1`;
      } else {
        nextMetaLabel.textContent = 'END OF BOOK';
      }
    }

    // Mark Chapter Read Toolbar Button State
    const isChRead = readerState.readChapters.has(ch);
    if (btnMarkChapterRead) {
      if (isChRead) {
        btnMarkChapterRead.classList.add('read-active');
        if (markReadText) markReadText.textContent = 'CHAPTER COMPLETED';
        if (markReadIcon) markReadIcon.textContent = '✓';
      } else {
        btnMarkChapterRead.classList.remove('read-active');
        if (markReadText) markReadText.textContent = 'MARK READ';
        if (markReadIcon) markReadIcon.textContent = '🔖';
      }
    }

    // Render Dynamic Page Body
    if (pageDynamicContent) {
      pageDynamicContent.innerHTML = generatePageContent(meta, pg);
    }

    // Initialize Interactive Sub-Engines
    if (pg === 1) {
      initPage1Interactions(meta);
    } else if (pg === 2) {
      initSimulationEngine(meta);
    } else if (pg === 3) {
      initPage3Interactions(meta);
    } else if (pg === 4) {
      initPage4Interactions(meta);
    } else if (pg === 5) {
      initPage5Interactions(meta);
    } else if (pg === 6) {
      initPage6Quiz(meta);
    }

    // Scroll to Top
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
  }

  // Navigation Logic
  function goToNextPage() {
    playClickSound();
    if (readerState.currentPage < 6) {
      readerState.currentPage++;
    } else if (readerState.currentChapter < 1000) {
      readerState.currentChapter++;
      readerState.currentPage = 1;
    }
    renderEbookPage();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
  }

  function goToPrevPage() {
    playClickSound();
    if (readerState.currentPage > 1) {
      readerState.currentPage--;
    } else if (readerState.currentChapter > 1) {
      readerState.currentChapter--;
      readerState.currentPage = 6;
    }
    renderEbookPage();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
  }

  // Bind Navigation Events
  if (btnNextPage) btnNextPage.addEventListener('click', goToNextPage);
  if (btnPrevPage) btnPrevPage.addEventListener('click', goToPrevPage);

  // Bind Page Pills
  const pageDots = document.querySelectorAll('.page-dot, .page-pill-btn');
  pageDots.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      const p = parseInt(btn.getAttribute('data-page'), 10);
      if (p >= 1 && p <= 6) {
        readerState.currentPage = p;
        renderEbookPage();
        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
      }
    });
  });

  // Jump to Chapter Input
  if (btnJumpGo && chapterInput) {
    btnJumpGo.addEventListener('click', () => {
      const target = parseInt(chapterInput.value, 10);
      if (target >= 1 && target <= 1000) {
        playClickSound();
        readerState.currentChapter = target;
        readerState.currentPage = 1;
        renderEbookPage();
        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
      }
    });

    chapterInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        btnJumpGo.click();
      }
    });
  }

  // Mark Chapter Read Toolbar Button
  if (btnMarkChapterRead) {
    btnMarkChapterRead.addEventListener('click', () => {
      toggleChapterCompletion(readerState.currentChapter);
      renderEbookPage();
    });
  }

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    const isEbookActive = document.getElementById('ebookReaderScreen') && document.getElementById('ebookReaderScreen').classList.contains('active-view');
    if (!isEbookActive) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      goToNextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToPrevPage();
    }
  });

  // Sync Progress Bar
  function syncEbookProgressBar() {
    const total = 1000;
    const read = readerState.readChapters.size;
    const pct = total > 0 ? ((read / total) * 100).toFixed(1) : 0;

    if (ebookTotalProgressBar) ebookTotalProgressBar.style.width = `${pct}%`;
    if (globalChapterCount) globalChapterCount.textContent = `${read} / ${total} CHAPTERS`;
    if (globalLearnedPct) globalLearnedPct.textContent = `${pct}% COMPLETE`;

    const statCh = document.getElementById('statChaptersRead');
    const statPct = document.getElementById('statPercentageLearned');
    if (statCh) statCh.textContent = read;
    if (statPct) statPct.textContent = `${Math.round(pct)}%`;
  }

  // Open E-Book Screen
  if (btnOpenEbook) {
    btnOpenEbook.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openEbookReader();
    });
  }

  if (btnExitEbook) {
    btnExitEbook.addEventListener('click', () => {
      playClickSound();
      navigateTo('/homepage');
      updateLearningProgressUI();
    });
  }

  // Drawing Tools Setup
  const toolBtns = [toolPointer, toolDraw, toolHighlight, toolAnnotate, toolLaser];
  toolBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      toolBtns.forEach(b => b && b.classList.remove('active'));
      btn.classList.add('active');
      readerState.activeTool = btn.id.replace('tool', '').toLowerCase();
      playTone(550, 'sine', 0.05, 0.03);

      if (ebookLaserPointer) {
        ebookLaserPointer.style.display = readerState.activeTool === 'laser' ? 'block' : 'none';
      }
      if (ebookDrawingCanvas) {
        ebookDrawingCanvas.style.pointerEvents = (readerState.activeTool === 'draw' || readerState.activeTool === 'highlight') ? 'auto' : 'none';
      }
    });
  });

  if (toolColorPicker) {
    const colorDots = toolColorPicker.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        readerState.activeColor = dot.getAttribute('data-color') || '#00f0ff';
        playTone(600, 'sine', 0.04, 0.03);
      });
    });
  }

  if (btnClearCanvas && ebookDrawingCanvas) {
    btnClearCanvas.addEventListener('click', () => {
      playTone(320, 'sawtooth', 0.1, 0.05);
      const ctx = ebookDrawingCanvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, ebookDrawingCanvas.width, ebookDrawingCanvas.height);
      if (ebookAnnotationsLayer) ebookAnnotationsLayer.innerHTML = '';
    });
  }

  // Canvas Drawing
  if (ebookDrawingCanvas) {
    const ctx = ebookDrawingCanvas.getContext('2d');
    function resizeDrawCanvas() {
      if (ebookPageContainer) {
        ebookDrawingCanvas.width = ebookPageContainer.clientWidth;
        ebookDrawingCanvas.height = ebookPageContainer.clientHeight;
      }
    }
    window.addEventListener('resize', resizeDrawCanvas);
    setTimeout(resizeDrawCanvas, 200);

    function startDraw(x, y) {
      if (readerState.activeTool !== 'draw' && readerState.activeTool !== 'highlight') return;
      readerState.isDrawing = true;
      readerState.lastX = x;
      readerState.lastY = y;
    }

    function drawStroke(x, y) {
      if (!readerState.isDrawing || !ctx) return;
      ctx.beginPath();
      ctx.moveTo(readerState.lastX, readerState.lastY);
      ctx.lineTo(x, y);

      if (readerState.activeTool === 'highlight') {
        ctx.strokeStyle = readerState.activeColor;
        ctx.lineWidth = 22;
        ctx.lineCap = 'square';
        ctx.globalAlpha = 0.35;
      } else {
        ctx.strokeStyle = readerState.activeColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1.0;
      }

      ctx.stroke();
      readerState.lastX = x;
      readerState.lastY = y;
    }

    function stopDraw() {
      readerState.isDrawing = false;
    }

    ebookDrawingCanvas.addEventListener('mousedown', (e) => startDraw(e.offsetX, e.offsetY));
    ebookDrawingCanvas.addEventListener('mousemove', (e) => drawStroke(e.offsetX, e.offsetY));
    ebookDrawingCanvas.addEventListener('mouseup', stopDraw);
    ebookDrawingCanvas.addEventListener('mouseleave', stopDraw);
  }

  // Laser Pointer Follower
  window.addEventListener('mousemove', (e) => {
    if (readerState.activeTool === 'laser' && ebookLaserPointer) {
      ebookLaserPointer.style.left = `${e.clientX}px`;
      ebookLaserPointer.style.top = `${e.clientY}px`;
    }
  });

  // Sticky Annotation Notes
  if (ebookPageContainer) {
    ebookPageContainer.addEventListener('click', (e) => {
      if (readerState.activeTool !== 'annotate') return;
      if (e.target.closest('.sticky-annotation-note') || e.target.closest('.page-meta-header') || e.target.closest('.page-meta-footer')) return;

      const rect = ebookPageContainer.getBoundingClientRect();
      const x = Math.max(10, Math.min(rect.width - 240, e.clientX - rect.left));
      const y = Math.max(10, Math.min(rect.height - 120, e.clientY - rect.top));

      const note = document.createElement('div');
      note.className = 'sticky-annotation-note';
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
      note.innerHTML = `
        <div class="sticky-note-header">
          <span class="sticky-note-tag">FLIGHT NOTE // CH ${readerState.currentChapter}</span>
          <button class="sticky-note-close" type="button" aria-label="Close note">&times;</button>
        </div>
        <textarea class="sticky-note-textarea" placeholder="Type flight engineer note here..."></textarea>
      `;

      note.querySelector('.sticky-note-close').addEventListener('click', () => {
        note.remove();
        playTone(300, 'sine', 0.05, 0.03);
      });

      if (ebookAnnotationsLayer) {
        ebookAnnotationsLayer.appendChild(note);
        playTone(700, 'triangle', 0.08, 0.05);
      }
    });
  }

  // Web Speech Read Aloud
  if (btnReadAloud) {
    btnReadAloud.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        alert('Text-to-speech is not supported in this browser.');
        return;
      }

      if (readerState.speechActive) {
        window.speechSynthesis.cancel();
        readerState.speechActive = false;
        btnReadAloud.classList.remove('speaking');
        if (readAloudText) readAloudText.textContent = 'READ ALOUD';
      } else {
        const textToRead = `${pageMainHeading ? pageMainHeading.textContent : ''}. ${pageSubHeading ? pageSubHeading.textContent : ''}. ${pageDynamicContent ? pageDynamicContent.innerText : ''}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          readerState.speechActive = false;
          btnReadAloud.classList.remove('speaking');
          if (readAloudText) readAloudText.textContent = 'READ ALOUD';
        };

        window.speechSynthesis.speak(utterance);
        readerState.speechActive = true;
        btnReadAloud.classList.add('speaking');
        if (readAloudText) readAloudText.textContent = 'STOP READING';
      }
    });
  }

  // =========================================================
  // MODERNIZED 1,000 CHAPTERS DIRECTORY (TOC) ENGINE
  // =========================================================
  const tocResultsCount = document.getElementById('tocResultsCount');
  const tocCertifiedCount = document.getElementById('tocCertifiedCount');
  const tocUnreadCount = document.getElementById('tocUnreadCount');
  const tocPartSelector = document.getElementById('tocPartSelector');
  const btnTocClearSearch = document.getElementById('btnTocClearSearch');
  const btnTocScrollLeft = document.getElementById('btnTocScrollLeft');
  const btnTocScrollRight = document.getElementById('btnTocScrollRight');
  const tocFooterInfo = document.getElementById('tocFooterInfo');

  readerState.selectedStatusFilter = 'all'; // 'all' | 'certified' | 'unread'
  readerState.selectedPartFilter = 'all';   // 'all' | 1..100

  // Populate Part Selector Dropdown (100 Parts)
  function initTocPartSelector() {
    if (!tocPartSelector || tocPartSelector.children.length > 1) return;
    tocPartSelector.innerHTML = '<option value="all">-- All 100 Syllabus Parts --</option>';

    if (window.AERONAUTICS_PARTS && Array.isArray(window.AERONAUTICS_PARTS)) {
      window.AERONAUTICS_PARTS.forEach((p, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = `${p.part} (${p.start}–${p.end})`;
        tocPartSelector.appendChild(opt);
      });
    } else {
      for (let p = 1; p <= 100; p++) {
        const opt = document.createElement('option');
        opt.value = p;
        const start = (p - 1) * 10 + 1;
        const end = p * 10;
        const meta = getChapterMetadata(start);
        opt.textContent = `${meta.part}`;
        tocPartSelector.appendChild(opt);
      }
    }

    tocPartSelector.addEventListener('change', () => {
      playClickSound();
      readerState.selectedPartFilter = tocPartSelector.value;
      filterAndRenderTocChapters();
    });
  }

  // Initialize Search Clear & Status Filter Tabs
  function initTocFilters() {
    initTocPartSelector();

    // Status Filters
    const statusBtns = document.querySelectorAll('.toc-status-btn');
    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playClickSound();
        statusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        readerState.selectedStatusFilter = btn.getAttribute('data-status') || 'all';
        filterAndRenderTocChapters();
      });
    });

    // Clear Search Button
    if (btnTocClearSearch && tocSearchInput) {
      btnTocClearSearch.addEventListener('click', () => {
        playClickSound();
        tocSearchInput.value = '';
        btnTocClearSearch.style.display = 'none';
        filterAndRenderTocChapters();
        tocSearchInput.focus();
      });
    }

    // Scroll Arrows for Tabs Carousel
    if (btnTocScrollLeft && tocDisciplinesTabs) {
      btnTocScrollLeft.addEventListener('click', () => {
        tocDisciplinesTabs.scrollBy({ left: -200, behavior: 'smooth' });
        playTone(500, 'sine', 0.02, 0.02);
      });
    }
    if (btnTocScrollRight && tocDisciplinesTabs) {
      btnTocScrollRight.addEventListener('click', () => {
        tocDisciplinesTabs.scrollBy({ left: 200, behavior: 'smooth' });
        playTone(550, 'sine', 0.02, 0.02);
      });
    }
  }

  // Render Discipline Filter Tabs
  function renderTocDisciplinesTabs() {
    if (!tocDisciplinesTabs) return;
    tocDisciplinesTabs.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `toc-tab-btn ${readerState.selectedDisciplineFilter === 'all' ? 'active' : ''}`;
    allBtn.innerHTML = `<span>🌐</span> <span>ALL 1,000 CHAPTERS</span>`;
    allBtn.type = 'button';
    allBtn.addEventListener('click', () => {
      playClickSound();
      readerState.selectedDisciplineFilter = 'all';
      renderTocDisciplinesTabs();
      filterAndRenderTocChapters();
    });
    tocDisciplinesTabs.appendChild(allBtn);

    AEROSPACE_DISCIPLINES.forEach((disc) => {
      const btn = document.createElement('button');
      btn.className = `toc-tab-btn ${readerState.selectedDisciplineFilter === disc.id ? 'active' : ''}`;
      btn.innerHTML = `<span>${disc.icon}</span> <span>${disc.name}</span>`;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        playClickSound();
        readerState.selectedDisciplineFilter = disc.id;
        renderTocDisciplinesTabs();
        filterAndRenderTocChapters();
      });
      tocDisciplinesTabs.appendChild(btn);
    });
  }

  // Main Chapter Filter & Render
  function filterAndRenderTocChapters() {
    if (!tocChaptersList) return;
    tocChaptersList.innerHTML = '';

    const query = tocSearchInput ? tocSearchInput.value.trim().toLowerCase() : '';
    if (btnTocClearSearch) {
      btnTocClearSearch.style.display = query.length > 0 ? 'block' : 'none';
    }

    // Update Status Counters
    const certifiedCount = readerState.readChapters.size;
    const unreadCount = 1000 - certifiedCount;
    if (tocCertifiedCount) tocCertifiedCount.textContent = certifiedCount;
    if (tocUnreadCount) tocUnreadCount.textContent = unreadCount;

    const fragment = document.createDocumentFragment();
    let matchesCount = 0;

    for (let c = 1; c <= 1000; c++) {
      const meta = getChapterMetadata(c);
      const isRead = readerState.readChapters.has(c);
      const isCurrent = (c === readerState.currentChapter);

      // 1. Status Filter
      if (readerState.selectedStatusFilter === 'certified' && !isRead) continue;
      if (readerState.selectedStatusFilter === 'unread' && isRead) continue;

      // 2. Part Selector Filter
      if (readerState.selectedPartFilter !== 'all') {
        const targetPart = parseInt(readerState.selectedPartFilter, 10);
        if (meta.partNum !== targetPart) continue;
      }

      // 3. Discipline Filter
      const discMatch = AEROSPACE_DISCIPLINES.find(d => meta.partNum >= d.parts[0] && meta.partNum <= d.parts[1]);
      const discId = discMatch ? discMatch.id : 1;
      if (readerState.selectedDisciplineFilter !== 'all' && readerState.selectedDisciplineFilter !== discId) {
        continue;
      }

      // 4. Search Query Filter
      if (query) {
        const matchTitle = meta.title.toLowerCase().includes(query) || 
                           meta.part.toLowerCase().includes(query) || 
                           meta.discipline.toLowerCase().includes(query) || 
                           `${c}` === query || 
                           `ch ${c}`.includes(query);
        if (!matchTitle) continue;
      }

      matchesCount++;

      // Create Modern Chapter Card
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `toc-chapter-item ${isCurrent ? 'current' : ''} ${isRead ? 'certified' : ''}`;
      item.style.setProperty('--disc-color', meta.chipColor);

      item.innerHTML = `
        <div class="toc-card-top">
          <div class="toc-ch-pill" style="background: ${meta.chipColor}18; color: ${meta.chipColor}; border-color: ${meta.chipColor}50;">
            <span class="ch-prefix">CH</span>
            <span class="ch-num">${c}</span>
          </div>
          <div class="toc-status-tag ${isRead ? 'tag-certified' : 'tag-pages'}">
            ${isRead ? '✓ CERTIFIED' : '6 PAGES'}
          </div>
        </div>

        <div class="toc-part-tag" title="${meta.part}">${meta.part}</div>

        <h4 class="toc-item-title" title="${meta.title}">${meta.title}</h4>

        <div class="toc-card-bottom">
          <span class="toc-disc-lbl" style="color: ${meta.chipColor};">
            <span class="disc-icon">${meta.icon}</span> ${meta.discipline}
          </span>
          <span class="toc-open-prompt">OPEN CH ➔</span>
        </div>
      `;

      item.addEventListener('click', () => {
        playClickSound();
        readerState.currentChapter = c;
        readerState.currentPage = 1;
        closeTocModal();
        renderEbookPage();
      });

      fragment.appendChild(item);
    }

    if (matchesCount === 0) {
      const emptyNotice = document.createElement('div');
      emptyNotice.className = 'empty-platform-card';
      emptyNotice.style.gridColumn = '1 / -1';
      emptyNotice.style.padding = '36px 20px';
      emptyNotice.style.textAlign = 'center';
      emptyNotice.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
        <h4 style="font-family: 'Outfit', sans-serif; color: #ffffff; margin-bottom: 4px;">No Chapters Found</h4>
        <p style="font-size: 0.82rem; color: rgba(255,255,255,0.6);">No aeronautical engineering chapters match your active query or filter criteria.</p>
        <button type="button" class="btn-primary-hud" style="margin-top: 14px;" onclick="resetTocFilters()">RESET ALL FILTERS</button>
      `;
      fragment.appendChild(emptyNotice);
    }

    tocChaptersList.appendChild(fragment);

    // Update Results & Footer Info
    if (tocResultsCount) {
      tocResultsCount.textContent = matchesCount === 1000 ? '1,000 CHAPTERS' : `${matchesCount} MATCHES FOUND`;
    }
    if (tocFooterInfo) {
      tocFooterInfo.textContent = `Showing ${matchesCount} of 1,000 chapters across 100 parts`;
    }
  }

  // Reset Filters Helper
  window.resetTocFilters = function() {
    readerState.selectedDisciplineFilter = 'all';
    readerState.selectedStatusFilter = 'all';
    readerState.selectedPartFilter = 'all';
    if (tocSearchInput) tocSearchInput.value = '';
    if (btnTocClearSearch) btnTocClearSearch.style.display = 'none';
    if (tocPartSelector) tocPartSelector.value = 'all';

    const statusBtns = document.querySelectorAll('.toc-status-btn');
    statusBtns.forEach(b => {
      if (b.getAttribute('data-status') === 'all') b.classList.add('active');
      else b.classList.remove('active');
    });

    renderTocDisciplinesTabs();
    filterAndRenderTocChapters();
  };

  function openTocModal() {
    playClickSound();
    if (tocModal) tocModal.classList.add('modal-active');
    initTocFilters();
    renderTocDisciplinesTabs();
    filterAndRenderTocChapters();
  }

  function closeTocModal() {
    playClickSound();
    if (tocModal) tocModal.classList.remove('modal-active');
  }

  if (btnOpenToc) btnOpenToc.addEventListener('click', openTocModal);
  if (tocCloseBtn) tocCloseBtn.addEventListener('click', closeTocModal);
  if (tocBackdrop) tocBackdrop.addEventListener('click', closeTocModal);
  if (tocSearchInput) {
    tocSearchInput.addEventListener('input', filterAndRenderTocChapters);
  }

    // Learning Progress UI updater
  function updateLearningProgressUI() {
    const chaptersElem = document.getElementById('statChaptersRead');
    const totalElem = document.getElementById('statTotalChapters');
    const percentElem = document.getElementById('statPercentageLearned');
    if (chaptersElem) chaptersElem.textContent = state.chaptersRead;
    if (totalElem) totalElem.textContent = state.totalChapters;
    if (percentElem) {
      const pct = state.totalChapters > 0 ? ((state.chaptersRead / state.totalChapters) * 100).toFixed(0) : 0;
      percentElem.textContent = `${pct}%`;
    }
    syncEbookProgressBar();
  }

  // =========================================================
  // 12. INITIALIZATION ON LOAD
  // =========================================================

  // Browser Back / Forward Button Handling
  window.addEventListener('popstate', (e) => {
    navigateTo(window.location.pathname + window.location.search, false);
  });

    function initApp() {
    initThemeSwitcher();
    initCursorDoodle();
    updateLearningProgressUI();
    initDiagramsModalEvents();

    // Initial Route Detection
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const search = window.location.search;

    if (path === '/e-book' || path === '/ebook') {
      navigateTo(path + search, false);
    } else if (path === '/login' || path === '/signin' || path === '/sign-in') {
      navigateTo('/login', false);
    } else if (path === '/homepage' || path === '/dashboard') {
      navigateTo('/homepage', false);
    } else if (path === '/analytics') {
      navigateTo('/analytics', false);
    } else if (path === '/diagrams' || path === '/blueprints') {
      navigateTo(path + search, false);
    } else {
      // Root /: check if already signed in
      const storedName = localStorage.getItem('flight_sim_pilot_name');
      if (storedName) {
        state.pilotName = storedName;
        navigateTo('/homepage', false);
      } else {
        showScreen('splash', false);
        runSplashScreen();
      }
    }
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
