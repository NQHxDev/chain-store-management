import MainContentPage from '@/app/main/page';
import Footer from '@/components/footer/footer';
import HeaderGate from '@/components/header/HeaderGate';

export default function Home() {
   return (
      <>
         <HeaderGate />

         <MainContentPage />

         <Footer />
      </>
   );
}
