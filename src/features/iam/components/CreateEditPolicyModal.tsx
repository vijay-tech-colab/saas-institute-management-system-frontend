'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Globe, Clock, Power } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PolicyType = 'Security' | 'Network' | 'Session';
type PolicyStatus = 'Active' | 'Inactive';

interface PolicyData {
  id?: string;
  name: string;
  type: PolicyType;
  status: PolicyStatus;
  target: string;
}

interface CreateEditPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: PolicyData | null;
  onSave: (policy: PolicyData) => void;
}

export function CreateEditPolicyModal({ isOpen, onClose, policy, onSave }: CreateEditPolicyModalProps) {
  const [formData, setFormData] = useState<PolicyData>({
    name: '',
    type: 'Security',
    status: 'Active',
    target: 'All Roles',
  });

  useEffect(() => {
    if (policy) {
      setFormData(policy);
    } else {
      setFormData({
        name: '',
        type: 'Security',
        status: 'Active',
        target: 'All Roles',
      });
    }
  }, [policy, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    {formData.type === 'Security' ? <ShieldAlert className="w-5 h-5 text-indigo-600" /> : 
                     formData.type === 'Network' ? <Globe className="w-5 h-5 text-indigo-600" /> : 
                     <Clock className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{policy ? 'Edit Policy' : 'Create New Policy'}</h2>
                    <p className="text-xs font-medium text-slate-500">Configure access rules and restrictions</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Policy Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Require MFA for Admins"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Policy Type</label>
                  <Select value={formData.type} onValueChange={(val: PolicyType) => setFormData({ ...formData, type: val })}>
                    <SelectTrigger className="w-full rounded-xl border-slate-200 h-[42px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Security">Security Rule</SelectItem>
                      <SelectItem value="Network">Network Restriction</SelectItem>
                      <SelectItem value="Session">Session Limits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Target Role</label>
                  <Select value={formData.target} onValueChange={(val) => setFormData({ ...formData, target: val })}>
                    <SelectTrigger className="w-full rounded-xl border-slate-200 h-[42px]">
                      <SelectValue placeholder="Select target role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Roles">All Roles</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Branch Admin">Branch Admin</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Initial Status</label>
                  <Select value={formData.status} onValueChange={(val: PolicyStatus) => setFormData({ ...formData, status: val })}>
                    <SelectTrigger className="w-full rounded-xl border-slate-200 h-[42px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active (Enforced)</SelectItem>
                      <SelectItem value="Inactive">Inactive (Draft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 mt-auto shrink-0">
                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors shadow-sm shadow-indigo-200">
                  {policy ? 'Save Changes' : 'Create Policy'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
