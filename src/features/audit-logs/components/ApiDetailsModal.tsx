import React from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { ApiLog } from '../types';
import { format } from 'date-fns';
import { Server, Clock, Database, Braces, Activity } from 'lucide-react';

interface ApiDetailsModalProps {
  log: ApiLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApiDetailsModal({ log, isOpen, onClose }: ApiDetailsModalProps) {
  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="API Request Details" size="xl">
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              log.method === 'GET' ? 'bg-blue-100 text-blue-700' :
              log.method === 'POST' ? 'bg-emerald-100 text-emerald-700' :
              log.method === 'DELETE' ? 'bg-rose-100 text-rose-700' :
              log.method === 'PUT' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-200 text-slate-700'
            }`}>
              {log.method}
            </span>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              log.statusCode >= 500 ? 'bg-rose-100 text-rose-700' :
              log.statusCode >= 400 ? 'bg-amber-100 text-amber-700' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {log.statusCode}
            </span>
            <span className="text-sm font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">{log.endpoint}</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Req ID: {log.id} • {format(new Date(log.timestamp), 'PPpp')}</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          Copy as cURL
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Braces className="w-4 h-4" /> Request Headers
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-blue-300">
                {`{
  "Authorization": "Bearer eyJhbGci...",
  "Content-Type": "application/json",
  "User-Agent": "CampusOS-Client/1.0",
  "X-Correlation-ID": "${log.correlationId}"
}`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" /> Request Body
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-emerald-300">
                {log.requestBodyPreview || '{\n  // Empty payload\n}'}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" /> Response Body
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className={`text-[11px] font-mono ${log.statusCode >= 400 ? 'text-rose-300' : 'text-emerald-300'}`}>
                {log.responseBodyPreview || '{\n  "message": "Success",\n  "data": []\n}'}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Performance Metrics
            </h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Response Time</span>
                <span className={`text-xs font-bold ${log.responseTimeMs > 1000 ? 'text-rose-600' : log.responseTimeMs > 500 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {log.responseTimeMs} ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Request Size</span>
                <span className="text-xs font-bold text-slate-700">{log.requestSizeKb} KB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Response Size</span>
                <span className="text-xs font-bold text-slate-700">{log.responseSizeKb} KB</span>
              </div>
              {log.memoryUsageMb && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Memory Usage</span>
                  <span className="text-xs font-bold text-slate-700">{log.memoryUsageMb} MB</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Server className="w-4 h-4" /> Environment Info
            </h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">IP Address</span>
                <span className="text-xs font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">{log.ipAddress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Environment</span>
                <span className="text-xs font-bold text-slate-700 capitalize">{log.environment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Requested By</span>
                <span className="text-xs font-bold text-slate-700">{log.requestedBy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Tenant</span>
                <span className="text-xs font-bold text-slate-700">{log.tenantName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
