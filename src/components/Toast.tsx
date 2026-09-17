import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<{ message: string | null; onClose: () => void }> = ({
  message,
  onClose
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex items-center justify-between p-4 bg-[#1a1715] text-[#fbf9f5] border border-[#3a3430] rounded-lg shadow-2xl animate-fade-in text-xs font-medium max-w-sm">
      <div className="flex items-center space-x-3">
        <CheckCircle2 className="w-4 h-4 text-[#c07a46] shrink-0" />
        <span className="leading-snug">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-stone-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto flex items-center justify-between p-4 bg-[#1a1715] text-[#fbf9f5] border border-[#3a3430] rounded-lg shadow-xl animate-fade-in text-sm font-medium">
      <div className="flex items-center space-x-3">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-[#c07a46] shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <span className="leading-snug">{toast.message}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-3 text-stone-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
