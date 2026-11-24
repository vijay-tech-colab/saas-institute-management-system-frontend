"use client"

import React from 'react';
import { ShieldAlert, Ban, AlertTriangle, Key, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  actionLabel: string;
  href: string;
  icon: React.ElementType;
}

const ACTION_ITEMS: AlertItem[] = [
  {
    id: '1',
    title: 'Suspension Appeal: Greenwood High',
    description: 'Institute administrator submitted compliance documentation for reactivation review.',
    severity: 'warning',
    actionLabel: 'Review Appeal',
    href: '/dashboard/tenants/suspended',
    icon: AlertTriangle,
  },
  {
    id: '2',
    title: 'Anomalous Login Spike',
    description: '14 consecutive failed super admin login attempts blocked from IP 143.192.45.1.',
    severity: 'critical',
    actionLabel: 'Inspect Threat',
    href: '/dashboard/logs/security',
    icon: Ban,
  },
  {
    id: '3',
    title: 'Super Admin API Key Rotation',
    description: 'Production gateway access key is scheduled for routine 90-day security rotation.',
    severity: 'info',
    actionLabel: 'Review Security',
    href: '/dashboard/logs/security',
    icon: Key,
  },
];

export function SecurityCenterWidget() {
  return (
    <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">Action Required & Security</h3>
                <p className="text-[11px] text-slate-500">Items needing administrator attention</p>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            2 Urgent
          </span>
        </div>

        <div className="space-y-3">
          {ACTION_ITEMS.map((item) => {
            const Icon = item.icon;
            const badgeColors =
              item.severity === 'critical'
                ? 'bg-rose-50 text-rose-700 border-rose-100'
                : item.severity === 'warning'
                ? 'bg-amber-50 text-amber-700 border-amber-100'
                : 'bg-blue-50 text-blue-700 border-blue-100';

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${badgeColors}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-2.5">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <span>{item.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Firewall & WAF Active</span>
        </div>
        <Link
          href="/dashboard/logs/security"
          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All Security Logs &rarr;
        </Link>
      </div>
    </div>
  );
}
