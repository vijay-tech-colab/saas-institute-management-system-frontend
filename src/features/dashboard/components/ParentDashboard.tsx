import React from "react"
import { Users, FileText, CreditCard, Bell, ChevronRight } from "lucide-react"

export function ParentDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Parent Portal</h1>
        <p className="text-sm text-slate-500 mt-1">
          Stay updated on your children's academic progress and institute notices.
        </p>
      </header>

      {/* Wards Quick Select & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ward Profile Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 shadow-[0_0_0_2px_rgba(79,70,229,0.1)] p-5 relative overflow-hidden cursor-pointer group">
            <div className="absolute top-0 right-0 p-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">
                A
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Alex Smith</h3>
                <p className="text-sm text-slate-500">Grade 10 - Section A</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-indigo-100 relative z-10">
              <div>
                <p className="text-xs text-slate-500">Attendance</p>
                <p className="font-semibold text-slate-900">94%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Grade</p>
                <p className="font-semibold text-slate-900">A-</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm hover:shadow-md p-5 transition-all cursor-pointer group hover:border-indigo-200">
             <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-xl font-bold text-slate-500 group-hover:text-indigo-500 group-hover:border-indigo-200 transition-colors">
                E
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Emma Smith</h3>
                <p className="text-sm text-slate-500">Grade 7 - Section C</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 relative z-10">
              <div>
                <p className="text-xs text-slate-500">Attendance</p>
                <p className="font-semibold text-slate-900">98%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Grade</p>
                <p className="font-semibold text-slate-900">B+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="rounded-xl bg-slate-900 text-white shadow-lg p-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5 blur-2xl"></div>
          <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Fee Status
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400">Total Outstanding</p>
              <p className="text-3xl font-bold text-white mt-1">$450.00</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Term 2 Fee (Alex)</span>
                <span className="text-sm font-bold text-rose-300">Due in 5 days</span>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors shadow-sm">
              Pay Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Recent Updates from Institute */}
         <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              Notices & Updates
            </h3>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-800">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 text-rose-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Parent-Teacher Meeting Scheduled</p>
                <p className="text-sm text-slate-500 mt-0.5">Please book your slot for the upcoming PTM on Saturday, 24th Oct.</p>
                <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0 text-sky-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Term 1 Report Cards Available</p>
                <p className="text-sm text-slate-500 mt-0.5">You can now view and download the report cards for Emma.</p>
                <p className="text-xs text-slate-400 mt-2">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Academic Activity */}
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Academic Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer group">
              <div>
                <p className="text-sm font-semibold text-slate-900">Physics Lab Project</p>
                <p className="text-xs text-slate-500">Alex • Graded: A (92/100)</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer group">
              <div>
                <p className="text-sm font-semibold text-slate-900">History Essay Due</p>
                <p className="text-xs text-slate-500">Emma • Due Tomorrow</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer group">
              <div>
                <p className="text-sm font-semibold text-slate-900">Absent Alert</p>
                <p className="text-xs text-rose-500 font-medium">Alex missed 1st Period Math today.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
