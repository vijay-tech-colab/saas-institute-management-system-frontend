'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import {
  Building2,
  Camera,
  Clock,
  Laptop,
  Lock,
  Mail,
  MapPin,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
} from 'lucide-react';
import { userAtom } from '@/store/user-store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SegmentedTabs } from '@/components/ui/tabs';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { SettingsSwitch } from '@/features/super-admin-settings/components/shared/SettingsPrimitives';

type ProfileTab = 'profile' | 'security';

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
  type: 'desktop' | 'mobile';
}

const INITIAL_SESSIONS: ActiveSession[] = [
  {
    id: 'sess-1',
    device: 'Windows 11 Workstation',
    browser: 'Chrome 131',
    location: 'Mumbai, India',
    ip: '103.21.124.8',
    lastActive: 'Active now',
    current: true,
    type: 'desktop',
  },
  {
    id: 'sess-2',
    device: 'iPhone 15 Pro',
    browser: 'Mobile Safari',
    location: 'Mumbai, India',
    ip: '103.21.124.19',
    lastActive: '2 days ago',
    current: false,
    type: 'mobile',
  },
];

export function AdminProfileView() {
  const [user, setUser] = useAtom(userAtom);
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
  const [sessions, setSessions] = useState<ActiveSession[]>(INITIAL_SESSIONS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
    timezone: user.timezone || 'Asia/Kolkata (IST, UTC+05:30)',
    department: user.department || '',
    avatarUrl: user.avatarUrl || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const initials = useMemo(
    () =>
      user.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'SA',
    [user.name]
  );

  const isFormDirty =
    formState.name !== user.name ||
    formState.email !== user.email ||
    formState.phone !== (user.phone || '') ||
    formState.location !== (user.location || '') ||
    formState.timezone !== (user.timezone || 'Asia/Kolkata (IST, UTC+05:30)') ||
    formState.department !== (user.department || '') ||
    formState.avatarUrl !== (user.avatarUrl || '');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormState((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) {
      toast.error({
        title: 'Required fields missing',
        description: 'Full name and email address cannot be empty.',
      });
      return;
    }

    setUser((prev) => ({
      ...prev,
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      location: formState.location.trim(),
      timezone: formState.timezone.trim(),
      department: formState.department.trim(),
      avatarUrl: formState.avatarUrl || undefined,
    }));

    toast.success({
      title: 'Profile updated',
      description: 'Your administrator profile details have been saved.',
    });
  };

  const handleResetForm = () => {
    setFormState({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      timezone: user.timezone || 'Asia/Kolkata (IST, UTC+05:30)',
      department: user.department || '',
      avatarUrl: user.avatarUrl || '',
    });
  };

  const handleToggle2FA = (enabled: boolean) => {
    setUser((prev) => ({ ...prev, twoFactorEnabled: enabled }));
    toast.success({
      title: enabled ? 'Two-factor enabled' : 'Two-factor disabled',
      description: enabled
        ? 'Authenticator verification is active for console sign-ins.'
        : '2FA verification has been turned off for your account.',
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !passwordForm.currentPassword ||
      passwordForm.newPassword.length < 8 ||
      passwordForm.newPassword !== passwordForm.confirmPassword
    ) {
      toast.error({
        title: 'Invalid password input',
        description:
          'New password must be at least 8 characters and match confirmation.',
      });
      return;
    }

    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    toast.success({
      title: 'Password changed',
      description: 'Your Super Admin credentials have been updated.',
    });
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.info({
      title: 'Session revoked',
      description: 'Device access has been signed out.',
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-5 max-w-5xl">
      <PageHeader
        title="Admin Profile"
        description="Manage your account details, contact info, and sign-in security."
        breadcrumbs={[{ label: 'Admin Profile' }]}
      >
        <Button asChild variant="outline" size="sm" className="h-9 rounded-xl gap-1.5">
          <Link href="/dashboard/settings/general">
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            Platform Settings
          </Link>
        </Button>
      </PageHeader>

      {/* Compact Identity Card + Tabs */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <div
                className="w-14 h-14 rounded-2xl bg-primary text-white text-lg font-bold flex items-center justify-center shadow-xs ring-2 ring-primary-light overflow-hidden bg-cover bg-center"
                style={
                  user.avatarUrl
                    ? { backgroundImage: `url(${user.avatarUrl})` }
                    : undefined
                }
              >
                {!user.avatarUrl && initials}
              </div>
              <span
                title="Online"
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
              />
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight truncate">
                  {user.name}
                </h2>
                <StatusBadge status="active" />
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-light text-primary border border-primary-border">
                  <ShieldCheck className="w-3 h-3" />
                  Super Admin
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
                {user.instituteName && (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {user.instituteName}
                  </span>
                )}
                {user.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {user.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 shrink-0 self-start sm:self-center">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Last login: {user.lastLoginAt || 'Today, 06:15 AM'}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3.5">
          <SegmentedTabs<ProfileTab>
            ariaLabel="Profile sections"
            value={activeTab}
            onChange={setActiveTab}
            options={[
              {
                value: 'profile',
                label: 'Profile Details',
                icon: <User className="w-3.5 h-3.5" />,
              },
              {
                value: 'security',
                label: 'Security & Sessions',
                icon: <ShieldCheck className="w-3.5 h-3.5" />,
                count: sessions.length,
              },
            ]}
          />
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' ? (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden"
        >
          <div className="p-5 space-y-5">
            {/* Avatar Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-slate-100">
              <div
                className="w-14 h-14 rounded-2xl bg-primary text-white text-base font-bold flex items-center justify-center shrink-0 overflow-hidden bg-cover bg-center shadow-xs"
                style={
                  formState.avatarUrl
                    ? { backgroundImage: `url(${formState.avatarUrl})` }
                    : undefined
                }
              >
                {!formState.avatarUrl &&
                  (formState.name
                    .split(' ')
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() ||
                    'SA')}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-800">Profile Photo</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs gap-1.5 rounded-lg"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Upload photo
                  </Button>
                  {formState.avatarUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, avatarUrl: '' }))
                      }
                      className="h-8 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Core Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name" required>
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-email" required>
                  Email Address
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-phone">Phone Number</Label>
                <Input
                  id="profile-phone"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-department">Department</Label>
                <Input
                  id="profile-department"
                  value={formState.department}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-location">Location</Label>
                <Input
                  id="profile-location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-timezone">Timezone</Label>
                <Input
                  id="profile-timezone"
                  value={formState.timezone}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      timezone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {isFormDirty ? 'Unsaved changes.' : 'All changes saved.'}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!isFormDirty}
                onClick={handleResetForm}
                className="h-8 text-xs gap-1.5 rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!isFormDirty}
                className="h-8 text-xs gap-1.5 rounded-lg"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* 2FA & Password */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden divide-y divide-slate-100">
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Two-Factor Authentication (2FA)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Require an authenticator code during sign-in.
                </p>
              </div>
              <SettingsSwitch
                checked={!!user.twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
                ariaLabel="Toggle two-factor authentication"
              />
            </div>

            <form onSubmit={handleUpdatePassword} className="p-5 space-y-3.5">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Change Password
                </h3>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({
                        ...p,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({
                        ...p,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({
                        ...p,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="sm" className="h-9 rounded-xl">
                Update Password
              </Button>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Active Console Sessions
              </h3>
              <p className="text-xs text-slate-500">
                Devices currently signed in to your account.
              </p>
            </div>

            <div className="p-5 divide-y divide-slate-100 flex-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      {session.type === 'mobile' ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[13px] font-semibold text-slate-900">
                          {session.device}
                        </p>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {session.browser} · {session.location} ({session.ip})
                      </p>
                      <p className="text-[11px] text-slate-400">{session.lastActive}</p>
                    </div>
                  </div>

                  {!session.current && (
                    <button
                      type="button"
                      onClick={() => handleRevokeSession(session.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200/80 transition-colors shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
