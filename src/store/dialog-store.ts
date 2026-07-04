import { atom } from 'jotai';

export type ConfirmDialogType = 'danger' | 'warning' | 'info';

export interface ConfirmDialogState {
  isOpen: boolean;
  type: ConfirmDialogType;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const initialDialogState: ConfirmDialogState = {
  isOpen: false,
  type: 'info',
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

export const confirmDialogAtom = atom<ConfirmDialogState>(initialDialogState);
