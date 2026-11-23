"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, ShieldAlert, Settings, Sparkles, Filter } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "security" | "tenant" | "system" | "billing";
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "New Enterprise Tenant Onboarded",
    description: "Apex Computing Institute has completed domain DNS setup and initiated active subscriptions.",
    timestamp: "10 minutes ago",
    type: "tenant",
    unread: true,
  },
  {
    id: "n-2",
    title: "Security Shield Automated Block",
    description: "Rate limiter blocked 1,420 suspicious API requests originating from IP subnet 194.26.29.0/24.",
    timestamp: "1 hour ago",
    type: "security",
    unread: true,
  },
  {
    id: "n-3",
    title: "Global Platform Engine Updated",
    description: "CampusOS Core Node updated to v2.4.0. Database replication latency dropped below 12ms.",
    timestamp: "3 hours ago",
    type: "system",
    unread: false,
  },
  {
    id: "n-4",
    title: "Annual Billing Renewal Processed",
    description: "Enterprise tier annual invoice #INV-2026-904 paid by Horizon Tech Institute ($2,400.00).",
    timestamp: "Yesterday",
    type: "billing",
    unread: false,
  },
  {
    id: "n-5",
    title: "Automated Backup Completed",
    description: "Multi-region snapshot for all tenant databases completed without errors (Total size: 48.2 GB).",
    timestamp: "2 days ago",
    type: "system",
    unread: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("all");

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "security") return n.type === "security";
    if (filter === "tenant") return n.type === "tenant";
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex-1 p-4 md:p-6 w-full max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time security alerts, tenant activations, and system maintenance events.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "all", label: "All Events" },
          { id: "unread", label: "Unread" },
          { id: "tenant", label: "Tenants" },
          { id: "security", label: "Security & Audits" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === tab.id
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-all ${
              item.unread
                ? "bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-50"
                : "bg-slate-50/60 border-slate-200 text-slate-600"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.type === "security"
                    ? "bg-rose-100 text-rose-600"
                    : item.type === "tenant"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {item.type === "security" ? (
                  <ShieldAlert className="w-5 h-5" />
                ) : item.type === "tenant" ? (
                  <Sparkles className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
