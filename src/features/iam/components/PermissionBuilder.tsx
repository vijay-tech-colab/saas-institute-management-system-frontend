'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { Settings2, Shield, Code, ListTree, Activity, Play, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PermissionBuilder() {
  const [activeTab, setActiveTab] = useState<'basic' | 'scope' | 'deps' | 'script'>('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: Shield },
    { id: 'scope', label: 'Scope & Settings', icon: Settings2 },
    { id: 'deps', label: 'Hierarchy & Dependencies', icon: ListTree },
    { id: 'script', label: 'Conditions & Scripts', icon: Code },
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Permission Builder"
        description="Dynamically construct and test new system permissions with advanced routing and conditions."
        breadcrumbs={[{ label: 'IAM' }, { label: 'Permissions' }, { label: 'Builder' }]}
      >
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" /> Test Permission
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-sm shadow-indigo-200">
            <Check className="w-4 h-4" /> Save & Publish
          </button>
        </div>
      </PageHeader>

      <div className="flex flex-col flex-1 min-h-0">
        {/* Custom Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 px-1 shrink-0 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all relative whitespace-nowrap ${
                  isActive ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-auto bg-transparent relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              {/* Removed max-w-4xl to make it full screen width */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 lg:p-8 w-full">
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                      <p className="text-sm text-slate-500 mt-1">Define the core identity of this permission.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Permission Name</label>
                        <input type="text" placeholder="e.g. Delete User" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Permission Key (Auto-generated)</label>
                        <input type="text" placeholder="users.delete" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Description</label>
                      <textarea rows={3} placeholder="What does this permission allow?" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Module</label>
                        <Select defaultValue="user-management">
                          <SelectTrigger className="w-full h-[42px] rounded-xl border-slate-200">
                            <SelectValue placeholder="Select Module" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user-management">User Management</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="settings">Settings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Sub Module</label>
                        <Select defaultValue="core-users">
                          <SelectTrigger className="w-full h-[42px] rounded-xl border-slate-200">
                            <SelectValue placeholder="Select Sub Module" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="core-users">Core Users</SelectItem>
                            <SelectItem value="administrators">Administrators</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Action Type</label>
                        <Select defaultValue="create">
                          <SelectTrigger className="w-full h-[42px] rounded-xl border-slate-200">
                            <SelectValue placeholder="Select Action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="create">Create</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                            <SelectItem value="delete">Delete</SelectItem>
                            <SelectItem value="execute">Execute</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'scope' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Scope & Risk Assessment</h3>
                      <p className="text-sm text-slate-500 mt-1">Determine where and how this permission operates.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Risk Level</label>
                        <Select defaultValue="critical">
                          <SelectTrigger className="w-full h-[42px] rounded-xl border-rose-200 bg-rose-50 text-rose-900 focus:ring-rose-500/20">
                            <SelectValue placeholder="Select Risk Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical (High Risk)</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="low">Low Risk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Permission Scope</label>
                        <Select defaultValue="global">
                          <SelectTrigger className="w-full h-[42px] rounded-xl border-slate-200">
                            <SelectValue placeholder="Select Scope" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="global">Global (All Tenants)</SelectItem>
                            <SelectItem value="tenant">Tenant Level</SelectItem>
                            <SelectItem value="branch">Branch Level</SelectItem>
                            <SelectItem value="user">User Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-5 border border-amber-200 bg-amber-50 rounded-2xl mt-4">
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-amber-900">Audit Logging</h4>
                          <p className="text-xs text-amber-700 mt-1">Because this is marked as "Critical" risk, all usages of this permission will be mandatorily logged and retained for 7 years as per compliance policy.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'script' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Conditional Scripts</h3>
                      <p className="text-sm text-slate-500 mt-1">Write evaluated expressions to dynamically grant or deny this permission at runtime.</p>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
                      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">condition.js</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Syntax Valid</span>
                      </div>
                      <textarea 
                        rows={12} 
                        className="w-full bg-slate-900 text-slate-300 font-mono text-sm p-5 outline-none resize-none leading-relaxed"
                        defaultValue={`// IF User Department = Accounts AND Subscription = Premium
if (context.user.department === 'Accounts' && context.tenant.plan === 'Premium') {
  return true; // Allow Action
}

// IF Trial Expired
if (context.tenant.trialExpired) {
  return false; // Deny Premium Features
}

return context.defaultRole.hasPermission;`}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'deps' && (
                  <div className="space-y-6 flex flex-col items-center justify-center min-h-[300px]">
                     <div className="text-center">
                       <ListTree className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                       <h3 className="text-lg font-bold text-slate-900 mb-2">Dependency Graph Viewer</h3>
                       <p className="text-sm text-slate-500">Visual drag-and-drop tree coming soon.<br/>Allows mapping parent/child permissions automatically.</p>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
