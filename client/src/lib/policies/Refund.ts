import { IconType } from 'react-icons';
import {
   FaCalendarAlt,
   FaCheckCircle,
   FaClock,
   FaCreditCard,
   FaExchangeAlt,
   FaFileInvoiceDollar,
   FaMoneyBillWave,
   FaTimesCircle,
   FaUserCheck,
} from 'react-icons/fa';

interface RefundCondition {
   id: number;
   title: string;
   description: string;
   eligible: boolean;
   timeLimit?: string;
   requirements: string[];
   icon: IconType;
   priority: 'high' | 'medium' | 'low';
}

interface RefundStep {
   id: number;
   step: string;
   description: string;
   time: string;
   icon: IconType;
   details: string[];
}

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
      icon: FaTimesCircle,
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
      icon: FaExchangeAlt,
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
      icon: FaFileInvoiceDollar,
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
      icon: FaCreditCard,
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
      icon: FaUserCheck,
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
      icon: FaCheckCircle,
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
      icon: FaClock,
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
      icon: FaCalendarAlt,
      priority: 'low',
   },
];

// Quy trình hoàn tiền
const refundSteps: RefundStep[] = [
   {
      id: 1,
      step: 'Yêu cầu hoàn tiền',
      description: 'Gửi yêu cầu qua trang web hoặc email',
      time: '5-15 phút',
      icon: FaFileInvoiceDollar,
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
      icon: FaUserCheck,
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
      icon: FaMoneyBillWave,
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
      icon: FaCheckCircle,
      details: [
         'Nhận tiền về tài khoản',
         'Kiểm tra email xác nhận',
         'Đánh giá trải nghiệm hoàn tiền',
         'Liên hệ nếu chưa nhận được tiền',
      ],
   },
];

export { refundConditions, refundSteps };
