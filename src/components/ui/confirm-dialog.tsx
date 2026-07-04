"use client";

import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";
import { confirmDialogAtom, ConfirmDialogType } from "@/store/dialog-store";

const typeConfig: Record<ConfirmDialogType, { icon: any, colors: string, iconColors: string }> = {
  danger: {
    icon: AlertCircle,
    colors: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200",
    iconColors: "text-rose-600 bg-rose-100",
  },
  warning: {
    icon: AlertTriangle,
    colors: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200",
    iconColors: "text-amber-600 bg-amber-100",
  },
  info: {
    icon: Info,
    colors: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200",
    iconColors: "text-indigo-600 bg-indigo-100",
  },
};

export function ConfirmDialogProvider() {
  const dialog = useAtomValue(confirmDialogAtom);
  const { isOpen, title, description, type, confirmText, cancelText, onConfirm, onCancel } = dialog;

  if (!isOpen) return null;

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-sm"
            onClick={onCancel}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-100"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${config.iconColors}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-[15px] text-slate-500 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-6 py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3 sm:px-8">
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-6 py-2.5 rounded-xl text-[14px] font-semibold shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${config.colors}`}
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
