'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DashboardUser } from '@/lib/account/Account';

interface UserFormProps {
   isOpen: boolean;
   onClose: () => void;
   user?: DashboardUser | null;
}

export default function UserForm({ isOpen, onClose, user }: UserFormProps) {
   const [formData, setFormData] = useState({
      name: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'user',
      status: user?.status || 'active',
      isVerified: user?.status === 'active',
   });

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form data:', formData);
      onClose();
   };

   const handleChange = (field: string, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-0">
               <DialogTitle className="text-xl font-bold text-gray-900">
                  {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
               </DialogTitle>
               <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
               >
                  <X className="h-4 w-4" />
               </button>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
               <div className="space-y-4">
                  <div>
                     <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Họ và tên *
                     </Label>
                     <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="mt-1 border-gray-300"
                        required
                     />
                  </div>

                  <div>
                     <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                     </Label>
                     <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="mt-1 border-gray-300"
                        required
                     />
                  </div>

                  <div>
                     <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Số điện thoại
                     </Label>
                     <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="mt-1 border-gray-300"
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                           Vai trò
                        </Label>
                        <Select
                           value={formData.role}
                           onValueChange={(value) => handleChange('role', value)}
                        >
                           <SelectTrigger className="mt-1 border-gray-300">
                              <SelectValue placeholder="Chọn vai trò" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="user">Người dùng</SelectItem>
                              <SelectItem value="moderator">Điều hành viên</SelectItem>
                              <SelectItem value="admin">Quản trị viên</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div>
                        <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                           Trạng thái
                        </Label>
                        <Select
                           value={formData.status}
                           onValueChange={(value) => handleChange('status', value)}
                        >
                           <SelectTrigger className="mt-1 border-gray-300">
                              <SelectValue placeholder="Chọn trạng thái" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="active">Đang hoạt động</SelectItem>
                              <SelectItem value="inactive">Không hoạt động</SelectItem>
                              <SelectItem value="pending">Chờ xác thực</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                     <div>
                        <Label htmlFor="verified" className="text-sm font-medium text-gray-700">
                           Đã xác thực
                        </Label>
                        <p className="text-sm text-gray-500">Tài khoản đã xác minh email</p>
                     </div>
                     <Switch
                        id="verified"
                        checked={formData.isVerified}
                        onCheckedChange={(checked) => handleChange('isVerified', checked)}
                     />
                  </div>
               </div>

               <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={onClose}
                     className="flex-1 border-gray-300"
                  >
                     Hủy
                  </Button>
                  <Button type="submit" className="flex-1 bg-gray-900 hover:bg-gray-800">
                     {user ? 'Cập nhật' : 'Thêm mới'}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
