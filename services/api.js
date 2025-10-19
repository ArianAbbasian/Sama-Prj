// services/api.js
import axios from 'axios';

const BASE_URL = 'https://api.samateb.ir/API';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
      console.log('Token added to request:', token.substring(0, 20) + '...');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log('API Response received');
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.status);
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);


export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    console.log('Token saved to localStorage');
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
  }
};

export default api;