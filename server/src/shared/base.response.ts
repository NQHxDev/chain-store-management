import { HttpStatus } from '@nestjs/common';

class BaseResponse {
   private static getTimeString(): string {
      return new Date().toISOString().split('T')[0];
   }

   static success<T>(data: T, message: string = '', statusCode: HttpStatus = HttpStatus.OK) {
      return {
         status: true,
         statusCode: statusCode,
         data: data,
         message: message,
         createAt: this.getTimeString(),
      };
   }

   static error<E>(
      error: E,
      message: string = '',
      statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
      code: string = ''
   ) {
      return {
         status: false,
         statusCode: statusCode,
         code: code,
         error: error,
         message: message,
         createAt: this.getTimeString(),
      };
   }

   static message(message: string = '', statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
      const status: boolean = statusCode >= HttpStatus.OK && statusCode < HttpStatus.AMBIGUOUS;

      return {
         status: status,
         statusCode: statusCode,
         message: message,
         createAt: this.getTimeString(),
      };
   }
}

export default BaseResponse;
