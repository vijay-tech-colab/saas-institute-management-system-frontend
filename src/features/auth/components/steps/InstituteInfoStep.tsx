"use client"

import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { RegisterFormValues } from "../../schemas/register-schema"
import { AlertCircle } from "lucide-react"

export function InstituteInfoStep() {
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
        <h2 className="text-2xl font-bold text-slate-900">Institute Information</h2>
        <p className="text-sm text-slate-500">Tell us a bit about your educational institution.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="instituteName" required>Institute Name</Label>
          <Input 
            id="instituteName" 
            placeholder="e.g. Global Tech Institute" 
            {...register("instituteInfo.instituteName")} 
            error={!!errors.instituteInfo?.instituteName}
          />
          <ErrorMessage message={errors.instituteInfo?.instituteName?.message as string} />
        </div>

        <div className="space-y-2">
          <Label required>Institute Type</Label>
          <Controller
            name="instituteInfo.instituteType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger error={!!errors.instituteInfo?.instituteType} className="h-12 rounded-xl">
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Institute">Computer Institute</SelectItem>
                  <SelectItem value="Coaching">Coaching</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <ErrorMessage message={errors.instituteInfo?.instituteType?.message as string} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number <span className="text-slate-400 font-normal">(Optional)</span></Label>
            <Input 
              id="registrationNumber" 
              placeholder="REG-12345" 
              {...register("instituteInfo.registrationNumber")} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number <span className="text-slate-400 font-normal">(Optional)</span></Label>
            <Input 
              id="gstNumber" 
              placeholder="22AAAAA0000A1Z5" 
              {...register("instituteInfo.gstNumber")} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="instituteEmail">Institute Email</Label>
            <Input 
              id="instituteEmail" 
              type="email"
              placeholder="info@institute.com" 
              {...register("instituteInfo.instituteEmail")} 
              error={!!errors.instituteInfo?.instituteEmail}
            />
            <ErrorMessage message={errors.instituteInfo?.instituteEmail?.message as string} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institutePhone">Institute Phone</Label>
            <Input 
              id="institutePhone" 
              type="tel"
              placeholder="+91 1122334455" 
              {...register("instituteInfo.institutePhone")} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website <span className="text-slate-400 font-normal">(Optional)</span></Label>
          <Input 
            id="website" 
            type="url"
            placeholder="https://www.institute.com" 
            {...register("instituteInfo.website")} 
            error={!!errors.instituteInfo?.website}
          />
          <ErrorMessage message={errors.instituteInfo?.website?.message as string} />
        </div>
      </div>
    </motion.div>
  )
}
