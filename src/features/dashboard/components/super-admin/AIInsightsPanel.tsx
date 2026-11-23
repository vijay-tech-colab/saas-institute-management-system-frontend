"use client"

import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function AIInsightsPanel() {
  const insights = [
    { 
      type: 'positive', 
      title: 'Revenue Acceleration', 
      description: 'MRR is projected to grow by 12% next month based on current institute onboarding velocity.',
      icon: TrendingUp,
      actionLabel: 'View Forecast',
      href: '/dashboard/analytics/revenue',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    { 
      type: 'warning', 
      title: 'Churn Prevention Alert', 
      description: '3 Enterprise institutes show decreased active staff logins over the past 7 days.',
      icon: AlertCircle,
      actionLabel: 'Review Institutes',
      href: '/dashboard/tenants',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-100',
    },
    { 
      type: 'suggestion', 
      title: 'Upsell Opportunity', 
      description: '45 active trial institutes have reached 80% quota. Sending automated upgrade prompts is recommended.',
      icon: Lightbulb,
      actionLabel: 'Manage Plans',
      href: '/dashboard/subscriptions/plans',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-100',
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/70">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">AI Platform Insights</h3>
              <p className="text-[11px] text-slate-500">Automated intelligence & suggestions</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Live
          </span>
        </div>

        <div className="space-y-3">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${insight.badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">
                        {insight.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {insight.description}
                    </p>
                    <Link
                      href={insight.href}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 mt-2 transition-colors"
                    >
                      <span>{insight.actionLabel}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
