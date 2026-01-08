'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
         <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
               <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h2>
            <p className="text-gray-600 mb-6">
               Không thể tải trang quản lý sản phẩm. Vui lòng thử lại sau.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
               <p className="text-sm font-medium text-gray-700 mb-1">Chi tiết lỗi:</p>
               <p className="text-sm text-gray-600 font-mono break-all">{error.message}</p>
            </div>

            <div className="flex gap-3">
               <button
                  onClick={reset}
                  className="flex-1 bg-gray-900 text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
               >
                  Thử Lại
               </button>
               <button
                  onClick={() => (window.location.href = '/dashboard')}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
               >
                  Về Dashboard
               </button>
            </div>
         </div>
      </div>
   );
}
