'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreVertical, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import UserForm from './UserForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useUsers } from '@/hooks/useAccount';
import { DashboardUser } from '@/lib/account/Account';
import { formatDate } from '@/lib/utils/formatters';

export default function UserTable() {
   const [selectedUser, setSelectedUser] = useState<DashboardUser | null>(null);
   const [isFormOpen, setIsFormOpen] = useState(false);
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);

   const { users, hasNextPage, isLoading } = useUsers({
      page: currentPage,
      limit: 10,
   });

   const handleEdit = (user: DashboardUser) => {
      setSelectedUser(user);
      setIsFormOpen(true);
   };

   const handleDelete = (user: DashboardUser) => {
      setSelectedUser(user);
      setIsDeleteDialogOpen(true);
   };

   const handleView = (user: DashboardUser) => {
      // Navigate to user detail page
      console.log('View user:', user);
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800';
         case 'inactive':
            return 'bg-red-100 text-red-800';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getRoleColor = (role: string) => {
      switch (role) {
         case 'admin':
            return 'bg-purple-100 text-purple-800';
         case 'moderator':
            return 'bg-blue-100 text-blue-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getStatusText = (status: string) => {
      switch (status) {
         case 'active':
            return 'Đang hoạt động';
         case 'inactive':
            return 'Không hoạt động';
         case 'pending':
            return 'Chờ xác thực';
         default:
            return 'Không xác định';
      }
   };

   const getRoleText = (role: string) => {
      switch (role) {
         case 'admin':
            return 'Quản trị viên';
         case 'moderator':
            return 'Điều hành viên';
         default:
            return 'Người dùng';
      }
   };

   return (
      <>
         <div className="overflow-x-auto">
            <Table>
               <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                     <TableHead className="font-semibold text-gray-900">Người dùng</TableHead>
                     <TableHead className="font-semibold text-gray-900">Vai trò</TableHead>
                     <TableHead className="font-semibold text-gray-900">Trạng thái</TableHead>
                     <TableHead className="font-semibold text-gray-900">Liên hệ</TableHead>
                     <TableHead className="font-semibold text-gray-900">Ngày tạo</TableHead>
                     <TableHead className="font-semibold text-gray-900 text-right">
                        Thao tác
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {users.map((user) => (
                     <TableRow key={user.ac_id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                 {user.avatar ? (
                                    <Image
                                       src={user.avatar}
                                       alt={user.fullname}
                                       width={40}
                                       height={40}
                                       className="h-10 w-10 rounded-full object-cover"
                                    />
                                 ) : (
                                    <span className="font-semibold text-gray-700">
                                       {user.fullname.charAt(0).toUpperCase()}
                                    </span>
                                 )}
                              </div>
                              <div>
                                 <p className="font-medium text-gray-900">{user.fullname}</p>
                                 <p className="text-sm text-gray-500">{user.username}</p>
                              </div>
                           </div>
                        </TableCell>
                        <TableCell>
                           <Badge className={getRoleColor(user.role)} variant="secondary">
                              {getRoleText(user.role)}
                           </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge className={getStatusColor(user.status)} variant="secondary">
                              {getStatusText(user.status)}
                           </Badge>
                        </TableCell>
                        <TableCell>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <Mail className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Phone className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">{user.phone}</span>
                              </div>
                           </div>
                        </TableCell>
                        <TableCell>
                           <span className="text-sm text-gray-600">
                              {formatDate(user.created_at)}
                           </span>
                        </TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                 <DropdownMenuItem onClick={() => handleView(user)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Xem chi tiết
                                 </DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleEdit(user)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onClick={() => handleDelete(user)}
                                    className="text-red-600 focus:text-red-600"
                                 >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Xóa
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>

         {/* Pagination */}
         <div className="border-t border-gray-200 px-6 py-4 flex justify-center">
            <div className="flex items-center gap-3">
               <Button
                  variant="outline"
                  disabled={currentPage === 1 || isLoading}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
               >
                  ← Quay lại
               </Button>

               <span className="px-4 py-2 text-sm font-medium border rounded">
                  Trang {currentPage}
               </span>

               <Button
                  variant="outline"
                  disabled={!hasNextPage || isLoading}
                  onClick={() => setCurrentPage((p) => p + 1)}
               >
                  Tiếp →
               </Button>
            </div>
         </div>

         {/* Empty State */}
         {users.length === 0 && !isLoading && (
            <div className="text-center py-12">
               <div className="text-gray-400 mb-4">Không có người dùng nào</div>
               <Button variant="outline" onClick={() => setIsFormOpen(true)}>
                  Thêm người dùng mới
               </Button>
            </div>
         )}

         {/* Loading State */}
         {isLoading && (
            <div className="text-center py-12">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
         )}

         {/* User Form Modal */}
         <UserForm
            isOpen={isFormOpen}
            onClose={() => {
               setIsFormOpen(false);
               setSelectedUser(null);
            }}
            user={selectedUser}
         />

         {/* Delete Confirmation Dialog */}
         <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
               setIsDeleteDialogOpen(false);
               setSelectedUser(null);
            }}
            user={selectedUser}
         />
      </>
   );
}
