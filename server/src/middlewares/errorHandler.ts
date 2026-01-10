import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';

dotenv.config({
   quiet: true,
   override: false,
});

import { AppError } from '@/appError';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
   console.error('[*] Error:', {
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      error: {
         name: error.name,
         message: error.message,
         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      timestamp: new Date().toISOString(),
   });

   if (error instanceof AppError) {
      return res.status(error.statusCode).json({
         success: false,
         error: {
            code: error.statusCode,
            message: error.message,
            type: error.constructor.name,
         },
      });
   }

   // Lỗi không mong đợi
   return res.status(500).json({
      success: false,
      error: {
         code: 500,
         message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
         type: 'InternalServerError',
      },
   });
};
