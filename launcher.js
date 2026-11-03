/**
 * QIW Field Operations Portal - Launcher & App Switcher Logic
 * Quality Ironworks, Inc.
 */

(function () {
  'use strict';

  // DOM Elements
  const hubView = document.getElementById('hubView');
  const appViewContainer = document.getElementById('appViewContainer');
  const frameManual = document.getElementById('frameManual');
  const frameDims = document.getElementById('frameDims');
  const btnBackHub = document.getElementById('btnBackHub');
  const activeAppBadge = document.getElementById('activeAppBadge');
  const tabBtnManual = document.getElementById('tabBtnManual');
  const tabBtnDims = document.getElementById('tabBtnDims');
  const btnOpenNewTab = document.getElementById('btnOpenNewTab');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // State
  let currentActiveApp = null; // 'manual' | 'dims' | null

  // Paths
  const APP_URLS = {
    manual: 'manual-request/index.html',
    dims: 'field-dims/index.html'
  };

  /**
   * Initialize theme from localStorage or system preference
   */
  function initTheme() {
    const saved = localStorage.getItem('qiw_field_theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeIcon('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon('dark');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('qiw_field_theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = '<i class="ph-bold ph-moon"></i> <span>Dark Mode</span>';
    } else {
      themeToggleBtn.innerHTML = '<i class="ph-bold ph-sun"></i> <span>Light Mode</span>';
    }
  }

  /**
   * Launch a specific sub-application
   * @param {'manual'|'dims'} appName 
   * @param {boolean} updateHistory
   */
  function launchApp(appName, updateHistory = true) {
    if (appName !== 'manual' && appName !== 'dims') {
      showHub(updateHistory);
      return;
    }

    currentActiveApp = appName;

    // Toggle container views
    if (hubView) hubView.style.display = 'none';
    if (appViewContainer) appViewContainer.style.display = 'flex';

    if (appName === 'manual') {
      // Lazy-load iframe source on first launch
      if (!frameManual.getAttribute('src')) {
        frameManual.setAttribute('src', APP_URLS.manual);
      }
      frameManual.classList.add('active');
      frameDims.classList.remove('active');

      tabBtnManual.classList.add('active');
      tabBtnDims.classList.remove('active');

      activeAppBadge.className = 'active-app-indicator';
      activeAppBadge.innerHTML = '<i class="ph-bold ph-clipboard-text"></i> QIW Manual Request';

      if (updateHistory) {
        window.location.hash = '#manual-request';
      }
    } else if (appName === 'dims') {
      // Lazy-load iframe source on first launch
      if (!frameDims.getAttribute('src')) {
        frameDims.setAttribute('src', APP_URLS.dims);
      }
      frameDims.classList.add('active');
      frameManual.classList.remove('active');

      tabBtnDims.classList.add('active');
      tabBtnManual.classList.remove('active');

      activeAppBadge.className = 'active-app-indicator indicator-dims';
      activeAppBadge.innerHTML = '<i class="ph-bold ph-ruler"></i> QIW Field Dims Dispenser';

      if (updateHistory) {
        window.location.hash = '#field-dims';
      }
    }
  }

  /**
   * Return to main selection hub
   * @param {boolean} updateHistory
   */
  function showHub(updateHistory = true) {
    currentActiveApp = null;
    if (appViewContainer) appViewContainer.style.display = 'none';
    if (hubView) hubView.style.display = 'flex';

    if (updateHistory) {
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
  }

  /**
   * Open currently active app in new browser window/tab
   */
  function openCurrentInNewTab() {
    if (currentActiveApp && APP_URLS[currentActiveApp]) {
      window.open(APP_URLS[currentActiveApp], '_blank');
    }
  }

  /**
   * Handle URL hash routing (#manual-request, #field-dims, etc.)
   */
  function handleRoute() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#manual-request' || hash === '#manual') {
      launchApp('manual', false);
    } else if (hash === '#field-dims' || hash === '#dims' || hash === '#dispenser') {
      launchApp('dims', false);
    } else {
      showHub(false);
    }
  }

  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Theme toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Launch buttons on cards
    const btnLaunchManual = document.getElementById('btnLaunchManual');
    const cardManual = document.getElementById('cardManual');
    if (btnLaunchManual) {
      btnLaunchManual.addEventListener('click', (e) => {
        e.stopPropagation();
        launchApp('manual');
      });
    }
    if (cardManual) {
      cardManual.addEventListener('click', () => launchApp('manual'));
    }

    const btnLaunchDims = document.getElementById('btnLaunchDims');
    const cardDims = document.getElementById('cardDims');
    if (btnLaunchDims) {
      btnLaunchDims.addEventListener('click', (e) => {
        e.stopPropagation();
        launchApp('dims');
      });
    }
    if (cardDims) {
      cardDims.addEventListener('click', () => launchApp('dims'));
    }

    const btnLaunchSheets = document.getElementById('btnLaunchSheets');
    const cardSheets = document.getElementById('cardSheets');
    const SHEET_VIEWER_URL = 'https://qiw-sheet-viewer.qiworks.workers.dev/';
    if (btnLaunchSheets) {
      btnLaunchSheets.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(SHEET_VIEWER_URL, '_blank');
      });
    }
    if (cardSheets) {
      cardSheets.addEventListener('click', () => {
        window.open(SHEET_VIEWER_URL, '_blank');
      });
    }

    // Back to hub button
    if (btnBackHub) {
      btnBackHub.addEventListener('click', () => showHub(true));
    }

    // Switcher tabs
    if (tabBtnManual) {
      tabBtnManual.addEventListener('click', () => launchApp('manual'));
    }
    if (tabBtnDims) {
      tabBtnDims.addEventListener('click', () => launchApp('dims'));
    }

    // Open in new tab button
    if (btnOpenNewTab) {
      btnOpenNewTab.addEventListener('click', openCurrentInNewTab);
    }

    // Handle initial route
    handleRoute();
  });

  // Listen for browser back/forward buttons
  window.addEventListener('hashchange', handleRoute);

  // Expose global switcher method for embedded iframes to call parent
  window.qiwPortal = {
    showHub: () => showHub(true),
    launchApp: (appName) => launchApp(appName, true)
  };

})();
