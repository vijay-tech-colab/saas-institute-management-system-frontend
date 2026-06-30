// ============================================================
// Subscription Management Module — Core Types
// ============================================================

export type PlanStatus = 'active' | 'inactive' | 'popular' | 'deprecated';
export type BillingCycle = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly' | 'lifetime';
export type SubscriptionStatus = 'active' | 'trial' | 'expired' | 'cancelled' | 'suspended' | 'pending';
export type PaymentStatus = 'successful' | 'failed' | 'refunded' | 'pending' | 'completed';
export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue' | 'cancelled';
export type CouponDiscountType = 'percentage' | 'flat';
export type TrialStatus = 'active' | 'ending_soon' | 'expired' | 'converted';

// ─── Plan Features ─────────────────────────────────────────
export interface PlanFeatures {
  studentManagement: boolean;
  attendance: boolean;
  fees: boolean;
  certificates: boolean;
  onlineClasses: boolean;
  aiFeatures: boolean;
  reports: boolean;
  whatsapp: boolean;
  sms: boolean;
  apiAccess: boolean;
  storage: number;         // GB
  branchLimit: number;
  userLimit: number;
  roleLimit: number;
  fileUploadSize: number;  // MB
  studentLimit: number;
  facultyLimit: number;
}

// ─── Plan ──────────────────────────────────────────────────
export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  trialAvailable: boolean;
  trialDays: number;
  status: PlanStatus;
  features: PlanFeatures;
  featuresCount: number;
  subscribersCount: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Pricing Tier ──────────────────────────────────────────
export interface PricingTier {
  id: string;
  planId: string;
  cycle: BillingCycle;
  originalPrice: number;
  discount: number;          // percentage
  gst: number;               // percentage
  finalPrice: number;
  offerBadge?: string;
  autoRenewal: boolean;
}

// ─── Trial ─────────────────────────────────────────────────
export interface TrialUser {
  id: string;
  instituteName: string;
  email: string;
  phone: string;
  planId: string;
  planName: string;
  status: TrialStatus;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  convertedToSubscription?: boolean;
}

export interface TrialSettings {
  duration: number;           // days
  allowedFeatures: string[];
  oneTrialPerEmail: boolean;
  requireCard: boolean;
  autoExpire: boolean;
  reminderDays: number[];
}

// ─── Customer Subscription ─────────────────────────────────
export interface CustomerSubscription {
  id: string;
  instituteName: string;
  ownerName: string;
  email: string;
  currentPlan: string;
  planId: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  renewalDate: string;
  storageUsed: number;      // GB
  storageLimit: number;     // GB
  studentsUsed: number;
  studentsLimit: number;
  branchesUsed: number;
  branchesLimit: number;
  paymentStatus: PaymentStatus;
  monthlyRevenue: number;
  city: string;
  country: string;
}

// ─── Invoice ───────────────────────────────────────────────
export interface Invoice {
  id: string;
  invoiceNumber: string;
  instituteName: string;
  planName: string;
  amount: number;
  gst: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: InvoiceStatus;
  invoiceDate: string;
  dueDate: string;
  email: string;
}

// ─── Payment ───────────────────────────────────────────────
export interface Payment {
  id: string;
  transactionId: string;
  instituteName: string;
  gateway: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  invoiceId: string;
  invoiceNumber: string;
  paymentDate: string;
  failureReason?: string;
  refundDate?: string;
  refundAmount?: number;
}

// ─── Coupon ────────────────────────────────────────────────
export interface Coupon {
  id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  maxDiscount?: number;
  applicablePlans: string[];   // plan IDs
  minimumPurchase: number;
  maximumUsage: number;
  usageCount: number;
  oneTimeUse: boolean;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  revenueGenerated: number;
}

// ─── Renewal ───────────────────────────────────────────────
export interface Renewal {
  id: string;
  instituteName: string;
  planName: string;
  amount: number;
  renewalDate: string;
  status: 'upcoming' | 'expired' | 'cancelled' | 'successful';
  autoRenewal: boolean;
  daysUntilRenewal: number;
  reminderSent: boolean;
}

// ─── Audit Log ─────────────────────────────────────────────
export interface AuditLog {
  id: string;
  user: string;
  userRole: string;
  action: string;
  entity: string;
  oldValue: string;
  newValue: string;
  ipAddress: string;
  date: string;
  time: string;
}

// ─── Analytics ─────────────────────────────────────────────
export interface RevenueDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  newSubscriptions: number;
  churned: number;
}

export interface SubscriptionStats {
  totalActive: number;
  trialUsers: number;
  expired: number;
  monthlyRevenue: number;
  todayRevenue: number;
  pendingRenewals: number;
  failedPayments: number;
  activeCoupons: number;
  mrr: number;
  arr: number;
  trialConversionRate: number;
  renewalRate: number;
  churnRate: number;
  cancelledPlans: number;
  avgRevenuePerTenant: number;
  lifetimeValue: number;
  renewalSuccessRate: number;
}

// ─── Tenant Health ─────────────────────────────────────────
export interface TenantHealth {
  id: string;
  instituteName: string;
  healthScore: number;
  activeUsers: number;
  storageUsage: number; // percentage
  apiUsage: number; // percentage
  loginFrequency: 'High' | 'Medium' | 'Low';
  subscriptionStatus: string;
  riskLevel: 'High' | 'Medium' | 'Low';
}

// ─── Gateway Metrics ───────────────────────────────────────
export interface GatewayMetrics {
  id: string;
  gateway: string;
  successRate: number;
  revenue: number;
  failureRate: number;
  transactionCount: number;
}

// ─── AI Insight ────────────────────────────────────────────
export interface AIInsight {
  id: string;
  type: 'churn_risk' | 'upgrade_opportunity' | 'revenue_prediction' | 'health_score' | 'renewal_forecast' | 'payment_risk';
  instituteName: string;
  score: number;
  description: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  predictedValue?: number;
  confidence: number;
}

// ─── Recent Activity ───────────────────────────────────────
export interface RecentActivity {
  id: string;
  type: 'subscription_created' | 'subscription_renewed' | 'plan_changed' | 'invoice_generated' | 'coupon_applied' | 'payment_received' | 'refund_initiated' | 'trial_started';
  title: string;
  description: string;
  timeAgo: string;
  instituteName: string;
}
