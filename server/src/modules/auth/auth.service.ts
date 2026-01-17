import { IRegisterDTO } from '@/modules/auth/auth.interface';
import { IUser } from '@/modules/user/user.interface';
import { UserRepository } from '@/modules/user/user.repository';
import BaseResponse from '@/shared/base.response';
import { HashingService } from '@/shared/services/hashing.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class AuthService {
   constructor(private readonly userRepository: UserRepository) {}

   async register(registerBody: IRegisterDTO) {
      if (registerBody.password !== registerBody.confirmPassword) {
         return BaseResponse.message(
            'Mật khẩu không khớp vui lòng thử lại',
            HttpStatus.BAD_REQUEST
         );
      }
      const userId = uuidv7();
      const hashedPassword = await HashingService.hashValue(registerBody.password);

      const newUser: IUser = {
         userId: userId,
         username: registerBody.username,
         email: registerBody.username,
         password: hashedPassword,
         status: 'inactive',
         roleId: 7,
      };

      const result = await this.userRepository.createUser(newUser);
      return BaseResponse.success(result, 'Đăng ký tài khoản thành công', HttpStatus.CREATED);
   }
}
