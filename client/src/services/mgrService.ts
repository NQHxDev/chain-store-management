import axiosClient from '@/lib/axios';

export const MgrService = {
   getListUser: (data: { lastUserId: string | number; status: string }) =>
      axiosClient.get('/mgr/get-list-users', { params: data }),
};
