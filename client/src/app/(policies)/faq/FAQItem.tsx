'use client';

import { ChevronDown } from 'lucide-react';
import faqStories, { FAQStore } from '@/lib/policies/FAQ';
import {
   FaCreditCard,
   FaGamepad,
   FaKey,
   FaLayerGroup,
   FaLifeRing,
   FaTags,
   FaUndoAlt,
   FaUser,
} from 'react-icons/fa';

type Props = {
   item: FAQStore;
   isOpen: boolean;
   onToggle: () => void;
};

const faqCategories = [
   { id: 'all', name: 'Tất cả', count: faqStories.length, icon: <FaLayerGroup /> },
   {
      id: 'account',
      name: 'Tài khoản',
      count: faqStories.filter((item) => item.category === 'account').length,
      icon: <FaUser />,
   },
   {
      id: 'payment',
      name: 'Thanh toán',
      count: faqStories.filter((item) => item.category === 'payment').length,
      icon: <FaCreditCard />,
   },
   {
      id: 'delivery',
      name: 'Nhận game',
      count: faqStories.filter((item) => item.category === 'delivery').length,
      icon: <FaGamepad />,
   },
   {
      id: 'refund',
      name: 'Hoàn tiền',
      count: faqStories.filter((item) => item.category === 'refund').length,
      icon: <FaUndoAlt />,
   },
   {
      id: 'activation',
      name: 'Kích hoạt',
      count: faqStories.filter((item) => item.category === 'activation').length,
      icon: <FaKey />,
   },
   {
      id: 'support',
      name: 'Hỗ trợ',
      count: faqStories.filter((item) => item.category === 'support').length,
      icon: <FaLifeRing />,
   },
   {
      id: 'pricing',
      name: 'Giá cả',
      count: faqStories.filter((item) => item.category === 'pricing').length,
      icon: <FaTags />,
   },
];

export default function FAQItem({ item, isOpen, onToggle }: Props) {
   return (
      <div className="border rounded-lg overflow-hidden">
         <button
            onClick={onToggle}
            className="w-full flex justify-between items-center px-4 py-4 text-left hover:bg-gray-50"
         >
            <div className="flex-1">
               <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.question}</h3>
               <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                  <span className="inline-block whitespace-nowrap px-2 py-0.5 text-[10px] bg-gray-100 text-gray-500 border border-gray-200 rounded uppercase tracking-wider font-semibold">
                     {faqCategories.find((c) => c.id === item.category)?.name}
                  </span>

                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                     <div className="flex items-center gap-1">
                        <span>Độ phổ biến:</span>
                        <span className="text-gray-600">{item.popularity}%</span>
                     </div>
                     <span className="w-1 h-1 bg-gray-300 rounded-full"></span>{' '}
                     <div className="flex items-center gap-1">
                        <span>Cập nhật:</span>
                        <span className="text-gray-600">{item.updatedAt}</span>
                     </div>
                  </div>
               </div>
            </div>

            <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
         </button>

         {isOpen && (
            <div className="px-6 pb-6">
               <div className="prose prose-blue max-w-none">
                  {item.answer.split('\n').map((line, index) => (
                     <p key={index} className="text-gray-700 mb-3">
                        {line}
                     </p>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
