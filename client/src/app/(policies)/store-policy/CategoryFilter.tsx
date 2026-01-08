'use client';

import type { IconType } from 'react-icons';
import {
   FaShoppingCart,
   FaShippingFast,
   FaShieldAlt,
   FaBoxOpen,
   FaTag,
   FaGift,
   FaLock,
   FaHeadset,
   FaLayerGroup,
} from 'react-icons/fa';

import { StorePolicy } from '@/lib/policies/StorePolicy';

type Category = {
   id: string;
   name: string;
   count: number;
};

type Props = {
   policies: StorePolicy[];
   activeCategory: string;
   onChange: (categoryId: string) => void;
};

const CategoryICon: Record<string, IconType> = {
   all: FaLayerGroup,
   'mua-hang': FaShoppingCart,
   'giao-nhan': FaShippingFast,
   'bao-hanh': FaShieldAlt,
   'doi-tra': FaBoxOpen,
   'khuyen-mai': FaTag,
   'quyen-loi': FaGift,
   'bao-mat': FaLock,
   'ho-tro': FaHeadset,
};

export default function CategoryFilter({ policies, activeCategory, onChange }: Props) {
   const categories: Category[] = [
      { id: 'all', name: 'Tất cả', count: policies.length },
      {
         id: 'mua-hang',
         name: 'Mua hàng',
         count: policies.filter((p) => p.category === 'mua-hang').length,
      },
      {
         id: 'giao-nhan',
         name: 'Giao nhận',
         count: policies.filter((p) => p.category === 'giao-nhan').length,
      },
      {
         id: 'bao-hanh',
         name: 'Bảo hành',
         count: policies.filter((p) => p.category === 'bao-hanh').length,
      },
      {
         id: 'doi-tra',
         name: 'Đổi trả',
         count: policies.filter((p) => p.category === 'doi-tra').length,
      },
      {
         id: 'khuyen-mai',
         name: 'Khuyến mãi',
         count: policies.filter((p) => p.category === 'khuyen-mai').length,
      },
      {
         id: 'quyen-loi',
         name: 'Quyền lợi',
         count: policies.filter((p) => p.category === 'quyen-loi').length,
      },
      {
         id: 'bao-mat',
         name: 'Bảo mật',
         count: policies.filter((p) => p.category === 'bao-mat').length,
      },
      {
         id: 'ho-tro',
         name: 'Hỗ trợ',
         count: policies.filter((p) => p.category === 'ho-tro').length,
      },
   ];

   return (
      <div className="mb-8">
         <h3 className="text-xl font-semibold text-gray-900 mb-4">Danh mục chính sách</h3>

         <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
               const isActive = activeCategory === category.id;
               const Icon = CategoryICon[category.id];

               return (
                  <button
                     key={category.id}
                     onClick={() => onChange(category.id)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        isActive
                           ? 'bg-black text-white border-black'
                           : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                     }`}
                  >
                     {Icon && (
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                     )}
                     <span>{category.name}</span>
                     <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                           isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                        }`}
                     >
                        {category.count}
                     </span>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
