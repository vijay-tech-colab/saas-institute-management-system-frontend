"use client";

import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { toastsAtom, ToastType, Toast } from "@/store/toast-store";
import { useToast } from "@/hooks/use-toast";

const toastConfig: Record<ToastType, { icon: any, colors: string, iconColor: string }> = {
  success: {
    icon: CheckCircle2,
    colors: "border-emerald-200/60 bg-emerald-50/90 text-emerald-900",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: AlertCircle,
    colors: "border-rose-200/60 bg-rose-50/90 text-rose-900",
    iconColor: "text-rose-500",
  },
  warning: {
    icon: AlertTriangle,
    colors: "border-amber-200/60 bg-amber-50/90 text-amber-900",
    iconColor: "text-amber-500",
  },
  info: {
    icon: Info,
    colors: "border-blue-200/60 bg-blue-50/90 text-blue-900",
    iconColor: "text-blue-500",
  },
};

export function Toaster() {
  const toasts = useAtomValue(toastsAtom);
  const { remove } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              layout
              className={`pointer-events-auto min-w-[320px] max-w-[400px] rounded-2xl border backdrop-blur-xl shadow-lg p-4 flex gap-3 items-start ${config.colors}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-bold text-[14px] leading-tight">
                  {toast.title}
                </span>
                {toast.description && (
                  <span className="text-[13px] opacity-80 leading-snug">
                    {toast.description}
                  </span>
                )}
              </div>
              <button
                onClick={() => remove(toast.id)}
                className="shrink-0 rounded-full p-1 -mr-1 -mt-1 opacity-50 hover:opacity-100 hover:bg-black/5 transition-all outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
