import MgrUserService from '@/services/manager/mgrUserService';
import type { Request, Response, NextFunction } from 'express';

export class MgrUserController {
   getListUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const defaultLimit = 10;
         const maxLimit = 100;

         const lastUserId = (req.query.lastUserId as string) || null;
         let limit = Math.abs(Number.parseInt(req.query.limit as string)) || defaultLimit;
         const search = (req.query.search as string)?.trim() || '';
         const status = (req.query.status as string) || 'all';
         const role = (req.query.role as string) || 'all';

         if (limit > maxLimit) limit = maxLimit;

         // Role: manager_group, staff_group, collaborative_group, customer
         // 80 - 100, 50 - 70, 30 - 40, 0 - 10

         const listUser = await MgrUserService.getListUser(lastUserId, limit, search, status, role);

         res.json({
            success: true,
            data: listUser,
         });
      } catch (err) {
         next(err);
      }
   };
}
