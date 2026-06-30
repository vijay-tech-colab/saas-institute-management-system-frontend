import React from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { SecurityEvent } from '../types';
import { format } from 'date-fns';
import { ShieldAlert, ShieldCheck, Clock, User, Fingerprint, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface SecurityEventDetailsModalProps {
  event: SecurityEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityEventDetailsModal({ event, isOpen, onClose }: SecurityEventDetailsModalProps) {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Security Event Details" size="xl">
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 ${
              event.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
              event.severity === 'high' ? 'bg-orange-100 text-orange-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="uppercase">{event.severity}</span>
            </span>
            <span className="text-sm font-bold text-slate-800">
              {event.eventType}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Event ID: {event.id} • {format(new Date(event.timestamp), 'PPpp')}</p>
        </div>
        <div>
          {event.resolved ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <CheckCircle className="w-4 h-4" /> Resolved
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
              <AlertTriangle className="w-4 h-4" /> Action Required
            </span>
          )}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" /> Description & Mitigation
            </h4>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Automated Mitigation Taken</p>
                <p className="text-sm font-medium text-blue-900 leading-relaxed">
                  {event.mitigationActionTaken}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4" /> Network & Client Info
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-emerald-300">
                {`{
  "ip_address": "${event.ipAddress}",
  "location": "Determined by IP (Lookup disabled)",
  "threat_level": "${event.severity.toUpperCase()}",
  "flagged_by": "Heuristics Engine v2.4"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Affected User
            </h4>
            {event.affectedUser ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {event.affectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{event.affectedUser.name}</p>
                    <p className="text-[11px] text-slate-500">{event.affectedUser.email}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-500 flex justify-between">
                    <span>Role:</span>
                    <span className="text-slate-800">{event.affectedUser.role}</span>
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 flex justify-between">
                    <span>Tenant:</span>
                    <span className="text-slate-800 truncate max-w-[120px]" title={event.affectedUser.instituteName}>{event.affectedUser.instituteName}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500 py-2 text-center bg-slate-50 rounded-lg">No specific user associated with this event.</p>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeline
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-slate-200">
                <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white z-10 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Event Detected</p>
                  <p className="text-[10px] text-slate-500">{format(new Date(event.timestamp), 'MMM d, HH:mm:ss')}</p>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white z-10 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Mitigation Applied</p>
                  <p className="text-[10px] text-slate-500">{format(new Date(event.timestamp), 'MMM d, HH:mm:ss')} (+0.2s)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
        <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          Close
        </button>
        {!event.resolved && (
          <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            Investigate
          </button>
        )}
      </div>
    </Modal>
  );
}
