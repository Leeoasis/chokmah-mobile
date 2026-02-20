import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../../constants/api';

// Get all reports
export const getReports = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.REPORTS);
  return response.data;
};

// Get single report
export const getReport = async (id) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.REPORTS}/${id}`);
  return response.data;
};

// Upload report
export const uploadReport = async (formData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REPORTS_UPLOAD, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Download report
export const downloadReport = async (id) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.REPORTS_DOWNLOAD.replace(':id', id),
    { responseType: 'blob' }
  );
  return response.data;
};

// Delete report
export const deleteReport = async (id) => {
  const response = await axiosInstance.delete(`${API_ENDPOINTS.REPORTS}/${id}`);
  return response.data;
};
