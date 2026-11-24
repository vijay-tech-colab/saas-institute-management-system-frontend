"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsSectionId } from "../types";
import { GeneralBrandingSection } from "./sections/GeneralBrandingSection";
import { SubscriptionPlansSection } from "./sections/SubscriptionPlansSection";
import { PaymentGatewaysSection } from "./sections/PaymentGatewaysSection";
import { AdminTeamRolesSection } from "./sections/AdminTeamRolesSection";
import { EmailNotificationsSection } from "./sections/EmailNotificationsSection";
import { IntegrationsApiKeysSection } from "./sections/IntegrationsApiKeysSection";
import { SystemSecuritySection } from "./sections/SystemSecuritySection";

const SECTION_COMPONENTS: Record<SettingsSectionId, React.ComponentType> = {
  general: GeneralBrandingSection,
  plans: SubscriptionPlansSection,
  payments: PaymentGatewaysSection,
  team: AdminTeamRolesSection,
  notifications: EmailNotificationsSection,
  integrations: IntegrationsApiKeysSection,
  security: SystemSecuritySection,
};

interface SettingsShellProps {
  section: SettingsSectionId;
}

export function SettingsShell({ section }: SettingsShellProps) {
  const ActiveSection = SECTION_COMPONENTS[section];

  return (
    <div className="flex-1 p-4 md:p-6 w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="w-full"
        >
          <ActiveSection />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
