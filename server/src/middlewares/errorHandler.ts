import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';

import { appLogger } from '@/appLogger';

dotenv.config({
   quiet: true,
   override: false,
});

import { AppError } from '@/appError';

export const errorHandler = (err: Error, req, res, next) => {
   const isAppError = err instanceof AppError;

   const logPayload = {
      request: {
         method: req.method,
         path: req.originalUrl,
         ip: req.ip,
         requestId: req.id,
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
   } else {
      appLogger.error(logPayload, 'Operational error');
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
