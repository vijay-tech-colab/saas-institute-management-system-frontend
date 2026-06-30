'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, ArrowUpCircle, ArrowDownCircle, PauseCircle, PlayCircle, Eye, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageHeader, SearchInput, FilterChips, ProgressBar } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockCustomers } from '../data/mock-data';
import type { SubscriptionStatus } from '../types';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";


export function CustomerSubscriptions() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const filtered = mockCustomers.filter(c => {
    const matchSearch = c.instituteName.toLowerCase().includes(search.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const active = mockCustomers.filter(c => c.status === 'active').length;
  const trial = mockCustomers.filter(c => c.status === 'trial').length;
  const expired = mockCustomers.filter(c => c.status === 'expired').length;
  const totalMRR = mockCustomers.filter(c => c.status === 'active').reduce((s, c) => s + c.monthlyRevenue, 0);

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedCustomers.size === paginatedData.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(paginatedData.map(c => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedCustomers);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedCustomers(next);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Customer Subscriptions"
        description="Manage all institute subscriptions, usage, and account actions."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Customers' }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <StatCard title="Active Customers" value={active} icon={<Users size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={5.4} trendLabel="vs last month" />
        <StatCard title="Trial Accounts" value={trial} icon={<TrendingUp size={20} />} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <StatCard title="Expired/Suspended" value={expired + mockCustomers.filter(c => c.status === 'suspended').length} icon={<PauseCircle size={20} />} iconColor="text-red-500" iconBg="bg-red-50" />
        <StatCard title="Total MRR" value={totalMRR} prefix="₹" icon={<TrendingUp size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={8.2} trendLabel="vs last month" />
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search institute or owner..." className="w-full sm:w-80" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: mockCustomers.length },
              { label: 'Active', value: 'active', count: mockCustomers.filter(c => c.status === 'active').length },
              { label: 'Trial', value: 'trial', count: mockCustomers.filter(c => c.status === 'trial').length },
              { label: 'Expired', value: 'expired', count: mockCustomers.filter(c => c.status === 'expired').length },
              { label: 'Suspended', value: 'suspended', count: mockCustomers.filter(c => c.status === 'suspended').length },
            ]} 
            selected={filter} 
            onChange={setFilter} 
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-sm border-b border-slate-100 z-10">
              <tr>
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedCustomers.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Institute', 'Plan', 'Storage', 'Students', 'Branches', 'MRR', 'Renewal', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={9} rows={pageSize} />
              ) : (
                paginatedData.map((customer, i) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedCustomers.has(customer.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(customer.id)}
                  >
                    <td className="py-3 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedCustomers.has(customer.id)}
                          onCheckedChange={() => toggleSelect(customer.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {customer.instituteName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 line-clamp-1">{customer.instituteName}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{customer.ownerName} · {customer.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{customer.currentPlan}</span>
                    </td>
                    <td className="py-3 px-4 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (customer.storageUsed / customer.storageLimit) * 100)}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">{customer.storageUsed}/{customer.storageLimit}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, (customer.studentsUsed / customer.studentsLimit) * 100)}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">{customer.studentsUsed}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-600">
                      {customer.branchesUsed}/{customer.branchesLimit}
                    </td>
                    <td className="py-3 px-4 text-xs font-bold text-emerald-600">
                      ₹{customer.monthlyRevenue > 0 ? customer.monthlyRevenue.toLocaleString('en-IN') : '—'}
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-500">
                      {new Date(customer.renewalDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={customer.status as SubscriptionStatus} />
                    </td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        <ActionTooltip icon={Eye} tooltip="View Details" onClick={() => router.push(`/dashboard/subscriptions/customers/${customer.id}`)} />
                        <ActionTooltip icon={ArrowUpCircle} tooltip="Upgrade Plan" onClick={() => alert(`Upgrade: ${customer.instituteName}`)} />
                        <ActionTooltip icon={ArrowDownCircle} tooltip="Downgrade Plan" onClick={() => alert(`Downgrade: ${customer.instituteName}`)} />
                        {customer.status === 'suspended' ? (
                          <ActionTooltip icon={PlayCircle} tooltip="Resume Subscription" variant="success" onClick={() => alert(`Resume: ${customer.instituteName}`)} />
                        ) : (
                          <ActionTooltip icon={PauseCircle} tooltip="Suspend Subscription" variant="warning" onClick={() => alert(`Suspend: ${customer.instituteName}`)} />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>

          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No customers found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 bg-white shrink-0">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={filtered.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}
