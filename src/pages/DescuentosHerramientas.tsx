import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tag, ExternalLink, Star, Zap, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const tools = [
  {
    name: 'Divi',
    category: 'Constructor Web WordPress',
    icon: '🎨',
    description: 'El constructor visual de WordPress más poderoso del mercado. Crea sitios y landing pages profesionales sin código con inteligencia artificial integrada.',
    plans: [
      {
        tab: 'Anual',
        options: [
          { name: 'Divi Pro', price: '$23.08/mes', billed: '$277/año', badge: 'Ahorra 69%', highlight: true, features: ['Divi Theme & Builder ilimitado', 'Divi AI incluida', 'Divi Cloud', 'Divi Dash', 'Divi VIP', 'Divi Teams', 'Soporte prioritario'] },
          { name: 'Divi', price: '$7.42/mes', billed: '$89/año', badge: null, highlight: false, features: ['Divi Theme & Builder ilimitado', 'Divi Dash', 'Soporte 24/7', 'Garantía sin riesgo'] },
        ],
      },
      {
        tab: 'Lifetime',
        options: [
          { name: 'Divi Lifetime + Pro', price: '$297', billed: 'Pago único + $212/año Pro Services', badge: 'Ahorra 72%', highlight: true, features: ['Divi para siempre', 'Divi AI', 'Divi Cloud', 'Divi Dash', 'Divi VIP', 'Divi Teams'] },
          { name: 'Divi Lifetime', price: '$249', billed: 'Un solo pago para siempre', badge: null, highlight: false, features: ['Divi Theme & Builder para siempre', 'Divi Dash', 'Soporte 24/7', 'Garantía sin riesgo'] },
        ],
      },
    ],
    affiliateUrl: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483',
    color: 'from-blue-600 to-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    name: 'Hostgator',
    category: 'Hosting Web Colombia',
    icon: '🚀',
    description: 'Hosting con servidores en Colombia, dominio gratis incluido y planes con IA para crear tu sitio web rápidamente. Perfecto para emprendedores y empresas.',
    plans: [
      {
        tab: 'Planes',
        options: [
          { name: 'Plan Personal', price: '$5.800 COP/mes*', billed: '$207.900 por 3 años', badge: '82% OFF', highlight: false, features: ['1 sitio web', '5 GB NVMe', 'Servidores en Colombia', '25mil visitas/mes', 'Correos ilimitados', 'SSL gratuito', 'WordPress con IA'] },
          { name: 'Plan Emprendedor', price: '$8.000 COP/mes*', billed: '$288.000 por 3 años', badge: '85% OFF', highlight: false, features: ['1 sitio web', '25 GB NVMe', 'Servidores en Colombia', '40mil visitas/mes', 'CDN gratis', 'Plugins de marketing', 'Agente IA para dominio y correos'] },
          { name: 'Plan Negocios', price: '$10.900 COP/mes*', billed: '$391.500 por 3 años', badge: '83% OFF', highlight: true, features: ['+60 sitios web', '50 GB NVMe', 'Servidores en Colombia', '80mil visitas/mes', 'SSL para todos los sitios', 'WooCommerce preinstalado', 'Agente IA para marketing y contenido'] },
          { name: 'Plan Turbo', price: '$17.200 COP/mes*', billed: '$618.300 por 3 años', badge: '80% OFF', highlight: false, features: ['+150 sitios web', '75 GB NVMe', '100mil visitas/mes', '3X más rendimiento', 'Agente IA para estrategias y campañas', 'Soporte prioritario'] },
        ],
      },
    ],
    affiliateUrl: 'https://www.hostgator.la/7531.html',
    affiliateUrl2: 'https://www.hostgator.la/7531-6-3-29.html',
    color: 'from-orange-500 to-orange-700',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    name: 'Brevo',
    category: 'Email Marketing & Automatización',
    icon: '📧',
    description: 'Plataforma de email marketing, SMS y automatización con IA. La alternativa más completa y económica a Mailchimp para hacer crecer tu negocio.',
    plans: [
      {
        tab: 'Planes',
        options: [
          { name: 'Starter', price: '$8.08 USD/mes', billed: 'Antes $9 USD (-10%)', badge: '-10%', highlight: false, features: ['5.000 emails/mes', 'Email y SMS', 'Editor drag & drop', 'Plantillas de email', 'Generador IA de contenido', 'Segmentación avanzada', 'Formularios', 'Informes y analítica'] },
          { name: 'Standard', price: '$16.17 USD/mes', billed: 'Antes $18 USD (-10%)', badge: '-10% · Más popular', highlight: true, features: ['Todo lo de Starter +', 'Marketing automation', 'Pruebas A/B', 'Informes avanzados (mapas de clics, geo)', 'Mejor momento de envío con IA', 'Seguimiento web y eventos', 'Landing pages (1 incluida)', 'Sin logo de Brevo'] },
          { name: 'Professional', price: '$449.08 USD/mes', billed: 'Antes $499 USD (-10%)', badge: '-10%', highlight: false, features: ['Todo lo de Standard +', '150.000 emails/mes', 'WhatsApp, Popups, Mobile & Web Push', '10 usuarios incluidos', 'Scoring de contactos', 'Funciones Pro e-commerce', 'Segmentación con IA', 'Analista de datos con IA', 'Soporte telefónico'] },
        ],
      },
    ],
    affiliateUrl: '#', // TODO: agregar link de afiliado Brevo
    color: 'from-green-600 to-green-800',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
];

export default function DescuentosHerramientas({ lang = 'es' }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6">
            <Tag className="w-4 h-4" />
            Herramientas recomendadas por Ferova Agency
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Las mejores herramientas{' '}
            <span className="text-amber-600 dark:text-amber-400">para tu negocio digital</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            Usamos y recomendamos estas herramientas en todos nuestros proyectos. Al adquirirlas
            a través de nuestros links de afiliado, nos ayudas a seguir creando contenido gratuito
            para ti — sin costo adicional.
          </p>
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda para configurarlas?{' '}
            <Link to="/contacto" className="underline hover:text-foreground transition">Escríbenos</Link>
          </p>
        </div>
      </section>

      {/* Herramientas */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-20">
          {tools.map((tool) => (
            <div key={tool.name} id={tool.name.toLowerCase()}>
              {/* Header herramienta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{tool.name}</h2>
                    <span className={`text-sm font-semibold ${tool.textColor}`}>{tool.category}</span>
                  </div>
                </div>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 ${tool.borderColor} ${tool.textColor} font-semibold text-sm hover:opacity-80 transition`}
                >
                  Ver planes oficiales <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className={`text-base text-muted-foreground mb-8 max-w-2xl p-4 rounded-xl ${tool.bgColor} border ${tool.borderColor}`}>
                {tool.description}
              </p>

              {/* Planes */}
              {tool.plans.map((planGroup) => (
                <div key={planGroup.tab}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {planGroup.options.map((option) => (
                      <div
                        key={option.name}
                        className={`relative rounded-2xl border p-5 flex flex-col bg-card ${
                          option.highlight ? `border-2 ${tool.borderColor} shadow-xl` : 'border-border'
                        }`}
                      >
                        {option.badge && (
                          <div className={`absolute -top-3 left-4 px-3 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tool.color}`}>
                            {option.badge}
                          </div>
                        )}
                        <h3 className="font-bold text-base mb-1">{option.name}</h3>
                        <div className="mb-1">
                          <span className={`text-xl font-bold ${tool.textColor}`}>{option.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">{option.billed}</p>
                        <ul className="space-y-1.5 mb-5 flex-1">
                          {option.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs">
                              <Star className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tool.textColor}`} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={tool.name === 'Hostgator' ? tool.affiliateUrl : tool.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition flex items-center justify-center gap-2 ${
                            option.highlight
                              ? `bg-gradient-to-r ${tool.color} text-white hover:opacity-90`
                              : `border ${tool.borderColor} ${tool.textColor} hover:opacity-80`
                          }`}
                        >
                          Obtener {option.name} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                  {tool.name === 'Hostgator' && (
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      *Precios con descuento por 3 años. Incluye dominio gratis.{' '}
                      <a href={tool.affiliateUrl2 || tool.affiliateUrl} target="_blank" rel="noopener noreferrer" className={`underline ${tool.textColor}`}>
                        Ver todos los planes
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 bg-muted/30 text-center">
        <div className="max-w-2xl mx-auto">
          <Zap className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">¿Necesitas ayuda para elegir o configurar?</h2>
          <p className="text-muted-foreground mb-6">
            Agenda una asesoría con nuestro equipo y te ayudamos a seleccionar las herramientas
            correctas para tu negocio y presupuesto.
          </p>
          <Link
            to="/asesorias"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
          >
            Agendar asesoría <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
