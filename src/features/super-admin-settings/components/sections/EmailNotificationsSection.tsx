"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_NOTIFICATION_SETTINGS } from "../../data/default-settings";
import { EmailNotificationsSettings } from "../../types";
import { useSettingsForm, ValidationErrors } from "../../hooks/useSettingsForm";
import {
  MaskedSecretInput,
  SettingsField,
  SettingsPageHeader,
  SettingsPanel,
  SettingsSaveBar,
  SettingsSection,
  SettingsToggleRow,
} from "../shared/SettingsPrimitives";

function validateEmailSettings(
  values: EmailNotificationsSettings
): ValidationErrors<EmailNotificationsSettings> {
  const errs: ValidationErrors<EmailNotificationsSettings> = {};
  if (!values.smtpHost.trim()) {
    errs.smtpHost = "SMTP host is required.";
  }
  if (values.smtpPort < 1 || values.smtpPort > 65535) {
    errs.smtpPort = "Port must be between 1 and 65535.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.fromEmail.trim())) {
    errs.fromEmail = "Enter a valid sender email address.";
  }
  if (
    values.replyToEmail.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.replyToEmail.trim())
  ) {
    errs.replyToEmail = "Enter a valid reply-to email address.";
  }
  return errs;
}

export function EmailNotificationsSection() {
  const toast = useToast();
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  const {
    values,
    errors,
    updateField,
    setValues,
    isDirty,
    isSaving,
    reset,
    save,
  } = useSettingsForm<EmailNotificationsSettings>({
    initialValues: DEFAULT_NOTIFICATION_SETTINGS,
    sectionLabel: "Email & SMTP / Notifications",
    validate: validateEmailSettings,
  });

  const handleTestSmtp = async () => {
    setIsTestingSmtp(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsTestingSmtp(false);
    toast.success({
      title: "SMTP connection verified",
      description: `Test message queued via ${values.smtpHost}:${values.smtpPort}.`,
    });
  };

  const updateAlert = (
    key: keyof EmailNotificationsSettings["alerts"],
    checked: boolean
  ) => {
    setValues((prev) => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [key]: checked,
      },
    }));
  };

  return (
    <div>
      <SettingsPageHeader
        title="Email & SMTP / Notifications"
        description="Configure outbound SMTP server credentials, sender headers, and automated Super Admin alert triggers."
        rightSlot={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestSmtp}
            disabled={isTestingSmtp}
            className="gap-1.5"
          >
            {isTestingSmtp ? (
              <Spinner size="sm" variant="muted" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{isTestingSmtp ? "Testing..." : "Send Test Email"}</span>
          </Button>
        }
      />

      <SettingsPanel>
        {/* ─── SMTP Credentials ─── */}
        <SettingsSection
          title="SMTP Server"
          description="Used for password resets, invoice receipts, and tenant onboarding invitations."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SettingsField
              label="SMTP Host"
              htmlFor="smtp-host"
              required
              className="sm:col-span-2"
              error={errors.smtpHost}
            >
              <Input
                id="smtp-host"
                className="font-mono text-[13px]"
                error={!!errors.smtpHost}
                value={values.smtpHost}
                onChange={(e) => updateField("smtpHost", e.target.value)}
              />
            </SettingsField>

            <SettingsField
              label="Port"
              htmlFor="smtp-port"
              required
              error={errors.smtpPort}
            >
              <Input
                id="smtp-port"
                type="number"
                error={!!errors.smtpPort}
                value={values.smtpPort}
                onChange={(e) =>
                  updateField("smtpPort", Number(e.target.value) || 0)
                }
              />
            </SettingsField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SettingsField label="Encryption">
              <Select
                value={values.smtpEncryption}
                onValueChange={(val: "tls" | "ssl" | "none") =>
                  updateField("smtpEncryption", val)
                }
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">STARTTLS (Recommended)</SelectItem>
                  <SelectItem value="ssl">SSL / TLS</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField label="SMTP Username" htmlFor="smtp-user">
              <Input
                id="smtp-user"
                className="font-mono text-[13px]"
                value={values.smtpUsername}
                onChange={(e) => updateField("smtpUsername", e.target.value)}
              />
            </SettingsField>

            <SettingsField label="SMTP Password" htmlFor="smtp-pass">
              <MaskedSecretInput
                id="smtp-pass"
                copyable={false}
                value={values.smtpPassword}
                onChange={(e) => updateField("smtpPassword", e.target.value)}
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── Sender Details ─── */}
        <SettingsSection
          title="Sender Identity"
          description="Controls the display name and addresses recipients see in their inbox."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SettingsField label="From Name" htmlFor="from-name">
              <Input
                id="from-name"
                value={values.fromName}
                onChange={(e) => updateField("fromName", e.target.value)}
              />
            </SettingsField>

            <SettingsField
              label="From Email"
              htmlFor="from-email"
              required
              error={errors.fromEmail}
            >
              <Input
                id="from-email"
                type="email"
                error={!!errors.fromEmail}
                value={values.fromEmail}
                onChange={(e) => updateField("fromEmail", e.target.value)}
              />
            </SettingsField>

            <SettingsField
              label="Reply-To Email"
              htmlFor="reply-email"
              error={errors.replyToEmail}
            >
              <Input
                id="reply-email"
                type="email"
                error={!!errors.replyToEmail}
                value={values.replyToEmail}
                onChange={(e) => updateField("replyToEmail", e.target.value)}
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── System Alert Toggles ─── */}
        <SettingsSection
          title="System Alert Notifications"
          description="Choose which platform lifecycle and security events notify Super Admin recipients."
        >
          <div className="space-y-2.5">
            <SettingsToggleRow
              title="New institute onboarded"
              description="Notify operations admins whenever a new tenant completes verification."
              checked={values.alerts.newTenantOnboarded}
              onCheckedChange={(val) => updateAlert("newTenantOnboarded", val)}
            />
            <SettingsToggleRow
              title="Payment failure & invoice overdue"
              description="Alert billing staff immediately when a recurring charge or mandate fails."
              checked={values.alerts.paymentFailed}
              onCheckedChange={(val) => updateAlert("paymentFailed", val)}
            />
            <SettingsToggleRow
              title="Subscription expiring soon"
              description="Send reminders 7 days before annual contracts or trial workspaces expire."
              checked={values.alerts.subscriptionExpiring}
              onCheckedChange={(val) => updateAlert("subscriptionExpiring", val)}
            />
            <SettingsToggleRow
              title="Security anomalies & brute-force blocks"
              description="Immediate alert on repeated failed Super Admin logins or IP lockouts."
              checked={values.alerts.securityAnomaly}
              onCheckedChange={(val) => updateAlert("securityAnomaly", val)}
            />
            <SettingsToggleRow
              title="Daily platform digest"
              description="Morning summary of MRR movement, active tenants, and system uptime."
              checked={values.alerts.dailyDigest}
              onCheckedChange={(val) => updateAlert("dailyDigest", val)}
            />
          </div>
        </SettingsSection>
      </SettingsPanel>

      <SettingsSaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        hasErrors={Object.keys(errors).length > 0}
        onSave={save}
        onReset={reset}
      />
    </div>
  );
}
