'use client';

import { useState } from 'react';
import { FaCheckCircle, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';

interface RefundCase {
   id: number;
   type: string;
   description: string;
   status: 'eligible' | 'not-eligible' | 'conditional';
   processingTime: string;
   refundAmount: string;
   example: string;
}

export default function RefundCasesSection() {
   const [showExamples, setShowExamples] = useState(false);

   // Ví dụ trường hợp cụ thể
   const refundCases: RefundCase[] = [
      {
         id: 1,
         type: 'Game lỗi kỹ thuật',
         description: 'Game crash liên tục, không thể chơi được',
         status: 'eligible',
         processingTime: '3-5 ngày làm việc',
         refundAmount: '100% giá trị',
         example: 'Mua Cyberpunk 2077, game crash sau 30 phút chơi, chưa vượt 2 giờ',
      },
      {
         id: 2,
         type: 'Mua nhầm phiên bản',
         description: 'Mua Standard Edition thay vì Deluxe Edition',
         status: 'eligible',
         processingTime: '1-2 ngày làm việc',
         refundAmount: '100% giá trị',
         example: 'Mua FIFA 24 Standard, muốn đổi sang Ultimate Edition',
      },
      {
         id: 3,
         type: 'PC requirements không đủ',
         description: 'Máy tính không đáp ứng yêu cầu hệ thống tối thiểu',
         status: 'conditional',
         processingTime: '5-7 ngày làm việc',
         refundAmount: '80% giá trị',
         example: 'Mua Starfield, card đồ họa không hỗ trợ DirectX 12',
      },
      {
         id: 4,
         type: 'Không thích sau khi chơi',
         description: 'Gameplay không như mong đợi',
         status: 'not-eligible',
         processingTime: 'Không áp dụng',
         refundAmount: '0%',
         example: 'Mua The Sims 4, chơi 5 giờ nhưng cảm thấy nhàm chán',
      },
      {
         id: 5,
         type: 'Key đã kích hoạt',
         description: 'Đã kích hoạt key trên Steam/Epic',
         status: 'not-eligible',
         processingTime: 'Không áp dụng',
         refundAmount: '0%',
         example: 'Mua và kích hoạt Red Dead Redemption 2 trên Steam',
      },
   ];

   return (
      <div className="space-y-8">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Ví dụ trường hợp cụ thể</h3>
            <button
               onClick={() => setShowExamples(!showExamples)}
               className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
               {showExamples ? 'Ẩn ví dụ' : 'Hiển thị ví dụ'}
            </button>
         </div>

         <div className="space-y-4">
            {refundCases.map((caseItem) => (
               <div
                  key={caseItem.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all"
               >
                  <div className="flex items-start justify-between">
                     <div className="flex items-start gap-4">
                        <div
                           className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              caseItem.status === 'eligible'
                                 ? 'bg-green-100 text-green-600'
                                 : caseItem.status === 'not-eligible'
                                 ? 'bg-red-100 text-red-600'
                                 : 'bg-yellow-100 text-yellow-600'
                           }`}
                        >
                           {caseItem.status === 'eligible' ? (
                              <FaCheckCircle className="h-5 w-5" />
                           ) : caseItem.status === 'not-eligible' ? (
                              <FaTimesCircle className="h-5 w-5" />
                           ) : (
                              <FaQuestionCircle className="h-5 w-5" />
                           )}
                        </div>

                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-semibold text-gray-900">{caseItem.type}</h4>
                              <span
                                 className={`px-2 py-0.5 text-xs rounded-full ${
                                    caseItem.status === 'eligible'
                                       ? 'bg-green-100 text-green-700'
                                       : caseItem.status === 'not-eligible'
                                       ? 'bg-red-100 text-red-700'
                                       : 'bg-yellow-100 text-yellow-700'
                                 }`}
                              >
                                 {caseItem.status === 'eligible'
                                    ? 'Được hoàn tiền'
                                    : caseItem.status === 'not-eligible'
                                    ? 'Không được hoàn tiền'
                                    : 'Có điều kiện'}
                              </span>
                           </div>

                           <p className="text-sm text-gray-600 mb-2">{caseItem.description}</p>

                           <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Xử lý: {caseItem.processingTime}</span>
                              <span>•</span>
                              <span>Số tiền: {caseItem.refundAmount}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {showExamples && (
                     <div className="mt-4 pl-14">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                           <div className="text-sm font-medium text-gray-700 mb-1">Ví dụ:</div>
                           <p className="text-sm text-gray-600">{caseItem.example}</p>
                        </div>
                     </div>
                  )}
               </div>
            ))}
         </div>

         {/* How to Increase Chance */}
         <div className="bg-linear-to-r from-green-50 to-white border border-green-200 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Cách tăng tỷ lệ được hoàn tiền</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                  <div className="flex items-start gap-3">
                     <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-600">1</span>
                     </div>
                     <div>
                        <div className="font-medium text-gray-900">Cung cấp đầy đủ bằng chứng</div>
                        <p className="text-sm text-gray-600">
                           Screenshot, video, error messages, sao kê ngân hàng
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-3">
                     <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-600">2</span>
                     </div>
                     <div>
                        <div className="font-medium text-gray-900">Yêu cầu đúng thời hạn</div>
                        <p className="text-sm text-gray-600">
                           Không vượt quá thời gian quy định trong chính sách
                        </p>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-start gap-3">
                     <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-600">3</span>
                     </div>
                     <div>
                        <div className="font-medium text-gray-900">Mô tả rõ ràng vấn đề</div>
                        <p className="text-sm text-gray-600">
                           Giải thích chi tiết lý do và ảnh hưởng của vấn đề
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-3">
                     <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-600">4</span>
                     </div>
                     <div>
                        <div className="font-medium text-gray-900">Phản hồi kịp thời</div>
                        <p className="text-sm text-gray-600">
                           Trả lời email hỗ trợ trong vòng 48 giờ
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
