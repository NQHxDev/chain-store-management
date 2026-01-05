export default function HeaderSkeleton() {
   return (
      <header className="w-full border-b border-neutral-200 bg-white">
         {/* Top bar skeleton */}
         <div className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-2">
               <div className="flex justify-between items-center">
                  <div className="h-4 w-48 bg-gray-800 rounded animate-pulse"></div>
                  <div className="flex gap-4">
                     <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
                     <div className="h-4 w-32 bg-gray-800 rounded animate-pulse"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main header skeleton */}
         <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
               <div className="flex justify-between items-center">
                  <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="hidden md:flex gap-8">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                     ))}
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                     <div className="h-10 w-24 bg-gray-800 rounded-xl animate-pulse"></div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}
