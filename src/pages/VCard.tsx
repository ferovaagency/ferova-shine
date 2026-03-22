import { useState } from 'react';
import { Download, MessageCircle, Globe, Mail, Phone, Share2, Check } from 'lucide-react';

export default function VCard() {
  const [nombre, setNombre] = useState('');
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(false);

  const info = {
    nombre: 'Maria Fernanda Calderon',
    cargo: 'Especialista en GEO y Webapps',
    empresa: 'Ferova Agency',
    telefono: '+17865787671',
    email: 'maria.fer@ferova.com.co',
    web: 'https://seoparaecommerce.co',
    whatsapp: '17865787671',
  };

  const handleAccion = () => {
    if (!nombre.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    // 1 — Descargar .vcf
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${info.nombre}`,
      `N:Calderon;Maria Fernanda;;;`,
      `ORG:${info.empresa}`,
      `TITLE:${info.cargo}`,
      `TEL;TYPE=CELL:${info.telefono}`,
      `EMAIL:${info.email}`,
      `URL:${info.web}`,
      `NOTE:Especialista en SEO GEO y desarrollo de Webapps en Lovable`,
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MariaFernanda-Ferova.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setListo(true);

    // 2 — Abrir WhatsApp con mensaje prellenado después de 1.2s
    setTimeout(() => {
      const mensaje = encodeURIComponent(
        `Hola Maria, soy ${nombre.trim()} fue un gusto conocerte, sigamos en contacto`
      );
      window.open(`https://wa.me/${info.whatsapp}?text=${mensaje}`, '_blank');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #0f0e17 0%, #1a1830 50%, #0f0e17 100%)' }}>

      <div className="w-full max-w-xs">

        {/* Card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, #1e1c35, #16142a)' }}>

          {/* Franja dorada */}
          <div className="h-20 relative"
            style={{ background: 'linear-gradient(135deg, hsl(45,86%,32%), hsl(45,86%,52%))' }}>
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          </div>

          {/* Logo */}
          <div className="flex justify-center -mt-12 mb-3 px-6">
            <div className="w-24 h-24 rounded-2xl border-4 overflow-hidden shadow-xl flex items-center justify-center"
              style={{ borderColor: 'hsl(45,86%,45%)', background: '#1e1c35' }}>
              <img
                src="/ferova-logo.png"
                alt="Ferova Agency"
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  el.parentElement!.innerHTML = '<span style="font-size:2.2rem;font-weight:900;color:hsl(45,86%,50%)">F</span>';
                }}
              />
            </div>
          </div>

          <div className="px-6 pb-7">
            {/* Nombre y cargo */}
            <div className="text-center mb-5">
              <h1 className="text-lg font-bold text-white mb-0.5">{info.nombre}</h1>
              <p className="text-sm font-semibold" style={{ color: 'hsl(45,86%,58%)' }}>{info.cargo}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{info.empresa}</p>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-1.5 mb-5">
              {[
                { icon: Phone, text: info.telefono, href: `tel:${info.telefono}` },
                { icon: Mail, text: info.email, href: `mailto:${info.email}` },
                { icon: Globe, text: 'seoparaecommerce.co', href: info.web },
              ].map((item, i) => (
                <a key={i} href={item.href} target={i === 2 ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all hover:bg-white/5"
                  style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'hsl(45,86%,55%)' }} />
                  {item.text}
                </a>
              ))}
            </div>

            {/* Separador */}
            <div className="mb-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

            {/* Campo nombre */}
            <div className="mb-3">
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                ¿Cómo te llamas?
              </label>
              <input
                type="text"
                value={nombre}
                onChange={e => { setNombre(e.target.value); setError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleAccion()}
                placeholder="Tu nombre completo..."
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${error ? 'hsl(0,70%,55%)' : 'rgba(255,255,255,0.1)'}`,
                }}
              />
              {error && (
                <p className="text-xs mt-1.5" style={{ color: 'hsl(0,70%,65%)' }}>
                  Escribe tu nombre para continuar
                </p>
              )}
            </div>

            {/* Botón principal */}
            <button
              onClick={handleAccion}
              disabled={listo}
              className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
              style={{
                background: listo
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : 'linear-gradient(135deg, hsl(45,86%,38%), hsl(45,86%,54%))',
                color: listo ? 'white' : '#1a1208',
                opacity: listo ? 0.9 : 1,
              }}
            >
              {listo ? (
                <><Check className="w-4 h-4" /> ¡Contacto guardado! Abriendo WhatsApp...</>
              ) : (
                <><Download className="w-4 h-4" /> Guardar contacto y escribirme</>
              )}
            </button>

            <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Descarga el contacto y te abre WhatsApp automáticamente
            </p>
          </div>
        </div>

        {/* Botón compartir */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Maria Fernanda Calderon — Ferova Agency',
                text: 'Especialista en GEO y Webapps',
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('¡Link copiado al portapapeles!');
            }
          }}
          className="w-full mt-3 py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
        >
          <Share2 className="w-3.5 h-3.5" /> Compartir mi contacto digital
        </button>

        <p className="text-center text-xs mt-5" style={{ color: 'rgba(255,255,255,0.15)' }}>
          © {new Date().getFullYear()} Ferova Agency
        </p>
      </div>
    </div>
  );
}
