/**
 * Sistema de internacionalización refactorizado
 * Arquitectura limpia con separación de responsabilidades
 */

// ===========================
// CLASES BASE
// ===========================

/**
 * Gestor de datos del portfolio
 */
class DataManager {
  constructor() {
    this.data = null;
    this.isLoaded = false;
  }

  async loadData() {
    if (this.isLoaded) return this.data;

    try {
      const response = await fetch("./js/data.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      this.data = await response.json();
      this.isLoaded = true;
      return this.data;
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      throw error;
    }
  }

  getData() {
    return this.data;
  }

  getText(path, lang) {
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

    // Si es un objeto con idiomas, retorna el idioma solicitado
    if (current && typeof current === "object" && current[lang]) {
      return current[lang];
    }

    // Si es un string directo, lo retorna
    if (typeof current === "string") {
      return current;
    }

    return path;
  }
}

/**
 * Gestor de idiomas
 */
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem("portfolio-lang") || "es";
    this.supportedLangs = ["es", "en"];
    this.observers = [];
  }

  setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) {
      console.warn(`Language ${lang} not supported. Using 'es' as fallback.`);
      lang = "es";
    }

    const oldLang = this.currentLang;
    this.currentLang = lang;

    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;

    // Notificar cambio a observers
    this.notifyObservers(lang, oldLang);
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  addObserver(callback) {
    this.observers.push(callback);
  }

  removeObserver(callback) {
    this.observers = this.observers.filter((obs) => obs !== callback);
  }

  notifyObservers(newLang, oldLang) {
    this.observers.forEach((callback) => {
      try {
        callback(newLang, oldLang);
      } catch (error) {
        console.error("Error in language observer:", error);
      }
    });

    // Emitir evento global
    const event = new CustomEvent("languageChanged", {
      detail: { language: newLang, previousLanguage: oldLang },
    });
    document.dispatchEvent(event);
  }
}

/**
 * Actualizador de contenido DOM
 */
class DOMUpdater {
  constructor(dataManager, languageManager) {
    this.dataManager = dataManager;
    this.languageManager = languageManager;
  }

  updateStaticContent() {
    const currentLang = this.languageManager.getCurrentLanguage();

    // Actualizar elementos con data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const text = this.dataManager.getText(key, currentLang);

      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = text;
      } else {
        // Usar innerHTML para elementos que pueden contener HTML (como <br/>)
        const htmlKeys = ["about.description", "personal.description"];
        if (htmlKeys.includes(key)) {
          element.innerHTML = text;
        } else {
          element.textContent = text;
        }
      }
    });

    // Actualizar atributos alt
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.getAttribute("data-i18n-alt");
      const text = this.dataManager.getText(key, currentLang);
      element.alt = text;
    });

    // Actualizar atributos title
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.getAttribute("data-i18n-title");
      const text = this.dataManager.getText(key, currentLang);
      element.title = text;
    });

    // Actualizar title de la página
    const titleElement = document.querySelector("title[data-i18n]");
    if (titleElement) {
      const key = titleElement.getAttribute("data-i18n");
      const text = this.dataManager.getText(key, currentLang);
      titleElement.textContent = text;
    }
  }
}

// ===========================
// COMPONENTES ESPECIALIZADOS
// ===========================

/**
 * Componente de navegación
 */
class NavigationComponent {
  constructor(dataManager, languageManager) {
    this.dataManager = dataManager;
    this.languageManager = languageManager;
  }

  render() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();

    if (!data?.navigation) return;

    const nav = document.querySelector(".nav-menu");
    if (!nav) return;

    nav.innerHTML = "";
    data.navigation.items.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item[currentLang];
      a.classList.add("nav-link");
      if (item.href === "#inicio") {
        a.classList.add("active");
      }
      li.appendChild(a);
      nav.appendChild(li);
    });
  }
}

/**
 * Componente de habilidades
 */
class SkillsComponent {
  constructor(dataManager, languageManager) {
    this.dataManager = dataManager;
    this.languageManager = languageManager;
  }

  render() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();

    if (!data?.skills) return;

    const skillsGrid = document.querySelector(".skills-grid");
    if (!skillsGrid) return;

    skillsGrid.innerHTML = "";
    data.skills.categories.forEach((category) => {
      const categoryDiv = this.createCategoryElement(category, currentLang);
      skillsGrid.appendChild(categoryDiv);
    });

    this.animateSkillBars();
  }

  createCategoryElement(category, currentLang) {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skill-category";

    categoryDiv.innerHTML = `
      <div class="glass-reflection-1"></div>
      <div class="glass-reflection-2"></div>
      <h3><i class="${category.icon}"></i> <span>${
      category.title[currentLang]
    }</span></h3>
      <div class="skill-list">
        ${category.skills
          .map((skill) => this.createSkillItemHTML(skill))
          .join("")}
      </div>
    `;

    return categoryDiv;
  }

  createSkillItemHTML(skill) {
    return `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <div class="skill-bar">
          <div class="skill-progress" data-level="${skill.level}" style="width: 0%;"></div>
        </div>
        <span class="skill-level">${skill.level}%</span>
      </div>
    `;
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute("data-level");
            setTimeout(() => {
              bar.style.width = `${level}%`;
            }, 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }
}

/**
 * Componente de contacto mejorado
 */
class ContactComponent {
  constructor(dataManager, languageManager) {
    this.dataManager = dataManager;
    this.languageManager = languageManager;
  }

  render() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();

    if (!data?.contact) return;

    this.renderContactInfo(data.contact, currentLang);
    this.renderContactForm(data.contact, currentLang);
  }

  renderContactInfo(contact, currentLang) {
    const contactInfo = document.querySelector(".contact-info");
    if (!contactInfo) return;

    contactInfo.innerHTML = `
      <div class="contact-header">
        <h3>${contact.greeting[currentLang]}</h3>
        <p class="contact-description">${contact.description[currentLang]}</p>
      </div>
      
      <div class="contact-items">
        ${this.createContactItems(contact, currentLang)}
      </div>
      
      <div class="social-links">
        ${this.createSocialLinks(contact.socialLinks, currentLang)}
      </div>
    `;
  }

  createContactItems(contact, currentLang) {
    const items = [
      {
        icon: "fas fa-envelope",
        label: contact.info.email.label[currentLang],
        value: contact.info.email.value,
        href: `mailto:${contact.info.email.value}`,
        type: "email",
      },
      {
        icon: "fab fa-linkedin",
        label: contact.info.linkedin.label[currentLang],
        value: contact.info.linkedin.value,
        href: contact.info.linkedin.url,
        type: "linkedin",
      },
      {
        icon: "fas fa-map-marker-alt",
        label: contact.info.location.label[currentLang],
        value: contact.info.location.value[currentLang],
        href: null,
        type: "location",
      },
    ];

    return items
      .map(
        (item) => `
      <div class="contact-item" data-contact-type="${item.type}">
        <div class="contact-item-icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="contact-item-content">
          <h4>${item.label}</h4>
          ${
            item.href
              ? `<p><a href="${item.href}" target="_blank" rel="noopener">${item.value}</a></p>`
              : `<p>${item.value}</p>`
          }
        </div>
        <div class="contact-item-action">
          ${item.href ? '<i class="fas fa-external-link-alt"></i>' : ""}
        </div>
      </div>
    `
      )
      .join("");
  }

  createSocialLinks(socialLinks, currentLang) {
    if (!socialLinks) return "";

    return socialLinks
      .map(
        (social) => `
      <a href="${social.url}" 
         class="social-link" 
         target="_blank" 
         rel="noopener"
         title="${social.label[currentLang]}"
         data-social="${social.name}">
        <i class="${social.icon}"></i>
        <span class="social-label">${social.label[currentLang]}</span>
      </a>
    `
      )
      .join("");
  }

  renderContactForm(contact, currentLang) {
    const contactForm = document.querySelector(".contact-form");
    if (!contactForm) return;

    contactForm.innerHTML = `
      <div class="form-header">
        <h3>Envía un mensaje</h3>
        <p>Completa el formulario y te responderé pronto</p>
      </div>
      ${contact.form.fields
        .map((field) => this.createFormField(field, currentLang))
        .join("")}
      <button type="submit" class="btn btn-primary btn-full">
        <i class="fas fa-paper-plane"></i>
        <span>${contact.form.submit[currentLang]}</span>
      </button>
    `;
  }

  createFormField(field, currentLang) {
    const baseClasses = "form-control";
    const isTextarea = field.type === "textarea";

    return `
      <div class="form-group">
        <label for="${field.name}" class="form-label">
          ${field.label[currentLang]}${
      field.required ? ' <span class="required">*</span>' : ""
    }
        </label>
        ${
          isTextarea
            ? `<textarea 
            id="${field.name}" 
            name="${field.name}" 
            class="${baseClasses}"
            placeholder="${field.placeholder[currentLang]}"
            ${field.required ? "required" : ""}
            rows="4"
          ></textarea>`
            : `<input 
            type="${field.type}" 
            id="${field.name}" 
            name="${field.name}" 
            class="${baseClasses}"
            placeholder="${field.placeholder[currentLang]}"
            ${field.required ? "required" : ""}
          >`
        }
      </div>
    `;
  }
}

// ===========================
// CLASE PRINCIPAL REFACTORIZADA
// ===========================

/**
 * Sistema principal de internacionalización
 */
class PortfolioI18n {
  constructor() {
    this.dataManager = new DataManager();
    this.languageManager = new LanguageManager();
    this.domUpdater = new DOMUpdater(this.dataManager, this.languageManager);

    // Componentes
    this.components = {
      navigation: new NavigationComponent(
        this.dataManager,
        this.languageManager
      ),
      skills: new SkillsComponent(this.dataManager, this.languageManager),
      contact: new ContactComponent(this.dataManager, this.languageManager),
    };

    // Setup observers
    this.languageManager.addObserver((newLang) => {
      this.updateContent();
    });
  }

  async init() {
    try {
      await this.dataManager.loadData();
      this.updateLanguage(this.languageManager.getCurrentLanguage());
      this.setupLanguageToggle();
      return this;
    } catch (error) {
      console.error("Failed to initialize i18n system:", error);
      throw error;
    }
  }

  updateLanguage(lang) {
    this.languageManager.setLanguage(lang);
  }

  updateContent() {
    if (!this.dataManager.getData()) return;

    this.domUpdater.updateStaticContent();

    // Renderizar componentes especializados
    Object.values(this.components).forEach((component) => {
      try {
        component.render();
      } catch (error) {
        console.error(
          "Error rendering component:",
          component.constructor.name,
          error
        );
      }
    });

    // Actualizar elementos específicos
    this.updateHeroSection();
    this.updateAboutSection();
    this.updateExperienceSection();
    this.updateCertificationsSection();
    this.updateProjectsSection();
    this.updateLanguageButton();
  }

  // Métodos legacy mantenidos para compatibilidad
  updateHeroSection() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();
    const personal = data?.personal;
    if (!personal) return;

    const elements = {
      greeting: document.querySelector('[data-hero="greeting"]'),
      name: document.querySelector('[data-hero="name"]'),
      title: document.querySelector('[data-hero="title"]'),
      description: document.querySelector('[data-hero="description"]'),
    };

    if (elements.greeting)
      elements.greeting.textContent = personal.greeting[currentLang];
    if (elements.name) elements.name.textContent = personal.name[currentLang];
    if (elements.title)
      elements.title.textContent = personal.title[currentLang];
    if (elements.description)
      elements.description.innerHTML = personal.description[currentLang];
  }

  updateAboutSection() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();
    const about = data?.about;
    if (!about) return;

    const statsContainer = document.querySelector(".about-stats");
    if (statsContainer) {
      statsContainer.innerHTML = "";
      about.stats.forEach((stat) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stat";
        statDiv.innerHTML = `
          <h3>${stat.value}</h3>
          <p>${stat.label[currentLang]}</p>
        `;
        statsContainer.appendChild(statDiv);
      });
    }
  }

  updateExperienceSection() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();
    const experience = data?.experience;
    if (!experience) return;

    const timeline = document.querySelector(".timeline");
    if (!timeline) return;

    timeline.innerHTML = "";
    experience.jobs.forEach((job) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";

      timelineItem.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="glass-reflection-1"></div>
          <div class="glass-reflection-2"></div>
          <h3>${job.title[currentLang]}</h3>
          <h4>${job.company}</h4>
          <span class="timeline-date">${job.period[currentLang]}</span>
          <p>${job.description[currentLang]}</p>
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

  updateCertificationsSection() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();
    const certifications = data?.certifications;
    if (!certifications) return;

    const certsGrid = document.querySelector(".certifications-grid");
    if (!certsGrid) return;

    certsGrid.innerHTML = "";
    certifications.items.forEach((cert) => {
      const certCard = document.createElement("div");
      certCard.className = "cert-card";

      certCard.innerHTML = `
        <div class="glass-reflection-1"></div>
        <div class="glass-reflection-2"></div>
        <div class="cert-icon">
          <i class="${cert.icon}"></i>
        </div>
        <div class="cert-content">
          <h3>${cert.title[currentLang]}</h3>
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
  }

  updateProjectsSection() {
    const data = this.dataManager.getData();
    const currentLang = this.languageManager.getCurrentLanguage();
    const projects = data?.projects;
    if (!projects) return;

    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";
    projects.items.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      projectCard.innerHTML = `
        <div class="glass-reflection-1"></div>
        <div class="glass-reflection-2"></div>
        <div class="project-image">
          <img src="${project.image}" alt="${
        project.title[currentLang]
      }" loading="lazy">
          <div class="project-overlay">
            <div class="project-links">
              <a href="${project.demo}" class="btn btn-primary" target="_blank">
                ${this.dataManager.getText(
                  "ui.buttons.viewProject",
                  currentLang
                )}
              </a>
              <a href="${
                project.code
              }" class="btn btn-secondary" target="_blank">
                ${this.dataManager.getText("ui.buttons.viewCode", currentLang)}
              </a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3>${project.title[currentLang]}</h3>
          <p>${project.description[currentLang]}</p>
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

  setupLanguageToggle() {
    const floatingToggle = document.querySelector("#floating-language-toggle");
    const langToggle = document.querySelector(".lang-toggle");

    if (floatingToggle) {
      floatingToggle.addEventListener("click", () => {
        const newLang =
          this.languageManager.getCurrentLanguage() === "es" ? "en" : "es";
        this.updateLanguage(newLang);
      });
    }

    if (langToggle) {
      langToggle.addEventListener("click", () => {
        const newLang =
          this.languageManager.getCurrentLanguage() === "es" ? "en" : "es";
        this.updateLanguage(newLang);
      });
    }
  }

  updateLanguageButton() {
    const currentLang = this.languageManager.getCurrentLanguage();

    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      const nextLang = currentLang === "es" ? "en" : "es";
      langToggle.textContent = nextLang.toUpperCase();
      langToggle.title = this.dataManager.getText(
        "ui.language.toggle",
        currentLang
      );
    }

    this.updateFloatingLanguageButton();
  }

  updateFloatingLanguageButton() {
    const currentLang = this.languageManager.getCurrentLanguage();

    const currentFlag = document.querySelector("#current-flag");
    if (currentFlag) {
      const flags = {
        es: `<img src="https://flagicons.lipis.dev/flags/4x3/cr.svg" alt="Español (Costa Rica)" width="20" height="15">`,
        en: `<img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="English (United States)" width="20" height="15">`,
      };
      currentFlag.innerHTML = flags[currentLang];
    }

    const toggleBtn = document.querySelector("#floating-language-toggle");
    if (toggleBtn) {
      const tooltips = {
        es: "Cambiar idioma",
        en: "Change language",
      };
      toggleBtn.title = tooltips[currentLang];
    }
  }

  // Métodos públicos para acceso externo
  getText(path) {
    return this.dataManager.getText(
      path,
      this.languageManager.getCurrentLanguage()
    );
  }

  getData() {
    return this.dataManager.getData();
  }

  getCurrentLanguage() {
    return this.languageManager.getCurrentLanguage();
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
