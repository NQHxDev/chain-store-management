'use client';

import Link from 'next/link';
import {
   FaFacebookF,
   FaTwitter,
   FaInstagram,
   FaYoutube,
   FaShieldAlt,
   FaHeadset,
   FaCreditCard,
   FaShippingFast,
} from 'react-icons/fa';

export default function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-white border-t border-neutral-200">
         {/* Top Footer - Features */}
         <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-4">
                     <div className="shrink-0">
                        <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                           <span className="h-6 w-6 text-white flex items-center justify-center">
                              <FaShieldAlt />
                           </span>
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 mb-1">Bảo mật tuyệt đối</h3>
                        <p className="text-sm text-gray-600">
                           Giao dịch được bảo vệ bằng mã hóa SSL 256-bit
                        </p>
                     </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-4">
                     <div className="shrink-0">
                        <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                           <span className="h-6 w-6 text-white flex items-center justify-center">
                              <FaHeadset />
                           </span>
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 mb-1">Hỗ trợ 24/7</h3>
                        <p className="text-sm text-gray-600">
                           Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc
                        </p>
                     </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-4">
                     <div className="shrink-0">
                        <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                           <span className="h-6 w-6 text-white flex items-center justify-center">
                              <FaCreditCard />
                           </span>
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 mb-1">Đa dạng thanh toán</h3>
                        <p className="text-sm text-gray-600">
                           Hỗ trợ nhiều phương thức thanh toán khác nhau
                        </p>
                     </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-4">
                     <div className="shrink-0">
                        <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                           <span className="h-6 w-6 text-white flex items-center justify-center">
                              <FaShippingFast />
                           </span>
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 mb-1">Giao hàng nhanh chóng</h3>
                        <p className="text-sm text-gray-600">
                           Nhận sản phẩm từ 10 - 60 phút sau khi mua hàng
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Footer */}
         <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {/* Company Info */}
               <div>
                  <Link href="/" className="inline-block mb-4">
                     <span className="text-xl font-bold tracking-tight text-black">
                        Zeion
                        <span className="text-neutral-500">Store</span>
                     </span>
                  </Link>
                  <p className="text-gray-600 mb-6 text-sm">
                     Hệ thống cửa hàng tiện lợi trực tuyến uy tín hàng đầu Việt Nam. Cung cấp đa
                     dạng sản phẩm với chất lượng và dịch vụ tốt nhất.
                  </p>
                  <div className="flex space-x-4">
                     <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        aria-label="Facebook"
                     >
                        <span className="h-5 w-5 flex items-center justify-center">
                           <FaFacebookF />
                        </span>
                     </a>
                     <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        aria-label="Twitter"
                     >
                        <span className="h-5 w-5 flex items-center justify-center">
                           <FaTwitter />
                        </span>
                     </a>
                     <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        aria-label="Instagram"
                     >
                        <span className="h-5 w-5 flex items-center justify-center">
                           <FaInstagram />
                        </span>
                     </a>
                     <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        aria-label="YouTube"
                     >
                        <span className="h-5 w-5 flex items-center justify-center">
                           <FaYoutube />
                        </span>
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">Liên kết nhanh</h3>
                  <ul className="space-y-3">
                     <li>
                        <Link
                           href="/products"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Sản phẩm
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/categories"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Danh mục
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/promotions"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Khuyến mãi
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/top-sellers"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Bán chạy nhất
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/new-releases"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Sản phẩm mới
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Support */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">Hỗ trợ</h3>
                  <ul className="space-y-3">
                     <li>
                        <Link
                           href="/help-center"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Trung tâm trợ giúp
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/faq"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Câu hỏi thường gặp
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/tutorials"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Hướng dẫn mua hàng
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/contact"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Liên hệ hỗ trợ
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/refund-policy"
                           className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                           Chính sách hoàn tiền
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">Liên hệ</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                           </svg>
                        </div>
                        <span className="text-gray-600 text-sm">
                           TP.Uông Bí, Tỉnh Quảng Ninh, Việt Nam
                        </span>
                     </li>
                     <li className="flex items-center gap-3">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                        </svg>
                        <span className="text-gray-600 text-sm">support@zeionstore.com</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <span className="text-gray-600 text-sm">+84 966 376 155</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Bottom Footer */}
         <div className="border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 py-6">
               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-gray-500 text-sm">
                     © {currentYear} ZeionStore. Tất cả các quyền được bảo lưu
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                     <Link
                        href="/terms"
                        className="text-gray-500 hover:text-black transition-colors"
                     >
                        Điều khoản dịch vụ
                     </Link>
                     <Link
                        href="/privacy"
                        className="text-gray-500 hover:text-black transition-colors"
                     >
                        Chính sách bảo mật
                     </Link>
                     <Link
                        href="/purchase-policy"
                        className="text-gray-500 hover:text-black transition-colors"
                     >
                        Chính sách mua hàng
                     </Link>
                     <Link
                        href="/payment-methods"
                        className="text-gray-500 hover:text-black transition-colors"
                     >
                        Hình thức thanh toán
                     </Link>
                  </div>
               </div>

               {/* Business Registration */}
               <div className="mt-4 text-center md:text-left">
                  <p className="text-xs text-gray-400">
                     Giấy chứng nhận đăng ký kinh doanh số: 0123456789 do Sở Kế hoạch và Đầu tư TP.
                     HCM cấp ngày 01/01/2026
                  </p>
               </div>
            </div>
         </div>
      </footer>
   );
}
