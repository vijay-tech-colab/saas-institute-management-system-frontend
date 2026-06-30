import { Role, ActionType, Permission, STANDARD_ACTIONS } from '../types';

const allModules = [
  'Dashboard', 'Institutes', 'Users', 'Roles', 'Subscription', 
  'Billing', 'Support', 'Reports', 'Settings', 'Audit Logs'
];

function generateDefaultPermissions(overrides: Record<string, Partial<Record<ActionType, boolean>>> = {}): Permission[] {
  return allModules.map(module => {
    const defaultActions = STANDARD_ACTIONS.reduce((acc, action) => {
      acc[action] = false;
      return acc;
    }, {} as Record<ActionType, boolean | 'not-applicable'>);

    if (overrides[module]) {
      Object.assign(defaultActions, overrides[module]);
    }

    return {
      module,
      actions: defaultActions
    };
  });
}

export const MOCK_ROLES: Role[] = [
  {
    id: 'role-1',
    name: 'Super Admin',
    purpose: 'Full system access',
    type: 'system',
    userCount: 2,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-06-15T10:30:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true, 'Export': true },
      'Institutes': { 'View': true, 'Create': true, 'Edit': true, 'Delete': true, 'Export': true, 'Manage': true },
      'Users': { 'View': true, 'Create': true, 'Edit': true, 'Delete': true, 'Export': true, 'Manage': true },
      'Roles': { 'View': true, 'Create': true, 'Edit': true, 'Delete': true, 'Manage': true },
      'Subscription': { 'View': true, 'Create': true, 'Edit': true, 'Delete': true, 'Export': true, 'Manage': true },
      'Billing': { 'View': true, 'Export': true, 'Manage': true },
      'Support': { 'View': true, 'Create': true, 'Edit': true, 'Delete': true, 'Export': true, 'Manage': true },
      'Reports': { 'View': true, 'Export': true },
      'Settings': { 'View': true, 'Edit': true, 'Manage': true },
      'Audit Logs': { 'View': true, 'Export': true }
    })
  },
  {
    id: 'role-2',
    name: 'Admin',
    purpose: 'Limited management',
    type: 'system',
    userCount: 5,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-06-10T14:20:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true, 'Export': true },
      'Institutes': { 'View': true, 'Create': true, 'Edit': true, 'Export': true },
      'Users': { 'View': true, 'Create': true, 'Edit': true, 'Export': true },
      'Support': { 'View': true, 'Create': true, 'Edit': true, 'Export': true },
      'Reports': { 'View': true, 'Export': true }
    })
  },
  {
    id: 'role-3',
    name: 'Support Executive',
    purpose: 'Support tickets handle karega',
    type: 'system',
    userCount: 12,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2023-06-25T09:15:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true },
      'Support': { 'View': true, 'Create': true, 'Edit': true, 'Assign': true, 'Change Status': true, 'Manage': true },
      'Institutes': { 'View': true },
      'Users': { 'View': true }
    })
  },
  {
    id: 'role-4',
    name: 'Finance Manager',
    purpose: 'Subscription aur payments',
    type: 'system',
    userCount: 3,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-06-28T11:45:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true, 'Export': true },
      'Subscription': { 'View': true, 'Create': true, 'Edit': true, 'Manage': true, 'Export': true },
      'Billing': { 'View': true, 'Export': true, 'Manage': true },
      'Reports': { 'View': true, 'Export': true }
    })
  },
  {
    id: 'role-5',
    name: 'Sales Executive',
    purpose: 'Demo aur leads',
    type: 'system',
    userCount: 8,
    createdAt: '2023-05-20T00:00:00Z',
    updatedAt: '2023-06-29T16:00:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true },
      'Institutes': { 'View': true, 'Create': true },
      'Reports': { 'View': true }
    })
  },
  {
    id: 'role-6',
    name: 'Compliance Manager',
    purpose: 'Audit & Logs',
    type: 'system',
    userCount: 2,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-30T08:30:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true },
      'Audit Logs': { 'View': true, 'Export': true },
      'Reports': { 'View': true, 'Export': true },
      'Settings': { 'View': true }
    })
  },
  {
    id: 'role-7',
    name: 'Developer',
    purpose: 'API, Logs, Debugging',
    type: 'system',
    userCount: 4,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-06-20T13:10:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true },
      'Audit Logs': { 'View': true, 'Export': true },
      'Settings': { 'View': true, 'Edit': true, 'Manage': true }
    })
  },
  {
    id: 'role-8',
    name: 'Read Only Admin',
    purpose: 'Sirf dekh sakta hai',
    type: 'system',
    userCount: 15,
    createdAt: '2023-02-28T00:00:00Z',
    updatedAt: '2023-06-22T09:40:00Z',
    permissions: generateDefaultPermissions({
      'Dashboard': { 'View': true },
      'Institutes': { 'View': true },
      'Users': { 'View': true },
      'Roles': { 'View': true },
      'Subscription': { 'View': true },
      'Billing': { 'View': true },
      'Support': { 'View': true },
      'Reports': { 'View': true },
      'Settings': { 'View': true },
      'Audit Logs': { 'View': true }
    })
  }
];
