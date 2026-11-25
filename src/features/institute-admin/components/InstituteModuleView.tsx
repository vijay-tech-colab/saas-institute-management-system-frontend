'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, Plus, Search } from 'lucide-react';
import { NotchedStatCard } from '@/components/ui/notched-stat-card';
import { SegmentedTabs } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TABLE_STICKY } from '@/components/ui/row-action-menu';
import { cn } from '@/lib/utils';
import type { InstituteModuleConfig } from '../config/modules-registry';

export function InstituteModuleView({ config }: { config: InstituteModuleConfig }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return config.rows;
    return config.rows.filter((row) =>
      [row.id, row.primary, row.secondary ?? '', row.col2, row.col3, row.col4]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [config.rows, search]);

  const tabItems = useMemo(
    () => config.tabs.map((tab) => ({ value: tab.href, label: tab.label })),
    [config.tabs]
  );

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8 max-w-[1560px] mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span>{config.parentModule}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {config.title}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5 max-w-2xl">
            {config.description}
          </p>
        </div>

        <Button size="sm" className="rounded-xl shadow-xs self-start md:self-auto">
          <Plus className="w-4 h-4 mr-1.5" />
          {config.primaryActionLabel}
        </Button>
      </div>

      {/* Sibling Sub-route Switcher */}
      {tabItems.length > 1 && (
        <div>
          <SegmentedTabs
            options={tabItems}
            value={config.route}
            onChange={(nextHref) => {
              if (nextHref !== config.route) {
                router.push(nextHref);
              }
            }}
            size="sm"
          />
        </div>
      )}

      {/* Module KPI Cards */}
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-4',
          config.stats.length === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
        )}
      >
        {config.stats.map((stat) => (
          <NotchedStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={<Layers className="w-4 h-4" />}
            tone={stat.tone}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
            compareLabel={stat.compareLabel}
          />
        ))}
      </div>

      {/* Module Records Table */}
      <div className="bg-white border border-slate-200/85 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
          <div className="relative w-full sm:max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={config.searchPlaceholder}
              className="pl-9 h-9 bg-white"
            />
          </div>
          <span className="text-xs font-medium text-slate-500">
            Showing {filteredRows.length} records
          </span>
        </div>

        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[920px] text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className={cn('py-3 px-5 whitespace-nowrap', TABLE_STICKY.idTh)}>ID</th>
                {config.columns.map((col) => (
                  <th key={col} className="py-3 px-5 whitespace-nowrap">
                    {col}
                  </th>
                ))}
                <th className="py-3 px-5 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50 transition-colors">
                    <td
                      className={cn(
                        'py-3.5 px-5 font-medium text-slate-700 tabular-nums whitespace-nowrap',
                        TABLE_STICKY.idTd
                      )}
                    >
                      {row.id}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <p className="font-semibold text-slate-900">{row.primary}</p>
                      {row.secondary && (
                        <p className="text-xs text-slate-500 mt-0.5">{row.secondary}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 whitespace-nowrap">{row.col2}</td>
                    <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">{row.col3}</td>
                    <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">{row.col4}</td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 px-5 text-center text-sm text-slate-500">
                    No matching records found for &ldquo;{search}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
