import {
   FaFileContract,
   FaShieldAlt,
   FaQuestionCircle,
   FaLock,
   FaExchangeAlt,
   FaStore,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface PolicyPage {
   id: string;
   title: string;
   path: string;
   icon: IconType;
   description: string;
}

export const usePolicyPages = () => {
   const policyPages: PolicyPage[] = [
      {
         id: 'terms',
         title: 'Điều khoản sử dụng',
         path: '/terms',
         icon: FaFileContract,
         description: 'Quy định sử dụng dịch vụ',
      },
      {
         id: 'privacy',
         title: 'Chính sách bảo mật',
         path: '/privacy',
         icon: FaShieldAlt,
         description: 'Bảo vệ thông tin cá nhân',
      },
      {
         id: 'faq',
         title: 'Câu hỏi thường gặp',
         path: '/faq',
         icon: FaQuestionCircle,
         description: 'Giải đáp thắc mắc',
      },
      {
         id: 'security',
         title: 'Bảo mật & An toàn',
         path: '/security',
         icon: FaLock,
         description: 'Chính sách bảo mật tài khoản',
      },
      {
         id: 'refund',
         title: 'Chính sách hoàn tiền',
         path: '/refund',
         icon: FaExchangeAlt,
         description: 'Quy định hoàn trả',
      },
      {
         id: 'store',
         title: 'Chính sách cửa hàng',
         path: '/store-policy',
         icon: FaStore,
         description: 'Quy định mua bán',
      },
   ];

   return { policyPages };
};
