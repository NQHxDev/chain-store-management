import { UserProfile } from '@/lib/account/Profile';
import { useEffect, useState } from 'react';

export function useProfile() {
   const [profile, setProfile] = useState<UserProfile | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchProfile();
   }, []);

   const fetchProfile = async () => {
      try {
         const response = await fetch('/api/profile');
         const data = await response.json();
         setProfile(data);
      } catch (err) {
         setError('Failed to load profile');
         console.log(err);
      } finally {
         setIsLoading(false);
      }
   };

   return { profile, isLoading, error, refetch: fetchProfile };
}
