import React from "react"
import { Building, MapPin, Globe, Phone } from "lucide-react"

export function InstituteSettings() {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Institute Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your institute's public details and branding.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
          Save Profile
        </button>
      </div>

      <div className="max-w-3xl space-y-8">
        
        {/* Branding */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Branding</h3>
          <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-indigo-400 hover:text-indigo-600 transition-colors">
              <Building className="w-8 h-8 mb-1" />
              <span className="text-xs font-medium">Upload Logo</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Institute Logo</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                This logo will appear on student dashboards, fee receipts, and reports. Recommended size is 256x256px in PNG format.
              </p>
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Institute Name</label>
              <input type="text" defaultValue="Delhi Public School" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Registration Number / Code</label>
              <input type="text" defaultValue="DPS-10029" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Established Year</label>
              <input type="text" defaultValue="1995" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4"/> Address</label>
              <textarea rows={3} defaultValue="123 Education Lane, Knowledge Park, Delhi, India - 110001" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4"/> Primary Phone</label>
              <input type="tel" defaultValue="+91 11 2345 6789" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Globe className="w-4 h-4"/> Website</label>
              <input type="url" defaultValue="https://www.dps-example.edu" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}


