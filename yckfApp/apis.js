import axios from 'axios';
import { toast } from 'react-toastify';

// Set base URL for all API requests
axios.defaults.baseURL = 'http://localhost:5000';

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axios.interceptors.response.use(
  (response) => {
    // Show success message if included in response
    if (response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    // Handle errors
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axios;