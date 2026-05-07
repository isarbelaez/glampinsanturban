import React, { useState } from 'react';
import { asset } from '../../utils/assets';

const chapters = [
  {
    id: '01',
    title: 'Mañanas sin prisa',
    description:
      'El sonido del café hirviendo y la lluvia suave golpeando los cristales. Aquí, el tiempo corre a otra velocidad.',
    image: asset('/images/cama.jpeg'), // Fallback if no video
  },
  {
    id: '02',
    title: 'Conecta con la naturaleza',
    description:
      'Respira el aire puro del páramo. Siente el crujir de las hojas mojadas bajo tus pies.',
    image: asset('/images/paisaje.jpeg'),
  },
  {
    id: '03',
    title: 'Noches para recordar',
    description:
      'El calor de la fogata, una copa de vino y la inmensidad del cielo estrellado solo para ti.',
    image: asset('/images/exterior.jpeg'),
  },
  {
    id: '04',
    title: 'Despierta lo esencial',
    description:
      'Abre los ojos y deja que los primeros rayos del sol iluminen un nuevo comienzo desde tu cama.',
    image: asset('/images/cabaña.jpeg'),
  },
];

export function CinematicExperiences() {
  const [activeId, setActiveId] = useState(chapters[0].id);

  return (
    <section className="relative flex h-[80vh] min-h-[600px] w-full flex-col overflow-hidden bg-[#050f0e] pt-24 pb-0 md:flex-row">
      {chapters.map((chapter) => {
        const isActive = activeId === chapter.id;

        return (
          <div
            key={chapter.id}
            onMouseEnter={() => setActiveId(chapter.id)}
            onClick={() => setActiveId(chapter.id)}
            className={`group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden border-r border-white/5 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isActive ? 'flex-[4] md:flex-[5]' : 'flex-1 md:flex-[1]'
            }`}
          >
            {/* Background Image/Video */}
            <div className="absolute inset-0 h-full w-full">
              <img
                src={chapter.image}
                alt={chapter.title}
                className={`h-full w-full object-cover transition-transform duration-1000 ${
                  isActive ? 'scale-105' : 'scale-100 opacity-60 grayscale-[30%]'
                }`}
              />
              {/* Gradient Overlay for Text Legibility */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive
                    ? 'bg-gradient-to-t from-[#050f0e] via-[#050f0e]/50 to-transparent opacity-100'
                    : 'bg-black/40 opacity-100'
                }`}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
              {/* Top: Chapter Number */}
              <div
                className={`font-serif text-4xl transition-all duration-700 md:text-5xl ${
                  isActive ? 'text-primary/90 translate-y-0' : 'translate-y-4 text-white/30'
                }`}
              >
                {chapter.id}
              </div>

              {/* Bottom: Text Content */}
              <div
                className={`flex flex-col justify-end overflow-hidden transition-all duration-700 ${
                  isActive ? 'h-auto translate-y-0 opacity-100' : 'h-0 translate-y-8 opacity-0'
                }`}
              >
                {isActive && (
                  <>
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                      {chapter.title}
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed text-white/80 drop-shadow-md md:text-lg lg:text-xl">
                      {chapter.description}
                    </p>
                    {/* Micro Interaction Element */}
                    <div className="bg-primary mt-8 h-1 w-12 animate-pulse rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
                  </>
                )}
              </div>

              {/* Vertical Title (when collapsed) */}
              {!isActive && (
                <div className="absolute bottom-12 left-1/2 hidden w-[400px] origin-bottom-left -translate-x-1/2 -rotate-90 md:left-8 md:block md:translate-x-0">
                  <span className="text-sm tracking-[0.3em] whitespace-nowrap text-white/60 uppercase">
                    {chapter.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
