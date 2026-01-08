export class AppError extends Error {
   public statusCode: number;
   public isOperational: boolean;

   constructor(statusCode: number, message: string, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;

      Error.captureStackTrace(this, this.constructor);
   }
}

export class ValidationError extends AppError {
   constructor(message: string) {
      super(400, message);
   }
}

export class OverLimitError extends AppError {
   constructor(message: string) {
      super(429, message);
   }
}

export class AuthError extends AppError {
   constructor(message: string) {
      super(401, message);
   }
}

export class ForbiddenError extends AppError {
   constructor(message: string) {
      super(403, message);
   }
}

export class NotFoundError extends AppError {
   constructor(message: string) {
      super(404, message);
   }
}

export class DatabaseError extends AppError {
   constructor(message: string) {
      super(500, message);
   }
}
