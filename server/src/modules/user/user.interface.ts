import { UserStatus } from '@/generated/prisma/enums';

export interface IUser {
   userId: string;
   email: string;
   username?: string;
   password?: string;

   status: UserStatus;
   roleId: number;

   createAt?: Date;
   updateAt?: Date;
}
