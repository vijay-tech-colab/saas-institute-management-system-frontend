'use client';

import React, { useState } from 'react';
import { PageHeader, FilterChips, SearchInput } from '@/features/subscriptions/components/shared/UIComponents';
import { ShieldAlert, Plus, Search, MoreVertical, Edit2, Trash2, Shield, Globe, Clock, Power, Download, Eye } from 'lucide-react';
import { ActionTooltip } from '@/components/ui/tooltip';
import { DataTablePagination } from "@/components/ui/pagination";
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { CreateEditPolicyModal } from './CreateEditPolicyModal';

const MOCK_POLICIES = Array.from({ length: 400 }, (_, i) => ({
  id: `pol_${i + 1}`,
  name: i % 4 === 0 ? 'Require MFA for Super Admins' : i % 4 === 1 ? 'Restrict IP to Office Network' : i % 4 === 2 ? 'Session Timeout (15 mins)' : 'Disable API Access',
  type: i % 4 === 0 ? 'Security' : i % 4 === 1 ? 'Network' : i % 4 === 2 ? 'Session' : 'Security',
  status: i % 3 === 0 ? 'Inactive' : 'Active',
  target: i % 4 === 0 ? 'Super Admin' : i % 4 === 1 ? 'Branch Admin' : 'All Roles',
  lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  icon: i % 4 === 0 ? ShieldAlert : i % 4 === 1 ? Globe : i % 4 === 2 ? Clock : Power,
  color: i % 4 === 0 ? 'text-rose-600' : i % 4 === 1 ? 'text-indigo-600' : i % 4 === 2 ? 'text-amber-600' : 'text-slate-600',
  bg: i % 4 === 0 ? 'bg-rose-100' : i % 4 === 1 ? 'bg-indigo-100' : i % 4 === 2 ? 'bg-amber-100' : 'bg-slate-100',
}));

export function AccessPolicies() {
  const [policiesData, setPoliciesData] = useState(MOCK_POLICIES);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedPolicies, setSelectedPolicies] = useState<Set<string>>(new Set());

  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);

  const filteredPolicies = policiesData.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(search.toLowerCase()) || 
                          policy.target.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || policy.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const paginatedPolicies = filteredPolicies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const filters = [
    { label: 'All Policies', value: 'all', count: policiesData.length },
    { label: 'Security', value: 'security', count: policiesData.filter(p => p.type === 'Security').length },
    { label: 'Network', value: 'network', count: policiesData.filter(p => p.type === 'Network').length },
    { label: 'Session', value: 'session', count: policiesData.filter(p => p.type === 'Session').length },
  ];

  const handleRowSelect = (id: string) => {
    const next = new Set(selectedPolicies);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedPolicies(next);
  };

  const handleSelectAll = () => {
    if (selectedPolicies.size === policiesData.length) {
      setSelectedPolicies(new Set());
    } else {
      setSelectedPolicies(new Set(policiesData.map(p => p.id)));
    }
  };

  const handleDeleteSelected = () => {
    setPoliciesData(prev => prev.filter(p => !selectedPolicies.has(p.id)));
    setSelectedPolicies(new Set());
  };

  const handleSavePolicy = (policyParams: any) => {
    if (editingPolicy) {
      setPoliciesData(prev => prev.map(p => p.id === editingPolicy.id ? { ...p, ...policyParams, lastUpdated: new Date().toISOString() } : p));
    } else {
      const newPolicy = {
        ...policyParams,
        id: `pol_${Date.now()}`,
        lastUpdated: new Date().toISOString(),
        icon: policyParams.type === 'Security' ? ShieldAlert : policyParams.type === 'Network' ? Globe : Clock,
        color: policyParams.type === 'Security' ? 'text-rose-600' : policyParams.type === 'Network' ? 'text-indigo-600' : 'text-amber-600',
        bg: policyParams.type === 'Security' ? 'bg-rose-100' : policyParams.type === 'Network' ? 'bg-indigo-100' : 'bg-amber-100',
      };
      setPoliciesData(prev => [newPolicy, ...prev]);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Access Policies"
        description="Enforce security rules, network restrictions, and session limits across user roles."
        breadcrumbs={[{ label: 'IAM', href: '/dashboard/iam' }, { label: 'Policies' }]}
      >
        <button 
          onClick={() => { setEditingPolicy(null); setIsEditModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Policy
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0 mb-6">
        {/* Toolbar aligned perfectly with RolesList */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="w-full sm:w-auto">
            <SearchInput value={search} onChange={setSearch} placeholder="Search policies..." className="w-full sm:w-64" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {selectedPolicies.size > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                  {selectedPolicies.size} selected
                </span>
                <button 
                  onClick={handleDeleteSelected}
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

        {/* Table aligned perfectly with RolesList */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] z-10">
              <tr>
                <th className="py-3 px-4 w-12 text-center border-b border-slate-100">
                  <div className="flex items-center justify-center">
                    <Checkbox 
                      checked={selectedPolicies.size > 0 && selectedPolicies.size === policiesData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Policy Name</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Target Role</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center border-b border-slate-100">Status</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center border-b border-slate-100">Type</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center border-b border-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPolicies.length > 0 ? (
                paginatedPolicies.map((policy) => {
                  const Icon = policy.icon;
                  const isSelected = selectedPolicies.has(policy.id);
                  return (
                    <motion.tr 
                      key={policy.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => handleRowSelect(policy.id)}
                      className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${isSelected ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                    >
                      <td className="py-3.5 px-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleRowSelect(policy.id)}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${policy.bg}`}>
                            <Icon className={`w-4 h-4 ${policy.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{policy.name}</p>
                            <p className="text-[10px] font-medium text-slate-500">Updated {new Date(policy.lastUpdated).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{policy.target}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${
                          policy.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${policy.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {policy.status}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{policy.type}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <ActionTooltip icon={Eye} tooltip="View Details" onClick={() => router.push(`/dashboard/iam/policies/${policy.id}`)} />
                          <ActionTooltip icon={Edit2} tooltip="Edit Policy" onClick={() => { setEditingPolicy(policy); setIsEditModalOpen(true); }} />
                          <ActionTooltip icon={Trash2} tooltip="Delete Policy" onClick={() => {
                            setPoliciesData(prev => prev.filter(p => p.id !== policy.id));
                          }} />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium text-sm">No access policies found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination perfectly matching RolesList */}
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={filteredPolicies.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <CreateEditPolicyModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        policy={editingPolicy}
        onSave={handleSavePolicy}
      />
    </div>
  );
}
