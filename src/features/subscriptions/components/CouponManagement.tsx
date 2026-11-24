'use client';

import React, { useMemo, useState } from 'react';
import {
  Plus, Tag, Percent, IndianRupee, Clock, Trash2, Edit2, Copy, BarChart2, TrendingUp, DollarSign, Loader2,
  Calendar, Activity, Users, AlertCircle
} from 'lucide-react';
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
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all disabled:opacity-70 disabled:cursor-not-allowed ${discountType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
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
        <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
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

  const couponColumns: TableColumnDef<Coupon>[] = useMemo(() => [
    {
      id: 'code',
      label: 'Coupon Code',
      icon: Tag,
      defaultVisible: true,
      renderCell: (coupon) => (
        <span className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 font-mono text-xs font-semibold rounded-md tracking-wide">{coupon.code}</span>
      ),
    },
    {
      id: 'discount',
      label: 'Discount',
      icon: Percent,
      defaultVisible: true,
      renderCell: (coupon) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${coupon.discountType === 'percentage' ? 'bg-primary-light text-primary' : 'bg-sky-50 text-sky-700'}`}>
          {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
          <span className="opacity-70">{coupon.discountType === 'percentage' ? 'OFF' : 'flat'}</span>
        </span>
      ),
    },
    {
      id: 'usage',
      label: 'Usage',
      icon: Users,
      defaultVisible: true,
      renderCell: (coupon) => {
        const usagePct = (coupon.usageCount / coupon.maximumUsage) * 100;
        return (
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 rounded-full h-1.5 w-16 overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, usagePct)}%` }} />
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">{coupon.usageCount}/{coupon.maximumUsage}</span>
          </div>
        );
      },
    },
    {
      id: 'startDate',
      label: 'Start Date',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (coupon) => <span className="text-xs text-slate-500">{coupon.startDate}</span>,
    },
    {
      id: 'endDate',
      label: 'End Date',
      icon: Calendar,
      defaultVisible: true,
      renderCell: (coupon) => <span className="text-xs text-slate-500">{coupon.endDate}</span>,
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: IndianRupee,
      defaultVisible: true,
      renderCell: (coupon) => <span className="text-xs font-semibold text-emerald-600 tabular-nums">₹{coupon.revenueGenerated.toLocaleString('en-IN')}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      defaultVisible: true,
      renderCell: (coupon) => <StatusBadge status={coupon.status as 'active' | 'inactive' | 'expired'} />,
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
  } = useTableColumns('subscriptions-coupons', couponColumns);

  const totalCols = visibleColumns.length + 3;

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Coupon Management"
        description="Create and manage discount coupons, track usage and revenue impact."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'Coupons' }]}
      >
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-3.5 py-2 text-xs bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-all shadow-2xs cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Create Coupon
        </button>
      </PageHeader>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
        <StatCard title="Revenue Generated" value={totalRevenue} prefix="₹" icon={<TrendingUp size={18} />} tone="success" trend={22.4} trendLabel="vs last month" />
        <StatCard title="Total Usage" value={totalUsage} icon={<BarChart2 size={18} />} tone="primary" trend={15.1} trendLabel="vs last month" />
        <StatCard title="Active Coupons" value={activeCoupons} icon={<Tag size={18} />} tone="info" />
        <StatCard title="Expired Coupons" value={expiredCoupons} icon={<DollarSign size={18} />} tone="neutral" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search coupon code..." className="w-full sm:w-72" />
            <TableFieldsButton
              columns={orderedColumns}
              hiddenSet={hiddenSet}
              onToggle={toggleColumn}
              onMove={moveColumn}
              onHideAll={hideAllOptional}
              onShowAll={showAll}
              onReset={resetColumns}
              isCustomized={isCustomized}
              idFieldLabel="Coupon ID"
            />
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
        <div className="flex-1 overflow-x-auto bg-white thin-scrollbar">
          <table className="w-full min-w-[920px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTh)}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedCoupons.size === paginatedData.length && paginatedData.length > 0}
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
                paginatedData.map((coupon, i) => {
                  const selected = selectedCoupons.has(coupon.id);
                  return (
                    <motion.tr
                      key={coupon.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={cn(
                        "border-b transition-colors group cursor-pointer",
                        selected ? "bg-primary-light border-primary-border" : "bg-white hover:bg-slate-50 border-slate-100"
                      )}
                      onClick={() => toggleSelect(coupon.id)}
                    >
                      <td className={cn("py-2.5 px-3 text-center align-middle", TABLE_STICKY.checkboxTd, selected && "bg-primary-light group-hover:bg-primary-light")}>
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selected}
                            onCheckedChange={() => toggleSelect(coupon.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </td>
                      <td className={cn("py-2.5 px-3.5 text-[13px] font-medium text-slate-700 tabular-nums", TABLE_STICKY.idTdWithCheckbox, selected && "bg-primary-light group-hover:bg-primary-light")}>
                        {coupon.id}
                      </td>
                      {visibleColumns.map(col => (
                        <td key={col.id} className="py-2.5 px-3.5 whitespace-nowrap">
                          {col.renderCell(coupon, i)}
                        </td>
                      ))}
                      <td className={cn("py-2.5 px-3", TABLE_STICKY.actionTd, selected && "bg-primary-light group-hover:bg-primary-light")} onClick={(e) => e.stopPropagation()}>
                        <RowActionMenu
                          items={[
                            { label: 'Edit Coupon', icon: Edit2, onClick: () => {} },
                            { label: 'Duplicate', icon: Copy, onClick: () => {} },
                            { label: 'Delete Coupon', icon: Trash2, variant: 'danger', onClick: () => {} },
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
                      icon={Tag}
                      title="No coupons found"
                      description="No no coupons found found."
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

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Coupon" size="md">
        <CreateCouponForm onClose={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}

