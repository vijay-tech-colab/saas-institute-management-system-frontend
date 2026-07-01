import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { AlertCircle, RefreshCw, Plus, ArrowRight, Settings2, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* -------------------------------------------------------------------------- */
/*                                SKELETONS                                   */
/* -------------------------------------------------------------------------- */

export function WidgetSkeleton() {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-100/40 to-transparent z-10" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 animate-pulse" />
        <div className="w-12 h-5 rounded-md bg-slate-50 animate-pulse" />
      </div>
      
      <div>
        <div className="w-24 h-7 bg-slate-100 rounded-lg mb-2 animate-pulse" />
        <div className="w-16 h-3 bg-slate-50 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 400 }: { height?: number }) {
  return (
    <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group w-full`} style={{ height }}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent z-10" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="w-32 h-5 bg-slate-100 rounded-lg mb-2 animate-pulse" />
          <div className="w-48 h-3 bg-slate-50 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-4 bg-slate-100 rounded-full animate-pulse" />
          <div className="w-16 h-4 bg-slate-100 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Chart grid skeleton */}
      <div className="flex-1 w-full flex flex-col justify-between pt-8 pb-4 relative">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-slate-50" />
        ))}
        {/* Fake bars/area */}
        <div className="absolute inset-0 flex items-end justify-between px-2 gap-2 mt-4 pt-8 pb-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-full bg-slate-100/40 rounded-t-sm animate-pulse" style={{ height: `${20 + Math.random() * 80}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-50 bg-white relative overflow-hidden">
           <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-50/80 to-transparent z-10" />
           <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0" />
           <div className="flex-1 space-y-2">
             <div className="w-3/4 h-3.5 bg-slate-100 rounded-full animate-pulse" />
             <div className="w-1/2 h-2.5 bg-slate-50 rounded-full animate-pulse" />
           </div>
        </div>
      ))}
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/*                                UI STATES                                   */
/* -------------------------------------------------------------------------- */

export function ErrorState({ title = "Unable to load data", description = "We encountered an issue while connecting to the server.", onRetry }: { title?: string; description?: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm w-full animate-in fade-in zoom-in-95 duration-500 h-full min-h-[300px]">
      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-rose-50/50">
        <AlertCircle className="w-8 h-8 text-rose-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs text-center mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center gap-3">
        <Button onClick={onRetry} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Try Again
        </Button>
      </div>
    </div>
  );
}

export function DashboardEmptyState({ onPrimaryAction }: { onPrimaryAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-100 shadow-sm w-full min-h-[600px] animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-2xl scale-[1.8]" />
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-lg ring-1 ring-slate-100 flex items-center justify-center rotate-3 transition-transform hover:rotate-0 duration-300">
          <ShieldCheck className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Welcome to Institute OS</h2>
      <p className="text-slate-500 text-center max-w-md mb-10 leading-relaxed text-[15px]">
        Your dashboard is currently empty. Get started by setting up your first institute, creating subscription plans, and inviting your team members.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={onPrimaryAction} className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all h-12 px-8 rounded-xl font-semibold text-[15px]">
          <Plus className="w-5 h-5 mr-2" /> Create First Institute
        </Button>
        <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 hover:bg-slate-50 font-semibold text-[15px] text-slate-700">
          <Settings2 className="w-5 h-5 mr-2" /> Configure Settings
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                LIVE EFFECTS                                */
/* -------------------------------------------------------------------------- */

export function LiveStatusBadge() {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      Live Updates
    </div>
  );
}

export function RefreshIndicator({ isRefreshing }: { isRefreshing: boolean }) {
  if (!isRefreshing) return null;
  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2 z-50 animate-in fade-in zoom-in duration-300">
      <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Syncing</span>
    </div>
  );
}

/**
 * AnimatedCounter smoothly transitions numbers from old value to new value.
 * Used for live updates to prevent jarring layout shifts.
 */
export function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '', 
  className = '',
  decimals = 0
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  className?: string; 
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      const controls = animate(prevValue, value, {
        duration: 0.8,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayValue(v),
        onComplete: () => setPrevValue(value),
      });
      return controls.stop;
    } else {
      setDisplayValue(value);
    }
  }, [value, prevValue]);

  const formattedValue = displayValue.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return (
    <span className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
