import React from 'react';

export default function Loading() {
   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto">
            {/* Header skeleton */}
            <div className="mb-8">
               <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
               <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                     <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                     <div className="h-8 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                     <div className="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
                  </div>
               ))}
            </div>

            {/* Table skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
               </div>

               <div className="p-6">
                  {[...Array(5)].map((_, i) => (
                     <div
                        key={i}
                        className="flex items-center h-16 border-b border-gray-100 last:border-0"
                     >
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
