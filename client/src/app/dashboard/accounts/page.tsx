import AccountFilters from '@/components/dashboard/accounts/AccountFilters';
import AccountStats from '@/components/dashboard/accounts/AccountStats';
import UserTable from '@/components/dashboard/accounts/UserTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Quản lý tài khoản người dùng | Dashboard',
   description: 'Quản lý và theo dõi tất cả tài khoản người dùng trong hệ thống',
   keywords: ['tài khoản', 'người dùng', 'quản lý', 'dashboard'],
};

export default function AccountManagementPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900">Quản lý Tài khoản</h1>
               <p className="mt-2 text-gray-600">
                  Quản lý và theo dõi tất cả tài khoản người dùng trong hệ thống
               </p>
            </div>

            {/* Stats Cards */}
            <AccountStats />

            {/* Filters and Search */}
            <div className="mt-8">
               <AccountFilters />
            </div>

            {/* Users Table */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <UserTable />
            </div>
         </div>
      </div>
   );
}
