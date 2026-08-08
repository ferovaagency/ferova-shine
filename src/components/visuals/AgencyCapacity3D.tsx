import { useState, type CSSProperties, type PointerEvent } from 'react';
import { Code2, FileSearch, LayoutTemplate, Wrench } from 'lucide-react';

type Props = { compact?: boolean; className?: string };

export default function AgencyCapacity3D({ compact = false, className = '' }: Props) {
  const [rotation, setRotation] = useState({ x: -8, y: -16 });

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -8 - y * 14, y: -16 + x * 22 });
  };

  const style = {
    '--scene-rx': `${rotation.x}deg`,
    '--scene-ry': `${rotation.y}deg`,
  } as CSSProperties;

  return (
    <div className={`agency-3d ${compact ? 'agency-3d-compact' : ''} ${className}`} onPointerMove={move} onPointerLeave={() => setRotation({ x: -8, y: -16 })} aria-label="Escena tridimensional interactiva de capacidades para agencias" role="img">
      <div className="agency-3d-glow" />
      <div className="agency-3d-world" style={style}>
        <div className="agency-3d-platform agency-3d-platform-bottom"><span /><span /><span /><span /></div>
        <div className="agency-3d-platform agency-3d-platform-top"><span /><span /><span /><span /></div>

        <div className="agency-3d-core">
          <div className="agency-3d-face agency-3d-front"><strong>FEROVA</strong><small>CAPACIDAD TÉCNICA</small></div>
          <div className="agency-3d-face agency-3d-back" />
          <div className="agency-3d-face agency-3d-left" />
          <div className="agency-3d-face agency-3d-right" />
          <div className="agency-3d-face agency-3d-top" />
          <div className="agency-3d-face agency-3d-bottom" />
        </div>

        <div className="agency-3d-orbit agency-3d-orbit-one" />
        <div className="agency-3d-orbit agency-3d-orbit-two" />

        <div className="agency-3d-service agency-3d-service-seo"><FileSearch /><span>SEO técnico</span></div>
        <div className="agency-3d-service agency-3d-service-web"><Wrench /><span>Mantenimiento</span></div>
        <div className="agency-3d-service agency-3d-service-landing"><LayoutTemplate /><span>Landing pages</span></div>
        <div className="agency-3d-service agency-3d-service-code"><Code2 /><span>White label</span></div>

        <div className="agency-3d-particle agency-3d-particle-a" />
        <div className="agency-3d-particle agency-3d-particle-b" />
        <div className="agency-3d-particle agency-3d-particle-c" />
      </div>
      <p className="agency-3d-hint">Mueve el cursor</p>
    </div>
  );
}
