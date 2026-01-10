import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const axiosClient = axios.create({
   baseURL: '/api',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosClient.interceptors.request.use(
   (config) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (accessToken && config.headers) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axiosClient;
