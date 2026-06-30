import React from "react"
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar"
import { DashboardHeader } from "@/components/layouts/DashboardHeader"
import { RouteGuard } from "@/components/guards/RouteGuard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50 font-sans text-slate-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          <RouteGuard>
            {children}
          </RouteGuard>
        </main>
      </div>
    </div>
  )
}
