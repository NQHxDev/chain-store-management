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
   const { account, hydrated } = useAuthStore();

   useEffect(() => {
      if (!hydrated) return;

      if (!account || !hasAnyRole(account.roles, allowedRoles)) {
         toast.error('Bạn không có quyền truy cập!', { duration: 1500 });
         router.replace('/');
      }
   }, [account, hydrated, allowedRoles, router]);

   if (!hydrated) return null;

   if (!account || !hasAnyRole(account.roles, allowedRoles)) {
      return null;
   }

   return <>{children}</>;
}
