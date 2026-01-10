'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Globe } from 'lucide-react';
import { UserProfile } from '@/lib/account/Profile';

interface ContactInfoProps {
   profile: UserProfile;
}

export default function ContactInfo({ profile }: ContactInfoProps) {
   // const [phone, setPhone] = useState(profile.phone || '');

   const handleAddPhone = () => {
      // Logic to add phone number
   };

   return (
      <div className="space-y-6">
         {/* Phone Number */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <Label className="text-gray-700 font-medium">Số điện thoại</Label>
               </div>
               {!profile.hasPhone && (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handleAddPhone}
                     className="border-gray-300 text-gray-700"
                  >
                     Thêm số điện thoại
                  </Button>
               )}
            </div>

            {profile.hasPhone ? (
               <Input
                  type="tel"
                  defaultValue={profile.phone}
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  placeholder="Nhập số điện thoại"
               />
            ) : (
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">Chưa có số điện thoại nào được liên kết</p>
                  <p className="text-sm text-gray-500 mt-1">
                     Thêm số điện thoại để nhận thông báo và khôi phục tài khoản
                  </p>
               </div>
            )}
         </div>

         {/* Address */}
         <div className="space-y-2">
            <div className="flex items-center gap-2">
               <MapPin className="w-5 h-5 text-gray-600" />
               <Label htmlFor="address" className="text-gray-700 font-medium">
                  Địa chỉ
               </Label>
            </div>
            <textarea
               id="address"
               rows={3}
               defaultValue={profile.address}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
               placeholder="Nhập địa chỉ chi tiết..."
            />
         </div>

         {/* Additional Contact Info */}
         <div className="space-y-4">
            <div className="flex items-center gap-2">
               <Globe className="w-5 h-5 text-gray-600" />
               <Label className="text-gray-700 font-medium">Thông tin liên hệ khác</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-600 text-sm">
                     Website cá nhân
                  </Label>
                  <Input
                     id="website"
                     type="url"
                     className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                     placeholder="https://"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="social" className="text-gray-600 text-sm">
                     LinkedIn
                  </Label>
                  <Input
                     id="social"
                     className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                     placeholder="https://linkedin.com/in/..."
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
