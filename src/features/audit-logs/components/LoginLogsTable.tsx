'use client';

import React, { useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, Filter, Eye, Monitor, MapPin, DownloadCloud, FileText, Loader2 } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Login & Access Logs"
        description="Monitor user authentications, track IP addresses, and detect suspicious login attempts."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Login Logs' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search user, email, or IP..."
              className="w-full sm:w-80"
            />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
              className="bg-indigo-50 border-b border-indigo-100 px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-sm font-bold text-indigo-900">{selectedLogs.size} logs selected</span>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50/50 border-y border-slate-100 z-10">
              <tr>
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedLogs.size === paginatedLogs.length && paginatedLogs.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">User</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Risk Level</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">IP & Location</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Device</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Time</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={7} rows={pageSize} />
              ) : (
                paginatedLogs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`border-b hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedLogs.has(log.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(log.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedLogs.has(log.id)}
                          onCheckedChange={() => toggleSelect(log.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(log.user.email)}`} alt={log.user.name} className="w-9 h-9 rounded-full object-cover bg-slate-50" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 leading-tight">{log.user.name}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{log.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={log.riskLevel.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'} />
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="text-sm font-mono text-slate-700">{log.ipAddress}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {log.location}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{log.browser}</p>
                          <p className="text-[10px] text-slate-500">{log.os}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600 font-medium">
                      {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="py-3.5 px-4 flex justify-end" onClick={(e) => e.stopPropagation()}>
                      <ActionTooltip
                        icon={Eye}
                        tooltip="View Details"
                        onClick={() => setSelectedLog(log)}
                      />
                    </td>
                  </motion.tr>
                ))
              )}
              {!isTableLoading && paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Monitor className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No login logs found</p>
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
