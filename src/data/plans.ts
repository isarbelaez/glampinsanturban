import { asset } from '../utils/assets';

export interface Plan {
  slug: string;
  title: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  details: string;
  includesDescription?: string;
  accommodationSummary?: string;
  features: string[];
  includes: string[];
  whatsapp?: string;
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
    includesDescription:
      'Siente la esencia del páramo en nuestra cabaña insignia, donde la comodidad y la tradición se encuentran para brindarte un descanso reparador.',
    accommodationSummary:
      'Este alojamiento incluye una habitación privada con cama doble, sistema de calefacción integrado, baño privado con agua caliente y una zona de estar con vista panorámica.',
    features: ['wifi', 'desayuno', 'calefaccion'],
    includes: [
      'Cabaña privada con calefacción',
      'Desayuno campesino incluido',
      'Acceso a zonas sociales',
      'Senderismo ecológico',
      'Atención personalizada',
    ],
    whatsapp: '17869097263',
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
    includesDescription:
      'Convierte tu estancia en un cuento de hadas con detalles pensados exclusivamente para enamorar y celebrar la vida en pareja.',
    accommodationSummary:
      'Este plan ofrece una habitación decorada temáticamente, cama con lencería de lujo, zona de fogata privada y un espacio íntimo diseñado para la desconexión total.',
    features: ['wifi', 'desayuno', 'fogata', 'almuerzo', 'decoración'],
    includes: [
      'Decoración romántica especial',
      'Desayuno servido en la cabaña',
      'Almuerzo especial para dos',
      'Fogata privada con chocolate y masmelos',
      'Botella de vino de cortesía',
    ],
    whatsapp: '17869097263',
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
    includesDescription:
      'Despierta con la vista más privilegiada del glamping, donde el espejo de agua de la laguna refleja la paz que vienes a buscar.',
    accommodationSummary:
      'El alojamiento cuenta con una cabaña exclusiva frente a la laguna, balcón privado, ventanales de piso a techo y acceso directo a los senderos de agua.',
    features: ['wifi', 'Laguna', 'desayuno', 'almuerzo', 'cena', 'fogata'],
    includes: [
      'Ubicación privilegiada frente a la laguna',
      'Recorrido guiado por el páramo',
      'Pensión completa (Desayuno, Almuerzo y Cena)',
      'Fogata nocturna frente al agua',
      'Servicio de guía bilingüe opcional',
    ],
    whatsapp: '17869097263',
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
    includesDescription:
      'La opción ideal para aventureros y amantes del trekking que buscan un refugio acogedor tras explorar los senderos de Santurbán.',
    accommodationSummary:
      'Incluye una habitación funcional y cálida con vista a la montaña, zona de hamacas para el descanso y cercanía a los principales senderos ecológicos.',
    features: ['wifi', 'desayuno', 'fogata'],
    includes: [
      'Cabaña con vista panorámica',
      'Desayuno tradicional incluido',
      'Fogata privada bajo las estrellas',
      'Acceso a senderos privados',
      'Zona de relajación y hamacas',
    ],
    whatsapp: '17869097263',
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
    includesDescription:
      'Exclusividad y lujo se fusionan en este plan diseñado para quienes desean lo mejor de la gastronomía y el confort en las alturas.',
    accommodationSummary:
      'Alojamiento premium en cabaña de lujo con mini-bar, cava de vinos, tina de hidromasaje (según disponibilidad) y servicio a la habitación personalizado.',
    features: ['wifi', 'desayuno', 'vino', 'Fogata', 'Almuerzo', 'cena'],
    includes: [
      'Noche en cabaña de lujo',
      'Botella de vino seleccionada',
      'Cena gourmet privada',
      'Fogata especial para parejas',
      'Desayuno buffet al día siguiente',
    ],
    whatsapp: '17869097263',
  },
];
