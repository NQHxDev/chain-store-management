'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SearchHero: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const router = useRouter();

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
   };

   const popularSearches = [
      'iPhone 15 Pro Max',
      'Laptop Gaming',
      'Tai nghe Bluetooth',
      'Đồng hồ thông minh',
      'Máy ảnh Sony',
   ];

   return (
      <section className="mb-12 text-center" aria-labelledby="main-heading">
         <h1
            id="main-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
         >
            Mua Sắm Tiện Lợi
            <span className="block text-gray-600 text-3xl md:text-4xl mt-2">
               Trải Nghiệm Mua Sắm Tuyệt Vời
            </span>
         </h1>

         <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất. <br />
            Giao hàng nhanh chóng và dịch vụ hỗ trợ 24/7.
         </p>

         <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-5" role="search">
            <div className="group relative flex items-center bg-white rounded-2xl p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-gray-200 focus-within:border-black focus-within:ring-4 focus-within:ring-black/5 transition-all duration-300">
               <div className="pl-4">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
               </div>

               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm của bạn ở đây..."
                  className="w-full px-4 py-3.5 text-base md:text-lg bg-transparent border-none outline-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-800"
                  aria-label="Tìm kiếm sản phẩm"
               />

               {/* Nhóm nút chức năng */}
               <div className="flex items-center gap-2">
                  {/* Nút lọc tinh chỉnh lại */}
                  <button
                     type="button"
                     className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-all active:scale-95"
                     aria-label="Lọc sản phẩm"
                  >
                     <Filter className="h-4 w-4" />
                     <span>Lọc</span>
                  </button>

                  {/* Vạch ngăn cách nhẹ */}
                  <div className="hidden sm:block w-[1px] h-6 bg-gray-200 mx-1"></div>

                  {/* Nút Submit sang trọng hơn */}
                  <button
                     type="submit"
                     className="bg-black text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-zinc-800 shadow-lg shadow-black/10 active:scale-95 transition-all duration-200"
                     aria-label="Tìm kiếm"
                  >
                     Tìm ngay
                  </button>
               </div>
            </div>
         </form>

         <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="text-gray-600 font-medium text-sm">Tìm kiếm phổ biến:</span>

            <div className="flex flex-wrap justify-center gap-2">
               {popularSearches.map((term, index) => (
                  <button
                     key={index}
                     onClick={() => setSearchQuery(term)}
                     className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-all active:scale-95"
                     aria-label={`Tìm kiếm ${term}`}
                  >
                     {term}
                  </button>
               ))}
            </div>
         </div>
      </section>
   );
};
