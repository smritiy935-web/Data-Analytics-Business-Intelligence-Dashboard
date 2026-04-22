import axios from 'axios';

const api = axios.create({
  baseURL: 'https://data-analytics-business-intelligence-45kf.onrender.com/api',
});

// Add token to headers and fix URL pathing
api.interceptors.request.use((config) => {
  // Ensure the URL appends correctly to the /api base path
  if (config.url && config.url.startsWith('/')) {
    config.url = config.url.substring(1);
  }

  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
