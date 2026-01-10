import Redis, { type RedisOptions, type Cluster } from 'ioredis';
import type { Redis as RedisType } from 'ioredis';

import { REDIS_STATUS, getOptionConnectRedis } from '@/configs/cfgRedis';

const MAX_RETRY = 10;
const RETRY_DELAY = 3_000;

type RedisConnect = {
   status: (typeof REDIS_STATUS)[keyof typeof REDIS_STATUS];
   instance: RedisType | Cluster | null;
   lastError: Error | null;
   lastPing: Date | null;
};

let redisConnect: RedisConnect = {
   status: REDIS_STATUS.DISCONNECT,
   instance: null,
   lastError: null,
   lastPing: null,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initRedis = async (options?: RedisOptions): Promise<RedisType | Cluster> => {
   let attempt = 0;

   while (attempt < MAX_RETRY) {
      try {
         console.log(
            attempt === 0
               ? '[-] Connecting to Redis...'
               : `[-] Reconnecting to Redis Attempt: ${attempt}`
         );

         if (redisConnect.instance && redisConnect.status === REDIS_STATUS.CONNECTED) {
            await pingRedis(redisConnect.instance);
            return redisConnect.instance;
         }

         const redisOptions: RedisOptions = {
            ...getOptionConnectRedis(),
            ...options,
            retryStrategy: (retryAttempt: number) => {
               console.log(`[Redis Client] Reconnecting attempt: ${retryAttempt}`);
               return Math.min(retryAttempt * 1000, 10000);
            },
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            enableOfflineQueue: true,
            lazyConnect: false,
         };

         const instance = new Redis(redisOptions);
         setupRedisEvents(instance);

         await Promise.race([
            instance.ping(),
            new Promise((_, reject) =>
               setTimeout(() => reject(new Error('Redis ping timeout')), 5000)
            ),
         ]);

         redisConnect = {
            status: REDIS_STATUS.CONNECTED,
            instance,
            lastError: null,
            lastPing: new Date(),
         };

         return instance;
      } catch (error) {
         console.error('Init Redis Error:', error);
         redisConnect.status = REDIS_STATUS.ERROR;
         redisConnect.lastError = error as Error;

         attempt++;

         if (attempt >= MAX_RETRY) {
            console.error(`[Error] Redis Connection Failed After Retries...`);
            throw error;
         }

         console.log(`[/] Retrying in ${RETRY_DELAY / 1000}s...`);
         await sleep(RETRY_DELAY);
      }
   }

   throw new Error('Unreachable state in Redis initialization');
};

/**
 * Lấy Redis instance, tự động khởi tạo nếu chưa có
 */
export const getRedisInstance = async (): Promise<RedisType | Cluster> => {
   try {
      if (redisConnect.instance && redisConnect.status === REDIS_STATUS.CONNECTED) {
         // Kiểm tra connection còn sống không
         try {
            await redisConnect.instance.ping();
            redisConnect.lastPing = new Date();
            return redisConnect.instance;
         } catch {
            // Nếu ping failed, reset và tạo mới
            redisConnect.status = REDIS_STATUS.DISCONNECT;
            redisConnect.instance = null;
         }
      }

      return await initRedis();
   } catch (error) {
      console.error('Get Redis Instance Error:', error);
      throw error;
   }
};

/**
 * Thực hiện lệnh Redis với tự động reconnect
 */
export const executeRedisCommand = async <T = any>(command: string, ...args: any[]): Promise<T> => {
   const redis = await getRedisInstance();

   try {
      // @ts-ignore: Dynamic command execution
      const result = await redis[command](...args);
      return result as T;
   } catch (error) {
      console.error(`Redis command error [${command}]:`, error);

      if (isConnectionError(error)) {
         console.log('Attempting to reconnect Redis...');
         redisConnect.status = REDIS_STATUS.DISCONNECT;
         redisConnect.instance = null;

         try {
            const newRedis = await initRedis();
            // @ts-ignore: Retry command
            return await newRedis[command](...args);
         } catch (retryError) {
            throw new Error(
               `Redis command failed after reconnect: ${(retryError as Error).message}`
            );
         }
      }

      throw error;
   }
};

/**
 * Helper methods cho các operations phổ biến
 */
export const redisService = {
   srem: async (key: string, member: string): Promise<void> => {
      await executeRedisCommand('srem', key, member);
   },

   set: async <T = string>(key: string, value: T, ttl?: number): Promise<void> => {
      if (ttl) {
         await executeRedisCommand('setex', key, ttl, JSON.stringify(value));
      } else {
         await executeRedisCommand('set', key, JSON.stringify(value));
      }
   },

   get: async <T = any>(key: string): Promise<T | null> => {
      const result = await executeRedisCommand<string>('get', key);
      return result ? JSON.parse(result) : null;
   },

   del: async (key: string | string[]): Promise<number> => {
      return await executeRedisCommand('del', ...(Array.isArray(key) ? key : [key]));
   },

   exists: async (key: string): Promise<boolean> => {
      const result = await executeRedisCommand<number>('exists', key);
      return result === 1;
   },

   // Hash operations
   hset: async (key: string, field: string, value: any): Promise<void> => {
      await executeRedisCommand('hset', key, field, JSON.stringify(value));
   },

   hget: async <T = any>(key: string, field: string): Promise<T | null> => {
      const result = await executeRedisCommand<string>('hget', key, field);
      return result ? JSON.parse(result) : null;
   },

   hgetall: async <T = any>(key: string): Promise<Record<string, T> | null> => {
      const result = await executeRedisCommand<Record<string, string>>('hgetall', key);
      if (!result) return null;

      const parsed: Record<string, T> = {};
      for (const [field, value] of Object.entries(result)) {
         parsed[field] = JSON.parse(value);
      }
      return parsed;
   },

   // Set operations
   sadd: async (key: string, ...members: any[]): Promise<number> => {
      return await executeRedisCommand('sadd', key, ...members.map((m) => JSON.stringify(m)));
   },

   smembers: async <T = any>(key: string): Promise<T[]> => {
      const result = await executeRedisCommand<string[]>('smembers', key);
      return result.map((item) => JSON.parse(item));
   },

   sismember: async (key: string, member: any): Promise<boolean> => {
      const result = await executeRedisCommand<number>('sismember', key, JSON.stringify(member));
      return result === 1;
   },

   // List operations
   lpush: async (key: string, ...values: any[]): Promise<number> => {
      return await executeRedisCommand('lpush', key, ...values.map((v) => JSON.stringify(v)));
   },

   rpop: async <T = any>(key: string): Promise<T | null> => {
      const result = await executeRedisCommand<string>('rpop', key);
      return result ? JSON.parse(result) : null;
   },

   // TTL operations
   expire: async (key: string, seconds: number): Promise<number> => {
      return await executeRedisCommand('expire', key, seconds);
   },

   ttl: async (key: string): Promise<number> => {
      return await executeRedisCommand('ttl', key);
   },

   // Pattern matching
   keys: async (pattern: string): Promise<string[]> => {
      return await executeRedisCommand('keys', pattern);
   },

   // Scan pattern (cho large datasets)
   scan: async (cursor: string, pattern: string, count = 100): Promise<[string, string[]]> => {
      return await executeRedisCommand('scan', cursor, 'MATCH', pattern, 'COUNT', count);
   },

   // Pipeline (batch operations)
   pipeline: async (commands: Array<[string, ...any[]]>): Promise<any[]> => {
      const redis = await getRedisInstance();
      const pipeline = redis.pipeline();

      commands.forEach(([cmd, ...args]) => {
         (pipeline as any)[cmd](...args);
      });

      const results = await pipeline.exec();
      return results!.map(([err, result]) => {
         if (err) throw err;
         return result;
      });
   },
   getStatus: (): RedisConnect => ({ ...redisConnect }),

   healthCheck: async (): Promise<{
      status: (typeof REDIS_STATUS)[keyof typeof REDIS_STATUS];
      latency: number;
      lastPing: Date | null;
      lastError: string | null;
   }> => {
      try {
         const start = Date.now();
         const redis = await getRedisInstance();
         await redis.ping();
         const latency = Date.now() - start;

         return {
            status: REDIS_STATUS.CONNECTED,
            latency,
            lastPing: redisConnect.lastPing,
            lastError: redisConnect.lastError?.message || null,
         };
      } catch (error) {
         return {
            status: REDIS_STATUS.ERROR,
            latency: -1,
            lastPing: null,
            lastError: (error as Error).message,
         };
      }
   },

   // Xóa tất cả keys: [Production]
   flushAll: async (): Promise<void> => {
      if (process.env.NODE_ENV === 'production') {
         throw new Error('flushAll is not allowed in production');
      }
      await executeRedisCommand('flushall');
   },

   // Đóng connection
   disconnect: async (): Promise<void> => {
      if (redisConnect.instance) {
         await redisConnect.instance.quit();
         redisConnect.status = REDIS_STATUS.DISCONNECT;
         redisConnect.instance = null;
         console.log('Redis disconnected');
      }
   },
};

/**
 * Helper functions
 */
const pingRedis = async (redis: RedisType | Cluster): Promise<void> => {
   try {
      await redis.ping();
      redisConnect.lastPing = new Date();
   } catch (error) {
      redisConnect.status = REDIS_STATUS.ERROR;
      redisConnect.lastError = error as Error;
      throw error;
   }
};

const setupRedisEvents = (redis: RedisType | Cluster): void => {
   redis.on('connect', () => {
      redisConnect.status = REDIS_STATUS.CONNECTING;
   });

   redis.on('ready', () => {
      redisConnect.status = REDIS_STATUS.CONNECTED;
      redisConnect.lastPing = new Date();
   });

   redis.on('error', (err) => {
      console.error('[*] Redis Error:', err.message);
      redisConnect.status = REDIS_STATUS.ERROR;
      redisConnect.lastError = err;
   });

   redis.on('end', () => {
      console.log('[#] Redis: Connection closed');
      redisConnect.status = REDIS_STATUS.DISCONNECT;
   });

   redis.on('reconnecting', (delay: number) => {
      console.log(`[#] Redis: Reconnecting in ${delay}ms`);
      redisConnect.status = REDIS_STATUS.RECONNECTING;
   });

   redis.on('warning', (warning: string) => {
      console.warn('[/] Redis Warning:', warning);
   });
};

const isConnectionError = (error: any): boolean => {
   const connectionErrors = [
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND',
      'ECONNRESET',
      'EAI_AGAIN',
      'READONLY',
   ];

   return connectionErrors.some(
      (errCode) => error.code === errCode || error.message?.includes(errCode)
   );
};

/**
 * Redis decorator cho caching
 */
export function RedisCache(ttl: number = 60, keyPrefix?: string) {
   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
         const cacheKey = keyPrefix
            ? `${keyPrefix}:${propertyKey}:${JSON.stringify(args)}`
            : `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

         try {
            const cached = await redisService.get(cacheKey);
            if (cached !== null) {
               console.log(`Cache hit: ${cacheKey}`);
               return cached;
            }
            console.log(`Cache miss: ${cacheKey}`);
            const result = await originalMethod.apply(this, args);
            await redisService.set(cacheKey, result, ttl);

            return result;
         } catch (error) {
            console.error('Cache error, falling back:', error);
            return await originalMethod.apply(this, args);
         }
      };

      return descriptor;
   };
}

export default redisService;
