"use client";

import React from "react";

export default function ProfilePage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Super Admin Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal details, credentials, and administrator avatar.
        </p>
      </header>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Personal Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Update your photo and personal details here.</p>
        </div>

        <div className="space-y-8 max-w-2xl">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500 overflow-hidden relative group cursor-pointer border border-slate-300">
              J
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white font-medium">Upload</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
                  Change Avatar
                </button>
                <button className="px-4 py-2 text-rose-600 text-sm font-semibold rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
                  Remove
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">First Name</label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed focus:outline-none"
                readOnly
              />
              <p className="text-xs text-slate-500">To change your email address, please contact your administrator.</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
            <button className="px-5 py-2.5 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg shadow-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
