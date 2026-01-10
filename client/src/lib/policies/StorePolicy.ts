export interface StorePolicy {
   id: number;
   category: string;
   title: string;
   description: string;
   details: string[];
   icon: string;
   lastUpdated: string;
   important: boolean;
}

export interface ShippingMethod {
   id: number;
   name: string;
   deliveryTime: string;
   cost: string;
   description: string;
   regions: string[];
   tracking: boolean;
}

export interface SupportChannel {
   id: number;
   name: string;
   description: string;
   responseTime: string;
   hours: string;
   icon: string;
   contact: string;
}

const storePolicies: StorePolicy[] = [
   {
      id: 1,
      category: 'mua-hang',
      title: 'Chính sách mua hàng',
      description: 'Quy định về quy trình mua hàng và thanh toán tại ZeionStore',
      details: [
         'Độ tuổi tối thiểu: 13 tuổi (có sự đồng ý của phụ huynh nếu dưới 18)',
         'Mỗi tài khoản chỉ được sở hữu bởi một người duy nhất',
         'Không mua hàng với mục đích đầu cơ, kinh doanh lại',
         'Cam kết thanh toán đầy đủ và đúng hạn',
         'Chấp nhận mọi hình thức thanh toán hợp pháp tại Việt Nam',
      ],
      // icon: <FaShoppingCart className="h-6 w-6" />,
      icon: 'FaShoppingCart',
      lastUpdated: '2024-01-22',
      important: true,
   },
   {
      id: 2,
      category: 'giao-nhan',
      title: 'Chính sách giao nhận',
      description: 'Quy định về thời gian và phương thức giao nhận sản phẩm',
      details: [
         'Giao key game điện tử ngay sau khi thanh toán thành công',
         'Thời gian giao key: 1-5 phút (tự động), 5-15 phút (thủ công)',
         'Key sẽ được gửi qua email và lưu trong mục "Thư viện game"',
         'Không giao hàng vật lý trừ khi có thông báo đặc biệt',
         'Chịu trách nhiệm giao key chính xác và đầy đủ',
      ],
      icon: 'FaShippingFast',
      lastUpdated: '2024-01-20',
      important: true,
   },
   {
      id: 3,
      category: 'bao-hanh',
      title: 'Chính sách bảo hành',
      description: 'Cam kết về chất lượng và hỗ trợ kỹ thuật sản phẩm',
      details: [
         'Bảo hành key game: 30 ngày kể từ ngày mua',
         'Hỗ trợ kích hoạt trong vòng 7 ngày làm việc',
         'Hoàn tiền nếu key không thể kích hoạt (xem chính sách hoàn tiền)',
         'Không bảo hành lỗi do người dùng hoặc hệ thống bên thứ ba',
         'Hỗ trợ kỹ thuật cơ bản cho vấn đề kích hoạt',
      ],
      icon: 'FaShieldAlt',
      lastUpdated: '2024-01-18',
      important: true,
   },
   {
      id: 4,
      category: 'doi-tra',
      title: 'Chính sách đổi trả',
      description: 'Quy định về việc đổi trả sản phẩm không đúng hoặc lỗi',
      details: [
         'Đổi key trong vòng 2 giờ nếu mua nhầm sản phẩm',
         'Không đổi trả sau khi key đã được kích hoạt thành công',
         'Chỉ đổi trả khi key không thể kích hoạt (có bằng chứng)',
         'Mỗi tài khoản tối đa 3 lần đổi trả/năm',
         'Thời gian xử lý đổi trả: 1-3 ngày làm việc',
      ],
      icon: 'FaBoxOpen',
      lastUpdated: '2024-01-16',
      important: true,
   },
   {
      id: 5,
      category: 'khuyen-mai',
      title: 'Chính sách khuyến mãi',
      description: 'Quy định về các chương trình khuyến mãi và ưu đãi',
      details: [
         'Mỗi mã khuyến mãi chỉ sử dụng được một lần/tài khoản',
         'Không cộng dồn nhiều mã khuyến mãi trong một đơn hàng',
         'Áp dụng tùy thuộc vào điều kiện cụ thể của từng chương trình',
         'ZeionStore có quyền hủy mã khuyến mãi nếu phát hiện lạm dụng',
         'Không hoàn tiền chênh lệch sau khi sử dụng mã khuyến mãi',
      ],
      icon: 'FaTag',
      lastUpdated: '2024-01-14',
      important: false,
   },
   {
      id: 6,
      category: 'quyen-loi',
      title: 'Quyền lợi thành viên',
      description: 'Các quyền lợi đặc biệt dành cho khách hàng thân thiết',
      details: [
         'Tích điểm cho mỗi đơn hàng (1 điểm/10.000đ)',
         'Đổi điểm lấy voucher giảm giá',
         'Ưu tiên tham gia các chương trình khuyến mãi đặc biệt',
         'Nhận thông báo sớm về game mới và deal hot',
         'Hỗ trợ ưu tiên từ đội ngũ chăm sóc khách hàng',
      ],
      icon: 'FaGift',
      lastUpdated: '2024-01-12',
      important: false,
   },
   {
      id: 7,
      category: 'bao-mat',
      title: 'Bảo mật giao dịch',
      description: 'Cam kết về an toàn và bảo mật thông tin giao dịch',
      details: [
         'Mã hóa SSL 256-bit cho mọi giao dịch thanh toán',
         'Không lưu trữ thông tin thẻ tín dụng/ghi nợ',
         'Xác thực 2 lớp cho giao dịch lớn (>5.000.000đ)',
         'Giám sát 24/7 để phát hiện gian lận',
         'Báo cáo ngay nếu phát hiện giao dịch đáng ngờ',
      ],
      icon: 'FaShieldAlt',
      lastUpdated: '2024-01-10',
      important: true,
   },
   {
      id: 8,
      category: 'ho-tro',
      title: 'Chính sách hỗ trợ',
      description: 'Cam kết về chất lượng dịch vụ hỗ trợ khách hàng',
      details: [
         'Hỗ trợ 24/7 qua chat trực tiếp và email',
         'Thời gian phản hồi: 15 phút (chat), 24 giờ (email)',
         'Đội ngũ hỗ trợ chuyên nghiệp, am hiểu sản phẩm',
         'Hỗ trợ đa ngôn ngữ: Tiếng Việt, Tiếng Anh',
         'Giải quyết 95% yêu cầu trong vòng 24 giờ',
      ],
      icon: 'FaHeadset',
      lastUpdated: '2024-01-08',
      important: true,
   },
];

const shippingMethods: ShippingMethod[] = [
   {
      id: 1,
      name: 'Giao hàng tức thì',
      deliveryTime: '1-5 phút',
      cost: 'Miễn phí',
      description: 'Key game được gửi tự động ngay sau khi thanh toán',
      regions: ['Toàn quốc'],
      tracking: true,
   },
   {
      id: 2,
      name: 'Giao hàng nhanh',
      deliveryTime: '5-15 phút',
      cost: 'Miễn phí',
      description: 'Key game được xử lý thủ công trong giờ làm việc',
      regions: ['Toàn quốc'],
      tracking: true,
   },
   {
      id: 3,
      name: 'Giao hàng vật lý',
      deliveryTime: '2-5 ngày',
      cost: 'Theo đơn vị vận chuyển',
      description: 'Áp dụng cho gift card vật lý và sản phẩm đặc biệt',
      regions: ['Hà Nội', 'TP.HCM', 'Đà Nẵng'],
      tracking: true,
   },
];

const supportChannels: SupportChannel[] = [
   {
      id: 1,
      name: 'Chat trực tiếp',
      description: 'Hỗ trợ nhanh chóng, giải đáp ngay lập tức',
      responseTime: '2-5 phút',
      hours: '24/7',
      icon: 'FaHeadset',
      contact: 'Nhấp vào icon chat góc phải màn hình',
   },
   {
      id: 2,
      name: 'Email hỗ trợ',
      description: 'Gửi yêu cầu chi tiết, đính kèm file',
      responseTime: '24 giờ',
      hours: '24/7',
      icon: 'FaCalendarAlt',
      contact: 'support@zeionstore.com',
   },
   {
      id: 3,
      name: 'Hotline',
      description: 'Hỗ trợ khẩn cấp, vấn đề thanh toán',
      responseTime: '5 phút',
      hours: '8:00 - 22:00',
      icon: 'FaHeadset',
      contact: '+84 966 376 155',
   },
   {
      id: 4,
      name: 'FAQ & Help Center',
      description: 'Tự giải đáp thắc mắc, hướng dẫn chi tiết',
      responseTime: 'Tức thì',
      hours: '24/7',
      icon: 'FaQuestionCircle',
      contact: '/faq',
   },
];

export { storePolicies, shippingMethods, supportChannels };
