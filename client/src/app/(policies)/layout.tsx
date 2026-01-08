import type { Metadata } from 'next';
import PolicyLayoutWrapper from '@/components/policies/PolicyLayoutWrapper';

export const metadata: Metadata = {
   title: 'Chính sách & Điều khoản - ZeionStore',
   description: 'Các chính sách và điều khoản sử dụng dịch vụ ZeionStore',
};

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
   return <PolicyLayoutWrapper>{children}</PolicyLayoutWrapper>;
}
