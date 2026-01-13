import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

const { combine, timestamp, align } = winston.format;

const logger = winston.createLogger({
   level: process.env.LOG_LEVEL || 'debug',
   format: combine(
      winston.format.errors({ stack: true }),
      timestamp({
         format: 'DD/MM/YYYY hh:mm:ss.SSS A',
      }),
      winston.format.json()
   ),
   defaultMeta: { service: 'user-service' },
   transports: [
      new winston.transports.File({
         dirname: 'logs',
         filename: 'error.log',
         level: 'error',
         maxsize: 5242880, // 5 MB
         maxFiles: 5,
      }),
      new winston.transports.File({ dirname: 'logs', filename: 'combined.log' }),
   ],
});

export default logger;
