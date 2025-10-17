import baseUrl from '@/config/baseUrl';
import { store } from '@/lib/store';
import axios from 'axios';
import { logout } from '../features/auth/authSlice';

const API_BASE_URL = baseUrl || 'https://api.bitechx.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token dynamically
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Logout on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) store.dispatch(logout());
    return Promise.reject(error);
  }
);

export default apiClient;
