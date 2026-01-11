import { useState, useCallback } from 'react';

export function useAccountFilters() {
   const [search, setSearch] = useState('');
   const [status, setStatus] = useState('all');
   const [role, setRole] = useState('all');
   const [dateRange, setDateRange] = useState('all');

   const handleReset = useCallback(() => {
      setSearch('');
      setStatus('all');
      setRole('all');
      setDateRange('all');
   }, []);

   const handleExport = useCallback(() => {
      // Implement export logic
      console.log('Exporting with filters:', { search, status, role, dateRange });
   }, [search, status, role, dateRange]);

   return {
      search,
      status,
      role,
      dateRange,
      setSearch,
      setStatus,
      setRole,
      setDateRange,
      handleReset,
      handleExport,
   };
}
