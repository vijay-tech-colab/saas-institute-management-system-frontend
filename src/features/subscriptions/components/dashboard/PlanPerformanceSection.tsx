'use client';

import React, { useState } from 'react';
import { DonutChart, BarChart } from '../shared/Charts';
import { CustomSelect } from '../shared/UIComponents';
import { mockPlans } from '../../data/mock-data';
import { Activity, BarChart2 } from 'lucide-react';

const PLAN_COLORS = ['#0d9488', '#0284c7', '#16a34a', '#f59e0b', '#64748b'];

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* Subscription Distribution */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight mb-5 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" /> Subscription Distribution
        </h2>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-5">
            <DonutChart data={donutData} size={180} thickness={32} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-semibold text-slate-900 tabular-nums">{totalSubscribers}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Total Subs</p>
            </div>
          </div>
          
          <div className="w-full space-y-2">
            {donutData.map((d, i) => (
              <div key={i} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-default">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: d.color }} />
                  <span className="text-[13px] font-medium text-slate-700">{d.label}</span>
                </div>
                <div className="flex items-center gap-3 tabular-nums">
                  <span className="text-[13px] font-semibold text-slate-900">{d.value}</span>
                  <span className="text-xs font-medium text-slate-500 w-8 text-right group-hover:text-slate-700 transition-colors">
                    {((d.value / totalSubscribers) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Performance (Revenue & Stats) */}
      <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" /> Plan Performance
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
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Highest Revenue</span>
            <span className="text-[13px] font-semibold text-emerald-700 mt-1">Growth Plan</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Most Upgrades</span>
            <span className="text-[13px] font-semibold text-primary mt-1">Professional</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Highest Churn</span>
            <span className="text-[13px] font-semibold text-rose-700 mt-1">Starter Plan</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Conversion Rate</span>
            <span className="text-[13px] font-semibold text-slate-900 mt-1">68.4% (Avg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

