"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, Loader2, UserCheck, Database, Building2, ShieldCheck, Clock, Mail } from "lucide-react"

interface RegistrationFinishStepProps {
  onGoToDashboard: () => void;
  isLoading?: boolean;
}

export function RegistrationFinishStep({ onGoToDashboard, isLoading }: RegistrationFinishStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-4 sm:py-6"
    >
      {/* Premium Success Icon */}
      <div className="relative mb-5">
        {/* Animated glowing backdrop */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="absolute inset-0 bg-emerald-400 rounded-full blur-3xl"
        />
        
        {/* Ripple rings */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 border-2 border-emerald-400 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 border-2 border-emerald-300 rounded-full"
        />

        {/* Main Icon Box */}
        <motion.div
          initial={{ scale: 0, rotate: -15, y: 0 }}
          animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
          transition={{ 
            scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
            rotate: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-emerald-300/30"
          style={{ borderRadius: "1.5rem" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <Check className="w-10 h-10 text-white stroke-[3]" />
          </motion.div>
          {/* Sparkle badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100"
            style={{ borderRadius: "1rem", transform: "rotate(15deg)" }}
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
          </motion.div>
        </motion.div>
      </div>

      <div className="space-y-2 mb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
          You're all set!
        </h2>
        <p className="text-slate-500 max-w-sm mx-auto text-[14px] font-medium leading-relaxed">
          Your institute has been successfully registered. We are setting up your tailored workspace.
        </p>
      </div>

      {/* Setup Log Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {[
            {
              title: "Created primary owner account",
              description: "Administrative access configured",
              icon: UserCheck
            },
            {
              title: "Provisioned isolated tenant data",
              description: "Secure workspace initialized",
              icon: Database
            },
            {
              title: "Configured main branch details",
              description: "Campus settings applied",
              icon: Building2
            },
            {
              title: "Assigned SUPER_ADMIN roles",
              description: "Full system permissions granted",
              icon: ShieldCheck
            },
            {
              title: "Started 14-day free trial",
              description: "Premium features unlocked",
              icon: Clock
            },
            {
              title: "Configured system notifications",
              description: "Email templates initialized",
              icon: Mail
            }
          ].map((task, i) => {
            const Icon = task.icon;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              className="bg-white/80 backdrop-blur-md rounded-[14px] py-2.5 px-3.5 border border-slate-200/80 shadow-sm flex items-center space-x-3 group hover:bg-white hover:shadow-md hover:border-emerald-200/60 transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors shadow-sm border border-emerald-100/50">
                <Icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[13px] sm:text-[13.5px] text-slate-800 font-semibold group-hover:text-slate-900 transition-colors leading-tight truncate">{task.title}</span>
                <span className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium group-hover:text-slate-600 transition-colors mt-0.5 truncate">{task.description}</span>
              </div>
            </motion.div>
          )})}
        </div>
      </motion.div>

      {/* Premium CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="w-full"
      >
        <motion.button
          onClick={onGoToDashboard}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full max-w-md mx-auto h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white font-semibold text-[15px] transition-all shadow-xl shadow-indigo-600/25 group disabled:opacity-70 disabled:cursor-not-allowed border border-white/10 cursor-pointer overflow-hidden"
        >
          {/* Sweeping shine effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 1 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin text-indigo-200" />
                Setting up your workspace...
              </>
            ) : (
              <>
                Enter Dashboard
                <div className="ml-3 bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </>
            )}
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
