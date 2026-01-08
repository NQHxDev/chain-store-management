import { FaExchangeAlt, FaQuestionCircle } from 'react-icons/fa';

export default function RefundFAQSection() {
   return (
      <div className="space-y-8">
         <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
               Câu hỏi thường gặp về hoàn tiền
            </h3>
            <p className="text-gray-600">
               Tìm câu trả lời nhanh cho các thắc mắc phổ biến về chính sách hoàn tiền.
            </p>
         </div>

         <div className="space-y-4">
            {[
               {
                  q: 'Tôi mua game đã lâu nhưng chưa kích hoạt, có được hoàn tiền không?',
                  a: 'Có, nếu key chưa được kích hoạt và trong vòng 30 ngày kể từ ngày mua. Sau 30 ngày, vui lòng liên hệ hỗ trợ để được xem xét đặc biệt.',
               },
               {
                  q: 'Hoàn tiền về tài khoản mất bao lâu?',
                  a: 'Tùy phương thức thanh toán: Ví điện tử (1-3 ngày), Thẻ ngân hàng (3-7 ngày), Thẻ cào (7-10 ngày). Bạn sẽ nhận email xác nhận khi hoàn tất.',
               },
               {
                  q: 'Tôi mua game bằng ví điện tử nhưng đã xóa tài khoản ví đó, làm thế nào để nhận hoàn tiền?',
                  a: 'Vui lòng liên hệ hỗ trợ qua email refund@webstoregame.com với thông tin tài khoản mới. Chúng tôi sẽ hỗ trợ chuyển khoản qua ngân hàng.',
               },
               {
                  q: 'Có phí hoàn tiền nào không?',
                  a: 'WebStoreGame không thu phí hoàn tiền. Tuy nhiên, một số ngân hàng hoặc ví điện tử có thể thu phí xử lý giao dịch.',
               },
               {
                  q: 'Tôi mua bundle nhiều game, có thể hoàn tiền 1 game trong bundle không?',
                  a: 'Không, bundle được bán với giá ưu đãi nên không thể hoàn tiền từng game riêng lẻ. Bạn có thể hoàn tiền toàn bộ bundle nếu đáp ứng điều kiện.',
               },
               {
                  q: 'Làm thế nào để theo dõi trạng thái yêu cầu hoàn tiền?',
                  a: 'Kiểm tra trong mục "Đơn hàng" → "Lịch sử hoàn tiền" trên website hoặc kiểm tra email cập nhật tự động từ hệ thống.',
               },
            ].map((faq, index) => (
               <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all"
               >
                  <div className="flex items-start gap-4">
                     <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <FaQuestionCircle className="h-4 w-4 text-blue-600" />
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                        <p className="text-gray-600">{faq.a}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Contact for Refund */}
         <div className="bg-linear-to-r from-gray-900 to-black text-white rounded-2xl p-8">
            <div className="max-w-3xl mx-auto text-center">
               <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <FaExchangeAlt className="h-8 w-8" />
               </div>
               <h3 className="text-2xl font-bold mb-3">Cần hỗ trợ hoàn tiền?</h3>
               <p className="text-gray-300 mb-6">
                  Nếu bạn có thắc mắc cụ thể hoặc cần hỗ trợ với yêu cầu hoàn tiền, liên hệ ngay với
                  đội ngũ hỗ trợ chuyên biệt của chúng tôi.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                     href="mailto:refund@webstoregame.com"
                     className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                     <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                     </svg>
                     refund@zeionstore.com
                  </a>
                  <a
                     href="/contact"
                     className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                     <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                     </svg>
                     Truy cập trang liên hệ
                  </a>
               </div>
               <p className="text-sm text-gray-300 mt-4">
                  Thời gian làm việc: Thứ 2 - Thứ 6 (8:00 - 17:00) • Phản hồi trong 24 giờ
               </p>
            </div>
         </div>
      </div>
   );
}
