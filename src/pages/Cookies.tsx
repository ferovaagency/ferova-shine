import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/motion';
import { Helmet } from 'react-helmet-async';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const Cookies = ({ lang = 'es' }: Props) => {
  const lastUpdate = new Date().toISOString().slice(0, 10);

  const openSettings = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Política de Cookies — Ferova Agency</title>
        <meta name="description" content="Política de Cookies de Ferova Agency: tipos de cookies, gestión de consentimiento y cómo desactivarlas." />
        <link rel="canonical" href="https://seoparaecommerce.co/cookies" />
      </Helmet>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
            Política de Cookies — Ferova Agency
          </h1>

          <article className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-gold">
            <h2>1. Qué son las cookies</h2>
            <p>
              Pequeños archivos de texto que un sitio web almacena en tu navegador para recordar información sobre tu visita.
            </p>

            <h2>2. Tipos de cookies que usamos</h2>
            <h3>A) Esenciales (no requieren consentimiento)</h3>
            <ul>
              <li>Sesión: para mantener la navegación</li>
              <li>Preferencia de idioma</li>
              <li>Aceptación de banner de cookies</li>
            </ul>
            <h3>B) Analíticas (requieren consentimiento)</h3>
            <ul>
              <li>Google Analytics 4: medición de tráfico, comportamiento, conversiones</li>
            </ul>
            <h3>C) Marketing (requieren consentimiento)</h3>
            <ul>
              <li>Píxeles de Meta (Facebook/Instagram)</li>
              <li>Cookies de remarketing</li>
            </ul>
            <h3>D) Funcionales (requieren consentimiento)</h3>
            <ul>
              <li>Asesor IA: recordar conversaciones</li>
              <li>Newsletter: recordar suscripción</li>
            </ul>

            <h2>3. Gestión de cookies</h2>
            <p>
              Puedes aceptar todas, rechazar todas excepto las esenciales, o personalizar tu elección desde el banner que aparece al entrar al sitio. También puedes cambiar tu preferencia en cualquier momento desde el botón{' '}
              <button onClick={openSettings} className="underline text-gold hover:text-gold/80 inline">"Configurar cookies"</button>{' '}
              en el footer.
            </p>

            <h2>4. Cookies de terceros</h2>
            <ul>
              <li>Google (Analytics): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
              <li>Meta (Facebook): <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/policies/cookies/</a></li>
              <li>Brevo: <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">https://www.brevo.com/legal/privacypolicy/</a></li>
            </ul>

            <h2>5. Cómo desactivar cookies en tu navegador</h2>
            <ul>
              <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web.</li>
              <li><strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies y datos del sitio.</li>
            </ul>

            <h2>6. Actualizaciones</h2>
            <p>
              Esta política puede cambiar. Última actualización: {lastUpdate}.
            </p>
          </article>
        </div>
      </main>
      <Footer lang={lang} />
    </PageTransition>
  );
};

export default Cookies;
