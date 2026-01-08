import { create } from 'zustand';
import { AuthService } from '@/services/authService';

type User = {
   ac_id: string;
   username: string;
   email: string;
   roles: { role_id: number }[];
};

type LoginPayload = {
   identifier: string;
   password: string;
};

type AuthState = {
   user: User | null;
   accessToken: string | null;
   hydrated: boolean;

   hydrate: () => Promise<void>;
   setAuth: (user: User, token: string) => void;
   login: (payload: LoginPayload) => Promise<User>;
   logout: () => Promise<void>;
   clearAuth: () => void;
   setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   accessToken: null,
   hydrated: false,

   hydrate: async () => {
      try {
         const res = await AuthService.refreshToken();

         const { account, accessToken } = res.data.data;

         set({
            user: account,
            accessToken,
            hydrated: true,
         });
      } catch {
         set({ hydrated: true });
      }
   },

   setAuth: (user, token) =>
      set({
         user,
         accessToken: token,
      }),

   clearAuth: () =>
      set({
         user: null,
         accessToken: null,
      }),

   login: async (payload) => {
      const res = await AuthService.login(payload);
      const { account, tokens } = res.data.data;

      if (res.data.status) {
         set({
            user: account,
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
         set({ user: null, accessToken: null });

         window.location.href = '/';
      }
   },
   setAccessToken: (token) => set({ accessToken: token }),
}));
