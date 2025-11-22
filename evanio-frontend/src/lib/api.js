import axios from 'axios';

// Get API URL from environment variable - REQUIRED
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Log API URL on startup (only in development)
if (import.meta.env.DEV) {
  console.log('API URL:', VITE_API_URL);
  console.log('Environment:', import.meta.env.MODE);
}

// Validate API URL is set
if (!VITE_API_URL) {
  if (import.meta.env.DEV) {
    console.error('⚠️ VITE_API_URL is not set! Please set it in your environment variables.');
    console.error('For Vercel: Set VITE_API_URL in Settings → Environment Variables');
    console.error('For local: Create .env file with VITE_API_URL=https://evanio.up.railway.app/api');
  }
}

// Create centralized Axios instance
// Use VITE_API_URL directly - it should already include /api
const API = axios.create({
  baseURL: VITE_API_URL || 'https://evanio.up.railway.app/api', // Fallback only for development
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for file uploads
});

// Add token to requests automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData (let browser set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.baseURL + config.url);
    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Handle response errors
API.interceptors.response.use(
        (response) => {
          if (import.meta.env.DEV) {
            console.log('API Response Success:', response.status, response.config.url);
          }
          return response;
        },
  async (error) => {
    if (import.meta.env.DEV) {
      console.error('API Response Error:', {
        url: error.config?.url,
        fullURL: error.config?.baseURL + error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        code: error.code,
        responseData: error.response?.data
      });
    }

    // Handle network errors specifically
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      if (import.meta.env.DEV) {
        console.error('Network Error - Server may not be running or CORS issue');
      }
      const errorMessage = import.meta.env.DEV 
        ? 'Cannot connect to server. Please make sure the server is running.'
        : 'Unable to connect to the server. Please try again later.';
      return Promise.reject(new Error(errorMessage));
    }

    // Handle 401 - try to refresh token, then redirect to login if fails
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/auth/login') || 
                          error.config?.url?.includes('/auth/register') ||
                          error.config?.url?.includes('/auth/refresh');
      const isLoginPage = window.location.pathname === '/login' || 
                         window.location.pathname === '/register';
      
      if (!isAuthRoute && !isLoginPage && error.config && !error.config._retry) {
        error.config._retry = true;
        
        // Try to refresh token using the same API instance
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await API.post('/auth/refresh', { refreshToken });
            if (refreshResponse.data.token) {
              localStorage.setItem('token', refreshResponse.data.token);
              if (refreshResponse.data.refreshToken) {
                localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
              }
              // Retry original request
              error.config.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
              return API.request(error.config);
            }
                 } catch (refreshError) {
                   if (import.meta.env.DEV) {
                     console.error('Token refresh failed:', refreshError);
                   }
                 }
        }
        
        // If refresh fails or no refresh token, logout and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
