import { DashboardUser } from '@/lib/account/Account';
import { getUsers } from '@/lib/account/api/getListUser';
import { useState, useEffect, useCallback } from 'react';

interface UseUsersProps {
   limit: number;
   search?: string;
   status?: string;
   role?: string;
}

export function useUsers({ limit, search, status, role }: UseUsersProps) {
   const [users, setUsers] = useState<DashboardUser[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [hasNextPage, setHasNextPage] = useState(false);

   const [page, setPage] = useState(1);
   const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([undefined]);

   const fetchUsers = useCallback(
      async (pageIndex: number, cursor: string | undefined) => {
         setIsLoading(true);
         setError(null);

         try {
            const data = await getUsers({
               limit,
               lastUserId: cursor,
               search,
               status: status !== 'all' ? status : undefined,
               role: role !== 'all' ? role : undefined,
            });

            setUsers(data.users);
            setHasNextPage(data.users.length === limit);

            if (data.users.length > 0) {
               const nextCursor = data.users[data.users.length - 1].ac_id;

               setCursorStack((prev) => {
                  if (prev[pageIndex]) return prev;
                  const next = [...prev];
                  next[pageIndex] = nextCursor;
                  return next;
               });
            }
         } catch {
            setError('Không thể tải danh sách người dùng');
         } finally {
            setIsLoading(false);
         }
      },
      [limit, search, status, role]
   );

   useEffect(() => {
      setPage(1);
      setCursorStack([undefined]);
      fetchUsers(1, undefined);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [search, status, role]);

   const nextPage = () => {
      if (!hasNextPage) return;

      const next = page + 1;
      const cursor = cursorStack[page];

      setPage(next);
      fetchUsers(next, cursor);
   };

   const prevPage = () => {
      if (page === 1) return;

      const prev = page - 1;
      const cursor = cursorStack[prev - 1];

      setPage(prev);
      fetchUsers(prev, cursor);
   };

   return {
      users,
      isLoading,
      error,
      page,
      hasNextPage,
      nextPage,
      prevPage,
   };
}
