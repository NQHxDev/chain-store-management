import { DatabaseError } from '@/appError';
import { getRoleList } from '@/mainLoader';
import { executeQuery, transactionQuery } from '@/services/databaseService';

import type { IAccount, IOauth, IProfile } from '@/types/interfaces/interfaceAccount';

export class AccountRepository {
   createAccount = async (newAccount: IAccount): Promise<any> => {
      try {
         const guestRole = getRoleList().find((role) => role.role_name === 'guest');
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

            const queryInertProfile = 'Insert into account_profiles (ac_id) Values (?)';

            await executeQuery(queryInertProfile, [newAccount.ac_id], connection);

            return { success: true, ac_id: newAccount.ac_id };
         });
         return result;
      } catch (error: any) {
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
         throw new DatabaseError(`Xảy ra lỗi khi lấy thông tin tài khoản: ${accountID}`);
      }
   };

   existsByUsername = async (username: string): Promise<boolean> => {
      try {
         const queryCheck = 'Select 1 from accounts Where username = ? Limit 1';
         const result = await executeQuery(queryCheck, [username]);

         return result.length > 0;
      } catch (error: any) {
         throw new DatabaseError(`Không thể kiểm tra username: ${username}`);
      }
   };

   existsByEmail = async (email: string): Promise<boolean> => {
      try {
         const queryCheck = 'Select 1 from accounts Where email = ? Limit 1';
         const result = await executeQuery(queryCheck, [email]);

         return result.length > 0;
      } catch (error: any) {
         throw new DatabaseError(`Không thể kiểm tra email: ${email}`);
      }
   };

   getListUserToDashboard = async (lastUserId: string | number, status: string): Promise<any> => {
      try {
         const queryGetAccount = `
            Select ac.ac_id, username, full_name as fullname, email, phone, avatar_url as avatar, status, ac.created_at, (
               Select role_name
               From account_roles ar
               Join roles r on r.role_id = ar.role_id
               Where ar.ac_id = ac.ac_id
               Order By r.priority Desc Limit 1
            ) as role
            From accounts ac
            Join account_profiles ap on ap.ac_id = ac.ac_id
            Where status = ? and (? = '' or ac.ac_id > ?)
            Order By ac_id Asc
            Limit 10
         `;

         const result = await executeQuery(queryGetAccount, [status, lastUserId, lastUserId]);

         return result;
      } catch (error: any) {
         throw new DatabaseError(`Xảy ra lỗi khi lấy Profile tài khoản: ${lastUserId}`);
      }
   };
}

export class ProfileRepository {
   existsProfileByID = async (accountID: string | number): Promise<boolean> => {
      try {
         const queryCheck = 'Select 1 from account_profiles Where ac_id = ? Limit 1';
         const result = await executeQuery(queryCheck, [accountID]);

         return result.length > 0;
      } catch (error: any) {
         throw new DatabaseError(`Không thể kiểm tra Profile ID: ${accountID}`);
      }
   };

   createProfile = async (newProfile: IProfile): Promise<any> => {
      try {
         const isExisting = await this.existsProfileByID(newProfile.ac_id);

         if (isExisting) {
            const queryUpdateProfile = `Update account_profiles
               Set full_name = ?,
                  phone = ?,
                  avatar_url = ?,
                  birth_date = ?,
                  address = ?,
                  gender = ?
               Where ac_id = ?
            `;

            const result = await executeQuery(queryUpdateProfile, [
               newProfile.full_name || null,
               newProfile.phone || null,
               newProfile.avatar_url || null,
               newProfile.birth_date || null,
               newProfile.address || null,
               newProfile.gender || 'unknown',
               newProfile.ac_id,
            ]);

            return result;
         }

         const queryInertProfile = `
            Insert into account_profiles (ac_id, full_name, phone, avatar_url, birth_date, address, gender)
            Values (?, ?, ?, ?, ?, ?, ?)
         `;

         const result = await executeQuery(queryInertProfile, [
            newProfile.ac_id,
            newProfile.full_name || null,
            newProfile.phone || null,
            newProfile.avatar_url || null,
            newProfile.birth_date || null,
            newProfile.address || null,
            newProfile.gender || 'unknown',
         ]);

         return result;
      } catch (error: any) {
         throw new DatabaseError(
            `Xảy ra lỗi khi xử lý thông tin tài khoản của: ${newProfile.full_name}`
         );
      }
   };

   getProfileByID = async (userId: string | number): Promise<any> => {
      try {
         const queryGetProfile = `
            Select ac.ac_id, ac.password_hash, ap.full_name, ap.phone, ap.gender,
               ap.birth_date, ap.address, ap.avatar_url, ap.created_at, ap.updated_at
            from account_profiles ap
            join accounts ac on ac.ac_id = ap.ac_id
            where ap.ac_id = ? Limit 1
         `;
         const rows = await executeQuery(queryGetProfile, [userId]);

         if (!rows || rows.length === 0) {
            return null;
         }
         const profileUser = rows[0];

         return profileUser;
      } catch (error: any) {
         throw new DatabaseError(`Xảy ra lỗi khi lấy Profile tài khoản: ${userId}`);
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
         throw new DatabaseError(`Xảy ra lỗi khi tạo Oauth tài khoản: ${newOauth.ac_id}`);
      }
   };
}
