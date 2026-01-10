import Link from 'next/link';

export default function PrivacyPage() {
   return (
      <>
         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black text-center tracking-tight">
            Chính sách bảo mật
         </h1>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               <div className="bg-gray-50 border-l-4 border-black p-6 rounded-r-lg mb-8 shadow-sm">
                  <p className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                     Lưu ý quan trọng
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                     Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này giải thích
                     cách chúng tôi thu thập, sử dụng, và bảo vệ dữ liệu của người dùng tại
                     ZeionStore.
                  </p>
               </div>

               <div className="space-y-12">
                  {/* Section 1 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">1</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Thông tin thu thập
                                 </h2>
                                 <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                    Dữ liệu người dùng
                                 </span>
                              </div>
                           </div>

                           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                 <div className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                       <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                          <svg
                                             className="h-4 w-4 text-blue-600"
                                             fill="currentColor"
                                             viewBox="0 0 20 20"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-medium text-gray-900">
                                          Thông tin cá nhân
                                       </h3>
                                    </div>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                          Tên, email, tài khoản
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                          Số điện thoại
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                          Thông tin thanh toán
                                       </li>
                                    </ul>
                                 </div>

                                 <div className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                       <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                          <svg
                                             className="h-4 w-4 text-purple-600"
                                             fill="currentColor"
                                             viewBox="0 0 20 20"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017.13 10.1"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-medium text-gray-900">
                                          Dữ liệu sử dụng
                                       </h3>
                                    </div>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                          Hoạt động trên website
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                          Thời gian truy cập
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                          Tương tác với dịch vụ
                                       </li>
                                    </ul>
                                 </div>

                                 <div className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                       <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                          <svg
                                             className="h-4 w-4 text-green-600"
                                             fill="currentColor"
                                             viewBox="0 0 20 20"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-medium text-gray-900">
                                          Dữ liệu kỹ thuật
                                       </h3>
                                    </div>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                          Địa chỉ IP
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                          Loại thiết bị
                                       </li>
                                       <li className="flex items-center gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                          Trình duyệt sử dụng
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>

                           <p className="text-gray-600 italic text-sm">
                              * Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ tốt
                              nhất cho bạn.
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* Section 2 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">2</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Cách sử dụng thông tin
                                 </h2>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-linear-to-br from-green-50 to-white p-5 rounded-xl border border-green-200">
                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                       <svg
                                          className="h-6 w-6 text-green-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                       </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">
                                       Cung cấp dịch vụ
                                    </h3>
                                 </div>
                                 <p className="text-gray-600 text-sm">
                                    Sử dụng thông tin để tạo tài khoản, xác thực, và cung cấp đầy đủ
                                    tính năng của ZeionStore.
                                 </p>
                              </div>

                              <div className="bg-linear-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-200">
                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                       <svg
                                          className="h-6 w-6 text-blue-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                          />
                                       </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Gửi thông báo</h3>
                                 </div>
                                 <p className="text-gray-600 text-sm">
                                    Gửi thông báo quan trọng, cập nhật dịch vụ, và các thông tin
                                    liên quan đến tài khoản.
                                 </p>
                              </div>

                              <div className="bg-linear-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-200">
                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                       <svg
                                          className="h-6 w-6 text-purple-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                          />
                                       </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">
                                       Phân tích & Cải thiện
                                    </h3>
                                 </div>
                                 <p className="text-gray-600 text-sm">
                                    Phân tích hành vi người dùng để nâng cao trải nghiệm và cải
                                    thiện dịch vụ.
                                 </p>
                              </div>

                              <div className="bg-linear-to-br from-yellow-50 to-white p-5 rounded-xl border border-yellow-200">
                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                       <svg
                                          className="h-6 w-6 text-yellow-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                          />
                                       </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">
                                       Bảo mật & An toàn
                                    </h3>
                                 </div>
                                 <p className="text-gray-600 text-sm">
                                    Phát hiện và ngăn chặn các hoạt động gian lận, lạm dụng, và bảo
                                    vệ hệ thống.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 3 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div>
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">3</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Bảo mật dữ liệu
                                 </h2>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <p>
                                 Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo
                                 vệ dữ liệu của bạn:
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                       <svg
                                          className="h-5 w-5 text-red-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       <span className="font-medium text-gray-900">
                                          Mã hóa dữ liệu
                                       </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                       Sử dụng mã hóa SSL 256-bit cho mọi giao dịch
                                    </p>
                                 </div>

                                 <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                       <svg
                                          className="h-5 w-5 text-orange-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       <span className="font-medium text-gray-900">
                                          Kiểm soát truy cập
                                       </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                       Phân quyền nghiêm ngặt cho nhân viên
                                    </p>
                                 </div>

                                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                       <svg
                                          className="h-5 w-5 text-blue-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       <span className="font-medium text-gray-900">
                                          Giám sát hệ thống
                                       </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                       24/7 giám sát và phát hiện xâm nhập
                                    </p>
                                 </div>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                 <p className="text-sm text-gray-600 italic">
                                    <span className="font-medium">Lưu ý:</span> Không có phương pháp
                                    truyền tải qua Internet hay lưu trữ điện tử nào hoàn toàn an
                                    toàn. Chúng tôi không thể đảm bảo an toàn tuyệt đối nhưng cam
                                    kết áp dụng các biện pháp tốt nhất.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 4 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div>
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">4</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Chia sẻ thông tin
                                 </h2>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                 <div className="bg-purple-50 px-6 py-4 border-b border-purple-200">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                       <svg
                                          className="h-5 w-5 text-purple-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       Cam kết của chúng tôi
                                    </h3>
                                 </div>
                                 <div className="p-6">
                                    <p className="mb-4">
                                       <span className="font-medium text-gray-900">
                                          Chúng tôi sẽ không:
                                       </span>{' '}
                                       Bán, cho thuê, hoặc trao đổi thông tin cá nhân của bạn với
                                       bên thứ ba vì mục đích quảng cáo mà không có sự đồng ý rõ
                                       ràng của bạn.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                          <h4 className="font-medium text-gray-900 mb-2">
                                             Chia sẻ khi được đồng ý
                                          </h4>
                                          <ul className="space-y-1 text-sm text-gray-600">
                                             <li className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                Khi bạn đồng ý rõ ràng
                                             </li>
                                             <li className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                Với đối tác cung cấp dịch vụ
                                             </li>
                                          </ul>
                                       </div>

                                       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                          <h4 className="font-medium text-gray-900 mb-2">
                                             Chia sẻ theo yêu cầu pháp luật
                                          </h4>
                                          <ul className="space-y-1 text-sm text-gray-600">
                                             <li className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                Theo yêu cầu của cơ quan pháp luật
                                             </li>
                                             <li className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                Để bảo vệ quyền lợi của chúng tôi
                                             </li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 5 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">5</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Quyền của người dùng
                                 </h2>
                              </div>
                           </div>

                           <div className="mb-6">
                              <p className="mb-4">
                                 Bạn có toàn quyền kiểm soát thông tin cá nhân của mình:
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                 <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-indigo-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                             />
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">
                                          Quyền truy cập
                                       </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                       Xem và tải xuống thông tin cá nhân của bạn trong tài khoản.
                                    </p>
                                 </div>

                                 <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-indigo-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">
                                          Quyền chỉnh sửa
                                       </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                       Cập nhật và chỉnh sửa thông tin cá nhân bất kỳ lúc nào.
                                    </p>
                                 </div>

                                 <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-indigo-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">Quyền xóa</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                       Yêu cầu xóa hoặc hạn chế xử lý dữ liệu cá nhân.
                                    </p>
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-indigo-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">
                                          Rút lại đồng ý
                                       </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                       Rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào.
                                    </p>
                                 </div>

                                 <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-indigo-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">Khiếu nại</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                       Quyền khiếu nại với cơ quan bảo vệ dữ liệu nếu cần.
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                              <p className="text-sm text-gray-700">
                                 <span className="font-medium text-indigo-900">
                                    Cách thực hiện:
                                 </span>{' '}
                                 Để thực hiện các quyền trên, vui lòng truy cập trang cài đặt tài
                                 khoản hoặc liên hệ với bộ phận hỗ trợ của chúng tôi.
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 6 */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div>
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">6</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Liên hệ & Hỗ trợ
                                 </h2>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <p>
                                 Nếu bạn có câu hỏi, thắc mắc hoặc khiếu nại về chính sách bảo mật,
                                 vui lòng liên hệ với chúng tôi:
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                       <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                          <svg
                                             className="h-6 w-6 text-blue-600"
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
                                       </div>
                                       <div>
                                          <h3 className="font-semibold text-gray-900 mb-1">
                                             Email hỗ trợ
                                          </h3>
                                          <p className="text-gray-600">Gửi yêu cầu đến địa chỉ:</p>
                                          <a
                                             href="mailto:support@zeionstore.com"
                                             className="text-blue-600 hover:text-blue-800 font-medium inline-block mt-1"
                                          >
                                             support@zeionstore.com
                                          </a>
                                       </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                       Phản hồi trong vòng 24 giờ làm việc
                                    </p>
                                 </div>

                                 <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                       <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                          <svg
                                             className="h-6 w-6 text-green-600"
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
                                       </div>
                                       <div>
                                          <h3 className="font-semibold text-gray-900 mb-1">
                                             Trang liên hệ
                                          </h3>
                                          <p className="text-gray-600">Sử dụng biểu mẫu liên hệ:</p>
                                          <Link
                                             href="/contact"
                                             className="text-blue-600 hover:text-blue-800 font-medium inline-block mt-1"
                                          >
                                             Truy cập trang liên hệ
                                          </Link>
                                       </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                       Xử lý yêu cầu nhanh chóng và hiệu quả
                                    </p>
                                 </div>
                              </div>

                              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                 <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <svg
                                       className="h-5 w-5 text-gray-600"
                                       fill="currentColor"
                                       viewBox="0 0 20 20"
                                    >
                                       <path
                                          fillRule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                          clipRule="evenodd"
                                       />
                                    </svg>
                                    Thông tin bổ sung
                                 </h3>
                                 <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                                       <span>
                                          Chính sách này được cập nhật lần cuối vào:{' '}
                                          {new Date().toLocaleDateString('vi-VN')}
                                       </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                                       <span>
                                          Chúng tôi sẽ thông báo qua email nếu có thay đổi quan
                                          trọng
                                       </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                                       <span>
                                          Vui lòng thường xuyên kiểm tra trang này để cập nhật
                                       </span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               {/* Agreement Box */}
               <div className="mt-12 bg-linear-to-r from-gray-900 to-black text-white rounded-2xl p-8 text-center">
                  <div className="max-w-2xl mx-auto">
                     <h3 className="text-xl font-bold mb-4">
                        Bạn có hài lòng với chính sách bảo mật của chúng tôi không?
                     </h3>
                     <p className="text-sm text-gray-300 mb-6">
                        Bằng việc tiếp tục sử dụng ZeionStore, bạn xác nhận đã đọc, hiểu và đồng ý
                        với Chính sách Bảo mật này.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                           Tôi đồng ý
                        </button>
                        <Link
                           href="/contact"
                           className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                        >
                           Cần hỗ trợ thêm?
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
