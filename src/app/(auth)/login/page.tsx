import React from "react"
import { Metadata } from "next"
import { LoginForm } from "@/features/auth/components/LoginForm"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In - CampusOS",
  description: "Sign in to your CampusOS admin dashboard.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 w-full">
      {/* Left Sidebar - Marketing */}
      <div className="hidden lg:flex flex-col justify-between col-span-2 bg-[#020617] px-10 py-12 text-slate-50 relative overflow-hidden">
        {/* Modern SaaS Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10 space-y-12">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30">
              IM
            </div>
            <span className="text-xl font-bold tracking-tight">CampusOS</span>
          </div>

          <div className="space-y-4 max-w-sm">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back to your digital institute.</h1>
            <p className="text-slate-400 leading-relaxed text-sm">
              Manage your students, automate fee collection, and scale your operations with the most powerful SaaS platform built for educators.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} CampusOS. All rights reserved.
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

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign in to your account</h1>
            <p className="text-slate-500">Enter your credentials to access your portal.</p>
          </div>

          {/* Form directly on the background (no card) */}
          <LoginForm />

          <p className="mt-8 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer transition-colors">
              Sign up for a 14-day free trial
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
