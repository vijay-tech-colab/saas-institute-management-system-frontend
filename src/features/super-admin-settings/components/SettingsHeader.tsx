"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, RotateCcw } from "lucide-react"

interface SettingsHeaderProps {
  activeCategoryLabel: string
  hasUnsavedChanges: boolean
  onSave: () => void
  onReset: () => void
}

export function SettingsHeader({ activeCategoryLabel, hasUnsavedChanges, onSave, onReset }: SettingsHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 bg-white border-b border-slate-200/70">
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[11px] sm:text-xs font-medium text-slate-400">Settings</span>
          <span className="text-slate-300 text-[11px] sm:text-xs">/</span>
          <span className="text-[11px] sm:text-xs font-medium text-slate-600">{activeCategoryLabel}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{activeCategoryLabel}</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Configure {activeCategoryLabel.toLowerCase()} and system preferences.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-shrink-0">
        <AnimatePresence>
          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-[11px] sm:text-xs font-semibold text-amber-700 bg-amber-50 px-2 sm:px-3 py-1.5 rounded-lg border border-amber-200/50"
            >
              Unsaved changes
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onReset}
          disabled={!hasUnsavedChanges}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-[13px] sm:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 sm:gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-slate-500" />
          <span className="hidden sm:inline">Discard</span>
        </button>

        <button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white text-[13px] sm:text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Save
        </button>
      </div>
    </header>
  )
}

