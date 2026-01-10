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
import { useAuthStore } from '@/stores/authStore';
import { CheckCircle, Eye, EyeOff, XCircle } from 'lucide-react';

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

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   // --- Validation functions ---
   const validateEmail = (value: string): string | null => {
      if (!value.trim()) return 'Email là bắt buộc';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) return 'Email không hợp lệ';
      return null;
   };

   const validateUsername = (value: string): string | null => {
      const trimmedValue = value.trim();
      if (!trimmedValue) return 'Vui lòng nhập Tên đăng nhập';
      if (trimmedValue.length < 6 || trimmedValue.length > 30) {
         return 'Tài khoản phải từ 6 đến 30 ký tự';
      }
      const latinRegex = /^[a-zA-Z0-9]+$/;

      if (!latinRegex.test(trimmedValue)) {
         return 'Tài khoản không chưa ký tự đặc biệt hay khoảng trắng';
      }
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

   const isLengthValid = password.length >= 6;
   const hasUppercase = /[A-Z]/.test(password);
   const hasNumber = /\d/.test(password);
   const isAllValid = isLengthValid && hasUppercase && hasNumber;

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
         await AuthService.register({
            email,
            username,
            password,
            confirmPassword,
         });

         await new Promise((resolve) => setTimeout(resolve, 1000));

         const res = await AuthService.login({
            identifier: email,
            password,
         });

         const { account, tokens } = res.data.data;

         useAuthStore.getState().setAuth(account, tokens.accessToken);

         toast.success('Đăng ký thành công!', {
            description: 'Chúc bạn có trải nghiệm vui vẻ',
            duration: 2000,
         });

         resetForm();

         setTimeout(() => {
            router.push('/');
         }, 200);
      } catch (err: unknown) {
         setPassword('');
         setPasswordTouched(false);
         setConfirmPassword('');
         setConfirmPasswordTouched(false);

         let message = 'Đăng ký thất bại';

         if (axios.isAxiosError(err)) {
            message = err.response?.data?.message || err.message || message;
         } else if (err instanceof Error) {
            message = err.message;
         }

         setServerError(message);
         toast.error('Đăng ký thất bại', {
            description: message,
            duration: 2000,
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
            <div className="text-xs min-h-5">
               {emailChecking && <span className="text-muted-foreground">Đang kiểm tra...</span>}

               {!emailChecking && emailError && <span className="text-red-500">{emailError}</span>}

               {!emailChecking && !emailError && email && emailAvailable && (
                  <div className="flex items-center gap-1 mt-1">
                     <CheckCircle className="w-4 h-4 text-green-600" />
                     <p className="text-xs text-green-600 font-medium">Email chưa đăng ký</p>
                  </div>
               )}

               {!emailChecking && email && emailAvailable === false && (
                  <div className="flex items-center gap-1 mt-1 pt-1">
                     <XCircle className="w-4 h-4 text-red-500" />
                     <p className="text-xs text-red-500">Email đã tồn tại</p>
                  </div>
               )}
            </div>
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
            <div className="text-xs min-h-5">
               {isUsernameUnlocked && usernameChecking && (
                  <span className="text-muted-foreground">Đang kiểm tra...</span>
               )}

               {isUsernameUnlocked && usernameError && (
                  <div className="flex items-center gap-1 mt-1 pt-1">
                     <XCircle className="w-4 h-4 text-red-500" />
                     <p className="text-xs text-red-500">{usernameError}</p>
                  </div>
               )}

               {isUsernameUnlocked && !usernameError && username && usernameAvailable && (
                  <div className="flex items-center gap-1 mt-1">
                     <CheckCircle className="w-4 h-4 text-green-600" />
                     <p className="text-xs text-green-600 font-medium">Có thể sử dụng</p>
                  </div>
               )}

               {isUsernameUnlocked && username && usernameAvailable === false && (
                  <div className="flex items-center gap-1 mt-1 pt-1">
                     <XCircle className="w-4 h-4 text-red-500" />
                     <p className="text-xs text-red-500">Tài khoản đã tồn tại</p>
                  </div>
               )}
            </div>
         </div>

         {/* Password */}
         <div className="space-y-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
               <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  disabled={!isUsernameUnlocked}
                  className="pr-10"
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
               >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
               </button>
            </div>

            {passwordTouched && (
               <>
                  {!isAllValid ? (
                     <ul className="text-xs mt-1 text-muted-foreground space-y-0.5">
                        <li className={isLengthValid ? 'text-green-600' : ''}>• Ít nhất 6 ký tự</li>
                        <li className={hasUppercase ? 'text-green-600' : ''}>• Có chữ hoa</li>
                        <li className={hasNumber ? 'text-green-600' : ''}>• Có số</li>

                        {passwordError && (
                           <div className="flex items-center gap-1 mt-1 pt-1">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <p className="text-xs text-red-500">{passwordError}</p>
                           </div>
                        )}
                     </ul>
                  ) : (
                     <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <p className="text-xs text-green-600 font-medium">Mật khẩu hợp lệ</p>
                     </div>
                  )}
               </>
            )}
         </div>

         {/* Confirm Password */}
         <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
               <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  disabled={!isUsernameUnlocked}
                  className="pr-10"
               />
               <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
               >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
               </button>
            </div>
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

         <Button className="mt-4 w-full" disabled={!canSubmit} type="submit">
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
         </Button>
         {serverError && <p className="text-sm text-red-500 text-center">{serverError}</p>}
      </form>
   );
}
