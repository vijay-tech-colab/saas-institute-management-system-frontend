'use client';

import React, { useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { Download, Plus, FileSpreadsheet, FileJson, FileText, Trash2, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Export Audit Logs" 
        description="Manage export history, download generated reports, and schedule automated exports."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Export' }]}
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-4 h-4" /> New Export
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by Export ID or User..." 
              className="w-full sm:w-80"
            />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50/50 border-y border-slate-100 z-10">
              <tr>
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedExports.size === paginatedLogs.length && paginatedLogs.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Export ID</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Requested By</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Category</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Format & Size</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={6} rows={pageSize} />
              ) : (
                paginatedLogs.map((job, i) => (
                <motion.tr 
                  key={job.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b hover:bg-blue-50/30 transition-colors cursor-pointer group ${selectedExports.has(job.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                  onClick={() => toggleSelect(job.id)}
                >
                  <td className="py-3.5 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedExports.has(job.id)}
                        onCheckedChange={() => toggleSelect(job.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">{job.id}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{format(new Date(job.createdAt), 'MMM d, yyyy HH:mm')}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={`https://i.pravatar.cc/150?u=${encodeURIComponent(job.requestedBy.email)}`} alt={job.requestedBy.name} className="w-8 h-8 rounded-full object-cover bg-slate-50" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-slate-900">{job.requestedBy.name}</p>
                        <p className="text-[10px] text-slate-500">{job.requestedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{job.category}</span>
                      <span className="text-[10px] text-slate-500">{job.dateRange}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {getFormatIcon(job.format)}
                      <span className="text-xs font-bold text-slate-700">{job.format}</span>
                      {job.fileSizeKb && (
                        <span className="text-[10px] text-slate-400 font-medium ml-1">({(job.fileSizeKb / 1024).toFixed(1)} MB)</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={job.status.toLowerCase() as 'completed' | 'processing' | 'failed'} />
                  </td>
                  <td className="py-3 px-4 flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    {job.status === 'Completed' && (
                      <ActionTooltip 
                        icon={Download} 
                        tooltip="Download File" 
                        onClick={() => {}} 
                      />
                    )}
                    <ActionTooltip 
                      icon={Trash2} 
                      tooltip="Delete" 
                      variant="danger"
                      onClick={() => {}} 
                    />
                  </td>
                </motion.tr>
                ))
              )}
              {!isTableLoading && paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Download className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No export logs found</p>
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
