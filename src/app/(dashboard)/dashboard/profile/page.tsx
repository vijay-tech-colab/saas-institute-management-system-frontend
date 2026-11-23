"use client";

import React from "react";
import { ProfileSettings } from "@/features/settings/components/tabs/ProfileSettings";

export default function ProfilePage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Super Admin Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal details, credentials, and administrator avatar.
        </p>
      </header>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <ProfileSettings />
      </div>
    </div>
  );
}
