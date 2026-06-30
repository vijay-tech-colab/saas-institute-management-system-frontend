"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { userAtom, UserRole } from "@/store/user-store"
import { Check, Shield, UserCog, GraduationCap, Users, User, ChevronDown } from "lucide-react"

const ROLES: { id: UserRole; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', icon: <Shield className="w-4 h-4" />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: 'ADMIN', label: 'Admin', icon: <UserCog className="w-4 h-4" />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'BRANCH_MANAGER', label: 'Branch Manager', icon: <Shield className="w-4 h-4" />, color: 'text-violet-600', bg: 'bg-violet-100' },
  { id: 'TEACHER', label: 'Teacher', icon: <Users className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'STUDENT', label: 'Student', icon: <GraduationCap className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 'PARENT', label: 'Parent', icon: <User className="w-4 h-4" />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
]

export function RoleSwitcherDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentRoleConfig = ROLES.find(r => r.id === user.role) || ROLES[1]

  const handleRoleChange = (role: UserRole) => {
    setUser({ ...user, role })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200/60 bg-white hover:bg-slate-50 transition-all duration-200 cursor-pointer shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30"
      >
        <div className={`p-1 rounded-full ${currentRoleConfig.bg} ${currentRoleConfig.color}`}>
          {currentRoleConfig.icon}
        </div>
        <span className="text-[12px] font-semibold text-slate-700 hidden sm:block">
          {currentRoleConfig.label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden z-50 origin-top-right"
          >
            <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Switch Role Mode
              </span>
            </div>
            <div className="p-1.5 space-y-0.5 max-h-[300px] overflow-y-auto thin-scrollbar">
              {ROLES.map((role) => {
                const isSelected = user.role === role.id
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleChange(role.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer group ${
                      isSelected ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1 rounded-md ${isSelected ? role.bg + ' ' + role.color : 'text-slate-400 group-hover:' + role.color + ' group-hover:' + role.bg}`}>
                        {role.icon}
                      </div>
                      <span className={`text-[13px] font-medium ${isSelected ? 'text-indigo-700' : 'text-slate-600'}`}>
                        {role.label}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
