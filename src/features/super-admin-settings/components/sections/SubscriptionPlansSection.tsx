"use client";

import React, { useState } from "react";
import { Pencil, Plus, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { useConfirm } from "@/hooks/use-confirm";
import { DEFAULT_PLANS_SETTINGS } from "../../data/default-settings";
import { SaasPlanTier, SubscriptionPlansSettings } from "../../types";
import { useSettingsForm, ValidationErrors } from "../../hooks/useSettingsForm";
import {
  SettingsField,
  SettingsPageHeader,
  SettingsPanel,
  SettingsSaveBar,
  SettingsSection,
  SettingsSwitch,
  SettingsToggleRow,
} from "../shared/SettingsPrimitives";

function validatePlans(
  values: SubscriptionPlansSettings
): ValidationErrors<SubscriptionPlansSettings> {
  const errs: ValidationErrors<SubscriptionPlansSettings> = {};
  if (values.defaultTrialDays < 0 || values.defaultTrialDays > 90) {
    errs.defaultTrialDays = "Trial period must be between 0 and 90 days.";
  }
  if (values.gracePeriodDays < 0 || values.gracePeriodDays > 30) {
    errs.gracePeriodDays = "Grace period must be between 0 and 30 days.";
  }
  return errs;
}

export function SubscriptionPlansSection() {
  const confirm = useConfirm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTier, setDraftTier] = useState<SaasPlanTier | null>(null);

  const {
    values,
    errors,
    updateField,
    setValues,
    isDirty,
    isSaving,
    reset,
    save,
  } = useSettingsForm<SubscriptionPlansSettings>({
    initialValues: DEFAULT_PLANS_SETTINGS,
    sectionLabel: "Subscription & Pricing Plans",
    validate: validatePlans,
  });

  const startEditing = (tier: SaasPlanTier) => {
    setEditingId(tier.id);
    setDraftTier({ ...tier });
  };

  const commitDraftTier = () => {
    if (!draftTier || !draftTier.name.trim()) return;
    setValues((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) => (t.id === draftTier.id ? draftTier : t)),
    }));
    setEditingId(null);
    setDraftTier(null);
  };

  const addNewTier = () => {
    const newTier: SaasPlanTier = {
      id: `plan-${Date.now()}`,
      name: "Custom Tier",
      code: `TIER_${values.tiers.length + 1}`,
      monthlyPrice: 9999,
      yearlyPrice: 99990,
      maxStudents: 5000,
      maxBranches: 10,
      storageGB: 200,
      isActive: true,
      isPopular: false,
    };
    setValues((prev) => ({
      ...prev,
      tiers: [...prev.tiers, newTier],
    }));
    startEditing(newTier);
  };

  const toggleTierActive = (id: string, checked: boolean) => {
    setValues((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t) => (t.id === id ? { ...t, isActive: checked } : t)),
    }));
  };

  const deleteTier = async (tier: SaasPlanTier) => {
    const ok = await confirm({
      title: `Remove ${tier.name} tier?`,
      description:
        "Existing institutes on this tier will remain grandfathered until they switch plans.",
      type: "danger",
      confirmText: "Remove Tier",
    });
    if (!ok) return;
    setValues((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((t) => t.id !== tier.id),
    }));
    if (editingId === tier.id) {
      setEditingId(null);
      setDraftTier(null);
    }
  };

  return (
    <div>
      <SettingsPageHeader
        title="Subscription & Pricing Plans"
        description="Configure global trial policies, billing grace rules, and SaaS subscription tiers offered to institutes."
        rightSlot={
          <Button type="button" variant="outline" size="sm" onClick={addNewTier} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Add Plan Tier
          </Button>
        }
      />

      <SettingsPanel>
        {/* ─── Trial & Lifecycle Rules ─── */}
        <SettingsSection
          title="Trial & Billing Lifecycle"
          description="Control trial length for newly registered institutes and overdue grace periods."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SettingsField
              label="Default Free Trial (Days)"
              htmlFor="trial-days"
              error={errors.defaultTrialDays}
              hint="Set to 0 to disable automatic trials."
            >
              <Input
                id="trial-days"
                type="number"
                min={0}
                max={90}
                error={!!errors.defaultTrialDays}
                value={values.defaultTrialDays}
                onChange={(e) =>
                  updateField("defaultTrialDays", Number(e.target.value) || 0)
                }
              />
            </SettingsField>

            <SettingsField
              label="Payment Grace Period (Days)"
              htmlFor="grace-days"
              error={errors.gracePeriodDays}
              hint="Days before overdue tenants are restricted."
            >
              <Input
                id="grace-days"
                type="number"
                min={0}
                max={30}
                error={!!errors.gracePeriodDays}
                value={values.gracePeriodDays}
                onChange={(e) =>
                  updateField("gracePeriodDays", Number(e.target.value) || 0)
                }
              />
            </SettingsField>
          </div>

          <div className="space-y-2.5">
            <SettingsToggleRow
              title="Auto-downgrade on trial expiry"
              description="Automatically pause premium modules if a tenant does not add billing details after trial ends."
              checked={values.autoDowngradeOnExpiry}
              onCheckedChange={(val) => updateField("autoDowngradeOnExpiry", val)}
            />
            <SettingsToggleRow
              title="Allow mid-cycle plan proration"
              description="Calculate prorated credits or charges immediately when an institute upgrades or downgrades."
              checked={values.allowProration}
              onCheckedChange={(val) => updateField("allowProration", val)}
            />
          </div>
        </SettingsSection>

        {/* ─── SaaS Tiers Table ─── */}
        <SettingsSection
          title="Active SaaS Tiers"
          description="Edit monthly/yearly pricing and resource quotas directly inline."
        >
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden divide-y divide-slate-100">
            {values.tiers.map((tier) => {
              const isEditing = editingId === tier.id && draftTier !== null;

              if (isEditing && draftTier) {
                return (
                  <div key={tier.id} className="p-3.5 bg-slate-50/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <SettingsField label="Plan Name">
                        <Input
                          value={draftTier.name}
                          onChange={(e) =>
                            setDraftTier({ ...draftTier, name: e.target.value })
                          }
                        />
                      </SettingsField>
                      <SettingsField label="Monthly Price (₹)">
                        <Input
                          type="number"
                          min={0}
                          value={draftTier.monthlyPrice}
                          onChange={(e) =>
                            setDraftTier({
                              ...draftTier,
                              monthlyPrice: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </SettingsField>
                      <SettingsField label="Yearly Price (₹)">
                        <Input
                          type="number"
                          min={0}
                          value={draftTier.yearlyPrice}
                          onChange={(e) =>
                            setDraftTier({
                              ...draftTier,
                              yearlyPrice: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </SettingsField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <SettingsField label="Max Students">
                        <Input
                          type="number"
                          min={1}
                          value={draftTier.maxStudents}
                          onChange={(e) =>
                            setDraftTier({
                              ...draftTier,
                              maxStudents: Number(e.target.value) || 1,
                            })
                          }
                        />
                      </SettingsField>
                      <SettingsField label="Max Branches">
                        <Input
                          type="number"
                          min={1}
                          value={draftTier.maxBranches}
                          onChange={(e) =>
                            setDraftTier({
                              ...draftTier,
                              maxBranches: Number(e.target.value) || 1,
                            })
                          }
                        />
                      </SettingsField>
                      <SettingsField label="Storage Quota (GB)">
                        <Input
                          type="number"
                          min={1}
                          value={draftTier.storageGB}
                          onChange={(e) =>
                            setDraftTier({
                              ...draftTier,
                              storageGB: Number(e.target.value) || 1,
                            })
                          }
                        />
                      </SettingsField>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setDraftTier(null);
                        }}
                        className="gap-1 h-8"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={commitDraftTier}
                        className="gap-1 h-8"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Apply Row
                      </Button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={tier.id}
                  className="px-3.5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-semibold text-slate-900">
                        {tier.name}
                      </span>
                      <Badge variant="secondary" className="font-mono text-[10px] px-2 py-0">
                        {tier.code}
                      </Badge>
                      {tier.isPopular && (
                        <Badge variant="primary_light" className="text-[10px] px-2 py-0">
                          Recommended
                        </Badge>
                      )}
                      <StatusBadge status={tier.isActive ? "active" : "inactive"} />
                    </div>
                    <p className="text-xs text-slate-500">
                      ₹{tier.monthlyPrice.toLocaleString("en-IN")}/mo &bull; ₹
                      {tier.yearlyPrice.toLocaleString("en-IN")}/yr &bull; Up to{" "}
                      {tier.maxStudents.toLocaleString("en-IN")} students,{" "}
                      {tier.maxBranches} {tier.maxBranches === 1 ? "branch" : "branches"},{" "}
                      {tier.storageGB} GB storage
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <SettingsSwitch
                      checked={tier.isActive}
                      onCheckedChange={(checked) => toggleTierActive(tier.id, checked)}
                      ariaLabel={`Toggle ${tier.name} tier`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(tier)}
                      aria-label={`Edit ${tier.name}`}
                      className="h-8 w-8"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTier(tier)}
                      aria-label={`Remove ${tier.name}`}
                      className="h-8 w-8 text-slate-400 hover:text-status-error hover:bg-status-error-bg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
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
