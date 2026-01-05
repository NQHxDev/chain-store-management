'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { AuthService } from '@/services/authService';

export default function Header() {
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
      return null;
   }

   return (
      <header className="w-full border-b border-neutral-200 dark:bg-black">
         <div className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-2 text-sm">
               <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                     <span className="font-medium">NQHxDev</span> — FullStack Developer
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-300"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                        </svg>
                        <span className="text-sm text-gray-200">
                           {' '}
                           {/* Thêm text-gray-200 */}
                           nguyenhungdev.vn@gmail.com
                        </span>
                     </div>

                     <div className="flex items-center gap-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-300"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <span className="text-sm text-gray-200">
                           {' '}
                           {/* Thêm text-gray-200 */}
                           +84 966 376 155
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="group relative text-xl font-bold tracking-tight">
                     <span className="relative z-10 text-black">
                        WebStore
                        <span className="text-neutral-500">Game</span>
                     </span>
                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  {/* Navigation */}
                  <nav className="hidden md:flex items-center text-gray-800 gap-8 text-sm font-bold">
                     <a href="#" className="group relative">
                        <span className="relative">Trang chủ</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </a>
                     <a href="#" className="group relative">
                        <span className="relative">Sản phẩm</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </a>
                     <a href="#" className="group relative">
                        <span className="relative">Giới thiệu</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </a>
                     <a href="#" className="group relative">
                        <span className="relative">Liên hệ</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </a>
                  </nav>

                  <div className="flex items-center gap-3  relative">
                     {user && (
                        <button
                           onClick={() => router.push('/notifications')}
                           className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                           </svg>
                           <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                     )}

                     {!user ? (
                        <>
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
                        </>
                     ) : (
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
                                    <span className="font-medium text-gray-900 ml-1.5">
                                       {user.username}
                                    </span>
                                 </div>

                                 <div className="border-t" />

                                 <ul className="py-2 text-sm">
                                    <li>
                                       <Link
                                          href="/account"
                                          className="block px-4 py-2 hover:bg-gray-100"
                                       >
                                          Thông tin tài khoản
                                       </Link>
                                    </li>
                                    <li>
                                       <Link
                                          href="/wallet"
                                          className="block px-4 py-2 hover:bg-gray-100"
                                       >
                                          Nạp tiền
                                       </Link>
                                    </li>
                                    <li>
                                       <Link
                                          href="/transactions"
                                          className="block px-4 py-2 hover:bg-gray-100"
                                       >
                                          Lịch sử giao dịch
                                       </Link>
                                    </li>
                                    <li>
                                       <Link
                                          href="/orders"
                                          className="block px-4 py-2 hover:bg-gray-100"
                                       >
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
                     )}
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}
