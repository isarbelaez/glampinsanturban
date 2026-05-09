import React, { useState } from 'react';
import { plansData } from '../../data/plans';
import { Calendar as CalendarIcon, Users, User, ChevronDown, CheckCircle2 } from 'lucide-react';

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    plan: '',
    personas: '2',
    fechaLlegada: '',
    fechaSalida: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp message
    const planName = plansData.find((p) => p.slug === formData.plan)?.title || formData.plan;
    const message = `Hola! Me gustaría solicitar una reserva:
*Nombre:* ${formData.nombre} ${formData.apellido}
*Plan:* ${planName}
*Personas:* ${formData.personas}
*Llegada:* ${formData.fechaLlegada}
*Salida:* ${formData.fechaSalida}`;

    const whatsappUrl = `https://wa.me/17869097263?text=${encodeURIComponent(message)}`;

    // Simulate sending and then redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Open WhatsApp in a new tab after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
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
            <p className="text-foreground/60 text-lg leading-relaxed">
              En un momento nos contactaremos contigo. Serás redirigido a WhatsApp para finalizar
              los detalles.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary mt-8 text-sm font-bold tracking-widest uppercase hover:underline"
            >
              Volver al formulario
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background relative overflow-hidden pt-40 pb-24" id="reservar">
      {/* Decorative background */}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Nombre
                  </label>
                  <div className="relative">
                    <User
                      className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="focus:border-primary/50 text-foreground placeholder:text-foreground/30 w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Apellido
                  </label>
                  <div className="relative">
                    <User
                      className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      placeholder="Tu apellido"
                      className="focus:border-primary/50 text-foreground placeholder:text-foreground/30 w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Plan and Guests */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Plan Deseado
                  </label>
                  <div className="relative">
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      required
                      className="focus:border-primary/50 text-foreground w-full cursor-pointer appearance-none rounded-xl border border-black/10 bg-white/50 py-3 pr-12 pl-4 transition-colors focus:outline-none"
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
                </div>

                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Personas
                  </label>
                  <div className="relative">
                    <Users
                      className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="number"
                      name="personas"
                      value={formData.personas}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      required
                      placeholder="2"
                      className="focus:border-primary/50 text-foreground placeholder:text-foreground/30 w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Dates */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Fecha de Llegada
                  </label>
                  <div className="relative">
                    <CalendarIcon
                      className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="date"
                      name="fechaLlegada"
                      value={formData.fechaLlegada}
                      onChange={handleChange}
                      required
                      className="focus:border-primary/50 color-scheme-light text-foreground w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-foreground/80 text-sm font-medium tracking-wide">
                    Fecha de Salida
                  </label>
                  <div className="relative">
                    <CalendarIcon
                      className="text-foreground/40 absolute top-1/2 left-4 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="date"
                      name="fechaSalida"
                      value={formData.fechaSalida}
                      onChange={handleChange}
                      required
                      className="focus:border-primary/50 color-scheme-light text-foreground w-full rounded-xl border border-black/10 bg-white/50 py-3 pr-4 pl-12 transition-colors focus:outline-none"
                      style={{ colorScheme: 'light' }}
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
