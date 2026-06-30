import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function AdvancedSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SettingsSection title="AI Integrations" description="Configure generative AI for insights and chatbots.">
        <SettingsRow title="AI Provider" description="Default language model provider.">
          <Input defaultValue="OpenAI" readOnly />
        </SettingsRow>
        <SettingsRow title="API Key">
          <Input type="password" placeholder="sk-..." />
        </SettingsRow>
        <SettingsRow title="AI Features" description="Enable AI capabilities across the platform.">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="aiChat" defaultChecked />
              <label htmlFor="aiChat" className="text-sm font-medium leading-none">AI Chat Support</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="aiInsights" defaultChecked />
              <label htmlFor="aiInsights" className="text-sm font-medium leading-none">Automated Insights</label>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Feature Flags" description="Globally toggle modules on or off for all new tenants.">
        <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 p-3 sm:p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <Checkbox id="ff-lms" defaultChecked />
            <label htmlFor="ff-lms" className="text-[13px] md:text-sm font-medium cursor-pointer flex-1">Learning Management (LMS)</label>
          </div>
          <div className="flex items-center space-x-2 p-3 sm:p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <Checkbox id="ff-exam" defaultChecked />
            <label htmlFor="ff-exam" className="text-[13px] md:text-sm font-medium cursor-pointer flex-1">Online Exams</label>
          </div>
          <div className="flex items-center space-x-2 p-3 sm:p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <Checkbox id="ff-library" defaultChecked />
            <label htmlFor="ff-library" className="text-[13px] md:text-sm font-medium cursor-pointer flex-1">Library Management</label>
          </div>
          <div className="flex items-center space-x-2 p-3 sm:p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <Checkbox id="ff-transport" defaultChecked />
            <label htmlFor="ff-transport" className="text-[13px] md:text-sm font-medium cursor-pointer flex-1">Transport Management</label>
          </div>
          <div className="flex items-center space-x-2 p-3 sm:p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <Checkbox id="ff-hr" defaultChecked />
            <label htmlFor="ff-hr" className="text-[13px] md:text-sm font-medium cursor-pointer flex-1">HR & Payroll</label>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Backup & Restore" description="Manage database and file backups.">
        <SettingsRow title="Automated Backups" description="Schedule automatic daily backups.">
          <div className="flex items-center space-x-2">
            <Checkbox id="autoBackup" defaultChecked />
            <label htmlFor="autoBackup" className="text-sm font-medium leading-none">Enable daily database backup (02:00 UTC)</label>
          </div>
        </SettingsRow>
        <SettingsRow title="Manual Backup">
          <div className="flex gap-4">
            <Button>Trigger Full Backup</Button>
            <Button variant="outline">Trigger DB Only</Button>
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
