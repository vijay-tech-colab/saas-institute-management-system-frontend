import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  ClipboardList,
  Settings,
  Sliders,
  Layers,
  Wallet,
  UserCog,
  Mail,
  KeyRound,
  ShieldCheck,
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
    ]
  },
  {
    title: 'System & Infrastructure',
    items: [
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
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings />,
      },
    ]
  }
];

// --- Dedicated Super Admin Settings Sidebar Configuration ---

export const superAdminSettingsNav: NavGroupConfig[] = [
  {
    title: 'General',
    items: [
      {
        label: 'General & Branding',
        href: '/dashboard/settings/general',
        icon: <Sliders />,
      },
    ]
  },
  {
    title: 'Platform & Billing',
    items: [
      {
        label: 'Subscription & Pricing Plans',
        href: '/dashboard/settings/plans',
        icon: <Layers />,
      },
      {
        label: 'Payment Gateways & Tax',
        href: '/dashboard/settings/payments',
        icon: <Wallet />,
      },
      {
        label: 'Admin Team & Roles',
        href: '/dashboard/settings/team',
        icon: <UserCog />,
      },
    ]
  },
  {
    title: 'Security & System',
    items: [
      {
        label: 'Email & SMTP / Notifications',
        href: '/dashboard/settings/notifications',
        icon: <Mail />,
      },
      {
        label: 'Integrations & API Keys',
        href: '/dashboard/settings/integrations',
        icon: <KeyRound />,
      },
      {
        label: 'System & Security',
        href: '/dashboard/settings/security',
        icon: <ShieldCheck />,
      },
    ]
  }
];

// Always return super admin navigation
export const getNavigationByRole = (_role?: UserRole): NavGroupConfig[] => {
  return superAdminNav;
};
