"use client";

import React from "react";
import { InboxLayout } from "@/features/inbox/components/InboxLayout";

export default function MessagesPage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full flex flex-col">
      <header className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Messages</h1>
        <p className="text-sm text-slate-500 mt-1">
          Direct communication with institute directors, tenant admins, and platform owners.
        </p>
      </header>
      <InboxLayout />
    </div>
  );
}
