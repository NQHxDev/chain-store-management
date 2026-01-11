import { DashboardUser } from '@/lib/account/Account';
import { getUsers } from '@/lib/account/api/getListUser';
import { useState, useEffect } from 'react';

interface UseUsersProps {
   page: number;
   limit: number;
   search?: string;
   status?: string;
   role?: string;
}

export function useUsers({ page, limit, search, status, role }: UseUsersProps) {
   const [users, setUsers] = useState<DashboardUser[]>([]);
   const [totalPages, setTotalPages] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchUsers = async () => {
         setIsLoading(true);
         setError(null);

         try {
            const data = await getUsers({
               page,
               limit,
               search,
               status: status !== 'all' ? status : undefined,
               role: role !== 'all' ? role : undefined,
            });

            setUsers(data.users);
            setTotalPages(data.totalPages);
         } catch (err) {
            setError('Không thể tải danh sách người dùng');
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      };

      fetchUsers();
   }, [page, limit, search, status, role]);

   return { users, totalPages, isLoading, error };
}
