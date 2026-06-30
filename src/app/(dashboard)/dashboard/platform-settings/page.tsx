import { Metadata } from "next"
import { PlatformSettingsView } from "@/features/super-admin-settings/components/PlatformSettingsView"

export const metadata: Metadata = {
  title: "Platform Settings - CampusOS",
  description: "Configure global platform settings, billing, branding, and integrations.",
}

export default function PlatformSettingsPage() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-screen bg-[#F8FAFC]">
      <PlatformSettingsView />
    </div>
  )
}
