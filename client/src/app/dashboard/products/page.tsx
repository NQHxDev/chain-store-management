import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductFilters from '@/components/products/ProductFilters';
import ProductTable from '@/components/products/ProductTable';
import ProductActions from '@/components/products/ProductActions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductStats from '@/components/products/ProductStats';

import { productStories } from '@/lib/dashboard/products';

export const metadata: Metadata = {
   title: 'Quản Lý Sản Phẩm | Hệ Thống Quản Trị',
   description: 'Trang quản lý danh sách sản phẩm với đầy đủ tính năng CRUD, thống kê và bộ lọc',
   keywords: 'sản phẩm, quản lý, inventory, admin, dashboard',
};

export default async function ProductsPage() {
   const products = productStories;

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
               <p className="text-gray-600 mt-2">
                  Quản lý danh sách sản phẩm, tồn kho và thông tin chi tiết
               </p>
            </header>

            {/* Thống kê nhanh */}
            <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>}>
               <ProductStats products={products} />
            </Suspense>

            {/* Phần chính với bộ lọc và bảng */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               {/* Thanh công cụ */}
               <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">Danh Sách Sản Phẩm</h2>
                  <ProductActions />
               </div>

               {/* Bộ lọc */}
               <div className="px-6 py-4 border-b border-gray-200">
                  <Suspense
                     fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-lg"></div>}
                  >
                     <ProductFilters />
                  </Suspense>
               </div>

               {/* Bảng sản phẩm */}
               <div className="overflow-x-auto">
                  <Suspense fallback={<LoadingSpinner />}>
                     <ProductTable products={products} />
                  </Suspense>
               </div>

               {/* Pagination */}
               <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-600">Hiển thị 8 trên 124 sản phẩm</p>
                  <div className="flex gap-2">
                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Trước
                     </button>
                     <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        1
                     </button>
                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        2
                     </button>
                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        3
                     </button>
                     <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Sau
                     </button>
                  </div>
               </div>
            </div>

            {/* Thông tin SEO ẩn cho bot */}
            <div className="sr-only" aria-hidden="true">
               <h2>Thông tin sản phẩm</h2>
               <p>
                  Trang quản lý sản phẩm với đầy đủ tính năng: thêm, sửa, xóa, tìm kiếm và lọc sản
                  phẩm.
               </p>
               <ul>
                  <li>Tổng số sản phẩm: {products.length}</li>
                  <li>Sản phẩm còn hàng: {products.filter((p) => p.stock > 0).length}</li>
                  <li>Sản phẩm hết hàng: {products.filter((p) => p.stock === 0).length}</li>
               </ul>
            </div>
         </div>
      </div>
   );
}
