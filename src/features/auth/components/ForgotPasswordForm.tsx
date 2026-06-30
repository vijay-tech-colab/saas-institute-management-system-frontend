"use client"

import React, { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { forgotPasswordSchema, ForgotPasswordFormData } from "../schemas/forgot-password-schema"
import Link from "next/link"

type Step = "email" | "otp" | "password" | "success" | any

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)

  // OTP State
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // New Password State
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [step, countdown])

  const handleResend = async () => {
    setIsResending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setCountdown(60)
    } finally {
      setIsResending(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
      <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-1.5 font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{message}</span>
      </div>
    )
  }

  const onSubmitEmail = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("otp")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.some(v => !v)) return
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("password")
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    setPasswordError("")
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("success")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "success") {
    return (
      <div className="w-full animate-in fade-in zoom-in-95 duration-500 space-y-6 text-center py-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2 shadow-sm border border-emerald-200/50">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-slate-900 mb-2">Password Reset!</h3>
          <p className="text-sm text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
        </div>
        <div className="pt-6">
          <Link href="/login" className="inline-flex items-center justify-center w-full h-11 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.98]">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      {step === "email" && (
        <>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Forgot your password?</h1>
            <p className="text-slate-500">We'll send you an OTP to reset it securely.</p>
          </div>
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" required>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@institute.com"
                  {...register("email")}
                  disabled={isLoading}
                  error={!!errors.email}
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm">
                {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : "Send OTP"}
              </Button>
            </form>
          </div>
        </>
      )}

      {step === "otp" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="mb-10">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 border border-indigo-100">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Check your email</h1>
            <p className="text-slate-500">We sent a 4-digit code to <span className="font-semibold text-slate-700">{getValues("email")}</span></p>
          </div>

          <form onSubmit={onSubmitOtp} className="space-y-6">
            <div className="space-y-4">
              <Label>Verification Code</Label>
              <div className="flex justify-between gap-2 max-w-[280px]">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    disabled={isLoading}
                    className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all disabled:opacity-50"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isLoading || otp.some(v => !v)} className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm">
              {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...</> : "Verify OTP"}
            </Button>
          </form>

          <p className="mt-8 text-center sm:text-left text-sm text-slate-500">
            Didn't receive the code?{" "}
            {countdown > 0 ? (
              <span className="font-medium text-slate-400">Resend in {countdown}s</span>
            ) : (
              <button onClick={handleResend} disabled={isResending} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </p>
        </div>
      )}

      {step === "password" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="mb-10">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 border border-indigo-100">
              <KeyRound className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create new password</h1>
            <p className="text-slate-500">Your new password must be different from previous used passwords.</p>
          </div>

          <form onSubmit={onSubmitPassword} className="space-y-5">
            <div className="space-y-2">
              <Label required>New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label required>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <ErrorMessage message={passwordError} />
            </div>
            <Button type="submit" disabled={isLoading || !newPassword || !confirmPassword} className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm">
              {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Resetting...</> : "Reset Password"}
            </Button>
          </form>
        </div>
      )}

      {step !== "success" && (
        <div className="mt-8 pt-6 border-t border-slate-100 text-center sm:text-left">
          <Link href="/login" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>
      )}
    </div>
  )
}
