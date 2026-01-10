'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
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
import { Phone, CheckCircle, X, Clock, AlertCircle } from 'lucide-react';

interface VerifyPhoneModalProps {
   isOpen: boolean;
   onClose: () => void;
}

type VerificationStep = 'input' | 'verify' | 'success' | 'error';

export default function VerifyPhoneModal({ isOpen, onClose }: VerifyPhoneModalProps) {
   const [step, setStep] = useState<VerificationStep>('input');
   const [isLoading, setIsLoading] = useState(false);
   const [countdown, setCountdown] = useState(0);
   const [errorMessage, setErrorMessage] = useState('');

   const [formData, setFormData] = useState({
      phone: '',
      otp: '',
   });

   const [otp, setOtp] = useState(['', '', '', '', '', '']);
   const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

   // Countdown timer for OTP resend
   useEffect(() => {
      let timer: NodeJS.Timeout;
      if (countdown > 0) {
         timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      }
      return () => clearTimeout(timer);
   }, [countdown]);

   const formatPhoneNumber = (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,3})$/);
      if (!match) return value;

      const parts = match.slice(1).filter(Boolean);
      return parts.join(' ') + (parts.length ? '' : '');
   };

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      setErrorMessage('');
   };

   const handleOtpChange = (value: string, index: number) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
         otpInputRefs.current[index + 1]?.focus();
      }

      // Update form data
      setFormData((prev) => ({ ...prev, otp: newOtp.join('') }));
   };

   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
         otpInputRefs.current[index - 1]?.focus();
      }
   };

   const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, 6);
      if (/^\d+$/.test(pastedData)) {
         const newOtp = pastedData.split('').slice(0, 6);
         setOtp(newOtp);
         setFormData((prev) => ({ ...prev, otp: newOtp.join('') }));

         // Focus last input
         const lastIndex = Math.min(newOtp.length - 1, 5);
         otpInputRefs.current[lastIndex]?.focus();
      }
   };

   const sendOTP = async () => {
      if (!formData.phone.replace(/\s/g, '').match(/^0[0-9]{9}$/)) {
         setErrorMessage('Số điện thoại không hợp lệ');
         return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
         const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: formData.phone.replace(/\s/g, '') }),
         });

         if (!response.ok) {
            throw new Error('Không thể gửi mã OTP');
         }

         setStep('verify');
         setCountdown(60);

         toast.success('Mã OTP đã được gửi!', {
            description: 'Vui lòng kiểm tra tin nhắn',
            duration: 2000,
         });
      } catch (error) {
         setErrorMessage(error instanceof Error ? error.message : 'Đã xảy ra lỗi');
         toast.error('Xảy ra lỗi gửi OTP', {
            description: 'Không thể gửi mã OTP!',
            duration: 2000,
         });
      } finally {
         setIsLoading(false);
      }
   };

   const verifyOTP = async () => {
      if (formData.otp.length !== 6) {
         setErrorMessage('Vui lòng nhập đủ 6 số OTP');
         return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
         const response = await fetch('/api/auth/verify-phone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               phone: formData.phone.replace(/\s/g, ''),
               otp: formData.otp,
            }),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Xác minh thất bại');
         }

         setStep('success');
         toast.success('Thiết lập thành công!', {
            description: 'Số điện thoại đã được xác minh',
            duration: 2000,
         });

         // Auto close after success
         setTimeout(() => {
            onClose();
            resetForm();
         }, 2000);
      } catch (error) {
         setStep('error');
         setErrorMessage(error instanceof Error ? error.message : 'Mã OTP không chính xác');
      } finally {
         setIsLoading(false);
      }
   };

   const resetForm = () => {
      setStep('input');
      setFormData({ phone: '', otp: '' });
      setOtp(['', '', '', '', '', '']);
      setCountdown(0);
      setErrorMessage('');
   };

   const handleClose = () => {
      onClose();
      setTimeout(resetForm, 300); // Reset after modal closes
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="sm:max-w-md bg-white border border-gray-200">
            <DialogHeader>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                     {step === 'input' && 'Thêm số điện thoại'}
                     {step === 'verify' && 'Xác minh số điện thoại'}
                     {step === 'success' && 'Xác minh thành công'}
                     {step === 'error' && 'Xác minh thất bại'}
                  </DialogTitle>
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={handleClose}
                     className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </div>
               <DialogDescription className="text-gray-600">
                  {step === 'input' && 'Nhập số điện thoại để nhận mã xác minh'}
                  {step === 'verify' && 'Nhập mã OTP 6 số đã được gửi đến số điện thoại của bạn'}
                  {step === 'success' && 'Số điện thoại của bạn đã được xác minh thành công'}
                  {step === 'error' && 'Không thể xác minh số điện thoại'}
               </DialogDescription>
            </DialogHeader>

            {/* Step 1: Input Phone Number */}
            {step === 'input' && (
               <div className="space-y-6">
                  <div className="space-y-2">
                     <Label htmlFor="phone" className="text-gray-700">
                        Số điện thoại
                     </Label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                           id="phone"
                           type="tel"
                           value={formData.phone}
                           onChange={handlePhoneChange}
                           className="pl-10 border-gray-300 focus:border-gray-900"
                           placeholder="090 1234 567"
                           maxLength={12}
                        />
                     </div>
                     <p className="text-sm text-gray-500">
                        Mã OTP sẽ được gửi đến số điện thoại này
                     </p>
                  </div>

                  {errorMessage && (
                     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-700">{errorMessage}</p>
                     </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                     <Button
                        onClick={sendOTP}
                        disabled={
                           isLoading || !formData.phone.replace(/\s/g, '').match(/^0[0-9]{9}$/)
                        }
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                     >
                        {isLoading ? (
                           <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                              Đang gửi mã...
                           </>
                        ) : (
                           'Gửi mã OTP'
                        )}
                     </Button>
                  </div>
               </div>
            )}

            {/* Step 2: Verify OTP */}
            {step === 'verify' && (
               <div className="space-y-6">
                  <div className="text-center">
                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Phone className="h-6 w-6 text-gray-700" />
                     </div>
                     <p className="text-gray-700 font-medium">Mã OTP đã được gửi đến</p>
                     <p className="text-lg font-semibold text-gray-900">{formData.phone}</p>
                  </div>

                  <div className="space-y-4">
                     <Label className="text-gray-700 block text-center">Nhập mã OTP 6 số</Label>
                     <div className="flex justify-center gap-2" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                           <Input
                              key={index}
                              ref={(el) => {
                                 otpInputRefs.current[index] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              value={digit}
                              onChange={(e) => handleOtpChange(e.target.value, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              maxLength={1}
                              className="w-12 h-12 text-center text-xl border-gray-300 focus:border-gray-900"
                           />
                        ))}
                     </div>
                  </div>

                  {errorMessage && (
                     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-700">{errorMessage}</p>
                     </div>
                  )}

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                           {countdown > 0 ? (
                              <>
                                 <Clock className="h-4 w-4 text-gray-500" />
                                 <span className="text-gray-600">Gửi lại mã sau {countdown}s</span>
                              </>
                           ) : (
                              <Button
                                 variant="link"
                                 onClick={sendOTP}
                                 disabled={isLoading}
                                 className="h-auto p-0 text-gray-700"
                              >
                                 Gửi lại mã OTP
                              </Button>
                           )}
                        </div>
                        <Button
                           variant="link"
                           onClick={() => setStep('input')}
                           className="h-auto p-0 text-gray-700"
                        >
                           Thay đổi số điện thoại
                        </Button>
                     </div>

                     <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={handleClose}
                           disabled={isLoading}
                           className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                           Hủy
                        </Button>
                        <Button
                           onClick={verifyOTP}
                           disabled={isLoading || formData.otp.length !== 6}
                           className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                        >
                           {isLoading ? (
                              <>
                                 <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                 Đang xác minh...
                              </>
                           ) : (
                              'Xác minh'
                           )}
                        </Button>
                     </div>
                  </div>
               </div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
               <div className="space-y-6 text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                     <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-semibold text-gray-900">Xác minh thành công!</h3>
                     <p className="text-gray-600">
                        Số điện thoại {formData.phone} đã được xác minh và liên kết với tài khoản
                        của bạn
                     </p>
                  </div>
                  <div className="pt-4">
                     <Button
                        onClick={handleClose}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                     >
                        Hoàn thành
                     </Button>
                  </div>
               </div>
            )}

            {/* Step 4: Error */}
            {step === 'error' && (
               <div className="space-y-6 text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                     <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-semibold text-gray-900">Xác minh thất bại</h3>
                     <p className="text-gray-600">
                        {errorMessage || 'Không thể xác minh số điện thoại. Vui lòng thử lại.'}
                     </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                     <Button
                        variant="outline"
                        onClick={() => setStep('verify')}
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                     >
                        Thử lại
                     </Button>
                     <Button
                        variant="outline"
                        onClick={() => setStep('input')}
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                     >
                        Nhập số khác
                     </Button>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}
