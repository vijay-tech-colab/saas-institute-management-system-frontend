'use client';

import React, { useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockTenants } from '../../data/mock-data';
import { Ban, RotateCcw, Trash2, AlertTriangle, Clock, Filter } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ActionTooltip } from '@/components/ui/tooltip';
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';
const REASON_OPTIONS = [
  { label: 'All Reasons', value: 'all' },
  { label: 'Payment Overdue', value: 'payment' },
  { label: 'Policy Violation', value: 'policy' },
  { label: 'Manual Suspension', value: 'manual' },
];

export function SuspendedTenants() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTenants, setSelectedTenants] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = React.useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const reasons = ['payment', 'policy', 'manual'];

  const suspendedTenants = mockTenants.map((t, i) => ({
    ...t,
    status: 'suspended' as const,
    suspendedOn: subDays(new Date(), Math.floor(Math.random() * 30) + 1).toISOString(),
    reason: reasons[i % 3] as 'payment' | 'policy' | 'manual',
    daysSuspended: Math.floor(Math.random() * 30) + 1,
    owingAmount: t.plan === 'Enterprise' ? 49900 : t.plan === 'Pro' ? 19900 : 9900,
  }));

  const paymentCount = suspendedTenants.filter(t => t.reason === 'payment').length;
  const policyCount = suspendedTenants.filter(t => t.reason === 'policy').length;
  const manualCount = suspendedTenants.filter(t => t.reason === 'manual').length;

  const filtered = suspendedTenants.filter(t => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.reason === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedTenants.size === paginatedData.length) {
      setSelectedTenants(new Set());
    } else {
      setSelectedTenants(new Set(paginatedData.map(t => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedTenants);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedTenants(next);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Suspended Institutes"
        description="Review and manage suspended tenant accounts. Reinstate or permanently remove them."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Suspended' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
          <Filter className="w-4 h-4" /> Export Report
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Suspended" value={suspendedTenants.length} icon={<Ban size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
        <StatCard title="Payment Overdue" value={paymentCount} icon={<AlertTriangle size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Policy Violation" value={policyCount} icon={<AlertTriangle size={20} />} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <StatCard title="Manual" value={manualCount} icon={<Clock size={20} />} iconColor="text-slate-600" iconBg="bg-slate-100" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search suspended institutes..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <FilterChips
            options={[
              { label: 'All', value: 'all', count: suspendedTenants.length },
              { label: 'Payment Overdue', value: 'payment', count: paymentCount },
              { label: 'Policy Violation', value: 'policy', count: policyCount },
              { label: 'Manual', value: 'manual', count: manualCount },
            ]}
            selected={filter}
            onChange={setFilter}
          />
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedTenants.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Institute', 'Plan', 'Suspension Reason', 'Suspended On', 'Days Suspended', 'Owing (₹)', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={7} rows={pageSize} />
              ) : paginatedData.length > 0 ? (
                paginatedData.map((tenant, i) => (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-rose-50/10 transition-colors group cursor-pointer ${selectedTenants.has(tenant.id) ? 'bg-rose-50/50 border-rose-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(tenant.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedTenants.has(tenant.id)}
                          onCheckedChange={() => toggleSelect(tenant.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-rose-100">
                          {tenant.code}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{tenant.name}</p>
                          <p className="text-[11px] text-slate-400">{tenant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={tenant.plan.toLowerCase() as any} showDot={false} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={tenant.reason as any} />
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {format(new Date(tenant.suspendedOn), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        tenant.daysSuspended > 14 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {tenant.daysSuspended}d
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-rose-600">
                      {tenant.reason === 'payment' ? `₹${(tenant.owingAmount / 100).toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip icon={RotateCcw} tooltip="Reinstate Tenant" />
                        <ActionTooltip icon={Trash2} tooltip="Delete Permanently" variant="danger" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8">
                    <EmptyState 
                      icon={Ban}
                      title="No suspended institutes found"
                      description="There are currently no suspended institutes matching your criteria."
                      actionLabel="Reset Filters"
                      onAction={() => { setSearch(''); setFilter('all'); }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalRows={filtered.length}
          />
        </div>
      </div>
    </div>
  );
}
