import ProfileForm from '@/components/profile';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: 'Thông tin cá nhân - Tài khoản của bạn',
   description:
      'Quản lý và cập nhật thông tin cá nhân, số điện thoại, địa chỉ và bảo mật tài khoản',
   keywords: 'thông tin cá nhân, tài khoản, cập nhật thông tin, bảo mật',
};

export default function AccountProfilePage() {
   return (
      <div className="min-h-screen bg-gray-50 py-8">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900">Thông tin cá nhân</h1>
               <p className="mt-2 text-gray-600">
                  Quản lý thông tin cá nhân, số điện thoại, địa chỉ và cài đặt bảo mật tài khoản
               </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Left Sidebar - Avatar & Quick Info */}
               <div className="lg:col-span-1">
                  <Suspense fallback={<ProfileSkeleton />}>
                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                           {/* Avatar Section */}
                           <div className="text-center">
                              <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                 {/* Avatar component will be here */}
                              </div>
                              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                                 Nguyễn Văn A
                              </h2>
                              <p className="text-gray-500">Thành viên từ 2023</p>
                           </div>

                           {/* Quick Stats */}
                           <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                 <span className="text-gray-600">Tài khoản</span>
                                 <span className="font-medium text-gray-900">Đã xác minh</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                 <span className="text-gray-600">Bảo mật</span>
                                 <span className="font-medium text-green-600">Mạnh</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Suspense>
               </div>

               {/* Right Content - Main Form */}
               <div className="lg:col-span-2">
                  <Suspense fallback={<ProfileSkeleton />}>
                     <ProfileForm />
                  </Suspense>
               </div>
            </div>
         </div>
      </div>
   );
}
