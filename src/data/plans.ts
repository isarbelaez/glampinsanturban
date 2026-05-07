import { asset } from '../utils/assets';

export interface Plan {
  slug: string;
  title: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
}

export const plansData: Plan[] = [
  {
    slug: 'santurban',
    title: 'Santurban',
    price: '$290.000',
    image: asset('/images/cabaña.jpeg'),
    gallery: [
      asset('/images/cabaña.jpeg'),
      asset('/images/exterior.jpeg'),
      asset('/images/paisaje.jpeg'),
      asset('/images/cama.jpeg'),
    ],
    description: 'Una experiencia inolvidable, cabaña con calefacción y desayuno incluido.',
    features: ['wifi', 'jacuzzi', 'desayuno'],
  },
  {
    slug: 'plan-romantico',
    title: 'Plan Romántico',
    price: '$390.000',
    image: asset('/images/exterior.jpeg'),
    gallery: [
      asset('/images/exterior.jpeg'),
      asset('/images/cama.jpeg'),
      asset('/images/espejo.jpeg'),
      asset('/images/cabaña.jpeg'),
    ],
    description: 'Disfruta de una agradable decoración, desayuno, almuerzo y fogata con chocolate.',
    features: ['wifi', 'desayuno', 'fogata', 'almuerzo', 'decoración'],
  },
  {
    slug: 'plan-laguna-encantada',
    title: 'Plan Laguna Encantada',
    price: '$560.000',
    image: asset('/images/paisaje.jpeg'),
    gallery: [
      asset('/images/paisaje.jpeg'),
      asset('/images/exterior.jpeg'),
      asset('/images/cabaña.jpeg'),
      asset('/images/espejo.jpeg'),
    ],
    description: 'Una experiencia frente a la laguna con una vista hermosa.',
    features: ['wifi', 'Laguna', 'desayuno'],
  },
  {
    slug: 'plan-paramos',
    title: 'Plan Páramos',
    price: '$230.000',
    image: asset('/images/cama.jpeg'),
    gallery: [
      asset('/images/cama.jpeg'),
      asset('/images/espejo.jpeg'),
      asset('/images/paisaje.jpeg'),
      asset('/images/exterior.jpeg'),
    ],
    description: 'Disfruta un día de descanso en nuestra cabaña con una vista hermosa.',
    features: ['wifi', 'desayuno', 'fogata'],
  },
  {
    slug: 'plan-noche-de-pareja',
    title: 'Plan Noche de Pareja',
    price: '$490.000',
    image: asset('/images/espejo.jpeg'),
    gallery: [
      asset('/images/espejo.jpeg'),
      asset('/images/cabaña.jpeg'),
      asset('/images/cama.jpeg'),
      asset('/images/paisaje.jpeg'),
    ],
    description: 'Disfruta una velada romántica con la persona que amas.',
    features: ['wifi', 'desayuno', 'vino', 'Fogata', 'Almuerzo'],
  },
];
