import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, MessageCircle, Star, ArrowRight, Clock, Zap, Shield } from 'lucide-react';
 
interface Props { lang?: 'es' | 'en'; }
 
const plans = [
  {
    name: 'Ficha + 1 producto',
    priceCOP: '$50.000',
    priceUSD: '$19',
    description: 'Ideal para emprendedores que quieren empezar a vender por WhatsApp Business de forma profesional.',
    features: [
      'Configuración completa del perfil de empresa',
      'Foto de perfil optimizada para la marca',
      'Descripción del negocio con palabras clave',
      'Horario de atención configurado',
      'Dirección y sitio web vinculados',
      '1 producto en el catálogo con foto, precio y descripción',
      'Link directo de WhatsApp con mensaje prellenado',
      'Entrega en 24-48 horas hábiles',
    ],
    paymentLink: '#',
    highlight: false,
    badge: null,
  },
  {
    name: 'Ficha + 10 productos',
    priceCOP: '$80.000',
    priceUSD: '$29',
    description: 'Perfecto para negocios con catálogo mediano que quieren mostrar sus mejores productos profesionalmente.',
    features: [
      'Todo lo del plan anterior',
      'Hasta 10 productos en el catálogo',
      'Categorización de productos',
      'Copywriting para cada producto',
      'Imágenes optimizadas para WhatsApp',
      'Mensaje de bienvenida automático',
      'Respuestas rápidas configuradas (hasta 5)',
      'Entrega en 48-72 horas hábiles',
    ],
    paymentLink: '#',
    highlight: true,
    badge: 'Más popular',
  },
  {
    name: 'Ficha + 20 productos',
    priceCOP: '$120.000',
    priceUSD: '$39',
    description: 'Para negocios con catálogo amplio que quieren una presencia completa y profesional en WhatsApp Business.',
    features: [
      'Todo lo del plan anterior',
      'Hasta 20 productos en el catálogo',
      'Colecciones y categorías organizadas',
      'Hasta 10 respuestas rápidas',
      'Mensaje de ausencia configurado',
      'Etiquetas para organizar contactos',
      'Guía de uso básica del catálogo',
      'Entrega en 72-96 horas hábiles',
    ],
    paymentLink: '#',
    highlight: false,
    badge: null,
  },
];
 
const faqs = [
  {
    q: '¿Qué necesito para contratar el servicio?',
    a: 'Solo necesitas tener WhatsApp Business instalado en tu teléfono y acceso a la cuenta. Nosotros nos encargamos del resto. Si aún no tienes WhatsApp Business, te guiamos para descargarlo gratis.',
  },
  {
    q: '¿Cómo es el proceso después de pagar?',
    a: 'Una vez confirmado el pago, te contactamos por WhatsApp en menos de 24 horas hábiles. Te pedimos acceso temporal a tu cuenta o te guiamos paso a paso para hacer los cambios juntos vía videollamada.',
  },
  {
    q: '¿Pueden subir imágenes de mis productos?',
    a: 'Sí, solo debes enviarnos las fotos de tus productos. Recomendamos imágenes de buena calidad (fondo blanco o neutro). Si no tienes fotos profesionales, podemos orientarte sobre cómo tomarlas con tu celular.',
  },
  {
    q: '¿El servicio incluye publicidad o pauta?',
    a: 'No, este servicio es exclusivamente la optimización del perfil y el catálogo de WhatsApp Business. Si deseas pauta digital en Meta o TikTok, revisa nuestros planes de pauta digital.',
  },
  {
    q: '¿En cuánto tiempo ven resultados?',
    a: 'WhatsApp Business optimizado genera confianza inmediata. Los clientes que llegan a tu WhatsApp encontrarán un negocio profesional, con catálogo claro y respuestas automáticas. El impacto en conversión es inmediato.',
  },
];
 
export default function OptimizacionWhatsapp({ lang = 'es' }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />
 
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Business Profesional
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Optimización de{' '}
            <span className="text-green-600 dark:text-green-400">WhatsApp Business</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Convierte tu WhatsApp en una vitrina profesional. Perfil completo, catálogo de productos
            y configuraciones que generan confianza y aumentan tus ventas desde el primer mensaje.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-500" /> Entrega en 24-96 hrs</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Resultado garantizado</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-500" /> Proceso 100% remoto</div>
          </div>
        </div>
      </section>
 
      {/* Planes */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-green-500 shadow-xl shadow-green-500/10 bg-card'
                    : 'border-border bg-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">{plan.priceCOP}</span>
                    <span className="text-sm text-muted-foreground">COP</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{plan.priceUSD} USD</div>
                </div>
 
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
 
                <a
                  href={plan.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2 transition ${
                    plan.highlight
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'border border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                >
                  Contratar ahora <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
 
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Tienes dudas? Escríbenos por{' '}
            <a
              href="https://wa.me/17865787671?text=Hola%2C%20quiero%20información%20sobre%20Optimización%20WhatsApp%20Business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 underline hover:opacity-80"
            >
              WhatsApp
            </a>{' '}
            antes de contratar.
          </p>
        </div>
      </section>
 
      {/* Proceso */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Elige tu plan', desc: 'Selecciona el plan que mejor se adapta a tu negocio.' },
              { step: '02', title: 'Realiza el pago', desc: 'Pago seguro en línea. Recibes confirmación inmediata.' },
              { step: '03', title: 'Nos contactamos', desc: 'En menos de 24h hábiles te escribimos por WhatsApp.' },
              { step: '04', title: 'Entrega lista', desc: 'Tu perfil optimizado y listo para generar ventas.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <Star className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <Footer lang={lang} />
    </div>
  );
}
