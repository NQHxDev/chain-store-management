import { NotFoundError } from '@/appError';
import { AccountRepository } from '@/repositories/repoAccount';

const repoAccount = new AccountRepository();

class MgrUserService {
   static getListUser = async (lastUserId: string, status: string) => {
      const statusParam = status || 'active';
      const idParam = lastUserId && typeof lastUserId === 'string' ? lastUserId : '';

      const listUser = await repoAccount.getListUserToDashboard(idParam, statusParam);

      if (!listUser) {
         throw new NotFoundError('Không tìm thấy người dùng nào trong danh sách!');
      }

      return listUser;
   };
}

export default MgrUserService;
