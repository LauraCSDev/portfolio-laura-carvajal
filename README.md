# Ì≤º Portfolio Laura Carvajal

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://lauracdev.github.io/portfolio-laura-carvajal/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Portafolio personal biling√ºe (ES/EN) con sistema de temas claro/oscuro y dise√±o responsive inspirado en GitHub.

## Ì∫Ä Demo en Vivo

- **Ìºê GitHub Pages**: [https://lauracdev.github.io/portfolio-laura-carvajal/](https://lauracdev.github.io/portfolio-laura-carvajal/)
- **Ì≥± Responsive**: Optimizado para m√≥viles, tablets y desktop

## ‚ú® Caracter√≠sticas

- Ìºê **Biling√ºe**: Espa√±ol ‚Üî Ingl√©s con selector din√°mico
- Ìæ® **Temas**: Claro/Oscuro con persistencia en localStorage
- Ì≥± **Responsive**: Dise√±o mobile-first completamente adaptativo
- Ì∂ºÔ∏è **Logos din√°micos**: Favicon y logos cambian autom√°ticamente con el tema
- ÌæØ **GitHub-inspired**: Dise√±o limpio y profesional
- ‚ö° **Performance**: Optimizado para carga r√°pida
- Ì¥ß **Vanilla JS**: Sin dependencias externas

## Ìª†Ô∏è Instalaci√≥n Local

### Prerrequisitos
- Python 3.x (para servidor local)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos de instalaci√≥n

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
# Instala la extensi√≥n "Live Server" y haz clic derecho en index.html

# Con PHP
php -S localhost:8000
```

## Ì≥Å Estructura del Proyecto

```
portfolio-laura-carvajal/
‚îú‚îÄ‚îÄ index.html              # P√°gina principal
‚îú‚îÄ‚îÄ css/
‚îÇ   ‚îî‚îÄ‚îÄ style.css          # Estilos y variables CSS
‚îú‚îÄ‚îÄ js/
‚îÇ   ‚îú‚îÄ‚îÄ script.js          # L√≥gica principal
‚îÇ   ‚îî‚îÄ‚îÄ translations.js    # Sistema i18n
‚îú‚îÄ‚îÄ img/
‚îÇ   ‚îú‚îÄ‚îÄ logo-light.png     # Logo tema claro
‚îÇ   ‚îú‚îÄ‚îÄ logo-dark.png      # Logo tema oscuro
‚îÇ   ‚îî‚îÄ‚îÄ favicon.ico        # Icono del sitio
‚îú‚îÄ‚îÄ README.md              # Este archivo
‚îî‚îÄ‚îÄ .gitignore            # Archivos ignorados por Git
```

## Ì¥ß Configuraci√≥n y Personalizaci√≥n

### Traducciones

Edita `js/translations.js` para a√±adir o modificar textos:

```javascript
const translations = {
  es: {
    hero: {
      greeting: "Tu texto aqu√≠"
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
  /* ... m√°s variables */
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

## Ì∑™ Testing y Verificaci√≥n

Despu√©s de iniciar el servidor local, verifica:

- ‚úÖ **Idiomas**: El selector cambia textos correctamente
- ‚úÖ **Temas**: Bot√≥n alterna entre claro/oscuro y persiste
- ‚úÖ **Responsive**: Funciona en diferentes tama√±os de pantalla
- ‚úÖ **Performance**: Sin errores en consola del navegador
- ‚úÖ **Logos**: Cambian din√°micamente con el tema
- ‚úÖ **Navegaci√≥n**: Links internos y scroll suave funcionan

## Ì∫Ä Deployment

### GitHub Pages (Recomendado)

1. Fork este repositorio
2. Ve a **Settings** ‚Üí **Pages**
3. Selecciona **Deploy from a branch**
4. Elige **main branch** como source
5. Tu sitio estar√° disponible en `https://tu-usuario.github.io/portfolio-laura-carvajal/`

### Otros servicios

- **Netlify**: Conecta tu repo y deploy autom√°tico
- **Vercel**: Import desde GitHub con zero-config
- **Surge.sh**: `npm install -g surge && surge`

## Ìª†Ô∏è Desarrollo

### Estructura de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: a√±adir nueva secci√≥n de certificaciones"
git commit -m "fix: corregir responsive en m√≥viles"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

### Roadmap

- [ ] Ì¥ß A√±adir TypeScript para mejor type safety
- [ ] Ìæ® M√°s temas (high-contrast, colorblind-friendly)
- [ ] Ì≥ä Integraci√≥n con Google Analytics
- [ ] Ì¥ç SEO mejorado con meta tags din√°micos
- [ ] Ìºê M√°s idiomas (franc√©s, alem√°n)
- [ ] Ì≥± PWA (Progressive Web App)

## Ì¥ù Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Ì≥Ñ Licencia

Este proyecto est√° bajo la Licencia MIT. Ver `LICENSE` para m√°s detalles.

## Ì±©‚ÄçÌ≤ª Autora

**Laura Carvajal**
- Ì≤º Portfolio: [lauracdev.github.io](https://lauracdev.github.io/portfolio-laura-carvajal/)
- Ì≤º LinkedIn: [Laura Carvajal](https://linkedin.com/in/laura-carvajal-dev)
- Ì≥ß Email: contacto@lauracarvajal.dev
- Ì∞ô GitHub: [@LauraCSDev](https://github.com/LauraCSDev)

---

<div align="center">
  <strong>‚≠ê Si te gusta este proyecto, ¬°dale una estrella!</strong>
</div>

<div align="center">
  Hecho con ‚ù§Ô∏è y ‚òï | ¬© 2024 Laura Carvajal
</div>
