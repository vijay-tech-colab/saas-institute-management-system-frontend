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
  icon, iconColor = 'text-indigo-600', iconBg = 'bg-indigo-50',
  prefix = '', suffix = '', delay = 0,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white px-4 py-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between relative overflow-hidden h-[88px]">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent z-10" />
        
        <div className="flex items-center gap-3.5 relative z-0">
          <div className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse flex-shrink-0" />
          <div className="space-y-2">
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: delay * 0.5, ease: 'easeOut' }}
      className="bg-white px-4 py-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex items-center justify-between group relative overflow-hidden"
    >
      <div className="flex items-center gap-3.5 relative z-10 min-w-0">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105', iconBg, iconColor)}>
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' }) : icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 leading-none mb-1.5 truncate">{title}</p>
          <h3 className="text-xl font-semibold text-slate-900 leading-none tracking-tight">
            {prefix}{formattedValue}{suffix}
          </h3>
          {subtitle && (
            <p className="text-xs font-normal text-slate-400 mt-1 truncate">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-end justify-center flex-shrink-0 ml-3">
        {trend !== undefined && (
          <div className={cn(
            'flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full border',
            isPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' :
            isNegative ? 'bg-rose-50 text-rose-700 border-rose-200/70' :
            'bg-slate-50 text-slate-700 border-slate-200'
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : isNegative ? <ArrowDownRight className="w-3 h-3" /> : null}
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
        {trendLabel && (
          <span className="text-[10px] text-slate-400 font-normal leading-none mt-1">{trendLabel}</span>
        )}
      </div>
    </motion.div>
  );
}

