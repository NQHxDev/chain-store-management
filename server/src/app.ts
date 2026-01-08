import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import next from 'next';

import mainRouter from './routes/mainRouter.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

export async function createApp() {
   const dev = process.env.NODE_ENV !== 'production';
   const server = express();

   const appNext = next({
      dev,
      dir: '../client',
   });

   await appNext.prepare();

   const handle = appNext.getRequestHandler();

   server.use(
      helmet({
         contentSecurityPolicy: dev ? false : undefined,
      })
   );

   server.use(compression());
   server.use(cookieParser());
   server.use(express.json());
   server.use(express.urlencoded({ extended: true }));

   server.use(
      session({
         secret: process.env.SESSION_SECRET || 'default-secret-key',
         resave: false,
         saveUninitialized: false,
         cookie: {
            secure: !dev,
            sameSite: dev ? 'lax' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
         },
      })
   );

   if (dev) {
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

   server.use(errorHandler);

   return server;
}
