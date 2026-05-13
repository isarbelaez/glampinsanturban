import React from 'react';
import { ChevronDown } from 'lucide-react';
import { plansData } from '@/data/plans';

interface PlanSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function PlanSelector({ value, onChange, error }: PlanSelectorProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`focus:border-primary/50 text-foreground w-full cursor-pointer appearance-none rounded-xl border ${
          error ? 'border-red-500' : 'border-black/10'
        } h-12 bg-white/50 py-3 pr-12 pl-4 transition-colors focus:outline-none`}
      >
        <option value="" disabled className="text-black">
          Selecciona un plan...
        </option>
        {plansData.map((plan) => (
          <option key={plan.slug} value={plan.slug} className="text-black">
            {plan.title}
          </option>
        ))}
      </select>
      <ChevronDown
        className="text-foreground/40 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        size={18}
      />
    </div>
  );
}
