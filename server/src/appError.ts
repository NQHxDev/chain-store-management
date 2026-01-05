class AppError extends Error {
   public statusCode: number;
   public isOperational: boolean;

   constructor(statusCode: number, message: string, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;

      Error.captureStackTrace(this, this.constructor);
   }
}

class ValidationError extends AppError {
   constructor(message: string) {
      super(400, message);
   }
}

class AuthError extends AppError {
   constructor(message: string) {
      super(401, message);
   }
}

class ForbiddenError extends AppError {
   constructor(message: string) {
      super(403, message);
   }
}

class NotFoundError extends AppError {
   constructor(message: string) {
      super(404, message);
   }
}

class DatabaseError extends AppError {
   constructor(message: string) {
      super(500, message);
   }
}

export { AppError, ValidationError, AuthError, ForbiddenError, NotFoundError, DatabaseError };
