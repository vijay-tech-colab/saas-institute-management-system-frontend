import React from "react"
import Link from "next/link"
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  CheckCircle,
  Building2,
  BookOpen,
  Calendar,
  ClipboardList,
  CreditCard,
  Settings,
  LayoutTemplate,
  ChevronRight,
  Package,
  FileBarChart,
  UserCog,
  Briefcase
} from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Institute Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of daily operations, academic performance, and institute management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Semester</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 cursor-pointer">
            Download Report
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        <StatCard 
          title="Total Students" 
          value="3,450" 
          trend="+5%" 
          isPositive={true}
          icon={<Users className="w-5 h-5 text-indigo-600" />} 
          bg="bg-indigo-50"
          ring="group-hover:ring-indigo-500/30"
        />
        <StatCard 
          title="Faculty & Staff" 
          value="142" 
          trend="+2" 
          isPositive={true}
          icon={<Briefcase className="w-5 h-5 text-sky-600" />} 
          bg="bg-sky-50"
          ring="group-hover:ring-sky-500/30"
        />
        <StatCard 
          title="Revenue (Month)" 
          value="$125k" 
          trend="+12%" 
          isPositive={true}
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />} 
          bg="bg-emerald-50"
          ring="group-hover:ring-emerald-500/30"
        />
        <StatCard 
          title="Pending Fees" 
          value="$14.5k" 
          trend="-3%" 
          isPositive={true}
          icon={<CreditCard className="w-5 h-5 text-rose-600" />} 
          bg="bg-rose-50"
          ring="group-hover:ring-rose-500/30"
        />
        <StatCard 
          title="Avg. Attendance" 
          value="94%" 
          trend="+1.2%" 
          isPositive={true}
          icon={<CheckCircle className="w-5 h-5 text-violet-600" />} 
          bg="bg-violet-50"
          ring="group-hover:ring-violet-500/30"
        />
        <StatCard 
          title="Upcoming Exams" 
          value="8" 
          trend="Next 7 Days" 
          isPositive={true}
          icon={<Clock className="w-5 h-5 text-amber-600" />} 
          bg="bg-amber-50"
          ring="group-hover:ring-amber-500/30"
        />
      </div>

      {/* Modules Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <LayoutTemplate className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">Institute Modules</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          {/* Branch Management */}
          <ModuleCard 
            title="Branch Management" 
            description="Manage multiple branches, timings, and holidays."
            icon={<Building2 className="w-6 h-6 text-indigo-600" />}
            gradient="from-indigo-500 to-indigo-600"
            links={[
              { label: "Create Branch", href: "#" },
              { label: "Branch Settings", href: "#" },
              { label: "Branch Timing", href: "#" },
              { label: "Holidays", href: "#" },
            ]}
          />

          {/* User Management */}
          <ModuleCard 
            title="User Management" 
            description="Create staff roles and assign specific permissions."
            icon={<UserCog className="w-6 h-6 text-emerald-600" />}
            gradient="from-emerald-500 to-teal-600"
            links={[
              { label: "Create Manager", href: "#" },
              { label: "Faculty & Staff", href: "#" },
              { label: "Accountant", href: "#" },
              { label: "Assign Permissions", href: "#" },
            ]}
          />

          {/* Student Management */}
          <ModuleCard 
            title="Student Management" 
            description="Handle admissions, promotions, and alumni records."
            icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
            gradient="from-blue-500 to-blue-600"
            links={[
              { label: "Admission", href: "#" },
              { label: "Documents", href: "#" },
              { label: "ID Card", href: "#" },
              { label: "Promotion", href: "#" },
              { label: "Alumni", href: "#" },
            ]}
          />

          {/* Course Management */}
          <ModuleCard 
            title="Course Management" 
            description="Configure courses, syllabus, and fee structures."
            icon={<BookOpen className="w-6 h-6 text-violet-600" />}
            gradient="from-violet-500 to-purple-600"
            links={[
              { label: "Courses", href: "#" },
              { label: "Duration", href: "#" },
              { label: "Fees Config", href: "#" },
              { label: "Syllabus", href: "#" },
            ]}
          />

          {/* Batch Management */}
          <ModuleCard 
            title="Batch Management" 
            description="Organize students into morning, evening, or weekend batches."
            icon={<Users className="w-6 h-6 text-rose-600" />}
            gradient="from-rose-500 to-rose-600"
            links={[
              { label: "Morning Batch", href: "#" },
              { label: "Evening Batch", href: "#" },
              { label: "Weekend Batch", href: "#" },
            ]}
          />

          {/* Faculty Management */}
          <ModuleCard 
            title="Faculty Management" 
            description="Manage faculty subjects, leaves, and salary."
            icon={<Briefcase className="w-6 h-6 text-sky-600" />}
            gradient="from-sky-500 to-sky-600"
            links={[
              { label: "Salary", href: "#" },
              { label: "Attendance", href: "#" },
              { label: "Subjects", href: "#" },
              { label: "Leave", href: "#" },
            ]}
          />

          {/* Timetable */}
          <ModuleCard 
            title="Timetable" 
            description="Allocate classrooms and manage daily schedules."
            icon={<Calendar className="w-6 h-6 text-amber-600" />}
            gradient="from-amber-500 to-amber-600"
            links={[
              { label: "Daily Schedule", href: "#" },
              { label: "Classroom Allocation", href: "#" },
            ]}
          />

          {/* Attendance */}
          <ModuleCard 
            title="Attendance" 
            description="Track student and faculty attendance records."
            icon={<CheckCircle className="w-6 h-6 text-teal-600" />}
            gradient="from-teal-500 to-teal-600"
            links={[
              { label: "Student", href: "#" },
              { label: "Faculty", href: "#" },
            ]}
          />

          {/* Fees */}
          <ModuleCard 
            title="Fees Collection" 
            description="Collect fees, manage installments, and track pending dues."
            icon={<CreditCard className="w-6 h-6 text-fuchsia-600" />}
            gradient="from-fuchsia-500 to-pink-600"
            links={[
              { label: "Collect Fees", href: "#" },
              { label: "Installments", href: "#" },
              { label: "Discounts", href: "#" },
              { label: "Pending Fees", href: "#" },
            ]}
          />

          {/* Examination */}
          <ModuleCard 
            title="Examination" 
            description="Manage exams, generate results, and issue certificates."
            icon={<ClipboardList className="w-6 h-6 text-cyan-600" />}
            gradient="from-cyan-500 to-cyan-600"
            links={[
              { label: "Exams", href: "#" },
              { label: "Result", href: "#" },
              { label: "Certificates", href: "#" },
            ]}
          />

          {/* Inventory */}
          <ModuleCard 
            title="Inventory" 
            description="Track assets like computers, lab equipment, and projectors."
            icon={<Package className="w-6 h-6 text-orange-600" />}
            gradient="from-orange-500 to-orange-600"
            links={[
              { label: "Computers", href: "#" },
              { label: "Lab Equipment", href: "#" },
              { label: "Printers", href: "#" },
              { label: "Projectors", href: "#" },
            ]}
          />

          {/* Library */}
          <ModuleCard 
            title="Library" 
            description="Manage book inventory, issuing, and returns."
            icon={<BookOpen className="w-6 h-6 text-lime-600" />}
            gradient="from-lime-500 to-lime-600"
            links={[
              { label: "Books", href: "#" },
              { label: "Issue", href: "#" },
              { label: "Return", href: "#" },
            ]}
          />

          {/* Reports */}
          <ModuleCard 
            title="Reports" 
            description="Generate comprehensive revenue and attendance reports."
            icon={<FileBarChart className="w-6 h-6 text-indigo-400" />}
            gradient="from-indigo-400 to-indigo-500"
            links={[
              { label: "Revenue", href: "#" },
              { label: "Attendance", href: "#" },
              { label: "Student Report", href: "#" },
            ]}
          />

          {/* Settings */}
          <ModuleCard 
            title="Settings" 
            description="Configure institute profile, GST, logo, and email."
            icon={<Settings className="w-6 h-6 text-slate-600" />}
            gradient="from-slate-600 to-slate-700"
            links={[
              { label: "Logo", href: "#" },
              { label: "Institute Profile", href: "#" },
              { label: "GST", href: "#" },
              { label: "Email", href: "#" },
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
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${trend === 'Next 7 Days' ? 'bg-amber-50 text-amber-700' : isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {trend !== 'Next 7 Days' && (isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />)}
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
