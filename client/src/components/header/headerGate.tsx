'use client';

import Header from './header';
import { useAuthStore } from '@/stores/authStore';
import HeaderSkeleton from '@/components/header/headerSkeleton';

export default function HeaderGate() {
   const hydrated = useAuthStore((s) => s.hydrated);

   if (!hydrated) {
      return <HeaderSkeleton />;
   }

   return <Header />;
}
