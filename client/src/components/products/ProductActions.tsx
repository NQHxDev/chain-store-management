'use client';

import React from 'react';
import { Plus, Upload, Download, Printer } from 'lucide-react';

const ProductActions: React.FC = () => {
   return (
      <div className="flex flex-wrap gap-3">
         <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Thêm Sản Phẩm
         </button>

         <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Nhập File</span>
         </button>

         <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Xuất File</span>
         </button>

         <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">In</span>
         </button>
      </div>
   );
};

export default ProductActions;
