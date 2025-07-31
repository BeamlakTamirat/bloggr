import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bloggr-api-baml.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

export default api;