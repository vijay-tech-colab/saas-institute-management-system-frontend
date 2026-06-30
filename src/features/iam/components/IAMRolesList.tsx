'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, SlidersHorizontal, Download, 
  Trash2, Copy, ShieldCheck, MoreVertical, Eye, Edit2
} from 'lucide-react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { DataTablePagination } from "@/components/ui/pagination";
import { ActionTooltip } from "@/components/ui/tooltip";
import { MOCK_ROLES_ADVANCED } from '../data/mock-iam-data';
import { CreateEditRoleModal } from './CreateEditRoleModal';
import { DeleteRoleModal } from './DeleteRoleModal';
import { useRouter } from 'next/navigation';

import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export function IAMRolesList() {
  const [rolesData, setRolesData] = useState(MOCK_ROLES_ADVANCED);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  
  const router = useRouter();

  // CRUD State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rolesToDelete, setRolesToDelete] = useState<string[]>([]);

  const filteredRoles = rolesData.filter(role => {
    const matchesSearch = role.displayName.toLowerCase().includes(search.toLowerCase()) || 
                          role.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || role.type === filter;
    return matchesSearch && matchesFilter;
  });

  const paginatedRoles = filteredRoles.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const filters = [
    { label: 'All Roles', value: 'all', count: rolesData.length },
    { label: 'System', value: 'system', count: rolesData.filter(r => r.type === 'system').length },
    { label: 'Custom', value: 'custom', count: rolesData.filter(r => r.type === 'custom').length },
  ];

  const handleRowSelect = (id: string) => {
    const next = new Set(selectedRoles);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedRoles(next);
  };

  const handleSelectAll = () => {
    if (selectedRoles.size === rolesData.length) {
      setSelectedRoles(new Set());
    } else {
      setSelectedRoles(new Set(rolesData.map(r => r.id)));
    }
  };

  const navigateToDetails = (roleId: string) => {
    router.push(`/dashboard/iam/roles/${roleId}`);
  };

  const handleSaveRole = (roleParams: any) => {
    if (editingRole) {
      setRolesData(prev => prev.map(r => r.id === editingRole.id ? { ...r, ...roleParams, updatedAt: new Date().toISOString() } : r));
    } else {
      const newRole = {
        ...roleParams,
        id: `role_${Date.now()}`,
        usersCount: 0,
        permissionsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRolesData(prev => [newRole, ...prev]);
    }
  };

  const handleDeleteConfirm = () => {
    setRolesData(prev => prev.filter(r => !rolesToDelete.includes(r.id)));
    setSelectedRoles(prev => {
      const next = new Set(prev);
      rolesToDelete.forEach(id => next.delete(id));
      return next;
    });
  };

  const openDeleteModal = (ids: string[]) => {
    setRolesToDelete(ids);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Roles & Permissions"
        description="Manage system and custom roles across your tenant ecosystem."
      >
        <button 
          onClick={() => { setEditingRole(null); setIsEditModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0 mb-6">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="w-full sm:w-auto">
            <SearchInput value={search} onChange={setSearch} placeholder="Search roles..." className="w-full sm:w-64" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {selectedRoles.size > 0 ? (
              <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                {selectedRoles.size} selected
              </span>
              <button 
                onClick={() => openDeleteModal(Array.from(selectedRoles))}
                className="p-1 hover:bg-indigo-100 rounded text-indigo-600" title="Delete Selected"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-indigo-100 rounded text-indigo-600" title="Export Selected">
                <Download className="w-4 h-4" />
              </button>
            </div>
            ) : null}
            
            <FilterChips options={filters} selected={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Table Data */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
              <tr>
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox 
                      checked={selectedRoles.size === MOCK_ROLES_ADVANCED.length && MOCK_ROLES_ADVANCED.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role Name</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Users</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Permissions</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoles.length > 0 ? (
                paginatedRoles.map((role) => (
                  <motion.tr 
                    key={role.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => navigateToDetails(role.id)}
                    className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedRoles.has(role.id) ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                  >
                    <td className="py-3.5 px-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <Checkbox 
                          checked={selectedRoles.has(role.id)}
                          onCheckedChange={() => handleRowSelect(role.id)}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">
                            {role.displayName}
                          </p>
                          <p className="text-[10px] font-medium text-slate-500">{role.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        role.type === 'system' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {role.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 min-w-[2rem]">
                        {role.usersCount}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 min-w-[2rem]">
                        {role.permissionsCount}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm text-slate-600">{new Date(role.updatedAt).toLocaleDateString()}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <ActionTooltip icon={Eye} tooltip="View Details" onClick={() => navigateToDetails(role.id)} />
                        <ActionTooltip icon={Edit2} tooltip="Edit Role" onClick={() => { setEditingRole(role); setIsEditModalOpen(true); }} />
                        <ActionTooltip icon={Trash2} tooltip="Delete Role" onClick={() => openDeleteModal([role.id])} />
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No roles found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={filteredRoles.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <CreateEditRoleModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        role={editingRole}
        onSave={handleSaveRole}
      />

      <DeleteRoleModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        count={rolesToDelete.length}
      />
    </div>
  );
}
