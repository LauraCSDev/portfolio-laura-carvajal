/**
 * Global Type Declarations
 * Extends window object and fixes TypeScript issues
 */

// Extend Window interface for our custom properties
declare global {
    interface Window {
        NavigationManager: any;
        ThemeManager: any;
        LanguageManager: any;
        AnimationsManager: any;
        NotificationsManager: any;
        FormsManager: any;
        PortfolioConfig: any;
        portfolioApp: any;
        i18n: any;
        I18n: any;
        updateThemeTooltips: any;
    }
}

// Export empty object to make this a module
export { };