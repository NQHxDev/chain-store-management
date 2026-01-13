import React from 'react';
import { Metadata } from 'next';
import { HeaderContent } from '@/app/main/headerContent';

export const metadata: Metadata = {
   title: 'Trang Chủ | Thương Mại Điện Tử - Mua Sắm Thông Minh',
   description:
      'Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất. Giao hàng nhanh chóng và dịch vụ hỗ trợ 24/7.',
   keywords: 'mua sắm, thương mại điện tử, điện thoại, laptop, thời trang, gia dụng',
   openGraph: {
      title: 'Trang Chủ | Thương Mại Điện Tử',
      description: 'Trải nghiệm mua sắm tuyệt vời với hàng ngàn sản phẩm',
      type: 'website',
   },
};

export default function MainContentPage() {
   return (
      <main className="min-h-screen">
         {/* Header Content - Phần nội dung chính dưới navigation header */}
         <HeaderContent />

         {/* Các phần khác của trang */}
         {/* ... */}
      </main>
   );
}
