import axiosClient from '@/lib/axios';

export const AuthService = {
   register: (data: {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
   }) => axiosClient.post('/auth/register', data),

   login: (data: { identifier: string; password: string }) => axiosClient.post('/auth/login', data),

   logout: () => axiosClient.post('/auth/logout'),

   refresh: () => axiosClient.post('/auth/refresh-token'),
};
