"use client"

import React from "react"
import { useAtomValue } from "jotai"
import { userAtom, UserRole } from "@/store/user-store"

import { SuperAdminDashboard } from "@/features/dashboard/components/SuperAdminDashboard"
import { AdminDashboard } from "@/features/dashboard/components/AdminDashboard"
import { BranchManagerDashboard } from "@/features/dashboard/components/BranchManagerDashboard"
import { TeacherDashboard } from "@/features/dashboard/components/TeacherDashboard"
import { StudentDashboard } from "@/features/dashboard/components/StudentDashboard"
import { ParentDashboard } from "@/features/dashboard/components/ParentDashboard"

export default function DashboardPage() {
  const user = useAtomValue(userAtom)

  const renderDashboard = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />
      case 'ADMIN':
        return <AdminDashboard />
      case 'BRANCH_MANAGER':
        return <BranchManagerDashboard />
      case 'TEACHER':
        return <TeacherDashboard />
      case 'STUDENT':
        return <StudentDashboard />
      case 'PARENT':
        return <ParentDashboard />
      default:
        return <StudentDashboard />
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 w-full">
      {renderDashboard(user.role)}
    </div>
  )
}
