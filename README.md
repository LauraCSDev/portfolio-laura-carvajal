# Portafolio ‚Äî Instanciaci√≥n local

Este repositorio contiene una p√°gina de portafolio personal (HTML, CSS y JavaScript). Este README explica c√≥mo instanciarla localmente, verificar las caracter√≠sticas principales (i18n, tema claro/oscuro, logos/favicons) y algunos pasos de limpieza recomendados.

## Ì∫Ä Inicio r√°pido

```bash
# Clonar el repositorio
git clone <tu-repositorio-url>
cd portafolio

# Iniciar servidor local
python -m http.server 8000

# Abrir en navegador
http://127.0.0.1:8000/
```

## Ì≥Å Estructura principal

- `index.html` ‚Äî P√°gina principal
- `css/style.css` ‚Äî Estilos (variables CSS para temas)
- `js/script.js` ‚Äî L√≥gica principal: men√∫, selector de idioma y tema
- `js/translations.js` ‚Äî Sistema i18n (ES/EN)
- `img/` ‚Äî Logos y assets

## ‚ú® Caracter√≠sticas

- Ìºê **Biling√ºe**: Espa√±ol ‚Üî Ingl√©s con selector
- Ìæ® **Temas**: Claro/Oscuro con persistencia
- Ì≥± **Responsive**: Dise√±o m√≥vil-primero
- Ì∂ºÔ∏è **Logos din√°micos**: Cambian con el tema
- ÌæØ **GitHub-inspired**: Dise√±o limpio y profesional

## Ì¥ß Configuraci√≥n

### Servidor local
```bash
python -m http.server 8000 --bind 127.0.0.1
```

### Verificaciones
- ‚úÖ Selector de idioma funciona
- ‚úÖ Cambio de tema persiste
- ‚úÖ Logos y favicon se actualizan
- ‚úÖ Sin errores en consola

## Ìª†Ô∏è Personalizaci√≥n

### Traducciones
Edita `js/translations.js` para a√±adir/modificar textos:
```javascript
es: {
  hero: {
    greeting: "Tu texto aqu√≠"
  }
}
```

### Logos
Reemplaza archivos en `img/`:
- `logo-light.png` - Tema claro
- `logo-dark.png` - Tema oscuro  
- `favicon.ico` - Icono del sitio

## Ì≥ã TODO

- [ ] Limpiar archivos JS duplicados
- [ ] Normalizar claves localStorage
- [ ] Generar favicons multi-resoluci√≥n

---

**Creado con ‚ù§Ô∏è | Portfolio de Laura Carvajal**
