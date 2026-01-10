import { UpdateProfileData } from '@/lib/account/Profile';
import { useState } from 'react';

export function useProfileUpdate() {
   const [isUpdating, setIsUpdating] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const updateProfile = async (data: UpdateProfileData) => {
      setIsUpdating(true);
      setError(null);

      try {
         const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('Update failed');
         }

         return await response.json();
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Update failed');
         throw err;
      } finally {
         setIsUpdating(false);
      }
   };

   return { updateProfile, isUpdating, error };
}
