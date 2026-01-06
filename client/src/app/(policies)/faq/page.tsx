import categories from '@/lib/policies/FAQ';
import FAQClient from './FAQClient';
import FAQTips from './FAQTips';
import { FaComment, FaQuestionCircle } from 'react-icons/fa';
import faqStories from '@/lib/policies/FAQ';

export default function FAQPage() {
   return (
      <>
         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black text-center tracking-tight">
            Câu hỏi thường gặp
         </h1>
         <p className="text-gray-500 mb-8">Tìm câu trả lời nhanh cho các thắc mắc của bạn</p>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               {/* Hero Banner */}
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

               <FAQClient items={categories} />

               <FAQTips />

               <div className="mt-10">
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

               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                     Trang FAQ được cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')} •
                     Tổng số câu hỏi: {faqStories.length}
                  </p>
               </div>
            </div>
         </section>
      </>
   );
}
