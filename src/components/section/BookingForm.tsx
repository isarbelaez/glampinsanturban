import React, { useState } from 'react';
import { plansData } from '../../data/plans';
import { Calendar as CalendarIcon, Users, User, ChevronDown } from 'lucide-react';

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending form to WhatsApp or API
    setTimeout(() => {
      setIsSubmitting(false);
      alert('¡Solicitud enviada! Nos contactaremos pronto.');
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden bg-[#050f0e] pt-40 pb-24" id="reservar">
      {/* Decorative background */}
      <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-primary mb-4 block text-sm font-bold tracking-[0.2em] uppercase">
              Comienza tu escape
            </span>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Reserva tu Experiencia
            </h1>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">Nombre</label>
                  <div className="relative">
                    <User
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-4 pl-12 text-white transition-colors placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">
                    Apellido
                  </label>
                  <div className="relative">
                    <User
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Tu apellido"
                      className="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-4 pl-12 text-white transition-colors placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Plan and Guests */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">
                    Plan Deseado
                  </label>
                  <div className="relative">
                    <select
                      required
                      className="focus:border-primary/50 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-black/40 py-3 pr-12 pl-4 text-white transition-colors focus:outline-none"
                    >
                      <option value="" disabled selected className="text-black">
                        Selecciona un plan...
                      </option>
                      {plansData.map((plan) => (
                        <option key={plan.slug} value={plan.slug} className="text-black">
                          {plan.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">
                    Personas
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      required
                      placeholder="2"
                      className="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-4 pl-12 text-white transition-colors placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Dates */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">
                    Fecha de Llegada
                  </label>
                  <div className="relative">
                    <CalendarIcon
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                    <input
                      type="date"
                      required
                      className="focus:border-primary/50 color-scheme-dark w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-4 pl-12 text-white transition-colors focus:outline-none"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-white/80">
                    Fecha de Salida
                  </label>
                  <div className="relative">
                    <CalendarIcon
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40"
                      size={18}
                    />
                    <input
                      type="date"
                      required
                      className="focus:border-primary/50 color-scheme-dark w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-4 pl-12 text-white transition-colors focus:outline-none"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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
        </div>
      </div>
    </section>
  );
}
