import { asset } from '../utils/assets';

export interface Plan {
  slug: string;
  title: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  details: string;
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
    details:
      'Disfruta de una experiencia verdaderamente inolvidable en nuestra acogedora cabaña, equipada con calefacción para las noches frías del páramo. El plan incluye un delicioso desayuno campesino para comenzar tu día con la mejor energía.',
    features: ['wifi', 'desayuno', 'calefaccion'],
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
    details:
      'Un plan diseñado para celebrar el amor en un entorno mágico. Incluye una hermosa decoración romántica en tu cabaña, desayuno en la cama, un exquisito almuerzo especial y, para cerrar la noche, una cálida fogata bajo las estrellas acompañada de chocolate caliente y masmelos.',
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
    details:
      'Conéctate con la naturaleza en su máxima expresión con una ubicación privilegiada. Disfruta de una cabaña con vista directa a la laguna, donde el sonido del agua y el canto de las aves serán tu mejor compañía. Incluye un recorrido guiado y desayuno campestre.',
    features: ['wifi', 'Laguna', 'desayuno', 'almuerzo', 'cena', 'fogata'],
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
    details:
      'Un merecido descanso en la tranquilidad de la montaña. Relájate en una cabaña con vistas inigualables al paisaje del páramo, ideal para desconectarse de la rutina y disfrutar de caminatas ecológicas. Por la noche, comparte alrededor de una fogata privada. Incluye desayuno.',
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
    details:
      'La escapada perfecta para compartir en pareja. Sorprende a tu ser amado con una velada inolvidable que incluye una botella de vino seleccionada, un almuerzo gourmet y una fogata privada. Déjate maravillar por la exclusividad de nuestras cabañas de lujo y el impresionante paisaje. Incluye desayuno.',
    features: ['wifi', 'desayuno', 'vino', 'Fogata', 'Almuerzo', 'cena'],
  },
];
