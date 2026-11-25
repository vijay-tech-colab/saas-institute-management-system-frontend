import type { StatCardTone } from '@/components/ui/notched-stat-card';
import type { StatusVariant } from '@/components/ui/status-badge';

export interface InstituteSubTab {
  label: string;
  href: string;
}

export interface InstituteStatItem {
  title: string;
  value: string;
  tone: StatCardTone;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  compareLabel?: string;
}

export interface InstituteSampleRow {
  id: string;
  primary: string;
  secondary?: string;
  col2: string;
  col3: string;
  col4: string;
  status: StatusVariant;
}

export interface InstituteModuleConfig {
  route: string;
  moduleNumber: number;
  parentModule: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  searchPlaceholder: string;
  tabs: InstituteSubTab[];
  stats: InstituteStatItem[];
  columns: [string, string, string, string];
  rows: InstituteSampleRow[];
}

const STUDENT_TABS: InstituteSubTab[] = [
  { label: 'Enquiries', href: '/institute/students/enquiries' },
  { label: 'Admissions', href: '/institute/students/admissions' },
  { label: 'All Students', href: '/institute/students/directory' },
];

const ACADEMIC_TABS: InstituteSubTab[] = [
  { label: 'Courses', href: '/institute/academics/courses' },
  { label: 'Batches', href: '/institute/academics/batches' },
  { label: 'Timetable', href: '/institute/academics/timetable' },
];

const ATTENDANCE_TABS: InstituteSubTab[] = [
  { label: 'Mark Attendance', href: '/institute/attendance/students' },
  { label: 'Attendance Records', href: '/institute/attendance' },
];

const FINANCE_TABS: InstituteSubTab[] = [
  { label: 'Fee Management', href: '/institute/finance/fee-structures' },
  { label: 'Payments', href: '/institute/finance/collections' },
  { label: 'Expenses', href: '/institute/finance/expenses' },
];

const STAFF_TABS: InstituteSubTab[] = [
  { label: 'Teachers', href: '/institute/staff/teachers' },
  { label: 'Staff Members', href: '/institute/staff/members' },
];

const COMMUNICATION_TABS: InstituteSubTab[] = [
  { label: 'Overview', href: '/institute/communication' },
  { label: 'WhatsApp Broadcasts', href: '/institute/communication/whatsapp' },
  { label: 'Notice Board & Alerts', href: '/institute/communication/notices' },
  { label: 'Templates', href: '/institute/communication/templates' },
];

const REPORT_TABS: InstituteSubTab[] = [
  { label: 'Overview', href: '/institute/reports' },
  { label: 'Admissions & Growth', href: '/institute/reports/admissions' },
  { label: 'Financial Reports', href: '/institute/reports/finance' },
  { label: 'Academic & Attendance', href: '/institute/reports/academics' },
];

const SETTINGS_TABS: InstituteSubTab[] = [
  { label: 'Institute Profile', href: '/institute/settings' },
  { label: 'Users & Roles', href: '/institute/settings/access-control' },
  { label: 'General Settings', href: '/institute/settings/general' },
];

const BILLING_TABS: InstituteSubTab[] = [
  { label: 'Current Plan & Usage', href: '/institute/billing' },
  { label: 'Invoices & Payments', href: '/institute/billing/invoices' },
  { label: 'Upgrade Plan', href: '/institute/billing/upgrade' },
];

const SUPPORT_TABS: InstituteSubTab[] = [
  { label: 'Support Tickets', href: '/institute/support' },
  { label: 'Help Center & Guides', href: '/institute/support/guides' },
];

const MODULE_LIST: InstituteModuleConfig[] = [
  // ─── 2. Student Management ───────────────────────────────────
  {
    route: '/institute/students',
    moduleNumber: 2,
    parentModule: 'Student Management',
    title: 'Student Management',
    description: 'Track walk-in & online enquiries, convert admissions, and manage student profiles across courses, coaching batches, or school classes.',
    primaryActionLabel: 'New Admission',
    searchPlaceholder: 'Search students by name, roll no, or course...',
    tabs: STUDENT_TABS,
    stats: [
      { title: 'Active Students', value: '1,248', tone: 'primary', trend: '+8.4%', compareLabel: 'vs last month' },
      { title: 'New Enquiries (MTD)', value: '164', tone: 'info', trend: '+14.2%', compareLabel: 'vs last month' },
      { title: 'Admissions Confirmed', value: '92', tone: 'success', trend: '56.1%', compareLabel: 'conversion rate' },
      { title: 'Pending Follow-ups', value: '27', tone: 'warning', trend: 'Due today', trendDirection: 'neutral' },
    ],
    columns: ['Student / Lead', 'Program / Class', 'Batch / Section', 'Joined / Stage'],
    rows: [
      { id: 'STU-1042', primary: 'Aarav Sharma', secondary: '+91 98765 43210', col2: 'Full Stack Web Dev', col3: 'Morning Lab B1', col4: 'Enrolled · Paid', status: 'active' },
      { id: 'STU-1041', primary: 'Ananya Verma', secondary: '+91 98112 34901', col2: 'JEE Target 2027', col3: 'Alpha Coaching A2', col4: 'Counseling Follow-up', status: 'pending' },
      { id: 'STU-1040', primary: 'Rohan Kulkarni', secondary: '+91 99201 77412', col2: 'Class 10 (CBSE)', col3: 'Section A', col4: 'Enrolled · Verified', status: 'active' },
      { id: 'STU-1039', primary: 'Priya Nair', secondary: '+91 97654 21809', col2: 'ADCA + Tally Prime', col3: 'Evening Batch E1', col4: 'Fee Pending', status: 'unpaid' },
    ],
  },
  {
    route: '/institute/students/enquiries',
    moduleNumber: 2,
    parentModule: 'Student Management',
    title: 'Enquiries & Leads',
    description: 'Capture phone, walk-in, website, and WhatsApp enquiries for computer courses, coaching programs, and school admissions.',
    primaryActionLabel: 'Add Enquiry',
    searchPlaceholder: 'Search leads by name, phone, or source...',
    tabs: STUDENT_TABS,
    stats: [
      { title: 'Total Open Leads', value: '164', tone: 'info', trend: '+18', compareLabel: 'this week' },
      { title: 'Hot Demo Scheduled', value: '38', tone: 'primary' },
      { title: 'Converted to Admission', value: '92', tone: 'success', trend: '56%', compareLabel: 'conversion' },
      { title: 'Follow-ups Overdue', value: '11', tone: 'warning' },
    ],
    columns: ['Lead Name', 'Interested Program', 'Source / Counselor', 'Next Follow-up'],
    rows: [
      { id: 'ENQ-409', primary: 'Karan Mehta', secondary: '+91 98204 55110', col2: 'Python & Data Science', col3: 'Walk-in · Neha', col4: 'Today, 04:00 PM', status: 'in_progress' },
      { id: 'ENQ-408', primary: 'Sanya Gupta', secondary: '+91 99812 11920', col2: 'NEET Dropper Batch', col3: 'Instagram Ad · Amit', col4: 'Converted to STU-1045', status: 'converted' },
      { id: 'ENQ-407', primary: 'Vivaan Joshi', secondary: '+91 97123 88012', col2: 'Class 8 Admission', col3: 'Parent Referral · Ritu', col4: 'Tomorrow, 11:00 AM', status: 'pending' },
    ],
  },
  {
    route: '/institute/students/admissions',
    moduleNumber: 2,
    parentModule: 'Student Management',
    title: 'Admissions & Enrollment',
    description: 'Review admission forms, verify IDs/documents, assign roll numbers, and allocate batches or class sections.',
    primaryActionLabel: 'New Admission Form',
    searchPlaceholder: 'Search admissions by application ID or student...',
    tabs: STUDENT_TABS,
    stats: [
      { title: 'Admissions This Month', value: '92', tone: 'success', trend: '+12%', compareLabel: 'vs last month' },
      { title: 'Document Verification', value: '14', tone: 'warning' },
      { title: 'ID Cards Generated', value: '78', tone: 'primary' },
      { title: 'Cancelled / Dropped', value: '3', tone: 'danger' },
    ],
    columns: ['Applicant', 'Course / Grade', 'Allocated Batch / Section', 'Fee Receipt'],
    rows: [
      { id: 'ADM-882', primary: 'Sneha Patel', secondary: 'Roll No: 26088', col2: 'Tally Prime + GST', col3: 'Afternoon Batch A1', col4: 'REC-2026-882', status: 'completed' },
      { id: 'ADM-881', primary: 'Aditya Rao', secondary: 'Roll No: 26087', col2: 'CUET Coaching', col3: 'Morning Batch M2', col4: 'Docs Pending', status: 'pending' },
      { id: 'ADM-880', primary: 'Meera Iyer', secondary: 'Roll No: 26086', col2: 'Class 12 Science', col3: 'Section B', col4: 'REC-2026-880', status: 'active' },
    ],
  },
  {
    route: '/institute/students/directory',
    moduleNumber: 2,
    parentModule: 'Student Management',
    title: 'Students Directory',
    description: 'Complete master directory of active, completed, and alumni students with guardian contacts and fee standing.',
    primaryActionLabel: 'Export Directory',
    searchPlaceholder: 'Search roll number, name, phone, or guardian...',
    tabs: STUDENT_TABS,
    stats: [
      { title: 'Active Students', value: '1,248', tone: 'primary' },
      { title: 'Fees Up-to-Date', value: '1,106', tone: 'success' },
      { title: 'Dues Pending', value: '142', tone: 'warning' },
      { title: 'Course Completed / Alumni', value: '410', tone: 'neutral' },
    ],
    columns: ['Student', 'Roll / Reg No.', 'Course / Class', 'Attendance'],
    rows: [
      { id: 'STU-1042', primary: 'Aarav Sharma', secondary: 'aarav.s@student.in', col2: 'CMP-2026-1042', col3: 'Full Stack Web Dev', col4: '94% Present', status: 'active' },
      { id: 'STU-1038', primary: 'Ishaan Verma', secondary: 'Parent: +91 98100 22334', col2: 'SCH-2026-0814', col3: 'Class 9 · Sec B', col4: '91% Present', status: 'active' },
      { id: 'STU-0985', primary: 'Neha Singh', secondary: 'neha.s@student.in', col2: 'COACH-2025-412', col3: 'SSC CGL Foundation', col4: 'Batch Completed', status: 'completed' },
    ],
  },

  // ─── 3. Academic Management ──────────────────────────────────
  {
    route: '/institute/academics',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Academic Management',
    description: 'Organize computer courses, coaching programs, school classes & sections, syllabus modules, timetables, and exams in one place.',
    primaryActionLabel: 'Create Batch / Class',
    searchPlaceholder: 'Search courses, batches, or classes...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Courses & Grades', value: '18', tone: 'primary' },
      { title: 'Running Batches / Classes', value: '34', tone: 'info' },
      { title: 'Today’s Scheduled Classes', value: '26', tone: 'success' },
      { title: 'Upcoming Exams / Tests', value: '6', tone: 'warning' },
    ],
    columns: ['Batch / Class', 'Course / Program', 'Faculty / Teacher', 'Timing & Room'],
    rows: [
      { id: 'BAT-201', primary: 'Web Dev Batch B1', secondary: 'Computer Lab 2', col2: 'Full Stack MERN (6M)', col3: 'Rahul Sir', col4: '09:00 AM - 11:00 AM', status: 'active' },
      { id: 'BAT-202', primary: 'JEE Alpha Morning', secondary: 'Hall A · 48 Seats', col2: 'IIT-JEE 2-Year', col3: 'Dr. Verma', col4: '07:30 AM - 10:30 AM', status: 'active' },
      { id: 'CLS-10A', primary: 'Class 10 - Section A', secondary: 'Room 104 · 42 Students', col2: 'CBSE Secondary', col3: 'Mrs. Deshmukh', col4: '08:00 AM - 01:30 PM', status: 'active' },
    ],
  },
  {
    route: '/institute/academics/courses',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Courses & Programs',
    description: 'Configure certificate courses, coaching test programs, or school grade tracks with duration and syllabus.',
    primaryActionLabel: 'Add Course / Program',
    searchPlaceholder: 'Search courses or grade programs...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Active Programs', value: '18', tone: 'primary' },
      { title: 'Computer Courses', value: '8', tone: 'info' },
      { title: 'Coaching / Test Tracks', value: '6', tone: 'success' },
      { title: 'Archived Courses', value: '4', tone: 'neutral' },
    ],
    columns: ['Course / Program', 'Category', 'Duration', 'Enrolled'],
    rows: [
      { id: 'CRS-01', primary: 'ADCA + Tally Prime', secondary: 'Lab + Practical Certificate', col2: 'Computer Institute', col3: '12 Months', col4: '185 Students', status: 'active' },
      { id: 'CRS-02', primary: 'NEET UG Target 2027', secondary: 'Physics, Chem, Bio', col2: 'Coaching Center', col3: '1 Year', col4: '240 Students', status: 'active' },
      { id: 'CRS-03', primary: 'Grade 1 to 12 CBSE', secondary: 'Academic Session 2026-27', col2: 'School', col3: 'Annual', col4: '620 Students', status: 'active' },
    ],
  },
  {
    route: '/institute/academics/batches',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Batches & Classes',
    description: 'Manage batch capacities, classroom/lab assignments, class teachers, and shift timings.',
    primaryActionLabel: 'New Batch / Section',
    searchPlaceholder: 'Search batches, sections, or teachers...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Active Batches / Sections', value: '34', tone: 'primary' },
      { title: 'Seat Utilization', value: '86%', tone: 'success' },
      { title: 'Waitlisted / Near Full', value: '5', tone: 'warning' },
      { title: 'Upcoming Batches', value: '3', tone: 'info' },
    ],
    columns: ['Batch / Section', 'Lead Faculty', 'Capacity', 'Schedule'],
    rows: [
      { id: 'BAT-201', primary: 'Morning Python Lab', secondary: 'Lab 1 · Floor 2', col2: 'Siddharth Rao', col3: '28 / 30 Seats', col4: 'Mon - Fri · 08:30 AM', status: 'active' },
      { id: 'BAT-204', primary: 'SSC Evening Target', secondary: 'Room 202', col2: 'Ankit Tiwari', col3: '52 / 60 Seats', col4: 'Mon - Sat · 05:00 PM', status: 'active' },
      { id: 'BAT-209', primary: 'Class 8 - Section A', secondary: 'Main Wing', col2: 'Pooja Nair', col3: '38 / 40 Seats', col4: 'Daily · 08:00 AM', status: 'upcoming' },
    ],
  },
  {
    route: '/institute/academics/subjects',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Subjects & Syllabus',
    description: 'Track chapters, lab assignments, and syllabus completion percentage per batch or class.',
    primaryActionLabel: 'Add Subject / Module',
    searchPlaceholder: 'Search subject, module code, or teacher...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Total Subjects / Modules', value: '42', tone: 'primary' },
      { title: 'Avg Syllabus Progress', value: '68%', tone: 'info' },
      { title: 'Modules Completed', value: '19', tone: 'success' },
      { title: 'Behind Schedule', value: '4', tone: 'warning' },
    ],
    columns: ['Subject / Module', 'Linked Program', 'Assigned Faculty', 'Completion'],
    rows: [
      { id: 'SUB-11', primary: 'React & Next.js Mastery', secondary: '16 Practical Labs', col2: 'Full Stack Web Dev', col3: 'Rahul Sir', col4: '75% Complete', status: 'in_progress' },
      { id: 'SUB-12', primary: 'Organic Chemistry', secondary: '22 Units', col2: 'NEET / JEE Coaching', col3: 'Dr. Saxena', col4: '64% Complete', status: 'in_progress' },
      { id: 'SUB-13', primary: 'Mathematics (Standard)', secondary: 'NCERT + Lab Work', col2: 'Class 10 CBSE', col3: 'Mrs. Deshmukh', col4: '82% Complete', status: 'active' },
    ],
  },
  {
    route: '/institute/academics/timetable',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Timetable & Schedule',
    description: 'Weekly class, lab slot, and faculty timetable across rooms and batches with clash detection.',
    primaryActionLabel: 'Schedule Slot',
    searchPlaceholder: 'Search timetable by room, teacher, or batch...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Weekly Sessions', value: '148', tone: 'primary' },
      { title: 'Today’s Classes', value: '26', tone: 'info' },
      { title: 'Labs / Rooms Utilized', value: '12 / 14', tone: 'success' },
      { title: 'Schedule Conflicts', value: '0', tone: 'neutral' },
    ],
    columns: ['Time Slot', 'Batch / Class', 'Subject & Faculty', 'Room / Lab'],
    rows: [
      { id: 'SLT-01', primary: '08:00 AM - 09:00 AM', secondary: 'Mon, Wed, Fri', col2: 'Class 10 - Sec A', col3: 'Mathematics · Mrs. Deshmukh', col4: 'Room 104', status: 'active' },
      { id: 'SLT-02', primary: '09:30 AM - 11:30 AM', secondary: 'Daily Practical', col2: 'Web Dev Batch B1', col3: 'JavaScript Lab · Rahul Sir', col4: 'Computer Lab 2', status: 'active' },
      { id: 'SLT-03', primary: '04:30 PM - 06:30 PM', secondary: 'Tue, Thu, Sat', col2: 'JEE Alpha Evening', col3: 'Physics · Prof. Kulkarni', col4: 'Hall A', status: 'upcoming' },
    ],
  },
  {
    route: '/institute/academics/exams',
    moduleNumber: 3,
    parentModule: 'Academic Management',
    title: 'Exams & Results',
    description: 'Schedule weekly coaching tests, computer practical assessments, and school term exams with report cards.',
    primaryActionLabel: 'Schedule Exam',
    searchPlaceholder: 'Search exams, tests, or batch results...',
    tabs: ACADEMIC_TABS,
    stats: [
      { title: 'Scheduled Exams', value: '6', tone: 'info' },
      { title: 'Results Published', value: '28', tone: 'success' },
      { title: 'Average Pass Rate', value: '91.5%', tone: 'primary' },
      { title: 'Evaluation Pending', value: '2', tone: 'warning' },
    ],
    columns: ['Exam / Assessment', 'Batch / Class', 'Exam Date', 'Pass / Avg'],
    rows: [
      { id: 'EXM-304', primary: 'Sunday Major Mock Test #12', secondary: 'OMR / CBT Format', col2: 'JEE Target Batch', col3: '29 Nov 2026', col4: 'Scheduled', status: 'upcoming' },
      { id: 'EXM-303', primary: 'Tally GST Practical Exam', secondary: 'Lab Assessment · 100M', col2: 'ADCA Evening E1', col3: '21 Nov 2026', col4: '89% Passed', status: 'completed' },
      { id: 'EXM-302', primary: 'Half-Yearly Mathematics', secondary: 'Written · 80M', col2: 'Class 10 Sec A', col3: '18 Nov 2026', col4: 'Evaluation Open', status: 'in_progress' },
    ],
  },

  // ─── 4. Attendance Management ────────────────────────────────
  {
    route: '/institute/attendance',
    moduleNumber: 4,
    parentModule: 'Attendance Management',
    title: 'Attendance Management',
    description: 'Daily student & staff attendance tracking via web register, biometric sync, or QR check-in with instant parent alerts.',
    primaryActionLabel: 'Mark Attendance',
    searchPlaceholder: 'Search batch attendance or staff logs...',
    tabs: ATTENDANCE_TABS,
    stats: [
      { title: 'Student Attendance Today', value: '92.4%', tone: 'success', trend: '+1.8%', compareLabel: 'vs yesterday' },
      { title: 'Staff Present Today', value: '44 / 46', tone: 'primary' },
      { title: 'Unmarked Batches', value: '2', tone: 'warning' },
      { title: 'Pending Leave Requests', value: '5', tone: 'info' },
    ],
    columns: ['Batch / Department', 'Marked By', 'Present / Total', 'Alert Status'],
    rows: [
      { id: 'ATT-81', primary: 'Class 10 - Section A', secondary: '08:15 AM Register', col2: 'Mrs. Deshmukh', col3: '40 / 42 (95%)', col4: '2 Absent SMS Sent', status: 'completed' },
      { id: 'ATT-82', primary: 'Web Dev Batch B1', secondary: 'Lab QR Check-in', col2: 'Rahul Sir', col3: '26 / 28 (93%)', col4: 'Marked on Time', status: 'active' },
      { id: 'ATT-83', primary: 'NEET Afternoon Batch', secondary: 'Scheduled 02:00 PM', col2: 'Pending', col3: '0 / 54', col4: 'Awaiting Register', status: 'pending' },
    ],
  },
  {
    route: '/institute/attendance/students',
    moduleNumber: 4,
    parentModule: 'Attendance Management',
    title: 'Student Attendance Register',
    description: 'Batch-wise and class-wise daily register with automatic absent notifications on WhatsApp or SMS.',
    primaryActionLabel: 'Take Today’s Roll Call',
    searchPlaceholder: 'Filter by student, batch, or roll number...',
    tabs: ATTENDANCE_TABS,
    stats: [
      { title: 'Present Today', value: '1,153', tone: 'success' },
      { title: 'Absent Today', value: '74', tone: 'danger' },
      { title: 'On Approved Leave', value: '21', tone: 'warning' },
      { title: 'Monthly Avg Rate', value: '91.8%', tone: 'primary' },
    ],
    columns: ['Student', 'Batch / Class', 'Check-in Time', 'Today Status'],
    rows: [
      { id: 'STU-1042', primary: 'Aarav Sharma', secondary: 'Roll #1042', col2: 'Web Dev Batch B1', col3: '08:57 AM', col4: 'Present', status: 'active' },
      { id: 'STU-1041', primary: 'Ananya Verma', secondary: 'Roll #1041', col2: 'JEE Alpha A2', col3: '—', col4: 'Absent · Notified', status: 'failed' },
      { id: 'STU-1040', primary: 'Rohan Kulkarni', secondary: 'Roll #1040', col2: 'Class 10 Sec A', col3: '07:54 AM', col4: 'Present', status: 'active' },
    ],
  },
  {
    route: '/institute/attendance/staff',
    moduleNumber: 4,
    parentModule: 'Attendance Management',
    title: 'Staff & Faculty Attendance',
    description: 'Track faculty check-in/out times, lecture logs, half-days, and monthly payroll attendance summaries.',
    primaryActionLabel: 'Mark Staff Check-in',
    searchPlaceholder: 'Search teacher or staff name...',
    tabs: ATTENDANCE_TABS,
    stats: [
      { title: 'Present Staff', value: '44', tone: 'success' },
      { title: 'Late Arrivals', value: '3', tone: 'warning' },
      { title: 'On Leave', value: '2', tone: 'info' },
      { title: 'Avg Punctuality', value: '96.2%', tone: 'primary' },
    ],
    columns: ['Staff Member', 'Role / Department', 'Punch In / Out', 'Status'],
    rows: [
      { id: 'EMP-102', primary: 'Rahul Deshpande', secondary: 'Computer Faculty', col2: 'Web & Python Dept', col3: '08:42 AM - Active', col4: 'On Time', status: 'active' },
      { id: 'EMP-108', primary: 'Dr. Kavita Saxena', secondary: 'Senior Lecturer', col2: 'Coaching Science', col3: '07:20 AM - Active', col4: 'On Time', status: 'active' },
      { id: 'EMP-114', primary: 'Manoj Tiwari', secondary: 'Front Desk Counselor', col2: 'Admissions', col3: 'Leave Approved', col4: 'Casual Leave', status: 'pending' },
    ],
  },
  {
    route: '/institute/attendance/leaves',
    moduleNumber: 4,
    parentModule: 'Attendance Management',
    title: 'Leave Requests',
    description: 'Approve or decline student and staff leave applications with parent/manager history.',
    primaryActionLabel: 'Log Leave Request',
    searchPlaceholder: 'Search leave requests...',
    tabs: ATTENDANCE_TABS,
    stats: [
      { title: 'Pending Approvals', value: '5', tone: 'warning' },
      { title: 'Approved This Month', value: '29', tone: 'success' },
      { title: 'Rejected', value: '3', tone: 'danger' },
      { title: 'Staff Leaves', value: '7', tone: 'info' },
    ],
    columns: ['Applicant', 'Category', 'Duration', 'Reason'],
    rows: [
      { id: 'LEV-210', primary: 'Manoj Tiwari', secondary: 'Staff · Admissions', col2: 'Casual Leave', col3: '25 Nov - 26 Nov', col4: 'Family event', status: 'pending' },
      { id: 'LEV-209', primary: 'Riya Chatterjee', secondary: 'Student · Class 10 A', col2: 'Medical Leave', col3: '24 Nov - 25 Nov', col4: 'Fever (Parent note)', status: 'resolved' },
    ],
  },

  // ─── 5. Finance Management ───────────────────────────────────
  {
    route: '/institute/finance',
    moduleNumber: 5,
    parentModule: 'Finance Management',
    title: 'Finance Management',
    description: 'Manage course & school fee plans, collect installments, issue GST/non-GST receipts, track expenses, and run staff payroll.',
    primaryActionLabel: 'Collect Fee',
    searchPlaceholder: 'Search fee receipts, expenses, or students...',
    tabs: FINANCE_TABS,
    stats: [
      { title: 'Fee Collected (MTD)', value: '₹14,82,500', tone: 'success', trend: '+16.4%', compareLabel: 'vs last month' },
      { title: 'Pending Installments', value: '₹3,24,000', tone: 'warning', trend: '68 students', trendDirection: 'neutral' },
      { title: 'Operating Expenses', value: '₹4,12,000', tone: 'info' },
      { title: 'Overdue Dues (>15d)', value: '₹78,500', tone: 'danger' },
    ],
    columns: ['Transaction / Student', 'Category / Course', 'Amount & Mode', 'Date'],
    rows: [
      { id: 'FEE-9041', primary: 'Aarav Sharma', secondary: 'Installment 2 of 3', col2: 'Full Stack Web Dev', col3: '₹12,000 · UPI', col4: '25 Nov 2026', status: 'paid' },
      { id: 'FEE-9040', primary: 'Priya Nair', secondary: 'Installment 1 Overdue', col2: 'ADCA + Tally Prime', col3: '₹6,500 · Due', col4: 'Due 12 Nov 2026', status: 'overdue' },
      { id: 'EXP-412', primary: 'Lab Hardware Upgrade', secondary: 'Vendor: TechZone', col2: 'Infrastructure Expense', col3: '₹42,000 · NEFT', col4: '23 Nov 2026', status: 'completed' },
    ],
  },
  {
    route: '/institute/finance/fee-structures',
    moduleNumber: 5,
    parentModule: 'Finance Management',
    title: 'Fee Structures',
    description: 'Define lump-sum, monthly, quarterly, or custom installment fee templates per course, coaching batch, or school class.',
    primaryActionLabel: 'Create Fee Structure',
    searchPlaceholder: 'Search fee plans by course or class...',
    tabs: FINANCE_TABS,
    stats: [
      { title: 'Active Fee Templates', value: '16', tone: 'primary' },
      { title: 'Installment Plans', value: '11', tone: 'info' },
      { title: 'Scholarship Discounts', value: '4', tone: 'success' },
      { title: 'Late Fee Rules', value: '3', tone: 'warning' },
    ],
    columns: ['Fee Plan Name', 'Program / Class', 'Total Fee', 'Schedule Type'],
    rows: [
      { id: 'FP-01', primary: 'Full Stack Standard Plan', secondary: 'Includes Exam & Cert', col2: 'Full Stack Web Dev', col3: '₹36,000', col4: '3 Monthly Installments', status: 'active' },
      { id: 'FP-02', primary: 'JEE Annual Tuition', secondary: 'Study Material Included', col2: 'JEE Target Batch', col3: '₹84,000', col4: 'Quarterly (4 Terms)', status: 'active' },
      { id: 'FP-03', primary: 'Secondary Tuition Fee', secondary: 'Tuition + Lab + Transport Opt', col2: 'Class 9 & 10', col3: '₹48,000 / yr', col4: 'Monthly Billing', status: 'active' },
    ],
  },
  {
    route: '/institute/finance/collections',
    moduleNumber: 5,
    parentModule: 'Finance Management',
    title: 'Fee Collection & Receipts',
    description: 'Collect cash, UPI, card, or bank transfer fees and send instant PDF receipts on WhatsApp.',
    primaryActionLabel: 'Record Payment',
    searchPlaceholder: 'Search receipt no, student name, or phone...',
    tabs: FINANCE_TABS,
    stats: [
      { title: 'Collected Today', value: '₹1,45,000', tone: 'success' },
      { title: 'UPI / Online Share', value: '74%', tone: 'info' },
      { title: 'Due This Week', value: '₹1,18,000', tone: 'warning' },
      { title: 'Bounced / Failed', value: '2', tone: 'danger' },
    ],
    columns: ['Receipt / Student', 'Program', 'Amount & Mode', 'Due / Paid'],
    rows: [
      { id: 'REC-5120', primary: 'Rohan Kulkarni', secondary: 'Term 3 Fee', col2: 'Class 10 Sec A', col3: '₹4,200 · Razorpay UPI', col4: 'Paid Today', status: 'paid' },
      { id: 'DUE-1104', primary: 'Deepak Yadav', secondary: 'Installment #2', col2: 'SSC Coaching B1', col3: '₹7,500 · Pending', col4: 'Reminder Sent', status: 'unpaid' },
    ],
  },
  {
    route: '/institute/finance/expenses',
    moduleNumber: 5,
    parentModule: 'Finance Management',
    title: 'Institute Expenses',
    description: 'Track rent, internet, lab maintenance, printing, electricity, and marketing ad spend.',
    primaryActionLabel: 'Add Expense',
    searchPlaceholder: 'Search expenses by category or vendor...',
    tabs: FINANCE_TABS,
    stats: [
      { title: 'Expenses (MTD)', value: '₹4,12,000', tone: 'info' },
      { title: 'Rent & Utilities', value: '₹1,85,000', tone: 'neutral' },
      { title: 'Pending Bills', value: '₹34,500', tone: 'warning' },
      { title: 'Marketing & Ads', value: '₹62,000', tone: 'primary' },
    ],
    columns: ['Expense Item', 'Category', 'Amount', 'Logged Date'],
    rows: [
      { id: 'EXP-412', primary: '10 New Lab Keyboards & SSDs', secondary: 'TechZone Distributors', col2: 'Lab Equipment', col3: '₹42,000', col4: '23 Nov 2026', status: 'paid' },
      { id: 'EXP-411', primary: 'Study Module Printing (Batch B)', secondary: 'PrintHub', col2: 'Printing & Material', col3: '₹28,500', col4: '20 Nov 2026', status: 'pending' },
    ],
  },
  {
    route: '/institute/finance/payroll',
    moduleNumber: 5,
    parentModule: 'Finance Management',
    title: 'Payroll & Faculty Payouts',
    description: 'Process fixed monthly salaries and per-hour / per-batch lecture payouts for teachers and staff.',
    primaryActionLabel: 'Run Payroll',
    searchPlaceholder: 'Search staff salary slips...',
    tabs: FINANCE_TABS,
    stats: [
      { title: 'Monthly Payroll Total', value: '₹6,85,000', tone: 'primary' },
      { title: 'Disbursed', value: '₹5,90,000', tone: 'success' },
      { title: 'Pending Approvals', value: '₹95,000', tone: 'warning' },
      { title: 'Visiting Faculty Payouts', value: '12 Staff', tone: 'info' },
    ],
    columns: ['Staff Member', 'Pay Model', 'Net Payable', 'Pay Cycle'],
    rows: [
      { id: 'PAY-201', primary: 'Rahul Deshpande', secondary: 'Full Stack Faculty', col2: 'Fixed + Lab Bonus', col3: '₹58,000', col4: 'Nov 2026', status: 'paid' },
      { id: 'PAY-202', primary: 'Prof. S. Kulkarni', secondary: 'Visiting JEE Physics', col2: 'Per Lecture (38 hrs)', col3: '₹45,600', col4: 'Nov 2026', status: 'pending' },
    ],
  },

  // ─── 6. Staff Management ─────────────────────────────────────
  {
    route: '/institute/staff',
    moduleNumber: 6,
    parentModule: 'Staff Management',
    title: 'Staff Management',
    description: 'Manage teachers, computer lab trainers, visiting coaching faculty, counselors, and administrative staff.',
    primaryActionLabel: 'Add Staff Member',
    searchPlaceholder: 'Search teachers, staff, or department...',
    tabs: STAFF_TABS,
    stats: [
      { title: 'Total Staff', value: '46', tone: 'primary' },
      { title: 'Teachers & Trainers', value: '31', tone: 'info' },
      { title: 'Active Today', value: '44', tone: 'success' },
      { title: 'On Leave / Notice', value: '2', tone: 'warning' },
    ],
    columns: ['Name & Contact', 'Designation', 'Assigned Batches / Dept', 'Joining'],
    rows: [
      { id: 'EMP-102', primary: 'Rahul Deshpande', secondary: 'rahul@institute.edu', col2: 'Senior Tech Trainer', col3: 'Web Dev · 4 Batches', col4: '14 Mar 2023', status: 'active' },
      { id: 'EMP-108', primary: 'Dr. Kavita Saxena', secondary: 'kavita@institute.edu', col2: 'HOD Chemistry', col3: 'JEE & NEET Batches', col4: '02 Jun 2022', status: 'active' },
      { id: 'EMP-119', primary: 'Mrs. Priya Deshmukh', secondary: 'priya@institute.edu', col2: 'Class Teacher', col3: 'Class 10 · Mathematics', col4: '10 Jul 2021', status: 'active' },
    ],
  },
  {
    route: '/institute/staff/teachers',
    moduleNumber: 6,
    parentModule: 'Staff Management',
    title: 'Teachers & Faculty',
    description: 'Manage full-time and visiting instructors, subject specializations, and weekly teaching load.',
    primaryActionLabel: 'Add Teacher / Trainer',
    searchPlaceholder: 'Search faculty by subject or name...',
    tabs: STAFF_TABS,
    stats: [
      { title: 'Total Faculty', value: '31', tone: 'primary' },
      { title: 'Full-Time', value: '22', tone: 'success' },
      { title: 'Visiting / Hourly', value: '9', tone: 'info' },
      { title: 'Weekly Load Avg', value: '22 hrs', tone: 'neutral' },
    ],
    columns: ['Faculty Name', 'Specialization', 'Weekly Load', 'Availability'],
    rows: [
      { id: 'FAC-01', primary: 'Rahul Deshpande', secondary: 'MERN, Python, SQL', col2: 'Computer & IT', col3: '24 hrs / wk', col4: 'Active', status: 'active' },
      { id: 'FAC-02', primary: 'Prof. S. Kulkarni', secondary: 'Mechanics & Optics', col2: 'JEE Physics', col3: '14 hrs / wk', col4: 'Visiting', status: 'info' },
    ],
  },
  {
    route: '/institute/staff/members',
    moduleNumber: 6,
    parentModule: 'Staff Management',
    title: 'Non-Teaching & Support Staff',
    description: 'Admission counselors, lab assistants, accountants, reception, and transport coordinators.',
    primaryActionLabel: 'Add Support Staff',
    searchPlaceholder: 'Search counselors, accountants, or lab staff...',
    tabs: STAFF_TABS,
    stats: [
      { title: 'Support Staff', value: '15', tone: 'primary' },
      { title: 'Counselors', value: '5', tone: 'info' },
      { title: 'Lab & Ops', value: '6', tone: 'success' },
      { title: 'Accounts & Admin', value: '4', tone: 'neutral' },
    ],
    columns: ['Staff Member', 'Department', 'Shift', 'Status'],
    rows: [
      { id: 'STF-31', primary: 'Neha Kapoor', secondary: 'Admission Desk', col2: 'Counseling & Leads', col3: '09:30 AM - 06:30 PM', col4: 'Active', status: 'active' },
      { id: 'STF-32', primary: 'Suresh Nair', secondary: 'Accounts', col2: 'Fees & GST Filing', col3: '09:00 AM - 06:00 PM', col4: 'Active', status: 'active' },
    ],
  },
  {
    route: '/institute/staff/departments',
    moduleNumber: 6,
    parentModule: 'Staff Management',
    title: 'Departments & Roles',
    description: 'Organize academic and operational teams across departments and assign department heads.',
    primaryActionLabel: 'Create Department',
    searchPlaceholder: 'Search departments...',
    tabs: STAFF_TABS,
    stats: [
      { title: 'Departments', value: '6', tone: 'primary' },
      { title: 'Assigned HODs', value: '6', tone: 'success' },
      { title: 'Total Staff Mapped', value: '46', tone: 'info' },
    ],
    columns: ['Department', 'Head of Dept', 'Team Size', 'Status'],
    rows: [
      { id: 'DEP-01', primary: 'Software & Computer Labs', secondary: 'IT & Skill Courses', col2: 'Rahul Deshpande', col3: '11 Members', col4: 'Active', status: 'active' },
      { id: 'DEP-02', primary: 'Science & Competitive Coaching', secondary: 'JEE, NEET & CUET', col2: 'Dr. Kavita Saxena', col3: '14 Members', col4: 'Active', status: 'active' },
    ],
  },

  // ─── 7. Communication ────────────────────────────────────────
  {
    route: '/institute/communication',
    moduleNumber: 7,
    parentModule: 'Communication',
    title: 'Communication Center',
    description: 'Send WhatsApp fee reminders, absent alerts, exam schedules, and campus notices to students and parents.',
    primaryActionLabel: 'New Broadcast',
    searchPlaceholder: 'Search broadcasts, notices, or templates...',
    tabs: COMMUNICATION_TABS,
    stats: [
      { title: 'Messages Sent (MTD)', value: '12,480', tone: 'primary', trend: '+22%', compareLabel: 'delivery rate 98.4%' },
      { title: 'WhatsApp Delivered', value: '9,840', tone: 'success' },
      { title: 'Scheduled Notices', value: '4', tone: 'info' },
      { title: 'Failed Deliveries', value: '19', tone: 'danger' },
    ],
    columns: ['Campaign / Notice', 'Channel', 'Audience', 'Sent / Result'],
    rows: [
      { id: 'MSG-704', primary: 'November Fee Due Reminder', secondary: 'Automated Installment Alert', col2: 'WhatsApp Official', col3: '142 Students/Parents', col4: '99% Delivered', status: 'completed' },
      { id: 'MSG-703', primary: 'Winter Practical Exam Timetable', secondary: 'Notice + PDF Attached', col2: 'WhatsApp + App Push', col3: 'All Computer Batches', col4: 'Delivered', status: 'active' },
      { id: 'MSG-702', primary: 'Parent-Teacher Meeting Invite', secondary: 'Saturday 10 AM', col2: 'SMS + Notice Board', col3: 'Classes 8 to 12', col4: 'Scheduled Tomorrow', status: 'upcoming' },
    ],
  },
  {
    route: '/institute/communication/whatsapp',
    moduleNumber: 7,
    parentModule: 'Communication',
    title: 'WhatsApp Broadcasts',
    description: 'Approved WhatsApp Business broadcasts for admissions follow-up, fee links, and attendance alerts.',
    primaryActionLabel: 'Send WhatsApp Broadcast',
    searchPlaceholder: 'Search WhatsApp campaigns...',
    tabs: COMMUNICATION_TABS,
    stats: [
      { title: 'WhatsApp Credits', value: '18,200', tone: 'primary' },
      { title: 'Read Rate', value: '87.4%', tone: 'success' },
      { title: 'Active Automations', value: '6', tone: 'info' },
    ],
    columns: ['Campaign Title', 'Template', 'Recipients', 'Delivery'],
    rows: [
      { id: 'WA-210', primary: 'Fee Payment Link Reminder', secondary: 'With Razorpay QR Link', col2: 'fee_reminder_v2', col3: '142 Parents', col4: '140 Delivered', status: 'completed' },
      { id: 'WA-209', primary: 'New Python Batch Demo Invite', secondary: 'Open Leads', col2: 'demo_invite_std', col3: '64 Leads', col4: '61 Delivered', status: 'active' },
    ],
  },
  {
    route: '/institute/communication/notices',
    moduleNumber: 7,
    parentModule: 'Communication',
    title: 'Notice Board & Alerts',
    description: 'Publish holiday announcements, exam circulars, and emergency campus updates.',
    primaryActionLabel: 'Publish Notice',
    searchPlaceholder: 'Search notices or circulars...',
    tabs: COMMUNICATION_TABS,
    stats: [
      { title: 'Active Notices', value: '8', tone: 'primary' },
      { title: 'Scheduled', value: '3', tone: 'info' },
      { title: 'Pinned Announcements', value: '2', tone: 'warning' },
    ],
    columns: ['Notice Title', 'Target Group', 'Published On', 'Visibility'],
    rows: [
      { id: 'NTC-51', primary: 'Annual Tech Fest & Project Expo', secondary: 'Registrations Open', col2: 'All Students & Faculty', col3: '24 Nov 2026', col4: 'Pinned', status: 'active' },
      { id: 'NTC-50', primary: 'Pre-Board Exam Guidelines', secondary: 'Hall Ticket Required', col2: 'Class 10 & 12', col3: '20 Nov 2026', col4: 'Published', status: 'completed' },
    ],
  },
  {
    route: '/institute/communication/templates',
    moduleNumber: 7,
    parentModule: 'Communication',
    title: 'Message Templates',
    description: 'Manage reusable WhatsApp, SMS, and email templates with dynamic student, batch, and fee variables.',
    primaryActionLabel: 'Create Template',
    searchPlaceholder: 'Search templates...',
    tabs: COMMUNICATION_TABS,
    stats: [
      { title: 'Approved Templates', value: '14', tone: 'success' },
      { title: 'Pending Meta Review', value: '2', tone: 'warning' },
      { title: 'Total Variables Supported', value: '18', tone: 'info' },
    ],
    columns: ['Template Name', 'Channel', 'Use Case', 'Approval'],
    rows: [
      { id: 'TPL-01', primary: 'fee_receipt_confirmation', secondary: 'Includes {{amount}}, {{receipt_no}}', col2: 'WhatsApp', col3: 'Instant Receipt', col4: 'Approved', status: 'active' },
      { id: 'TPL-02', primary: 'absent_parent_alert', secondary: 'Includes {{student}}, {{date}}', col2: 'WhatsApp / SMS', col3: 'Attendance Alert', col4: 'Approved', status: 'active' },
    ],
  },

  // ─── 8. Reports & Analytics ──────────────────────────────────
  {
    route: '/institute/reports',
    moduleNumber: 8,
    parentModule: 'Reports & Analytics',
    title: 'Reports & Analytics',
    description: 'Actionable performance insights across admissions conversions, monthly fee collections, batch profitability, and attendance.',
    primaryActionLabel: 'Export Report (PDF/CSV)',
    searchPlaceholder: 'Search saved reports...',
    tabs: REPORT_TABS,
    stats: [
      { title: 'Net Collection Margin', value: '68.4%', tone: 'success', trend: '+4.1%', compareLabel: 'vs Q3' },
      { title: 'Lead-to-Admission Rate', value: '56.1%', tone: 'primary' },
      { title: 'Student Retention', value: '94.8%', tone: 'info' },
      { title: 'Fee Recovery Ratio', value: '88.2%', tone: 'warning' },
    ],
    columns: ['Report Name', 'Category', 'Period', 'Generated'],
    rows: [
      { id: 'RPT-101', primary: 'Monthly Fee & Due Aging Report', secondary: 'Course & Class breakdown', col2: 'Financial Reports', col3: 'Nov 2026', col4: 'Ready to Export', status: 'completed' },
      { id: 'RPT-102', primary: 'Enquiry Funnel by Counselor', secondary: 'Walk-in vs Digital Leads', col2: 'Admissions', col3: 'Q4 2026', col4: 'Updated Today', status: 'active' },
      { id: 'RPT-103', primary: 'Low Attendance Watchlist (<75%)', secondary: 'Action required students', col2: 'Attendance', col3: 'Nov 2026', col4: '18 Flagged', status: 'warning' },
    ],
  },
  {
    route: '/institute/reports/admissions',
    moduleNumber: 8,
    parentModule: 'Reports & Analytics',
    title: 'Admissions & Growth Reports',
    description: 'Compare enquiry sources, counselor conversion rates, and course/grade demand trends.',
    primaryActionLabel: 'Download CSV',
    searchPlaceholder: 'Search admission reports...',
    tabs: REPORT_TABS,
    stats: [
      { title: 'Top Source: Walk-ins', value: '44%', tone: 'primary' },
      { title: 'Top Course: Web Dev', value: '38%', tone: 'info' },
      { title: 'Avg Conversion Time', value: '4.2 Days', tone: 'success' },
    ],
    columns: ['Channel / Program', 'Total Leads', 'Admitted', 'Conversion'],
    rows: [
      { id: 'SRC-01', primary: 'Walk-in & Campus Visits', secondary: 'Front desk', col2: '72 Leads', col3: '48 Admitted', col4: '66.7%', status: 'success' },
      { id: 'SRC-02', primary: 'Google Search & Website', secondary: 'Landing form', col2: '54 Leads', col3: '26 Admitted', col4: '48.1%', status: 'active' },
    ],
  },
  {
    route: '/institute/reports/finance',
    moduleNumber: 8,
    parentModule: 'Reports & Analytics',
    title: 'Financial Reports',
    description: 'Daybook summary, GST summary, payment gateway reconciliation, and course-wise revenue.',
    primaryActionLabel: 'Export Daybook',
    searchPlaceholder: 'Search financial statements...',
    tabs: REPORT_TABS,
    stats: [
      { title: 'Gross Collections', value: '₹14,82,500', tone: 'success' },
      { title: 'Total Expenses & Payroll', value: '₹10,97,000', tone: 'info' },
      { title: 'Net Operating Surplus', value: '₹3,85,500', tone: 'primary' },
    ],
    columns: ['Statement', 'Scope', 'Net Value', 'Audit Status'],
    rows: [
      { id: 'FIN-01', primary: 'Daily Cash & UPI Daybook', secondary: 'Branch HQ', col2: 'Collections', col3: '₹1,45,000', col4: 'Reconciled', status: 'completed' },
      { id: 'FIN-02', primary: 'Overdue Installments Ledger', secondary: '68 Accounts', col2: 'Receivables', col3: '₹3,24,000', col4: 'Action Required', status: 'warning' },
    ],
  },
  {
    route: '/institute/reports/academics',
    moduleNumber: 8,
    parentModule: 'Reports & Analytics',
    title: 'Academic & Attendance Reports',
    description: 'Track test toppers, batch pass percentages, syllabus progress, and student attendance alerts.',
    primaryActionLabel: 'Export Summary',
    searchPlaceholder: 'Search academic reports...',
    tabs: REPORT_TABS,
    stats: [
      { title: 'Overall Attendance', value: '91.8%', tone: 'success' },
      { title: 'Avg Test Score', value: '76.4%', tone: 'primary' },
      { title: 'At-Risk Students', value: '18', tone: 'warning' },
    ],
    columns: ['Batch / Class', 'Attendance', 'Avg Exam Score', 'Status'],
    rows: [
      { id: 'ACD-01', primary: 'Web Dev Batch B1', secondary: 'Rahul Sir', col2: '94.2%', col3: '84.5%', col4: 'Healthy', status: 'healthy' },
      { id: 'ACD-02', primary: 'Class 10 - Section A', secondary: 'Mrs. Deshmukh', col2: '93.0%', col3: '79.1%', col4: 'Healthy', status: 'healthy' },
    ],
  },

  // ─── 9. Institute Settings ───────────────────────────────────
  {
    route: '/institute/settings',
    moduleNumber: 9,
    parentModule: 'Institute Settings',
    title: 'Institute Settings & Profile',
    description: 'Configure your institute identity, academic mode (Computer Institute / Coaching / School), branding, and contact details.',
    primaryActionLabel: 'Save Configuration',
    searchPlaceholder: 'Search settings...',
    tabs: SETTINGS_TABS,
    stats: [
      { title: 'Institute Mode', value: 'Multi-Stream', tone: 'primary' },
      { title: 'Active Academic Year', value: '2026-27', tone: 'info' },
      { title: 'Branches Active', value: '2', tone: 'success' },
      { title: 'Security & RBAC', value: 'Enforced', tone: 'neutral' },
    ],
    columns: ['Setting Module', 'Current Value', 'Scope', 'State'],
    rows: [
      { id: 'SET-01', primary: 'Institute Name & Logo', secondary: 'Apex Learning & Tech Academy', col2: 'Displayed on Receipts & ID Cards', col3: 'Global', col4: 'Configured', status: 'active' },
      { id: 'SET-02', primary: 'GST & Receipt Prefix', secondary: 'INV-APX-2026-xxx', col2: '18% GST Optional', col3: 'Finance', col4: 'Verified', status: 'healthy' },
      { id: 'SET-03', primary: 'WhatsApp Official Webhook', secondary: 'Auto Fee & Absent Alerts', col2: 'Connected', col3: 'Communication', col4: 'Connected', status: 'active' },
    ],
  },
  {
    route: '/institute/settings/branches',
    moduleNumber: 9,
    parentModule: 'Institute Settings',
    title: 'Academic Years & Branches',
    description: 'Manage campus branches, classrooms, labs, and academic year / batch session rollovers.',
    primaryActionLabel: 'Add Branch / Session',
    searchPlaceholder: 'Search branches or sessions...',
    tabs: SETTINGS_TABS,
    stats: [
      { title: 'Active Branches', value: '2', tone: 'primary' },
      { title: 'Classrooms & Labs', value: '14', tone: 'info' },
      { title: 'Current Session', value: '2026-27', tone: 'success' },
    ],
    columns: ['Branch / Session', 'Location / Dates', 'Capacity', 'Status'],
    rows: [
      { id: 'BRN-01', primary: 'Main Campus (HQ)', secondary: 'Andheri West, Mumbai', col2: '10 Rooms · 2 Computer Labs', col3: '950 Students', col4: 'Active', status: 'active' },
      { id: 'BRN-02', primary: 'South Coaching Wing', secondary: 'Bandra, Mumbai', col2: '4 Lecture Halls', col3: '400 Students', col4: 'Active', status: 'active' },
    ],
  },
  {
    route: '/institute/settings/access-control',
    moduleNumber: 9,
    parentModule: 'Institute Settings',
    title: 'Users & Roles',
    description: 'Fine-grained permissions for Institute Admin, Branch Manager, Teacher/Trainer, Counselor, and Accountant.',
    primaryActionLabel: 'Create Custom Role',
    searchPlaceholder: 'Search roles or permissions...',
    tabs: SETTINGS_TABS,
    stats: [
      { title: 'System Roles', value: '5', tone: 'primary' },
      { title: 'Assigned Users', value: '46', tone: 'info' },
      { title: '2FA Enforced Admins', value: '100%', tone: 'success' },
    ],
    columns: ['Role Name', 'Key Permissions', 'Assigned Staff', 'Status'],
    rows: [
      { id: 'ROL-01', primary: 'Institute Admin', secondary: 'Full Campus Access', col2: 'All Core Modules + Settings', col3: '2 Users', col4: 'Active', status: 'active' },
      { id: 'ROL-02', primary: 'Teacher / Trainer', secondary: 'Academic & Attendance', col2: 'Attendance, Batches, Timetable', col3: '31 Users', col4: 'Active', status: 'active' },
      { id: 'ROL-03', primary: 'Accountant', secondary: 'Finance Only', col2: 'Fee Management, Payments, Expenses', col3: '4 Users', col4: 'Active', status: 'active' },
    ],
  },
  {
    route: '/institute/settings/general',
    moduleNumber: 9,
    parentModule: 'Institute Settings',
    title: 'General Settings',
    description: 'Configure academic session defaults, working days, fee receipt prefixes, and institute-wide preferences.',
    primaryActionLabel: 'Save Preferences',
    searchPlaceholder: 'Search general preferences...',
    tabs: SETTINGS_TABS,
    stats: [
      { title: 'Academic Session', value: '2026-27', tone: 'primary' },
      { title: 'Currency & Tax', value: 'INR (₹)', tone: 'info' },
      { title: 'Working Schedule', value: 'Mon - Sat', tone: 'success' },
    ],
    columns: ['Preference', 'Current Setting', 'Category', 'State'],
    rows: [
      { id: 'GEN-01', primary: 'Receipt & Admission Numbering', secondary: 'Auto-increment prefix', col2: 'CMP-2026-xxxx', col3: 'Operations', col4: 'Active', status: 'active' },
      { id: 'GEN-02', primary: 'Attendance Cutoff Window', secondary: 'Grace window before absent mark', col2: '15 Minutes', col3: 'Attendance', col4: 'Active', status: 'active' },
      { id: 'GEN-03', primary: 'Installment Grace Period', secondary: 'Days before overdue flag', col2: '5 Days', col3: 'Finance', col4: 'Active', status: 'active' },
    ],
  },
  {
    route: '/institute/settings/templates',
    moduleNumber: 9,
    parentModule: 'Institute Settings',
    title: 'Certificates, Receipts & ID Cards',
    description: 'Customize printable course completion certificates, student/staff ID cards, and thermal/A4 fee receipts.',
    primaryActionLabel: 'Customize Template',
    searchPlaceholder: 'Search document templates...',
    tabs: SETTINGS_TABS,
    stats: [
      { title: 'Document Templates', value: '6', tone: 'primary' },
      { title: 'QR Verification Enabled', value: 'Yes', tone: 'success' },
      { title: 'Custom Signatures', value: '2', tone: 'info' },
    ],
    columns: ['Document Type', 'Format', 'Used For', 'Status'],
    rows: [
      { id: 'DOC-01', primary: 'Course Completion Certificate', secondary: 'QR Code Verified', col2: 'A4 Landscape PDF', col3: 'Computer Courses', col4: 'Active', status: 'active' },
      { id: 'DOC-02', primary: 'Student Smart ID Card', secondary: 'Barcode + Photo', col2: 'CR80 Card', col3: 'All Students', col4: 'Active', status: 'active' },
    ],
  },

  // ─── 10. Subscription & Billing ──────────────────────────────
  {
    route: '/institute/billing',
    moduleNumber: 10,
    parentModule: 'Subscription & Billing',
    title: 'SaaS Subscription & Billing',
    description: 'View your CampusOS SaaS plan, student & staff seat limits, WhatsApp credit balance, and billing cycle.',
    primaryActionLabel: 'Upgrade Plan',
    searchPlaceholder: 'Search plan usage or invoices...',
    tabs: BILLING_TABS,
    stats: [
      { title: 'Current Plan', value: 'Growth Pro', tone: 'info', compareLabel: 'Annual Billing' },
      { title: 'Student Quota Used', value: '1,248 / 2,000', tone: 'primary' },
      { title: 'Next Renewal', value: '15 Jan 2027', tone: 'success' },
      { title: 'Monthly / Annual Rate', value: '₹4,999/mo', tone: 'neutral' },
    ],
    columns: ['Plan Resource', 'Allocated Limit', 'Current Usage', 'Status'],
    rows: [
      { id: 'QUO-01', primary: 'Active Student Records', secondary: 'Across all branches', col2: '2,000 Students', col3: '1,248 Used (62%)', col4: 'Healthy', status: 'healthy' },
      { id: 'QUO-02', primary: 'Campus Branches', secondary: 'Multi-branch support', col2: '5 Branches', col3: '2 Active', col4: 'Active', status: 'active' },
      { id: 'QUO-03', primary: 'Document & Exam Storage', secondary: 'Cloud CDN', col2: '100 GB', col3: '34.2 GB Used', col4: 'Healthy', status: 'healthy' },
    ],
  },
  {
    route: '/institute/billing/invoices',
    moduleNumber: 10,
    parentModule: 'Subscription & Billing',
    title: 'SaaS Invoices & Payments',
    description: 'Download GST tax invoices for your CampusOS subscription and manage auto-pay methods.',
    primaryActionLabel: 'Manage Payment Method',
    searchPlaceholder: 'Search invoice ID or billing month...',
    tabs: BILLING_TABS,
    stats: [
      { title: 'Paid Invoices', value: '14', tone: 'success' },
      { title: 'Auto-Pay Status', value: 'Enabled', tone: 'primary' },
      { title: 'Outstanding Dues', value: '₹0', tone: 'neutral' },
    ],
    columns: ['Invoice ID', 'Plan Period', 'Amount (Incl. GST)', 'Payment'],
    rows: [
      { id: 'INV-2026-11', primary: 'Growth Pro · Monthly', secondary: 'Visa •••• 4242', col2: '01 Nov - 30 Nov 2026', col3: '₹5,899', col4: 'Paid', status: 'paid' },
      { id: 'INV-2026-10', primary: 'Growth Pro · Monthly', secondary: 'Visa •••• 4242', col2: '01 Oct - 31 Oct 2026', col3: '₹5,899', col4: 'Paid', status: 'paid' },
    ],
  },
  {
    route: '/institute/billing/upgrade',
    moduleNumber: 10,
    parentModule: 'Subscription & Billing',
    title: 'Upgrade Plan & Add-ons',
    description: 'Compare SaaS tiers, unlock unlimited branches, biometric integrations, and extra WhatsApp credits.',
    primaryActionLabel: 'Contact Sales',
    searchPlaceholder: 'Search plans or add-ons...',
    tabs: BILLING_TABS,
    stats: [
      { title: 'Current Tier', value: 'Growth Pro', tone: 'info' },
      { title: 'Annual Discount', value: 'Save 20%', tone: 'success' },
      { title: 'Enterprise SLA', value: '99.9% Uptime', tone: 'primary' },
    ],
    columns: ['Tier / Add-on', 'Student Limit', 'Pricing', 'Availability'],
    rows: [
      { id: 'PLN-PRO', primary: 'Growth Pro (Current)', secondary: 'Up to 5 Branches', col2: '2,000 Students', col3: '₹4,999 / month', col4: 'Active', status: 'active' },
      { id: 'PLN-ENT', primary: 'Campus Enterprise', secondary: 'Unlimited Branches + Custom Domain', col2: 'Unlimited Students', col3: '₹11,999 / month', col4: 'Recommended', status: 'enterprise' },
    ],
  },

  // ─── 11. Help & Support ──────────────────────────────────────
  {
    route: '/institute/support',
    moduleNumber: 11,
    parentModule: 'Help & Support',
    title: 'Help & Customer Support',
    description: 'Raise support tickets with the CampusOS team, track issue resolution, or request onboarding/data migration help.',
    primaryActionLabel: 'Raise Support Ticket',
    searchPlaceholder: 'Search tickets by ID or subject...',
    tabs: SUPPORT_TABS,
    stats: [
      { title: 'Open Tickets', value: '1', tone: 'info' },
      { title: 'In Progress', value: '1', tone: 'warning' },
      { title: 'Resolved Tickets', value: '12', tone: 'success' },
      { title: 'Avg First Response', value: '18 mins', tone: 'primary' },
    ],
    columns: ['Ticket Subject', 'Category', 'Last Updated', 'Priority'],
    rows: [
      { id: 'TKT-308', primary: 'Bulk CSV import for Class 9 students', secondary: 'Onboarding Team Assigned', col2: 'Data Migration', col3: '2 hours ago', col4: 'High Priority', status: 'in_progress' },
      { id: 'TKT-304', primary: 'Custom logo watermark on GST receipt', secondary: 'Ticket Closed', col2: 'Billing & Receipts', col3: '19 Nov 2026', col4: 'Normal', status: 'resolved' },
      { id: 'TKT-299', primary: 'WhatsApp template approval query', secondary: 'Meta Verification', col2: 'Integrations', col3: '11 Nov 2026', col4: 'Normal', status: 'resolved' },
    ],
  },
  {
    route: '/institute/support/guides',
    moduleNumber: 11,
    parentModule: 'Help & Support',
    title: 'Help Center & Video Guides',
    description: 'Step-by-step setup guides for Computer Institutes, Coaching Centers, and Schools.',
    primaryActionLabel: 'Book Onboarding Call',
    searchPlaceholder: 'Search setup guides & FAQs...',
    tabs: SUPPORT_TABS,
    stats: [
      { title: 'Quick-Start Guides', value: '24', tone: 'primary' },
      { title: 'Video Walkthroughs', value: '14', tone: 'info' },
      { title: 'Live Onboarding', value: 'Available', tone: 'success' },
    ],
    columns: ['Guide Topic', 'Best For', 'Read Time', 'Format'],
    rows: [
      { id: 'GID-01', primary: 'Setting up Courses, Batches & Lab Shifts', secondary: 'Step-by-step checklist', col2: 'Computer & Coaching', col3: '4 min read', col4: 'Article + Video', status: 'active' },
      { id: 'GID-02', primary: 'Configuring Classes, Sections & Fee Terms', secondary: 'Annual session setup', col2: 'Schools', col3: '5 min read', col4: 'Checklist + Video', status: 'active' },
    ],
  },
];

export const INSTITUTE_MODULES_BY_ROUTE: Record<string, InstituteModuleConfig> =
  Object.fromEntries(MODULE_LIST.map((mod) => [mod.route, mod]));

export function getInstituteModuleConfig(route: string): InstituteModuleConfig | null {
  const normalized = route.replace(/\/+$/, '');
  return INSTITUTE_MODULES_BY_ROUTE[normalized] ?? null;
}
