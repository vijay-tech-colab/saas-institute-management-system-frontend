import React from "react"
import Link from "next/link"
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  CheckCircle,
  Building2,
  Calendar,
  CreditCard,
  LayoutTemplate,
  ChevronRight,
  Package,
  FileBarChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export function BranchManagerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Branch Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Local branch performance, admissions, and daily operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 cursor-pointer">
            Generate Report
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Today's Admission" 
          value="12" 
          trend="+3" 
          isPositive={true}
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />} 
          bg="bg-indigo-50"
          ring="group-hover:ring-indigo-500/30"
        />
        <StatCard 
          title="Fees Collection (Today)" 
          value="$4,250" 
          trend="+15%" 
          isPositive={true}
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />} 
          bg="bg-emerald-50"
          ring="group-hover:ring-emerald-500/30"
        />
        <StatCard 
          title="Branch Attendance" 
          value="92%" 
          trend="-1.5%" 
          isPositive={false}
          icon={<CheckCircle className="w-5 h-5 text-rose-600" />} 
          bg="bg-rose-50"
          ring="group-hover:ring-rose-500/30"
        />
      </div>

      {/* Modules Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <LayoutTemplate className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">Branch Modules</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          {/* Student Management */}
          <ModuleCard 
            title="Student Management" 
            description="Manage branch admissions and student documents."
            icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
            gradient="from-blue-500 to-blue-600"
            links={[
              { label: "Admission", href: "#" },
              { label: "Documents", href: "#" },
            ]}
          />

          {/* Batch Management */}
          <ModuleCard 
            title="Batch Management" 
            description="Organize branch students into specific batches."
            icon={<Users className="w-6 h-6 text-rose-600" />}
            gradient="from-rose-500 to-rose-600"
            links={[
              { label: "Morning Batch", href: "#" },
              { label: "Evening Batch", href: "#" },
            ]}
          />

          {/* Faculty Management */}
          <ModuleCard 
            title="Faculty Management" 
            description="Manage branch faculty attendance and leaves."
            icon={<Users className="w-6 h-6 text-sky-600" />}
            gradient="from-sky-500 to-sky-600"
            links={[
              { label: "Attendance", href: "#" },
              { label: "Leave Requests", href: "#" },
            ]}
          />

          {/* Timetable */}
          <ModuleCard 
            title="Timetable" 
            description="View and manage daily branch schedules."
            icon={<Calendar className="w-6 h-6 text-amber-600" />}
            gradient="from-amber-500 to-amber-600"
            links={[
              { label: "Daily Schedule", href: "#" },
            ]}
          />

          {/* Attendance */}
          <ModuleCard 
            title="Attendance" 
            description="Track daily student and faculty attendance."
            icon={<CheckCircle className="w-6 h-6 text-teal-600" />}
            gradient="from-teal-500 to-teal-600"
            links={[
              { label: "Student", href: "#" },
              { label: "Faculty", href: "#" },
            ]}
          />

          {/* Fee Monitoring */}
          <ModuleCard 
            title="Fee Monitoring" 
            description="Collect branch fees and track pending dues."
            icon={<CreditCard className="w-6 h-6 text-fuchsia-600" />}
            gradient="from-fuchsia-500 to-pink-600"
            links={[
              { label: "Collect Fees", href: "#" },
              { label: "Pending Fees", href: "#" },
            ]}
          />

          {/* Inventory */}
          <ModuleCard 
            title="Inventory" 
            description="Track branch specific equipment and assets."
            icon={<Package className="w-6 h-6 text-orange-600" />}
            gradient="from-orange-500 to-orange-600"
            links={[
              { label: "Equipment", href: "#" },
            ]}
          />

          {/* Reports */}
          <ModuleCard 
            title="Reports" 
            description="Generate branch specific performance reports."
            icon={<FileBarChart className="w-6 h-6 text-indigo-400" />}
            gradient="from-indigo-400 to-indigo-500"
            links={[
              { label: "Branch Reports", href: "#" },
            ]}
          />

        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, isPositive, icon, bg, ring }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode, bg: string, ring: string }) {
  return (
    <div className={`bg-white px-4 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden ${ring} hover:-translate-y-0.5`}>
      {/* Glow on hover */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${bg} opacity-0 blur-xl group-hover:opacity-60 transition-opacity duration-500`}></div>
      
      <div className="flex items-center gap-3.5 relative z-10">
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1.5">{title}</p>
          <h3 className="text-xl font-extrabold text-slate-900 leading-none tracking-tight">{value}</h3>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-end justify-center">
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ title, description, icon, gradient, links }: { title: string, description: string, icon: React.ReactNode, gradient: string, links: {label: string, href: string}[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 relative overflow-hidden">
        {/* Banner gradient top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="font-bold text-slate-900 text-[15px]">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 leading-snug">{description}</p>
      </div>
      
      <div className="p-4 bg-slate-50/50 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2">
          {links.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              className="inline-flex items-center px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-[12px] font-medium text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t border-slate-100 bg-white mt-auto">
        <Link href="#" className="w-full flex items-center justify-center gap-1 text-[12px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-wider">
          Go to Module <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
