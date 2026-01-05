import { create } from 'zustand';

type User = {
   ac_id: string;
   username: string;
   email: string;
   roles: { role_id: number }[];
};

type AuthState = {
   user: User | null;
   accessToken: string | null;
   hydrated: boolean;
   setAuth: (user: User, token: string) => void;
   clearAuth: () => void;
   setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   accessToken: null,
   hydrated: false,

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

   setHydrated: (v) => set({ hydrated: v }),
}));
