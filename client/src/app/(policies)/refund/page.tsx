'use client';

import React, { useState } from 'react';
import {
   FaExchangeAlt,
   FaClock,
   FaCheckCircle,
   FaTimesCircle,
   FaQuestionCircle,
   FaFileInvoiceDollar,
   FaCalendarAlt,
   FaMoneyBillWave,
   FaShieldAlt,
   FaCreditCard,
   FaUserCheck,
   FaChartLine,
   FaExclamationTriangle,
} from 'react-icons/fa';

interface RefundCondition {
   id: number;
   title: string;
   description: string;
   eligible: boolean;
   timeLimit?: string;
   requirements: string[];
   icon: React.ReactNode;
   priority: 'high' | 'medium' | 'low';
}

interface RefundCase {
   id: number;
   type: string;
   description: string;
   status: 'eligible' | 'not-eligible' | 'conditional';
   processingTime: string;
   refundAmount: string;
   example: string;
}

interface RefundStep {
   id: number;
   step: string;
   description: string;
   time: string;
   icon: React.ReactNode;
   details: string[];
}

export default function RefundPage() {
   const [activeSection, setActiveSection] = useState('policy');
   const [showExamples, setShowExamples] = useState(false);

   // Điều kiện hoàn tiền
   const refundConditions: RefundCondition[] = [
      {
         id: 1,
         title: 'Game không thể kích hoạt',
         description: 'Key game không hoạt động do lỗi hệ thống hoặc key đã được sử dụng',
         eligible: true,
         timeLimit: 'Trong vòng 30 ngày',
         requirements: [
            'Cung cấp screenshot lỗi kích hoạt',
            'Chưa yêu cầu hoàn tiền cho cùng sản phẩm',
            'Key chưa được kích hoạt thành công',
         ],
         icon: <FaTimesCircle className="h-6 w-6" />,
         priority: 'high',
      },
      {
         id: 2,
         title: 'Mua nhầm sản phẩm',
         description: 'Mua nhầm game, gói DLC, hoặc phiên bản không mong muốn',
         eligible: true,
         timeLimit: 'Trong vòng 2 giờ',
         requirements: [
            'Chưa kích hoạt key',
            'Không quá 2 lần hoàn tiền/năm',
            'Yêu cầu trong khung giờ làm việc',
         ],
         icon: <FaExchangeAlt className="h-6 w-6" />,
         priority: 'high',
      },
      {
         id: 3,
         title: 'Sản phẩm không đúng mô tả',
         description: 'Game thiếu tính năng quan trọng hoặc khác biệt lớn so với mô tả',
         eligible: true,
         timeLimit: 'Trong vòng 14 ngày',
         requirements: [
            'Cung cấp bằng chứng so sánh',
            'Game có lỗi nghiêm trọng ảnh hưởng gameplay',
            'Chưa chơi quá 2 giờ',
         ],
         icon: <FaFileInvoiceDollar className="h-6 w-6" />,
         priority: 'high',
      },
      {
         id: 4,
         title: 'Giao dịch trùng lặp',
         description: 'Bị tính phí nhiều lần cho cùng một đơn hàng',
         eligible: true,
         timeLimit: 'Không giới hạn',
         requirements: [
            'Cung cấp sao kê ngân hàng',
            'Mã giao dịch trùng lặp',
            'Chưa nhận key từ giao dịch trùng',
         ],
         icon: <FaCreditCard className="h-6 w-6" />,
         priority: 'high',
      },
      {
         id: 5,
         title: 'Không thích gameplay/đồ họa',
         description: 'Cá nhân không thích trò chơi sau khi mua',
         eligible: false,
         requirements: [
            'Không áp dụng cho sở thích cá nhân',
            'Đã xem trailer và đánh giá trước khi mua',
            'Game hoạt động bình thường',
         ],
         icon: <FaUserCheck className="h-6 w-6" />,
         priority: 'medium',
      },
      {
         id: 6,
         title: 'Đã kích hoạt thành công',
         description: 'Key game đã được kích hoạt trên nền tảng',
         eligible: false,
         requirements: [
            'Key đã được sử dụng',
            'Không thể thu hồi key đã kích hoạt',
            'Đã nhận dịch vụ đầy đủ',
         ],
         icon: <FaCheckCircle className="h-6 w-6" />,
         priority: 'high',
      },
      {
         id: 7,
         title: 'Đã chơi quá thời gian quy định',
         description: 'Đã chơi game vượt quá thời gian cho phép hoàn tiền',
         eligible: false,
         timeLimit: 'Quá 2 giờ chơi',
         requirements: [
            'Thời gian chơi được ghi nhận tự động',
            'Không thể reset thời gian chơi',
            'Đã sử dụng dịch vụ đáng kể',
         ],
         icon: <FaClock className="h-6 w-6" />,
         priority: 'medium',
      },
      {
         id: 8,
         title: 'Yêu cầu sau thời hạn',
         description: 'Yêu cầu hoàn tiền sau thời hạn chính sách',
         eligible: false,
         timeLimit: 'Quá 14 ngày',
         requirements: [
            'Thời hạn được thông báo rõ khi mua',
            'Chính sách áp dụng đồng nhất',
            'Không có ngoại lệ',
         ],
         icon: <FaCalendarAlt className="h-6 w-6" />,
         priority: 'low',
      },
   ];

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

   // Quy trình hoàn tiền
   const refundSteps: RefundStep[] = [
      {
         id: 1,
         step: 'Yêu cầu hoàn tiền',
         description: 'Gửi yêu cầu qua trang web hoặc email',
         time: '5-15 phút',
         icon: <FaFileInvoiceDollar className="h-6 w-6" />,
         details: [
            'Truy cập mục "Đơn hàng"',
            'Chọn đơn cần hoàn tiền',
            'Điền lý do và bằng chứng',
            'Xác nhận yêu cầu',
         ],
      },
      {
         id: 2,
         step: 'Xét duyệt',
         description: 'Đội ngũ hỗ trợ xem xét yêu cầu',
         time: '1-3 ngày làm việc',
         icon: <FaUserCheck className="h-6 w-6" />,
         details: [
            'Kiểm tra điều kiện hoàn tiền',
            'Xác minh thông tin đơn hàng',
            'Đánh giá bằng chứng cung cấp',
            'Liên hệ nếu cần thêm thông tin',
         ],
      },
      {
         id: 3,
         step: 'Xử lý hoàn tiền',
         description: 'Thực hiện hoàn tiền nếu được chấp thuận',
         time: '3-10 ngày làm việc',
         icon: <FaMoneyBillWave className="h-6 w-6" />,
         details: [
            'Hoàn tiền về phương thức thanh toán gốc',
            'Gửi email xác nhận hoàn tiền',
            'Cập nhật trạng thái đơn hàng',
            'Hỗ trợ nếu có vấn đề',
         ],
      },
      {
         id: 4,
         step: 'Hoàn tất',
         description: 'Hoàn thành quy trình hoàn tiền',
         time: 'Ngay lập tức',
         icon: <FaCheckCircle className="h-6 w-6" />,
         details: [
            'Nhận tiền về tài khoản',
            'Kiểm tra email xác nhận',
            'Đánh giá trải nghiệm hoàn tiền',
            'Liên hệ nếu chưa nhận được tiền',
         ],
      },
   ];

   // Thống kê hoàn tiền
   const refundStats = {
      approvalRate: '94%',
      avgProcessingTime: '4.2 ngày',
      totalRefunds: '12,847',
      customerSatisfaction: '4.8/5',
   };

   return (
      <>
         <h1 className="text-3xl font-bold mb-2 text-gray-900">Chính sách hoàn tiền</h1>
         <p className="text-gray-500 mb-8">Quy định và hướng dẫn hoàn tiền chi tiết</p>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               {/* Hero Banner */}
               <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden shadow-sm">
                  {/* Hiệu ứng gradient mờ cực nhẹ ở góc */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-gray-200/40 rounded-full blur-3xl"></div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                     <div className="flex-1">
                        <div className="flex items-center gap-6 mb-6">
                           {/* Icon với nền đen nổi bật trên nền xám */}
                           <div className="h-16 w-16 rounded-2xl bg-black flex items-center justify-center shadow-xl shrink-0">
                              <FaExchangeAlt className="h-8 w-8 text-white" />
                           </div>
                           <div>
                              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                 Hoàn tiền minh bạch & nhanh chóng
                              </h2>
                              <p className="text-gray-500 text-sm mt-1">
                                 Chính sách rõ ràng, quy trình đơn giản, xử lý tối đa trong 7 ngày
                                 làm việc.
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                           {/* Các khối thông số với phong cách thẻ trắng tối giản */}
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
                                 <div className="text-xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                 </div>
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

               {/* Navigation Tabs */}
               <div className="mb-8 border-b border-gray-200">
                  <nav className="flex space-x-8 overflow-x-auto">
                     {[
                        {
                           id: 'policy',
                           label: 'Chính sách',
                           icon: <FaFileInvoiceDollar className="h-4 w-4" />,
                        },
                        {
                           id: 'process',
                           label: 'Quy trình',
                           icon: <FaChartLine className="h-4 w-4" />,
                        },
                        {
                           id: 'cases',
                           label: 'Ví dụ',
                           icon: <FaQuestionCircle className="h-4 w-4" />,
                        },
                        { id: 'faq', label: 'FAQ', icon: <FaShieldAlt className="h-4 w-4" /> },
                     ].map((tab) => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveSection(tab.id)}
                           className={`flex items-center gap-2 px-1 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                              activeSection === tab.id
                                 ? 'border-green-600 text-green-600'
                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                           }`}
                        >
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </nav>
               </div>

               {/* Policy Section */}
               {activeSection === 'policy' && (
                  <div className="space-y-8">
                     <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                              <FaShieldAlt className="h-6 w-6 text-green-600" />
                           </div>
                           <div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                 Tổng quan chính sách
                              </h3>
                              <p className="text-gray-600">
                                 Chính sách hoàn tiền được thiết kế để bảo vệ quyền lợi của cả khách
                                 hàng và WebStoreGame. Chúng tôi cam kết xử lý công bằng và minh
                                 bạch mọi yêu cầu hoàn tiền.
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                           <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">
                                 ✅ Điều kiện được hoàn tiền
                              </h4>
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
                              <h4 className="font-semibold text-gray-900">
                                 ❌ Điều kiện không được hoàn tiền
                              </h4>
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
                           <h3 className="text-xl font-semibold text-gray-900">
                              Chi tiết điều kiện hoàn tiền
                           </h3>
                           <div className="text-sm text-gray-500">
                              {refundConditions.filter((c) => c.eligible).length} điều kiện được
                              hoàn tiền
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {refundConditions.map((condition) => (
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
                                       {condition.icon}
                                    </div>

                                    <div className="flex-1">
                                       <div className="flex items-start justify-between mb-2">
                                          <h4 className="font-semibold text-gray-900">
                                             {condition.title}
                                          </h4>
                                          <span
                                             className={`px-2 py-1 text-xs rounded-full ${
                                                condition.eligible
                                                   ? 'bg-green-100 text-green-700'
                                                   : 'bg-red-100 text-red-700'
                                             }`}
                                          >
                                             {condition.eligible
                                                ? 'Được hoàn tiền'
                                                : 'Không được hoàn tiền'}
                                          </span>
                                       </div>

                                       <p className="text-sm text-gray-600 mb-3">
                                          {condition.description}
                                       </p>

                                       {condition.timeLimit && (
                                          <div className="flex items-center gap-2 mb-3">
                                             <FaClock className="h-3 w-3 text-gray-400" />
                                             <span className="text-xs font-medium text-gray-700">
                                                Thời hạn: {condition.timeLimit}
                                             </span>
                                          </div>
                                       )}

                                       <div className="space-y-2">
                                          <div className="text-xs font-medium text-gray-700">
                                             Yêu cầu:
                                          </div>
                                          <ul className="space-y-1">
                                             {condition.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                   <div
                                                      className={`h-1.5 w-1.5 rounded-full mt-1 ${
                                                         condition.eligible
                                                            ? 'bg-green-500'
                                                            : 'bg-red-500'
                                                      }`}
                                                   ></div>
                                                   <span className="text-xs text-gray-600">
                                                      {req}
                                                   </span>
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
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
               )}

               {/* Process Section */}
               {activeSection === 'process' && (
                  <div className="space-y-8">
                     <div className="text-center max-w-3xl mx-auto mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                           Quy trình hoàn tiền 4 bước
                        </h3>
                        <p className="text-gray-600">
                           Quy trình đơn giản, minh bạch và nhanh chóng. Chúng tôi cam kết xử lý
                           trong vòng 7 ngày làm việc.
                        </p>
                     </div>

                     <div className="relative">
                        {/* Timeline Connector */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                           {refundSteps.map((step, index) => (
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
                                          {step.icon}
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
                                       <div className="text-sm font-medium text-gray-700">
                                          Chi tiết:
                                       </div>
                                       <ul
                                          className={`space-y-1 ${
                                             index % 2 === 0 ? 'lg:text-right' : ''
                                          }`}
                                       >
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
                           ))}
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
                              <div className="font-semibold text-gray-900">
                                 Phương thức hoàn tiền
                              </div>
                           </div>
                           <p className="text-sm text-gray-600">
                              Hoàn tiền về phương thức thanh toán gốc. Ví điện tử: 1-3 ngày, Thẻ
                              ngân hàng: 3-7 ngày.
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
               )}

               {/* Cases Section */}
               {activeSection === 'cases' && (
                  <div className="space-y-8">
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Ví dụ trường hợp cụ thể
                        </h3>
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
                                          <h4 className="font-semibold text-gray-900">
                                             {caseItem.type}
                                          </h4>
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

                                       <p className="text-sm text-gray-600 mb-2">
                                          {caseItem.description}
                                       </p>

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
                                       <div className="text-sm font-medium text-gray-700 mb-1">
                                          Ví dụ:
                                       </div>
                                       <p className="text-sm text-gray-600">{caseItem.example}</p>
                                    </div>
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>

                     {/* How to Increase Chance */}
                     <div className="bg-linear-to-r from-green-50 to-white border border-green-200 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                           Cách tăng tỷ lệ được hoàn tiền
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-sm font-bold text-green-600">1</span>
                                 </div>
                                 <div>
                                    <div className="font-medium text-gray-900">
                                       Cung cấp đầy đủ bằng chứng
                                    </div>
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
                                    <div className="font-medium text-gray-900">
                                       Yêu cầu đúng thời hạn
                                    </div>
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
                                    <div className="font-medium text-gray-900">
                                       Mô tả rõ ràng vấn đề
                                    </div>
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
                                    <div className="font-medium text-gray-900">
                                       Phản hồi kịp thời
                                    </div>
                                    <p className="text-sm text-gray-600">
                                       Trả lời email hỗ trợ trong vòng 48 giờ
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* FAQ Section */}
               {activeSection === 'faq' && (
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
                              Nếu bạn có thắc mắc cụ thể hoặc cần hỗ trợ với yêu cầu hoàn tiền, liên
                              hệ ngay với đội ngũ hỗ trợ chuyên biệt của chúng tôi.
                           </p>
                           <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a
                                 href="mailto:refund@webstoregame.com"
                                 className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
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
                                 refund@webstoregame.com
                              </a>
                              <a
                                 href="/contact"
                                 className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
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
                                       d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                 </svg>
                                 Truy cập trang liên hệ
                              </a>
                           </div>
                           <p className="text-sm text-gray-300 mt-4">
                              Thời gian làm việc: Thứ 2 - Thứ 6 (8:00 - 17:00) • Phản hồi trong 24
                              giờ
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               {/* Final Note */}
               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                     Chính sách hoàn tiền có hiệu lực từ ngày 01/01/2024 • Cập nhật lần cuối:{' '}
                     {new Date().toLocaleDateString('vi-VN')}
                  </p>
               </div>
            </div>
         </section>
      </>
   );
}
