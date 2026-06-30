"use client"

import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"

import { registerFormSchema, RegisterFormValues } from "../schemas/register-schema"
import { OwnerDetailsStep } from "./steps/OwnerDetailsStep"
import { InstituteInfoStep } from "./steps/InstituteInfoStep"
import { AddressBranchStep } from "./steps/AddressBranchStep"
import { PreferencesStep } from "./steps/PreferencesStep"
import { RegistrationFinishStep } from "./steps/RegistrationFinishStep"
import Link from "next/link"

const steps = [
  { title: "Owner Details", description: "Primary account info" },
  { title: "Institute Info", description: "Tell us about your school" },
  { title: "Address & Branch", description: "Main location details" },
  { title: "Preferences", description: "Global settings" },
]

export function MultiStepRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema) as any,
    mode: "onTouched",
    defaultValues: {
      ownerDetails: {
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        acceptTerms: undefined,
      },
      instituteInfo: {
        instituteName: "",
        instituteEmail: "",
        institutePhone: "",
        registrationNumber: "",
        gstNumber: "",
        website: "",
      },
      addressBranch: {
        branchName: "Main Branch",
        country: "",
        state: "",
        district: "",
        city: "",
        pinCode: "",
        fullAddress: "",
      },
      preferences: {
        timezone: "Asia/Kolkata",
        currency: "INR",
        language: "English",
        sessionStartMonth: "April",
        financialYear: "2026-27",
      }
    }
  })

  const { trigger, handleSubmit } = methods

  const handleNext = async () => {
    let isValid = false

    if (currentStep === 0) {
      isValid = await trigger("ownerDetails")
    } else if (currentStep === 1) {
      isValid = await trigger("instituteInfo")
    } else if (currentStep === 2) {
      isValid = await trigger("addressBranch")
    } else if (currentStep === 3) {
      isValid = await trigger("preferences")
    }

    if (isValid) {
      if (currentStep === 3) {
        await handleSubmit(onSubmit)()
      } else {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    console.log("Form Submitted", data)
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep(4)
    }, 1500)
  }

  const handleGoToDashboard = () => {
    console.log("Redirecting to dashboard...")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 w-full">
      {/* Left Sidebar - Marketing & Progress */}
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
            <h1 className="text-3xl font-extrabold tracking-tight">Join 10,000+ top institutes today.</h1>
            <p className="text-slate-400 leading-relaxed text-sm">
              Manage your students, automate fee collection, and scale your operations with the most powerful SaaS platform built for educators.
            </p>
          </div>

          <div className="pt-8">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © {new Date().getFullYear()} CampusOS. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form Wizard */}
      <div className="col-span-3 bg-[#FAFAFA] flex flex-col justify-center px-6 py-12 lg:px-20 relative min-h-screen">

        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden mb-8 space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30">
              IM
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusOS</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Start your 14-day free trial today. No credit card required.</p>
          <div className="pt-4 pb-4 border-b border-slate-200">
            <Stepper steps={steps} currentStep={currentStep} className="flex-row space-y-0 gap-4 overflow-x-auto pb-4" />
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center relative">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col min-h-[400px]">
              <div className="flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  {currentStep === 0 && <OwnerDetailsStep key="step-0" />}
                  {currentStep === 1 && <InstituteInfoStep key="step-1" />}
                  {currentStep === 2 && <AddressBranchStep key="step-2" />}
                  {currentStep === 3 && <PreferencesStep key="step-3" />}
                  {currentStep === 4 && (
                    <RegistrationFinishStep
                      key="step-4"
                      onGoToDashboard={handleGoToDashboard}
                    />
                  )}
                </AnimatePresence>
              </div>

              {currentStep < 4 && (
                <div className="mt-12 flex justify-between items-center pt-6 border-t border-slate-200 gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0 || isSubmitting}
                    className={currentStep === 0 ? "invisible" : ""}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex-1 md:flex-none md:min-w-[200px]"
                    size="lg"
                  >
                    {isSubmitting ? "Processing..." : currentStep === 3 ? "Complete Registration" : "Continue to Next Step"}
                  </Button>
                </div>
              )}
            </form>
          </FormProvider>

          {currentStep < 4 && (
            <p className="mt-8 text-center sm:text-left text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer transition-colors">
                Sign in here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
