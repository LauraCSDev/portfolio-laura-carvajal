/**
 * Configuración del Sistema de Internacionalización
 * Configuration for Internationalization System
 */

const I18nConfig = {
  // Idiomas disponibles / Available languages
  supportedLanguages: ["es", "en"],

  // Idioma por defecto / Default language
  defaultLanguage: "es",

  // Clave para localStorage / LocalStorage key
  storageKey: "preferred-language",

  // Configuración de fallback / Fallback configuration
  fallbackLanguage: "es",

  // Configuración de debug / Debug configuration
  debug: false,

  // Configuración de carga / Loading configuration
  lazyLoad: false, // Para futuras mejoras de performance

  // Detectar idioma del navegador / Detect browser language
  detectBrowserLanguage: true,
};

// Hacer disponible globalmente
if (typeof window !== "undefined") {
  window["I18nConfig"] = I18nConfig;
}

// Export para Node.js si es necesario
if (typeof module !== "undefined" && module.exports) {
  module.exports = I18nConfig;
}
