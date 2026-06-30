import React from "react"
import { Smartphone, Laptop, Key, ShieldAlert } from "lucide-react"

export function SecuritySettings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Security & Password</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your password and secure your account.</p>
      </div>

      <div className="max-w-2xl space-y-10">
        
        {/* Password Update */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-slate-400" />
            Change Password
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
              </div>
            </div>
            <button className="mt-2 px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              Update Password
            </button>
          </div>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        {/* 2FA */}
        <section>
           <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-slate-400" />
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md">Add an extra layer of security to your account by requiring a code from your authenticator app upon login.</p>
            </div>
            <button className="px-5 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              Enable 2FA
            </button>
          </div>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        {/* Active Sessions */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Sessions</h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <div className="p-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">MacBook Pro - Chrome (Current Session)</p>
                  <p className="text-xs text-slate-500">New York, USA • IP: 192.168.1.1</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">iPhone 13 - Safari</p>
                  <p className="text-xs text-slate-500">New York, USA • Last active 2 days ago</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">Revoke</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


