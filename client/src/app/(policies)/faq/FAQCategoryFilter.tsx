import {
   FaCreditCard,
   FaFilter,
   FaHeadset,
   FaKey,
   FaLayerGroup,
   FaShippingFast,
   FaTags,
   FaUndoAlt,
   FaUser,
} from 'react-icons/fa';
import { CategoryFilterItem, FAQStore } from '@/lib/policies/FAQ';

import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

type FAQCategoryFilterProps = {
   items: FAQStore[];
   sortedItems: FAQStore[];
   active: string;
   onChange: (categoryId: string) => void;
   openItems: number[];
   setOpenItems: Dispatch<SetStateAction<number[]>>;
};

export default function FAQCategoryFilter({
   items,
   active,
   onChange,
   openItems,
   setOpenItems,
   sortedItems,
}: FAQCategoryFilterProps) {
   const toggleAll = () => {
      if (openItems.length === sortedItems.length) {
         setOpenItems([]);
      } else {
         setOpenItems(sortedItems.map((i: FAQStore) => i.id));
      }
   };

   const buildCategories = (items: FAQStore[]): CategoryFilterItem[] => {
      const map: Record<string, string> = {
         all: 'Tất cả',
         account: 'Tài khoản',
         payment: 'Thanh toán',
         delivery: 'Giao nhận',
         refund: 'Hoàn tiền',
         activation: 'Kích hoạt',
         support: 'Hỗ trợ',
         pricing: 'Giá & Ưu đãi',
      };

      const CategoryIConMaps: Record<string, IconType> = {
         all: FaLayerGroup,
         account: FaUser,
         payment: FaCreditCard,
         delivery: FaShippingFast,
         refund: FaUndoAlt,
         activation: FaKey,
         support: FaHeadset,
         pricing: FaTags,
      };

      const result: CategoryFilterItem[] = [
         {
            id: 'all',
            name: 'Tất cả',
            count: items.length,
            icon: CategoryIConMaps.all,
         },
      ];

      Object.entries(map).forEach(([id, name]) => {
         const count = items.filter((i) => i.category === id).length;
         if (count > 0) {
            result.push({ id, name, count, icon: CategoryIConMaps[id] ?? FaFilter });
         }
      });

      return result;
   };

   return (
      <div className="mb-8">
         <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
               <FaFilter />
               Danh mục câu hỏi
            </h3>

            <button onClick={toggleAll} className="text-sm text-gray-600 hover:text-black">
               {openItems.length === sortedItems.length ? 'Đóng tất cả' : 'Mở tất cả'}
            </button>
         </div>

         <div className="flex flex-wrap gap-3">
            {buildCategories(items).map((cat) => {
               const Icon = cat.icon;

               return (
                  <button
                     key={cat.id}
                     onClick={() => onChange(cat.id)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        active === cat.id
                           ? 'bg-black text-white border-black'
                           : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                     }`}
                  >
                     <Icon className="w-4 h-4" />
                     {cat.name}
                     <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                           active === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                        }`}
                     >
                        {cat.count}
                     </span>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
