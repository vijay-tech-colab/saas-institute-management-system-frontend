'use client';

import React, { useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { Database, Download, RotateCcw, Clock, HardDrive, Filter } from 'lucide-react';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockTenants } from '../../data/mock-data';
import { format, subHours } from 'date-fns';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ActionTooltip } from '@/components/ui/tooltip';
import { Checkbox } from "@/components/ui/checkbox";

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Manual', value: 'Manual' },
  { label: 'Automated', value: 'Automated' },
];

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

  const allBackups = mockTenants.map((t, i) => ({
    id: `BKP-2026-${String(i + 1).padStart(3, '0')}`,
    tenantId: t.id,
    institute: t.name,
    size: (Math.floor(Math.random() * 20) + 5) + ' GB',
    type: i % 3 === 0 ? 'Manual' : 'Automated',
    timestamp: subHours(new Date(), i * 14).toISOString(),
    status: 'completed',
  }));

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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Backup & Restore"
        description="Manage automated and manual database/file backups for all tenants."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Backups' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200">
          <Database className="w-4 h-4" /> Run Manual Backup
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Backup Storage" value={`${totalSize} GB`} icon={<HardDrive size={20} />} iconColor="text-slate-600" iconBg="bg-slate-100" />
        <StatCard title="Manual Backups" value={manualCount} icon={<Database size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Automated Backups" value={autoCount} icon={<Clock size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={100} trendLabel="success rate (30d)" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search backups..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedBackups.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Backup ID', 'Institute', 'Type', 'Size', 'Timestamp', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={6} rows={pageSize} />
              ) : (
                paginatedData.map((backup, i) => (
                  <motion.tr
                    key={backup.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selectedBackups.has(backup.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(backup.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedBackups.has(backup.id)}
                          onCheckedChange={() => toggleSelect(backup.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-900 text-white font-mono text-[11px] font-bold rounded-lg tracking-widest">
                        {backup.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-medium text-slate-800">{backup.institute}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={backup.type.toLowerCase() as any} />
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600">{backup.size}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {format(new Date(backup.timestamp), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip icon={RotateCcw} tooltip="Restore Data" />
                        <ActionTooltip icon={Download} tooltip="Download Archive" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No backups found</p>
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
            totalRows={filtered.length}
          />
        </div>
      </div>
    </div>
  );
}
