import RoleRepository from '@/repositories/repoRole';
import { IRole } from '@/types/interfaces/interfaceAccount';

let roleCache: IRole[] = [];

const repoRole = new RoleRepository();

export const loadDataOnBoot = async () => {
   // console.log('\n');
   roleCache = await repoRole.getAllRoles();
   if (!roleCache.length) {
      throw new Error('Danh sách Role đang rỗng!');
   }
   console.log(`[✓] Loaded ${roleCache.length} roles ...`);
};

export const getRoleList = (): IRole[] => {
   return roleCache;
};
