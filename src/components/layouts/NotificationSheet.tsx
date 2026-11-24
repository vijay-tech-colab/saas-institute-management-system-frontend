"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCheck, Settings } from "lucide-react"
import {
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  FloatingSheetHeader,
} from "@/components/ui/floating-sheet"
import {
  INITIAL_PLATFORM_NOTIFICATIONS,
  NotificationEmptyState,
  NotificationGroup,
  NotificationRow,
  PlatformNotification,
} from "./NotificationRow"

const GROUPS: NotificationGroup[] = ["Today", "Yesterday"]

interface NotificationSheetProps {
  isOpen: boolean
  onClose: () => void
  notifications?: PlatformNotification[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
}

export function NotificationSheet({
  isOpen,
  onClose,
  notifications: externalNotifications,
  onMarkRead,
  onMarkAllRead,
}: NotificationSheetProps) {
  const [internalNotifications, setInternalNotifications] = useState<PlatformNotification[]>(
    INITIAL_PLATFORM_NOTIFICATIONS
  )
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")

  const notifications = externalNotifications ?? internalNotifications

  const handleMarkRead = (id: string) => {
    if (onMarkRead) {
      onMarkRead(id)
    } else {
      setInternalNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      )
    }
  }

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead()
    } else {
      setInternalNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    }
  }

  const filtered = notifications.filter((n) =>
    activeTab === "unread" ? n.unread : true
  )
  const todayCount = notifications.filter((n) => n.group === "Today").length
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <FloatingSheet
      open={isOpen}
      onClose={onClose}
      ariaLabel="Notifications panel"
      widthClassName="w-[min(400px,calc(100vw-1.5rem))]"
      lockBodyScroll
    >
      <FloatingSheetHeader
        title="Notification"
        subtitle={`You have ${todayCount} ${todayCount === 1 ? "notification" : "notifications"} today.`}
        onClose={onClose}
        closeAriaLabel="Close notifications panel"
        badge={
          unreadCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-primary-light text-[11px] font-semibold text-primary tabular-nums">
              {unreadCount} new
            </span>
          ) : null
        }
        actions={
          unreadCount > 0 ? (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover px-2 py-1 rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          ) : null
        }
      />

      {/* Filter Tabs */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-1.5 bg-white shrink-0">
        {(
          [
            { id: "all", label: "All", count: notifications.length },
            { id: "unread", label: "Unread", count: unreadCount },
          ] as const
        ).map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                active
                  ? "bg-primary-light text-primary font-semibold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none tabular-nums ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grouped Notifications List */}
      <FloatingSheetBody>
        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.04 }}
          >
            {GROUPS.map((group) => {
              const items = filtered.filter((n) => n.group === group)
              if (items.length === 0) return null
              return (
                <div key={group}>
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-[13px] font-semibold text-slate-900">
                      {group}
                    </span>
                  </div>
                  <div>
                    {items.map((item) => (
                      <NotificationRow
                        key={item.id}
                        notification={item}
                        onMarkRead={handleMarkRead}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        ) : (
          <NotificationEmptyState
            title={activeTab === "unread" ? "All caught up!" : "No notifications"}
            description={
              activeTab === "unread"
                ? "You have no unread notifications right now."
                : "New platform updates will appear here."
            }
          />
        )}
      </FloatingSheetBody>

      {/* Footer */}
      <FloatingSheetFooter>
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors px-1"
        >
          Open full page
        </Link>
        <Link
          href="/dashboard/settings/notifications"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
        >
          <Settings className="w-3.5 h-3.5" />
          Preferences
        </Link>
      </FloatingSheetFooter>
    </FloatingSheet>
  )
}
