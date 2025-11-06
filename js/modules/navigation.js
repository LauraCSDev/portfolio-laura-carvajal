/**
 * Navigation Module
 * Handles mobile navigation, smooth scrolling, active link highlighting, and navbar background
 */

class NavigationManager {
  constructor() {
    this.navbar = null;
    this.navToggle = null;
    this.navMenu = null;
    this.navLinks = null;
    this.sections = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.setupMobileNavigation();
    this.setupSmoothScrolling();
    this.setupScrollEvents();
  }

  cacheElements() {
    this.navbar = document.querySelector(".navbar");
    this.navToggle = document.getElementById("nav-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section");
  }

  setupMobileNavigation() {
    if (!this.navToggle || !this.navMenu) return;

    // Toggle mobile menu
    this.navToggle.addEventListener("click", () => {
      if (this.navMenu) {
        this.navMenu.classList.toggle("active");
      }

      // Animate hamburger menu
      if (this.navToggle) {
        const bars = this.navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => bar.classList.toggle("active"));
      }
    });

    // Close mobile menu when clicking on links
    if (this.navLinks) {
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });
    }
  }
  closeMobileMenu() {
    if (!this.navMenu || !this.navToggle) return;

    this.navMenu.classList.remove("active");
    const bars = this.navToggle.querySelectorAll(".bar");
    bars.forEach((bar) => bar.classList.remove("active"));
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        if (anchor instanceof HTMLAnchorElement) {
          const href = anchor.getAttribute("href");
          if (href) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        }
      });
    });
  }

  setupScrollEvents() {
    window.addEventListener("scroll", () => {
      this.updateNavbarBackground();
      this.updateActiveLink();
    });
  }

  updateNavbarBackground() {
    if (!this.navbar || !(this.navbar instanceof HTMLElement)) return;

    const isDarkTheme =
      document.documentElement.getAttribute("data-theme") === "dark";
    const isScrolled = window.scrollY > 50;

    if (isScrolled) {
      if (isDarkTheme) {
        this.navbar.style.background = "rgba(13, 17, 23, 0.98)";
        this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
      } else {
        this.navbar.style.background = "rgba(255, 255, 255, 0.98)";
        this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      }
    } else {
      if (isDarkTheme) {
        this.navbar.style.background = "rgba(13, 17, 23, 0.95)";
        this.navbar.style.boxShadow = "none";
      } else {
        this.navbar.style.background = "rgba(255, 255, 255, 0.95)";
        this.navbar.style.boxShadow = "none";
      }
    }
  }

  updateActiveLink() {
    if (!this.sections || !this.navLinks) return;

    let current = "";

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 200) {
        const sectionId = section.getAttribute("id");
        if (sectionId) {
          current = sectionId;
        }
      }
    });

    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  } // Public method to update navbar background (called from theme system)
  refreshNavbarBackground() {
    this.updateNavbarBackground();
  }
}

// Make available globally
if (typeof window !== "undefined") {
  window["NavigationManager"] = NavigationManager;
}
