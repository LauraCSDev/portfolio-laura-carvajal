# Portfolio JavaScript Architecture

## 📁 Estructura del Proyecto

```
js/
├── config.js                 # Configuración central
├── translations.js           # Sistema de internacionalización
├── main.js                   # Archivo principal de inicialización
└── modules/
    ├── navigation.js         # Gestión de navegación
    ├── theme.js              # Sistema de temas
    ├── language.js           # Gestión de idiomas
    ├── animations.js         # Animaciones y efectos
    ├── notifications.js      # Sistema de notificaciones
    └── forms.js              # Gestión de formularios
```

## 🏗️ Arquitectura Modular

### Principios de Diseño

1. **Separación de Responsabilidades**: Cada módulo tiene una única responsabilidad específica
2. **Encapsulación**: Cada clase maneja su propio estado interno
3. **Comunicación Controlada**: Los módulos se comunican a través de interfaces definidas
4. **Configuración Centralizada**: Todas las configuraciones están en `config.js`

### Módulos Principales

#### 🧭 NavigationManager (`navigation.js`)
- **Responsabilidad**: Navegación móvil, scroll suave, enlaces activos, background del navbar
- **Características**:
  - Menú hamburguesa responsive
  - Scroll suave entre secciones
  - Resaltado de enlaces según posición de scroll
  - Cambio de background del navbar con scroll y tema

#### 🎨 ThemeManager (`theme.js`)
- **Responsabilidad**: Cambio entre tema claro/oscuro
- **Características**:
  - Persistencia en localStorage
  - Actualización de logos según tema
  - Coordinación con NavigationManager
  - Tooltips multiidioma

#### 🌐 LanguageManager (`language.js`)
- **Responsabilidad**: Gestión del sistema de idiomas
- **Características**:
  - Integración con sistema i18n
  - Dropdown de selección de idioma
  - Persistencia de preferencias
  - Actualización automática de tooltips

#### ✨ AnimationsManager (`animations.js`)
- **Responsabilidad**: Animaciones de la página
- **Características**:
  - Animación de barras de habilidades con Intersection Observer
  - Efecto de loading al cargar la página
  - API para trigger manual de animaciones

#### 🔔 NotificationsManager (`notifications.js`)
- **Responsabilidad**: Sistema de notificaciones toast
- **Características**:
  - Notificaciones tipo success, error, info
  - Auto-dismiss y cierre manual
  - Posicionamiento responsive
  - Estilos dinámicos inyectados

#### 📝 FormsManager (`forms.js`)
- **Responsabilidad**: Validación y envío de formularios
- **Características**:
  - Validación de campos requeridos
  - Validación de formato de email
  - Mensajes de error multiidioma
  - Integración con NotificationsManager

#### 🎛️ PortfolioApp (`main.js`)
- **Responsabilidad**: Inicialización y coordinación de módulos
- **Características**:
  - Inicialización ordenada de módulos
  - Establecimiento de conexiones inter-módulos
  - Manejo de errores centralizados
  - API pública para acceso a módulos

## 🔧 Configuración (`config.js`)

Centraliza todas las configuraciones del proyecto:

```javascript
PortfolioConfig = {
  theme: { ... },        // Configuración de temas
  language: { ... },     // Configuración de idiomas
  animations: { ... },   // Configuración de animaciones
  notifications: { ... }, // Configuración de notificaciones
  form: { ... },         // Configuración de formularios
  navigation: { ... },   // Configuración de navegación
  debug: { ... }         // Configuración de debug
}
```

## 🚀 Inicialización

1. Se cargan todos los módulos en orden
2. `PortfolioApp` inicializa cada módulo individualmente
3. Se establecen las conexiones entre módulos
4. Se registran los event listeners
5. Se muestra confirmación en console

## 🔗 Comunicación entre Módulos

### Patrón de Referencias
Los módulos se comunican mediante referencias pasadas durante la inicialización:

```javascript
// Ejemplo: ThemeManager necesita notificar a NavigationManager
themeManager.setNavigationManager(navigationManager);
```

### Casos de Uso
- **ThemeManager ↔ NavigationManager**: Actualizar background del navbar al cambiar tema
- **LanguageManager ↔ ThemeManager**: Actualizar tooltips al cambiar idioma
- **FormsManager ↔ NotificationsManager**: Mostrar mensajes de validación

## 📦 Carga de Archivos

Los archivos se cargan en este orden en `index.html`:

```html
<script src="js/translations.js"></script>      <!-- Sistema i18n base -->
<script src="js/modules/notifications.js"></script>
<script src="js/modules/navigation.js"></script>
<script src="js/modules/theme.js"></script>
<script src="js/modules/language.js"></script>
<script src="js/modules/animations.js"></script>
<script src="js/modules/forms.js"></script>
<script src="js/main.js"></script>              <!-- Inicializador principal -->
```

## 🛠️ Mantenimiento

### Agregar Nuevas Funcionalidades
1. Crear nuevo módulo en `js/modules/`
2. Implementar patrón de clase con métodos `init()` y `destroy()`
3. Agregar inicialización en `main.js`
4. Actualizar configuración si es necesario

### Debugging
- Todos los módulos loggean su inicialización
- `window.portfolioApp` disponible para debugging
- Acceso a todos los managers desde la app principal

### Testing
Cada módulo es independiente y puede ser testeado individualmente:

```javascript
// Ejemplo de test
const notificationManager = new NotificationsManager();
notificationManager.success('Test message');
```

## 🔍 Beneficios de esta Arquitectura

1. **Mantenibilidad**: Código organizado por responsabilidades
2. **Escalabilidad**: Fácil agregar nuevos módulos
3. **Testabilidad**: Cada módulo es independiente
4. **Debugging**: Mejor trazabilidad de errores
5. **Reutilización**: Módulos reutilizables
6. **Performance**: Carga selectiva de funcionalidades
7. **Legibilidad**: Código más claro y documentado