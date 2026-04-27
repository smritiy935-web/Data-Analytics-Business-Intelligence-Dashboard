import axios from "axios";

// Base URL from environment variable
let API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  // Fallback for local development if env is missing
  API_BASE_URL = 'http://localhost:5000/api';
}

// Auto-fix: Ensure the URL ends with /api
if (!API_BASE_URL.endsWith('/api') && !API_BASE_URL.endsWith('/api/')) {
  API_BASE_URL = API_BASE_URL.endsWith('/') 
    ? `${API_BASE_URL}api` 
    : `${API_BASE_URL}/api`;
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // enable cookies if backend uses them
});

// 🔐 Request Interceptor (Attach JWT Token)
api.interceptors.request.use(
  (config) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch (error) {
      console.error("Invalid userInfo in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor (Handle Errors Globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Token expired / invalid
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
      }

      if (status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;