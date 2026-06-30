'use client';

import React from 'react';
import { Search, Filter, Download, Calendar, RefreshCcw } from 'lucide-react';
import { SearchInput } from '../shared/UIComponents';

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all tenant subscriptions, revenue, plans, renewals, trials, invoices, and payments.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-64">
          <SearchInput value="" onChange={() => {}} placeholder="Search Tenant..." />
        </div>
        
        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Filter className="w-4 h-4 text-slate-400" /> Filter
        </button>
        
        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400" /> Date Range
        </button>

        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4 text-slate-400" /> Export
        </button>
        
        <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors group shadow-sm shadow-indigo-100">
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
}
