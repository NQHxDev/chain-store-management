import { Request } from 'express';

export interface IRole {
   role_id: string | number;
   role_name?: string;
   role_desc?: string;
}

export interface IAccount {
   ac_id: string | number;
   username: string;
   password_hash?: string | null;
   email: string;
   status?: string;
}

export interface IProfile {
   ac_id: string | number;
   full_name?: string;
   phone?: string;
   avatar_url?: string;
   birth_date?: Date;
   address?: string;
   gender?: string;
}

export interface IOauth {
   oauth_id: string | number;
   ac_id: string | number;
   provider?: string;
   provider_user_id: string | number;
}

export interface IAccountRequest extends Request {
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

export interface AuthRequest extends Request {
   user?: {
      userId: string | number;
      roles: IRole[];
   };
}
