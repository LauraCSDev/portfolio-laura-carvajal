/**
 * Language System Module
 * Handles language selection and integration with i18n system
 */

class LanguageManager {
  constructor() {
    this.languageToggle = null;
    this.languageDropdown = null;
    this.languageOptions = null;
    this.i18n = null;
    this.themeManager = null;

    this.init();
  }

  init() {
    // Initialize enhanced i18n system
    this.i18n = window["getI18nInstance"] ? window["getI18nInstance"]() : null;

    if (!this.i18n && typeof initI18nSystem !== "undefined") {
      this.i18n = initI18nSystem();
      if (this.i18n && typeof window !== "undefined") {
        window["i18n"] = this.i18n;
      }
    }

    this.cacheElements();
    this.setupEventListeners();
  }

  cacheElements() {
    this.languageToggle = document.getElementById("language-toggle");
    this.languageDropdown = document.querySelector(".language-dropdown");
    this.languageOptions = document.querySelectorAll(".language-option");
  }

  setupEventListeners() {
    if (!this.languageToggle || !this.languageDropdown) return;

    // Show/hide dropdown
    this.languageToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.languageDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      this.languageDropdown.classList.remove("show");
    });

    // Prevent dropdown from closing when clicking inside
    this.languageDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Handle language selection
    if (this.languageOptions) {
      this.languageOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.preventDefault();
          const lang = option.getAttribute("data-lang");
          if (lang && this.i18n) {
            this.changeLanguage(lang);
            if (this.languageDropdown) {
              this.languageDropdown.classList.remove("show");
            }
          }
        });
      });
    }
  }

  changeLanguage(lang) {
    if (!this.i18n) return;

    this.i18n.setLanguage(lang);
    this.updateLanguageButton(lang);

    // Notify theme manager to refresh tooltips
    if (this.themeManager) {
      this.themeManager.refreshTooltips();
    }
  }

  updateLanguageButton(lang) {
    if (!this.languageToggle) return;

    const selectedOption = document.querySelector(`[data-lang="${lang}"]`);
    if (!selectedOption) return;

    const flagSpan = this.languageToggle.querySelector(".flag");
    const textSpan = this.languageToggle.querySelector(".lang-text");
    const selectedFlag = selectedOption.querySelector(".flag")?.textContent;
    const selectedText =
      selectedOption.querySelector(".lang-name")?.textContent;

    if (flagSpan && selectedFlag) {
      flagSpan.textContent = selectedFlag;
    }

    if (textSpan && selectedText) {
      textSpan.textContent = selectedText;
    }
  }

  // Set theme manager reference
  setThemeManager(themeManager) {
    this.themeManager = themeManager;
  }

  // Get current language
  getCurrentLanguage() {
    return this.i18n?.getCurrentLanguage() || "es";
  }

  // Get i18n instance
  getI18n() {
    return this.i18n;
  }
}

// Make available globally
if (typeof window !== "undefined") {
  window["LanguageManager"] = LanguageManager;
}
