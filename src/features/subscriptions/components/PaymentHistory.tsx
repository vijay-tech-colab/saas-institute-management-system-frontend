'use client';

import React, { useState } from 'react';
import { Download, CreditCard, RefreshCcw, CheckCircle2, XCircle, Clock, AlertCircle, Filter, RotateCcw, RefreshCw } from 'lucide-react';
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { ActionTooltip } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { PageHeader, SearchInput, FilterChips } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockPayments } from '../data/mock-data';
import type { PaymentStatus } from '../types';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Successful', value: 'successful' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Pending', value: 'pending' },
];

const GATEWAY_BADGE: Record<string, string> = {
  'Razorpay':      'bg-blue-50 text-blue-700',
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Successful" value={successful.length} subtitle={`₹${(totalRevenue / 1000).toFixed(0)}K collected`} icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={8.1} trendLabel="vs last month" />
        <StatCard title="Failed" value={failed.length} icon={<AlertCircle size={20} />} iconColor="text-red-600" iconBg="bg-red-50" trend={-15.2} trendLabel="vs last month" />
        <StatCard title="Refunded" value={refunded.length} icon={<RotateCcw size={20} />} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <StatCard title="Pending" value={pending.length} icon={<CreditCard size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by TxnID or institute..." className="w-full sm:w-80" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedPayments.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Transaction ID', 'Institute', 'Gateway', 'Amount', 'Status', 'Invoice', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={8} rows={pageSize} />
              ) : (
                paginatedData.map((pay, i) => (
                  <motion.tr
                    key={pay.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selectedPayments.has(pay.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(pay.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedPayments.has(pay.id)}
                          onCheckedChange={() => toggleSelect(pay.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <code className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded">{pay.transactionId}</code>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-slate-800">{pay.instituteName}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${GATEWAY_BADGE[pay.gateway] || 'bg-slate-100 text-slate-600'}`}>{pay.gateway}</span>
                    </td>
                    <td className="py-3.5 px-4 text-sm font-bold text-slate-900">₹{pay.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={pay.status} /></td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-500">{pay.invoiceNumber}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{new Date(pay.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        {pay.status === 'failed' && (
                          <ActionTooltip icon={RefreshCw} tooltip="Retry Payment" variant="danger" />
                        )}
                        {pay.status === 'successful' && (
                          <ActionTooltip icon={RotateCcw} tooltip="Refund Payment" variant="warning" />
                        )}
                        <ActionTooltip icon={Download} tooltip="Download Receipt" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No payments found</p>
            </div>
          )}
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
    </div>
  );
}
