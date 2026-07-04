import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { toastsAtom, Toast, ToastType } from '@/store/toast-store';

type ToastOptions = Omit<Toast, 'id' | 'type'>;

export function useToast() {
  const setToasts = useSetAtom(toastsAtom);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, [setToasts]);

  const addToast = useCallback((type: ToastType, options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options.duration || 5000;

    setToasts((prev) => [...prev, { ...options, id, type, duration }]);

    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [setToasts, removeToast]);

  return {
    success: (options: ToastOptions) => addToast('success', options),
    error: (options: ToastOptions) => addToast('error', options),
    warning: (options: ToastOptions) => addToast('warning', options),
    info: (options: ToastOptions) => addToast('info', options),
    remove: removeToast,
  };
}
