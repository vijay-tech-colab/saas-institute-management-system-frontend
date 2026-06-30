'use client';

import React from 'react';
import { mockCustomers, mockPayments } from '../../data/mock-data';
import { StatusBadge } from '../shared/StatusBadge';
import { ArrowRight, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export function DashboardTables() {
  const recentSubs = mockCustomers.slice(0, 5);
  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      {/* Recent Subscriptions */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-900">Recent Subscriptions</h2>
          <Link href="/dashboard/subscriptions/customers" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-500 font-medium">
              <tr>
                <th className="px-5 py-3 whitespace-nowrap">Tenant</th>
                <th className="px-5 py-3 whitespace-nowrap">Plan</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3 whitespace-nowrap">Amount</th>
                <th className="px-5 py-3 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSubs.map((sub, i) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{sub.instituteName}</p>
                    <p className="text-[11px] text-slate-500">{sub.email}</p>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="font-medium text-slate-700">{sub.currentPlan}</span>
                    <span className="text-xs text-slate-400 ml-1">({sub.billingCycle})</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-900">
                    ₹{sub.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-900">Recent Payments</h2>
          <Link href="/dashboard/subscriptions/payments" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-500 font-medium">
              <tr>
                <th className="px-5 py-3 whitespace-nowrap">Invoice</th>
                <th className="px-5 py-3 whitespace-nowrap">Tenant</th>
                <th className="px-5 py-3 whitespace-nowrap">Amount</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPayments.map((pay, i) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{pay.invoiceNumber}</p>
                    <p className="text-[11px] text-slate-500">{format(new Date(pay.paymentDate), 'MMM dd, yyyy')}</p>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <p className="font-medium text-slate-700">{pay.instituteName}</p>
                    <p className="text-xs text-slate-400">{pay.gateway}</p>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-900">
                    ₹{pay.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <StatusBadge status={pay.status} />
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-right">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
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
