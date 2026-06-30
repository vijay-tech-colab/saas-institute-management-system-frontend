"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  ChevronRight,
  Bell,
  HelpCircle,
  Home,
  Menu,
  Search,
  MessageSquare,
  Plus,
  Sparkles,
} from "lucide-react"
import { useSetAtom, useAtom } from "jotai"
import { isMobileSidebarOpenAtom, isChatbotOpenAtom } from "@/store/layout-store"
import { NotificationDropdown } from "./NotificationDropdown"
import { RoleSwitcherDropdown } from "./RoleSwitcherDropdown"

export function DashboardHeader() {
  const pathname = usePathname()
  const setIsMobileOpen = useSetAtom(isMobileSidebarOpenAtom)
  const [isChatbotOpen, setIsChatbotOpen] = useAtom(isChatbotOpenAtom)

  // Generate breadcrumbs from pathname
  const pathSegments = pathname?.split("/").filter(Boolean) || []

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

      {/* ───── Left: Mobile Menu + Breadcrumbs ───── */}
      <div className="flex items-center gap-2 min-w-0 flex-1">

        {/* Mobile hamburger placeholder */}
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-1.5 -ml-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 flex-shrink-0 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 overflow-hidden whitespace-nowrap min-w-0"
        >
          {/* Home icon */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors duration-200 flex-shrink-0 group"
          >
            <Home className="w-[15px] h-[15px] group-hover:scale-105 transition-transform" />
          </Link>

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`

            return (
              <React.Fragment key={href}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-slate-800 flex-shrink-0 text-[13px]">
                    {formatSegment(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-slate-700 transition-colors duration-200 font-medium flex-shrink-0 text-[13px]"
                  >
                    {formatSegment(segment)}
                  </Link>
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>

      {/* ───── Right: Actions ───── */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        
        {/* Search button */}
        <button className="p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 cursor-pointer group hidden sm:block">
          <Search className="w-[18px] h-[18px] group-hover:scale-105 transition-transform" />
        </button>

        {/* Messages button */}
        <button className="relative p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 cursor-pointer group">
          <MessageSquare className="w-[18px] h-[18px] group-hover:scale-105 transition-transform" />
        </button>

        {/* Help button */}
        <button className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200 group cursor-pointer">
          <HelpCircle className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
          <span className="text-[12px] font-medium">Help</span>
        </button>

        {/* Notification Dropdown */}
        <NotificationDropdown />

        {/* Role Switcher */}
        <RoleSwitcherDropdown />

        {/* Separator */}
        <div className="w-[1px] h-6 bg-slate-200/60 mx-1 hidden sm:block" />

        {/* AI Chatbot Toggle */}
        <button 
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className={`hidden sm:flex items-center gap-1.5 pl-2 pr-3 py-1.5 ml-1 rounded-full transition-all duration-200 group cursor-pointer border ${
            isChatbotOpen 
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
              : "bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 border-indigo-100/50"
          }`}
        >
          <div className={`rounded-full p-1 flex items-center justify-center transition-colors ${
            isChatbotOpen ? "bg-white/20 text-white" : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
          }`}>
            <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-[12px] font-semibold tracking-wide">Ask AI</span>
        </button>

      </div>
    </header>
  )
}
