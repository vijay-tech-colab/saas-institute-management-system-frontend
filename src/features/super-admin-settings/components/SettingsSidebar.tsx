"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { SettingsCategory, SettingsCategoryId } from "./PlatformSettingsView"

interface SettingsSidebarProps {
  categories: SettingsCategory[]
  activeCategoryId: SettingsCategoryId
  onSelectCategory: (id: SettingsCategoryId) => void
}

export function SettingsSidebar({ categories, activeCategoryId, onSelectCategory }: SettingsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter(category => 
    category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside className="w-full md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-white flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-auto md:h-full">
      <div className="p-3 md:p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search settings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto md:overflow-y-auto p-1.5 sm:p-2 md:p-3 flex md:flex-col gap-1.5 sm:gap-2 md:gap-0 md:space-y-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => {
            const Icon = category.icon
            const isActive = activeCategoryId === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex-shrink-0 md:w-full text-left flex items-center md:items-start gap-2 md:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-3 rounded-xl transition-all relative group ${
                  isActive 
                    ? 'bg-indigo-50/80 text-indigo-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`mt-0 md:mt-0.5 p-1.5 rounded-lg transition-colors flex-shrink-0 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-white border border-slate-200 text-slate-500 group-hover:border-slate-300 shadow-sm'}`}>
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <div className="flex flex-col whitespace-nowrap md:whitespace-normal">
                  <div className={`text-[13px] md:text-sm font-semibold ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {category.label}
                  </div>
                  <div className="hidden md:block text-xs text-slate-500 line-clamp-1 mt-0.5 leading-relaxed">
                    {category.description}
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="py-4 md:py-8 text-center text-sm text-slate-500 w-full">
            No settings found matching "{searchQuery}"
          </div>
        )}
      </div>
    </aside>
  )
}

