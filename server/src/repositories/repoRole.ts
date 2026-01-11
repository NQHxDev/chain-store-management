import { DatabaseError } from '@/appError';
import { executeQuery } from '@/services/databaseService';
import { IRole } from '@/types/interfaces/interfaceAccount';

class RoleRepository {
   getAllRoles = async () => {
      try {
         const queryGetRoles = 'Select role_id, role_name, role_desc From roles Order By role_id';

         const rows = await executeQuery<IRole[]>(queryGetRoles);

         if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return [];
         }
         return rows;
      } catch (error: any) {
         throw new DatabaseError('Xảy ra lỗi khi lấy danh sách Role từ Database!');
      }
   };
}

export default RoleRepository;
