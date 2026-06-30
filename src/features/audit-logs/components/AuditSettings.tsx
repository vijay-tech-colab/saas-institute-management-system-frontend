'use client';

import React, { useState } from 'react';
import { PageHeader, Toggle, CustomSelect } from '@/features/subscriptions/components/shared/UIComponents';
import { Save, Shield, HardDrive, Bell, Globe, Activity } from 'lucide-react';

export function AuditSettings() {
  const [retention, setRetention] = useState('90');
  const [geoTracking, setGeoTracking] = useState(true);
  const [ipTracking, setIpTracking] = useState(true);
  const [sessionRecording, setSessionRecording] = useState(false);
  const [apiLogging, setApiLogging] = useState(true);
  const [maskSensitive, setMaskSensitive] = useState(true);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader 
        title="Audit & Security Settings" 
        description="Configure how logs are collected, stored, and retained across your platform."
        breadcrumbs={[{ label: 'Audit Logs' }, { label: 'Settings' }]}
      >
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </PageHeader>

      <div className="space-y-6">
        {/* Storage & Retention */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Data Retention & Storage</h2>
              <p className="text-xs text-slate-500 mt-0.5">Configure how long audit logs are kept before being archived or deleted.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">Default Retention Period</label>
                <p className="text-xs text-slate-500 mb-3">Logs older than this period will be automatically archived to cold storage.</p>
                <CustomSelect 
                  value={retention} 
                  onChange={setRetention}
                  buttonClassName="h-12 w-full px-4 rounded-xl text-sm"
                  options={[
                    { label: '30 Days', value: '30' },
                    { label: '90 Days', value: '90' },
                    { label: '180 Days', value: '180' },
                    { label: '1 Year', value: '365' },
                    { label: 'Indefinitely (Enterprise Only)', value: 'infinite' },
                  ]}
                />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
              <h4 className="text-sm font-bold text-slate-900 mb-2">Current Storage Usage</h4>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full w-[45%]"></div>
              </div>
              <p className="text-xs font-semibold text-slate-500">450 GB / 1 TB Used</p>
            </div>
          </div>
        </div>

        {/* Security & Tracking */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Security & Tracking</h2>
              <p className="text-xs text-slate-500 mt-0.5">Control what user data is logged during authentication and activities.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">IP Address Tracking</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">Record the IP addresses of users for every login attempt and critical action.</p>
              </div>
              <Toggle checked={ipTracking} onChange={setIpTracking} />
            </div>
            
            <div className="flex items-start justify-between pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Geo-Location Tracking</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">Automatically resolve IP addresses to physical locations (City, Country).</p>
              </div>
              <Toggle checked={geoTracking} onChange={setGeoTracking} />
            </div>

            <div className="flex items-start justify-between pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  High-Risk Session Recording <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] uppercase tracking-wider rounded">Beta</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">Record video replays of user sessions flagged as Critical risk by AI.</p>
              </div>
              <Toggle checked={sessionRecording} onChange={setSessionRecording} />
            </div>
          </div>
        </div>

        {/* Advanced Logging */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Advanced Logging</h2>
              <p className="text-xs text-slate-500 mt-0.5">Configure API and sensitive data handling.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Comprehensive API Logging</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">Log every API request including headers, payload sizes, and response times.</p>
              </div>
              <Toggle checked={apiLogging} onChange={setApiLogging} />
            </div>
            
            <div className="flex items-start justify-between pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Mask Sensitive Data (PII)</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">Automatically mask passwords, tokens, and financial data in raw request payloads.</p>
              </div>
              <Toggle checked={maskSensitive} onChange={setMaskSensitive} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
