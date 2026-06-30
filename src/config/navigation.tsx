import React from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Building2, 
  Users, 
  FileBarChart, 
  Calendar, 
  Settings, 
  BookOpen,
  GraduationCap,
  CreditCard,
  ClipboardList,
  MessageSquare,
  ShieldCheck
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

// --- Role-Specific Configurations ---

const superAdminNav: NavGroupConfig[] = [
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
        icon: <Users />,
        subItems: [
          { label: 'Overview', href: '/dashboard/users' },
          { label: 'Institute Owners', href: '/dashboard/users/owners' },
          { label: 'Blocked Users', href: '/dashboard/users/blocked' },
        ]
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
        label: 'Analytics', 
        href: '/dashboard/analytics', 
        icon: <FileBarChart />,
        subItems: [
          { label: 'Overview', href: '/dashboard/analytics' },
          { label: 'Revenue & Growth', href: '/dashboard/analytics/revenue' },
          { label: 'Institute Statistics', href: '/dashboard/analytics/institutes' },
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
    title: 'System',
    items: [
      { 
        label: 'Settings', 
        href: '/dashboard/settings', 
        icon: <Settings />,
        subItems: [
          { label: 'SMTP & Email', href: '/dashboard/settings/smtp' },
          { label: 'SMS & WhatsApp', href: '/dashboard/settings/sms' },
          { label: 'Payment Gateway', href: '/dashboard/settings/payment' },
          { label: 'Storage Options', href: '/dashboard/settings/storage' },
        ]
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

const adminNav: NavGroupConfig[] = [
  {
    title: 'Institute Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
      { 
        label: 'Branch Management', 
        href: '/dashboard/branch', 
        icon: <Building2 />,
        subItems: [
          { label: 'Create Branch', href: '/dashboard/branch/create' },
          { label: 'Branch Settings', href: '/dashboard/branch/settings' },
          { label: 'Branch Timing', href: '/dashboard/branch/timing' },
          { label: 'Holidays', href: '/dashboard/branch/holidays' },
        ]
      }
    ]
  },
  {
    title: 'People Management',
    items: [
      { 
        label: 'User Management', 
        href: '/dashboard/users', 
        icon: <Users />,
        subItems: [
          { label: 'Create User', href: '/dashboard/users/create' },
          { label: 'Assign Permissions', href: '/dashboard/users/permissions' },
        ]
      },
      { 
        label: 'Student Management', 
        href: '/dashboard/students', 
        icon: <GraduationCap />,
        subItems: [
          { label: 'Admission', href: '/dashboard/students/admission' },
          { label: 'Documents', href: '/dashboard/students/documents' },
          { label: 'Transfer', href: '/dashboard/students/transfer' },
          { label: 'ID Card', href: '/dashboard/students/id-card' },
          { label: 'Promotion', href: '/dashboard/students/promotion' },
          { label: 'Alumni', href: '/dashboard/students/alumni' },
        ]
      },
      { 
        label: 'Faculty Management', 
        href: '/dashboard/faculty', 
        icon: <Users />,
        subItems: [
          { label: 'Salary', href: '/dashboard/faculty/salary' },
          { label: 'Attendance', href: '/dashboard/faculty/attendance' },
          { label: 'Subjects', href: '/dashboard/faculty/subjects' },
          { label: 'Leave', href: '/dashboard/faculty/leave' },
        ]
      }
    ]
  },
  {
    title: 'Academics',
    items: [
      { 
        label: 'Course Management', 
        href: '/dashboard/courses', 
        icon: <BookOpen />,
        subItems: [
          { label: 'Courses', href: '/dashboard/courses/list' },
          { label: 'Duration & Fees', href: '/dashboard/courses/details' },
          { label: 'Syllabus', href: '/dashboard/courses/syllabus' },
        ]
      },
      { 
        label: 'Batch Management', 
        href: '/dashboard/batches', 
        icon: <Users />,
        subItems: [
          { label: 'Morning Batch', href: '/dashboard/batches/morning' },
          { label: 'Evening Batch', href: '/dashboard/batches/evening' },
          { label: 'Weekend Batch', href: '/dashboard/batches/weekend' },
        ]
      },
      { 
        label: 'Timetable', 
        href: '/dashboard/timetable', 
        icon: <Calendar />,
        subItems: [
          { label: 'Daily Schedule', href: '/dashboard/timetable/daily' },
          { label: 'Classroom Allocation', href: '/dashboard/timetable/allocation' },
        ]
      },
      { 
        label: 'Examination', 
        href: '/dashboard/exams', 
        icon: <ClipboardList />,
        subItems: [
          { label: 'Exams', href: '/dashboard/exams/list' },
          { label: 'Result', href: '/dashboard/exams/result' },
          { label: 'Certificates', href: '/dashboard/exams/certificates' },
        ]
      }
    ]
  },
  {
    title: 'Operations & Finance',
    items: [
      { 
        label: 'Attendance', 
        href: '/dashboard/attendance', 
        icon: <Calendar />,
        subItems: [
          { label: 'Student Attendance', href: '/dashboard/attendance/student' },
          { label: 'Faculty Attendance', href: '/dashboard/attendance/faculty' },
        ]
      },
      { 
        label: 'Fees', 
        href: '/dashboard/fees', 
        icon: <CreditCard />,
        subItems: [
          { label: 'Collect Fees', href: '/dashboard/fees/collect' },
          { label: 'Installments', href: '/dashboard/fees/installments' },
          { label: 'Discounts', href: '/dashboard/fees/discounts' },
          { label: 'Pending Fees', href: '/dashboard/fees/pending' },
        ]
      },
      { 
        label: 'Inventory', 
        href: '/dashboard/inventory', 
        icon: <LayoutDashboard />, // Could be Package icon if imported
        subItems: [
          { label: 'Computers', href: '/dashboard/inventory/computers' },
          { label: 'Lab Equipment', href: '/dashboard/inventory/lab' },
          { label: 'Printers', href: '/dashboard/inventory/printers' },
          { label: 'Projectors', href: '/dashboard/inventory/projectors' },
        ]
      },
      { 
        label: 'Library', 
        href: '/dashboard/library', 
        icon: <BookOpen />,
        subItems: [
          { label: 'Books', href: '/dashboard/library/books' },
          { label: 'Issue', href: '/dashboard/library/issue' },
          { label: 'Return', href: '/dashboard/library/return' },
        ]
      }
    ]
  },
  {
    title: 'Analytics & Config',
    items: [
      { 
        label: 'Reports', 
        href: '/dashboard/reports', 
        icon: <FileBarChart />,
        subItems: [
          { label: 'Revenue Report', href: '/dashboard/reports/revenue' },
          { label: 'Attendance Report', href: '/dashboard/reports/attendance' },
          { label: 'Student Report', href: '/dashboard/reports/student' },
        ]
      },
      { 
        label: 'Settings', 
        href: '/dashboard/settings', 
        icon: <Settings />,
        subItems: [
          { label: 'Logo', href: '/dashboard/settings/logo' },
          { label: 'Institute Profile', href: '/dashboard/settings/profile' },
          { label: 'GST', href: '/dashboard/settings/gst' },
          { label: 'Email Config', href: '/dashboard/settings/email' },
        ]
      }
    ]
  }
];

const teacherNav: NavGroupConfig[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
      { label: 'Messages', href: '/dashboard/messages', icon: <MessageSquare /> },
      { label: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
    ]
  },
  {
    title: 'My Classes',
    items: [
      { label: 'Schedule', href: '/dashboard/schedule', icon: <Calendar /> },
      { label: 'Attendance', href: '/dashboard/attendance', icon: <Users /> },
      { label: 'Assignments', href: '/dashboard/assignments', icon: <ClipboardList /> },
      { label: 'Study Materials', href: '/dashboard/materials', icon: <BookOpen /> },
    ]
  }
];

const studentNav: NavGroupConfig[] = [
  {
    title: 'Academic Info',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
      { label: 'My Profile', href: '/dashboard/profile', icon: <Users /> },
      { label: 'My Course', href: '/dashboard/course', icon: <GraduationCap /> },
    ]
  },
  {
    title: 'Learning',
    items: [
      { label: 'Online Classes', href: '/dashboard/classes', icon: <Calendar /> },
      { label: 'Study Material', href: '/dashboard/materials', icon: <BookOpen /> },
      { label: 'Assignments', href: '/dashboard/assignments', icon: <ClipboardList />, badge: 'New' },
    ]
  },
  {
    title: 'Performance',
    items: [
      { label: 'Attendance', href: '/dashboard/attendance', icon: <Calendar /> },
      { label: 'Result', href: '/dashboard/result', icon: <FileBarChart /> },
    ]
  },
  {
    title: 'Administrative',
    items: [
      { label: 'Fees', href: '/dashboard/fees', icon: <CreditCard /> },
      { label: 'Certificates', href: '/dashboard/certificates', icon: <FileBarChart /> }, // Download
      { label: 'Complaint', href: '/dashboard/complaints', icon: <MessageSquare /> },
      { label: 'Notifications', href: '/dashboard/notifications', icon: <MessageSquare />, badge: '3' },
    ]
  }
];

const parentNav: NavGroupConfig[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
      { label: 'Messages', href: '/dashboard/messages', icon: <MessageSquare /> },
      { label: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
    ]
  },
  {
    title: 'Wards',
    items: [
      { label: 'Academic Progress', href: '/dashboard/wards/progress', icon: <FileBarChart /> },
      { label: 'Attendance', href: '/dashboard/wards/attendance', icon: <Calendar /> },
      { label: 'Fee Payments', href: '/dashboard/wards/fees', icon: <CreditCard /> },
    ]
  }
];

const branchManagerNav: NavGroupConfig[] = [
  {
    title: 'Branch Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    ]
  },
  {
    title: 'Academics & People',
    items: [
      { 
        label: 'Student Management', 
        href: '/dashboard/students', 
        icon: <GraduationCap />,
        subItems: [
          { label: 'Admission', href: '/dashboard/students/admission' },
          { label: 'Documents', href: '/dashboard/students/documents' },
        ]
      },
      { 
        label: 'Batch Management', 
        href: '/dashboard/batches', 
        icon: <Users />,
        subItems: [
          { label: 'Morning Batch', href: '/dashboard/batches/morning' },
          { label: 'Evening Batch', href: '/dashboard/batches/evening' },
        ]
      },
      { 
        label: 'Faculty Management', 
        href: '/dashboard/faculty', 
        icon: <Users />,
        subItems: [
          { label: 'Attendance', href: '/dashboard/faculty/attendance' },
          { label: 'Leave', href: '/dashboard/faculty/leave' },
        ]
      },
      { 
        label: 'Timetable', 
        href: '/dashboard/timetable', 
        icon: <Calendar />,
        subItems: [
          { label: 'Daily Schedule', href: '/dashboard/timetable/daily' },
        ]
      },
    ]
  },
  {
    title: 'Operations',
    items: [
      { 
        label: 'Attendance', 
        href: '/dashboard/attendance', 
        icon: <Calendar />,
        subItems: [
          { label: 'Student', href: '/dashboard/attendance/student' },
          { label: 'Faculty', href: '/dashboard/attendance/faculty' },
        ]
      },
      { 
        label: 'Fee Monitoring', 
        href: '/dashboard/fees', 
        icon: <CreditCard />,
        subItems: [
          { label: 'Collect Fees', href: '/dashboard/fees/collect' },
          { label: 'Pending Fees', href: '/dashboard/fees/pending' },
        ]
      },
      { 
        label: 'Inventory', 
        href: '/dashboard/inventory', 
        icon: <LayoutDashboard />,
        subItems: [
          { label: 'Equipment', href: '/dashboard/inventory/equipment' },
        ]
      },
      { 
        label: 'Reports', 
        href: '/dashboard/reports', 
        icon: <FileBarChart />,
        subItems: [
          { label: 'Branch Reports', href: '/dashboard/reports/branch' },
        ]
      }
    ]
  }
];

// Helper to get configuration based on role
export const getNavigationByRole = (role: UserRole): NavGroupConfig[] => {
  switch (role) {
    case 'SUPER_ADMIN': return superAdminNav;
    case 'ADMIN': return adminNav;
    case 'BRANCH_MANAGER': return branchManagerNav;
    case 'TEACHER': return teacherNav;
    case 'STUDENT': return studentNav;
    case 'PARENT': return parentNav;
    default: return studentNav;
  }
};
