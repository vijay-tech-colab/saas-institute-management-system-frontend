import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileBarChart, 
  Settings, 
  CreditCard, 
  ClipboardList, 
  MessageSquare, 
  ShieldCheck,
  Sliders
} from "lucide-react";
import { UserRole } from '@/store/user-store';

export type NavItemConfig = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  subItems?: { label: string; href: string }[];
};

export type NavGroupConfig = {
  title: string;
  items: NavItemConfig[];
};

// --- Super Admin Dedicated Configuration ---

export const superAdminNav: NavGroupConfig[] = [
  {
    title: 'Platform Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    ]
  },
  {
    title: 'Administration',
    items: [
      { 
        label: 'Tenant Management', 
        href: '/dashboard/tenants', 
        icon: <Building2 />,
        subItems: [
          { label: 'Overview', href: '/dashboard/tenants' },
          { label: 'Institutes List', href: '/dashboard/tenants/list' },
          { label: 'Create Institute', href: '/dashboard/tenants/create' },
          { label: 'Suspended', href: '/dashboard/tenants/suspended' },
          { label: 'Domain Management', href: '/dashboard/tenants/domains' },
          { label: 'Backup & Restore', href: '/dashboard/tenants/backups' },
          { label: 'Support Desk', href: '/dashboard/tenants/support' },
        ]
      },
      { 
        label: 'Subscriptions', 
        href: '/dashboard/subscriptions', 
        icon: <CreditCard />,
        subItems: [
          { label: 'Overview', href: '/dashboard/subscriptions' },
          { label: 'Plans & Pricing', href: '/dashboard/subscriptions/plans' },
          { label: 'Active Customers', href: '/dashboard/subscriptions/customers' },
          { label: 'Invoices', href: '/dashboard/subscriptions/invoices' },
          { label: 'Payment History', href: '/dashboard/subscriptions/payments' },
          { label: 'Coupons & Offers', href: '/dashboard/subscriptions/coupons' },
        ]
      },
      { 
        label: 'User Management', 
        href: '/dashboard/users', 
        icon: <Users />
      },
      { 
        label: 'Identity & Access Management', 
        href: '/dashboard/iam', 
        icon: <ShieldCheck />,
        subItems: [
          { label: 'IAM Dashboard', href: '/dashboard/iam' },
          { label: 'Roles', href: '/dashboard/iam/roles' },
          { label: 'Permissions Builder', href: '/dashboard/iam/permissions' },
          { label: 'Access Policies', href: '/dashboard/iam/policies' },
          { label: 'Role Hierarchy', href: '/dashboard/iam/hierarchy' },
        ]
      },
    ]
  },
  {
    title: 'Analytics & Support',
    items: [
      { 
        label: 'Reports & Analytics', 
        href: '/dashboard/reports', 
        icon: <FileBarChart />,
        subItems: [
          { label: 'Overview', href: '/dashboard/analytics' },
          { label: 'Revenue & Growth', href: '/dashboard/analytics/revenue' },
          { label: 'Institute Statistics', href: '/dashboard/analytics/institutes' },
          { label: 'Report Management', href: '/dashboard/reports' },
        ]
      },
      { 
        label: 'Support Tickets', 
        href: '/dashboard/support', 
        icon: <MessageSquare />,
        badge: '12',
        subItems: [
          { label: 'Overview', href: '/dashboard/support' },
          { label: 'All Tickets', href: '/dashboard/support/tickets' },
          { label: 'Live Chat', href: '/dashboard/support/chat' },
          { label: 'FAQ Setup', href: '/dashboard/support/faq' },
        ]
      },
    ]
  },
  {
    title: 'System & Infrastructure',
    items: [
      { 
        label: 'Platform Settings', 
        href: '/dashboard/platform-settings', 
        icon: <Sliders />
      },
      { 
        label: 'System Settings', 
        href: '/dashboard/settings', 
        icon: <Settings />
      },
      { 
        label: 'Audit Logs', 
        href: '/dashboard/logs', 
        icon: <ClipboardList />,
        subItems: [
          { label: 'Overview', href: '/dashboard/logs' },
          { label: 'Login Logs', href: '/dashboard/logs/login' },
          { label: 'API Logs', href: '/dashboard/logs/api' },
          { label: 'Activity Logs', href: '/dashboard/logs/activity' },
          { label: 'Security Events', href: '/dashboard/logs/security' },
          { label: 'System Logs', href: '/dashboard/logs/system' },
          { label: 'Export Logs', href: '/dashboard/logs/export' },
          { label: 'Audit Settings', href: '/dashboard/logs/settings' },
        ]
      },
    ]
  }
];

// Always return super admin navigation
export const getNavigationByRole = (_role?: UserRole): NavGroupConfig[] => {
  return superAdminNav;
};
