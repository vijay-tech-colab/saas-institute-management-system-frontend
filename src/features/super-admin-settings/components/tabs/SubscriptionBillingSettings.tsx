import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function SubscriptionBillingSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Subscriptions & Billing</h2>
        <p className="text-slate-500 mt-1">Configure default plans, payment gateways, and tax settings.</p>
      </div>

      <SettingsSection title="Subscription Defaults" description="Rules for new and expiring tenants.">
        <SettingsRow title="Default Plan" description="The default plan assigned upon registration.">
          <Input defaultValue="Basic Plan" />
        </SettingsRow>
        <SettingsRow title="Grace Period (Days)" description="Days allowed after expiration before account is locked.">
          <Input type="number" defaultValue="3" className="w-24" />
        </SettingsRow>
        <SettingsRow title="Auto Suspend" description="Automatically suspend tenants after grace period.">
          <div className="flex items-center space-x-2">
            <Checkbox id="autoSuspend" defaultChecked />
            <label htmlFor="autoSuspend" className="text-sm font-medium leading-none">Enable auto-suspension</label>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Payment Gateways" description="Configure Stripe, Razorpay, or PayPal.">
        <SettingsRow title="Stripe Secret Key" description="Used for processing credit cards.">
          <Input type="password" placeholder="sk_test_..." />
        </SettingsRow>
        <SettingsRow title="Razorpay API Key" description="Used for processing payments in India.">
          <Input type="password" placeholder="rzp_test_..." />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Invoice & Tax Settings" description="Configure invoice generation.">
        <SettingsRow title="Invoice Prefix" description="Prefix for all generated invoices.">
          <Input defaultValue="INV-" className="w-32" />
        </SettingsRow>
        <SettingsRow title="Global Tax (%)" description="Default tax rate applied to subscriptions.">
          <Input type="number" defaultValue="18" className="w-24" />
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
