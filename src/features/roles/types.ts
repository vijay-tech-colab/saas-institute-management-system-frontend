export type RoleType = 'system' | 'custom';
export type ActionType = 'View' | 'Create' | 'Edit' | 'Delete' | 'Restore' | 'Export' | 'Import' | 'Approve' | 'Reject' | 'Assign' | 'Change Status' | 'Manage';

export interface Permission {
  module: string;
  actions: Record<ActionType, boolean | 'not-applicable'>;
}

export interface Role {
  id: string;
  name: string;
  purpose: string;
  type: RoleType;
  userCount: number;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export const STANDARD_ACTIONS: ActionType[] = [
  'View', 'Create', 'Edit', 'Delete', 'Restore', 
  'Export', 'Import', 'Approve', 'Reject', 'Assign', 
  'Change Status', 'Manage'
];
