'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'sonner';

export default function OAuthCallbackPage() {
   const router = useRouter();
   const params = useSearchParams();

   const accessToken = params.get('accessToken');
   const error = params.get('error');

   const setAccessToken = useAuthStore((s) => s.setAccessToken);

   useEffect(() => {
      if (error) {
         toast.error(decodeURIComponent(error), { duration: 2000 });
         router.replace('/login');
         return;
      }

      if (!accessToken) {
         toast.error('Đăng nhập Google thất bại');
         router.replace('/login');
         return;
      }

      setAccessToken(accessToken);

      useProfileStore
         .getState()
         .fetchProfile()
         .then(() => {
            router.replace('/');
         })
         .catch(() => {
            toast.error('Không thể tải thông tin người dùng!', { duration: 2000 });
            router.replace('/login');
         });
   }, [accessToken, error, router, setAccessToken]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <p className="animate-pulse text-gray-500">Đang xử lý đăng nhập...</p>
      </div>
   );
}
