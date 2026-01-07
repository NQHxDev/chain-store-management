import Link from 'next/link';

export default function NotFound() {
   return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
         <div className="max-w-2xl w-full text-center space-y-8">
            <div className="relative">
               <div className="text-9xl font-black text-gray-900 opacity-10 select-none">404</div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-2 md:space-x-4">
                     <span
                        className="text-8xl font-black text-gray-900 animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                     >
                        4
                     </span>
                     <span
                        className="text-8xl font-black text-gray-700 animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                     >
                        0
                     </span>
                     <span
                        className="text-8xl font-black text-gray-500 animate-bounce"
                        style={{ animationDelay: '0.3s' }}
                     >
                        4
                     </span>
                  </div>
               </div>
            </div>

            {/* Message */}
            <div className="space-y-6">
               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Trang không tồn tại</h1>
               <p className="text-gray-600 text-lg max-w-lg mx-auto">
                  Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc không tồn tại.
               </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
               <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl border-2 border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
               >
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                     ></path>
                  </svg>
                  Quay lại trang chủ
               </Link>
            </div>

            {/* Search Suggestion */}
            <div className="pt-10 border-t border-gray-200 mt-10">
               <p className="text-gray-500 mb-4">Bạn cũng có thể:</p>
               <div className="max-w-md mx-auto">
                  <div className="relative">
                     <input
                        type="text"
                        placeholder="Tìm kiếm trên trang..."
                        className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                     />
                     <svg
                        className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                     </svg>
                  </div>
               </div>
            </div>

            {/* Contact Info */}
            <div className="text-center pt-8">
               <p className="text-gray-500 text-sm">
                  Cần hỗ trợ?{' '}
                  <a
                     href="mailto:support@example.com"
                     className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-2 transition-colors"
                  >
                     Liên hệ chúng tôi
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
}
