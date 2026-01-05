// app/store-policy/page.tsx
'use client';

import { useState } from 'react';
import {
   FaStore,
   FaShippingFast,
   FaCalendarAlt,
   FaChartLine,
   FaExclamationTriangle,
   FaCheckCircle,
   FaTimesCircle,
} from 'react-icons/fa';

import { storePolicies, shippingMethods, supportChannels } from '@/lib/policies/StorePolicy';

export default function StorePolicyPage() {
   const [activeCategory, setActiveCategory] = useState('all');
   const [showAllDetails, setShowAllDetails] = useState(false);

   // Danh mục
   const categories = [
      { id: 'all', name: 'Tất cả', count: storePolicies.length },
      {
         id: 'mua-hang',
         name: 'Mua hàng',
         count: storePolicies.filter((p) => p.category === 'mua-hang').length,
      },
      {
         id: 'giao-nhan',
         name: 'Giao nhận',
         count: storePolicies.filter((p) => p.category === 'giao-nhan').length,
      },
      {
         id: 'bao-hanh',
         name: 'Bảo hành',
         count: storePolicies.filter((p) => p.category === 'bao-hanh').length,
      },
      {
         id: 'doi-tra',
         name: 'Đổi trả',
         count: storePolicies.filter((p) => p.category === 'doi-tra').length,
      },
      {
         id: 'khuyen-mai',
         name: 'Khuyến mãi',
         count: storePolicies.filter((p) => p.category === 'khuyen-mai').length,
      },
      {
         id: 'quyen-loi',
         name: 'Quyền lợi',
         count: storePolicies.filter((p) => p.category === 'quyen-loi').length,
      },
      {
         id: 'bao-mat',
         name: 'Bảo mật',
         count: storePolicies.filter((p) => p.category === 'bao-mat').length,
      },
      {
         id: 'ho-tro',
         name: 'Hỗ trợ',
         count: storePolicies.filter((p) => p.category === 'ho-tro').length,
      },
   ];

   // Lọc chính sách theo danh mục
   const filteredPolicies =
      activeCategory === 'all'
         ? storePolicies
         : storePolicies.filter((policy) => policy.category === activeCategory);

   return (
      <>
         <h1 className="text-3xl font-bold mb-2 text-gray-900">Chính sách cửa hàng</h1>
         <p className="text-gray-500 mb-8">Quy định và cam kết dịch vụ từ WebStoreGame</p>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               {/* Hero Banner */}
               <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden shadow-sm">
                  <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-gray-200/30 rounded-full blur-3xl"></div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                     <div className="flex-1">
                        <div className="flex items-center gap-6 mb-6">
                           <div className="h-16 w-16 rounded-2xl bg-black flex items-center justify-center shadow-xl shrink-0">
                              <FaStore className="h-8 w-8 text-white" />
                           </div>
                           <div>
                              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                 Cam kết dịch vụ xuất sắc
                              </h2>
                              <p className="text-gray-500 text-sm mt-1">
                                 Tất cả quy định và chính sách được thiết kế để mang lại trải nghiệm
                                 mua sắm tốt nhất tại ZeionStore.
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                           {[
                              { label: 'Hỗ trợ khách hàng', value: '24/7' },
                              { label: 'Key hoạt động', value: '100%' },
                              { label: 'Giao key trung bình', value: '5 phút' },
                              { label: 'Đánh giá dịch vụ', value: '4.9/5' },
                           ].map((stat, index) => (
                              <div
                                 key={index}
                                 className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-black transition-all duration-300"
                              >
                                 <div className="text-xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                 </div>
                                 <div className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                                    {stat.label}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-white border border-gray-200 rounded-3xl p-8 min-w-65 shadow-lg text-center relative group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                           Tin cậy
                        </div>

                        <div className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">
                           95%
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                           Khách hàng hài lòng
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                           <div className="flex justify-center gap-1 mb-2 text-black">
                              {[...Array(5)].map((_, i) => (
                                 <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                              ))}
                           </div>
                           <p className="text-xs text-gray-400 italic">Dịch vụ đạt chuẩn 5 sao</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Categories */}
               <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Danh mục chính sách</h3>
                  <div className="flex flex-wrap gap-3">
                     {categories.map((category) => (
                        <button
                           key={category.id}
                           onClick={() => setActiveCategory(category.id)}
                           className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              activeCategory === category.id
                                 ? 'bg-black text-white border-black'
                                 : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                           }`}
                        >
                           <span>{category.name}</span>
                           <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                 activeCategory === category.id
                                    ? 'bg-white/20'
                                    : 'bg-gray-100 text-gray-600'
                              }`}
                           >
                              {category.count}
                           </span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Policies Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {filteredPolicies.map((policy) => {
                     const Icon = policy.icon;

                     return (
                        <div
                           key={policy.id}
                           className={`bg-white border rounded-2xl p-6 transition-all hover:shadow-sm ${
                              policy.important
                                 ? 'border-purple-200 bg-linear-to-br from-purple-50 to-white'
                                 : 'border-gray-200'
                           }`}
                        >
                           <div className="flex items-start gap-4 mb-4">
                              <div
                                 className={`h-12 w-12 rounded-full flex items-center justify-center ${
                                    policy.important
                                       ? 'bg-purple-100 text-purple-600'
                                       : 'bg-gray-100 text-gray-600'
                                 }`}
                              >
                                 <Icon className="h-6 w-6" />
                              </div>

                              <div className="flex-1">
                                 <div className="flex items-start justify-between">
                                    <div>
                                       <h3 className="text-lg font-semibold text-gray-900">
                                          {policy.title}
                                       </h3>
                                       <p className="text-sm text-gray-600 mt-1">
                                          {policy.description}
                                       </p>
                                    </div>
                                    {policy.important && (
                                       <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                                          Quan trọng
                                       </span>
                                    )}
                                 </div>

                                 <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                                    <FaCalendarAlt className="h-3 w-3" />
                                    <span>Cập nhật: {policy.lastUpdated}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-3">
                              {policy.details
                                 .slice(0, showAllDetails ? policy.details.length : 3)
                                 .map((detail, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                       <div
                                          className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                             policy.important
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-gray-100 text-gray-600'
                                          }`}
                                       >
                                          {detail.includes('Không') || detail.includes('không') ? (
                                             <FaTimesCircle className="h-3 w-3" />
                                          ) : (
                                             <FaCheckCircle className="h-3 w-3" />
                                          )}
                                       </div>
                                       <span className="text-sm text-gray-700">{detail}</span>
                                    </div>
                                 ))}
                           </div>

                           {policy.details.length > 3 && (
                              <button
                                 onClick={() => setShowAllDetails(!showAllDetails)}
                                 className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
                              >
                                 {showAllDetails
                                    ? 'Thu gọn'
                                    : `Xem thêm ${policy.details.length - 3} điều khoản`}
                              </button>
                           )}
                        </div>
                     );
                  })}
               </div>

               {/* Shipping Methods */}
               <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-semibold text-gray-900">Phương thức giao hàng</h3>
                     <div className="text-sm text-gray-500">
                        {shippingMethods.length} phương thức có sẵn
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {shippingMethods.map((method) => (
                        <div
                           key={method.id}
                           className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-all"
                        >
                           <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                 <FaShippingFast className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900">{method.name}</h4>
                                 <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-600">
                                       Thời gian: {method.deliveryTime}
                                    </span>
                                    <span className="text-sm font-medium text-green-600">
                                       {method.cost}
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <p className="text-sm text-gray-600 mb-4">{method.description}</p>

                           <div className="space-y-3">
                              <div>
                                 <div className="text-xs font-medium text-gray-700 mb-1">
                                    Khu vực áp dụng:
                                 </div>
                                 <div className="flex flex-wrap gap-1">
                                    {method.regions.map((region, idx) => (
                                       <span
                                          key={idx}
                                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                                       >
                                          {region}
                                       </span>
                                    ))}
                                 </div>
                              </div>

                              <div className="flex items-center justify-between">
                                 <div className="text-xs text-gray-600">
                                    {method.tracking ? '✓ Theo dõi đơn hàng' : 'Không theo dõi'}
                                 </div>
                                 <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                                    Xem chi tiết
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Support Channels */}
               <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-semibold text-gray-900">Kênh hỗ trợ khách hàng</h3>
                     <div className="text-sm text-gray-500">
                        {supportChannels.length} kênh hỗ trợ
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {supportChannels.map((channel) => {
                        const Icon = channel.icon;
                        return (
                           <div
                              key={channel.id}
                              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-all"
                           >
                              <div className="flex items-center gap-3 mb-3">
                                 <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Icon className="h-5 w-5" />
                                 </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                                    <div className="text-xs text-gray-500">
                                       {channel.responseTime}
                                    </div>
                                 </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-4">{channel.description}</p>

                              <div className="space-y-2">
                                 <div className="flex items-center justify-between text-xs text-gray-600">
                                    <span>Thời gian: {channel.hours}</span>
                                    <span className="px-2 py-0.5 bg-gray-100 rounded">
                                       {channel.id === 1 ? 'Nhanh nhất' : 'Chi tiết'}
                                    </span>
                                 </div>

                                 <div className="text-sm font-medium text-gray-900">
                                    {channel.contact.startsWith('/') ? (
                                       <a
                                          href={channel.contact}
                                          className="text-purple-600 hover:text-purple-800"
                                       >
                                          Truy cập ngay
                                       </a>
                                    ) : (
                                       <span className="break-all">{channel.contact}</span>
                                    )}
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>

               {/* Customer Rights & Responsibilities */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                  <div className="bg-linear-to-br from-green-50 to-white rounded-2xl border border-green-200 p-6">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                           <FaCheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                           Quyền lợi khách hàng
                        </h3>
                     </div>

                     <div className="space-y-3">
                        {[
                           'Được mua sắm trong môi trường an toàn, minh bạch',
                           'Được cung cấp thông tin sản phẩm đầy đủ, chính xác',
                           'Được hỗ trợ kỹ thuật và giải đáp thắc mắc',
                           'Được bảo vệ thông tin cá nhân và thanh toán',
                           'Được khiếu nại và phản hồi về chất lượng dịch vụ',
                           'Được hưởng các chương trình khuyến mãi công bằng',
                        ].map((right, idx) => (
                           <div key={idx} className="flex items-start gap-3">
                              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                 <FaCheckCircle className="h-3 w-3 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-700">{right}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-6">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                           <FaExclamationTriangle className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                           Trách nhiệm khách hàng
                        </h3>
                     </div>

                     <div className="space-y-3">
                        {[
                           'Cung cấp thông tin chính xác khi đăng ký và thanh toán',
                           'Bảo mật thông tin tài khoản, không chia sẻ với người khác',
                           'Tuân thủ các quy định về sử dụng key game hợp pháp',
                           'Thanh toán đầy đủ và đúng hạn cho đơn hàng',
                           'Sử dụng dịch vụ đúng mục đích, không gian lận',
                           'Tôn trọng nhân viên hỗ trợ và cộng đồng người dùng',
                        ].map((responsibility, idx) => (
                           <div key={idx} className="flex items-start gap-3">
                              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                 <FaExclamationTriangle className="h-3 w-3 text-blue-600" />
                              </div>
                              <span className="text-sm text-gray-700">{responsibility}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Service Level Agreement */}
               <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 mb-10">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaChartLine className="h-6 w-6 text-gray-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                           Cam kết mức độ dịch vụ (SLA)
                        </h3>
                        <p className="text-sm text-gray-600">WebStoreGame cam kết với khách hàng</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <div className="h-3 w-3 rounded-full bg-green-500"></div>
                           <span className="font-medium text-gray-900">Uptime 99.9%</span>
                        </div>
                        <p className="text-sm text-gray-600">
                           Hệ thống hoạt động 24/7 với độ ổn định cao
                        </p>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <div className="h-3 w-3 rounded-full bg-green-500"></div>
                           <span className="font-medium text-gray-900">Giao key trong 5 phút</span>
                        </div>
                        <p className="text-sm text-gray-600">
                           95% key được giao tự động trong 5 phút
                        </p>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <div className="h-3 w-3 rounded-full bg-green-500"></div>
                           <span className="font-medium text-gray-900">Phản hồi 24h</span>
                        </div>
                        <p className="text-sm text-gray-600">
                           Giải quyết 95% yêu cầu trong vòng 24 giờ
                        </p>
                     </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                     <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Bồi thường:</span> Nếu không đáp
                        ứng được SLA, khách hàng được bồi thường theo chính sách bồi thường dịch vụ.
                        Chi tiết tại:{' '}
                        <a href="/compensation" className="text-purple-600 hover:text-purple-800">
                           Chính sách bồi thường
                        </a>
                     </p>
                  </div>
               </div>

               {/* Update Policy & Contact */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Cập nhật chính sách
                     </h3>

                     <div className="space-y-4">
                        <div className="flex items-start gap-3">
                           <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                              <FaCalendarAlt className="h-5 w-5 text-yellow-600" />
                           </div>
                           <div>
                              <h4 className="font-medium text-gray-900 mb-1">Thông báo thay đổi</h4>
                              <p className="text-sm text-gray-600">
                                 Mọi thay đổi chính sách sẽ được thông báo qua email và trên trang
                                 web ít nhất 7 ngày trước khi có hiệu lực.
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start gap-3">
                           <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                              <FaCheckCircle className="h-5 w-5 text-green-600" />
                           </div>
                           <div>
                              <h4 className="font-medium text-gray-900 mb-1">Hiệu lực</h4>
                              <p className="text-sm text-gray-600">
                                 Chính sách có hiệu lực ngay khi được công bố. Việc tiếp tục sử dụng
                                 dịch vụ đồng nghĩa với việc chấp nhận chính sách mới.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6">
                     <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <FaStore className="h-6 w-6" />
                     </div>
                     <h3 className="text-xl font-bold mb-3">Cần giải đáp về chính sách?</h3>
                     <p className="text-purple-100 mb-6">
                        Đội ngũ hỗ trợ của WebStoreGame luôn sẵn sàng giải đáp mọi thắc mắc về chính
                        sách cửa hàng.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <a
                           href="/contact"
                           className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-center"
                        >
                           Liên hệ hỗ trợ
                        </a>
                        <a
                           href="/faq"
                           className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
                        >
                           Truy cập FAQ
                        </a>
                     </div>
                  </div>
               </div>

               {/* Final Note */}
               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                     Chính sách cửa hàng có hiệu lực từ ngày 01/01/2024 • Cập nhật lần cuối:{' '}
                     {new Date().toLocaleDateString('vi-VN')} • Phiên bản: 2.0.1
                  </p>
               </div>
            </div>
         </section>
      </>
   );
}
