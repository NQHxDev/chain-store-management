'use client';

import { useSyncExternalStore } from 'react';
import AuthBootstrap from '@/components/auth/AuthBootstrap';
import HeaderGate from '@/components/header/headerGate';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Providers({ children }: { children: React.ReactNode }) {
   const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
   if (isClient) {
      document.body.classList.add('loaded');
   }

   if (!isClient) {
      return (
         <div className="min-h-screen">
            <div className="h-20 bg-white border-b"></div>
            {children}
         </div>
      );
   }

   return (
      <>
         <AuthBootstrap />
         <HeaderGate />
         {children}
      </>
   );
}
