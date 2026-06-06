import api from './api';

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const uploadNote = async (formData) => {
  // We must send multipart/form-data for file uploads
  const response = await api.post('/notes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};
