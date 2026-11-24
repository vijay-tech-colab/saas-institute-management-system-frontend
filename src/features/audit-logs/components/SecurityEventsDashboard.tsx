'use client';

import React, { useMemo, useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { format } from 'date-fns';
import { Download, ShieldAlert, Clock, Eye, ShieldCheck, Activity, MapPin } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
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

  const columns: TableColumnDef<SecurityEvent>[] = useMemo(() => [
    {
      id: 'eventType',
      label: 'Event Type',
      icon: ShieldAlert,
      defaultVisible: true,
      renderCell: (event) => (
        <>
          <p className="text-[13px] font-semibold text-slate-900">{event.eventType}</p>
          <p className="text-[11px] text-slate-500 font-medium max-w-[220px] truncate" title={event.description}>{event.description}</p>
        </>
      ),
    },
    {
      id: 'severity',
      label: 'Severity',
      icon: Activity,
      defaultVisible: true,
      renderCell: (event) => <StatusBadge status={event.severity} />,
    },
    {
      id: 'targetTime',
      label: 'Target & Time',
      icon: Clock,
      defaultVisible: true,
      renderCell: (event) => (
        <>
          <p className="text-[13px] font-mono text-slate-700">{event.ipAddress}</p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {format(new Date(event.timestamp), 'MMM d, HH:mm')}</p>
        </>
      ),
    },
    {
      id: 'mitigation',
      label: 'Mitigation',
      icon: ShieldCheck,
      defaultVisible: true,
      renderCell: (event) => <span className="text-[13px] font-medium text-slate-700">{event.mitigationActionTaken}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (event) => <StatusBadge status={event.resolved ? 'resolved' : 'action_required'} />,
    },
    {
      id: 'ipAddress',
      label: 'Origin IP',
      icon: MapPin,
      defaultVisible: false,
      renderCell: (event) => <span className="text-[13px] text-slate-600 tabular-nums">{event.ipAddress || '—'}</span>,
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
  } = useTableColumns('audit-security-events', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Security Events" 
        description="AI-driven threat detection and real-time security alerts across your platform."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Security Events' }]}
      >
        <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export Report
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search event type or IP..." 
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
              idFieldLabel="Event ID"
            />
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
        <div className="flex-1 overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[920px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 border-y border-slate-100 z-20">
              <tr>
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedEvents.size === paginatedEvents.length && paginatedEvents.length > 0}
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
                paginatedEvents.map((event, idx) => {
                  const isSelected = selectedEvents.has(event.id);
                  return (
                <motion.tr 
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "group border-b transition-colors cursor-pointer",
                    isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                  )}
                  onClick={() => toggleSelect(event.id)}
                >
                  <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelect(event.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                    {event.id}
                  </td>
                  {visibleColumns.map(col => (
                    <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                      {col.renderCell(event, idx)}
                    </td>
                  ))}
                  <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                    <RowActionMenu
                      items={[
                        { label: 'View Threat Intel', icon: Eye, onClick: () => setSelectedEvent(event) },
                      ]}
                    />
                  </td>
                </motion.tr>
                  );
                })
              )}
              {!isTableLoading && paginatedEvents.length === 0 && (
                <tr>
                  <td colSpan={totalCols} className="py-12 text-center text-slate-500">
                    <ShieldAlert className="w-10 h-10 mx-auto mb-2.5 opacity-25" />
                    <p className="text-sm font-medium">No security events found</p>
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

