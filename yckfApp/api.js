import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000",
});

api.interceptors.request.use((config) => {
  const currentPath = window.location.pathname;
  const role = currentPath.startsWith("/admin") ? "admin" : "student";
  const token = role ? localStorage.getItem(`${role}_token`) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
