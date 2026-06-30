'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type StatusVariant =
  | 'active' | 'trial' | 'expired' | 'cancelled' | 'suspended' | 'pending'
  | 'success' | 'successful' | 'failed' | 'refunded'
  | 'paid' | 'unpaid' | 'overdue'
  | 'popular' | 'inactive' | 'deprecated'
  | 'upcoming' | 'ending_soon' | 'converted'
  | 'completed' | 'processing' | 'blocked'
  | 'critical' | 'warning' | 'high' | 'medium' | 'low'
  | 'action_required'
  | 'open' | 'in_progress' | 'resolved'
  | 'payment' | 'policy' | 'manual' | 'automated'
  | 'basic' | 'pro' | 'enterprise';

const variantMap: Record<StatusVariant, { label: string; className: string; dotColor: string }> = {
  active:       { label: 'Active',        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  trial:        { label: 'Trial',         className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  expired:      { label: 'Expired',       className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  cancelled:    { label: 'Cancelled',     className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  suspended:    { label: 'Suspended',     className: 'bg-orange-50 text-orange-700 border border-orange-200',   dotColor: 'bg-orange-500' },
  pending:      { label: 'Pending',       className: 'bg-amber-50 text-amber-700 border border-amber-200',      dotColor: 'bg-amber-500' },
  success:      { label: 'Success',       className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  successful:   { label: 'Successful',    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  failed:       { label: 'Failed',        className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  refunded:     { label: 'Refunded',      className: 'bg-purple-50 text-purple-700 border border-purple-200',   dotColor: 'bg-purple-500' },
  paid:         { label: 'Paid',          className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  unpaid:       { label: 'Unpaid',        className: 'bg-amber-50 text-amber-700 border border-amber-200',      dotColor: 'bg-amber-500' },
  overdue:      { label: 'Overdue',       className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  popular:      { label: 'Popular',       className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  inactive:     { label: 'Inactive',      className: 'bg-slate-100 text-slate-500 border border-slate-200',     dotColor: 'bg-slate-400' },
  deprecated:   { label: 'Deprecated',    className: 'bg-slate-100 text-slate-500 border border-slate-200',     dotColor: 'bg-slate-400' },
  upcoming:     { label: 'Upcoming',      className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  ending_soon:  { label: 'Ending Soon',   className: 'bg-orange-50 text-orange-700 border border-orange-200',   dotColor: 'bg-orange-500' },
  converted:    { label: 'Converted',     className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  critical:     { label: 'Critical',      className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  warning:      { label: 'Warning',       className: 'bg-amber-50 text-amber-700 border border-amber-200',      dotColor: 'bg-amber-500' },
  high:         { label: 'High',          className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  medium:       { label: 'Medium',        className: 'bg-amber-50 text-amber-700 border border-amber-200',      dotColor: 'bg-amber-500' },
  low:          { label: 'Low',           className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  completed:    { label: 'Completed',     className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  processing:   { label: 'Processing',    className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  blocked:      { label: 'Blocked',       className: 'bg-red-50 text-red-700 border border-red-200',            dotColor: 'bg-red-500' },
  action_required: { label: 'Action Required', className: 'bg-red-50 text-red-700 border border-red-200',       dotColor: 'bg-red-500' },
  
  // New standardized badges for Support & Tenants
  open:         { label: 'Open',          className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  in_progress:  { label: 'In Progress',   className: 'bg-amber-50 text-amber-700 border border-amber-200',      dotColor: 'bg-amber-500' },
  resolved:     { label: 'Resolved',      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',dotColor: 'bg-emerald-500' },
  payment:      { label: 'Payment Issue', className: 'bg-rose-50 text-rose-700 border border-rose-200',         dotColor: 'bg-rose-500' },
  policy:       { label: 'Policy Violation', className: 'bg-purple-50 text-purple-700 border border-purple-200',dotColor: 'bg-purple-500' },
  manual:       { label: 'Manual',        className: 'bg-slate-100 text-slate-700 border border-slate-200',     dotColor: 'bg-slate-500' },
  automated:    { label: 'Automated',     className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  basic:        { label: 'Basic',         className: 'bg-slate-100 text-slate-700 border border-slate-200',     dotColor: 'bg-slate-500' },
  pro:          { label: 'Pro',           className: 'bg-blue-50 text-blue-700 border border-blue-200',         dotColor: 'bg-blue-500' },
  enterprise:   { label: 'Enterprise',    className: 'bg-indigo-50 text-indigo-700 border border-indigo-200',   dotColor: 'bg-indigo-500' },
};

interface StatusBadgeProps {
  status: StatusVariant;
  label?: React.ReactNode;
  showDot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, label, showDot = true, size = 'sm', className }: StatusBadgeProps) {
  const config = variantMap[status] || { label: status, className: 'bg-slate-100 text-slate-600 border border-slate-200', dotColor: 'bg-slate-400' };
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-semibold rounded-full',
      size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
      config.className,
      className
    )}>
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dotColor)} />}
      {label ?? config.label}
    </span>
  );
}
