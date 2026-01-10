import jwt from 'jsonwebtoken';
import { body, param, query, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

import { AuthError, ValidationError } from '@/appError';
import SecurityService from '@/services/auth/securityService';
import type { AuthRequest } from '@/types/interfaces/interfaceAccount';

class AuthValidator {
   static login() {
      return [
         body('identifier')
            .trim()
            .notEmpty()
            .withMessage('Vui lòng nhập email hoặc tên đăng nhập')
            .escape()
            .custom((value) => {
               if (value.includes('@')) {
                  if (value.length > 255) {
                     throw new ValidationError('Email không được vượt quá 255 ký tự');
                  }
                  return true;
               }
               if (value.length < 6 || value.length > 30) {
                  throw new ValidationError('Tên đăng nhập phải từ 6 đến 30 ký tự');
               }
               return true;
            }),

         body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu là bắt buộc')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),

         AuthValidator.handleValidation,
      ];
   }

   static register() {
      return [
         body('email')
            .trim()
            .notEmpty()
            .withMessage('Email là bắt buộc')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .normalizeEmail(),

         body('username')
            .trim()
            .notEmpty()
            .withMessage('Vui lòng nhập Tên đăng nhập')
            .escape()
            .withMessage('Tài khoản không hợp lệ!')
            .isLength({ min: 6, max: 30 })
            .withMessage('Tài khoản phải từ 6 đến 30 ký tự'),

         body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu là bắt buộc')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),

         body('confirmPassword')
            .trim()
            .notEmpty()
            .withMessage('Xác nhận mật khẩu là bắt buộc')
            .custom((value, { req }) => {
               if (value !== req.body.password) {
                  throw new Error('Mật khẩu xác nhận không khớp');
               }
               return true;
            }),

         AuthValidator.handleValidation,
      ];
   }

   static forgotPassword() {
      return [
         body('email')
            .trim()
            .notEmpty()
            .withMessage('Email là bắt buộc')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .normalizeEmail(),

         AuthValidator.handleValidation,
      ];
   }

   static resetPassword() {
      return [
         body('token').trim().notEmpty().withMessage('Token là bắt buộc'),

         body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu mới là bắt buộc')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),

         body('confirmPassword')
            .trim()
            .notEmpty()
            .withMessage('Xác nhận mật khẩu là bắt buộc')
            .custom((value, { req }) => {
               if (value !== req.body.password) {
                  throw new Error('Mật khẩu xác nhận không khớp');
               }
               return true;
            }),

         AuthValidator.handleValidation,
      ];
   }

   static changePassword() {
      return [
         body('currentPassword').trim().notEmpty().withMessage('Mật khẩu hiện tại là bắt buộc'),

         body('newPassword')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu mới là bắt buộc')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số')
            .custom((value, { req }) => {
               if (value === req.body.currentPassword) {
                  throw new Error('Mật khẩu mới phải khác mật khẩu hiện tại');
               }
               return true;
            }),

         body('confirmPassword')
            .trim()
            .notEmpty()
            .withMessage('Xác nhận mật khẩu là bắt buộc')
            .custom((value, { req }) => {
               if (value !== req.body.newPassword) {
                  throw new Error('Mật khẩu xác nhận không khớp');
               }
               return true;
            }),

         AuthValidator.handleValidation,
      ];
   }

   static updateProfile() {
      return [
         body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Tên phải từ 2 đến 50 ký tự')
            .matches(/^[a-zA-ZÀ-ỹ\s]+$/)
            .withMessage('Tên chỉ được chứa chữ cái và khoảng trắng'),

         body('phone')
            .optional()
            .trim()
            .matches(/^[0-9]{10,11}$/)
            .withMessage('Số điện thoại không hợp lệ'),

         body('address')
            .optional()
            .trim()
            .isLength({ max: 200 })
            .withMessage('Địa chỉ không quá 200 ký tự'),

         AuthValidator.handleValidation,
      ];
   }

   static verifyOTP() {
      return [
         body('email')
            .trim()
            .notEmpty()
            .withMessage('Email là bắt buộc')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .normalizeEmail(),

         body('otp')
            .trim()
            .notEmpty()
            .withMessage('Mã OTP là bắt buộc')
            .isLength({ min: 6, max: 6 })
            .withMessage('Mã OTP phải có 6 chữ số')
            .matches(/^[0-9]+$/)
            .withMessage('Mã OTP chỉ được chứa số'),

         AuthValidator.handleValidation,
      ];
   }

   static refreshToken() {
      return [
         body('refreshToken').trim().notEmpty().withMessage('Refresh token là bắt buộc'),

         AuthValidator.handleValidation,
      ];
   }

   static handleValidation(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const fieldErrors = errors
            .array()
            .filter(
               (e): e is import('express-validator').FieldValidationError => e.type === 'field'
            );

         return res.status(400).json({
            success: false,
            error: {
               code: 400,
               type: 'Validation Error',
               message: fieldErrors[0]?.msg || 'Dữ liệu không hợp lệ',
               details: fieldErrors.map((e) => ({
                  field: e.path,
                  message: e.msg,
               })),
            },
         });
      }

      next();
   }
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith('Bearer ')) {
         throw new AuthError('Thiếu Access Token!');
      }

      const accessToken = authHeader.split(' ')[1];

      const { isValid, payload } = await SecurityService.verifyAccessToken(accessToken);

      if (!isValid) {
         throw new ValidationError('Access Token hết hạn hoặc không đúng!');
      }

      req.user = { userId: payload.userId };
      next();
   } catch (err) {
      next(new AuthError('Token không hợp lệ hoặc đã hết hạn'));
   }
};

export default AuthValidator;
