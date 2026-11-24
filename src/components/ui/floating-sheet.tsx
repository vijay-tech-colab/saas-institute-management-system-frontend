"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingSheetProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  /** Width utility for the floating right-side drawer. Defaults to 368px max. */
  widthClassName?: string;
  /** Lock body scroll while open (recommended for notification/overlay sheets). */
  lockBodyScroll?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Canonical floating right-side sheet / slide-over drawer.
 * Slides in smoothly from the right with clean viewport inset margins so it
 * never sits flush against the right edge.
 */
export function FloatingSheet({
  open,
  onClose,
  ariaLabel,
  widthClassName = "w-[min(368px,calc(100vw-1.5rem))]",
  lockBodyScroll = false,
  className,
  children,
}: FloatingSheetProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    if (lockBodyScroll) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      if (lockBodyScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [open, onClose, lockBodyScroll]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="floating-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-slate-950/15 backdrop-blur-[1.5px]"
          />

          <motion.aside
            key="floating-sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ opacity: 0, x: 56, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 56, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed top-3 right-3 bottom-3 sm:top-4 sm:right-3 sm:bottom-4 z-[9999] bg-white border border-slate-200/90 rounded-2xl shadow-[0_24px_60px_-15px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)] flex flex-col overflow-hidden",
              widthClassName,
              className
            )}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface FloatingSheetHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  onClose: () => void;
  showBackArrow?: boolean;
  actions?: React.ReactNode;
  closeAriaLabel?: string;
}

export function FloatingSheetHeader({
  title,
  subtitle,
  badge,
  onClose,
  showBackArrow = true,
  actions,
  closeAriaLabel = "Close panel",
}: FloatingSheetHeaderProps) {
  return (
    <div className="px-4 py-3.5 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0 bg-white">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900 hover:text-primary transition-colors cursor-pointer min-w-0"
          >
            {showBackArrow && (
              <ArrowLeft className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span className="truncate">{title}</span>
          </button>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5 pl-6">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {actions}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeAriaLabel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function FloatingSheetBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto thin-scrollbar bg-white", className)}>
      {children}
    </div>
  );
}

export function FloatingSheetFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-2 shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
}
