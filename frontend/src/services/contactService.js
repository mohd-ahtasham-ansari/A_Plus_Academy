import api from './api';

export const submitContactQuery = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
