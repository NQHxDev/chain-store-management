interface FAQItem {
   id: number;
   question: string;
   answer: string;
   category: string;
   tags: string[];
   popularity: number;
   updatedAt: string;
}

const faqItems: FAQItem[] = [
   {
      id: 1,
      question: 'Làm thế nào để đăng ký tài khoản ZeionStore?',
      answer:
         'Để đăng ký tài khoản:\n1. Nhấp vào nút "Đăng ký" ở góc trên bên phải\n2. Nhập email, tên người dùng và mật khẩu\n3. Xác nhận email qua liên kết được gửi\n4. Hoàn thiện thông tin cá nhân (tuỳ chọn)\n\nSau khi đăng ký, bạn có thể nạp tiền và mua game ngay lập tức.',
      category: 'account',
      tags: ['đăng ký', 'tài khoản', 'bắt đầu'],
      popularity: 95,
      updatedAt: '2024-01-15',
   },
   {
      id: 2,
      question: 'Các phương thức thanh toán nào được chấp nhận?',
      answer:
         'ZeionStore hỗ trợ đa dạng phương thức thanh toán:\n\n💳 **Thẻ ngân hàng:**\n- Thẻ Visa/Mastercard\n- Thẻ ATM nội địa (Napas)\n- Thẻ tín dụng\n\n📱 **Ví điện tử:**\n- MoMo\n- ZaloPay\n- ViettelPay\n- ShopeePay\n\n🎫 **Khác:**\n- Chuyển khoản ngân hàng\n- Thẻ cào điện thoại\n- QR Code\n\nTất cả giao dịch được bảo mật bằng SSL 256-bit.',
      category: 'payment',
      tags: ['thanh toán', 'tiền', 'nạp'],
      popularity: 88,
      updatedAt: '2024-01-20',
   },
   {
      id: 3,
      question: 'Mất bao lâu để nhận game sau khi thanh toán?',
      answer:
         'Thời gian nhận game phụ thuộc vào phương thức thanh toán:\n\n⚡ **Tức thì (1-5 phút):**\n- Thẻ ngân hàng\n- Ví điện tử\n- Chuyển khoản tự động\n\n⏰ **Từ 5-15 phút:**\n- Thẻ cào điện thoại\n- Chuyển khoản thủ công\n\n📦 **Key vật lý:** Từ 24-48 giờ (tuỳ khu vực)\n\nSau khi thanh toán thành công, key game sẽ hiển thị trong mục "Thư viện game" của bạn. Bạn cũng sẽ nhận được email xác nhận.',
      category: 'delivery',
      tags: ['thời gian', 'nhận game', 'key'],
      popularity: 92,
      updatedAt: '2024-01-18',
   },
   {
      id: 4,
      question: 'Tôi có thể hoàn tiền nếu không hài lòng với game?',
      answer:
         'Chính sách hoàn tiền của ZeionStore:\n\n✅ **Được hoàn tiền:**\n- Game không thể kích hoạt (do lỗi hệ thống)\n- Mua nhầm game (trong vòng 2 giờ)\n- Game có vấn đề kỹ thuật nghiêm trọng\n\n❌ **Không được hoàn tiền:**\n- Đã kích hoạt thành công\n- Đã chơi quá 2 giờ\n- Không thích gameplay/đồ hoạ\n- Yêu cầu sau 14 ngày mua\n\nĐể yêu cầu hoàn tiền, vào mục "Đơn hàng" → Chọn đơn cần hoàn → Nhấp "Yêu cầu hoàn tiền".',
      category: 'refund',
      tags: ['hoàn tiền', 'chính sách', 'bảo hành'],
      popularity: 76,
      updatedAt: '2024-01-10',
   },
   {
      id: 5,
      question: 'Làm thế nào để kích hoạt key game Steam/Epic Games?',
      answer:
         'Hướng dẫn kích hoạt key game:\n\n🎮 **Steam:**\n1. Mở Steam client\n2. Vào "Games" → "Activate a Product on Steam"\n3. Nhập key và làm theo hướng dẫn\n\n🕹️ **Epic Games:**\n1. Truy cập epicgames.com\n2. Đăng nhập tài khoản\n3. Vào "Account" → "Redeem Code"\n4. Nhập key và xác nhận\n\n🎯 **Origin/EA:**\n1. Mở Origin client\n2. Vào "Origin" → "Redeem Product Code"\n\n🔑 **Key trực tiếp:** Một số game có thể kích hoạt trực tiếp trên trang web của nhà phát hành.',
      category: 'activation',
      tags: ['kích hoạt', 'steam', 'key'],
      popularity: 85,
      updatedAt: '2024-01-22',
   },
   {
      id: 6,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
   {
      id: 7,
      question: 'Làm thế nào để đổi mật khẩu tài khoản?',
      answer:
         'Để đổi mật khẩu:\n\n1. Đăng nhập vào ZeionStore\n2. Click vào avatar → "Thông tin tài khoản"\n3. Chọn tab "Bảo mật"\n4. Nhập mật khẩu cũ và mật khẩu mới\n5. Xác nhận thay đổi\n\n🔐 **Lưu ý:**\n- Mật khẩu phải có ít nhất 8 ký tự\n- Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt\n- Không sử dụng mật khẩu cũ đã từng dùng\n- Nên bật xác thực 2 lớp để tăng bảo mật\n\nNếu quên mật khẩu, nhấp "Quên mật khẩu" ở trang đăng nhập.',
      category: 'account',
      tags: ['mật khẩu', 'bảo mật', 'đổi'],
      popularity: 72,
      updatedAt: '2024-01-16',
   },
   {
      id: 8,
      question: 'Key game có thời hạn sử dụng không?',
      answer:
         'Thời hạn key game phụ thuộc vào từng game:\n\n✅ **Không có thời hạn (Most):**\n- Hầu hết key game trên ZeionStore\n- Có thể kích hoạt bất kỳ lúc nào\n- Không bị mất sau khi mua\n\n⏳ **Có thời hạn (Rare):**\n- Một số game khuyến mãi đặc biệt\n- Key quà tặng theo sự kiện\n- Sẽ được thông báo rõ khi mua\n\n📅 **Kiểm tra thời hạn:**\n- Xem trong email xác nhận\n- Kiểm tra trong mục "Thư viện game"\n- Thời hạn luôn được hiển thị rõ trước khi mua\n\nNếu key hết hạn, liên hệ hỗ trợ để được hỗ trợ.',
      category: 'delivery',
      tags: ['thời hạn', 'key', 'expiry'],
      popularity: 63,
      updatedAt: '2024-01-14',
   },
   {
      id: 9,
      question: 'Làm thế nào để liên hệ hỗ trợ khẩn cấp?',
      answer:
         'Các kênh hỗ trợ khẩn cấp:\n\n📞 **Hotline:** +84 966 376 155\n- Thời gian: 24/7\n- Hỗ trợ: Thanh toán, tài khoản bị khóa\n\n💬 **Chat trực tiếp:**\n- Nhấp icon chat góc phải màn hình\n- Thời gian: 8:00 - 22:00 hàng ngày\n- Phản hồi trong 5 phút\n\n📧 **Email khẩn:** urgent@ZeionStore.com\n- Tiêu đề: [KHẨN] + Vấn đề\n- Kèm thông tin đơn hàng/tài khoản\n\n🆘 **Vấn đề khẩn cấp được ưu tiên:**\n- Giao dịch thất bại nhưng bị trừ tiền\n- Tài khoản bị xâm nhập\n- Mua game nhưng không nhận được key',
      category: 'support',
      tags: ['hỗ trợ', 'liên hệ', 'khẩn cấp'],
      popularity: 80,
      updatedAt: '2024-01-19',
   },
   {
      id: 10,
      question: 'Có chính sách giảm giá cho mua số lượng lớn không?',
      answer:
         'ZeionStore có chính sách ưu đãi cho mua số lượng lớn:\n\n🎁 **Mua từ 5 game:** Giảm 5%\n🎁 **Mua từ 10 game:** Giảm 10%\n🎁 **Mua từ 20 game:** Giảm 15%\n\n💼 **Đối tác/Doanh nghiệp:**\n- Mua số lượng lớn cho nhân viên/sự kiện\n- Hỗ trợ thanh toán hoá đơn\n- Có thể đặt hàng custom bundle\n\n📞 **Liên hệ đặt số lượng lớn:**\n- Email: wholesale@ZeionStore.com\n- SĐT: 028 9999 8888\n- Yêu cầu có tên công ty và số lượng dự kiến\n\nƯu đãi tự động áp dụng khi thêm game vào giỏ hàng.',
      category: 'pricing',
      tags: ['giảm giá', 'số lượng', 'ưu đãi'],
      popularity: 59,
      updatedAt: '2024-01-13',
   },
   {
      id: 11,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
   {
      id: 12,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
   {
      id: 13,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
   {
      id: 14,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
   {
      id: 15,
      question: 'Tôi có thể chia sẻ tài khoản với người khác không?',
      answer:
         '❌ **Không, tuyệt đối không chia sẻ tài khoản.**\n\nTheo Điều khoản sử dụng:\n- Mỗi tài khoản chỉ thuộc sở hữu của 1 người\n- Chia sẻ tài khoản vi phạm điều khoản\n- Có thể dẫn đến khóa tài khoản vĩnh viễn\n\n🔒 **Lý do bảo mật:**\n- Rủi ro mất tài khoản\n- Mất thông tin cá nhân\n- Mất toàn bộ game đã mua\n- Không thể khôi phục nếu bị hack\n\nMỗi tài khoản có thể đăng nhập trên tối đa 3 thiết bị khác nhau.',
      category: 'account',
      tags: ['chia sẻ', 'bảo mật', 'tài khoản'],
      popularity: 68,
      updatedAt: '2024-01-12',
   },
];

export default faqItems;
