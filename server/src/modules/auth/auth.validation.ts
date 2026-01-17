import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

abstract class BaseAuth {
   @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
   @IsString({ message: 'Mật khẩu phải là 1 chuỗi ký tự' })
   @Length(8, 255, { message: 'Mật khẩu phải từ 8 ký tự' })
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
   })
   password: string;
}

export class LoginValidation extends BaseAuth {}

export class RegisterValidation extends BaseAuth {
   @IsNotEmpty({ message: 'Email không được để trống' })
   @IsString({ message: 'Email yêu cầu là một chuỗi hợp lệ' })
   @IsEmail({}, { message: 'Email không đúng định dạng' })
   @Length(10, 255, { message: 'Email độ dài tối thiểu là 10 kí tự' })
   email: string;

   @IsNotEmpty({ message: 'Username không được để trống' })
   @IsString({ message: 'Username yêu cầu là một chuỗi hợp lệ' })
   @Length(6, 100, { message: 'Username độ dài tối thiểu là 6 kí tự' })
   username: string;

   @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
   @IsString({ message: 'Mật khẩu phải là 1 chuỗi ký tự' })
   @Length(8, 255, { message: 'Mật khẩu phải từ 8 ký tự' })
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
   })
   confirmPassword: string;
}
