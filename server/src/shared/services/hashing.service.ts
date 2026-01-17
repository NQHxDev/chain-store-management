import envConfig from '@/shared/envConfig';
import argon2 from 'argon2';

export class HashingService {
   private static readonly hashSecretPublic =
      '58c15877fafd5f75fc3eab8214223d2cff5a79228d4a0ecb2a497a9d496ab97d';
   /**
    * @param {string | object} value Dữ liệu sẽ được hash
    *
    * @returns {Promise<string>} `hashedValue` trả một chuỗi đã được hash bằng thuật thư viện Argon2
    */
   static async hashValue(value: string | object): Promise<string> {
      try {
         let hashData: string;

         if (typeof value !== 'string') {
            hashData = JSON.stringify(value);
         } else {
            hashData = value;
         }

         return await argon2.hash(hashData, {
            secret: Buffer.from(envConfig.HASH_SECRET || this.hashSecretPublic),

            type: argon2.argon2id,
            memoryCost: 65536, // 64MB
            timeCost: 3,
         });
      } catch (error) {
         console.error('Hashing Value Error:', error);
         throw error;
      }
   }

   /**
    * @param {string} hashValue Mã hash cần so sánh
    * @param {string} plainValue Dữ liệu cần kiểm tra
    *
    * @returns {Promise<boolean>} `true` nếu dữ liệu đúng với mã hash `password`, không giống `false`
    */
   static async verifyValue(hashValue: string, plainValue: string): Promise<boolean> {
      try {
         return await argon2.verify(hashValue, plainValue, {
            secret: Buffer.from(envConfig.HASH_SECRET || this.hashSecretPublic),
         });
      } catch (error) {
         console.error('Verify HashValue Error:', error);
         throw error;
      }
   }
}
