import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { asset } from '../../utils/assets';

const experiences = [
  {
    id: '01',
    video: asset('/images/Videos/videouno.mp4'),
  },
  {
    id: '02',
    video: asset('/images/Videos/videodos.mp4'),
  },
  {
    id: '03',
    video: asset('/images/Videos/videotres.mp4'),
  },
  {
    id: '04',
    video: asset('/images/Videos/videocuatro.mp4'),
  },
  {
    id: '05',
    video: asset('/images/Videos/videocinco.mp4'),
  },
  {
    id: '06',
    video: asset('/images/Videos/videosix.mp4'),
  },
];

export function CinematicExperiences() {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;
      if (video.dataset.id === activeId) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeId]);

  return (
    <section className="relative flex h-[80vh] min-h-[600px] w-full flex-col overflow-hidden bg-[#050f0e] pt-24 pb-0 md:flex-row">
      {/* Volume Toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-32 right-8 z-50 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60"
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {experiences.map((exp) => {
        const isActive = activeId === exp.id;

        return (
          <div
            key={exp.id}
            onMouseEnter={() => setActiveId(exp.id)}
            onClick={() => setActiveId(exp.id)}
            className={`group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden border-r border-white/5 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isActive ? 'flex-[4] md:flex-[5]' : 'flex-1 md:flex-[1]'
            }`}
          >
            {/* Background Video */}
            <div className="absolute inset-0 h-full w-full">
              <video
                ref={(el) => (videoRefs.current[exp.id] = el)}
                data-id={exp.id}
                src={exp.video}
                muted={isMuted}
                loop
                playsInline
                className={`h-full w-full object-cover transition-transform duration-1000 ${
                  isActive ? 'scale-105' : 'scale-100 opacity-60 grayscale-[30%]'
                }`}
              />
              {/* Gradient Overlay (only for dimming inactive videos) */}
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                  isActive ? 'opacity-0' : 'bg-black/40 opacity-100'
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
