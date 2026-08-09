import { useState, type CSSProperties, type PointerEvent } from "react";
import { FileCheck2, Gauge, PlugZap } from "lucide-react";
import consoleVisual from "@/assets/agency-delivery-console-hero.png";

export default function AgencyDeliveryConsole() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const style = {
    "--console-x": `${tilt.x * 1.6}deg`,
    "--console-y": `${tilt.y * -1.2}deg`,
  } as CSSProperties;

  return (
    <figure className="agency-console" style={style} onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="agency-console-stage">
        <img src={consoleVisual} alt="Consola tridimensional de capacidad técnica con tres módulos de entrega para agencias" className="agency-console-image" />
        <div className="agency-console-signal" aria-hidden="true"><span /><span /><span /></div>
      </div>
      <figcaption className="agency-console-readout">
        <span><PlugZap aria-hidden="true" /> Brief recibido</span>
        <span><Gauge aria-hidden="true" /> Capacidad activada</span>
        <span><FileCheck2 aria-hidden="true" /> Entrega documentada</span>
      </figcaption>
    </figure>
  );
}
