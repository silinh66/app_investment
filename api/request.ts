import axios, { AxiosRequestConfig } from 'axios';
import { getDataStorage, STORAGE_KEY } from '../utils/storage';

// Base API configuration - updated to match the actual API
const API_BASE_URL = 'https://api.dautubenvung.vn'; // Updated URL

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
  async (config) => {
    
    // Get the token from storage
    const token = await getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // You might want to redirect to login or clear auth state here
      console.log('Unauthorized access - token may be invalid');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;