'use client';

import React, { useState } from 'react';
import { Edit2, Copy, Trash2, Eye, ShieldCheck } from 'lucide-react';
import { MOCK_ROLES } from '../data/mock-data';
import { Role } from '../types';
import { DataTablePagination } from "@/components/ui/pagination";
import { ActionTooltip } from "@/components/ui/tooltip";

interface RolesTableProps {
  onEditRole: (role: Role) => void;
  onViewDetails: (role: Role) => void;
}

export function RolesTable({ onEditRole, onViewDetails }: RolesTableProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [roles, setRoles] = useState(MOCK_ROLES);

  const paginatedData = roles.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">Role Name</th>
              <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">Purpose</th>
              <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">Users</th>
              <th className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">Created Date</th>
              <th className="text-center py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((role) => (
              <tr key={role.id} className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{role.name}</p>
                      <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        {role.type === 'system' ? 'System Role' : 'Custom Role'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <p className="text-sm text-slate-600">{role.purpose}</p>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">{role.userCount}</span>
                    <span className="text-xs text-slate-400">Users</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <p className="text-sm text-slate-600">{new Date(role.createdAt).toLocaleDateString()}</p>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <ActionTooltip icon={Eye} tooltip="View Details" onClick={() => onViewDetails(role)} />
                    <ActionTooltip icon={Edit2} tooltip="Edit Role" onClick={() => onEditRole(role)} />
                    <ActionTooltip icon={Copy} tooltip="Clone Role" onClick={() => {}} />
                    <ActionTooltip icon={Trash2} tooltip="Delete Role" variant="danger" onClick={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
        <DataTablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalRows={roles.length}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
