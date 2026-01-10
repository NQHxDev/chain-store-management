import { refundConditions } from '@/lib/policies/Refund';
import { FaClock, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

export default function RefundPolicySection() {
   return (
      <div className="space-y-8">
         <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaShieldAlt className="h-6 w-6 text-green-600" />
               </div>
               <div>
                  <h3 className="text-xl font-semibold text-gray-900">Tổng quan chính sách</h3>
                  <p className="text-gray-600">
                     Chính sách hoàn tiền được thiết kế để bảo vệ quyền lợi của cả khách hàng và
                     ZeionStore. Chúng tôi cam kết xử lý công bằng và minh bạch mọi yêu cầu hoàn
                     tiền.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Điều kiện được hoàn tiền</h4>
                  <ul className="space-y-3">
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                        <span>Game không thể kích hoạt (trong 30 ngày)</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                        <span>Mua nhầm sản phẩm (trong 2 giờ)</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt=1.5"></div>
                        <span>Sản phẩm không đúng mô tả (trong 14 ngày)</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                        <span>Giao dịch trùng lặp (không giới hạn thời gian)</span>
                     </li>
                  </ul>
               </div>

               <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Điều kiện không được hoàn tiền</h4>
                  <ul className="space-y-3">
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                        <span>Đã kích hoạt key thành công</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                        <span>Đã chơi game quá 2 giờ</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                        <span>Yêu cầu sau 14 ngày mua (trừ trường hợp đặc biệt)</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                        <span>Không thích gameplay/đồ họa cá nhân</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Refund Conditions Grid */}
         <div>
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-semibold text-gray-900">Chi tiết điều kiện hoàn tiền</h3>
               <div className="text-sm text-gray-500">
                  {refundConditions.filter((c) => c.eligible).length} điều kiện được hoàn tiền
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {refundConditions.map((condition) => {
                  const Icon = condition.icon;

                  return (
                     <div
                        key={condition.id}
                        className={`bg-white border rounded-xl p-5 transition-all hover:shadow-sm ${
                           condition.eligible
                              ? 'border-green-200 bg-linear-to-br from-green-50 to-white'
                              : 'border-red-200 bg-linear-to-br from-red-50 to-white'
                        }`}
                     >
                        <div className="flex items-start gap-4">
                           <div
                              className={`shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                                 condition.eligible
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                              }`}
                           >
                              <Icon className="w-6 h-6" />
                           </div>

                           <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                 <h4 className="font-semibold text-gray-900">{condition.title}</h4>
                                 <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                       condition.eligible
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-red-100 text-red-700'
                                    }`}
                                 >
                                    {condition.eligible ? 'Được hoàn tiền' : 'Không được hoàn tiền'}
                                 </span>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{condition.description}</p>

                              {condition.timeLimit && (
                                 <div className="flex items-center gap-2 mb-3">
                                    <FaClock className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-700">
                                       Thời hạn: {condition.timeLimit}
                                    </span>
                                 </div>
                              )}

                              <div className="space-y-2">
                                 <div className="text-xs font-medium text-gray-700">Yêu cầu:</div>
                                 <ul className="space-y-1">
                                    {condition.requirements.map((req, idx) => (
                                       <li key={idx} className="flex items-start gap-2">
                                          <div
                                             className={`h-1.5 w-1.5 rounded-full mt-1 ${
                                                condition.eligible ? 'bg-green-500' : 'bg-red-500'
                                             }`}
                                          ></div>
                                          <span className="text-xs text-gray-600">{req}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Important Notes */}
         <div className="bg-linear-to-r from-yellow-50 to-white border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
               <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                     <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
               </div>
               <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Lưu ý quan trọng</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                           <span className="text-sm text-gray-700">
                              Thời gian chơi được tính tự động bởi hệ thống
                           </span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                           <span className="text-sm text-gray-700">
                              Mỗi tài khoản chỉ được hoàn tiền tối đa 3 lần/năm
                           </span>
                        </li>
                     </ul>
                     <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                           <span className="text-sm text-gray-700">
                              Hoàn tiền về phương thức thanh toán gốc
                           </span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                           <span className="text-sm text-gray-700">
                              Phí ngân hàng có thể bị khấu trừ (nếu có)
                           </span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
