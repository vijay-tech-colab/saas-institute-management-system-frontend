import { atom } from 'jotai';

export type UserRole = 'SUPER_ADMIN';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  instituteName?: string;
  avatarUrl?: string;
}

// Initial state for Super Admin
export const userAtom = atom<UserProfile>({
  name: 'Alex Rivera',
  email: 'superadmin@campusos.internal',
  role: 'SUPER_ADMIN',
  instituteName: 'CampusOS SaaS HQ',
});

// Derived atom to easily check super admin state
export const isSuperAdminAtom = atom(() => true);
