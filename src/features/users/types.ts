export type UserStatus = 'active' | 'blocked' | 'pending' | 'expired';

export interface InstituteOwner {
  id: string;
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  timeZone?: string;
  currency?: string;

  // Institute Info
  institute: {
    name: string;
    code: string;
    gstNumber?: string;
    website?: string;
    logo?: string;
    establishedYear?: number;
  };

  // Status & Verification
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  isOnline: boolean;
  
  // Subscription Info
  subscription: {
    planName: string;
    planPrice: number;
    planStatus: 'active' | 'expired' | 'trial';
    expiryDate: string;
    renewalDate?: string;
    trialStatus?: boolean;
    storageUsedGB: number;
    remainingStorageGB: number;
  };

  // Usage Statistics
  usage: {
    branchesCreated: number;
    studentsCount: number;
    facultyCount: number;
    coursesCount: number;
    apiUsageCount: number;
    loginCount: number;
  };

  lastLogin: string;
  createdAt: string;
  
  // Block Details
  blockDetails?: {
    reason: string;
    blockedUntil: string | 'permanent';
    notes?: string;
    blockedAt: string;
  };
}
