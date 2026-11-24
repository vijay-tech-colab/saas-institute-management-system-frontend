import type { Metadata } from "next";
import { SettingsShell } from "@/features/super-admin-settings/components/SettingsShell";

export const metadata: Metadata = {
  title: "General & Branding Settings - CampusOS",
  description: "Configure platform identity, regional defaults, and brand assets.",
};

export default function SettingsPage() {
  return <SettingsShell section="general" />;
}
