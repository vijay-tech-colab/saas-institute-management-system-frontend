"use client"

import React from 'react';
import { 
  Building2, 
  IndianRupee, 
  Users, 
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

interface KPIItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  secondaryText: string;
  href: string;
  icon: React.ElementType;
}

const KPIS: KPIItem[] = [
  {
    id: 'institutes',
    title: 'Active Institutes',
    value: '2,190',
    trend: '+8.2%',
    trendLabel: 'vs last month',
    secondaryText: '2,458 Total Onboarded',
    href: '/dashboard/tenants',
    icon: Building2,
  },
  {
    id: 'mrr',
    title: 'Monthly Revenue (MRR)',
    value: '₹3,42,500',
    trend: '+18.4%',
    trendLabel: 'vs last month',
    secondaryText: '₹41.1L Projected ARR',
    href: '/dashboard/subscriptions',
    icon: IndianRupee,
  },
  {
    id: 'students',
    title: 'Total Platform Students',
    value: '2.4M',
    trend: '+15.0%',
    trendLabel: 'YoY growth',
    secondaryText: '845k Active Daily',
    href: '/dashboard/analytics',
    icon: Users,
  },
  {
    id: 'uptime',
    title: 'System Availability',
    value: '99.98%',
    trend: '+0.04%',
    trendLabel: 'last 30 days',
    secondaryText: 'All 6 Services Operational',
    href: '/dashboard/logs',
    icon: Activity,
  },
];

export function TopKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Link
            key={kpi.id}
            href={kpi.href}
            className="bg-white p-4 sm:p-5 rounded-xl border border-border shadow-xs hover:border-primary-border hover:shadow-sm transition-all duration-200 group flex flex-col justify-between"
          >
            {/* Top row: Icon + Trend Pill */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary-light border border-primary-border flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                <Icon className="w-4.5 h-4.5 transition-colors" />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                <ArrowUpRight className="w-3 h-3" />
                {kpi.trend}
              </span>
            </div>

            {/* Middle: Title + Value */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                {kpi.title}
              </p>
              <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                {kpi.value}
              </h3>
            </div>

            {/* Bottom: Secondary text & Time period */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-normal text-slate-500 truncate mr-2">
                {kpi.secondaryText}
              </span>
              <span className="text-[11px] text-slate-400 font-normal shrink-0">
                {kpi.trendLabel}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
