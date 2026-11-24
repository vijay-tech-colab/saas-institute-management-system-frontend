"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
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
  /** Lock background scroll and interaction while open. Defaults to true. */
  lockBodyScroll?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Canonical floating right-side sheet / slide-over drawer.
 * Slides in smoothly from the right with clean viewport inset margins so it
 * never sits flush against the right edge, and locks background interaction/scroll.
 */
export function FloatingSheet({
  open,
  onClose,
  ariaLabel,
  widthClassName = "w-[min(368px,calc(100vw-1.5rem))]",
  lockBodyScroll = true,
  className,
  children,
}: FloatingSheetProps) {
  const panelRef = useRef<HTMLElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (!lockBodyScroll) return;

      // Block scroll-triggering keys outside the open sheet
      const target = e.target as Node | null;
      const isInsideSheet = !!(target && panelRef.current?.contains(target));
      if (
        !isInsideSheet &&
        [" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    const preventBackgroundScroll = (e: Event) => {
      if (!lockBodyScroll) return;
      const target = e.target as Node | null;
      if (!target || !panelRef.current?.contains(target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (lockBodyScroll) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", preventBackgroundScroll, { passive: false });
      document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      if (lockBodyScroll) {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
        document.removeEventListener("wheel", preventBackgroundScroll);
        document.removeEventListener("touchmove", preventBackgroundScroll);
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
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[9998] bg-slate-900/10 backdrop-blur-[2px] overscroll-none"
          />

          <motion.aside
            ref={panelRef}
            key="floating-sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ x: "calc(100% + 24px)" }}
            animate={{ x: 0 }}
            exit={{ x: "calc(100% + 24px)" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 33,
              mass: 0.85,
            }}
            className={cn(
              "fixed top-3 right-3 bottom-3 sm:top-4 sm:right-3 sm:bottom-4 z-[9999] bg-white border border-slate-200/90 rounded-2xl shadow-[0_24px_60px_-15px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)] flex flex-col overflow-hidden overscroll-contain will-change-transform",
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
