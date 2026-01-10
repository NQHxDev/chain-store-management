'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';

export default function Providers({ children }: { children: React.ReactNode }) {
   const hydrate = useAuthStore((s) => s.hydrate);
   const accessToken = useAuthStore((s) => s.accessToken);

   const profile = useProfileStore((s) => s.userProfile);

   useEffect(() => {
      hydrate();
   }, [hydrate]);

   useEffect(() => {
      if (accessToken && !profile) {
         useProfileStore.getState().fetchProfile();
      }
   }, [accessToken, profile]);

   return <>{children}</>;
}
