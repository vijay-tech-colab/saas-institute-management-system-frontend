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
  Sparkles,
  ShieldAlert,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export default function NotFound() {
  const router = useRouter()

  const quickLinks = [
    {
      title: "Tenant Management",
      desc: "Manage institutes, domains & backups",
      href: "/dashboard/tenants",
      icon: <Building2 className="w-4 h-4 text-indigo-600" />,
    },
    {
      title: "Subscriptions",
      desc: "Plans, invoices & customer billing",
      href: "/dashboard/subscriptions",
      icon: <CreditCard className="w-4 h-4 text-teal-600" />,
    },
    {
      title: "User Management",
      desc: "Platform users, owners & directory",
      href: "/dashboard/users",
      icon: <Users className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: "Audit Logs",
      desc: "Security events, API & activity logs",
      href: "/dashboard/logs",
      icon: <ClipboardList className="w-4 h-4 text-amber-600" />,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-slate-50 relative flex flex-col justify-between overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-700">
      {/* Background Decorative Radial Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-purple-200/20 rounded-full blur-3xl opacity-70 animate-pulse-glow" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-indigo-100/50 rounded-full blur-2xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-teal-100/50 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Bar / Brand Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base group-hover:text-indigo-600 transition-colors">
              CampusOS
            </span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Super Admin
            </span>
          </div>
        </Link>

        <Link
          href="/dashboard/logs"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-white/80 backdrop-blur-sm border border-slate-200/70 px-3 py-1.5 rounded-lg shadow-sm hover:shadow"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Audit Logs</span>
        </Link>
      </header>

      {/* Main Content with Staggered Entrance */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center text-center my-auto"
      >
        {/* Animated 404 Centerpiece with Orbit Portal */}
        <motion.div variants={itemVariants} className="relative mb-6 select-none">
          {/* Floating badge 1: Left (Smooth CSS GPU float) */}
          <div className="absolute -left-6 sm:-left-20 top-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-700 text-xs font-semibold animate-float-slow z-20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>404: Route Missing</span>
          </div>

          {/* Floating badge 2: Right (Smooth CSS GPU float reverse) */}
          <div className="absolute -right-6 sm:-right-20 bottom-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-700 text-xs font-semibold animate-float-reverse z-20">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
            <span>Super Admin Console</span>
          </div>

          {/* Stylized 4 - [Portal Radar 0] - 4 Container */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 animate-float-slow">
            {/* First "4" */}
            <span className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-tighter bg-gradient-to-b from-indigo-600 via-indigo-700 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
              4
            </span>

            {/* Orbit Compass "0" Portal */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mx-1">
              {/* Outer rotating dashed ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/50 animate-spin-slow" />
              {/* Ambient pulsing glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-500/30 to-teal-700/30 blur-md animate-pulse-glow" />
              {/* Inner glass orb */}
              <div className="relative z-10 w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-xl flex items-center justify-center">
                <Compass className="w-8 h-8 sm:w-11 sm:h-11 text-indigo-600 animate-spin-slow" />
              </div>
            </div>

            {/* Second "4" */}
            <span className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-tighter bg-gradient-to-b from-indigo-600 via-indigo-700 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
              4
            </span>
          </div>
        </motion.div>

        {/* Headline & Description */}
        <motion.div variants={itemVariants} className="space-y-2.5 max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The page you requested doesn&apos;t exist or was relocated during the Super Admin platform migration.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-700 hover:from-indigo-700 hover:to-teal-800 text-white font-medium text-sm shadow-md shadow-indigo-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm border border-slate-200/90 shadow-sm transition-all duration-200 hover:text-slate-900 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Module Navigation */}
        <motion.div variants={itemVariants} className="mt-10 w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="h-px bg-slate-200/80 flex-1" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Explore Super Admin Modules
            </span>
            <div className="h-px bg-slate-200/80 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {quickLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
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
      </motion.main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200/60 mt-auto">
        <div>CampusOS Enterprise Platform &copy; {new Date().getFullYear()}</div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tenants"
            className="hover:text-slate-800 transition-colors"
          >
            Tenants
          </Link>
          <span>&bull;</span>
          <Link
            href="/dashboard/subscriptions"
            className="hover:text-slate-800 transition-colors"
          >
            Subscriptions
          </Link>
          <span>&bull;</span>
          <Link
            href="/dashboard/logs"
            className="hover:text-slate-800 transition-colors"
          >
            Audit Logs
          </Link>
        </div>
      </footer>
    </div>
  )
}

