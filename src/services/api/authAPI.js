import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';

// Login
export const login = async (email, password) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    user: { email, password },
  });
  return response.data;
};

// Register
export const register = async (userData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
    user: userData,
  });
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axiosInstance.delete(API_ENDPOINTS.LOGOUT);
  return response.data;
};

// Get teacher by invitation token
export const getTeacherByToken = async (token) => {
  const response = await axiosInstance.get(
    `${API_ENDPOINTS.TEACHER_BY_TOKEN}/${token}`
  );
  return response.data;
};

// Get user profile
export const getProfile = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.PROFILE);
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await axiosInstance.put(API_ENDPOINTS.PROFILE, {
    user: userData,
  });
  return response.data;
};
