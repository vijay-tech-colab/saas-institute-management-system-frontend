"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Download, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TopKPIs, type DashboardPeriod } from './super-admin/TopKPIs';
import { BusinessAnalytics, YEARLY_REVENUE_DATA } from './super-admin/BusinessAnalytics';
import { TopPlanCategories } from './super-admin/TopPlanCategories';
import { InstituteDistributionCard } from './super-admin/InstituteDistributionCard';
import { RecentActivitySidebar } from './super-admin/RecentActivitySidebar';
import { PerformanceSummaryCard } from './super-admin/PerformanceSummaryCard';

export function SuperAdminDashboard() {
  const toast = useToast();
  const [period, setPeriod] = useState<DashboardPeriod>('30d');
  const todayLabel = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleExportReport = () => {
    const headers = ['Month', 'Monthly Revenue (INR)', 'New Institutes'];
    const rows = YEARLY_REVENUE_DATA.map((d) => [d.name, d.mrr, d.institutes].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campusos-super-admin-report-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success({
      title: 'Report exported',
      description: 'Monthly revenue and institute metrics downloaded as CSV.',
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-5">
      {/* ─── Executive Command Bar ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              Platform Overview
            </h1>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-medium text-slate-600">{todayLabel}</span>
            <span className="text-slate-300">&bull;</span>
            <span>2,190 active tenants</span>
            <span className="text-slate-300">&bull;</span>
            <span>6/6 services healthy</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Select value={period} onValueChange={(v) => setPeriod(v as DashboardPeriod)}>
            <SelectTrigger className="h-9 w-[142px] rounded-xl border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-2xs">
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={handleExportReport}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          <Link
            href="/dashboard/tenants/create"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold shadow-xs transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Institute</span>
          </Link>
        </div>
      </div>

      {/* ─── Row 1: 4 Pastel Metric Cards ─── */}
      <TopKPIs period={period} />

      {/* ─── Row 2: Revenue Overview Bar Chart (8 cols) + Top Plan Donut (4 cols) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5">
        <div className="xl:col-span-8 min-w-0">
          <BusinessAnalytics />
        </div>
        <div className="xl:col-span-4 min-w-0">
          <TopPlanCategories />
        </div>
      </div>

      {/* ─── Row 3: Distribution | Recent Activity | Performance Summary ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        <InstituteDistributionCard />
        <RecentActivitySidebar />
        <PerformanceSummaryCard />
      </div>
    </div>
  );
}
