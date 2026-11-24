'use client';

import React from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { Shield, Users, Activity, Lock, AlertOctagon, RefreshCcw, Download, Calendar, Filter, Database, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockLoginLogs, mockApiLogs, mockSecurityEvents } from '../data/mock-data';

function SecurityScoreCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden text-white flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 w-56 h-56 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-teal-200 text-xs font-semibold mb-1 uppercase tracking-wider">Security Score</p>
          <h2 className="text-3xl font-semibold text-white tabular-nums">92<span className="text-lg text-slate-400 font-medium">/100</span></h2>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
          <Shield className="w-5 h-5 text-teal-300" />
        </div>
      </div>
      <div className="relative z-10 mt-6">
        <p className="text-[13px] text-slate-200 leading-relaxed mb-4">
          Your platform security is <span className="font-semibold text-emerald-400">Healthy</span>. Automated monitors detected no major anomalies in the last 24 hours.
        </p>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-emerald-400 h-2 rounded-full w-[92%]"></div>
        </div>
      </div>
    </div>
  );
}

function RiskDistributionChart() {
  const risks = [
    { label: 'Low Risk', value: 85, color: 'bg-emerald-500' },
    { label: 'Medium Risk', value: 12, color: 'bg-amber-500' },
    { label: 'High Risk', value: 2, color: 'bg-orange-500' },
    { label: 'Critical', value: 1, color: 'bg-rose-500' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs h-full flex flex-col">
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight mb-5">Risk Distribution</h3>
      <div className="flex-1 flex items-center gap-6">
        <div className="w-28 h-28 rounded-full border-[10px] border-slate-100 relative flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border-[10px] border-emerald-500 border-t-transparent border-l-transparent rotate-45"></div>
          <div className="absolute inset-0 rounded-full border-[10px] border-amber-500 border-b-transparent border-r-transparent -rotate-12"></div>
          <div className="text-center">
            <span className="block text-xl font-semibold text-slate-900 tabular-nums">10k+</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Events</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {risks.map(r => (
            <div key={r.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-600">{r.label}</span>
                <span className="font-semibold text-slate-900 tabular-nums">{r.value}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className={`${r.color} h-full rounded-full`} style={{ width: `${r.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentAlerts() {
  const alerts = mockSecurityEvents.slice(0, 4);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">Latest Security Alerts</h3>
        <button className="text-xs font-semibold text-primary hover:text-primary-hover cursor-pointer">View All</button>
      </div>
      <div className="flex-1 flex flex-col gap-2.5">
        {alerts.map((alert, i) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className={`p-2 rounded-lg shrink-0 ${alert.severity === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-200/70' : alert.severity === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200/70' : 'bg-amber-50 text-amber-600 border border-amber-200/70'}`}>
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-900 mb-0.5 truncate">{alert.eventType}</p>
              <p className="text-[11.5px] text-slate-500 leading-snug line-clamp-1">{alert.description}</p>
              <p className="text-[10.5px] font-medium text-slate-400 mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function OverviewDashboard() {
  const totalLogins = mockLoginLogs.length;
  const failedLogins = mockLoginLogs.filter(l => l.status === 'failed').length;
  const blockedLogins = mockLoginLogs.filter(l => l.status === 'blocked').length;
  const apiRequests = mockApiLogs.length;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-5">
      <PageHeader 
        title="Audit Logs & Security" 
        description="Comprehensive monitoring of system activities, API requests, and security events."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Overview' }]}
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
          
          <button className="h-9 w-9 inline-flex items-center justify-center bg-primary-light text-primary border border-primary-border rounded-lg hover:bg-primary/15 transition-colors group cursor-pointer">
            <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </PageHeader>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard title="Total Log Entries" value={142058} icon={<Database size={18} />} tone="primary" trend={12.5} trendLabel="vs last week" />
        <StatCard title="Today's Logins" value={totalLogins} icon={<Users size={18} />} tone="info" trend={8.2} trendLabel="vs yesterday" />
        <StatCard title="Failed Login Attempts" value={failedLogins} icon={<Lock size={18} />} tone="danger" trend={-14.3} trendLabel="vs yesterday" />
        <StatCard title="API Requests Today" value={apiRequests} icon={<Activity size={18} />} tone="success" trend={5.4} trendLabel="vs yesterday" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard title="Suspicious Activities" value={mockSecurityEvents.length} icon={<AlertOctagon size={18} />} tone="warning" trend={2.1} />
        <StatCard title="Active Sessions" value={234} icon={<Activity size={18} />} tone="success" />
        <StatCard title="Blocked IP Addresses" value={blockedLogins} icon={<Shield size={18} />} tone="danger" />
        <StatCard title="Critical Events" value={5} icon={<AlertTriangle size={18} />} tone="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SecurityScoreCard />
        </div>
        <div className="lg:col-span-1">
          <RiskDistributionChart />
        </div>
        <div className="lg:col-span-1">
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}

