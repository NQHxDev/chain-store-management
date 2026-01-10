import { create } from 'zustand';

import { UserProfile } from '@/lib/account/Profile';
import { ProfileService } from '@/services/profileService';

type ProfileState = {
   userProfile: UserProfile | null;
   loading: boolean;

   setProfile: (profile: UserProfile) => void;
   clearProfile: () => void;
   fetchProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
   userProfile: null,
   loading: false,

   setProfile: (profile) => set({ userProfile: profile }),
   clearProfile: () => set({ userProfile: null }),

   fetchProfile: async () => {
      try {
         set({ loading: true });

         const res = await ProfileService.getMe();

         set({ userProfile: res.data.data });
      } finally {
         set({ loading: false });
      }
   },
}));
