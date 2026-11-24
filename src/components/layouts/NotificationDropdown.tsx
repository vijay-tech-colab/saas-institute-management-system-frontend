"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { NotificationSheet } from "./NotificationSheet"
import {
  INITIAL_PLATFORM_NOTIFICATIONS,
  PlatformNotification,
} from "./NotificationRow"

export function NotificationDropdown() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [notifications, setNotifications] = useState<PlatformNotification[]>(
    INITIAL_PLATFORM_NOTIFICATIONS
  )

  useEffect(() => {
    if (!isSheetOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSheetOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isSheetOpen])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsSheetOpen((prev) => !prev)}
        aria-label={isSheetOpen ? "Close notifications" : "Open notifications"}
        aria-expanded={isSheetOpen}
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 cursor-pointer border ${
          isSheetOpen
            ? "bg-primary-light text-primary border-primary-border shadow-xs"
            : "border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-100/80"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSheetOpen ? (
            <motion.span
              key="close-icon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <X className="w-[18px] h-[18px] stroke-[2.2]" />
            </motion.span>
          ) : (
            <motion.span
              key="bell-icon"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Bell className="w-[18px] h-[18px]" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread dot indicator (visible when closed & unread > 0) */}
        <AnimatePresence>
          {!isSheetOpen && unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute top-1.5 right-1.5 flex h-2 w-2"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary border border-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <NotificationSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        notifications={notifications}
        onMarkRead={markAsRead}
        onMarkAllRead={markAllRead}
      />
    </>
  )
}
