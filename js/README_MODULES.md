# Portfolio - Arquitectura Modular

## 📁 Estructura de Archivos

```
js/
├── data.json           # Datos unificados bilingües
├── i18n.js            # Sistema de internacionalización
├── app.js             # Coordinador principal de la aplicación
├── modules/           # Módulos especializados
│   ├── navigation.js  # Navegación móvil y scroll suave
│   ├── theme.js       # Manejo de temas claro/oscuro
│   ├── animations.js  # Animaciones y efectos visuales
│   └── forms.js       # Formularios y notificaciones
└── script.js          # Archivo legacy (puede eliminarse)
```

## 🏗️ Arquitectura

### 1. **Sistema i18n** (`i18n.js`)
- Clase `PortfolioI18n` para manejo de traducciones
- Carga datos desde `data.json`
- Genera contenido dinámicamente
- Cambio de idioma sin recarga de página

### 2. **Módulos Especializados**

#### **NavigationModule** (`modules/navigation.js`)
- Navegación móvil con menú hamburguesa
- Scroll suave entre secciones
- Actualización automática de enlaces activos
- API para navegación programática

#### **ThemeModule** (`modules/theme.js`)
- Alternancia entre tema claro y oscuro
- Persistencia en localStorage
- Actualización automática de logos
- Detección de preferencias del sistema
- Eventos personalizados para cambios de tema

#### **AnimationsModule** (`modules/animations.js`)
- Intersection Observer para animaciones de scroll
- Animación de contadores numéricos
- Barras de progreso animadas
- Efectos de entrada escalonados
- Animaciones de carga de página

#### **FormsModule** (`modules/forms.js`)
- Validación en tiempo real
- Sistema de notificaciones avanzado
- Manejo de estados de carga
- Mensajes de error contextuales
- API para diferentes tipos de notificaciones

### 3. **Coordinador Principal** (`app.js`)
- Clase `PortfolioApp` que orquesta todos los módulos
- Inicialización automática en orden correcto
- Manejo centralizado de eventos
- API global de utilidades
- Gestión robusta de errores

## 🚀 Inicialización

### Orden de Carga
1. **i18n.js** - Sistema de traducciones (requerido por otros módulos)
2. **Módulos** - Cada módulo se auto-registra como clase global
3. **app.js** - Coordinador que inicializa todo automáticamente

### Flujo de Inicialización
```javascript
document.addEventListener('DOMContentLoaded', async () => {
  const app = new PortfolioApp();
  await app.init();
  // 1. Inicializa sistema i18n
  // 2. Instancia y configura cada módulo
  // 3. Configura eventos globales
  // 4. Expone API global
});
```

## 🔧 API Global

### Acceso a Funcionalidades
```javascript
// Cambio de idioma
portfolioUtils.changeLanguage('en');

// Cambio de tema
portfolioUtils.toggleTheme();

// Navegación
portfolioUtils.goToSection('contacto');

// Notificaciones
portfolioUtils.showNotification('Mensaje', 'success');

// Animaciones
portfolioUtils.animateElement('#elemento', 'fade-in-up');

// Estado de la aplicación
const state = portfolioUtils.getAppState();
```

### Acceso a Módulos Específicos
```javascript
// Obtener módulo específico
const themeModule = portfolioApp.getModule('theme');
themeModule.setTheme('dark');

// Verificar disponibilidad
if (portfolioApp.hasModule('animations')) {
  // Usar funcionalidad de animaciones
}
```

## 📱 Eventos Personalizados

### Escuchar Cambios
```javascript
// Cambio de idioma
document.addEventListener('languageChanged', (event) => {
  console.log('Nuevo idioma:', event.detail.language);
});

// Cambio de tema
document.addEventListener('themeChanged', (event) => {
  console.log('Nuevo tema:', event.detail.theme);
});
```

## 🛡️ Manejo de Errores

- **Errores de inicialización**: Pantalla de error con opción de recarga
- **Errores en tiempo de ejecución**: Captura global y notificación al usuario
- **Promesas rechazadas**: Captura automática para prevenir errores no manejados
- **Módulos faltantes**: Advertencias en consola sin romper la funcionalidad

## 🧪 Desarrollo y Debug

### Consola del Navegador
```javascript
// Verificar estado de la aplicación
console.log(portfolioUtils.getAppState());

// Acceder a datos
console.log(portfolioUtils.getData());

// Forzar animaciones
portfolioUtils.staggerAnimation('.project-card', 'fade-in-up', 200);
```

### Logs Informativos
- ✅ Inicialización exitosa de cada módulo
- 🌐 Cambios de idioma
- 🎨 Cambios de tema  
- ⚠️ Advertencias por elementos faltantes
- ❌ Errores capturados

## 🔄 Migración desde Sistema Anterior

### Cambios Principales
1. **Eliminado**: `script.js` monolítico
2. **Eliminado**: Carpeta `i18n/` con archivos separados
3. **Eliminado**: Carpeta `modules/` anterior
4. **Nuevo**: Arquitectura modular especializada
5. **Nuevo**: API global unificada
6. **Nuevo**: Manejo robusto de errores

### Compatibilidad
- Las funciones globales principales se mantienen
- `portfolioUtils` reemplaza funcionalidades dispersas
- Los selectores HTML siguen siendo compatibles
- Los datos siguen siendo bilingües en JSON

## 📈 Beneficios de la Nueva Arquitectura

1. **Mantenibilidad**: Código organizado en módulos especializados
2. **Escalabilidad**: Fácil agregar nuevos módulos sin afectar existentes
3. **Testabilidad**: Cada módulo se puede probar independientemente
4. **Performance**: Carga optimizada y inicialización inteligente
5. **Robustez**: Manejo completo de errores y estados edge-case
6. **DX**: Mejor experiencia de desarrollo con APIs claras

## 🔧 Personalización

### Agregar Nuevo Módulo
1. Crear archivo en `js/modules/nuevo-modulo.js`
2. Implementar clase con método `init()`
3. Agregar script al HTML antes de `app.js`
4. Registrar en `PortfolioApp.initModules()`

### Modificar Comportamiento
- Cada módulo expone métodos públicos
- Configuración centralizada en `PortfolioApp`
- Eventos personalizados para comunicación entre módulos