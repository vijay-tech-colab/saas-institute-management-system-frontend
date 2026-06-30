'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, ShieldCheck, FileText, Trash2, UserPlus, Eye, AlertTriangle } from 'lucide-react';
import { MOCK_ROLES_ADVANCED } from '../data/mock-iam-data';
import { RolePermissionManager } from './RolePermissionManager';
import { AssignUsersModal } from './AssignUsersModal';
import { motion, AnimatePresence } from 'framer-motion';

export function RoleDetailsHub({ roleId }: { roleId: string }) {
  const router = useRouter();
  const [role, setRole] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Assigned Users State
  const [assignedUsers, setAssignedUsers] = useState<any[]>([
    { id: 'usr_1', name: 'Alice Admin', email: 'alice@institute.com', assignedAt: '2026-06-28T10:00:00Z', avatar: 'AA' },
    { id: 'usr_2', name: 'Bob Manager', email: 'bob@institute.com', assignedAt: '2026-06-29T14:30:00Z', avatar: 'BM' },
  ]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    const foundRole = MOCK_ROLES_ADVANCED.find(r => r.id === roleId);
    if (foundRole) setRole(foundRole);
  }, [roleId]);

  if (!role) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0 bg-transparent">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const tabs = [
    { value: 'overview', label: 'Overview', icon: FileText },
    { value: 'permissions', label: 'Permissions Matrix', icon: ShieldCheck },
    { value: 'users', label: 'Assigned Users', icon: Users, count: assignedUsers.length },
  ];

  const handleAssignUsers = (userIds: string[]) => {
    // Mock assigning users
    const newUsers = userIds.map(id => ({
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name: `User ${id}`,
      email: `user${id}@institute.com`,
      assignedAt: new Date().toISOString(),
      avatar: 'U'
    }));
    setAssignedUsers(prev => [...newUsers, ...prev]);
  };

  const handleRemoveUser = (userId: string) => {
    setAssignedUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/70 p-4 sm:p-6 xl:p-8">
      <div className="mx-auto flex w-full flex-col gap-5 h-full">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 shrink-0">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl" />
          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-0.5 shrink-0 rounded-xl border-slate-200 shadow-sm hover:bg-slate-50"
                  onClick={() => router.push('/dashboard/iam/roles')}
                  aria-label="Back to roles"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 sm:flex">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {role.code}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${role.type === 'system' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                      {role.type} role
                    </span>
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {role.displayName}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span>{role.description || 'Manage configuration, assignments, and permissions for this role.'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                  <Eye className="mr-2 h-4 w-4" /> Preview Access
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col flex-1 min-h-0">
        {/* Custom Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 px-1 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all relative ${
                  isActive ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-auto bg-transparent relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Info Card */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500" /> Basic Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role Name</p>
                          <p className="text-sm font-semibold text-slate-900">{role.displayName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Internal Code</p>
                          <p className="text-sm font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded inline-block">{role.code}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Type</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${role.type === 'system' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                            {role.type}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{role.description || 'No description provided.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audit Logs Card */}
                  <div className="md:col-span-2">
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
                      <div className="px-6 py-4 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900">Recent Audit Logs</h3>
                      </div>
                      <div className="p-0 flex-1 overflow-auto">
                        <div className="divide-y divide-slate-50">
                          {[
                            { action: 'Role Created', time: '2 days ago', user: 'System', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { action: 'Permissions Updated', time: '1 day ago', user: 'Admin User', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
                            { action: 'User Assigned', time: '5 hours ago', user: 'Admin User', icon: UserPlus, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                          ].map((log, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.bg}`}>
                                <log.icon className={`w-4 h-4 ${log.color}`} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{log.action}</p>
                                <p className="text-xs text-slate-500 mt-0.5">By {log.user} • {log.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PERMISSIONS TAB */}
              {activeTab === 'permissions' && (
                <div className="h-full flex flex-col">
                  {/* We re-use RolePermissionManager but it must be refactored not to have a PageHeader of its own. */}
                  {/* For now, we mount it directly. We will update it to remove its own header. */}
                  <RolePermissionManager roleId={role.id} hideHeader={true} />
                </div>
              )}

              {/* USERS TAB */}
              {activeTab === 'users' && (
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Users with this Role</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage which users are assigned the {role.displayName} role.</p>
                    </div>
                    <button 
                      onClick={() => setIsAssignModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      <UserPlus className="w-4 h-4" /> Assign Users
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-auto">
                  {assignedUsers.length > 0 ? (
                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] z-10">
                          <tr>
                            <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">User</th>
                            <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Email</th>
                            <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Assigned At</th>
                            <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {assignedUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                              <td className="py-3 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                                    {user.avatar}
                                  </div>
                                  <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-sm text-slate-600">{user.email}</td>
                              <td className="py-3 px-6 text-sm text-slate-500">{new Date(user.assignedAt).toLocaleDateString()}</td>
                              <td className="py-3 px-6 text-right">
                                <button 
                                  onClick={() => handleRemoveUser(user.id)}
                                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
                                  title="Remove Assignment"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                        <Users className="w-8 h-8 text-slate-300" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">No users assigned</p>
                        <p className="text-xs mt-1">This role currently has no users. Click "Assign Users" to start.</p>
                      </div>
                      <button 
                        onClick={() => setIsAssignModalOpen(true)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Assign Users Now
                      </button>
                    </div>
                  )}
                </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
      <AssignUsersModal 
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        roleName={role.displayName}
        onAssign={handleAssignUsers}
        alreadyAssignedIds={assignedUsers.map(u => u.id)}
      />
    </div>
  );
}
