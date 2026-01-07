export type Role = {
   role_id: number;
   role_name: string;
   role_desc: string;
};

const RoleStories: Role[] = [
   {
      role_id: 1,
      role_name: 'admin',
      role_desc: '',
   },
   {
      role_id: 2,
      role_name: 'manager',
      role_desc: '',
   },
   {
      role_id: 3,
      role_name: 'guest',
      role_desc: '',
   },
   {
      role_id: 4,
      role_name: 'support',
      role_desc: '',
   },
   {
      role_id: 5,
      role_name: 'staff',
      role_desc: '',
   },
   {
      role_id: 6,
      role_name: 'collaborator',
      role_desc: '',
   },
   {
      role_id: 7,
      role_name: 'seller',
      role_desc: '',
   },
];

/**
 * @param userRoles Mảng object roles của user: [{ role_id: 1 }, { role_id: 2 }]
 * @param requiredRoleNames Mảng tên các role cho phép: ['admin', 'manager']
 */
export const hasAnyRole = (
   userRoles: { role_id: number }[],
   requiredRoleNames: string[]
): boolean => {
   const requiredRoleIds = RoleStories.filter((r) => requiredRoleNames.includes(r.role_name)).map(
      (r) => r.role_id
   );

   return userRoles.some((role) => requiredRoleIds.includes(role.role_id));
};
