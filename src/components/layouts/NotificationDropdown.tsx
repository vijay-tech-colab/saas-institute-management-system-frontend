"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check, ExternalLink, MessageSquare, Settings, UserPlus } from "lucide-react"
import { NotificationSheet } from "./NotificationSheet"

// Dummy Notifications
const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Registration",
    message: "Sarah Jenkins has applied for B.Tech Computer Science.",
    time: "2 mins ago",
    unread: true,
    type: "user", // userPlus
    color: "emerald",
  },
  {
    id: 2,
    title: "System Update",
    message: "CampusOS has been updated to version 2.4.0. Check out the new features.",
    time: "1 hour ago",
    unread: true,
    type: "system", // settings
    color: "indigo",
  },
  {
    id: 3,
    title: "New Message",
    message: "Prof. Alan Turing sent you a message regarding the upcoming exams.",
    time: "3 hours ago",
    unread: false,
    type: "message", // MessageSquare
    color: "sky",
  },
]

const COLOR_MAP: Record<string, { bg: string; text: string; iconBg: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", iconBg: "bg-emerald-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", iconBg: "bg-indigo-100" },
  sky: { bg: "bg-sky-50", text: "text-sky-600", iconBg: "bg-sky-100" },
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 cursor-pointer group mr-1 ${
          isOpen ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
        }`}
      >
        <Bell className="w-[18px] h-[18px] group-hover:scale-105 transition-transform" />
        {/* Notification badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 border border-white" />
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-4 right-4 top-[72px] sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-[380px] bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden z-50 origin-top sm:origin-top-right flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white/50">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800 text-[14px]">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <button className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer">
                Mark all as read
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto thin-scrollbar">
              {NOTIFICATIONS.length > 0 ? (
                <div className="flex flex-col">
                  {NOTIFICATIONS.map((notification) => {
                    const colors = COLOR_MAP[notification.color] || COLOR_MAP.indigo
                    return (
                      <div
                        key={notification.id}
                        className={`group relative flex gap-3 p-4 border-b border-slate-50/50 transition-all duration-200 cursor-pointer ${
                          notification.unread 
                            ? "bg-indigo-50/30 hover:bg-indigo-50/60" 
                            : "bg-transparent hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Unread indicator line */}
                        {notification.unread && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 rounded-r-full" />
                        )}

                        {/* Icon */}
                        <div
                          className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${colors.iconBg} ${colors.text} ring-1 ring-white/50 shadow-sm transition-transform group-hover:scale-105`}
                        >
                          {notification.type === "user" && <UserPlus className="w-4 h-4" />}
                          {notification.type === "system" && <Settings className="w-4 h-4" />}
                          {notification.type === "message" && <MessageSquare className="w-4 h-4" />}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                            <div className="flex items-center gap-1.5 pr-2">
                              <span className={`text-[13px] truncate ${notification.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                                {notification.title}
                              </span>
                              {notification.unread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 shadow-sm shadow-indigo-500/40" />
                              )}
                            </div>
                            <span className={`text-[10px] whitespace-nowrap ${notification.unread ? 'font-semibold text-indigo-600' : 'font-medium text-slate-400'}`}>
                              {notification.time}
                            </span>
                          </div>
                          <p className={`text-[12px] leading-relaxed line-clamp-2 ${notification.unread ? 'text-slate-600' : 'text-slate-500'}`}>
                            {notification.message}
                          </p>
                        </div>

                        {/* Action - show on hover */}
                        {notification.unread && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                            <button 
                              className="w-7 h-7 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer hover:scale-105 active:scale-95"
                              title="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Bell className="w-5 h-5 text-slate-300" />
                  </div>
                  <h4 className="text-[13px] font-semibold text-slate-700 mb-1">All caught up!</h4>
                  <p className="text-[12px] text-slate-400">You have no new notifications.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => {
                  setIsOpen(false)
                  setIsSheetOpen(true)
                }}
                className="w-full py-2 flex items-center justify-center gap-1.5 rounded-xl text-[12px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                View all notifications
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NotificationSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </div>
  )
}
