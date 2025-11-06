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
    proyectos: "Proyectos",
    contacto: "Contacto",
    idioma: "Language",
  },

  // Sección Hero
  hero: {
    greeting: "Hola, soy",
    name: "Laura Carvajal",
    title: "Frontend Developer & UX/UI Designer",
    description:
      "Me apasiona la tecnología y el desarrollo innovador en el campo de las aplicaciones web. Tengo experiencia como desarrollador front-end y siempre busco crear software de calidad y una experiencia de usuario agradable, lo que me permite proporcionar herramientas eficientes a quienes las necesitan. Así, puedo ayudar a las personas a alcanzar sus objetivos o implementar las mejores soluciones.",
    btnProjects: "Ver Proyectos",
    btnContact: "Contactar",
  },

  // Sección Sobre Mí
  about: {
    title: "Sobre Mí",
    description:
      "Soy una desarrolladora frontend con sólida experiencia en UX/UI design. Me especializo en crear interfaces modernas, accesibles y centradas en el usuario utilizando las últimas tecnologías web.",
    skills: "Habilidades principales:",
    experience: "Años de experiencia:",
    projects: "Proyectos completados:",
    clients: "Clientes satisfechos:",
  },

  // Sección Habilidades
  skills: {
    title: "Habilidades Técnicas",
    subtitle: "Tecnologías y herramientas que domino",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      design: "Diseño",
      tools: "Herramientas",
    },
  },

  // Sección Experiencia
  experience: {
    title: "Experiencia Profesional",
    subtitle: "Mi trayectoria profesional",
    jobs: {
      frontend: {
        title: "Frontend Developer",
        company: "Freelance",
        period: "2023 - Presente",
        description:
          "Desarrollo de interfaces web modernas y responsivas para diversos clientes. Implementación de diseños UX/UI centrados en el usuario y optimización de performance web.",
      },
      uxui: {
        title: "UX/UI Designer",
        company: "Proyectos Independientes",
        period: "2022 - 2023",
        description:
          "Diseño de experiencias de usuario para aplicaciones web y móviles. Creación de wireframes, prototipos y sistemas de diseño coherentes.",
      },
      education: {
        title: "Formación Académica",
        company: "Autodidacta y Cursos Online",
        period: "2021 - 2022",
        description:
          "Especialización en tecnologías frontend modernas y principios de UX/UI. Certificaciones en desarrollo web y diseño de experiencias de usuario.",
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
