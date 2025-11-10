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
    // Configuración optimizada del Intersection Observer
    const observerOptions = {
      threshold: 0.15, // Aumentado para evitar animaciones prematuras
      rootMargin: "0px 0px -100px 0px", // Más margen para evitar parpadeos
    };

    // Use throttling to prevent excessive animations
    let animationQueue = new Set();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Solo animar cuando está entrando Y tiene suficiente visibilidad
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.15 &&
          !animationQueue.has(entry.target) &&
          !entry.target.classList.contains("animate")
        ) {
          animationQueue.add(entry.target);

          // Use requestAnimationFrame for smooth animations
          requestAnimationFrame(() => {
            this.handleElementInView(entry.target);
            animationQueue.delete(entry.target);
          });
        }
      });
    }, observerOptions);

    // Observar secciones (excepto hero que ya está visible)
    document.querySelectorAll("section:not(.hero)").forEach((section) => {
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
    // Prevent double animations
    if (element.classList.contains("animate")) return;

    // Agregar clase de animación
    element.classList.add("animate", "fade-in-up");

    // Animar contadores si es la sección about (solo una vez)
    if (
      (element.classList.contains("about") || element.id === "sobre-mi") &&
      this.countersAnimated.size === 0
    ) {
      this.animateCounters();
    }

    // Animar barras de habilidades (solo una vez)
    if (
      (element.classList.contains("skills") || element.id === "habilidades") &&
      !element.dataset.skillsAnimated
    ) {
      element.dataset.skillsAnimated = "true";
      this.animateSkillBars();
    }

    // Animar cards con retraso escalonado (solo una vez)
    if (
      (element.classList.contains("certifications") ||
        element.classList.contains("projects")) &&
      !element.dataset.cardsAnimated
    ) {
      element.dataset.cardsAnimated = "true";
      this.animateCardsSequentially(element);
    }

    // Stop observing this element to prevent re-animation
    if (this.observer) {
      this.observer.unobserve(element);
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
    const skillBars = document.querySelectorAll(
      ".skill-progress, .progress-bar"
    );

    // Prevent multiple animations of the same bars
    const animatedBars = new Set();

    skillBars.forEach((bar, index) => {
      const barId =
        bar.dataset.level || bar.getAttribute("data-progress") || index;

      if (animatedBars.has(barId)) return;
      animatedBars.add(barId);

      // Inicializar con width 0 si no está establecido
      if (!bar.style.width || bar.style.width === "0%") {
        bar.style.width = "0%";
      }

      // Use requestAnimationFrame for smoother animations
      setTimeout(() => {
        requestAnimationFrame(() => {
          const level =
            bar.getAttribute("data-level") || bar.getAttribute("data-progress");
          if (bar && level && !bar.classList.contains("animated")) {
            bar.style.width = `${level}%`;
            bar.classList.add("animated");
          }
        });
      }, index * 60); // Reducido a 60ms para animación más fluida
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
      // Verificar que la card no esté ya animada
      if (!card.classList.contains("animate")) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            card.classList.add("animate", "fade-in-up");
          });
        }, index * 100); // Reducido de 150ms a 100ms para más fluidez
      }
    });
  }

  /**
   * Configurar animación de carga de página
   */
  setupLoadingAnimation() {
    // Use requestAnimationFrame to avoid flickering
    const handlePageLoad = () => {
      if (document.readyState === "complete") {
        document.body.classList.add("animations-ready");
        // Animar elementos iniciales cuando la página esté lista
        requestAnimationFrame(() => {
          this.animateInitialElements();
        });
      }
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad, { once: true });
    }
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
