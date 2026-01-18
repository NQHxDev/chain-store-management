import envConfig from '@/shared/envConfig';
import pino from 'pino';

const pinoLogger = pino({
   level: envConfig.NODE_ENV === 'production' ? 'info' : 'debug',
   transport:
      envConfig.NODE_ENV === 'production'
         ? undefined
         : {
              target: 'pino-pretty',
              options: {
                 colorize: true,
                 translateTime: 'SYS:standard',
                 ignore: 'pid,hostname',
              },
           },
});

export default pinoLogger;
