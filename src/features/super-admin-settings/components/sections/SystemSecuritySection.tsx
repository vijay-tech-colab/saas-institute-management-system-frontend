"use client";

import React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import { DEFAULT_SECURITY_SETTINGS } from "../../data/default-settings";
import { SystemSecuritySettings } from "../../types";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import {
  SettingsField,
  SettingsPageHeader,
  SettingsPanel,
  SettingsSaveBar,
  SettingsSection,
  SettingsToggleRow,
} from "../shared/SettingsPrimitives";

export function SystemSecuritySection() {
  const confirm = useConfirm();

  const { values, updateField, isDirty, isSaving, reset, save } =
    useSettingsForm<SystemSecuritySettings>({
      initialValues: DEFAULT_SECURITY_SETTINGS,
      sectionLabel: "System & Security",
    });

  const handleMaintenanceToggle = async (checked: boolean) => {
    if (checked) {
      const ok = await confirm({
        title: "Enable platform maintenance mode?",
        description:
          "All tenant portals will temporarily display the maintenance notice and block active user logins until disabled.",
        type: "warning",
        confirmText: "Enable Maintenance",
      });
      if (!ok) return;
    }
    updateField("maintenanceMode", checked);
  };

  return (
    <div>
      <SettingsPageHeader
        title="System & Security"
        description="Control platform availability, Super Admin authentication hardening, session timeouts, and audit log retention."
      />

      <SettingsPanel>
        {/* ─── Maintenance Mode ─── */}
        <SettingsSection
          title="Platform Availability"
          description="Temporarily pause tenant traffic during schema migrations or infrastructure upgrades."
        >
          <SettingsToggleRow
            title="Maintenance Mode"
            description="Display a read-only status screen across all institute subdomains. Super Admin Console remains accessible."
            checked={values.maintenanceMode}
            onCheckedChange={handleMaintenanceToggle}
            badge={
              <StatusBadge
                status={values.maintenanceMode ? "warning" : "healthy"}
                label={values.maintenanceMode ? "Maintenance Active" : "Operational"}
              />
            }
          />

          <SettingsField
            label="Maintenance Banner Message"
            htmlFor="maint-msg"
            hint="Shown to institute administrators and students while maintenance mode is active."
          >
            <textarea
              id="maint-msg"
              rows={2}
              value={values.maintenanceMessage}
              onChange={(e) => updateField("maintenanceMessage", e.target.value)}
              className="flex w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-150 shadow-xs"
            />
          </SettingsField>
        </SettingsSection>

        {/* ─── Authentication & Access Hardening ─── */}
        <SettingsSection
          title="Authentication & Session Policy"
          description="Enforce multi-factor authentication and idle timeout thresholds for all internal administrators."
        >
          <SettingsToggleRow
            title="Enforce Two-Factor Authentication (2FA)"
            description="Require TOTP authenticator verification for every Super Admin account at sign-in."
            checked={values.enforceTwoFactor}
            onCheckedChange={(val) => updateField("enforceTwoFactor", val)}
            badge={
              <StatusBadge
                status={values.enforceTwoFactor ? "active" : "warning"}
                label={values.enforceTwoFactor ? "Enforced" : "Optional"}
              />
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Idle Session Timeout"
              hint="Automatically sign out inactive admin sessions."
            >
              <Select
                value={values.sessionTimeoutMinutes}
                onValueChange={(val) => updateField("sessionTimeoutMinutes", val)}
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour (Recommended)</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                  <SelectItem value="1440">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Failed Login Lockout Threshold"
              hint="Temporary lockout after consecutive invalid attempts."
            >
              <Select
                value={values.maxLoginAttempts}
                onValueChange={(val) => updateField("maxLoginAttempts", val)}
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
          </div>

          <SettingsField
            label="Console IP Allowlist (CIDR)"
            htmlFor="ip-allowlist"
            hint="Optional newline-separated IPv4 addresses or CIDR blocks permitted to access Super Admin routes."
          >
            <textarea
              id="ip-allowlist"
              rows={2}
              value={values.ipAllowlist}
              onChange={(e) => updateField("ipAllowlist", e.target.value)}
              placeholder="203.0.113.0/24"
              className="flex w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-150 shadow-xs"
            />
          </SettingsField>
        </SettingsSection>

        {/* ─── Audit Log Retention ─── */}
        <SettingsSection
          title="Audit Log Retention & Privacy"
          description="Define how long security trails, API logs, and billing activity are retained."
        >
          <SettingsField
            label="Retention Window"
            hint="Logs older than the retention window are purged or archived."
            className="max-w-xs"
          >
            <Select
              value={values.auditRetentionDays}
              onValueChange={(val) => updateField("auditRetentionDays", val)}
            >
              <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year (365 days)</SelectItem>
                <SelectItem value="1095">3 years (Compliance)</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>

          <div className="space-y-2.5">
            <SettingsToggleRow
              title="Auto-archive expired logs to cold storage"
              description="Compress and store aged audit records in encrypted object storage before primary DB cleanup."
              checked={values.autoArchiveColdStorage}
              onCheckedChange={(val) =>
                updateField("autoArchiveColdStorage", val)
              }
            />
            <SettingsToggleRow
              title="Redact PII & tokens in API logs"
              description="Automatically mask authorization headers, emails, and phone numbers in request diagnostics."
              checked={values.redactPiiInLogs}
              onCheckedChange={(val) => updateField("redactPiiInLogs", val)}
            />
          </div>
        </SettingsSection>
      </SettingsPanel>

      <SettingsSaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={save}
        onReset={reset}
      />
    </div>
  );
}
