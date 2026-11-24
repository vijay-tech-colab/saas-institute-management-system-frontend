'use client';

import React from 'react';
import {
  NotchedStatCard,
  type StatCardTone,
} from '@/components/ui/notched-stat-card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  tone?: StatCardTone;
  prefix?: string;
  suffix?: string;
  sparklineData?: number[];
  delay?: number;
  isLoading?: boolean;
}

function inferTone(iconColor?: string, iconBg?: string): StatCardTone {
  const combined = `${iconColor ?? ''} ${iconBg ?? ''}`.toLowerCase();
  if (combined.includes('emerald') || combined.includes('green')) return 'success';
  if (combined.includes('amber') || combined.includes('orange') || combined.includes('yellow')) return 'warning';
  if (combined.includes('rose') || combined.includes('red')) return 'danger';
  if (combined.includes('sky') || combined.includes('blue')) return 'info';
  if (combined.includes('primary') || combined.includes('teal') || combined.includes('indigo')) return 'primary';
  return 'neutral';
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  iconColor,
  iconBg,
  tone,
  prefix = '',
  suffix = '',
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 min-h-[108px] flex flex-col justify-between">
        <div className="h-3.5 w-24 bg-slate-200 rounded animate-pulse pr-12" />
        <div className="h-6 w-20 bg-slate-200 rounded animate-pulse my-2" />
        <div className="h-4 w-28 bg-slate-100 rounded-full animate-pulse" />
      </div>
    );
  }

  const formattedValue =
    typeof value === 'number' ? value.toLocaleString('en-IN') : value;

  const resolvedTone = tone ?? inferTone(iconColor, iconBg);

  return (
    <NotchedStatCard
      title={title}
      value={`${prefix}${formattedValue}${suffix}`}
      icon={icon}
      tone={resolvedTone}
      trend={trend}
      compareLabel={subtitle ?? trendLabel}
      compact
    />
  );
}
