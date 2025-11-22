/**
 * Mobile Optimization Utilities
 * Provides functions to optimize performance and responsiveness on mobile devices
 */

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Check if device is tablet
 */
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is desktop
 */
export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

/**
 * Get optimized image size based on device
 */
export const getOptimizedImageSize = (baseSize = 800) => {
  if (isMobile()) return Math.min(baseSize, 400);
  if (isTablet()) return Math.min(baseSize, 600);
  return baseSize;
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImage = (imgElement, src) => {
  if (!imgElement || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = src;
          img.classList.remove('opacity-0');
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );

  observer.observe(imgElement);
  return () => observer.disconnect();
};

/**
 * Optimize touch events for mobile
 */
export const optimizeTouchEvents = (element) => {
  if (!element || !isMobile()) return;

  // Add touch-action CSS property
  element.style.touchAction = 'manipulation';
  
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  element.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

/**
 * Reduce motion for users who prefer it
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get connection speed (if available)
 */
export const getConnectionSpeed = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'unknown';
  }
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return 'unknown';
  
  // Effective connection type: 'slow-2g', '2g', '3g', '4g'
  return connection.effectiveType || 'unknown';
};

/**
 * Should use low quality images based on connection
 */
export const shouldUseLowQualityImages = () => {
  const speed = getConnectionSpeed();
  return speed === 'slow-2g' || speed === '2g' || speed === 'unknown';
};

