'use client';

import React from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard title="Total Owners" value={totalUsers} icon={<Users size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={12.5} trendLabel="vs last month" />
      <StatCard title="Active Accounts" value={activeUsers} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={8.2} trendLabel="vs last month" />
      <StatCard title="Blocked Accounts" value={blockedUsers} icon={<ShieldBan size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
      <StatCard title="Pending Verification" value={pendingUsers} icon={<ShieldAlert size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
    </div>
  );
}

function UserGrowthChart() {
  // A visual representation of user growth
  const max = Math.max(...registrationData.map(d => d.users));
  
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-base font-bold text-slate-900">User Growth Trend</h3>
          <p className="text-xs text-slate-500 mt-1">New institute registrations over time</p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <TrendingUp className="w-5 h-5" />
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
                  className="w-full max-w-[40px] bg-blue-100 rounded-t-xl group-hover:bg-blue-600 transition-colors relative"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-0 opacity-0 group-hover:opacity-100 group-hover:text-slate-700 transition-all">
                    {d.users}
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

function RecentActivityList() {
  const recentUsers = [...mockUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Registrations</h3>
          <p className="text-xs text-slate-500 mt-1">Latest institutes joined</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {recentUsers.map((user, i) => (
          <motion.div 
            key={user.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">{user.institute.name}</p>
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
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-6">Subscription Plans</h3>
      
      <div className="space-y-4">
        {[
          { plan: 'Pro Plan', pct: 65, users: 145, color: 'bg-blue-600', light: 'bg-blue-100' },
          { plan: 'Basic Plan', pct: 25, users: 56, color: 'bg-indigo-600', light: 'bg-indigo-100' },
          { plan: 'Trial', pct: 10, users: 22, color: 'bg-emerald-500', light: 'bg-emerald-100' },
        ].map((item) => (
          <div key={item.plan}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-slate-700">{item.plan}</p>
              <p className="text-xs font-bold text-slate-900">{item.pct}% <span className="text-slate-400 font-medium">({item.users})</span></p>
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
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Users Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            High-level metrics and analytics across all registered institute owners.
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
        <UserGrowthChart />
        <RecentActivityList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Need to manage permissions?</h3>
            <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
              Super Admin can assign module permissions to different system roles. Navigate to the Permissions tab to configure fine-grained access control.
            </p>
            <button className="px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
              Manage Roles <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <SubscriptionDistribution />
      </div>
    </div>
  );
}
