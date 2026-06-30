"use client"

import React from "react"
import { StatCard } from "@/features/subscriptions/components/shared/StatCard"
import { 
  Ticket, Clock, AlertTriangle, AlertCircle, 
  TrendingUp, Calendar, ThumbsUp, Filter, Download, 
  RefreshCcw, ChevronRight, User, ArrowUpRight 
} from "lucide-react"
import { motion } from "framer-motion"

// Mock Data
const monthlyTrendData = [
  { month: 'Jan', tickets: 240 },
  { month: 'Feb', tickets: 139 },
  { month: 'Mar', tickets: 980 },
  { month: 'Apr', tickets: 390 },
  { month: 'May', tickets: 480 },
  { month: 'Jun', tickets: 380 },
]

const recentActivityData = [
  { id: 1, subject: "Cannot access the student attendance module", customer: "Sarah Jenkins", date: "Jun 30, 24", status: "In Progress", statusColor: "text-indigo-600", statusBg: "bg-indigo-50" },
  { id: 2, subject: "Payment gateway timeout", customer: "Michael Chen", date: "Jun 30, 24", status: "Open", statusColor: "text-amber-600", statusBg: "bg-amber-50" },
  { id: 3, subject: "How to export results to PDF?", customer: "Emily Davis", date: "Jun 29, 24", status: "Resolved", statusColor: "text-emerald-600", statusBg: "bg-emerald-50" },
  { id: 4, subject: "Server error 500 on login", customer: "James Wilson", date: "Jun 29, 24", status: "Critical", statusColor: "text-rose-600", statusBg: "bg-rose-50" },
  { id: 5, subject: "Feature request: Custom certificates", customer: "Anita Patel", date: "Jun 28, 24", status: "Closed", statusColor: "text-slate-600", statusBg: "bg-slate-100" },
]

function TicketGrowthChart() {
  const max = Math.max(...monthlyTrendData.map(d => d.tickets));
  
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-base font-bold text-slate-900">Ticket Volume Trend</h3>
          <p className="text-xs text-slate-500 mt-1">New support tickets over time</p>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex-1 flex items-end gap-3 h-48 mt-auto">
        {monthlyTrendData.map((d, i) => {
          const height = (d.tickets / max) * 100;
          return (
            <div key={d.month} className="h-full flex-1 flex flex-col items-center justify-end gap-2 group">
              <div className="w-full h-full relative flex-1 flex items-end justify-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full max-w-[40px] bg-indigo-100 rounded-t-xl group-hover:bg-indigo-600 transition-colors relative"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-0 opacity-0 group-hover:opacity-100 group-hover:text-slate-700 transition-all">
                    {d.tickets}
                  </span>
                </motion.div>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-900 transition-colors uppercase">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivityList() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Tickets</h3>
          <p className="text-xs text-slate-500 mt-1">Latest support requests</p>
        </div>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {recentActivityData.map((ticket, i) => (
          <motion.div 
            key={ticket.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Ticket className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900 truncate max-w-[200px] sm:max-w-[250px]">{ticket.subject}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] text-slate-500">{ticket.customer}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="text-[11px] text-slate-400">{ticket.date}</p>
                </div>
              </div>
            </div>
            <div className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${ticket.statusBg} ${ticket.statusColor} uppercase tracking-wider`}>
              {ticket.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusDistribution() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-6">Status Distribution</h3>
      
      <div className="space-y-4">
        {[
          { plan: 'Open', pct: 65, users: 400, color: 'bg-indigo-600', light: 'bg-indigo-100' },
          { plan: 'In Progress', pct: 25, users: 300, color: 'bg-sky-500', light: 'bg-sky-100' },
          { plan: 'Resolved', pct: 10, users: 200, color: 'bg-emerald-500', light: 'bg-emerald-100' },
        ].map((item) => (
          <div key={item.plan}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-slate-700">{item.plan}</p>
              <p className="text-xs font-bold text-slate-900">{item.pct}% <span className="text-slate-400 font-medium">({item.users})</span></p>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${item.light}`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${item.color}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SupportDashboard() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Overview</h1>
            <p className="text-sm text-slate-500 mt-1">
              High-level metrics and analytics across all support tickets and SLAs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" /> Filter
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Calendar className="w-4 h-4 text-slate-400" /> Date Range
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Download className="w-4 h-4 text-slate-400" /> Export
            </button>
            
            <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors group shadow-sm shadow-indigo-100">
              <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Tickets" 
            value="1,248" 
            icon={<Ticket />} 
            iconColor="text-indigo-600" 
            iconBg="bg-indigo-50" 
            trend={12.5} 
            trendLabel="vs last month" 
          />
          <StatCard 
            title="Open Tickets" 
            value="142" 
            icon={<AlertCircle />} 
            iconColor="text-amber-600" 
            iconBg="bg-amber-50" 
            trend={4.2} 
            trendLabel="vs last month" 
            delay={0.1}
          />
          <StatCard 
            title="SLA Breached" 
            value="12" 
            icon={<AlertTriangle />} 
            iconColor="text-rose-600" 
            iconBg="bg-rose-50" 
            trend={-2.1}
            trendLabel="vs last month"
            delay={0.2}
          />
          <StatCard 
            title="Avg Resolution" 
            value="4.2h" 
            icon={<Clock />} 
            iconColor="text-emerald-600" 
            iconBg="bg-emerald-50" 
            trend={-1.5}
            trendLabel="vs last month"
            delay={0.3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TicketGrowthChart />
          <RecentActivityList />
        </div>

        {/* Third Row: Highlights and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Need to assign more agents?</h3>
              <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                Super Admin can assign agents to different departments and set SLA rules. Navigate to the Settings tab to configure support teams.
              </p>
              <button className="px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2">
                Manage Teams <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <StatusDistribution />
        </div>

      </div>
    </div>
  )
}