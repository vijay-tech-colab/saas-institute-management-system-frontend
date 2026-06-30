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
}

export function StatCard({
  title, value, subtitle, trend, trendLabel,
  icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-50',
  prefix = '', suffix = '', delay = 0,
}: StatCardProps) {
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
