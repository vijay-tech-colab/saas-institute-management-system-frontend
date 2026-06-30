import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function GeneralPlatformSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      <SettingsSection 
        title="Platform Information" 
        description="Basic details about your SaaS platform."
      >
        <SettingsRow title="Platform Name" description="The public-facing name of your application." htmlFor="platformName">
          <Input id="platformName" defaultValue="CampusOS" />
        </SettingsRow>
        <SettingsRow title="Company Name" description="Your legal company name." htmlFor="companyName">
          <Input id="companyName" defaultValue="EduTech Solutions Inc." />
        </SettingsRow>
        <SettingsRow title="Support Email" description="Where user inquiries will be routed." htmlFor="supportEmail">
          <Input id="supportEmail" type="email" defaultValue="support@campusos.com" />
        </SettingsRow>
        <SettingsRow title="Website URL" description="The primary marketing website." htmlFor="websiteUrl">
          <Input id="websiteUrl" type="url" defaultValue="https://campusos.com" />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection 
        title="Localization" 
        description="Set default regional formatting."
      >
        <SettingsRow title="Default Language" description="The default language for new tenants.">
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (US)</SelectItem>
              <SelectItem value="uk">English (UK)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow title="Time Zone" description="Default time zone for the system.">
          <Select defaultValue="utc">
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow title="Date & Time Format" description="How dates are displayed globally.">
          <div className="flex gap-4">
            <Select defaultValue="mdy">
              <SelectTrigger>
                <SelectValue placeholder="Date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="12h">
              <SelectTrigger>
                <SelectValue placeholder="Time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SettingsRow>
        <SettingsRow title="Default Currency" description="Base currency for billing and reporting.">
          <Select defaultValue="usd">
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="inr">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection 
        title="Platform Behavior" 
        description="Control registration, trials, and system state."
      >
        <SettingsRow title="New Registrations" description="Allow new tenants to sign up automatically.">
          <div className="flex items-center space-x-2">
            <Checkbox id="enableRegistrations" defaultChecked />
            <label htmlFor="enableRegistrations" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable public signups
            </label>
          </div>
        </SettingsRow>
        <SettingsRow title="Trial Accounts" description="Allow users to test the platform before paying.">
          <div className="flex items-center space-x-2">
            <Checkbox id="enableTrials" defaultChecked />
            <label htmlFor="enableTrials" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable trial accounts
            </label>
          </div>
          <div className="mt-4">
            <Input type="number" defaultValue="14" className="w-24" />
            <span className="text-sm text-slate-500 ml-2">Default trial days</span>
          </div>
        </SettingsRow>
        <SettingsRow title="Maintenance Mode" description="Lock down the system for updates. Only Super Admins can log in.">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="maintenanceMode" />
              <label htmlFor="maintenanceMode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enable maintenance mode
              </label>
            </div>
            <Input placeholder="Message to display..." className="mt-2" />
          </div>
        </SettingsRow>
        <SettingsRow title="Debug Mode" description="Show detailed error traces on failure. Do not enable in production.">
          <div className="flex items-center space-x-2">
            <Checkbox id="debugMode" />
            <label htmlFor="debugMode" className="text-sm font-medium text-rose-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable debug mode
            </label>
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
