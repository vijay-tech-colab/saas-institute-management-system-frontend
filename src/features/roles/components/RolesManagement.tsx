'use client';

import React, { useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import { PageHeader, Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { RolesTable } from './RolesTable';
import { PermissionMatrix } from './PermissionMatrix';
import { RoleDetailsModal } from './RoleDetailsModal';

import { Role } from '../types';

export function RolesManagement() {
  const [activeTab, setActiveTab] = useState<'roles' | 'matrix'>('roles');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined);
  const [matrixRoleId, setMatrixRoleId] = useState<string | undefined>(undefined);

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreateModalOpen(true);
  };

  const handleViewDetails = (role: Role) => {
    setMatrixRoleId(role.id);
    setActiveTab('matrix');
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setTimeout(() => setEditingRole(undefined), 300); // Wait for modal exit animation
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Roles & Permissions"
        description="Manage system roles, create custom roles, and define permission matrices."
        breadcrumbs={[{ label: 'Administration' }, { label: 'Roles & Permissions' }]}
      >
        <button
          onClick={() => {
            setEditingRole(undefined);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-sm shadow-indigo-200"
        >
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0 mb-6">
        <div className="flex items-center border-b border-slate-100 bg-slate-50/50 px-4 pt-3">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'roles'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            System Roles
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'matrix'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
            }`}
          >
            Permission Matrix
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50/30">
          {activeTab === 'roles' ? (
            <RolesTable 
              onEditRole={handleEditRole} 
              onViewDetails={handleViewDetails} 
            />
          ) : (
            <PermissionMatrix defaultRoleId={matrixRoleId} />
          )}
        </div>
      </div>

      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={handleCloseModal} 
        title={editingRole ? "Edit Role" : "Create New Role"} 
        size="md"
      >
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">
            {editingRole 
              ? "Modify the existing role details." 
              : "Creating a new role allows you to define specific permissions for a group of users."}
          </p>
          <RoleDetailsModal onClose={handleCloseModal} role={editingRole} />
        </div>
      </Modal>
    </div>
  );
}
