"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAtom, useAtomValue } from "jotai"
import { userAtom } from "@/store/user-store"
import { isMobileSidebarOpenAtom, lastNonSettingsRouteAtom } from "@/store/layout-store"
import { superAdminNav, superAdminSettingsNav } from "@/config/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  PanelLeftClose,
  ChevronRight,
  UserCircle,
  LogOut,
  Shield,
} from "lucide-react"

// ─── Constants ──────────────────────────────────────────────
const SIDEBAR_WIDTH_EXPANDED = 248
const SIDEBAR_WIDTH_COLLAPSED = 68
const COLLAPSE_DURATION = 0.25

// ─── Tooltip (Portal-based) ────────────────────────────────
function Tooltip({ label, children, show }: { label: string; children: React.ReactNode; show: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = React.useRef<HTMLDivElement>(null)

  if (!show) return <>{children}</>

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 6,
      })
    }
    setHovered(true)
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -4, y: "-50%", scale: 0.96 }}
                animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                exit={{ opacity: 0, x: -4, y: "-50%", scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] pointer-events-none"
                style={{ top: coords.top, left: coords.left }}
              >
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium shadow-xl whitespace-nowrap">
                  {label}
                  {/* Arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-slate-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

// ─── Main Sidebar ───────────────────────────────────────────
export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useAtom(isMobileSidebarOpenAtom)
  const [lastNonSettingsRoute, setLastNonSettingsRoute] = useAtom(lastNonSettingsRouteAtom)
  const pathname = usePathname()
  const router = useRouter()
  
  const confirm = useConfirm()
  const toast = useToast()

  const user = useAtomValue(userAtom)
  const isSettingsMode = pathname === "/dashboard/settings" || pathname.startsWith("/dashboard/settings/")

  useEffect(() => {
    if (pathname && !pathname.startsWith("/dashboard/settings")) {
      setLastNonSettingsRoute(pathname)
    }
  }, [pathname, setLastNonSettingsRoute])

  const navGroups = isSettingsMode ? superAdminSettingsNav : superAdminNav

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleBackToDashboard = () => {
    setIsMobileOpen(false)
    router.push(lastNonSettingsRoute || "/dashboard")
  }

  const handleLogout = async () => {
    const isConfirmed = await confirm({
      title: "Log out",
      description: "Are you sure you want to log out of your account?",
      type: "danger",
      confirmText: "Log out",
    });

    if (isConfirmed) {
      toast.info({
        title: "Logging out...",
        description: "Clearing session data and redirecting.",
      });
      // Redirect or clear store logic would go here
    }
  };

  const sidebarWidth = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  const sidebarContent = (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ duration: COLLAPSE_DURATION, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-slate-200/70 shadow-[1px_0_24px_rgba(0,0,0,0.03)] overflow-x-clip overflow-y-hidden select-none"
    >
      {/* ───── Header: Context-Aware (Main Console or Settings Back Navigation) ───── */}
      {isSettingsMode ? (
        <motion.div
          key="settings-header"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className={`relative h-16 border-b border-slate-100 flex-shrink-0 flex items-center ${isCollapsed ? 'px-2.5 justify-center' : 'px-3'}`}
        >
          <Tooltip label="Back to Dashboard" show={isCollapsed}>
            <button
              type="button"
              onClick={handleBackToDashboard}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'gap-2.5 px-2.5 py-2'} rounded-xl text-slate-800 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/30`}
            >
              <div className="w-8 h-8 rounded-lg bg-primary-light border border-primary-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-start overflow-hidden text-left"
                  >
                    <span className="text-[13px] font-semibold text-slate-900 truncate leading-tight">
                      Back to Dashboard
                    </span>
                    <span className="text-[11px] text-primary font-medium truncate leading-tight mt-0.5">
                      Platform Settings
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </Tooltip>
        </motion.div>
      ) : (
        <motion.div
          key="main-header"
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className={`relative h-16 border-b border-slate-100 flex-shrink-0 flex items-center ${isCollapsed ? 'px-2.5 justify-center' : 'px-4'}`}
        >
          <Tooltip label="CampusOS Super Admin Console" show={isCollapsed}>
            <Link 
              href="/dashboard"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-1' : 'gap-3 px-1 py-1'} rounded-xl hover:bg-slate-50/80 transition-all duration-200 group`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-extrabold text-white flex-shrink-0 shadow-md shadow-primary/25 ring-[1.5px] ring-primary/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-start overflow-hidden"
                  >
                    <span className="font-extrabold text-slate-900 text-[15px] truncate leading-tight tracking-tight">
                      CampusOS
                    </span>
                    <span className="text-[11px] text-primary font-semibold truncate capitalize leading-tight mt-0.5 flex items-center gap-1">
                      Super Admin Console
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </Tooltip>
        </motion.div>
      )}

      {/* ───── Search Bar ───── */}

      {/* ───── Navigation Groups ───── */}
      <nav
        className={`flex-1 overflow-y-auto py-3 thin-scrollbar transition-colors duration-300 ${isCollapsed ? 'px-2.5 space-y-1' : 'px-3 space-y-5'}`}
        aria-label={isSettingsMode ? "Settings navigation" : "Main navigation"}
      >
        <motion.div
          key={isSettingsMode ? "settings-nav" : "main-nav"}
          initial={{ opacity: 0, x: isSettingsMode ? 8 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className={isCollapsed ? "space-y-1" : isSettingsMode ? "space-y-4" : "space-y-5"}
        >
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="px-3 mb-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em]"
                  >
                    {group.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className="space-y-0.5">
                {group.items.map((item, iIdx) => {
                  const cleanPath = pathname?.replace(/\/+$/, "") || "/dashboard"
                  const isDefaultSettingsMatch =
                    isSettingsMode &&
                    cleanPath === "/dashboard/settings" &&
                    item.href === "/dashboard/settings/general"
                  const isActive =
                    cleanPath === item.href ||
                    isDefaultSettingsMatch ||
                    (!isSettingsMode && item.href.startsWith("/dashboard/settings") && cleanPath.startsWith("/dashboard/settings")) ||
                    (item.subItems && item.subItems.some((sub) => cleanPath === sub.href))
                  const menuKey = `${group.title}-${item.label}`

                  if (item.subItems) {
                    return (
                      <CollapsibleNavItem
                        key={iIdx}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        subItems={item.subItems}
                        isExpanded={expandedMenus[menuKey] || !!isActive}
                        onToggle={() => toggleMenu(menuKey)}
                        isCollapsed={isCollapsed}
                        active={isActive}
                      >
                        {item.subItems.map((subItem, sIdx) => (
                          <SubNavItem
                            key={sIdx}
                            label={subItem.label}
                            href={subItem.href}
                            active={pathname === subItem.href}
                          />
                        ))}
                      </CollapsibleNavItem>
                    )
                  }

                  return (
                    <NavItem
                      key={iIdx}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      badge={item.badge}
                      active={isActive}
                      isCollapsed={isCollapsed}
                      layoutId={isSettingsMode ? "activeSettingsNavIndicator" : "activeMainNavIndicator"}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </nav>

      {/* ───── Bottom Section ───── */}
      <div className={`border-t border-slate-100 flex-shrink-0 pt-1.5 space-y-0.5 ${isCollapsed ? 'px-2.5' : 'px-3'}`}>
        <div className="hidden lg:block">
          <Tooltip label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} show={isCollapsed}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className={`w-full flex items-center p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-200 cursor-pointer ${isCollapsed ? "justify-center" : "gap-3"}`}>
              <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <PanelLeftClose className="w-[18px] h-[18px] flex-shrink-0" />
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.15 }} className="text-sm font-medium whitespace-nowrap">
                    Collapse
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* ───── User Profile Card ───── */}
      <div className={`${isCollapsed ? 'px-2 pb-2 pt-1' : 'p-3'}`}>
        <Tooltip label={user.name} show={isCollapsed}>
          <button onClick={handleLogout} className={`w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer group bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-indigo-50/60 hover:to-teal-50/40 border border-slate-200/60 hover:border-indigo-200/80 hover:shadow-sm ${isCollapsed ? "justify-center p-1.5" : "justify-between p-2"}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle className="w-5 h-5" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-start overflow-hidden text-left">
                    <span className="text-sm font-semibold text-slate-800 truncate w-full leading-tight">{user.name}</span>
                    <span className="text-[11px] text-slate-400 truncate w-full">{user.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  <LogOut className="w-4 h-4 text-slate-300 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </Tooltip>
      </div>
    </motion.div>
  )

  return (
    <>
      {/* ───── Mobile Overlay ───── */}
      <div className="lg:hidden">
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[110]"
            >
              {sidebarContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───── Desktop Sidebar ───── */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </div>
    </>
  )
}

// ─── NavItem ────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  href,
  badge,
  active,
  isCollapsed,
  layoutId = "activeMainNavIndicator",
}: {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
  active?: boolean
  isCollapsed?: boolean
  layoutId?: string
}) {
  return (
    <Tooltip label={label} show={!!isCollapsed}>
      <Link
        href={href}
        prefetch
        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 ${active
            ? "bg-primary-light text-slate-900 shadow-xs"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
          } ${isCollapsed ? "justify-center" : ""}`}
      >
        {/* Active accent bar */}
        {active && !isCollapsed && (
          <motion.div
            layoutId={layoutId}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        {active && isCollapsed && (
          <motion.div
            layoutId={layoutId}
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-t-full"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}

        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-primary" : "text-slate-700 group-hover:text-slate-900"
              }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
              })
              : icon}
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className={`text-[13px] truncate whitespace-nowrap ${active ? "font-semibold" : "font-medium"
                  }`}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Badge */}
        <AnimatePresence initial={false}>
          {!isCollapsed && badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${active
                  ? "bg-primary-light text-primary-dark"
                  : "bg-slate-100 text-slate-500"
                }`}
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapsed badge dot */}
        {isCollapsed && badge && (
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/30" />
        )}
      </Link>
    </Tooltip>
  )
}

// ─── CollapsedNavFlyout (Floating Dropdown for Collapsed Sidebar) ───────────────
function CollapsedNavFlyout({
  icon,
  label,
  href,
  subItems,
  active,
}: {
  icon: React.ReactNode
  label: string
  href?: string
  subItems?: { label: string; href: string }[]
  active?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const flyoutRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const calculateCoords = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const flyoutEstimatedHeight = 52 + (subItems?.length || 0) * 36
    const maxTop = Math.max(12, window.innerHeight - flyoutEstimatedHeight - 16)
    const top = Math.min(rect.top, maxTop)
    setCoords({
      top: Math.max(12, top),
      left: rect.right + 8,
    })
  }, [subItems])

  const openFlyout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    calculateCoords()
    setIsOpen(true)
  }

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 180)
  }

  const toggleFlyout = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOpen) {
      setIsOpen(false)
    } else {
      openFlyout()
    }
  }

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        flyoutRef.current &&
        !flyoutRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  // Close when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div
      ref={triggerRef}
      onMouseEnter={openFlyout}
      onMouseLeave={scheduleClose}
      className="relative"
    >
      <button
        type="button"
        onClick={toggleFlyout}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={label}
        className={`w-full flex items-center justify-center p-2.5 rounded-xl transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer ${
          active || isOpen
            ? "bg-primary-light text-primary shadow-xs"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {active && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-t-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <div
          className={`flex-shrink-0 transition-colors duration-200 ${
            active || isOpen ? "text-primary" : "text-slate-600 group-hover:text-slate-900"
          }`}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
              })
            : icon}
        </div>

        {/* Indicator dot showing dropdown capability */}
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
      </button>

      {/* Flyout portal */}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={flyoutRef}
                initial={{ opacity: 0, x: -6, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current)
                    closeTimeoutRef.current = null
                  }
                }}
                onMouseLeave={scheduleClose}
                className="fixed z-[9999] min-w-[210px] max-w-[270px] bg-white rounded-xl shadow-[0_14px_40px_-6px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.08)] border border-slate-200/90 p-2 before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3"
                style={{ top: coords.top, left: coords.left }}
              >
                {/* Header with main link */}
                {href ? (
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50/80 text-slate-900 group transition-colors mb-1.5"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 truncate">
                      {label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </Link>
                ) : (
                  <div className="px-2.5 py-1.5 text-xs font-bold text-slate-800 border-b border-slate-100 mb-1">
                    {label}
                  </div>
                )}

                {/* Dropdown items */}
                <div className="space-y-0.5">
                  {subItems?.map((subItem, sIdx) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <Link
                        key={sIdx}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                          isSubActive
                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                            isSubActive
                              ? "bg-indigo-600 shadow-sm shadow-indigo-500/40 scale-110"
                              : "bg-slate-300"
                          }`}
                        />
                        <span className="truncate">{subItem.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

// ─── CollapsibleNavItem ─────────────────────────────────────
function CollapsibleNavItem({
  icon,
  label,
  href,
  subItems,
  children,
  isExpanded,
  onToggle,
  isCollapsed,
  active,
}: {
  icon: React.ReactNode
  label: string
  href?: string
  subItems?: { label: string; href: string }[]
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  isCollapsed?: boolean
  active?: boolean
}) {
  if (isCollapsed) {
    return (
      <CollapsedNavFlyout
        icon={icon}
        label={label}
        href={href}
        subItems={subItems}
        active={active}
      />
    )
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${active
            ? "text-primary bg-primary-light"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
          }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-primary" : "text-slate-500 group-hover:text-slate-700"
              }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
              })
              : icon}
          </div>
          <span className={`text-[13px] truncate ${active ? "font-semibold" : "font-medium"}`}>
            {label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight
            className={`w-3.5 h-3.5 transition-colors duration-200 ${isExpanded ? "text-primary" : "text-slate-300 group-hover:text-slate-400"
              }`}
          />
        </motion.div>
      </button>

      {/* Animated sub-menu */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 ml-[18px] border-l-[1.5px] border-slate-200/60 space-y-0.5 py-1.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── SubNavItem ─────────────────────────────────────────────
function SubNavItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-[12.5px] outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group ${active
          ? "text-primary font-semibold bg-primary-light"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`}
    >
      {/* Dot indicator */}
      <div
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${active
            ? "bg-primary shadow-sm shadow-primary/40 scale-110"
            : "bg-slate-300/60 group-hover:bg-slate-400"
          }`}
      />
      <span className="truncate">{label}</span>
    </Link>
  )
}

