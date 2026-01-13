import logger from '@/loggers/winstonLog';

export class AppError extends Error {
   public statusCode: number;
   public isOperational: boolean;

   public context?: Record<string, any>;
   public cause?: unknown;

   constructor(
      statusCode: number,
      message: string,
      options?: {
         isOperational?: boolean;
         context?: Record<string, any>;
         cause?: unknown;
      }
   ) {
      super(message);

      this.statusCode = statusCode;
      this.isOperational = options?.isOperational ?? true;
      this.context = options?.context;
      this.cause = options?.cause;

      Error.captureStackTrace(this, this.constructor);
   }
}

export class ValidationError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(400, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}

export class AuthError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(401, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}

export class ForbiddenError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(403, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}

export class NotFoundError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(404, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}

export class OverLimitError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(429, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}
export class DatabaseError extends AppError {
   constructor(message: string, options?: { context?: any; cause?: unknown }) {
      super(500, message, {
         isOperational: true,
         context: options?.context,
         cause: options?.cause,
      });
   }
}
