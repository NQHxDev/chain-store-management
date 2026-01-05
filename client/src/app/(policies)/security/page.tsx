// app/security/page.tsx
'use client';

import React, { useState } from 'react';
import {
   FaShieldAlt,
   FaLock,
   FaUserShield,
   FaKey,
   FaMobileAlt,
   FaDesktop,
   FaHistory,
   FaBell,
   FaCheckCircle,
   FaExclamationTriangle,
   FaChartLine,
   FaDatabase,
   FaNetworkWired,
   FaEye,
   FaClock,
} from 'react-icons/fa';

interface SecurityFeature {
   id: number;
   title: string;
   description: string;
   icon: React.ReactNode;
   enabled: boolean;
   priority: 'high' | 'medium' | 'low';
   lastUpdated: string;
}

interface SecurityLog {
   id: number;
   type: 'login' | 'password_change' | 'device' | 'security_update' | 'suspicious';
   description: string;
   device: string;
   location: string;
   ip: string;
   timestamp: string;
   status: 'success' | 'warning' | 'danger';
}

export default function SecurityPage() {
   const [activeTab, setActiveTab] = useState('overview');
   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
   const [emailAlerts, setEmailAlerts] = useState(true);
   const [smsAlerts, setSmsAlerts] = useState(false);
   const [showSecurityCodes, setShowSecurityCodes] = useState(false);

   // Tính bảo mật tài khoản
   const securityScore = 92; // điểm từ 0-100
   const securityLevel =
      securityScore >= 90 ? 'Rất cao' : securityScore >= 70 ? 'Cao' : 'Trung bình';

   // Tính năng bảo mật
   const securityFeatures: SecurityFeature[] = [
      {
         id: 1,
         title: 'Xác thực 2 lớp (2FA)',
         description: 'Yêu cầu mã xác thực từ ứng dụng khi đăng nhập trên thiết bị mới',
         icon: <FaKey className="h-6 w-6" />,
         enabled: true,
         priority: 'high',
         lastUpdated: '2024-01-22',
      },
      {
         id: 2,
         title: 'Mật khẩu mạnh',
         description:
            'Mật khẩu phải có ít nhất 12 ký tự bao gồm chữ hoa, thường, số và ký tự đặc biệt',
         icon: <FaLock className="h-6 w-6" />,
         enabled: true,
         priority: 'high',
         lastUpdated: '2024-01-20',
      },
      {
         id: 3,
         title: 'Cảnh báo đăng nhập bất thường',
         description: 'Nhận cảnh báo qua email khi có đăng nhập từ vị trí hoặc thiết bị mới',
         icon: <FaBell className="h-6 w-6" />,
         enabled: true,
         priority: 'high',
         lastUpdated: '2024-01-18',
      },
      {
         id: 4,
         title: 'Mã hóa đầu cuối (E2EE)',
         description: 'Tất cả dữ liệu được mã hóa từ thiết bị của bạn đến máy chủ của chúng tôi',
         icon: <FaShieldAlt className="h-6 w-6" />,
         enabled: true,
         priority: 'high',
         lastUpdated: '2024-01-15',
      },
      {
         id: 5,
         title: 'Kiểm soát thiết bị đăng nhập',
         description: 'Xem và quản lý tất cả thiết bị đã đăng nhập vào tài khoản của bạn',
         icon: <FaMobileAlt className="h-6 w-6" />,
         enabled: true,
         priority: 'medium',
         lastUpdated: '2024-01-12',
      },
      {
         id: 6,
         title: 'Backup mã khôi phục',
         description: 'Lưu trữ mã khôi phục dự phòng trong trường hợp mất quyền truy cập',
         icon: <FaDatabase className="h-6 w-6" />,
         enabled: true,
         priority: 'medium',
         lastUpdated: '2024-01-10',
      },
      {
         id: 7,
         title: 'Chống tấn công brute force',
         description: 'Tự động chặn sau 5 lần đăng nhập thất bại liên tiếp',
         icon: <FaNetworkWired className="h-6 w-6" />,
         enabled: true,
         priority: 'medium',
         lastUpdated: '2024-01-08',
      },
      {
         id: 8,
         title: 'Quét mối đe dọa định kỳ',
         description: 'Hệ thống tự động quét và phát hiện các mối đe dọa tiềm ẩn',
         icon: <FaEye className="h-6 w-6" />,
         enabled: true,
         priority: 'low',
         lastUpdated: '2024-01-05',
      },
      {
         id: 9,
         title: 'Bảo vệ chống phishing',
         description: 'Cảnh báo về các email và trang web lừa đảo giả mạo',
         icon: <FaUserShield className="h-6 w-6" />,
         enabled: true,
         priority: 'low',
         lastUpdated: '2024-01-03',
      },
      {
         id: 10,
         title: 'Mã hóa dữ liệu ở trạng thái nghỉ',
         description: 'Dữ liệu được mã hóa ngay cả khi lưu trữ trên máy chủ',
         icon: <FaDesktop className="h-6 w-6" />,
         enabled: true,
         priority: 'low',
         lastUpdated: '2024-01-01',
      },
   ];

   // Lịch sử bảo mật
   const securityLogs: SecurityLog[] = [
      {
         id: 1,
         type: 'login',
         description: 'Đăng nhập thành công',
         device: 'iPhone 14 Pro',
         location: 'TP. Hồ Chí Minh, VN',
         ip: '192.168.1.100',
         timestamp: '2024-01-22 14:30:22',
         status: 'success',
      },
      {
         id: 2,
         type: 'security_update',
         description: 'Cập nhật cài đặt bảo mật',
         device: 'Chrome trên Windows',
         location: 'Hà Nội, VN',
         ip: '103.199.68.110',
         timestamp: '2024-01-21 09:15:10',
         status: 'success',
      },
      {
         id: 3,
         type: 'password_change',
         description: 'Đổi mật khẩu thành công',
         device: 'Safari trên MacBook',
         location: 'Đà Nẵng, VN',
         ip: '14.241.231.11',
         timestamp: '2024-01-20 16:45:33',
         status: 'success',
      },
      {
         id: 4,
         type: 'device',
         description: 'Thiết bị mới được thêm vào',
         device: 'Samsung Galaxy S23',
         location: 'TP. Hồ Chí Minh, VN',
         ip: '192.168.1.101',
         timestamp: '2024-01-19 11:20:15',
         status: 'warning',
      },
      {
         id: 5,
         type: 'suspicious',
         description: 'Đăng nhập thất bại nhiều lần',
         device: 'Unknown Device',
         location: 'Tokyo, Japan',
         ip: '45.76.178.210',
         timestamp: '2024-01-18 03:45:12',
         status: 'danger',
      },
      {
         id: 6,
         type: 'login',
         description: 'Đăng nhập thành công',
         device: 'Chrome trên Windows',
         location: 'TP. Hồ Chí Minh, VN',
         ip: '192.168.1.100',
         timestamp: '2024-01-17 20:10:05',
         status: 'success',
      },
   ];

   // Mã khôi phục
   const backupCodes = [
      'J8K2-7M3N-9P4Q',
      'R5S6-T7U8-V9W0',
      'X1Y2-Z3A4-B5C6',
      'D7E8-F9G0-H1J2',
      'K3L4-M5N6-P7Q8',
      'R9S0-T1U2-V3W4',
   ];

   // Thiết bị đang đăng nhập
   const activeDevices = [
      {
         id: 1,
         name: 'iPhone 14 Pro',
         type: 'mobile',
         os: 'iOS 17.2',
         lastActive: 'Vừa xong',
         location: 'TP. Hồ Chí Minh, VN',
         current: true,
      },
      {
         id: 2,
         name: 'MacBook Pro M2',
         type: 'desktop',
         os: 'macOS Sonoma',
         lastActive: '2 giờ trước',
         location: 'Hà Nội, VN',
         current: false,
      },
      {
         id: 3,
         name: 'Windows PC',
         type: 'desktop',
         os: 'Windows 11',
         lastActive: '1 ngày trước',
         location: 'Đà Nẵng, VN',
         current: false,
      },
   ];

   // Security Tips
   const securityTips = [
      'Không bao giờ chia sẻ mật khẩu hoặc mã xác thực với người khác',
      'Sử dụng mật khẩu duy nhất cho WebStoreGame',
      'Kích hoạt xác thực 2 lớp để tăng cường bảo mật',
      'Thường xuyên cập nhật ứng dụng và hệ điều hành',
      'Kiểm tra lịch sử đăng nhập định kỳ',
      'Không sử dụng Wi-Fi công cộng để đăng nhập tài khoản',
      'Lưu trữ mã khôi phục ở nơi an toàn',
      'Cảnh giác với email và tin nhắn lừa đảo',
   ];

   // Tính số tính năng bảo mật đang bật
   const enabledFeatures = securityFeatures.filter((f) => f.enabled).length;
   const highPriorityEnabled = securityFeatures.filter(
      (f) => f.enabled && f.priority === 'high'
   ).length;

   return (
      <>
         <h1 className="text-3xl font-bold mb-2 text-gray-900">Bảo mật & An toàn</h1>
         <p className="text-gray-500 mb-8">Quản lý và tăng cường bảo mật cho tài khoản của bạn</p>

         <section className="space-y-10 text-gray-700">
            <div className="prose prose-lg max-w-none">
               {/* Security Score Card */}
               <div className="bg-linear-to-r from-gray-900 to-black text-white rounded-2xl p-8 mb-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <FaShieldAlt className="h-8 w-8" />
                           </div>
                           <div>
                              <h2 className="text-2xl font-bold">Độ an toàn tài khoản</h2>
                              <p className="text-gray-300">Mức độ bảo mật hiện tại của tài khoản</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                              <div className="text-3xl font-bold mb-1">
                                 {securityScore}
                                 <span className="text-lg">/100</span>
                              </div>
                              <div className="text-sm text-gray-300">Điểm bảo mật</div>
                           </div>
                           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                              <div className="text-3xl font-bold mb-1">{securityLevel}</div>
                              <div className="text-sm text-gray-300">Mức độ an toàn</div>
                           </div>
                           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                              <div className="text-3xl font-bold mb-1">
                                 {enabledFeatures}/{securityFeatures.length}
                              </div>
                              <div className="text-sm text-gray-300">Tính năng đã bật</div>
                           </div>
                        </div>
                     </div>

                     {/* Progress Circle */}
                     <div className="relative">
                        <div className="h-48 w-48">
                           <svg className="h-full w-full" viewBox="0 0 100 100">
                              {/* Background Circle */}
                              <circle
                                 cx="50"
                                 cy="50"
                                 r="45"
                                 fill="none"
                                 stroke="rgba(255,255,255,0.1)"
                                 strokeWidth="8"
                              />
                              {/* Progress Circle */}
                              <circle
                                 cx="50"
                                 cy="50"
                                 r="45"
                                 fill="none"
                                 stroke="url(#gradient)"
                                 strokeWidth="8"
                                 strokeLinecap="round"
                                 strokeDasharray={`${2 * Math.PI * 45}`}
                                 strokeDashoffset={`${
                                    2 * Math.PI * 45 * (1 - securityScore / 100)
                                 }`}
                                 transform="rotate(-90 50 50)"
                              />
                              <defs>
                                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                 </linearGradient>
                              </defs>
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center flex-col">
                              <div className="text-4xl font-bold">{securityScore}%</div>
                              <div className="text-sm text-gray-300">An toàn</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Tabs Navigation */}
               <div className="mb-8 border-b border-gray-200">
                  <nav className="flex space-x-8">
                     {[
                        {
                           id: 'overview',
                           label: 'Tổng quan',
                           icon: <FaChartLine className="h-4 w-4" />,
                        },
                        {
                           id: 'features',
                           label: 'Tính năng',
                           icon: <FaShieldAlt className="h-4 w-4" />,
                        },
                        {
                           id: 'devices',
                           label: 'Thiết bị',
                           icon: <FaMobileAlt className="h-4 w-4" />,
                        },
                        { id: 'logs', label: 'Lịch sử', icon: <FaHistory className="h-4 w-4" /> },
                        {
                           id: 'backup',
                           label: 'Sao lưu',
                           icon: <FaDatabase className="h-4 w-4" />,
                        },
                     ].map((tab) => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`flex items-center gap-2 px-1 py-4 font-medium text-sm border-b-2 transition-colors ${
                              activeTab === tab.id
                                 ? 'border-black text-black'
                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                           }`}
                        >
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </nav>
               </div>

               {/* Tab Content */}
               {activeTab === 'overview' && (
                  <div className="space-y-8">
                     {/* Quick Actions */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                 <FaKey className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="font-medium text-gray-900">Đổi mật khẩu</div>
                           </div>
                           <p className="text-sm text-gray-600">Cập nhật mật khẩu mạnh hơn</p>
                        </button>

                        <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                 <FaMobileAlt className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="font-medium text-gray-900">Quản lý thiết bị</div>
                           </div>
                           <p className="text-sm text-gray-600">Xem và xóa thiết bị đã đăng nhập</p>
                        </button>

                        <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                 <FaBell className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="font-medium text-gray-900">Cài đặt cảnh báo</div>
                           </div>
                           <p className="text-sm text-gray-600">Tùy chỉnh thông báo bảo mật</p>
                        </button>

                        <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                 <FaExclamationTriangle className="h-5 w-5 text-red-600" />
                              </div>
                              <div className="font-medium text-gray-900">Báo cáo sự cố</div>
                           </div>
                           <p className="text-sm text-gray-600">Báo cáo hoạt động đáng ngờ</p>
                        </button>
                     </div>

                     {/* Security Tips */}
                     <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaShieldAlt className="h-5 w-5 text-blue-600" />
                           </div>
                           <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                 Mẹo bảo mật quan trọng
                              </h3>
                              <p className="text-sm text-gray-600">
                                 Những điều cần làm để bảo vệ tài khoản
                              </p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                           {securityTips.map((tip, index) => (
                              <div
                                 key={index}
                                 className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100"
                              >
                                 <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <FaCheckCircle className="h-3 w-3 text-blue-600" />
                                 </div>
                                 <span className="text-sm text-gray-700">{tip}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Current Status */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                           <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Trạng thái bảo mật hiện tại
                           </h3>

                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div
                                       className={`h-3 w-3 rounded-full ${
                                          twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'
                                       }`}
                                    ></div>
                                    <span className="text-gray-700">Xác thực 2 lớp</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span
                                       className={`text-sm font-medium ${
                                          twoFactorEnabled ? 'text-green-600' : 'text-red-600'
                                       }`}
                                    >
                                       {twoFactorEnabled ? 'Đã bật' : 'Đã tắt'}
                                    </span>
                                    <button
                                       onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                       className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                          twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'
                                       }`}
                                    >
                                       <span
                                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                             twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                          }`}
                                       />
                                    </button>
                                 </div>
                              </div>

                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div
                                       className={`h-3 w-3 rounded-full ${
                                          emailAlerts ? 'bg-green-500' : 'bg-red-500'
                                       }`}
                                    ></div>
                                    <span className="text-gray-700">Cảnh báo qua email</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span
                                       className={`text-sm font-medium ${
                                          emailAlerts ? 'text-green-600' : 'text-red-600'
                                       }`}
                                    >
                                       {emailAlerts ? 'Đã bật' : 'Đã tắt'}
                                    </span>
                                    <button
                                       onClick={() => setEmailAlerts(!emailAlerts)}
                                       className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                          emailAlerts ? 'bg-green-500' : 'bg-gray-300'
                                       }`}
                                    >
                                       <span
                                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                             emailAlerts ? 'translate-x-6' : 'translate-x-1'
                                          }`}
                                       />
                                    </button>
                                 </div>
                              </div>

                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div
                                       className={`h-3 w-3 rounded-full ${
                                          smsAlerts ? 'bg-green-500' : 'bg-red-500'
                                       }`}
                                    ></div>
                                    <span className="text-gray-700">Cảnh báo qua SMS</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span
                                       className={`text-sm font-medium ${
                                          smsAlerts ? 'text-green-600' : 'text-red-600'
                                       }`}
                                    >
                                       {smsAlerts ? 'Đã bật' : 'Đã tắt'}
                                    </span>
                                    <button
                                       onClick={() => setSmsAlerts(!smsAlerts)}
                                       className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                          smsAlerts ? 'bg-green-500' : 'bg-gray-300'
                                       }`}
                                    >
                                       <span
                                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                             smsAlerts ? 'translate-x-6' : 'translate-x-1'
                                          }`}
                                       />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                           <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Thống kê bảo mật
                           </h3>

                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <span className="text-gray-700">
                                    Đăng nhập thành công (30 ngày)
                                 </span>
                                 <span className="font-semibold text-gray-900">142</span>
                              </div>

                              <div className="flex items-center justify-between">
                                 <span className="text-gray-700">Đăng nhập thất bại (30 ngày)</span>
                                 <span className="font-semibold text-red-600">3</span>
                              </div>

                              <div className="flex items-center justify-between">
                                 <span className="text-gray-700">Thiết bị đang hoạt động</span>
                                 <span className="font-semibold text-gray-900">
                                    {activeDevices.length}
                                 </span>
                              </div>

                              <div className="flex items-center justify-between">
                                 <span className="text-gray-700">Đã đổi mật khẩu lần cuối</span>
                                 <span className="font-semibold text-gray-900">20/01/2024</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'features' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Tất cả tính năng bảo mật
                        </h3>
                        <div className="text-sm text-gray-500">
                           {enabledFeatures} tính năng đang hoạt động
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {securityFeatures.map((feature) => (
                           <div
                              key={feature.id}
                              className={`bg-white border rounded-xl p-5 transition-all ${
                                 feature.enabled
                                    ? 'border-green-200 bg-linear-to-br from-green-50 to-white'
                                    : 'border-gray-200 hover:border-gray-300'
                              }`}
                           >
                              <div className="flex items-start gap-4">
                                 <div
                                    className={`shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                                       feature.enabled
                                          ? 'bg-green-100 text-green-600'
                                          : 'bg-gray-100 text-gray-400'
                                    }`}
                                 >
                                    {feature.icon}
                                 </div>

                                 <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                       <h4 className="font-semibold text-gray-900">
                                          {feature.title}
                                       </h4>
                                       <span
                                          className={`px-2 py-1 text-xs rounded-full ${
                                             feature.priority === 'high'
                                                ? 'bg-red-100 text-red-700'
                                                : feature.priority === 'medium'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-blue-100 text-blue-700'
                                          }`}
                                       >
                                          {feature.priority === 'high'
                                             ? 'Quan trọng'
                                             : feature.priority === 'medium'
                                             ? 'Trung bình'
                                             : 'Thấp'}
                                       </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-3">
                                       {feature.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-2 text-sm text-gray-500">
                                          <FaClock className="h-3 w-3" />
                                          <span>Cập nhật: {feature.lastUpdated}</span>
                                       </div>

                                       <div className="flex items-center gap-2">
                                          <div
                                             className={`h-2 w-2 rounded-full ${
                                                feature.enabled ? 'bg-green-500' : 'bg-gray-400'
                                             }`}
                                          ></div>
                                          <span
                                             className={`text-sm font-medium ${
                                                feature.enabled ? 'text-green-600' : 'text-gray-500'
                                             }`}
                                          >
                                             {feature.enabled ? 'Đã bật' : 'Đã tắt'}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 mt-8">
                        <h4 className="font-semibold text-gray-900 mb-3">Ưu tiên bảo mật</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                 <span className="text-sm font-medium text-gray-900">Mức cao</span>
                              </div>
                              <p className="text-xs text-gray-600">
                                 Tính năng quan trọng nhất, nên luôn bật
                              </p>
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                 <span className="text-sm font-medium text-gray-900">
                                    Mức trung bình
                                 </span>
                              </div>
                              <p className="text-xs text-gray-600">Nên bật để tăng cường bảo mật</p>
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                 <span className="text-sm font-medium text-gray-900">Mức thấp</span>
                              </div>
                              <p className="text-xs text-gray-600">
                                 Bổ sung, không bắt buộc nhưng khuyến khích
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'devices' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Thiết bị đã đăng nhập
                        </h3>
                        <button className="px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                           Đăng xuất tất cả thiết bị
                        </button>
                     </div>

                     <div className="space-y-4">
                        {activeDevices.map((device) => (
                           <div
                              key={device.id}
                              className={`bg-white border rounded-xl p-5 transition-all ${
                                 device.current
                                    ? 'border-blue-200 bg-linear-to-br from-blue-50 to-white'
                                    : 'border-gray-200 hover:border-gray-300'
                              }`}
                           >
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div
                                       className={`h-12 w-12 rounded-full flex items-center justify-center ${
                                          device.type === 'mobile'
                                             ? 'bg-purple-100 text-purple-600'
                                             : 'bg-blue-100 text-blue-600'
                                       }`}
                                    >
                                       {device.type === 'mobile' ? (
                                          <FaMobileAlt className="h-6 w-6" />
                                       ) : (
                                          <FaDesktop className="h-6 w-6" />
                                       )}
                                    </div>

                                    <div>
                                       <div className="flex items-center gap-2 mb-1">
                                          <h4 className="font-semibold text-gray-900">
                                             {device.name}
                                          </h4>
                                          {device.current && (
                                             <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                                Thiết bị hiện tại
                                             </span>
                                          )}
                                       </div>
                                       <div className="flex items-center gap-4 text-sm text-gray-500">
                                          <span>{device.os}</span>
                                          <span>•</span>
                                          <span>{device.location}</span>
                                          <span>•</span>
                                          <span>Hoạt động: {device.lastActive}</span>
                                       </div>
                                    </div>
                                 </div>

                                 {!device.current && (
                                    <button className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                                       Đăng xuất
                                    </button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                           <FaExclamationTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                           <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                 Lưu ý về thiết bị
                              </h4>
                              <ul className="space-y-2 text-sm text-gray-700">
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                                    <span>Chỉ đăng nhập trên các thiết bị bạn tin tưởng</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                                    <span>Đăng xuất khỏi thiết bị công cộng sau khi sử dụng</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                                    <span>Thông báo ngay nếu phát hiện thiết bị lạ</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'logs' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                           Lịch sử hoạt động bảo mật
                        </h3>
                        <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                           Xuất file log
                        </button>
                     </div>

                     <div className="overflow-hidden border border-gray-200 rounded-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                              <tr>
                                 <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                 >
                                    Thời gian
                                 </th>
                                 <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                 >
                                    Loại hoạt động
                                 </th>
                                 <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                 >
                                    Thiết bị & Vị trí
                                 </th>
                                 <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                 >
                                    Trạng thái
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-gray-200">
                              {securityLogs.map((log) => (
                                 <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="text-sm text-gray-900">
                                          {log.timestamp.split(' ')[0]}
                                       </div>
                                       <div className="text-xs text-gray-500">
                                          {log.timestamp.split(' ')[1]}
                                       </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className="flex items-center gap-2">
                                          <div
                                             className={`h-2 w-2 rounded-full ${
                                                log.status === 'success'
                                                   ? 'bg-green-500'
                                                   : log.status === 'warning'
                                                   ? 'bg-yellow-500'
                                                   : 'bg-red-500'
                                             }`}
                                          ></div>
                                          <span className="text-sm font-medium text-gray-900">
                                             {log.description}
                                          </span>
                                       </div>
                                       <div className="text-xs text-gray-500 mt-1">
                                          IP: {log.ip}
                                       </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className="text-sm text-gray-900">{log.device}</div>
                                       <div className="text-xs text-gray-500">{log.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span
                                          className={`px-2 py-1 text-xs rounded-full ${
                                             log.status === 'success'
                                                ? 'bg-green-100 text-green-800'
                                                : log.status === 'warning'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                          }`}
                                       >
                                          {log.status === 'success'
                                             ? 'Thành công'
                                             : log.status === 'warning'
                                             ? 'Cảnh báo'
                                             : 'Nguy hiểm'}
                                       </span>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                        <h4 className="font-semibold text-gray-900 mb-3">Giải thích trạng thái</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="flex items-center gap-3">
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              <div>
                                 <div className="text-sm font-medium text-gray-900">Thành công</div>
                                 <div className="text-xs text-gray-600">Hoạt động bình thường</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-3">
                              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                              <div>
                                 <div className="text-sm font-medium text-gray-900">Cảnh báo</div>
                                 <div className="text-xs text-gray-600">Cần chú ý</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-3">
                              <div className="h-3 w-3 rounded-full bg-red-500"></div>
                              <div>
                                 <div className="text-sm font-medium text-gray-900">Nguy hiểm</div>
                                 <div className="text-xs text-gray-600">Hoạt động đáng ngờ</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'backup' && (
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                 <FaDatabase className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-semibold text-gray-900">
                                    Mã khôi phục
                                 </h3>
                                 <p className="text-sm text-gray-600">
                                    Dùng để khôi phục tài khoản khi mất quyền truy cập
                                 </p>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                 {backupCodes.map((code, index) => (
                                    <div
                                       key={index}
                                       className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center font-mono text-sm"
                                    >
                                       {showSecurityCodes ? code : '••••-••••-••••'}
                                    </div>
                                 ))}
                              </div>

                              <div className="flex items-center gap-4">
                                 <button
                                    onClick={() => setShowSecurityCodes(!showSecurityCodes)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                 >
                                    {showSecurityCodes ? 'Ẩn mã' : 'Hiển thị mã'}
                                 </button>
                                 <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                    Tạo mã mới
                                 </button>
                              </div>

                              <div className="text-sm text-gray-500">
                                 ⚠️ Lưu các mã này ở nơi an toàn. Mỗi mã chỉ sử dụng được một lần.
                              </div>
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                 <FaUserShield className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-semibold text-gray-900">
                                    Liên kết khôi phục
                                 </h3>
                                 <p className="text-sm text-gray-600">
                                    Thêm phương thức khôi phục tài khoản
                                 </p>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                       <svg
                                          className="h-4 w-4 text-green-600"
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
                                    <div>
                                       <div className="font-medium text-gray-900">
                                          Email khôi phục
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          nguyenhungdev.vn@gmail.com
                                       </div>
                                    </div>
                                 </div>
                                 <span className="text-sm text-green-600 font-medium">
                                    Đã xác minh
                                 </span>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                       <FaMobileAlt className="h-4 w-4 text-yellow-600" />
                                    </div>
                                    <div>
                                       <div className="font-medium text-gray-900">
                                          Số điện thoại
                                       </div>
                                       <div className="text-sm text-gray-600">+84 966 376 155</div>
                                    </div>
                                 </div>
                                 <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                                    Thêm
                                 </button>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                       <svg
                                          className="h-4 w-4 text-gray-400"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                       >
                                          <path
                                             fillRule="evenodd"
                                             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                             clipRule="evenodd"
                                          />
                                       </svg>
                                    </div>
                                    <div>
                                       <div className="font-medium text-gray-900">
                                          Câu hỏi bảo mật
                                       </div>
                                       <div className="text-sm text-gray-600">3 câu hỏi bí mật</div>
                                    </div>
                                 </div>
                                 <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                                    Thiết lập
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Lời khuyên về sao lưu</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <h5 className="text-sm font-medium text-gray-900">✅ Nên làm:</h5>
                              <ul className="space-y-1 text-sm text-gray-600">
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                    <span>In mã khôi phục ra giấy và cất giữ an toàn</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                    <span>Thêm ít nhất 2 phương thức khôi phục</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></div>
                                    <span>Cập nhật thông tin liên hệ thường xuyên</span>
                                 </li>
                              </ul>
                           </div>

                           <div className="space-y-2">
                              <h5 className="text-sm font-medium text-gray-900">❌ Không nên:</h5>
                              <ul className="space-y-1 text-sm text-gray-600">
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                    <span>Lưu mã khôi phục trên thiết bị dễ mất</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                    <span>Chia sẻ mã khôi phục với bất kỳ ai</span>
                                 </li>
                                 <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                    <span>Chỉ dựa vào một phương thức khôi phục</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* Contact Support */}
               <div className="mt-10 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8">
                  <div className="max-w-3xl mx-auto text-center">
                     <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <FaUserShield className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-bold mb-3">Cần hỗ trợ về bảo mật?</h3>
                     <p className="text-blue-100 mb-6">
                        Nếu bạn nghi ngờ tài khoản bị xâm nhập hoặc gặp vấn đề bảo mật, liên hệ ngay
                        với đội ngũ hỗ trợ của chúng tôi.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                           href="mailto:security@webstoregame.com"
                           className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
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
                           security@webstoregame.com
                        </a>
                        <a
                           href="tel:+84966376155"
                           className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
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
                                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                           </svg>
                           Gọi khẩn cấp
                        </a>
                     </div>
                     <p className="text-sm text-blue-200 mt-4">
                        Phản hồi trong vòng 15 phút cho các vấn đề bảo mật
                     </p>
                  </div>
               </div>

               {/* Final Note */}
               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                     Trang bảo mật được cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}{' '}
                     • Hệ thống giám sát 24/7
                  </p>
               </div>
            </div>
         </section>
      </>
   );
}
