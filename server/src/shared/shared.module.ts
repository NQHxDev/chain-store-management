import envConfig from '@/shared/envConfig';
import { JWTService } from '@/shared/services/jwt.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory, Keyv } from 'cacheable';
import KeyvRedis from '@keyv/redis';

const sharedService = [PrismaService, JWTService, CacheModule];

@Global()
@Module({
   imports: [
      JwtModule.register({
         secret: envConfig.JWT_SECRET_DEFAULT,
         signOptions: { expiresIn: '1h' },
      }),
      CacheModule.registerAsync({
         isGlobal: true,
         useFactory: () => {
            return {
               stores: [
                  new Keyv({ store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }) }),
                  new KeyvRedis(envConfig.REDIS_URL),
               ],
            };
         },
      }),
   ],
   providers: sharedService,
   exports: sharedService,
})
export class SharedModule {}
