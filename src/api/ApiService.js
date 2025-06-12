// src/api/ApiService.js
import axios from 'axios';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g. "http://localhost:8000"
  headers: {
    'Content-Type': 'application/json',
  },
});

// Antes de cada petición, adjunta el token si lo hay
ApiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default ApiService;
