import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SettingsShell } from "@/features/super-admin-settings/components/SettingsShell";
import {
  SettingsSectionId,
  VALID_SETTINGS_SECTIONS,
} from "@/features/super-admin-settings/types";

const SECTION_METADATA: Record<
  SettingsSectionId,
  { title: string; description: string }
> = {
  general: {
    title: "General & Branding - Settings - CampusOS",
    description: "Configure platform identity, regional defaults, and brand assets.",
  },
  plans: {
    title: "Subscription & Pricing Plans - Settings - CampusOS",
    description: "Manage SaaS subscription tiers, pricing, limits, and trial rules.",
  },
  payments: {
    title: "Payment Gateways & Tax - Settings - CampusOS",
    description: "Configure Razorpay, Stripe, webhooks, and GST calculation rules.",
  },
  team: {
    title: "Admin Team & Roles - Settings - CampusOS",
    description: "Manage internal Super Admin staff, invites, and granular permissions.",
  },
  notifications: {
    title: "Email & SMTP / Notifications - Settings - CampusOS",
    description: "Configure custom SMTP server, sender identity, and alert toggles.",
  },
  integrations: {
    title: "Integrations & API Keys - Settings - CampusOS",
    description: "Manage platform API keys, Firebase, AdMob, analytics, and webhooks.",
  },
  security: {
    title: "System & Security - Settings - CampusOS",
    description: "Manage maintenance mode, 2FA enforcement, sessions, and audit retention.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!VALID_SETTINGS_SECTIONS.includes(section as SettingsSectionId)) {
    return { title: "Settings Not Found - CampusOS" };
  }
  const meta = SECTION_METADATA[section as SettingsSectionId];
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function SettingsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!VALID_SETTINGS_SECTIONS.includes(section as SettingsSectionId)) {
    notFound();
  }

  return <SettingsShell section={section as SettingsSectionId} />;
}
