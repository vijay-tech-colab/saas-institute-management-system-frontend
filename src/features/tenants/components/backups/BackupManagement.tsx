'use client';

import React, { useMemo, useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { Database, Download, RotateCcw, Clock, HardDrive, Building2, Activity, Globe, ShieldCheck } from 'lucide-react';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockTenants } from '../../data/mock-data';
import { format, subHours } from 'date-fns';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { RowActionMenu, TABLE_STICKY } from '@/components/ui/row-action-menu';
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from '@/components/ui/table-configurator';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';

export function BackupManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedBackups, setSelectedBackups] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = React.useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const allBackups = useMemo(() => mockTenants.map((t, i) => ({
    id: `BKP-2026-${String(i + 1).padStart(3, '0')}`,
    tenantId: t.id,
    institute: t.name,
    size: `${((i * 7) % 18) + 6} GB`,
    type: i % 3 === 0 ? 'Manual' : 'Automated',
    region: i % 2 === 0 ? 'ap-south-1 (Mumbai)' : 'us-east-1 (Virginia)',
    encryption: 'AES-256',
    timestamp: subHours(new Date('2026-03-01T00:00:00Z'), i * 14).toISOString(),
    status: 'completed',
  })), []);

  const filtered = allBackups.filter(b => {
    const matchSearch =
      b.institute.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || b.type === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedBackups.size === paginatedData.length) {
      setSelectedBackups(new Set());
    } else {
      setSelectedBackups(new Set(paginatedData.map(b => b.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedBackups);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedBackups(next);
  };

  const totalSize = allBackups.length * 12;
  const manualCount = allBackups.filter(b => b.type === 'Manual').length;
  const autoCount = allBackups.filter(b => b.type === 'Automated').length;

  type BackupRow = (typeof allBackups)[number];

  const columns: TableColumnDef<BackupRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (backup) => <span className="text-[13px] font-medium text-slate-800">{backup.institute}</span>,
    },
    {
      id: 'type',
      label: 'Type',
      icon: Activity,
      defaultVisible: true,
      renderCell: (backup) => <StatusBadge status={backup.type.toLowerCase() as any} />,
    },
    {
      id: 'size',
      label: 'Size',
      icon: HardDrive,
      defaultVisible: true,
      renderCell: (backup) => <span className="text-[13px] text-slate-600 tabular-nums">{backup.size}</span>,
    },
    {
      id: 'timestamp',
      label: 'Timestamp',
      icon: Clock,
      defaultVisible: true,
      renderCell: (backup) => <span className="text-xs text-slate-500">{format(new Date(backup.timestamp), 'MMM d, yyyy HH:mm')}</span>,
    },
    {
      id: 'region',
      label: 'Region',
      icon: Globe,
      defaultVisible: false,
      renderCell: (backup) => <span className="text-[13px] text-slate-600">{backup.region}</span>,
    },
    {
      id: 'encryption',
      label: 'Encryption',
      icon: ShieldCheck,
      defaultVisible: false,
      renderCell: (backup) => <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">{backup.encryption}</span>,
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
  } = useTableColumns('tenants-backups', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Backup & Restore"
        description="Manage automated and manual database/file backups for all tenants."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Backups' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-xs bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-all shadow-2xs cursor-pointer">
          <Database className="w-3.5 h-3.5" /> Run Manual Backup
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        <StatCard title="Total Backup Storage" value={`${totalSize} GB`} icon={<HardDrive size={18} />} tone="neutral" />
        <StatCard title="Manual Backups" value={manualCount} icon={<Database size={18} />} tone="primary" />
        <StatCard title="Automated Backups" value={autoCount} icon={<Clock size={18} />} tone="success" trend={100} trendLabel="success rate (30d)" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search backups..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Backup ID"
            />
          </div>
          <FilterChips
            options={[
              { label: 'All', value: 'all', count: allBackups.length },
              { label: 'Manual', value: 'Manual', count: manualCount },
              { label: 'Automated', value: 'Automated', count: autoCount },
            ]}
            selected={filter}
            onChange={setFilter}
          />
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[760px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedBackups.size === paginatedData.length && paginatedData.length > 0}
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
                paginatedData.map((backup, i) => {
                  const isSelected = selectedBackups.has(backup.id);
                  return (
                  <motion.tr
                    key={backup.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(backup.id)}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(backup.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {backup.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                        {col.renderCell(backup, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'Restore Data', icon: RotateCcw, onClick: () => {} },
                          { label: 'Download Archive', icon: Download, onClick: () => {} },
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
                      icon={Database}
                      title="No backups found"
                      description="There are no backups matching your current filters."
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

