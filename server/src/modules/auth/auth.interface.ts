export interface ITokenPayload {
   userId: string;
   status: string;
   role: string;

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
   user: ITokenPayload;
   token: {
      accessToken: string;
      refreshToken: string;
   };
   sessionId: string;

   createAt?: string;
}

export interface SessionData {
   refreshToken: string;
   user: ITokenPayload;
}
