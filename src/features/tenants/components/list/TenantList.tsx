'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { mockTenants, Tenant } from '../../data/mock-data';
import { format } from 'date-fns';
import {
  Filter, Download, Plus, ChevronDown, ChevronUp, Eye, Settings, Ban, Activity, Store, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ActionTooltip } from '@/components/ui/tooltip';
import { Checkbox } from "@/components/ui/checkbox";

export function TenantList() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Tenant>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTenants, setSelectedTenants] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.code.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'all' || tenant.status === filter;
    return matchesSearch && matchesStatus;
  });

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    if (sortField === 'usage') { aVal = a.usage.students; bVal = b.usage.students; }
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedTenants.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const handleSort = (field: keyof Tenant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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

  const SortIcon = ({ field }: { field: keyof Tenant }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 text-slate-300 ml-1" />;
    return sortDirection === 'asc'
      ? <ChevronUp className="w-3 h-3 text-blue-600 ml-1" />
      : <ChevronDown className="w-3 h-3 text-blue-600 ml-1" />;
  };

  const activeTenants = mockTenants.filter(t => t.status === 'active').length;
  const suspendedTenants = mockTenants.filter(t => t.status === 'suspended').length;
  const trialTenants = mockTenants.filter(t => t.status === 'trial').length;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Institutes List"
        description="Manage all your registered institutes, subscriptions, and settings."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'List' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
          <Download className="w-4 h-4" /> Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200">
          <Plus className="w-4 h-4" /> Add Institute
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Institutes" value={mockTenants.length} icon={<Store size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={15.2} trendLabel="vs last month" />
        <StatCard title="Active" value={activeTenants} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={10.5} trendLabel="vs last month" />
        <StatCard title="Suspended" value={suspendedTenants} icon={<Ban size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
        <StatCard title="In Trial" value={trialTenants} icon={<AlertCircle size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search institutes..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <FilterChips
            options={[
              { label: 'All', value: 'all', count: mockTenants.length },
              { label: 'Active', value: 'active', count: activeTenants },
              { label: 'Trial', value: 'trial', count: trialTenants },
              { label: 'Suspended', value: 'suspended', count: suspendedTenants },
            ]}
            selected={filter}
            onChange={setFilter}
          />
        </div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedTenants.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-sm font-semibold text-blue-900">{selectedTenants.size} institutes selected</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                  Send Message
                </button>
                <button className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 transition-colors shadow-sm">
                  Suspend Selected
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Body */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full min-w-[900px]">
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
                {[
                  { label: 'Institute', field: 'name' as keyof Tenant },
                  { label: 'Plan', field: 'plan' as keyof Tenant },
                  { label: 'Status', field: 'status' as keyof Tenant },
                  { label: 'Usage', field: 'usage' as keyof Tenant },
                  { label: 'Created', field: 'createdAt' as keyof Tenant },
                ].map(col => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none"
                  >
                    <div className="flex items-center">{col.label}<SortIcon field={col.field} /></div>
                  </th>
                ))}
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={7} rows={pageSize} />
              ) : (
                paginatedData.map((tenant, i) => (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-slate-50 hover:bg-blue-50/20 transition-colors group"
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedTenants.has(tenant.id)}
                          onCheckedChange={() => toggleSelect(tenant.id)}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                          {tenant.code}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{tenant.name}</p>
                          <p className="text-[11px] text-slate-400">{tenant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={tenant.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-xs gap-3">
                          <span className="text-slate-400">Students</span>
                          <span className="font-semibold text-slate-700">{tenant.usage.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs gap-3">
                          <span className="text-slate-400">Storage</span>
                          <span className="font-semibold text-slate-700">{tenant.usage.storageUsedGB}/{tenant.usage.maxStorageGB} GB</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-medium text-slate-700">{format(new Date(tenant.createdAt), 'MMM d, yyyy')}</p>
                      <p className="text-[11px] text-slate-400">Exp: {format(new Date(tenant.expiryDate), 'MMM d, yyyy')}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip
                          icon={Eye}
                          tooltip="View Details"
                          onClick={() => router.push(`/dashboard/tenants/${tenant.id}`)}
                        />
                        <ActionTooltip icon={Settings} tooltip="Settings" />
                        <ActionTooltip icon={Ban} tooltip="Suspend" variant="danger" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && sortedTenants.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Store className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No institutes found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalRows={sortedTenants.length}
          />
        </div>
      </div>
    </div>
  );
}
