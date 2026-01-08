'use client';

import { useState } from 'react';
import { Filter, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BrandStats } from '@/components/brands/BrandStats';
import { BrandDataTable } from '@/components/brands/BrandTable';
import { BrandDialog } from '@/components/brands/BrandDialog';
import { BrandStories, IBrand } from '@/lib/dashboard/Brand';
import { brandColumns } from '@/app/dashboard/brands/columns';

const mockStats = {
   total: 8,
   active: 7,
   inactive: 1,
   international: 6,
};

export default function BrandPageContent() {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);

   const handleEditBrand = (brand: IBrand) => {
      setSelectedBrand(brand);
      setIsDialogOpen(true);
   };

   const handleAddBrand = () => {
      setSelectedBrand(null);
      setIsDialogOpen(true);
   };

   const columns = brandColumns(handleEditBrand);

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="container mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Quản lý Thương hiệu</h1>
                     <p className="text-gray-600 mt-2">
                        Quản lý thông tin và trạng thái của các thương hiệu trong hệ thống
                     </p>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                        onClick={() => {
                           /* Xuất dữ liệu */
                        }}
                     >
                        <Download className="mr-2 h-4 w-4" />
                        Xuất
                     </Button>

                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" className="border-gray-300 text-gray-700">
                              <Settings className="mr-2 h-4 w-4" />
                              Tùy chọn
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white border-gray-200">
                           <DropdownMenuLabel className="text-gray-900">
                              Tùy chọn hiển thị
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator className="bg-gray-200" />
                           <DropdownMenuItem className="text-gray-700">
                              Hiển thị tất cả cột
                           </DropdownMenuItem>
                           <DropdownMenuItem className="text-gray-700">
                              Tùy chỉnh cột
                           </DropdownMenuItem>
                           <DropdownMenuSeparator className="bg-gray-200" />
                           <DropdownMenuItem className="text-gray-700">
                              Cài đặt nâng cao
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
               <BrandStats stats={mockStats} />
            </div>

            {/* Filters and Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
               <div className="mb-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-semibold text-gray-900">Danh sách thương hiệu</h2>
                     <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                        onClick={() => {
                           /* Filter logic */
                        }}
                     >
                        <Filter className="mr-2 h-4 w-4" />
                        Lọc
                     </Button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                     Tổng cộng {BrandStories.length} thương hiệu được tìm thấy
                  </p>
               </div>

               <BrandDataTable columns={columns} data={BrandStories} />
            </div>
         </div>

         <BrandDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            brand={selectedBrand}
            isEdit={!!selectedBrand}
         />
      </div>
   );
}
