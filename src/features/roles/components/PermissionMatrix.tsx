'use client';

import React, { useState } from 'react';
import { MOCK_ROLES } from '../data/mock-data';
import { STANDARD_ACTIONS, ActionType } from '../types';
import { ShieldAlert, Check, Minus } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface PermissionMatrixProps {
  defaultRoleId?: string;
}

export function PermissionMatrix({ defaultRoleId }: PermissionMatrixProps = {}) {
  const [selectedRoleId, setSelectedRoleId] = useState(defaultRoleId || MOCK_ROLES[0].id);
  const selectedRole = MOCK_ROLES.find(r => r.id === selectedRoleId);

  if (!selectedRole) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Permission Matrix</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">View and modify access levels for roles.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Role:</label>
          <select 
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer min-w-[200px]"
          >
            {MOCK_ROLES.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-20 bg-slate-50 py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-r border-slate-100 min-w-[180px] shadow-[1px_0_0_rgba(0,0,0,0.05)]">
                Module
              </th>
              {STANDARD_ACTIONS.map(action => (
                <th key={action} className="sticky top-0 z-10 bg-slate-50 py-3 px-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 min-w-[80px]">
                  <div className="flex items-center justify-center whitespace-nowrap">
                    {action}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedRole.permissions.map((perm, idx) => (
              <tr key={perm.module} className={`hover:bg-slate-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                <td className="sticky left-0 z-10 py-3 px-4 font-semibold text-sm text-slate-700 border-b border-r border-slate-100 shadow-[1px_0_0_rgba(0,0,0,0.05)] bg-inherit">
                  {perm.module}
                </td>
                {STANDARD_ACTIONS.map(action => {
                  const val = perm.actions[action as ActionType];
                  const isNotApp = val === 'not-applicable';
                  
                  return (
                    <td key={action} className="py-3 px-2 text-center border-b border-slate-50">
                      {isNotApp ? (
                        <div className="flex justify-center text-slate-300">
                          <Minus className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Checkbox 
                            checked={val as boolean}
                            onCheckedChange={() => {}}
                            className={`data-[state=checked]:bg-emerald-500`}
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend / Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center p-0.5"><div className="w-3 h-3 rounded-full bg-emerald-500 ml-auto" /></div> Allowed
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-4 rounded-full bg-slate-200 border border-slate-300 flex items-center p-0.5"><div className="w-3 h-3 rounded-full bg-white shadow-sm" /></div> Denied
          </div>
          <div className="flex items-center gap-1.5">
            <Minus className="w-4 h-4 text-slate-300" /> Not Applicable
          </div>
        </div>
        
        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all active:scale-95">
          Save Changes
        </button>
      </div>
    </div>
  );
}
