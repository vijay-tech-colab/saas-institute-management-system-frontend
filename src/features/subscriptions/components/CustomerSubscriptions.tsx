'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Users, TrendingUp, ArrowUpCircle, ArrowDownCircle, PauseCircle, PlayCircle, Eye,
  DownloadCloud, FileText, Building2, CreditCard, HardDrive, GitBranch, IndianRupee, Calendar, Activity, MapPin, AtSign
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExportProgressModal } from '@/components/ui/export-progress';
import { PageHeader, SearchInput, FilterChips } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockCustomers } from '../data/mock-data';
import type { SubscriptionStatus } from '../types';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';


export function CustomerSubscriptions() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const router = useRouter();

  // Export states
  const [exportModalType, setExportModalType] = useState<'export' | 'report' | null>(null);

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

  const handleExport = () => {
    setExportModalType('export');
  };

  const handleReport = () => {
    setExportModalType('report');
  };

  type CustomerRow = (typeof mockCustomers)[number];

  const columns: TableColumnDef<CustomerRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (customer) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary border border-primary-border flex items-center justify-center font-bold text-xs flex-shrink-0">
            {customer.instituteName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[13px] text-slate-900 line-clamp-1">{customer.instituteName}</p>
            <p className="text-[11px] text-slate-400 line-clamp-1">{customer.ownerName} · {customer.city}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      icon: AtSign,
      defaultVisible: false,
      renderCell: (customer) => <span className="text-[13px] text-slate-600">{customer.email}</span>,
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: CreditCard,
      defaultVisible: true,
      renderCell: (customer) => <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{customer.currentPlan}</span>,
    },
    {
      id: 'storage',
      label: 'Storage',
      icon: HardDrive,
      defaultVisible: true,
      tdClassName: 'min-w-[110px]',
      renderCell: (customer) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (customer.storageUsed / customer.storageLimit) * 100)}%` }} />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">{customer.storageUsed}/{customer.storageLimit}</span>
        </div>
      ),
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      defaultVisible: true,
      tdClassName: 'min-w-[110px]',
      renderCell: (customer) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (customer.studentsUsed / customer.studentsLimit) * 100)}%` }} />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">{customer.studentsUsed}</span>
        </div>
      ),
    },
    {
      id: 'branches',
      label: 'Branches',
      icon: GitBranch,
      defaultVisible: true,
      renderCell: (customer) => <span className="text-xs font-semibold text-slate-600">{customer.branchesUsed}/{customer.branchesLimit}</span>,
    },
    {
      id: 'mrr',
      label: 'MRR',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (customer) => (
        <span className="text-xs font-semibold text-emerald-600 tabular-nums">
          ₹{customer.monthlyRevenue > 0 ? customer.monthlyRevenue.toLocaleString('en-IN') : '—'}
        </span>
      ),
    },
    {
      id: 'renewal',
      label: 'Renewal',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (customer) => (
        <span className="text-xs font-medium text-slate-500">
          {new Date(customer.renewalDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      id: 'city',
      label: 'City',
      icon: MapPin,
      defaultVisible: false,
      renderCell: (customer) => <span className="text-[13px] text-slate-600">{customer.city}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (customer) => <StatusBadge status={customer.status as SubscriptionStatus} />,
    },
  ], []);

  const {
    orderedColumns,
    visibleColumns,
    hiddenSet,
    toggleColumn,
    hideAllOptional,
    showAll,
    resetColumns,
    moveColumn,
    isCustomized,
  } = useTableColumns('subscriptions-customers', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Customer Subscriptions"
        description="Manage all institute subscriptions, usage, and account actions."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Customers' }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4 shrink-0">
        <StatCard title="Active Customers" value={active} icon={<Users size={18} />} tone="primary" trend={5.4} trendLabel="vs last month" />
        <StatCard title="Trial Accounts" value={trial} icon={<TrendingUp size={18} />} tone="warning" />
        <StatCard title="Expired/Suspended" value={expired + mockCustomers.filter(c => c.status === 'suspended').length} icon={<PauseCircle size={18} />} tone="danger" />
        <StatCard title="Total MRR" value={totalMRR} prefix="₹" icon={<TrendingUp size={18} />} tone="success" trend={8.2} trendLabel="vs last month" />
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search institute or owner..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Customer ID"
            />
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

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedCustomers.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-light border-b border-primary-border px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{selectedCustomers.size} subscriptions selected</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <DownloadCloud className="w-3.5 h-3.5 text-slate-500" />
                  Export (CSV)
                </button>
                <button 
                  onClick={handleReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary-border text-primary text-xs font-semibold rounded-lg hover:bg-primary-light transition-colors shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Report (PDF)
                </button>
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
                  Send Notice
                </button>
                <button className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-2xs cursor-pointer">
                  Suspend Subscriptions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[1040px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-20">
              <tr>
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedCustomers.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className={cn("text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.idThWithCheckbox)}>ID</th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  </th>
                ))}
                <th className={cn("py-2.5 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : filtered.length > 0 ? (
                paginatedData.map((customer, i) => {
                  const isSelected = selectedCustomers.has(customer.id);
                  return (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(customer.id)}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(customer.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {customer.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className={cn("py-2.5 px-3.5 whitespace-nowrap", col.tdClassName)}>
                        {col.renderCell(customer, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'View Details', icon: Eye, onClick: () => router.push(`/dashboard/subscriptions/customers/${customer.id}`) },
                          { label: 'Upgrade Plan', icon: ArrowUpCircle, onClick: () => alert(`Upgrade: ${customer.instituteName}`) },
                          { label: 'Downgrade Plan', icon: ArrowDownCircle, onClick: () => alert(`Downgrade: ${customer.instituteName}`) },
                          { label: 'Resume Subscription', icon: PlayCircle, variant: 'success', hidden: customer.status !== 'suspended', onClick: () => alert(`Resume: ${customer.instituteName}`) },
                          { label: 'Suspend Subscription', icon: PauseCircle, variant: 'warning', hidden: customer.status === 'suspended', onClick: () => alert(`Suspend: ${customer.instituteName}`) },
                        ]}
                      />
                    </td>
                  </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={totalCols} className="p-8">
                    <EmptyState
                      icon={Users}
                      title="No customers found"
                      description="No customers match your current filters."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

      <ExportProgressModal 
        isOpen={!!exportModalType}
        onClose={() => setExportModalType(null)}
        type={exportModalType || 'export'}
        totalRows={selectedCustomers.size}
      />
    </div>
  );
}

