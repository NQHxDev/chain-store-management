'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { DashboardUser } from '@/lib/account/Account';

interface BanConfirmationDialogProps {
   isOpen: boolean;
   onClose: () => void;
   user: DashboardUser | null;
}

export default function DeleteConfirmationDialog({
   isOpen,
   onClose,
   user,
}: BanConfirmationDialogProps) {
   const handleDelete = async () => {
      if (user) {
         // Call API to delete user
         console.log('Deleting user:', user.ac_id);
      }
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
               </div>
               <DialogTitle className="text-center text-xl font-bold text-gray-900 mt-4">
                  Xác nhận Ban tài khoản
               </DialogTitle>
               <DialogDescription className="text-center text-gray-600">
                  Bạn có chắc chắn muốn Ban tài khoản{' '}
                  <span className="font-semibold text-gray-900">{user?.username}</span>!
               </DialogDescription>
            </DialogHeader>

            <div className="bg-gray-50 p-4 rounded-lg">
               <div className="text-sm text-gray-600 space-y-1">
                  <p>
                     <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                     <span className="font-medium">Vai trò:</span> {user?.role}
                  </p>
                  <p>
                     <span className="font-medium">Trạng thái:</span> {user?.status}
                  </p>
               </div>
            </div>

            <DialogFooter className="flex gap-3">
               <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 hover:bg-gray-50"
               >
                  Hủy bỏ
               </Button>
               <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700"
               >
                  Ban tài khoản
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
