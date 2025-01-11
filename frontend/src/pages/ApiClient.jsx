import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Base URL of your Django REST API
  headers: {
    'Content-Type': 'application/json',  // Default content type
  },
});

// Optionally, you can include a token here for authorization
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // Replace with your token storage method
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to request header
  }
  return config;
});

export default apiClient;
