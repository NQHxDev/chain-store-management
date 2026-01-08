'use client';

import { usePolicyPages } from '@/hooks/usePolicyPages';
import PolicySidebar from './PolicySidebar';
import HeaderGate from '@/components/header/HeaderGate';

export default function PolicyLayoutWrapper({ children }: { children: React.ReactNode }) {
   const { policyPages } = usePolicyPages();

   return (
      <>
         <HeaderGate />
         <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b">
               <div className="max-w-7xl mx-auto px-4 py-8">
                  <div className="text-center">
                     <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Chính sách & Điều khoản
                     </h1>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                        Các quy định và chính sách quan trọng giúp bảo vệ quyền lợi của bạn khi sử
                        dụng dịch vụ ZeionStore
                     </p>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
               <div className="flex flex-col lg:flex-row gap-8">
                  {/* Sidebar */}
                  <PolicySidebar pages={policyPages} />

                  {/* Content Area - Giống trang sách */}
                  <div className="flex-1">
                     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Book-like decoration */}
                        <div className="border-b border-gray-200">
                           <div className="px-8 py-6">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                 </div>
                                 <div className="text-sm text-gray-500">
                                    ZeionStore • Chính sách
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-6 md:p-8 lg:p-12">
                           <div className="prose prose-lg max-w-none">{children}</div>
                        </div>

                        {/* Page indicator (giống sách) */}
                        <div className="border-t border-gray-200 px-8 py-4">
                           <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Trang chính sách</span>
                              <div className="flex items-center gap-2">
                                 <span>
                                    Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Additional Info */}
                     <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-4">
                           <div className="shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                 <svg
                                    className="h-5 w-5 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                 </svg>
                              </div>
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900 mb-1">Cần hỗ trợ thêm?</h3>
                              <p className="text-sm text-gray-600">
                                 Nếu bạn có bất kỳ câu hỏi nào về chính sách của chúng tôi, đừng
                                 ngần ngại liên hệ với đội ngũ hỗ trợ qua email
                                 <span className="font-medium ml-1">support@zeionstore.com</span>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
