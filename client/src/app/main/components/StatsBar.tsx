import React from 'react';
import { Package, Users, Truck } from 'lucide-react';

interface StatsBarProps {
   stats: {
      products: string;
      customers: string;
      delivery: string;
   };
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
   const statItems = [
      {
         icon: Package,
         label: 'Sản Phẩm',
         value: stats.products,
         description: 'Đa dạng sản phẩm chất lượng',
      },
      {
         icon: Users,
         label: 'Khách Hàng',
         value: stats.customers,
         description: 'Tin tưởng & hài lòng',
      },
      {
         icon: Truck,
         label: 'Giao Hàng',
         value: stats.delivery,
         description: 'Nhanh chóng & đúng hẹn',
      },
   ];

   return (
      <div className="bg-gradient-to-r from-gray-50 to-white border-y border-gray-200 py-8 mb-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statItems.map((item, index) => (
               <div
                  key={item.label}
                  className="flex flex-col items-center text-center"
                  aria-label={`${item.label}: ${item.value}`}
               >
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
                     <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>

                  {index < statItems.length - 1 && (
                     <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-gray-300" />
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};
