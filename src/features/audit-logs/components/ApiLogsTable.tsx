'use client';

import React, { useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, Filter, Eye, Activity, Clock } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="API Request Logs" 
        description="Track all incoming and outgoing API requests across the platform."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'API Logs' }]}
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
              placeholder="Search endpoint, tenant, or ID..." 
              className="w-full sm:w-80"
            />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Method</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Endpoint & Request ID</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Tenant</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Time</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Performance</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={7} rows={pageSize} />
              ) : (
                paginatedLogs.map((log, i) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
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
                    <StatusBadge
                      status={log.statusCode >= 500 ? 'failed' : log.statusCode >= 400 ? 'warning' : 'success'}
                      label={log.statusCode}
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-black tracking-wide ${
                      log.method === 'GET' ? 'text-blue-600' :
                      log.method === 'POST' ? 'text-emerald-600' :
                      log.method === 'DELETE' ? 'text-rose-600' :
                      log.method === 'PUT' ? 'text-amber-600' :
                      'text-slate-600'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-[300px]" title={log.endpoint}>
                        {log.endpoint}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">{log.id}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{log.tenantName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                    {format(new Date(log.timestamp), 'MMM d, HH:mm:ss')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-bold flex items-center gap-1 ${
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
                  </td>
                  <td className="py-3.5 px-4 flex justify-end" onClick={(e) => e.stopPropagation()}>
                    <ActionTooltip 
                      icon={Eye} 
                      tooltip="View Request" 
                      onClick={() => setSelectedLog(log)} 
                    />
                  </td>
                </motion.tr>
                ))
              )}
              {!isTableLoading && paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No API logs found</p>
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
