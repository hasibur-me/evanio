// CRITICAL: Import React first and ensure it's available
import React from 'react';
import ReactDOM from 'react-dom/client';

// Log API URL on startup (only in development)
if (import.meta.env.DEV) {
  console.log('API URL:', import.meta.env.VITE_API_URL);
  console.log('Environment:', import.meta.env.MODE);
}

// Verify React is loaded before proceeding
if (!React || typeof React !== 'object') {
  console.error('React is not properly loaded:', React);
  throw new Error('React failed to load. Please check your dependencies.');
}

// Then import React-dependent modules
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import styles first
import './index.css';

// Import application code AFTER React and styles are loaded
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DarkModeProvider } from './context/DarkModeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { initAnalytics } from './utils/analytics';

// Import i18n config LAST, after React is confirmed loaded
import './i18n/config';

// Initialize analytics and attach to window for components that use window.analytics
// Defer completely to avoid any blocking
const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Wait for window load event to ensure everything is ready
  const initWhenReady = () => {
    try {
      window.analytics = initAnalytics();
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  };

  if (window.addEventListener) {
    window.addEventListener('load', initWhenReady, { once: true });
  } else {
    // Fallback for older browsers
    setTimeout(initWhenReady, 100);
  }
};

// Only initialize in browser environment
if (typeof window !== 'undefined') {
  initializeAnalytics();
}

// Ensure DOM is ready before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <DarkModeProvider>
            <AuthProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </AuthProvider>
          </DarkModeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

