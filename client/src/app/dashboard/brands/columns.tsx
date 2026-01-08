'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { IBrand } from '@/lib/dashboard/Brand';
import Image from 'next/image';

export const brandColumns = (onEdit: (brand: IBrand) => void): ColumnDef<IBrand>[] => [
   {
      accessorKey: 'name',
      header: 'Thương hiệu',
      cell: ({ row }) => {
         const brand = row.original;
         const fallbackChar = brand.name.charAt(0).toUpperCase();

         return (
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  <div className="relative w-full h-full">
                     {brand.logo && brand.logo !== '' ? (
                        <Image
                           src={brand.logo}
                           alt={brand.name}
                           fill
                           sizes="40px"
                           className="object-contain"
                        />
                     ) : (
                        <span className="flex h-full w-full items-center justify-center font-bold text-gray-400">
                           {fallbackChar}
                        </span>
                     )}
                  </div>
               </div>
               <div className="min-w-0">
                  {' '}
                  {/* Thêm min-w-0 để tránh lỗi text tràn */}
                  <div className="font-medium text-gray-900 truncate">{brand.name}</div>
                  <div className="text-xs text-gray-500 truncate">{brand.country}</div>
               </div>
            </div>
         );
      },
   },

   {
      accessorKey: 'description',
      header: 'Mô tả',
      cell: ({ row }) => (
         <div className="max-w-xs truncate text-gray-600">{row.getValue('description')}</div>
      ),
   },
   {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
         const status = row.getValue('status') as string;
         return (
            <Badge
               variant={status === 'active' ? 'default' : 'outline'}
               className={
                  status === 'active'
                     ? 'bg-green-600 hover:bg-green-700'
                     : 'border-gray-300 text-gray-700'
               }
            >
               {status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
            </Badge>
         );
      },
   },
   {
      accessorKey: 'products',
      header: 'Sản phẩm',
      cell: ({ row }) => (
         <div className="text-gray-700 font-medium">{row.getValue('products')}</div>
      ),
   },
   {
      accessorKey: 'website',
      header: 'Website',
      cell: ({ row }) => (
         <a
            href={row.getValue('website')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
         >
            {new URL(row.getValue('website')).hostname}
         </a>
      ),
   },
   {
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      cell: ({ row }) => (
         <div className="text-gray-600 text-sm">
            {new Date(row.getValue('createdAt')).toLocaleDateString('vi-VN')}
         </div>
      ),
   },
   {
      id: 'actions',
      cell: ({ row }) => {
         const brand = row.original;

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Mở menu</span>
                     <MoreHorizontal className="h-4 w-4 text-gray-700" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="bg-white border-gray-200">
                  <DropdownMenuLabel className="text-gray-900">Tác vụ</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                     className="text-gray-700 cursor-pointer"
                     onClick={() => onEdit(brand)}
                  >
                     <Edit className="mr-2 h-4 w-4" />
                     Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 cursor-pointer">
                     <Eye className="mr-2 h-4 w-4" />
                     Xem chi tiết
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="text-red-600 cursor-pointer">
                     <Trash2 className="mr-2 h-4 w-4" />
                     Xóa
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];
