'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function OAuthCallbackPage() {
   const router = useRouter();
   const params = useSearchParams();
   const accessToken = params.get('accessToken');

   const setAccessToken = useAuthStore((s) => s.setAccessToken);

   useEffect(() => {
      if (!accessToken) return;
      setAccessToken(accessToken);
      router.replace('/');
   }, [accessToken, router, setAccessToken]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <p className="animate-pulse text-gray-500">Đang xử lý đăng nhập...</p>
      </div>
   );
}
