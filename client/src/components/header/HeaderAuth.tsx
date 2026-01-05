'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useRef, useState } from 'react';
import { AuthService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function HeaderAuth() {
   const router = useRouter();

   const { user, hydrated, clearAuth } = useAuthStore();
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleLogout = async () => {
      try {
         await AuthService.logout();
      } catch {}
      setOpen(false);
      clearAuth();
      router.push('/');
   };

   if (!hydrated) {
      return (
         <div className="flex gap-3">
            <div className="h-9 w-20 rounded-xl bg-gray-200 animate-pulse" />
            <div className="h-9 w-20 rounded-xl bg-gray-200 animate-pulse" />
         </div>
      );
   }

   if (!user) {
      return (
         <div className="flex gap-3">
            <Link
               href="/login"
               className="rounded-xl px-4 py-2 text-sm font-medium border border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
            >
               Đăng nhập
            </Link>

            <Link
               href="/register"
               className="rounded-xl px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-black transition-colors shadow-sm cursor-pointer"
            >
               Đăng ký
            </Link>
         </div>
      );
   }

   return (
      <div>
         {
            <>
               <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100"
               >
                  <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                     {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.username}</span>
               </button>

               {open && (
                  <div
                     ref={dropdownRef}
                     className="absolute right-0 top-14 w-56 rounded-xl border bg-white shadow-lg overflow-hidden z-50"
                  >
                     <div className="px-4 py-3 text-sm text-gray-600">
                        Xin chào:
                        <span className="font-medium text-gray-900 ml-1.5">{user.username}</span>
                     </div>

                     <div className="border-t" />

                     <ul className="py-2 text-sm">
                        <li>
                           <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">
                              Thông tin tài khoản
                           </Link>
                        </li>
                        <li>
                           <Link href="/wallet" className="block px-4 py-2 hover:bg-gray-100">
                              Nạp tiền
                           </Link>
                        </li>
                        <li>
                           <Link href="/transactions" className="block px-4 py-2 hover:bg-gray-100">
                              Lịch sử giao dịch
                           </Link>
                        </li>
                        <li>
                           <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                              Đơn hàng
                           </Link>
                        </li>
                     </ul>

                     <div className="border-t" />

                     <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                     >
                        Đăng xuất
                     </button>
                  </div>
               )}
            </>
         }
      </div>
   );
}
