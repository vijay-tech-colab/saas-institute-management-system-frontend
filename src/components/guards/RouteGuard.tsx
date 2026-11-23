"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user-store";
import { superAdminNav } from "@/config/navigation";

const GENERAL_ALLOWED_PREFIXES = [
  "/dashboard",
  "/dashboard/help-support",
  "/dashboard/profile",
  "/dashboard/messages",
  "/dashboard/notifications",
  "/dashboard/platform-settings",
  "/dashboard/settings",
  "/dashboard/analytics",
  "/dashboard/reports",
  "/dashboard/roles",
];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const isAuthorized = React.useMemo(() => {
    if (!user || user.role !== "SUPER_ADMIN") return false;

    if (GENERAL_ALLOWED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      return true;
    }

    const allowedPaths = new Set<string>();
    superAdminNav.forEach((group) => {
      group.items.forEach((item) => {
        allowedPaths.add(item.href);
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            allowedPaths.add(subItem.href);
          });
        }
      });
    });

    for (const path of allowedPaths) {
      if (pathname === path || pathname.startsWith(path + "/")) {
        return true;
      }
    }

    return false;
  }, [pathname, user]);

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/dashboard");
    }
  }, [isAuthorized, router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
