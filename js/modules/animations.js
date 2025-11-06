/**
 * Módulo de Animaciones
 * Maneja animaciones de scroll, contadores y efectos visuales
 */

class AnimationsModule {
  constructor() {
    this.isInitialized = false;
    this.observer = null;
    this.countersAnimated = new Set();
  }

  /**
   * Inicializar el módulo de animaciones
   */
  init() {
    if (this.isInitialized) return;

    this.setupScrollAnimations();
    this.setupLoadingAnimation();

    this.isInitialized = true;
    console.log("✅ Módulo de animaciones inicializado");
  }

  /**
   * Configurar animaciones de scroll
   */
  setupScrollAnimations() {
    // Configuración del Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleElementInView(entry.target);
        }
      });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll("section").forEach((section) => {
      this.observer.observe(section);
    });

    // Observar elementos específicos
    this.observeElements([
      ".cert-card",
      ".project-card",
      ".timeline-item",
      ".skill-item",
      ".about-stat",
    ]);
  }

  /**
   * Observar elementos específicos
   * @param {string[]} selectors - Array de selectores CSS
   */
  observeElements(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (this.observer) {
          this.observer.observe(element);
        }
      });
    });
  }

  /**
   * Manejar elemento que entra en vista
   * @param {Element} element - Elemento que entra en vista
   */
  handleElementInView(element) {
    // Agregar clase de animación
    element.classList.add("animate", "fade-in-up");

    // Animar contadores si es la sección about
    if (element.classList.contains("about") || element.id === "sobre-mi") {
      this.animateCounters();
    }

    // Animar barras de habilidades
    if (element.classList.contains("skills") || element.id === "habilidades") {
      this.animateSkillBars();
    }

    // Animar cards con retraso escalonado
    if (
      element.classList.contains("certifications") ||
      element.classList.contains("projects")
    ) {
      this.animateCardsSequentially(element);
    }
  }

  /**
   * Animar contadores numéricos
   */
  animateCounters() {
    const counters = document.querySelectorAll(
      ".stat h3, .about-stat .stat-number"
    );

    counters.forEach((counter) => {
      const counterId = counter.dataset.counterId || counter.textContent;

      // Evitar animar el mismo contador múltiples veces
      if (this.countersAnimated.has(counterId)) return;
      this.countersAnimated.add(counterId);

      const target = parseInt(counter.textContent.replace(/\D/g, "")) || 0;
      const suffix = counter.textContent.replace(/\d/g, "");
      let current = 0;
      const duration = 2000; // 2 segundos
      const increment = target / (duration / 16); // 60fps

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 16);
    });
  }

  /**
   * Animar barras de habilidades
   */
  animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-level, .progress-bar");

    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const level =
          bar.getAttribute("data-level") || bar.getAttribute("data-progress");
        if (bar && level) {
          bar.style.setProperty("--skill-width", level + "%");
          bar.style.setProperty("--progress-width", level + "%");
          bar.classList.add("animated");
        }
      }, index * 100); // Retraso escalonado
    });
  }

  /**
   * Animar cards de forma secuencial
   * @param {Element} container - Contenedor de las cards
   */
  animateCardsSequentially(container) {
    const cards = container.querySelectorAll(
      ".cert-card, .project-card, .timeline-item"
    );

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate", "fade-in-up");
      }, index * 150); // Retraso de 150ms entre cards
    });
  }

  /**
   * Configurar animación de carga de página
   */
  setupLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.style.opacity = "0";
      document.body.style.transition = "opacity 0.5s ease-in-out";

      setTimeout(() => {
        document.body.style.opacity = "1";
        this.addLoadingCompleteClass();
      }, 100);
    });
  }

  /**
   * Agregar clase cuando la carga esté completa
   */
  addLoadingCompleteClass() {
    document.body.classList.add("loaded");

    // Animar elementos iniciales
    setTimeout(() => {
      this.animateInitialElements();
    }, 300);
  }

  /**
   * Animar elementos iniciales (hero, navbar)
   */
  animateInitialElements() {
    const heroElements = document.querySelectorAll(
      ".hero-title, .hero-subtitle, .hero-description, .hero-buttons"
    );
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      navbar.classList.add("animate", "slide-down");
    }

    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate", "fade-in-up");
      }, index * 200);
    });
  }

  /**
   * Animar entrada de un elemento específico
   * @param {Element|string} element - Elemento o selector
   * @param {string} animation - Tipo de animación
   * @param {number} delay - Retraso en ms
   */
  animateElement(element, animation = "fade-in-up", delay = 0) {
    const target =
      typeof element === "string" ? document.querySelector(element) : element;

    if (!target) return;

    setTimeout(() => {
      target.classList.add("animate", animation);
    }, delay);
  }

  /**
   * Animar lista de elementos con retraso escalonado
   * @param {string} selector - Selector CSS
   * @param {string} animation - Tipo de animación
   * @param {number} staggerDelay - Retraso entre elementos
   */
  staggerAnimation(selector, animation = "fade-in-up", staggerDelay = 100) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate", animation);
      }, index * staggerDelay);
    });
  }

  /**
   * Crear animación de typing para texto
   * @param {Element|string} element - Elemento o selector
   * @param {string} text - Texto a mostrar
   * @param {number} speed - Velocidad en ms por caracter
   */
  typeWriter(element, text, speed = 50) {
    const target =
      typeof element === "string" ? document.querySelector(element) : element;

    if (!target) return;

    target.textContent = "";
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, speed);
  }

  /**
   * Pausar todas las animaciones
   */
  pauseAnimations() {
    document.body.style.animationPlayState = "paused";
  }

  /**
   * Reanudar todas las animaciones
   */
  resumeAnimations() {
    document.body.style.animationPlayState = "running";
  }

  /**
   * Resetear contadores para poder reanimar
   */
  resetCounters() {
    this.countersAnimated.clear();
  }

  /**
   * Destruir el observer (cleanup)
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.resetCounters();
    this.isInitialized = false;
  }
}

// Exportar para uso global
window.AnimationsModule = AnimationsModule;
