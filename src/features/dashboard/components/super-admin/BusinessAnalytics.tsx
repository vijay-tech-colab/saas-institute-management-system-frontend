"use client"

import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { TrendingUp, Building2, Calendar } from 'lucide-react';
import Link from 'next/link';

const REVENUE_DATA = [
  { name: 'Jan', mrr: 180000, institutes: 120 },
  { name: 'Feb', mrr: 210000, institutes: 150 },
  { name: 'Mar', mrr: 225000, institutes: 175 },
  { name: 'Apr', mrr: 250000, institutes: 210 },
  { name: 'May', mrr: 275000, institutes: 245 },
  { name: 'Jun', mrr: 295000, institutes: 280 },
  { name: 'Jul', mrr: 310000, institutes: 315 },
  { name: 'Aug', mrr: 320000, institutes: 340 },
  { name: 'Sep', mrr: 330000, institutes: 370 },
  { name: 'Oct', mrr: 338000, institutes: 395 },
  { name: 'Nov', mrr: 342500, institutes: 420 },
];

export function BusinessAnalytics() {
  const [metricTab, setMetricTab] = useState<'mrr' | 'institutes'>('mrr');
  const [timeRange, setTimeRange] = useState('2024');

  return (
    <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 tracking-tight">
              Platform Growth & Revenue Trends
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              +18.4% YoY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical monthly recurring revenue and active tenant growth
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/60">
            <button
              type="button"
              onClick={() => setMetricTab('mrr')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                metricTab === 'mrr'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MRR Trend
            </button>
            <button
              type="button"
              onClick={() => setMetricTab('institutes')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                metricTab === 'institutes'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Institutes Growth
            </button>
          </div>

          <Link
            href="/dashboard/subscriptions"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors ml-2 hidden sm:inline-block"
          >
            View Subscriptions &rarr;
          </Link>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metricTab === 'mrr' ? (
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
                        <p className="font-semibold">{label}</p>
                        <p className="text-teal-300 font-bold mt-0.5">
                          MRR: ₹{Number(payload[0].value).toLocaleString('en-IN')}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMrr)"
              />
            </AreaChart>
          ) : (
            <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
                        <p className="font-semibold">{label}</p>
                        <p className="text-teal-300 font-bold mt-0.5">
                          New Institutes: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="institutes" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Current Average Revenue Per User (ARPU): ₹1,560 / institute</span>
        </span>
        <span className="font-medium">Audited Q4 Financials</span>
      </div>
    </div>
  );
}
