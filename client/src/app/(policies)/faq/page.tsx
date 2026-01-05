'use client';

import React, { useState, useRef } from 'react';
import {
   FaSearch,
   FaChevronDown,
   FaFilter,
   FaQuestionCircle,
   FaComment,
   FaStar,
   FaLightbulb,
   FaLayerGroup,
   FaUser,
   FaCreditCard,
   FaGamepad,
   FaUndoAlt,
   FaKey,
   FaLifeRing,
   FaTags,
} from 'react-icons/fa';

import faqItems from '@/lib/policies/FAQ';

const categories = [
   { id: 'all', name: 'Tất cả', count: faqItems.length, icon: <FaLayerGroup /> },
   {
      id: 'account',
      name: 'Tài khoản',
      count: faqItems.filter((item) => item.category === 'account').length,
      icon: <FaUser />,
   },
   {
      id: 'payment',
      name: 'Thanh toán',
      count: faqItems.filter((item) => item.category === 'payment').length,
      icon: <FaCreditCard />,
   },
   {
      id: 'delivery',
      name: 'Nhận game',
      count: faqItems.filter((item) => item.category === 'delivery').length,
      icon: <FaGamepad />,
   },
   {
      id: 'refund',
      name: 'Hoàn tiền',
      count: faqItems.filter((item) => item.category === 'refund').length,
      icon: <FaUndoAlt />,
   },
   {
      id: 'activation',
      name: 'Kích hoạt',
      count: faqItems.filter((item) => item.category === 'activation').length,
      icon: <FaKey />,
   },
   {
      id: 'support',
      name: 'Hỗ trợ',
      count: faqItems.filter((item) => item.category === 'support').length,
      icon: <FaLifeRing />,
   },
   {
      id: 'pricing',
      name: 'Giá cả',
      count: faqItems.filter((item) => item.category === 'pricing').length,
      icon: <FaTags />,
   },
];

export default function FAQPage() {
   const [searchTerm, setSearchTerm] = useState('');
   const [activeCategory, setActiveCategory] = useState('all');
   const [openItems, setOpenItems] = useState<number[]>([]);
   const searchInputRef = useRef<HTMLInputElement>(null);

   const ITEMS_PER_PAGE = 5;
   const [currentPage, setCurrentPage] = useState(1);

   // Xử lý tìm kiếm và lọc
   const filteredItems = faqItems.filter((item) => {
      const matchesSearch =
         searchTerm === '' ||
         item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      return matchesSearch && matchesCategory;
   });

   // Sắp xếp theo độ phổ biến
   const sortedItems = [...filteredItems].sort((a, b) => b.popularity - a.popularity);

   const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
   const paginatedItems = sortedItems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
   );

   // Toggle mở/đóng FAQ item
   const toggleItem = (id: number) => {
      setOpenItems((prev) =>
         prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      );
   };

   // Mở tất cả/collapse tất cả
   const toggleAll = () => {
      if (openItems.length === sortedItems.length) {
         setOpenItems([]);
      } else {
         setOpenItems(sortedItems.map((item) => item.id));
      }
   };

   // Xử lý submit search
   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();

      if (sortedItems.length > 0) {
         setCurrentPage(1);
         const firstItemId = sortedItems[0].id;
         if (!openItems.includes(firstItemId)) {
            setOpenItems([firstItemId]);
         }
         document.getElementById(`faq-${firstItemId}`)?.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <>
         <h1 className="text-3xl font-bold mb-2 text-gray-900">Câu hỏi thường gặp</h1>
         <p className="text-gray-500 mb-8">Tìm câu trả lời nhanh cho các thắc mắc của bạn</p>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               {/* Hero Section */}
               <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 h-40 w-40 bg-gray-200/50 rounded-full blur-3xl"></div>

                  <div className="max-w-3xl relative z-10">
                     <div className="flex items-center gap-5 mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center shadow-lg">
                           <FaQuestionCircle className="h-7 w-7 text-white" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                              Bạn cần hỗ trợ?
                           </h2>
                           <p className="text-gray-500 text-sm mt-1">
                              Tìm câu trả lời nhanh trong các câu hỏi thường gặp hoặc liên hệ trực
                              tiếp với chúng tôi để được tư vấn.
                           </p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black transition-all duration-300 group">
                           <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
                           <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-black transition-colors">
                              Câu hỏi giải đáp
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black transition-all duration-300 group">
                           <div className="text-2xl font-bold text-gray-900 mb-1">&lt; 5 phút</div>
                           <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-black transition-colors">
                              Tìm câu trả lời
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black transition-all duration-300 group">
                           <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                           <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-black transition-colors">
                              Hỗ trợ trực tiếp
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Search Section */}
               <div className="mb-10">
                  <form onSubmit={handleSearch} className="relative">
                     <div className="relative">
                        <input
                           ref={searchInputRef}
                           type="text"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           placeholder="Tìm kiếm câu hỏi, từ khóa hoặc vấn đề..."
                           className="w-full px-6 py-4 pl-14 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        />
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                           <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        {searchTerm && (
                           <button
                              type="button"
                              onClick={() => setSearchTerm('')}
                              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                           >
                              ✕
                           </button>
                        )}
                        <button
                           type="submit"
                           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                           Tìm kiếm
                        </button>
                     </div>
                     {searchTerm && (
                        <div className="mt-2 text-sm text-gray-500">
                           Tìm thấy <span className="font-semibold">{sortedItems.length}</span> kết
                           quả cho {'"'}
                           {searchTerm}
                           {'"'}
                        </div>
                     )}
                  </form>
               </div>

               {/* Categories */}
               <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <FaFilter className="h-5 w-5 text-gray-500" />
                        Danh mục câu hỏi
                     </h3>
                     <button
                        onClick={toggleAll}
                        className="text-sm text-gray-600 hover:text-black font-medium"
                     >
                        {openItems.length === sortedItems.length ? 'Đóng tất cả' : 'Mở tất cả'}
                     </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                     {categories.map((category) => (
                        <button
                           key={category.id}
                           onClick={() => setActiveCategory(category.id)}
                           className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              activeCategory === category.id
                                 ? 'bg-black text-white border-black'
                                 : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                           }`}
                        >
                           <span>{category.icon}</span>
                           <span>{category.name}</span>
                           <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                 activeCategory === category.id
                                    ? 'bg-white/20'
                                    : 'bg-gray-100 text-gray-600'
                              }`}
                           >
                              {category.count}
                           </span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* FAQ List */}
               <div className="space-y-4">
                  {paginatedItems.length > 0 ? (
                     <>
                        {paginatedItems.map((item) => {
                           const isOpen = openItems.includes(item.id);

                           return (
                              <div
                                 key={item.id}
                                 id={`faq-${item.id}`}
                                 className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-gray-300 ${
                                    isOpen ? 'ring-1 ring-blue-500 shadow-sm' : ''
                                 }`}
                              >
                                 {/* HEADER */}
                                 <button
                                    onClick={() => toggleItem(item.id)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                 >
                                    <div className="flex-1 flex items-start gap-4">
                                       <div className="shrink-0 mt-1">
                                          <div
                                             className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                                isOpen
                                                   ? 'bg-blue-100 text-blue-600'
                                                   : 'bg-gray-100 text-gray-600'
                                             }`}
                                          >
                                             {isOpen ? '−' : '+'}
                                          </div>
                                       </div>
                                       <div className="flex-1">
                                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                             {item.question}
                                          </h3>
                                          <div className="flex items-center gap-3">
                                             <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                {
                                                   categories.find((c) => c.id === item.category)
                                                      ?.name
                                                }
                                             </span>
                                             <span className="text-xs text-gray-500">
                                                Độ phổ biến:{' '}
                                                <span className="font-medium">
                                                   {item.popularity}%
                                                </span>
                                             </span>
                                             <span className="text-xs text-gray-500">
                                                Cập nhật: {item.updatedAt}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                    <FaChevronDown
                                       className={`h-5 w-5 text-gray-400 transition-transform shrink-0 ${
                                          isOpen ? 'rotate-180' : ''
                                       }`}
                                    />
                                 </button>

                                 {/* CONTENT */}
                                 {isOpen && (
                                    <div className="px-6 pb-6">
                                       <div className="pl-14 border-l-2 border-blue-500">
                                          <div className="prose prose-blue max-w-none">
                                             {item.answer.split('\n').map((line, index) => (
                                                <p key={index} className="text-gray-700 mb-3">
                                                   {line}
                                                </p>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           );
                        })}

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                           <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                              <button
                                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                 disabled={currentPage === 1}
                                 className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50 hover:bg-gray-50"
                              >
                                 Trước
                              </button>

                              {Array.from({ length: totalPages }).map((_, index) => {
                                 const page = index + 1;
                                 return (
                                    <button
                                       key={page}
                                       onClick={() => setCurrentPage(page)}
                                       className={`px-4 py-2 text-sm rounded-lg border min-w-10 ${
                                          currentPage === page
                                             ? 'bg-black text-white border-black'
                                             : 'bg-white hover:bg-gray-50'
                                       }`}
                                    >
                                       {page}
                                    </button>
                                 );
                              })}

                              <button
                                 onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                 disabled={currentPage === totalPages}
                                 className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50 hover:bg-gray-50"
                              >
                                 Sau
                              </button>
                           </div>
                        )}
                     </>
                  ) : (
                     /* EMPTY STATE */
                     <div className="text-center py-12">...</div>
                  )}
               </div>

               {/* Still Need Help Section */}
               <div className="mt-12">
                  <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
                     <div className="text-center max-w-3xl mx-auto">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                           <FaComment className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                           Vẫn chưa tìm thấy câu trả lời?
                        </h3>
                        <p className="text-gray-600 mb-6">
                           Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn. Liên hệ ngay để
                           được giải đáp chi tiết và nhanh chóng.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <a
                              href="mailto:support@ZeionStore.com"
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                           >
                              <svg
                                 className="h-5 w-5"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                 />
                              </svg>
                              Gửi email hỗ trợ
                           </a>
                           <a
                              href="tel:+84966376155"
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-colors"
                           >
                              <svg
                                 className="h-5 w-5"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                 />
                              </svg>
                              Gọi hotline: +84 966 376 155
                           </a>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                           Thời gian làm việc: 24/7 • Phản hồi trong vòng 15 phút
                        </p>
                     </div>
                  </div>
               </div>

               {/* Tips Section */}
               <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                           <FaLightbulb className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">Mẹo tìm kiếm</h4>
                     </div>
                     <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                           <span>Sử dụng từ khóa đơn giản, trực tiếp</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                           <span>Click vào tag để tìm câu hỏi liên quan</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                           <span>Lọc theo danh mục để thu hẹp kết quả</span>
                        </li>
                     </ul>
                  </div>

                  <div className="bg-linear-to-br from-green-50 to-white p-6 rounded-xl border border-green-200">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                           <FaStar className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">Câu hỏi phổ biến</h4>
                     </div>
                     <ul className="space-y-2 text-sm text-gray-600">
                        {faqItems
                           .sort((a, b) => b.popularity - a.popularity)
                           .slice(0, 3)
                           .map((item) => (
                              <li key={item.id} className="flex items-start gap-2">
                                 <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                 <button
                                    onClick={() => {
                                       setSearchTerm('');
                                       setOpenItems([item.id]);
                                       document
                                          .getElementById(`faq-${item.id}`)
                                          ?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-left hover:text-black transition-colors cursor-pointer"
                                 >
                                    {item.question}
                                 </button>
                              </li>
                           ))}
                     </ul>
                  </div>

                  <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                           <FaQuestionCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 ">Đề xuất câu hỏi</h4>
                     </div>
                     <p className="text-sm text-gray-600 mb-3">
                        Bạn không tìm thấy câu trả lời? Gửi câu hỏi của bạn cho chúng tôi.
                     </p>
                     <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors cursor-pointer">
                        Đề xuất câu hỏi mới
                     </button>
                  </div>
               </div>

               {/* Update Info */}
               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                     Trang FAQ được cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')} •
                     Tổng số câu hỏi: {faqItems.length}
                  </p>
               </div>
            </div>
         </section>
      </>
   );
}
