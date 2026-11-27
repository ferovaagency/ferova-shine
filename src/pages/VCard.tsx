import { useState } from 'react';
import { Download, Globe, Mail, Phone, Share2, Check, Newspaper, FileText, ExternalLink } from 'lucide-react';
import ferovaLogo from '@/assets/ferova-logo.png.png';
import SEO from '@/components/SEO';

export default function VCard() {
  const [nombre, setNombre] = useState('');
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(false);

  const info = {
    nombre: 'Maria Fernanda Calderon',
    cargo: 'Especialista en GEO y Webapps',
    empresa: 'Ferova Agency',
    telefono: '+17866894686',
    email: 'gerencia@seoparaecommerce.co',
    web: 'https://seoparaecommerce.co',
    whatsapp: '17866894686',
  };

  const handleAccion = () => {
    if (!nombre.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    // 1 — Abrir WhatsApp PRIMERO (debe ser inmediato al clic para que el navegador lo permita)
    const mensaje = encodeURIComponent(
      `Hola Maria, soy ${nombre.trim()} fue un gusto conocerte, sigamos en contacto`
    );
    window.open(`https://wa.me/17866894686?text=${mensaje}`, '_blank');

    // 2 — Descargar .vcf al mismo tiempo
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
  };

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'María Fernanda Calderón',
    jobTitle: info.cargo,
    worksFor: { '@type': 'Organization', name: info.empresa, url: info.web },
    email: `mailto:${info.email}`,
    telephone: info.telefono,
    url: 'https://seoparaecommerce.co/contacto-digital',
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title="Maria Fernanda Calderon — Ferova Agency | Contacto digital"
        description="Tarjeta de contacto digital de María Fernanda Calderón, especialista en GEO y Webapps en Ferova Agency: guarda el contacto y escríbele por WhatsApp."
        path="/contacto-digital"
        lang="es"
        jsonLd={personLd}
        noindex
      />
      <main id="contenido-principal" className="page-hero on-dark grid-field flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xs">
          <div className="fx-light overflow-hidden rounded-[1.25rem] bg-white shadow-[0_24px_60px_rgb(10_9_30/35%)]">
            {/* Franja vino */}
            <div className="cta-band h-20" aria-hidden="true" />

            {/* Logo */}
            <div className="-mt-12 mb-3 flex justify-center px-6">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_14px_40px_rgb(47_45_86/18%)]">
                <img
                  src={ferovaLogo}
                  alt="Ferova Agency"
                  className="h-full w-full object-contain p-2"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.parentElement!.innerHTML = '<span style="font-size:2.2rem;font-weight:900;color:#541014">F</span>';
                  }}
                />
              </div>
            </div>

            <div className="px-6 pb-7">
              <div className="mb-5 text-center">
                <h1 className="mb-0.5 text-lg">{info.nombre}</h1>
                <p className="text-sm font-semibold text-[#541014]">{info.cargo}</p>
                <p className="fx-muted mt-0.5 text-xs">{info.empresa}</p>
              </div>

              <div className="mb-5 space-y-1.5">
                {[
                  { icon: Phone, text: info.telefono, href: `tel:${info.telefono}` },
                  { icon: Mail, text: info.email, href: `mailto:${info.email}` },
                  { icon: Globe, text: 'seoparaecommerce.co', href: info.web },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={i === 2 ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-[#585665] transition-colors hover:bg-[#f6f5fb] hover:text-[#1f1e2b]">
                    <item.icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#541014]" />
                    {item.text}
                  </a>
                ))}
              </div>

              <div className="mb-5 border-t border-[#dfdcea]" />

              {/* Links rápidos */}
              <div className="mb-5 space-y-2">
                {[
                  { icon: Newspaper, text: 'Newsletter', href: 'https://seoparaecommerce.co/newsletter' },
                  { icon: FileText, text: 'Herramienta de Brief', href: 'https://seoparaecommerce.co/recursos/briefing-newsletter' },
                  { icon: ExternalLink, text: 'Asesoría con nosotros', href: 'https://forms.gle/4vobAkaa8W1uNKno6' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-tile !flex items-center justify-center gap-2.5 !py-3 text-sm font-semibold"
                  >
                    <item.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    {item.text}
                  </a>
                ))}
              </div>

              <div className="mb-5 border-t border-[#dfdcea]" />

              <div className="mb-3">
                <label htmlFor="vcard-nombre" className="mb-2 block text-sm font-semibold text-[#1f1e2b]">
                  ¿Cómo te llamas?
                </label>
                <input
                  id="vcard-nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); setError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handleAccion()}
                  placeholder="Tu nombre completo..."
                  aria-invalid={error}
                  aria-describedby={error ? 'vcard-error' : undefined}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1f1e2b] placeholder:text-[#585665]/70 transition-colors focus:border-[#541014] focus:outline-none focus:ring-2 focus:ring-[#541014]/30 ${error ? 'border-[#b42318]' : 'border-[#dfdcea]'}`}
                />
                {error && (
                  <p id="vcard-error" className="mt-1.5 text-xs text-[#b42318]">
                    Escribe tu nombre para continuar
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleAccion}
                disabled={listo}
                className={`fx-btn w-full ${listo ? '!bg-[#2f2d56]' : ''}`}
              >
                {listo
                  ? <><Check aria-hidden="true" /> ¡Listo! Revisa WhatsApp</>
                  : <><Download aria-hidden="true" /> Guardar contacto y escribirme</>
                }
              </button>

              <p className="fx-muted mt-3 text-center text-xs">
                Guarda el contacto y te abre WhatsApp al instante
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Maria Fernanda Calderon — Ferova Agency', text: 'Especialista en GEO y Webapps', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Link copiado!');
              }
            }}
            className="fx-btn fx-btn--outline fx-btn--sm mt-3 w-full"
          >
            <Share2 aria-hidden="true" /> Compartir mi contacto digital
          </button>

          <p className="fx-muted mt-5 text-center text-xs">
            © {new Date().getFullYear()} Ferova Agency
          </p>
        </div>
      </main>
    </div>
  );
}
