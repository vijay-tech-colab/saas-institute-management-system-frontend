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

  // Subscriptions & Billing
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/subscriptions/plans": "Plans & Pricing",
  "/dashboard/subscriptions/customers": "Active Customers",
  "/dashboard/subscriptions/invoices": "Invoices",
  "/dashboard/subscriptions/payments": "Payment History",
  "/dashboard/subscriptions/pricing": "Pricing Calculator",
  "/dashboard/subscriptions/renewals": "Renewals",
  "/dashboard/subscriptions/trials": "Free Trials",
  "/dashboard/subscriptions/ai-insights": "AI Insights",

  // User Management
  "/dashboard/users": "User Management",

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

  // Common Modules
  "/dashboard/notifications": "Notifications",
  "/dashboard/messages": "Messages",
  "/dashboard/profile": "Admin Profile",

  // Super Admin Settings
  "/dashboard/settings": "Settings",
  "/dashboard/settings/general": "General & Branding",
  "/dashboard/settings/plans": "Subscription & Pricing Plans",
  "/dashboard/settings/payments": "Payment Gateways & Tax",
  "/dashboard/settings/team": "Admin Team & Roles",
  "/dashboard/settings/notifications": "Email & SMTP / Notifications",
  "/dashboard/settings/integrations": "Integrations & API Keys",
  "/dashboard/settings/security": "System & Security",

  // Institute Admin Portal
  "/institute": "Dashboard",
  "/institute/profile": "Admin Profile",
  "/institute/notifications": "Notifications",

  // Students
  "/institute/students": "Students",
  "/institute/students/enquiries": "Enquiries",
  "/institute/students/admissions": "Admissions",
  "/institute/students/directory": "All Students",

  // Academics
  "/institute/academics": "Academics",
  "/institute/academics/courses": "Courses",
  "/institute/academics/batches": "Batches",
  "/institute/academics/subjects": "Subjects & Syllabus",
  "/institute/academics/timetable": "Timetable",
  "/institute/academics/exams": "Exams & Results",

  // Attendance
  "/institute/attendance": "Attendance Records",
  "/institute/attendance/students": "Mark Attendance",
  "/institute/attendance/staff": "Staff Attendance",
  "/institute/attendance/leaves": "Leave Requests",

  // Finance
  "/institute/finance": "Finance",
  "/institute/finance/fee-structures": "Fee Management",
  "/institute/finance/collections": "Payments",
  "/institute/finance/expenses": "Expenses",
  "/institute/finance/payroll": "Payroll & Payouts",

  // Staff
  "/institute/staff": "Staff",
  "/institute/staff/teachers": "Teachers",
  "/institute/staff/members": "Staff Members",
  "/institute/staff/departments": "Departments & Roles",

  // Communication (preserved)
  "/institute/communication": "Communication",
  "/institute/communication/whatsapp": "WhatsApp Broadcasts",
  "/institute/communication/notices": "Notice Board & Alerts",
  "/institute/communication/templates": "Message Templates",

  // Reports & Analytics (preserved)
  "/institute/reports": "Reports & Analytics",
  "/institute/reports/admissions": "Admissions & Growth",
  "/institute/reports/finance": "Financial Reports",
  "/institute/reports/academics": "Academic & Attendance",

  // Settings
  "/institute/settings": "Settings",
  "/institute/settings/general": "General Settings",
  "/institute/settings/branches": "Sessions & Branches",
  "/institute/settings/access-control": "Users & Roles",
  "/institute/settings/templates": "Certificates & ID Cards",

  // Subscription & Billing
  "/institute/billing": "Subscription & Billing",
  "/institute/billing/invoices": "Invoices & Payments",
  "/institute/billing/upgrade": "Upgrade Plan",

  // Help & Support
  "/institute/support": "Help & Support",
  "/institute/support/guides": "Help Center & Guides",
}

export function getBreadcrumbItems(pathname: string | null): BreadcrumbItem[] {
  if (!pathname) {
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]
  }

  const normalized = pathname.replace(/\/+$/, "") || "/dashboard"
  const isInstitute = normalized === "/institute" || normalized.startsWith("/institute/")
  const rootPrefix = isInstitute ? "/institute" : "/dashboard"

  if (normalized === rootPrefix) {
    return [{ label: "Dashboard", href: rootPrefix, isCurrent: true }]
  }

  const segments = normalized.split("/").filter(Boolean)
  const rootSegment = isInstitute ? "institute" : "dashboard"
  const rootIndex = segments.indexOf(rootSegment)
  const relevantSegments = rootIndex !== -1 ? segments.slice(rootIndex + 1) : segments

  if (relevantSegments.length === 0) {
    return [{ label: "Dashboard", href: rootPrefix, isCurrent: true }]
  }

  const items: BreadcrumbItem[] = []
  let currentPath = rootPrefix

  for (let i = 0; i < relevantSegments.length; i++) {
    const segment = relevantSegments[i]
    currentPath += `/${segment}`
    const isCurrent = i === relevantSegments.length - 1

    let label = ROUTE_LABELS[currentPath]

    if (!label) {
      const parentSegment = relevantSegments[i - 1]
      if (parentSegment === "invoices") {
        label = `Invoice #${segment}`
      } else if (parentSegment === "tenants") {
        label = `Institute #${segment}`
      } else if (parentSegment === "customers") {
        label = `Customer #${segment}`
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
