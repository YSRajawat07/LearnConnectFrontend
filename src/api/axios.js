import axios from 'axios';

const BASE_URL = 'https://learnconnectbackend.onrender.com/api/'; // ✅ adjust to your backend

export const API = axios.create({
//   baseURL: 'http://localhost:8000/api', // ✅ adjust to your backend
    baseURL: BASE_URL,
});

export const apiAuth = axios.create({
//   baseURL: 'http://localhost:8000/api',
    baseURL: BASE_URL,
});

// Add Authorization header to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;