import Link from 'next/link';

export default function HeaderSkeleton() {
   return (
      <header className="w-full border-b border-neutral-200">
         {/* Top bar */}
         <div className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-2 text-sm">
               <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                     <span className="font-medium">NQHxDev</span> — FullStack Developer
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gp-2">
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
                        <span className="text-sm text-gray-200"> nguyenhungdev.vn@gmail.com</span>
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
                        <span className="text-sm text-gray-200"> +84 966 376 155</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Main */}
         <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="group relative text-xl font-bold tracking-tight">
                     <span className="relative z-10 text-black">
                        Zeion
                        <span className="text-neutral-500">Store</span>
                     </span>
                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </Link>

                  {/* Nav */}
                  <nav className="hidden md:flex items-center text-gray-800 gap-8 text-sm font-bold">
                     <Link href="/" className="group relative">
                        <span className="relative">Trang chủ</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </Link>
                     <Link href="/products" className="group relative">
                        <span className="relative">Sản phẩm</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </Link>

                     <Link href="/introduce" className="group relative">
                        <span className="relative">Giới thiệu</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </Link>
                     <Link href="/contact" className="group relative">
                        <span className="relative">Liên hệ</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                     </Link>
                  </nav>

                  <div className="flex gap-3">
                     <Link
                        href="/login"
                        className="rounded-xl px-4 py-2 text-sm font-medium border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-pointer"
                     >
                        Đăng nhập
                     </Link>

                     <Link
                        href="/register"
                        className="rounded-xl px-4 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-black transition-all shadow-sm cursor-pointer"
                     >
                        Đăng ký
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}
