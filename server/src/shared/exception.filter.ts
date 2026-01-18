import BaseResponse from '@/shared/base.response';
import pinoLogger from '@/shared/helpers/pino.logger';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

interface IHttpExceptionResponse {
   message?: string | string[];
   error?: unknown;
   code?: string;
   [key: string]: unknown;
}

class AppError extends Error {
   constructor(
      public readonly message: string,
      public readonly statusCode: number,
      public readonly isOperational = true,
      public readonly context?: Record<string, unknown>,
      public readonly cause?: unknown
   ) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
   }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Lỗi hệ thống. Vui lòng thử lại sau!';
      let errorDetail: unknown = null;
      let codeException: string = '';

      const logContext = request['logContext'] ?? {
         method: request.method,
         path: request.originalUrl,
         ip: request.ip,
      };

      const errorForLog =
         exception instanceof Error
            ? exception
            : new Error(typeof exception === 'string' ? exception : JSON.stringify(exception));

      const isAppError = exception instanceof AppError;
      const logPayload = {
         request: logContext,
         error: {
            name: errorForLog.name,
            message: errorForLog.message,
            stack: !isAppError || !exception.isOperational ? errorForLog.stack : undefined,
            context: isAppError ? exception.context : undefined,
            cause: isAppError ? exception.cause : undefined,
         },
      };

      if (!isAppError || !exception.isOperational) {
         pinoLogger.fatal(logPayload, 'Unhandled exception');
      } else {
         pinoLogger.error(logPayload, 'Operational error');
      }

      if (exception instanceof HttpException) {
         status = exception.getStatus();
         const exceptionResponse = exception.getResponse();

         if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
         } else if (exceptionResponse && typeof exceptionResponse === 'object') {
            const resObj = exceptionResponse as IHttpExceptionResponse;
            codeException = resObj?.code || '';

            message = Array.isArray(resObj.message)
               ? resObj.message[0]
               : (resObj.message ?? exception.message);

            errorDetail = resObj.error ?? null;
         }

         switch (status) {
            case HttpStatus.BAD_REQUEST:
               message ||= 'Dữ liệu không hợp lệ';
               break;
            case HttpStatus.UNAUTHORIZED:
               message ||= 'Đăng nhập trước khi thực hiện';
               break;
         }
      }

      const apiResponse = BaseResponse.error(errorDetail, message, status, codeException);
      response.status(status).json(apiResponse);
   }
}
