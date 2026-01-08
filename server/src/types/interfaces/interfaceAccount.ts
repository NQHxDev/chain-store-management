export interface IRole {
   role_id: string | number;
   role_name: string;
   role_desc?: string;
}

export interface IAccount {
   ac_id: string | number;
   username: string;
   password_hash: string;
   email: string;
   status?: string;
}

export interface IAccountRequest {
   email: string;
   username: string;
   password: string;
   confirmPassword: string;
}

export interface LoginRequestBody {
   identifier: string;
   password: string;
   remember: boolean;
}
