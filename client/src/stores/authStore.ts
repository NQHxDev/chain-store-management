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

const isDev: boolean = process.env.NODE_ENV === 'development';

const initialState = isDev
   ? {
        user: {
           ac_id: '1',
           username: 'anhjkr',
           email: 'admin@example.com',
           roles: [{ role_id: 1 }],
        },
        accessToken: 'fake-token-for-testing',
        hydrated: true,
     }
   : {
        user: null,
        accessToken: null,
        hydrated: false,
     };

export const useAuthStore = create<AuthState>((set) => ({
   ...initialState,

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
