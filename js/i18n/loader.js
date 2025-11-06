/**
 * Sistema de Carga de Traducciones
 * Translations Loader System
 */

class TranslationLoader {
  constructor() {
    this.translations = {};
    this.loadedLanguages = new Set();
    this.config = window["I18nConfig"] || {
      supportedLanguages: ["es", "en"],
      defaultLanguage: "es",
      fallbackLanguage: "es",
    };
  }

  /**
   * Carga las traducciones de un idioma específico
   * @param {string} language - Código del idioma (es, en)
   * @returns {Object|null} - Objeto de traducciones o null si no se encuentra
   */
  loadLanguage(language) {
    if (this.loadedLanguages.has(language)) {
      return this.translations[language];
    }

    // Intentar cargar desde window global
    const translationKey = `translations_${language}`;
    const translations = window[translationKey];

    if (translations) {
      this.translations[language] = translations;
      this.loadedLanguages.add(language);

      if (this.config.debug) {
        console.log(`✅ Translations loaded for language: ${language}`);
      }

      return translations;
    }

    console.warn(`⚠️ Translations not found for language: ${language}`);
    return null;
  }

  /**
   * Carga todas las traducciones soportadas
   */
  loadAllLanguages() {
    this.config.supportedLanguages.forEach((lang) => {
      this.loadLanguage(lang);
    });
  }

  /**
   * Obtiene las traducciones de un idioma
   * @param {string} language - Código del idioma
   * @returns {Object} - Objeto de traducciones
   */
  getTranslations(language) {
    if (this.translations[language]) {
      return this.translations[language];
    }

    // Intentar cargar el idioma
    const loaded = this.loadLanguage(language);
    if (loaded) {
      return loaded;
    }

    // Fallback al idioma por defecto
    if (language !== this.config.fallbackLanguage) {
      console.warn(
        `Falling back to ${this.config.fallbackLanguage} for language ${language}`
      );
      return this.getTranslations(this.config.fallbackLanguage);
    }

    console.error(`No translations available for ${language}`);
    return {};
  }

  /**
   * Verifica si un idioma está soportado
   * @param {string} language - Código del idioma
   * @returns {boolean}
   */
  isLanguageSupported(language) {
    return this.config.supportedLanguages.includes(language);
  }

  /**
   * Obtiene la lista de idiomas soportados
   * @returns {Array} - Array de códigos de idioma
   */
  getSupportedLanguages() {
    return [...this.config.supportedLanguages];
  }

  /**
   * Detecta el idioma preferido del navegador
   * @returns {string} - Código del idioma detectado o por defecto
   */
  detectBrowserLanguage() {
    if (!this.config.detectBrowserLanguage) {
      return this.config.defaultLanguage;
    }

    const browserLang = navigator.language || navigator.languages[0];
    const langCode = browserLang.split("-")[0]; // 'es-ES' -> 'es'

    if (this.isLanguageSupported(langCode)) {
      return langCode;
    }

    return this.config.defaultLanguage;
  }

  /**
   * Añade traducciones dinámicamente
   * @param {string} language - Código del idioma
   * @param {Object} translations - Objeto de traducciones
   */
  addTranslations(language, translations) {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }

    // Merge profundo de traducciones
    this.translations[language] = this.deepMerge(
      this.translations[language],
      translations
    );

    this.loadedLanguages.add(language);

    if (this.config.debug) {
      console.log(`✅ Dynamic translations added for: ${language}`);
    }
  }

  /**
   * Merge profundo de objetos
   * @param {Object} target - Objeto destino
   * @param {Object} source - Objeto fuente
   * @returns {Object} - Objeto fusionado
   */
  deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Reinicia el loader
   */
  reset() {
    this.translations = {};
    this.loadedLanguages.clear();
  }
}

// Hacer disponible globalmente
if (typeof window !== "undefined") {
  window["TranslationLoader"] = TranslationLoader;
}

// Export para Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = TranslationLoader;
}
