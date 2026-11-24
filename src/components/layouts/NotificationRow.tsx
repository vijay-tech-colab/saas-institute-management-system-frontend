"use client";

import React from "react";
import {
  Bell,
  Building2,
  Check,
  CreditCard,
  Globe,
  Mail,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationCategory =
  | "tenant"
  | "system"
  | "domain"
  | "billing"
  | "security";

export type NotificationGroup = "Today" | "Yesterday";

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  dateLabel: string;
  timeLabel: string;
  group: NotificationGroup;
  category: NotificationCategory;
  unread: boolean;
}

export const INITIAL_PLATFORM_NOTIFICATIONS: PlatformNotification[] = [
  {
    id: "notif-1",
    title: "New Tenant Onboarded",
    message: "Apex Computing Institute registered on the Enterprise Plan.",
    dateLabel: "25 November, 2026",
    timeLabel: "10:45 AM",
    group: "Today",
    category: "tenant",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Platform Engine Updated",
    message: "CampusOS Core v2.4.0 deployed smoothly across all active nodes.",
    dateLabel: "25 November, 2026",
    timeLabel: "08:30 AM",
    group: "Today",
    category: "system",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Custom Domain Verified",
    message: "portal.techacademy.in SSL certificate issued and routed live.",
    dateLabel: "25 November, 2026",
    timeLabel: "12:00 AM",
    group: "Today",
    category: "domain",
    unread: true,
  },
  {
    id: "notif-4",
    title: "Subscription Renewal Paid",
    message: "Horizon Institute renewed Enterprise annual billing (₹1,49,990).",
    dateLabel: "24 November, 2026",
    timeLabel: "10:45 AM",
    group: "Yesterday",
    category: "billing",
    unread: false,
  },
  {
    id: "notif-5",
    title: "Automated Backup Completed",
    message: "Multi-region database snapshot completed with zero checksum errors.",
    dateLabel: "24 November, 2026",
    timeLabel: "08:30 AM",
    group: "Yesterday",
    category: "security",
    unread: false,
  },
];

function renderCategoryIcon(category: NotificationCategory) {
  switch (category) {
    case "tenant":
      return <Building2 className="w-4 h-4" />;
    case "billing":
      return <CreditCard className="w-4 h-4" />;
    case "domain":
      return <Globe className="w-4 h-4" />;
    case "security":
      return <ShieldAlert className="w-4 h-4" />;
    case "system":
      return <Sparkles className="w-4 h-4" />;
    default:
      return <Mail className="w-4 h-4" />;
  }
}

interface NotificationRowProps {
  notification: PlatformNotification;
  onMarkRead?: (id: string) => void;
  compact?: boolean;
}

export function NotificationRow({
  notification,
  onMarkRead,
  compact = false,
}: NotificationRowProps) {
  const isSecurity = notification.category === "security";

  return (
    <div
      onClick={() => notification.unread && onMarkRead?.(notification.id)}
      className={cn(
        "group relative flex items-start gap-3.5 border-b border-slate-100 last:border-b-0 transition-colors",
        compact ? "py-3 px-4" : "py-3.5 px-5",
        notification.unread
          ? "bg-white hover:bg-primary-light/35 cursor-pointer"
          : "bg-white hover:bg-slate-50/80"
      )}
    >
      {/* Solid circular icon badge matching screenshot + Nordic Teal theme */}
      <div
        className={cn(
          "w-9 h-9 rounded-full shrink-0 flex items-center justify-center mt-0.5 transition-transform duration-150 group-hover:scale-[1.03]",
          isSecurity
            ? "bg-status-warning text-white"
            : notification.unread
            ? "bg-primary text-primary-foreground"
            : "bg-primary/85 text-primary-foreground"
        )}
      >
        {renderCategoryIcon(notification.category)}
      </div>

      {/* Text hierarchy: Title -> Single-line summary -> Date • Time */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-slate-900 truncate">
            {notification.title}
          </p>
          {notification.unread && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
              aria-label="Unread"
            />
          )}
        </div>

        <p className="text-xs text-slate-500 truncate leading-relaxed">
          {notification.message}
        </p>

        <p className="text-[11px] text-slate-400 font-normal pt-0.5">
          {notification.dateLabel} &bull; {notification.timeLabel}
        </p>
      </div>

      {/* Subtle mark-as-read action on hover */}
      {notification.unread && onMarkRead && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMarkRead(notification.id);
          }}
          title="Mark as read"
          aria-label="Mark as read"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-3.5 bottom-3 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary-border hover:bg-primary-light cursor-pointer"
        >
          <Check className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export function NotificationEmptyState({
  title = "All caught up",
  description = "You have no notifications matching this view.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="py-12 px-5 flex flex-col items-center justify-center text-center">
      <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <Bell className="w-5 h-5 text-slate-400" />
      </div>
      <h4 className="text-[13px] font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 mt-1 max-w-[230px]">{description}</p>
    </div>
  );
}
