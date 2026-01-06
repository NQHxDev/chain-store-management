import { FaChartLine, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { refundSteps } from '@/lib/policies/Refund';

export default function RefundProcessSection() {
   return (
      <div className="space-y-8">
         <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Quy trình hoàn tiền 4 bước</h3>
            <p className="text-gray-600">
               Quy trình đơn giản, minh bạch và nhanh chóng. Chúng tôi cam kết xử lý trong vòng 7
               ngày làm việc.
            </p>
         </div>

         <div className="relative">
            {/* Timeline Connector */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
               {refundSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                     <div
                        key={step.id}
                        className={`relative ${
                           index % 2 === 0
                              ? 'lg:text-right lg:pr-8'
                              : 'lg:text-left lg:pl-8 lg:mt-16'
                        }`}
                     >
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-sm transition-all">
                           <div
                              className={`flex items-center gap-4 mb-4 ${
                                 index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                              }`}
                           >
                              <div
                                 className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                                    step.id === 1
                                       ? 'bg-blue-100 text-blue-600'
                                       : step.id === 2
                                       ? 'bg-yellow-100 text-yellow-600'
                                       : step.id === 3
                                       ? 'bg-green-100 text-green-600'
                                       : 'bg-purple-100 text-purple-600'
                                 }`}
                              >
                                 <Icon className="w-6 h-6" />
                              </div>
                              <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-500">
                                       BƯỚC {step.id}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                       {step.time}
                                    </span>
                                 </div>
                                 <h4 className="text-lg font-semibold text-gray-900 mt-1">
                                    {step.step}
                                 </h4>
                              </div>
                           </div>

                           <p className="text-gray-600 mb-4">{step.description}</p>

                           <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-700">Chi tiết:</div>
                              <ul className={`space-y-1 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                 {step.details.map((detail, idx) => (
                                    <li
                                       key={idx}
                                       className="text-sm text-gray-600 flex items-start gap-2"
                                    >
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                                       <span>{detail}</span>
                                    </li>
                                 ))}
                              </ul>
                           </div>

                           {step.id === 1 && (
                              <button className="mt-4 w-full px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                 Bắt đầu yêu cầu hoàn tiền
                              </button>
                           )}
                        </div>

                        {/* Timeline Dot */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-6">
                           <div
                              className={`h-6 w-6 rounded-full border-4 border-white ${
                                 step.id === 1
                                    ? 'bg-blue-500'
                                    : step.id === 2
                                    ? 'bg-yellow-500'
                                    : step.id === 3
                                    ? 'bg-green-500'
                                    : 'bg-purple-500'
                              }`}
                           ></div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Processing Time Info */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-linear-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-200">
               <div className="flex items-center gap-3 mb-3">
                  <FaClock className="h-5 w-5 text-blue-600" />
                  <div className="font-semibold text-gray-900">Thời gian xử lý</div>
               </div>
               <p className="text-sm text-gray-600">
                  3-7 ngày làm việc tùy thuộc vào phương thức thanh toán và ngân hàng.
               </p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-white p-5 rounded-xl border border-green-200">
               <div className="flex items-center gap-3 mb-3">
                  <FaMoneyBillWave className="h-5 w-5 text-green-600" />
                  <div className="font-semibold text-gray-900">Phương thức hoàn tiền</div>
               </div>
               <p className="text-sm text-gray-600">
                  Hoàn tiền về phương thức thanh toán gốc. Ví điện tử: 1-3 ngày, Thẻ ngân hàng: 3-7
                  ngày.
               </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-200">
               <div className="flex items-center gap-3 mb-3">
                  <FaChartLine className="h-5 w-5 text-purple-600" />
                  <div className="font-semibold text-gray-900">Theo dõi trạng thái</div>
               </div>
               <p className="text-sm text-gray-600">
                  Kiểm tra trạng thái yêu cầu trong mục {'"'}
                  {'Đơn hàng'}
                  {'"'} hoặc qua email cập nhật.
               </p>
            </div>
         </div>
      </div>
   );
}
