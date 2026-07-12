'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { RolePermissionManager } from '@/features/iam/components/RolePermissionManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

import { MOCK_ROLES_ADVANCED } from '@/features/iam/data/mock-iam-data';

// Use a slice of the mock roles so it aligns with the backend data
const ROLES = MOCK_ROLES_ADVANCED.slice(0, 8);

export function RolePermissionsWrapper() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(ROLES[0].id);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <PageHeader
        title="Assign Permissions"
        description="Select a role to view and manage its granular module permissions."
        breadcrumbs={[{ label: 'Users' }, { label: 'Assign Permissions' }]}
      />
      
      <Card className="border-slate-200 shadow-sm mx-1">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-indigo-900">
            <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Select Role to Manage</h3>
              <p className="text-xs text-slate-500">Changes will apply to all users with this role.</p>
            </div>
          </div>
          
          <div className="w-full sm:w-72">
            <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 overflow-hidden min-h-[500px] border border-slate-200 rounded-xl bg-white shadow-sm mx-1">
        {/* We reuse the RolePermissionManager from IAM, hiding its internal header so it fits smoothly here */}
        <RolePermissionManager roleId={selectedRoleId} hideHeader={true} />
      </div>
    </div>
  );
}
