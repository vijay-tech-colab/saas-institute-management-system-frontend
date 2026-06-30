import React from "react"
import { Server, Globe, Shield, Database } from "lucide-react"

export function PlatformSettings() {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Platform Configuration</h2>
          <p className="text-sm text-slate-500 mt-1">Super Admin controls for system-wide behaviors.</p>
        </div>
        <button className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
          Save Configuration
        </button>
      </div>

      <div className="max-w-3xl space-y-8">
        
        {/* System Status */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-slate-400" />
            System Status & Maintenance
          </h3>
          <div className="bg-white border border-rose-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                <p className="text-xs text-slate-500 mt-1">When enabled, only Super Admins can log into the platform. A maintenance screen will be shown to all other users.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Global Features */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-slate-400" />
            Global Feature Flags
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 shadow-sm">
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-900">Beta Analytics Dashboard</p>
                <p className="text-xs text-slate-500 mt-0.5">Enable the new V2 analytics dashboard for all Enterprise plan users.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-900">Public Registration</p>
                <p className="text-xs text-slate-500 mt-0.5">Allow new institutes to register themselves from the landing page.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-900">Enforce 2FA</p>
                <p className="text-xs text-slate-500 mt-0.5">Force all Institute Admins to set up Two-Factor Authentication.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Email & SMTP */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-400" />
            SMTP & Email Configuration
          </h3>
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">SMTP Host</label>
                <input type="text" defaultValue="smtp.mailgun.org" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">SMTP Port</label>
                <input type="text" defaultValue="587" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">SMTP User</label>
                <input type="text" defaultValue="postmaster@institute-os.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">SMTP Password</label>
                <input type="password" defaultValue="****************" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
            </div>
            <div className="pt-2">
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">Send Test Email</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


