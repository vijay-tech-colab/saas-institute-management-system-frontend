import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { confirmDialogAtom, ConfirmDialogType, initialDialogState } from '@/store/dialog-store';

interface ConfirmOptions {
  title: string;
  description?: string;
  type?: ConfirmDialogType;
  confirmText?: string;
  cancelText?: string;
}

export function useConfirm() {
  const setDialog = useSetAtom(confirmDialogAtom);

  const confirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setDialog({
          isOpen: true,
          title: options.title,
          description: options.description,
          type: options.type || 'info',
          confirmText: options.confirmText || 'Confirm',
          cancelText: options.cancelText || 'Cancel',
          onConfirm: () => {
            setDialog(initialDialogState);
            resolve(true);
          },
          onCancel: () => {
            setDialog(initialDialogState);
            resolve(false);
          },
        });
      });
    },
    [setDialog]
  );

  return confirm;
}
