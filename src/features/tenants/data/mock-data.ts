import { addDays, subDays } from 'date-fns';

export type TenantStatus = 'active' | 'inactive' | 'suspended' | 'trial' | 'expired';
export type SubscriptionPlan = 'Basic' | 'Pro' | 'Enterprise';

export interface Tenant {
  id: string;
  name: string;
  code: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: SubscriptionPlan;
  status: TenantStatus;
  country: string;
  state: string;
  usage: {
    branches: number;
    students: number;
    users: number;
    storageUsedGB: number;
    maxStorageGB: number;
  };
  createdAt: string;
  expiryDate: string;
}

export const mockTenants: Tenant[] = [
  {
    id: 'TEN-001',
    name: 'Global Tech Institute',
    code: 'GTI',
    ownerName: 'Sarah Jenkins',
    email: 'sarah@globaltech.edu',
    phone: '+1 555-0101',
    plan: 'Enterprise',
    status: 'active',
    country: 'United States',
    state: 'California',
    usage: { branches: 5, students: 2500, users: 150, storageUsedGB: 450, maxStorageGB: 1000 },
    createdAt: subDays(new Date(), 365).toISOString(),
    expiryDate: addDays(new Date(), 365).toISOString(),
  },
  {
    id: 'TEN-002',
    name: 'Pinnacle Learning Center',
    code: 'PLC',
    ownerName: 'Michael Chen',
    email: 'm.chen@pinnacle.edu',
    phone: '+1 555-0102',
    plan: 'Pro',
    status: 'active',
    country: 'Canada',
    state: 'Ontario',
    usage: { branches: 2, students: 800, users: 45, storageUsedGB: 120, maxStorageGB: 500 },
    createdAt: subDays(new Date(), 180).toISOString(),
    expiryDate: addDays(new Date(), 185).toISOString(),
  },
  {
    id: 'TEN-003',
    name: 'Apex Academy',
    code: 'APX',
    ownerName: 'Emily Rodriguez',
    email: 'emily@apexacademy.net',
    phone: '+44 20 7946 0103',
    plan: 'Basic',
    status: 'trial',
    country: 'United Kingdom',
    state: 'London',
    usage: { branches: 1, students: 150, users: 10, storageUsedGB: 25, maxStorageGB: 100 },
    createdAt: subDays(new Date(), 5).toISOString(),
    expiryDate: addDays(new Date(), 9).toISOString(),
  },
  {
    id: 'TEN-004',
    name: 'Future Stars School',
    code: 'FSS',
    ownerName: 'David Kim',
    email: 'admin@futurestars.edu',
    phone: '+82 2-312-3456',
    plan: 'Pro',
    status: 'suspended',
    country: 'South Korea',
    state: 'Seoul',
    usage: { branches: 3, students: 1200, users: 60, storageUsedGB: 210, maxStorageGB: 500 },
    createdAt: subDays(new Date(), 400).toISOString(),
    expiryDate: subDays(new Date(), 10).toISOString(),
  },
  {
    id: 'TEN-005',
    name: 'Horizon Institute',
    code: 'HZI',
    ownerName: 'Amanda Smith',
    email: 'asmith@horizon.edu',
    phone: '+61 2 9876 5432',
    plan: 'Basic',
    status: 'expired',
    country: 'Australia',
    state: 'New South Wales',
    usage: { branches: 1, students: 300, users: 15, storageUsedGB: 80, maxStorageGB: 100 },
    createdAt: subDays(new Date(), 700).toISOString(),
    expiryDate: subDays(new Date(), 30).toISOString(),
  },
  {
    id: 'TEN-006',
    name: 'Bright Minds Academy',
    code: 'BMA',
    ownerName: 'Raj Patel',
    email: 'r.patel@brightminds.in',
    phone: '+91 98765 43210',
    plan: 'Enterprise',
    status: 'active',
    country: 'India',
    state: 'Maharashtra',
    usage: { branches: 12, students: 5000, users: 300, storageUsedGB: 850, maxStorageGB: 2000 },
    createdAt: subDays(new Date(), 60).toISOString(),
    expiryDate: addDays(new Date(), 300).toISOString(),
  },
];
