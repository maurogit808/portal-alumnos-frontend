// src/services/api.js
import axios from 'axios';

// Si en el futuro usás variables de entorno con .env, toma esa URL. Si no, usa localhost por defecto.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Este interceptor viaja en CADA petición que le hagas al backend
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Le inyecta el token automáticamente a las rutas protegidas
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;