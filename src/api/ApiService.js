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

// Endpoints de métricas

/**
 * GET /productivity
 * Devuelve todas las filas de la tabla productivity como list[ProductivityOut]
 */
export async function getProductivity() {
  const response = await ApiService.get('/data/productivity');
  return response.data;
}

/**
 * GET /sales
 * Devuelve todas las filas de la tabla sales como list[SaleOut]
 */
export async function getSales() {
  const response = await ApiService.get('/data/sales');
  return response.data;
}

/**
 * GET /reports
 * Devuelve todas las filas de la tabla reports como list[ReportOut]
 */
export async function getReports() {
  const response = await ApiService.get('/data/reports');
  return response.data;
}
/**
 * GET /users
 * Listar usuarios con roles => list[UserOut]
 */
export async function getUsers() {
  const response = await ApiService.get('/users');
  return response.data;
}

export async function createUser({ email, password, name }) {
  const payload = { email, password, name, roles: [1] };
  const response = await ApiService.post('/users/crear-usuarios', payload);
  return response.data;
}



export default ApiService;
