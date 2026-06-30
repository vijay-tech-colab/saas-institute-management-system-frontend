import { z } from "zod"

export const ownerDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    message: "You must accept the terms and conditions"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type OwnerDetailsFormValues = z.infer<typeof ownerDetailsSchema>

export const instituteInfoSchema = z.object({
  instituteName: z.string().min(2, "Institute name must be at least 2 characters"),
  instituteType: z.enum(["Computer Institute", "Coaching", "School", "College", "Other"], {
    message: "Please select an institute type",
  }),
  registrationNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  instituteEmail: z.string().email("Please enter a valid email address").or(z.literal("")).optional(),
  institutePhone: z.string().optional(),
  website: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  // Logo would typically be a File type or string URL after upload. Assuming string for now.
  logo: z.any().optional(), 
})

export type InstituteInfoFormValues = z.infer<typeof instituteInfoSchema>

export const addressBranchSchema = z.object({
  branchName: z.string().min(2, "Branch name is required").default("Main Branch"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  city: z.string().min(2, "City is required"),
  pinCode: z.string().min(5, "Valid Pin Code is required"),
  fullAddress: z.string().min(5, "Full address is required"),
  branchPhone: z.string().optional(),
  branchEmail: z.string().email("Please enter a valid email address").or(z.literal("")).optional(),
})

export type AddressBranchFormValues = z.infer<typeof addressBranchSchema>

export const preferencesSchema = z.object({
  timezone: z.string().default("Asia/Kolkata"),
  currency: z.string().default("INR"),
  language: z.string().default("English"),
  sessionStartMonth: z.string().default("April"),
  financialYear: z.string().default("2026-27"),
})

export type PreferencesFormValues = z.infer<typeof preferencesSchema>

// Combined schema for the whole form, if needed
export const registerFormSchema = z.object({
  ownerDetails: ownerDetailsSchema,
  instituteInfo: instituteInfoSchema,
  addressBranch: addressBranchSchema,
  preferences: preferencesSchema,
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
