'use client';

import { useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, CheckCircle, X } from 'lucide-react';
import { passwordSchema } from '@/app/(user)/account/profile/profileSchema';

interface ChangePasswordModalProps {
   isOpen: boolean;
   onClose: () => void;
   hasPassword: boolean;
}

export default function ChangePasswordModal({
   isOpen,
   onClose,
   hasPassword,
}: ChangePasswordModalProps) {
   const [isLoading, setIsLoading] = useState(false);
   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   });

   const [passwordStrength, setPasswordStrength] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
   });

   const validatePassword = (password: string) => {
      setPasswordStrength({
         length: password.length >= 8,
         uppercase: /[A-Z]/.test(password),
         lowercase: /[a-z]/.test(password),
         number: /[0-9]/.test(password),
         special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'newPassword') {
         validatePassword(value);
      }
   };

   const calculatePasswordStrength = () => {
      const checks = Object.values(passwordStrength);
      const passed = checks.filter(Boolean).length;
      return Math.round((passed / checks.length) * 100);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         // Validate form
         const validatedData = passwordSchema.parse(formData);

         // API call to change password
         const response = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedData),
         });

         if (!response.ok) {
            throw new Error('Không thể thay đổi mật khẩu');
         }

         toast.success('Đổi mật khẩu thành công!', {
            description: hasPassword ? 'Mật khẩu đã được thay đổi' : 'Mật khẩu đã được thiết lập',
            duration: 2000,
         });

         onClose();
         setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
         });
      } catch (error) {
         toast.error('Đổi mật khẩu thất bại', {
            description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
            duration: 2000,
         });
      } finally {
         setIsLoading(false);
      }
   };

   const strengthPercentage = calculatePasswordStrength();
   const getStrengthColor = () => {
      if (strengthPercentage < 40) return 'bg-red-500';
      if (strengthPercentage < 70) return 'bg-yellow-500';
      return 'bg-green-500';
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-md bg-white border border-gray-200">
            <DialogHeader>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                     {hasPassword ? 'Đổi mật khẩu' : 'Đặt mật khẩu mới'}
                  </DialogTitle>
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={onClose}
                     className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </div>
               <DialogDescription className="text-gray-600">
                  {hasPassword
                     ? 'Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi'
                     : 'Thiết lập mật khẩu để bảo vệ tài khoản của bạn'}
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
               {hasPassword && (
                  <div className="space-y-2">
                     <Label htmlFor="currentPassword" className="text-gray-700">
                        Mật khẩu hiện tại
                     </Label>
                     <div className="relative">
                        <Input
                           id="currentPassword"
                           name="currentPassword"
                           type={showCurrentPassword ? 'text' : 'password'}
                           value={formData.currentPassword}
                           onChange={handleInputChange}
                           required
                           className="border-gray-300 focus:border-gray-900 pr-10"
                           placeholder="Nhập mật khẩu hiện tại"
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="sm"
                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                           {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                           ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                           )}
                        </Button>
                     </div>
                  </div>
               )}

               <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-700">
                     Mật khẩu mới
                  </Label>
                  <div className="relative">
                     <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-gray-900 pr-10"
                        placeholder="Nhập mật khẩu mới (ít nhất 8 ký tự)"
                     />
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                     >
                        {showNewPassword ? (
                           <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                           <Eye className="h-4 w-4 text-gray-500" />
                        )}
                     </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                     <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Độ mạnh mật khẩu</span>
                              <span className="font-medium text-gray-900">
                                 {strengthPercentage}%
                              </span>
                           </div>
                           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                 className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                 style={{ width: `${strengthPercentage}%` }}
                              />
                           </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="grid grid-cols-2 gap-2">
                           <div className="flex items-center gap-2">
                              <CheckCircle
                                 className={`h-4 w-4 ${
                                    passwordStrength.length ? 'text-green-500' : 'text-gray-300'
                                 }`}
                              />
                              <span
                                 className={`text-sm ${
                                    passwordStrength.length ? 'text-gray-700' : 'text-gray-500'
                                 }`}
                              >
                                 Ít nhất 8 ký tự
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <CheckCircle
                                 className={`h-4 w-4 ${
                                    passwordStrength.uppercase ? 'text-green-500' : 'text-gray-300'
                                 }`}
                              />
                              <span
                                 className={`text-sm ${
                                    passwordStrength.uppercase ? 'text-gray-700' : 'text-gray-500'
                                 }`}
                              >
                                 Chữ hoa (A-Z)
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <CheckCircle
                                 className={`h-4 w-4 ${
                                    passwordStrength.lowercase ? 'text-green-500' : 'text-gray-300'
                                 }`}
                              />
                              <span
                                 className={`text-sm ${
                                    passwordStrength.lowercase ? 'text-gray-700' : 'text-gray-500'
                                 }`}
                              >
                                 Chữ thường (a-z)
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <CheckCircle
                                 className={`h-4 w-4 ${
                                    passwordStrength.number ? 'text-green-500' : 'text-gray-300'
                                 }`}
                              />
                              <span
                                 className={`text-sm ${
                                    passwordStrength.number ? 'text-gray-700' : 'text-gray-500'
                                 }`}
                              >
                                 Số (0-9)
                              </span>
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                     Xác nhận mật khẩu mới
                  </Label>
                  <div className="relative">
                     <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={`border-gray-300 focus:border-gray-900 pr-10 ${
                           formData.newPassword &&
                           formData.confirmPassword &&
                           formData.newPassword !== formData.confirmPassword
                              ? 'border-red-300 focus:border-red-500'
                              : ''
                        }`}
                        placeholder="Nhập lại mật khẩu mới"
                     />
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     >
                        {showConfirmPassword ? (
                           <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                           <Eye className="h-4 w-4 text-gray-500" />
                        )}
                     </Button>
                  </div>
                  {formData.newPassword &&
                     formData.confirmPassword &&
                     formData.newPassword !== formData.confirmPassword && (
                        <p className="text-sm text-red-500">Mật khẩu xác nhận không khớp</p>
                     )}
               </div>

               <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={onClose}
                     disabled={isLoading}
                     className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                     Hủy
                  </Button>
                  <Button
                     type="submit"
                     disabled={isLoading || formData.newPassword !== formData.confirmPassword}
                     className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                     {isLoading ? (
                        <>
                           <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                           Đang xử lý...
                        </>
                     ) : hasPassword ? (
                        'Đổi mật khẩu'
                     ) : (
                        'Đặt mật khẩu'
                     )}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
