import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, CheckCircle2 } from 'lucide-react';
import { plansData } from '@/data/plans';
import { bookingSchema, type BookingFormValues } from './schema';
import { BookingFormField } from './components/BookingFormField';
import { PlanSelector } from './components/PlanSelector';
import { GuestCounter } from './components/GuestCounter';
import { DatePickerWithRange } from './components/DatePickerWithRange';
import { cn } from '@/lib/utils';

import { fetchAndParseCalendar, type CalendarEvent } from '@/utils/calendar';

const MASTER_ICS_URL =
  'https://calendar.google.com/calendar/ical/f7bca012556dacd7e1f85534a4bba15936336fd83fa892f62d82c54a7e76848c%40group.calendar.google.com/private-48ed2bac3f163a582a97610d8dc3e1ae/basic.ics';

export function BookingForm({ initialEvents = [] }: { initialEvents?: CalendarEvent[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedEvents, setBookedEvents] = useState<CalendarEvent[]>(initialEvents);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      plan: '',
      personas: 2,
      dateRange: undefined,
    },
  });

  const selectedPlanSlug = watch('plan');
  const selectedPlan = plansData.find((p) => p.slug === selectedPlanSlug);

  useEffect(() => {
    async function loadAvailability() {
      try {
        const events = await fetchAndParseCalendar(MASTER_ICS_URL);
        setBookedEvents(events);
      } catch (error) {
        console.error('Error loading availability:', error);
      }
    }

    loadAvailability();

    // Refresh availability every 2 minutes to detect new Google Calendar events automatically
    const interval = setInterval(loadAvailability, 120000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: BookingFormValues) => {
    setIsSubmitting(true);

    const planName = selectedPlan?.title || data.plan;
    const message = `Hola! Me gustaría solicitar una reserva:
*Nombre:* ${data.nombre} ${data.apellido}
*Plan:* ${planName}
*Personas:* ${data.personas}
*Llegada:* ${data.dateRange.from.toLocaleDateString()}
*Salida:* ${data.dateRange.to.toLocaleDateString()}`;

    // Using api.whatsapp.com/send which is more reliable across mobile browsers and webviews
    const url = `https://api.whatsapp.com/send?phone=17869097263&text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          // On mobile, window.location.href doesn't trigger popup blockers and opens WhatsApp directly
          window.location.href = url;
        } else {
          // On desktop, we try opening in a new tab
          try {
            const newWindow = window.open(url, '_blank');
            // If the popup was blocked by the browser, fallback to redirecting current tab
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
              window.location.href = url;
            }
          } catch (e) {
            window.location.href = url;
          }
        }
      }, 1500);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <section className="bg-background relative overflow-hidden pt-40 pb-24" id="reservar">
        <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-primary/20 flex h-24 w-24 items-center justify-center rounded-full">
                <CheckCircle2 size={60} className="text-primary animate-in zoom-in duration-500" />
              </div>
            </div>
            <h2 className="text-foreground mb-4 font-serif text-3xl font-bold md:text-4xl">
              ¡Tu reserva ha sido enviada!
            </h2>
            <p className="text-foreground/60 mb-8 text-lg leading-relaxed">
              En un momento nos contactaremos contigo. Serás redirigido a WhatsApp para finalizar
              los detalles. Si no eres redirigido automáticamente, haz clic en el botón de abajo:
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href={whatsappUrl}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40 flex w-full items-center justify-center rounded-xl py-4 font-bold tracking-[0.2em] text-white uppercase shadow-lg transition-all"
              >
                Abrir WhatsApp
              </a>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-foreground/40 mt-4 text-xs font-bold tracking-widest uppercase hover:underline"
              >
                Volver al formulario
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background relative overflow-hidden pt-40 pb-24" id="reservar">
      <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-primary mb-4 block text-sm font-bold tracking-[0.2em] uppercase">
              Comienza tu escape
            </span>
            <h1 className="text-foreground font-serif text-4xl font-bold md:text-5xl">
              Reserva tu Experiencia
            </h1>
          </div>

          <div className="bg-card rounded-3xl border border-black/5 p-6 shadow-xl md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <BookingFormField label="Nombre" error={errors.nombre?.message}>
                  <User
                    className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                    size={18}
                  />
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Tu nombre"
                        className={cn(
                          'focus:border-primary/50 text-foreground placeholder:text-foreground/30 h-12 w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none',
                          errors.nombre && 'border-red-500'
                        )}
                      />
                    )}
                  />
                </BookingFormField>

                <BookingFormField label="Apellido" error={errors.apellido?.message}>
                  <User
                    className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                    size={18}
                  />
                  <Controller
                    name="apellido"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Tu apellido"
                        className={cn(
                          'focus:border-primary/50 text-foreground placeholder:text-foreground/30 h-12 w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none',
                          errors.apellido && 'border-red-500'
                        )}
                      />
                    )}
                  />
                </BookingFormField>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <BookingFormField label="Plan Deseado" error={errors.plan?.message}>
                  <Controller
                    name="plan"
                    control={control}
                    render={({ field }) => (
                      <PlanSelector
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.plan}
                      />
                    )}
                  />
                </BookingFormField>

                <BookingFormField label="Personas" error={errors.personas?.message}>
                  <Controller
                    name="personas"
                    control={control}
                    render={({ field }) => (
                      <GuestCounter
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.personas}
                      />
                    )}
                  />
                </BookingFormField>
              </div>

              <BookingFormField
                label="Rango de Fechas (Llegada - Salida)"
                error={
                  errors.dateRange?.root?.message ||
                  (errors.dateRange as { message?: string })?.message
                }
              >
                <Controller
                  name="dateRange"
                  control={control}
                  render={({ field }) => (
                    <DatePickerWithRange
                      value={field.value}
                      onChange={field.onChange}
                      bookedEvents={bookedEvents}
                    />
                  )}
                />
              </BookingFormField>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40 flex w-full items-center justify-center rounded-xl py-4 font-bold tracking-[0.2em] text-white uppercase shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? 'Procesando...' : 'Solicitar Reserva'}
                </button>
              </div>
            </form>
          </div>

          <div className="border-primary/20 bg-primary/5 mt-6 rounded-xl border p-4 text-center shadow-sm">
            <p className="text-foreground/80 text-sm leading-relaxed font-medium">
              <span className="text-primary mb-1 block font-bold">Nota importante:</span>
              50% del total se debe pagar al momento de la reserva, el importe restante se pagará 1
              día(s) antes de la llegada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
