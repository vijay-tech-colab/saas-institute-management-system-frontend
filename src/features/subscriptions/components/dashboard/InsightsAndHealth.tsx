'use client';

import React from 'react';
import { mockTenantHealth, mockGatewayMetrics } from '../../data/mock-data';
import { ShieldAlert, Server, Smartphone, Zap } from 'lucide-react';
import { ProgressBar } from '../shared/UIComponents';
import Link from 'next/link';

export function InsightsAndHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
      {/* Tenant Health */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-500" /> Tenant Health
          </h2>
          <Link href="/dashboard/subscriptions/health" className="text-xs font-semibold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {mockTenantHealth.slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  t.healthScore >= 90 ? 'bg-emerald-50 text-emerald-700' :
                  t.healthScore >= 60 ? 'bg-amber-50 text-amber-700' :
                  'bg-rose-50 text-rose-700'
                }`}>
                  {t.healthScore}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">{t.instituteName}</p>
                    <span className="text-xs text-slate-500">{t.activeUsers} Users</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Storage</p>
                      <ProgressBar value={t.storageUsage} max={100} showLabel={false} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">API</p>
                      <ProgressBar value={t.apiUsage} max={100} showLabel={false} color="bg-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gateway Metrics & Insights */}
      <div className="flex flex-col gap-6">
        
        {/* Gateway Metrics */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-500" /> Payment Gateways
            </h2>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockGatewayMetrics.map(gw => (
              <div key={gw.id} className="p-3 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-700 text-sm">{gw.gateway}</span>
                  <span className="text-xs font-bold text-emerald-600">{gw.successRate}% Success</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹{(gw.revenue / 1000).toFixed(1)}k processed</span>
                  <span className="text-rose-500">{gw.failureRate}% Fail</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-600/80 uppercase">App Usage</p>
              <p className="text-lg font-bold text-indigo-900">78%</p>
            </div>
          </div>
          <div className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center text-fuchsia-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-fuchsia-600/80 uppercase">Automation</p>
              <p className="text-lg font-bold text-fuchsia-900">42%</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
