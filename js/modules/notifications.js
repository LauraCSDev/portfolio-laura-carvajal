/**
 * Notifications Module
 * Handles notification display and management
 */

class NotificationsManager {
  constructor() {
    this.init();
  }

  init() {
    this.addNotificationStyles();
  }

  show(message, type = "info") {
    if (typeof message !== "string" || typeof type !== "string") return;

    // Remove existing notifications
    this.removeExisting();

    // Create notification element
    const notification = this.createElement(message, type);

    // Add to DOM
    document.body.appendChild(notification);

    // Setup close functionality
    this.setupCloseButton(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  removeExisting() {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }
  }

  createElement(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    // Add base styles
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 10px;
      color: white;
      font-weight: 500;
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: 15px;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    // Add type-specific background
    if (type === "success") {
      notification.style.background =
        "linear-gradient(135deg, #10b981, #059669)";
    } else if (type === "error") {
      notification.style.background =
        "linear-gradient(135deg, #ef4444, #dc2626)";
    } else {
      notification.style.background =
        "linear-gradient(135deg, #3b82f6, #2563eb)";
    }

    return notification;
  }

  setupCloseButton(notification) {
    const closeButton = notification.querySelector(".notification-close");
    if (closeButton && closeButton instanceof HTMLElement) {
      closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
      `;

      closeButton.addEventListener("click", () => {
        notification.remove();
      });
    }
  }

  addNotificationStyles() {
    // Check if styles already exist
    if (document.querySelector("#notification-styles")) return;

    const notificationStyles = document.createElement("style");
    notificationStyles.id = "notification-styles";
    notificationStyles.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .notification-close:hover {
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(notificationStyles);
  }

  // Convenience methods
  success(message) {
    this.show(message, "success");
  }

  error(message) {
    this.show(message, "error");
  }

  info(message) {
    this.show(message, "info");
  }
}

// Export for use in other modules
if (typeof window !== "undefined") {
  window.NotificationsManager = NotificationsManager;
}
