import React from "react"
import Link from "next/link"
import { 
  BookOpen, 
  Award, 
  Clock, 
  FileText,
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  CreditCard,
  MessageSquare,
  FileBarChart,
  ChevronRight,
  LayoutTemplate,
  AlertCircle,
  Video,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export function StudentDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back! Here is your academic overview and quick actions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Current Session: <strong className="text-slate-700">2026-2027</strong></span>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        <StatCard 
          title="My Course" 
          value="B.Tech CS" 
          trend="Sem 4" 
          isPositive={true}
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />} 
          bg="bg-indigo-50"
          ring="group-hover:ring-indigo-500/30"
        />
        <StatCard 
          title="Attendance" 
          value="94%" 
          trend="+2%" 
          isPositive={true}
          icon={<Clock className="w-5 h-5 text-emerald-600" />} 
          bg="bg-emerald-50"
          ring="group-hover:ring-emerald-500/30"
        />
        <StatCard 
          title="Assignments" 
          value="3 Due" 
          trend="This Week" 
          isPositive={false}
          icon={<FileText className="w-5 h-5 text-amber-600" />} 
          bg="bg-amber-50"
          ring="group-hover:ring-amber-500/30"
        />
        <StatCard 
          title="Fees Status" 
          value="Paid" 
          trend="No Dues" 
          isPositive={true}
          icon={<CreditCard className="w-5 h-5 text-sky-600" />} 
          bg="bg-sky-50"
          ring="group-hover:ring-sky-500/30"
        />
        <StatCard 
          title="Certificates" 
          value="4" 
          trend="Earned" 
          isPositive={true}
          icon={<Award className="w-5 h-5 text-violet-600" />} 
          bg="bg-violet-50"
          ring="group-hover:ring-violet-500/30"
        />
      </div>

      {/* Modules Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <LayoutTemplate className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">My Modules</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          {/* Profile */}
          <ModuleCard 
            title="Profile" 
            description="Manage your personal and academic details."
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            gradient="from-indigo-500 to-indigo-600"
            links={[
              { label: "View Profile", href: "#" },
              { label: "Edit Details", href: "#" },
            ]}
          />

          {/* Attendance */}
          <ModuleCard 
            title="Attendance" 
            description="Track your daily attendance and subject-wise logs."
            icon={<Calendar className="w-6 h-6 text-emerald-600" />}
            gradient="from-emerald-500 to-teal-600"
            links={[
              { label: "Monthly View", href: "#" },
              { label: "Subject-wise", href: "#" },
            ]}
          />

          {/* Assignments */}
          <ModuleCard 
            title="Assignments" 
            description="View, submit, and track academic assignments."
            icon={<ClipboardList className="w-6 h-6 text-amber-600" />}
            gradient="from-amber-500 to-orange-600"
            links={[
              { label: "Pending (3)", href: "#" },
              { label: "Submitted", href: "#" },
            ]}
          />

          {/* Study Material */}
          <ModuleCard 
            title="Study Material" 
            description="Access notes, PDFs, and course resources."
            icon={<BookOpen className="w-6 h-6 text-blue-600" />}
            gradient="from-blue-500 to-blue-600"
            links={[
              { label: "View Materials", href: "#" },
              { label: "Recent Uploads", href: "#" },
            ]}
          />

          {/* Online Classes */}
          <ModuleCard 
            title="Online Classes" 
            description="Join live sessions and view recorded lectures."
            icon={<Video className="w-6 h-6 text-rose-600" />}
            gradient="from-rose-500 to-rose-600"
            links={[
              { label: "Join Live Class", href: "#" },
              { label: "Recordings", href: "#" },
            ]}
          />

          {/* Result */}
          <ModuleCard 
            title="Result" 
            description="Check exam scores, grades, and report cards."
            icon={<FileBarChart className="w-6 h-6 text-violet-600" />}
            gradient="from-violet-500 to-purple-600"
            links={[
              { label: "Latest Result", href: "#" },
              { label: "Past Records", href: "#" },
            ]}
          />

          {/* Fees */}
          <ModuleCard 
            title="Fees" 
            description="Pay dues online and download fee receipts."
            icon={<CreditCard className="w-6 h-6 text-sky-600" />}
            gradient="from-sky-500 to-sky-600"
            links={[
              { label: "Pay Now", href: "#" },
              { label: "Receipts", href: "#" },
            ]}
          />

          {/* Certificate Download */}
          <ModuleCard 
            title="Certificate Download" 
            description="Download achievements and course certificates."
            icon={<Download className="w-6 h-6 text-fuchsia-600" />}
            gradient="from-fuchsia-500 to-pink-600"
            links={[
              { label: "Download Latest", href: "#" },
              { label: "View All", href: "#" },
            ]}
          />

          {/* Complaint */}
          <ModuleCard 
            title="Complaint" 
            description="Raise issues or complaints to the administration."
            icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
            gradient="from-orange-500 to-orange-600"
            links={[
              { label: "New Complaint", href: "#" },
              { label: "Track Status", href: "#" },
            ]}
          />

          {/* Notifications */}
          <ModuleCard 
            title="Notifications" 
            description="Stay updated with institute announcements."
            icon={<MessageSquare className="w-6 h-6 text-slate-600" />}
            gradient="from-slate-600 to-slate-700"
            links={[
              { label: "Announcements", href: "#" },
              { label: "Messages", href: "#" },
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
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${trend === 'This Week' || trend === 'Sem 4' || trend === 'Earned' ? 'bg-slate-100 text-slate-700' : isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {(trend !== 'This Week' && trend !== 'Sem 4' && trend !== 'Earned') && (isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />)}
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
          Access Module <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
