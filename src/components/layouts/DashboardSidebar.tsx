"use client"

import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAtom, useAtomValue } from "jotai"
import { userAtom } from "@/store/user-store"
import { isMobileSidebarOpenAtom } from "@/store/layout-store"
import { getNavigationByRole } from "@/config/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronsUpDown,
  Settings,
  HelpCircle,
  PanelLeftClose,
  ChevronRight,
  UserCircle,
  LogOut,
  Check,
  MapPin,
} from "lucide-react"

// ─── Constants ──────────────────────────────────────────────
const SIDEBAR_WIDTH_EXPANDED = 280
const SIDEBAR_WIDTH_COLLAPSED = 72
const COLLAPSE_DURATION = 0.3

// ─── Dummy Branches ─────────────────────────────────────────
const BRANCHES = [
  { id: "b1", name: "Main Campus", type: "Headquarters", initials: "MC", color: "indigo" },
  { id: "b2", name: "North Campus", type: "Engineering", initials: "NC", color: "emerald" },
  { id: "b3", name: "South Campus", type: "Medical", initials: "SC", color: "rose" },
]

const BRANCH_COLORS: Record<string, { gradient: string; bg: string; text: string; shadow: string; ring: string }> = {
  indigo: { 
    gradient: "from-indigo-600 via-indigo-600 to-violet-600", 
    bg: "bg-indigo-50/80", 
    text: "text-indigo-700",
    shadow: "shadow-indigo-600/25",
    ring: "ring-indigo-500/20"
  },
  emerald: { 
    gradient: "from-emerald-500 via-emerald-500 to-teal-600", 
    bg: "bg-emerald-50/80", 
    text: "text-emerald-700",
    shadow: "shadow-emerald-600/25",
    ring: "ring-emerald-500/20"
  },
  rose: { 
    gradient: "from-rose-500 via-rose-500 to-pink-600", 
    bg: "bg-rose-50/80", 
    text: "text-rose-700",
    shadow: "shadow-rose-600/25",
    ring: "ring-rose-500/20"
  }
}

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
  const [isBranchSwitcherOpen, setIsBranchSwitcherOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0])
  const pathname = usePathname()
  const branchSwitcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (branchSwitcherRef.current && !branchSwitcherRef.current.contains(event.target as Node)) {
        setIsBranchSwitcherOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const user = useAtomValue(userAtom)
  const navGroups = getNavigationByRole(user.role)

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const sidebarWidth = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  const sidebarContent = (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ duration: COLLAPSE_DURATION, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-slate-200/70 shadow-[1px_0_24px_rgba(0,0,0,0.03)] overflow-x-clip overflow-y-hidden select-none"
    >
      {/* ───── Header: Workspace Switcher ───── */}
      <div ref={branchSwitcherRef} className={`relative h-16 border-b border-slate-100 flex-shrink-0 flex items-center ${isCollapsed ? 'px-2.5 justify-center' : 'px-3'}`}>
        <Tooltip label={selectedBranch.name} show={isCollapsed}>
          <button 
            onClick={() => setIsBranchSwitcherOpen(!isBranchSwitcherOpen)}
            className={`w-full flex items-center justify-between hover:bg-slate-50 rounded-xl transition-all duration-200 cursor-pointer group ${isCollapsed ? 'p-1 justify-center' : 'px-2 py-1.5'}`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`rounded-xl bg-gradient-to-br ${BRANCH_COLORS[selectedBranch.color].gradient} flex items-center justify-center font-extrabold text-white flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-9 h-9 text-xs' : 'w-10 h-10 text-sm'} ring-[1.5px] ${BRANCH_COLORS[selectedBranch.color].ring}`}>
                {selectedBranch.initials}
              </div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="flex flex-col items-start overflow-hidden"
                  >
                    <span className="font-bold text-slate-900 text-[14px] truncate leading-tight tracking-tight">
                      {user.instituteName || "Institute Platform"}
                    </span>
                    <span className="text-[11px] text-indigo-500 font-semibold truncate capitalize leading-tight mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedBranch.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronsUpDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </Tooltip>

        {/* Branch Dropdown */}
        <AnimatePresence>
          {isBranchSwitcherOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`absolute z-50 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden ${
                isCollapsed ? "left-full ml-3 top-2 w-56" : "left-3 right-3 top-14"
              }`}
            >
                {/* Header */}
                <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Switch Campus</span>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="p-1.5 max-h-[300px] overflow-y-auto">
                  {BRANCHES.map((branch) => {
                    const isSelected = selectedBranch.id === branch.id
                    const branchColors = BRANCH_COLORS[branch.color]
                    
                    return (
                      <button
                        key={branch.id}
                        onClick={() => {
                          setSelectedBranch(branch)
                          setIsBranchSwitcherOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                          isSelected ? branchColors.bg : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white bg-gradient-to-br ${branchColors.gradient} shadow-sm`}>
                            {branch.initials}
                          </div>
                          <div className="flex flex-col items-start">
                            <span className={`leading-tight ${isSelected ? branchColors.text + ' font-bold' : 'text-slate-700 font-semibold'}`}>
                              {branch.name}
                            </span>
                            <span className={`text-[11px] leading-tight mt-0.5 ${isSelected ? branchColors.text + ' opacity-80' : 'text-slate-400'}`}>
                              {branch.type}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={branchColors.text}
                          >
                            <Check className="w-4 h-4 mr-1" />
                          </motion.div>
                        )}
                      </button>
                    )
                  })}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───── Search Bar ───── */}

      {/* ───── Navigation Groups ───── */}
      <nav
        className={`flex-1 overflow-y-auto py-3 thin-scrollbar transition-colors duration-300 ${isCollapsed ? 'px-2.5 space-y-1' : 'px-3 space-y-6'}`}
        aria-label="Main navigation"
      >
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em]"
                >
                  {group.title}
                </motion.h3>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {group.items.map((item, iIdx) => {
                const isActive =
                  pathname === item.href ||
                  (item.subItems && item.subItems.some((sub) => pathname === sub.href))
                const menuKey = `${group.title}-${item.label}`

                if (item.subItems) {
                  return (
                    <CollapsibleNavItem
                      key={iIdx}
                      icon={item.icon}
                      label={item.label}
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
                    active={pathname === item.href}
                    isCollapsed={isCollapsed}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ───── Bottom Section ───── */}
      <div className={`border-t border-slate-100 flex-shrink-0 pt-1.5 space-y-0.5 ${isCollapsed ? 'px-2.5' : 'px-3'}`}>
        {user.role === 'SUPER_ADMIN' ? (
          <NavItem href="/dashboard/platform-settings" icon={<Settings />} label="Platform Settings" active={pathname === "/dashboard/platform-settings"} isCollapsed={isCollapsed} />
        ) : (
          <NavItem href="/dashboard/settings" icon={<Settings />} label="Settings" active={pathname === "/dashboard/settings"} isCollapsed={isCollapsed} />
        )}
        <NavItem href="/dashboard/support" icon={<HelpCircle />} label="Help & Support" active={pathname === "/dashboard/support"} isCollapsed={isCollapsed} />
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
          <button className={`w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer group bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-indigo-50/60 hover:to-violet-50/40 border border-slate-200/60 hover:border-indigo-200/80 hover:shadow-sm ${isCollapsed ? "justify-center p-1.5" : "justify-between p-2"}`}>
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
}: {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
  active?: boolean
  isCollapsed?: boolean
}) {
  return (
    <Tooltip label={label} show={!!isCollapsed}>
      <Link
        href={href}
        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:ring-offset-1 ${active
            ? "bg-gradient-to-r from-indigo-50 to-indigo-50/40 text-slate-900 shadow-[0_1px_3px_rgba(79,70,229,0.08)]"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
          } ${isCollapsed ? "justify-center" : ""}`}
      >
        {/* Active accent bar */}
        {active && !isCollapsed && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-r-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        {active && isCollapsed && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-indigo-600" : "text-slate-700 group-hover:text-slate-900"
              }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
              })
              : icon}
          </div>
          <AnimatePresence>
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
        <AnimatePresence>
          {!isCollapsed && badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${active
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-slate-100 text-slate-500"
                }`}
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapsed badge dot */}
        {isCollapsed && badge && (
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/30" />
        )}
      </Link>
    </Tooltip>
  )
}

// ─── CollapsibleNavItem ─────────────────────────────────────
function CollapsibleNavItem({
  icon,
  label,
  children,
  isExpanded,
  onToggle,
  isCollapsed,
  active,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  isCollapsed?: boolean
  active?: boolean
}) {
  if (isCollapsed) {
    return (
      <Tooltip label={label} show>
        <button
          className={`w-full flex items-center justify-center p-2.5 rounded-xl transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 ${active
              ? "bg-gradient-to-r from-indigo-50 to-indigo-50/40 text-slate-900 shadow-[0_1px_3px_rgba(79,70,229,0.08)]"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
        >
          {active && (
            <motion.div
              layoutId="activeNavIndicator"
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
              }`}
          >
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `w-[18px] h-[18px] ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`,
              })
              : icon}
          </div>
        </button>
      </Tooltip>
    )
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 ${active
            ? "text-indigo-700 bg-indigo-50/40"
            : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
          }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700"
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
            className={`w-3.5 h-3.5 transition-colors duration-200 ${isExpanded ? "text-indigo-500" : "text-slate-300 group-hover:text-slate-400"
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
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 group ${active
          ? "text-indigo-600 font-semibold bg-indigo-50/50"
          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
        }`}
    >
      {/* Dot indicator */}
      <div
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${active
            ? "bg-indigo-500 shadow-sm shadow-indigo-500/40 scale-110"
            : "bg-slate-300/60 group-hover:bg-slate-400"
          }`}
      />
      {label}
    </Link>
  )
}
