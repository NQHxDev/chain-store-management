import express from 'express';
import type { Request, Response } from 'express';

const mainRouter = express.Router();

import authRouter from './authRouter.ts';

mainRouter.use('/auth', authRouter);

mainRouter.get('/health', (req: Request, res: Response) => {
   res.status(200).send({
      message: 'Server Running .....',
   });
});

export default mainRouter;
