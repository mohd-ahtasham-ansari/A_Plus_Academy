import api from './api';

export const submitContactQuery = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};
