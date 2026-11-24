"use client"

import React from 'react';
import { Building2, CreditCard, ShieldCheck, FileText, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  badgeClass: string;
  href: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Apex Institute of Technology',
    description: 'New enterprise institute onboarded & verified',
    time: '8m ago',
    icon: Building2,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    href: '/dashboard/tenants/list',
  },
  {
    id: '2',
    title: 'St. Xavier International',
    description: 'Upgraded subscription to Annual Enterprise',
    time: '24m ago',
    icon: CreditCard,
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/70',
    href: '/dashboard/subscriptions',
  },
  {
    id: '3',
    title: 'Greenwood High School',
    description: 'Invoice #INV-2041 payment settled via Razorpay',
    time: '1h ago',
    icon: FileText,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    href: '/dashboard/subscriptions/invoices',
  },
  {
    id: '4',
    title: 'Multi-Region Snapshot Backup',
    description: 'Automated database backup verified',
    time: '2h ago',
    icon: ShieldCheck,
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    href: '/dashboard/tenants/backups',
  },
  {
    id: '5',
    title: 'Security Policy Audit',
    description: '14 failed login attempts blocked automatically',
    time: '4h ago',
    icon: AlertTriangle,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/70',
    href: '/dashboard/logs/security',
  },
];

export function RecentActivitySidebar() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-2.5 border-b border-slate-100">
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 tracking-tight truncate">
            Recent Activity
          </h3>
          <Link
            href="/dashboard/logs/activity"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-1.5">
          {ACTIVITIES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.badgeClass}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
