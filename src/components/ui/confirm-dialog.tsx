"use client";

import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";
import { confirmDialogAtom, ConfirmDialogType } from "@/store/dialog-store";

const typeConfig: Record<
  ConfirmDialogType,
  {
    icon: React.ComponentType<{ className?: string }>;
    colors: string;
    iconColors: string;
  }
> = {
  danger: {
    icon: AlertCircle,
    colors:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus-visible:ring-rose-500",
    iconColors: "text-rose-600 bg-rose-50 border border-rose-200/80",
  },
  warning: {
    icon: AlertTriangle,
    colors:
      "bg-amber-600 hover:bg-amber-700 text-white shadow-xs focus-visible:ring-amber-500",
    iconColors: "text-amber-600 bg-amber-50 border border-amber-200/80",
  },
  info: {
    icon: Info,
    colors:
      "bg-primary hover:bg-primary-hover text-white shadow-xs focus-visible:ring-primary",
    iconColors: "text-primary bg-primary-light border border-primary-border",
  },
};

export function ConfirmDialogProvider() {
  const dialog = useAtomValue(confirmDialogAtom);
  const {
    isOpen,
    title,
    description,
    type,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  } = dialog;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="confirm-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-[9998] bg-slate-900/15 backdrop-blur-[2px]"
            onClick={onCancel}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="confirm-dialog-card"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[380px] bg-white rounded-2xl shadow-[0_24px_60px_-15px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)] overflow-hidden pointer-events-auto border border-slate-200/90"
            >
              <div className="p-5 flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.iconColors}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      id="confirm-dialog-title"
                      className="text-[15px] font-semibold text-slate-900 leading-snug"
                    >
                      {title}
                    </h3>
                    <button
                      type="button"
                      onClick={onCancel}
                      aria-label="Close dialog"
                      className="-mt-1 -mr-1 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {description && (
                    <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="h-8.5 px-3.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-slate-300 cursor-pointer"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className={`h-8.5 px-4 rounded-xl text-xs font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1 cursor-pointer ${config.colors}`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
