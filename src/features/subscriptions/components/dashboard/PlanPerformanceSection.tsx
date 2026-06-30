'use client';

import React, { useState } from 'react';
import { DonutChart, BarChart } from '../shared/Charts';
import { CustomSelect } from '../shared/UIComponents';
import { mockPlans } from '../../data/mock-data';
import { Activity, BarChart2 } from 'lucide-react';

const PLAN_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#64748B'];

export function PlanPerformanceSection() {
  const [filter, setFilter] = useState('revenue');
  const activePlans = mockPlans.filter(p => p.status !== 'inactive').slice(0, 5);

  const donutData = activePlans.map((p, i) => ({
    label: p.name,
    value: p.subscribersCount,
    color: PLAN_COLORS[i] || '#94A3B8',
  }));
  const totalSubscribers = donutData.reduce((sum, d) => sum + d.value, 0);

  const barChartData = activePlans.map((p, i) => ({
    label: p.name,
    value: p.monthlyPrice * p.subscribersCount,
    color: PLAN_COLORS[i] || '#94A3B8',
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Subscription Distribution */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-500" /> Subscription Distribution
        </h2>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <DonutChart data={donutData} size={180} thickness={32} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-slate-900">{totalSubscribers}</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Total Subs</p>
            </div>
          </div>
          
          <div className="w-full space-y-2.5">
            {donutData.map((d, i) => (
              <div key={i} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-default">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                  <span className="text-sm font-medium text-slate-700">{d.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">{d.value}</span>
                  <span className="text-xs font-semibold text-slate-400 w-8 text-right group-hover:text-slate-600 transition-colors">
                    {((d.value / totalSubscribers) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Performance (Revenue & Stats) */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-500" /> Plan Performance
          </h2>
          <CustomSelect 
            options={[
              { label: 'Revenue Generated', value: 'revenue' },
              { label: 'Renewals vs Upgrades', value: 'renewals' },
              { label: 'Churn by Plan', value: 'churn' }
            ]}
            value={filter}
            onChange={setFilter}
          />
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <BarChart data={barChartData} height={240} />
        </div>
        
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Highest Revenue</span>
            <span className="text-sm font-bold text-emerald-600 mt-1">Growth Plan</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Most Upgrades</span>
            <span className="text-sm font-bold text-blue-600 mt-1">Professional</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Highest Churn</span>
            <span className="text-sm font-bold text-rose-600 mt-1">Starter Plan</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Conversion Rate</span>
            <span className="text-sm font-bold text-indigo-600 mt-1">68.4% (Avg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
