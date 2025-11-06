/**
 * Sistema de Internacionalización Mejorado
 * Enhanced Internationalization System
 */

class I18n {
  constructor(config = {}) {
    // Configuración con valores por defecto
    this.config = {
      ...window["I18nConfig"],
      ...config,
    };

    // Inicializar loader de traducciones
    this.loader = new TranslationLoader();

    // Estado actual
    this.currentLanguage = this.getInitialLanguage();
    this.isInitialized = false;

    // Cache de traducciones
    this.translationCache = new Map();

    // Observadores de cambio de idioma
    this.languageChangeObservers = [];
  }

  /**
   * Inicializa el sistema de i18n
   */
  init() {
    try {
      // Cargar todas las traducciones
      this.loader.loadAllLanguages();

      // Actualizar la página con el idioma actual
      this.updatePage();

      // Marcar como inicializado
      this.isInitialized = true;

      if (this.config.debug) {
        console.log(
          `✅ I18n initialized with language: ${this.currentLanguage}`
        );
      }

      // Notificar observadores
      this.notifyLanguageChange(this.currentLanguage);
    } catch (error) {
      console.error("❌ Error initializing I18n system:", error);
    }
  }

  /**
   * Obtiene el idioma inicial basado en configuración
   * @returns {string} - Código del idioma inicial
   */
  getInitialLanguage() {
    // 1. Idioma guardado en localStorage
    const savedLang = this.getSavedLanguage();
    if (savedLang && this.loader.isLanguageSupported(savedLang)) {
      return savedLang;
    }

    // 2. Detectar idioma del navegador
    if (this.config.detectBrowserLanguage) {
      const browserLang = this.loader.detectBrowserLanguage();
      if (browserLang) {
        return browserLang;
      }
    }

    // 3. Idioma por defecto
    return this.config.defaultLanguage;
  }

  /**
   * Obtiene el idioma guardado del localStorage
   * @returns {string|null} - Código del idioma o null
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem(this.config.storageKey);
    } catch (error) {
      console.warn("LocalStorage not available:", error);
      return null;
    }
  }

  /**
   * Traduce una clave dada
   * @param {string} key - Clave de traducción (ej: "nav.home")
   * @param {Object} params - Parámetros para interpolación
   * @returns {string} - Texto traducido
   */
  t(key, params = {}) {
    if (!key || typeof key !== "string") {
      return key || "";
    }

    // Verificar cache
    const cacheKey = `${this.currentLanguage}:${key}`;
    if (this.translationCache.has(cacheKey)) {
      const cached = this.translationCache.get(cacheKey);
      return this.interpolate(cached, params);
    }

    // Obtener traducciones del idioma actual
    const translations = this.loader.getTranslations(this.currentLanguage);

    // Navegar por la estructura de objetos anidados
    const translation = this.getNestedValue(translations, key);

    if (translation !== undefined) {
      // Guardar en cache
      this.translationCache.set(cacheKey, translation);
      return this.interpolate(translation, params);
    }

    // Fallback: intentar con idioma de respaldo
    if (this.currentLanguage !== this.config.fallbackLanguage) {
      const fallbackTranslations = this.loader.getTranslations(
        this.config.fallbackLanguage
      );
      const fallbackTranslation = this.getNestedValue(
        fallbackTranslations,
        key
      );

      if (fallbackTranslation !== undefined) {
        return this.interpolate(fallbackTranslation, params);
      }
    }

    // No se encontró la traducción
    if (this.config.debug) {
      console.warn(
        `Translation key not found: "${key}" for language: ${this.currentLanguage}`
      );
    }

    return key;
  }

  /**
   * Obtiene un valor anidado de un objeto usando dot notation
   * @param {Object} obj - Objeto fuente
   * @param {string} path - Ruta con puntos (ej: "nav.home")
   * @returns {any} - Valor encontrado o undefined
   */
  getNestedValue(obj, path) {
    if (!obj || typeof obj !== "object") {
      return undefined;
    }

    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return undefined;
      }
    }

    return result;
  }

  /**
   * Interpola parámetros en una cadena de texto
   * @param {string} text - Texto con placeholders {{param}}
   * @param {Object} params - Parámetros para interpolación
   * @returns {string} - Texto interpolado
   */
  interpolate(text, params) {
    if (typeof text !== "string" || Object.keys(params).length === 0) {
      return text;
    }

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Establece el idioma actual
   * @param {string} language - Código del idioma
   */
  setLanguage(language) {
    if (!this.loader.isLanguageSupported(language)) {
      console.warn(`Language not supported: ${language}`);
      return false;
    }

    const oldLanguage = this.currentLanguage;
    this.currentLanguage = language;

    // Guardar en localStorage
    try {
      localStorage.setItem(this.config.storageKey, language);
    } catch (error) {
      console.warn("Could not save language preference:", error);
    }

    // Limpiar cache si cambió el idioma
    if (oldLanguage !== language) {
      this.translationCache.clear();
    }

    // Actualizar la página
    this.updatePage();

    // Notificar observadores
    this.notifyLanguageChange(language, oldLanguage);

    if (this.config.debug) {
      console.log(`Language changed from ${oldLanguage} to ${language}`);
    }

    return true;
  }

  /**
   * Obtiene el idioma actual
   * @returns {string} - Código del idioma actual
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Verifica si el sistema está inicializado
   * @returns {boolean}
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Actualiza todos los elementos de la página con traducciones
   */
  updatePage() {
    // Actualizar elementos con data-i18n
    this.updateDataI18nElements();

    // Actualizar elementos específicos
    this.updateSpecificElements();

    // Actualizar placeholders y atributos
    this.updateAttributes();
  }

  /**
   * Actualiza elementos con atributo data-i18n
   */
  updateDataI18nElements() {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const params = this.getElementParams(element);

      if (key) {
        const translation = this.t(key, params);
        element.textContent = translation;
      }
    });
  }

  /**
   * Obtiene parámetros de un elemento para interpolación
   * @param {Element} element - Elemento DOM
   * @returns {Object} - Objeto con parámetros
   */
  getElementParams(element) {
    const paramsAttr = element.getAttribute("data-i18n-params");
    if (!paramsAttr) {
      return {};
    }

    try {
      return JSON.parse(paramsAttr);
    } catch (error) {
      console.warn("Invalid JSON in data-i18n-params:", paramsAttr);
      return {};
    }
  }

  /**
   * Actualiza elementos específicos que requieren lógica especial
   */
  updateSpecificElements() {
    this.updateTimelineExperience();
    this.updateProjectCards();
    this.updateContactInfo();
    this.updateForm();
  }

  /**
   * Actualiza placeholders y otros atributos
   */
  updateAttributes() {
    // Actualizar placeholders del formulario
    const formInputs = [
      { id: "name", key: "contact.form.name" },
      { id: "email", key: "contact.form.email" },
      { id: "subject", key: "contact.form.subject" },
      { id: "message", key: "contact.form.message" },
    ];

    formInputs.forEach((input) => {
      const element = document.getElementById(input.id);
      if (element) {
        element.placeholder = this.t(input.key);
      }
    });
  }

  /**
   * Actualiza timeline de experiencia
   */
  updateTimelineExperience() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const jobs = ["frontend", "uxui", "education"];

    jobs.forEach((job, index) => {
      if (timelineItems[index]) {
        const item = timelineItems[index];

        const title = item.querySelector("h3");
        const company = item.querySelector("h4");
        const date = item.querySelector(".timeline-date");
        const desc = item.querySelector("p");

        if (title) title.textContent = this.t(`experience.jobs.${job}.title`);
        if (company)
          company.textContent = this.t(`experience.jobs.${job}.company`);
        if (date) date.textContent = this.t(`experience.jobs.${job}.period`);
        if (desc)
          desc.textContent = this.t(`experience.jobs.${job}.description`);
      }
    });
  }

  /**
   * Actualiza tarjetas de proyectos
   */
  updateProjectCards() {
    const projectCards = document.querySelectorAll(".project-card");
    const projects = ["portfolio", "landing", "elearning"];

    projects.forEach((project, index) => {
      if (projectCards[index]) {
        const card = projectCards[index];

        const title = card.querySelector("h3");
        const desc = card.querySelector("p");

        if (title)
          title.textContent = this.t(`projects.items.${project}.title`);
        if (desc)
          desc.textContent = this.t(`projects.items.${project}.description`);
      }
    });
  }

  /**
   * Actualiza información de contacto
   */
  updateContactInfo() {
    const contactItems = document.querySelectorAll(".contact-item");

    if (contactItems.length >= 3) {
      const items = [
        { selector: "h4", key: "contact.info.email" },
        { selector: "h4", key: "contact.info.linkedin" },
        { selector: "h4", key: "contact.info.location" },
      ];

      items.forEach((item, index) => {
        if (contactItems[index]) {
          const element = contactItems[index].querySelector(item.selector);
          if (element) {
            element.textContent = this.t(item.key);
          }
        }
      });

      // Actualizar valor de ubicación
      const locationValue = contactItems[2]?.querySelector("p");
      if (locationValue) {
        locationValue.textContent = this.t("contact.info.locationValue");
      }
    }
  }

  /**
   * Actualiza formulario
   */
  updateForm() {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    // Labels del formulario
    const labels = [
      { for: "name", key: "contact.form.name" },
      { for: "email", key: "contact.form.email" },
      { for: "subject", key: "contact.form.subject" },
      { for: "message", key: "contact.form.message" },
    ];

    labels.forEach((label) => {
      const element = form.querySelector(`label[for="${label.for}"]`);
      if (element) {
        element.textContent = this.t(label.key);
      }
    });

    // Botón de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${this.t(
        "contact.form.send"
      )}`;
    }
  }

  /**
   * Añade un observador para cambios de idioma
   * @param {Function} callback - Función a ejecutar cuando cambie el idioma
   */
  onLanguageChange(callback) {
    if (typeof callback === "function") {
      this.languageChangeObservers.push(callback);
    }
  }

  /**
   * Remueve un observador de cambios de idioma
   * @param {Function} callback - Función a remover
   */
  offLanguageChange(callback) {
    const index = this.languageChangeObservers.indexOf(callback);
    if (index > -1) {
      this.languageChangeObservers.splice(index, 1);
    }
  }

  /**
   * Notifica a los observadores sobre cambio de idioma
   * @param {string} newLanguage - Nuevo idioma
   * @param {string} oldLanguage - Idioma anterior
   */
  notifyLanguageChange(newLanguage, oldLanguage = null) {
    this.languageChangeObservers.forEach((callback) => {
      try {
        callback(newLanguage, oldLanguage);
      } catch (error) {
        console.error("Error in language change observer:", error);
      }
    });
  }

  /**
   * Obtiene mensaje de notificación según el tipo
   * @param {string} type - Tipo de notificación (success, error, etc.)
   * @returns {string} - Mensaje traducido
   */
  getNotification(type) {
    return this.t(`contact.notifications.${type}`);
  }

  /**
   * Actualiza un elemento específico
   * @param {string} selector - Selector CSS del elemento
   * @param {string} key - Clave de traducción
   * @param {Object} params - Parámetros para interpolación
   */
  updateElement(selector, key, params = {}) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = this.t(key, params);
    }
  }

  /**
   * Obtiene todas las traducciones del idioma actual
   * @returns {Object} - Objeto completo de traducciones
   */
  getAllTranslations() {
    return this.loader.getTranslations(this.currentLanguage);
  }

  /**
   * Añade traducciones dinámicamente
   * @param {string} language - Código del idioma
   * @param {Object} translations - Nuevas traducciones
   */
  addTranslations(language, translations) {
    this.loader.addTranslations(language, translations);

    // Limpiar cache si es el idioma actual
    if (language === this.currentLanguage) {
      this.translationCache.clear();
    }
  }

  /**
   * Recarga las traducciones y actualiza la página
   */
  reload() {
    this.translationCache.clear();
    this.loader.reset();
    this.loader.loadAllLanguages();
    this.updatePage();
  }
}

// Hacer disponible globalmente
if (typeof window !== "undefined") {
  window["I18n"] = I18n;
}

// Export para Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = I18n;
}
