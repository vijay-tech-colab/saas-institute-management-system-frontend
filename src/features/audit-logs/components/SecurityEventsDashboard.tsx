'use client';

import React, { useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, Filter, ShieldAlert, Clock, Eye } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
import { mockSecurityEvents } from '../data/mock-data';
import { SecurityEventDetailsModal } from './SecurityEventDetailsModal';
import { SecurityEvent } from '../types';
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from 'framer-motion';

export function SecurityEventsDashboard() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [isTableLoading, setIsTableLoading] = useState(true);
  
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  const filteredEvents = mockSecurityEvents.filter(event => {
    const matchesSearch = event.eventType.toLowerCase().includes(search.toLowerCase()) || 
                          event.ipAddress.includes(search);
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const paginatedEvents = filteredEvents.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedEvents.size === paginatedEvents.length) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(paginatedEvents.map(e => e.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedEvents);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedEvents(next);
  };

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, severityFilter]);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Security Events" 
        description="AI-driven threat detection and real-time security alerts across your platform."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Security Events' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
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
              placeholder="Search event type or IP..." 
              className="w-full sm:w-80"
            />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: mockSecurityEvents.length },
              { label: 'Critical', value: 'critical', count: mockSecurityEvents.filter(e => e.severity === 'critical').length },
              { label: 'High', value: 'high', count: mockSecurityEvents.filter(e => e.severity === 'high').length },
              { label: 'Warning', value: 'warning', count: mockSecurityEvents.filter(e => e.severity === 'warning').length },
            ]}
            selected={severityFilter}
            onChange={setSeverityFilter}
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
                      checked={selectedEvents.size === paginatedEvents.length && paginatedEvents.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Event Type</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Severity</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Target & Time</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Mitigation</th>
                <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isTableLoading ? (
                <TableSkeleton columns={6} rows={pageSize} />
              ) : (
                paginatedEvents.map((event) => (
                <motion.tr 
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedEvents.has(event.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                  onClick={() => toggleSelect(event.id)}
                >
                  <td className="py-3.5 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedEvents.has(event.id)}
                        onCheckedChange={() => toggleSelect(event.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-sm font-bold text-slate-900">{event.eventType}</p>
                    <p className="text-[11px] text-slate-500 font-medium max-w-[200px] truncate" title={event.description}>{event.description}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={event.severity} />
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-sm font-mono text-slate-700">{event.ipAddress}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {format(new Date(event.timestamp), 'MMM d, HH:mm')}</p>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-medium text-slate-700">
                    {event.mitigationActionTaken}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={event.resolved ? 'resolved' : 'action_required'} />
                  </td>
                  <td className="py-3.5 px-4 flex justify-end" onClick={(e) => e.stopPropagation()}>
                    <ActionTooltip 
                      icon={Eye} 
                      tooltip="View Threat Intel" 
                      onClick={() => setSelectedEvent(event)} 
                    />
                  </td>
                </motion.tr>
                ))
              )}
              {!isTableLoading && paginatedEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No security events found</p>
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
            totalRows={filteredEvents.length}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <SecurityEventDetailsModal 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
