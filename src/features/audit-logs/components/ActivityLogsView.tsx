'use client';

import React, { useMemo, useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { format } from 'date-fns';
import { Download, Eye, Activity, User, Layers, Clock, Globe, Monitor } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { mockActivityLogs } from '../data/mock-data';
import { ActivityLog } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityDetailsModal } from './ActivityDetailsModal';
import { Checkbox } from "@/components/ui/checkbox";


export function ActivityLogsView() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filteredLogs = mockActivityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) || 
                          log.user.name.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
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
  }, [pageIndex, pageSize, search, moduleFilter]);

  const columns: TableColumnDef<ActivityLog>[] = useMemo(() => [
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
            <p className="text-[11px] text-slate-500">{log.user.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      icon: Activity,
      defaultVisible: true,
      renderCell: (log) => <span className="text-[13px] font-medium text-slate-700">{log.action}</span>,
    },
    {
      id: 'module',
      label: 'Module',
      icon: Layers,
      defaultVisible: true,
      renderCell: (log) => (
        <span className="text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary-border">
          {log.module}
        </span>
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
      id: 'ipAddress',
      label: 'IP Address',
      icon: Globe,
      defaultVisible: false,
      renderCell: (log) => <span className="text-[13px] text-slate-600 tabular-nums">{log.ipAddress || '103.21.124.8'}</span>,
    },
    {
      id: 'clientBrowser',
      label: 'Client / Browser',
      icon: Monitor,
      defaultVisible: false,
      renderCell: (log) => (
        <span className="text-xs text-slate-500">
          {[log.browser, log.device].filter(Boolean).join(' · ') || 'Chrome / Desktop'}
        </span>
      ),
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
  } = useTableColumns('audit-activity-logs', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Activity Logs" 
        description="Detailed chronological trail of all user actions and system changes."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Activity Logs' }]}
      >
        <button className="flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-2xs cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Export Report
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search actions, users, or ID..." 
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
              { label: 'All', value: 'all', count: mockActivityLogs.length },
              { label: 'Users', value: 'Users', count: mockActivityLogs.filter(l => l.module === 'Users').length },
              { label: 'Auth', value: 'Auth', count: mockActivityLogs.filter(l => l.module === 'Auth').length },
              { label: 'Settings', value: 'Settings', count: mockActivityLogs.filter(l => l.module === 'Settings').length },
            ]}
            selected={moduleFilter}
            onChange={setModuleFilter}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[980px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 border-y border-slate-100 z-20">
                    <tr>
                      <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selectedLogs.size === paginatedLogs.length && paginatedLogs.length > 0}
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
                      paginatedLogs.map((log, i) => {
                        const isSelected = selectedLogs.has(log.id);
                        return (
                      <motion.tr 
                        key={log.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={cn(
                          "group border-b transition-colors cursor-pointer",
                          isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                        )}
                        onClick={() => toggleSelect(log.id)}
                      >
                        <td className={cn("py-3.5 px-4 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelect(log.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </td>
                        <td className={cn("py-3.5 px-5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                          {log.id}
                        </td>
                        {visibleColumns.map(col => (
                          <td key={col.id} className="py-3.5 px-5 whitespace-nowrap">
                            {col.renderCell(log, i)}
                          </td>
                        ))}
                        <td className={cn("py-3.5 px-4", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
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
                          <Activity className="w-10 h-10 mx-auto mb-2.5 opacity-25" />
                          <p className="text-sm font-medium">No activity logs found</p>
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
      
      <ActivityDetailsModal 
        log={selectedLog} 
        isOpen={!!selectedLog} 
        onClose={() => setSelectedLog(null)} 
      />
    </div>
  );
}

