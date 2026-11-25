<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Universal Semantic Status Color Guidelines

All agents, developers, and components MUST strictly adhere to these universal semantic status color guidelines across the entire application.

Status indicators communicate immediate psychological state. **Never mix brand colors (Nordic Teal/Indigo) with status indications, and never assign arbitrary colors to system states.**

| Status Category | Standard Color | Reference Hex Codes | Meaning & Signal Psychology | Standard Application States |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | **Green** | `#22bb33`, `#2e7d32`, `#16a34a` (text: `#15803d`, bg: `#f0fdf4`, border: `#bbf7d0`) | Action completed successfully, system/tenant is healthy, active, verified, safe | `active`, `paid`, `success`, `successful`, `completed`, `resolved`, `healthy`, `converted`, `low_risk` |
| **Warning** | **Yellow / Amber** | `#f0ad4e`, `#f57f17`, `#d97706` (text: `#b45309`, bg: `#fffbeb`, border: `#fde68a`) | Attention needed, pending state, trial active, non-blocking risk, expiring soon | `trial`, `pending`, `unpaid`, `in_progress`, `warning`, `ending_soon`, `medium_risk`, `degraded` |
| **Error / Danger** | **Red** | `#bb2124`, `#c62828`, `#dc2626` (text: `#b91c1c`, bg: `#fef2f2`, border: `#fecaca`) | Critical failure, interruption, destructive action, suspended account, violation | `suspended`, `cancelled`, `failed`, `overdue`, `critical`, `high_risk`, `blocked`, `action_required`, `payment_issue`, `down` |
| **Info** | **Blue / Sky** | `#5bc0de`, `#1565c0`, `#0284c7` (text: `#0369a1`, bg: `#f0f9ff`, border: `#bae6fd`) | Neutral announcement, informational tutorial, open ticket, automated processing | `open`, `upcoming`, `automated`, `processing`, `info`, `pro`, `enterprise` |
| **Neutral / Inactive** | **Gray / Slate** | `#aaaaaa`, `#64748b` (text: `#475569`, bg: `#f8fafc`, border: `#e2e8f0`) | Draft states, inactive, deprecated, manual action, expired archive | `inactive`, `expired`, `deprecated`, `manual`, `basic`, `draft`, `archived` |

---

### Non-Negotiable Implementation Rules:
1. **Always Use Standard Status Primitives**:
   - Use `<StatusBadge status={tenant.status} />` from `@/components/ui/status-badge` or `@/features/subscriptions/components/shared/StatusBadge`.
   - Or use `<Badge variant="success | warning | error | destructive | info | secondary">` from `@/components/ui/badge`.
2. **Account Suspension is ALWAYS Red**:
   - In SaaS operations, `suspended` represents an administrative freeze / penalty. It must NEVER be colored Amber or Blue. Always render it with Error / Danger (`Red`).
3. **Pending / In Progress is ALWAYS Amber / Yellow**:
   - Pending states indicate work awaiting verification or payment; they must NEVER be colored Green.
4. **Primary Brand Colors are NOT Status Colors**:
   - The primary theme (Nordic Teal) is exclusively for navigation, interactive primary buttons, and user focus. It must never substitute for semantic statuses.
5. **Soft Accessible Contrast**:
   - Always ensure WCAG 2.1 AA text contrast. Pair soft tinted backgrounds (`bg-emerald-50`, `bg-amber-50`, `bg-rose-50`, `bg-sky-50`, `bg-slate-100`) with dark saturated text (`text-emerald-700`, `text-amber-700`, `text-rose-700`, `text-sky-700`, `text-slate-600`) and delicate matching borders (`border-emerald-200`, `border-amber-200`, `border-rose-200`, etc.).

---

### Canonical Stat / KPI Card Standard (Mandatory Across App):
Whenever creating or updating any stats/KPI card anywhere in the application, ALWAYS follow this exact pattern:
1. **Use the Shared Notched Stat Card Primitive**:
   - Always use `<NotchedStatCard />` from `@/components/ui/notched-stat-card` (or `<StatCard />` from `@/features/subscriptions/components/shared/StatCard`, which wraps `NotchedStatCard`).
   - Do **NOT** use `...` (three-dot) buttons in the top-right corner of stat cards. Always place the metric's meaningful icon inside the separated floating top-right badge with the concentric concave corner cutout (`cutout`).
2. **Colors Must Communicate Domain Meaning (No Arbitrary / Decorative Card Colors)**:
   - Never assign random colors like pink/rose for healthy revenue or amber/yellow for healthy active counts.
   - Always choose `tone` based on what the metric denotes:
     - `success` (Soft Emerald): Financial revenue, MRR, ARR, collected payments, resolved/healthy growth.
     - `primary` (Soft Nordic Teal): Core platform entities (`Active Institutes`, plans, active tenant totals).
     - `info` (Soft Sky Blue): Scale/reach/informational metrics (`Platform Students`, API volume, open tickets).
     - `warning` (Soft Amber): Attention needed (`Expiring Trials`, `Pending Approvals`, `Unpaid`, degraded metrics).
     - `danger` (Soft Rose/Red): Critical issues (`Suspended Institutes`, `Failed Payments`, `Overdue`, security threats).
     - `neutral` (Clean Slate): Rates, percentages, benchmarks, or inactive/archived counts.

---

### Canonical Floating Right-Side Sheet / Slider Standard (Mandatory Across App):
Whenever creating or updating any right-side slide-over sheet, drawer, or slider panel anywhere in the application (such as Table Fields configuration, Notifications, Detail Drawers, or Filter Sliders), ALWAYS follow this exact standard:
1. **Use the Shared Floating Sheet Primitives**:
   - Always use `<FloatingSheet />`, `<FloatingSheetHeader />`, `<FloatingSheetBody />`, and `<FloatingSheetFooter />` from `@/components/ui/floating-sheet`.
   - Do **NOT** render edge-to-edge drawers anchored flush at `right-0 top-0 bottom-0`.
2. **Consistent Floating Geometry & Motion**:
   - Sheets must slide smoothly from the right with clean viewport inset margins (`top-3 right-3 bottom-3 sm:top-4 sm:right-3 sm:bottom-4`), `rounded-2xl`, subtle border (`border-slate-200/90`), elevated shadow, and a soft blurred backdrop (`bg-slate-950/15 backdrop-blur-[1.5px]`).
   - Always include the standardized header (`<- Title` + optional count badge + `X` close button) and sticky footer for primary actions (`Done`, `Reset`, `Preferences`, etc.).

---

### Canonical Tabs & Segmented Switcher Standard (Mandatory Across App):
Whenever creating or updating tabs, filter bars, view switchers, or segmented selectors anywhere in the application, ALWAYS use the unified shared tab primitives:
1. **Use `<SegmentedTabs />` (or `<Tabs />`, `<TabsList />`, `<TabsTrigger />`) from `@/components/ui/tabs`**:
   - Never build ad-hoc underline (`border-b-2`) tabs, indigo (`bg-indigo-600` / `text-indigo-600`) tabs, or custom disconnected pill toggles.
   - For table toolbar status filters, use `<FilterChips />` from `@/features/subscriptions/components/shared/UIComponents`, which wraps `<SegmentedTabs size="sm" />`.
2. **Consistent Visual Styling**:
   - All tabs share the `bg-white/95 border border-slate-200/90 rounded-2xl p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)]` dock with the spring-animated Nordic Teal active capsule (`bg-gradient-to-b from-primary to-primary-hover text-white font-semibold rounded-xl`).
