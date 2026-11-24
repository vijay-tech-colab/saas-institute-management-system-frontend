'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { TableOverlayLoader } from '@/components/ui/loaders';
import { UsersDirectoryTable } from './UsersDirectoryTable';
import { Users, Activity, ShieldBan, ShieldAlert, TrendingUp, Calendar, ChevronRight, Store, ArrowUpRight, Filter, Download, RefreshCcw } from 'lucide-react';
import { mockUsers } from '../../data/mock-data';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Mock chart data for overview
const registrationData = [
  { month: 'Jan', users: 12 },
  { month: 'Feb', users: 19 },
  { month: 'Mar', users: 25 },
  { month: 'Apr', users: 32 },
  { month: 'May', users: 48 },
  { month: 'Jun', users: 65 },
];

function AnalyticsCardsGrid() {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const blockedUsers = mockUsers.filter(u => u.status === 'blocked').length;
  const pendingUsers = mockUsers.filter(u => u.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
      <StatCard title="Total Owners" value={totalUsers} icon={<Users size={18} />} tone="primary" trend={12.5} trendLabel="vs last month" />
      <StatCard title="Active Accounts" value={activeUsers} icon={<Activity size={18} />} tone="success" trend={8.2} trendLabel="vs last month" />
      <StatCard title="Blocked Accounts" value={blockedUsers} icon={<ShieldBan size={18} />} tone="danger" />
      <StatCard title="Pending Verification" value={pendingUsers} icon={<ShieldAlert size={18} />} tone="warning" />
    </div>
  );
}

function UserGrowthChart() {
  // A visual representation of user growth
  const max = Math.max(...registrationData.map(d => d.users));
  
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">User Growth Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">New institute registrations over time</p>
        </div>
        <div className="p-2 bg-primary-light text-primary border border-primary-border rounded-xl">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex-1 flex items-end gap-3 h-48 mt-auto">
        {registrationData.map((d, i) => {
          const height = (d.users / max) * 100;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative flex-1 flex items-end justify-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full max-w-[40px] bg-primary-light border border-primary-border rounded-t-xl group-hover:bg-primary transition-colors relative"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-all">
                    {d.users}
                  </span>
                </motion.div>
              </div>
              <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-900 transition-colors uppercase">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivityList() {
  const recentUsers = [...mockUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">Recent Registrations</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest institutes joined</p>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {recentUsers.map((user, i) => (
          <motion.div 
            key={user.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200/80"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-light border border-primary-border flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-[13px] text-slate-900">{user.institute.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] text-slate-500">{user.firstName} {user.lastName}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="text-[11px] text-slate-400">{format(new Date(user.createdAt), 'MMM d, yy')}</p>
                </div>
              </div>
            </div>
            <StatusBadge status={user.status} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionDistribution() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight mb-5">Subscription Plans</h3>
      
      <div className="space-y-4">
        {[
          { plan: 'Pro Plan', pct: 65, users: 145, color: 'bg-primary', light: 'bg-slate-100' },
          { plan: 'Basic Plan', pct: 25, users: 56, color: 'bg-sky-500', light: 'bg-slate-100' },
          { plan: 'Trial', pct: 10, users: 22, color: 'bg-amber-500', light: 'bg-slate-100' },
        ].map((item) => (
          <div key={item.plan}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[13px] font-medium text-slate-700">{item.plan}</p>
              <p className="text-xs font-semibold text-slate-900 tabular-nums">{item.pct}% <span className="text-slate-400 font-normal">({item.users})</span></p>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${item.light}`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${item.color}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserOverviewDashboard() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-5">
      <PageHeader
        title="Users Overview"
        description="High-level metrics and analytics across all registered institute owners."
      >
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter
          </button>
          
          <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date Range
          </button>

          <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Download className="w-3.5 h-3.5 text-slate-400" /> Export
          </button>
          
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9 w-9 inline-flex items-center justify-center bg-primary-light text-primary border border-primary-border rounded-lg hover:bg-primary/15 transition-colors group disabled:opacity-50 cursor-pointer"
          >
            <RefreshCcw className={`w-3.5 h-3.5 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          </button>
        </div>
      </PageHeader>

      <AnalyticsCardsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {isRefreshing && <TableOverlayLoader />}
        <UserGrowthChart />
        <RecentActivityList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 relative">
        {isRefreshing && <TableOverlayLoader />}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-56 h-56 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight mb-1.5">Need to manage admin permissions?</h3>
            <p className="text-slate-300 text-xs sm:text-[13px] max-w-md mb-5 leading-relaxed">
              Super Admins can assign module permissions and manage internal staff roles directly from Settings.
            </p>
            <Link
              href="/dashboard/settings/team"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-900 font-semibold text-xs rounded-xl hover:bg-slate-100 transition-colors"
            >
              Manage Team &amp; Roles <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        
        <SubscriptionDistribution />
      </div>

      <UsersDirectoryTable />
    </div>
  );
}

