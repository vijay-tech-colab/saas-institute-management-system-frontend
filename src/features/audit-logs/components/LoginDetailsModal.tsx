import React from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { LoginLog } from '../types';
import { format } from 'date-fns';
import { Shield, MapPin, Monitor, Clock, User, Server, AlertTriangle, Fingerprint } from 'lucide-react';

interface LoginDetailsModalProps {
  log: LoginLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LoginDetailsModal({ log, isOpen, onClose }: LoginDetailsModalProps) {
  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Event Details" size="xl">
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              log.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
              log.status === 'failed' ? 'bg-rose-100 text-rose-700' :
              log.status === 'blocked' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-200 text-slate-700'
            } uppercase`}>
              {log.status}
            </span>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 ${
              log.riskLevel === 'Low' ? 'bg-blue-100 text-blue-700' :
              log.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
              log.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
              'bg-rose-100 text-rose-700'
            } uppercase`}>
              {log.riskLevel !== 'Low' && <AlertTriangle className="w-3 h-3" />}
              Risk: {log.riskLevel}
            </span>
            <span className="text-sm font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">{log.method}</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Event ID: {log.id} • {format(new Date(log.timestamp), 'PPpp')}</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Authentication Details
            </h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Method</span>
                <span className="text-sm font-bold text-slate-700">{log.method}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500 font-medium">MFA Used</span>
                <span className={`text-sm font-bold ${log.mfaUsed ? 'text-emerald-600' : 'text-slate-600'}`}>
                  {log.mfaUsed ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Failed Attempts (Current Session)</span>
                <span className={`text-sm font-bold ${log.failedAttempts > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {log.failedAttempts}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4" /> Client Metadata
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-blue-300">
                {`{
  "ip_address": "${log.ipAddress}",
  "location": "${log.location}",
  "device": "${log.device}",
  "os": "${log.os}",
  "browser": "${log.browser}",
  "user_agent": "${log.userAgent}"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> User Info
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
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-semibold text-slate-500 flex justify-between">
                <span>Role:</span>
                <span className="text-slate-800 capitalize">{log.user.role}</span>
              </p>
              <p className="text-[11px] font-semibold text-slate-500 flex justify-between">
                <span>Tenant:</span>
                <span className="text-slate-800">{log.user.instituteName}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Server className="w-4 h-4" /> Session details
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">IP Address</p>
                <p className="text-xs font-mono text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                  {log.ipAddress}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                <p className="text-xs font-semibold text-slate-800">{log.location}</p>
              </div>
              {log.sessionDuration && (
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Session Duration</p>
                  <p className="text-xs font-semibold text-slate-800">{Math.floor(log.sessionDuration / 60)} mins</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
