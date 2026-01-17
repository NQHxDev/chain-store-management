import BaseResponse from '@/shared/base.response';
import {
   ArgumentMetadata,
   HttpException,
   HttpStatus,
   Injectable,
   PipeTransform,
   Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export interface CustomValidationOptions {
   whitelist?: boolean;
   forbidNonWhitelisted?: boolean;
   transform?: boolean;
}

@Injectable()
export class CustomValidation implements PipeTransform<unknown> {
   constructor(private readonly options?: CustomValidationOptions) {}

   async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
      if (!metatype || !this.toValidate(metatype)) {
         return value;
      }

      const isObject = value !== null && typeof value === 'object';
      const input = isObject ? (value as Record<string, unknown>) : {};

      // Change to instance
      const objectInstance = plainToInstance(metatype, input) as object;
      // Validate instance
      const errors = await validate(objectInstance, {
         whitelist: this.options?.whitelist,
         forbidNonWhitelisted: this.options?.forbidNonWhitelisted,
      });

      if (errors.length > 0) {
         const formatErrors = this.formatErrors(errors);
         const response = BaseResponse.error(
            formatErrors,
            'Validate Failed',
            HttpStatus.BAD_REQUEST
         );
         throw new HttpException(response, HttpStatus.BAD_REQUEST);
      }

      return this.options?.transform ? objectInstance : value;
   }

   private toValidate(metatype: Type<unknown>): boolean {
      const types: Type<unknown>[] = [
         String as unknown as Type<unknown>,
         Boolean as unknown as Type<unknown>,
         Number as unknown as Type<unknown>,
         Array as unknown as Type<unknown>,
         Object as unknown as Type<unknown>,
      ];
      return !types.includes(metatype);
   }

   private formatErrors(errors: ValidationError[]) {
      const result = {};
      errors.forEach((err) => {
         result[err.property] = err.constraints ? Object.values(err.constraints) : {};
      });

      return result;
   }
}
