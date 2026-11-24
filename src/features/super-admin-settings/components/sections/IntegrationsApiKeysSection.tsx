"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_INTEGRATIONS_SETTINGS } from "../../data/default-settings";
import { IntegrationsApiKeysSettings } from "../../types";
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

function validateIntegrations(
  values: IntegrationsApiKeysSettings
): ValidationErrors<IntegrationsApiKeysSettings> {
  const errs: ValidationErrors<IntegrationsApiKeysSettings> = {};
  if (values.firebaseEnabled && !values.firebaseProjectId.trim()) {
    errs.firebaseProjectId = "Firebase Project ID is required when enabled.";
  }
  if (
    values.webhooksEnabled &&
    values.webhookEndpointUrl.trim() &&
    !/^https:\/\/.+/.test(values.webhookEndpointUrl.trim())
  ) {
    errs.webhookEndpointUrl = "Webhook URL must use HTTPS.";
  }
  return errs;
}

export function IntegrationsApiKeysSection() {
  const confirm = useConfirm();
  const toast = useToast();

  const {
    values,
    errors,
    updateField,
    isDirty,
    isSaving,
    reset,
    save,
  } = useSettingsForm<IntegrationsApiKeysSettings>({
    initialValues: DEFAULT_INTEGRATIONS_SETTINGS,
    sectionLabel: "Integrations & API Keys",
    validate: validateIntegrations,
  });

  const handleRegenerateSecret = async () => {
    const ok = await confirm({
      title: "Regenerate platform secret key?",
      description:
        "Existing server integrations using the current secret key will stop authenticating until updated.",
      type: "warning",
      confirmText: "Regenerate Key",
    });
    if (!ok) return;

    const randomHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    updateField("platformSecretKey", `cos_sk_live_${randomHex}`);
    toast.warning({
      title: "New secret key generated",
      description: "Save changes to activate the rotated platform key.",
    });
  };

  return (
    <div>
      <SettingsPageHeader
        title="Integrations & API Keys"
        description="Manage platform API credentials and third-party service keys for push messaging, mobile ads, analytics, and webhooks."
      />

      <SettingsPanel>
        {/* ─── Platform API Credentials ─── */}
        <SettingsSection
          title="Platform API Credentials"
          description="Used by external backend services and mobile apps to authenticate against the CampusOS API."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Publishable API Key" htmlFor="pub-key">
              <MaskedSecretInput
                id="pub-key"
                value={values.platformPublicKey}
                copyLabel="Publishable API Key"
                readOnly
              />
            </SettingsField>

            <SettingsField label="Secret API Key" htmlFor="sec-key">
              <MaskedSecretInput
                id="sec-key"
                value={values.platformSecretKey}
                copyLabel="Secret API Key"
                readOnly
              />
            </SettingsField>
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRegenerateSecret}
              className="gap-1.5 h-8"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Rotate Secret Key
            </Button>
          </div>
        </SettingsSection>

        {/* ─── Firebase ─── */}
        <SettingsSection
          title="Firebase (FCM & Auth)"
          description="Push notifications and real-time mobile sync across student and parent apps."
        >
          <SettingsToggleRow
            title="Enable Firebase Cloud Messaging"
            description="Deliver attendance alerts, fee reminders, and announcements to mobile clients."
            checked={values.firebaseEnabled}
            onCheckedChange={(val) => updateField("firebaseEnabled", val)}
            badge={
              <StatusBadge status={values.firebaseEnabled ? "active" : "inactive"} />
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Firebase Project ID"
              htmlFor="fb-project"
              error={errors.firebaseProjectId}
            >
              <Input
                id="fb-project"
                className="font-mono text-[13px]"
                disabled={!values.firebaseEnabled}
                error={!!errors.firebaseProjectId}
                value={values.firebaseProjectId}
                onChange={(e) => updateField("firebaseProjectId", e.target.value)}
              />
            </SettingsField>

            <SettingsField label="Server / Web API Key" htmlFor="fb-key">
              <MaskedSecretInput
                id="fb-key"
                disabled={!values.firebaseEnabled}
                value={values.firebaseServerKey}
                copyLabel="Firebase Key"
                onChange={(e) => updateField("firebaseServerKey", e.target.value)}
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── AdMob ─── */}
        <SettingsSection
          title="Google AdMob"
          description="Monetization unit IDs applied exclusively to free-tier institute mobile builds."
        >
          <SettingsToggleRow
            title="Enable AdMob on Free Tier"
            description="Paid and trial institutes automatically run ad-free."
            checked={values.admobEnabled}
            onCheckedChange={(val) => updateField("admobEnabled", val)}
            badge={
              <StatusBadge status={values.admobEnabled ? "active" : "inactive"} />
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SettingsField label="AdMob App ID" htmlFor="admob-app">
              <Input
                id="admob-app"
                className="font-mono text-[13px]"
                disabled={!values.admobEnabled}
                value={values.admobAppId}
                onChange={(e) => updateField("admobAppId", e.target.value)}
              />
            </SettingsField>
            <SettingsField label="Banner Unit ID" htmlFor="admob-banner">
              <Input
                id="admob-banner"
                className="font-mono text-[13px]"
                disabled={!values.admobEnabled}
                value={values.admobBannerId}
                onChange={(e) => updateField("admobBannerId", e.target.value)}
              />
            </SettingsField>
            <SettingsField label="Interstitial Unit ID" htmlFor="admob-inter">
              <Input
                id="admob-inter"
                className="font-mono text-[13px]"
                disabled={!values.admobEnabled}
                value={values.admobInterstitialId}
                onChange={(e) => updateField("admobInterstitialId", e.target.value)}
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── Telemetry & Webhooks ─── */}
        <SettingsSection
          title="Product Telemetry & Webhooks"
          description="Configure external analytics collectors and outbound event signing."
        >
          <SettingsToggleRow
            title="Enable External Telemetry"
            description="Forward anonymized usage metrics to configured analytics providers."
            checked={values.analyticsEnabled}
            onCheckedChange={(val) => updateField("analyticsEnabled", val)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="GA4 Measurement ID" htmlFor="ga-id">
              <Input
                id="ga-id"
                className="font-mono text-[13px]"
                disabled={!values.analyticsEnabled}
                value={values.gaMeasurementId}
                onChange={(e) => updateField("gaMeasurementId", e.target.value)}
              />
            </SettingsField>
            <SettingsField label="PostHog Project Key" htmlFor="ph-key">
              <MaskedSecretInput
                id="ph-key"
                disabled={!values.analyticsEnabled}
                value={values.posthogApiKey}
                copyLabel="PostHog Key"
                onChange={(e) => updateField("posthogApiKey", e.target.value)}
              />
            </SettingsField>
          </div>

          <SettingsToggleRow
            title="Enable Outbound Event Webhooks"
            description="Dispatch signed JSON payloads for tenant creation, billing, and suspension events."
            checked={values.webhooksEnabled}
            onCheckedChange={(val) => updateField("webhooksEnabled", val)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Webhook Endpoint URL"
              htmlFor="wh-url"
              error={errors.webhookEndpointUrl}
            >
              <Input
                id="wh-url"
                type="url"
                className="font-mono text-[13px]"
                disabled={!values.webhooksEnabled}
                error={!!errors.webhookEndpointUrl}
                value={values.webhookEndpointUrl}
                onChange={(e) => updateField("webhookEndpointUrl", e.target.value)}
              />
            </SettingsField>

            <SettingsField label="Signing Secret" htmlFor="wh-secret">
              <MaskedSecretInput
                id="wh-secret"
                disabled={!values.webhooksEnabled}
                value={values.webhookSigningSecret}
                copyLabel="Webhook Signing Secret"
                onChange={(e) => updateField("webhookSigningSecret", e.target.value)}
              />
            </SettingsField>
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
