import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopKPIs } from "./super-admin/TopKPIs"
import { BusinessAnalytics } from "./super-admin/BusinessAnalytics"
import { SystemHealthWidget } from "./super-admin/SystemHealthWidget"
import { SecurityCenterWidget } from "./super-admin/SecurityCenterWidget"
import { AIInsightsPanel } from "./super-admin/AIInsightsPanel"
import { RecentActivitySidebar } from "./super-admin/RecentActivitySidebar"
import { Grid, Calendar as CalendarIcon, Plus, FileText, Mail, Database, ChevronDown, X, Info, AlertTriangle, ShieldAlert, Sparkles, MonitorPlay } from "lucide-react"
import { DashboardEmptyState, ErrorState } from "@/components/ui/dashboard-states"

type BannerType = { type: 'info' | 'warning' | 'error' | 'success', text: string };

const BANNER_MESSAGES: BannerType[] = [
  { type: 'info', text: "New Feature: AI-powered Insights are now live for all Enterprise tenants." },
  { type: 'warning', text: "Scheduled Maintenance: System downtime expected on Sunday at 02:00 AM UTC." },
  { type: 'error', text: "Security Update: Two-factor authentication is now mandatory for Super Admins." },
  { type: 'success', text: "Welcome to CampusOS v2.0 - Explore the new advanced dashboard." }
];
export function SuperAdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [bannerMessage, setBannerMessage] = useState<BannerType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Dashboard State Toggles for Demonstration
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setBannerMessage(BANNER_MESSAGES[Math.floor(Math.random() * BANNER_MESSAGES.length)]);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <AnimatePresence>
        {isBannerVisible && bannerMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-[1600px] mx-auto px-6 overflow-hidden"
          >
            <div className={` w-full overflow-hidden shadow-sm rounded-2xl ${bannerMessage.type === 'info' ? 'bg-indigo-600 text-white' :
              bannerMessage.type === 'warning' ? 'bg-amber-500 text-white' :
                bannerMessage.type === 'error' ? 'bg-rose-600 text-white' :
                  'bg-emerald-500 text-white'
              }`}>
              <div className="px-6 py-3.5 flex items-center justify-between font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 shadow-sm border border-white/10 backdrop-blur-sm">
                    {bannerMessage.type === 'info' && <Info className="w-4 h-4 text-white" />}
                    {bannerMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-white" />}
                    {bannerMessage.type === 'error' && <ShieldAlert className="w-4 h-4 text-white" />}
                    {bannerMessage.type === 'success' && <Sparkles className="w-4 h-4 text-white" />}
                  </span>
                  <p className="text-sm">{bannerMessage.text}</p>
                </div>
                <button
                  onClick={() => setIsBannerVisible(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors ml-4"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col xl:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">

        {/* Left Column (Primary Content) */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative z-50">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-semibold tracking-widest uppercase">Global Admin</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  System Operational
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Overview</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Real-time metrics and infrastructure management for CampusOS.
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 shadow-sm">
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                {currentDate}
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsActionsOpen(!isActionsOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-sm shadow-slate-300 transition-all active:scale-95"
                >
                  <Grid className="w-4 h-4 text-slate-300" /> Quick Actions <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isActionsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isActionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-2 z-50 origin-top-right overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shortcuts</p>
                      </div>

                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-left group">
                        <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                        Create Institute
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-left group">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                        Generate Invoice
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-left group">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                        Broadcast Email
                      </button>

                      <div className="h-px bg-slate-100 my-1 mx-3"></div>

                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors text-left group">
                        <Database className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                        Backup Database
                      </button>
                      
                      <div className="h-px bg-slate-100 my-1 mx-3"></div>
                      <div className="px-3 py-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Simulate States</p>
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => { setIsNewAccount(!isNewAccount); setHasError(false); setIsActionsOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${isNewAccount ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                          >
                            <span className="flex items-center gap-2"><MonitorPlay className="w-3.5 h-3.5" /> Empty State</span>
                            {isNewAccount && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                          </button>
                          <button 
                            onClick={() => { setHasError(!hasError); setIsNewAccount(false); setIsActionsOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${hasError ? 'bg-rose-50 text-rose-700' : 'text-slate-600 hover:bg-slate-50'}`}
                          >
                            <span className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> Error State</span>
                            {hasError && <div className="w-2 h-2 rounded-full bg-rose-500"></div>}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {hasError ? (
            <div className="flex-1 mt-6">
              <ErrorState 
                onRetry={() => {
                  setHasError(false);
                  // Reload simulation could go here
                }} 
              />
            </div>
          ) : isNewAccount ? (
            <div className="flex-1 mt-6">
              <DashboardEmptyState onPrimaryAction={() => setIsNewAccount(false)} />
            </div>
          ) : (
            <>
              <TopKPIs />

              <BusinessAnalytics />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SystemHealthWidget />
                <SecurityCenterWidget />
              </div>
            </>
          )}

        </div>

        {/* Right Column (Sidebar Content) */}
        {(!isNewAccount && !hasError) && (
          <div className="w-full xl:w-80 2xl:w-96 shrink-0 flex flex-col gap-6">
            <div className="h-64 shrink-0">
              <AIInsightsPanel />
            </div>
            <div className="flex-1">
              <RecentActivitySidebar />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
