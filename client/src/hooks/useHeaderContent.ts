'use client';

import { useState } from 'react';

interface Category {
   id: string;
   name: string;
   description: string;
   color: string;
}

interface Promotion {
   id: string;
   title: string;
   description: string;
   discount: number;
   endDate: string;
}

export const useHeaderContent = () => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [categories, setCategories] = useState<Category[]>([
      {
         id: '1',
         name: 'Điện Thoại & Tablet',
         description: 'Smartphone, iPad, Tablet',
         color: 'from-blue-500 to-cyan-500',
      },
      {
         id: '2',
         name: 'Laptop & Máy Tính',
         description: 'PC, Laptop, Linh kiện',
         color: 'from-gray-700 to-gray-900',
      },
      {
         id: '3',
         name: 'Thời Trang',
         description: 'Quần áo, Giày dép, Phụ kiện',
         color: 'from-pink-500 to-rose-500',
      },
      {
         id: '4',
         name: 'Gia Dụng',
         description: 'Thiết bị nhà bếp, Đồ gia dụng',
         color: 'from-amber-500 to-orange-500',
      },
   ]);

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [promotions, setPromotions] = useState<Promotion[]>([
      {
         id: '1',
         title: 'Siêu Sale Thứ 6',
         description: 'Giảm đến 50% toàn bộ sản phẩm',
         discount: 50,
         endDate: '2024-12-31',
      },
      {
         id: '2',
         title: 'Freeship Toàn Quốc',
         description: 'Miễn phí vận chuyển đơn từ 500K',
         discount: 100,
         endDate: '2024-12-25',
      },
   ]);

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [stats, setStats] = useState({
      products: '10,000+',
      customers: '1,000,000+',
      delivery: '2h tại HN & HCM',
   });

   return {
      categories,
      promotions,
      stats,
   };
};
