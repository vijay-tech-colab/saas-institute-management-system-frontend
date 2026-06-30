'use client';

import React, { useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { MessageSquare, Clock, CheckCircle2, ExternalLink, Filter, Plus } from 'lucide-react';
import { mockTenants } from '../../data/mock-data';
import { format, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ActionTooltip } from '@/components/ui/tooltip';
import { Checkbox } from "@/components/ui/checkbox";

export function SupportTickets() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = React.useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const allTickets = mockTenants.map((t, i) => ({
    id: `TCK-2026-${String(i + 100)}`,
    institute: t.name,
    subject: i % 2 === 0 ? 'Issue with SMS integration API' : 'Request for new report format',
    priority: i % 3 === 0 ? 'High' : i % 2 === 0 ? 'Medium' : 'Low',
    status: i === 0 ? 'Open' : i === 1 ? 'In Progress' : 'Resolved',
    lastUpdate: subDays(new Date(), i).toISOString(),
  }));

  const openCount = allTickets.filter(t => t.status === 'Open').length;
  const inProgressCount = allTickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = allTickets.filter(t => t.status === 'Resolved').length;

  const filtered = allTickets.filter(ticket => {
    const matchSearch =
      ticket.institute.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      ticket.status.toLowerCase().replace(' ', '-') === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedTickets.size === paginatedData.length) {
      setSelectedTickets(new Set());
    } else {
      setSelectedTickets(new Set(paginatedData.map(t => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedTickets);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedTickets(next);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Support Desk"
        description="Manage and resolve tickets submitted by institute owners and administrators."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Support' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200">
          <Plus className="w-4 h-4" /> Create Ticket
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tickets" value={allTickets.length} icon={<MessageSquare size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Open" value={openCount} icon={<Clock size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
        <StatCard title="In Progress" value={inProgressCount} icon={<Clock size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Resolved" value={resolvedCount} icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search tickets..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <FilterChips
            options={[
              { label: 'All', value: 'all', count: allTickets.length },
              { label: 'Open', value: 'open', count: openCount },
              { label: 'In Progress', value: 'in-progress', count: inProgressCount },
              { label: 'Resolved', value: 'resolved', count: resolvedCount },
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
                      checked={selectedTickets.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Ticket ID', 'Subject', 'Institute', 'Priority', 'Status', 'Last Update', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={7} rows={pageSize} />
              ) : (
                paginatedData.map((ticket, i) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selectedTickets.has(ticket.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(ticket.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedTickets.has(ticket.id)}
                          onCheckedChange={() => toggleSelect(ticket.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-900 text-white font-mono text-[11px] font-bold rounded-lg tracking-widest">
                        {ticket.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-medium text-slate-800 max-w-xs truncate">{ticket.subject}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-600">{ticket.institute}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={ticket.priority as any} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={ticket.status as any} />
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {format(new Date(ticket.lastUpdate), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip icon={ExternalLink} tooltip="View Ticket" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No tickets found</p>
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
