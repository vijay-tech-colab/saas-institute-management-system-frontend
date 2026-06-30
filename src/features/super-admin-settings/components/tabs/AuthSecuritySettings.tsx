import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AuthSecuritySettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Authentication & Security</h2>
        <p className="text-slate-500 mt-1">Manage login policies, sessions, and access controls.</p>
      </div>

      <SettingsSection title="Password Policy" description="Enforce strong passwords for all users.">
        <SettingsRow title="Minimum Length" description="Require a minimum number of characters.">
          <Input type="number" defaultValue="8" className="w-24" />
        </SettingsRow>
        <SettingsRow title="Complexity Requirements">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="reqUppercase" defaultChecked />
              <label htmlFor="reqUppercase" className="text-sm font-medium leading-none">Require uppercase letters</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="reqNumbers" defaultChecked />
              <label htmlFor="reqNumbers" className="text-sm font-medium leading-none">Require numbers</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="reqSpecial" defaultChecked />
              <label htmlFor="reqSpecial" className="text-sm font-medium leading-none">Require special characters</label>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Session Management" description="Control how long users stay logged in.">
        <SettingsRow title="JWT Expiry" description="Time before access token expires (in minutes).">
          <Input type="number" defaultValue="15" className="w-24" />
        </SettingsRow>
        <SettingsRow title="Refresh Token Expiry" description="Time before refresh token expires (in days).">
          <Input type="number" defaultValue="7" className="w-24" />
        </SettingsRow>
        <SettingsRow title="Maximum Login Attempts" description="Lock account after this many failed attempts.">
          <Select defaultValue="5">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Attempts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 attempts</SelectItem>
              <SelectItem value="5">5 attempts</SelectItem>
              <SelectItem value="10">10 attempts</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Two-Factor Authentication (2FA)" description="Add an extra layer of security.">
        <SettingsRow title="Enforce 2FA" description="Require specific roles to use 2FA.">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="2faSuperAdmin" defaultChecked />
              <label htmlFor="2faSuperAdmin" className="text-sm font-medium leading-none">Super Admins</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="2faAdmin" />
              <label htmlFor="2faAdmin" className="text-sm font-medium leading-none">Tenant Admins</label>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
