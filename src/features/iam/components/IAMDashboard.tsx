'use client';

import React from 'react';
import { Shield, ShieldAlert, Users, Key, Lock, Activity, AlertTriangle, Fingerprint } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { mockIAMStats, mockRecentActivities, mockSecurityAlerts, mockChartData } from '../data/mock-iam-data';

export function IAMDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="IAM Dashboard"
        description="Monitor platform security, user access trends, and policy violations."
        breadcrumbs={[{ label: 'Administration' }, { label: 'IAM' }, { label: 'Dashboard' }]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Roles" value={mockIAMStats.totalRoles} icon={<Shield size={20} />} iconColor="text-indigo-600" iconBg="bg-indigo-50" trend={12} trendLabel="vs last month" />
        <StatCard title="Active Users" value={mockIAMStats.activeUsers} icon={<Users size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={5} trendLabel="vs last month" />
        <StatCard title="Policy Violations" value={mockIAMStats.policyViolations} icon={<ShieldAlert size={20} />} iconColor="text-rose-600" iconBg="bg-rose-50" trend={-15} trendLabel="vs last month" />
        <StatCard title="Active Sessions" value={mockIAMStats.activeSessions} icon={<Activity size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={8} trendLabel="vs last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">Authentication Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="logins" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLogins)" name="Successful Logins" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">Security Events & Violations</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="failed" stackId="a" fill="#f43f5e" radius={[0, 0, 4, 4]} name="Failed Logins" barSize={32} />
                  <Bar dataKey="policyViolations" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Policy Violations" barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> Security Alerts
              </h3>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{mockSecurityAlerts.length} New</span>
            </div>
            <div className="p-0">
              {mockSecurityAlerts.map((alert, i) => (
                <div key={alert.id} className={`p-4 ${i !== mockSecurityAlerts.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors`}>
                  <p className="text-sm text-slate-700 font-medium leading-snug">{alert.message}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{alert.time}</p>
                </div>
              ))}
            </div>
            <button className="p-3 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30 hover:bg-indigo-50 transition-colors mt-auto border-t border-slate-100">
              View All Alerts
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-slate-400" /> Recent Activities
              </h3>
            </div>
            <div className="p-0">
              {mockRecentActivities.map((act, i) => (
                <div key={act.id} className={`p-4 flex gap-3 ${i !== mockRecentActivities.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    act.type === 'security' ? 'bg-rose-100 text-rose-600' :
                    act.type === 'create' ? 'bg-emerald-100 text-emerald-600' :
                    act.type === 'delete' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">
                      <span className="font-semibold">{act.user}</span> {act.action}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{act.target}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
