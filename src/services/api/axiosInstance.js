import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';
import { getToken, clearStorage } from '../../utils/storage';
import { logRequest, logResponse, logError } from '../../utils/apiDebugger';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token and log requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const startTime = Date.now();
    config.metadata = { startTime };
    
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log the request
    logRequest(
      config.method,
      `${config.baseURL}${config.url}`,
      config.data,
      config.headers
    );
    
    return config;
  },
  (error) => {
    logError('REQUEST', error.config?.url || 'unknown', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and log responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response
    const duration = response.config.metadata?.startTime 
      ? Date.now() - response.config.metadata.startTime 
      : null;
    
    logResponse(
      response.config.method,
      `${response.config.baseURL}${response.config.url}`,
      response.status,
      response.data,
      duration
    );
    
    return response;
  },
  async (error) => {
    // Log the error
    logError(
      error.config?.method || 'unknown',
      error.config?.url || 'unknown',
      error
    );
    
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        console.log('🔴 401 Unauthorized - Clearing storage and logging out');
        // Clear storage and redirect to login
        await clearStorage();
        // Note: Navigation will be handled by the app
      }
      
      // Handle other errors
      const errorMessage = error.response.data?.message || error.response.data?.error || 'An error occurred';
      console.log('🔴 API Error Message:', errorMessage);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Network error
      console.log('🔴 Network Error: No response received');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      console.log('🔴 Unknown Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
