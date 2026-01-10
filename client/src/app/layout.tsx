import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import Providers from '@/app/providers';

const beVietnamPro = Be_Vietnam_Pro({
   subsets: ['latin', 'vietnamese'],
   weight: ['400', '500', '700'],
   display: 'swap',
   variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
   title: 'ZeionStore',
   description: 'Nơi bạn có thể tìm thấy mọi thứ bạn cần!',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const headersList = await headers();
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const nonce = headersList.get('x-nonce');

   return (
      <html lang="en" className={beVietnamPro.variable}>
         <body className="antialiased">
            <Providers>{children}</Providers>
            <Toaster richColors position="bottom-right" />
         </body>
      </html>
   );
}
