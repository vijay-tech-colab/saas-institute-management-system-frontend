'use client';

import React, { useMemo, useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockTenants } from '../../data/mock-data';
import {
  Ban, RotateCcw, Trash2, AlertTriangle, Clock, Filter,
  Building2, CreditCard, Calendar, IndianRupee, User, Phone, MapPin
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { RowActionMenu, TABLE_STICKY } from '@/components/ui/row-action-menu';
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from '@/components/ui/table-configurator';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';

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

  const reasons = ['payment', 'policy', 'manual'] as const;

  const suspendedTenants = React.useMemo(() => {
    return mockTenants.map((t, i) => {
      const days = ((i * 7) % 28) + 1;
      return {
        ...t,
        status: 'suspended' as const,
        suspendedOn: subDays(new Date('2026-03-01T00:00:00Z'), days).toISOString(),
        reason: reasons[i % 3],
        daysSuspended: days,
        owingAmount: t.plan === 'Enterprise' ? 49900 : t.plan === 'Pro' ? 19900 : 9900,
      };
    });
  }, []);

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

  type SuspendedRow = (typeof suspendedTenants)[number];

  const columns: TableColumnDef<SuspendedRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (tenant) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-rose-100">
            {tenant.code}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900">{tenant.name}</p>
            <p className="text-[11px] text-slate-400">{tenant.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'owner',
      label: 'Owner',
      icon: User,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] text-slate-700">{tenant.ownerName}</span>,
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] text-slate-600 tabular-nums">{tenant.phone}</span>,
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: CreditCard,
      defaultVisible: true,
      renderCell: (tenant) => <StatusBadge status={tenant.plan.toLowerCase() as any} showDot={false} />,
    },
    {
      id: 'reason',
      label: 'Suspension Reason',
      icon: AlertTriangle,
      defaultVisible: true,
      renderCell: (tenant) => <StatusBadge status={tenant.reason as any} />,
    },
    {
      id: 'suspendedOn',
      label: 'Suspended On',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (tenant) => <span className="text-xs text-slate-500">{format(new Date(tenant.suspendedOn), 'MMM d, yyyy')}</span>,
    },
    {
      id: 'daysSuspended',
      label: 'Days Suspended',
      icon: Clock,
      defaultVisible: true,
      renderCell: (tenant) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
          tenant.daysSuspended > 14 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {tenant.daysSuspended}d
        </span>
      ),
    },
    {
      id: 'owing',
      label: 'Owing (₹)',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (tenant) => (
        <span className="text-[13px] font-semibold text-rose-600 tabular-nums">
          {tenant.reason === 'payment' ? `₹${(tenant.owingAmount / 100).toLocaleString('en-IN')}` : '—'}
        </span>
      ),
    },
    {
      id: 'location',
      label: 'Region',
      icon: MapPin,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] text-slate-600">{tenant.state}, {tenant.country}</span>,
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
  } = useTableColumns('tenants-suspended', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Suspended Institutes"
        description="Review and manage suspended tenant accounts. Reinstate or permanently remove them."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Suspended' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-2xs cursor-pointer">
          <Filter className="w-3.5 h-3.5 text-slate-400" /> Export Report
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <StatCard title="Total Suspended" value={suspendedTenants.length} icon={<Ban size={18} />} tone="danger" />
        <StatCard title="Payment Overdue" value={paymentCount} icon={<AlertTriangle size={18} />} tone="warning" />
        <StatCard title="Policy Violation" value={policyCount} icon={<AlertTriangle size={18} />} tone="danger" />
        <StatCard title="Manual" value={manualCount} icon={<Clock size={18} />} tone="neutral" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search suspended institutes..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Tenant ID"
            />
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
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[1040px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedTenants.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className={cn("text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.idThWithCheckbox)}>ID</th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  </th>
                ))}
                <th className={cn("py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : paginatedData.length > 0 ? (
                paginatedData.map((tenant, i) => {
                  const isSelected = selectedTenants.has(tenant.id);
                  return (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(tenant.id)}
                  >
                    <td className={cn("py-3.5 px-4 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(tenant.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-3.5 px-5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {tenant.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-3.5 px-5 whitespace-nowrap">
                        {col.renderCell(tenant, i)}
                      </td>
                    ))}
                    <td className={cn("py-3.5 px-4", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'Reinstate Tenant', icon: RotateCcw, variant: 'success', onClick: () => {} },
                          { label: 'Delete Permanently', icon: Trash2, variant: 'danger', onClick: () => {} },
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
