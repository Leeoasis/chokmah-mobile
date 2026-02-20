// Navigation route names
export const ROUTES = {
  // Auth routes
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Parent routes
  PARENT_DASHBOARD: 'ParentDashboard',
  PARENT_REPORTS: 'ParentReports',
  PARENT_RESOURCES: 'ParentResources',
  PARENT_CALENDAR: 'ParentCalendar',
  PARENT_PROFILE: 'ParentProfile',
  
  // Teacher routes
  TEACHER_DASHBOARD: 'TeacherDashboard',
  TEACHER_STUDENTS: 'TeacherStudents',
  TEACHER_INVITATIONS: 'TeacherInvitations',
  TEACHER_PROFILE: 'TeacherProfile',
  
  // Admin routes
  ADMIN_DASHBOARD: 'AdminDashboard',
  ADMIN_UPLOAD_RESOURCE: 'AdminUploadResource',
  ADMIN_UPLOAD_REPORT: 'AdminUploadReport',
  ADMIN_USERS: 'AdminUsers',
  ADMIN_PROFILE: 'AdminProfile',
  
  // Shared routes
  NOTIFICATIONS: 'Notifications',
};

export const USER_ROLES = {
  PARENT: 'parent',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export default { ROUTES, USER_ROLES };
