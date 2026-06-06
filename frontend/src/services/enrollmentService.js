import api from './api';

export const enrollStudent = async (enrollmentData) => {
  const response = await api.post('/enroll', enrollmentData);
  return response.data;
};
