'use client';

import React, { useMemo, useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { Globe, CheckCircle2, AlertCircle, ExternalLink, RefreshCw, ShieldAlert, Plus, Building2, Link2, ShieldCheck, Server } from 'lucide-react';
import { mockTenants } from '../../data/mock-data';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { RowActionMenu, TABLE_STICKY } from '@/components/ui/row-action-menu';
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from '@/components/ui/table-configurator';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';
export function DomainManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = React.useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const allDomains = useMemo(() => mockTenants.map((t, i) => ({
    id: t.id,
    institute: t.name,
    code: t.code,
    subdomain: `${t.code.toLowerCase()}.instituteos.com`,
    customDomain: t.id === 'TEN-001' ? 'portal.globaltech.edu' : null,
    sslStatus: t.id === 'TEN-001' ? 'active' : 'pending',
    dnsProvider: i % 2 === 0 ? 'Cloudflare DNS' : 'Route 53',
    status: t.status,
  })), []);

  const activeSubdomains = allDomains.length;
  const customDomains = allDomains.filter(d => d.customDomain).length;
  const sslPending = allDomains.filter(d => d.customDomain && d.sslStatus === 'pending').length;

  const filtered = allDomains.filter(d => {
    const matchSearch =
      d.institute.toLowerCase().includes(search.toLowerCase()) ||
      d.subdomain.toLowerCase().includes(search.toLowerCase()) ||
      (d.customDomain || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'custom' && !!d.customDomain) ||
      (filter === 'ssl-pending' && d.customDomain && d.sslStatus === 'pending') ||
      (filter === 'ssl-active' && d.customDomain && d.sslStatus === 'active');
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedDomains.size === paginatedData.length) {
      setSelectedDomains(new Set());
    } else {
      setSelectedDomains(new Set(paginatedData.map(d => d.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedDomains);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedDomains(next);
  };

  type DomainRow = (typeof allDomains)[number];

  const columns: TableColumnDef<DomainRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (domain) => (
        <>
          <p className="text-[13px] font-semibold text-slate-900">{domain.institute}</p>
          <p className="text-[11px] text-slate-400">{domain.code}</p>
        </>
      ),
    },
    {
      id: 'subdomain',
      label: 'System Subdomain',
      icon: Link2,
      defaultVisible: true,
      renderCell: (domain) => (
        <a href={`https://${domain.subdomain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-primary transition-colors">
          {domain.subdomain} <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      ),
    },
    {
      id: 'customDomain',
      label: 'Custom Domain',
      icon: Globe,
      defaultVisible: true,
      renderCell: (domain) => (
        domain.customDomain ? (
          <a href={`https://${domain.customDomain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-800 hover:text-primary transition-colors">
            {domain.customDomain} <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        ) : (
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-lg hover:bg-primary/15 transition-colors cursor-pointer">
            <Plus className="w-3 h-3" /> Add Domain
          </button>
        )
      ),
    },
    {
      id: 'sslStatus',
      label: 'SSL Status',
      icon: ShieldCheck,
      defaultVisible: true,
      renderCell: (domain) => (
        domain.customDomain ? (
          domain.sslStatus === 'active' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/70">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pending
            </span>
          )
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <AlertCircle className="w-3.5 h-3.5" /> Managed SSL
          </span>
        )
      ),
    },
    {
      id: 'dnsProvider',
      label: 'DNS Provider',
      icon: Server,
      defaultVisible: false,
      renderCell: (domain) => <span className="text-[13px] text-slate-600">{domain.dnsProvider}</span>,
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
  } = useTableColumns('tenants-domains', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Domain Management"
        description="Manage subdomains, custom domains, and SSL certificates across all tenants."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Domains' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-xs bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-2xs cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh DNS Records
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        <StatCard title="Active Subdomains" value={activeSubdomains} icon={<Globe size={18} />} tone="primary" />
        <StatCard title="Custom Domains" value={customDomains} icon={<CheckCircle2 size={18} />} tone="success" />
        <StatCard title="SSL Pending" value={sslPending} icon={<ShieldAlert size={18} />} tone="warning" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search domains..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Domain ID"
            />
          </div>
          <FilterChips
            options={[
              { label: 'All', value: 'all', count: allDomains.length },
              { label: 'Custom Domain', value: 'custom', count: customDomains },
              { label: 'SSL Active', value: 'ssl-active', count: allDomains.filter(d => d.customDomain && d.sslStatus === 'active').length },
              { label: 'SSL Pending', value: 'ssl-pending', count: sslPending },
            ]}
            selected={filter}
            onChange={setFilter}
          />
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[880px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedDomains.size === paginatedData.length && paginatedData.length > 0}
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
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : paginatedData.length > 0 ? (
                paginatedData.map((domain, i) => {
                  const isSelected = selectedDomains.has(domain.id);
                  return (
                  <motion.tr
                    key={domain.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(domain.id)}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(domain.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {domain.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                        {col.renderCell(domain, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'Manage DNS', icon: Globe, onClick: () => {} },
                          { label: 'Refresh DNS', icon: RefreshCw, onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={totalCols} className="p-8">
                    <EmptyState 
                      icon={Globe}
                      title="No domains found"
                      description="No domains or subdomains match your current filters."
                      actionLabel="Reset Filters"
                      onAction={() => { setSearch(''); setFilter('all'); }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

