'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check, Star, Edit2, RefreshCw, IndianRupee, Percent, Tag, Activity, Calendar
} from 'lucide-react';
import { PageHeader, Toggle } from './shared/UIComponents';
import { Checkbox } from "@/components/ui/checkbox";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { SegmentedTabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
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

interface PricingTierRow {
  cycle: BillingCycle;
  tier: (typeof mockPricingTiers)[number] | undefined;
}

export function PricingManagement() {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState('plan-growth');
  const [selectedRows, setSelectedRows] = useState<Set<BillingCycle>>(new Set());

  const plan = mockPlans.find(p => p.id === selectedPlan) || mockPlans[1];
  const tier = mockPricingTiers.find(t => t.planId === selectedPlan && t.cycle === selectedCycle);

  const planFeatures = plan ? Object.entries(plan.features)
    .filter(([, v]) => typeof v === 'boolean')
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

  const pricingRows: PricingTierRow[] = useMemo(
    () => CYCLE_ORDER.map((cycle) => ({
      cycle,
      tier: mockPricingTiers.find(t2 => t2.planId === selectedPlan && t2.cycle === cycle),
    })),
    [selectedPlan]
  );

  const columns: TableColumnDef<PricingTierRow>[] = useMemo(() => [
    {
      id: 'cycle',
      label: 'Cycle',
      icon: Calendar,
      renderCell: ({ cycle }) => (
        <span className="text-sm font-semibold text-slate-700">{CYCLE_LABELS[cycle]}</span>
      ),
    },
    {
      id: 'original',
      label: 'Original',
      icon: IndianRupee,
      renderCell: ({ tier: t }) => (
        <span className="text-sm text-slate-600 tabular-nums">
          {t ? `₹${t.originalPrice.toLocaleString('en-IN')}` : '—'}
        </span>
      ),
    },
    {
      id: 'discount',
      label: 'Discount',
      icon: Percent,
      renderCell: ({ tier: t }) => (
        <span className="text-sm text-emerald-600 font-semibold tabular-nums">
          {t ? `${t.discount}%` : '—'}
        </span>
      ),
    },
    {
      id: 'gst',
      label: 'GST',
      icon: Percent,
      renderCell: ({ tier: t }) => (
        <span className="text-sm text-slate-500 tabular-nums">{t ? `${t.gst}%` : '—'}</span>
      ),
    },
    {
      id: 'finalPrice',
      label: 'Final Price',
      icon: IndianRupee,
      renderCell: ({ tier: t }) => (
        <span className="text-sm font-bold text-slate-900 tabular-nums">
          {t ? `₹${t.finalPrice.toLocaleString('en-IN')}` : '—'}
        </span>
      ),
    },
    {
      id: 'offer',
      label: 'Offer',
      icon: Tag,
      renderCell: ({ tier: t }) => (
        t?.offerBadge
          ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-200">{t.offerBadge}</span>
          : <span className="text-slate-300 text-xs">—</span>
      ),
    },
    {
      id: 'autoRenew',
      label: 'Auto-Renew',
      icon: Activity,
      renderCell: ({ tier: t }) => (
        <span className="text-xs font-semibold text-slate-500">
          {t ? (t.autoRenewal ? 'ON' : 'OFF') : '—'}
        </span>
      ),
    },
  ], []);

  const {
    orderedColumns,
    visibleColumns,
    hiddenSet,
    toggleColumn,
    hideAllOptional,
    showAll,
    resetColumns,
    moveColumn,
    isCustomized,
  } = useTableColumns('subscriptions-pricing', columns);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Pricing Management"
        description="Configure pricing tiers, discounts, GST, and billing cycles for all plans."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Pricing' }]}
      />

      {/* Plan & Billing Cycle Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <SegmentedTabs
          ariaLabel="Select subscription plan"
          value={selectedPlan}
          onChange={setSelectedPlan}
          options={mockPlans
            .filter(p => p.status !== 'inactive')
            .map(p => ({
              value: p.id,
              label: p.name,
              icon: p.status === 'popular' ? <Star className="w-3.5 h-3.5" /> : undefined,
            }))}
        />

        <SegmentedTabs
          ariaLabel="Select billing cycle"
          value={selectedCycle}
          onChange={setSelectedCycle}
          options={CYCLE_ORDER.map(cycle => ({
            value: cycle,
            label: CYCLE_LABELS[cycle],
            badge: cycle === 'yearly' ? 'Best' : undefined,
          }))}
        />
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Current Tier Config */}
        {tier ? (
          <motion.div
            key={`${selectedPlan}-${selectedCycle}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-primary/20 rounded-2xl p-6 shadow-xs ring-2 ring-primary/10"
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
                <span className="font-black text-indigo-600 text-lg">₹{tier.finalPrice.toLocaleString('en-IN')}</span>
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
              <button className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all">Save Pricing</button>
              <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all">Reset</button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400">
            <p className="font-semibold text-slate-500">No pricing configured</p>
            <p className="text-sm mt-1">for {plan?.name} — {CYCLE_LABELS[selectedCycle]}</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all">
              Configure Pricing
            </button>
          </div>
        )}

        {/* Plan Features Panel */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
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
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-semibold text-slate-900">All Pricing Tiers — {plan?.name}</h2>
          <TableFieldsButton
            columns={orderedColumns}
            hiddenSet={hiddenSet}
            onToggle={toggleColumn}
            onMove={moveColumn}
            onHideAll={hideAllOptional}
            onShowAll={showAll}
            onReset={resetColumns}
            isCustomized={isCustomized}
            idFieldLabel="Tier ID"
          />
        </div>
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full min-w-[960px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedRows.size === CYCLE_ORDER.length && CYCLE_ORDER.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className={cn("text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap", TABLE_STICKY.idThWithCheckbox)}>
                  ID
                </th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  </th>
                ))}
                <th className={cn("text-right py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap", TABLE_STICKY.actionTh)}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((row, idx) => {
                const { cycle, tier: t } = row;
                const isSelected = selectedRows.has(cycle);
                const rowId = t?.id ?? `TIER-${cycle.toUpperCase()}`;
                return (
                  <tr
                    key={cycle}
                    className={cn(
                      "group border-b transition-colors cursor-pointer hover:bg-slate-50",
                      selectedCycle === cycle ? "bg-slate-50/70 border-slate-100" : "border-slate-50",
                      isSelected && "bg-primary-light hover:bg-primary-light border-primary/20"
                    )}
                    onClick={() => toggleSelect(cycle)}
                  >
                    <td className={cn(
                      "py-3.5 px-4 text-center align-middle",
                      TABLE_STICKY.checkboxTd,
                      isSelected && "bg-primary-light group-hover:bg-primary-light"
                    )}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(cycle)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn(
                      "py-3.5 px-5 text-sm font-medium text-slate-700 tabular-nums whitespace-nowrap",
                      TABLE_STICKY.idTdWithCheckbox,
                      isSelected && "bg-primary-light group-hover:bg-primary-light"
                    )}>
                      {rowId}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-3.5 px-5 whitespace-nowrap">
                        {col.renderCell(row, idx)}
                      </td>
                    ))}
                    <td
                      className={cn(
                        "py-3.5 px-4 text-right whitespace-nowrap",
                        TABLE_STICKY.actionTd,
                        isSelected && "bg-primary-light group-hover:bg-primary-light"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActionMenu
                        ariaLabel={`Actions for ${CYCLE_LABELS[cycle]} tier`}
                        items={[
                          {
                            label: 'Configure Tier',
                            icon: Edit2,
                            variant: 'primary',
                            onClick: () => setSelectedCycle(cycle),
                          },
                          {
                            label: 'Select for Comparison',
                            icon: RefreshCw,
                            onClick: () => toggleSelect(cycle),
                          },
                        ]}
                      />
                    </td>
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

