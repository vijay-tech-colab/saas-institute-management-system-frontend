"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAYMENT_SETTINGS } from "../../data/default-settings";
import { PaymentGatewaysSettings } from "../../types";
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

function validatePayments(
  values: PaymentGatewaysSettings
): ValidationErrors<PaymentGatewaysSettings> {
  const errs: ValidationErrors<PaymentGatewaysSettings> = {};
  if (values.razorpayEnabled && !values.razorpayKeyId.trim()) {
    errs.razorpayKeyId = "Razorpay Key ID is required when Razorpay is enabled.";
  }
  if (values.stripeEnabled && !values.stripePublishableKey.trim()) {
    errs.stripePublishableKey = "Stripe Publishable Key is required when enabled.";
  }
  if (
    values.taxEnabled &&
    (values.gstRatePercent < 0 || values.gstRatePercent > 100)
  ) {
    errs.gstRatePercent = "Tax rate must be between 0% and 100%.";
  }
  if (values.taxEnabled && !values.legalBusinessName.trim()) {
    errs.legalBusinessName = "Legal entity name is required for tax invoices.";
  }
  return errs;
}

export function PaymentGatewaysSection() {
  const {
    values,
    errors,
    updateField,
    isDirty,
    isSaving,
    reset,
    save,
  } = useSettingsForm<PaymentGatewaysSettings>({
    initialValues: DEFAULT_PAYMENT_SETTINGS,
    sectionLabel: "Payment Gateways & Tax",
    validate: validatePayments,
  });

  return (
    <div>
      <SettingsPageHeader
        title="Payment Gateways & Tax"
        description="Manage gateway credentials, webhook signing secrets, and automated GST/tax calculation rules for tenant billing."
      />

      <SettingsPanel>
        {/* ─── Razorpay ─── */}
        <SettingsSection
          title="Razorpay Gateway"
          description="Primary domestic gateway for UPI, NetBanking, and recurring INR mandates."
        >
          <SettingsToggleRow
            title="Enable Razorpay Checkout"
            description="Route INR subscription payments and auto-renewals through Razorpay."
            checked={values.razorpayEnabled}
            onCheckedChange={(val) => updateField("razorpayEnabled", val)}
            badge={
              <StatusBadge
                status={
                  values.razorpayEnabled
                    ? values.razorpayMode === "live"
                      ? "active"
                      : "trial"
                    : "inactive"
                }
                label={
                  values.razorpayEnabled
                    ? values.razorpayMode === "live"
                      ? "Live"
                      : "Test Mode"
                    : "Disabled"
                }
              />
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Environment Mode">
              <Select
                value={values.razorpayMode}
                disabled={!values.razorpayEnabled}
                onValueChange={(val: "test" | "live") =>
                  updateField("razorpayMode", val)
                }
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test / Sandbox</SelectItem>
                  <SelectItem value="live">Live Production</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Key ID"
              htmlFor="rzp-key-id"
              error={errors.razorpayKeyId}
            >
              <Input
                id="rzp-key-id"
                className="font-mono text-[13px]"
                disabled={!values.razorpayEnabled}
                error={!!errors.razorpayKeyId}
                value={values.razorpayKeyId}
                onChange={(e) => updateField("razorpayKeyId", e.target.value)}
              />
            </SettingsField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Key Secret" htmlFor="rzp-secret">
              <MaskedSecretInput
                id="rzp-secret"
                disabled={!values.razorpayEnabled}
                value={values.razorpayKeySecret}
                copyLabel="Razorpay Key Secret"
                onChange={(e) => updateField("razorpayKeySecret", e.target.value)}
              />
            </SettingsField>

            <SettingsField
              label="Webhook Signing Secret"
              htmlFor="rzp-webhook"
              hint="Endpoint: /api/webhooks/razorpay"
            >
              <MaskedSecretInput
                id="rzp-webhook"
                disabled={!values.razorpayEnabled}
                value={values.razorpayWebhookSecret}
                copyLabel="Razorpay Webhook Secret"
                onChange={(e) =>
                  updateField("razorpayWebhookSecret", e.target.value)
                }
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── Stripe ─── */}
        <SettingsSection
          title="Stripe Gateway"
          description="International card payments and USD multi-currency SaaS billing."
        >
          <SettingsToggleRow
            title="Enable Stripe Billing"
            description="Accept international cards and manage USD subscriptions via Stripe."
            checked={values.stripeEnabled}
            onCheckedChange={(val) => updateField("stripeEnabled", val)}
            badge={
              <StatusBadge
                status={
                  values.stripeEnabled
                    ? values.stripeMode === "live"
                      ? "active"
                      : "trial"
                    : "inactive"
                }
                label={
                  values.stripeEnabled
                    ? values.stripeMode === "live"
                      ? "Live"
                      : "Test Mode"
                    : "Disabled"
                }
              />
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Environment Mode">
              <Select
                value={values.stripeMode}
                disabled={!values.stripeEnabled}
                onValueChange={(val: "test" | "live") =>
                  updateField("stripeMode", val)
                }
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test / Sandbox</SelectItem>
                  <SelectItem value="live">Live Production</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Publishable Key"
              htmlFor="stripe-pk"
              error={errors.stripePublishableKey}
            >
              <Input
                id="stripe-pk"
                className="font-mono text-[13px]"
                disabled={!values.stripeEnabled}
                error={!!errors.stripePublishableKey}
                value={values.stripePublishableKey}
                onChange={(e) =>
                  updateField("stripePublishableKey", e.target.value)
                }
              />
            </SettingsField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Secret Key" htmlFor="stripe-sk">
              <MaskedSecretInput
                id="stripe-sk"
                disabled={!values.stripeEnabled}
                value={values.stripeSecretKey}
                copyLabel="Stripe Secret Key"
                onChange={(e) => updateField("stripeSecretKey", e.target.value)}
              />
            </SettingsField>

            <SettingsField
              label="Webhook Signing Secret"
              htmlFor="stripe-wh"
              hint="Endpoint: /api/webhooks/stripe"
            >
              <MaskedSecretInput
                id="stripe-wh"
                disabled={!values.stripeEnabled}
                value={values.stripeWebhookSecret}
                copyLabel="Stripe Webhook Secret"
                onChange={(e) =>
                  updateField("stripeWebhookSecret", e.target.value)
                }
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── GST / Tax Calculation ─── */}
        <SettingsSection
          title="GST & Tax Rules"
          description="Configure tax calculation behavior and legal entity details printed on generated PDF invoices."
        >
          <SettingsToggleRow
            title="Enable Automated Tax / GST"
            description="Automatically apply GST breakdown (CGST/SGST or IGST) on all tenant invoices."
            checked={values.taxEnabled}
            onCheckedChange={(val) => updateField("taxEnabled", val)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField label="Tax Calculation Mode">
              <Select
                value={values.taxMode}
                disabled={!values.taxEnabled}
                onValueChange={(val: "exclusive" | "inclusive") =>
                  updateField("taxMode", val)
                }
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Exclusive (Added at checkout)</SelectItem>
                  <SelectItem value="inclusive">Inclusive (Included in plan price)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Default GST Rate (%)"
              htmlFor="gst-rate"
              error={errors.gstRatePercent}
            >
              <Input
                id="gst-rate"
                type="number"
                min={0}
                max={100}
                disabled={!values.taxEnabled}
                error={!!errors.gstRatePercent}
                value={values.gstRatePercent}
                onChange={(e) =>
                  updateField("gstRatePercent", Number(e.target.value) || 0)
                }
              />
            </SettingsField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SettingsField
              label="Legal Business Name"
              htmlFor="legal-name"
              className="sm:col-span-2"
              error={errors.legalBusinessName}
            >
              <Input
                id="legal-name"
                disabled={!values.taxEnabled}
                error={!!errors.legalBusinessName}
                value={values.legalBusinessName}
                onChange={(e) => updateField("legalBusinessName", e.target.value)}
              />
            </SettingsField>

            <SettingsField label="Invoice Prefix" htmlFor="inv-prefix">
              <Input
                id="inv-prefix"
                className="font-mono text-[13px]"
                value={values.invoicePrefix}
                onChange={(e) => updateField("invoicePrefix", e.target.value)}
              />
            </SettingsField>
          </div>

          <SettingsField
            label="GSTIN / Tax Registration Number"
            htmlFor="gstin"
            hint="Printed on every B2B tax invoice."
          >
            <Input
              id="gstin"
              className="font-mono text-[13px] max-w-sm uppercase"
              disabled={!values.taxEnabled}
              value={values.gstin}
              onChange={(e) => updateField("gstin", e.target.value.toUpperCase())}
            />
          </SettingsField>
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
