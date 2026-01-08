import HeaderGate from '@/components/header/HeaderGate';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <HeaderGate />
         {children}
      </>
   );
}
