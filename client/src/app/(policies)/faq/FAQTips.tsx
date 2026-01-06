import { FaLightbulb, FaQuestionCircle, FaStar } from 'react-icons/fa';

import faqStories from '@/lib/policies/FAQ';

export default function FAQTips() {
   return (
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
               {faqStories
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 3)
                  .map((item) => (
                     <li key={item.id} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                        <button className="text-left hover:text-black transition-colors cursor-pointer">
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
   );
}
