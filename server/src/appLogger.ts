import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config({
   quiet: true,
   override: false,
});

export const appLogger = pino({
   level: process.env.NODE_ENV === 'production' ? 'error' : process.env.LOG_LEVEL ?? 'info',
   transport:
      process.env.NODE_ENV !== 'production'
         ? {
              target: 'pino-pretty',
              options: {
                 colorize: true,
                 translateTime: 'SYS:standard',
                 singleLine: false,
              },
           }
         : undefined,
});
