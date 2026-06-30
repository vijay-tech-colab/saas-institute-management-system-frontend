import React from "react"
import { SettingsSection, SettingsRow } from "../SettingsSection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud } from "lucide-react"

export function BrandingSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Branding</h2>
        <p className="text-slate-500 mt-1">Customize the visual identity of the platform.</p>
      </div>

      <SettingsSection title="Logos & Images" description="Upload your brand assets.">
        <SettingsRow title="Platform Logo" description="Main logo displayed in the dashboard header.">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 border-dashed">
              <span className="text-xs text-slate-400 font-medium">Logo</span>
            </div>
            <Button variant="outline" className="flex gap-2">
              <UploadCloud className="w-4 h-4" />
              Upload Logo
            </Button>
          </div>
        </SettingsRow>
        <SettingsRow title="Favicon" description="Small icon displayed in browser tabs.">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 border-dashed">
              <span className="text-[10px] text-slate-400 font-medium">Icon</span>
            </div>
            <Button variant="outline" className="flex gap-2">
              <UploadCloud className="w-4 h-4" />
              Upload Favicon
            </Button>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Theme Preferences" description="Choose a base theme and primary color palette for the platform.">
        <SettingsRow title="Color Theme" description="Select the primary brand color for active states and highlights.">
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Indigo', color: 'bg-indigo-600', active: true },
              { name: 'Emerald', color: 'bg-emerald-500', active: false },
              { name: 'Rose', color: 'bg-rose-500', active: false },
              { name: 'Amber', color: 'bg-amber-500', active: false },
              { name: 'Ocean', color: 'bg-blue-500', active: false },
              { name: 'Violet', color: 'bg-violet-600', active: false },
              { name: 'Slate', color: 'bg-slate-800', active: false },
            ].map((theme) => (
              <div 
                key={theme.name}
                className={`flex flex-col items-center gap-2 cursor-pointer group p-2 rounded-xl transition-all ${theme.active ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
              >
                <div className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${theme.color} ring-offset-2 transition-all ${theme.active ? 'ring-2 ring-slate-900 ring-offset-2 scale-110' : 'group-hover:scale-105'}`}>
                  {theme.active && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-[11px] font-medium ${theme.active ? 'text-slate-900' : 'text-slate-500'}`}>{theme.name}</span>
              </div>
            ))}
          </div>
        </SettingsRow>
        <SettingsRow title="Appearance Mode" description="Default dark or light mode for the platform.">
          <div className="flex gap-4">
            <div className="flex items-center gap-3 p-3 border-2 border-indigo-600 bg-indigo-50/30 rounded-xl cursor-pointer shadow-sm relative overflow-hidden">
              <div className="w-4 h-4 rounded-full border-[5px] border-indigo-600" />
              <span className="text-sm font-semibold text-slate-900">Light Mode</span>
            </div>
            <div className="flex items-center gap-3 p-3 border-2 border-transparent bg-slate-900 rounded-xl cursor-pointer shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="w-4 h-4 rounded-full border-[1.5px] border-slate-500 group-hover:border-slate-400" />
              <span className="text-sm font-semibold text-white">Dark Mode</span>
            </div>
            <div className="flex items-center gap-3 p-3 border-2 border-slate-200 bg-white rounded-xl cursor-pointer shadow-sm relative overflow-hidden group hover:border-slate-300 transition-all">
              <div className="w-4 h-4 rounded-full border-[1.5px] border-slate-300 group-hover:border-slate-400" />
              <span className="text-sm font-semibold text-slate-700">System</span>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}
