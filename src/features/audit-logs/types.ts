export type LogStatus = 'success' | 'failed' | 'blocked' | 'expired' | 'warning' | 'critical' | 'info';

export interface BaseLog {
  id: string;
  timestamp: string;
  ipAddress: string;
}

export interface UserDetails {
  name: string;
  email: string;
  role: string;
  instituteId: string;
  instituteName: string;
}

export interface LoginLog extends BaseLog {
  user: UserDetails;
  status: 'success' | 'failed' | 'blocked' | 'expired';
  method: 'Email/Password' | 'SSO' | 'Magic Link' | 'MFA';
  device: string;
  browser: string;
  os: string;
  location: string;
  logoutTime?: string;
  sessionDuration?: number; // in seconds
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  mfaUsed: boolean;
  failedAttempts: number;
  userAgent: string;
}

export interface ApiLog extends BaseLog {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  requestType: string;
  moduleName: string;
  tenantName: string;
  requestedBy: string; // Email or API Key ID
  statusCode: number;
  responseTimeMs: number;
  requestSizeKb: number;
  responseSizeKb: number;
  apiVersion: string;
  environment: 'production' | 'staging' | 'sandbox';
  correlationId: string;
  memoryUsageMb?: number;
  serverInfo?: string;
  requestBodyPreview?: string;
  responseBodyPreview?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

export interface ActivityLog extends BaseLog {
  user: UserDetails;
  action: string;
  module: string;
  resource: string;
  resourceId: string;
  oldValue?: string;
  newValue?: string;
  severity: 'low' | 'medium' | 'high';
  reason?: string;
  approvalWorkflowId?: string;
  device?: string;
  browser?: string;
  location?: string;
}

export interface SecurityEvent extends BaseLog {
  eventType: 'Multiple Failed Logins' | 'Password Reset Attempts' | 'Blocked Accounts' | 'Suspicious Login' | 'Multiple Countries Login' | 'Permission Escalation' | 'Token Misuse' | 'API Abuse' | 'Brute Force' | 'High Risk Session';
  severity: 'high' | 'critical' | 'warning';
  description: string;
  affectedUser?: UserDetails;
  mitigationActionTaken: string;
  resolved: boolean;
}

export interface SystemLog extends BaseLog {
  source: 'Server' | 'Background Job' | 'Cron' | 'Email' | 'SMS' | 'WhatsApp' | 'Notification' | 'Backup' | 'Deployment' | 'Error';
  level: 'info' | 'warn' | 'error' | 'fatal' | 'debug';
  message: string;
  processId: string;
  executionTimeMs?: number;
  stackTrace?: string;
}

export interface ExportJob {
  id: string;
  createdAt: string;
  requestedBy: {
    name: string;
    email: string;
  };
  category: 'Login Logs' | 'API Logs' | 'Activity Logs' | 'Security Events' | 'System Logs' | 'All';
  dateRange: string;
  format: 'CSV' | 'JSON' | 'PDF' | 'Excel';
  status: 'Completed' | 'Processing' | 'Failed';
  fileSizeKb?: number;
  downloadUrl?: string;
}
