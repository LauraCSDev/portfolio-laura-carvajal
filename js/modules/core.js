/**
 * Core Module - Configuraciones transversales y optimizaciones
 * Handles global configurations, loading optimizations, and performance enhancements
 */

class CoreModule {
  constructor() {
    this.isPageLoaded = false;
    this.loadingOptimizations = new Set();
  }

  /**
   * Initialize core functionality
   */
  init() {
    console.log("🔧 Inicializando Core Module...");

    // Setup loading optimizations
    this.setupLoadingOptimizations();

    // Setup performance monitoring
    this.setupPerformanceMonitoring();

    // Setup error boundaries
    this.setupErrorBoundaries();

    console.log("✅ Core Module inicializado");
  }

  /**
   * Setup loading optimizations to prevent flickering and improve UX
   */
  setupLoadingOptimizations() {
    // Prevent multiple load events
    window.addEventListener("load", () => {
      if (this.isPageLoaded) return;
      this.isPageLoaded = true;

      // Add loaded class for CSS transitions
      document.body.classList.add("page-loaded");

      // Dispatch custom event for other modules
      document.dispatchEvent(new CustomEvent("portfolioPageLoaded"));

      console.log("🚀 Página completamente cargada");
    });

    // Optimize critical rendering path
    this.optimizeCriticalRendering();
  }

  /**
   * Optimize critical rendering path
   */
  optimizeCriticalRendering() {
    // Preload critical resources
    const criticalResources = [
      { href: "css/main.css", as: "style" },
      { href: "img/logo-dark.png", as: "image" },
      { href: "img/logo-light.png", as: "image" },
    ];

    criticalResources.forEach((resource) => {
      const existingLink = document.querySelector(
        `link[href="${resource.href}"]`
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === "style") {
          link.onload = () => {
            link.rel = "stylesheet";
          };
        }
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor page performance
    window.addEventListener("load", () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        if (loadTime > 0) {
          console.log(`⚡ Tiempo de carga: ${loadTime}ms`);

          // Log performance metrics in development
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            this.logPerformanceMetrics(timing);
          }
        }
      }
    });

    // Monitor memory usage in development
    if (
      "memory" in performance &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
    ) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          console.warn("⚠️ Alto uso de memoria detectado");
        }
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Log detailed performance metrics
   */
  logPerformanceMetrics(timing) {
    const metrics = {
      "DNS Lookup": timing.domainLookupEnd - timing.domainLookupStart,
      "TCP Connection": timing.connectEnd - timing.connectStart,
      Request: timing.responseStart - timing.requestStart,
      Response: timing.responseEnd - timing.responseStart,
      "DOM Processing": timing.domComplete - timing.domLoading,
      "Load Event": timing.loadEventEnd - timing.loadEventStart,
    };

    console.group("📊 Métricas de rendimiento");
    Object.entries(metrics).forEach(([key, value]) => {
      if (value > 0) {
        console.log(`${key}: ${value}ms`);
      }
    });
    console.groupEnd();
  }

  /**
   * Setup error boundaries for better error handling
   */
  setupErrorBoundaries() {
    // Global error handler
    window.addEventListener("error", (event) => {
      console.error("💥 Error global capturado:", event.error);
      this.handleGlobalError(event);
    });

    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("🚫 Promesa rechazada no manejada:", event.reason);
      this.handleUnhandledRejection(event);
    });

    // Resource loading errors
    window.addEventListener(
      "error",
      (event) => {
        if (event.target !== window) {
          console.warn(
            "📦 Error al cargar recurso:",
            event.target.src || event.target.href
          );
        }
      },
      true
    );
  }

  /**
   * Handle global JavaScript errors
   */
  handleGlobalError(event) {
    // In production, you might want to send this to an error reporting service
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
    };

    // For now, just log in development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.group("🔍 Detalles del error");
      console.table(errorInfo);
      console.groupEnd();
    }

    // Prevent the error from breaking the entire application
    event.preventDefault();
  }

  /**
   * Handle unhandled promise rejections
   */
  handleUnhandledRejection(event) {
    // Log the rejection reason
    console.error("Detalles de la promesa rechazada:", event.reason);

    // Prevent the default handling (which would log to console)
    event.preventDefault();

    // In production, you might want to report this
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      // Report to error tracking service
    }
  }

  /**
   * Add loading optimization to track
   */
  addLoadingOptimization(name) {
    this.loadingOptimizations.add(name);
    console.log(`⚙️ Optimización registrada: ${name}`);
  }

  /**
   * Check if page is fully loaded
   */
  isLoaded() {
    return this.isPageLoaded;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    if (!window.performance || !window.performance.timing) {
      return null;
    }

    const timing = window.performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint:
        performance
          .getEntriesByType("paint")
          .find((entry) => entry.name === "first-paint")?.startTime || 0,
      optimizations: Array.from(this.loadingOptimizations),
    };
  }

  /**
   * Cleanup method
   */
  destroy() {
    // Remove event listeners and cleanup
    this.loadingOptimizations.clear();
    console.log("🧹 Core Module limpiado");
  }
}

// Export for use in main app
window.CoreModule = CoreModule;
