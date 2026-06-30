"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, FolderTree, AlertCircle, Clock, Shield, 
  Bell, Mail, Paperclip, Workflow, Plus, Trash2, Edit2
} from "lucide-react"

export default function SupportSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Settings className="h-8 w-8 text-indigo-600" />
            Support Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">Configure global rules, SLAs, and preferences for the Support module.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Discard Changes</Button>
          <Button>Save Settings</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {[
              { id: "general", label: "General", icon: Settings },
              { id: "categories", label: "Categories & Tags", icon: FolderTree },
              { id: "sla", label: "SLA Policies", icon: Clock },
              { id: "statuses", label: "Statuses & Priorities", icon: AlertCircle },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "email", label: "Email Templates", icon: Mail },
              { id: "automation", label: "Automations", icon: Workflow },
              { id: "files", label: "Attachments", icon: Paperclip },
              { id: "roles", label: "Roles & Permissions", icon: Shield },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Panels */}
        <div className="flex-1">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Preferences</CardTitle>
                  <CardDescription>Basic configurations for the support ticketing system.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Ticket Number Format</label>
                      <Input defaultValue="TCK-{YYYY}-{ID}" />
                      <p className="text-xs text-slate-500">Variables: {`{YYYY}`}, {`{MM}`}, {`{ID}`}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Default Assigned Department</label>
                      <select className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600">
                        <option>General Support</option>
                        <option>Technical Team</option>
                        <option>Billing Team</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Customer Satisfaction (CSAT)</label>
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4" defaultChecked />
                        <span className="text-sm text-slate-700">Send CSAT survey when ticket is resolved</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours & Holidays</CardTitle>
                  <CardDescription>Define working hours to accurately calculate SLAs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Timezone</label>
                    <select className="w-full md:w-1/2 h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600">
                      <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                      <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                      <option>(UTC+00:00) London</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 py-3 border-t border-slate-100">
                    <div className="w-32 text-sm font-medium text-slate-700">Monday-Friday</div>
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span className="text-slate-500">to</span>
                    <Input type="time" defaultValue="17:00" className="w-32" />
                  </div>
                  <div className="flex items-center gap-4 py-3 border-t border-slate-100 opacity-50">
                    <div className="w-32 text-sm font-medium text-slate-700">Saturday-Sunday</div>
                    <div className="text-sm">Closed</div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Holiday Exception
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>Manage ticket categories and sub-categories.</CardDescription>
                </div>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New Category</Button>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Default Assignee</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: "Technical", desc: "System errors, login issues", assignee: "IT Support" },
                        { name: "Billing", desc: "Payment failures, invoices", assignee: "Finance Team" },
                        { name: "Academic", desc: "Course material, grades", assignee: "Academic Coords" },
                      ].map((cat, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{cat.name}</td>
                          <td className="px-4 py-3 text-slate-600">{cat.desc}</td>
                          <td className="px-4 py-3 text-slate-600">{cat.assignee}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><Edit2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SLA Tab */}
          {activeTab === "sla" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>SLA Policies</CardTitle>
                  <CardDescription>Define response and resolution time targets based on priority.</CardDescription>
                </div>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New SLA Rule</Button>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3">Priority</th>
                        <th className="px-4 py-3">First Response</th>
                        <th className="px-4 py-3">Resolution</th>
                        <th className="px-4 py-3">Escalation Rule</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { p: "Critical", r: "1 Hour", res: "4 Hours", esc: "Notify Super Admin" },
                        { p: "High", r: "4 Hours", res: "24 Hours", esc: "Notify Manager" },
                        { p: "Medium", r: "24 Hours", res: "3 Days", esc: "Auto-bump priority" },
                      ].map((rule, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{rule.p}</td>
                          <td className="px-4 py-3 text-slate-600">{rule.r}</td>
                          <td className="px-4 py-3 text-slate-600">{rule.res}</td>
                          <td className="px-4 py-3 text-slate-600">{rule.esc}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><Edit2 className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fallback for other tabs */}
          {["statuses", "notifications", "email", "automation", "files", "roles"].includes(activeTab) && (
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{activeTab.replace('-', ' ')} Settings</CardTitle>
                <CardDescription>This section is under construction. Settings module will be populated here.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 m-6 mt-0">
                <div className="text-center text-slate-500">
                  <Settings className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>Configuration panel for {activeTab}</p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
