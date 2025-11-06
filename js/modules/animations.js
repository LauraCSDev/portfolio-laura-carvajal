/**
 * Animations Module
 * Handles skill bars animation and loading effects
 */

class AnimationsManager {
  constructor() {
    this.skillsSectionElement = null;
    this.skillAnimationObserver = null;

    this.init();
  }

  init() {
    this.setupSkillsAnimation();
    this.setupLoadingAnimation();
  }

  setupSkillsAnimation() {
    this.skillsSectionElement = document.querySelector("#habilidades");

    if (!this.skillsSectionElement) return;

    this.skillAnimationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateSkillBars();
            this.skillAnimationObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.skillAnimationObserver.observe(this.skillsSectionElement);
  }

  animateSkillBars() {
    const skillLevels = document.querySelectorAll(".skill-level");

    skillLevels.forEach((skill) => {
      const level = skill.getAttribute("data-level");
      if (skill instanceof HTMLElement && level) {
        skill.style.setProperty("--skill-width", level + "%");
      }
    });
  }

  setupLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.style.opacity = "0";
      document.body.style.transition = "opacity 0.5s ease-in-out";

      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 100);
    });
  }

  // Public method to manually trigger skill animation
  triggerSkillAnimation() {
    this.animateSkillBars();
  }

  // Cleanup method
  destroy() {
    if (this.skillAnimationObserver) {
      this.skillAnimationObserver.disconnect();
    }
  }
}

// Make available globally
if (typeof window !== "undefined") {
  window["AnimationsManager"] = AnimationsManager;
}
