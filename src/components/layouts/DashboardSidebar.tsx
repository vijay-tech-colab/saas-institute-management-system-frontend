"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAtom, useAtomValue } from "jotai"
import { userAtom } from "@/store/user-store"
import { isMobileSidebarOpenAtom, lastNonSettingsRouteAtom } from "@/store/layout-store"
import { superAdminNav, superAdminSettingsNav, instituteAdminNav } from "@/config/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Power,
  Shield,
} from "lucide-react"

// ─── Constants ──────────────────────────────────────────────
const SIDEBAR_WIDTH_EXPANDED = 248
const SIDEBAR_WIDTH_COLLAPSED = 68

// ─── Tooltip (Portal-based) ────────────────────────────────
function Tooltip({
  label,
  children,
  show,
  className = "w-full min-w-0",
}: {
  label: string
  children: React.ReactNode
  show: boolean
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = React.useRef<HTMLDivElement>(null)

  if (!show) return <>{children}</>

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 20,
      })
    }
    setHovered(true)
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className={className}
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
                transition={{ duration: 0.14, ease: "easeOut" }}
                className="fixed z-[9999] pointer-events-none"
                style={{ top: coords.top, left: coords.left }}
              >
                <div className="relative px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-sm text-white text-xs font-medium shadow-[0_10px_25px_-5px_rgba(15,23,42,0.3)] border border-white/10 whitespace-nowrap">
                  {label}
                  {/* Left-pointing caret outside sidebar edge */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-slate-900/95" />
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
  const isInstituteMode =
    pathname === "/institute" ||
    pathname?.startsWith("/institute/") ||
    user.role === "INSTITUTE_ADMIN"
  const isSettingsMode =
    !isInstituteMode &&
    (pathname === "/dashboard/settings" || pathname.startsWith("/dashboard/settings/"))

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname, setIsMobileOpen])

  useEffect(() => {
    if (pathname && !isInstituteMode && !pathname.startsWith("/dashboard/settings")) {
      setLastNonSettingsRoute(pathname)
    }
  }, [pathname, isInstituteMode, setLastNonSettingsRoute])

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar, Escape to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false)
        return
      }

      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "b") {
        const target = e.target as HTMLElement | null
        const tag = target?.tagName
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target?.isContentEditable
        ) {
          return
        }

        e.preventDefault()
        if (window.innerWidth >= 1024) {
          setIsCollapsed((prev) => !prev)
        } else {
          setIsMobileOpen((prev) => !prev)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileOpen, setIsMobileOpen])

  const navGroups = isInstituteMode
    ? instituteAdminNav
    : isSettingsMode
    ? superAdminSettingsNav
    : superAdminNav

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (key: string, currentExpanded: boolean) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !currentExpanded }))
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
  const initials =
    user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "SA"

  const sidebarContent = (
    <div
      style={{ width: sidebarWidth }}
      className="flex flex-col h-full bg-white border-r border-slate-200/80 shadow-[1px_0_24px_rgba(0,0,0,0.03)] overflow-x-clip overflow-y-hidden select-none transition-[width] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[width]"
    >
      {/* ───── Header: Context-Aware (Main Console or Settings Back Navigation) ───── */}
      {isSettingsMode ? (
        <div
          key="settings-header"
          className="relative h-16 border-b border-slate-100 flex-shrink-0 flex items-center px-3.5 overflow-hidden"
        >
          <Tooltip label="Back to Dashboard" show={isCollapsed}>
            <button
              type="button"
              onClick={handleBackToDashboard}
              className="w-full min-w-0 overflow-hidden flex items-center gap-2.5 p-1 rounded-xl text-slate-800 hover:text-slate-900 hover:bg-slate-100/80 transition-colors duration-150 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-light border border-primary-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div
                className={`flex flex-col items-start min-w-0 overflow-hidden text-left whitespace-nowrap transition-[opacity,transform] duration-200 ${
                  isCollapsed
                    ? "opacity-0 -translate-x-1 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <span className="text-[13px] font-semibold text-slate-900 truncate leading-tight">
                  Back to Dashboard
                </span>
                <span className="text-[11px] text-primary font-medium truncate leading-tight mt-0.5">
                  Platform Settings
                </span>
              </div>
            </button>
          </Tooltip>
        </div>
      ) : (
        <div
          key="main-header"
          className="relative h-16 border-b border-slate-100 flex-shrink-0 flex items-center px-3.5 overflow-hidden"
        >
          <Tooltip
            label={isInstituteMode ? "CampusOS Institute Portal" : "CampusOS Super Admin Console"}
            show={isCollapsed}
          >
            <Link
              href={isInstituteMode ? "/institute" : "/dashboard"}
              className="w-full min-w-0 overflow-hidden flex items-center gap-3 rounded-xl hover:bg-slate-50/80 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-extrabold text-white flex-shrink-0 shadow-md shadow-primary/25 ring-[1.5px] ring-primary/20">
                {isInstituteMode ? (
                  <GraduationCap className="w-5 h-5 text-white" />
                ) : (
                  <Shield className="w-5 h-5 text-white" />
                )}
              </div>
              <div
                className={`flex flex-col items-start min-w-0 overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-200 ${
                  isCollapsed
                    ? "opacity-0 -translate-x-1 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <span className="font-extrabold text-slate-900 text-[15px] truncate leading-tight tracking-tight">
                  CampusOS
                </span>
                <span className="text-[11px] text-primary font-semibold truncate capitalize leading-tight mt-0.5 flex items-center gap-1">
                  {isInstituteMode ? "Institute Portal" : "Super Admin Console"}
                </span>
              </div>
            </Link>
          </Tooltip>
        </div>
      )}

      {/* ───── Navigation Groups ───── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 thin-scrollbar"
        aria-label={isSettingsMode ? "Settings navigation" : "Main navigation"}
      >
        <div className={isSettingsMode ? "space-y-4" : "space-y-3.5"}>
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {group.title && (
                <h3
                  className={`px-3 text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em] whitespace-nowrap overflow-hidden transition-[opacity,max-height,margin] duration-200 ease-out ${
                    isCollapsed
                      ? "max-h-0 opacity-0 mb-0 pointer-events-none"
                      : "max-h-5 opacity-100 mb-1.5"
                  }`}
                >
                  {group.title}
                </h3>
              )}

              <div className="space-y-0.5">
                {group.items.map((item, iIdx) => {
                  const cleanPath =
                    pathname?.replace(/\/+$/, "") || (isInstituteMode ? "/institute" : "/dashboard")
                  const isDefaultSettingsMatch =
                    isSettingsMode &&
                    cleanPath === "/dashboard/settings" &&
                    item.href === "/dashboard/settings/general"
                  const isInstituteSectionMatch =
                    isInstituteMode &&
                    item.href !== "/institute" &&
                    (cleanPath === item.href || cleanPath.startsWith(item.href + "/"))
                  const isActive =
                    cleanPath === item.href ||
                    isDefaultSettingsMatch ||
                    isInstituteSectionMatch ||
                    (!isSettingsMode &&
                      !isInstituteMode &&
                      item.href.startsWith("/dashboard/settings") &&
                      cleanPath.startsWith("/dashboard/settings")) ||
                    (item.subItems && item.subItems.some((sub) => cleanPath === sub.href))
                  const menuKey = `${group.title}-${item.label}`

                  if (item.subItems) {
                    const isExpanded = expandedMenus[menuKey] ?? !!isActive
                    const activeSubIndex = item.subItems.findIndex((sub) => cleanPath === sub.href)
                    return (
                      <CollapsibleNavItem
                        key={iIdx}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        subItems={item.subItems}
                        isExpanded={isExpanded}
                        onToggle={() => toggleMenu(menuKey, isExpanded)}
                        isCollapsed={isCollapsed}
                        active={isActive}
                      >
                        {item.subItems.map((subItem, sIdx) => (
                          <SubNavItem
                            key={sIdx}
                            label={subItem.label}
                            href={subItem.href}
                            active={cleanPath === subItem.href}
                            index={sIdx}
                            total={item.subItems!.length}
                            activeIndex={activeSubIndex}
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
        </div>
      </nav>

      {/* ───── Bottom Dock: Collapse Toggle + Account Profile ───── */}
      <div className="border-t border-slate-100/90 flex-shrink-0 pt-2.5 pb-3 px-3 space-y-2">
        {/* Collapse / Expand Button (constant icon X anchor at 25px) */}
        <div className="hidden lg:block">
          <Tooltip
            label={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            show={isCollapsed}
          >
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="w-full min-w-0 overflow-hidden flex items-center justify-between px-[13px] py-2 rounded-xl text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 transition-colors duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`flex items-center justify-center flex-shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCollapsed ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronsLeft className="w-[18px] h-[18px] text-slate-500 group-hover:text-slate-800 transition-colors" />
                </span>
                <span
                  className={`text-[13px] font-medium whitespace-nowrap overflow-hidden transition-[opacity,transform] duration-200 ${
                    isCollapsed
                      ? "opacity-0 -translate-x-1 pointer-events-none"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  Collapse
                </span>
              </div>
              <kbd
                className={`text-[10px] font-medium text-slate-400 group-hover:text-slate-600 px-1.5 py-0.5 rounded-md bg-slate-100/90 border border-slate-200/80 leading-none font-sans whitespace-nowrap transition-opacity duration-150 ${
                  isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                Ctrl+B
              </kbd>
            </button>
          </Tooltip>
        </div>

        {/* Account Profile Dock */}
        <div
          className={`flex items-center justify-between rounded-2xl border transition-all duration-200 ${
            isCollapsed
              ? "px-0.5 py-0.5 bg-transparent border-transparent"
              : pathname === (isInstituteMode ? "/institute/profile" : "/dashboard/profile")
              ? "p-2 bg-primary-light/60 border-primary/35 gap-2"
              : "p-2 bg-slate-50/80 border-slate-200/75 hover:border-slate-300/75 gap-2"
          }`}
        >
          <Tooltip label={`${user.name} · View Profile`} show={isCollapsed}>
            <Link
              href={isInstituteMode ? "/institute/profile" : "/dashboard/profile"}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2.5 min-w-0 flex-1 rounded-xl group"
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center overflow-hidden shadow-xs ring-2 ring-white">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
              </div>

              <div
                className={`flex flex-col min-w-0 text-left overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-200 ${
                  isCollapsed
                    ? "opacity-0 -translate-x-1 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <span className="text-[13px] font-semibold text-slate-900 truncate leading-tight group-hover:text-primary transition-colors">
                  {user.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500 truncate leading-tight mt-0.5">
                  {isInstituteMode ? "Institute Admin" : "Super Admin"}
                </span>
              </div>
            </Link>
          </Tooltip>

          {!isCollapsed && (
            <Tooltip label="Sign out" show className="flex-shrink-0">
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-2xs"
              >
                <Power className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Collapsed Sign-out Tile (smooth reveal without layout snap) */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
            isCollapsed ? "max-h-12 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <Tooltip label="Sign out" show={isCollapsed}>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              tabIndex={isCollapsed ? 0 : -1}
              className="w-10 h-10 mx-auto rounded-xl bg-slate-50/90 border border-slate-200/80 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Power className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
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
        className={`w-full min-w-0 overflow-hidden flex items-center justify-between px-[13px] py-2.5 rounded-xl transition-colors duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 ${
          active
            ? "bg-primary-light text-slate-900 shadow-xs"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {/* Active accent bar */}
        {active && (
          <motion.div
            layoutId={layoutId}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}

        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${
              active ? "text-primary" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                  className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
                })
              : icon}
          </div>
          <span
            className={`text-[13px] truncate whitespace-nowrap transition-[opacity,transform] duration-200 ${
              active ? "font-semibold" : "font-medium"
            } ${
              isCollapsed
                ? "opacity-0 -translate-x-1 pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
          >
            {label}
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums transition-opacity duration-150 ${
              active
                ? "bg-primary-light text-primary-dark"
                : "bg-slate-100 text-slate-500"
            } ${isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {badge}
          </span>
        )}

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
      left: rect.right + 20,
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
        aria-label={label}
        className={`w-full flex items-center px-[13px] py-2.5 rounded-xl transition-colors duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer ${
          active || isOpen
            ? "bg-primary-light text-primary shadow-xs"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
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
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
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
                className="fixed z-[9999] min-w-[220px] max-w-[276px] bg-white rounded-2xl shadow-[0_18px_45px_-10px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.06)] border border-slate-200/90 p-2 before:absolute before:-left-6 before:top-0 before:bottom-0 before:w-6"
                style={{ top: coords.top, left: coords.left }}
              >
                {/* Header with main link */}
                {href ? (
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-primary-light/80 text-slate-900 group transition-colors mb-1.5"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-primary truncate">
                      {label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
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
                            ? "bg-primary-light text-primary font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                            isSubActive
                              ? "bg-primary shadow-sm shadow-primary/40 scale-110"
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
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`w-full flex items-center justify-between px-[13px] py-2.5 rounded-xl transition-colors duration-150 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
          active
            ? "text-slate-900 hover:bg-slate-100/80"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${
              active ? "text-primary" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                  className: `w-[18px] h-[18px] ${active ? "stroke-[2.2]" : "stroke-[1.8]"}`,
                })
              : icon}
          </div>
          <span className={`text-[13px] truncate ${active ? "font-semibold text-slate-900" : "font-medium"}`}>
            {label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isExpanded ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
            }`}
          />
        </motion.div>
      </button>

      {/* Animated tree-connected sub-menu */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="-mt-0.5 pb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── SubNavItem ─────────────────────────────────────────────
function SubNavItem({
  label,
  href,
  active,
  index,
  total,
  activeIndex,
}: {
  label: string
  href: string
  active?: boolean
  index: number
  total: number
  activeIndex: number
}) {
  const isLast = index === total - 1
  const isAboveActive = activeIndex > index
  const topY = index === 0 ? 1 : 0

  return (
    <Link
      href={href}
      className="relative flex items-center h-8 pl-[44px] pr-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group"
    >
      {/* Single crisp SVG connector so stroke weight stays 100% uniform */}
      <svg
        aria-hidden="true"
        width={26}
        height={32}
        viewBox="0 0 26 32"
        fill="none"
        className="pointer-events-none absolute left-[15px] top-0 shrink-0"
      >
        {/* Neutral vertical stem below/behind */}
        {!active && !isAboveActive && (
          <g className="text-slate-300">
            <path
              d={isLast ? `M 7 ${topY} L 7 8` : `M 7 ${topY} L 7 32`}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M 7 8 Q 7 16 15 16 L 23 16"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M 20.2 13.4 L 23.2 16 L 20.2 18.6"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Row sits above the active sibling: neutral branch + highlighted primary spine */}
        {!active && isAboveActive && !isLast && (
          <>
            <g className="text-slate-300">
              <path
                d="M 7 8 Q 7 16 15 16 L 23 16"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d="M 20.2 13.4 L 23.2 16 L 20.2 18.6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <path
              d={`M 7 ${topY} L 7 32`}
              className="text-primary"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Active sibling: neutral continuation downwards + highlighted primary curve & arrow */}
        {active && (
          <>
            {!isLast && (
              <path
                d="M 7 8 L 7 32"
                className="text-slate-300"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            )}
            <g className="text-primary">
              <path
                d={`M 7 ${topY} L 7 8 Q 7 16 15 16 L 23 16`}
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d="M 20.2 13.4 L 23.2 16 L 20.2 18.6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        )}
      </svg>

      <span
        className={`text-[13px] truncate transition-colors duration-150 ${
          active
            ? "text-primary font-medium"
            : "text-slate-600 font-normal group-hover:text-slate-900"
        }`}
      >
        {label}
      </span>
    </Link>
  )
}

