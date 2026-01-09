'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { JSX, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { toast } from 'sonner';

import axios from 'axios';
import { useDebouncedCheck } from '@/hooks/useDebouncedCheck';
import { AuthService } from '@/services/authService';

export default function RegisterForm(): JSX.Element {
   const router = useRouter();

   const [email, setEmail] = useState('');
   const [emailTouched, setEmailTouched] = useState(false);

   const [username, setUsername] = useState('');
   const [usernameTouched, setUsernameTouched] = useState(false);

   const [password, setPassword] = useState('');
   const [passwordTouched, setPasswordTouched] = useState(false);

   const [confirmPassword, setConfirmPassword] = useState('');
   const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

   const [termsChecked, setTermsChecked] = useState(false);

   const [loading, setLoading] = useState(false);
   const [serverError, setServerError] = useState<string | null>(null);

   // --- Validation functions ---
   const validateEmail = (value: string): string | null => {
      if (!value.trim()) return 'Email là bắt buộc';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) return 'Email không hợp lệ';
      return null;
   };

   const validateUsername = (value: string): string | null => {
      if (!value.trim()) return 'Vui lòng nhập Tên đăng nhập';
      if (value.length < 6 || value.length > 30) return 'Tài khoản phải từ 6 đến 30 ký tự';
      return null;
   };

   const validatePassword = (value: string): string | null => {
      if (!value.trim()) return 'Mật khẩu là bắt buộc';
      if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
         return 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
      return null;
   };

   const validateConfirmPassword = (value: string): string | null => {
      if (!value.trim()) return 'Xác nhận mật khẩu là bắt buộc';
      if (value !== password) return 'Mật khẩu xác nhận không khớp';
      return null;
   };

   const { available: emailAvailable, checking: emailChecking } = useDebouncedCheck(
      email,
      '/auth/check-identifier'
   );

   const { available: usernameAvailable, checking: usernameChecking } = useDebouncedCheck(
      username,
      '/auth/check-identifier'
   );

   const emailError = emailTouched ? validateEmail(email) : null;
   const isUsernameUnlocked = emailAvailable === true && !emailError;

   const usernameError = isUsernameUnlocked && usernameTouched ? validateUsername(username) : null;
   const passwordError = isUsernameUnlocked && passwordTouched ? validatePassword(password) : null;
   const confirmPasswordError =
      isUsernameUnlocked && confirmPasswordTouched
         ? validateConfirmPassword(confirmPassword)
         : null;

   const canSubmit =
      isUsernameUnlocked &&
      !usernameError &&
      !passwordError &&
      !confirmPasswordError &&
      usernameAvailable &&
      emailAvailable &&
      termsChecked;

   const resetForm = () => {
      setEmail('');
      setEmailTouched(false);

      setUsername('');
      setUsernameTouched(false);

      setPassword('');
      setPasswordTouched(false);

      setConfirmPassword('');
      setConfirmPasswordTouched(false);

      setTermsChecked(false);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!canSubmit) return;

      setLoading(true);
      setServerError(null);

      try {
         // Axios sẽ tự động throw error nếu status code không nằm trong dải 2xx
         await AuthService.register({
            email,
            username,
            password,
            confirmPassword,
         });

         toast.success('Đăng ký thành công!', {
            description: 'Vui lòng đăng nhập để tiếp tục',
            duration: 2000,
         });

         resetForm();

         setTimeout(() => {
            router.push('/login');
         }, 1000);
      } catch (err: unknown) {
         // Xử lý UI khi có lỗi
         setPassword('');
         setPasswordTouched(false);
         setConfirmPassword('');
         setConfirmPasswordTouched(false);

         let message = 'Đăng ký thất bại';

         // SỬA TẠI ĐÂY: Dùng axios.isAxiosError
         if (axios.isAxiosError(err)) {
            // Truy cập vào cấu trúc res.data.message mà Backend trả về
            message = err.response?.data?.message || err.message || message;
         } else if (err instanceof Error) {
            message = err.message;
         }

         setServerError(message);
         toast.error('Đăng ký thất bại', {
            description: message,
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <form className="space-y-4" onSubmit={handleSubmit}>
         {/* Email */}
         <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
               id="email"
               type="email"
               placeholder="you@example.com"
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
               onBlur={() => {
                  setEmailTouched(true);
               }}
            />
            <p className="text-xs">
               {emailChecking && 'Đang kiểm tra...'}
               {emailTouched && emailError && <span className="text-red-500">{emailError}</span>}
               {!emailChecking && emailTouched && emailAvailable && !emailError && (
                  <span className="text-green-600">Email hợp lệ</span>
               )}
               {!emailChecking && emailTouched && emailAvailable === false && (
                  <span className="text-red-500">Email đã tồn tại</span>
               )}
            </p>
         </div>

         {/* Username */}
         <div className="space-y-1.5">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
               id="username"
               placeholder="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               onBlur={() => {
                  setUsernameTouched(true);
               }}
               disabled={!isUsernameUnlocked}
            />
            <p className="text-xs">
               {isUsernameUnlocked && usernameChecking && 'Đang kiểm tra...'}

               {isUsernameUnlocked &&
                  usernameTouched &&
                  (usernameError ? (
                     <span className="text-red-500">{usernameError}</span>
                  ) : usernameAvailable === false ? (
                     <span className="text-red-500">Tài khoản đã tồn tại</span>
                  ) : usernameAvailable ? (
                     <span className="text-green-600">Có thể sử dụng</span>
                  ) : null)}
            </p>
         </div>

         {/* Password */}
         <div className="space-y-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               onBlur={() => setPasswordTouched(true)}
               disabled={!isUsernameUnlocked}
            />
            {passwordTouched && passwordError && (
               <p className="text-xs text-red-500">{passwordError}</p>
            )}
         </div>

         {/* Confirm Password */}
         <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input
               id="confirmPassword"
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               onBlur={() => setConfirmPasswordTouched(true)}
               disabled={!isUsernameUnlocked}
            />
            {confirmPasswordTouched && confirmPasswordError && (
               <p className="text-xs text-red-500">{confirmPasswordError}</p>
            )}
         </div>

         {/* Terms */}
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
               <Checkbox
                  id="terms"
                  checked={termsChecked}
                  onCheckedChange={(checked: boolean) => setTermsChecked(!!checked)}
                  disabled={!isUsernameUnlocked}
                  className="cursor-pointer"
               />
               <Label htmlFor="terms" className="text-muted-foreground cursor-pointer">
                  Đồng ý với{' '}
                  <Link
                     href="/terms"
                     target="_blank"
                     className="font-medium text-foreground underline underline-offset-4"
                  >
                     Điều khoản
                  </Link>{' '}
                  và{' '}
                  <Link
                     href="/privacy"
                     target="_blank"
                     className="font-medium text-foreground underline underline-offset-4"
                  >
                     Chính sách bảo mật
                  </Link>
               </Label>
            </div>
         </div>

         <Button className="mt-4 w-full" disabled={!canSubmit || loading} type="submit">
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
         </Button>
         {serverError && <p className="text-sm text-red-500 text-center">{serverError}</p>}
      </form>
   );
}
