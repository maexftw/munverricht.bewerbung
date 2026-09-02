import React, { useEffect, useRef, useId } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '2xl',
  className = '',
}) => {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  // Hook handles Tab wrapping, Shift+Tab wrapping, Escape key, and focus restoration
  useFocusTrap(modalRef, isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClasses} bg-[var(--bg1)] text-[var(--bgInverse)] rounded-xl border-2 border-[var(--accent1)] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-[hypFadeIn_0.2s_ease-out] ${className}`}
      >
        {/* Header Strip with Stripe Accent */}
        <div className="relative p-5 sm:p-6 bg-[var(--bgInverse)] text-[var(--bg1)] border-b border-[var(--bgInverse2)] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id={titleId} className="text-lg sm:text-xl font-black uppercase tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-300 font-mono">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal dialog"
            className="touch-target p-2 text-gray-300 hover:text-white hover:bg-[var(--bgInverse2)] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer (if provided) */}
        {footer && (
          <div className="p-4 sm:p-5 bg-[var(--bg2)]/60 border-t border-[var(--bgInverse2)]/20 flex flex-wrap items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
