import { DatabaseError } from '../appError.ts';
import { executeQuery, transactionQuery } from '../services/databaseService.ts';
import ListRole from '../types/data/listRole.ts';

import type { IAccount, IOauth, IProfile } from '../types/interfaces/interfaceAccount.ts';

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

   findByID = async (accountID: string | number) => {
      try {
         const queryGetAccount = `Select ac_id, username, password_hash, email, status from accounts where ac_id = ? Limit 1`;
         const rows = await executeQuery(queryGetAccount, [accountID]);

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
            parameters: [accountID],
         });
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${accountID}`);
      }
   };

   findByEmail = async (email: string) => {
      try {
         const queryGetAccount = `Select ac_id, username, password_hash, email, status from accounts where email = ? Limit 1`;
         const rows = await executeQuery(queryGetAccount, [email]);

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
            parameters: [email],
         });
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${email}`);
      }
   };

   findByProvider = async (provider: string, oauthID: string | number) => {
      try {
         const queryGetOauth = `Select ac_id from account_oauths where provider = ? or oauth_id = ? Limit 1`;
         const rows = await executeQuery(queryGetOauth, [provider, oauthID]);

         if (!rows || rows.length === 0) {
            return null;
         }

         return rows[0] as { ac_id: string | number };
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [oauthID],
         });
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${oauthID}`);
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

export class ProfileRepository {
   createProfile = async (newProfile: IProfile): Promise<any> => {
      try {
         const queryInertProfile =
            'Insert into account_profiles (ac_id, full_name, avatar_url) Values (?, ?, ?)';

         const result = await executeQuery(queryInertProfile, [
            newProfile.ac_id,
            newProfile.full_name,
            newProfile.avatar_url,
         ]);

         return result;
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [newProfile.ac_id, newProfile.full_name],
         });
         throw new DatabaseError(
            `Xảy ra lỗi khi tạo thông tin tài khoản của: ${newProfile.full_name}`
         );
      }
   };
}

export class OauthRepository {
   createOauth = async (newOauth: IOauth): Promise<any> => {
      try {
         const queryInertAccount =
            'Insert into account_oauths (oauth_id, ac_id, provider, provider_user_id) Values (?, ?, ?, ?)';

         const result = await executeQuery(queryInertAccount, [
            newOauth.oauth_id,
            newOauth.ac_id,
            newOauth.provider,
            newOauth.provider_user_id,
         ]);

         return result;
      } catch (error: any) {
         console.error('Database Error Details:', {
            message: error.message,
            code: error.code,
            sql: error.sql,
            parameters: [newOauth.ac_id, newOauth.provider_user_id],
         });
         throw new DatabaseError(`Xảy ra lỗi khi tạo Oauth tài khoản: ${newOauth.ac_id}`);
      }
   };
}

export default AccountRepository;
