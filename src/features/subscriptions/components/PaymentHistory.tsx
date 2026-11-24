'use client';

import React, { useMemo, useState } from 'react';
import {
  Download, CreditCard, CheckCircle2, AlertCircle, RotateCcw, RefreshCw, DownloadCloud, FileText,
  Hash, Building2, IndianRupee, Activity, Calendar
} from 'lucide-react';
import { AnimatePresence } from "framer-motion";
import { ExportProgressModal } from '@/components/ui/export-progress';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { PageHeader, SearchInput, FilterChips } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockPayments } from '../data/mock-data';
import type { PaymentStatus } from '../types';
import { EmptyState } from '@/components/ui/empty-state';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Successful', value: 'successful' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Pending', value: 'pending' },
];

const GATEWAY_BADGE: Record<string, string> = {
  'Razorpay':      'bg-indigo-50 text-indigo-700',
  'Stripe':        'bg-purple-50 text-purple-700',
  'UPI':           'bg-orange-50 text-orange-700',
  'Bank Transfer': 'bg-emerald-50 text-emerald-700',
};

export function PaymentHistory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPayments, setSelectedPayments] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);

  // Export states
  const [exportModalType, setExportModalType] = useState<'export' | 'report' | null>(null);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const filtered = mockPayments.filter(p => {
    const matchSearch = p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.instituteName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedPayments.size === paginatedData.length) {
      setSelectedPayments(new Set());
    } else {
      setSelectedPayments(new Set(paginatedData.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedPayments);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedPayments(next);
  };

  const successful = mockPayments.filter(p => p.status === 'successful');
  const failed = mockPayments.filter(p => p.status === 'failed');
  const refunded = mockPayments.filter(p => p.status === 'refunded');
  const pending = mockPayments.filter(p => p.status === 'pending');

  const totalRevenue = successful.reduce((s, p) => s + p.amount, 0);

  const handleExport = () => {
    setExportModalType('export');
  };

  const handleReport = () => {
    setExportModalType('report');
  };

  type PaymentRow = (typeof mockPayments)[number];

  const columns: TableColumnDef<PaymentRow>[] = useMemo(() => [
    {
      id: 'transactionId',
      label: 'Transaction ID',
      icon: Hash,
      defaultVisible: true,
      renderCell: (pay) => (
        <code className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/70">{pay.transactionId}</code>
      ),
    },
    {
      id: 'instituteName',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (pay) => <span className="text-[13px] font-semibold text-slate-800">{pay.instituteName}</span>,
    },
    {
      id: 'gateway',
      label: 'Gateway',
      icon: CreditCard,
      defaultVisible: true,
      renderCell: (pay) => (
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${GATEWAY_BADGE[pay.gateway] || 'bg-slate-100 text-slate-600'}`}>{pay.gateway}</span>
      ),
    },
    {
      id: 'amount',
      label: 'Amount',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (pay) => <span className="text-[13px] font-semibold text-slate-900 tabular-nums">₹{pay.amount.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (pay) => <StatusBadge status={pay.status} />,
    },
    {
      id: 'invoiceNumber',
      label: 'Invoice',
      icon: FileText,
      defaultVisible: true,
      renderCell: (pay) => <span className="text-xs font-mono text-slate-500">{pay.invoiceNumber}</span>,
    },
    {
      id: 'paymentDate',
      label: 'Date',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (pay) => <span className="text-xs text-slate-500">{new Date(pay.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>,
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
  } = useTableColumns('subscriptions-payments', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Payment History"
        description="Track all payment transactions, refunds, and gateway activity."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Payments' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
          <Download className="w-4 h-4" /> Export
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <StatCard title="Successful" value={successful.length} subtitle={`₹${(totalRevenue / 1000).toFixed(0)}K collected`} icon={<CheckCircle2 size={18} />} tone="success" trend={8.1} trendLabel="vs last month" />
        <StatCard title="Failed" value={failed.length} icon={<AlertCircle size={18} />} tone="danger" trend={-15.2} trendLabel="vs last month" />
        <StatCard title="Refunded" value={refunded.length} icon={<RotateCcw size={18} />} tone="neutral" />
        <StatCard title="Pending" value={pending.length} icon={<CreditCard size={18} />} tone="warning" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by TxnID or institute..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Payment ID"
            />
          </div>
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: mockPayments.length },
              { label: 'Successful', value: 'successful', count: mockPayments.filter(p => p.status === 'successful').length },
              { label: 'Failed', value: 'failed', count: mockPayments.filter(p => p.status === 'failed').length },
              { label: 'Refunded', value: 'refunded', count: mockPayments.filter(p => p.status === 'refunded').length },
            ]} 
            selected={filter} 
            onChange={setFilter} 
          />
        </div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedPayments.size > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-light border-b border-primary-border px-4 py-3 flex items-center justify-between overflow-hidden"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{selectedPayments.size} payments selected</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <DownloadCloud className="w-3.5 h-3.5 text-slate-500" />
                  Export (CSV)
                </button>
                <button 
                  onClick={handleReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary-border text-primary text-xs font-semibold rounded-lg hover:bg-primary-light transition-colors shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Report (PDF)
                </button>
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
                  Send Receipt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[960px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedPayments.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className={cn("text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.idThWithCheckbox)}>ID</th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  </th>
                ))}
                <th className={cn("py-2.5 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : filtered.length > 0 ? (
                paginatedData.map((pay, i) => {
                  const isSelected = selectedPayments.has(pay.id);
                  return (
                  <motion.tr
                    key={pay.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(pay.id)}
                  >
                    <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(pay.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {pay.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                        {col.renderCell(pay, i)}
                      </td>
                    ))}
                    <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'Retry Payment', icon: RefreshCw, variant: 'danger', hidden: pay.status !== 'failed', onClick: () => {} },
                          { label: 'Refund Payment', icon: RotateCcw, variant: 'warning', hidden: pay.status !== 'successful', onClick: () => {} },
                          { label: 'Download Receipt', icon: Download, onClick: () => {} },
                        ]}
                      />
                    </td>
                  </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={totalCols} className="p-8">
                    <EmptyState
                      icon={CreditCard}
                      title="No payments found"
                      description="No payments match your current filters."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
          <DataTablePagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalRows={filtered.length}
          />
        </div>
      </div>

      <ExportProgressModal 
        isOpen={!!exportModalType}
        onClose={() => setExportModalType(null)}
        type={exportModalType || 'export'}
        totalRows={selectedPayments.size}
      />
    </div>
  );
}

