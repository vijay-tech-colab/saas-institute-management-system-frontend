import React, { useState } from 'react';
import { MoreVertical, Search, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { ActionTooltip } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

export function SubscriptionsList() {
  const subscriptions = [
    { id: 1, institute: 'Delhi Public School', plan: 'Enterprise', status: 'Active', cycle: 'Yearly', mrr: '$999', nextBilling: 'Oct 24, 2026' },
    { id: 2, institute: 'Oxford Academy', plan: 'Pro Plan', status: 'Active', cycle: 'Monthly', mrr: '$299', nextBilling: 'Nov 01, 2026' },
    { id: 3, institute: 'Sunrise High School', plan: 'Basic Plan', status: 'Past Due', cycle: 'Monthly', mrr: '$99', nextBilling: 'Oct 15, 2026' },
    { id: 4, institute: 'St. Xaviers College', plan: 'Enterprise', status: 'Active', cycle: 'Yearly', mrr: '$1,299', nextBilling: 'Jan 10, 2027' },
    { id: 5, institute: 'Greenwood Institute', plan: 'Pro Plan', status: 'Active', cycle: 'Monthly', mrr: '$299', nextBilling: 'Nov 05, 2026' },
  ];

  const [selectedSubs, setSelectedSubs] = useState<Set<number>>(new Set());

  const toggleSelectAll = () => {
    if (selectedSubs.size === subscriptions.length) {
      setSelectedSubs(new Set());
    } else {
      setSelectedSubs(new Set(subscriptions.map(s => s.id)));
    }
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selectedSubs);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedSubs(next);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by institute name..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20">
            <option>All Plans</option>
            <option>Enterprise</option>
            <option>Pro</option>
            <option>Basic</option>
          </select>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20">
            <option>All Status</option>
            <option>Active</option>
            <option>Past Due</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-4 w-12 text-center align-middle">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={selectedSubs.size === subscriptions.length && subscriptions.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th className="px-6 py-4">Institute Name</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Billing Cycle</th>
              <th className="px-6 py-4">MRR</th>
              <th className="px-6 py-4">Next Billing</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscriptions.map((sub) => (
              <tr 
                key={sub.id} 
                className={`hover:bg-slate-50 transition-colors group cursor-pointer ${selectedSubs.has(sub.id) ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                onClick={() => toggleSelect(sub.id)}
              >
                <td className="px-6 py-4 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedSubs.has(sub.id)}
                      onCheckedChange={() => toggleSelect(sub.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">{sub.institute}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                    sub.plan === 'Enterprise' ? 'bg-slate-900 text-white' : 
                    sub.plan === 'Pro Plan' ? 'bg-indigo-100 text-indigo-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {sub.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {sub.status === 'Active' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                      <AlertCircle className="w-3.5 h-3.5" /> Past Due
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {sub.cycle}
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">{sub.mrr}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">
                  {sub.nextBilling}
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <ActionTooltip icon={FileText} tooltip="View Invoice" />
                    <ActionTooltip icon={MoreVertical} tooltip="More Options" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
