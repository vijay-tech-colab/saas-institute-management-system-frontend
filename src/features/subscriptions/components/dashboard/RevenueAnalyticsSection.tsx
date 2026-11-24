'use client';

import React, { useState } from 'react';
import { AreaChart } from '../shared/Charts';
import { mockRevenueData } from '../../data/mock-data';
import { Download } from 'lucide-react';

export function RevenueAnalyticsSection() {
  const [metric, setMetric] = useState<'mrr' | 'arr' | 'renewals' | 'refunds'>('mrr');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('1y');

  // Using mock data mapping to simulate different metrics
  const getChartData = () => {
    return mockRevenueData.map(d => ({
      label: d.month,
      value: metric === 'mrr' ? d.mrr :
             metric === 'arr' ? d.mrr * 12 :
             metric === 'renewals' ? d.newSubscriptions * 1000 :
             d.churned * 500
    }));
  };

  const getColor = () => {
    switch (metric) {
      case 'mrr': return '#0d9488'; // Nordic Teal Primary
      case 'arr': return '#0284c7'; // Info Sky
      case 'renewals': return '#16a34a'; // Success Emerald
      case 'refunds': return '#dc2626'; // Danger Rose
      default: return '#0d9488';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">Revenue Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Track your recurring revenue, renewals, and refunds.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
            {(['mrr', 'arr', 'renewals', 'refunds'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  metric === m ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m === 'mrr' ? 'MRR' : m === 'arr' ? 'ARR' : m}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
            {(['7d', '30d', '90d', '1y'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeframe === t ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AreaChart
        data={getChartData()}
        height={320}
        color={getColor()}
        gradientId={`rev-chart-${metric}`}
        prefix="₹"
      />
    </div>
  );
}

