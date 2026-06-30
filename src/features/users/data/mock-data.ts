import { InstituteOwner } from '../types';

// Helper to pick random element
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const firstNames = ['Amit', 'Raj', 'Priya', 'Neha', 'Sanjay', 'Vikram', 'Anjali', 'Kavita', 'Rohan', 'Sneha', 'Rahul', 'Pooja', 'Sunil', 'Kiran', 'Anita'];
const lastNames = ['Sharma', 'Verma', 'Singh', 'Patel', 'Kumar', 'Gupta', 'Joshi', 'Desai', 'Mehta', 'Reddy', 'Bansal', 'Agarwal', 'Iyer', 'Nair'];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Surat'];
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'West Bengal', 'Rajasthan', 'Gujarat'];
const plans = ['Starter Plan', 'Basic Plan', 'Pro Plan', 'Trial'];
const reasons = ['Payment Due', 'Fraud', 'Spam', 'Policy Violation', 'Other'];

const generateMockUsers = (): InstituteOwner[] => {
  const users: InstituteOwner[] = [];

  // Generate 400 active/pending/expired users
  for (let i = 1; i <= 400; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const cityIdx = randomInt(0, cities.length - 1);
    
    users.push({
      id: `active-${i}`,
      firstName: fn,
      lastName: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@institute.com`,
      phone: `+91 ${randomInt(9000000000, 9999999999)}`,
      avatar: `https://i.pravatar.cc/150?u=active-${i}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      address: {
        street: `${randomInt(1, 999)} Education Road`,
        city: cities[cityIdx],
        state: states[cityIdx],
        country: 'India',
        zipCode: randomInt(100000, 999999).toString(),
      },
      timeZone: 'Asia/Kolkata',
      currency: 'INR',
      institute: {
        name: `${fn} Academy of Sciences`,
        code: `INST-${i}`,
        establishedYear: randomInt(1990, 2024),
      },
      status: Math.random() > 0.1 ? 'active' : (Math.random() > 0.5 ? 'pending' : 'expired'),
      emailVerified: Math.random() > 0.2,
      phoneVerified: Math.random() > 0.3,
      isOnline: Math.random() > 0.8,
      subscription: {
        planName: pick(plans),
        planPrice: randomInt(0, 10000),
        planStatus: 'active',
        expiryDate: `202${randomInt(5, 7)}-${randomInt(1, 12).toString().padStart(2, '0')}-01T00:00:00Z`,
        storageUsedGB: randomInt(1, 20),
        remainingStorageGB: randomInt(5, 50),
      },
      usage: {
        branchesCreated: randomInt(1, 5),
        studentsCount: randomInt(50, 2000),
        facultyCount: randomInt(5, 100),
        coursesCount: randomInt(2, 30),
        apiUsageCount: randomInt(100, 10000),
        loginCount: randomInt(10, 500),
      },
      lastLogin: `2026-06-${randomInt(1, 29).toString().padStart(2, '0')}T10:00:00Z`,
      createdAt: `2025-${randomInt(1, 12).toString().padStart(2, '0')}-15T08:00:00Z`,
    });
  }

  // Generate 400 blocked users
  for (let i = 1; i <= 400; i++) {
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const cityIdx = randomInt(0, cities.length - 1);
    
    users.push({
      id: `blocked-${i}`,
      firstName: fn,
      lastName: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@blocked.com`,
      phone: `+91 ${randomInt(9000000000, 9999999999)}`,
      avatar: `https://i.pravatar.cc/150?u=blocked-${i}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      address: {
        street: `${randomInt(1, 999)} Suspended Ave`,
        city: cities[cityIdx],
        state: states[cityIdx],
        country: 'India',
        zipCode: randomInt(100000, 999999).toString(),
      },
      timeZone: 'Asia/Kolkata',
      currency: 'INR',
      institute: {
        name: `${fn} Blocked Institute`,
        code: `BLK-${i}`,
        establishedYear: randomInt(1990, 2024),
      },
      status: 'blocked',
      emailVerified: true,
      phoneVerified: false,
      isOnline: false,
      subscription: {
        planName: pick(plans),
        planPrice: randomInt(0, 10000),
        planStatus: 'active',
        expiryDate: `202${randomInt(5, 7)}-${randomInt(1, 12).toString().padStart(2, '0')}-01T00:00:00Z`,
        storageUsedGB: randomInt(1, 20),
        remainingStorageGB: randomInt(5, 50),
      },
      usage: {
        branchesCreated: randomInt(1, 2),
        studentsCount: randomInt(10, 500),
        facultyCount: randomInt(2, 20),
        coursesCount: randomInt(1, 10),
        apiUsageCount: randomInt(0, 1000),
        loginCount: randomInt(1, 100),
      },
      lastLogin: `2026-05-${randomInt(1, 28).toString().padStart(2, '0')}T10:00:00Z`,
      createdAt: `2025-${randomInt(1, 12).toString().padStart(2, '0')}-15T08:00:00Z`,
      blockDetails: {
        reason: pick(reasons),
        blockedUntil: Math.random() > 0.5 ? 'permanent' : 'temporary',
        notes: 'Automated block due to system policies.',
        blockedAt: `2026-06-${randomInt(1, 28).toString().padStart(2, '0')}T10:00:00Z`,
      }
    });
  }

  // Shuffle array slightly so they are mixed in the UI
  return users.sort(() => Math.random() - 0.5);
};

export const mockUsers = generateMockUsers();
