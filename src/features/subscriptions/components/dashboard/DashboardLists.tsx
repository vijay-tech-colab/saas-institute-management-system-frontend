'use client';

import React from 'react';
import { mockRenewals, mockTrialUsers, mockPayments } from '../../data/mock-data';
import { ArrowRight, Bell, AlertTriangle, UserCheck } from 'lucide-react';
import Link from 'next/link';

export function DashboardLists() {
  const expiringSoon = mockRenewals.filter(r => r.daysUntilRenewal > 0 && r.daysUntilRenewal <= 15).slice(0, 4);
  const trialUsers = mockTrialUsers.filter(t => t.status === 'active' || t.status === 'ending_soon').slice(0, 4);
  const failedPayments = mockPayments.filter(p => p.status === 'failed').slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      
      {/* Expiring Soon */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" /> Expiring Soon
          </h3>
          <Link href="/dashboard/subscriptions/renewals" className="text-[11px] font-semibold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="p-2 space-y-1">
          {expiringSoon.map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <div>
                <p className="text-sm font-semibold text-slate-900">{r.instituteName}</p>
                <p className="text-xs text-slate-500">{r.planName}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md">
                  {r.daysUntilRenewal} Days
                </span>
                <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">Remind</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trial Users */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-purple-500" /> Active Trials
          </h3>
          <Link href="/dashboard/subscriptions/trials" className="text-[11px] font-semibold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="p-2 space-y-1">
          {trialUsers.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.instituteName}</p>
                <p className="text-xs text-slate-500">{t.planName}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 text-[10px] font-bold rounded-md ${
                  t.status === 'ending_soon' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {t.daysRemaining} Days Left
                </span>
                <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-semibold text-purple-600 hover:text-purple-700">Convert</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Payments */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Failed Payments
          </h3>
          <Link href="/dashboard/subscriptions/payments" className="text-[11px] font-semibold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="p-2 space-y-1">
          {failedPayments.map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.instituteName}</p>
                <p className="text-xs text-rose-500 truncate" title={p.failureReason}>{p.failureReason}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="block text-sm font-bold text-slate-900">₹{p.amount.toLocaleString()}</span>
                <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">Retry</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
