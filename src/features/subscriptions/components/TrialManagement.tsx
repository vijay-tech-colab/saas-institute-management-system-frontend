'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, Users, Settings, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader, SearchInput, FilterChips, Toggle } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { Checkbox } from "@/components/ui/checkbox";
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Trial Management"
        description="Manage trial periods, track conversions, and configure trial settings."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Trials' }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Trials" value={active} icon={<Clock size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={12} trendLabel="vs last month" />
        <StatCard title="Ending Soon" value={endingSoon} icon={<Clock size={20} />} iconColor="text-orange-600" iconBg="bg-orange-50" />
        <StatCard title="Trial Expired" value={expired} icon={<XCircle size={20} />} iconColor="text-slate-400" iconBg="bg-slate-100" />
        <StatCard title="Converted" value={converted} icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={68.4} trendLabel="conversion rate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trial Users Table — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <SearchInput value={search} onChange={setSearch} placeholder="Search institute or email..." className="w-full sm:w-72" />
              <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3 px-4 w-12 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedTrials.size === filtered.length && filtered.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  {['Institute', 'Email', 'Plan', 'Start', 'End', 'Days Left', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors cursor-pointer ${selectedTrials.has(t.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(t.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedTrials.has(t.id)}
                          onCheckedChange={() => toggleSelect(t.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-semibold text-slate-800">{t.instituteName}</p>
                      <p className="text-[10px] text-slate-400">{t.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{t.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full">{t.planName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{t.startDate}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{t.endDate}</td>
                    <td className="py-3.5 px-4">
                      {t.daysRemaining > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${t.daysRemaining <= 2 ? 'bg-red-500' : t.daysRemaining <= 5 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${(t.daysRemaining / 14) * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{t.daysRemaining}d</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4"><StatusBadge status={t.status as 'active' | 'ending_soon' | 'expired' | 'converted'} /></td>
                  </motion.tr>
                ))}
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
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-fit">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-500" /> Trial Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Trial Duration (days)</label>
              <input
                type="number"
                value={settings.duration}
                onChange={e => setSettings(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${settings.reminderDays.includes(d) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
