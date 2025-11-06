// @ts-nocheck
/**
 * Sistema de Internacionalización (i18n)
 * Sistema completo de traducción español-inglés para el portafolio
 */

class I18n {
  constructor() {
    this.currentLanguage = 'es'; // Idioma por defecto
    this.translations = {
      es: {
        nav: {
          home: 'Inicio',
          about: 'Sobre Mí',
          skills: 'Habilidades',
          experience: 'Experiencia',
          projects: 'Proyectos',
          contact: 'Contacto'
        },
        theme: {
          light: 'Cambiar a tema oscuro',
          dark: 'Cambiar a tema claro'
        },
        hero: {
          greeting: 'Hola, soy <span class="highlight">Laura Carvajal</span>',
          title: 'Frontend Developer & UX/UI Designer',
          description: 'Apasionada por crear experiencias digitales innovadoras y funcionales. Combino habilidades técnicas de desarrollo con un enfoque centrado en el usuario.',
          viewProjects: 'Ver Proyectos',
          contact: 'Contáctame'
        },
        about: {
          title: 'Sobre Mí',
          intro: 'Frontend Developer y UX/UI Designer con sólida experiencia en el desarrollo de interfaces web modernas y el diseño de experiencias de usuario centradas en la usabilidad.',
          description1: 'Mi formación académica y experiencia profesional me han permitido desarrollar un perfil versátil que combina conocimientos técnicos profundos con sensibilidad para el diseño y la experiencia de usuario.',
          description2: 'Me apasiona crear soluciones digitales que no solo sean técnicamente robustas, sino también intuitivas y accesibles para todos los usuarios.',
          description3: 'Actualmente, busco nuevas oportunidades para contribuir en proyectos desafiantes donde pueda aplicar mis conocimientos en desarrollo frontend y diseño UX/UI.',
          stats: {
            projects: 'Proyectos Completados',
            experience: 'Años de Experiencia',
            technologies: 'Tecnologías Dominadas',
            clients: 'Clientes Satisfechos'
          }
        },
        skills: {
          title: 'Habilidades Técnicas',
          categories: {
            frontend: 'Frontend',
            design: 'Diseño UX/UI',
            tools: 'Herramientas',
            soft: 'Habilidades Blandas'
          }
        },
        experience: {
          title: 'Experiencia Profesional',
          jobs: {
            frontend: {
              title: 'Frontend Developer',
              company: 'Empresa de Tecnología',
              period: '2023 - Presente',
              description: 'Desarrollo de interfaces web responsivas usando React, implementación de diseños UX/UI y optimización de rendimiento.'
            },
            uxui: {
              title: 'UX/UI Designer',
              company: 'Agencia Digital',
              period: '2022 - 2023',
              description: 'Diseño de experiencias de usuario, creación de prototipos interactivos y colaboración estrecha con equipos de desarrollo.'
            },
            education: {
              title: 'Formación Académica',
              company: 'Universidad/Instituto',
              period: '2019 - 2022',
              description: 'Estudios especializados en desarrollo web y diseño digital, con enfoque en las últimas tecnologías y metodologías.'
            }
          }
        },
        projects: {
          title: 'Proyectos Destacados',
          items: {
            portfolio: {
              title: 'Portafolio Personal',
              description: 'Diseño y desarrollo de portafolio responsivo con HTML5, CSS3 y JavaScript vanilla.'
            },
            landing: {
              title: 'Landing Page Corporativa',
              description: 'Desarrollo de página de aterrizaje con enfoque en conversión y experiencia de usuario optimizada.'
            },
            elearning: {
              title: 'Plataforma E-Learning',
              description: 'Interfaz de usuario para plataforma educativa con dashboard interactivo y sistema de progreso.'
            }
          },
          buttons: {
            demo: 'Ver Demo',
            code: 'Ver Código'
          }
        },
        contact: {
          title: 'Contacto',
          subtitle: 'Hablemos de tu próximo proyecto',
          description: 'Estoy disponible para nuevas oportunidades. Si tienes un proyecto en mente o simplemente quieres conectar, no dudes en contactarme.',
          info: {
            email: 'Email',
            linkedin: 'LinkedIn',
            location: 'Ubicación',
            locationValue: 'Lima, Perú'
          },
          form: {
            name: 'Nombre',
            email: 'Email',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar Mensaje'
          }
        },
        footer: {
          rights: '© 2025 Laura Carvajal. Todos los derechos reservados.',
          tech: 'Diseñado y desarrollado con ❤️ usando HTML5, CSS3 y JavaScript'
        }
      },
      en: {
        nav: {
          home: 'Home',
          about: 'About',
          skills: 'Skills',
          experience: 'Experience',
          projects: 'Projects',
          contact: 'Contact'
        },
        theme: {
          light: 'Switch to dark theme',
          dark: 'Switch to light theme'
        },
        hero: {
          greeting: 'Hi, I\'m <span class="highlight">Laura Carvajal</span>',
          title: 'Frontend Developer & UX/UI Designer',
          description: 'Passionate about creating innovative and functional digital experiences. I combine technical development skills with a user-centered approach.',
          viewProjects: 'View Projects',
          contact: 'Contact Me'
        },
        about: {
          title: 'About Me',
          intro: 'Frontend Developer and UX/UI Designer with solid experience in developing modern web interfaces and designing user experiences focused on usability.',
          description1: 'My academic background and professional experience have allowed me to develop a versatile profile that combines deep technical knowledge with sensitivity for design and user experience.',
          description2: 'I am passionate about creating digital solutions that are not only technically robust, but also intuitive and accessible to all users.',
          description3: 'Currently, I am looking for new opportunities to contribute to challenging projects where I can apply my knowledge in frontend development and UX/UI design.',
          stats: {
            projects: 'Completed Projects',
            experience: 'Years of Experience',
            technologies: 'Technologies Mastered',
            clients: 'Satisfied Clients'
          }
        },
        skills: {
          title: 'Technical Skills',
          categories: {
            frontend: 'Frontend',
            design: 'UX/UI Design',
            tools: 'Tools',
            soft: 'Soft Skills'
          }
        },
        experience: {
          title: 'Professional Experience',
          jobs: {
            frontend: {
              title: 'Frontend Developer',
              company: 'Technology Company',
              period: '2023 - Present',
              description: 'Development of responsive web interfaces using React, UX/UI design implementation and performance optimization.'
            },
            uxui: {
              title: 'UX/UI Designer',
              company: 'Digital Agency',
              period: '2022 - 2023',
              description: 'User experience design, interactive prototype creation and close collaboration with development teams.'
            },
            education: {
              title: 'Academic Background',
              company: 'University/Institute',
              period: '2019 - 2022',
              description: 'Specialized studies in web development and digital design, with a focus on the latest technologies and methodologies.'
            }
          }
        },
        projects: {
          title: 'Featured Projects',
          items: {
            portfolio: {
              title: 'Personal Portfolio',
              description: 'Design and development of responsive portfolio with HTML5, CSS3 and vanilla JavaScript.'
            },
            landing: {
              title: 'Corporate Landing Page',
              description: 'Landing page development focused on conversion and optimized user experience.'
            },
            elearning: {
              title: 'E-Learning Platform',
              description: 'User interface for educational platform with interactive dashboard and progress system.'
            }
          },
          buttons: {
            demo: 'View Demo',
            code: 'View Code'
          }
        },
        contact: {
          title: 'Contact',
          subtitle: 'Let\'s talk about your next project',
          description: 'I am available for new opportunities. If you have a project in mind or just want to connect, feel free to contact me.',
          info: {
            email: 'Email',
            linkedin: 'LinkedIn',
            location: 'Location',
            locationValue: 'Lima, Peru'
          },
          form: {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send Message'
          }
        },
        footer: {
          rights: '© 2025 Laura Carvajal. All rights reserved.',
          tech: 'Designed and developed with ❤️ using HTML5, CSS3 and JavaScript'
        }
      }
    };
  }

  // Obtener traducción por clave
  t(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }
    
    return translation || key;
  }

  // Establecer idioma
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('preferred-language', lang);
      this.updatePage();
    }
  }

  // Obtener idioma actual
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Inicializar sistema
  init() {
    // Cargar idioma guardado
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.translations[savedLang]) {
      this.currentLanguage = savedLang;
    }
    
    // Actualizar página con idioma actual
    this.updatePage();
  }

  // Actualizar toda la página
  updatePage() {
    // Actualizar elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = this.t(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });

    // Actualizar elementos específicos que no tienen data-i18n
    this.updateSpecificElements();
    
    // Actualizar tooltips de tema si está disponible
    if (typeof window.updateThemeTooltips === 'function') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      window.updateThemeTooltips(currentTheme);
    }
  }

  // Actualizar elementos específicos manualmente
  updateSpecificElements() {
    // Actualizar títulos de sección
    const aboutTitle = document.querySelector('#sobre-mi .section-title');
    if (aboutTitle) aboutTitle.textContent = this.t('about.title');

    const skillsTitle = document.querySelector('#habilidades .section-title');
    if (skillsTitle) skillsTitle.textContent = this.t('skills.title');

    const experienceTitle = document.querySelector('#experiencia .section-title');
    if (experienceTitle) experienceTitle.textContent = this.t('experience.title');

    const projectsTitle = document.querySelector('#proyectos .section-title');
    if (projectsTitle) projectsTitle.textContent = this.t('projects.title');

    const contactTitle = document.querySelector('#contacto .section-title');
    if (contactTitle) contactTitle.textContent = this.t('contact.title');

    // Actualizar sección About
    const aboutIntro = document.querySelector('.about-intro');
    if (aboutIntro) aboutIntro.textContent = this.t('about.intro');

    const aboutTexts = document.querySelectorAll('.about-text p:not(.about-intro)');
    if (aboutTexts.length >= 3) {
      aboutTexts[0].textContent = this.t('about.description1');
      aboutTexts[1].textContent = this.t('about.description2');
      aboutTexts[2].textContent = this.t('about.description3');
    }

    // Actualizar estadísticas
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = this.t('about.stats.projects');
      statLabels[1].textContent = this.t('about.stats.experience');
      statLabels[2].textContent = this.t('about.stats.technologies');
      statLabels[3].textContent = this.t('about.stats.clients');
    }

    // Actualizar categorías de habilidades
    const skillCategories = document.querySelectorAll('.skill-category h3');
    if (skillCategories.length >= 4) {
      skillCategories[0].textContent = this.t('skills.categories.frontend');
      skillCategories[1].textContent = this.t('skills.categories.design');
      skillCategories[2].textContent = this.t('skills.categories.tools');
      skillCategories[3].textContent = this.t('skills.categories.soft');
    }

    // Actualizar timeline de experiencia
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length >= 3) {
      // Primer trabajo
      const firstJob = timelineItems[0];
      if (firstJob) {
        const h3 = firstJob.querySelector('h3');
        const h4 = firstJob.querySelector('h4');
        const date = firstJob.querySelector('.timeline-date');
        const desc = firstJob.querySelector('p');
        
        if (h3) h3.textContent = this.t('experience.jobs.frontend.title');
        if (h4) h4.textContent = this.t('experience.jobs.frontend.company');
        if (date) date.textContent = this.t('experience.jobs.frontend.period');
        if (desc) desc.textContent = this.t('experience.jobs.frontend.description');
      }

      // Segundo trabajo
      const secondJob = timelineItems[1];
      if (secondJob) {
        const h3 = secondJob.querySelector('h3');
        const h4 = secondJob.querySelector('h4');
        const date = secondJob.querySelector('.timeline-date');
        const desc = secondJob.querySelector('p');
        
        if (h3) h3.textContent = this.t('experience.jobs.uxui.title');
        if (h4) h4.textContent = this.t('experience.jobs.uxui.company');
        if (date) date.textContent = this.t('experience.jobs.uxui.period');
        if (desc) desc.textContent = this.t('experience.jobs.uxui.description');
      }

      // Educación
      const education = timelineItems[2];
      if (education) {
        const h3 = education.querySelector('h3');
        const h4 = education.querySelector('h4');
        const date = education.querySelector('.timeline-date');
        const desc = education.querySelector('p');
        
        if (h3) h3.textContent = this.t('experience.jobs.education.title');
        if (h4) h4.textContent = this.t('experience.jobs.education.company');
        if (date) date.textContent = this.t('experience.jobs.education.period');
        if (desc) desc.textContent = this.t('experience.jobs.education.description');
      }
    }

    // Actualizar proyectos
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length >= 3) {
      // Proyecto 1
      if (projectCards[0]) {
        const h3 = projectCards[0].querySelector('h3');
        const p = projectCards[0].querySelector('p');
        if (h3) h3.textContent = this.t('projects.items.portfolio.title');
        if (p) p.textContent = this.t('projects.items.portfolio.description');
      }

      // Proyecto 2
      if (projectCards[1]) {
        const h3 = projectCards[1].querySelector('h3');
        const p = projectCards[1].querySelector('p');
        if (h3) h3.textContent = this.t('projects.items.landing.title');
        if (p) p.textContent = this.t('projects.items.landing.description');
      }

      // Proyecto 3
      if (projectCards[2]) {
        const h3 = projectCards[2].querySelector('h3');
        const p = projectCards[2].querySelector('p');
        if (h3) h3.textContent = this.t('projects.items.elearning.title');
        if (p) p.textContent = this.t('projects.items.elearning.description');
      }
    }

    // Actualizar botones de proyecto
    const demoButtons = document.querySelectorAll('.btn-demo');
    const codeButtons = document.querySelectorAll('.btn-code');
    demoButtons.forEach(btn => {
      if (btn) btn.textContent = this.t('projects.buttons.demo');
    });
    codeButtons.forEach(btn => {
      if (btn) btn.textContent = this.t('projects.buttons.code');
    });

    // Actualizar sección de contacto
    const contactSubtitle = document.querySelector('.contact-subtitle');
    if (contactSubtitle) contactSubtitle.textContent = this.t('contact.subtitle');

    const contactDesc = document.querySelector('.contact-description');
    if (contactDesc) contactDesc.textContent = this.t('contact.description');

    // Actualizar información de contacto
    const contactItems = document.querySelectorAll('.contact-item h4');
    if (contactItems.length >= 3) {
      if (contactItems[0]) contactItems[0].textContent = this.t('contact.info.email');
      if (contactItems[1]) contactItems[1].textContent = this.t('contact.info.linkedin');
      if (contactItems[2]) {
        contactItems[2].textContent = this.t('contact.info.location');
        const locationP = contactItems[2].parentElement.querySelector('p');
        if (locationP) locationP.textContent = this.t('contact.info.locationValue');
      }
    }

    // Actualizar formulario
    const form = document.querySelector('#contact-form');
    if (form) {
      const nameLabel = form.querySelector('label[for="name"]');
      const emailLabel = form.querySelector('label[for="email"]');
      const subjectLabel = form.querySelector('label[for="subject"]');
      const messageLabel = form.querySelector('label[for="message"]');
      const submitBtn = form.querySelector('.btn-primary[type="submit"]');

      if (nameLabel) nameLabel.textContent = this.t('contact.form.name');
      if (emailLabel) emailLabel.textContent = this.t('contact.form.email');
      if (subjectLabel) subjectLabel.textContent = this.t('contact.form.subject');
      if (messageLabel) messageLabel.textContent = this.t('contact.form.message');
      if (submitBtn) submitBtn.textContent = this.t('contact.form.send');
    }

    // Actualizar footer
    const footerTexts = document.querySelectorAll('footer p');
    if (footerTexts.length >= 2) {
      footerTexts[0].textContent = this.t('footer.rights');
      footerTexts[1].innerHTML = this.t('footer.tech');
    }
  }

  // Método auxiliar para actualizar un elemento
  updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = content;
    }
  }

  // Obtener notificaciones de idioma
  getNotification(type) {
    const notifications = {
      es: {
        languageChanged: 'Idioma cambiado a Español',
        error: 'Error al cambiar idioma'
      },
      en: {
        languageChanged: 'Language changed to English',
        error: 'Error changing language'
      }
    };

    return notifications[this.currentLanguage] && notifications[this.currentLanguage][type] || '';
  }
}

// Hacer disponible globalmente
window.I18n = I18n;