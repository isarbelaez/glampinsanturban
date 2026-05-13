import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { es } from 'date-fns/locale';

import { isDateBooked, hasOverlap, type CalendarEvent } from '@/utils/calendar';

interface DatePickerWithRangeProps {
  className?: string;
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  bookedEvents?: CalendarEvent[];
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  bookedEvents = [],
}: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'focus:border-primary/50 text-foreground placeholder:text-foreground/30 h-auto min-h-[48px] w-full justify-start rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 text-left font-normal transition-colors focus:outline-none',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon
              className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
              size={18}
            />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', { locale: es })} -{' '}
                  {format(value.to, 'LLL dd, y', { locale: es })}
                </>
              ) : (
                format(value.from, 'LLL dd, y', { locale: es })
              )
            ) : (
              <span>Selecciona las fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50 w-auto p-0" align="start">
          <div className="flex flex-col">
            <Calendar
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  if (hasOverlap(range.from, range.to, bookedEvents)) {
                    onChange?.({ from: range.from, to: undefined });
                    return;
                  }
                }
                onChange?.(range);
              }}
              numberOfMonths={1}
              locale={es}
              modifiers={{
                booked: (date) => isDateBooked(date, bookedEvents),
              }}
              classNames={{
                booked: 'relative opacity-50 cursor-not-allowed bg-red-50/50 text-red-900',
              }}
              components={{
                DayButton: (props) => {
                  const { day, modifiers, ...buttonProps } = props;
                  const isBooked = isDateBooked(day.date, bookedEvents);

                  return (
                    <div className="relative flex h-full w-full items-center justify-center">
                      <CalendarDayButton day={day} modifiers={modifiers} {...buttonProps} />
                      {isBooked && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                          <span className="text-lg font-bold text-red-600">✕</span>
                        </div>
                      )}
                    </div>
                  );
                },
              }}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || isDateBooked(date, bookedEvents);
              }}
            />
            {value && (
              <div className="flex justify-end border-t border-black/5 p-3">
                <button
                  type="button"
                  onClick={() => onChange?.(undefined)}
                  className="px-3 py-2 text-xs font-bold tracking-wider text-red-500 uppercase transition-colors hover:text-red-600"
                >
                  Limpiar fechas
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
