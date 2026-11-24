'use client';

import React, { useMemo, useState } from 'react';
import {
  Clock, CheckCircle2, XCircle, Users, Settings, ArrowUpRight, Ban,
  Building2, AtSign, CreditCard, Calendar, Activity, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader, SearchInput, FilterChips, Toggle } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { Checkbox } from "@/components/ui/checkbox";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { StatCard } from './shared/StatCard';
import { mockTrialUsers, mockTrialSettings } from '../data/mock-data';


export function TrialManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTrials, setSelectedTrials] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState(mockTrialSettings);

  const filtered = mockTrialUsers.filter(t => {
    const matchSearch = t.instituteName.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.status === filter;
    return matchSearch && matchFilter;
  });

  const active = mockTrialUsers.filter(t => t.status === 'active').length;
  const endingSoon = mockTrialUsers.filter(t => t.status === 'ending_soon').length;
  const expired = mockTrialUsers.filter(t => t.status === 'expired').length;
  const converted = mockTrialUsers.filter(t => t.status === 'converted').length;

  const toggleSelectAll = () => {
    if (selectedTrials.size === filtered.length) {
      setSelectedTrials(new Set());
    } else {
      setSelectedTrials(new Set(filtered.map(t => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedTrials);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedTrials(next);
  };

  type TrialRow = (typeof mockTrialUsers)[number];

  const columns: TableColumnDef<TrialRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      renderCell: (t) => <p className="text-sm font-medium text-slate-900">{t.instituteName}</p>,
    },
    {
      id: 'email',
      label: 'Email',
      icon: AtSign,
      renderCell: (t) => <span className="text-xs text-slate-600">{t.email}</span>,
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      defaultVisible: false,
      renderCell: (t) => <span className="text-xs text-slate-500 tabular-nums">{t.phone}</span>,
    },
    {
      id: 'plan',
      label: 'Trial Plan',
      icon: CreditCard,
      renderCell: (t) => (
        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">{t.planName}</span>
      ),
    },
    {
      id: 'startDate',
      label: 'Start Date',
      icon: Calendar,
      renderCell: (t) => <span className="text-xs text-slate-500">{t.startDate}</span>,
    },
    {
      id: 'endDate',
      label: 'End Date',
      icon: Calendar,
      renderCell: (t) => <span className="text-xs text-slate-500">{t.endDate}</span>,
    },
    {
      id: 'daysLeft',
      label: 'Days Left',
      icon: Clock,
      renderCell: (t) => (
        <span className={`text-xs font-bold ${t.daysRemaining <= 3 ? 'text-rose-600' : t.daysRemaining <= 7 ? 'text-amber-600' : 'text-slate-600'}`}>
          {t.daysRemaining}d
        </span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      renderCell: (t) => <StatusBadge status={t.status} />,
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
  } = useTableColumns('subscriptions-trials', columns);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Trial Management"
        description="Manage trial periods, track conversions, and configure trial settings."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Trials' }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <StatCard title="Active Trials" value={active} icon={<Clock size={18} />} tone="primary" trend={12} trendLabel="vs last month" />
        <StatCard title="Ending Soon" value={endingSoon} icon={<Clock size={18} />} tone="warning" />
        <StatCard title="Trial Expired" value={expired} icon={<XCircle size={18} />} tone="neutral" />
        <StatCard title="Converted" value={converted} icon={<CheckCircle2 size={18} />} tone="success" trend={68.4} trendLabel="conversion rate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trial Users Table — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <SearchInput value={search} onChange={setSearch} placeholder="Search institute or email..." className="w-full sm:w-64" />
              <TableFieldsButton
                columns={orderedColumns}
                hiddenSet={hiddenSet}
                onToggle={toggleColumn}
                onMove={moveColumn}
                onHideAll={hideAllOptional}
                onShowAll={showAll}
                onReset={resetColumns}
                isCustomized={isCustomized}
                idFieldLabel="Trial ID"
              />
            </div>
            <FilterChips 
              options={[
                { label: 'All', value: 'all', count: mockTrialUsers.length },
                { label: 'Active', value: 'active', count: mockTrialUsers.filter(t => t.status === 'active').length },
                { label: 'Ending Soon', value: 'ending_soon', count: mockTrialUsers.filter(t => t.status === 'ending_soon').length },
                { label: 'Expired', value: 'expired', count: mockTrialUsers.filter(t => t.status === 'expired').length },
                { label: 'Converted', value: 'converted', count: mockTrialUsers.filter(t => t.status === 'converted').length },
              ]} 
              selected={filter} 
              onChange={setFilter} 
            />
          </div>
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full min-w-[920px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedTrials.size === filtered.length && filtered.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th className={cn("text-left py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap", TABLE_STICKY.idThWithCheckbox)}>
                    ID
                  </th>
                  {visibleColumns.map(col => (
                    <th key={col.id} className="text-left py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                      <ColumnHeaderLabel label={col.label} icon={col.icon} />
                    </th>
                  ))}
                  <th className={cn("text-right py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap", TABLE_STICKY.actionTh)}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => {
                  const isSelected = selectedTrials.has(t.id);
                  return (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "group border-b hover:bg-slate-50 transition-colors cursor-pointer",
                      isSelected ? "bg-primary-light hover:bg-primary-light border-primary/20" : "border-slate-50"
                    )}
                    onClick={() => toggleSelect(t.id)}
                  >
                    <td className={cn(
                      "py-3.5 px-4 text-center align-middle",
                      TABLE_STICKY.checkboxTd,
                      isSelected && "bg-primary-light group-hover:bg-primary-light"
                    )}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(t.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn(
                      "py-3.5 px-4 text-sm font-medium text-slate-700 tabular-nums whitespace-nowrap",
                      TABLE_STICKY.idTdWithCheckbox,
                      isSelected && "bg-primary-light group-hover:bg-primary-light"
                    )}>
                      {t.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-3.5 px-4 whitespace-nowrap">
                        {col.renderCell(t, i)}
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
                        ariaLabel={`Actions for ${t.instituteName}`}
                        items={[
                          {
                            label: 'Extend Trial (+7d)',
                            icon: Clock,
                            variant: 'primary',
                            onClick: () => {},
                          },
                          {
                            label: 'Convert to Paid',
                            icon: ArrowUpRight,
                            variant: 'success',
                            onClick: () => {},
                          },
                          {
                            label: 'End Trial',
                            icon: Ban,
                            variant: 'danger',
                            onClick: () => {},
                          },
                        ]}
                      />
                    </td>
                  </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold text-slate-500">No trial users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Trial Settings */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm h-fit">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-500" /> Trial Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Trial Duration (days)</label>
              <input
                type="number"
                value={settings.duration}
                onChange={e => setSettings(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            {[
              { key: 'oneTrialPerEmail', label: 'One Trial Per Email', desc: 'Prevent duplicate trials' },
              { key: 'requireCard', label: 'Require Credit Card', desc: 'Card saved but not charged' },
              { key: 'autoExpire', label: 'Auto Expire', desc: 'Automatically suspend after trial' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{label}</p>
                  <p className="text-[11px] text-slate-400">{desc}</p>
                </div>
                <Toggle
                  checked={settings[key as keyof typeof settings] as boolean}
                  onChange={v => setSettings(prev => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">Reminder Days</p>
              <div className="flex flex-wrap gap-2">
                {[1, 3, 5, 7, 10].map(d => (
                  <button
                    key={d}
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      reminderDays: prev.reminderDays.includes(d)
                        ? prev.reminderDays.filter(x => x !== d)
                        : [...prev.reminderDays, d]
                    }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${settings.reminderDays.includes(d) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

