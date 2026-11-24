"use client";

import React, { useState } from "react";
import { Check, Copy, Eye, EyeOff, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/loaders";
import { useToast } from "@/hooks/use-toast";

/* ─── Page Header (Matches App PageHeader Rhythm) ────────────────────────── */

interface SettingsPageHeaderProps {
  title: string;
  description: string;
  rightSlot?: React.ReactNode;
}

export function SettingsPageHeader({
  title,
  description,
  rightSlot,
}: SettingsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="space-y-0.5 min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}

/* ─── Unified Surface Panel ───────────────────────────────────────────────── */

export function SettingsPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Structured Two-Column Section Row ───────────────────────────────────── */

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-4 sm:p-5",
        className
      )}
    >
      <div className="lg:col-span-4 space-y-1">
        <h2 className="text-[13.5px] font-semibold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="lg:col-span-8 space-y-3.5">{children}</div>
    </section>
  );
}

/* ─── Form Field Wrapper with Inline Validation ───────────────────────────── */

interface SettingsFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: SettingsFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label
        htmlFor={htmlFor}
        required={required}
        className="text-xs font-medium text-slate-700"
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-[11px] text-status-error font-medium">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

/* ─── Tactile Switch / Toggle ─────────────────────────────────────────────── */

interface SettingsToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
}

export function SettingsSwitch({
  checked,
  onCheckedChange,
  disabled,
  id,
  ariaLabel,
}: SettingsToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-slate-200 hover:bg-slate-300/90"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow-xs transition-transform duration-200",
          checked ? "translate-x-[17px]" : "translate-x-[2px]"
        )}
      />
    </button>
  );
}

interface SettingsToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  badge?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function SettingsToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
  badge,
  disabled,
  className,
}: SettingsToggleRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/90 px-3.5 py-2.5 transition-colors",
        className
      )}
    >
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-slate-900">{title}</span>
          {badge}
        </div>
        <p className="text-xs text-slate-500 leading-snug">{description}</p>
      </div>
      <SettingsSwitch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        ariaLabel={title}
      />
    </div>
  );
}

/* ─── Masked Secret Input with Eye Reveal & Copy ──────────────────────────── */

interface MaskedSecretInputProps extends Omit<InputProps, "type"> {
  copyable?: boolean;
  copyLabel?: string;
  monospace?: boolean;
}

export function MaskedSecretInput({
  copyable = true,
  copyLabel = "Value",
  monospace = true,
  className,
  value,
  ...props
}: MaskedSecretInputProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = async () => {
    const text = String(value ?? "");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success({
        title: "Copied to clipboard",
        description: `${copyLabel} copied safely.`,
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error({
        title: "Copy failed",
        description: "Clipboard access is unavailable in this browser context.",
      });
    }
  };

  return (
    <div className="relative flex items-center">
      <Input
        type={revealed ? "text" : "password"}
        value={value}
        className={cn(
          monospace && "font-mono text-[13px]",
          copyable ? "pr-18" : "pr-9",
          className
        )}
        {...props}
      />
      <div className="absolute right-1.5 flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => setRevealed((prev) => !prev)}
          aria-label={revealed ? "Hide secret" : "Reveal secret"}
          title={revealed ? "Hide" : "Reveal"}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${copyLabel}`}
            title="Copy"
            className="p-1.5 rounded-md text-slate-400 hover:text-primary hover:bg-primary-light transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-status-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Sticky Bottom Save Bar (Activates Only When Unsaved Changes Exist) ─── */

interface SettingsSaveBarProps {
  isDirty: boolean;
  isSaving?: boolean;
  hasErrors?: boolean;
  onSave: () => void;
  onReset: () => void;
  saveLabel?: string;
}

export function SettingsSaveBar({
  isDirty,
  isSaving = false,
  hasErrors = false,
  onSave,
  onReset,
  saveLabel = "Save Changes",
}: SettingsSaveBarProps) {
  return (
    <div className="sticky bottom-3 z-20 pt-3">
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border px-4 py-2.5 transition-all duration-200",
          isDirty
            ? "bg-white/95 backdrop-blur-md border-primary-border shadow-md"
            : "bg-white/90 backdrop-blur-sm border-slate-200/80 shadow-xs"
        )}
      >
        <div className="flex items-center gap-2 text-xs">
          <span
            className={cn(
              "w-2 h-2 rounded-full shrink-0 transition-colors",
              hasErrors
                ? "bg-status-error"
                : isDirty
                ? "bg-status-warning"
                : "bg-slate-300"
            )}
          />
          <span className={cn("font-medium", isDirty ? "text-slate-800" : "text-slate-500")}>
            {hasErrors
              ? "Resolve validation errors before saving."
              : isDirty
              ? "Unsaved changes ready to apply."
              : "All changes saved."}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={!isDirty || isSaving}
            className="gap-1.5 h-8"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Discard
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className="min-w-[112px] h-8"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <Spinner size="sm" variant="white" />
                <span>Saving...</span>
              </span>
            ) : (
              saveLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
