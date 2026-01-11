export interface Account {
   ac_id: string;
   username: string;
   email: string;
   roles: { role_id: number }[];
   status?: string | 'pending';

   created_at?: Date | null;
}

export interface DashboardUser {
   ac_id: string;
   username: string;
   fullname: string;
   email: string;
   phone: string;
   avatar?: string;
   role: 'admin' | 'user' | 'moderator';
   status: 'active' | 'inactive' | 'pending';

   created_at: string;
}
