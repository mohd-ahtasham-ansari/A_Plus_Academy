import api from './api';

export const enrollStudent = async (enrollmentData) => {
  try {
    const response = await api.post('/enroll', enrollmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
