import { Platform } from 'react-native';

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================
// 
// To switch environments, change the 'currentEnvironment' value below:
//   - 'development': Local backend (localhost:3000)
//   - 'staging': Staging server (if you have one)
//   - 'production': Production backend (render.com)
//
// ============================================

const ENVIRONMENTS = {
  development: {
    name: 'Development',
    // Android emulator can't use 'localhost', must use 10.0.2.2
    // iOS simulator and web can use 'localhost'
    ios: 'http://localhost:3000',
    android: 'http://10.0.2.2:3000',
    web: 'http://localhost:3000',
    default: 'http://localhost:3000',
  },
  staging: {
    name: 'Staging',
    // Add your staging URL here if you have one
    ios: 'https://chokmah-staging.onrender.com',
    android: 'https://chokmah-staging.onrender.com',
    web: 'https://chokmah-staging.onrender.com',
    default: 'https://chokmah-staging.onrender.com',
  },
  production: {
    name: 'Production',
    ios: 'https://chokmah-resources-backend.onrender.com',
    android: 'https://chokmah-resources-backend.onrender.com',
    web: 'https://chokmah-resources-backend.onrender.com',
    default: 'https://chokmah-resources-backend.onrender.com',
  },
};

// ============================================
// CHANGE THIS LINE TO SWITCH ENVIRONMENTS
// ============================================
const currentEnvironment = 'development'; // 'development', 'staging', or 'production'
// ============================================

// Get API URL based on platform
const getApiUrl = () => {
  const env = ENVIRONMENTS[currentEnvironment];
  
  if (!env) {
    console.warn(`Unknown environment: ${currentEnvironment}, using development`);
    return ENVIRONMENTS.development.default;
  }
  
  // Platform-specific URLs
  if (Platform.OS === 'android') {
    return env.android;
  } else if (Platform.OS === 'ios') {
    return env.ios;
  } else if (Platform.OS === 'web') {
    return env.web;
  }
  
  return env.default;
};

// Export the API base URL
export const API_BASE_URL = getApiUrl();

// Log current configuration (helps with debugging)
console.log('===========================================');
console.log('📡 API Configuration');
console.log('===========================================');
console.log(`Environment: ${ENVIRONMENTS[currentEnvironment]?.name || currentEnvironment}`);
console.log(`Platform: ${Platform.OS}`);
console.log(`API URL: ${API_BASE_URL}`);
console.log('===========================================');

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/v1/login',
  REGISTER: '/api/v1/signup',
  LOGOUT: '/api/v1/logout',
  
  // User endpoints
  PROFILE: '/api/v1/users/profile',
  TEACHER_BY_TOKEN: '/api/v1/users/teacher_by_token',
  
  // Reports endpoints
  REPORTS: '/api/v1/reports',
  REPORTS_UPLOAD: '/api/v1/reports',
  REPORTS_DOWNLOAD: '/api/v1/reports/:id/download',
  
  // Resources endpoints
  RESOURCES: '/api/v1/resources',
  RESOURCES_UPLOAD: '/api/v1/resources',
  RESOURCES_DOWNLOAD: '/api/v1/resources/:id/download',
  
  // Homework/Assignments endpoints
  HOMEWORK: '/api/v1/homework',
  
  // Students endpoints
  STUDENTS: '/api/v1/students',
  
  // Invitation endpoints
  INVITATION_CODES: '/api/v1/invitation_codes',
};

// Export configuration helper
export const getEnvironmentInfo = () => ({
  current: currentEnvironment,
  name: ENVIRONMENTS[currentEnvironment]?.name,
  url: API_BASE_URL,
  platform: Platform.OS,
  allEnvironments: Object.keys(ENVIRONMENTS),
});

export default { API_BASE_URL, API_ENDPOINTS, getEnvironmentInfo };
