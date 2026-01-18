import { ITokenPayload } from '@/modules/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JWTService {
   constructor(private readonly jwtService: JwtService) {}

   /**
    * @param {ITokenPayload} payload dữ liệu cần thiết để đưa vào Token
    * @param {string} secretKey khoá bí mật của Token
    * @param {JwtSignOptions['expiresIn']} timeLife thời gian sống của Token
    *
    * @return {string} là một Token chứa các dữ liệu từ Payload
    */
   async signToken(
      payload: ITokenPayload,
      secretKey: string,
      timeLife: JwtSignOptions['expiresIn']
   ): Promise<string> {
      const newToken = await this.jwtService.signAsync(payload, {
         secret: secretKey,
         expiresIn: timeLife,
         algorithm: 'HS256',
      });

      return newToken;
   }

   /**
    * @param {string} tokenValue một Token cần giải mã và xác thực
    * @param {string} secretKey khoá bí mật của Token
    *
    * @return {ITokenPayload} là một Payload chứa các dữ liệu đã truyền vào trước đó
    * @return {exp & iat} các thông số đi kèm để xác định thông tin của Token
    */
   async verifyToken(
      tokenValue: string,
      secretKey: string
   ): Promise<ITokenPayload & {exp: number, iat: number}> {
      return await this.jwtService.verifyAsync(tokenValue, {
         secret: secretKey,
      });
   }
}
