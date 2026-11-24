'use client';

import React from 'react';
import { Filter, Download, Calendar, RefreshCcw } from 'lucide-react';
import { SearchInput, PageHeader } from '../shared/UIComponents';

export function DashboardHeader() {
  return (
    <PageHeader
      title="Subscription Overview"
      description="Manage all tenant subscriptions, revenue, plans, renewals, trials, invoices, and payments."
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="w-56 sm:w-64">
          <SearchInput value="" onChange={() => {}} placeholder="Search Tenant..." />
        </div>
        
        <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
          <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter
        </button>
        
        <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date Range
        </button>

        <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export
        </button>
        
        <button className="h-9 w-9 inline-flex items-center justify-center bg-primary-light text-primary border border-primary-border rounded-lg hover:bg-primary/15 transition-colors group cursor-pointer">
          <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </PageHeader>
  );
}

