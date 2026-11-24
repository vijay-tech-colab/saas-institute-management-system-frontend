export type SettingsSectionId =
  | "general"
  | "plans"
  | "payments"
  | "team"
  | "notifications"
  | "integrations"
  | "security";

export const VALID_SETTINGS_SECTIONS: SettingsSectionId[] = [
  "general",
  "plans",
  "payments",
  "team",
  "notifications",
  "integrations",
  "security",
];

export interface GeneralBrandingSettings {
  appName: string;
  tagline: string;
  supportEmail: string;
  supportUrl: string;
  timezone: string;
  currency: "INR" | "USD";
  logoPreview: string | null;
  logoFileName: string | null;
  faviconPreview: string | null;
  faviconFileName: string | null;
}

export interface SaasPlanTier {
  id: string;
  name: string;
  code: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxStudents: number;
  maxBranches: number;
  storageGB: number;
  isActive: boolean;
  isPopular: boolean;
}

export interface SubscriptionPlansSettings {
  defaultTrialDays: number;
  gracePeriodDays: number;
  autoDowngradeOnExpiry: boolean;
  allowProration: boolean;
  tiers: SaasPlanTier[];
}

export interface PaymentGatewaysSettings {
  razorpayEnabled: boolean;
  razorpayMode: "test" | "live";
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayWebhookSecret: string;
  stripeEnabled: boolean;
  stripeMode: "test" | "live";
  stripePublishableKey: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  taxEnabled: boolean;
  taxMode: "exclusive" | "inclusive";
  gstRatePercent: number;
  legalBusinessName: string;
  gstin: string;
  invoicePrefix: string;
}

export type AdminRoleKey =
  | "PLATFORM_OWNER"
  | "BILLING_ADMIN"
  | "OPERATIONS_ADMIN"
  | "SECURITY_AUDITOR";

export type AdminPermissionKey =
  | "manage_tenants"
  | "manage_billing"
  | "edit_platform_settings"
  | "manage_team"
  | "view_audit_logs"
  | "export_sensitive_data";

export interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  role: AdminRoleKey;
  twoFactorEnabled: boolean;
  status: "active" | "pending";
  lastActive: string;
}

export interface AdminTeamSettings {
  members: AdminTeamMember[];
  rolePermissions: Record<AdminRoleKey, AdminPermissionKey[]>;
}

export interface EmailNotificationsSettings {
  smtpHost: string;
  smtpPort: number;
  smtpEncryption: "tls" | "ssl" | "none";
  smtpUsername: string;
  smtpPassword: string;
  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  alerts: {
    newTenantOnboarded: boolean;
    paymentFailed: boolean;
    subscriptionExpiring: boolean;
    securityAnomaly: boolean;
    dailyDigest: boolean;
  };
}

export interface IntegrationsApiKeysSettings {
  platformPublicKey: string;
  platformSecretKey: string;
  firebaseEnabled: boolean;
  firebaseProjectId: string;
  firebaseServerKey: string;
  admobEnabled: boolean;
  admobAppId: string;
  admobBannerId: string;
  admobInterstitialId: string;
  analyticsEnabled: boolean;
  gaMeasurementId: string;
  posthogApiKey: string;
  webhooksEnabled: boolean;
  webhookEndpointUrl: string;
  webhookSigningSecret: string;
}

export interface SystemSecuritySettings {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  enforceTwoFactor: boolean;
  sessionTimeoutMinutes: string;
  maxLoginAttempts: string;
  ipAllowlist: string;
  auditRetentionDays: string;
  autoArchiveColdStorage: boolean;
  redactPiiInLogs: boolean;
}
