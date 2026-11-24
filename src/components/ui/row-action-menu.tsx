"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RowActionItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  hidden?: boolean;
  disabled?: boolean;
}

interface RowActionMenuProps {
  items: RowActionItem[];
  ariaLabel?: string;
  className?: string;
}

const ITEM_VARIANT_STYLES: Record<NonNullable<RowActionItem["variant"]>, string> = {
  default: "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
  primary: "text-primary hover:bg-primary-light",
  success: "text-emerald-700 hover:bg-emerald-50",
  warning: "text-amber-700 hover:bg-amber-50",
  danger: "text-rose-600 hover:bg-rose-50",
};

/**
 * Shared sticky column helper classes for horizontal-scroll tables
 * (opaque backgrounds ensure scrolling columns never bleed through pinned ID/Actions).
 */
export const TABLE_STICKY = {
  checkboxTh:
    "sticky left-0 z-20 bg-slate-50 w-11 min-w-[44px] max-w-[44px]",
  checkboxTd:
    "sticky left-0 z-10 bg-white group-hover:bg-slate-50 w-11 min-w-[44px] max-w-[44px]",
  idThWithCheckbox:
    "sticky left-[44px] z-20 bg-slate-50 border-r border-slate-200/70 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.06)] whitespace-nowrap",
  idTdWithCheckbox:
    "sticky left-[44px] z-10 bg-white group-hover:bg-slate-50 border-r border-slate-100 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.05)] whitespace-nowrap",
  idTh:
    "sticky left-0 z-20 bg-slate-50 border-r border-slate-200/70 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.06)] whitespace-nowrap",
  idTd:
    "sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-r border-slate-100 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.05)] whitespace-nowrap",
  actionTh:
    "sticky right-0 z-20 bg-slate-50 border-l border-slate-200/70 shadow-[-2px_0_6px_-2px_rgba(15,23,42,0.06)] text-center w-[64px] min-w-[64px] whitespace-nowrap",
  actionTd:
    "sticky right-0 z-10 bg-white group-hover:bg-slate-50 border-l border-slate-100 shadow-[-2px_0_6px_-2px_rgba(15,23,42,0.05)] text-center w-[64px] min-w-[64px] whitespace-nowrap",
};

export function RowActionMenu({
  items,
  ariaLabel = "Row actions",
  className,
}: RowActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top?: number; bottom?: number; left: number }>({
    top: 0,
    left: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.filter((item) => !item.hidden);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 176;
    const estimatedHeight = visibleItems.length * 34 + 16;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < estimatedHeight && rect.top > spaceBelow;
    const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));

    if (openUpward) {
      setCoords({
        bottom: window.innerHeight - rect.top + 6,
        left,
      });
    } else {
      setCoords({
        top: rect.bottom + 6,
        left,
      });
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open]);

  if (visibleItems.length === 0) return null;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => {
          e.stopPropagation();
          if (!open) {
            updatePosition();
          }
          setOpen((prev) => !prev);
        }}
        className={cn(
          "w-8 h-8 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
          open
            ? "bg-primary-light text-primary"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                role="menu"
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: coords.top,
                  bottom: coords.bottom,
                  left: coords.left,
                  width: 176,
                }}
                onClick={(e) => e.stopPropagation()}
                className="z-[9999] rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.16)]"
              >
                {visibleItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={`${item.label}-${idx}`}
                      type="button"
                      role="menuitem"
                      disabled={item.disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        item.onClick();
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                        ITEM_VARIANT_STYLES[item.variant ?? "default"]
                      )}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
