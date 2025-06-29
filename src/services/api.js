import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://rsb-news-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token set karna automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = Bearer ${token};
  }
  return config;
});

export default instance;