"use client"

import React from 'react';
import { Building2, CreditCard, Ticket, AlertTriangle, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
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
    time: '8 mins ago',
    icon: Building2,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    href: '/dashboard/tenants',
  },
  {
    id: '2',
    title: 'St. Xavier International',
    description: 'Upgraded subscription to Annual Enterprise Plan',
    time: '24 mins ago',
    icon: CreditCard,
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    href: '/dashboard/subscriptions',
  },
  {
    id: '3',
    title: 'Modern Public School',
    description: 'Custom domain & SSL certificate verified',
    time: '1 hour ago',
    icon: Ticket,
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
    href: '/dashboard/tenants/domains',
  },
  {
    id: '4',
    title: 'Automated Snapshot Backup',
    description: 'Multi-region database backup verified successfully',
    time: '2 hours ago',
    icon: ShieldCheck,
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-100',
    href: '/dashboard/tenants/backups',
  },
  {
    id: '5',
    title: 'Greenwood High School',
    description: 'Payment invoice #INV-2041 marked as paid',
    time: '3 hours ago',
    icon: FileText,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    href: '/dashboard/subscriptions/invoices',
  },
  {
    id: '6',
    title: 'Security Policy Audit',
    description: 'Security baseline verification logged for admin session',
    time: '5 hours ago',
    icon: AlertTriangle,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-100',
    href: '/dashboard/logs/security',
  },
];

export function RecentActivitySidebar() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 leading-tight">Recent Platform Activity</h3>
            <p className="text-[11px] text-slate-500">Audit trail of critical events</p>
          </div>
          <Link
            href="/dashboard/logs"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {ACTIVITIES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.badgeClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100">
        <Link
          href="/dashboard/logs/activity"
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200/60"
        >
          <span>Open Full Activity Stream</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
