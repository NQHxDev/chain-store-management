'use client';

import { useAuthStore } from '@/stores/authStore';
import Header from './header';
import HeaderSkeleton from '@/components/header/HeaderSkeleton';

export default function HeaderGate() {
   const hydrated = useAuthStore((s) => s.hydrated);

   if (!hydrated) {
      return <HeaderSkeleton />;
   }

   return <Header />;
}
