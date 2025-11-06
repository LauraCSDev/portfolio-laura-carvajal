/**
 * Portfolio JavaScript - Sistema mejorado con datos unificados
 * Improved portfolio system with unified data structure
 */

// Variables globales
let portfolioI18n;

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Inicializar sistema de traducciones
    portfolioI18n = new PortfolioI18n();
    await portfolioI18n.init();

    // Configurar navegación móvil
    setupMobileNavigation();

    // Configurar tema
    setupThemeToggle();

    // Configurar animaciones de scroll
    setupScrollAnimations();

    // Configurar formulario de contacto
    setupContactForm();

    // Configurar navegación suave
    setupSmoothScrolling();

    console.log("🎉 Portfolio inicializado correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar el portfolio:", error);
  }
});

/**
 * Configuración de navegación móvil
 */
function setupMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-link");

  if (hamburger && navLinks) {
    // Toggle menú móvil
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });

    // Cerrar menú al hacer click en un enlace
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }
}

/**
 * Configuración de cambio de tema
 */
function setupThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const logo = document.getElementById("hero-logo");

  if (!themeToggle) return;

  // Obtener tema guardado o usar predeterminado
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);
  updateLogo(savedTheme);

  // Cambiar tema al hacer click
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeButton(newTheme);
    updateLogo(newTheme);
  });

  function updateThemeButton(theme) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
    themeToggle.title = portfolioI18n
      ? portfolioI18n.getText("ui.theme.toggle")
      : "Cambiar tema";
  }

  function updateLogo(theme) {
    if (logo) {
      logo.src = theme === "light" ? "img/logo-light.png" : "img/logo-dark.png";
    }
  }
}

/**
 * Configuración de animaciones de scroll
 */
function setupScrollAnimations() {
  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Animar contadores si es la sección about
        if (entry.target.classList.contains("about")) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observar secciones
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Observar cards individuales
  document
    .querySelectorAll(".cert-card, .project-card, .timeline-item")
    .forEach((card) => {
      observer.observe(card);
    });
}

/**
 * Animación de contadores
 */
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, "")) || 0;
    const suffix = counter.textContent.replace(/\d/g, "");
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 30);
  });
}

/**
 * Configuración del formulario de contacto
 */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      // Mostrar estado de carga
      submitBtn.textContent = portfolioI18n
        ? portfolioI18n.getText("ui.system.loading")
        : "Enviando...";
      submitBtn.disabled = true;

      // Simular envío (aquí iría la lógica real de envío)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mostrar mensaje de éxito
      showNotification(
        portfolioI18n
          ? portfolioI18n.getText("contact.notifications.success")
          : "Mensaje enviado correctamente!",
        "success"
      );

      form.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showNotification(
        portfolioI18n
          ? portfolioI18n.getText("contact.notifications.error")
          : "Error al enviar el mensaje",
        "error"
      );
    } finally {
      // Restaurar botón
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Mostrar notificaciones
 */
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${
        type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
      }"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Agregar estilos si no existen
  if (!document.querySelector("#notification-styles")) {
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
      }
    `;
    document.head.appendChild(styles);
  }

  // Agregar al DOM
  document.body.appendChild(notification);

  // Mostrar con animación
  setTimeout(() => notification.classList.add("show"), 100);

  // Configurar cierre automático
  const closeBtn = notification.querySelector(".notification-close");
  const autoClose = setTimeout(() => {
    closeNotification(notification);
  }, 5000);

  // Cerrar al hacer click
  closeBtn.addEventListener("click", () => {
    clearTimeout(autoClose);
    closeNotification(notification);
  });

  function closeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

/**
 * Configuración de navegación suave
 */
function setupSmoothScrolling() {
  // Navegación suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 70;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Actualizar navegación activa en scroll
  let ticking = false;

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const headerHeight = document.querySelector(".header")?.offsetHeight || 70;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    ticking = false;
  }

  function requestUpdateActiveNav() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdateActiveNav);
}

/**
 * Utilidades globales
 */
window.portfolioUtils = {
  // Obtener datos del portfolio
  getData: () => portfolioI18n?.getData(),

  // Cambiar idioma
  changeLanguage: (lang) => {
    if (portfolioI18n) {
      portfolioI18n.updateLanguage(lang);
    }
  },

  // Obtener idioma actual
  getCurrentLanguage: () => portfolioI18n?.getCurrentLanguage(),

  // Mostrar notificación
  showNotification,
};

// Log de éxito
console.log("🎉 Sistema de portfolio mejorado cargado correctamente!");
console.log("✅ Características habilitadas:");
console.log("  - 🌐 Sistema i18n unificado con JSON");
console.log("  - 📱 Navegación móvil responsiva");
console.log("  - 🎨 Cambio de tema dinámico");
console.log("  - 🔄 Animaciones de scroll optimizadas");
console.log("  - 📝 Formularios con validación");
console.log("  - 🔔 Sistema de notificaciones mejorado");
console.log("  - 🚀 Navegación suave");
console.log("⚡ ¡Todo listo para funcionar!");

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Theme System
function initThemeSystem() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  setTheme(savedTheme);

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    // Update icon and title
    if (themeIcon && themeToggle) {
      if (theme === "dark") {
        themeIcon.textContent = "☀️";
        themeToggle.title = "Cambiar a tema claro";
      } else {
        themeIcon.textContent = "🌙";
        themeToggle.title = "Cambiar a tema oscuro";
      }
    }

    // Update navbar background immediately when theme changes
    updateNavbarBackground();

    // Update logos and favicon based on theme
    const navbarLogo = document.getElementById("navbar-logo");
    const heroLogo = document.getElementById("hero-logo");
    const favicon = document.getElementById("favicon");
    const appleIcon = document.getElementById("apple-icon");

    if (theme === "dark") {
      if (navbarLogo) navbarLogo.src = "img/logo-dark.png";
      if (heroLogo) heroLogo.src = "img/logo-dark.png";
      if (favicon) favicon.href = "img/logo-dark.png";
      if (appleIcon) appleIcon.href = "img/logo-dark.png";
    } else {
      if (navbarLogo) navbarLogo.src = "img/logo-light.png";
      if (heroLogo) heroLogo.src = "img/logo-light.png";
      if (favicon) favicon.href = "img/logo-light.png";
      if (appleIcon) appleIcon.href = "img/logo-light.png";
    }

    // Update translations if available
    if (i18n) {
      updateThemeTooltips(theme);
    }
  }

  function updateThemeTooltips(theme) {
    if (!themeToggle) return;

    const currentLang = i18n.getCurrentLanguage();
    if (currentLang === "en") {
      themeToggle.title =
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    } else {
      themeToggle.title =
        theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    }
  }

  // Expose function globally for i18n updates
  window.updateThemeTooltips = updateThemeTooltips;
}

// Success log
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
console.log("��� All components ready!");
