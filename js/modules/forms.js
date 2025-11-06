/**
 * Forms Module
 * Handles contact form validation and submission
 */

class FormsManager {
  constructor() {
    this.contactForm = null;
    this.notificationsManager = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.setupEventListeners();
  }

  cacheElements() {
    this.contactForm = document.getElementById("contact-form");
  }

  setupEventListeners() {
    if (!this.contactForm || !(this.contactForm instanceof HTMLFormElement))
      return;

    this.contactForm.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.contactForm) return;

    // Get form data
    const formData = new FormData(this.contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Validate form
    const validation = this.validateForm(name, email, subject, message);

    if (!validation.isValid) {
      this.showError(validation.message);
      return;
    }

    // Process form submission
    this.submitForm({ name, email, subject, message });
  }

  validateForm(name, email, subject, message) {
    // Check if all fields are filled
    if (!name || !email || !subject || !message) {
      return {
        isValid: false,
        message: this.getValidationMessage("required"),
      };
    }

    // Validate email format
    if (typeof email === "string" && !this.isValidEmail(email)) {
      return {
        isValid: false,
        message: this.getValidationMessage("email"),
      };
    }

    return { isValid: true, message: "" };
  }

  isValidEmail(email) {
    if (typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  submitForm(formData) {
    // Simulate form submission (replace with actual API call)
    this.showSuccess(this.getSuccessMessage());

    // Reset form
    if (this.contactForm) {
      this.contactForm.reset();
    }

    // Here you would typically send the data to a server
    console.log("Form submitted:", formData);
  }

  showSuccess(message) {
    if (this.notificationsManager) {
      this.notificationsManager.success(message);
    }
  }

  showError(message) {
    if (this.notificationsManager) {
      this.notificationsManager.error(message);
    }
  }

  getValidationMessage(type) {
    const currentLang = window.i18n?.getCurrentLanguage() || "es";

    const messages = {
      es: {
        required: "Por favor, completa todos los campos.",
        email: "Por favor, ingresa un email válido.",
      },
      en: {
        required: "Please fill in all fields.",
        email: "Please enter a valid email address.",
      },
    };

    return messages[currentLang]?.[type] || messages.es[type];
  }

  getSuccessMessage() {
    const currentLang = window.i18n?.getCurrentLanguage() || "es";

    const messages = {
      es: "¡Mensaje enviado con éxito! Te contactaré pronto.",
      en: "Message sent successfully! I will contact you soon.",
    };

    return messages[currentLang] || messages.es;
  }

  // Set notifications manager reference
  setNotificationsManager(notificationsManager) {
    this.notificationsManager = notificationsManager;
  }
}

// Export for use in other modules
if (typeof window !== "undefined") {
  window.FormsManager = FormsManager;
}
