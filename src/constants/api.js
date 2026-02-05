// API Configuration
export const API_BASE_URL = 'https://chokmah-resources-backend.onrender.com';

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

export default { API_BASE_URL, API_ENDPOINTS };
