import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/notes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  getAll: () => api.get('/'),
  getById: (id) => api.get(`/${id}`),
  create: (note) => api.post('/', note),
  update: (id, note) => api.put(`/${id}`, note),
  delete: (id) => api.delete(`/${id}`),
};

