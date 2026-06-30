"use client"
import React, { useState, useEffect } from "react"
import { useAtomValue } from "jotai"
import { userAtom, UserRole } from "@/store/user-store"
import { User, Shield, Bell, Building2, CreditCard, Sliders } from "lucide-react"

import { ProfileSettings } from "./tabs/ProfileSettings"
import { SecuritySettings } from "./tabs/SecuritySettings"
import { NotificationSettings } from "./tabs/NotificationSettings"
import { InstituteSettings } from "./tabs/InstituteSettings"
import { BillingSettings } from "./tabs/BillingSettings"
import { PlatformSettings } from "./tabs/PlatformSettings"

type TabId = 'profile' | 'security' | 'notifications' | 'institute' | 'billing' | 'platform'

interface TabConfig {
  id: TabId
  label: string
  icon: React.ReactNode
  roles: UserRole[]
  component: React.ReactNode
}

export function SettingsView() {
  const user = useAtomValue(userAtom)
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  const tabs: TabConfig[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], component: <ProfileSettings /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], component: <SecuritySettings /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], component: <NotificationSettings /> },
    { id: 'institute', label: 'Institute Info', icon: <Building2 className="w-5 h-5" />, roles: ['ADMIN'], component: <InstituteSettings /> },
    { id: 'billing', label: 'Billing & Plan', icon: <CreditCard className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'ADMIN'], component: <BillingSettings /> },
    { id: 'platform', label: 'Platform Settings', icon: <Sliders className="w-5 h-5" />, roles: ['SUPER_ADMIN'], component: <PlatformSettings /> },
  ]

  const visibleTabs = tabs.filter(tab => tab.roles.includes(user.role as UserRole))
  
  // Ensure active tab is valid for current role. Need useEffect to avoid state update during render.
  useEffect(() => {
    if (!visibleTabs.find(t => t.id === activeTab)) {
      setActiveTab(visibleTabs[0].id)
    }
  }, [user.role, activeTab, visibleTabs])

  const currentTabComponent = visibleTabs.find(t => t.id === activeTab)?.component

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <nav className="flex flex-col space-y-1">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${
                activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.1)]' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
        {currentTabComponent}
      </main>
    </div>
  )
}
