import React from "react"
import { Calendar, Users, ClipboardList, BookOpen, Clock, AlertCircle } from "lucide-react"

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Good Morning, Teacher</h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is your schedule and pending tasks for today.
        </p>
      </header>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Classes Today" 
          value="4" 
          subtitle="Next class in 45m"
          icon={<Calendar className="w-5 h-5 text-indigo-600" />} 
          bg="bg-indigo-50"
        />
        <StatCard 
          title="Pending Grades" 
          value="28" 
          subtitle="Math Mid-terms"
          icon={<ClipboardList className="w-5 h-5 text-amber-600" />} 
          bg="bg-amber-50"
        />
        <StatCard 
          title="Students Absent" 
          value="3" 
          subtitle="Across all batches"
          icon={<Users className="w-5 h-5 text-rose-600" />} 
          bg="bg-rose-50"
        />
        <StatCard 
          title="New Resources" 
          value="2" 
          subtitle="Added by Admin"
          icon={<BookOpen className="w-5 h-5 text-sky-600" />} 
          bg="bg-sky-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Today's Schedule</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View Full Calendar</button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: "09:00 AM", duration: "1h", subject: "Advanced Mathematics", grade: "Grade 10 - Section A", status: "completed" },
              { time: "11:30 AM", duration: "45m", subject: "Physics Labs", grade: "Grade 11 - Section B", status: "next" },
              { time: "02:00 PM", duration: "1h", subject: "Remedial Math", grade: "Grade 10 - Group 2", status: "upcoming" },
              { time: "03:30 PM", duration: "45m", subject: "Staff Meeting", grade: "Conference Room", status: "upcoming" },
            ].map((cls, idx) => (
              <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border ${cls.status === 'next' ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-100 bg-white'}`}>
                <div className="flex flex-col items-center justify-center min-w-[80px]">
                  <span className={`text-sm font-bold ${cls.status === 'completed' ? 'text-slate-400' : 'text-slate-900'}`}>{cls.time}</span>
                  <span className="text-xs font-medium text-slate-500">{cls.duration}</span>
                </div>
                
                {/* Timeline Line (simplified) */}
                <div className="w-px h-full bg-slate-200 hidden sm:block"></div>

                <div className="flex-1">
                  <h4 className={`text-base font-semibold ${cls.status === 'completed' ? 'text-slate-500' : 'text-slate-900'}`}>{cls.subject}</h4>
                  <p className="text-sm text-slate-500">{cls.grade}</p>
                </div>

                <div className="flex-shrink-0">
                  {cls.status === 'next' && (
                    <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                      Start Class
                    </button>
                  )}
                  {cls.status === 'completed' && (
                    <span className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full">Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Requires Attention
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-semibold text-amber-900">Grade 10 Mid-terms</p>
                <p className="text-xs text-amber-700 mt-1">15 assignments left to grade. Due by tomorrow.</p>
                <button className="mt-3 text-xs font-bold text-amber-700 hover:text-amber-900 uppercase tracking-wider">Grade Now &rarr;</button>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-sm font-semibold text-slate-900">Approve Leave</p>
                <p className="text-xs text-slate-500 mt-1">2 students requested leave for your classes.</p>
                <button className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider">Review &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, subtitle, icon, bg }: { title: string, value: string, subtitle: string, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${bg} opacity-50 blur-2xl group-hover:opacity-80 transition-opacity`}></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5">{value}</h3>
        </div>
      </div>
      
      <div className="relative z-10 hidden xl:block text-right">
        <p className="text-[9px] font-bold text-slate-400 uppercase leading-tight max-w-[70px]">{subtitle}</p>
      </div>
    </div>
  )
}
