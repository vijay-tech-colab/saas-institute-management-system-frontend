'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Bell, Clock, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isSameDay, parseISO } from 'date-fns';
import { PageHeader, SearchInput, FilterChips, Toggle } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from "@/components/ui/checkbox";
import { mockRenewals } from '../data/mock-data';


const REMINDER_DAYS = [30, 15, 7, 1];

// Build a set of dates that have renewals for calendar highlighting
const renewalDates = mockRenewals
  .filter(r => r.status === 'upcoming' || r.status === 'successful')
  .map(r => parseISO(r.renewalDate));

const expiredDates = mockRenewals
  .filter(r => r.status === 'expired')
  .map(r => parseISO(r.renewalDate));

export function RenewalManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedRenewals, setSelectedRenewals] = useState<Set<string>>(new Set());
  const [reminders, setReminders] = useState<Record<number, boolean>>({ 30: true, 15: true, 7: true, 1: true });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filtered = mockRenewals.filter(r => {
    const matchSearch = r.instituteName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const upcoming = mockRenewals.filter(r => r.status === 'upcoming').length;
  const expired = mockRenewals.filter(r => r.status === 'expired').length;
  const successful = mockRenewals.filter(r => r.status === 'successful').length;
  const totalUpcomingRevenue = mockRenewals
    .filter(r => r.status === 'upcoming')
    .reduce((s, r) => s + r.amount, 0);

  // Renewals for the selected date
  const selectedDateRenewals = selectedDate
    ? mockRenewals.filter(r => isSameDay(parseISO(r.renewalDate), selectedDate))
    : [];

  const toggleSelectAll = () => {
    if (selectedRenewals.size === filtered.length) {
      setSelectedRenewals(new Set());
    } else {
      setSelectedRenewals(new Set(filtered.map(r => r.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedRenewals);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedRenewals(next);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Renewal Management"
        description="Track upcoming renewals, automate reminders, and manage expiring subscriptions."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Renewals' }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard
          title="Upcoming Renewals" value={upcoming}
          icon={<RefreshCw size={16} />} iconColor="text-blue-600" iconBg="bg-blue-50"
          trend={3.2} trendLabel="vs last month"
        />
        <StatCard
          title="Expected Revenue" value={totalUpcomingRevenue} prefix="₹"
          icon={<RefreshCw size={16} />} iconColor="text-emerald-600" iconBg="bg-emerald-50"
          sparklineData={[120000, 145000, 132000, 168000, 154000, 177000]}
        />
        <StatCard
          title="Expired" value={expired}
          icon={<XCircle size={16} />} iconColor="text-red-500" iconBg="bg-red-50"
        />
        <StatCard
          title="Successful" value={successful}
          icon={<CheckCircle2 size={16} />} iconColor="text-emerald-600" iconBg="bg-emerald-50"
          trend={5.1} trendLabel="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Renewal Table — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <SearchInput value={search} onChange={setSearch} placeholder="Search institute..." className="w-full sm:w-60" />
              <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <FilterChips 
              options={[
                { label: 'All', value: 'all', count: mockRenewals.length },
                { label: 'Upcoming', value: 'upcoming', count: mockRenewals.filter(r => r.status === 'upcoming').length },
                { label: 'Expired', value: 'expired', count: mockRenewals.filter(r => r.status === 'expired').length },
                { label: 'Cancelled', value: 'cancelled', count: mockRenewals.filter(r => r.status === 'cancelled').length },
                { label: 'Successful', value: 'successful', count: mockRenewals.filter(r => r.status === 'successful').length },
              ]} 
              selected={filter} 
              onChange={setFilter} 
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="py-2.5 px-4 w-12 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedRenewals.size === filtered.length && filtered.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  {['Institute', 'Plan', 'Amount', 'Renewal Date', 'Days', 'Auto', 'Status'].map(h => (
                    <th key={h} className="text-left py-2.5 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-slate-50/60 transition-colors cursor-pointer ${selectedRenewals.has(r.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(r.id)}
                  >
                    <td className="py-3 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedRenewals.has(r.id)}
                          onCheckedChange={() => toggleSelect(r.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-800">{r.instituteName}</td>
                    <td className="py-3 px-4 text-xs text-slate-400 max-w-[120px] truncate">{r.planName}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">₹{r.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">{r.renewalDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        r.daysUntilRenewal < 0
                          ? 'bg-red-50 text-red-600'
                          : r.daysUntilRenewal <= 7
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-slate-50 text-slate-500'
                      }`}>
                        {r.daysUntilRenewal < 0 ? `${Math.abs(r.daysUntilRenewal)}d ago` : `${r.daysUntilRenewal}d`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-bold ${r.autoRenewal ? 'text-emerald-600' : 'text-slate-300'}`}>
                        {r.autoRenewal ? 'ON' : 'OFF'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={r.status as 'upcoming' | 'expired' | 'cancelled' | 'successful'} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium text-slate-500">No renewals found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">

          {/* Calendar */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-1">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                Renewal Calendar
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Click a date to see renewals</p>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                renewal: renewalDates,
                expired: expiredDates,
              }}
              modifiersClassNames={{
                renewal: 'after:block after:w-1 after:h-1 after:bg-blue-500 after:rounded-full after:mx-auto after:-mt-0.5',
                expired: 'after:block after:w-1 after:h-1 after:bg-red-400 after:rounded-full after:mx-auto after:-mt-0.5',
              }}
              className="border-0"
            />
            {/* Legend */}
            <div className="flex items-center gap-4 px-4 pb-3 border-t border-slate-50 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] text-slate-500">Upcoming</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-[10px] text-slate-500">Expired</span>
              </div>
            </div>

            {/* Selected date renewals */}
            {selectedDate && (
              <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                <p className="text-[11px] font-semibold text-slate-500 mb-2">
                  {format(selectedDate, 'dd MMM yyyy')}
                </p>
                {selectedDateRenewals.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDateRenewals.map(r => (
                      <div key={r.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-800 truncate max-w-[120px]">{r.instituteName}</p>
                          <p className="text-[10px] text-slate-400">₹{r.amount.toLocaleString('en-IN')}</p>
                        </div>
                        <StatusBadge status={r.status as 'upcoming' | 'expired' | 'cancelled' | 'successful'} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No renewals on this date.</p>
                )}
              </div>
            )}
          </div>

          {/* Reminder Automation */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-bold text-slate-900 mb-0.5 flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-blue-500" /> Reminder Automation
            </h2>
            <p className="text-[11px] text-slate-400 mb-3">Send email + SMS before renewal</p>
            <div className="space-y-2">
              {REMINDER_DAYS.map(day => (
                <div key={day} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{day} {day === 1 ? 'Day' : 'Days'} Before</p>
                    <p className="text-[10px] text-slate-400">Email + SMS</p>
                  </div>
                  <Toggle
                    checked={reminders[day]}
                    onChange={v => setReminders(prev => ({ ...prev, [day]: v }))}
                  />
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-all">
              Save Settings
            </button>
          </div>

          {/* Renewal Timeline */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-purple-500" /> Timeline
            </h2>
            <div className="relative pl-4 space-y-3">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-slate-100" />
              {mockRenewals.slice(0, 4).map((r, i) => (
                <div key={r.id} className="relative flex items-start gap-3">
                  <div className={`absolute -left-3 top-1 w-2 h-2 rounded-full border-2 border-white ${
                    r.status === 'upcoming' ? 'bg-blue-500' :
                    r.status === 'successful' ? 'bg-emerald-500' :
                    r.status === 'expired' ? 'bg-red-400' : 'bg-slate-200'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{r.instituteName}</p>
                    <p className="text-[10px] text-slate-400">{r.renewalDate} · ₹{r.amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
