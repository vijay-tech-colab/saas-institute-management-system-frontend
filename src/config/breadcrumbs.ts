export interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

export const ROUTE_LABELS: Record<string, string> = {
  // Root
  "/dashboard": "Dashboard",

  // Tenant Management
  "/dashboard/tenants": "Tenant Management",
  "/dashboard/tenants/list": "Institutes List",
  "/dashboard/tenants/create": "Create Institute",
  "/dashboard/tenants/suspended": "Suspended Institutes",
  "/dashboard/tenants/domains": "Domain Management",
  "/dashboard/tenants/backups": "Backup & Restore",
  "/dashboard/tenants/support": "Support Desk",

  // Subscriptions & Billing
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/subscriptions/plans": "Plans & Pricing",
  "/dashboard/subscriptions/customers": "Active Customers",
  "/dashboard/subscriptions/invoices": "Invoices",
  "/dashboard/subscriptions/payments": "Payment History",
  "/dashboard/subscriptions/coupons": "Coupons & Offers",
  "/dashboard/subscriptions/pricing": "Pricing Calculator",
  "/dashboard/subscriptions/renewals": "Renewals",
  "/dashboard/subscriptions/trials": "Free Trials",
  "/dashboard/subscriptions/ai-insights": "AI Insights",

  // User Management
  "/dashboard/users": "User Management",

  // Identity & Access Management (IAM)
  "/dashboard/iam": "IAM",
  "/dashboard/iam/roles": "Roles",
  "/dashboard/iam/permissions": "Permissions Builder",
  "/dashboard/iam/policies": "Access Policies",
  "/dashboard/iam/hierarchy": "Role Hierarchy",
  "/dashboard/roles": "Roles",

  // Reports & Analytics
  "/dashboard/reports": "Reports & Analytics",
  "/dashboard/analytics": "Analytics Overview",
  "/dashboard/analytics/revenue": "Revenue & Growth",
  "/dashboard/analytics/institutes": "Institute Statistics",

  // Support & Help Desk
  "/dashboard/support": "Support Tickets",
  "/dashboard/support/tickets": "All Tickets",
  "/dashboard/support/chat": "Live Chat",
  "/dashboard/support/faq": "FAQ Setup",
  "/dashboard/support/reports": "Support Reports",
  "/dashboard/support/settings": "Support Settings",
  "/dashboard/help-support": "Help & Support",

  // Audit Logs & Security
  "/dashboard/logs": "Audit Logs",
  "/dashboard/logs/login": "Login Logs",
  "/dashboard/logs/api": "API Logs",
  "/dashboard/logs/activity": "Activity Logs",
  "/dashboard/logs/security": "Security Events",
  "/dashboard/logs/system": "System Logs",
  "/dashboard/logs/export": "Export Logs",
  "/dashboard/logs/settings": "Audit Settings",
  "/dashboard/audit": "Audit Logs",

  // Settings & System
  "/dashboard/platform-settings": "Platform Settings",
  "/dashboard/settings": "System Settings",

  // Common Modules
  "/dashboard/notifications": "Notifications",
  "/dashboard/messages": "Messages",
  "/dashboard/profile": "Admin Profile",
}

export function getBreadcrumbItems(pathname: string | null): BreadcrumbItem[] {
  if (!pathname) {
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]
  }

  const normalized = pathname.replace(/\/+$/, "") || "/dashboard"

  if (normalized === "/dashboard") {
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]
  }

  const segments = normalized.split("/").filter(Boolean)
  const dashboardIndex = segments.indexOf("dashboard")
  const relevantSegments = dashboardIndex !== -1 ? segments.slice(dashboardIndex + 1) : segments

  if (relevantSegments.length === 0) {
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]
  }

  const items: BreadcrumbItem[] = []
  let currentPath = "/dashboard"

  for (let i = 0; i < relevantSegments.length; i++) {
    const segment = relevantSegments[i]
    currentPath += `/${segment}`
    const isCurrent = i === relevantSegments.length - 1

    let label = ROUTE_LABELS[currentPath]

    if (!label) {
      const parentSegment = relevantSegments[i - 1]
      if (parentSegment === "tickets") {
        label = `Ticket #${segment}`
      } else if (parentSegment === "invoices") {
        label = `Invoice #${segment}`
      } else if (parentSegment === "tenants") {
        label = `Institute #${segment}`
      } else if (parentSegment === "customers") {
        label = `Customer #${segment}`
      } else if (parentSegment === "roles") {
        label = `Role #${segment}`
      } else if (parentSegment === "policies") {
        label = `Policy #${segment}`
      } else if (parentSegment === "plans") {
        label = `Plan #${segment}`
      } else {
        // Fallback: title-case with hyphen/underscore cleanup
        label = segment
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      }
    }

    items.push({
      label,
      href: currentPath,
      isCurrent,
    })
  }

  return items
}
