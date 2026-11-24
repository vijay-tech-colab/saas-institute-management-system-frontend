"use client"

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlanShare {
  name: string;
  revenue: number;
  share: number;
  color: string;
  textClass: string;
}

const PLAN_BREAKDOWN_7M: PlanShare[] = [
  {
    name: 'Enterprise Plan',
    revenue: 164400,
    share: 48,
    color: '#0d9488',
    textClass: 'text-teal-600',
  },
  {
    name: 'Pro / Growth',
    revenue: 102750,
    share: 30,
    color: '#38bdf8',
    textClass: 'text-sky-600',
  },
  {
    name: 'Starter Plan',
    revenue: 54800,
    share: 16,
    color: '#f59e0b',
    textClass: 'text-amber-600',
  },
  {
    name: 'Add-ons & Trials',
    revenue: 20550,
    share: 6,
    color: '#a78bfa',
    textClass: 'text-violet-600',
  },
];

const PLAN_BREAKDOWN_YEAR: PlanShare[] = [
  {
    name: 'Enterprise Plan',
    revenue: 1972800,
    share: 48,
    color: '#0d9488',
    textClass: 'text-teal-600',
  },
  {
    name: 'Pro / Growth',
    revenue: 1233000,
    share: 30,
    color: '#38bdf8',
    textClass: 'text-sky-600',
  },
  {
    name: 'Starter Plan',
    revenue: 657600,
    share: 16,
    color: '#f59e0b',
    textClass: 'text-amber-600',
  },
  {
    name: 'Add-ons & Trials',
    revenue: 246600,
    share: 6,
    color: '#a78bfa',
    textClass: 'text-violet-600',
  },
];

export function TopPlanCategories() {
  const [period, setPeriod] = useState<'7m' | 'year'>('7m');
  const data = period === '7m' ? PLAN_BREAKDOWN_7M : PLAN_BREAKDOWN_YEAR;
  const totalValue = period === '7m' ? '₹3,42,500' : '₹41,10,000';
  const totalCaption = period === '7m' ? 'Monthly MRR' : 'Annual ARR';

  return (
    <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight truncate">
          Top Plan Categories
        </h3>

        <Select value={period} onValueChange={(v) => setPeriod(v as '7m' | 'year')}>
          <SelectTrigger className="h-8 w-[124px] rounded-lg border-slate-200 bg-white text-[11.5px] font-medium text-slate-600 shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="7m">Last 7 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Segmented Donut Chart */}
      <div className="relative h-[196px] w-full flex items-center justify-center my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={5}
              cornerRadius={8}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as PlanShare;
                  return (
                    <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-slate-300 mt-0.5 tabular-nums">
                        ₹{item.revenue.toLocaleString('en-IN')} ({item.share}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight tabular-nums leading-tight">
            {totalValue}
          </span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">
            {totalCaption}
          </span>
        </div>
      </div>

      {/* 4-Row Category Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        {data.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-3 h-3 rounded-[4px] shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-800 truncate">{item.name}</span>
            </div>
            <span className="text-slate-500 font-medium tabular-nums text-right">
              ₹{item.revenue.toLocaleString('en-IN')}
            </span>
            <span className={`font-semibold tabular-nums w-8 text-right ${item.textClass}`}>
              {item.share}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
