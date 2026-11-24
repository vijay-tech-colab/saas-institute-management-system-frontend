"use client"

import React from 'react';
import {
  IndianRupee,
  Building2,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  NotchedStatCard,
  type StatCardTone,
} from '@/components/ui/notched-stat-card';

export type DashboardPeriod = '7d' | '30d' | '90d' | 'year';

interface KPIItem {
  id: string;
  title: string;
  tone: StatCardTone;
  values: Record<DashboardPeriod, { value: string; delta: string; compareLabel: string }>;
  href: string;
  icon: React.ElementType;
}

const KPIS: KPIItem[] = [
  {
    id: 'mrr',
    title: 'Monthly Revenue',
    tone: 'success', // Financial / Revenue inflow -> Green
    values: {
      '7d': { value: '₹86,400', delta: '14.2%', compareLabel: 'Last Week' },
      '30d': { value: '₹3,42,500', delta: '18.4%', compareLabel: 'Last Month' },
      '90d': { value: '₹9,84,200', delta: '21.6%', compareLabel: 'Last Quarter' },
      year: { value: '₹41,10,000', delta: '24.8%', compareLabel: 'Last Year' },
    },
    href: '/dashboard/subscriptions',
    icon: IndianRupee,
  },
  {
    id: 'institutes',
    title: 'Active Institutes',
    tone: 'primary', // Core active platform entities -> Nordic Teal
    values: {
      '7d': { value: '2,190', delta: '3.4%', compareLabel: 'Last Week' },
      '30d': { value: '2,190', delta: '12.9%', compareLabel: 'Last Month' },
      '90d': { value: '2,190', delta: '16.5%', compareLabel: 'Last Quarter' },
      year: { value: '2,190', delta: '28.1%', compareLabel: 'Last Year' },
    },
    href: '/dashboard/tenants/list',
    icon: Building2,
  },
  {
    id: 'students',
    title: 'Platform Students',
    tone: 'info', // User reach / informational scale -> Sky Blue
    values: {
      '7d': { value: '2.4M', delta: '4.1%', compareLabel: 'Last Week' },
      '30d': { value: '2.4M', delta: '15.0%', compareLabel: 'Last Month' },
      '90d': { value: '2.4M', delta: '19.2%', compareLabel: 'Last Quarter' },
      year: { value: '2.4M', delta: '34.6%', compareLabel: 'Last Year' },
    },
    href: '/dashboard/tenants',
    icon: Users,
  },
  {
    id: 'growth',
    title: 'Revenue Growth',
    tone: 'neutral', // Rate / benchmark percentage -> Clean Slate
    values: {
      '7d': { value: '28.4%', delta: '3.8%', compareLabel: 'Last Week' },
      '30d': { value: '32.5%', delta: '6.2%', compareLabel: 'Last Month' },
      '90d': { value: '35.1%', delta: '8.4%', compareLabel: 'Last Quarter' },
      year: { value: '38.9%', delta: '11.2%', compareLabel: 'Last Year' },
    },
    href: '/dashboard/subscriptions/invoices',
    icon: TrendingUp,
  },
];

export function TopKPIs({ period = '30d' }: { period?: DashboardPeriod }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        const current = kpi.values[period];

        return (
          <NotchedStatCard
            key={kpi.id}
            title={kpi.title}
            value={current.value}
            tone={kpi.tone}
            trend={current.delta}
            compareLabel={current.compareLabel}
            href={kpi.href}
            icon={<Icon />}
          />
        );
      })}
    </div>
  );
}
