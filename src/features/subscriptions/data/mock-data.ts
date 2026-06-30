import type {
  Plan, PricingTier, TrialUser, TrialSettings,
  CustomerSubscription, Invoice, Payment, Coupon,
  Renewal, AuditLog, RevenueDataPoint, SubscriptionStats, AIInsight,
  TenantHealth, GatewayMetrics, RecentActivity
} from '../types';

// ─── Plans ─────────────────────────────────────────────────
export const mockPlans: Plan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    description: 'Perfect for small institutes just getting started with digital management.',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    currency: 'INR',
    trialAvailable: true,
    trialDays: 14,
    status: 'active',
    subscribersCount: 128,
    featuresCount: 8,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
    features: {
      studentManagement: true, attendance: true, fees: true,
      certificates: false, onlineClasses: false, aiFeatures: false,
      reports: true, whatsapp: false, sms: true, apiAccess: false,
      storage: 10, branchLimit: 1, userLimit: 10, roleLimit: 3,
      fileUploadSize: 10, studentLimit: 200, facultyLimit: 20,
    },
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    description: 'For growing institutes that need advanced features and multiple branches.',
    monthlyPrice: 2499,
    yearlyPrice: 24990,
    currency: 'INR',
    trialAvailable: true,
    trialDays: 14,
    status: 'popular',
    subscribersCount: 312,
    featuresCount: 14,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-10',
    features: {
      studentManagement: true, attendance: true, fees: true,
      certificates: true, onlineClasses: true, aiFeatures: false,
      reports: true, whatsapp: true, sms: true, apiAccess: false,
      storage: 50, branchLimit: 5, userLimit: 50, roleLimit: 8,
      fileUploadSize: 50, studentLimit: 1000, facultyLimit: 100,
    },
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    description: 'Complete solution with AI features, unlimited API, and priority support.',
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    currency: 'INR',
    trialAvailable: true,
    trialDays: 30,
    status: 'active',
    subscribersCount: 89,
    featuresCount: 20,
    createdAt: '2024-03-01',
    updatedAt: '2024-06-15',
    features: {
      studentManagement: true, attendance: true, fees: true,
      certificates: true, onlineClasses: true, aiFeatures: true,
      reports: true, whatsapp: true, sms: true, apiAccess: true,
      storage: 200, branchLimit: 20, userLimit: 200, roleLimit: 15,
      fileUploadSize: 200, studentLimit: 5000, facultyLimit: 500,
    },
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'Unlimited everything with dedicated support, custom integrations, and SLA.',
    monthlyPrice: 12999,
    yearlyPrice: 129990,
    currency: 'INR',
    trialAvailable: false,
    trialDays: 0,
    status: 'active',
    subscribersCount: 23,
    featuresCount: 25,
    createdAt: '2024-04-01',
    updatedAt: '2024-06-20',
    features: {
      studentManagement: true, attendance: true, fees: true,
      certificates: true, onlineClasses: true, aiFeatures: true,
      reports: true, whatsapp: true, sms: true, apiAccess: true,
      storage: 1000, branchLimit: 999, userLimit: 999, roleLimit: 999,
      fileUploadSize: 500, studentLimit: 99999, facultyLimit: 9999,
    },
  },
  {
    id: 'plan-basic',
    name: 'Basic',
    description: 'Legacy plan for existing customers. No new subscriptions accepted.',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    currency: 'INR',
    trialAvailable: false,
    trialDays: 0,
    status: 'inactive',
    subscribersCount: 45,
    featuresCount: 5,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-01',
    features: {
      studentManagement: true, attendance: false, fees: true,
      certificates: false, onlineClasses: false, aiFeatures: false,
      reports: false, whatsapp: false, sms: false, apiAccess: false,
      storage: 5, branchLimit: 1, userLimit: 5, roleLimit: 2,
      fileUploadSize: 5, studentLimit: 100, facultyLimit: 10,
    },
  },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `plan-auto-${i}`,
    name: `Plan ${i + 6}`,
    description: `Auto-generated plan ${i + 6} for testing pagination in Plan Management.`,
    monthlyPrice: 1000 + (i * 100),
    yearlyPrice: 10000 + (i * 1000),
    currency: 'INR',
    trialAvailable: i % 2 === 0,
    trialDays: i % 2 === 0 ? 14 : 0,
    status: (['active', 'inactive', 'popular'] as const)[i % 3],
    subscribersCount: 10 + (i * 5),
    featuresCount: 5 + (i % 15),
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
    features: {
      studentManagement: true, attendance: true, fees: true,
      certificates: i % 2 === 0, onlineClasses: i % 3 === 0, aiFeatures: i % 4 === 0,
      reports: true, whatsapp: i % 2 === 0, sms: true, apiAccess: i % 5 === 0,
      storage: 10 + (i * 10), branchLimit: 1 + (i % 5), userLimit: 10 + (i * 10), roleLimit: 3 + (i % 5),
      fileUploadSize: 10 + (i * 5), studentLimit: 100 + (i * 100), facultyLimit: 10 + (i * 10),
    }
  }))
];

// ─── Pricing Tiers ─────────────────────────────────────────
export const mockPricingTiers: PricingTier[] = [
  { id: 'pt-1', planId: 'plan-growth', cycle: 'monthly', originalPrice: 2499, discount: 0, gst: 18, finalPrice: 2949, autoRenewal: true },
  { id: 'pt-2', planId: 'plan-growth', cycle: 'quarterly', originalPrice: 7497, discount: 5, gst: 18, finalPrice: 8376, offerBadge: '5% OFF', autoRenewal: true },
  { id: 'pt-3', planId: 'plan-growth', cycle: 'half-yearly', originalPrice: 14994, discount: 10, gst: 18, finalPrice: 15894, offerBadge: '10% OFF', autoRenewal: true },
  { id: 'pt-4', planId: 'plan-growth', cycle: 'yearly', originalPrice: 29988, discount: 20, gst: 18, finalPrice: 28310, offerBadge: 'BEST VALUE', autoRenewal: true },
  { id: 'pt-5', planId: 'plan-growth', cycle: 'lifetime', originalPrice: 99999, discount: 35, gst: 18, finalPrice: 76499, offerBadge: 'LIFETIME', autoRenewal: false },
];

// ─── Trial Users ────────────────────────────────────────────
export const mockTrialUsers: TrialUser[] = [
  { id: 'tr-1', instituteName: 'Sunshine Academy', email: 'admin@sunshine.edu', phone: '+91 98765 43210', planId: 'plan-growth', planName: 'Growth', status: 'active', startDate: '2024-06-15', endDate: '2024-06-29', daysRemaining: 5 },
  { id: 'tr-2', instituteName: 'Future Tech Institute', email: 'info@futuretech.in', phone: '+91 87654 32109', planId: 'plan-pro', planName: 'Professional', status: 'ending_soon', startDate: '2024-06-18', endDate: '2024-07-02', daysRemaining: 2 },
  { id: 'tr-3', instituteName: 'National Skill Center', email: 'director@nsc.org', phone: '+91 76543 21098', planId: 'plan-growth', planName: 'Growth', status: 'active', startDate: '2024-06-20', endDate: '2024-07-04', daysRemaining: 9 },
  { id: 'tr-4', instituteName: 'Digital Minds Academy', email: 'contact@digitalminds.co', phone: '+91 65432 10987', planId: 'plan-starter', planName: 'Starter', status: 'expired', startDate: '2024-06-01', endDate: '2024-06-15', daysRemaining: 0 },
  { id: 'tr-5', instituteName: 'Prime Computer Institute', email: 'prime@pci.edu', phone: '+91 54321 09876', planId: 'plan-growth', planName: 'Growth', status: 'converted', startDate: '2024-05-28', endDate: '2024-06-11', daysRemaining: 0, convertedToSubscription: true },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `tr-${i + 6}`,
    instituteName: `Trial Institute ${i + 6}`,
    email: `trial${i + 6}@institute.com`,
    phone: `+91 90000 ${(10000 + i).toString()}`,
    planId: i % 3 === 0 ? 'plan-pro' : 'plan-growth',
    planName: i % 3 === 0 ? 'Professional' : 'Growth',
    status: (['active', 'ending_soon', 'expired', 'converted'] as const)[i % 4],
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    daysRemaining: i % 15,
    convertedToSubscription: i % 4 === 3
  }))
];

export const mockTrialSettings: TrialSettings = {
  duration: 14,
  allowedFeatures: ['studentManagement', 'attendance', 'fees', 'reports'],
  oneTrialPerEmail: true,
  requireCard: false,
  autoExpire: true,
  reminderDays: [7, 3, 1],
};

// ─── Customers ─────────────────────────────────────────────
export const mockCustomers: CustomerSubscription[] = [
  { id: 'cs-1', instituteName: 'Sunshine Academy', ownerName: 'Rajesh Kumar', email: 'rajesh@sunshine.edu', currentPlan: 'Growth', planId: 'plan-growth', billingCycle: 'yearly', status: 'active', startDate: '2024-01-15', endDate: '2025-01-15', renewalDate: '2025-01-15', storageUsed: 28, storageLimit: 50, studentsUsed: 645, studentsLimit: 1000, branchesUsed: 2, branchesLimit: 5, paymentStatus: 'successful', monthlyRevenue: 2082, city: 'Mumbai', country: 'India' },
  { id: 'cs-2', instituteName: 'Future Tech Institute', ownerName: 'Priya Sharma', email: 'priya@futuretech.in', currentPlan: 'Professional', planId: 'plan-pro', billingCycle: 'monthly', status: 'active', startDate: '2024-03-01', endDate: '2024-07-01', renewalDate: '2024-07-01', storageUsed: 145, storageLimit: 200, studentsUsed: 2340, studentsLimit: 5000, branchesUsed: 8, branchesLimit: 20, paymentStatus: 'successful', monthlyRevenue: 4999, city: 'Bengaluru', country: 'India' },
  { id: 'cs-3', instituteName: 'National Skill Center', ownerName: 'Amit Patel', email: 'amit@nsc.org', currentPlan: 'Starter', planId: 'plan-starter', billingCycle: 'monthly', status: 'trial', startDate: '2024-06-15', endDate: '2024-06-29', renewalDate: '2024-06-29', storageUsed: 2, storageLimit: 10, studentsUsed: 45, studentsLimit: 200, branchesUsed: 1, branchesLimit: 1, paymentStatus: 'pending', monthlyRevenue: 0, city: 'Pune', country: 'India' },
  { id: 'cs-4', instituteName: 'Digital Minds Academy', ownerName: 'Sunita Rao', email: 'sunita@digitalminds.co', currentPlan: 'Growth', planId: 'plan-growth', billingCycle: 'yearly', status: 'expired', startDate: '2023-06-01', endDate: '2024-06-01', renewalDate: '2024-06-01', storageUsed: 12, storageLimit: 50, studentsUsed: 230, studentsLimit: 1000, branchesUsed: 1, branchesLimit: 5, paymentStatus: 'failed', monthlyRevenue: 0, city: 'Hyderabad', country: 'India' },
  { id: 'cs-5', instituteName: 'Apex Learning Hub', ownerName: 'Vikram Singh', email: 'vikram@apex.edu', currentPlan: 'Enterprise', planId: 'plan-enterprise', billingCycle: 'yearly', status: 'active', startDate: '2024-02-01', endDate: '2025-02-01', renewalDate: '2025-02-01', storageUsed: 456, storageLimit: 1000, studentsUsed: 8900, studentsLimit: 99999, branchesUsed: 34, branchesLimit: 999, paymentStatus: 'successful', monthlyRevenue: 10832, city: 'Delhi', country: 'India' },
  { id: 'cs-6', instituteName: 'Smart Institute Jaipur', ownerName: 'Meera Gupta', email: 'meera@smart.in', currentPlan: 'Growth', planId: 'plan-growth', billingCycle: 'quarterly', status: 'suspended', startDate: '2024-01-01', endDate: '2024-04-01', renewalDate: '2024-04-01', storageUsed: 18, storageLimit: 50, studentsUsed: 310, studentsLimit: 1000, branchesUsed: 2, branchesLimit: 5, paymentStatus: 'failed', monthlyRevenue: 0, city: 'Jaipur', country: 'India' },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `cs-${i + 7}`,
    instituteName: `Customer Institute ${i + 7}`,
    ownerName: `Owner ${i + 7}`,
    email: `owner${i + 7}@institute.com`,
    currentPlan: i % 2 === 0 ? 'Professional' : 'Growth',
    planId: i % 2 === 0 ? 'plan-pro' : 'plan-growth',
    billingCycle: (['monthly', 'quarterly', 'yearly'] as const)[i % 3],
    status: (['active', 'active', 'trial', 'expired', 'suspended'] as const)[i % 5],
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    renewalDate: '2025-01-01',
    storageUsed: 10 + (i % 40),
    storageLimit: 50,
    studentsUsed: 100 + (i * 2),
    studentsLimit: 1000,
    branchesUsed: 1 + (i % 3),
    branchesLimit: 5,
    paymentStatus: (['successful', 'pending', 'failed'] as const)[i % 3],
    monthlyRevenue: 2499 + (i * 10),
    city: ['Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad'][i % 5],
    country: 'India'
  }))
];

// ─── Invoices ──────────────────────────────────────────────
export const mockInvoices: Invoice[] = [
  { id: 'inv-1', invoiceNumber: 'INV-2024-0142', instituteName: 'Sunshine Academy', planName: 'Growth (Yearly)', amount: 24990, gst: 4498, discount: 2499, total: 26989, paymentMethod: 'Razorpay', status: 'paid', invoiceDate: '2024-06-15', dueDate: '2024-06-22', email: 'rajesh@sunshine.edu' },
  { id: 'inv-2', invoiceNumber: 'INV-2024-0141', instituteName: 'Future Tech Institute', planName: 'Professional (Monthly)', amount: 4999, gst: 899, discount: 0, total: 5898, paymentMethod: 'Stripe', status: 'paid', invoiceDate: '2024-06-01', dueDate: '2024-06-08', email: 'priya@futuretech.in' },
  { id: 'inv-3', invoiceNumber: 'INV-2024-0140', instituteName: 'Digital Minds Academy', planName: 'Growth (Yearly)', amount: 24990, gst: 4498, discount: 0, total: 29488, paymentMethod: 'Razorpay', status: 'overdue', invoiceDate: '2024-05-20', dueDate: '2024-05-27', email: 'sunita@digitalminds.co' },
  { id: 'inv-4', invoiceNumber: 'INV-2024-0139', instituteName: 'Apex Learning Hub', planName: 'Enterprise (Yearly)', amount: 129990, gst: 23398, discount: 12999, total: 140389, paymentMethod: 'Bank Transfer', status: 'paid', invoiceDate: '2024-06-10', dueDate: '2024-06-17', email: 'vikram@apex.edu' },
  { id: 'inv-5', invoiceNumber: 'INV-2024-0138', instituteName: 'Smart Institute Jaipur', planName: 'Growth (Quarterly)', amount: 7497, gst: 1349, discount: 374, total: 8472, paymentMethod: 'UPI', status: 'unpaid', invoiceDate: '2024-06-18', dueDate: '2024-06-25', email: 'meera@smart.in' },
  { id: 'inv-6', invoiceNumber: 'INV-2024-0137', instituteName: 'Prime Computer Institute', planName: 'Growth (Monthly)', amount: 2499, gst: 449, discount: 249, total: 2699, paymentMethod: 'Razorpay', status: 'paid', invoiceDate: '2024-06-12', dueDate: '2024-06-19', email: 'prime@pci.edu' },
  ...Array.from({ length: 400 }).map((_, i) => {
    const idx = i + 7;
    const statuses = ['paid', 'unpaid', 'overdue'] as const;
    const methods = ['Razorpay', 'Stripe', 'UPI', 'Bank Transfer'];
    return {
      id: `inv-${idx}`,
      invoiceNumber: `INV-2024-${(143 - idx).toString().padStart(4, '0')}`,
      instituteName: `Demo Institute ${idx}`,
      planName: idx % 2 === 0 ? 'Professional (Monthly)' : 'Growth (Yearly)',
      amount: 5000 + (idx * 100),
      gst: Math.floor((5000 + (idx * 100)) * 0.18),
      discount: 0,
      total: Math.floor((5000 + (idx * 100)) * 1.18),
      paymentMethod: methods[idx % methods.length],
      status: statuses[idx % 3],
      invoiceDate: '2024-06-15',
      dueDate: '2024-06-22',
      email: `contact${idx}@institute.edu`
    };
  })
];

// ─── Payments ──────────────────────────────────────────────
export const mockPayments: Payment[] = [
  { id: 'pay-1', transactionId: 'TXN_RZP_abc123xyz', instituteName: 'Sunshine Academy', gateway: 'Razorpay', amount: 26989, currency: 'INR', status: 'successful', invoiceId: 'inv-1', invoiceNumber: 'INV-2024-0142', paymentDate: '2024-06-15T10:30:00Z' },
  { id: 'pay-2', transactionId: 'TXN_STR_def456uvw', instituteName: 'Future Tech Institute', gateway: 'Stripe', amount: 5898, currency: 'INR', status: 'successful', invoiceId: 'inv-2', invoiceNumber: 'INV-2024-0141', paymentDate: '2024-06-01T14:15:00Z' },
  { id: 'pay-3', transactionId: 'TXN_RZP_ghi789rst', instituteName: 'Digital Minds Academy', gateway: 'Razorpay', amount: 29488, currency: 'INR', status: 'failed', invoiceId: 'inv-3', invoiceNumber: 'INV-2024-0140', paymentDate: '2024-05-27T09:00:00Z', failureReason: 'Insufficient funds in account' },
  { id: 'pay-4', transactionId: 'TXN_BNK_jkl012mno', instituteName: 'Apex Learning Hub', gateway: 'Bank Transfer', amount: 140389, currency: 'INR', status: 'successful', invoiceId: 'inv-4', invoiceNumber: 'INV-2024-0139', paymentDate: '2024-06-10T16:45:00Z' },
  { id: 'pay-5', transactionId: 'TXN_UPI_pqr345stu', instituteName: 'Smart Institute Jaipur', gateway: 'UPI', amount: 8472, currency: 'INR', status: 'pending', invoiceId: 'inv-5', invoiceNumber: 'INV-2024-0138', paymentDate: '2024-06-18T11:00:00Z' },
  { id: 'pay-6', transactionId: 'TXN_RZP_vwx678yza', instituteName: 'Prime Computer Institute', gateway: 'Razorpay', amount: 2699, currency: 'INR', status: 'refunded', invoiceId: 'inv-6', invoiceNumber: 'INV-2024-0137', paymentDate: '2024-06-12T13:30:00Z', refundDate: '2024-06-14T10:00:00Z', refundAmount: 2699 },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `pay-${i + 7}`,
    transactionId: `TXN_AUTO_${10000 + i}`,
    instituteName: `Institute ${i + 7}`,
    gateway: (['Razorpay', 'Stripe', 'Bank Transfer', 'UPI'] as const)[i % 4],
    amount: 1000 + (i * 50),
    currency: 'INR',
    status: (['successful', 'failed', 'pending', 'refunded'] as const)[i % 4],
    invoiceId: `inv-${i + 7}`,
    invoiceNumber: `INV-2024-${1000 + i}`,
    paymentDate: '2024-06-15T10:30:00Z'
  }))
];

// ─── Coupons ───────────────────────────────────────────────
export const mockCoupons: Coupon[] = [
  { id: 'cup-1', code: 'LAUNCH50', discountType: 'percentage', discountValue: 50, maxDiscount: 5000, applicablePlans: ['plan-starter', 'plan-growth'], minimumPurchase: 1000, maximumUsage: 100, usageCount: 87, oneTimeUse: false, startDate: '2024-01-01', endDate: '2024-12-31', status: 'active', revenueGenerated: 124500 },
  { id: 'cup-2', code: 'SAVE2000', discountType: 'flat', discountValue: 2000, applicablePlans: ['plan-growth', 'plan-pro'], minimumPurchase: 5000, maximumUsage: 50, usageCount: 50, oneTimeUse: false, startDate: '2024-05-01', endDate: '2024-06-30', status: 'expired', revenueGenerated: 89000 },
  { id: 'cup-3', code: 'PRO30', discountType: 'percentage', discountValue: 30, maxDiscount: 3000, applicablePlans: ['plan-pro'], minimumPurchase: 2000, maximumUsage: 30, usageCount: 12, oneTimeUse: true, startDate: '2024-06-01', endDate: '2024-07-31', status: 'active', revenueGenerated: 42000 },
  { id: 'cup-4', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, applicablePlans: ['plan-starter', 'plan-growth', 'plan-pro'], minimumPurchase: 500, maximumUsage: 999, usageCount: 234, oneTimeUse: true, startDate: '2024-01-01', endDate: '2024-12-31', status: 'active', revenueGenerated: 312000 },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `cup-${i + 5}`,
    code: `OFFER${i + 5}`,
    discountType: (['percentage', 'flat'] as const)[i % 2],
    discountValue: i % 2 === 0 ? 10 + (i % 40) : 500 + (i * 10),
    maxDiscount: 5000,
    applicablePlans: ['plan-growth'],
    minimumPurchase: 1000,
    maximumUsage: 100,
    usageCount: i % 50,
    oneTimeUse: i % 2 === 0,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: (['active', 'expired'] as const)[i % 2],
    revenueGenerated: 10000 + (i * 100)
  }))
];

// ─── Renewals ──────────────────────────────────────────────
export const mockRenewals: Renewal[] = [
  { id: 'ren-1', instituteName: 'Sunshine Academy', planName: 'Growth (Yearly)', amount: 26989, renewalDate: '2025-01-15', status: 'upcoming', autoRenewal: true, daysUntilRenewal: 200, reminderSent: false },
  { id: 'ren-2', instituteName: 'Future Tech Institute', planName: 'Professional (Monthly)', amount: 5898, renewalDate: '2024-07-01', status: 'upcoming', autoRenewal: true, daysUntilRenewal: 5, reminderSent: true },
  { id: 'ren-3', instituteName: 'Digital Minds Academy', planName: 'Growth (Yearly)', amount: 29488, renewalDate: '2024-06-01', status: 'expired', autoRenewal: false, daysUntilRenewal: -28, reminderSent: true },
  { id: 'ren-4', instituteName: 'Apex Learning Hub', planName: 'Enterprise (Yearly)', amount: 140389, renewalDate: '2025-02-01', status: 'upcoming', autoRenewal: true, daysUntilRenewal: 217, reminderSent: false },
  { id: 'ren-5', instituteName: 'Smart Institute Jaipur', planName: 'Growth (Quarterly)', amount: 8472, renewalDate: '2024-07-01', status: 'cancelled', autoRenewal: false, daysUntilRenewal: 5, reminderSent: false },
  { id: 'ren-6', instituteName: 'Prime Computer Institute', planName: 'Growth (Monthly)', amount: 2699, renewalDate: '2024-07-12', status: 'successful', autoRenewal: true, daysUntilRenewal: 16, reminderSent: true },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `ren-${i + 7}`,
    instituteName: `Institute ${i + 7}`,
    planName: i % 2 === 0 ? 'Growth (Monthly)' : 'Professional (Yearly)',
    amount: 5000 + (i * 10),
    renewalDate: '2024-07-15',
    status: (['upcoming', 'successful', 'expired', 'cancelled'] as const)[i % 4],
    autoRenewal: i % 2 === 0,
    daysUntilRenewal: (i % 30) - 5,
    reminderSent: i % 2 === 1
  }))
];

// ─── Audit Logs ────────────────────────────────────────────
export const mockAuditLogs: AuditLog[] = [
  { id: 'aud-1', user: 'Super Admin', userRole: 'SUPER_ADMIN', action: 'Plan Updated', entity: 'Growth Plan', oldValue: '₹2,299/month', newValue: '₹2,499/month', ipAddress: '192.168.1.10', date: '2024-06-20', time: '14:32:15' },
  { id: 'aud-2', user: 'Admin', userRole: 'ADMIN', action: 'Coupon Created', entity: 'PRO30', oldValue: '-', newValue: '30% off for Pro plan', ipAddress: '10.0.0.5', date: '2024-06-19', time: '11:15:42' },
  { id: 'aud-3', user: 'Super Admin', userRole: 'SUPER_ADMIN', action: 'Subscription Suspended', entity: 'Smart Institute Jaipur', oldValue: 'Active', newValue: 'Suspended', ipAddress: '192.168.1.10', date: '2024-06-18', time: '09:04:11' },
  { id: 'aud-4', user: 'Super Admin', userRole: 'SUPER_ADMIN', action: 'Invoice Sent', entity: 'INV-2024-0142', oldValue: '-', newValue: 'Email sent to rajesh@sunshine.edu', ipAddress: '192.168.1.10', date: '2024-06-15', time: '10:28:55' },
  { id: 'aud-5', user: 'System', userRole: 'SYSTEM', action: 'Trial Expired', entity: 'Digital Minds Academy', oldValue: 'Trial Active', newValue: 'Trial Expired', ipAddress: '127.0.0.1', date: '2024-06-15', time: '00:00:01' },
  ...Array.from({ length: 400 }).map((_, i) => ({
    id: `aud-${i + 6}`,
    user: `Admin ${i % 10}`,
    userRole: (['ADMIN', 'SUPER_ADMIN', 'SYSTEM'] as const)[i % 3],
    action: ['Plan Updated', 'User Login', 'Invoice Sent', 'Settings Changed'][i % 4],
    entity: `Entity ${i}`,
    oldValue: '-',
    newValue: 'Updated',
    ipAddress: `192.168.1.${10 + (i % 245)}`,
    date: '2024-06-20',
    time: '14:30:00'
  }))
];

// ─── Revenue Chart Data ─────────────────────────────────────
export const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 285000, mrr: 285000, newSubscriptions: 18, churned: 2 },
  { month: 'Feb', revenue: 312000, mrr: 312000, newSubscriptions: 22, churned: 3 },
  { month: 'Mar', revenue: 298000, mrr: 298000, newSubscriptions: 19, churned: 4 },
  { month: 'Apr', revenue: 345000, mrr: 345000, newSubscriptions: 28, churned: 2 },
  { month: 'May', revenue: 389000, mrr: 389000, newSubscriptions: 31, churned: 3 },
  { month: 'Jun', revenue: 421000, mrr: 421000, newSubscriptions: 35, churned: 2 },
  { month: 'Jul', revenue: 467000, mrr: 467000, newSubscriptions: 40, churned: 3 },
  { month: 'Aug', revenue: 445000, mrr: 445000, newSubscriptions: 38, churned: 5 },
  { month: 'Sep', revenue: 498000, mrr: 498000, newSubscriptions: 42, churned: 2 },
  { month: 'Oct', revenue: 534000, mrr: 534000, newSubscriptions: 45, churned: 4 },
  { month: 'Nov', revenue: 578000, mrr: 578000, newSubscriptions: 51, churned: 3 },
  { month: 'Dec', revenue: 624000, mrr: 624000, newSubscriptions: 58, churned: 2 },
];

// ─── Stats ─────────────────────────────────────────────────
export const mockStats: SubscriptionStats = {
  totalActive: 552,
  trialUsers: 38,
  expired: 91,
  monthlyRevenue: 624000,
  todayRevenue: 28450,
  pendingRenewals: 23,
  failedPayments: 7,
  activeCoupons: 3,
  mrr: 624000,
  arr: 7488000,
  trialConversionRate: 68.4,
  renewalRate: 91.2,
  churnRate: 4.8,
  cancelledPlans: 24,
  avgRevenuePerTenant: 11250,
  lifetimeValue: 135000,
  renewalSuccessRate: 94.5,
};

// ─── Tenant Health ─────────────────────────────────────────
export const mockTenantHealth: TenantHealth[] = [
  { id: 'th-1', instituteName: 'Sunshine Academy', healthScore: 92, activeUsers: 450, storageUsage: 56, apiUsage: 45, loginFrequency: 'High', subscriptionStatus: 'Active', riskLevel: 'Low' },
  { id: 'th-2', instituteName: 'Future Tech Institute', healthScore: 98, activeUsers: 2100, storageUsage: 72, apiUsage: 89, loginFrequency: 'High', subscriptionStatus: 'Active', riskLevel: 'Low' },
  { id: 'th-3', instituteName: 'Smart Institute Jaipur', healthScore: 35, activeUsers: 12, storageUsage: 90, apiUsage: 5, loginFrequency: 'Low', subscriptionStatus: 'Suspended', riskLevel: 'High' },
  { id: 'th-4', instituteName: 'Digital Minds Academy', healthScore: 65, activeUsers: 145, storageUsage: 24, apiUsage: 12, loginFrequency: 'Medium', subscriptionStatus: 'Expired', riskLevel: 'Medium' },
  { id: 'th-5', instituteName: 'Apex Learning Hub', healthScore: 88, activeUsers: 8500, storageUsage: 45, apiUsage: 67, loginFrequency: 'High', subscriptionStatus: 'Active', riskLevel: 'Low' },
];

// ─── Gateway Metrics ───────────────────────────────────────
export const mockGatewayMetrics: GatewayMetrics[] = [
  { id: 'gw-1', gateway: 'Razorpay', successRate: 98.5, revenue: 450000, failureRate: 1.5, transactionCount: 1250 },
  { id: 'gw-2', gateway: 'Stripe', successRate: 99.2, revenue: 210000, failureRate: 0.8, transactionCount: 450 },
  { id: 'gw-3', gateway: 'PayPal', successRate: 96.4, revenue: 85000, failureRate: 3.6, transactionCount: 180 },
  { id: 'gw-4', gateway: 'Bank Transfer', successRate: 100, revenue: 350000, failureRate: 0, transactionCount: 45 },
];

// ─── AI Insights ────────────────────────────────────────────
export const mockAIInsights: AIInsight[] = [
  { id: 'ai-1', type: 'churn_risk', instituteName: 'Smart Institute Jaipur', score: 87, description: 'High churn risk detected. Payment failed 2 times. Engagement dropped 60% last month.', recommendation: 'Reach out immediately. Offer 2-month discount to retain.', priority: 'high', confidence: 91, predictedValue: 8472 },
  { id: 'ai-2', type: 'upgrade_opportunity', instituteName: 'Sunshine Academy', score: 78, description: 'Using 91% of student limit and 56% of storage. Growth plan nearly maxed out.', recommendation: 'Proactively suggest Professional plan upgrade. High conversion probability.', priority: 'high', confidence: 85, predictedValue: 4999 },
  { id: 'ai-3', type: 'revenue_prediction', instituteName: 'Platform Wide', score: 92, description: 'Based on current growth rate, MRR expected to reach ₹8,50,000 in 3 months.', recommendation: 'Consider hiring 2 more support agents to handle projected growth.', priority: 'medium', confidence: 88, predictedValue: 850000 },
  { id: 'ai-4', type: 'health_score', instituteName: 'Future Tech Institute', score: 95, description: 'Excellent engagement. Using 98% of features. High NPS scores from survey.', recommendation: 'Ideal candidate for case study and referral program.', priority: 'low', confidence: 97 },
  { id: 'ai-5', type: 'renewal_forecast', instituteName: 'Digital Minds Academy', score: 12, description: 'Trial expired 28 days ago. No response to 3 reminder emails sent.', recommendation: 'Last attempt: send personalized win-back offer with 60-day extension.', priority: 'high', confidence: 76, predictedValue: 29488 },
  { id: 'ai-6', type: 'payment_risk', instituteName: 'National Skill Center', score: 45, description: 'No payment method on file. Trial ending in 2 days.', recommendation: 'Send payment link and offer 3-month discount for first payment.', priority: 'medium', confidence: 80, predictedValue: 9990 },
];

// ─── Recent Activities ─────────────────────────────────────
export const mockRecentActivities: RecentActivity[] = [
  { id: 'act-1', type: 'subscription_renewed', title: 'Subscription Renewed', description: 'Growth Plan (Yearly) renewed for ₹29,488', timeAgo: '10 mins ago', instituteName: 'Sunshine Academy' },
  { id: 'act-2', type: 'plan_changed', title: 'Plan Upgraded', description: 'Upgraded from Starter to Professional', timeAgo: '2 hours ago', instituteName: 'Future Tech Institute' },
  { id: 'act-3', type: 'payment_received', title: 'Payment Received', description: '₹140,389 via Bank Transfer', timeAgo: '5 hours ago', instituteName: 'Apex Learning Hub' },
  { id: 'act-4', type: 'trial_started', title: 'New Trial Started', description: '14-day trial for Professional Plan', timeAgo: '1 day ago', instituteName: 'Digital Minds Academy' },
  { id: 'act-5', type: 'coupon_applied', title: 'Coupon Applied', description: 'PRO30 applied (Saved ₹3,000)', timeAgo: '2 days ago', instituteName: 'National Skill Center' },
  { id: 'act-6', type: 'refund_initiated', title: 'Refund Initiated', description: '₹2,699 refunded to original source', timeAgo: '3 days ago', instituteName: 'Prime Computer Institute' },
];
