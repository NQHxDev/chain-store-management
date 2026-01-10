'use client';

import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import VerifyPhoneModal from '@/components/profile/VerifyPhoneModal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserProfile } from '@/lib/account/Profile';
import { Shield, Key, Phone } from 'lucide-react';
import { useState } from 'react';

interface SecuritySectionProps {
   profile: UserProfile;
}

export default function SecuritySection({ profile }: SecuritySectionProps) {
   const [showPasswordModal, setShowPasswordModal] = useState(false);
   const [showPhoneModal, setShowPhoneModal] = useState(false);

   return (
      <div className="space-y-6">
         {/* Security Status */}
         <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                     <Shield className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                     <h3 className="font-medium text-gray-900">Trạng thái bảo mật</h3>
                     <p className="text-sm text-gray-600">
                        {profile.hasPassword && profile.hasPhone
                           ? 'Tài khoản của bạn đang được bảo vệ tốt'
                           : 'Vui lòng cải thiện bảo mật tài khoản'}
                     </p>
                  </div>
               </div>
               <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                     profile.hasPassword && profile.hasPhone
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
               >
                  {profile.hasPassword && profile.hasPhone ? 'Mạnh' : 'Cần cải thiện'}
               </div>
            </div>
         </div>

         {/* Password Section */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-gray-600" />
                  <Label className="text-gray-700 font-medium">Mật khẩu</Label>
               </div>
               {profile.hasPassword ? (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setShowPasswordModal(true)}
                     className="border-gray-300 text-gray-700"
                  >
                     Đổi mật khẩu
                  </Button>
               ) : (
                  <Button
                     size="sm"
                     onClick={() => setShowPasswordModal(true)}
                     className="bg-gray-900 hover:bg-gray-800"
                  >
                     Đặt mật khẩu
                  </Button>
               )}
            </div>

            {profile.hasPassword ? (
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">Mật khẩu đã được thiết lập</p>
                  <p className="text-sm text-gray-500 mt-1">Lần thay đổi gần nhất: 2 tuần trước</p>
               </div>
            ) : (
               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">Tài khoản chưa có mật khẩu</p>
                  <p className="text-sm text-yellow-700 mt-1">
                     Vui lòng đặt mật khẩu để bảo vệ tài khoản tốt hơn
                  </p>
               </div>
            )}
         </div>

         {/* Phone Verification */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <Label className="text-gray-700 font-medium">Xác minh số điện thoại</Label>
               </div>
               {!profile.hasPhone && (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setShowPhoneModal(true)}
                     className="border-gray-300 text-gray-700"
                  >
                     Xác minh ngay
                  </Button>
               )}
            </div>

            {profile.hasPhone ? (
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-gray-600">Số điện thoại đã được xác minh</p>
                        <p className="text-sm text-gray-500 mt-1">{profile.phone}</p>
                     </div>
                     <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Đã xác minh
                     </span>
                  </div>
               </div>
            ) : (
               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">Số điện thoại chưa được xác minh</p>
                  <p className="text-sm text-yellow-700 mt-1">
                     Xác minh số điện thoại để tăng cường bảo mật và khôi phục tài khoản
                  </p>
               </div>
            )}
         </div>

         {/* Two-Factor Authentication */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-gray-700 font-medium">Xác thực hai yếu tố (2FA)</Label>
                  <p className="text-sm text-gray-600">Thêm lớp bảo mật thứ hai cho tài khoản</p>
               </div>
               <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                  Bật 2FA
               </Button>
            </div>
         </div>

         {/* Modals */}
         <ChangePasswordModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            hasPassword={profile.hasPassword}
         />

         <VerifyPhoneModal isOpen={showPhoneModal} onClose={() => setShowPhoneModal(false)} />
      </div>
   );
}
