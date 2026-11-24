'use client';

import React from 'react';
import { mockTenantHealth, mockGatewayMetrics } from '../../data/mock-data';
import { ShieldAlert, Server, Smartphone, Zap } from 'lucide-react';
import { ProgressBar } from '../shared/UIComponents';
import Link from 'next/link';

export function InsightsAndHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      
      {/* Tenant Health */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" /> Tenant Health
          </h2>
          <Link href="/dashboard/subscriptions/health" className="text-xs font-semibold text-primary hover:underline">View All</Link>
        </div>
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {mockTenantHealth.slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-[13px] shrink-0 ${
                  t.healthScore >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70' :
                  t.healthScore >= 60 ? 'bg-amber-50 text-amber-700 border border-amber-200/70' :
                  'bg-rose-50 text-rose-700 border border-rose-200/70'
                }`}>
                  {t.healthScore}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-[13px] font-semibold text-slate-900 truncate">{t.instituteName}</p>
                    <span className="text-xs text-slate-500">{t.activeUsers} Users</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-1.5">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Storage</p>
                      <ProgressBar value={t.storageUsage} max={100} showLabel={false} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">API</p>
                      <ProgressBar value={t.apiUsage} max={100} showLabel={false} color="bg-sky-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gateway Metrics & Insights */}
      <div className="flex flex-col gap-4 sm:gap-5">
        
        {/* Gateway Metrics */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
          <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" /> Payment Gateways
            </h2>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {mockGatewayMetrics.map(gw => (
              <div key={gw.id} className="p-3 border border-slate-200/75 rounded-xl hover:border-slate-300 transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-semibold text-slate-800 text-[13px]">{gw.gateway}</span>
                  <span className="text-xs font-semibold text-emerald-700">{gw.successRate}% Success</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                  <span>₹{(gw.revenue / 1000).toFixed(1)}k processed</span>
                  <span className="text-rose-600">{gw.failureRate}% Fail</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-sky-50/70 border border-sky-200/75 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white border border-sky-200/80 rounded-xl flex items-center justify-center text-sky-700 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-sky-700 uppercase tracking-wide">App Usage</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">78%</p>
            </div>
          </div>
          <div className="bg-primary-light border border-primary-border rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white border border-primary-border rounded-xl flex items-center justify-center text-primary shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-primary uppercase tracking-wide">Automation</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">42%</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

