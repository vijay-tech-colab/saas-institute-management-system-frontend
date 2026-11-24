"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatCardTone =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral';

interface ToneStyle {
  card: string;
  hoverCard: string;
  notchStroke: string;
  hoverNotchStroke: string;
  icon: string;
  hoverIcon: string;
}

export const STAT_CARD_TONES: Record<StatCardTone, ToneStyle> = {
  primary: {
    card: 'bg-gradient-to-br from-[#f0fdfa] via-[#f0fdfa]/75 to-white border-[#bdeee5]',
    hoverCard: 'group-hover:border-[#8be0d2]',
    notchStroke: 'text-[#bdeee5]',
    hoverNotchStroke: 'group-hover:text-[#8be0d2]',
    icon: 'bg-[#f0fdfa] border-[#bdeee5] text-primary',
    hoverIcon: 'group-hover:bg-primary group-hover:text-white group-hover:border-primary',
  },
  success: {
    card: 'bg-gradient-to-br from-emerald-50/85 via-emerald-50/40 to-white border-[#bfead5]',
    hoverCard: 'group-hover:border-[#8cdcb6]',
    notchStroke: 'text-[#bfead5]',
    hoverNotchStroke: 'group-hover:text-[#8cdcb6]',
    icon: 'bg-emerald-50 border-[#bfead5] text-emerald-700',
    hoverIcon: 'group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
  },
  info: {
    card: 'bg-gradient-to-br from-sky-50/85 via-sky-50/40 to-white border-[#c3e2f7]',
    hoverCard: 'group-hover:border-[#93cdf2]',
    notchStroke: 'text-[#c3e2f7]',
    hoverNotchStroke: 'group-hover:text-[#93cdf2]',
    icon: 'bg-sky-50 border-[#c3e2f7] text-sky-700',
    hoverIcon: 'group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600',
  },
  warning: {
    card: 'bg-gradient-to-br from-amber-50/85 via-amber-50/40 to-white border-[#f6dfa8]',
    hoverCard: 'group-hover:border-[#edc874]',
    notchStroke: 'text-[#f6dfa8]',
    hoverNotchStroke: 'group-hover:text-[#edc874]',
    icon: 'bg-amber-50 border-[#f6dfa8] text-amber-700',
    hoverIcon: 'group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600',
  },
  danger: {
    card: 'bg-gradient-to-br from-rose-50/85 via-rose-50/40 to-white border-[#f7cad0]',
    hoverCard: 'group-hover:border-[#efa2ac]',
    notchStroke: 'text-[#f7cad0]',
    hoverNotchStroke: 'group-hover:text-[#efa2ac]',
    icon: 'bg-rose-50 border-[#f7cad0] text-rose-700',
    hoverIcon: 'group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600',
  },
  neutral: {
    card: 'bg-gradient-to-br from-slate-100/75 via-slate-50/60 to-white border-[#dce2ea]',
    hoverCard: 'group-hover:border-[#c3ccd8]',
    notchStroke: 'text-[#dce2ea]',
    hoverNotchStroke: 'group-hover:text-[#c3ccd8]',
    icon: 'bg-white border-[#dce2ea] text-slate-700',
    hoverIcon: 'group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800',
  },
};

export interface NotchedStatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  tone?: StatCardTone;
  trend?: string | number;
  trendDirection?: 'up' | 'down' | 'neutral';
  compareLabel?: string;
  href?: string;
  cutoutBg?: string;
  compact?: boolean;
  className?: string;
}

export function NotchedStatCard({
  title,
  value,
  icon,
  tone = 'neutral',
  trend,
  trendDirection = 'up',
  compareLabel,
  href,
  cutoutBg = '#f8fafc',
  compact = false,
  className,
}: NotchedStatCardProps) {
  const styles = STAT_CARD_TONES[tone];

  const trendText =
    typeof trend === 'number'
      ? `${trend > 0 ? '+' : ''}${trend}%`
      : trend;

  const isDown =
    trendDirection === 'down' || (typeof trend === 'number' && trend < 0);
  const isNeutralTrend =
    trendDirection === 'neutral' || (typeof trend === 'number' && trend === 0);

  const cardInner = (
    <div
      className={cn(
        'group relative block min-w-0 transition-transform duration-200',
        href && 'hover:-translate-y-0.5',
        className
      )}
    >
      {/* Card Body with Top-Right Concave Corner Cutout */}
      <div
        className={cn(
          'relative rounded-2xl border transition-colors duration-200 flex flex-col justify-between',
          compact ? 'p-3.5 min-h-[104px]' : 'p-4 min-h-[114px]',
          styles.card,
          href && styles.hoverCard
        )}
      >
        {/* Seamless 64x64 top-right cutout mask concentric with 36x36 floating icon (8px uniform gap) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className={cn(
            'pointer-events-none absolute -top-[1px] -right-[1px] w-16 h-16 z-10 overflow-visible transition-colors duration-200',
            styles.notchStroke,
            href && styles.hoverNotchStroke
          )}
        >
          <path
            d="M 0 0.5 L 8 0.5 A 12 12 0 0 1 20 12.5 L 20 24 A 20 20 0 0 0 40 44 L 51.5 44 A 12 12 0 0 1 63.5 56 L 63.5 64 L 65 64 L 65 -1 L 0 -1 Z"
            fill={cutoutBg}
          />
          <path
            d="M 0 0.5 L 8 0.5 A 12 12 0 0 1 20 12.5 L 20 24 A 20 20 0 0 0 40 44 L 51.5 44 A 12 12 0 0 1 63.5 56 L 63.5 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        {/* Top row: Title (padded clear of corner notch) */}
        <div className={cn('pr-11', compact ? 'mb-1.5' : 'mb-2.5')}>
          <p className="text-xs font-medium text-slate-600 truncate">
            {title}
          </p>
        </div>

        {/* Middle: Crisp Metric Value */}
        <div className={cn('pr-4', compact ? 'mb-2' : 'mb-3')}>
          <h3
            className={cn(
              'font-semibold text-slate-900 tracking-tight tabular-nums leading-none truncate',
              compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-[22px]'
            )}
          >
            {value}
          </h3>
        </div>

        {/* Bottom: Comparison Period + Crisp White Pill Trend */}
        {(compareLabel || trendText) && (
          <div className="flex items-center gap-2 text-[11.5px] min-h-[20px]">
            {compareLabel && (
              <span className="text-slate-500 font-medium truncate">
                {compareLabel}
              </span>
            )}
            {trendText && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 bg-white/95 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-slate-200/70 whitespace-nowrap tabular-nums shrink-0',
                  isDown
                    ? 'text-rose-700'
                    : isNeutralTrend
                    ? 'text-slate-600'
                    : 'text-emerald-700'
                )}
              >
                {isDown ? (
                  <ArrowDownRight className="w-3 h-3 text-rose-600" />
                ) : !isNeutralTrend ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                ) : null}
                {trendText}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Separated Floating Corner Icon (36x36, concentric 8px gap) */}
      <div
        className={cn(
          'absolute top-0 right-0 z-20 w-9 h-9 rounded-xl border shadow-2xs flex items-center justify-center transition-all duration-200 group-hover:scale-105',
          styles.icon,
          href && styles.hoverIcon
        )}
      >
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: 'w-4 h-4 transition-colors',
            })
          : icon}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
