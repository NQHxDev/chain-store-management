import Link from 'next/link';

export default function PrivacyPage() {
   return (
      <div className="min-h-screen bg-muted/10">
         <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Chính sách bảo mật</h1>

            <section className="space-y-6 text-gray-800 dark:text-gray-200">
               <p>
                  Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này giải thích cách
                  chúng tôi thu thập, sử dụng, và bảo vệ dữ liệu của người dùng.
               </p>

               <h2 className="text-xl font-semibold">1. Thông tin thu thập</h2>
               <p>Chúng tôi có thể thu thập các thông tin như:</p>
               <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Thông tin cá nhân: tên, email, tài khoản đăng nhập.</li>
                  <li>
                     Dữ liệu sử dụng: hoạt động trên trang web/ứng dụng, thời gian truy cập, tương
                     tác.
                  </li>
                  <li>Dữ liệu kỹ thuật: địa chỉ IP, loại thiết bị, trình duyệt.</li>
               </ul>

               <h2 className="text-xl font-semibold">2. Cách sử dụng thông tin</h2>
               <p>Thông tin của bạn được sử dụng để:</p>
               <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Cung cấp và cải thiện dịch vụ.</li>
                  <li>Gửi thông báo quan trọng hoặc cập nhật liên quan đến tài khoản.</li>
                  <li>Phân tích hành vi người dùng để nâng cao trải nghiệm.</li>
               </ul>

               <h2 className="text-xl font-semibold">3. Bảo mật dữ liệu</h2>
               <p>
                  Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ dữ liệu của
                  bạn, bao gồm mã hóa, kiểm soát truy cập và giám sát hệ thống. Tuy nhiên, không có
                  phương pháp truyền tải qua Internet hay lưu trữ điện tử nào hoàn toàn an toàn.
               </p>

               <h2 className="text-xl font-semibold">4. Chia sẻ thông tin</h2>
               <p>
                  Chúng tôi sẽ không bán, cho thuê, hoặc trao đổi thông tin cá nhân của bạn với bên
                  thứ ba mà không có sự đồng ý của bạn, trừ khi pháp luật yêu cầu.
               </p>

               <h2 className="text-xl font-semibold">5. Quyền của người dùng</h2>
               <p>Bạn có quyền:</p>
               <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Xem và chỉnh sửa thông tin cá nhân.</li>
                  <li>Yêu cầu xóa hoặc hạn chế xử lý dữ liệu cá nhân.</li>
                  <li>Rút lại sự đồng ý bất kỳ lúc nào.</li>
               </ul>

               <h2 className="text-xl font-semibold">6. Liên hệ</h2>
               <p>
                  Nếu bạn có câu hỏi hoặc khiếu nại về chính sách bảo mật, vui lòng liên hệ với
                  chúng tôi tại{' '}
                  <Link href="/contact" className="text-blue-600 underline">
                     trang liên hệ
                  </Link>
                  .
               </p>
            </section>
         </main>
      </div>
   );
}
