import Link from 'next/link';

export default function TermsPage() {
   return (
      <>
         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black text-center tracking-tight">
            Điều khoản sử dụng
         </h1>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               <div className="bg-gray-50 border-l-4 border-black p-6 rounded-r-lg mb-8 shadow-sm">
                  <p className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                     Chào mừng đến với ZeionStore
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                     Khi bạn sử dụng ứng dụng hoặc trang web, bạn đồng ý tuân theo các điều khoản và
                     điều kiện sau đây.
                  </p>
               </div>

               <div className="space-y-12">
                  {/* Section 1 - Sử dụng dịch vụ */}
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
                                    Sử dụng dịch vụ
                                 </h2>
                              </div>
                           </div>

                           <div className="mb-4">
                              <p className="mb-3">
                                 Người dùng phải sử dụng dịch vụ một cách hợp pháp, không vi phạm
                                 pháp luật, và không gây hại đến người khác.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                 <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                       <svg
                                          className="h-5 w-5 text-red-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       Hành vi bị cấm
                                    </h3>
                                    <ul className="space-y-2">
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Gian lận, lừa đảo trong giao dịch
                                          </span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Spam, gửi nội dung độc hại
                                          </span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Tấn công hoặc làm gián đoạn hệ thống
                                          </span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Chia sẻ tài khoản trái phép
                                          </span>
                                       </li>
                                    </ul>
                                 </div>

                                 <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                       <svg
                                          className="h-5 w-5 text-green-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                       Hành vi được khuyến khích
                                    </h3>
                                    <ul className="space-y-2">
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Sử dụng dịch vụ đúng mục đích
                                          </span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Báo cáo lỗi, đề xuất cải tiến
                                          </span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                                          <span className="text-sm text-gray-700">
                                             Tôn trọng người dùng khác
                                          </span>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <p className="text-sm text-gray-700">
                                 <span className="font-medium text-yellow-900 mr-0.5">
                                    Hậu quả:
                                 </span>
                                 Vi phạm các điều khoản có thể dẫn đến khóa tài khoản tạm thời hoặc
                                 vĩnh viễn, tùy theo mức độ vi phạm.
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 2 - Tài khoản và bảo mật */}
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
                                    Tài khoản và bảo mật
                                 </h2>
                              </div>
                           </div>

                           <div className="mb-6">
                              <p className="mb-4">
                                 Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình. Mọi hoạt
                                 động xảy ra dưới tài khoản của bạn được coi là do bạn thực hiện.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                 <div className="bg-white border border-purple-200 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-purple-600"
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
                                          Bảo mật tài khoản
                                       </h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                                          <span>Không chia sẻ mật khẩu</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                                          <span>Sử dụng mật khẩu mạnh</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                                          <span>Đổi mật khẩu định kỳ</span>
                                       </li>
                                    </ul>
                                 </div>

                                 <div className="bg-white border border-blue-200 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-blue-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                             />
                                          </svg>
                                       </div>
                                       <h3 className="font-semibold text-gray-900">Trách nhiệm</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                          <span>Bạn chịu trách nhiệm với mọi hoạt động</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                          <span>Báo cáo ngay nếu bị xâm nhập</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                          <span>Không chuyển nhượng tài khoản</span>
                                       </li>
                                    </ul>
                                 </div>

                                 <div className="bg-white border border-green-200 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                       <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                          <svg
                                             className="h-5 w-5 text-green-600"
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
                                       <h3 className="font-semibold text-gray-900">Xác thực</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                          <span>Kích hoạt xác thực 2 lớp</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                          <span>Cập nhật thông tin chính xác</span>
                                       </li>
                                       <li className="flex items-start gap-2">
                                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                          <span>Giữ liên lạc email luôn hoạt động</span>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                                 <svg
                                    className="h-5 w-5 text-blue-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                                 Lưu ý quan trọng
                              </h4>
                              <p className="text-sm text-gray-700">
                                 Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
                                 từ việc bạn không bảo mật thông tin tài khoản hoặc chia sẻ thông
                                 tin đăng nhập.
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 3 - Quyền sở hữu trí tuệ */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">3</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Quyền sở hữu trí tuệ
                                 </h2>
                              </div>
                           </div>

                           <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden mb-4">
                              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-200">
                                 <h3 className="font-semibold text-gray-900">
                                    Tài sản trí tuệ của ZeionStore
                                 </h3>
                              </div>
                              <div className="p-6">
                                 <p className="mb-4">
                                    Tất cả nội dung, hình ảnh, logo, giao diện, và mã nguồn trên
                                    trang web/ứng dụng thuộc quyền sở hữu của ZeionStore và được bảo
                                    vệ bởi luật bản quyền Việt Nam và quốc tế.
                                 </p>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                       <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                          <svg
                                             className="h-4 w-4 text-indigo-600"
                                             fill="currentColor"
                                             viewBox="0 0 20 20"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                          Bạn được phép
                                       </h4>
                                       <ul className="space-y-2 text-sm text-gray-600">
                                          <li className="flex items-start gap-2">
                                             <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                             <span>Sử dụng dịch vụ cho mục đích cá nhân</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                             <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                             <span>Chia sẻ liên kết đến trang web</span>
                                          </li>
                                       </ul>
                                    </div>

                                    <div className="space-y-3">
                                       <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                          <svg
                                             className="h-4 w-4 text-red-600"
                                             fill="currentColor"
                                             viewBox="0 0 20 20"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                          Bạn không được phép
                                       </h4>
                                       <ul className="space-y-2 text-sm text-gray-600">
                                          <li className="flex items-start gap-2">
                                             <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                             <span>Sao chép, phân phối nội dung trái phép</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                             <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                             <span>Reverse engineer mã nguồn</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                             <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                             <span>
                                                Sử dụng thương hiệu cho mục đích thương mại
                                             </span>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <p className="text-sm text-gray-700">
                                 <span className="font-medium text-yellow-900 mr-0.5">
                                    Vi phạm bản quyền:
                                 </span>
                                 Mọi hành vi vi phạm quyền sở hữu trí tuệ sẽ bị xử lý theo pháp luật
                                 và có thể dẫn đến các biện pháp pháp lý.
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 4 - Thay đổi điều khoản */}
                  <section>
                     <div className="flex items-start gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-4 mb-5">
                              <div className="shrink-0">
                                 <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-sm">4</span>
                                 </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                 <h2 className="text-2xl font-bold text-black tracking-tight">
                                    Thay đổi điều khoản
                                 </h2>
                              </div>
                           </div>

                           <div className="bg-white border border-orange-200 rounded-xl p-6 mb-4">
                              <div className="flex items-start gap-4">
                                 <div className="shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                       <svg
                                          className="h-6 w-6 text-orange-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                       </svg>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="mb-3">
                                       Chúng tôi có quyền cập nhật điều khoản bất cứ lúc nào. Mọi
                                       thay đổi sẽ được thông báo trên trang này và qua email đăng
                                       ký.
                                    </p>
                                    <p className="text-sm text-gray-600">
                                       Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng
                                       nghĩa với việc bạn chấp nhận các điều khoản mới.
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                 <h4 className="font-medium text-gray-900 mb-2">
                                    Thông báo thay đổi
                                 </h4>
                                 <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Thông báo qua email đăng ký</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Hiển thị thông báo trên website</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Cập nhật ngày sửa đổi trên trang</span>
                                    </li>
                                 </ul>
                              </div>

                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                 <h4 className="font-medium text-gray-900 mb-2">
                                    Trách nhiệm của bạn
                                 </h4>
                                 <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Thường xuyên kiểm tra trang này</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Đảm bảo email liên lạc hoạt động</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5"></div>
                                       <span>Ngừng sử dụng nếu không đồng ý</span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* Section 5 - Liên hệ */}
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
                                    Liên hệ
                                 </h2>
                              </div>
                           </div>

                           <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 mb-4">
                              <p className="mb-4">
                                 Nếu bạn có bất kỳ thắc mắc, góp ý hoặc khiếu nại về Điều khoản sử
                                 dụng, vui lòng liên hệ với chúng tôi:
                              </p>

                              <div className="flex flex-col sm:flex-row gap-4">
                                 <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
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
                                 </Link>

                                 <a
                                    href="mailto:support@zeionstore.com"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
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
                                    Gửi email hỗ trợ
                                 </a>
                              </div>
                           </div>

                           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-medium text-blue-900 mb-2">Thời gian phản hồi</h4>
                              <p className="text-sm text-gray-700">
                                 Chúng tôi cam kết phản hồi mọi thắc mắc trong vòng 48 giờ làm việc.
                                 Đối với các vấn đề khẩn cấp, vui lòng gọi hotline:{' '}
                                 <span className="font-medium">+84 966 376 155</span>
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               {/* Final Agreement */}
               <div className="mt-12 text-center">
                  <div className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-2xl">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Xác nhận đồng ý</h3>
                     <p className="text-gray-600 mb-6">
                        Bằng việc tiếp tục sử dụng ZeionStore, bạn xác nhận rằng:
                     </p>

                     <div className="space-y-3 mb-6 text-left">
                        <div className="flex items-start gap-3">
                           <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                              <svg
                                 className="h-3 w-3 text-green-600"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                           <span className="text-gray-700">
                              Bạn đã đọc và hiểu toàn bộ Điều khoản sử dụng
                           </span>
                        </div>
                        <div className="flex items-start gap-3">
                           <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                              <svg
                                 className="h-3 w-3 text-green-600"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                           <span className="text-gray-700">
                              Bạn đồng ý tuân theo tất cả các điều khoản và điều kiện
                           </span>
                        </div>
                        <div className="flex items-start gap-3">
                           <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                              <svg
                                 className="h-3 w-3 text-green-600"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                           <span className="text-gray-700">
                              Bạn đủ 18 tuổi hoặc có sự đồng ý của người giám hộ
                           </span>
                        </div>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                           Tôi đồng ý và tiếp tục
                        </button>
                        <Link
                           href="/contact"
                           className="px-8 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                           Tôi có câu hỏi
                        </Link>
                     </div>

                     <p className="text-xs text-gray-500 mt-4">
                        Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng dịch
                        vụ ngay lập tức.
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
