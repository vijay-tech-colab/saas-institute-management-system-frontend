"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  INITIAL_PLATFORM_NOTIFICATIONS,
  NotificationEmptyState,
  NotificationGroup,
  NotificationRow,
  PlatformNotification,
} from "@/components/layouts/NotificationRow";

const GROUPS: NotificationGroup[] = ["Today", "Yesterday"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<PlatformNotification[]>(
    INITIAL_PLATFORM_NOTIFICATIONS
  );
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = notifications.filter((n) =>
    filter === "unread" ? n.unread : true
  );
  const todayCount = notifications.filter((n) => n.group === "Today").length;
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex-1 p-4 md:p-6 w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Notification
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            You have {todayCount} {todayCount === 1 ? "notification" : "notifications"} today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={markAllRead}
              className="h-8 text-xs text-primary border-primary-border bg-primary-light hover:bg-primary/15"
            >
              Mark all as read
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Link href="/dashboard/settings/notifications">
              <Settings className="w-3.5 h-3.5" />
              Preferences
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Filter Bar */}
        <div className="px-5 py-2.5 border-b border-slate-100 flex items-center gap-1.5">
          {(
            [
              { id: "all", label: "All", count: notifications.length },
              { id: "unread", label: "Unread", count: unreadCount },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grouped List */}
        {filtered.length > 0 ? (
          <div>
            {GROUPS.map((group) => {
              const items = filtered.filter((n) => n.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group}>
                  <div className="px-5 pt-4 pb-1">
                    <span className="text-[14px] font-semibold text-slate-900">
                      {group}
                    </span>
                  </div>
                  <div>
                    {items.map((item) => (
                      <NotificationRow
                        key={item.id}
                        notification={item}
                        onMarkRead={markAsRead}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NotificationEmptyState
            title="All caught up!"
            description="No unread platform notifications remaining."
          />
        )}
      </div>
    </div>
  );
}
