import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

const isProd = process.env.NODE_ENV === 'production';

export const authCookieOptions = (maxAge: number) => {
   return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge,
      path: '/',
   } as const;
};

export const clearCookieOptions = () => {
   return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
   } as const;
};
