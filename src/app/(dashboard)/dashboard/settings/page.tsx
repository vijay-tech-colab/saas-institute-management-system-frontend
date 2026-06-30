import { Metadata } from "next"
import { SettingsView } from "@/features/settings/components/SettingsView"

export const metadata: Metadata = {
  title: "Settings - CampusOS",
  description: "Manage your account, institute, and platform settings.",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account preferences and configurations.
        </p>
      </header>

      <SettingsView />
    </div>
  )
}
