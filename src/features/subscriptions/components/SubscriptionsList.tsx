import React, { useMemo, useState } from 'react';
import {
  Search, CheckCircle2, AlertCircle, FileText, Eye, RefreshCw,
  Building2, CreditCard, Activity, Calendar, IndianRupee
} from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";

const INITIAL_SUBSCRIPTIONS = [
  { id: 1, institute: 'Delhi Public School', plan: 'Enterprise', status: 'Active', cycle: 'Yearly', mrr: '$999', nextBilling: 'Oct 24, 2026' },
  { id: 2, institute: 'Oxford Academy', plan: 'Pro Plan', status: 'Active', cycle: 'Monthly', mrr: '$299', nextBilling: 'Nov 01, 2026' },
  { id: 3, institute: 'Sunrise High School', plan: 'Basic Plan', status: 'Past Due', cycle: 'Monthly', mrr: '$99', nextBilling: 'Oct 15, 2026' },
  { id: 4, institute: 'St. Xaviers College', plan: 'Enterprise', status: 'Active', cycle: 'Yearly', mrr: '$1,299', nextBilling: 'Jan 10, 2027' },
  { id: 5, institute: 'Greenwood Institute', plan: 'Pro Plan', status: 'Active', cycle: 'Monthly', mrr: '$299', nextBilling: 'Nov 05, 2026' },
];

type SubscriptionRow = (typeof INITIAL_SUBSCRIPTIONS)[number];

export function SubscriptionsList() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedSubs, setSelectedSubs] = useState<Set<number>>(new Set());

  const subscriptions = useMemo(() => {
    return INITIAL_SUBSCRIPTIONS.filter((sub) => {
      const matchSearch =
        !search.trim() ||
        sub.institute.toLowerCase().includes(search.toLowerCase()) ||
        `SUB-${String(sub.id).padStart(3, '0')}`.toLowerCase().includes(search.toLowerCase());
      const matchPlan =
        planFilter === 'All Plans' || sub.plan.toLowerCase().includes(planFilter.toLowerCase());
      const matchStatus =
        statusFilter === 'All Status' || sub.status === statusFilter;
      return matchSearch && matchPlan && matchStatus;
    });
  }, [search, planFilter, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedSubs.size === subscriptions.length && subscriptions.length > 0) {
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

  const columns: TableColumnDef<SubscriptionRow>[] = useMemo(() => [
    {
      id: 'institute',
      label: 'Institute Name',
      icon: Building2,
      renderCell: (sub) => <span className="font-semibold text-slate-900">{sub.institute}</span>,
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: CreditCard,
      renderCell: (sub) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
          sub.plan === 'Enterprise' ? 'bg-slate-900 text-white' :
          sub.plan === 'Pro Plan' ? 'bg-primary-light text-primary-dark' :
          'bg-slate-100 text-slate-700'
        }`}>
          {sub.plan}
        </span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      renderCell: (sub) => (
        sub.status === 'Active' ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" /> Past Due
          </span>
        )
      ),
    },
    {
      id: 'cycle',
      label: 'Billing Cycle',
      icon: RefreshCw,
      renderCell: (sub) => <span className="text-slate-600 font-medium text-xs">{sub.cycle}</span>,
    },
    {
      id: 'mrr',
      label: 'MRR',
      icon: IndianRupee,
      renderCell: (sub) => <span className="font-semibold text-slate-900 tabular-nums">{sub.mrr}</span>,
    },
    {
      id: 'nextBilling',
      label: 'Next Billing',
      icon: Calendar,
      renderCell: (sub) => <span className="text-slate-500 text-xs">{sub.nextBilling}</span>,
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
  } = useTableColumns('subscriptions-list', columns);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col flex-1">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by institute name or ID..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All Plans">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Basic">Basic</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Past Due">Past Due</option>
          </select>
          <TableFieldsButton
            columns={orderedColumns}
            hiddenSet={hiddenSet}
            onToggle={toggleColumn}
            onMove={moveColumn}
            onHideAll={hideAllOptional}
            onShowAll={showAll}
            onReset={resetColumns}
            isCustomized={isCustomized}
            idFieldLabel="Subscription ID"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto thin-scrollbar">
        <table className="w-full min-w-[820px] text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className={cn("px-4 py-3.5 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={selectedSubs.size === subscriptions.length && subscriptions.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th className={cn("px-4 py-3.5", TABLE_STICKY.idThWithCheckbox)}>ID</th>
              {visibleColumns.map(col => (
                <th key={col.id} className="px-4 py-3.5">
                  <ColumnHeaderLabel label={col.label} icon={col.icon} />
                </th>
              ))}
              <th className={cn("px-4 py-3.5 text-right", TABLE_STICKY.actionTh)}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscriptions.map((sub, i) => {
              const isSelected = selectedSubs.has(sub.id);
              return (
              <tr
                key={sub.id}
                className={cn(
                  "hover:bg-slate-50 transition-colors group cursor-pointer",
                  isSelected && "bg-primary-light hover:bg-primary-light"
                )}
                onClick={() => toggleSelect(sub.id)}
              >
                <td className={cn(
                  "px-4 py-3.5 text-center align-middle",
                  TABLE_STICKY.checkboxTd,
                  isSelected && "bg-primary-light group-hover:bg-primary-light"
                )}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(sub.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </td>
                <td className={cn(
                  "px-4 py-3.5 text-sm font-medium text-slate-700 tabular-nums",
                  TABLE_STICKY.idTdWithCheckbox,
                  isSelected && "bg-primary-light group-hover:bg-primary-light"
                )}>
                  SUB-{String(sub.id).padStart(3, '0')}
                </td>
                {visibleColumns.map(col => (
                  <td key={col.id} className="px-4 py-3.5">
                    {col.renderCell(sub, i)}
                  </td>
                ))}
                <td
                  className={cn(
                    "px-4 py-3.5 text-right",
                    TABLE_STICKY.actionTd,
                    isSelected && "bg-primary-light group-hover:bg-primary-light"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <RowActionMenu
                    ariaLabel={`Actions for ${sub.institute}`}
                    items={[
                      {
                        label: 'View Subscription',
                        icon: Eye,
                        variant: 'primary',
                        onClick: () => {},
                      },
                      {
                        label: 'View Invoice',
                        icon: FileText,
                        onClick: () => {},
                      },
                      {
                        label: 'Sync Billing',
                        icon: RefreshCw,
                        onClick: () => {},
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
  );
}

