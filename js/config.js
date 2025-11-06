/**
 * Portfolio Configuration
 * Central configuration file for the portfolio application
 */

const PortfolioConfig = {
  // Theme settings
  theme: {
    defaultTheme: "light",
    storageKey: "portfolio-theme",
    logos: {
      light: "img/logo-light.png",
      dark: "img/logo-dark.png",
    },
  },

  // Language settings
  language: {
    defaultLanguage: "es",
    storageKey: "preferred-language",
    availableLanguages: ["es", "en"],
  },

  // Animation settings
  animations: {
    skillsThreshold: 0.5,
    loadingDelay: 100,
    loadingDuration: 500,
  },

  // Notification settings
  notifications: {
    duration: 5000,
    position: {
      top: "90px",
      right: "20px",
    },
    maxWidth: "400px",
  },

  // Form settings
  form: {
    contactFormId: "contact-form",
    validation: {
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },

  // Navigation settings
  navigation: {
    activeOffset: 200,
    scrollThreshold: 50,
    backgrounds: {
      light: {
        scrolled: "rgba(255, 255, 255, 0.98)",
        normal: "rgba(255, 255, 255, 0.95)",
      },
      dark: {
        scrolled: "rgba(13, 17, 23, 0.98)",
        normal: "rgba(13, 17, 23, 0.95)",
      },
    },
    shadows: {
      light: "0 2px 20px rgba(0, 0, 0, 0.1)",
      dark: "0 2px 20px rgba(0, 0, 0, 0.3)",
    },
  },

  // Debug settings
  debug: {
    enabled: false,
    logLevel: "info", // 'error', 'warn', 'info', 'debug'
  },
};

// Make configuration available globally
if (typeof window !== "undefined") {
  window["PortfolioConfig"] = PortfolioConfig;
}

// Export for Node.js environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioConfig;
}
