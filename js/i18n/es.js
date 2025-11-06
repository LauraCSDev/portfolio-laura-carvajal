/**
 * Traducciones en Español
 * Spanish Translations
 */

const es = {
  // Navegación
  nav: {
    inicio: "Inicio",
    sobreMi: "Sobre Mí",
    habilidades: "Habilidades",
    experiencia: "Experiencia",
    certificaciones: "Certificaciones",
    proyectos: "Proyectos",
    contacto: "Contacto",
    idioma: "Language",
  },

  // Sección Hero
  hero: {
    greeting: "Hola, soy",
    name: "Laura Carvajal",
    title: "Analista Programador II | Frontend Developer | UX/UI Designer",
    description:
      "Frontend Developer con casi 6 años de experiencia. Especializada en React, Flutter y tecnologías modernas. Profesora universitaria y Team Lead con experiencia en desarrollo mobile y web de alta calidad.",
    btnProjects: "Ver Proyectos",
    btnContact: "Contáctame",
  },

  // Sección Sobre Mí
  about: {
    title: "Sobre Mí",
    intro:
      "Soy una profesional de 27 años con casi 6 años de experiencia en desarrollo de software. Actualmente me desempeño como Analista Programador II en BAC Latam y como Profesora Universitaria en la Universidad Fidélitas, combinando la práctica profesional con la enseñanza.",
    description:
      "Mi experiencia abarca desarrollo Frontend con React, desarrollo mobile con Flutter, y liderazgo de equipos técnicos. Me especializo en crear aplicaciones web y móviles de alta calidad, aplicando técnicas de modelado, estándares y patrones acordados. También tengo experiencia en cIQ, DevRel y diseño UX/UI.",
    stats: {
      experience: "Años de Experiencia",
      companies: "Empresas Líderes",
      technologies: "Tecnologías Dominadas",
    },
  },

  // Sección Habilidades
  skills: {
    title: "Habilidades Técnicas",
    subtitle: "Tecnologías y herramientas que domino",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Mobile",
      tools: "Herramientas & Cloud",
    },
  },

  // Sección Experiencia
  experience: {
    title: "Experiencia Profesional",
    subtitle: "Mi trayectoria profesional",
  },

  // Sección Certificaciones
  certifications: {
    title: "Certificaciones",
    subtitle: "Certificaciones profesionales y especializaciones",
    items: {
      flutter: {
        title: "Flutter Certified Application Developer",
        company: "ATC - Advance Training Consultants",
        id: "ID: ATCW10001832",
        description:
          "Certificación oficial en desarrollo de aplicaciones móviles con Flutter",
      },
      scrum: {
        title: "Scrum Foundation Professional Certificate (SFPC)",
        company: "CertiProf",
        id: "ID: JLSTTDHPHJ-VHVKHVHZ-YBWYJDJDDT",
        description: "Certificación profesional en metodologías ágiles SCRUM",
      },
      ux: {
        title: "UX Writing: Content Design and User Experience",
        company: "Udemy",
        description:
          "Especialización en diseño de contenido y experiencia de usuario",
      },
    },
  },

  // Sección Proyectos
  projects: {
    title: "Proyectos Destacados",
    subtitle: "Algunos de mis trabajos destacados",
    viewProject: "Ver Proyecto",
    viewCode: "Ver Código",
    items: {
      portfolio: {
        title: "Portfolio Personal Responsivo",
        description:
          "Diseño y desarrollo de portfolio personal con enfoque en UX/UI moderno, implementando animaciones CSS y navegación intuitiva.",
      },
      landing: {
        title: "Landing Page Corporativa",
        description:
          "Diseño UX/UI y desarrollo frontend de landing page para startup tecnológica, optimizada para conversión y con diseño responsive.",
      },
      elearning: {
        title: "App Web de E-learning",
        description:
          "Interfaz de usuario para plataforma educativa online con sistema de cursos y seguimiento de progreso centrado en la experiencia de aprendizaje.",
      },
    },
  },

  // Sección Contacto
  contact: {
    title: "Contacto",
    subtitle: "¿Tienes un proyecto en mente? ¡Hablemos!",
    info: {
      email: "Email",
      linkedin: "LinkedIn",
      location: "Ubicación",
      locationValue: "Cartago, Costa Rica",
    },
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar Mensaje",
    },
    notifications: {
      success: "¡Mensaje enviado correctamente!",
      error: "Error al enviar el mensaje. Inténtalo de nuevo.",
    },
  },

  // Footer
  footer: {
    copyright: "© 2025 Laura Carvajal. Todos los derechos reservados.",
    madeWith: "Diseñado y desarrollado con ❤️ usando HTML5, CSS3 y JavaScript",
  },

  // Mensajes del sistema
  system: {
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",
  },

  // Temas
  theme: {
    light: "Tema Claro",
    dark: "Tema Oscuro",
    toggleTooltip: "Cambiar tema",
    switchToLight: "Cambiar a tema claro",
    switchToDark: "Cambiar a tema oscuro",
  },
};

// Hacer disponible globalmente
if (typeof window !== "undefined") {
  window["translations_es"] = es;
}

// Export para Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = es;
}
