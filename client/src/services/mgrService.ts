import axiosClient from '@/lib/axios';

export const MgrService = {
   getListUser: (params: {
      lastUserId?: string | number;
      limit: number;
      search?: string;
      status?: string;
      role?: string;
   }) => axiosClient.get('/mgr/get-list-users', { params }),
};
