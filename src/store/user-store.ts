import { atom } from 'jotai';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'BRANCH_MANAGER' | 'TEACHER' | 'STUDENT' | 'PARENT';

interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  instituteName?: string;
  avatarUrl?: string;
}

// Initial mock state for development
export const userAtom = atom<UserProfile>({
  name: 'John Doe',
  email: 'admin@institute-os.com',
  role: 'SUPER_ADMIN',
  instituteName: 'Main Campus',
});

// Derived atom to easily check specific roles if needed
export const isSuperAdminAtom = atom((get) => get(userAtom).role === 'SUPER_ADMIN');
export const isAdminAtom = atom((get) => get(userAtom).role === 'ADMIN');
export const isTeacherAtom = atom((get) => get(userAtom).role === 'TEACHER');
export const isStudentAtom = atom((get) => get(userAtom).role === 'STUDENT');
export const isParentAtom = atom((get) => get(userAtom).role === 'PARENT');
