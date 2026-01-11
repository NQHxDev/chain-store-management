import { DashboardUser } from '@/lib/account/Account';

const MOCK_USERS = [
   {
      ac_id: '1',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '2',
      username: 'user_002',
      fullname: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0923456789',
      avatar: '',
      role: 'admin',
      status: 'pending',

      created_at: '2024-01-20T14:45:00Z',
   },
   {
      ac_id: '3',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '4',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '5',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '6',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '7',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '8',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '9',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '10',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
   {
      ac_id: '11',
      username: 'user_001',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      avatar: '',
      role: 'admin',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
   },
];

interface GetUsersParams {
   page: number;
   limit: number;
   search?: string;
   status?: string;
   role?: string;
}

export async function getUsers({ page, limit, search, status, role }: GetUsersParams): Promise<{
   users: DashboardUser[];
}> {
   await new Promise((resolve) => setTimeout(resolve, 500));

   let filteredUsers = [...MOCK_USERS];

   if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
         (user) =>
            user.username.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.phone.includes(search)
      );
   }

   if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
   }

   if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
   }

   const startIndex = (page - 1) * limit;
   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

   return {
      users: paginatedUsers.map((user) => ({
         ac_id: user.ac_id,
         username: user.username,
         fullname: user.fullname,
         email: user.email,
         phone: user.phone,
         avatar: user.avatar,
         role: user.role as 'admin' | 'user' | 'moderator',
         status: user.status as 'active' | 'inactive' | 'pending',
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
