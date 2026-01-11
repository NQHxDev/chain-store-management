import express from 'express';

import RateLimit from '@/middlewares/rateLimit';
import AuthController, { ProfileController } from '@/controllers/authController';
import AuthValidator, { authenticate } from '@/middlewares/authValidator';

const authRouter = express.Router();
const authController = new AuthController();
const profileController = new ProfileController();

// Authentication
authRouter.post(
   '/register',
   RateLimit.accessRateLimiter,
   AuthValidator.register(),
   authController.register
);
authRouter.post('/login', RateLimit.accessRateLimiter, AuthValidator.login(), authController.login);
authRouter.post('/logout', authController.logout);

authRouter.get('/google', authController.loginByGoogle);
authRouter.get('/google/callback', authController.loginByGoogleCallback);

// API
authRouter.get('/check-identifier', authController.checkIdentifier);
authRouter.post('/refresh-token', authController.refreshToken);

// authRouter.post('/update-phone-number');
authRouter.get('/profile/me', authenticate, profileController.getProfileMe);

// Change FullName User
// Update Location
// Show UserID
// Update Password

export default authRouter;
