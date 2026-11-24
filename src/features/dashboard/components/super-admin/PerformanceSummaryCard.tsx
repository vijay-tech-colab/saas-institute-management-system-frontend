"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PERFORMANCE_METRICS = [
  {
    label: 'System Availability',
    detail: 'All 6 core services online',
    value: '99.98%',
    badgeVariant: 'success' as const,
    badgeText: 'Healthy',
    icon: CheckCircle2,
    href: '/dashboard/logs/system',
  },
  {
    label: 'Average API Latency',
    detail: 'Global p95 response time',
    value: '112ms',
    badgeVariant: 'success' as const,
    badgeText: 'Optimal',
    icon: Wifi,
    href: '/dashboard/logs/api',
  },
  {
    label: 'Cluster Compute Load',
    detail: '16 cores · 41/64 GB RAM',
    value: '38%',
    badgeVariant: 'info' as const,
    badgeText: 'Normal',
    icon: Cpu,
    href: '/dashboard/logs/system',
  },
  {
    label: 'Security & Compliance',
    detail: '1 appeal · 1 key rotation',
    value: '2 Items',
    badgeVariant: 'warning' as const,
    badgeText: 'Attention',
    icon: ShieldAlert,
    href: '/dashboard/logs/security',
  },
];

export function PerformanceSummaryCard() {
  return (
    <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight truncate">
            Performance Summary
          </h3>
          <Link
            href="/dashboard/logs/system"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {PERFORMANCE_METRICS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-900 truncate">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[13px] font-semibold text-slate-900 tabular-nums">
                    {item.value}
                  </span>
                  <Badge variant={item.badgeVariant} className="text-[10px] px-1.5 py-0">
                    {item.badgeText}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Firewall &amp; WAF Active</span>
        <Link
          href="/dashboard/logs/security"
          className="font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Security Logs &rarr;
        </Link>
      </div>
    </div>
  );
}
