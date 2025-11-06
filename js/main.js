/**
 * Main Application Module
 * Initializes and coordinates all portfolio modules
 */

class PortfolioApp {
  constructor() {
    this.navigationManager = null;
    this.themeManager = null;
    this.languageManager = null;
    this.animationsManager = null;
    this.notificationsManager = null;
    this.formsManager = null;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeModules()
      );
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    try {
      // Initialize core modules first
      this.initNotifications();
      this.initLanguage();
      this.initTheme();
      this.initNavigation();
      this.initAnimations();
      this.initForms();

      // Setup inter-module connections
      this.connectModules();

      // Log successful initialization
      this.logSuccess();
    } catch (error) {
      console.error("❌ Error initializing portfolio:", error);
    }
  }

  initNotifications() {
    if (typeof NotificationsManager !== "undefined") {
      this.notificationsManager = new NotificationsManager();
      console.log("✓ Notifications system initialized");
    }
  }

  initLanguage() {
    if (typeof LanguageManager !== "undefined") {
      this.languageManager = new LanguageManager();
      console.log("✓ Language system initialized");
    }
  }

  initTheme() {
    if (typeof ThemeManager !== "undefined") {
      this.themeManager = new ThemeManager();
      console.log("✓ Theme system initialized");
    }
  }

  initNavigation() {
    if (typeof NavigationManager !== "undefined") {
      this.navigationManager = new NavigationManager();
      console.log("✓ Navigation system initialized");
    }
  }

  initAnimations() {
    if (typeof AnimationsManager !== "undefined") {
      this.animationsManager = new AnimationsManager();
      console.log("✓ Animations system initialized");
    }
  }

  initForms() {
    if (typeof FormsManager !== "undefined") {
      this.formsManager = new FormsManager();
      console.log("✓ Forms system initialized");
    }
  }

  connectModules() {
    // Connect theme manager with navigation manager
    if (this.themeManager && this.navigationManager) {
      this.themeManager.setNavigationManager(this.navigationManager);
    }

    // Connect language manager with theme manager
    if (this.languageManager && this.themeManager) {
      this.languageManager.setThemeManager(this.themeManager);
    }

    // Connect forms manager with notifications manager
    if (this.formsManager && this.notificationsManager) {
      this.formsManager.setNotificationsManager(this.notificationsManager);
    }

    console.log("✓ Module connections established");
  }

  logSuccess() {
    console.log("✅ Portfolio loaded successfully! 🚀");
    console.log("🎯 Features loaded:");
    console.log("  - ✓ Mobile navigation");
    console.log("  - ✓ Smooth scrolling");
    console.log("  - ✓ Active link highlighting");
    console.log("  - ✓ Skill bar animations");
    console.log("  - ✓ Form validation");
    console.log("  - ✓ Notification system");
    console.log("  - ✓ Theme switcher");
    console.log("  - ✓ Internationalization");
    console.log("🎉 All components ready!");
  }

  // Public API methods
  getNavigationManager() {
    return this.navigationManager;
  }

  getThemeManager() {
    return this.themeManager;
  }

  getLanguageManager() {
    return this.languageManager;
  }

  getAnimationsManager() {
    return this.animationsManager;
  }

  getNotificationsManager() {
    return this.notificationsManager;
  }

  getFormsManager() {
    return this.formsManager;
  }
}

// Initialize the application
const app = new PortfolioApp();

// Make app available globally for debugging
if (typeof window !== "undefined") {
  window.portfolioApp = app;
}
