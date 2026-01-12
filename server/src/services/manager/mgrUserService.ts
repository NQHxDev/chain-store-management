import { NotFoundError } from '@/appError';
import { AccountRepository } from '@/repositories/repoAccount';

const repoAccount = new AccountRepository();

class MgrUserService {
   static getListUser = async (
      lastUserId: string,
      limit: number,
      search: string,
      status: string,
      roleGroup: string
   ) => {
      const statusParam = status || 'active';

      const roleMapping: Record<string, string[]> = {
         manager_group: ['admin', 'manager'],
         staff_group: ['support', 'staff'],
         collaborative_group: ['seller', 'collaborator'],
         customer: ['customer', 'guest'],
      };

      const rolesToFilter = roleGroup !== 'all' ? roleMapping[roleGroup] : [];
      const listUser = await repoAccount.getListUserToDashboard(
         lastUserId,
         limit,
         search,
         statusParam,
         rolesToFilter
      );

      if (!listUser) {
         throw new NotFoundError('Không tìm thấy người dùng nào trong danh sách!');
      }

      return listUser;
   };
}

export default MgrUserService;
