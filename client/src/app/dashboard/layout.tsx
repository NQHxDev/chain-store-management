import HeaderGate from '@/components/header/HeaderGate';
import RoleGuard from '@/components/RoleGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <RoleGuard allowedRoles={['admin', 'manager']}>
         <HeaderGate />
         {children}
      </RoleGuard>
   );
}
