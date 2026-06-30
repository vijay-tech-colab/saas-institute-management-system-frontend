export const mockIAMStats = {
  totalRoles: 42,
  systemRoles: 15,
  customRoles: 27,
  totalPermissions: 1250,
  permissionGroups: 18,
  activeUsers: 843,
  usersWithCustomPermissions: 124,
  permissionRequestsPending: 5,
  policyViolations: 12,
  failedAuthAttempts: 34,
  activeSessions: 521,
  lockedAccounts: 3,
  apiKeys: 45,
  recentlyModifiedRoles: 8
};

export const mockRecentActivities = [
  { id: '1', user: 'Anjali Sharma', action: 'Created new role', target: 'Guest Auditor', time: '10 mins ago', type: 'create' },
  { id: '2', user: 'System', action: 'Locked account due to failed logins', target: 'john.doe@example.com', time: '1 hour ago', type: 'security' },
  { id: '3', user: 'Raj Patel', action: 'Modified permission group', target: 'Finance Reporting', time: '2 hours ago', type: 'update' },
  { id: '4', user: 'Anjali Sharma', action: 'Assigned template', target: 'Manager Template -> Marketing Dept', time: '3 hours ago', type: 'assign' },
  { id: '5', user: 'Rahul Desai', action: 'Deleted role', target: 'Temporary Intern', time: '5 hours ago', type: 'delete' },
];

export const mockSecurityAlerts = [
  { id: '1', severity: 'high', message: 'Multiple failed login attempts from IP 192.168.1.5', time: '1 hour ago' },
  { id: '2', severity: 'medium', message: 'User "Jane Smith" accessed system outside business hours', time: '3 hours ago' },
  { id: '3', severity: 'low', message: 'New API Key generated for Tenant "Delhi Institute"', time: '1 day ago' },
];

export const mockChartData = [
  { name: 'Mon', logins: 4000, failed: 240, policyViolations: 20 },
  { name: 'Tue', logins: 3000, failed: 139, policyViolations: 15 },
  { name: 'Wed', logins: 2000, failed: 980, policyViolations: 55 },
  { name: 'Thu', logins: 2780, failed: 390, policyViolations: 25 },
  { name: 'Fri', logins: 1890, failed: 480, policyViolations: 30 },
  { name: 'Sat', logins: 2390, failed: 380, policyViolations: 12 },
  { name: 'Sun', logins: 3490, failed: 430, policyViolations: 40 },
];

const baseRoles = [
  { name: 'Administrator', code: 'ADMIN', desc: 'Full access to system features.' },
  { name: 'Support Executive', code: 'SUP_EXEC', desc: 'Can view logs and handle support tickets.' },
  { name: 'Finance Manager', code: 'FIN_MGR', desc: 'Access to billing, invoices, and reports.' },
  { name: 'Sales Representative', code: 'SALES_REP', desc: 'Access to lead management and CRM.' },
  { name: 'Compliance Auditor', code: 'AUDITOR', desc: 'Read-only access to all audit logs.' },
  { name: 'Developer', code: 'DEV', desc: 'Access to API keys and developer settings.' },
  { name: 'Guest User', code: 'GUEST', desc: 'Restricted read-only access.' },
  { name: 'Marketing Manager', code: 'MKT_MGR', desc: 'Access to campaigns and analytics.' },
];

export const MOCK_ROLES_ADVANCED = Array.from({ length: 400 }).map((_, i) => {
  const base = baseRoles[i % baseRoles.length];
  const isSystem = i < 15;
  const id = `role_${i + 1}`;
  
  // Distribute dates over the last year
  const date = new Date();
  date.setDate(date.getDate() - (i * 2));
  
  return {
    id,
    name: `${base.name} ${i > 7 ? `(${Math.floor(i / 8) + 1})` : ''}`,
    displayName: `${base.name} ${i > 7 ? `V${Math.floor(i / 8) + 1}` : ''}`,
    code: `${base.code}_${i + 1}`,
    description: base.desc,
    type: isSystem ? 'system' : 'custom',
    priority: Math.max(10, 100 - (i % 90)),
    usersCount: Math.floor(Math.random() * 50),
    permissionsCount: Math.floor(Math.random() * 1200) + 10,
    status: i % 15 === 0 ? 'inactive' : 'active',
    updatedAt: date.toISOString(),
  };
});
