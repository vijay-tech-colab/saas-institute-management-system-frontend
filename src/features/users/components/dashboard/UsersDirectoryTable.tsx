"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  AtSign,
  Ban,
  Building2,
  Calendar,
  CalendarDays,
  Clock,
  CreditCard,
  Eye,
  Globe,
  KeyRound,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTablePagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { RowActionMenu, TABLE_STICKY } from "@/components/ui/row-action-menu";
import { AnimatePresence, motion } from "framer-motion";
import {
  ColumnHeaderLabel,
  TableColumnDef,
  TableFieldsButton,
  useTableColumns,
} from "@/components/ui/table-configurator";
import { StatusBadge } from "@/features/subscriptions/components/shared/StatusBadge";
import {
  FilterChips,
  SearchInput,
} from "@/features/subscriptions/components/shared/UIComponents";
import { cn } from "@/lib/utils";
import { mockUsers } from "../../data/mock-data";
import type { InstituteOwner } from "../../types";

export function UsersDirectoryTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns: TableColumnDef<InstituteOwner>[] = useMemo(
    () => [
      {
        id: "fullName",
        label: "Full name",
        icon: User,
        defaultVisible: true,
        renderCell: (user) => (
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(user.id)}`}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-7 h-7 rounded-full object-cover bg-slate-100 shrink-0"
            />
            <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap">
              {user.firstName} {user.lastName}
            </span>
          </div>
        ),
      },
      {
        id: "email",
        label: "Email",
        icon: AtSign,
        defaultVisible: true,
        renderCell: (user) => (
          <span className="text-[13px] text-slate-600 underline decoration-slate-200 underline-offset-2 whitespace-nowrap">
            {user.email}
          </span>
        ),
      },
      {
        id: "institute",
        label: "Institute",
        icon: Building2,
        defaultVisible: true,
        renderCell: (user) => (
          <div>
            <p className="text-[13px] font-medium text-slate-800 whitespace-nowrap">
              {user.institute.name}
            </p>
            <p className="text-[11px] text-slate-400">{user.institute.code}</p>
          </div>
        ),
      },
      {
        id: "plan",
        label: "Plan",
        icon: CreditCard,
        defaultVisible: true,
        renderCell: (user) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
            {user.subscription.planName}
          </span>
        ),
      },
      {
        id: "status",
        label: "Activity Status",
        icon: Activity,
        defaultVisible: true,
        renderCell: (user) => <StatusBadge status={user.status} />,
      },
      {
        id: "joinedDate",
        label: "Joined date",
        icon: Calendar,
        defaultVisible: true,
        renderCell: (user) => (
          <span className="text-xs text-slate-600 whitespace-nowrap">
            {format(new Date(user.createdAt), "dd MMM yyyy, p")}
          </span>
        ),
      },
      {
        id: "twoFactor",
        label: "2F Auth",
        icon: ShieldCheck,
        defaultVisible: false,
        renderCell: (user) => (
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap",
              user.emailVerified
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            )}
          >
            {user.emailVerified ? "Enabled" : "Disabled"}
          </span>
        ),
      },
      {
        id: "phone",
        label: "Phone Number",
        icon: Phone,
        defaultVisible: false,
        renderCell: (user) => (
          <span className="text-[13px] text-slate-600 tabular-nums whitespace-nowrap">
            {user.phone}
          </span>
        ),
      },
      {
        id: "dob",
        label: "Date of Birth",
        icon: CalendarDays,
        defaultVisible: false,
        renderCell: (user, idx) => {
          const year = 1982 + ((idx * 3) % 16);
          const month = ((idx % 12) + 1).toString().padStart(2, "0");
          const day = ((idx % 26) + 1).toString().padStart(2, "0");
          return (
            <span className="text-xs text-slate-600 whitespace-nowrap">
              {user.dateOfBirth || `${day}/${month}/${year}`}
            </span>
          );
        },
      },
      {
        id: "lastLogin",
        label: "Last Login",
        icon: Clock,
        defaultVisible: false,
        renderCell: (user) => (
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {format(new Date(user.lastLogin), "dd MMM yyyy, p")}
          </span>
        ),
      },
      {
        id: "country",
        label: "Country",
        icon: Globe,
        defaultVisible: false,
        renderCell: (user) => (
          <span className="text-[13px] text-slate-700 whitespace-nowrap">
            {user.address?.country || "India"}
          </span>
        ),
      },
      {
        id: "state",
        label: "State/Province",
        icon: Navigation,
        defaultVisible: false,
        renderCell: (user) => (
          <span className="text-[13px] text-slate-600 whitespace-nowrap">
            {user.address?.state || "Maharashtra"}
          </span>
        ),
      },
      {
        id: "city",
        label: "City",
        icon: MapPin,
        defaultVisible: false,
        renderCell: (user) => (
          <span className="text-[13px] text-slate-600 whitespace-nowrap">
            {user.address?.city || "Mumbai"}
          </span>
        ),
      },
    ],
    []
  );

  const {
    orderedColumns,
    visibleColumns,
    hiddenSet,
    toggleColumn,
    hideAllOptional,
    showAll,
    resetColumns,
    moveColumn,
    isCustomized,
  } = useTableColumns("users-directory", columns);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockUsers.filter((u) => {
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        u.id.toLowerCase().includes(q) ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.institute.name.toLowerCase().includes(q)
      );
    });
  }, [search, statusFilter]);

  const paginatedUsers = filteredUsers.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const toggleSelectAll = () => {
    if (
      paginatedUsers.length > 0 &&
      selectedIds.size === paginatedUsers.length
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalCols = visibleColumns.length + 3; // Checkbox + ID + visibleColumns + Actions

  const activeCount = useMemo(
    () => mockUsers.filter((u) => u.status === "active").length,
    []
  );
  const pendingCount = useMemo(
    () => mockUsers.filter((u) => u.status === "pending").length,
    []
  );
  const blockedCount = useMemo(
    () => mockUsers.filter((u) => u.status === "blocked").length,
    []
  );

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col flex-1 overflow-hidden min-h-0">
      {/* Toolbar (matches TenantList & standard data table pattern) */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-2.5 flex-wrap">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPageIndex(0);
            }}
            placeholder="Search users by name, email, institute, ID..."
            className="w-full sm:w-72"
          />

          <TableFieldsButton
            columns={orderedColumns}
            hiddenSet={hiddenSet}
            onToggle={toggleColumn}
            onMove={moveColumn}
            onHideAll={hideAllOptional}
            onShowAll={showAll}
            onReset={resetColumns}
            isCustomized={isCustomized}
            idFieldLabel="User ID"
          />
        </div>

        <FilterChips
          options={[
            { label: "All", value: "all", count: mockUsers.length },
            { label: "Active", value: "active", count: activeCount },
            { label: "Pending", value: "pending", count: pendingCount },
            { label: "Blocked", value: "blocked", count: blockedCount },
          ]}
          selected={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setPageIndex(0);
          }}
        />
      </div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary-light border-b border-primary-border px-4 py-2.5 flex items-center justify-between overflow-hidden shrink-0"
          >
            <span className="text-xs font-semibold text-primary">
              {selectedIds.size} {selectedIds.size === 1 ? "owner" : "owners"} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer"
              >
                Suspend Selected
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto thin-scrollbar">
        <table className="w-full min-w-[1080px] text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th
                className={cn(
                  "py-3 px-4 text-center align-middle",
                  TABLE_STICKY.checkboxTh
                )}
              >
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={
                      paginatedUsers.length > 0 &&
                      selectedIds.size === paginatedUsers.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th
                className={cn(
                  "text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide",
                  TABLE_STICKY.idThWithCheckbox
                )}
              >
                ID
              </th>
              {visibleColumns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "text-left py-3 px-5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap",
                    col.thClassName
                  )}
                >
                  {col.renderHeader ? (
                    col.renderHeader()
                  ) : (
                    <ColumnHeaderLabel label={col.label} icon={col.icon} />
                  )}
                </th>
              ))}
              <th
                className={cn(
                  "py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wide",
                  TABLE_STICKY.actionTh
                )}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, idx) => {
                const isSelected = selectedIds.has(user.id);
                return (
                  <tr
                    key={user.id}
                    onClick={() => toggleSelect(user.id)}
                    className={cn(
                      "group transition-colors cursor-pointer",
                      isSelected
                        ? "bg-primary-light"
                        : "bg-white hover:bg-slate-50"
                    )}
                  >
                    <td
                      className={cn(
                        "py-3.5 px-4 text-center align-middle",
                        TABLE_STICKY.checkboxTd,
                        isSelected && "bg-primary-light group-hover:bg-primary-light"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(user.id)}
                        />
                      </div>
                    </td>
                    <td
                      className={cn(
                        "py-3.5 px-5 text-[13px] font-medium text-slate-700 tabular-nums",
                        TABLE_STICKY.idTdWithCheckbox,
                        isSelected && "bg-primary-light group-hover:bg-primary-light"
                      )}
                    >
                      {user.id}
                    </td>
                    {visibleColumns.map((col) => (
                      <td
                        key={col.id}
                        className={cn("py-3.5 px-5 whitespace-nowrap", col.tdClassName)}
                      >
                        {col.renderCell(user, idx)}
                      </td>
                    ))}
                    <td
                      className={cn(
                        "py-3.5 px-4",
                        TABLE_STICKY.actionTd,
                        isSelected && "bg-primary-light group-hover:bg-primary-light"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActionMenu
                        ariaLabel={`Actions for ${user.firstName} ${user.lastName}`}
                        items={[
                          {
                            label: "View Profile",
                            icon: Eye,
                            variant: "primary",
                            onClick: () => {},
                          },
                          {
                            label: "Reset Credentials",
                            icon: KeyRound,
                            onClick: () => {},
                          },
                          {
                            label: "Suspend User",
                            icon: Ban,
                            variant: "danger",
                            onClick: () => {},
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={totalCols} className="p-8">
                  <EmptyState
                    icon={Users}
                    title="No users found"
                    description="Adjust your search or status filters to see matching accounts."
                    actionLabel="Reset Filters"
                    onAction={() => {
                      setSearch("");
                      setStatusFilter("all");
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-slate-100 bg-white">
        <DataTablePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalRows={filteredUsers.length}
        />
      </div>
    </div>
  );
}
