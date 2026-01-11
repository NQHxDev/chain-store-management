import { useState, useCallback } from 'react';

export function useAccountFilters() {
   const [search, setSearch] = useState('');
   const [status, setStatus] = useState('active');
   const [role, setRole] = useState('all');

   const handleReset = useCallback(() => {
      setSearch('');
      setStatus('active');
      setRole('all');
   }, []);

   const handleExport = useCallback(() => {
      // Implement export logic
      console.log('Exporting with filters:', { search, status, role });
   }, [search, status, role]);

   return {
      search,
      status,
      role,
      setSearch,
      setStatus,
      setRole,
      handleReset,
      handleExport,
   };
}
