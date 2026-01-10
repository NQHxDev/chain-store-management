'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import { AxiosError } from 'axios';

type LoginPayload = {
   identifier: string;
   password: string;
   remember: boolean;
};

type ApiErrorResponse = {
   success: false;
   error: {
      code: number;
      message: string;
      type: string;
   };
};

export default function LoginForm() {
   const router = useRouter();

   const [form, setForm] = useState<LoginPayload>({
      identifier: '',
      password: '',
      remember: false,
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const getAuthErrorMessage = (err: unknown): string => {
      if (err instanceof Error) {
         const axiosError = err as AxiosError<ApiErrorResponse>;

         return axiosError.response?.data?.error?.message || 'Đăng nhập thất bại';
      }

      return 'Đăng nhập thất bại';
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const login = useAuthStore((s) => s.login);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
         await login(form);

         toast.success('Đăng nhập thành công!', { duration: 1500 });

         router.push('/');
      } catch (err) {
         setError(getAuthErrorMessage(err));
      } finally {
         setLoading(false);
         setForm((p) => ({ ...p, password: '' }));
      }
   };

   return (
      <form className="space-y-4" onSubmit={handleSubmit} method="POST">
         {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
               {error}
            </p>
         )}

         <div className="space-y-1.5">
            <Label htmlFor="identifier">Email hoặc Tên đăng nhập</Label>
            <Input
               id="identifier"
               name="identifier"
               value={form.identifier}
               onChange={handleChange}
               placeholder="you@example.com"
               required
            />
         </div>

         <div className="space-y-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
               id="password"
               name="password"
               type="password"
               value={form.password}
               onChange={handleChange}
               required
            />
         </div>

         <div className="flex items-center space-x-2 ">
            <Checkbox
               id="remember"
               checked={form.remember}
               onCheckedChange={(checked) => {
                  setForm({ ...form, remember: !!checked });
               }}
               className="cursor-pointer"
            />
            <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
               Ghi nhớ đăng nhập
            </Label>
         </div>

         <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
         </Button>
      </form>
   );
}
