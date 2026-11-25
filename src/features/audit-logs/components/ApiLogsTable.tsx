'use client';

import React, { useMemo, useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, Eye, Activity, Clock, Globe, Building2, Code2, Gauge, Server } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { mockApiLogs } from '../data/mock-data';
import { ApiLog } from '../types';
import { ApiDetailsModal } from './ApiDetailsModal';
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from 'framer-motion';

export function ApiLogsTable() {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filteredLogs = mockApiLogs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(search.toLowerCase()) || 
                          log.tenantName.toLowerCase().includes(search.toLowerCase()) ||
                          log.id.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = methodFilter === 'all' || log.method === methodFilter.toUpperCase();
    return matchesSearch && matchesMethod;
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
  }, [pageIndex, pageSize, search, methodFilter]);

  const columns: TableColumnDef<ApiLog>[] = useMemo(() => [
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (log) => (
        <StatusBadge
          status={log.statusCode >= 500 ? 'failed' : log.statusCode >= 400 ? 'warning' : 'success'}
          label={log.statusCode}
        />
      ),
    },
    {
      id: 'method',
      label: 'Method',
      icon: Code2,
      defaultVisible: true,
      renderCell: (log) => (
        <span className={`text-xs font-bold tracking-wide ${
          log.method === 'GET' ? 'text-primary' :
          log.method === 'POST' ? 'text-emerald-600' :
          log.method === 'DELETE' ? 'text-rose-600' :
          log.method === 'PUT' ? 'text-amber-600' :
          'text-slate-600'
        }`}>
          {log.method}
        </span>
      ),
    },
    {
      id: 'endpoint',
      label: 'Endpoint',
      icon: Globe,
      defaultVisible: true,
      renderCell: (log) => (
        <span className="text-[13px] font-medium text-slate-900 font-mono truncate block max-w-[260px]" title={log.endpoint}>
          {log.endpoint}
        </span>
      ),
    },
    {
      id: 'tenant',
      label: 'Tenant',
      icon: Building2,
      defaultVisible: true,
      renderCell: (log) => (
        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{log.tenantName}</span>
      ),
    },
    {
      id: 'time',
      label: 'Time',
      icon: Clock,
      defaultVisible: true,
      renderCell: (log) => (
        <span className="text-xs text-slate-600 font-medium">{format(new Date(log.timestamp), 'MMM d, HH:mm:ss')}</span>
      ),
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: Gauge,
      defaultVisible: true,
      thClassName: 'text-right',
      tdClassName: 'text-right',
      renderCell: (log) => (
        <div className="flex flex-col items-end">
          <span className={`text-xs font-semibold flex items-center gap-1 ${
            log.responseTimeMs > 1000 ? 'text-rose-600' :
            log.responseTimeMs > 500 ? 'text-amber-600' :
            'text-emerald-600'
          }`}>
            <Clock className="w-3 h-3" /> {log.responseTimeMs} ms
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">
            {log.requestSizeKb}KB / {log.responseSizeKb}KB
          </span>
        </div>
      ),
    },
    {
      id: 'ipAddress',
      label: 'IP Address',
      icon: Server,
      defaultVisible: false,
      renderCell: (log) => <span className="text-[13px] text-slate-600 tabular-nums">{log.ipAddress || '103.21.124.8'}</span>,
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
  } = useTableColumns('audit-api-logs', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="API Request Logs" 
        description="Track all incoming and outgoing API requests across the platform."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'API Logs' }]}
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
              placeholder="Search endpoint, tenant, or ID..." 
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
              { label: 'All', value: 'all', count: mockApiLogs.length },
              { label: 'GET', value: 'get', count: mockApiLogs.filter(l => l.method === 'GET').length },
              { label: 'POST', value: 'post', count: mockApiLogs.filter(l => l.method === 'POST').length },
              { label: 'PUT', value: 'put', count: mockApiLogs.filter(l => l.method === 'PUT').length },
              { label: 'DELETE', value: 'delete', count: mockApiLogs.filter(l => l.method === 'DELETE').length },
            ]}
            selected={methodFilter}
            onChange={setMethodFilter}
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[1040px] text-left border-collapse">
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
                  <th key={col.id} className={cn("text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap", col.thClassName)}>
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
                    <td key={col.id} className={cn("py-3.5 px-5 whitespace-nowrap", col.tdClassName)}>
                      {col.renderCell(log, i)}
                    </td>
                  ))}
                  <td className={cn("py-3.5 px-4", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                    <RowActionMenu
                      items={[
                        { label: 'View Request', icon: Eye, onClick: () => setSelectedLog(log) },
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
                    <p className="text-sm font-medium">No API logs found</p>
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

      <ApiDetailsModal 
        log={selectedLog} 
        isOpen={!!selectedLog} 
        onClose={() => setSelectedLog(null)} 
      />
    </div>
  );
}

