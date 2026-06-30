"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, CheckCircle2, ChevronDown, GraduationCap, Users, BookOpen, UserPlus, IndianRupee, Bell, ArrowRight, LayoutDashboard, Calendar, X, Award, Wallet } from "lucide-react"

// --- Global Navigation Header ---
function GlobalNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-sm shadow-indigo-600/30">
            IM
          </div>
          <span className="text-xl font-bold tracking-tight text-[#18181B]">CampusOS</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#71717A]">
          <a href="#features" className="hover:text-indigo-600 transition-colors relative group cursor-pointer">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors relative group cursor-pointer">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
          </a>
          <a href="#faq" className="hover:text-indigo-600 transition-colors relative group cursor-pointer">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="/login" className="hidden md:block text-sm font-medium text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer">Sign In</a>
          <a href="/register" className="h-10 px-5 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 hover:scale-105 transition-all shadow-sm shadow-indigo-600/20 cursor-pointer">
            Get Started
          </a>
        </div>
      </div>
    </header>
  )
}

// --- Hero Section ---
function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-[#FAFAFA]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-500/5 blur-[120px] -z-10 rounded-full" />
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            India's #1 Platform for Computer Institutes
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#18181B] leading-tight mb-8">
            Manage your Computer <br className="hidden md:block" />
            <span className="text-indigo-600">
              Institute Effortlessly
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#71717A] max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate admissions, track fee installments for courses like DCA/ADCA, manage lab batches, and grow your computer training center with a single powerful dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-indigo-600 text-white font-bold text-base hover:scale-105 transition-transform flex items-center justify-center shadow-md shadow-indigo-600/20 cursor-pointer">
              Start 14-Day Free Trial
            </a>
            <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-white border border-[#E4E4E7] text-[#18181B] font-semibold text-base hover:bg-[#FAFAFA] hover:shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer">
              <Play className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform fill-indigo-600" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl"
        >
          {/* Light Mode Mock Dashboard */}
          <div className="rounded-2xl border border-[#E4E4E7] bg-white p-2 shadow-2xl relative">
            <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] overflow-hidden flex flex-col md:flex-row aspect-[16/9] relative">
              
              {/* Sidebar */}
              <div className="hidden md:flex w-64 bg-white border-r border-[#E4E4E7] p-4 flex-col gap-2">
                <div className="flex items-center gap-2 mb-8 px-2 mt-2">
                  <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-indigo-600"/></div>
                  <div className="font-bold text-slate-800 text-lg">TechEdu Hub</div>
                </div>
                
                {[
                  { icon: LayoutDashboard, active: true, label: "Dashboard" },
                  { icon: Users, active: false, label: "Students (ADCA/DCA)" },
                  { icon: Calendar, active: false, label: "Batch Schedule" },
                  { icon: IndianRupee, active: false, label: "Fee Management" },
                ].map((item, i) => (
                  <div key={i} className={`h-10 w-full rounded-lg flex items-center px-3 gap-3 ${item.active ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <item.icon className="w-4 h-4" />
                     <div className="text-sm">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Overview</h2>
                    <p className="text-sm text-slate-500">Today's metrics</p>
                  </div>
                  <div className="h-10 px-4 bg-indigo-600 text-white flex items-center justify-center rounded-lg text-sm font-semibold shadow-sm cursor-pointer">+ New Admission</div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Active Students", val: "1,248", icon: Users, color: "text-blue-600", bg: "bg-blue-100", trend: "+12 this week" },
                    { label: "Fee Collected", val: "₹1.5L", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-100", trend: "₹45k today" },
                    { label: "Pending Dues", val: "₹24k", icon: Bell, color: "text-rose-600", bg: "bg-rose-100", trend: "18 students" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-[#E4E4E7] rounded-xl p-5 shadow-sm flex flex-col justify-between">
                       <div className="flex justify-between items-start mb-2">
                         <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                         <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                           <stat.icon className={`w-4 h-4 ${stat.color}`} />
                         </div>
                       </div>
                       <div>
                         <div className="text-2xl font-bold text-slate-800">{stat.val}</div>
                         <div className="text-xs text-slate-500 mt-1">{stat.trend}</div>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Graph & Activity Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 bg-white border border-[#E4E4E7] rounded-xl shadow-sm p-5 relative overflow-hidden min-h-[200px]">
                     <div className="text-sm font-medium text-slate-500 mb-6">Fee Collection Analytics (Last 30 Days)</div>
                     {/* Fake Graph Lines */}
                     <svg className="absolute bottom-0 left-0 w-full h-[70%] preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <path d="M0 100 L 0 80 Q 25 70, 50 40 T 100 20 L 100 100 Z" fill="url(#gradLight)" opacity="0.5" />
                       <path d="M0 80 Q 25 70, 50 40 T 100 20" fill="none" stroke="#7c3aed" strokeWidth="3" />
                       <defs>
                         <linearGradient id="gradLight" x1="0%" y1="0%" x2="0%" y2="100%">
                           <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
                           <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
                         </linearGradient>
                       </defs>
                     </svg>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-white border border-[#E4E4E7] rounded-xl shadow-sm p-5 flex flex-col justify-between hidden sm:flex">
                    <div className="text-sm font-medium text-slate-500 mb-4">Recent Activity</div>
                    <div className="space-y-4">
                      {[
                        { name: "Rahul V.", course: "ADCA", action: "Paid ₹1,500", time: "10m ago" },
                        { name: "Priya S.", course: "Tally ERP", action: "Enrolled", time: "1h ago" },
                        { name: "Amit K.", course: "Typing", action: "Paid ₹500", time: "2h ago" },
                      ].map((act, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">{act.name[0]}</div>
                            <div>
                              <div className="text-xs font-bold text-slate-800">{act.name}</div>
                              <div className="text-[10px] text-slate-500">{act.course}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-emerald-600">{act.action}</div>
                            <div className="text-[10px] text-slate-400">{act.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- Trust Bar ---
function TrustBar() {
  const institutes = ["NIELIT Centers", "Tally Certified Institutes", "MKCL Authorized", "C-DAC Affiliates", "Aptech Centers"]
  return (
    <section className="py-10 border-y border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-[#71717A] uppercase tracking-widest mb-6">Trusted by 10,000+ Computer Institutes Across India</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {institutes.map((name, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold text-slate-500 flex items-center">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Value Proposition Bento Grid ---
function ValuePropBento() {
  const features = [
    {
      title: "Smart Fee Management",
      description: "Automate fee collection, track pending dues, and send automated WhatsApp/SMS reminders to students. Say goodbye to manual receipt books.",
      icon: <IndianRupee className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-100",
      cardBg: "from-emerald-50/50 to-white border-emerald-100/50",
      colSpan: "md:col-span-2"
    },
    {
      title: "Enquiry & CRM",
      description: "Capture leads for ADCA, Tally, or Web Dev courses and convert more enquiries into confirmed admissions.",
      icon: <UserPlus className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100",
      cardBg: "from-indigo-50/50 to-white border-indigo-100/50",
      colSpan: "md:col-span-1"
    },
    {
      title: "Student Portal",
      description: "Give students access to their syllabus, typing speed results, attendance, and exam grades.",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
      cardBg: "from-blue-50/50 to-white border-blue-100/50",
      colSpan: "md:col-span-1"
    },
    {
      title: "Batch & Attendance",
      description: "Effortlessly schedule multiple batches (e.g. 9-10 AM Tally), assign faculties, and track daily attendance with ease.",
      icon: <Users className="w-6 h-6 text-rose-600" />,
      bg: "bg-rose-100",
      cardBg: "from-rose-50/50 to-white border-rose-100/50",
      colSpan: "md:col-span-1"
    },
    {
      title: "Certificate Generator",
      description: "Auto-generate and print government-recognized completion certificates with QR codes.",
      icon: <Award className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-100",
      cardBg: "from-amber-50/50 to-white border-amber-100/50",
      colSpan: "md:col-span-1"
    }
  ]

  return (
    <section id="features" className="py-32 px-6 relative bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] mb-6">Everything you need to run your center</h2>
          <p className="text-lg text-[#71717A] max-w-2xl mx-auto">Replace your old Excel sheets and registers with a modern, cloud-based platform built specifically for computer training institutes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`group rounded-3xl bg-gradient-to-br ${feature.cardBg} border shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-500 relative overflow-hidden flex flex-col ${feature.colSpan}`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-bl-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className={`relative z-10 w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-[#18181B] mb-3">{feature.title}</h3>
              <p className="relative z-10 text-[#71717A] leading-relaxed flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Growth Metrics ---
function GrowthMetrics() {
  const metrics = [
    { value: "50k+", label: "Students Enrolled" },
    { value: "100%", label: "Fee Recovery" },
    { value: "0", label: "Manual Registers" },
  ]
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-3 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            <h4 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
              {metric.value}
            </h4>
            <p className="text-sm font-semibold text-indigo-300 uppercase tracking-widest">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// --- Pricing Cards ---
function PricingSection() {
  const tableFeatures = [
    { name: "Branches", trial: "1", basic: "1", pro: "3", enterprise: "Unlimited" },
    { name: "Students", trial: "100", basic: "200", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Teachers", trial: "5", basic: "5", pro: "20", enterprise: "Unlimited" },
    { name: "Fee Management", trial: true, basic: true, pro: true, enterprise: true },
    { name: "Staff Management", trial: false, basic: false, pro: true, enterprise: true },
    { name: "WhatsApp Integration", trial: false, basic: false, pro: true, enterprise: true },
    { name: "Certificate Generator", trial: false, basic: false, pro: true, enterprise: true },
    { name: "AI Features", trial: false, basic: false, pro: true, enterprise: true },
    { name: "White-label App", trial: false, basic: false, pro: false, enterprise: true },
    { name: "Custom Domain", trial: false, basic: false, pro: false, enterprise: true },
    { name: "API Access", trial: false, basic: false, pro: false, enterprise: true },
    { name: "Reports", trial: "Basic", basic: "Basic", pro: "Advanced", enterprise: "Custom" },
    { name: "Storage", trial: "1 GB", basic: "1 GB", pro: "10 GB", enterprise: "Unlimited" },
    { name: "Support", trial: "Email", basic: "Email", pro: "Priority", enterprise: "Dedicated" },
  ];

  return (
    <section id="pricing" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] mb-6">Simple, transparent pricing</h2>
          <p className="text-lg text-[#71717A] max-w-2xl mx-auto">Choose the perfect plan to grow your institute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start mb-32">
          
          {/* Starter */}
          <div className="rounded-3xl bg-white border border-[#E4E4E7] shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xl font-bold text-[#18181B] mb-2">Starter</h3>
            <p className="text-[#71717A] text-sm mb-6">Perfect for single-center training institutes offering basic courses.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-[#18181B]">₹999</span>
              <span className="text-[#71717A]">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "1 Branch", 
                "Up to 200 Students", 
                "5 Teachers",
                "Fee Management", 
                "Basic Reports",
                "1 GB Storage",
                "Email Support"
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-[#71717A] text-sm">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full h-12 rounded-xl bg-slate-100 text-[#18181B] font-medium hover:bg-slate-200 transition-colors cursor-pointer">Get Started</button>
          </div>

          {/* Professional (Highlighted) */}
          <div className="rounded-3xl bg-gradient-to-b from-indigo-600 to-violet-900 border border-indigo-400 p-8 shadow-2xl shadow-indigo-900/40 relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm shadow-orange-500/30 whitespace-nowrap z-10">
              Most Popular
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Professional</h3>
            <p className="text-indigo-200 text-sm mb-6">For growing institutes that need more power.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">₹2499</span>
              <span className="text-indigo-200">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Up to 3 Branches", 
                "Unlimited Students", 
                "20 Teachers",
                "WhatsApp Integration", 
                "Staff Management", 
                "Certificate Generator",
                "Advanced Reports",
                "Priority Support",
                "AI Features Included"
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-white text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300 mr-3 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full h-12 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer">Start 14-Day Trial</button>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-8 hover:shadow-2xl hover:border-slate-700 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-slate-400 text-sm mb-6">Custom solutions for large training franchises and NGO networks.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">Custom</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Unlimited Branches", 
                "Unlimited Students & Teachers",
                "White-label Student App", 
                "Biometric Device Integration", 
                "Tally Prime Sync",
                "Custom Domain", 
                "Custom Reports",
                "Dedicated Manager", 
                "API Access"
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full h-12 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors cursor-pointer border border-white/10">Contact Sales</button>
          </div>

        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-3xl -z-10 blur-xl" />
          
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#18181B] mb-4 tracking-tight">Compare all features</h3>
            <p className="text-[#71717A] text-lg max-w-2xl mx-auto">A detailed breakdown of everything included in our plans to help you make the right choice.</p>
          </div>
          
          <div className="bg-white rounded-3xl border border-[#E4E4E7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
            
            {/* Highlighted Column Background (Pro) */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[60%] right-[20%] bg-indigo-50/30 border-x border-indigo-100/50 pointer-events-none" />

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[768px]">
                <thead>
                  <tr>
                    <th className="pt-10 pb-6 px-6 font-semibold text-[#18181B] border-b border-[#E4E4E7] w-[20%] bg-white/50 backdrop-blur-sm z-10 sticky left-0">
                      Features
                    </th>
                    <th className="pt-10 pb-6 px-6 font-semibold text-center border-b border-[#E4E4E7] w-[20%]">
                      <div className="text-lg text-[#18181B] mb-1">Free Trial</div>
                      <div className="text-xs text-[#71717A] font-normal">14 Days</div>
                    </th>
                    <th className="pt-10 pb-6 px-6 font-semibold text-center border-b border-[#E4E4E7] w-[20%]">
                      <div className="text-lg text-[#18181B] mb-1">Starter</div>
                      <div className="text-xs text-[#71717A] font-normal">₹999/mo</div>
                    </th>
                    <th className="pt-10 pb-6 px-6 font-semibold text-center border-b border-[#E4E4E7] w-[20%] relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm shadow-indigo-600/30 whitespace-nowrap">
                        Most Popular
                      </div>
                      <div className="text-lg text-indigo-600 mb-1">Professional</div>
                      <div className="text-xs text-indigo-600/70 font-normal">₹2499/mo</div>
                    </th>
                    <th className="pt-10 pb-6 px-6 font-semibold text-center border-b border-[#E4E4E7] w-[20%]">
                      <div className="text-lg text-[#18181B] mb-1">Enterprise</div>
                      <div className="text-xs text-[#71717A] font-normal">Custom</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {tableFeatures.map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className={`py-5 px-6 font-medium text-[#18181B] border-b border-[#E4E4E7] bg-white group-hover:bg-slate-50/50 transition-colors z-10 sticky left-0 shadow-[1px_0_0_0_#E4E4E7] ${i === tableFeatures.length - 1 ? 'border-b-0' : ''}`}>
                        {row.name}
                      </td>
                      
                      <td className={`py-5 px-6 text-center text-[#71717A] border-b border-[#E4E4E7] font-medium ${i === tableFeatures.length - 1 ? 'border-b-0' : ''}`}>
                        {typeof row.trial === 'boolean' ? (
                          row.trial ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-rose-400" />
                            </div>
                          )
                        ) : (
                          row.trial
                        )}
                      </td>

                      <td className={`py-5 px-6 text-center text-[#18181B] border-b border-[#E4E4E7] font-medium ${i === tableFeatures.length - 1 ? 'border-b-0' : ''}`}>
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-rose-400" />
                            </div>
                          )
                        ) : (
                          row.basic
                        )}
                      </td>

                      <td className={`py-5 px-6 text-center text-indigo-900 border-b border-[#E4E4E7] font-semibold relative ${i === tableFeatures.length - 1 ? 'border-b-0' : ''}`}>
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <div className="w-8 h-8 rounded-full bg-indigo-100/50 flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-rose-400" />
                            </div>
                          )
                        ) : (
                          row.pro
                        )}
                      </td>

                      <td className={`py-5 px-6 text-center text-[#18181B] border-b border-[#E4E4E7] font-medium ${i === tableFeatures.length - 1 ? 'border-b-0' : ''}`}>
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-rose-400" />
                            </div>
                          )
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-50 p-6 text-center border-t border-[#E4E4E7]">
              <p className="text-[#71717A] text-sm">
                Need more information before making a decision? <a href="#" className="text-indigo-600 font-semibold hover:underline">Contact our sales team</a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// --- FAQ Section ---
function FAQSection() {
  const faqs = [
    { question: "Can I manage multiple branches from one account?", answer: "Yes, our Professional and Enterprise plans allow you to seamlessly manage and track revenue across multiple franchise locations (e.g., main city center and village branches) from a single admin dashboard." },
    { question: "Is student data secure?", answer: "Absolutely. We use enterprise-grade cloud servers with automatic daily backups. Only authorized staff (like your receptionist, lab faculty, or admin) can access data based on the roles you define." },
    { question: "Do you support automated WhatsApp reminders for fees?", answer: "Yes! CampusOS can automatically send fee payment reminders and payment receipts directly to students or parents via WhatsApp and SMS." },
    { question: "Can we print custom completion certificates?", answer: "Yes, our platform includes a built-in certificate generator. You can upload your institute's ISO/government-recognized template and auto-fill student details instantly upon course completion (e.g., ADCA Diploma)." },
    { question: "Does it integrate with Biometric Attendance devices?", answer: "Yes! Our Enterprise plan offers seamless integration with popular biometric devices (Mantra, SecuGen) so student and staff attendance is automatically logged in the cloud dashboard." },
    { question: "Can I migrate my existing Excel data?", answer: "Yes, we provide a 1-click Excel/CSV import tool. Our onboarding team will also assist you in migrating your existing student lists, fee records, and batch schedules for free." }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] mb-6 tracking-tight">Got questions?</h2>
          <p className="text-lg text-[#71717A]">Everything you need to know about migrating your institute to CampusOS.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border ${openIndex === i ? 'border-indigo-200 shadow-lg shadow-indigo-100/30 bg-white' : 'border-[#E4E4E7] bg-white hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50'} rounded-2xl overflow-hidden transition-all duration-300`}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none group"
              >
                <span className={`font-semibold pr-8 text-[15px] ${openIndex === i ? 'text-indigo-600' : 'text-[#18181B] group-hover:text-indigo-600'} transition-colors`}>{faq.question}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === i ? 'bg-indigo-100' : 'bg-slate-50 group-hover:bg-indigo-50'}`}>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-[#71717A] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-[#09090b] pt-24 pb-12 px-6 border-t border-white/10 text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-sm shadow-indigo-600/30">
              IM
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">CampusOS</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">The premier cloud platform to manage and grow your computer training institute across India.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#features" className="hover:text-indigo-400 transition-colors cursor-pointer">Features</a></li>
            <li><a href="#pricing" className="hover:text-indigo-400 transition-colors cursor-pointer">Pricing</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Certificate Generator</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Biometric Integration</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Student App</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors cursor-pointer">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Subscribe</h4>
          <p className="text-sm text-slate-400 mb-4">Get the latest updates and management tips delivered to your inbox.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 w-full text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-r-lg font-semibold transition-colors flex items-center justify-center shadow-sm cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 relative z-10">
        <p>© {new Date().getFullYear()} CampusOS. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms</a>
          <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

// --- Main Page Assembly ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] font-sans selection:bg-indigo-200 overflow-x-hidden relative">
       {/* Content */}
       <div className="relative z-10 flex flex-col min-h-screen">
         <GlobalNav />
         <main className="flex-1">
           <HeroSection />
           <TrustBar />
           <ValuePropBento />
           <GrowthMetrics />
           <PricingSection />
           <FAQSection />
         </main>
         <Footer />
       </div>
    </div>
  )
}
