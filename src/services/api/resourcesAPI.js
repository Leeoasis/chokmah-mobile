import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';

// Get all resources
export const getResources = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.RESOURCES);
  return response.data;
};

// Get single resource
export const getResource = async (id) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.RESOURCES}/${id}`);
  return response.data;
};

// Upload resource
export const uploadResource = async (formData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.RESOURCES_UPLOAD, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Download resource
export const downloadResource = async (id) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.RESOURCES_DOWNLOAD.replace(':id', id),
    { responseType: 'blob' }
  );
  return response.data;
};

// Delete resource
export const deleteResource = async (id) => {
  const response = await axiosInstance.delete(`${API_ENDPOINTS.RESOURCES}/${id}`);
  return response.data;
};
