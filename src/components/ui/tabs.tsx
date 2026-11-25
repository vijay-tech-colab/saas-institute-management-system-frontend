"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ─── Composable Tabs Primitives ──────────────────────────────────────────── */

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-4", className)}
    {...props}
  />
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "inline-flex max-w-full overflow-x-auto thin-scrollbar items-center gap-1 rounded-2xl bg-white/95 border border-slate-200/90 p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)] text-slate-600",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
    activeValue?: string
    onTabChange?: (value: string) => void
  }
>(({ className, value, activeValue, onTabChange, ...props }, ref) => {
  const isActive = value === activeValue
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onTabChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-medium ring-offset-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        isActive
          ? "bg-gradient-to-b from-primary to-primary-hover text-white font-semibold shadow-[0_4px_12px_-3px_rgba(13,148,136,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/75",
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; activeValue?: string }
>(({ className, value, activeValue, ...props }, ref) => {
  if (value !== activeValue) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

/* ─── Custom Nordic-Teal Animated Capsule Tabs ────────────────────────────── */

export interface TabOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
  count?: number
  badge?: string
  disabled?: boolean
}

interface SegmentedTabsProps<T extends string = string> {
  options: readonly TabOption<T>[]
  value: T
  onChange: (value: T) => void
  size?: "sm" | "md"
  fullWidth?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Custom elevated white pill dock with a spring-animated Nordic Teal active capsule,
 * frosted count badges, and smooth hover affordance. Used across all views, modals,
 * settings, notifications, and table toolbars.
 */
export function SegmentedTabs<T extends string = string>({
  options,
  value,
  onChange,
  size = "md",
  fullWidth = false,
  ariaLabel,
  className,
}: SegmentedTabsProps<T>) {
  const pillId = React.useId()

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "items-center gap-1 rounded-2xl bg-white/95 border border-slate-200/90 p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)] max-w-full overflow-x-auto thin-scrollbar",
        fullWidth ? "flex w-full" : "inline-flex w-fit",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer disabled:pointer-events-none disabled:opacity-50 group",
              fullWidth && "flex-1",
              !isActive && "hover:bg-slate-100/75",
              size === "sm"
                ? "px-3 py-1.5 text-xs"
                : "px-3.5 py-1.5 text-[13px]"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`custom-tab-capsule-${pillId}`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary to-primary-hover shadow-[0_4px_12px_-3px_rgba(13,148,136,0.45),0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.22)]"
              />
            )}

            <span
              className={cn(
                "relative z-10 inline-flex items-center gap-1.5 transition-colors duration-150",
                isActive
                  ? "text-white font-semibold"
                  : "text-slate-600 font-medium group-hover:text-slate-900"
              )}
            >
              {opt.icon && (
                <span
                  className={cn(
                    "shrink-0 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                >
                  {opt.icon}
                </span>
              )}
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-semibold tabular-nums leading-none transition-colors",
                    isActive
                      ? "bg-white/20 text-white border border-white/15"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/80"
                  )}
                >
                  {opt.count}
                </span>
              )}
              {opt.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide leading-none border transition-colors",
                    isActive
                      ? "bg-white text-primary-hover border-white/70"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  )}
                >
                  {opt.badge}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
