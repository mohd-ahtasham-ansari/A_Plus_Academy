import api from './api';

export const adminLogin = async (password) => {
  const response = await api.post('/admin/login', { password });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/admin/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (email, otp, new_password) => {
  const response = await api.post('/admin/reset-password', { email, otp, new_password });
  return response.data;
};
