# ��� Portfolio Laura Carvajal

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://lauracdev.github.io/portfolio-laura-carvajal/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Portafolio personal bilingüe (ES/EN) con sistema de temas claro/oscuro y diseño responsive inspirado en GitHub.

## ��� Demo en Vivo

- **��� GitHub Pages**: [https://lauracdev.github.io/portfolio-laura-carvajal/](https://lauracdev.github.io/portfolio-laura-carvajal/)
- **��� Responsive**: Optimizado para móviles, tablets y desktop

## ✨ Características

- ��� **Bilingüe**: Español ↔ Inglés con selector dinámico
- ��� **Temas**: Claro/Oscuro con persistencia en localStorage
- ��� **Responsive**: Diseño mobile-first completamente adaptativo
- ���️ **Logos dinámicos**: Favicon y logos cambian automáticamente con el tema
- ��� **GitHub-inspired**: Diseño limpio y profesional
- ⚡ **Performance**: Optimizado para carga rápida
- ��� **Vanilla JS**: Sin dependencias externas

## ���️ Instalación Local

### Prerrequisitos

- Python 3.x (para servidor local)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos de instalación

```bash
# Clonar el repositorio
git clone https://github.com/LauraCSDev/portfolio-laura-carvajal.git
cd portfolio-laura-carvajal

# Iniciar servidor local
python -m http.server 8000

# Abrir en navegador
open http://127.0.0.1:8000/
```

### Alternativas de servidor

```bash
# Con Node.js (npx)
npx http-server -p 8000

# Con VS Code Live Server
# Instala la extensión "Live Server" y haz clic derecho en index.html

# Con PHP
php -S localhost:8000
```

## ��� Estructura del Proyecto

```
portfolio-laura-carvajal/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos y variables CSS
├── js/
│   ├── script.js          # Lógica principal
│   └── translations.js    # Sistema i18n
├── img/
│   ├── logo-light.png     # Logo tema claro
│   ├── logo-dark.png      # Logo tema oscuro
│   └── favicon.ico        # Icono del sitio
├── README.md              # Este archivo
└── .gitignore            # Archivos ignorados por Git
```

## ��� Configuración y Personalización

### Traducciones

Edita `js/translations.js` para añadir o modificar textos:

```javascript
const translations = {
  es: {
    hero: {
      greeting: "Tu texto aquí"
    }
  },
  en: {
    hero: {
      greeting: "Your text here"
    }
  }
};
```

### Temas y Colores

Modifica las variables CSS en `css/style.css`:

```css
:root {
  --color-accent: #0969da;
  --bg-canvas: #ffffff;
  /* ... más variables */
}

[data-theme="dark"] {
  --bg-canvas: #0d1117;
  /* ... variables modo oscuro */
}
```

### Logos y Branding

Reemplaza los archivos en `img/`:

- `logo-light.png` - Logo para tema claro (recomendado: 200x50px)
- `logo-dark.png` - Logo para tema oscuro (recomendado: 200x50px)
- `favicon.ico` - Icono del sitio (32x32px o 16x16px)

## ��� Testing y Verificación

Después de iniciar el servidor local, verifica:

- ✅ **Idiomas**: El selector cambia textos correctamente
- ✅ **Temas**: Botón alterna entre claro/oscuro y persiste
- ✅ **Responsive**: Funciona en diferentes tamaños de pantalla
- ✅ **Performance**: Sin errores en consola del navegador
- ✅ **Logos**: Cambian dinámicamente con el tema
- ✅ **Navegación**: Links internos y scroll suave funcionan

## ��� Deployment

### GitHub Pages (Recomendado)

1. Fork este repositorio
2. Ve a **Settings** → **Pages**
3. Selecciona **Deploy from a branch**
4. Elige **main branch** como source
5. Tu sitio estará disponible en `https://tu-usuario.github.io/portfolio-laura-carvajal/`

### Otros servicios

- **Netlify**: Conecta tu repo y deploy automático
- **Vercel**: Import desde GitHub con zero-config
- **Surge.sh**: `npm install -g surge && surge`

## ���️ Desarrollo

### Estructura de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: añadir nueva sección de certificaciones"
git commit -m "fix: corregir responsive en móviles"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

### Roadmap

- [ ]  ��� Añadir TypeScript para mejor type safety
- [ ]  ��� Más temas (high-contrast, colorblind-friendly)
- [ ]  ��� Integración con Google Analytics
- [ ]  ��� SEO mejorado con meta tags dinámicos
- [ ]  ��� Más idiomas (francés, alemán)
- [ ]  ��� PWA (Progressive Web App)

## ��� Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ��� Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## ���‍��� Autora

**Laura Carvajal**

- ��� Portfolio: [portfolio-laura-carvajal]([https://lauracdev.github.io/portfolio-laura-carvajal/](https://lauracsdev.github.io/portfolio-laura-carvajal)https://lauracdev.github.io/portfolio-laura-carvajal/)
- ��� LinkedIn: [Laura Carvajal](https://www.linkedin.com/in/laura-carvajal-segura)
- ��� Email: danycarse@gmail.com
- ��� GitHub: [@LauraCSDev](https://github.com/LauraCSDev)

---

<div align="center">
  <strong>⭐ Si te gusta este proyecto, ¡dale una estrella!</strong>
</div>

<div align="center">
  Hecho con ❤️ y ☕ | © 2024 Laura Carvajal
</div>
