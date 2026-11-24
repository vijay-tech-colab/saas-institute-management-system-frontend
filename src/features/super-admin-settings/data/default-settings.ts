import {
  AdminPermissionKey,
  AdminRoleKey,
  AdminTeamSettings,
  EmailNotificationsSettings,
  GeneralBrandingSettings,
  IntegrationsApiKeysSettings,
  PaymentGatewaysSettings,
  SubscriptionPlansSettings,
  SystemSecuritySettings,
} from "../types";

export const DEFAULT_GENERAL_SETTINGS: GeneralBrandingSettings = {
  appName: "CampusOS",
  tagline: "Multi-tenant Institute Operating System",
  supportEmail: "support@campusos.io",
  supportUrl: "https://status.campusos.io",
  timezone: "Asia/Kolkata",
  currency: "INR",
  logoPreview: null,
  logoFileName: null,
  faviconPreview: null,
  faviconFileName: null,
};

export const DEFAULT_PLANS_SETTINGS: SubscriptionPlansSettings = {
  defaultTrialDays: 14,
  gracePeriodDays: 5,
  autoDowngradeOnExpiry: true,
  allowProration: true,
  tiers: [
    {
      id: "plan-starter",
      name: "Starter",
      code: "STARTER",
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      maxStudents: 500,
      maxBranches: 1,
      storageGB: 25,
      isActive: true,
      isPopular: false,
    },
    {
      id: "plan-growth",
      name: "Growth",
      code: "GROWTH",
      monthlyPrice: 5999,
      yearlyPrice: 59990,
      maxStudents: 2500,
      maxBranches: 5,
      storageGB: 100,
      isActive: true,
      isPopular: true,
    },
    {
      id: "plan-enterprise",
      name: "Enterprise",
      code: "ENTERPRISE",
      monthlyPrice: 14999,
      yearlyPrice: 149990,
      maxStudents: 25000,
      maxBranches: 50,
      storageGB: 500,
      isActive: true,
      isPopular: false,
    },
  ],
};

export const DEFAULT_PAYMENT_SETTINGS: PaymentGatewaysSettings = {
  razorpayEnabled: true,
  razorpayMode: "live",
  razorpayKeyId: "rzp_live_8Kp92LmQ41xYzT",
  razorpayKeySecret: "rzp_secret_9a8f7d6e5c4b3a2109876543",
  razorpayWebhookSecret: "whsec_rzp_48d9a2f109bc823a7e11",
  stripeEnabled: false,
  stripeMode: "test",
  stripePublishableKey: "pk_test_51N9xYzCampusOS98123",
  stripeSecretKey: "sk_test_51N9xYzSecretKey987654",
  stripeWebhookSecret: "whsec_stripe_1928374655abc",
  taxEnabled: true,
  taxMode: "exclusive",
  gstRatePercent: 18,
  legalBusinessName: "CampusOS Technologies Pvt. Ltd.",
  gstin: "27AABCU9603R1ZM",
  invoicePrefix: "COS-INV-",
};

export const ROLE_LABELS: Record<AdminRoleKey, string> = {
  PLATFORM_OWNER: "Platform Owner",
  BILLING_ADMIN: "Billing Admin",
  OPERATIONS_ADMIN: "Operations Admin",
  SECURITY_AUDITOR: "Security Auditor",
};

export const PERMISSION_DEFINITIONS: {
  key: AdminPermissionKey;
  label: string;
  description: string;
}[] = [
  {
    key: "manage_tenants",
    label: "Manage Tenants & Domains",
    description: "Create, suspend, restore, and configure institute tenants.",
  },
  {
    key: "manage_billing",
    label: "Billing, Invoices & Refunds",
    description: "Edit subscription plans, coupons, and process refunds.",
  },
  {
    key: "edit_platform_settings",
    label: "Edit Platform Settings",
    description: "Modify branding, SMTP, payment gateways, and API keys.",
  },
  {
    key: "manage_team",
    label: "Manage Admin Team",
    description: "Invite internal staff, change roles, or revoke access.",
  },
  {
    key: "view_audit_logs",
    label: "Inspect Audit & Security Logs",
    description: "Access login trails, API diagnostics, and security events.",
  },
  {
    key: "export_sensitive_data",
    label: "Export Financial & User Data",
    description: "Download CSV/PDF exports containing tenant billing data.",
  },
];

export const DEFAULT_TEAM_SETTINGS: AdminTeamSettings = {
  members: [
    {
      id: "adm-1",
      name: "Alex Rivera",
      email: "alex.rivera@campusos.io",
      role: "PLATFORM_OWNER",
      twoFactorEnabled: true,
      status: "active",
      lastActive: "Online now",
    },
    {
      id: "adm-2",
      name: "Priya Nair",
      email: "priya.nair@campusos.io",
      role: "BILLING_ADMIN",
      twoFactorEnabled: true,
      status: "active",
      lastActive: "14 mins ago",
    },
    {
      id: "adm-3",
      name: "Rohan Mehta",
      email: "rohan.mehta@campusos.io",
      role: "OPERATIONS_ADMIN",
      twoFactorEnabled: true,
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "adm-4",
      name: "Elena Rostova",
      email: "elena.r@campusos.io",
      role: "SECURITY_AUDITOR",
      twoFactorEnabled: false,
      status: "pending",
      lastActive: "Invited yesterday",
    },
  ],
  rolePermissions: {
    PLATFORM_OWNER: [
      "manage_tenants",
      "manage_billing",
      "edit_platform_settings",
      "manage_team",
      "view_audit_logs",
      "export_sensitive_data",
    ],
    BILLING_ADMIN: ["manage_billing", "view_audit_logs", "export_sensitive_data"],
    OPERATIONS_ADMIN: ["manage_tenants", "view_audit_logs"],
    SECURITY_AUDITOR: ["view_audit_logs", "export_sensitive_data"],
  },
};

export const DEFAULT_NOTIFICATION_SETTINGS: EmailNotificationsSettings = {
  smtpHost: "smtp.postmarkapp.com",
  smtpPort: 587,
  smtpEncryption: "tls",
  smtpUsername: "pm_smtp_campusos_prod",
  smtpPassword: "pm-live-smtp-token-9482716",
  fromName: "CampusOS Platform",
  fromEmail: "no-reply@campusos.io",
  replyToEmail: "support@campusos.io",
  alerts: {
    newTenantOnboarded: true,
    paymentFailed: true,
    subscriptionExpiring: true,
    securityAnomaly: true,
    dailyDigest: false,
  },
};

export const DEFAULT_INTEGRATIONS_SETTINGS: IntegrationsApiKeysSettings = {
  platformPublicKey: "cos_pk_live_01J9X7K2M4P8Q3R6T1W5",
  platformSecretKey: "cos_sk_live_849201a7f3e5c910b2d4491a77e1",
  firebaseEnabled: true,
  firebaseProjectId: "campusos-prod-fcm",
  firebaseServerKey: "AIzaSyD9x_CampusOS_Firebase_ProdKey_8821",
  admobEnabled: false,
  admobAppId: "ca-app-pub-3940256099942544~3347511713",
  admobBannerId: "ca-app-pub-3940256099942544/6300978111",
  admobInterstitialId: "ca-app-pub-3940256099942544/1033173712",
  analyticsEnabled: true,
  gaMeasurementId: "G-CAMPUSOS94",
  posthogApiKey: "phc_CampusOSProdAnalyticsKey918273",
  webhooksEnabled: true,
  webhookEndpointUrl: "https://hooks.campusos.io/v1/platform-events",
  webhookSigningSecret: "whsec_cos_77d21f8a90c3e4512b",
};

export const DEFAULT_SECURITY_SETTINGS: SystemSecuritySettings = {
  maintenanceMode: false,
  maintenanceMessage:
    "Scheduled database maintenance is underway. All tenant portals will resume within 15 minutes.",
  enforceTwoFactor: true,
  sessionTimeoutMinutes: "60",
  maxLoginAttempts: "5",
  ipAllowlist: "103.21.244.0/22\n49.36.128.14/32",
  auditRetentionDays: "365",
  autoArchiveColdStorage: true,
  redactPiiInLogs: true,
};
