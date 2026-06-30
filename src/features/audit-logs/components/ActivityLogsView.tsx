'use client';

import React, { useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { format } from 'date-fns';
import { Download, Filter, Eye, Activity, History, List, Monitor, MapPin, Undo } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Activity Logs" 
        description="Detailed chronological trail of all user actions and system changes."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Activity Logs' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search actions or users..." 
              className="w-full sm:w-80"
            />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
                      <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Action</th>
                      <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Module</th>
                      <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Time</th>
                      <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isTableLoading ? (
                      <TableSkeleton columns={5} rows={pageSize} />
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
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(log.user.email)}`} alt={log.user.name} className="w-9 h-9 rounded-full object-cover bg-slate-50" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-slate-900">{log.user.name}</p>
                              <p className="text-[11px] text-slate-500">{log.user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-sm font-medium text-slate-700">{log.action}</td>
                        <td className="py-3.5 px-4">
                          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                            {log.module}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
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
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          <p className="font-medium">No activity logs found</p>
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
