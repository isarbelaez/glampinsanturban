import React from 'react';
import { cn } from '@/lib/utils';

interface BookingFormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function BookingFormField({ label, error, children, className }: BookingFormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-foreground/80 text-sm font-medium tracking-wide">{label}</label>
      <div className="relative">{children}</div>
      {error && (
        <p className="animate-in fade-in slide-in-from-top-1 mt-1 text-xs text-red-500 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
