"use client";

import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type ValidationErrors<T> = Partial<Record<keyof T | string, string>>;

interface UseSettingsFormOptions<T> {
  initialValues: T;
  sectionLabel: string;
  validate?: (values: T) => ValidationErrors<T>;
}

/**
 * Shared state, dirty-detection, validation, and save workflow for Super Admin settings sections.
 */
export function useSettingsForm<T>({
  initialValues,
  sectionLabel,
  validate,
}: UseSettingsFormOptions<T>) {
  const toast = useToast();
  const [savedValues, setSavedValues] = useState<T>(initialValues);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isSaving, setIsSaving] = useState(false);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(savedValues);
  }, [values, savedValues]);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      clearFieldError(String(field));
    },
    [clearFieldError]
  );

  const reset = useCallback(() => {
    setValues(savedValues);
    setErrors({});
  }, [savedValues]);

  const save = useCallback(async () => {
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error({
          title: "Validation failed",
          description: "Please review highlighted fields before saving.",
        });
        return false;
      }
    }

    setErrors({});
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setSavedValues(values);
    setIsSaving(false);

    toast.success({
      title: `${sectionLabel} saved`,
      description: "Platform configuration has been updated.",
    });
    return true;
  }, [sectionLabel, toast, validate, values]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    clearFieldError,
    updateField,
    isDirty,
    isSaving,
    reset,
    save,
  };
}
