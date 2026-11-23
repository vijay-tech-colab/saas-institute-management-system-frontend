"use client"

import React from "react"
import { SuperAdminDashboard } from "@/features/dashboard/components/SuperAdminDashboard"

export default function DashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full">
      <SuperAdminDashboard />
    </div>
  )
}
