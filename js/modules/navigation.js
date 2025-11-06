/**
 * Módulo de Navegación
 * Maneja la navegación móvil, scroll suave y enlaces activos
 */

class NavigationModule {
  constructor() {
    this.isInitialized = false;
    this.activeNavTicking = false;
  }

  /**
   * Inicializar el módulo de navegación
   */
  init() {
    if (this.isInitialized) return;

    // Pequeño retraso para asegurar que el DOM esté completamente cargado
    setTimeout(() => {
      this.setupMobileNavigation();
      this.setupSmoothScrolling();
      this.setupActiveNavigation();
      this.setupScrollToTop();
    }, 100);

    this.isInitialized = true;
    console.log("✅ Módulo de navegación inicializado");
  }

  /**
   * Configurar navegación móvil
   */
  setupMobileNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!navToggle || !navMenu) {
      console.warn("⚠️ Elementos de navegación móvil no encontrados");
      return;
    }

    // Toggle menú móvil
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("nav-open");

      // Animar barras del hamburger
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar) => bar.classList.toggle("active"));
    });

    // Usar delegación de eventos para enlaces dinámicos
    navMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("nav-open");

        // Restaurar barras del hamburger
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => bar.classList.remove("active"));
      }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("nav-open");

        // Restaurar barras del hamburger
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => bar.classList.remove("active"));
      }
    });
  }

  /**
   * Configurar navegación suave
   */
  setupSmoothScrolling() {
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          this.scrollToSection(target);
        }
      });
    });
  }

  /**
   * Scroll suave a una sección específica
   * @param {Element} target - Elemento objetivo
   */
  scrollToSection(target) {
    const headerHeight = document.querySelector(".navbar")?.offsetHeight || 70;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  /**
   * Configurar actualización de navegación activa
   */
  setupActiveNavigation() {
    const updateActiveNav = () => {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");
      const headerHeight =
        document.querySelector(".navbar")?.offsetHeight || 70;

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

      this.activeNavTicking = false;
    };

    const requestUpdateActiveNav = () => {
      if (!this.activeNavTicking) {
        requestAnimationFrame(updateActiveNav);
        this.activeNavTicking = true;
      }
    };

    window.addEventListener("scroll", requestUpdateActiveNav);
  }

  /**
   * Ir a una sección específica por ID
   * @param {string} sectionId - ID de la sección
   */
  goToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      this.scrollToSection(target);
    }
  }

  /**
   * Obtener la sección activa actual
   * @returns {string|null} - ID de la sección activa
   */
  getCurrentSection() {
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = document.querySelector(".navbar")?.offsetHeight || 70;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - headerHeight - 100;
      if (window.pageYOffset >= sectionTop) {
        return section.getAttribute("id");
      }
    }

    return null;
  }

  /**
   * Configurar el botón de scroll to top
   */
  setupScrollToTop() {
    const scrollTopBtn = document.querySelector("#scroll-to-top");
    if (!scrollTopBtn) {
      console.warn("⚠️ Botón de scroll to top no encontrado");
      return;
    }

    // Mostrar/ocultar botón según scroll
    const toggleScrollTopButton = () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    };

    // Event listener para scroll
    let scrollTopTicking = false;
    const requestToggleScrollTop = () => {
      if (!scrollTopTicking) {
        requestAnimationFrame(() => {
          toggleScrollTopButton();
          scrollTopTicking = false;
        });
        scrollTopTicking = true;
      }
    };

    window.addEventListener("scroll", requestToggleScrollTop);

    // Event listener para click
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Actualizar tooltips según idioma
    this.updateScrollTopTooltip();

    // Escuchar cambios de idioma para actualizar tooltips
    document.addEventListener("languageChanged", () => {
      this.updateScrollTopTooltip();
    });

    console.log("✅ Botón scroll to top configurado");
  }

  /**
   * Actualizar tooltip del botón scroll to top según el idioma
   */
  updateScrollTopTooltip() {
    const scrollTopBtn = document.querySelector("#scroll-to-top");
    if (!scrollTopBtn) return;

    const currentLang = window.portfolioI18n?.getCurrentLanguage() || "es";
    const tooltips = {
      es: "Ir arriba",
      en: "Go to top",
    };

    scrollTopBtn.title = tooltips[currentLang];
  }
}

// Exportar para uso global
window.NavigationModule = NavigationModule;
