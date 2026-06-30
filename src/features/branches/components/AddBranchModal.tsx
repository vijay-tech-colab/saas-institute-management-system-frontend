import React from 'react';
import { X, Network, MapPin, Building, Users, Hash, UserCheck } from 'lucide-react';

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBranchModal({ isOpen, onClose }: AddBranchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New Branch</h2>
            <p className="text-xs text-slate-500 mt-1">Register a new physical or virtual campus to your network.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" /> Branch Name
              </label>
              <input 
                type="text" 
                placeholder="e.g. Downtown Center" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Hash className="w-4 h-4 text-slate-400" /> Unique Branch Code
              </label>
              <input 
                type="text" 
                placeholder="e.g. DT-02" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all uppercase" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-slate-400" /> Branch Manager Name
              </label>
              <input 
                type="text" 
                placeholder="Manager's Full Name" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" /> Max Student Capacity
              </label>
              <input 
                type="number" 
                placeholder="e.g. 500" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Network className="w-4 h-4 text-slate-400" /> Allotted IP Address (Exam Lockdown)
              </label>
              <input 
                type="text" 
                placeholder="e.g. 192.168.1.0/24 or Static IP" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-mono text-sm" 
              />
              <p className="text-xs text-slate-500">Required for securing online exams to this specific campus network.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Full Address
              </label>
              <textarea 
                placeholder="Complete physical address of the branch..." 
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none" 
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
          >
            Save Branch
          </button>
        </div>

      </div>
    </div>
  );
}
