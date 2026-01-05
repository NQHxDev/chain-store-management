import { DatabaseError } from '../appError.ts';
import { executeQuery, transactionQuery } from '../services/databaseService.ts';
import ListRole from '../types/data/listRole.ts';

import type { IAccount } from '../types/interfaces/interfaceAccount.ts';

class AccountRepository {
   createAccount = async (newAccount: IAccount): Promise<any> => {
      try {
         const guestRole = ListRole.find((role) => role.role_name === 'guest');
         if (!guestRole) {
            throw new Error('Không tìm thấy Role ID tương ứng!');
         }

         const result = await transactionQuery(async (connection) => {
            const queryInertAccount =
               'Insert into accounts (ac_id, username, password_hash, email, status) Values (?, ?, ?, ?, ?)';

            await executeQuery(
               queryInertAccount,
               [
                  newAccount.ac_id,
                  newAccount.username,
                  newAccount.password_hash,
                  newAccount.email,
                  newAccount.status || 'pending',
               ],
               connection
            );

            const queryInertAccountRole =
               'Insert into account_roles (ac_id, role_id) Values (?, ?)';

            await executeQuery(
               queryInertAccountRole,
               [newAccount.ac_id, guestRole.role_id],
               connection
            );

            return { success: true, ac_id: newAccount.ac_id };
         });
         return result;
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [newAccount.username, newAccount.email],
         });
         throw new DatabaseError(`Xảy ra lỗi khi tạo tài khoản: ${newAccount.username}`);
      }
   };

   findByIdentifier = async (identifier: string) => {
      try {
         const queryGetAccount = `Select ac_id, username, password_hash, email, status from accounts where email = ? or username = ? Limit 1`;
         const rows = await executeQuery(queryGetAccount, [identifier, identifier]);

         if (!rows || rows.length === 0) {
            return null;
         }
         const account = rows[0];

         const queryGetRoleAccount = 'Select role_id from account_roles where ac_id = ?';
         const role_account = await executeQuery(queryGetRoleAccount, [account.ac_id]);

         return { account, role_account };
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [identifier],
         });
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${identifier}`);
      }
   };

   getInfoAccountByID = async (accountID: string | number) => {
      try {
         const queryGetAccount = `Select username, email from accounts where ac_id = ? Limit 1`;
         const rows = await executeQuery(queryGetAccount, [accountID]);

         if (!rows || rows.length === 0) {
            return null;
         }
         const infoAccount = rows[0];

         const queryGetRoleAccount = 'Select role_id from account_roles where ac_id = ?';
         const role_account = await executeQuery(queryGetRoleAccount, [accountID]);

         return { infoAccount, role_account };
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [accountID],
         });
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${accountID}`);
      }
   };

   existsByUsername = async (username: string): Promise<boolean> => {
      try {
         const queryCheck = 'Select 1 from accounts Where username = ? Limit 1';
         const result = await executeQuery(queryCheck, [username]);

         return result.length > 0;
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [username],
         });
         throw new DatabaseError(`Không thể kiểm tra username: ${username}`);
      }
   };

   existsByEmail = async (email: string): Promise<boolean> => {
      try {
         const queryCheck = 'Select 1 from accounts Where email = ? Limit 1';
         const result = await executeQuery(queryCheck, [email]);

         return result.length > 0;
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [email],
         });
         throw new DatabaseError(`Không thể kiểm tra email: ${email}`);
      }
   };
}

export default AccountRepository;
