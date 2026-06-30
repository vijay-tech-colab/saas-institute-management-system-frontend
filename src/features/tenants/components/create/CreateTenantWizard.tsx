'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader, CustomSelect } from '@/features/subscriptions/components/shared/UIComponents';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2, User, CreditCard, LayoutGrid, Sliders, ShieldCheck, CheckCircle2,
  ChevronRight, ChevronLeft, UploadCloud, Info, AlertCircle, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Error Message ───────────────────────────────────────────
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-1 font-medium">
      <AlertCircle className="w-3 h-3 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

// ─── Form Field wrapper (label + error) ─────────────────────
const Field = ({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-600 flex items-center gap-0.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    <ErrorMessage message={error} />
  </div>
);

// ─── Custom Select with validation state ────────────────────
const FormSelect = ({ label, required, error, options, value, onChange }: {
  label: string; required?: boolean; error?: string;
  options: { label: string; value: string }[];
  value: string; onChange: (v: string) => void;
}) => (
  <Field label={label} required={required} error={error}>
    <div className={`rounded-xl transition-all ${error ? 'ring-2 ring-rose-300/50' : ''}`}>
      <CustomSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Select..."
        buttonClassName={`w-full h-9 ${error ? 'border-rose-300 bg-rose-50/50 text-rose-900' : ''}`}
      />
    </div>
  </Field>
);

// ─── Toggle Feature ─────────────────────────────────────────
const ToggleFeature = ({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) => (
  <div
    onClick={() => onChange(!checked)}
    className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all duration-200 gap-3 ${
      checked ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-white hover:border-slate-300'
    }`}
  >
    <div className="min-w-0">
      <p className={`text-xs font-bold truncate ${checked ? 'text-blue-900' : 'text-slate-800'}`}>{label}</p>
      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{description}</p>
    </div>
    <div className={`relative w-9 h-5 rounded-full shrink-0 transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm ${checked ? 'left-[18px]' : 'left-0.5'}`}
      />
    </div>
  </div>
);

// ─── Steps ──────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Institute Info', icon: <Building2 className="w-4 h-4" /> },
  { id: 2, title: 'Owner Info', icon: <User className="w-4 h-4" /> },
  { id: 3, title: 'Subscription', icon: <CreditCard className="w-4 h-4" /> },
  { id: 4, title: 'Features', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 5, title: 'Limits', icon: <Sliders className="w-4 h-4" /> },
  { id: 6, title: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 7, title: 'Review', icon: <CheckCircle2 className="w-4 h-4" /> },
];

// ─── Zod Schemas ────────────────────────────────────────────
const step1Schema = z.object({
  instituteName: z.string().min(3, 'Minimum 3 characters'),
  instituteCode: z.string().min(2, 'Min 2 chars').max(6, 'Max 6 chars').regex(/^[A-Z0-9]+$/i, 'Letters & numbers only'),
  instituteType: z.string().min(1, 'Please select a type'),
  website: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  registrationNumber: z.string().optional(),
  taxGstNumber: z.string().optional(),
  address: z.string().min(5, 'Enter a valid address'),
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().min(4, 'Minimum 4 characters'),
  timezone: z.string().min(1, 'Please select a timezone'),
  currency: z.string().min(1, 'Please select a currency'),
});

const step2Schema = z.object({
  ownerName: z.string().min(3, 'Minimum 3 characters'),
  ownerEmail: z.string().email('Enter a valid email'),
  ownerPhone: z.string().min(10, 'Minimum 10 digits').regex(/^[+\d\s()-]+$/, 'Invalid phone format'),
  password: z.string().min(8, 'Min 8 chars').regex(/[A-Z]/, 'Needs 1 uppercase').regex(/[0-9]/, 'Needs 1 number'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const step3Schema = z.object({
  plan: z.string().min(1, 'Please select a plan'),
  billingCycle: z.string().min(1, 'Please select a billing cycle'),
  paymentStatus: z.string().min(1, 'Please select a payment status'),
  startDate: z.string().min(1, 'Start date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  couponCode: z.string().optional(),
});

const step5Schema = z.object({
  maxStudents: z.number().min(1, 'Must be at least 1').max(1000000),
  maxStaff: z.number().min(1, 'Must be at least 1'),
  maxBranches: z.number().min(1, 'Must be at least 1').max(999),
  storageGB: z.number().min(1, 'Min 1 GB').max(10000),
  maxCourses: z.number().min(1, 'Must be at least 1'),
  apiRequestsPerDay: z.number().min(100, 'Min 100 requests/day'),
  resourceStrategy: z.string().min(1, 'Please select a strategy'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step5Data = z.infer<typeof step5Schema>;

// ─── Step Indicator ─────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center w-full relative mb-5">
      <div className="absolute left-0 right-0 top-[18px] h-0.5 bg-slate-200 -z-10" />
      <div
        className="absolute left-0 top-[18px] h-0.5 bg-blue-600 -z-10 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
      />
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        return (
          <div key={step.id} className="flex-1 flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-110'
                : isCompleted
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-400 border-slate-200'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wide hidden sm:block ${
              isActive ? 'text-blue-700' : isCompleted ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Step Actions ────────────────────────────────────────────
function StepActions({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  return (
    <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
      <button
        type="button"
        onClick={onPrev}
        disabled={!onPrev}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
          !onPrev ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm'
        }`}
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      {onNext ? (
        <button type="button" onClick={onNext} className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all active:scale-95">
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button type="submit" className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all active:scale-95">
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ─── Step 1: Institute Info ──────────────────────────────────
function Step1_InstituteInfo({ onNext }: { onNext: (data: Step1Data) => void }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { country: '', timezone: '', currency: '', instituteType: '', website: '' },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      {/* Logo Upload */}
      <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Upload Institute Logo</p>
            <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="col-span-2">
          <Field label="Institute Name" required error={errors.instituteName?.message}>
            <Input id="instituteName" placeholder="e.g. Global Tech Institute" className="h-9 text-sm" error={!!errors.instituteName} {...register('instituteName')} />
          </Field>
        </div>
        <div>
          <Field label="Institute Code" required error={errors.instituteCode?.message}>
            <Input id="instituteCode" placeholder="e.g. GTI" className="h-9 text-sm" error={!!errors.instituteCode} {...register('instituteCode')} />
          </Field>
        </div>
        <div>
          <Controller control={control} name="instituteType" render={({ field }) => (
            <FormSelect label="Institute Type" required error={errors.instituteType?.message}
              options={[{label:'University',value:'university'},{label:'School',value:'school'},{label:'Coaching',value:'coaching'},{label:'College',value:'college'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
        <div>
          <Field label="Website" error={errors.website?.message}>
            <Input id="website" placeholder="https://example.com" className="h-9 text-sm" error={!!errors.website} {...register('website')} />
          </Field>
        </div>
        <div>
          <Field label="Registration No.">
            <Input id="registrationNumber" placeholder="Reg. No" className="h-9 text-sm" {...register('registrationNumber')} />
          </Field>
        </div>
        <div>
          <Field label="Tax / GST Number">
            <Input id="taxGstNumber" placeholder="Tax ID" className="h-9 text-sm" {...register('taxGstNumber')} />
          </Field>
        </div>
      </div>

      {/* Address */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="col-span-2 sm:col-span-3 lg:col-span-4">
          <Field label="Street Address" required error={errors.address?.message}>
            <Input id="address" placeholder="123 Main Street, Building A" className="h-9 text-sm" error={!!errors.address} {...register('address')} />
          </Field>
        </div>
        <div>
          <Controller control={control} name="country" render={({ field }) => (
            <FormSelect label="Country" required error={errors.country?.message}
              options={[{label:'India',value:'india'},{label:'United States',value:'us'},{label:'United Kingdom',value:'uk'},{label:'Australia',value:'au'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
        <div>
          <Field label="State / Province" required error={errors.state?.message}>
            <Input id="state" placeholder="e.g. Maharashtra" className="h-9 text-sm" error={!!errors.state} {...register('state')} />
          </Field>
        </div>
        <div>
          <Field label="City" required error={errors.city?.message}>
            <Input id="city" placeholder="e.g. Mumbai" className="h-9 text-sm" error={!!errors.city} {...register('city')} />
          </Field>
        </div>
        <div>
          <Field label="Pincode / ZIP" required error={errors.pincode?.message}>
            <Input id="pincode" placeholder="400001" className="h-9 text-sm" error={!!errors.pincode} {...register('pincode')} />
          </Field>
        </div>
        <div>
          <Controller control={control} name="timezone" render={({ field }) => (
            <FormSelect label="Timezone" required error={errors.timezone?.message}
              options={[{label:'IST (UTC+5:30)',value:'IST'},{label:'UTC',value:'UTC'},{label:'EST (UTC-5)',value:'EST'},{label:'GMT',value:'GMT'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
        <div>
          <Controller control={control} name="currency" render={({ field }) => (
            <FormSelect label="Currency" required error={errors.currency?.message}
              options={[{label:'INR (₹)',value:'INR'},{label:'USD ($)',value:'USD'},{label:'EUR (€)',value:'EUR'},{label:'GBP (£)',value:'GBP'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
      </div>

      <StepActions />
    </form>
  );
}

// ─── Step 2: Owner Info ──────────────────────────────────────
function Step2_OwnerInfo({ onNext, onPrev }: { onNext: (data: Step2Data) => void; onPrev: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex gap-2.5 items-start">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
        <div>
          <p className="text-xs font-bold text-blue-900">Primary Administrator Account</p>
          <p className="text-xs mt-0.5 text-blue-600">These credentials create the initial admin account. A welcome email will be sent automatically.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <Field label="Full Name" required error={errors.ownerName?.message}>
            <Input id="ownerName" placeholder="e.g. Ravi Sharma" className="h-9 text-sm" error={!!errors.ownerName} {...register('ownerName')} />
          </Field>
        </div>
        <div>
          <Field label="Email Address" required error={errors.ownerEmail?.message}>
            <Input id="ownerEmail" type="email" placeholder="owner@institute.edu" className="h-9 text-sm" error={!!errors.ownerEmail} {...register('ownerEmail')} />
          </Field>
        </div>
        <div>
          <Field label="Phone Number" required error={errors.ownerPhone?.message}>
            <Input id="ownerPhone" placeholder="+91 98765 43210" className="h-9 text-sm" error={!!errors.ownerPhone} {...register('ownerPhone')} />
          </Field>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Field label="Initial Password" required error={errors.password?.message}>
            <Input id="password" type="password" placeholder="Min 8 chars, uppercase, number" className="h-9 text-sm" error={!!errors.password} {...register('password')} />
          </Field>
        </div>
        <div>
          <Field label="Confirm Password" required error={errors.confirmPassword?.message}>
            <Input id="confirmPassword" type="password" placeholder="Re-enter password" className="h-9 text-sm" error={!!errors.confirmPassword} {...register('confirmPassword')} />
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="text-xs font-medium text-slate-700">Require email verification on first login</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-xs font-medium text-slate-700">Send welcome email immediately after creation</span>
        </label>
      </div>

      <StepActions onPrev={onPrev} />
    </form>
  );
}

// ─── Step 3: Subscription ────────────────────────────────────
function Step3_Subscription({ onNext, onPrev }: { onNext: (data: Step3Data) => void; onPrev: () => void }) {
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { plan: '', billingCycle: '', paymentStatus: '', startDate: '', expiryDate: '' },
  });
  const selectedPlan = watch('plan');

  const PLANS = [
    { id: 'basic', name: 'Basic', price: 99, students: '1,000', storage: '50' },
    { id: 'pro', name: 'Pro', price: 199, students: '5,000', storage: '200', recommended: true },
    { id: 'enterprise', name: 'Enterprise', price: 499, students: 'Unlimited', storage: '1,000' },
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600 flex items-center gap-0.5 mb-2">
          Select Plan <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setValue('plan', plan.id, { shouldValidate: true })}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'border-blue-600 bg-blue-50/30 shadow-sm shadow-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-200'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  Recommended
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-blue-600' : 'border-slate-300'}`}>
                  {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{plan.name}</h3>
              </div>
              <p className="text-xl font-black text-slate-900">${plan.price}<span className="text-xs font-medium text-slate-400">/mo</span></p>
              <ul className="space-y-1 mt-2">
                <li className="text-[11px] text-slate-500 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> {plan.students} Students</li>
                <li className="text-[11px] text-slate-500 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> {plan.storage}GB Storage</li>
              </ul>
            </div>
          ))}
        </div>
        <ErrorMessage message={errors.plan?.message} />
      </div>

      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div>
          <Controller control={control} name="billingCycle" render={({ field }) => (
            <FormSelect label="Billing Cycle" required error={errors.billingCycle?.message}
              options={[{label:'Monthly',value:'monthly'},{label:'Annually (-20%)',value:'annually'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
        <div>
          <Controller control={control} name="paymentStatus" render={({ field }) => (
            <FormSelect label="Payment Status" required error={errors.paymentStatus?.message}
              options={[{label:'Paid',value:'paid'},{label:'Trial',value:'trial'},{label:'Manual Invoice',value:'manual'}]}
              value={field.value} onChange={field.onChange}
            />
          )} />
        </div>
        <div>
          <Field label="Coupon Code">
            <Input id="couponCode" placeholder="Promo code" className="h-9 text-sm" {...register('couponCode')} />
          </Field>
        </div>
        <div>
          <Field label="Start Date" required error={errors.startDate?.message}>
            <Input id="startDate" type="date" className="h-9 text-sm" error={!!errors.startDate} {...register('startDate')} />
          </Field>
        </div>
        <div>
          <Field label="Expiry Date" required error={errors.expiryDate?.message}>
            <Input id="expiryDate" type="date" className="h-9 text-sm" error={!!errors.expiryDate} {...register('expiryDate')} />
          </Field>
        </div>
      </div>

      <StepActions onPrev={onPrev} />
    </form>
  );
}

// ─── Step 4: Features ────────────────────────────────────────
function Step4_Features({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [features, setFeatures] = useState({
    studentManagement: true, staffHR: true, feesCollection: true,
    academics: true, examinations: false, attendance: true,
    library: false, hostel: false, transport: false,
    aiAnalytics: false, whatsapp: false, apiAccess: false,
  });
  const toggle = (key: keyof typeof features) => setFeatures(p => ({ ...p, [key]: !p[key] }));

  const CORE = [
    { key: 'studentManagement', label: 'Student Management', desc: 'Profiles, admission & alumni.' },
    { key: 'staffHR', label: 'Staff & HR', desc: 'Teachers, payroll & attendance.' },
    { key: 'feesCollection', label: 'Fees Collection', desc: 'Invoicing, payments & receipts.' },
    { key: 'academics', label: 'Academics', desc: 'Classes, subjects & timetables.' },
    { key: 'examinations', label: 'Examinations', desc: 'Online exams & report cards.' },
    { key: 'attendance', label: 'Attendance', desc: 'Biometric & daily tracking.' },
  ];
  const ADDONS = [
    { key: 'library', label: 'Library Management', desc: 'Books, issuing & fines.' },
    { key: 'hostel', label: 'Hostel Management', desc: 'Rooms & mess management.' },
    { key: 'transport', label: 'Transport', desc: 'Routes, tracking & fees.' },
    { key: 'aiAnalytics', label: 'AI Analytics', desc: 'Predictive performance insights.' },
    { key: 'whatsapp', label: 'WhatsApp Integration', desc: 'Automated notifications.' },
    { key: 'apiAccess', label: 'API Access', desc: 'REST API for integrations.' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Core Modules</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CORE.map(f => (
            <ToggleFeature key={f.key} label={f.label} description={f.desc}
              checked={features[f.key as keyof typeof features]}
              onChange={() => toggle(f.key as keyof typeof features)}
            />
          ))}
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Add-on Modules</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ADDONS.map(f => (
            <ToggleFeature key={f.key} label={f.label} description={f.desc}
              checked={features[f.key as keyof typeof features]}
              onChange={() => toggle(f.key as keyof typeof features)}
            />
          ))}
        </div>
      </div>
      <StepActions onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

// ─── Step 5: Limits ──────────────────────────────────────────
function Step5_Limits({ onNext, onPrev }: { onNext: (data: Step5Data) => void; onPrev: () => void }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: { maxStudents: 5000, maxStaff: 150, maxBranches: 5, storageGB: 500, maxCourses: 50, apiRequestsPerDay: 10000, resourceStrategy: '' },
  });

  const fields = [
    { id: 'maxStudents', label: 'Max Students', placeholder: '5000' },
    { id: 'maxStaff', label: 'Max Staff / Users', placeholder: '150' },
    { id: 'maxBranches', label: 'Max Branches', placeholder: '5' },
    { id: 'storageGB', label: 'Storage Limit (GB)', placeholder: '500' },
    { id: 'maxCourses', label: 'Max Courses', placeholder: '50' },
    { id: 'apiRequestsPerDay', label: 'API Req. / Day', placeholder: '10000' },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {fields.map(f => (
          <div key={f.id}>
            <Field label={f.label} required error={errors[f.id]?.message}>
              <Input id={f.id} type="number" placeholder={f.placeholder} className="h-9 text-sm" error={!!errors[f.id]} {...register(f.id, { valueAsNumber: true })} />
            </Field>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100">
        <Controller control={control} name="resourceStrategy" render={({ field }) => (
          <FormSelect label="Resource Allocation Strategy" required error={errors.resourceStrategy?.message}
            options={[
              { label: 'Hard Limits (block on exceed)', value: 'hard' },
              { label: 'Soft Limits (alert + allow)', value: 'soft' },
            ]}
            value={field.value} onChange={field.onChange}
          />
        )} />
        <p className="text-[11px] text-slate-400 mt-1">Hard limits block actions. Soft limits alert the admin but allow operations to continue.</p>
      </div>

      <StepActions onPrev={onPrev} />
    </form>
  );
}

// ─── Step 6: Security ────────────────────────────────────────
function Step6_Security({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [security, setSecurity] = useState({ twoFA: false, strictPassword: true, ipRestriction: false, auditLogging: true });
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const toggle = (key: keyof typeof security) => setSecurity(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <ToggleFeature label="Two-Factor Auth (2FA)" description="Enforce 2FA for all admin & staff." checked={security.twoFA} onChange={() => toggle('twoFA')} />
        <ToggleFeature label="Strict Password Policy" description="Require uppercase, numbers, symbols." checked={security.strictPassword} onChange={() => toggle('strictPassword')} />
        <ToggleFeature label="IP Restriction" description="Restrict logins to specific IPs." checked={security.ipRestriction} onChange={() => toggle('ipRestriction')} />
        <ToggleFeature label="Audit Logging" description="Log all read/write actions." checked={security.auditLogging} onChange={() => toggle('auditLogging')} />
      </div>

      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormSelect label="Session Timeout"
          options={[{label:'15 Minutes',value:'15'},{label:'30 Minutes',value:'30'},{label:'1 Hour',value:'60'},{label:'24 Hours',value:'1440'}]}
          value={sessionTimeout} onChange={setSessionTimeout}
        />
        <FormSelect label="Backup Frequency"
          options={[{label:'Daily',value:'daily'},{label:'Weekly',value:'weekly'},{label:'Monthly',value:'monthly'}]}
          value={backupFrequency} onChange={setBackupFrequency}
        />
      </div>

      <StepActions onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

// ─── Step 7: Review ──────────────────────────────────────────
function Step7_Review({ onPrev, onSubmit, isLoading }: { onPrev: () => void; onSubmit: () => void; isLoading: boolean }) {
  const ReviewRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-900">{value}</span>
    </div>
  );

  const sections = [
    { title: 'Institute', rows: [{ label: 'Name', value: 'Global Tech Institute' }, { label: 'Code', value: 'GTI' }, { label: 'Type', value: 'University' }, { label: 'Country', value: 'India' }] },
    { title: 'Owner', rows: [{ label: 'Name', value: 'Ravi Sharma' }, { label: 'Email', value: 'ravi@globaltech.edu' }, { label: 'Phone', value: '+91 98765 43210' }] },
    { title: 'Subscription', rows: [{ label: 'Plan', value: 'Pro Plan' }, { label: 'Billing', value: 'Monthly' }, { label: 'Status', value: 'Paid' }, { label: 'Expiry', value: 'Dec 31, 2026' }] },
    { title: 'Limits', rows: [{ label: 'Students', value: '5,000' }, { label: 'Branches', value: '5' }, { label: 'Storage', value: '500 GB' }, { label: 'API / day', value: '10,000' }] },
    { title: 'Security', rows: [{ label: '2FA', value: 'Off' }, { label: 'Passwords', value: 'Strict' }, { label: 'Audit Log', value: 'On' }, { label: 'Timeout', value: '30 min' }] },
    { title: 'Features', rows: [{ label: 'Students', value: 'On' }, { label: 'Fees', value: 'On' }, { label: 'AI', value: 'Off' }, { label: 'API', value: 'Off' }] },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 flex gap-2.5 items-start">
        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
        <div>
          <p className="text-xs font-bold text-emerald-900">Ready to Create</p>
          <p className="text-xs mt-0.5 text-emerald-700">Review the configuration. An initialization script will set up the database schema and default data.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {sections.map(section => (
          <div key={section.title} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{section.title}</h4>
            </div>
            <div className="px-3 py-1">
              {section.rows.map(r => <ReviewRow key={r.label} label={r.label} value={r.value} />)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button onClick={onPrev} className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          {isLoading ? 'Creating...' : 'Create Tenant'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Wizard ─────────────────────────────────────────────
export function CreateTenantWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const next = (data?: any) => {
    if (data) setFormData((p: any) => ({ ...p, ...data }));
    setCurrentStep(s => Math.min(s + 1, STEPS.length));
  };
  const prev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    console.log('Tenant Created:', formData);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Onboard New Tenant"
        description="Configure and provision a new institute workspace."
        breadcrumbs={[{ label: 'Tenants' }, { label: 'Create' }]}
      />

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Step indicator */}
        <div className="px-5 pt-5 pb-0 border-b border-slate-100 bg-slate-50/50">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Step header */}
          <div className="mb-4 pb-3 border-b border-slate-100 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              {STEPS[currentStep - 1].icon}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{STEPS[currentStep - 1].title}</h2>
              <p className="text-[11px] text-slate-400">Step {currentStep} of {STEPS.length}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
            >
              {currentStep === 1 && <Step1_InstituteInfo onNext={next} />}
              {currentStep === 2 && <Step2_OwnerInfo onNext={next} onPrev={prev} />}
              {currentStep === 3 && <Step3_Subscription onNext={next} onPrev={prev} />}
              {currentStep === 4 && <Step4_Features onNext={next} onPrev={prev} />}
              {currentStep === 5 && <Step5_Limits onNext={next} onPrev={prev} />}
              {currentStep === 6 && <Step6_Security onNext={next} onPrev={prev} />}
              {currentStep === 7 && <Step7_Review onPrev={prev} onSubmit={handleSubmit} isLoading={isLoading} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
