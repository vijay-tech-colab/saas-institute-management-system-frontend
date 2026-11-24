"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ArrowLeft,
  Building2,
  CreditCard,
  Users,
  ClipboardList,
  Compass,
  ShieldAlert,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export default function DashboardNotFound() {
  const router = useRouter()

  const quickLinks = [
    {
      title: "Tenant Management",
      desc: "Institutes, domains & backups",
      href: "/dashboard/tenants",
      icon: <Building2 className="w-4 h-4 text-indigo-600" />,
    },
    {
      title: "Subscriptions",
      desc: "Plans & customer billing",
      href: "/dashboard/subscriptions",
      icon: <CreditCard className="w-4 h-4 text-teal-600" />,
    },
    {
      title: "User Management",
      desc: "Platform users & directory",
      href: "/dashboard/users",
      icon: <Users className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: "Audit Logs",
      desc: "Security events & activity trail",
      href: "/dashboard/logs",
      icon: <ClipboardList className="w-4 h-4 text-amber-600" />,
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-200/30 via-violet-200/20 to-purple-100/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Animated 404 Centerpiece with Orbit Portal */}
      <motion.div variants={itemVariants} className="relative mb-6 select-none">
        {/* Floating badge 1: Left */}
        <div className="absolute -left-6 sm:-left-16 top-2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-700 text-xs font-semibold animate-float-slow z-20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>404 Error</span>
        </div>

        {/* Floating badge 2: Right */}
        <div className="absolute -right-6 sm:-right-16 bottom-2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-700 text-xs font-semibold animate-float-reverse z-20">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
          <span>Route Not Found</span>
        </div>

        {/* 4 - [Compass 0] - 4 Display */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 animate-float-slow">
          <span className="text-8xl sm:text-9xl md:text-[120px] font-black tracking-tighter bg-gradient-to-b from-indigo-600 via-indigo-700 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
            4
          </span>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center mx-1">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/50 animate-spin-slow" />
            <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-indigo-500/25 to-teal-700/25 blur-md animate-pulse-glow" />
            <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-xl flex items-center justify-center">
              <Compass className="w-7 h-7 sm:w-9 sm:h-9 text-indigo-600 animate-spin-slow" />
            </div>
          </div>

          <span className="text-8xl sm:text-9xl md:text-[120px] font-black tracking-tighter bg-gradient-to-b from-indigo-600 via-indigo-700 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
            4
          </span>
        </div>
      </motion.div>

      {/* Headline & Description */}
      <motion.div variants={itemVariants} className="max-w-md space-y-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Page Does Not Exist
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          The requested dashboard view was not found. It may have been relocated or removed.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-700 hover:from-indigo-700 hover:to-teal-800 text-white font-medium text-xs sm:text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200/90 shadow-sm hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </motion.div>

      {/* Quick Links Card Grid */}
      <motion.div variants={itemVariants} className="w-full max-w-xl">
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
          Popular Super Admin Modules
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
          {quickLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-start gap-3 p-3 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-600 truncate mt-0.5">
                  {item.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

