"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user-store";
import { getNavigationByRole } from "@/config/navigation";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const isAuthorized = React.useMemo(() => {
    if (!user) return false;

    const navGroups = getNavigationByRole(user.role);
    const allowedPaths = new Set<string>();
    
    navGroups.forEach(group => {
      group.items.forEach(item => {
        allowedPaths.add(item.href);
        if (item.subItems) {
          item.subItems.forEach(subItem => {
            allowedPaths.add(subItem.href);
          });
        }
      });
    });
    
    if (pathname === '/dashboard') {
      return true;
    } 
    
    // Explicitly allow platform settings for super admin (since it's not in the main nav array to prevent duplication)
    if (pathname.startsWith('/dashboard/platform-settings') && user.role === 'SUPER_ADMIN') {
      return true;
    }
    
    const prefixPaths = Array.from(allowedPaths).filter(p => p !== '/dashboard');
    for (const path of prefixPaths) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return true;
      }
    }
    
    return false;
  }, [pathname, user]);

  useEffect(() => {
    if (!isAuthorized) {
      // Redirect unauthorized users to the dashboard home
      router.replace("/dashboard");
    }
  }, [isAuthorized, router]);

  // Show nothing while redirecting to prevent flash of unauthorized content
  if (!isAuthorized) {
    return null; 
  }

  return <>{children}</>;
}
