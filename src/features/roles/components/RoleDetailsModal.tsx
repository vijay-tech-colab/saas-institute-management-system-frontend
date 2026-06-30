'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from 'lucide-react';

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  purpose: z.string().min(5, "Purpose must be at least 5 characters"),
});

type RoleFormData = z.infer<typeof roleSchema>;

import { Role } from '../types';

export function RoleDetailsModal({ onClose, role }: { onClose: () => void, role?: Role }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
      purpose: role?.purpose || "",
    },
  });

  const onSubmit = async (data: RoleFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Role Data:", data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-1.5 font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" required>Role Name</Label>
        <Input 
          id="name" 
          placeholder="e.g. Content Manager" 
          {...register("name")} 
          disabled={isLoading} 
          error={!!errors.name} 
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="purpose" required>Purpose / Description</Label>
        <textarea
          id="purpose"
          rows={3}
          className={`w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none ${
            errors.purpose 
              ? 'bg-rose-50 border-rose-200 text-rose-900 focus:ring-rose-500/20 focus:border-rose-400' 
              : 'border-slate-200 bg-white text-slate-900 focus:ring-indigo-600/20 focus:border-indigo-400'
          }`}
          placeholder="Briefly describe what this role does..."
          {...register("purpose")}
          disabled={isLoading}
        />
        <ErrorMessage message={errors.purpose?.message} />
      </div>

      <div className="pt-4 border-t border-slate-100 flex gap-3">
        <button 
          type="button" 
          onClick={onClose} 
          disabled={isLoading} 
          className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading} 
          className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-sm"
        >
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : (role ? "Save Changes" : "Create Role")}
        </button>
      </div>
    </form>
  );
}
