import React from "react"
import { Metadata } from "next"
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password - CampusOS",
  description: "Reset your CampusOS password.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 w-full">
      {/* Left Sidebar - Marketing */}
      <div className="hidden lg:flex flex-col justify-between col-span-2 bg-[#020617] px-10 py-12 text-slate-50 relative overflow-hidden">
        {/* Modern SaaS Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[25%] -left-[20%] w-[70%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] -right-[20%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[10%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Glassmorphism accent shapes */}
          <div className="absolute top-[30%] right-[10%] w-32 h-32 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl backdrop-blur-xl border border-white/10 rotate-12 animate-pulse duration-1000"></div>
          <div className="absolute bottom-[40%] left-[15%] w-20 h-20 bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 rounded-full backdrop-blur-xl border border-white/10 -rotate-12"></div>
        </div>

        <div className="relative z-10 space-y-12">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-default">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold shadow-lg shadow-indigo-600/30 ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
              IM
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              CampusOS
            </span>
          </div>

          <div className="space-y-5 max-w-sm">
            <h1 className="text-4xl font-extrabold tracking-tight leading-[1.1] text-white">
              Regain access to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">workspace.</span>
            </h1>
            <p className="text-slate-400/90 leading-relaxed text-sm font-medium">
              Don't worry, it happens to the best of us. Enter your email and we'll help you get back to managing your digital institute in no time.
            </p>
          </div>
          
          {/* Feature Highlight snippet */}
          <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-200">Secure Recovery</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We employ enterprise-grade security to ensure your account recovery process is safe, seamless, and fully protected.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm font-medium text-slate-500/80 flex items-center justify-between max-w-sm">
          <span>© {new Date().getFullYear()} CampusOS.</span>
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="col-span-3 bg-[#FAFAFA] flex flex-col justify-center px-6 py-12 lg:px-20 relative min-h-screen">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden mb-8 space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30">
              IM
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusOS</span>
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center relative">
          
          <ForgotPasswordForm />
        </div>

      </div>
    </div>
  )
}
