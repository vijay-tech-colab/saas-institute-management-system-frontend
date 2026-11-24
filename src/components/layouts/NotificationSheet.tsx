"use client"

import React, { useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCheck, Settings } from "lucide-react"
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
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

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

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop below sticky header so the header Bell/X toggle remains crisp and clickable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-x-0 top-16 bottom-0 bg-slate-900/20 backdrop-blur-[2px] z-[90]"
          />

          {/* Smooth Slide-Over Sheet anchored right under header */}
          <motion.aside
            aria-label="Notifications panel"
            initial={{ x: "100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.7 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 34,
              mass: 0.9,
            }}
            className="fixed right-0 top-16 bottom-0 w-full sm:w-[400px] bg-white shadow-[-14px_0_40px_-14px_rgba(15,23,42,0.14)] z-[95] flex flex-col border-l border-slate-200/80 overflow-hidden"
          >
            {/* Header matching reference design */}
            <div className="px-5 pt-4 pb-3.5 border-b border-slate-100 bg-white flex items-start justify-between gap-3 flex-shrink-0">
              <div>
                <h2 className="text-[16px] font-semibold text-slate-900 leading-tight">
                  Notification
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  You have {todayCount} {todayCount === 1 ? "notification" : "notifications"} today.
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover px-2 py-1 rounded-md hover:bg-primary-light transition-colors cursor-pointer shrink-0"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Minimal Filter Tabs */}
            <div className="px-5 py-2.5 border-b border-slate-100 flex items-center gap-1.5 bg-white flex-shrink-0">
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
                      className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
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

            {/* Grouped List */}
            <div className="flex-1 overflow-y-auto thin-scrollbar bg-white">
              {filtered.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {GROUPS.map((group) => {
                    const items = filtered.filter((n) => n.group === group)
                    if (items.length === 0) return null
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
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 flex-shrink-0">
              <Link
                href="/dashboard/notifications"
                onClick={onClose}
                className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Open full page
              </Link>
              <Link
                href="/dashboard/settings/notifications"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Preferences
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  if (typeof document !== "undefined") {
    return createPortal(content, document.body)
  }
  return content
}
