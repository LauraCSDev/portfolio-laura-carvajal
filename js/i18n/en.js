/**
 * English Translations
 * Traducciones en Inglés
 */

const en = {
  // Navigation
  nav: {
    inicio: "Home",
    sobreMi: "About",
    habilidades: "Skills",
    experiencia: "Experience",
    proyectos: "Projects",
    contacto: "Contact",
    idioma: "Idioma",
  },

  // Hero Section
  hero: {
    greeting: "Hi, I'm",
    name: "Laura Carvajal",
    title: "Frontend Developer & UX/UI Designer",
    description:
      "I love technology and innovative development in the field of web applications. I have experience as a front-end developer, I always seek to develop quality software and a pleasant user experience, which allows me to provide efficient tools for those who need them, so, I can help people achieve their goals or implement the best solutions.",
    btnProjects: "View Projects",
    btnContact: "Contact Me",
  },

  // About Section
  about: {
    title: "About Me",
    description:
      "I'm a frontend developer with solid experience in UX/UI design. I specialize in creating modern, accessible and user-centered interfaces using the latest web technologies.",
    skills: "Core skills:",
    experience: "Years of experience:",
    projects: "Completed projects:",
    clients: "Satisfied clients:",
  },

  // Skills Section
  skills: {
    title: "Technical Skills",
    subtitle: "Technologies and tools I master",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      design: "Design",
      tools: "Tools",
    },
  },

  // Experience Section
  experience: {
    title: "Professional Experience",
    subtitle: "My professional journey",
    jobs: {
      frontend: {
        title: "Frontend Developer",
        company: "Freelance",
        period: "2023 - Present",
        description:
          "Development of modern and responsive web interfaces for various clients. Implementation of user-centered UX/UI designs and web performance optimization.",
      },
      uxui: {
        title: "UX/UI Designer",
        company: "Independent Projects",
        period: "2022 - 2023",
        description:
          "User experience design for web and mobile applications. Creation of wireframes, prototypes and coherent design systems.",
      },
      education: {
        title: "Academic Training",
        company: "Self-taught and Online Courses",
        period: "2021 - 2022",
        description:
          "Specialization in modern frontend technologies and UX/UI principles. Certifications in web development and user experience design.",
      },
    },
  },

  // Projects Section
  projects: {
    title: "Featured Projects",
    subtitle: "Some of my featured work",
    viewProject: "View Project",
    viewCode: "View Code",
    items: {
      portfolio: {
        title: "Responsive Personal Portfolio",
        description:
          "Design and development of personal portfolio with focus on modern UX/UI, implementing CSS animations and intuitive navigation.",
      },
      landing: {
        title: "Corporate Landing Page",
        description:
          "UX/UI design and frontend development of landing page for tech startup, optimized for conversion with responsive design.",
      },
      elearning: {
        title: "E-learning Web App",
        description:
          "User interface for online educational platform with course system and progress tracking focused on learning experience.",
      },
    },
  },

  // Contact Section
  contact: {
    title: "Contact",
    subtitle: "Have a project in mind? Let's talk!",
    info: {
      email: "Email",
      linkedin: "LinkedIn",
      location: "Location",
      locationValue: "Cartago, Costa Rica",
    },
    form: {
      name: "Full name",
      email: "Email address",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
    },
    notifications: {
      success: "Message sent successfully!",
      error: "Error sending message. Please try again.",
    },
  },

  // Footer
  footer: {
    copyright: "© 2025 Laura Carvajal. All rights reserved.",
    madeWith: "Designed and developed with ❤️ using HTML5, CSS3 and JavaScript",
  },

  // System messages
  system: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
  },

  // Themes
  theme: {
    light: "Light Theme",
    dark: "Dark Theme",
    toggleTooltip: "Switch theme",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
};

// Make available globally
if (typeof window !== "undefined") {
  window["translations_en"] = en;
}

// Export for Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = en;
}
