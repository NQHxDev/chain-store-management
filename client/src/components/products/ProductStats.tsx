'use client';

import React from 'react';
import { TrendingUp, Package, DollarSign, AlertCircle } from 'lucide-react';

import { Product } from '@/lib/dashboard/products';

interface ProductStatsProps {
   products: Product[];
}

const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
   const totalProducts = products.length;
   const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
   const inStockProducts = products.filter((p) => p.stock > 0).length;
   const outOfStockProducts = products.filter((p) => p.stock === 0).length;

   const stats = [
      {
         title: 'Tổng Sản Phẩm',
         value: totalProducts,
         change: '+12.5%',
         icon: <Package className="h-5 w-5 text-gray-700" />,
         color: 'bg-gray-100',
         textColor: 'text-gray-900',
      },
      {
         title: 'Tổng Giá Trị',
         value: `$${totalValue.toLocaleString()}`,
         change: '+8.2%',
         icon: <DollarSign className="h-5 w-5 text-gray-700" />,
         color: 'bg-gray-100',
         textColor: 'text-gray-900',
      },
      {
         title: 'Còn Hàng',
         value: inStockProducts,
         change: '+5.3%',
         icon: <TrendingUp className="h-5 w-5 text-gray-700" />,
         color: 'bg-gray-100',
         textColor: 'text-gray-900',
      },
      {
         title: 'Hết Hàng',
         value: outOfStockProducts,
         change: '-2.1%',
         icon: <AlertCircle className="h-5 w-5 text-gray-700" />,
         color: 'bg-gray-100',
         textColor: 'text-gray-900',
      },
   ];

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, index) => (
            <div
               key={index}
               className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
            >
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                     <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
                     <div className="flex items-center mt-2">
                        <span
                           className={`text-xs font-medium ${
                              parseFloat(stat.change) >= 0 ? 'text-green-600' : 'text-red-600'
                           }`}
                        >
                           {stat.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">so với tháng trước</span>
                     </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ProductStats;
