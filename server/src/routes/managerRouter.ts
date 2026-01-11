import express from 'express';

import { authenticate, checkRoleManagement } from '@/middlewares/authValidator';
import { MgrUserController } from '@/controllers/mgrController';

const managerRouter = express.Router();
const mgrUserController = new MgrUserController();

managerRouter.get(
   '/get-list-users',
   authenticate,
   checkRoleManagement,
   mgrUserController.getListUser
);

export default managerRouter;
