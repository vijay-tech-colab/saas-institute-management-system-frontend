"use client";

import React, { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_TEAM_SETTINGS,
  PERMISSION_DEFINITIONS,
  ROLE_LABELS,
} from "../../data/default-settings";
import {
  AdminPermissionKey,
  AdminRoleKey,
  AdminTeamMember,
  AdminTeamSettings,
} from "../../types";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import {
  SettingsField,
  SettingsPageHeader,
  SettingsPanel,
  SettingsSaveBar,
  SettingsSection,
} from "../shared/SettingsPrimitives";

export function AdminTeamRolesSection() {
  const confirm = useConfirm();
  const toast = useToast();

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AdminRoleKey>("OPERATIONS_ADMIN");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] =
    useState<AdminRoleKey>("OPERATIONS_ADMIN");

  const { values, setValues, isDirty, isSaving, reset, save } =
    useSettingsForm<AdminTeamSettings>({
      initialValues: DEFAULT_TEAM_SETTINGS,
      sectionLabel: "Admin Team & Roles",
    });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inviteEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteError("Enter a valid work email address.");
      return;
    }
    if (values.members.some((m) => m.email.toLowerCase() === email)) {
      setInviteError("This administrator is already in the team.");
      return;
    }

    const namePart = email.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = namePart
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const newMember: AdminTeamMember = {
      id: `adm-${Date.now()}`,
      name: formattedName || "New Admin",
      email,
      role: inviteRole,
      twoFactorEnabled: false,
      status: "pending",
      lastActive: "Invited just now",
    };

    setValues((prev) => ({
      ...prev,
      members: [newMember, ...prev.members],
    }));
    setInviteEmail("");
    setInviteError(null);

    toast.info({
      title: "Admin invitation staged",
      description: `Save changes to dispatch invite to ${email}.`,
    });
  };

  const handleRoleChange = (memberId: string, role: AdminRoleKey) => {
    setValues((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === memberId ? { ...m, role } : m
      ),
    }));
  };

  const handleRemoveMember = async (member: AdminTeamMember) => {
    if (member.role === "PLATFORM_OWNER") {
      toast.warning({
        title: "Action restricted",
        description: "Transfer platform ownership before removing the Platform Owner.",
      });
      return;
    }

    const ok = await confirm({
      title: `Revoke access for ${member.name}?`,
      description: `${member.email} will immediately lose access to the Super Admin Console.`,
      type: "danger",
      confirmText: "Revoke Access",
    });
    if (!ok) return;

    setValues((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== member.id),
    }));
  };

  const toggleRolePermission = (permKey: AdminPermissionKey) => {
    if (selectedRole === "PLATFORM_OWNER") return;
    setValues((prev) => {
      const current = prev.rolePermissions[selectedRole] || [];
      const exists = current.includes(permKey);
      const next = exists
        ? current.filter((k) => k !== permKey)
        : [...current, permKey];
      return {
        ...prev,
        rolePermissions: {
          ...prev.rolePermissions,
          [selectedRole]: next,
        },
      };
    });
  };

  const activeRolePermissions = values.rolePermissions[selectedRole] || [];

  return (
    <div>
      <SettingsPageHeader
        title="Admin Team & Roles"
        description="Manage internal super-admin staff, assign console roles, and configure granular module permissions."
      />

      <SettingsPanel>
        {/* ─── Invite New Admin ─── */}
        <SettingsSection
          title="Invite Staff Member"
          description="Send a console invitation to an internal team member. 2FA setup is prompted on first sign-in."
        >
          <form
            onSubmit={handleInvite}
            className="flex flex-col sm:flex-row items-start gap-3"
          >
            <SettingsField
              label="Work Email"
              htmlFor="invite-email"
              error={inviteError ?? undefined}
              className="flex-1 w-full"
            >
              <Input
                id="invite-email"
                type="email"
                error={!!inviteError}
                value={inviteEmail}
                onChange={(e) => {
                  setInviteEmail(e.target.value);
                  if (inviteError) setInviteError(null);
                }}
                placeholder="colleague@campusos.io"
              />
            </SettingsField>

            <SettingsField label="Console Role" className="w-full sm:w-48">
              <Select
                value={inviteRole}
                onValueChange={(val: AdminRoleKey) => setInviteRole(val)}
              >
                <SelectTrigger className="h-9.5 border-border bg-card focus:ring-primary/20 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(ROLE_LABELS) as AdminRoleKey[]).map((key) => (
                    <SelectItem key={key} value={key}>
                      {ROLE_LABELS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingsField>

            <div className="sm:pt-[20px] w-full sm:w-auto">
              <Button type="submit" variant="primary" className="w-full sm:w-auto gap-1.5">
                <UserPlus className="w-3.5 h-3.5" />
                Invite Admin
              </Button>
            </div>
          </form>
        </SettingsSection>

        {/* ─── Team Directory ─── */}
        <SettingsSection
          title="Internal Administrators"
          description="Active staff and pending invitations with access to the Super Admin Console."
        >
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden divide-y divide-slate-100">
            {values.members.map((member) => (
              <div
                key={member.id}
                className="px-3.5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-medium text-slate-900">
                      {member.name}
                    </span>
                    <StatusBadge status={member.status} />
                    <StatusBadge
                      status={member.twoFactorEnabled ? "healthy" : "warning"}
                      label={member.twoFactorEnabled ? "2FA On" : "2FA Pending"}
                      showDot={false}
                    />
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {member.email} &bull; {member.lastActive}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Select
                    value={member.role}
                    disabled={member.role === "PLATFORM_OWNER"}
                    onValueChange={(val: AdminRoleKey) =>
                      handleRoleChange(member.id, val)
                    }
                  >
                    <SelectTrigger className="h-8.5 w-44 text-xs border-border bg-card focus:ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(ROLE_LABELS) as AdminRoleKey[]).map((key) => (
                        <SelectItem key={key} value={key}>
                          {ROLE_LABELS[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={member.role === "PLATFORM_OWNER"}
                    onClick={() => handleRemoveMember(member)}
                    aria-label={`Revoke ${member.name}`}
                    className="h-8.5 w-8.5 text-slate-400 hover:text-status-error hover:bg-status-error-bg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* ─── Granular Role Permissions Matrix ─── */}
        <SettingsSection
          title="Role Permissions"
          description="Inspect or customize capability access per internal console role."
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-slate-100/80 border border-slate-200/80 w-fit">
              {(Object.keys(ROLE_LABELS) as AdminRoleKey[]).map((roleKey) => {
                const active = selectedRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => setSelectedRole(roleKey)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-primary-light text-primary border border-primary-border shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {ROLE_LABELS[roleKey]}
                  </button>
                );
              })}
            </div>

            <div className="rounded-lg border border-slate-200/80 bg-white divide-y divide-slate-100">
              {PERMISSION_DEFINITIONS.map((perm) => {
                const checked = activeRolePermissions.includes(perm.key);
                const isOwner = selectedRole === "PLATFORM_OWNER";
                return (
                  <label
                    key={perm.key}
                    className={`flex items-start gap-3 px-3.5 py-2.5 transition-colors ${
                      isOwner
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-slate-50/70 cursor-pointer"
                    }`}
                  >
                    <Checkbox
                      checked={checked}
                      disabled={isOwner}
                      onCheckedChange={() => toggleRolePermission(perm.key)}
                      className="mt-0.5 text-slate-400 data-[state=checked]:text-primary hover:text-primary"
                    />
                    <div className="space-y-0.5">
                      <span className="text-[13px] font-medium text-slate-900 block">
                        {perm.label}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {perm.description}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
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
