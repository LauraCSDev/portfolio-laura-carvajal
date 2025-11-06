module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "script",
  },
  rules: {
    // Disable implicit any warnings for this JavaScript project
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-implicit-any": "off",

    // Allow unused parameters (common in event handlers)
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

    // Allow console statements for debugging
    "no-console": "off",

    // Allow bracket notation for window properties
    "dot-notation": "off",
  },
  globals: {
    // Global classes available in browser
    NavigationManager: "readonly",
    ThemeManager: "readonly",
    LanguageManager: "readonly",
    AnimationsManager: "readonly",
    NotificationsManager: "readonly",
    FormsManager: "readonly",
    PortfolioConfig: "readonly",
    I18n: "readonly",
  },
};
