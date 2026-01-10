import { create } from 'zustand';
import { AuthService } from '@/services/authService';
import { useProfileStore } from '@/stores/profileStore';
import { Account } from '@/lib/account/Account';

type LoginPayload = {
   identifier: string;
   password: string;
};

type AuthState = {
   account: Account | null;
   accessToken: string | null;
   hydrated: boolean;

   hydrate: () => Promise<void>;
   setAuth: (user: Account, token: string) => void;
   login: (payload: LoginPayload) => Promise<Account>;
   logout: () => Promise<void>;
   clearAuth: () => void;
   setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
   account: null,
   accessToken: null,
   hydrated: false,

   hydrate: async () => {
      try {
         const res = await AuthService.refreshToken();

         const { account, accessToken } = res.data.data;

         set({
            account: account,
            accessToken,
            hydrated: true,
         });
      } catch {
         set({ hydrated: true });
      }
   },

   setAuth: (account, token) =>
      set({
         account,
         accessToken: token,
      }),

   clearAuth: () =>
      set({
         account: null,
         accessToken: null,
      }),

   login: async (payload) => {
      const res = await AuthService.login(payload);
      const { account, tokens } = res.data.data;

      if (res.data.status) {
         set({
            account: account,
            accessToken: tokens.accessToken,
         });

         return account;
      } else {
         return null;
      }
   },

   logout: async () => {
      try {
         await AuthService.logout();
      } catch (error) {
         console.error('Logout API Failed:', error);
      } finally {
         set({ account: null, accessToken: null });
         useProfileStore.getState().clearProfile();

         window.location.href = '/';
      }
   },
   setAccessToken: (token) => set({ accessToken: token }),
}));
