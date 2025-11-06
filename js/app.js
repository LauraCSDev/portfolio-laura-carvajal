/**
 * Portfolio Application - Coordinador Principal
 * Orchestrates all modules and provides unified API
 */

class PortfolioApp {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.i18n = null;

    // Estado de la aplicación
    this.state = {
      language: localStorage.getItem("portfolio-lang") || "es",
      theme: localStorage.getItem("portfolio-theme") || "light",
      isLoading: true,
    };
  }

  /**
   * Inicializar la aplicación completa
   */
  async init() {
    if (this.isInitialized) return;

    try {
      console.log("🚀 Inicializando Portfolio App...");

      // Inicializar sistema i18n primero
      await this.initI18n();

      // Inicializar módulos
      this.initModules();

      // Configurar eventos globales
      this.setupGlobalEvents();

      // Configurar API global
      this.setupGlobalAPI();

      this.isInitialized = true;
      this.state.isLoading = false;

      console.log("✅ Portfolio App inicializado correctamente");
      this.logLoadedFeatures();
    } catch (error) {
      console.error("❌ Error al inicializar Portfolio App:", error);
      this.handleInitError(error);
    }
  }

  /**
   * Inicializar sistema de internacionalización
   */
  async initI18n() {
    if (typeof PortfolioI18n === "undefined") {
      throw new Error("PortfolioI18n class not found");
    }

    this.i18n = new PortfolioI18n();
    await this.i18n.init();

    // Actualizar estado
    this.state.language = this.i18n.getCurrentLanguage();

    console.log("🌐 Sistema i18n inicializado");
  }

  /**
   * Inicializar todos los módulos
   */
  initModules() {
    // Definir módulos disponibles
    const moduleClasses = {
      navigation: NavigationModule,
      theme: ThemeModule,
      animations: AnimationsModule,
      forms: FormsModule,
    };

    // Inicializar cada módulo
    Object.entries(moduleClasses).forEach(([name, ModuleClass]) => {
      try {
        if (typeof ModuleClass !== "undefined") {
          this.modules[name] = new ModuleClass();
          this.modules[name].init();
        } else {
          console.warn(`⚠️ Módulo ${name} no encontrado`);
        }
      } catch (error) {
        console.error(`❌ Error al inicializar módulo ${name}:`, error);
      }
    });
  }

  /**
   * Configurar eventos globales
   */
  setupGlobalEvents() {
    // Escuchar cambios de idioma
    document.addEventListener("languageChanged", (event) => {
      this.handleLanguageChange(event.detail.language);
    });

    // Escuchar cambios de tema
    document.addEventListener("themeChanged", (event) => {
      this.handleThemeChange(event.detail.theme);
    });

    // Configurar selector de idioma
    this.setupLanguageSelector();

    // Manejar errores globales
    window.addEventListener("error", (event) => {
      this.handleGlobalError(event);
    });

    // Manejar promesas rechazadas
    window.addEventListener("unhandledrejection", (event) => {
      this.handleUnhandledRejection(event);
    });
  }

  /**
   * Configurar selector de idioma
   */
  setupLanguageSelector() {
    const languageToggle = document.getElementById("language-toggle");
    const languageDropdown = document.querySelector(".language-dropdown");
    const languageOptions = document.querySelectorAll(".language-option");

    if (!languageToggle || !languageDropdown) return;

    // Mostrar/ocultar dropdown
    languageToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      languageDropdown.classList.toggle("show");
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener("click", () => {
      languageDropdown.classList.remove("show");
    });

    // Prevenir cierre al hacer click dentro
    languageDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Manejar selección de idioma
    languageOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = option.getAttribute("data-lang");
        if (lang) {
          this.changeLanguage(lang);
          languageDropdown.classList.remove("show");
        }
      });
    });
  }

  /**
   * Manejar cambio de idioma
   * @param {string} language - Nuevo idioma
   */
  handleLanguageChange(language) {
    this.state.language = language;

    // Actualizar selector de idioma
    this.updateLanguageSelector(language);

    // Actualizar tooltips de otros módulos
    if (this.modules.theme) {
      this.modules.theme.updateTooltips(language);
    }

    console.log(`🌐 Idioma cambiado a: ${language}`);
  }

  /**
   * Manejar cambio de tema
   * @param {string} theme - Nuevo tema
   */
  handleThemeChange(theme) {
    this.state.theme = theme;
    console.log(`🎨 Tema cambiado a: ${theme}`);
  }

  /**
   * Actualizar selector de idioma
   * @param {string} language - Idioma actual
   */
  updateLanguageSelector(language) {
    const languageToggle = document.getElementById("language-toggle");
    if (!languageToggle) return;

    const flagSpan = languageToggle.querySelector(".flag");
    const textSpan = languageToggle.querySelector(".lang-text");

    if (flagSpan && textSpan) {
      const langData = {
        es: { flag: "🇪🇸", text: "ES" },
        en: { flag: "🇺🇸", text: "EN" },
      };

      const data = langData[language] || langData.es;
      flagSpan.textContent = data.flag;
      textSpan.textContent = data.text;
    }
  }

  /**
   * Configurar API global
   */
  setupGlobalAPI() {
    window.portfolioApp = this;

    // API de utilidades globales
    window.portfolioUtils = {
      // Datos
      getData: () => this.i18n?.getData(),

      // Idioma
      changeLanguage: (lang) => this.changeLanguage(lang),
      getCurrentLanguage: () => this.state.language,

      // Tema
      changeTheme: (theme) => this.modules.theme?.setTheme(theme),
      toggleTheme: () => this.modules.theme?.toggleTheme(),
      getCurrentTheme: () => this.state.theme,

      // Navegación
      goToSection: (sectionId) =>
        this.modules.navigation?.goToSection(sectionId),
      getCurrentSection: () => this.modules.navigation?.getCurrentSection(),

      // Notificaciones
      showNotification: (message, type, duration) =>
        this.modules.forms?.showNotification(message, type, duration),

      // Animaciones
      animateElement: (element, animation, delay) =>
        this.modules.animations?.animateElement(element, animation, delay),
      staggerAnimation: (selector, animation, delay) =>
        this.modules.animations?.staggerAnimation(selector, animation, delay),

      // Estado
      getAppState: () => ({ ...this.state }),
      isReady: () => this.isInitialized && !this.state.isLoading,
    };
  }

  /**
   * Cambiar idioma
   * @param {string} language - Nuevo idioma
   */
  changeLanguage(language) {
    if (this.i18n) {
      this.i18n.updateLanguage(language);
    }
  }

  /**
   * Obtener módulo específico
   * @param {string} moduleName - Nombre del módulo
   * @returns {Object|null} - Instancia del módulo
   */
  getModule(moduleName) {
    return this.modules[moduleName] || null;
  }

  /**
   * Verificar si un módulo está disponible
   * @param {string} moduleName - Nombre del módulo
   * @returns {boolean} - Está disponible
   */
  hasModule(moduleName) {
    return !!this.modules[moduleName];
  }

  /**
   * Manejar error de inicialización
   * @param {Error} error - Error ocurrido
   */
  handleInitError(error) {
    document.body.classList.add("init-error");

    // Mostrar mensaje de error básico
    const errorMessage = document.createElement("div");
    errorMessage.className = "init-error-message";
    errorMessage.innerHTML = `
      <div class="error-content">
        <h2>Error de inicialización</h2>
        <p>Hubo un problema al cargar la aplicación. Por favor, recarga la página.</p>
        <button onclick="location.reload()">Recargar página</button>
      </div>
    `;

    document.body.appendChild(errorMessage);
  }

  /**
   * Manejar errores globales
   * @param {ErrorEvent} event - Evento de error
   */
  handleGlobalError(event) {
    console.error("Error global capturado:", event.error);

    // En producción, aquí se podría enviar el error a un servicio de monitoreo
    if (this.modules.forms) {
      this.modules.forms.showNotification(
        "Se produjo un error inesperado",
        "error"
      );
    }
  }

  /**
   * Manejar promesas rechazadas no capturadas
   * @param {PromiseRejectionEvent} event - Evento de rechazo
   */
  handleUnhandledRejection(event) {
    console.error("Promesa rechazada no capturada:", event.reason);
    event.preventDefault(); // Prevenir que aparezca en la consola del navegador
  }

  /**
   * Registrar características cargadas
   */
  logLoadedFeatures() {
    const features = [
      "🌐 Sistema i18n unificado con JSON",
      "📱 Navegación móvil responsiva",
      "🎨 Cambio de tema dinámico",
      "🔄 Animaciones de scroll optimizadas",
      "📝 Formularios con validación avanzada",
      "🔔 Sistema de notificaciones mejorado",
      "🚀 Navegación suave entre secciones",
      "⚡ API global de utilidades",
      "🛡️ Manejo robusto de errores",
    ];

    console.log("🎯 Características habilitadas:");
    features.forEach((feature) => console.log(`  ${feature}`));
    console.log("🎉 ¡Todo listo para funcionar!");
  }

  /**
   * Destruir la aplicación (cleanup)
   */
  destroy() {
    // Destruir módulos
    Object.values(this.modules).forEach((module) => {
      if (typeof module.destroy === "function") {
        module.destroy();
      }
    });

    // Limpiar referencias globales
    delete window.portfolioApp;
    delete window.portfolioUtils;

    this.isInitialized = false;
    console.log("🔄 Portfolio App destruido");
  }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async () => {
  const app = new PortfolioApp();
  await app.init();
});

// Exportar para uso global
window.PortfolioApp = PortfolioApp;
