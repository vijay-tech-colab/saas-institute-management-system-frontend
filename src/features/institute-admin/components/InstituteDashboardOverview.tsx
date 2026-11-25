'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  IndianRupee,
  Plus,
  UserPlus,
} from 'lucide-react';
import { NotchedStatCard } from '@/components/ui/notched-stat-card';
import { SegmentedTabs } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { TABLE_STICKY } from '@/components/ui/row-action-menu';
import { cn } from '@/lib/utils';

type InstituteSegment = 'all' | 'computer' | 'coaching' | 'school';

const SEGMENT_TABS = [
  { value: 'all', label: 'All Streams' },
  { value: 'computer', label: 'Computer Institute' },
  { value: 'coaching', label: 'Coaching Center' },
  { value: 'school', label: 'School' },
];

const UPCOMING_SESSIONS = [
  {
    id: 'BAT-201',
    name: 'Full Stack MERN — Lab B1',
    stream: 'computer' as const,
    faculty: 'Rahul Deshpande',
    timing: '09:00 AM - 11:00 AM',
    attendance: '26 / 28',
    status: 'active' as const,
  },
  {
    id: 'BAT-202',
    name: 'JEE Target Alpha — Hall A',
    stream: 'coaching' as const,
    faculty: 'Dr. Kavita Saxena',
    timing: '07:30 AM - 10:30 AM',
    attendance: '46 / 48',
    status: 'active' as const,
  },
  {
    id: 'CLS-10A',
    name: 'Class 10 — Section A (CBSE)',
    stream: 'school' as const,
    faculty: 'Mrs. Priya Deshmukh',
    timing: '08:00 AM - 01:30 PM',
    attendance: '40 / 42',
    status: 'active' as const,
  },
  {
    id: 'BAT-205',
    name: 'ADCA + Tally Prime — Evening E1',
    stream: 'computer' as const,
    faculty: 'Siddharth Rao',
    timing: '04:00 PM - 06:00 PM',
    attendance: 'Scheduled',
    status: 'upcoming' as const,
  },
  {
    id: 'BAT-208',
    name: 'NEET Dropper Test Review',
    stream: 'coaching' as const,
    faculty: 'Prof. S. Kulkarni',
    timing: '05:00 PM - 07:00 PM',
    attendance: 'Scheduled',
    status: 'upcoming' as const,
  },
];

const QUICK_MODULE_SHORTCUTS = [
  {
    label: 'New Enquiry / Admission',
    description: 'Leads & enrollments',
    href: '/institute/students/enquiries',
    icon: UserPlus,
  },
  {
    label: 'Mark Attendance',
    description: 'Students & staff register',
    href: '/institute/attendance/students',
    icon: CalendarCheck,
  },
  {
    label: 'Collect Fee & Receipt',
    description: 'Installments & dues',
    href: '/institute/finance/collections',
    icon: IndianRupee,
  },
  {
    label: 'Courses & Timetable',
    description: 'Batches & weekly schedule',
    href: '/institute/academics/batches',
    icon: BookOpen,
  },
];

export function InstituteDashboardOverview() {
  const [segment, setSegment] = useState<InstituteSegment>('all');

  const visibleSessions =
    segment === 'all'
      ? UPCOMING_SESSIONS
      : UPCOMING_SESSIONS.filter((item) => item.stream === segment);

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8 max-w-[1560px] mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Institute Overview
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Unified control center for Computer Institutes, Coaching Centers, and Schools.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SegmentedTabs
            options={SEGMENT_TABS}
            value={segment}
            onChange={(val) => setSegment(val as InstituteSegment)}
            size="sm"
          />
          <Button asChild size="sm" className="rounded-xl shadow-xs">
            <Link href="/institute/students/admissions">
              <Plus className="w-4 h-4 mr-1.5" />
              New Admission
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <NotchedStatCard
          title="Active Students"
          value="1,248"
          icon={<GraduationCap className="w-4 h-4" />}
          tone="primary"
          trend="+8.4%"
          compareLabel="vs last month"
          href="/institute/students/directory"
        />
        <NotchedStatCard
          title="Fee Collected (MTD)"
          value="₹14,82,500"
          icon={<IndianRupee className="w-4 h-4" />}
          tone="success"
          trend="+16.4%"
          compareLabel="vs last month"
          href="/institute/finance/collections"
        />
        <NotchedStatCard
          title="Today's Attendance"
          value="92.4%"
          icon={<CalendarCheck className="w-4 h-4" />}
          tone="info"
          trend="+1.8%"
          compareLabel="1,153 present"
          href="/institute/attendance"
        />
        <NotchedStatCard
          title="Pending Fee Dues"
          value="₹3,24,000"
          icon={<BookOpen className="w-4 h-4" />}
          tone="warning"
          trend="68 students"
          trendDirection="neutral"
          compareLabel="reminders active"
          href="/institute/finance"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Live Batches & Classes Table */}
        <div className="xl:col-span-2 bg-white border border-slate-200/85 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                Today&apos;s Batches, Labs & Classes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Live classroom, lab, and coaching batch status
              </p>
            </div>
            <Link
              href="/institute/academics/batches"
              className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
            >
              Manage All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full min-w-[740px] text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className={cn('py-3 px-5 whitespace-nowrap', TABLE_STICKY.idTh)}>Code</th>
                  <th className="py-3 px-5 whitespace-nowrap">Batch / Class</th>
                  <th className="py-3 px-5 whitespace-nowrap">Faculty</th>
                  <th className="py-3 px-5 whitespace-nowrap">Timing</th>
                  <th className="py-3 px-5 whitespace-nowrap">Attendance</th>
                  <th className="py-3 px-5 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {visibleSessions.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50 transition-colors">
                    <td className={cn('py-3.5 px-5 font-medium text-slate-700 tabular-nums whitespace-nowrap', TABLE_STICKY.idTd)}>
                      {row.id}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">
                      {row.faculty}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">
                      {row.timing}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-slate-700 tabular-nums whitespace-nowrap">
                      {row.attendance}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Operations */}
        <div className="bg-white border border-slate-200/85 rounded-2xl shadow-2xs p-5 flex flex-col justify-between gap-5">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
              Quick Operations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Jump directly to daily front-desk & academic tasks
            </p>

            <div className="mt-4 space-y-2.5">
              {QUICK_MODULE_SHORTCUTS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-primary/40 hover:bg-primary-light/35 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary-light border border-primary-border flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{item.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/75 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-800">Institute Configuration</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Profile, users, roles & general preferences</p>
            </div>
            <Link
              href="/institute/settings"
              className="text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
