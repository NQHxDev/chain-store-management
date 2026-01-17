import argon2 from 'argon2';

export class HashingService {
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

         return await argon2.hash(hashData);
      } catch (error) {
         console.error('Hashing Value Error:', error);
         throw error;
      }
   }

   /**
    * @param {string} value Dữ liệu cần kiểm tra
    * @param {string} hashValue Mã hash cần so sánh
    *
    * @returns {Promise<boolean>} `true` nếu dữ liệu đúng với mã hash `password`, không giống `false`
    */
   static async verifyValue(value: string, hashValue: string): Promise<boolean> {
      try {
         return await argon2.verify(value, hashValue);
      } catch (error) {
         console.error('Verify HashValue Error:', error);
         throw error;
      }
   }
}
