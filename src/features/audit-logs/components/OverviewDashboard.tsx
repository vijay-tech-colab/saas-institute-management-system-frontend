'use client';

import React from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { Shield, Users, Activity, Lock, AlertOctagon, RefreshCcw, Download, Calendar, Filter, Database, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockLoginLogs, mockApiLogs, mockSecurityEvents } from '../data/mock-data';

function SecurityScoreCard() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-800 rounded-2xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-blue-200 text-sm font-semibold mb-1 uppercase tracking-wider">AI Security Score</p>
          <h2 className="text-4xl font-black text-white">92<span className="text-xl text-blue-300 font-medium">/100</span></h2>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
          <Shield className="w-6 h-6 text-blue-300" />
        </div>
      </div>
      <div className="relative z-10 mt-8">
        <p className="text-sm text-blue-100 leading-relaxed mb-4">
          Your platform security is <span className="font-bold text-emerald-400">Excellent</span>. Our AI models detected no major anomalies in the last 24 hours.
        </p>
        <div className="w-full bg-blue-950/50 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full w-[92%]"></div>
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
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-800 mb-6">Risk Distribution</h3>
      <div className="flex-1 flex items-center gap-6">
        <div className="w-32 h-32 rounded-full border-[12px] border-slate-50 relative flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-t-transparent border-l-transparent rotate-45"></div>
          <div className="absolute inset-0 rounded-full border-[12px] border-amber-500 border-b-transparent border-r-transparent -rotate-12"></div>
          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900">10k+</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Events</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {risks.map(r => (
            <div key={r.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">{r.label}</span>
                <span className="font-bold text-slate-900">{r.value}%</span>
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
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-800">Latest Security Alerts</h3>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className={`p-2 rounded-lg shrink-0 ${alert.severity === 'critical' ? 'bg-rose-100 text-rose-600' : alert.severity === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">{alert.eventType}</p>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">{alert.description}</p>
              <p className="text-[10px] font-semibold text-slate-400 mt-1.5">{new Date(alert.timestamp).toLocaleTimeString()}</p>
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
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <PageHeader 
        title="Audit Logs & Security" 
        description="Comprehensive monitoring of system activities, API requests, and security events."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Overview' }]}
      >
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
      </PageHeader>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Log Entries" value={142058} icon={<Database size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={12.5} trendLabel="vs last week" />
        <StatCard title="Today's Logins" value={totalLogins} icon={<Users size={20} />} iconColor="text-indigo-600" iconBg="bg-indigo-50" trend={8.2} trendLabel="vs yesterday" />
        <StatCard title="Failed Login Attempts" value={failedLogins} icon={<Lock size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" trend={-14.3} trendLabel="vs yesterday" />
        <StatCard title="API Requests Today" value={apiRequests} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={5.4} trendLabel="vs yesterday" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Suspicious Activities" value={mockSecurityEvents.length} icon={<AlertOctagon size={20} />} iconColor="text-orange-600" iconBg="bg-orange-50" trend={2.1} />
        <StatCard title="Active Sessions" value={234} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Blocked IP Addresses" value={blockedLogins} icon={<Shield size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
        <StatCard title="Critical Events" value={5} icon={<AlertTriangle size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" />
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
