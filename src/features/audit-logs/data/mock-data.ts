import { LoginLog, ApiLog, ActivityLog, SecurityEvent, SystemLog } from '../types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const generateTimestamp = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(randomInt(0, 23), randomInt(0, 59), randomInt(0, 59));
  return date.toISOString();
};

const userNames = ['Rahul Sharma', 'Priya Patel', 'Amit Singh', 'Neha Gupta', 'Vikram Joshi'];
const institutes = ['Excel Institute', 'Global Academy', 'Future Tech', 'Creative Arts', 'Pioneer College'];
const ips = ['192.168.1.10', '10.0.0.54', '45.112.33.1', '103.44.2.11', '8.8.8.8'];
const locations = ['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'London, UK', 'New York, USA'];
const browsers = ['Chrome 114', 'Firefox 115', 'Safari 16', 'Edge 113'];
const osList = ['Windows 11', 'macOS 13', 'Ubuntu 22.04', 'iOS 16', 'Android 13'];
const devices = ['Desktop', 'Mobile', 'Tablet'];

export const generateLoginLogs = (count: number): LoginLog[] => {
  return Array.from({ length: count }, (_, i) => {
    const isSuccess = Math.random() > 0.2;
    return {
      id: `login-${1000 + i}`,
      timestamp: generateTimestamp(randomInt(0, 30)),
      ipAddress: pick(ips),
      user: {
        name: pick(userNames),
        email: `user${i}@example.com`,
        role: pick(['Institute Owner', 'Admin', 'Teacher']),
        instituteId: `INST-${randomInt(1, 10)}`,
        instituteName: pick(institutes),
      },
      status: isSuccess ? 'success' : pick(['failed', 'blocked', 'expired']),
      method: pick(['Email/Password', 'SSO', 'Magic Link', 'MFA']),
      device: pick(devices),
      browser: pick(browsers),
      os: pick(osList),
      location: pick(locations),
      sessionDuration: isSuccess ? randomInt(60, 14400) : undefined,
      riskLevel: pick(['Low', 'Medium', 'High', 'Critical']),
      mfaUsed: Math.random() > 0.5,
      failedAttempts: isSuccess ? 0 : randomInt(1, 5),
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    } as LoginLog;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const endpoints = ['/api/v1/users', '/api/v1/auth/login', '/api/v1/payments', '/api/v1/reports', '/api/v1/subscriptions'];
const modules = ['User Management', 'Authentication', 'Billing', 'Analytics', 'Subscriptions'];

export const generateApiLogs = (count: number): ApiLog[] => {
  return Array.from({ length: count }, (_, i) => {
    const isError = Math.random() > 0.85;
    return {
      id: `api-${5000 + i}`,
      timestamp: generateTimestamp(randomInt(0, 7)),
      ipAddress: pick(ips),
      endpoint: pick(endpoints),
      method: pick(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      requestType: 'REST',
      moduleName: pick(modules),
      tenantName: pick(institutes),
      requestedBy: `API_KEY_${randomInt(100, 999)}`,
      statusCode: isError ? pick([400, 401, 403, 429, 500, 502]) : pick([200, 201, 204]),
      responseTimeMs: isError ? randomInt(500, 5000) : randomInt(20, 300),
      requestSizeKb: randomInt(1, 50),
      responseSizeKb: randomInt(1, 1500),
      apiVersion: 'v1.2.0',
      environment: pick(['production', 'production', 'staging']),
      correlationId: `req_${Math.random().toString(36).substring(7)}`,
      memoryUsageMb: randomInt(40, 150),
    } as ApiLog;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const actions = ['User Created', 'Subscription Updated', 'Role Changed', 'Data Exported', 'Settings Modified'];
export const generateActivityLogs = (count: number): ActivityLog[] => {
  return Array.from({ length: count }, (_, i) => {
    const action = pick(actions);
    return {
      id: `act-${2000 + i}`,
      timestamp: generateTimestamp(randomInt(0, 14)),
      ipAddress: pick(ips),
      user: {
        name: pick(userNames),
        email: `admin${i}@example.com`,
        role: 'Super Admin',
        instituteId: 'SUPER',
        instituteName: 'System',
      },
      action,
      module: pick(modules),
      resource: 'User Profile',
      resourceId: `USR_${randomInt(1000, 9999)}`,
      oldValue: action.includes('Updated') ? '{"plan": "Basic"}' : undefined,
      newValue: action.includes('Updated') ? '{"plan": "Pro"}' : undefined,
      severity: pick(['low', 'medium', 'high']),
      device: pick(devices),
      browser: pick(browsers),
      location: pick(locations),
    } as ActivityLog;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateSecurityEvents = (count: number): SecurityEvent[] => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: `sec-${8000 + i}`,
      timestamp: generateTimestamp(randomInt(0, 30)),
      ipAddress: pick(ips),
      eventType: pick(['Multiple Failed Logins', 'Suspicious Login', 'API Abuse', 'Brute Force']),
      severity: pick(['warning', 'high', 'critical']),
      description: 'System detected anomalous behavior originating from this IP address.',
      mitigationActionTaken: pick(['IP Blocked', 'Account Locked', 'MFA Enforced', 'None']),
      resolved: Math.random() > 0.5,
    } as SecurityEvent;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateSystemLogs = (count: number): SystemLog[] => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: `sys-${9000 + i}`,
      timestamp: generateTimestamp(randomInt(0, 7)),
      ipAddress: '127.0.0.1',
      source: pick(['Server', 'Cron', 'Email', 'Backup']),
      level: pick(['info', 'warn', 'error', 'debug']),
      message: 'Worker process completed successfully.',
      processId: `PID-${randomInt(1000, 9999)}`,
      executionTimeMs: randomInt(10, 5000),
    } as SystemLog;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockLoginLogs = generateLoginLogs(500);
export const mockApiLogs = generateApiLogs(1000);
export const mockActivityLogs = generateActivityLogs(300);
export const mockSecurityEvents = generateSecurityEvents(100);
export const mockSystemLogs = generateSystemLogs(400);

export const generateExportJobs = (count: number): import('../types').ExportJob[] => {
  return Array.from({ length: count }, (_, i) => {
    const status = pick(['Completed', 'Processing', 'Failed']) as 'Completed' | 'Processing' | 'Failed';
    return {
      id: `EXP-${9000 + i}`,
      createdAt: generateTimestamp(randomInt(0, 30)),
      requestedBy: {
        name: pick(userNames),
        email: `user${randomInt(1, 100)}@example.com`,
      },
      category: pick(['Login Logs', 'Security Events', 'API Logs', 'Activity Logs', 'All']),
      dateRange: pick(['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Custom Range']),
      format: pick(['CSV', 'PDF', 'JSON', 'Excel']),
      status: status,
      fileSizeKb: status === 'Completed' ? randomInt(100, 10000) : undefined,
      downloadUrl: status === 'Completed' ? '#' : undefined,
    } as import('../types').ExportJob;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const mockExportJobs = generateExportJobs(500);

