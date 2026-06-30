import React from 'react';
import { Package, Zap, Shield, ChevronRight } from 'lucide-react';

export function PricingTiersWidget() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Platform Pricing Tiers</h2>
          <p className="text-sm text-slate-500 mt-1">Current distribution of active tenants across plans.</p>
        </div>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center">
          Manage Plans <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Tier */}
        <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-slate-200">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Basic Plan</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">$99 / month</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">850</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Institutes</p>
          </div>
        </div>

        {/* Pro Tier */}
        <div className="p-4 rounded-xl border border-indigo-200 hover:border-indigo-300 transition-colors bg-indigo-50/50 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Pro Plan</h3>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">$299 / month</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">342</p>
            <p className="text-[10px] font-bold text-indigo-600/80 uppercase tracking-wider">Institutes</p>
          </div>
        </div>

        {/* Enterprise Tier */}
        <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shadow-sm border border-white/10">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Enterprise</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Custom</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">56</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
