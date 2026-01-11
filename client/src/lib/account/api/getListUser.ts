import { DashboardUser } from '@/lib/account/Account';
import { MgrService } from '@/services/mgrService';

interface GetUsersParams {
   limit: number;
   lastUserId?: string | number;
   search?: string;
   status?: string;
   role?: string;
}

export async function getUsers({
   limit = 10,
   lastUserId = '',
   search = '',
   status = 'active',
   role = '',
}: GetUsersParams): Promise<{
   users: DashboardUser[];
}> {
   const res = await MgrService.getListUser({
      lastUserId,
      limit,
      search,
      status,
      role,
   });

   return {
      users: res.data.data.map((user: DashboardUser) => ({
         ac_id: user.ac_id,
         username: user.username,
         fullname: user.fullname,
         email: user.email,
         phone: user.phone,
         avatar: user.avatar,
         role: user.role,
         status: user.status,
         created_at: user.created_at,
      })),
   };
}

export async function deleteUser(userId: string): Promise<void> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500));
   console.log('Deleting user:', userId);
}

export async function updateUser(userId: string, data: string | number | boolean): Promise<void> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500));
   console.log('Updating user:', userId, data);
}
