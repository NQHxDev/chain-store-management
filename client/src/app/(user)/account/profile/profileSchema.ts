import { z } from 'zod';

export const profileSchema = z.object({
   name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
   email: z.string().email('Email không hợp lệ'),
   phone: z
      .string()
      .regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
      .optional()
      .or(z.literal('')),
   gender: z.enum(['male', 'female', 'other']).optional(),
   address: z.string().max(500, 'Địa chỉ quá dài').optional(),
   dateOfBirth: z.string().optional(),
});

export const passwordSchema = z
   .object({
      currentPassword: z.string().min(6, 'Mật khẩu hiện tại phải có ít nhất 6 ký tự'),
      newPassword: z.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
      confirmPassword: z.string(),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword'],
   });
