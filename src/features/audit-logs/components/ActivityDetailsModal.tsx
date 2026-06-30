import React from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { ActivityLog } from '../types';
import { format } from 'date-fns';
import { Activity, MapPin, Monitor, Clock, User, Fingerprint, Database, Copy } from 'lucide-react';

interface ActivityDetailsModalProps {
  log: ActivityLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityDetailsModal({ log, isOpen, onClose }: ActivityDetailsModalProps) {
  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity Details" size="xl">
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              log.severity === 'high' ? 'bg-rose-100 text-rose-700' :
              log.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              <Activity className="w-3.5 h-3.5 inline-block mr-1" />
              {log.action}
            </span>
            <span className="text-sm font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
              {log.module} • {log.resource}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Log ID: {log.id} • {format(new Date(log.timestamp), 'PPpp')}</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {log.oldValue && log.newValue && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" /> Data Changes
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-2">Old Value</span>
                  <pre className="text-xs font-mono text-rose-700 whitespace-pre-wrap">{log.oldValue}</pre>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-2">New Value</span>
                  <pre className="text-xs font-mono text-emerald-700 whitespace-pre-wrap">{log.newValue}</pre>
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4" /> Client Metadata
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-blue-300">
                {`{
  "ip_address": "${log.ipAddress}",
  "location": "${log.location}",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "client_version": "1.4.2"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Actor Info
            </h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                {log.user.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{log.user.name}</p>
                <p className="text-xs text-slate-500">{log.user.email}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-500 flex justify-between">
                <span>Tenant:</span>
                <span className="text-slate-800">{log.user.instituteName}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Session Details
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">IP Address</p>
                <p className="text-xs font-mono text-slate-800 flex items-center justify-between">
                  {log.ipAddress}
                  <button className="text-slate-400 hover:text-blue-600"><Copy className="w-3 h-3" /></button>
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                <p className="text-xs font-semibold text-slate-800">{log.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
