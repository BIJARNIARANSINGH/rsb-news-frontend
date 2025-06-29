import axios from 'axios';

const API = import.meta.env.VITE_API;

const axiosInstance = axios.create({
  baseURL: API,
});

// Optional: Interceptors for adding token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

