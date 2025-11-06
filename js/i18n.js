/**
 * Sistema de internacionalización mejorado
 * Improved i18n system
 */

class PortfolioI18n {
  constructor() {
    this.data = null;
    this.currentLang = localStorage.getItem("portfolio-lang") || "es";
    this.supportedLangs = ["es", "en"];
  }

  /**
   * Carga los datos del portfolio
   */
  async loadData() {
    try {
      const response = await fetch("./js/data.json");
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      return null;
    }
  }

  /**
   * Inicializa el sistema i18n
   */
  async init() {
    await this.loadData();
    this.updateLanguage(this.currentLang);
    this.setupLanguageToggle();
    return this;
  }

  /**
   * Cambia el idioma actual
   */
  updateLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) {
      console.warn(`Language ${lang} not supported. Using 'es' as fallback.`);
      lang = "es";
    }

    this.currentLang = lang;
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;

    this.updateContent();
    this.updateLanguageButton();
  }

  /**
   * Obtiene texto traducido por path
   */
  getText(path, lang = this.currentLang) {
    if (!this.data) return path;

    const keys = path.split(".");
    let current = this.data;

    for (const key of keys) {
      if (current && typeof current === "object") {
        current = current[key];
      } else {
        return path;
      }
    }

    // Si el resultado es un objeto con idiomas, retorna el idioma solicitado
    if (current && typeof current === "object" && current[lang]) {
      return current[lang];
    }

    // Si es un string directo, lo retorna
    if (typeof current === "string") {
      return current;
    }

    return path;
  }

  /**
   * Actualiza todo el contenido de la página
   */
  updateContent() {
    if (!this.data) return;

    // Actualizar elementos con data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const text = this.getText(key);

      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });

    // Actualizar secciones dinámicas
    this.updateNavigation();
    this.updateHeroSection();
    this.updateAboutSection();
    this.updateSkillsSection();
    this.updateExperienceSection();
    this.updateCertificationsSection();
    this.updateProjectsSection();
    this.updateContactSection();
  }

  /**
   * Actualiza la navegación
   */
  updateNavigation() {
    const nav = document.querySelector(".nav-menu");
    if (!nav || !this.data.navigation) return;

    nav.innerHTML = "";
    this.data.navigation.items.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item[this.currentLang];
      a.classList.add("nav-link");
      if (item.href === "#inicio") {
        a.classList.add("active");
      }
      li.appendChild(a);
      nav.appendChild(li);
    });
  }

  /**
   * Actualiza la sección hero
   */
  updateHeroSection() {
    const personal = this.data.personal;
    if (!personal) return;

    // Nombre
    const nameEl = document.querySelector('[data-hero="name"]');
    if (nameEl) nameEl.textContent = personal.name[this.currentLang];

    // Título
    const titleEl = document.querySelector('[data-hero="title"]');
    if (titleEl) titleEl.textContent = personal.title[this.currentLang];

    // Descripción
    const descEl = document.querySelector('[data-hero="description"]');
    if (descEl) descEl.textContent = personal.description[this.currentLang];
  }

  /**
   * Actualiza la sección sobre mí
   */
  updateAboutSection() {
    const about = this.data.about;
    if (!about) return;

    // Estadísticas
    const statsContainer = document.querySelector(".about-stats");
    if (statsContainer) {
      statsContainer.innerHTML = "";
      about.stats.forEach((stat) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stat";
        statDiv.innerHTML = `
          <h3>${stat.value}</h3>
          <p>${stat.label[this.currentLang]}</p>
        `;
        statsContainer.appendChild(statDiv);
      });
    }
  }

  /**
   * Actualiza la sección de habilidades
   */
  updateSkillsSection() {
    const skills = this.data.skills;
    if (!skills) return;

    const skillsGrid = document.querySelector(".skills-grid");
    if (!skillsGrid) return;

    skillsGrid.innerHTML = "";
    skills.categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "skill-category";

      categoryDiv.innerHTML = `
        <h3><i class="${category.icon}"></i> <span>${
        category.title[this.currentLang]
      }</span></h3>
        <div class="skill-list">
          ${category.skills
            .map(
              (skill) => `
            <div class="skill-item">
              <span class="skill-name">${skill.name}</span>
              <div class="skill-bar">
                <div class="skill-level" data-level="${skill.level}"></div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      skillsGrid.appendChild(categoryDiv);
    });

    // Animar las barras de habilidades
    this.animateSkillBars();
  }

  /**
   * Actualiza la sección de experiencia
   */
  updateExperienceSection() {
    const experience = this.data.experience;
    if (!experience) {
      console.warn("❌ No experience data found");
      return;
    }

    const timeline = document.querySelector(".timeline");
    if (!timeline) {
      console.warn("❌ Timeline container not found");
      return;
    }

    console.log(
      "✅ Updating experience section with",
      experience.jobs.length,
      "jobs"
    );

    // Limpiar contenido existente (incluyendo fallback)
    timeline.innerHTML = "";

    experience.jobs.forEach((job, index) => {
      console.log(`Adding job ${index + 1}:`, job.title[this.currentLang]);
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";

      timelineItem.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>${job.title[this.currentLang]}</h3>
          <h4>${job.company}</h4>
          <span class="timeline-date">${job.period[this.currentLang]}</span>
          <p>${job.description[this.currentLang]}</p>
          <div class="timeline-skills">
            ${job.skills
              .map((skill) => `<span class="skill-tag">${skill}</span>`)
              .join("")}
          </div>
        </div>
      `;

      timeline.appendChild(timelineItem);
    });
  }

  /**
   * Actualiza la sección de certificaciones
   */
  updateCertificationsSection() {
    console.log("🎓 Actualizando sección de certificaciones...");
    const certifications = this.data.certifications;
    console.log("📋 Certificaciones encontradas:", certifications);
    if (!certifications) {
      console.warn("❌ No se encontraron datos de certificaciones");
      return;
    }

    const certsGrid = document.querySelector(".certifications-grid");
    console.log("🎯 Elemento certificaciones-grid:", certsGrid);
    if (!certsGrid) {
      console.warn("❌ No se encontró el elemento .certifications-grid");
      return;
    }

    certsGrid.innerHTML = "";
    console.log(
      `📄 Procesando ${certifications.items.length} certificaciones...`
    );
    certifications.items.forEach((cert, index) => {
      console.log(
        `🔸 Certificación ${index + 1}:`,
        cert.title[this.currentLang]
      );
      const certCard = document.createElement("div");
      certCard.className = "cert-card";

      certCard.innerHTML = `
        <div class="cert-icon">
          <i class="${cert.icon}"></i>
        </div>
        <div class="cert-content">
          <h3>${cert.title[this.currentLang]}</h3>
          <h4>${cert.company}</h4>
          ${
            cert.id_number ? `<p class="cert-id">ID: ${cert.id_number}</p>` : ""
          }
          <div class="cert-tech">
            ${cert.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
      `;

      certsGrid.appendChild(certCard);
    });
    console.log("✅ Certificaciones actualizadas correctamente");
  }

  /**
   * Actualiza la sección de proyectos
   */
  updateProjectsSection() {
    const projects = this.data.projects;
    if (!projects) return;

    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";
    projects.items.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${
        project.title[this.currentLang]
      }" loading="lazy">
          <div class="project-overlay">
            <div class="project-links">
              <a href="${project.demo}" class="btn btn-primary" target="_blank">
                ${this.getText("ui.buttons.viewProject")}
              </a>
              <a href="${
                project.code
              }" class="btn btn-secondary" target="_blank">
                ${this.getText("ui.buttons.viewCode")}
              </a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3>${project.title[this.currentLang]}</h3>
          <p>${project.description[this.currentLang]}</p>
          <div class="project-tech">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
      `;

      projectsGrid.appendChild(projectCard);
    });
  }

  /**
   * Actualiza la sección de contacto
   */
  updateContactSection() {
    const contact = this.data.contact;
    if (!contact) return;

    // Información de contacto
    const contactInfo = document.querySelector(".contact-info");
    if (contactInfo) {
      contactInfo.innerHTML = `
        <h3>${contact.greeting[this.currentLang]}</h3>
        <p class="contact-description">${
          contact.description[this.currentLang]
        }</p>
        
        <div class="contact-items">
          <div class="contact-item">
            <div class="contact-item-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-item-content">
              <h4>${contact.info.email.label[this.currentLang]}</h4>
              <p>${contact.info.email.value}</p>
            </div>
          </div>
        <div class="contact-item">
          <div class="contact-item-icon">
            <i class="fab fa-linkedin"></i>
          </div>
          <div class="contact-item-content">
            <h4>${contact.info.linkedin.label[this.currentLang]}</h4>
            <p><a href="${contact.info.linkedin.url}" target="_blank">${
        contact.info.linkedin.value
      }</a></p>
          </div>
        </div>
          <div class="contact-item">
            <div class="contact-item-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="contact-item-content">
              <h4>${contact.info.location.label[this.currentLang]}</h4>
              <p>${contact.info.location.value[this.currentLang]}</p>
            </div>
          </div>
        </div>
        
        <!-- Redes sociales -->
        <div class="social-links">
          ${
            contact.socialLinks
              ? contact.socialLinks
                  .map(
                    (social) => `
            <a href="${
              social.url
            }" class="social-link" target="_blank" title="${
                      social.label[this.currentLang]
                    }">
              <i class="${social.icon}"></i>
            </a>
          `
                  )
                  .join("")
              : ""
          }
        </div>
      `;
    }

    // Formulario de contacto
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
      contactForm.innerHTML =
        contact.form.fields
          .map((field) => {
            if (field.type === "textarea") {
              return `
            <div class="form-group">
              <label for="${field.name}">${field.label[this.currentLang]}${
                field.required ? " *" : ""
              }</label>
              <textarea 
                id="${field.name}" 
                name="${field.name}" 
                placeholder="${field.placeholder[this.currentLang]}"
                ${field.required ? "required" : ""}
              ></textarea>
            </div>
          `;
            } else {
              return `
            <div class="form-group">
              <label for="${field.name}">${field.label[this.currentLang]}${
                field.required ? " *" : ""
              }</label>
              <input 
                type="${field.type}" 
                id="${field.name}" 
                name="${field.name}" 
                placeholder="${field.placeholder[this.currentLang]}"
                ${field.required ? "required" : ""}
              >
            </div>
          `;
            }
          })
          .join("") +
        `
        <button type="submit" class="btn btn-primary btn-full">
          ${contact.form.submit[this.currentLang]}
        </button>
      `;
    }
  }

  /**
   * Configura el botón de cambio de idioma
   */
  setupLanguageToggle() {
    const langToggle = document.querySelector(".lang-toggle");
    if (!langToggle) return;

    langToggle.addEventListener("click", () => {
      const newLang = this.currentLang === "es" ? "en" : "es";
      this.updateLanguage(newLang);
    });
  }

  /**
   * Actualiza el botón de idioma
   */
  updateLanguageButton() {
    const langToggle = document.querySelector(".lang-toggle");
    if (!langToggle) return;

    const nextLang = this.currentLang === "es" ? "en" : "es";
    langToggle.textContent = nextLang.toUpperCase();
    langToggle.title = this.getText("ui.language.toggle");
  }

  /**
   * Anima las barras de habilidades
   */
  animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-level");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute("data-level");
            bar.style.width = `${level}%`;
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }

  /**
   * Obtiene los datos actuales
   */
  getData() {
    return this.data;
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// Exportar para uso global
if (typeof window !== "undefined") {
  window.PortfolioI18n = PortfolioI18n;
}

// Exportar para Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioI18n;
}
