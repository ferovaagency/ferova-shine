import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const VIDEO_SRC = '/videos/capacidad-ferova-sin-personas.mp4';

export default function AgencyVideoElement() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => setPlaying(false));
      else video.pause();
    }, { threshold: 0.35 });

    const updateMotion = () => {
      if (reduceMotion.matches) video.pause();
      else if (video.getBoundingClientRect().top < window.innerHeight) video.play().catch(() => setPlaying(false));
    };

    observer.observe(video);
    reduceMotion.addEventListener('change', updateMotion);
    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <figure className="agency-video-element">
      <div className="agency-video-frame">
        <video
          ref={videoRef}
          className="agency-video-media"
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label="Animación visual de la capacidad técnica white label de Ferova"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
        <div className="agency-video-shade" aria-hidden="true" />
        <div className="agency-video-label">
          <span>Integración flexible</span>
          <strong>Capacidad white label</strong>
        </div>
        <button
          type="button"
          className="agency-video-control"
          onClick={togglePlayback}
          aria-label={playing ? 'Pausar animación' : 'Reproducir animación'}
          aria-pressed={playing}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{playing ? 'Pausar' : 'Reproducir'}</span>
        </button>
      </div>
      <figcaption>Una pieza visual, sin personas, integrada al contenido y sin sonido automático.</figcaption>
    </figure>
  );
}
