"use client";

import React, { useRef } from "react";
import { UploadCloud, X, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_GENERAL_SETTINGS } from "../../data/default-settings";
import { GeneralBrandingSettings } from "../../types";
import { useSettingsForm, ValidationErrors } from "../../hooks/useSettingsForm";
import {
  SettingsField,
  SettingsPageHeader,
  SettingsPanel,
  SettingsSaveBar,
  SettingsSection,
} from "../shared/SettingsPrimitives";

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST, UTC+05:30)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "America/New_York (EST, UTC-05:00)" },
  { value: "Europe/London", label: "Europe/London (GMT, UTC+00:00)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST, UTC+04:00)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (SGT, UTC+08:00)" },
];

function validateGeneralSettings(
  values: GeneralBrandingSettings
): ValidationErrors<GeneralBrandingSettings> {
  const errs: ValidationErrors<GeneralBrandingSettings> = {};
  if (!values.appName.trim()) {
    errs.appName = "Application name is required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.supportEmail.trim())) {
    errs.supportEmail = "Enter a valid support email address.";
  }
  if (values.supportUrl.trim() && !/^https?:\/\/.+/.test(values.supportUrl.trim())) {
    errs.supportUrl = "URL must start with http:// or https://.";
  }
  return errs;
}

export function GeneralBrandingSection() {
  const toast = useToast();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const {
    values,
    errors,
    updateField,
    setValues,
    isDirty,
    isSaving,
    reset,
    save,
  } = useSettingsForm<GeneralBrandingSettings>({
    initialValues: DEFAULT_GENERAL_SETTINGS,
    sectionLabel: "General & Branding",
    validate: validateGeneralSettings,
  });

  const handleAssetUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    kind: "logo" | "favicon"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = kind === "logo" ? 2 * 1024 * 1024 : 512 * 1024;
    if (file.size > maxBytes) {
      toast.error({
        title: "File too large",
        description:
          kind === "logo"
            ? "Logo must be under 2 MB."
            : "Favicon must be under 512 KB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (kind === "logo") {
        setValues((prev) => ({
          ...prev,
          logoPreview: result,
          logoFileName: file.name,
        }));
      } else {
        setValues((prev) => ({
          ...prev,
          faviconPreview: result,
          faviconFileName: file.name,
        }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div>
      <SettingsPageHeader
        title="General & Branding"
        description="Configure your SaaS application identity, regional defaults, and public brand assets across tenant portals."
      />

      <SettingsPanel>
        {/* ─── Identity & Contact ─── */}
        <SettingsSection
          title="Application Identity"
          description="Displayed in browser titles, transactional emails, and institute onboarding screens."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Application Name"
              htmlFor="app-name"
              required
              error={errors.appName}
            >
              <Input
                id="app-name"
                value={values.appName}
                error={!!errors.appName}
                onChange={(e) => updateField("appName", e.target.value)}
                placeholder="CampusOS"
              />
            </SettingsField>

            <SettingsField
              label="Support Email"
              htmlFor="support-email"
              required
              error={errors.supportEmail}
            >
              <Input
                id="support-email"
                type="email"
                value={values.supportEmail}
                error={!!errors.supportEmail}
                onChange={(e) => updateField("supportEmail", e.target.value)}
                placeholder="support@campusos.io"
              />
            </SettingsField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Platform Tagline"
              htmlFor="tagline"
              hint="Shown on login and public status headers."
            >
              <Input
                id="tagline"
                value={values.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="Multi-tenant Institute Operating System"
              />
            </SettingsField>

            <SettingsField
              label="Status / Help Portal URL"
              htmlFor="support-url"
              error={errors.supportUrl}
            >
              <Input
                id="support-url"
                type="url"
                value={values.supportUrl}
                error={!!errors.supportUrl}
                onChange={(e) => updateField("supportUrl", e.target.value)}
                placeholder="https://status.campusos.io"
              />
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── Localization & Currency ─── */}
        <SettingsSection
          title="Regional & Billing Defaults"
          description="Default timezone for scheduled jobs and base currency for subscription pricing."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Default Timezone"
              hint="Used for billing cycles, invoices, and audit timestamps."
            >
              <Select
                value={values.timezone}
                onValueChange={(val) => updateField("timezone", val)}
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Primary Currency"
              hint="Applies to new SaaS plans and checkout totals."
            >
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-slate-100/80 border border-slate-200/80 h-9.5">
                {(["INR", "USD"] as const).map((curr) => {
                  const active = values.currency === curr;
                  return (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => updateField("currency", curr)}
                      className={`rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? "bg-primary-light text-primary border border-primary-border shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {curr === "INR" ? "INR (₹)" : "USD ($)"}
                    </button>
                  );
                })}
              </div>
            </SettingsField>
          </div>
        </SettingsSection>

        {/* ─── Brand Assets ─── */}
        <SettingsSection
          title="Brand Assets"
          description="Upload vector or high-resolution PNG logos. Changes apply to the admin console and email headers."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Logo Upload */}
            <div className="rounded-lg border border-slate-200/80 bg-slate-50/40 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-900">
                  Platform Logo
                </span>
                {values.logoPreview && (
                  <button
                    type="button"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        logoPreview: null,
                        logoFileName: null,
                      }))
                    }
                    className="text-xs text-slate-500 hover:text-status-error inline-flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                  {values.logoPreview ? (
                    <img
                      src={values.logoPreview}
                      alt="Platform logo preview"
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="hidden"
                    onChange={(e) => handleAssetUpload(e, "logo")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                    className="gap-1.5 h-8"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    {values.logoPreview ? "Replace Logo" : "Upload Logo"}
                  </Button>
                  <p className="text-[11px] text-slate-500 truncate">
                    {values.logoFileName ?? "SVG, PNG or WebP (max 2 MB)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="rounded-lg border border-slate-200/80 bg-slate-50/40 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-900">
                  Browser Favicon
                </span>
                {values.faviconPreview && (
                  <button
                    type="button"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        faviconPreview: null,
                        faviconFileName: null,
                      }))
                    }
                    className="text-xs text-slate-500 hover:text-status-error inline-flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                  {values.faviconPreview ? (
                    <img
                      src={values.faviconPreview}
                      alt="Favicon preview"
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      32×32
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <input
                    ref={faviconInputRef}
                    type="file"
                    accept="image/png,image/x-icon,image/svg+xml"
                    className="hidden"
                    onChange={(e) => handleAssetUpload(e, "favicon")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => faviconInputRef.current?.click()}
                    className="gap-1.5 h-8"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    {values.faviconPreview ? "Replace Icon" : "Upload Favicon"}
                  </Button>
                  <p className="text-[11px] text-slate-500 truncate">
                    {values.faviconFileName ?? "ICO, PNG or SVG (max 512 KB)"}
                  </p>
                </div>
              </div>
            </div>
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
