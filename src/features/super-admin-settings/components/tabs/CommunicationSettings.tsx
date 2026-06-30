import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CommunicationSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Communication</h2>
        <p className="text-slate-500 mt-1">Configure Email, SMS, and WhatsApp integrations.</p>
      </div>

      <SettingsSection title="Email Settings (SMTP)" description="Configure system-wide email delivery.">
        <SettingsRow title="SMTP Host" description="Your mail server address.">
          <Input defaultValue="smtp.sendgrid.net" />
        </SettingsRow>
        <SettingsRow title="SMTP Port">
          <Input type="number" defaultValue="587" className="w-24" />
        </SettingsRow>
        <SettingsRow title="SMTP Username">
          <Input defaultValue="apikey" />
        </SettingsRow>
        <SettingsRow title="SMTP Password">
          <Input type="password" placeholder="••••••••••••••••" />
        </SettingsRow>
        <SettingsRow title="Sender Details" description="Default from name and email.">
          <div className="flex gap-4">
            <Input placeholder="Sender Name" defaultValue="CampusOS Support" />
            <Input type="email" placeholder="Sender Email" defaultValue="no-reply@campusos.com" />
          </div>
        </SettingsRow>
        <SettingsRow title="Test Email">
          <div className="flex gap-4">
            <Input type="email" placeholder="Enter email to test" />
            <Button variant="secondary">Send Test</Button>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="SMS Settings" description="Configure SMS delivery via Twilio or local providers.">
        <SettingsRow title="SMS Provider API Key">
          <Input type="password" placeholder="Enter API Key" />
        </SettingsRow>
        <SettingsRow title="Sender ID">
          <Input defaultValue="CAMPUS" className="w-32" />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="WhatsApp Settings" description="Configure Meta Cloud API for WhatsApp.">
        <SettingsRow title="Access Token">
          <Input type="password" placeholder="Enter permanent access token" />
        </SettingsRow>
        <SettingsRow title="Phone Number ID">
          <Input placeholder="Enter Phone Number ID" />
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
