'use client';

import AccountFilters from '@/components/dashboard/accounts/AccountFilters';
import UserTable from '@/components/dashboard/accounts/UserTable';
import { useAccountFilters } from '@/hooks/useAccountFilters';

export default function AccountsClient() {
   const filters = useAccountFilters();

   return (
      <>
         <div className="mt-8">
            <AccountFilters {...filters} />
         </div>

         <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <UserTable search={filters.search} status={filters.status} role={filters.role} />
         </div>
      </>
   );
}
