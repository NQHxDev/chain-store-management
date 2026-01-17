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
