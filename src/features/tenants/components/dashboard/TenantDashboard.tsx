'use client';

import React from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { Store, Building2, Users, HardDrive, TrendingUp, Calendar, ChevronRight, Activity, Ban, AlertCircle, RefreshCcw, Filter, Download } from 'lucide-react';
import { mockTenants } from '../../data/mock-data';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Mock chart data for overview
const growthData = [
  { month: 'Jan', institutes: 45 },
  { month: 'Feb', institutes: 52 },
  { month: 'Mar', institutes: 68 },
  { month: 'Apr', institutes: 84 },
  { month: 'May', institutes: 105 },
  { month: 'Jun', institutes: 132 },
];

function AnalyticsCardsGrid() {
  const totalTenants = mockTenants.length;
  const activeTenants = mockTenants.filter(t => t.status === 'active').length;
  const suspendedTenants = mockTenants.filter(t => t.status === 'suspended').length;
  const trialTenants = mockTenants.filter(t => t.status === 'trial').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard title="Total Institutes" value={totalTenants} icon={<Store size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={15.2} trendLabel="vs last month" />
      <StatCard title="Active Institutes" value={activeTenants} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={10.5} trendLabel="vs last month" />
      <StatCard title="Suspended" value={suspendedTenants} icon={<Ban size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
      <StatCard title="In Trial" value={trialTenants} icon={<AlertCircle size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
    </div>
  );
}

function InstituteGrowthChart() {
  const max = Math.max(...growthData.map(d => d.institutes));
  
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-base font-bold text-slate-900">Institute Growth</h3>
          <p className="text-xs text-slate-500 mt-1">Total onboarded institutes over time</p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex-1 flex items-end gap-3 h-48 mt-auto">
        {growthData.map((d, i) => {
          const height = (d.institutes / max) * 100;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative flex-1 flex items-end justify-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full max-w-[40px] bg-blue-100 rounded-t-xl group-hover:bg-blue-600 transition-colors relative"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-0 opacity-0 group-hover:opacity-100 group-hover:text-slate-700 transition-all">
                    {d.institutes}
                  </span>
                </motion.div>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-900 transition-colors uppercase">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UsageMetricsOverview() {
  // Calculate total usages across all mock tenants
  const totalStudents = mockTenants.reduce((acc, curr) => acc + curr.usage.students, 0);
  const totalStorage = mockTenants.reduce((acc, curr) => acc + curr.usage.storageUsedGB, 0);
  const totalBranches = mockTenants.reduce((acc, curr) => acc + curr.usage.branches, 0);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-base font-bold text-slate-900 mb-6">Platform Usage</h3>
      
      <div className="space-y-6 flex-1">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">Total Students</p>
            </div>
            <p className="text-sm font-bold text-slate-900">{totalStudents.toLocaleString()}</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
             <div className="h-full bg-blue-500 rounded-full w-[75%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">Storage Used</p>
            </div>
            <p className="text-sm font-bold text-slate-900">{totalStorage.toLocaleString()} GB</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
             <div className="h-full bg-indigo-500 rounded-full w-[60%]"></div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">Total Branches</p>
            </div>
            <p className="text-sm font-bold text-slate-900">{totalBranches.toLocaleString()}</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
             <div className="h-full bg-emerald-500 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentTenantsList() {
  const recentTenants = [...mockTenants].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Tenants</h3>
          <p className="text-xs text-slate-500 mt-1">Latest institutes to join</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {recentTenants.map((tenant, i) => (
          <motion.div 
            key={tenant.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">
                {tenant.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">{tenant.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] text-slate-500">{tenant.plan} Plan</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="text-[11px] text-slate-400">{format(new Date(tenant.createdAt), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>
            <StatusBadge status={tenant.status} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TenantDashboard() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tenant Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of all institutes, usage metrics, and growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" /> Filter
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" /> Date Range
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
          
          <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors group shadow-sm shadow-blue-100">
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <AnalyticsCardsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InstituteGrowthChart />
        <UsageMetricsOverview />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentTenantsList />
      </div>
    </div>
  );
}
