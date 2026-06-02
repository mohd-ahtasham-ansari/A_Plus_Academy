import api from './api';

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export const addStat = async (statData) => {
  const response = await api.post('/stats', statData);
  return response.data;
};

export const deleteStat = async (id) => {
  const response = await api.delete(`/stats/${id}`);
  return response.data;
};
