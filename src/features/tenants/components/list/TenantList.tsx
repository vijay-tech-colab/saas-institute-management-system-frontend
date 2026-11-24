'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { mockTenants, Tenant } from '../../data/mock-data';
import { format } from 'date-fns';
import {
  Download, Plus, ChevronDown, ChevronUp, Eye, Settings, Ban, Activity, Store, AlertCircle,
  Building2, User, AtSign, Phone, CreditCard, Users, GitBranch, MapPin, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { RowActionMenu, TABLE_STICKY } from '@/components/ui/row-action-menu';
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from '@/components/ui/table-configurator';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';
import { FileText, DownloadCloud } from 'lucide-react';
import { ExportProgressModal } from '@/components/ui/export-progress';
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
  
  // Export states
  const [exportModalType, setExportModalType] = useState<'export' | 'report' | null>(null);

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
      ? <ChevronUp className="w-3 h-3 text-primary ml-1" />
      : <ChevronDown className="w-3 h-3 text-primary ml-1" />;
  };

  const tenantColumns: TableColumnDef<Tenant>[] = useMemo(() => [
    {
      id: 'name',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderHeader: () => (
        <button type="button" onClick={() => handleSort('name')} className="inline-flex items-center uppercase hover:text-slate-800 cursor-pointer">
          <ColumnHeaderLabel label="Institute" icon={Building2} />
          <SortIcon field="name" />
        </button>
      ),
      renderCell: (tenant) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary-border">
            {tenant.code}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900 group-hover:text-primary transition-colors">{tenant.name}</p>
            <p className="text-[11px] text-slate-400">{tenant.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'ownerName',
      label: 'Owner',
      icon: User,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] font-medium text-slate-700 whitespace-nowrap">{tenant.ownerName}</span>,
    },
    {
      id: 'email',
      label: 'Email',
      icon: AtSign,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] text-slate-600 whitespace-nowrap">{tenant.email}</span>,
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] text-slate-600 tabular-nums whitespace-nowrap">{tenant.phone}</span>,
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: CreditCard,
      defaultVisible: true,
      renderHeader: () => (
        <button type="button" onClick={() => handleSort('plan')} className="inline-flex items-center uppercase hover:text-slate-800 cursor-pointer">
          <ColumnHeaderLabel label="Plan" icon={CreditCard} />
          <SortIcon field="plan" />
        </button>
      ),
      renderCell: (tenant) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {tenant.plan}
        </span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderHeader: () => (
        <button type="button" onClick={() => handleSort('status')} className="inline-flex items-center uppercase hover:text-slate-800 cursor-pointer">
          <ColumnHeaderLabel label="Status" icon={Activity} />
          <SortIcon field="status" />
        </button>
      ),
      renderCell: (tenant) => <StatusBadge status={tenant.status} />,
    },
    {
      id: 'usage',
      label: 'Usage',
      icon: Users,
      defaultVisible: true,
      renderHeader: () => (
        <button type="button" onClick={() => handleSort('usage')} className="inline-flex items-center uppercase hover:text-slate-800 cursor-pointer">
          <ColumnHeaderLabel label="Usage" icon={Users} />
          <SortIcon field="usage" />
        </button>
      ),
      renderCell: (tenant) => (
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
      ),
    },
    {
      id: 'branches',
      label: 'Branches',
      icon: GitBranch,
      defaultVisible: false,
      renderCell: (tenant) => <span className="text-[13px] font-medium text-slate-700 tabular-nums">{tenant.usage.branches}</span>,
    },
    {
      id: 'location',
      label: 'Country & State',
      icon: MapPin,
      defaultVisible: false,
      renderCell: (tenant) => (
        <span className="text-[13px] text-slate-600 whitespace-nowrap">
          {tenant.state}, {tenant.country}
        </span>
      ),
    },
    {
      id: 'createdAt',
      label: 'Joined & Expiry',
      icon: Calendar,
      defaultVisible: true,
      renderHeader: () => (
        <button type="button" onClick={() => handleSort('createdAt')} className="inline-flex items-center uppercase hover:text-slate-800 cursor-pointer">
          <ColumnHeaderLabel label="Created" icon={Calendar} />
          <SortIcon field="createdAt" />
        </button>
      ),
      renderCell: (tenant) => (
        <>
          <p className="text-xs font-medium text-slate-700">{format(new Date(tenant.createdAt), 'MMM d, yyyy')}</p>
          <p className="text-[11px] text-slate-400">Exp: {format(new Date(tenant.expiryDate), 'MMM d, yyyy')}</p>
        </>
      ),
    },
  ], [sortField, sortDirection]);

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
  } = useTableColumns('tenants-list', tenantColumns);

  const totalColumnsCount = visibleColumns.length + 3;

  const activeTenants = mockTenants.filter(t => t.status === 'active').length;
  const suspendedTenants = mockTenants.filter(t => t.status === 'suspended').length;
  const trialTenants = mockTenants.filter(t => t.status === 'trial').length;

  const handleExport = () => {
    setExportModalType('export');
  };

  const handleReport = () => {
    setExportModalType('report');
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <PageHeader
        title="Institutes List"
        description="View, filter, and manage all onboarded institutes, subscriptions, and system statuses."
      >
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-400" /> Export
        </button>
        <button
          onClick={() => router.push('/dashboard/tenants/create')}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Institute
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard title="Total Institutes" value={mockTenants.length} icon={<Store size={20} />} iconColor="text-indigo-600" iconBg="bg-indigo-50" trend={15.2} trendLabel="vs last month" />
        <StatCard title="Active" value={activeTenants} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={10.5} trendLabel="vs last month" />
        <StatCard title="Suspended" value={suspendedTenants} icon={<Ban size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
        <StatCard title="In Trial" value={trialTenants} icon={<AlertCircle size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search institutes by name, code, email..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Institute ID"
            />
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

        <AnimatePresence>
          {selectedTenants.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-indigo-50 border-b border-indigo-100 px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-sm font-bold text-indigo-900">{selectedTenants.size} institutes selected</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <DownloadCloud className="w-3.5 h-3.5 text-slate-500" />
                  Export (CSV)
                </button>
                <button 
                  onClick={handleReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Report (PDF)
                </button>
                <div className="w-px h-4 bg-indigo-200 mx-1"></div>
                <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
                  Message
                </button>
                <button className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 transition-colors shadow-sm">
                  Suspend
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Body */}
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[960px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedTenants.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('id')}
                  className={cn("text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:bg-slate-100 transition-colors select-none", TABLE_STICKY.idThWithCheckbox)}
                >
                  <div className="flex items-center">ID<SortIcon field="id" /></div>
                </th>
                {visibleColumns.map((col) => (
                  <th
                    key={col.id}
                    className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap select-none"
                  >
                    {col.renderHeader ? col.renderHeader() : <ColumnHeaderLabel label={col.label} icon={col.icon} />}
                  </th>
                ))}
                <th className={cn("py-2.5 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.actionTh)}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalColumnsCount} rows={pageSize} />
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
                      "border-b transition-colors group",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100/80"
                    )}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(tenant.id)}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {tenant.id}
                    </td>
                    {visibleColumns.map((col) => (
                      <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                        {col.renderCell(tenant, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <RowActionMenu
                        items={[
                          { label: 'View Details', icon: Eye, onClick: () => router.push(`/dashboard/tenants/${tenant.id}`) },
                          { label: 'Settings', icon: Settings, onClick: () => router.push(`/dashboard/tenants/${tenant.id}`) },
                          { label: 'Suspend', icon: Ban, variant: 'danger', onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={totalColumnsCount} className="p-8">
                    <EmptyState 
                      icon={Store}
                      title="No institutes found"
                      description="Try adjusting your filters or search query to find what you're looking for."
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
            totalRows={sortedTenants.length}
          />
        </div>
      </div>

      <ExportProgressModal 
        isOpen={!!exportModalType}
        onClose={() => setExportModalType(null)}
        type={exportModalType || 'export'}
        totalRows={selectedTenants.size}
      />
    </div>
  );
}
