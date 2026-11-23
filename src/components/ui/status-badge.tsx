'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type StatusVariant =
  // Lifecycle / Account States
  | 'active' | 'trial' | 'expired' | 'cancelled' | 'suspended' | 'pending' | 'inactive' | 'deprecated' | 'archived'
  // Transaction / Invoicing States
  | 'paid' | 'unpaid' | 'overdue' | 'refunded' | 'failed' | 'success' | 'successful'
  // Support & Workflow States
  | 'open' | 'in_progress' | 'resolved' | 'action_required' | 'blocked' | 'processing' | 'completed'
  // Severity & System Health States
  | 'healthy' | 'degraded' | 'down' | 'critical' | 'warning' | 'high' | 'medium' | 'low' | 'info'
  // Violations & Reasons
  | 'payment' | 'policy' | 'manual' | 'automated'
  // Plans & Marketing
  | 'basic' | 'pro' | 'enterprise' | 'popular' | 'upcoming' | 'ending_soon' | 'converted';

export interface StatusConfig {
  label: string;
  className: string;
  dotColor: string;
}

/**
 * Universal Semantic Status Color Map
 * Adheres strictly to universal psychological color signaling:
 * - Green (Success): Action completed, healthy, active, safe.
 * - Amber/Yellow (Warning): Pending, trial, attention needed, non-blocking risk.
 * - Red (Error / Danger): Critical, suspended, failed, overdue, destructive.
 * - Blue (Info): Open, informational announcement, automated task.
 * - Gray (Neutral / Inactive): Inactive, expired, deprecated, basic/manual tier.
 */
export const statusVariantMap: Record<StatusVariant, StatusConfig> = {
  // ─── Success (Green) ───
  active:       { label: 'Active',        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  paid:         { label: 'Paid',          className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  success:      { label: 'Success',       className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  successful:   { label: 'Successful',    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  completed:    { label: 'Completed',     className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  resolved:     { label: 'Resolved',      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  converted:    { label: 'Converted',     className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  healthy:      { label: 'Healthy',       className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },
  low:          { label: 'Low Risk',      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotColor: 'bg-emerald-500' },

  // ─── Warning (Amber / Yellow) ───
  trial:        { label: 'Trial',         className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  pending:      { label: 'Pending',       className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  unpaid:       { label: 'Unpaid',        className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  in_progress:  { label: 'In Progress',   className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  warning:      { label: 'Warning',       className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  ending_soon:  { label: 'Ending Soon',   className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  medium:       { label: 'Medium Risk',   className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  degraded:     { label: 'Degraded',      className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },
  refunded:     { label: 'Refunded',      className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotColor: 'bg-amber-500' },

  // ─── Error / Danger (Red) ───
  suspended:    { label: 'Suspended',     className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  cancelled:    { label: 'Cancelled',     className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  failed:       { label: 'Failed',        className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  overdue:      { label: 'Overdue',       className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  critical:     { label: 'Critical',      className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  high:         { label: 'High Risk',     className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  blocked:      { label: 'Blocked',       className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  action_required: { label: 'Action Required', className: 'bg-rose-50 text-rose-700 border border-rose-200',    dotColor: 'bg-rose-500' },
  payment:      { label: 'Payment Issue', className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },
  policy:       { label: 'Policy Violation', className: 'bg-rose-50 text-rose-700 border border-rose-200',      dotColor: 'bg-rose-500' },
  down:         { label: 'Down',          className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotColor: 'bg-rose-500' },

  // ─── Info (Blue) ───
  open:         { label: 'Open',          className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  upcoming:     { label: 'Upcoming',      className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  processing:   { label: 'Processing',    className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  automated:    { label: 'Automated',     className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  info:         { label: 'Information',   className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  pro:          { label: 'Pro',           className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  enterprise:   { label: 'Enterprise',    className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },
  popular:      { label: 'Popular',       className: 'bg-sky-50 text-sky-700 border border-sky-200',             dotColor: 'bg-sky-500' },

  // ─── Neutral / Inactive (Gray / Slate) ───
  expired:      { label: 'Expired',       className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  inactive:     { label: 'Inactive',      className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  deprecated:   { label: 'Deprecated',    className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  manual:       { label: 'Manual',        className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  basic:        { label: 'Basic',         className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
  archived:     { label: 'Archived',      className: 'bg-slate-100 text-slate-600 border border-slate-200',     dotColor: 'bg-slate-400' },
};

export interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: React.ReactNode;
  showDot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, label, showDot = true, size = 'sm', className }: StatusBadgeProps) {
  const normalizedKey = (typeof status === 'string' ? status.toLowerCase() : status) as StatusVariant;
  const config = statusVariantMap[normalizedKey] || {
    label: typeof status === 'string' ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown',
    className: 'bg-slate-100 text-slate-600 border border-slate-200',
    dotColor: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full select-none transition-colors',
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
        config.className,
        className
      )}
    >
      {showDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-none', config.dotColor)}
          aria-hidden="true"
        />
      )}
      <span>{label ?? config.label}</span>
    </span>
  );
}
