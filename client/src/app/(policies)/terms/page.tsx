import Link from 'next/link';

export default function TermsPage() {
   return (
      <div className="min-h-screen bg-muted/10">
         <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Điều khoản sử dụng</h1>

            <section className="space-y-6 text-gray-800 dark:text-gray-200">
               <p>
                  Chào mừng bạn đến với dịch vụ của chúng tôi. Khi bạn sử dụng ứng dụng hoặc trang
                  web, bạn đồng ý tuân theo các điều khoản và điều kiện sau đây.
               </p>

               <h2 className="text-xl font-semibold">1. Sử dụng dịch vụ</h2>
               <p>
                  Người dùng phải sử dụng dịch vụ một cách hợp pháp, không vi phạm pháp luật, và
                  không gây hại đến người khác. Mọi hành vi lạm dụng, gian lận hoặc spam đều bị
                  nghiêm cấm.
               </p>

               <h2 className="text-xl font-semibold">2. Tài khoản và bảo mật</h2>
               <p>
                  Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình. Mọi hoạt động xảy ra
                  dưới tài khoản của bạn được coi là do bạn thực hiện.
               </p>

               <h2 className="text-xl font-semibold">3. Quyền sở hữu trí tuệ</h2>
               <p>
                  Nội dung, hình ảnh, và mã nguồn trên trang web/ứng dụng thuộc quyền sở hữu của
                  chúng tôi và được bảo vệ bởi luật bản quyền.
               </p>

               <h2 className="text-xl font-semibold">4. Thay đổi điều khoản</h2>
               <p>
                  Chúng tôi có quyền cập nhật điều khoản bất cứ lúc nào. Mọi thay đổi sẽ được thông
                  báo trên trang này. Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp
                  nhận các điều khoản mới.
               </p>

               <h2 className="text-xl font-semibold">5. Liên hệ</h2>
               <p>
                  Nếu bạn có bất kỳ thắc mắc nào về điều khoản, vui lòng liên hệ với chúng tôi tại{' '}
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
