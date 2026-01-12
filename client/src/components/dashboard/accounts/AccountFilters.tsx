'use client';

import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AccountFiltersProps {
   search: string;
   status: string;
   role: string;
   setSearch: (v: string) => void;
   setStatus: (v: string) => void;
   setRole: (v: string) => void;
   handleReset: () => void;
   handleExport: () => void;
}

export default function AccountFilters({
   search,
   status,
   role,
   setSearch,
   setStatus,
   setRole,
   handleReset,
   handleExport,
}: AccountFiltersProps) {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                     placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="pl-10 border-gray-300 focus:border-gray-400"
                  />
               </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
               <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-50 border-gray-300">
                     <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                     <SelectItem value="all">Tất cả</SelectItem>
                     <SelectItem value="active">Đang hoạt động</SelectItem>
                     <SelectItem value="inactive">Không hoạt động</SelectItem>
                     <SelectItem value="pending">Chờ xác thực</SelectItem>
                     <SelectItem value="ban">Khoá tài khoản</SelectItem>
                  </SelectContent>
               </Select>

               <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-50 border-gray-300">
                     <SelectValue placeholder="Vai trò" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                     <SelectItem value="all">Tất cả</SelectItem>
                     <SelectItem value="manager_group">Ban Quản lý</SelectItem>
                     <SelectItem value="staff_group">Đội ngũ vận hành</SelectItem>
                     <SelectItem value="collaborative_group">Đội ngũ hợp tác</SelectItem>
                     <SelectItem value="customer">Khách hàng</SelectItem>
                  </SelectContent>
               </Select>

               {/* Action Buttons */}
               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     onClick={handleReset}
                     className="border-gray-300 hover:bg-gray-50"
                  >
                     <Filter className="h-4 w-4 mr-2" />
                     Đặt lại
                  </Button>
                  <Button
                     variant="outline"
                     onClick={handleExport}
                     className="border-gray-300 hover:bg-gray-50"
                  >
                     <Download className="h-4 w-4 mr-2" />
                     Xuất file
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
