"use client"

import React from "react"
import Link from "next/link"
import { TopKPIs } from "./super-admin/TopKPIs"
import { BusinessAnalytics } from "./super-admin/BusinessAnalytics"
import { SystemHealthWidget } from "./super-admin/SystemHealthWidget"
import { SecurityCenterWidget } from "./super-admin/SecurityCenterWidget"
import { AIInsightsPanel } from "./super-admin/AIInsightsPanel"
import { RecentActivitySidebar } from "./super-admin/RecentActivitySidebar"
import { Plus, CreditCard, Shield, ExternalLink, Sparkles } from "lucide-react"

export function SuperAdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">

      {/* ─── Executive Welcome & Action Header ─── */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-[11px] font-medium border border-primary-border">
                Super Admin Console
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">&bull;</span>
              <span className="text-xs text-slate-500 font-normal hidden md:inline">{currentDate}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back, Alex Rivera
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal">
              High-level overview of multi-tenant infrastructure, MRR expansion, and platform security.
            </p>
          </div>

          {/* Core Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            <Link
              href="/dashboard/tenants/create"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-medium shadow-xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Institute</span>
            </Link>

            <Link
              href="/dashboard/subscriptions"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 shadow-xs transition-colors"
            >
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Subscriptions</span>
            </Link>

            <Link
              href="/dashboard/logs"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span className="hidden lg:inline">Audit Logs</span>
            </Link>
          </div>
        </div>

        {/* ─── Question 1: What is Happening? (Top 4 Executive KPIs) ─── */}
        <TopKPIs />

        {/* ─── Main Content Grid ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Left Column (8 cols): Business Analytics + Urgent Action / Security */}
          <div className="xl:col-span-8 space-y-6">
            <BusinessAnalytics />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SecurityCenterWidget />
              <SystemHealthWidget />
            </div>
          </div>

          {/* Right Column (4 cols): AI Insights + Recent Activity Stream */}
          <div className="xl:col-span-4 space-y-6 flex flex-col">
            <AIInsightsPanel />
            <RecentActivitySidebar />
          </div>

        </div>

    </div>
  )
}
