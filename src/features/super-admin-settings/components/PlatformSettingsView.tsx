"use client"
import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SettingsSidebar } from "./SettingsSidebar"
import { SettingsHeader } from "./SettingsHeader"
import { 
  Building2, Globe, Shield, CreditCard, Mail, 
  Database, Sliders, Smartphone, HardDrive, Cpu, Plug, Tags
} from "lucide-react"

// Import category components
import { GeneralPlatformSettings } from "./tabs/GeneralPlatformSettings"
import { BrandingSettings } from "./tabs/BrandingSettings"
import { AuthSecuritySettings } from "./tabs/AuthSecuritySettings"
import { SubscriptionBillingSettings } from "./tabs/SubscriptionBillingSettings"
import { CommunicationSettings } from "./tabs/CommunicationSettings"
import { InfrastructureSettings } from "./tabs/InfrastructureSettings"
import { AdvancedSettings } from "./tabs/AdvancedSettings"

export type SettingsCategoryId = 
  | 'general' 
  | 'branding' 
  | 'security' 
  | 'billing' 
  | 'communication' 
  | 'infrastructure' 
  | 'advanced'

export interface SettingsCategory {
  id: SettingsCategoryId
  label: string
  icon: React.ElementType
  description: string
  component: React.ReactNode
}

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  { id: 'general', label: 'General & Platform', icon: Globe, description: 'Basic platform info, localization, and core behaviors', component: <GeneralPlatformSettings /> },
  { id: 'branding', label: 'Branding', icon: Tags, description: 'Logos, colors, and white-labeling', component: <BrandingSettings /> },
  { id: 'security', label: 'Auth & Security', icon: Shield, description: 'Login policies, 2FA, and access control', component: <AuthSecuritySettings /> },
  { id: 'billing', label: 'Subscriptions & Billing', icon: CreditCard, description: 'Plans, payment gateways, and taxes', component: <SubscriptionBillingSettings /> },
  { id: 'communication', label: 'Communication', icon: Mail, description: 'Email, SMS, WhatsApp, and Notifications', component: <CommunicationSettings /> },
  { id: 'infrastructure', label: 'Infrastructure', icon: HardDrive, description: 'Storage, caches, queues, and system health', component: <InfrastructureSettings /> },
  { id: 'advanced', label: 'Advanced', icon: Sliders, description: 'APIs, webhooks, AI, feature flags, and logs', component: <AdvancedSettings /> },
]

export function PlatformSettingsView() {
  const [activeCategoryId, setActiveCategoryId] = useState<SettingsCategoryId>('general')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  // This state could be moved to jotai or a form context in a real app
  // For UI demo, we'll expose a setter to the child components
  
  const activeCategory = useMemo(() => 
    SETTINGS_CATEGORIES.find(c => c.id === activeCategoryId) || SETTINGS_CATEGORIES[0]
  , [activeCategoryId])

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving changes for", activeCategory.label)
    setHasUnsavedChanges(false)
  }

  const handleReset = () => {
    // Implement reset logic here
    console.log("Resetting changes for", activeCategory.label)
    setHasUnsavedChanges(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-[#F8FAFC]">
      <SettingsHeader 
        activeCategoryLabel={activeCategory.label}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onReset={handleReset}
      />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <SettingsSidebar 
          categories={SETTINGS_CATEGORIES} 
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pb-24" // Extra padding for scrolling past last item
              >
                {/* We can clone the element to pass the setHasUnsavedChanges prop if needed, 
                    or rely on a context Provider. For now we use standard components. */}
                {activeCategory.component}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

