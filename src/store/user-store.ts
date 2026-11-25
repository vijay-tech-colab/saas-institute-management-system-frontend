import { atom } from 'jotai';

export type UserRole = 'SUPER_ADMIN';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  instituteName?: string;
  avatarUrl?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  department?: string;
  bio?: string;
  joinedAt?: string;
  lastLoginAt?: string;
  twoFactorEnabled?: boolean;
}

// Initial state for Super Admin
export const userAtom = atom<UserProfile>({
  name: 'Alex Rivera',
  email: 'superadmin@campusos.internal',
  role: 'SUPER_ADMIN',
  instituteName: 'CampusOS SaaS HQ',
  phone: '+91 98200 11223',
  location: 'Mumbai, India',
  timezone: 'Asia/Kolkata (IST, UTC+05:30)',
  department: 'Platform Engineering & Operations',
  bio: 'Overseeing multi-tenant onboarding, SaaS billing architecture, enterprise SLAs, and platform-wide security controls.',
  joinedAt: 'Jan 12, 2024',
  lastLoginAt: 'Today, 06:15 AM',
  twoFactorEnabled: true,
});

// Derived atom to easily check super admin state
export const isSuperAdminAtom = atom(() => true);
