"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user-store";
import { superAdminNav, instituteAdminNav, NavGroupConfig } from "@/config/navigation";

const SUPER_ADMIN_GENERAL_PREFIXES = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/messages",
  "/dashboard/notifications",
  "/dashboard/settings",
];

const INSTITUTE_GENERAL_PREFIXES = [
  "/institute",
  "/institute/profile",
  "/institute/notifications",
];

function collectNavPaths(groups: NavGroupConfig[]): Set<string> {
  const allowed = new Set<string>();
  groups.forEach((group) => {
    group.items.forEach((item) => {
      allowed.add(item.href);
      item.subItems?.forEach((subItem) => allowed.add(subItem.href));
    });
  });
  return allowed;
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const isInstituteRoute = pathname === "/institute" || pathname.startsWith("/institute/");

  const isAuthorized = React.useMemo(() => {
    if (!user) return false;

    if (isInstituteRoute) {
      if (user.role !== "INSTITUTE_ADMIN" && user.role !== "SUPER_ADMIN") return false;
      if (INSTITUTE_GENERAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
        return true;
      }
      for (const path of collectNavPaths(instituteAdminNav)) {
        if (pathname === path || pathname.startsWith(path + "/")) return true;
      }
      return false;
    }

    if (user.role !== "SUPER_ADMIN") return false;

    if (SUPER_ADMIN_GENERAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      return true;
    }

    for (const path of collectNavPaths(superAdminNav)) {
      if (pathname === path || pathname.startsWith(path + "/")) {
        return true;
      }
    }

    return false;
  }, [pathname, user, isInstituteRoute]);

  useEffect(() => {
    if (!isAuthorized) {
      router.replace(user?.role === "INSTITUTE_ADMIN" ? "/institute" : "/dashboard");
    }
  }, [isAuthorized, router, user?.role]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
