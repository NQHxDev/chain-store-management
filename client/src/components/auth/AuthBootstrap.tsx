'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import axiosClient from '@/lib/axios';

export default function AuthBootstrap() {
   const setAuth = useAuthStore((s) => s.setAuth);
   const initialized = useRef(false);

   const setHydrated = useAuthStore((s) => s.setHydrated);

   useEffect(() => {
      if (initialized.current || typeof window === 'undefined') return;
      initialized.current = true;

      const bootstrapAuth = async () => {
         try {
            const hasCookie = document.cookie
               .split(';')
               .some((item) => item.trim().startsWith('isLogged='));

            if (!hasCookie) {
               setHydrated(true);
               return;
            }

            const res = await axiosClient.post('/auth/api/refresh-token');
            const { accessToken, account } = res.data.data;

            setAuth(account, accessToken);
         } catch (error) {
            console.log('[Auth] No active session Found:', error);
         } finally {
            setHydrated(true);
         }
      };

      bootstrapAuth();
   }, [setAuth, setHydrated]);

   return null;
}
