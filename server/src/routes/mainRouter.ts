import express from 'express';
import type { Request, Response } from 'express';

const mainRouter = express.Router();

import authRouter from './authRouter.ts';
import productRouter from './productRouter.ts';

mainRouter.use('/auth', authRouter);
mainRouter.use('/prod', productRouter);

mainRouter.get('/health', (req: Request, res: Response) => {
   res.status(200).send({
      message: 'Server Running .....',
   });
});

export default mainRouter;
