import { ITokenPayload } from '@/modules/auth/auth.interface';
import { IUser } from '@/modules/user/user.interface';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
   constructor(private readonly prismaService: PrismaService) {}

   async getInfoUserForPayload(userId: string) {
      try {
         const userInfo = await this.prismaService.user.findUnique({
            where: {
               userId: userId,
            },
            select: {
               userId: true,
               status: true,
               role: {
                  select: {
                     roleName: true,
                  },
               },
            },
         });

         if (userInfo) {
            const newPayload: ITokenPayload = {
               userId: userInfo.userId,
               status: userInfo.status,
               role: userInfo.role?.roleName,
            };
            return newPayload;
         } else {
            return null;
         }
      } catch (error) {
         console.error('Error:', error);
         throw error;
      }
   }

   async createUser(newUser: IUser) {
      try {
         const result = await this.prismaService.user.create({
            data: {
               userId: newUser.userId,
               username: newUser.username,
               email: newUser.email,
               passwordHash: newUser.password as string,
               status: newUser.status || 'inactive',
               roleId: newUser.roleId,
            },
            select: {
               userId: true,
               status: true,
               role: {
                  select: {
                     roleName: true,
                  },
               },
               createdAt: true,
            },
         });

         const newPayload: ITokenPayload = {
            userId: result.userId,
            status: result.status,
            role: result.role.roleName,
         };
         return newPayload;
      } catch (error) {
         console.error('Error:', error);
         throw error;
      }
   }

   async getInfoUserLogin(identifier: string, isEmail: boolean) {
      try {
         const user = await this.prismaService.user.findFirst({
            where: {
               OR: [
                  { email: isEmail ? identifier : undefined },
                  { username: !isEmail ? identifier : undefined },
               ],
            },
            select: {
               userId: true,
               passwordHash: true,
            },
         });

         return user;
      } catch (error) {
         console.error('Error:', error);
         throw error;
      }
   }

   async getUserIdByUsername(username: string): Promise<string | null> {
      try {
         const user = await this.prismaService.user.findUnique({
            where: {
               username: username,
            },
            select: {
               userId: true,
            },
         });
         return user?.userId || null;
      } catch (error) {
         console.error('Error:', error);
         throw error;
      }
   }

   async getUserIdByEmail(email: string): Promise<string | null> {
      try {
         const user = await this.prismaService.user.findUnique({
            where: {
               email: email,
            },
            select: {
               userId: true,
            },
         });
         return user?.userId || null;
      } catch (error) {
         console.error('Error:', error);
         throw error;
      }
   }
}
