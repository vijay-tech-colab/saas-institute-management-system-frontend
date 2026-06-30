import React from 'react';
import { OverviewStats } from './OverviewStats';
import { CoursePopularityChart } from './CoursePopularityChart';
import { RecentActivity } from './RecentActivity';
import { Download } from 'lucide-react';

export function OverviewDashboard() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 overflow-y-auto">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Institute Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            High-level metrics and system activity across your computer training center network.
          </p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </header>

      {/* Main Grid */}
      <div className="space-y-6 pb-8">
        {/* Top Row: KPIs */}
        <OverviewStats />

        {/* Bottom Row: Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CoursePopularityChart />
          <RecentActivity />
        </div>
      </div>

    </div>
  );
}
