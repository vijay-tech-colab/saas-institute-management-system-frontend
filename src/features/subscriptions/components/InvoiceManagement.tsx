'use client';

import React, { useMemo, useState } from 'react';
import {
  Download, Mail, Eye, FileText, CheckCircle2, Clock, AlertCircle, XCircle, Plus, Loader2,
  Building2, CreditCard, IndianRupee, Percent, Calendar, Activity, Hash
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { DataTablePagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/skeleton";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { ColumnHeaderLabel, TableColumnDef, TableFieldsButton, useTableColumns } from "@/components/ui/table-configurator";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from '@/components/ui/empty-state';
import { motion } from "framer-motion";

import { PageHeader, SearchInput, FilterChips, Modal } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockInvoices } from '../data/mock-data';
import type { InvoiceStatus } from '../types';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Cancelled', value: 'cancelled' },
];

const getStatusIcon = (s: InvoiceStatus) => {
  switch (s) {
    case 'paid': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'unpaid': return <Clock className="w-4 h-4 text-amber-500" />;
    case 'cancelled': return <XCircle className="w-4 h-4 text-slate-400" />;
  }
};

const createInvoiceSchema = z.object({
  instituteName: z.string().min(2, "Institute name is required"),
  email: z.string().email("Valid email is required"),
  description: z.string().min(5, "Description is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
  gstPct: z.number().min(0).max(100, "Invalid GST %"),
  discount: z.number().min(0),
  dueDate: z.string().min(1, "Due date is required"),
});

type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;

function CreateInvoiceForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      instituteName: "",
      email: "",
      description: "",
      amount: 0,
      gstPct: 18,
      discount: 0,
    },
  });

  const amount = watch("amount") || 0;
  const gstPct = watch("gstPct") || 0;
  const discount = watch("discount") || 0;
  
  const gstAmount = (amount * gstPct) / 100;
  const total = amount + gstAmount - discount;

  const onSubmit = async (data: CreateInvoiceFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Invoice Data:", data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-1.5 font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="instituteName" required>Institute Name</Label>
          <Input id="instituteName" placeholder="e.g. Apex Institute" {...register("instituteName")} disabled={isLoading} error={!!errors.instituteName} />
          <ErrorMessage message={errors.instituteName?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" required>Email Address</Label>
          <Input id="email" type="email" placeholder="admin@apex.com" {...register("email")} disabled={isLoading} error={!!errors.email} />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label htmlFor="description" required>Description</Label>
          <Input id="description" placeholder="e.g. Custom Subscription Plan" {...register("description")} disabled={isLoading} error={!!errors.description} />
          <ErrorMessage message={errors.description?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="amount" required>Base Amount (₹)</Label>
          <Input id="amount" type="number" placeholder="0" {...register("amount", { valueAsNumber: true })} disabled={isLoading} error={!!errors.amount} />
          <ErrorMessage message={errors.amount?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gstPct" required>GST (%)</Label>
          <Input id="gstPct" type="number" placeholder="18" {...register("gstPct", { valueAsNumber: true })} disabled={isLoading} error={!!errors.gstPct} />
          <ErrorMessage message={errors.gstPct?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discount">Discount (₹)</Label>
          <Input id="discount" type="number" placeholder="0" {...register("discount", { valueAsNumber: true })} disabled={isLoading} error={!!errors.discount} />
          <ErrorMessage message={errors.discount?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dueDate" required>Due Date</Label>
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                disabled={isLoading}
                error={!!errors.dueDate}
              />
            )}
          />
          <ErrorMessage message={errors.dueDate?.message} />
        </div>
        
        {/* Total Calculation Preview */}
        <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-slate-500">Subtotal: ₹{amount.toLocaleString('en-IN')}</p>
            <p className="text-xs text-slate-500">+ GST: ₹{gstAmount.toLocaleString('en-IN')}</p>
            {discount > 0 && <p className="text-xs text-emerald-600">- Discount: ₹{discount.toLocaleString('en-IN')}</p>}
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase">Total Amount</p>
            <p className="text-xl font-black text-slate-900">₹{Math.max(0, total).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Create Invoice"}
        </button>
        <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function InvoiceManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const filtered = mockInvoices.filter(inv => {
    const matchSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.instituteName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || inv.status === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedInvoices.size === paginatedData.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(paginatedData.map(i => i.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedInvoices);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedInvoices(next);
  };

  const paid = mockInvoices.filter(i => i.status === 'paid');
  const unpaid = mockInvoices.filter(i => i.status === 'unpaid');
  const overdue = mockInvoices.filter(i => i.status === 'overdue');
  const totalRevenue = paid.reduce((s, i) => s + i.total, 0);

  type InvoiceRow = (typeof mockInvoices)[number];

  const columns: TableColumnDef<InvoiceRow>[] = useMemo(() => [
    {
      id: 'invoiceNumber',
      label: 'Invoice #',
      icon: Hash,
      defaultVisible: true,
      renderCell: (inv) => (
        <div className="flex items-center gap-1.5">
          {getStatusIcon(inv.status)}
          <span className="text-xs font-mono font-semibold text-slate-700">{inv.invoiceNumber}</span>
        </div>
      ),
    },
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      defaultVisible: true,
      renderCell: (inv) => (
        <div>
          <p className="text-[13px] font-semibold text-slate-800">{inv.instituteName}</p>
          <p className="text-[11px] text-slate-400">{inv.email}</p>
        </div>
      ),
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: CreditCard,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-xs font-medium text-slate-600">{inv.planName}</span>,
    },
    {
      id: 'amount',
      label: 'Amount',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-[13px] font-semibold text-slate-900 tabular-nums">₹{inv.amount.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'gst',
      label: 'GST',
      icon: Percent,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-xs text-slate-500 tabular-nums">₹{inv.gst.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'discount',
      label: 'Discount',
      icon: Percent,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-xs text-emerald-600 font-medium tabular-nums">₹{inv.discount.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'total',
      label: 'Total',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-[13px] font-semibold text-slate-900 tabular-nums">₹{inv.total.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'paymentMethod',
      label: 'Payment',
      icon: CreditCard,
      defaultVisible: true,
      renderCell: (inv) => <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-full">{inv.paymentMethod}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (inv) => <StatusBadge status={inv.status} />,
    },
    {
      id: 'invoiceDate',
      label: 'Invoice Date',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-xs text-slate-500">{new Date(inv.invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>,
    },
    {
      id: 'dueDate',
      label: 'Due Date',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (inv) => <span className="text-xs text-slate-500">{new Date(inv.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>,
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
  } = useTableColumns('subscriptions-invoices', columns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Invoice Management"
        description="View, download, and manage all invoices across tenants."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Invoices' }]}
      >
        <button className="flex items-center gap-2 px-3.5 py-2 text-xs bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-2xs cursor-pointer">
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export CSV
        </button>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-3.5 py-2 text-xs bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-all shadow-2xs cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> New Invoice
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <StatCard title="Total Revenue" value={totalRevenue} prefix="₹" icon={<CheckCircle2 size={18} />} tone="success" trend={7.2} trendLabel="vs last month" />
        <StatCard title="Paid Invoices" value={paid.length} icon={<CheckCircle2 size={18} />} tone="primary" />
        <StatCard title="Unpaid Invoices" value={unpaid.length} icon={<Clock size={18} />} tone="warning" />
        <StatCard title="Overdue" value={overdue.length} icon={<AlertCircle size={18} />} tone="danger" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search invoice or institute..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Invoice ID"
            />
          </div>
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: mockInvoices.length },
              { label: 'Paid', value: 'paid', count: mockInvoices.filter(i => i.status === 'paid').length },
              { label: 'Unpaid', value: 'unpaid', count: mockInvoices.filter(i => i.status === 'unpaid').length },
              { label: 'Overdue', value: 'overdue', count: mockInvoices.filter(i => i.status === 'overdue').length },
            ]} 
            selected={filter} 
            onChange={setFilter} 
          />
        </div>
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[1200px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-3 px-4 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedInvoices.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className={cn("text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.idThWithCheckbox)}>ID</th>
                {visibleColumns.map(col => (
                  <th key={col.id} className="text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  </th>
                ))}
                <th className={cn("py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide", TABLE_STICKY.actionTh)}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={totalCols} rows={pageSize} />
              ) : filtered.length > 0 ? (
                paginatedData.map((inv, i) => {
                  const isSelected = selectedInvoices.has(inv.id);
                  return (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b transition-colors group cursor-pointer",
                      isSelected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                    )}
                    onClick={() => toggleSelect(inv.id)}
                  >
                    <td className={cn("py-3.5 px-4 text-center align-middle", TABLE_STICKY.checkboxTd, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(inv.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className={cn("py-3.5 px-5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, isSelected && "bg-primary-light group-hover:bg-primary-light")}>
                      {inv.id}
                    </td>
                    {visibleColumns.map(col => (
                      <td key={col.id} className="py-3.5 px-5 whitespace-nowrap">
                        {col.renderCell(inv, i)}
                      </td>
                    ))}
                    <td className={cn("py-3.5 px-4", TABLE_STICKY.actionTd, isSelected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                      <RowActionMenu
                        items={[
                          { label: 'View Details', icon: Eye, onClick: () => router.push(`/dashboard/subscriptions/invoices/${inv.id}`) },
                          { label: 'Download PDF', icon: Download, onClick: () => {} },
                          { label: 'Send Email', icon: Mail, onClick: () => {} },
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
                      icon={FileText}
                      title="No invoices found"
                      description="No invoices match your current filters."
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

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Manual Invoice" size="lg">
        <CreateInvoiceForm onClose={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}

