import React from "react"
import { Mail, MessageSquare, BellRing } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Notification Preferences</h2>
        <p className="text-sm text-slate-500 mt-1">Control how and when you want to be notified.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        
        {/* Email Notifications */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-slate-400" />
            Email Notifications
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <ToggleOption 
              title="Daily Summary" 
              description="Receive a daily email with a summary of your schedule and tasks." 
              defaultChecked={true} 
            />
            <ToggleOption 
              title="Direct Messages" 
              description="Get an email when someone sends you a direct message." 
              defaultChecked={true} 
            />
            <ToggleOption 
              title="System Alerts" 
              description="Important system alerts and maintenance announcements." 
              defaultChecked={true} 
            />
          </div>
        </section>

        {/* SMS Notifications */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-slate-400" />
            SMS Notifications
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
             <ToggleOption 
              title="Urgent Alerts" 
              description="Emergency alerts and highly urgent notifications from the institute." 
              defaultChecked={true} 
            />
            <ToggleOption 
              title="Attendance Alerts" 
              description="Receive SMS when marked absent (For Students/Parents)." 
              defaultChecked={false} 
            />
          </div>
        </section>

        {/* Push Notifications */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <BellRing className="w-5 h-5 text-slate-400" />
            Browser / Push Notifications
          </h3>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <ToggleOption 
              title="Enable Push Notifications" 
              description="Receive notifications directly in your browser even when the tab is closed." 
              defaultChecked={false} 
            />
          </div>
        </section>

      </div>
    </div>
  )
}

function ToggleOption({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="pr-8">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  )
}
