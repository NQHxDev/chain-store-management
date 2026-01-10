export interface UserProfile {
   id: string;
   name: string;
   email: string;
   phone?: string;
   hasPhone: boolean;
   gender?: 'male' | 'female' | 'other';
   address?: string;
   dateOfBirth?: string;
   avatar?: string;
   hasPassword: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface UpdateProfileData {
   name?: string;
   phone?: string;
   gender?: 'male' | 'female' | 'other';
   address?: string;
   dateOfBirth?: string;
}

export interface ChangePasswordData {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}
