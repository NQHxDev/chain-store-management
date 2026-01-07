'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ProductFilters: React.FC = () => {
   const [search, setSearch] = useState('');
   const [category, setCategory] = useState('all');
   const [status, setStatus] = useState('all');

   return (
      <div className="flex flex-col md:flex-row gap-4 items-center">
         <div className="flex-1">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>

         <div className="flex gap-4">
            <Select value={category} onValueChange={setCategory}>
               <SelectTrigger className="w-50 bg-white border-gray-300 rounded-lg">
                  <SelectValue placeholder="Tất cả danh mục" />
               </SelectTrigger>

               <SelectContent position="popper" sideOffset={4}>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="headphones">Headphones</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
               </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
               <SelectTrigger className="w-50 bg-white border-gray-300 rounded-lg">
                  <SelectValue placeholder="Tất cả trạng thái" />
               </SelectTrigger>

               <SelectContent position="popper" sideOffset={4} className="w-64">
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="in-stock">
                     <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" /> Còn hàng
                     </span>
                  </SelectItem>
                  <SelectItem value="out-of-stock">
                     <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Hết hàng
                     </span>
                  </SelectItem>
                  <SelectItem value="low-stock">
                     <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Sắp hết hàng
                     </span>
                  </SelectItem>
               </SelectContent>
            </Select>

            <Button
               variant="outline"
               className="flex items-center gap-2  bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50 hover:text-black transition-all duration-200 shadow-sm"
            >
               <Filter className="h-4 w-4" />
               <span className="hidden sm:inline">Thêm bộ lọc</span>
            </Button>
         </div>
      </div>
   );
};

export default ProductFilters;
