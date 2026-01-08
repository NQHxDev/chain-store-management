import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import next from 'next';
import crypto from 'crypto';

import mainRouter from './routes/mainRouter.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

export async function createApp() {
   const isDev = process.env.NODE_ENV !== 'production';
   const server = express();

   const appNext = next({
      dev: isDev,
      dir: '../client',
   });

   await appNext.prepare();

   const handle = appNext.getRequestHandler();

   server.use((req, res, next) => {
      res.locals.nonce = crypto.randomBytes(16).toString('base64');
      res.setHeader('x-nonce', res.locals.nonce);
      next();
   });

   server.use(compression());
   server.use(cookieParser());
   server.use(express.json());
   server.use(express.urlencoded({ extended: true }));

   server.use(
      session({
         secret:
            process.env.SESSION_SECRET ||
            '33c6281b4cc5d8399194b47802c5b373297901c768bd12977c471780abc85ab0',
         resave: false,
         saveUninitialized: false,
         cookie: {
            secure: !isDev,
            sameSite: isDev ? 'lax' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
         },
      })
   );

   if (isDev) {
      server.use(
         cors({
            origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
            credentials: true,
         })
      );
   }

   server.use('/api', mainRouter);

   server.all(/.*/, (req, res) => {
      return handle(req, res);
   });
   server.all('/_next/{*splat}', (req, res) => {
      return handle(req, res);
   });

   server.use(
      helmet({
         contentSecurityPolicy: {
            useDefaults: true,
            directives: {
               scriptSrc: ["'self'", (req, res: any) => `'nonce-${res.locals.nonce}'`],
               styleSrc: ["'self'", "'unsafe-inline'"],
               imgSrc: ["'self'", 'data:', 'blob:'],
               fontSrc: ["'self'", 'data:'],
               connectSrc: ["'self'"],
            },
         },
      })
   );

   server.use(errorHandler);

   return server;
}
