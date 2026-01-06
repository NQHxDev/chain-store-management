'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FaFileInvoiceDollar, FaChartLine, FaQuestionCircle, FaShieldAlt } from 'react-icons/fa';

const tabs = [
   { id: 'policy', label: 'Chính sách', icon: FaFileInvoiceDollar },
   { id: 'process', label: 'Quy trình', icon: FaChartLine },
   { id: 'cases', label: 'Ví dụ', icon: FaQuestionCircle },
   { id: 'faq', label: 'FAQ', icon: FaShieldAlt },
];

export default function RefundTabs({ activeTab }: { activeTab: string }) {
   const router = useRouter();
   const params = useSearchParams();

   const changeTab = (tab: string) => {
      const next = new URLSearchParams(params.toString());
      next.set('tab', tab);
      router.push(`?${next.toString()}`, { scroll: false });
   };

   return (
      <nav className="flex space-x-8 border-b mb-8 overflow-x-auto">
         {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
               <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 ${
                     active
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
               >
                  <Icon className="w-4 h-4" />
                  {tab.label}
               </button>
            );
         })}
      </nav>
   );
}
