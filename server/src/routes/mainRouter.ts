import express from 'express';
import type { Request, Response } from 'express';

const mainRouter = express.Router();

import authRouter from './authRouter';
import productRouter from './productRouter';
import managerRouter from './managerRouter';

mainRouter.use('/auth', authRouter);
mainRouter.use('/prod', productRouter);
mainRouter.use('/mgr', managerRouter);

mainRouter.get('/health', (req: Request, res: Response) => {
   res.status(200).send({
      message: 'Server Running .....',
   });
});

export default mainRouter;
