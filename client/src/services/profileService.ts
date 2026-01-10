import axiosClient from '@/lib/axios';

export const ProfileService = {
   getMe: () => axiosClient.get('/auth/profile/me'),
};
