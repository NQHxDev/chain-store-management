import HeaderGate from '@/components/header/HeaderGate';

export default function UserPageLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <HeaderGate />
         {children}
      </>
   );
}
