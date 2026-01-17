import 'dotenv/config';
import 'reflect-metadata';

import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import fs from 'fs';
import path from 'path';
import { JwtSignOptions } from '@nestjs/jwt';

if (!fs.existsSync(path.resolve('.env'))) {
   console.error('File .env Not Found in Resource!');
   process.exit(1);
}

class EnvConfigSchema {
   @IsString()
   NODE_ENV: string;
   @IsNumber()
   PORT_SV: number;
   @IsString()
   DATABASE_URL: string;
   @IsString()
   REDIS_URL: string;
   @IsString()
   JWT_SECRET_DEFAULT: string;
   @IsString()
   ACCESS_TOKEN_SECRET: string;
   @IsString()
   REFRESH_TOKEN_SECRET: string;
   @IsString()
   ACCESS_TOKEN_EXPIRE: JwtSignOptions['expiresIn'];
   @IsString()
   REFRESH_TOKEN_EXPIRE: JwtSignOptions['expiresIn'];
   @IsString()
   HASH_SECRET: string;
}

const envConfig = plainToInstance(EnvConfigSchema, process.env, {
   enableImplicitConversion: true,
   excludeExtraneousValues: false,
});
const errors = validateSync(envConfig);

if (errors.length > 0) {
   const errorDetail = errors.map((e) => {
      return { property: e.property, constants: e.constraints, value: e.value };
   });

   const errMessage = `Config validation Failed: ${JSON.stringify(errorDetail)}`;
   const error = new Error(errMessage);

   throw error;
}

export default envConfig;
