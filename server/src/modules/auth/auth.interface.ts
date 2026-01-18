export interface ITokenPayload {
   userId: string;
   status: string;
   role: string;

   sessionId?: string;
   createAt?: string;
}

export interface IRegisterDTO {
   username: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export interface ILoginDTO {
   identifier: string;
   password: string;
}

export interface IAuthResponse {
   payload: ITokenPayload;
   token?: {
      accessToken: string;
      refreshToken: string;
   };
   createAt?: string;
}

export interface ISessionData {
   refreshTokenHash: string;
   user: ITokenPayload;
}
