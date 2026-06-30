import React, { useState } from 'react';
import { Edit2, MoreVertical, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

export interface Branch {
  id: string;
  name: string;
  code: string;
  manager: string;
  email: string;
  phone: string;
  studentCount: number;
  status: 'active' | 'maintenance';
}

interface BranchListProps {
  branches: Branch[];
}

export function BranchList({ branches }: BranchListProps) {
  const [selectedBranches, setSelectedBranches] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedBranches.size === branches.length) {
      setSelectedBranches(new Set());
    } else {
      setSelectedBranches(new Set(branches.map(b => b.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedBranches);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelectedBranches(next);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 w-12 text-center align-middle">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={selectedBranches.size === branches.length && branches.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Branch Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((branch) => (
              <tr 
                key={branch.id} 
                className={`hover:bg-slate-50 transition-colors group cursor-pointer ${selectedBranches.has(branch.id) ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                onClick={() => toggleSelect(branch.id)}
              >
                <td className="px-6 py-4 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedBranches.has(branch.id)}
                      onCheckedChange={() => toggleSelect(branch.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{branch.name}</span>
                    <span className="text-xs text-slate-500 font-medium">[{branch.code}]</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-700">{branch.manager}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-700">{branch.phone}</span>
                    <span className="text-xs text-slate-500">{branch.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {branch.studentCount} Students
                  </span>
                </td>
                <td className="px-6 py-4">
                  {branch.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      <AlertTriangle className="w-3.5 h-3.5" /> Maintenance
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </button>
                    <button className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {branches.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">
            No branches found.
          </div>
        )}
      </div>
    </div>
  );
}
