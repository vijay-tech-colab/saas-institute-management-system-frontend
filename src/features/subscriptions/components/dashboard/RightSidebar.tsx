'use client';

import React from 'react';
import { mockRecentActivities } from '../../data/mock-data';
import { 
  Plus, FileText, Send, Tag, Download, Pause, 
  Activity, ArrowUpRight, Play, CheckCircle2,
  RefreshCcw, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export function RightSidebar() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'subscription_renewed': return <RefreshCcw className="w-3.5 h-3.5 text-blue-500" />;
      case 'plan_changed': return <ArrowUpRight className="w-3.5 h-3.5 text-purple-500" />;
      case 'payment_received': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'trial_started': return <Play className="w-3.5 h-3.5 text-indigo-500" />;
      case 'coupon_applied': return <Tag className="w-3.5 h-3.5 text-amber-500" />;
      case 'refund_initiated': return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
      default: return <Activity className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'subscription_renewed': return 'bg-blue-50 border-blue-100';
      case 'plan_changed': return 'bg-purple-50 border-purple-100';
      case 'payment_received': return 'bg-emerald-50 border-emerald-100';
      case 'trial_started': return 'bg-indigo-50 border-indigo-100';
      case 'coupon_applied': return 'bg-amber-50 border-amber-100';
      case 'refund_initiated': return 'bg-rose-50 border-rose-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  const quickActions = [
    { icon: <Plus className="w-4 h-4" />, label: 'Create Sub', href: '/dashboard/subscriptions/customers' },
    { icon: <FileText className="w-4 h-4" />, label: 'Invoice', href: '/dashboard/subscriptions/invoices' },
    { icon: <Send className="w-4 h-4" />, label: 'Remind', href: '/dashboard/subscriptions/renewals' },
    { icon: <Tag className="w-4 h-4" />, label: 'Coupon', href: '/dashboard/subscriptions/coupons' },
    { icon: <Download className="w-4 h-4" />, label: 'Export', href: '#' },
    { icon: <Pause className="w-4 h-4" />, label: 'Suspend', href: '/dashboard/subscriptions/customers' },
  ];

  return (
    <div className="w-full xl:w-80 flex-shrink-0 space-y-6 sticky top-6 self-start h-[calc(100vh-3rem)] overflow-y-auto scrollbar-hide">
      
      {/* Quick Actions (Glassmorphic) */}
      <div className="bg-white/60 backdrop-blur-md border border-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, i) => (
            <Link 
              key={i} 
              href={action.href}
              className="flex flex-col items-center justify-center p-3 bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 rounded-xl transition-all group"
            >
              <div className="text-slate-400 group-hover:text-indigo-600 transition-colors mb-2">
                {action.icon}
              </div>
              <span className="text-[10px] font-semibold text-slate-600 group-hover:text-indigo-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities Timeline */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col h-[500px]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" /> Activity Feed
          </h3>
          <button className="text-[11px] font-semibold text-blue-600 hover:underline">All</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          <div className="relative border-l border-slate-100 ml-3 space-y-6 pb-4">
            {mockRecentActivities.map((act) => (
              <div key={act.id} className="relative pl-6">
                <span className={`absolute -left-[13px] top-1 p-1 rounded-full border ${getActivityColor(act.type)}`}>
                  {getActivityIcon(act.type)}
                </span>
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-slate-900">{act.title}</p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{act.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{act.description}</p>
                  <p className="text-[10px] font-medium text-slate-400">{act.instituteName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Promotion or Upgrade Prompt */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-sm font-bold mb-1">Super Admin Pro</h3>
          <p className="text-xs text-indigo-100 mb-4">Unlock AI insights, advanced reporting, and custom white-labeling.</p>
          <button className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
            Upgrade Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}
