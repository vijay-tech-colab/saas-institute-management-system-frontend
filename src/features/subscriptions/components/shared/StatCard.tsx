'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
  suffix?: string;
  sparklineData?: number[];
  delay?: number;
  isLoading?: boolean;
}

export function StatCard({
  title, value, subtitle, trend, trendLabel,
  icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-50',
  prefix = '', suffix = '', delay = 0,
  isLoading: externalIsLoading,
}: StatCardProps) {
  const [internalLoading, setInternalLoading] = React.useState(true);

  React.useEffect(() => {
    if (externalIsLoading !== undefined) {
      setInternalLoading(externalIsLoading);
      return;
    }
    // Simulate loading for 1.2s plus any staggered delay
    const timer = setTimeout(() => setInternalLoading(false), 1200 + (delay * 1000));
    return () => clearTimeout(timer);
  }, [externalIsLoading, delay]);

  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalLoading;

  if (isLoading) {
    return (
      <div className="bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between relative overflow-hidden h-[88px]">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent z-10" />
        
        <div className="flex items-center gap-3.5 relative z-0">
          <div className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse flex-shrink-0" />
          <div className="space-y-2.5">
            <div className="h-2.5 w-16 bg-slate-100 rounded-full animate-pulse" />
            <div className="h-5 w-24 bg-slate-200 rounded-md animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 relative z-0">
          <div className="h-4 w-12 bg-slate-100 rounded-md animate-pulse" />
          <div className="h-2 w-14 bg-slate-50 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  const formattedValue = typeof value === 'number'
    ? value.toLocaleString('en-IN')
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="bg-white px-4 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden hover:-translate-y-0.5"
    >
      {/* Glow on hover */}
      <div className={cn('absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-0 blur-xl group-hover:opacity-60 transition-opacity duration-500', iconBg)}></div>
      
      <div className="flex items-center gap-3.5 relative z-10">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300', iconBg, iconColor)}>
          {/* Ensure icon uses the standard 5x5 size */}
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' }) : icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1.5">{title}</p>
          <h3 className="text-xl font-extrabold text-slate-900 leading-none tracking-tight">
            {prefix}{formattedValue}{suffix}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-end justify-center">
        {trend !== undefined && (
          <div className={cn(
            'flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-md',
            isPositive ? 'bg-emerald-50 text-emerald-700' :
            isNegative ? 'bg-rose-50 text-rose-700' :
            'bg-slate-50 text-slate-700'
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : isNegative ? <ArrowDownRight className="w-3 h-3" /> : null}
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
        {trendLabel && (
          <span className="text-[10px] text-slate-400 leading-none mt-1.5">{trendLabel}</span>
        )}
      </div>
    </motion.div>
  );
}
