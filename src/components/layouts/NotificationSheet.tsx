"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check, MessageSquare, Settings, UserPlus, X, Search, CheckCircle2, ShieldAlert, CreditCard } from "lucide-react"

// Expanded dummy data for the sheet
const ALL_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Registration",
    message: "Sarah Jenkins has applied for B.Tech Computer Science.",
    time: "2 mins ago",
    unread: true,
    type: "user",
    color: "emerald",
  },
  {
    id: 2,
    title: "System Update",
    message: "CampusOS has been updated to version 2.4.0. Check out the new features.",
    time: "1 hour ago",
    unread: true,
    type: "system",
    color: "indigo",
  },
  {
    id: 3,
    title: "New Message",
    message: "Prof. Alan Turing sent you a message regarding the upcoming exams.",
    time: "3 hours ago",
    unread: false,
    type: "message",
    color: "sky",
  },
  {
    id: 4,
    title: "Payment Received",
    message: "A payment of $1,200 was received for Semester 1 from John Doe.",
    time: "Yesterday",
    unread: false,
    type: "finance",
    color: "emerald",
  },
  {
    id: 5,
    title: "Security Alert",
    message: "New login detected from unusual location: San Francisco, CA.",
    time: "Yesterday",
    unread: true,
    type: "system",
    color: "rose",
  },
]

const COLOR_MAP: Record<string, { bg: string; text: string; iconBg: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", iconBg: "bg-emerald-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", iconBg: "bg-indigo-100" },
  sky: { bg: "bg-sky-50", text: "text-sky-600", iconBg: "bg-sky-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", iconBg: "bg-rose-100" },
}

interface NotificationSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSheet({ isOpen, onClose }: NotificationSheetProps) {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">("all")

  // Prevent scroll when open
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

  const notifications = ALL_NOTIFICATIONS.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return n.unread
    if (activeTab === "archived") return false // Assuming none are archived in dummy data
    return true
  })

  const unreadCount = ALL_NOTIFICATIONS.filter((n) => n.unread).length
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl z-[101] flex flex-col border-l border-slate-200/60 h-screen overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between z-10 relative flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 ring-1 ring-indigo-100">
                  <Bell className="w-4 h-4" />
                </div>
                <h2 className="text-[15px] font-bold text-slate-800 leading-tight flex items-center">
                  Notifications
                  <span className="ml-2 px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                    {ALL_NOTIFICATIONS.length}
                  </span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Actions & Search */}
            <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-100 space-y-3 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-lg">
                {[
                  { id: "all", label: "All", count: ALL_NOTIFICATIONS.length },
                  { id: "unread", label: "Unread", count: unreadCount },
                  { id: "archived", label: "Archived", count: 0 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative flex-1 py-1.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-md shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {tab.label}
                      {tab.count > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] leading-none ${
                            activeTab === tab.id
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto thin-scrollbar bg-slate-50/30">
              <div className="flex items-center justify-between px-5 py-2 border-b border-slate-100 bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {activeTab === "all" ? "All Notifications" : activeTab === "unread" ? "Unread Notifications" : "Archived"}
                </span>
                {notifications.length > 0 && (
                  <button className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notification) => {
                    const colors = COLOR_MAP[notification.color] || COLOR_MAP.indigo
                    return (
                      <div
                        key={notification.id}
                        className={`group relative flex gap-4 p-5 border-b border-slate-100 transition-all duration-200 cursor-pointer ${
                          notification.unread 
                            ? "bg-indigo-50/30 hover:bg-indigo-50/60" 
                            : "bg-transparent opacity-75 hover:opacity-100 hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Unread indicator line */}
                        {notification.unread && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 rounded-r-full" />
                        )}

                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ring-1 ring-white/50 shadow-sm mt-1 transition-transform group-hover:scale-105 ${
                            notification.unread 
                              ? `${colors.iconBg} ${colors.text}` 
                              : "bg-slate-100 text-slate-400 grayscale"
                          }`}
                        >
                          {notification.type === "user" && <UserPlus className="w-5 h-5" />}
                          {notification.type === "system" && <Settings className="w-5 h-5" />}
                          {notification.type === "message" && <MessageSquare className="w-5 h-5" />}
                          {notification.type === "finance" && <CreditCard className="w-5 h-5" />}
                          {notification.type === "alert" && <ShieldAlert className="w-5 h-5" />}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 min-w-0 space-y-1">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 pr-4">
                              <span className={`text-[13.5px] truncate ${notification.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                                {notification.title}
                              </span>
                              {notification.unread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 shadow-sm shadow-indigo-500/40" />
                              )}
                            </div>
                            <span className={`text-[11px] whitespace-nowrap mt-0.5 ${notification.unread ? 'font-semibold text-indigo-600' : 'font-medium text-slate-400'}`}>
                              {notification.time}
                            </span>
                          </div>
                          <p className={`text-[13px] leading-relaxed ${notification.unread ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                            {notification.message}
                          </p>
                        </div>

                        {/* Hover Action */}
                        {notification.unread && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                            <button 
                              className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all tooltip-trigger relative cursor-pointer hover:scale-105 active:scale-95"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                    <Bell className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">No notifications found</h4>
                  <p className="text-sm text-slate-500 max-w-[250px]">
                    {activeTab === "unread" 
                      ? "You're all caught up! You have no unread notifications."
                      : "We'll notify you when something important happens."}
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
               <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/60">
                 <Settings className="w-4 h-4" />
                 Notification Settings
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  if (typeof document !== "undefined") {
    return require("react-dom").createPortal(content, document.body)
  }
  return content
}
