"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { RegisterFormValues } from "../../schemas/register-schema"
import { AlertCircle } from "lucide-react"

export function AddressBranchStep() {
  const { register, formState: { errors } } = useFormContext<RegisterFormValues>()

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
        <h2 className="text-2xl font-bold text-slate-900">Address & First Branch</h2>
        <p className="text-sm text-slate-500">Set up your main branch location details.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="branchName" required>Branch Name</Label>
          <Input 
            id="branchName" 
            placeholder="e.g. Main Branch" 
            {...register("addressBranch.branchName")} 
            error={!!errors.addressBranch?.branchName}
          />
          <ErrorMessage message={errors.addressBranch?.branchName?.message as string} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="country" required>Country</Label>
            <Input 
              id="country" 
              placeholder="India" 
              {...register("addressBranch.country")} 
              error={!!errors.addressBranch?.country}
            />
            <ErrorMessage message={errors.addressBranch?.country?.message as string} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" required>State</Label>
            <Input 
              id="state" 
              placeholder="Maharashtra" 
              {...register("addressBranch.state")} 
              error={!!errors.addressBranch?.state}
            />
            <ErrorMessage message={errors.addressBranch?.state?.message as string} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="district" required>District</Label>
            <Input 
              id="district" 
              placeholder="Pune" 
              {...register("addressBranch.district")} 
              error={!!errors.addressBranch?.district}
            />
            <ErrorMessage message={errors.addressBranch?.district?.message as string} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" required>City</Label>
            <Input 
              id="city" 
              placeholder="Pune" 
              {...register("addressBranch.city")} 
              error={!!errors.addressBranch?.city}
            />
            <ErrorMessage message={errors.addressBranch?.city?.message as string} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pinCode" required>Pin Code</Label>
          <Input 
            id="pinCode" 
            placeholder="411001" 
            {...register("addressBranch.pinCode")} 
            error={!!errors.addressBranch?.pinCode}
          />
          <ErrorMessage message={errors.addressBranch?.pinCode?.message as string} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullAddress" required>Full Address</Label>
          <Input 
            id="fullAddress" 
            placeholder="123, Tech Street, Phase 1" 
            {...register("addressBranch.fullAddress")} 
            error={!!errors.addressBranch?.fullAddress}
          />
          <ErrorMessage message={errors.addressBranch?.fullAddress?.message as string} />
        </div>

      </div>
    </motion.div>
  )
}
