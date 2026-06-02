import api from './api';

export const adminLogin = async (password) => {
  try {
    const response = await api.post('/admin/login', { password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
