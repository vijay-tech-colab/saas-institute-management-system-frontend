"use client"

import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { RegisterFormValues } from "../../schemas/register-schema"
import { AlertCircle } from "lucide-react"

export function OwnerDetailsStep() {
  const { register, control, formState: { errors } } = useFormContext<RegisterFormValues>()

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
      <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-1.5 font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{message}</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Owner Details</h2>
        <p className="text-sm text-slate-500">Please provide the primary owner's information to set up the admin account.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" required>Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="John Doe" 
            {...register("ownerDetails.fullName")} 
            error={!!errors.ownerDetails?.fullName}
          />
          <ErrorMessage message={errors.ownerDetails?.fullName?.message as string} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" required>Email Address</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="john@example.com" 
            {...register("ownerDetails.email")} 
            error={!!errors.ownerDetails?.email}
          />
          <ErrorMessage message={errors.ownerDetails?.email?.message as string} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile" required>Mobile Number</Label>
          <Input 
            id="mobile" 
            type="tel"
            placeholder="+91 9876543210" 
            {...register("ownerDetails.mobile")} 
            error={!!errors.ownerDetails?.mobile}
          />
          <ErrorMessage message={errors.ownerDetails?.mobile?.message as string} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="password" required>Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="••••••••" 
              {...register("ownerDetails.password")} 
              error={!!errors.ownerDetails?.password}
            />
            <ErrorMessage message={errors.ownerDetails?.password?.message as string} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" required>Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              placeholder="••••••••" 
              {...register("ownerDetails.confirmPassword")} 
              error={!!errors.ownerDetails?.confirmPassword}
            />
            <ErrorMessage message={errors.ownerDetails?.confirmPassword?.message as string} />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center space-x-3">
            <Controller
              name="ownerDetails.acceptTerms"
              control={control}
              render={({ field }) => (
                <Checkbox 
                  id="acceptTerms" 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              )}
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal text-slate-600">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </Label>
          </div>
          <ErrorMessage message={errors.ownerDetails?.acceptTerms?.message as string} />
        </div>
      </div>
    </motion.div>
  )
}
