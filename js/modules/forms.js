/**
 * Módulo de Formularios y Notificaciones
 * Maneja formularios, validaciones y sistema de notificaciones
 */

class FormsModule {
  constructor() {
    this.isInitialized = false;
    this.activeNotifications = new Map();
    this.notificationCounter = 0;
  }

  /**
   * Inicializar el módulo de formularios
   */
  init() {
    if (this.isInitialized) return;

    this.setupContactForm();
    this.setupNotificationStyles();

    this.isInitialized = true;
    console.log("✅ Módulo de formularios inicializado");
  }

  /**
   * Configurar formulario de contacto
   */
  setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) {
      console.warn("⚠️ Formulario de contacto no encontrado");
      return;
    }

    form.addEventListener("submit", (e) => {
      this.handleFormSubmit(e, form);
    });

    // Validación en tiempo real
    this.setupRealTimeValidation(form);
  }

  /**
   * Manejar envío del formulario
   * @param {Event} e - Evento de submit
   * @param {HTMLFormElement} form - Formulario
   */
  async handleFormSubmit(e, form) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent || "Enviar";

    try {
      // Validar formulario
      const validation = this.validateForm(form);
      if (!validation.isValid) {
        this.showNotification(validation.message, "error");
        return;
      }

      // Mostrar estado de carga
      this.setSubmitButtonState(submitBtn, "loading");

      // Simular envío del formulario
      const formData = this.getFormData(form);
      await this.submitForm(formData);

      // Mostrar mensaje de éxito
      this.showNotification(
        window.portfolioI18n?.getText("contact.notifications.success") ||
          "Mensaje enviado correctamente!",
        "success"
      );

      form.reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);

      // Mostrar mensaje de error
      this.showNotification(
        window.portfolioI18n?.getText("contact.notifications.error") ||
          "Error al enviar el mensaje",
        "error"
      );
    } finally {
      // Restaurar botón
      this.setSubmitButtonState(submitBtn, "normal", originalText);
    }
  }

  /**
   * Configurar validación en tiempo real
   * @param {HTMLFormElement} form - Formulario
   */
  setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        // Limpiar error si el usuario está escribiendo
        this.clearFieldError(input);
      });
    });
  }

  /**
   * Validar formulario completo
   * @param {HTMLFormElement} form - Formulario
   * @returns {Object} - Resultado de validación
   */
  validateForm(form) {
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validaciones
    if (!name || name.length < 2) {
      return {
        isValid: false,
        message: "Por favor, ingresa un nombre válido (mínimo 2 caracteres)",
      };
    }

    if (!email || !this.isValidEmail(email)) {
      return {
        isValid: false,
        message: "Por favor, ingresa un email válido",
      };
    }

    if (!message || message.length < 10) {
      return {
        isValid: false,
        message: "Por favor, ingresa un mensaje (mínimo 10 caracteres)",
      };
    }

    return { isValid: true };
  }

  /**
   * Validar campo individual
   * @param {HTMLInputElement} field - Campo a validar
   * @returns {boolean} - Es válido
   */
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = "";

    switch (field.type) {
      case "email":
        if (!this.isValidEmail(value)) {
          isValid = false;
          message = "Email inválido";
        }
        break;
      case "text":
        if (field.required && value.length < 2) {
          isValid = false;
          message = "Mínimo 2 caracteres";
        }
        break;
      default:
        if (field.required && !value) {
          isValid = false;
          message = "Campo requerido";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, message);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  /**
   * Mostrar error en campo
   * @param {HTMLElement} field - Campo
   * @param {string} message - Mensaje de error
   */
  showFieldError(field, message) {
    field.classList.add("error");

    // Remover mensaje de error anterior
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }

    // Agregar nuevo mensaje de error
    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  /**
   * Limpiar error de campo
   * @param {HTMLElement} field - Campo
   */
  clearFieldError(field) {
    field.classList.remove("error");
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * Validar email
   * @param {string} email - Email a validar
   * @returns {boolean} - Es válido
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Obtener datos del formulario
   * @param {HTMLFormElement} form - Formulario
   * @returns {Object} - Datos del formulario
   */
  getFormData(form) {
    const formData = new FormData(form);
    return {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
  }

  /**
   * Simular envío del formulario
   * @param {Object} formData - Datos del formulario
   */
  async submitForm(formData) {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Aquí iría la lógica real de envío
    console.log("📧 Formulario enviado:", formData);
  }

  /**
   * Establecer estado del botón de envío
   * @param {HTMLElement} button - Botón
   * @param {string} state - Estado: 'loading', 'normal'
   * @param {string} text - Texto del botón
   */
  setSubmitButtonState(button, state, text = null) {
    if (!button) return;

    switch (state) {
      case "loading":
        button.disabled = true;
        button.classList.add("loading");
        button.innerHTML = `
          <i class="fas fa-spinner fa-spin"></i>
          ${window.portfolioI18n?.getText("ui.system.loading") || "Enviando..."}
        `;
        break;
      case "normal":
        button.disabled = false;
        button.classList.remove("loading");
        button.innerHTML = `
          <i class="fas fa-paper-plane"></i>
          ${text || "Enviar Mensaje"}
        `;
        break;
    }
  }

  /**
   * Mostrar notificación
   * @param {string} message - Mensaje
   * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duración en ms
   */
  showNotification(message, type = "info", duration = 5000) {
    const notification = this.createNotification(message, type);
    const id = ++this.notificationCounter;

    // Agregar al DOM
    document.body.appendChild(notification);
    this.activeNotifications.set(id, notification);

    // Mostrar con animación
    setTimeout(() => notification.classList.add("show"), 100);

    // Auto-cerrar
    const autoClose = setTimeout(() => {
      this.closeNotification(id);
    }, duration);

    // Configurar cierre manual
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn?.addEventListener("click", () => {
      clearTimeout(autoClose);
      this.closeNotification(id);
    });

    return id;
  }

  /**
   * Crear elemento de notificación
   * @param {string} message - Mensaje
   * @param {string} type - Tipo de notificación
   * @returns {HTMLElement} - Elemento de notificación
   */
  createNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      warning: "fa-exclamation-triangle",
      info: "fa-info-circle",
    };

    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${icons[type] || icons.info}"></i>
        <span class="notification-message">${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    return notification;
  }

  /**
   * Cerrar notificación
   * @param {number} id - ID de la notificación
   */
  closeNotification(id) {
    const notification = this.activeNotifications.get(id);
    if (!notification) return;

    notification.classList.remove("show");

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      this.activeNotifications.delete(id);
    }, 300);
  }

  /**
   * Cerrar todas las notificaciones
   */
  closeAllNotifications() {
    this.activeNotifications.forEach((notification, id) => {
      this.closeNotification(id);
    });
  }

  /**
   * Configurar estilos de notificaciones
   */
  setupNotificationStyles() {
    if (document.querySelector("#notification-styles")) return;

    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        margin-bottom: 1rem;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification-success {
        background: var(--success-color, #22c55e);
        color: white;
      }
      
      .notification-error {
        background: var(--error-color, #ef4444);
        color: white;
      }
      
      .notification-warning {
        background: var(--warning-color, #f59e0b);
        color: white;
      }
      
      .notification-info {
        background: var(--info-color, #3b82f6);
        color: white;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: currentColor;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        border-radius: 0.25rem;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      .field-error {
        color: var(--error-color, #ef4444);
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
      
      .form-group input.error,
      .form-group textarea.error {
        border-color: var(--error-color, #ef4444);
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
      }
      
      .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
      }
    `;

    document.head.appendChild(styles);
  }
}

// Exportar para uso global
window.FormsModule = FormsModule;
