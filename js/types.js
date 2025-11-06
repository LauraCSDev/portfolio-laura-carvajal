/**
 * JSDoc Type Definitions for Portfolio Project
 */

/**
 * @typedef {Object} NotificationManager
 * @property {function(string, string): void} show - Show notification
 * @property {function(string): void} success - Show success notification
 * @property {function(string): void} error - Show error notification
 * @property {function(string): void} info - Show info notification
 */

/**
 * @typedef {Object} ThemeManager
 * @property {function(): string} getCurrentTheme - Get current theme
 * @property {function(string): void} setTheme - Set theme
 * @property {function(): void} refreshTooltips - Refresh tooltips
 * @property {function(NavigationManager): void} setNavigationManager - Set navigation manager reference
 */

/**
 * @typedef {Object} NavigationManager
 * @property {function(): void} refreshNavbarBackground - Refresh navbar background
 * @property {function(): void} closeMobileMenu - Close mobile menu
 */

/**
 * @typedef {Object} LanguageManager
 * @property {function(): string} getCurrentLanguage - Get current language
 * @property {function(string): void} changeLanguage - Change language
 * @property {function(ThemeManager): void} setThemeManager - Set theme manager reference
 */

/**
 * @typedef {Object} AnimationsManager
 * @property {function(): void} triggerSkillAnimation - Trigger skill animation manually
 * @property {function(): void} destroy - Clean up observers
 */

/**
 * @typedef {Object} FormsManager
 * @property {function(NotificationManager): void} setNotificationsManager - Set notifications manager reference
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string} message - Error message if invalid
 */

// Make types available globally for JSDoc
if (typeof window !== "undefined") {
  window.JSDocTypes = {};
}
