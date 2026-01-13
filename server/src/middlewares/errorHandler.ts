import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';

import { appLogger } from '@/appLogger';

dotenv.config({
   quiet: true,
   override: false,
});

import { AppError } from '@/appError';
import logger from '@/loggers/winstonLog';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   const isAppError = err instanceof AppError;

   const logPayload = {
      request: {
         method: req.method,
         path: req.originalUrl,
         ip: req.ip,
      },
      error: {
         name: err.name,
         message: err.message,
         stack: isAppError && err.isOperational ? undefined : err.stack,
         context: isAppError ? err.context : undefined,
         cause: isAppError ? err.cause : undefined,
      },
   };

   if (!isAppError || !err.isOperational) {
      appLogger.fatal(logPayload, 'Unhandled exception');
      // logger.error('Unhandled exception', {
      //    ...logPayload,
      //    type: 'CriticalError',
      // });
   } else {
      appLogger.error(logPayload, 'Operational error');
      // logger.warn('Operational error', {
      //    ...logPayload,
      //    type: 'OperationalError',
      // });
   }

   if (isAppError) {
      return res.status(err.statusCode).json({
         success: false,
         error: {
            code: err.statusCode,
            message: err.message,
            type: err.constructor.name,
         },
      });
   }

   return res.status(500).json({
      success: false,
      error: {
         code: 500,
         message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
      },
   });
};
