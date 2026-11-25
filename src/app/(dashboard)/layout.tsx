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
    <div className="h-screen h-dvh overflow-hidden flex w-full bg-slate-50 font-sans text-slate-900 print:h-auto print:overflow-visible">
      <div className="print:hidden shrink-0 h-full">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden shrink-0 z-20">
          <DashboardHeader />
        </div>
        <main className="flex-1 min-h-0 overflow-y-auto thin-scrollbar print:overflow-visible">
          <RouteGuard>
            {children}
          </RouteGuard>
        </main>
      </div>
    </div>
  )
}
