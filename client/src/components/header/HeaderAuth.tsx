import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { hasAnyRole } from '@/lib/account/Role';
import { LogOut } from 'lucide-react';

export default function HeaderAuth() {
   const { account, logout } = useAuthStore();

   const hydrated = useAuthStore((s) => s.hydrated);

   if (!hydrated) {
      return (
         <div className="flex gap-3">
            <div className="h-9 w-20 rounded-xl bg-gray-200 animate-pulse" />
            <div className="h-9 w-20 rounded-xl bg-gray-200 animate-pulse" />
         </div>
      );
   }

   if (!account) {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className="flex items-center gap-2 p-2 border border-gray-200 rounded-full hover:shadow-md transition-all duration-200 bg-white focus:outline-none">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5 text-gray-600 ml-1"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                     />
                  </svg>

                  <div className="bg-gray-500 text-white rounded-full p-1">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                     >
                        <path
                           fillRule="evenodd"
                           d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </div>
               </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
               align="end"
               sideOffset={8}
               className="w-56 rounded-xl border border-gray-100 shadow-xl py-2"
            >
               <DropdownMenuItem asChild>
                  <Link
                     href="/login"
                     className="px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer"
                  >
                     Đăng nhập
                  </Link>
               </DropdownMenuItem>

               <DropdownMenuItem asChild>
                  <Link href="/register" className="px-4 py-3 text-sm text-gray-600 cursor-pointer">
                     Đăng ký
                  </Link>
               </DropdownMenuItem>

               <DropdownMenuSeparator />

               <DropdownMenuItem asChild>
                  <Link href="/help" className="px-4 py-3 text-sm text-gray-600 cursor-pointer">
                     Trung tâm trợ giúp
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }

   const renderManagerPanel = () => {
      if (!account || !account.roles) return null;

      if (!hasAnyRole(account.roles, ['admin', 'manager'])) return null;

      return (
         <>
            <DropdownMenuGroup>
               <div className="flex items-center justify-center px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Manager Panel
               </div>
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                     <span>Quản lý dịch vụ</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                     <DropdownMenuSubContent className="min-w-45">
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <Link href="/dashboard/products">Đơn hàng</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <Link href="#">Sản phẩm</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <Link href="/dashboard/brands">Các nhãn hàng</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer text-blue-500">
                           <Link href="#">Báo cáo doanh thu</Link>
                        </DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuPortal>
               </DropdownMenuSub>
               <DropdownMenuItem className="cursor-pointer">Cài đặt chung</DropdownMenuItem>
               {hasAnyRole(account.roles, ['admin']) && (
                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger className="cursor-pointer">
                        <span>Quản lý hệ thống</span>
                     </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                        <DropdownMenuSubContent className="min-w-45">
                           <DropdownMenuItem asChild className="cursor-pointer">
                              <Link href="/dashboard/accounts">Danh sách User</Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild className="cursor-pointer">
                              <Link href="#">Quyền hạn</Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild className="cursor-pointer">
                              <Link href="#">Các nhãn hàng</Link>
                           </DropdownMenuItem>
                        </DropdownMenuSubContent>
                     </DropdownMenuPortal>
                  </DropdownMenuSub>
               )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
         </>
      );
   };

   return (
      <div className="flex items-center gap-2 relative">
         <div className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            <Link href="/notifications"></Link>
         </div>

         <DropdownMenu>
            <DropdownMenuTrigger
               asChild
               className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-700"
            >
               <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-zinc-100 active:bg-zinc-200 outline-none group">
                  <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold transition-transform group-hover:scale-105">
                     {account.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
                     {account.username}
                  </span>
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
               <DropdownMenuLabel>
                  <div className="text-sm text-gray-600 flex flex-wrap items-center gap-1">
                     <span>Xin chào:</span>
                     <span
                        className={`text-gray-900 truncate text-sm leading-tight ${
                           account.username.length > 15 ? 'block w-full' : 'inline-block'
                        }`}
                        title={account.username}
                     >
                        {account.username}
                     </span>
                  </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                     <Link href="/account/profile" className="py-1">
                        Thông tin tài khoản
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/wallet" className="py-1">
                        Nạp tiền
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/transactions" className="py-1">
                        Lịch sử giao dịch
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/orders" className="py-1">
                        Đơn hàng
                     </Link>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />

               {renderManagerPanel()}

               <DropdownMenuItem asChild>
                  <Link
                     href="https://github.com/NQHxDev/chain-store-management.git"
                     target="_blank"
                     className="py-1"
                  >
                     GitHub
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild>
                  <Link href="#" className="py-1">
                     Support
                  </Link>
               </DropdownMenuItem>
               {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
               <DropdownMenuSeparator />
               <DropdownMenuItem variant="destructive" onSelect={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
