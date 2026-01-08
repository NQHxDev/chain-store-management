import express from 'express';

import RateLimit from '../middlewares/rateLimit.ts';
import AuthController from '../controllers/authController.ts';
import AuthValidator from '../middlewares/validations/authValidator.ts';

const authRouter = express.Router();
const authController = new AuthController();

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

export default authRouter;
