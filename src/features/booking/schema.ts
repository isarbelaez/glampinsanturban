import { z } from 'zod';

export const bookingSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  plan: z.string().min(1, 'Por favor selecciona un plan'),
  personas: z
    .number({ message: 'Ingresa un número válido' })
    .int()
    .min(1, 'Mínimo 1 persona')
    .max(10, 'Máximo 10 personas'),
  dateRange: z
    .object({
      from: z.date({ message: 'Selecciona la fecha de llegada' }),
      to: z.date({ message: 'Selecciona la fecha de salida' }),
    })
    .refine((range) => range.to > range.from, {
      message: 'La salida debe ser posterior a la llegada',
    }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
