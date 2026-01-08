'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronDown, FaBook } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type PolicyPage = {
   id: string;
   title: string;
   path: string;
   icon: IconType;
   description?: string;
};

interface PolicySidebarProps {
   pages: PolicyPage[];
   currentTitle?: string;
}

export default function PolicySidebar({ pages, currentTitle }: PolicySidebarProps) {
   const pathname = usePathname();
   const [isOpen, setIsOpen] = useState(false);

   // Desktop view - Sidebar cố định
   const desktopSidebar = (
      <div className="hidden lg:block w-64 shrink-0">
         <div className="sticky top-24">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
               {/* Header */}
               <div className="bg-black p-4">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="h-5 w-5 text-white">
                           <FaBook />
                        </span>
                     </div>
                     <div>
                        <h3 className="font-bold text-white text-sm">CHÍNH SÁCH</h3>
                        <p className="text-white/80 text-xs">Tài liệu & Điều khoản</p>
                     </div>
                  </div>
               </div>

               {/* Menu items */}
               <nav className="p-2">
                  <ul className="space-y-1">
                     {pages.map((page) => {
                        const isActive = pathname === page.path;
                        const Icon = page.icon;

                        return (
                           <li key={page.id}>
                              <Link
                                 href={page.path}
                                 className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                                    isActive
                                       ? 'bg-black text-white shadow-sm'
                                       : 'hover:bg-gray-50 text-gray-700 hover:text-black'
                                 }`}
                              >
                                 <div className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    <span>
                                       <Icon />
                                    </span>
                                 </div>
                                 <div className="flex-1">
                                    <span className="text-sm font-medium">{page.title}</span>
                                    {page.description && (
                                       <p className="text-xs text-gray-500 mt-0.5">
                                          {page.description}
                                       </p>
                                    )}
                                 </div>
                                 {isActive && <div className="h-2 w-2 rounded-full bg-white"></div>}
                              </Link>
                           </li>
                        );
                     })}
                  </ul>
               </nav>

               {/* Footer note */}
               <div className="border-t p-4 bg-gray-50">
                  <p className="text-xs text-gray-500 text-center">
                     Vui lòng đọc kỹ trước khi sử dụng dịch vụ
                  </p>
               </div>
            </div>
         </div>
      </div>
   );

   // Mobile view - Dropdown
   const mobileDropdown = (
      <div className="lg:hidden w-full mb-6">
         <div className="relative">
            <button
               onClick={() => setIsOpen(!isOpen)}
               className="w-full bg-white border border-gray-300 rounded-xl p-4 flex items-center justify-between hover:border-gray-400 transition-colors"
            >
               <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-gray-600">
                     <FaBook />
                  </span>
                  <div className="text-left">
                     <span className="block text-sm font-medium text-gray-900">
                        {currentTitle || 'Chọn chính sách'}
                     </span>
                     <span className="block text-xs text-gray-500">
                        {pages.length} chính sách có sẵn
                     </span>
                  </div>
               </div>
               <span
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                     isOpen ? 'rotate-180' : ''
                  }`}
               >
                  <FaChevronDown />
               </span>
            </button>

            {isOpen && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                     {pages.map((page) => {
                        const isActive = pathname === page.path;
                        const Icon = page.icon;

                        return (
                           <Link
                              key={page.id}
                              href={page.path}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 ${
                                 isActive ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-700'
                              }`}
                           >
                              <div className={isActive ? 'text-white' : 'text-gray-400'}>
                                 <span>
                                    <Icon />
                                 </span>
                              </div>
                              <div className="flex-1">
                                 <span className="text-sm font-medium">{page.title}</span>
                                 {page.description && (
                                    <p className="text-xs mt-0.5 opacity-80">{page.description}</p>
                                 )}
                              </div>
                           </Link>
                        );
                     })}
                  </div>
               </div>
            )}
         </div>
      </div>
   );

   return (
      <>
         {desktopSidebar}
         {mobileDropdown}
      </>
   );
}
