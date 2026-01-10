import { NotFoundError } from '@/appError';
import { ProfileRepository } from '@/repositories/repoAccount';

const repoProfile = new ProfileRepository();

class ProfileService {
   static getProfileMe = async (userId: string | number) => {
      const profileUser = await repoProfile.getProfileByID(userId);

      if (!profileUser) {
         throw new NotFoundError('Không tìm thấy người dùng!');
      }

      return {
         id: profileUser.ac_id,
         name: profileUser.full_name,
         phone: profileUser.phone,
         hasPhone: Boolean(profileUser.phone),
         gender: profileUser.gender,
         dateOfBirth: profileUser.birth_date,
         address: profileUser.address,
         avatar: profileUser.avatar_url,
         hasPassword: Boolean(profileUser.password_hash),
         createdAt: profileUser.created_at,
         updatedAt: profileUser.updated_at,
      };
   };
}

export default ProfileService;
