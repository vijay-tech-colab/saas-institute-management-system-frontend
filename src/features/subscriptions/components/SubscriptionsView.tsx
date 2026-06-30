"use client"
import React from 'react';
import { Download, Plus } from 'lucide-react';
import { SubscriptionStats } from './SubscriptionStats';
import { PricingTiersWidget } from './PricingTiersWidget';
import { SubscriptionsList } from './SubscriptionsList';

export function SubscriptionsView() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Global Subscriptions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage SaaS billing tiers, revenue, and active tenant plans across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> New Plan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-8 flex flex-col">
        <SubscriptionStats />
        <PricingTiersWidget />
        <SubscriptionsList />
      </div>

    </div>
  );
}
