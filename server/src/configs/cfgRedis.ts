import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

const REDIS_STATUS = {
   DISCONNECT: 'disconnect',
   CONNECTED: 'connected',
   CONNECTING: 'connecting',
   ERROR: 'error',
   RECONNECTING: 'reconnecting',
} as const;

const getOptionConnectRedis = () => {
   return {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,

      // Option
      db: Number(process.env.REDIS_DB) || 0,
      connectTimeout: 5 * 1000,
      lazyConnect: true,
      retryStrategy: (times: number) => {
         return Math.min(times * 100, 2000);
      },
   };
};

export { REDIS_STATUS, getOptionConnectRedis };
