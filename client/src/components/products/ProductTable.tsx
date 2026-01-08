'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Eye, MoreVertical } from 'lucide-react';

import { Product } from '@/lib/dashboard/products';

interface ProductTableProps {
   products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setSelectedProducts(products.map((p) => p.id));
      } else {
         setSelectedProducts([]);
      }
   };

   const handleSelectProduct = (id: number) => {
      if (selectedProducts.includes(id)) {
         setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
      } else {
         setSelectedProducts([...selectedProducts, id]);
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'Còn hàng':
            return 'bg-green-100 text-green-800';
         case 'Hết hàng':
            return 'bg-red-100 text-red-800';
         case 'Sắp hết hàng':
            return 'bg-yellow-100 text-yellow-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   return (
      <table className="w-full">
         <thead className="bg-gray-50">
            <tr>
               <th className="py-3 px-6 text-left">
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        checked={selectedProducts.length === products.length && products.length > 0}
                        onChange={handleSelectAll}
                     />
                  </div>
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Tên Sản Phẩm
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Danh Mục
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Giá
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Tồn Kho
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Trạng Thái
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Đánh Giá
               </th>
               <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Hành Động
               </th>
            </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
               <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                     <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                     />
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                           <span className="text-gray-700 font-medium text-sm">
                              {product.name.charAt(0)}
                           </span>
                        </div>
                        <div>
                           <div className="font-medium text-gray-900">{product.name}</div>
                           <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                     </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {product.category}
                     </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <div className="font-medium text-gray-900">
                        ${product.price.toLocaleString()}
                     </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <div className="font-medium text-gray-900">{product.stock}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                           product.status
                        )}`}
                     >
                        {product.status}
                     </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                     <div className="flex items-center">
                        <div className="flex">
                           {[...Array(5)].map((_, i) => (
                              <svg
                                 key={i}
                                 className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                       ? 'text-yellow-400'
                                       : 'text-gray-300'
                                 }`}
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                           ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                     </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                     <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                           <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                           <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                           <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </div>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default ProductTable;
