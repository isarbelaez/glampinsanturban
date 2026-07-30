import { asset } from '../utils/assets';

export interface Plan {
  slug: string;
  category: 'glamping' | 'hostal';
  title: string;
  price: string;
  image: string;
  gallery: string[];
  video?: string; // New field for TikTok-style video
  description: string;
  details: string;
  includesDescription?: string;
  accommodationSummary?: string;
  features: string[];
  includes: string[];
  whatsapp?: string;
  icsUrl?: string;
  pricingTable?: { guests: string; price: string }[];
}

export const plansData: Plan[] = [
  {
    slug: 'santurban',
    category: 'glamping',
    title: 'Aventura Santurbán',
    price: '$295.000',
    image: asset('/images/cabaña.webp'),
    gallery: [
      asset('/images/cabaña.webp'),
      asset('/images/exterior.webp'),
      asset('/images/paisaje.webp'),
      asset('/images/cama.webp'),
    ],
    description: 'Una experiencia inolvidable, cabaña con calefacción y desayuno incluido.',
    details:
      'Vive una experiencia inolvidable rodeado de naturaleza y paisajes increíbles con hospedaje en nuestro Glamping de lujo y un delicioso desayuno típico para comenzar el día.',
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
    icsUrl:
      'https://calendar.google.com/calendar/ical/f7bca012556dacd7e1f85534a4bba15936336fd83fa892f62d82c54a7e76848c%40group.calendar.google.com/private-48ed2bac3f163a582a97610d8dc3e1ae/basic.ics',
  },
  {
    slug: 'plan-romantico',
    category: 'glamping',
    title: 'Plan Romántico',
    price: '$425.000',
    image: asset('/images/romantico PM.jpeg'),
    gallery: [
      asset('/images/pareja.webp'),
      asset('/images/mujer.webp'),
      asset('/images/cama.webp'),
      asset('/images/cabaña.webp'),
    ],
    description:
      'Disfruta de una agradable decoración, vista a la montaña, desayuno, almuerzo y masmelos.',
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
    icsUrl:
      'https://calendar.google.com/calendar/ical/f7bca012556dacd7e1f85534a4bba15936336fd83fa892f62d82c54a7e76848c%40group.calendar.google.com/private-48ed2bac3f163a582a97610d8dc3e1ae/basic.ics',
  },
  {
    slug: 'plan-laguna-encantada',
    category: 'glamping',
    title: 'Plan Laguna Encantada',
    price: '$560.000',
    image: asset('/images/paisaje.webp'),
    gallery: [
      asset('/images/paisaje.webp'),
      asset('/images/exterior.webp'),
      asset('/images/cabaña.webp'),
      asset('/images/espejo.webp'),
    ],
    description: 'Una experiencia frente a la laguna con una vista hermosa.',
    details:
      'Conecta con la naturaleza en una experiencia llena de aventura y descanso. Incluye hospedaje en Glamping Deluxe, desayuno típico, almuerzo a la carta, fogata, masmelos y guía para visitar la laguna. NO INCLUYE TRASPORTE',
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
    category: 'glamping',
    title: 'Plan Páramo',
    price: '$245.000',
    image: asset('/images/cama.webp'),
    gallery: [
      asset('/images/cama.webp'),
      asset('/images/espejo.webp'),
      asset('/images/paisaje.webp'),
      asset('/images/exterior.webp'),
    ],
    description: 'Disfruta un día de descanso en nuestra cabaña con una vista hermosa.',
    details:
      'Un merecido descanso de la rutina, una pasadía con desayuno de inluido, almuerzo, fogata y masmelos, son de lunes a jueves de 8 am a 6pm',
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
    category: 'glamping',
    title: 'Plan Noche de Pareja',
    price: '$395.000',
    image: asset('/images/pareja.jpeg'),
    gallery: [
      asset('/images/pareja.jpeg'),
      asset('/images/niño.webp'),
      asset('/images/cama.webp'),
      asset('/images/paisaje.webp'),
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
  {
    slug: 'Habitación-Frailejon',
    category: 'hostal',
    title: 'Habitación Frailejon',
    price: '$215.000 (2 personas)',
    image: asset('/images/hostal.jpeg'),
    gallery: [asset('/images/hostaluno.webp')],
    video: asset('/images/Videos/hostal.mp4'),
    description:
      'Habitación privada en zona de hostal. Puedes hacer uso de zonas sociales, salón familiar super grande con chimenea, juegos de mesa, bicicleta, senderos y mucho más.',
    details:
      'Disfruta de la privacidad de una habitación propia dentro de nuestro ambiente de hostal. La combinación perfecta entre economía y tranquilidad, Cómoda habitación ideal para descansar y disfrutar de la tranquilidad de Santurbán, con dos camas semidobles, entrada exterior, parqueadero privado, baño privado con agua caliente, calefactor, Smart TV, WiFi y sofá cama. Puedes hacer uso de zonas sociales, salón familiar super grande con chimenea, juegos de mesa, bicicleta, senderos y mucho más.',
    features: ['wifi', 'cama doble', 'baño privado', 'TV', 'calefactor'],
    includes: ['cama en habitación', 'Desayuno básico', 'Acceso a cocina compartida'],
    whatsapp: '17869097263',
    pricingTable: [
      { guests: '2 personas', price: '$215.000' },
      { guests: '4 personas', price: '$285.000' },
      { guests: '6 personas', price: '$315.000' },
    ],
  },
  {
    slug: 'plan-noche-de-encanto',
    category: 'glamping',
    title: 'Plan Noche de Encanto',
    price: '$240.000',
    image: asset('/images/mujer.webp'),
    gallery: [
      asset('/images/mujer.webp'),
      asset('/images/espejo.webp'),
      asset('/images/cabaña.webp'),
      asset('/images/cama.webp'),
    ],
    description: 'Hospédate en nuestro Glamping Luzuri.',
    details:
      'Cabaña con hermosa vista a la montaña y clima espectacular, perfecta para una noche mágica bajo las estrellas.',
    features: ['wifi', 'desayuno', 'vista a la montaña'],
    includes: ['Cabaña privada', 'Desayuno incluido', 'Acceso a zona de fogata'],
    whatsapp: '17869097263',
    // No pricingTable for now
  },
  {
    slug: 'Habitación-vibra-Santurban',
    category: 'hostal',
    title: 'Habitación vibra Santurban',
    price: '$195.000 (2 personas)',
    image: asset('/images/vibra.png'),
    gallery: [asset('/images/hostaldos.webp')],
    video: asset('/images/Videos/sala.mp4'),
    description:
      'Habitación privada en zona de hostal. Puedes hacer uso de zonas sociales, salón familiar super grande con chimenea, juegos de mesa, bicicleta, senderos y mucho más.',
    details:
      'Una habitación acogedora y cómoda con dos camas semidobles, baño privado con agua caliente y WiFi para una estadía tranquila y agradable. Puedes hacer uso de zonas sociales, salón familiar super grande con chimenea, juegos de mesa, bicicleta, senderos y mucho más.',
    features: ['wifi', 'camas', 'baño privado'],
    includes: ['Habitación privada', 'Baño compartido con agua caliente', 'Desayuno incluido'],
    whatsapp: '17869097263',
    pricingTable: [
      { guests: '2 personas', price: '$195.000' },
      { guests: '4 personas', price: '$245.000' },
    ],
  },
];
