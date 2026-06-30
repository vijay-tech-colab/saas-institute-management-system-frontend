'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PageHeader, Toggle } from './shared/UIComponents';
import { Checkbox } from "@/components/ui/checkbox";
import { mockPricingTiers, mockPlans } from '../data/mock-data';
import type { BillingCycle } from '../types';

const CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  'half-yearly': 'Half-Yearly',
  yearly: 'Yearly',
  lifetime: 'Lifetime',
};

const CYCLE_ORDER: BillingCycle[] = ['monthly', 'quarterly', 'half-yearly', 'yearly', 'lifetime'];

export function PricingManagement() {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState('plan-growth');
  const [selectedRows, setSelectedRows] = useState<Set<BillingCycle>>(new Set());

  const plan = mockPlans.find(p => p.id === selectedPlan) || mockPlans[1];
  const tier = mockPricingTiers.find(t => t.planId === selectedPlan && t.cycle === selectedCycle);

  const planFeatures = plan ? Object.entries(plan.features)
    .filter(([k, v]) => typeof v === 'boolean')
    .map(([k, v]) => ({ label: k.replace(/([A-Z])/g, ' $1').trim(), enabled: Boolean(v) })) : [];

  const toggleSelectAll = () => {
    if (selectedRows.size === CYCLE_ORDER.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(CYCLE_ORDER));
    }
  };

  const toggleSelect = (cycle: BillingCycle) => {
    const next = new Set(selectedRows);
    if (next.has(cycle)) { next.delete(cycle); } else { next.add(cycle); }
    setSelectedRows(next);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Pricing Management"
        description="Configure pricing tiers, discounts, GST, and billing cycles for all plans."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Pricing' }]}
      />

      {/* Plan Selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {mockPlans.filter(p => p.status !== 'inactive').map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${selectedPlan === p.id ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
          >
            {p.name}
            {p.status === 'popular' && <Star className="w-3 h-3 inline ml-1 text-current" />}
          </button>
        ))}
      </div>

      {/* Billing Cycle Tabs */}
      <div className="bg-white border border-slate-100 rounded-2xl p-1.5 inline-flex gap-1 mb-6 shadow-sm">
        {CYCLE_ORDER.map(cycle => (
          <button
            key={cycle}
            onClick={() => setSelectedCycle(cycle)}
            className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCycle === cycle ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {CYCLE_LABELS[cycle]}
            {cycle === 'yearly' && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full leading-none">BEST</span>}
          </button>
        ))}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Current Tier Config */}
        {tier ? (
          <motion.div
            key={`${selectedPlan}-${selectedCycle}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm ring-2 ring-blue-50"
          >
            {tier.offerBadge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full mb-4">
                🎁 {tier.offerBadge}
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">{plan.name} — {CYCLE_LABELS[selectedCycle]}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-4xl font-black text-slate-900">₹{tier.finalPrice.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-slate-400">/{selectedCycle === 'monthly' ? 'mo' : selectedCycle === 'yearly' ? 'yr' : selectedCycle}</p>
                </div>
                {tier.discount > 0 && (
                  <p className="text-sm text-slate-400 mt-1">
                    <span className="line-through">₹{tier.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="ml-2 text-emerald-600 font-semibold">Save {tier.discount}%</span>
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-3 bg-slate-50 rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Original Price</span>
                <span className="font-semibold text-slate-700">₹{tier.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              {tier.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount ({tier.discount}%)</span>
                  <span className="font-semibold text-emerald-600">-₹{(tier.originalPrice * tier.discount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">GST ({tier.gst}%)</span>
                <span className="font-semibold text-slate-700">+₹{((tier.originalPrice * (1 - tier.discount / 100)) * tier.gst / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-bold text-slate-900">Final Price</span>
                <span className="font-black text-blue-600 text-lg">₹{tier.finalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-slate-700">Auto Renewal</p>
                <p className="text-xs text-slate-400">Charge automatically on due date</p>
              </div>
              <Toggle checked={tier.autoRenewal} onChange={() => {}} />
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all">Save Pricing</button>
              <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all">Reset</button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400">
            <p className="font-semibold text-slate-500">No pricing configured</p>
            <p className="text-sm mt-1">for {plan?.name} — {CYCLE_LABELS[selectedCycle]}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Configure Pricing
            </button>
          </div>
        )}

        {/* Plan Features Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <p className="font-bold text-slate-900 mb-4">Included Features — {plan?.name}</p>
          <div className="grid grid-cols-2 gap-2">
            {planFeatures.map((f, i) => (
              <div key={i} className={`flex items-center gap-2 py-2 px-3 rounded-xl ${f.enabled ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                <Check className={`w-3.5 h-3.5 flex-shrink-0 ${f.enabled ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span className={`text-xs font-medium capitalize ${f.enabled ? 'text-emerald-800' : 'text-slate-400 line-through'}`}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Cycles Summary */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">All Pricing Tiers — {plan?.name}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedRows.size === CYCLE_ORDER.length && CYCLE_ORDER.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Cycle', 'Original', 'Discount', 'GST', 'Final Price', 'Offer', 'Auto-Renew'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CYCLE_ORDER.map((cycle, i) => {
                const t = mockPricingTiers.find(t2 => t2.planId === selectedPlan && t2.cycle === cycle);
                return (
                  <tr 
                    key={cycle} 
                    className={`border-b hover:bg-blue-50/20 transition-colors cursor-pointer ${selectedCycle === cycle ? 'bg-blue-50/40 border-slate-100' : 'border-slate-50'} ${selectedRows.has(cycle) ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                    onClick={() => toggleSelect(cycle)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedRows.has(cycle)}
                          onCheckedChange={() => toggleSelect(cycle)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-slate-700">{CYCLE_LABELS[cycle]}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-600">{t ? `₹${t.originalPrice.toLocaleString('en-IN')}` : '—'}</td>
                    <td className="py-3.5 px-4 text-sm text-emerald-600 font-semibold">{t ? `${t.discount}%` : '—'}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-500">{t ? `${t.gst}%` : '—'}</td>
                    <td className="py-3.5 px-4 text-sm font-bold text-slate-900">{t ? `₹${t.finalPrice.toLocaleString('en-IN')}` : '—'}</td>
                    <td className="py-3.5 px-4">
                      {t?.offerBadge ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full">{t.offerBadge}</span> : <span className="text-slate-300 text-xs">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-500">{t ? (t.autoRenewal ? 'ON' : 'OFF') : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
