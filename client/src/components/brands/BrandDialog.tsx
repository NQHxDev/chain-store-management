'use client';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { IBrand } from '@/lib/dashboard/Brand';
import Image from 'next/image';

interface BrandDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   brand?: IBrand | null;
   isEdit?: boolean;
}

export function BrandDialog({ open, onOpenChange, brand, isEdit = false }: BrandDialogProps) {
   const [logoPreview, setLogoPreview] = useState<string>(brand?.logo || '');

   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setLogoPreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-125 bg-white">
            <DialogHeader>
               <DialogTitle className="text-gray-900">
                  {isEdit ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
               </DialogTitle>
               <DialogDescription className="text-gray-500">
                  {isEdit ? 'Cập nhật thông tin thương hiệu' : 'Thêm thương hiệu mới vào hệ thống'}
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                     Tên thương hiệu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                     id="name"
                     defaultValue={brand?.name || ''}
                     placeholder="Nhập tên thương hiệu"
                     className="border-gray-300"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                     Mô tả
                  </Label>
                  <Textarea
                     id="description"
                     defaultValue={brand?.description || ''}
                     placeholder="Mô tả về thương hiệu"
                     className="border-gray-300 min-h-25"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-700">
                     Website
                  </Label>
                  <Input
                     id="website"
                     defaultValue={brand?.website || ''}
                     placeholder="https://example.com"
                     className="border-gray-300"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="logo" className="text-gray-700">
                     Logo thương hiệu
                  </Label>
                  <div className="flex items-center space-x-4">
                     <div className="relative">
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                           {logoPreview ? (
                              <div className="relative w-full h-full">
                                 <Image
                                    src={logoPreview}
                                    alt="Logo preview"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-contain rounded-lg"
                                    unoptimized
                                 />
                              </div>
                           ) : (
                              <Upload className="h-8 w-8 text-gray-400" />
                           )}
                        </div>
                        <Input
                           id="logo"
                           type="file"
                           accept="image/*"
                           className="absolute inset-0 opacity-0 cursor-pointer"
                           onChange={handleLogoChange}
                        />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm text-gray-500">
                           Tải lên logo thương hiệu (PNG, JPG, SVG)
                        </p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="status" className="text-gray-700">
                        Trạng thái
                     </Label>
                     <select
                        id="status"
                        defaultValue={brand?.status || 'active'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Ngừng hoạt động</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="country" className="text-gray-700">
                        Quốc gia
                     </Label>
                     <Input
                        id="country"
                        defaultValue={brand?.country || ''}
                        placeholder="Quốc gia xuất xứ"
                        className="border-gray-300"
                     />
                  </div>
               </div>
            </div>

            <DialogFooter>
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-gray-300 text-gray-700"
               >
                  Hủy
               </Button>
               <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                  {isEdit ? 'Cập nhật' : 'Thêm mới'}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
