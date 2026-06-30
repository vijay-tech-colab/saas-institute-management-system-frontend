import React from "react"

interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="mb-5 sm:mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-2.5 sm:mb-3 px-1">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs md:text-sm text-slate-500 mt-0.5 max-w-3xl">{description}</p>
        )}
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </section>
  )
}

interface SettingsRowProps {
  title: string
  description?: string
  children: React.ReactNode
  htmlFor?: string
}

export function SettingsRow({ title, description, children, htmlFor }: SettingsRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start lg:items-center py-3 md:py-4 px-3 sm:px-4 md:px-5 gap-2 sm:gap-3 md:gap-4 border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50">
      <div className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0">
        <label htmlFor={htmlFor} className="block text-[13.5px] md:text-sm font-medium text-slate-700">
          {title}
        </label>
        {description && (
          <p className="text-[11.5px] md:text-xs text-slate-500 mt-0.5 leading-relaxed sm:pr-2 lg:pr-4">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 w-full max-w-4xl mt-1 sm:mt-0">
        {children}
      </div>
    </div>
  )
}

