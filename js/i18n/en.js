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
    certificaciones: "Certifications",
    proyectos: "Projects",
    contacto: "Contact",
    idioma: "Idioma",
  },

  // Hero Section
  hero: {
    greeting: "Hi, I'm",
    name: "Laura Carvajal",
    title: "Software Analyst II | Frontend Developer | UX/UI Designer",
    description:
      "Frontend Developer with almost 6 years of experience. Specialized in React, Flutter and modern technologies. University Professor and Team Lead with experience in high-quality mobile and web development.",
    btnProjects: "View Projects",
    btnContact: "Contact Me",
  },

  // About Section
  about: {
    title: "About Me",
    intro:
      "I am a 27-year-old professional with almost 6 years of experience in software development. I currently work as a Software Analyst II at BAC Latam and as a University Professor at Fidélitas University, combining professional practice with teaching.",
    description:
      "My experience spans Frontend development with React, mobile development with Flutter, and technical team leadership. I specialize in creating high-quality web and mobile applications, applying modeling techniques, agreed-upon standards and patterns. I also have experience in cIQ, DevRel and UX/UI design.",
    stats: {
      experience: "Years of Experience",
      companies: "Leading Companies",
      technologies: "Technologies Mastered",
    },
  },

  // Skills Section
  skills: {
    title: "Technical Skills",
    subtitle: "Technologies and tools I master",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Mobile",
      tools: "Tools & Cloud",
    },
  },

  // Experience Section
  experience: {
    title: "Professional Experience",
    subtitle: "My professional journey",
  },

  // Certifications Section
  certifications: {
    title: "Certifications",
    subtitle: "Professional certifications and specializations",
    items: {
      flutter: {
        title: "Flutter Certified Application Developer",
        company: "ATC - Advance Training Consultants",
        id: "ID: ATCW10001832",
        description:
          "Official certification in mobile application development with Flutter",
      },
      scrum: {
        title: "Scrum Foundation Professional Certificate (SFPC)",
        company: "CertiProf",
        id: "ID: JLSTTDHPHJ-VHVKHVHZ-YBWYJDJDDT",
        description: "Professional certification in SCRUM agile methodologies",
      },
      ux: {
        title: "UX Writing: Content Design and User Experience",
        company: "Udemy",
        description: "Specialization in content design and user experience",
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
    subtitle: "Let's work together",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "There was an error. Please try again.",
    },
  },

  // Footer
  footer: {
    text: "Made with ❤️ by Laura Carvajal",
    rights: "All rights reserved.",
  },

  // Footer
  footer: {
    copyright: "© 2025 Laura Carvajal. All rights reserved.",
    madeWith: "Designed and developed with ❤️ using HTML5, CSS3 and JavaScript",
    text: "Made with ❤️ by Laura Carvajal",
    rights: "All rights reserved.",
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

  // Language
  language: {
    es: "Spanish",
    en: "English",
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
