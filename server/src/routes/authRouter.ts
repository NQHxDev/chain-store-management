import express from 'express';

import AuthController from '../controllers/authController.ts';
import AuthValidator from '../middlewares/validations/authValidator.ts';

const authRouter = express.Router();
const authController = new AuthController();

// Authentication
authRouter.post('/register', AuthValidator.register(), authController.register);
authRouter.post('/login', AuthValidator.login(), authController.login);
authRouter.post('/logout', authController.logout);

// API
authRouter.get('/api/check-identifier', authController.checkIdentifier);
authRouter.post('/api/refresh-token', authController.refreshToken);

export default authRouter;
