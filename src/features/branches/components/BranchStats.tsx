import React from 'react';
import { Building2, Users, MapPin } from 'lucide-react';

export function BranchStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-indigo-50 opacity-50 blur-2xl group-hover:opacity-80 transition-opacity"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Active Branches</p>
            <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5">5 Branches</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-50 opacity-50 blur-2xl group-hover:opacity-80 transition-opacity"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Active Students</p>
            <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5">1,240 Students</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-200 hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-50 opacity-50 blur-2xl group-hover:opacity-80 transition-opacity"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Head/Main Campus</p>
            <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5 truncate">Varanasi Campus</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
