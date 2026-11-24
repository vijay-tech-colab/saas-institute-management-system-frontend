'use client';

import React, { useMemo, useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, Eye, Monitor, MapPin, DownloadCloud, FileText, User, Activity, ShieldAlert, Clock, Globe } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { mockLoginLogs } from '../data/mock-data';
import { LoginLog } from '../types';

import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from 'framer-motion';
import { ExportProgressModal } from '@/components/ui/export-progress';
import { LoginDetailsModal } from './LoginDetailsModal';

export function LoginLogsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<LoginLog | null>(null);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [isTableLoading, setIsTableLoading] = useState(true);

  // Export states
  const [exportModalType, setExportModalType] = useState<'export' | 'report' | null>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filteredLogs = mockLoginLogs.filter(log => {
    const matchesSearch = log.user.name.toLowerCase().includes(search.toLowerCase()) ||
      log.user.email.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedLogs = filteredLogs.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedLogs.size === paginatedLogs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(paginatedLogs.map(l => l.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedLogs);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedLogs(next);
  };

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, statusFilter]);

  const handleExport = () => {
    setExportModalType('export');
  };

  const handleReport = () => {
    setExportModalType('report');
  };

  const columns: TableColumnDef<LoginLog>[] = useMemo(() => [
    {
      id: 'user',
      label: 'User',
      icon: User,
      defaultVisible: true,
      renderCell: (log) => (
        <div className="flex items-center gap-2.5">
          <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(log.user.email)}`} alt={log.user.name} className="w-8 h-8 rounded-full object-cover bg-slate-100 shrink-0" />
          <div>
            <p className="font-semibold text-[13px] text-slate-900 leading-tight">{log.user.name}</p>
            <p className="text-[11px] text-slate-500 font-medium">{log.user.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (log) => <StatusBadge status={log.status} />,
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      icon: ShieldAlert,
      defaultVisible: true,
      renderCell: (log) => <StatusBadge status={log.riskLevel.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'} />,
    },
    {
      id: 'ipLocation',
      label: 'IP & Location',
      icon: MapPin,
      defaultVisible: true,
      renderCell: (log) => (
        <div>
          <p className="text-[13px] font-mono text-slate-700">{log.ipAddress}</p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {log.location}</p>
        </div>
      ),
    },
    {
      id: 'device',
      label: 'Device',
      icon: Monitor,
      defaultVisible: true,
      renderCell: (log) => (
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-700">{log.browser}</p>
            <p className="text-[10px] text-slate-500">{log.os}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'time',
      label: 'Time',
      icon: Clock,
      defaultVisible: true,
      renderCell: (log) => <span className="text-xs text-slate-600 font-medium">{format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}</span>,
    },
    {
      id: 'role',
      label: 'Role',
      icon: Globe,
      defaultVisible: false,
      renderCell: (log) => <span className="text-xs font-medium text-slate-700">{log.user.role || 'Super Admin'}</span>,
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
  } = useTableColumns('audit-login-logs', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Login & Access Logs"
        description="Monitor user authentications, track IP addresses, and detect suspicious login attempts."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Login Logs' }]}
      >
        <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search user, email, or IP..."
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
              idFieldLabel="Log ID"
            />
          </div>

          <FilterChips
            options={[
              { label: 'All', value: 'all', count: mockLoginLogs.length },
              { label: 'Success', value: 'success', count: mockLoginLogs.filter(l => l.status === 'success').length },
              { label: 'Failed', value: 'failed', count: mockLoginLogs.filter(l => l.status === 'failed').length },
              { label: 'Blocked', value: 'blocked', count: mockLoginLogs.filter(l => l.status === 'blocked').length },
            ]}
            selected={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedLogs.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-light border-b border-primary-border px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{selectedLogs.size} logs selected</span>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="flex-1 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[960px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 border-y border-slate-100 z-20">
              <tr>
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedLogs.size === paginatedLogs.length && paginatedLogs.length > 0}
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
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : (
                paginatedLogs.map((log, i) => {
                  const isSelected = selectedLogs.has(log.id);
                  return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "group border-b transition-colors cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(log.id)}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(log.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {log.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                        {col.renderCell(log, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'View Details', icon: Eye, onClick: () => setSelectedLog(log) },
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
                    <Monitor className="w-10 h-10 mx-auto mb-2.5 opacity-25" />
                    <p className="text-sm font-medium">No login logs found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={filteredLogs.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <LoginDetailsModal 
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />

      <ExportProgressModal 
        isOpen={!!exportModalType}
        onClose={() => setExportModalType(null)}
        type={exportModalType || 'export'}
        totalRows={selectedLogs.size}
      />
    </div>
  );
}

