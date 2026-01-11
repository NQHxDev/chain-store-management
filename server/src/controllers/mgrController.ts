import MgrUserService from '@/services/manager/mgrUserService';
import type { Request, Response, NextFunction } from 'express';

export class MgrUserController {
   getListUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const status = req.query.status as string;
         const lastUserId = (req.query.lastUserId as string) || '';

         const listUser = await MgrUserService.getListUser(lastUserId, status);

         res.json({
            success: true,
            data: listUser,
         });
      } catch (err) {
         next(err);
      }

      /*
      SELECT *
         FROM accounts
         WHERE ac_id < '019ba833-5da1-7ec5-9790-242d0c82b562' -- ID cuối cùng trang trước
         ORDER BY ac_id DESC
         LIMIT 10;

      -- Index này giúp Database tìm kiếm status và ID mà không cần quét toàn bộ bảng
         CREATE INDEX idx_status_id ON accounts (status, ac_id DESC);

      Interface:
         DashboardUser {
            ac_id: string;
            username: string;
            fullname: string;
            email: string;
            phone: string;
            avatar?: string;
            role: 'admin' | 'user' | 'moderator';
            status: 'active' | 'inactive' | 'pending';

            created_at: string;
         }
      */
   };
}
