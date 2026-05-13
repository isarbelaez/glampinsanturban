import React from 'react';
import { Users } from 'lucide-react';

interface GuestCounterProps {
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
}

export function GuestCounter({ value, onChange, error }: GuestCounterProps) {
  return (
    <div className="relative">
      <Users className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2" size={18} />
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min="1"
        max="10"
        placeholder="2"
        className={`focus:border-primary/50 text-foreground placeholder:text-foreground/30 w-full rounded-xl border ${
          error ? 'border-red-500' : 'border-black/10'
        } h-12 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none`}
      />
    </div>
  );
}
