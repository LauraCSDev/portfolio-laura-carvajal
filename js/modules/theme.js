/**
 * Theme System Module
 * Handles dark/light theme switching and theme-related UI updates
 */

class ThemeManager {
  constructor() {
    this.themeToggle = null;
    this.themeIcon = null;
    this.currentTheme = "light";
    this.navigationManager = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.loadSavedTheme();
    this.setupEventListeners();
  }

  cacheElements() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeIcon = this.themeToggle?.querySelector(".theme-icon");
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme") || "light";
    this.setTheme(savedTheme);
  }

  setupEventListeners() {
    if (!this.themeToggle) return;

    this.themeToggle.addEventListener("click", () => {
      const newTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    this.updateThemeIcon();
    this.updateLogos();
    this.updateTooltips();

    // Notify navigation manager to update navbar background
    if (this.navigationManager) {
      this.navigationManager.refreshNavbarBackground();
    }
  }

  updateThemeIcon() {
    if (!this.themeIcon || !this.themeToggle) return;

    if (this.currentTheme === "dark") {
      this.themeIcon.textContent = "☀️";
    } else {
      this.themeIcon.textContent = "🌙";
    }
  }

  updateLogos() {
    const navbarLogo = document.getElementById("navbar-logo");
    const heroLogo = document.getElementById("hero-logo");
    const favicon = document.getElementById("favicon");
    const appleIcon = document.getElementById("apple-icon");

    const logoSrc =
      this.currentTheme === "dark" ? "img/logo-dark.png" : "img/logo-light.png";

    if (navbarLogo && "src" in navbarLogo) navbarLogo.src = logoSrc;
    if (heroLogo && "src" in heroLogo) heroLogo.src = logoSrc;
    if (favicon && "href" in favicon) favicon.href = logoSrc;
    if (appleIcon && "href" in appleIcon) appleIcon.href = logoSrc;
  }

  updateTooltips() {
    if (!this.themeToggle) return;

    // Get current language for proper tooltip
    const i18nInstance = window["i18n"];
    const currentLang = i18nInstance?.getCurrentLanguage() || "es";

    if (currentLang === "en") {
      this.themeToggle.title =
        this.currentTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme";
    } else {
      this.themeToggle.title =
        this.currentTheme === "dark"
          ? "Cambiar a tema claro"
          : "Cambiar a tema oscuro";
    }
  }

  // Method to be called from language system when language changes
  refreshTooltips() {
    this.updateTooltips();
  }

  // Set navigation manager reference
  setNavigationManager(navigationManager) {
    this.navigationManager = navigationManager;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Make available globally
if (typeof window !== "undefined") {
  window["ThemeManager"] = ThemeManager;
}
