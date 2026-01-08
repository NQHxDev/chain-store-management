import HeaderGate from '@/components/header/HeaderGate';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <HeaderGate />
         {children}
      </>
   );
}
