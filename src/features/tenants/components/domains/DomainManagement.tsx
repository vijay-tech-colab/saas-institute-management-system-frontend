'use client';

import React, { useState } from 'react';
import { PageHeader, SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { Globe, CheckCircle2, AlertCircle, ExternalLink, RefreshCw, ShieldAlert, Filter, Plus } from 'lucide-react';
import { mockTenants } from '../../data/mock-data';
import { motion } from 'framer-motion';
import { DataTablePagination } from '@/components/ui/pagination';
import { TableSkeleton } from '@/components/ui/skeleton';
import { ActionTooltip } from '@/components/ui/tooltip';
import { Checkbox } from "@/components/ui/checkbox";

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

  const allDomains = mockTenants.map(t => ({
    id: t.id,
    institute: t.name,
    code: t.code,
    subdomain: `${t.code.toLowerCase()}.instituteos.com`,
    customDomain: t.id === 'TEN-001' ? 'portal.globaltech.edu' : null,
    sslStatus: t.id === 'TEN-001' ? 'active' : 'pending',
    status: t.status,
  }));

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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Domain Management"
        description="Manage subdomains, custom domains, and SSL certificates across all tenants."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Domains' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
          <RefreshCw className="w-4 h-4" /> Refresh DNS Records
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Active Subdomains" value={activeSubdomains} icon={<Globe size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Custom Domains" value={customDomains} icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="SSL Pending" value={sslPending} icon={<ShieldAlert size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search domains..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedDomains.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Institute', 'System Subdomain', 'Custom Domain', 'SSL Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={5} rows={pageSize} />
              ) : (
                paginatedData.map((domain, i) => (
                  <motion.tr
                    key={domain.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selectedDomains.has(domain.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(domain.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedDomains.has(domain.id)}
                          onCheckedChange={() => toggleSelect(domain.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-semibold text-slate-900">{domain.institute}</p>
                      <p className="text-[11px] text-slate-400">{domain.code}</p>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600">
                      <a href={`https://${domain.subdomain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        {domain.subdomain} <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      {domain.customDomain ? (
                        <a href={`https://${domain.customDomain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">
                          {domain.customDomain} <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ) : (
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors">
                          <Plus className="w-3 h-3" /> Add Domain
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {domain.customDomain ? (
                        domain.sslStatus === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pending
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                          <AlertCircle className="w-3.5 h-3.5" /> Managed SSL
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip icon={Globe} tooltip="Manage DNS" />
                        <ActionTooltip icon={RefreshCw} tooltip="Refresh DNS" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No domains found</p>
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
