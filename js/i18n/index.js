/**
 * Sistema de Internacionalización - Archivo Principal
 * Internationalization System - Main File
 *
 * Este archivo combina y expone todo el sistema de i18n
 * This file combines and exposes the entire i18n system
 */

/**
 * Inicializar el sistema de traducciones
 * Initialize the translation system
 */
function initI18nSystem() {
  // Verificar que todos los componentes estén disponibles
  if (typeof I18nConfig === "undefined") {
    console.error("❌ I18nConfig not loaded");
    return null;
  }

  if (typeof TranslationLoader === "undefined") {
    console.error("❌ TranslationLoader not loaded");
    return null;
  }

  if (typeof I18n === "undefined") {
    console.error("❌ I18n class not loaded");
    return null;
  }

  try {
    // Crear nueva instancia del sistema i18n
    const i18nInstance = new I18n();

    // Inicializar
    i18nInstance.init();

    return i18nInstance;
  } catch (error) {
    console.error("❌ Error initializing I18n system:", error);
    return null;
  }
}

/**
 * Función de utilidad para obtener la instancia global de i18n
 * Utility function to get the global i18n instance
 */
function getI18nInstance() {
  if (window["i18n"]) {
    return window["i18n"];
  }

  // Inicializar si no existe
  const instance = initI18nSystem();
  if (instance) {
    window["i18n"] = instance;
    return instance;
  }

  return null;
}

/**
 * Función global de traducción rápida
 * Global quick translation function
 */
function t(key, params = {}) {
  const i18n = getI18nInstance();
  return i18n ? i18n.t(key, params) : key;
}

/**
 * Función para cambiar idioma globalmente
 * Function to change language globally
 */
function setLanguage(language) {
  const i18n = getI18nInstance();
  return i18n ? i18n.setLanguage(language) : false;
}

/**
 * Función para obtener el idioma actual
 * Function to get current language
 */
function getCurrentLanguage() {
  const i18n = getI18nInstance();
  return i18n ? i18n.getCurrentLanguage() : "es";
}

/**
 * Información del sistema de traducciones
 */
const I18nSystemInfo = {
  version: "2.0.0",
  author: "Portfolio Team",
  description: "Enhanced multilingual support system",
  supportedLanguages: ["es", "en"],
  features: [
    "Modular translation files",
    "Lazy loading support",
    "Translation caching",
    "Parameter interpolation",
    "Browser language detection",
    "localStorage persistence",
    "Change observers",
    "Fallback system",
  ],
};

// Hacer funciones disponibles globalmente
if (typeof window !== "undefined") {
  // Funciones de utilidad
  window["t"] = t;
  window["setLanguage"] = setLanguage;
  window["getCurrentLanguage"] = getCurrentLanguage;
  window["getI18nInstance"] = getI18nInstance;

  // Información del sistema
  window["I18nSystemInfo"] = I18nSystemInfo;

  // Función de inicialización manual
  window["initI18nSystem"] = initI18nSystem;
}

// Log de inicialización
if (typeof window !== "undefined") {
  console.log(
    "🌐 I18n System v2.0 loaded - Enhanced multilingual support ready"
  );
  console.log(
    "📋 Supported languages:",
    I18nSystemInfo.supportedLanguages.join(", ")
  );
}

// Export para Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    I18n,
    TranslationLoader,
    I18nConfig,
    I18nSystemInfo,
    initI18nSystem,
    t,
    setLanguage,
    getCurrentLanguage,
  };
}
