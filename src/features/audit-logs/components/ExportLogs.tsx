'use client';

import React, { useMemo, useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { Download, Plus, FileSpreadsheet, FileJson, FileText, Trash2, User, Layers, Calendar, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { mockExportJobs } from '../data/mock-data';
import { NewExportModal } from './NewExportModal';
import { Checkbox } from "@/components/ui/checkbox";


export function ExportLogs() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedExports, setSelectedExports] = useState<Set<string>>(new Set());
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filteredLogs = mockExportJobs.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(search.toLowerCase()) || 
                          job.requestedBy.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || job.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const paginatedLogs = filteredLogs.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedExports.size === paginatedLogs.length) {
      setSelectedExports(new Set());
    } else {
      setSelectedExports(new Set(paginatedLogs.map(j => j.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedExports);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedExports(next);
  };

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'json': return <FileJson className="w-4 h-4 text-amber-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-rose-500" />;
      case 'excel':
      case 'csv':
      default: return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
    }
  };

  type ExportJobRow = (typeof mockExportJobs)[number];

  const columns: TableColumnDef<ExportJobRow>[] = useMemo(() => [
    {
      id: 'requestedBy',
      label: 'Requested By',
      icon: User,
      defaultVisible: true,
      renderCell: (job) => (
        <div className="flex items-center gap-2.5">
          <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(job.requestedBy.email)}`} alt={job.requestedBy.name} className="w-7.5 h-7.5 rounded-full object-cover bg-slate-100 shrink-0" />
          <div>
            <p className="font-semibold text-[13px] text-slate-900">{job.requestedBy.name}</p>
            <p className="text-[11px] text-slate-500">{job.requestedBy.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      icon: Layers,
      defaultVisible: true,
      renderCell: (job) => (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-700">{job.category}</span>
          <span className="text-[11px] text-slate-500">{job.dateRange}</span>
        </div>
      ),
    },
    {
      id: 'formatSize',
      label: 'Format & Size',
      icon: FileText,
      defaultVisible: true,
      renderCell: (job) => (
        <div className="flex items-center gap-1.5">
          {getFormatIcon(job.format)}
          <span className="text-xs font-semibold text-slate-700">{job.format}</span>
          {job.fileSizeKb && (
            <span className="text-[11px] text-slate-400 font-medium ml-1">({(job.fileSizeKb / 1024).toFixed(1)} MB)</span>
          )}
        </div>
      ),
    },
    {
      id: 'createdAt',
      label: 'Created',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (job) => <span className="text-xs text-slate-600">{format(new Date(job.createdAt), 'MMM d, yyyy HH:mm')}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (job) => <StatusBadge status={job.status.toLowerCase() as 'completed' | 'processing' | 'failed'} />,
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
  } = useTableColumns('audit-export-logs', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Export Audit Logs" 
        description="Manage export history, download generated reports, and schedule automated exports."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Export' }]}
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> New Export
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by Export ID or User..." 
              className="w-full sm:w-72"
            />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Export ID"
            />
          </div>
          <FilterChips 
            options={[
              { label: 'All Exports', value: 'all', count: mockExportJobs.length },
              { label: 'Completed', value: 'completed', count: mockExportJobs.filter(j => j.status === 'Completed').length },
              { label: 'Processing', value: 'processing', count: mockExportJobs.filter(j => j.status === 'Processing').length },
              { label: 'Failed', value: 'failed', count: mockExportJobs.filter(j => j.status === 'Failed').length },
            ]} 
            selected={filter} 
            onChange={setFilter} 
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[960px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 border-y border-slate-100 z-20">
              <tr>
                <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedExports.size === paginatedLogs.length && paginatedLogs.length > 0}
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
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : (
                paginatedLogs.map((job, i) => {
                  const isSelected = selectedExports.has(job.id);
                  return (
                <motion.tr 
                  key={job.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    "border-b transition-colors cursor-pointer group",
                    isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                  )}
                  onClick={() => toggleSelect(job.id)}
                >
                  <td className={cn("py-3.5 px-4 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelect(job.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className={cn("py-3.5 px-5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                    {job.id}
                  </td>
                  {visibleColumns.map(col => (
                    <td key={col.id} className="py-3.5 px-5 whitespace-nowrap">
                      {col.renderCell(job, i)}
                    </td>
                  ))}
                  <td className={cn("py-3.5 px-4", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                    <RowActionMenu
                      items={[
                        { label: 'Download File', icon: Download, onClick: () => {}, hidden: job.status !== 'Completed' },
                        { label: 'Delete Export', icon: Trash2, variant: 'danger', onClick: () => {} },
                      ]}
                    />
                  </td>
                </motion.tr>
                  );
                })
              )}
              {!isTableLoading && paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan={totalCols} className="py-12 text-center text-slate-500">
                    <Download className="w-10 h-10 mx-auto mb-2.5 opacity-25" />
                    <p className="text-sm font-medium">No export logs found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <DataTablePagination 
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={filteredLogs.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <NewExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

