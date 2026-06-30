'use client';

import React, { useState } from 'react';
import { Download, Mail, Printer, Eye, Search, FileText, CheckCircle2, Clock, AlertCircle, XCircle, Plus, Loader2, Edit2, Trash2, Send, Filter } from 'lucide-react';
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
import { ActionTooltip } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
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
        <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Invoice Management"
        description="View, download, and manage all invoices across tenants."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Invoices' }]}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 active:scale-95">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue" value={totalRevenue} prefix="₹" icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={7.2} trendLabel="vs last month" />
        <StatCard title="Paid Invoices" value={paid.length} icon={<CheckCircle2 size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Unpaid Invoices" value={unpaid.length} icon={<Clock size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Overdue" value={overdue.length} icon={<AlertCircle size={20} />} iconColor="text-red-600" iconBg="bg-red-50" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search invoice or institute..." className="w-full sm:w-80" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
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
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-3 px-4 w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedInvoices.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Invoice #', 'Institute', 'Plan', 'Amount', 'GST', 'Discount', 'Total', 'Payment', 'Status', 'Invoice Date', 'Due Date', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={12} rows={pageSize} />
              ) : (
                paginatedData.map((inv, i) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selectedInvoices.has(inv.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                    onClick={() => toggleSelect(inv.id)}
                  >
                    <td className="py-3.5 px-4 text-center align-middle">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedInvoices.has(inv.id)}
                          onCheckedChange={() => toggleSelect(inv.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(inv.status)}
                        <span className="text-xs font-mono font-semibold text-slate-700">{inv.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-semibold text-slate-800">{inv.instituteName}</p>
                      <p className="text-[10px] text-slate-400">{inv.email}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] font-semibold text-slate-600">{inv.planName}</td>
                    <td className="py-3.5 px-4 text-sm font-bold text-slate-900">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">₹{inv.gst.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-xs text-emerald-600 font-medium">₹{inv.discount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-sm font-black text-slate-900">₹{inv.total.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full">{inv.paymentMethod}</span>
                    </td>
                    <td className="py-3.5 px-4"><StatusBadge status={inv.status} /></td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{new Date(inv.invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{new Date(inv.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        <ActionTooltip icon={Eye} tooltip="View Details" onClick={() => router.push(`/dashboard/subscriptions/invoices/${inv.id}`)} />
                        <ActionTooltip icon={Download} tooltip="Download PDF" />
                        <ActionTooltip icon={Mail} tooltip="Send Email" />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No invoices found</p>
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

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Manual Invoice" size="lg">
        <CreateInvoiceForm onClose={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}
