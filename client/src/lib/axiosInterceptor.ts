import axiosClient from './axios';
import { useAuthStore } from '@/stores/authStore';

interface PendingRequest {
   resolve: (token: string | null) => void;
   reject: (error: unknown) => void;
}

let isRefreshing = false;
let queue: PendingRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
   queue.forEach((p) => {
      if (error) p.reject(error);
      else p.resolve(token);
   });
   queue = [];
};

// Request: gắn accessToken
axiosClient.interceptors.request.use((config) => {
   const token = useAuthStore.getState().accessToken;
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

// Response: refresh khi 401
axiosClient.interceptors.response.use(
   (res) => res,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         if (isRefreshing) {
            return new Promise((resolve, reject) => {
               queue.push({ resolve, reject });
            }).then((token) => {
               originalRequest.headers.Authorization = `Bearer ${token}`;
               return axiosClient(originalRequest);
            });
         }

         originalRequest._retry = true;
         isRefreshing = true;

         try {
            const res = await axiosClient.post('/auth/refresh-token');
            const { accessToken, account } = res.data.data;

            useAuthStore.getState().setAuth(account, accessToken);

            processQueue(null, accessToken);
            return axiosClient(originalRequest);
         } catch (err) {
            processQueue(err, null);
            useAuthStore.getState().clearAuth();
            window.location.href = '/login';
            return Promise.reject(err);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   }
);
