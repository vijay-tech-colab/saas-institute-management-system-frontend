'use client';

import React, { useState } from 'react';
import { Plus, Tag, Percent, IndianRupee, Clock, CheckCircle2, XCircle, Trash2, Edit2, Copy, BarChart2, TrendingUp, DollarSign, Filter, AlertCircle, Loader2 } from 'lucide-react';
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
import { PageHeader, SearchInput, FilterChips, Modal, Toggle } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { StatCard } from './shared/StatCard';
import { mockCoupons } from '../data/mock-data';
import type { Coupon } from '../types';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Expired', value: 'expired' },
];

function CouponRow({ coupon, index, selected, onToggle }: { coupon: Coupon; index: number; selected: boolean; onToggle: () => void }) {
  const usagePct = (coupon.usageCount / coupon.maximumUsage) * 100;
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className={`border-b hover:bg-blue-50/20 transition-colors group cursor-pointer ${selected ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
      onClick={onToggle}
    >
      <td className="py-3.5 px-4 text-center align-middle">
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selected}
            onCheckedChange={onToggle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-slate-900 text-white font-mono text-[11px] font-bold rounded-lg tracking-widest">{coupon.code}</span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${coupon.discountType === 'percentage' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
          {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
          <span className="opacity-60">{coupon.discountType === 'percentage' ? 'OFF' : 'flat'}</span>
        </span>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-20">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(100, usagePct)}%` }} />
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap">{coupon.usageCount}/{coupon.maximumUsage}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-xs text-slate-500">{coupon.startDate}</td>
      <td className="py-3.5 px-4 text-xs text-slate-500">{coupon.endDate}</td>
      <td className="py-3.5 px-4 text-xs font-semibold text-emerald-600">₹{coupon.revenueGenerated.toLocaleString('en-IN')}</td>
      <td className="py-3.5 px-4"><StatusBadge status={coupon.status as 'active' | 'inactive' | 'expired'} /></td>
      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1.5">
          <ActionTooltip icon={Edit2} tooltip="Edit Coupon" />
          <ActionTooltip icon={Copy} tooltip="Duplicate" />
          <ActionTooltip icon={Trash2} tooltip="Delete Coupon" variant="danger" />
        </div>
      </td>
    </motion.tr>
  );
}

const createCouponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  discountType: z.enum(["percentage", "flat"]),
  discountValue: z.number().min(1, "Must be greater than 0"),
  maxDiscount: z.number().optional(),
  minPurchase: z.number().min(0).optional(),
  maxUsage: z.number().min(1, "Must be at least 1").optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  oneTime: z.boolean(),
});

type CreateCouponFormData = z.infer<typeof createCouponSchema>;

function CreateCouponForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateCouponFormData>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minPurchase: 0,
      oneTime: false,
    },
  });

  const discountType = watch("discountType");
  const oneTime = watch("oneTime");

  const onSubmit = async (data: CreateCouponFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Coupon Data:", data);
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

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setValue('code', code, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1.5">
          <Label htmlFor="code" required>Coupon Code</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input id="code" placeholder="e.g. SAVE50" className="uppercase font-mono" {...register("code")} disabled={isLoading} error={!!errors.code} />
              <ErrorMessage message={errors.code?.message} />
            </div>
            <button type="button" onClick={generateCode} disabled={isLoading} className="px-3 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed">Generate</button>
          </div>
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label required>Discount Type</Label>
          <div className="flex gap-2">
            {(['percentage', 'flat'] as const).map(t => (
              <button
                key={t}
                type="button"
                disabled={isLoading}
                onClick={() => setValue("discountType", t, { shouldValidate: true })}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all disabled:opacity-70 disabled:cursor-not-allowed ${discountType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
              >
                {t === 'percentage' ? '% Percentage' : '₹ Flat Amount'}
              </button>
            ))}
          </div>
          <ErrorMessage message={errors.discountType?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discountValue" required>Discount Value</Label>
          <Input id="discountValue" type="number" placeholder={discountType === 'percentage' ? '0–100' : '₹ amount'} {...register("discountValue", { valueAsNumber: true })} disabled={isLoading} error={!!errors.discountValue} />
          <ErrorMessage message={errors.discountValue?.message} />
        </div>
        {discountType === 'percentage' && (
          <div className="space-y-1.5">
            <Label htmlFor="maxDiscount">Max Discount (₹)</Label>
            <Input id="maxDiscount" type="number" placeholder="Cap amount" {...register("maxDiscount", { valueAsNumber: true })} disabled={isLoading} error={!!errors.maxDiscount} />
            <ErrorMessage message={errors.maxDiscount?.message} />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="minPurchase">Min Purchase (₹)</Label>
          <Input id="minPurchase" type="number" placeholder="0" {...register("minPurchase", { valueAsNumber: true })} disabled={isLoading} error={!!errors.minPurchase} />
          <ErrorMessage message={errors.minPurchase?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="maxUsage">Max Usage</Label>
          <Input id="maxUsage" type="number" placeholder="Unlimited" {...register("maxUsage", { valueAsNumber: true })} disabled={isLoading} error={!!errors.maxUsage} />
          <ErrorMessage message={errors.maxUsage?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="startDate" required>Start Date</Label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                disabled={isLoading}
                error={!!errors.startDate}
              />
            )}
          />
          <ErrorMessage message={errors.startDate?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endDate" required>End Date</Label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                disabled={isLoading}
                error={!!errors.endDate}
              />
            )}
          />
          <ErrorMessage message={errors.endDate?.message} />
        </div>
        <div className="col-span-2 flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
          <div>
            <p className="text-sm font-semibold text-slate-700">One-time use per user</p>
            <p className="text-xs text-slate-400">Limit each user to one redemption</p>
          </div>
          <Toggle checked={oneTime} onChange={(v) => setValue("oneTime", v)} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Create Coupon"}
        </button>
        <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function CouponManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isTableLoading, setIsTableLoading] = useState(true);

  React.useEffect(() => {
    setIsTableLoading(true);
    const timer = setTimeout(() => setIsTableLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, search, filter]);

  const filtered = mockCoupons.filter(c => {
    const matchSearch = c.code.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const toggleSelectAll = () => {
    if (selectedCoupons.size === paginatedData.length) {
      setSelectedCoupons(new Set());
    } else {
      setSelectedCoupons(new Set(paginatedData.map(c => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedCoupons);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedCoupons(next);
  };

  const totalRevenue = mockCoupons.reduce((s, c) => s + c.revenueGenerated, 0);
  const totalUsage = mockCoupons.reduce((s, c) => s + c.usageCount, 0);
  const activeCoupons = mockCoupons.filter(c => c.status === 'active').length;
  const expiredCoupons = mockCoupons.filter(c => c.status === 'expired').length;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Coupon Management"
        description="Create and manage discount coupons, track usage and revenue impact."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Coupons' }]}
      >
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </PageHeader>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Revenue Generated" value={totalRevenue} prefix="₹" icon={<TrendingUp size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" trend={22.4} trendLabel="vs last month" />
        <StatCard title="Total Usage" value={totalUsage} icon={<BarChart2 size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" trend={15.1} trendLabel="vs last month" />
        <StatCard title="Active Coupons" value={activeCoupons} icon={<Tag size={20} />} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <StatCard title="Expired Coupons" value={expiredCoupons} icon={<DollarSign size={20} />} iconColor="text-slate-400" iconBg="bg-slate-100" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search coupon code..." className="w-full sm:w-72" />
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: mockCoupons.length },
              { label: 'Active', value: 'active', count: mockCoupons.filter(c => c.status === 'active').length },
              { label: 'Expired', value: 'expired', count: mockCoupons.filter(c => c.status === 'expired').length },
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
                      checked={selectedCoupons.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                {['Coupon Code', 'Discount', 'Usage', 'Start Date', 'End Date', 'Revenue', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <TableSkeleton columns={9} rows={pageSize} />
              ) : (
                paginatedData.map((c, i) => <CouponRow key={c.id} coupon={c} index={i} selected={selectedCoupons.has(c.id)} onToggle={() => toggleSelect(c.id)} />)
              )}
            </tbody>
          </table>
          {!isTableLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No coupons found</p>
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

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Coupon" size="md">
        <CreateCouponForm onClose={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}
