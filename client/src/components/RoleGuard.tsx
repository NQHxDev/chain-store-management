'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { hasAnyRole } from '@/lib/account/Role';
import { toast } from 'sonner';

type Props = {
   allowedRoles: string[];
   children: React.ReactNode;
};

export default function RoleGuard({ allowedRoles, children }: Props) {
   const router = useRouter();
   const { user, hydrated } = useAuthStore();

   useEffect(() => {
      if (!hydrated) return;

      if (!user || !hasAnyRole(user.roles, allowedRoles)) {
         toast.error('Bạn không có quyền truy cập!', { duration: 1500 });
         router.replace('/');
      }
   }, [user, hydrated, allowedRoles, router]);

   if (!hydrated) return null;

   if (!user || !hasAnyRole(user.roles, allowedRoles)) {
      return null;
   }

   return <>{children}</>;
}
