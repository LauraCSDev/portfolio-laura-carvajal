/**
 * Módulo de Temas
 * Maneja el cambio entre tema claro y oscuro
 */

class ThemeModule {
  constructor() {
    this.isInitialized = false;
    this.currentTheme = localStorage.getItem("portfolio-theme") || "light";
    this.themeToggle = null;
  }

  /**
   * Inicializar el módulo de temas
   */
  init() {
    if (this.isInitialized) return;

    // Buscar botón flotante
    this.themeToggle =
      document.querySelector("#floating-theme-toggle") ||
      document.querySelector(".theme-toggle");

    if (!this.themeToggle) {
      console.warn("⚠️ Botón de cambio de tema no encontrado");
      return;
    }

    this.setupThemeToggle();
    this.applyTheme(this.currentTheme);

    this.isInitialized = true;
    console.log("✅ Módulo de temas inicializado");
  }

  /**
   * Configurar el botón de cambio de tema
   */
  setupThemeToggle() {
    // Aplicar tema guardado
    this.updateThemeButton(this.currentTheme);
    this.updateLogos(this.currentTheme);

    // Event listener para cambio de tema
    this.themeToggle.addEventListener("click", () => {
      const newTheme = this.currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    });
  }

  /**
   * Establecer un tema específico
   * @param {string} theme - 'light' o 'dark'
   */
  setTheme(theme) {
    if (!["light", "dark"].includes(theme)) {
      console.warn(`⚠️ Tema inválido: ${theme}`);
      return;
    }

    this.currentTheme = theme;
    this.applyTheme(theme);
    this.updateThemeButton(theme);
    this.updateLogos(theme);

    // Guardar en localStorage
    localStorage.setItem("portfolio-theme", theme);

    // Emitir evento personalizado
    this.dispatchThemeChange(theme);
  }

  /**
   * Aplicar el tema al documento
   * @param {string} theme - Tema a aplicar
   */
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = document.body.className.replace(/theme-\w+/g, "");
    document.body.classList.add(`theme-${theme}`);

    // Mark body as loaded to prevent flash
    document.body.classList.add("loaded");
  }

  /**
   * Actualizar el botón de cambio de tema
   * @param {string} theme - Tema actual
   */
  updateThemeButton(theme) {
    if (!this.themeToggle) return;

    // Buscar icono tanto en botón flotante como en navbar
    const icon =
      this.themeToggle.querySelector("#theme-icon") ||
      this.themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }

    // Actualizar título del botón
    const tooltips = {
      light: {
        es: "Cambiar a tema oscuro",
        en: "Switch to dark theme",
      },
      dark: {
        es: "Cambiar a tema claro",
        en: "Switch to light theme",
      },
    };

    const currentLang = window.portfolioI18n?.getCurrentLanguage() || "es";
    this.themeToggle.title = tooltips[theme][currentLang];
  }

  /**
   * Actualizar logos según el tema
   * @param {string} theme - Tema actual
   */
  updateLogos(theme) {
    const logoSelectors = [
      "#navbar-logo",
      "#hero-logo",
      "#favicon",
      "#apple-icon",
    ];

    const logoSrc =
      theme === "light" ? "img/logo-light.png" : "img/logo-dark.png";

    logoSelectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        if (element.tagName.toLowerCase() === "img") {
          element.src = logoSrc;
        } else {
          element.href = logoSrc;
        }
      }
    });
  }

  /**
   * Obtener el tema actual
   * @returns {string} - Tema actual
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Alternar entre temas
   */
  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  /**
   * Detectar preferencia del sistema
   * @returns {string} - 'light' o 'dark'
   */
  detectSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  }

  /**
   * Usar tema del sistema si no hay preferencia guardada
   */
  useSystemTheme() {
    if (!localStorage.getItem("portfolio-theme")) {
      const systemTheme = this.detectSystemTheme();
      this.setTheme(systemTheme);
    }
  }

  /**
   * Escuchar cambios en la preferencia del sistema
   */
  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (!localStorage.getItem("portfolio-theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
    }
  }

  /**
   * Emitir evento de cambio de tema
   * @param {string} theme - Nuevo tema
   */
  dispatchThemeChange(theme) {
    const event = new CustomEvent("themeChanged", {
      detail: { theme, previousTheme: this.currentTheme },
    });
    document.dispatchEvent(event);
  }

  /**
   * Actualizar tooltips cuando cambie el idioma
   * @param {string} lang - Idioma actual
   */
  updateTooltips(lang) {
    if (!this.themeToggle) return;

    const tooltips = {
      light: {
        es: "Cambiar a tema oscuro",
        en: "Switch to dark theme",
      },
      dark: {
        es: "Cambiar a tema claro",
        en: "Switch to light theme",
      },
    };

    this.themeToggle.title = tooltips[this.currentTheme][lang];
  }
}

// Exportar para uso global
window.ThemeModule = ThemeModule;
