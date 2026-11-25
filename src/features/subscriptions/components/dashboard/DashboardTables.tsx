'use client';

import React from 'react';
import { mockCustomers, mockPayments } from '../../data/mock-data';
import { StatusBadge } from '../shared/StatusBadge';
import { ArrowRight, Download, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { RowActionMenu, TABLE_STICKY } from '@/components/ui/row-action-menu';
import { cn } from '@/lib/utils';

export function DashboardTables() {
  const router = useRouter();
  const recentSubs = mockCustomers.slice(0, 5);
  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
      {/* Recent Subscriptions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">Recent Subscriptions</h2>
          <Link href="/dashboard/subscriptions/customers" className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 group">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[740px] text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className={cn("px-5 py-3 whitespace-nowrap", TABLE_STICKY.idTh)}>ID</th>
                <th className="px-5 py-3 whitespace-nowrap">Tenant</th>
                <th className="px-5 py-3 whitespace-nowrap">Plan</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3 whitespace-nowrap">Amount</th>
                <th className={cn("px-4 py-3 whitespace-nowrap text-right", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSubs.map((sub) => (
                <tr key={sub.id} className="group hover:bg-slate-50 transition-colors">
                  <td className={cn("px-5 py-3.5 whitespace-nowrap text-sm font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTd)}>
                    {sub.id}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{sub.instituteName}</p>
                    <p className="text-[11px] text-slate-500">{sub.email}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-medium text-slate-700">{sub.currentPlan}</span>
                    <span className="text-xs text-slate-400 ml-1">({sub.billingCycle})</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-medium text-slate-900">
                    ₹{sub.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className={cn("px-4 py-3.5 whitespace-nowrap text-right", TABLE_STICKY.actionTd)}>
                    <RowActionMenu
                      ariaLabel={`Actions for ${sub.instituteName}`}
                      items={[
                        {
                          label: 'View Details',
                          icon: Eye,
                          variant: 'primary',
                          onClick: () => router.push(`/dashboard/subscriptions/customers/${sub.id}`),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">Recent Payments</h2>
          <Link href="/dashboard/subscriptions/payments" className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 group">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[740px] text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className={cn("px-5 py-3 whitespace-nowrap", TABLE_STICKY.idTh)}>ID</th>
                <th className="px-5 py-3 whitespace-nowrap">Invoice</th>
                <th className="px-5 py-3 whitespace-nowrap">Tenant</th>
                <th className="px-5 py-3 whitespace-nowrap">Amount</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className={cn("px-4 py-3 whitespace-nowrap text-right", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPayments.map((pay) => (
                <tr key={pay.id} className="group hover:bg-slate-50 transition-colors">
                  <td className={cn("px-5 py-3.5 whitespace-nowrap text-sm font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTd)}>
                    {pay.id}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{pay.invoiceNumber}</p>
                    <p className="text-[11px] text-slate-500">{format(new Date(pay.paymentDate), 'MMM dd, yyyy')}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="font-medium text-slate-700">{pay.instituteName}</p>
                    <p className="text-xs text-slate-400">{pay.gateway}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-medium text-slate-900">
                    ₹{pay.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={pay.status} />
                  </td>
                  <td className={cn("px-4 py-3.5 whitespace-nowrap text-right", TABLE_STICKY.actionTd)}>
                    <RowActionMenu
                      ariaLabel={`Actions for payment ${pay.invoiceNumber}`}
                      items={[
                        {
                          label: 'Download Receipt',
                          icon: Download,
                          variant: 'primary',
                          onClick: () => {},
                        },
                        {
                          label: 'View Invoice',
                          icon: FileText,
                          onClick: () => router.push('/dashboard/subscriptions/invoices'),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

