import { FaExchangeAlt } from 'react-icons/fa';

// Thống kê hoàn tiền
const refundStats = {
   approvalRate: '94%',
   avgProcessingTime: '4.2 ngày',
   totalRefunds: '12,847',
   customerSatisfaction: '4.8/5',
};

export default function RefundHeroBanner() {
   return (
      <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden shadow-sm">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-gray-200/40 rounded-full blur-3xl"></div>

         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex-1">
               <div className="flex items-center gap-6 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-black flex items-center justify-center shadow-xl shrink-0">
                     <FaExchangeAlt className="h-8 w-8 text-white" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Hoàn tiền minh bạch & nhanh chóng
                     </h2>
                     <p className="text-gray-500 text-sm mt-1">
                        Chính sách rõ ràng, quy trình đơn giản, xử lý tối đa trong 7 ngày làm việc.
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                     { label: 'Tỷ lệ chấp thuận', value: refundStats.approvalRate },
                     { label: 'Thời gian xử lý TB', value: refundStats.avgProcessingTime },
                     { label: 'Đơn hoàn tiền', value: refundStats.totalRefunds },
                     { label: 'Hài lòng của KH', value: refundStats.customerSatisfaction },
                  ].map((stat, index) => (
                     <div
                        key={index}
                        className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-black transition-colors duration-300"
                     >
                        <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                           {stat.label}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Khối cam kết bên phải - Thiết kế kiểu Badge cao cấp */}
            <div className="bg-black text-white rounded-2xl p-8 min-w-60 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-500">
               <div className="text-center relative z-10">
                  <div className="text-4xl font-black mb-1 tracking-tighter">7 ngày</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                     Cam kết xử lý tối đa
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                     <div className="text-xs text-gray-300 flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                        Xử lý nhanh nhất trong 24h
                     </div>
                  </div>
               </div>
               {/* Hiệu ứng bóng sáng chạy qua khi hover */}
               <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
         </div>
      </div>
   );
}
