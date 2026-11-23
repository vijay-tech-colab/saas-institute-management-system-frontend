'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_ROLES_ADVANCED } from '../data/mock-iam-data';
import { ArrowLeft, Save, Loader2, ShieldCheck, Search, SlidersHorizontal } from 'lucide-react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { Checkbox } from '@/components/ui/checkbox';

const MODULES = [
  {
    id: 'dashboard',
    name: 'Dashboard & Analytics',
    permissions: {
      view: 'view_dashboard', create: null, edit: null, delete: null,
      special: [
        { id: 'view_analytics', label: 'View Analytics' },
        { id: 'export_reports', label: 'Export Reports' },
        { id: 'download_reports', label: 'Download Reports' },
        { id: 'schedule_reports', label: 'Schedule Reports' },
        { id: 'manage_widgets', label: 'Manage Widgets' }
      ]
    }
  },
  {
    id: 'tenants',
    name: 'Tenant Management',
    permissions: {
      view: 'view_institutes', create: 'create_institute', edit: 'edit_institute', delete: 'delete_institute',
      special: [
        { id: 'suspend_institute', label: 'Suspend Institute' },
        { id: 'login_as', label: 'Login As Tenant' },
        { id: 'import_tenants', label: 'Import Tenants (CSV)' },
        { id: 'export_tenants', label: 'Export Tenants' },
        { id: 'manage_domains', label: 'Manage Domains' },
        { id: 'approve_registrations', label: 'Approve Registrations' }
      ]
    }
  },
  {
    id: 'users',
    name: 'User Management',
    permissions: {
      view: 'view_users', create: 'create_user', edit: 'edit_user', delete: 'delete_user',
      special: [
        { id: 'reset_password', label: 'Reset Password' },
        { id: 'block_user', label: 'Block User' },
        { id: 'import_users', label: 'Import Users' },
        { id: 'export_users', label: 'Export Users' },
        { id: 'force_logout', label: 'Force Logout' },
        { id: 'manage_2fa', label: 'Manage 2FA' }
      ]
    }
  },
  {
    id: 'iam',
    name: 'Identity & Access (IAM)',
    permissions: {
      view: 'view_roles', create: 'create_role', edit: 'edit_role', delete: 'delete_role',
      special: [
        { id: 'view_logs', label: 'View Audit Logs' },
        { id: 'assign_permissions', label: 'Assign Permissions' },
        { id: 'export_policies', label: 'Export Access Policies' },
        { id: 'manage_hierarchy', label: 'Manage Hierarchy' },
        { id: 'clone_roles', label: 'Clone Roles' }
      ]
    }
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions & Billing',
    permissions: {
      view: 'view_billing', create: 'create_plan', edit: 'edit_plan', delete: 'delete_plan',
      special: [
        { id: 'process_refunds', label: 'Process Refunds' },
        { id: 'apply_coupons', label: 'Apply Coupons' },
        { id: 'download_invoices', label: 'Download Invoices' },
        { id: 'export_revenue', label: 'Export Revenue Data' }
      ]
    }
  },
  {
    id: 'security',
    name: 'Platform Security & Incidents',
    permissions: {
      view: 'view_security', create: 'create_security_policy', edit: 'edit_security_policy', delete: 'delete_security_policy',
      special: [
        { id: 'quarantine_ips', label: 'Quarantine IPs' },
        { id: 'enforce_mfa', label: 'Enforce Global MFA' },
        { id: 'revoke_api_keys', label: 'Revoke API Keys' },
        { id: 'trigger_security_audit', label: 'Trigger Security Audit' },
        { id: 'export_security_logs', label: 'Export Security Logs' }
      ]
    }
  },
  {
    id: 'infrastructure',
    name: 'Cloud & Infrastructure',
    permissions: {
      view: 'view_infrastructure', create: 'provision_resource', edit: 'scale_cluster', delete: 'deprovision_resource',
      special: [
        { id: 'manage_backups', label: 'Trigger Database Backups' },
        { id: 'purge_cache', label: 'Purge CDN Cache' },
        { id: 'rotate_secrets', label: 'Rotate Cloud Secrets' },
        { id: 'download_telemetry', label: 'Download Telemetry' }
      ]
    }
  },
  {
    id: 'tenants_governance',
    name: 'Tenant Domain & Quota Governance',
    permissions: {
      view: 'view_tenants', create: 'create_tenant', edit: 'edit_tenant', delete: 'delete_tenant',
      special: [
        { id: 'verify_domains', label: 'Verify Custom Domains' },
        { id: 'issue_ssl', label: 'Issue SSL Certificates' },
        { id: 'suspend_tenants', label: 'Suspend Delinquent Tenants' },
        { id: 'override_quotas', label: 'Override Resource Quotas' }
      ]
    }
  },
  {
    id: 'compliance',
    name: 'Compliance & Audit Logs',
    permissions: {
      view: 'view_audit', create: 'generate_audit_report', edit: 'configure_retention', delete: 'purge_logs',
      special: [
        { id: 'export_soc2_logs', label: 'Export SOC2 Compliance Data' },
        { id: 'view_pii_access_logs', label: 'View PII Access Logs' },
        { id: 'manage_retention_rules', label: 'Manage Data Retention Rules' },
        { id: 'audit_super_admin_actions', label: 'Audit Super Admin Actions' }
      ]
    }
  }
];

export function RolePermissionManager({ roleId, hideHeader = false }: { roleId: string; hideHeader?: boolean }) {
  const router = useRouter();
  const [role, setRole] = useState<any>(null);
  const [selectedPerms, setSelectedPerms] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = [
    { label: 'All Modules', value: 'All' },
    { label: 'Granted', value: 'Granted' },
    { label: 'Not Granted', value: 'Not Granted' }
  ];

  useEffect(() => {
    const foundRole = MOCK_ROLES_ADVANCED.find(r => r.id === roleId);
    if (foundRole) {
      setRole(foundRole);
      const initial = new Set<string>();
      if (foundRole.type === 'system') {
        MODULES.forEach(m => {
          if (m.permissions.view) initial.add(`${m.id}.${m.permissions.view}`);
          if (m.permissions.create) initial.add(`${m.id}.${m.permissions.create}`);
          if (m.permissions.edit) initial.add(`${m.id}.${m.permissions.edit}`);
          if (m.permissions.delete) initial.add(`${m.id}.${m.permissions.delete}`);
          m.permissions.special.forEach(s => initial.add(`${m.id}.${s.id}`));
        });
      }
      setSelectedPerms(initial);
    }
  }, [roleId]);

  const handleTogglePerm = (permId: string) => {
    const next = new Set(selectedPerms);
    if (next.has(permId)) {
      next.delete(permId);
    } else {
      next.add(permId);
    }
    setSelectedPerms(next);
  };

  const handleToggleModule = (moduleId: string, isAllGranted: boolean) => {
    const next = new Set(selectedPerms);
    const m = MODULES.find(mod => mod.id === moduleId);
    if (!m) return;

    const allPerms = [
      m.permissions.view,
      m.permissions.create,
      m.permissions.edit,
      m.permissions.delete,
      ...m.permissions.special.map(s => s.id)
    ].filter(Boolean) as string[];

    allPerms.forEach(p => {
      const id = `${moduleId}.${p}`;
      if (isAllGranted) {
        next.delete(id);
      } else {
        next.add(id);
      }
    });

    setSelectedPerms(next);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push('/dashboard/iam/roles');
    }, 1000);
  };

  if (!role) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0 bg-transparent">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const filteredModules = MODULES.filter(module => {
    // Search match
    if (search && !module.name.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Filter match
    if (filter !== 'All') {
      const p = module.permissions;
      const allModulePermIds = [
        p.view, p.create, p.edit, p.delete, ...p.special.map(s => s.id)
      ].filter(Boolean).map(id => `${module.id}.${id}`);
      
      const hasAnyGranted = allModulePermIds.some(id => selectedPerms.has(id));
      
      if (filter === 'Granted' && !hasAnyGranted) return false;
      if (filter === 'Not Granted' && hasAnyGranted) return false;
    }
    
    return true;
  });

  return (
    <div className={`flex-1 w-full flex flex-col min-h-0 ${!hideHeader ? 'p-4 md:p-6 lg:p-8' : ''}`}>
      {!hideHeader && (
        <PageHeader
          title={`${role.displayName} Permissions`}
          description={`Manage access policies and modules for the ${role.type} role.`}
          breadcrumbs={[{ label: 'IAM', href: '/dashboard/iam' }, { label: 'Roles', href: '/dashboard/iam/roles' }, { label: role.displayName }]}
        >
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </PageHeader>
      )}

      {hideHeader && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-1.5 text-sm bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      )}

      <div className={`bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0 ${!hideHeader ? 'mb-6' : ''}`}>
        {/* Toolbar aligned with Access Policies / Roles List */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="w-full sm:w-auto">
            <SearchInput value={search} onChange={setSearch} placeholder="Search modules..." className="w-full sm:w-64" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <FilterChips options={filters} selected={filter} onChange={setFilter} />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] z-10">
              <tr>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 w-1/4">Module Name</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">View</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Create</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Edit</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Delete</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 border-l">Special Actions</th>
                <th className="py-3 px-6 text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50/50 border-b border-slate-100 border-l text-center w-32">Grant All</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredModules.length > 0 ? filteredModules.map(module => {
                const p = module.permissions;
                const allModulePermIds = [
                  p.view, p.create, p.edit, p.delete, ...p.special.map(s => s.id)
                ].filter(Boolean).map(id => `${module.id}.${id}`);
                
                const isAllGranted = allModulePermIds.every(id => selectedPerms.has(id));

                return (
                  <tr key={module.id} className="hover:bg-slate-50/30 transition-colors border-b border-slate-50">
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-slate-900">{module.name}</span>
                    </td>
                    
                    {/* Standard CRUD Columns */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex justify-center">
                        {p.view ? (
                          <Checkbox 
                            checked={selectedPerms.has(`${module.id}.${p.view}`)}
                            onCheckedChange={() => handleTogglePerm(`${module.id}.${p.view}`)}
                          />
                        ) : <span className="text-slate-300">-</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle">
                      <div className="flex justify-center">
                        {p.create ? (
                          <Checkbox 
                            checked={selectedPerms.has(`${module.id}.${p.create}`)}
                            onCheckedChange={() => handleTogglePerm(`${module.id}.${p.create}`)}
                          />
                        ) : <span className="text-slate-300">-</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle">
                      <div className="flex justify-center">
                        {p.edit ? (
                          <Checkbox 
                            checked={selectedPerms.has(`${module.id}.${p.edit}`)}
                            onCheckedChange={() => handleTogglePerm(`${module.id}.${p.edit}`)}
                          />
                        ) : <span className="text-slate-300">-</span>}
                      </div>
                    </td>
                    <td className="py-5 px-4 align-middle">
                      <div className="flex justify-center">
                        {p.delete ? (
                          <Checkbox 
                            checked={selectedPerms.has(`${module.id}.${p.delete}`)}
                            onCheckedChange={() => handleTogglePerm(`${module.id}.${p.delete}`)}
                          />
                        ) : <span className="text-slate-300">-</span>}
                      </div>
                    </td>

                    {/* Special Actions Column */}
                    <td className="py-4 px-6 border-l border-slate-50 align-middle">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-3">
                        {p.special.length > 0 ? (
                          p.special.map(spec => (
                            <label key={spec.id} className="flex items-center gap-2 cursor-pointer group">
                              <Checkbox 
                                checked={selectedPerms.has(`${module.id}.${spec.id}`)}
                                onCheckedChange={() => handleTogglePerm(`${module.id}.${spec.id}`)}
                              />
                              <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                {spec.label}
                              </span>
                            </label>
                          ))
                        ) : <span className="text-xs text-slate-400">None</span>}
                      </div>
                    </td>

                    {/* Grant All Column */}
                    <td className="py-4 px-6 border-l border-slate-50 bg-indigo-50/30 align-middle">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleToggleModule(module.id, isAllGranted)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAllGranted ? 'bg-indigo-600' : 'bg-slate-300'}`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAllGranted ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">No modules found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

