import envConfig from '@/shared/envConfig';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   constructor() {
      const connectURL = new URL(envConfig.DATABASE_URL);

      const adapter = new PrismaMariaDb({
         host: connectURL.hostname,
         port: parseInt(connectURL.port, 10) || 3306,
         user: connectURL.username || 'root',
         password: connectURL.password,
         database: connectURL.pathname.substring(1),
      });

      super({ adapter });
   }

   async onModuleInit() {
      await this.$connect();
   }

   async onModuleDestroy() {
      await this.$disconnect();
   }
}
