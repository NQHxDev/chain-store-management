import { FaQuestionCircle } from 'react-icons/fa';

export default function FAQHero() {
   return (
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
                     Tìm câu trả lời nhanh trong các câu hỏi thường gặp hoặc liên hệ trực tiếp với
                     chúng tôi để được tư vấn.
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
   );
}
