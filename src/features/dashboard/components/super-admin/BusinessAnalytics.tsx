"use client"

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ArrowUpRight, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const YEARLY_REVENUE_DATA = [
  { name: 'Jan', mrr: 185000, institutes: 120 },
  { name: 'Feb', mrr: 285000, institutes: 150 },
  { name: 'Mar', mrr: 315000, institutes: 175 },
  { name: 'Apr', mrr: 195000, institutes: 210 },
  { name: 'May', mrr: 278000, institutes: 245 },
  { name: 'Jun', mrr: 145000, institutes: 280 },
  { name: 'Jul', mrr: 235000, institutes: 315 },
  { name: 'Aug', mrr: 382000, institutes: 340 },
  { name: 'Sep', mrr: 248000, institutes: 370 },
  { name: 'Oct', mrr: 295000, institutes: 395 },
  { name: 'Nov', mrr: 342500, institutes: 420 },
  { name: 'Dec', mrr: 265000, institutes: 445 },
];

export function BusinessAnalytics() {
  const [range, setRange] = useState<'year' | '6m'>('year');

  const chartData = range === '6m' ? YEARLY_REVENUE_DATA.slice(6) : YEARLY_REVENUE_DATA;
  const totalLabel = range === '6m' ? '₹17,68,500' : '₹31,71,000';
  const growthLabel = range === '6m' ? '22.1%' : '18.4%';

  return (
    <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-2xs flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 tracking-tight">
            Revenue Overview
          </p>
          <div className="mt-1 flex items-baseline gap-2.5 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight tabular-nums">
              {totalLabel}
            </h3>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="text-slate-500">From Last Year</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70 tabular-nums">
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              {growthLabel}
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="shrink-0">
          <Select value={range} onValueChange={(v) => setRange(v as 'year' | '6m')}>
            <SelectTrigger className="h-8.5 w-[140px] rounded-xl border-slate-200 bg-white text-xs font-medium text-slate-700">
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gradient Vertical Bar Chart */}
      <div className="h-60 sm:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 6, left: -12, bottom: 0 }}
            barCategoryGap="24%"
          >
            <defs>
              <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.95} />
                <stop offset="55%" stopColor="#14b8a6" stopOpacity={0.62} />
                <stop offset="100%" stopColor="#ccfbf1" stopOpacity={0.14} />
              </linearGradient>
              <linearGradient id="revenueBarActiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f766e" stopOpacity={1} />
                <stop offset="60%" stopColor="#0d9488" stopOpacity={0.75} />
                <stop offset="100%" stopColor="#99f6e4" stopOpacity={0.22} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => {
                const isHighlight = payload.value === 'Nov';
                return (
                  <text
                    x={x}
                    y={Number(y) + 12}
                    textAnchor="middle"
                    fill={isHighlight ? '#0f172a' : '#64748b'}
                    fontSize={11}
                    fontWeight={isHighlight ? 700 : 500}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(val) => (val === 0 ? '00' : `₹${Math.round(val / 1000)}K`)}
            />
            <Tooltip
              cursor={{ fill: 'rgba(13, 148, 136, 0.05)', radius: 8 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const row = payload[0].payload as (typeof YEARLY_REVENUE_DATA)[number];
                  return (
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-800">
                      <p className="font-semibold text-slate-200">{label} 2026</p>
                      <p className="text-teal-300 font-bold mt-0.5 tabular-nums">
                        MRR: ₹{row.mrr.toLocaleString('en-IN')}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5 tabular-nums">
                        New Institutes: {row.institutes}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="mrr" radius={[8, 8, 4, 4]} maxBarSize={36}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={
                    entry.name === 'Nov'
                      ? 'url(#revenueBarActiveGradient)'
                      : 'url(#revenueBarGradient)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
