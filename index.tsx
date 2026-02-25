import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Simple Icon Components
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.13 1.25 4.74 1.25 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.05 20.21c-1.5 0-2.97-.4-4.26-1.16l-.3-.18-3.11.82.83-3.03-.19-.31c-.82-1.32-1.26-2.87-1.26-4.43 0-4.61 3.75-8.36 8.36-8.36 2.23 0 4.33.87 5.91 2.45 1.58 1.58 2.45 3.68 2.45 5.91 0 4.61-3.74 8.36-8.35 8.36zm4.59-6.26c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.13-.56.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.48-.07 1.5-.61 1.71-1.21.21-.6.21-1.11.15-1.21-.06-.1-.23-.17-.48-.3z" />
  </svg>
);

// Animation Component
const Reveal = ({ children, delay = 0, className = "" }: { children?: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before fully in view
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Tooltip = ({ text, children }: { text: string; children?: React.ReactNode }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-[60] mb-2 -translate-x-1/2 w-72 rounded-lg bg-slate-900 px-4 py-3 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-xl border border-slate-700 leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -mt-[1px] -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
};

const ContactButton = ({ href, children, className }: { href: string; children?: React.ReactNode; className: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2500);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className={`${className} relative overflow-hidden inline-block min-w-[200px] text-center group active:scale-95 transition-all duration-200`}
    >
      <div className={`transition-all duration-500 transform ease-in-out ${clicked ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        {children}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ease-in-out ${clicked ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <span className="flex items-center gap-2 font-bold">
            <CheckIcon className="w-5 h-5" />
            Abriendo...
        </span>
      </div>
    </a>
  );
};

const ProductCard = ({ 
  title, 
  category,
  problem, 
  solution, 
  metrics, 
  stack, 
  ctaLink, 
  ctaText, 
  colorClass 
}: {
  title: string;
  category: string;
  problem: string;
  solution: string;
  metrics: { label: string; tooltip: string }[];
  stack: string[];
  ctaLink: string;
  ctaText: string;
  colorClass: string;
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full z-0 hover:z-10 relative">
    <div className={`h-2 w-full rounded-t-2xl ${colorClass}`}></div>
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2 bg-opacity-10 ${colorClass.replace('bg-', 'text-').replace('bg-', 'bg-')}`}>
            {category}
          </span>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">El Problema</h4>
        <p className="text-slate-700 leading-relaxed">{problem}</p>
      </div>

      <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <CheckIcon className="w-4 h-4 text-green-500" /> La Solución
        </h4>
        <p className="text-slate-700">{solution}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Impacto & Key Features</h4>
        <ul className="space-y-3">
          {metrics.map((m, i) => (
            <li key={i} className="flex items-start text-sm text-slate-600">
              <span className="mr-2 text-blue-500 mt-1">•</span>
              <Tooltip text={m.tooltip}>
                <span className="border-b border-dotted border-slate-400 cursor-help hover:text-slate-900 hover:border-slate-800 transition-colors inline-flex items-center gap-1.5 group/label">
                  {m.label}
                  <svg className="w-4 h-4 text-slate-400 group-hover/label:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-6">
          {stack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={ctaLink} 
          target={ctaLink.startsWith('http') ? '_blank' : '_self'}
          rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`group flex items-center justify-center w-full py-3 px-6 rounded-lg text-white font-semibold transition-all ${colorClass} hover:opacity-90`}
        >
          {ctaText}
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors h-full">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ 
  title, 
  price, 
  period,
  description, 
  features, 
  recommended = false, 
  buttonText = "Seleccionar Plan" 
}: { 
  title: string, 
  price: string, 
  period?: string, 
  description: string, 
  features: string[], 
  recommended?: boolean, 
  buttonText?: string 
}) => (
  <div className={`relative p-8 bg-white rounded-2xl border flex flex-col h-full ${recommended ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-lg'}`}>
     {recommended && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">Más Popular</span>
        </div>
     )}
     <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
     </div>
     <div className="mb-6">
        <span className="text-4xl font-extrabold text-slate-900">{price}</span>
        {period && <span className="text-slate-500 font-medium text-sm ml-1">{period}</span>}
     </div>
     
     <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
            <li key={i} className="flex items-start">
                <CheckIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${recommended ? 'text-blue-600' : 'text-green-500'}`} />
                <span className="text-slate-600 text-sm">{feature}</span>
            </li>
        ))}
     </ul>
     <button className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${recommended ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'}`}>
        {buttonText}
     </button>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{question}</span>
        <span className={`ml-6 flex-shrink-0 text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="https://i.ibb.co/dJcLzy62/Captura-de-pantalla-2026-01-20-170241.png" 
                alt="DevSolutions Logo" 
                className="h-20 w-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" 
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#proyectos" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Proyectos</a>
              <a href="#servicios" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Servicios</a>
              <a href="#precios" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Precios</a>
              <a href="#contacto" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Contacto</a>
            </div>
            <div className="hidden md:flex">
              <a href="#proyectos" className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
                Ver Portfolio
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto text-center">
        <Reveal>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-6 border border-blue-100">
            SaaS & Micro-SaaS Builder
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Creo Soluciones Digitales que <br className="hidden md:block"/>
            <span className="gradient-text">Multiplican tu Rentabilidad.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Dejo atrás la complejidad técnica para entregarte <strong>resultados de negocio</strong>. Especialista en transformar operaciones manuales de Colegios, Talleres y PyMEs en activos digitales automatizados y escalables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#proyectos" className="px-8 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              Explorar mis Productos
            </a>
            <a href="#servicios" className="px-8 py-4 rounded-lg bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-colors">
              Cómo puedo ayudarte
            </a>
          </div>
        </Reveal>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mis Productos</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Web Apps diseñadas para resolver problemas reales de negocio, no solo para escribir código.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1: AdminPro */}
            <Reveal delay={0} className="h-full">
              <ProductCard
                title="AdminPro"
                category="EdTech / Fintech"
                colorClass="bg-indigo-600"
                problem="Los colegios pierden hasta un 20% de ingresos por gestión manual de pagos y falta de transparencia financiera."
                solution="Un gestor administrativo integral con Oficina Virtual para padres. Automatiza la conciliación de pagos digitales y ofrece reportes financieros en tiempo real."
                metrics={[
                  { label: "Control de pagos y morosidad", tooltip: "Sistema automatizado que rastrea fechas de vencimiento, calcula recargos y notifica a los padres sobre pagos pendientes." },
                  { label: "Oficina Virtual para Padres 24/7", tooltip: "Portal web seguro donde los representantes pueden consultar estados de cuenta, descargar facturas y ver el rendimiento académico." },
                  { label: "Caja y Facturación sincronizada", tooltip: "Integración total entre la recepción de pagos físicos/digitales y el sistema contable, eliminando el doble ingreso de datos." }
                ]}
                stack={["React", "Node.js", "Stripe API", "Cloud SQL"]}
                ctaLink="https://sistema-de-gesti-n-escolar-v1.vercel.app/?demo=true"
                ctaText="Ver Demo Interactiva"
              />
            </Reveal>

            {/* Project 2: Ojecars */}
            <Reveal delay={150} className="h-full">
              <ProductCard
                title="Ojecars"
                category="Automotive SaaS"
                colorClass="bg-orange-600"
                problem="Los talleres mecánicos sufren fugas de dinero en inventario y pierden la confianza del cliente por falta de informes claros."
                solution="Gestión 360° para talleres: desde la recepción del vehículo con historial clínico, hasta el control de inventario, nómina de mecánicos y gestión de abonos."
                metrics={[
                  { label: "Historial Técnico Digital", tooltip: "Base de datos centralizada de cada vehículo atendido, facilitando diagnósticos basados en reparaciones previas." },
                  { label: "Control de Inventario y Compras", tooltip: "Gestión en tiempo real de repuestos, con alertas de stock mínimo y sugerencias inteligentes de reabastecimiento." },
                  { label: "Gestión de Nómina y Comisiones", tooltip: "Cálculo automático de pagos a mecánicos basado en mano de obra realizada y comisiones por venta de repuestos." }
                ]}
                stack={["Vue.js", "Firebase", "PWA Support"]}
                ctaLink="https://gonzacars-sistem.vercel.app/?demo=true"
                ctaText="Comprar Licencia / Plantilla"
              />
            </Reveal>

            {/* Project 3: SitemVentas */}
            <Reveal delay={300} className="h-full">
              <ProductCard
                title="SitemVentas"
                category="Retail ERP"
                colorClass="bg-emerald-600"
                problem="Los ERPs tradicionales son demasiado costosos y rígidos para PyMEs, dificultando el control de garantías y ventas."
                solution="Un gestor administrativo ligero y modular. Controla inventarios, ventas, compras y garantías en una interfaz adaptable a cualquier nicho de retail."
                metrics={[
                  { label: "Gestión de Garantías y RMA", tooltip: "Módulo especializado para el seguimiento de devoluciones, reparaciones y cambios de productos bajo garantía." },
                  { label: "Reportes de Ventas Predictivos", tooltip: "Análisis de datos históricos para proyectar ventas futuras y optimizar la planificación de inventario." },
                  { label: "Adaptable a cualquier divisa", tooltip: "Soporte multi-moneda que permite operar con tasas de cambio actualizadas para facturación y reportes." }
                ]}
                stack={["Next.js", "PostgreSQL", "Tailwind"]}
                ctaLink="#"
                ctaText="Consultar Adaptación"
              />
            </Reveal>
            
            {/* Project 4: EduControl - NEW */}
            <Reveal delay={450} className="h-full">
              <ProductCard
                title="EduControl"
                category="EdTech / Academic"
                colorClass="bg-purple-600"
                problem="El cierre de lapsos académicos suele ser caótico: profesores calculando promedios manualmente y administrativos imprimiendo boletines uno por uno."
                solution="Plataforma integral de control de notas. Centraliza las calificaciones, calcula promedios automáticamente y genera boletines por grados y secciones al instante."
                metrics={[
                  { label: "Generación Masiva de Boletines", tooltip: "Motor de generación de PDFs que crea cientos de boletines académicos con un solo clic, listos para imprimir o enviar." },
                  { label: "Organización por Grado y Sección", tooltip: "Estructura jerárquica flexible que se adapta al organigrama de la institución (Preescolar, Primaria, Secundaria)." },
                  { label: "Historial Académico del Alumno", tooltip: "Registro permanente de calificaciones acumuladas año tras año para un seguimiento educativo a largo plazo." }
                ]}
                stack={["React", "Node.js", "PDFKit", "PostgreSQL"]}
                ctaLink="https://educontrol-pro-m159.vercel.app/?demo=true"
                ctaText="Ver Funcionalidades"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services / Monetization Section */}
      <section id="servicios" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Más allá del código:<br/>
                  <span className="text-blue-600">Socios en Crecimiento</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  No busco simplemente "freelancear". Busco aportar valor a través de productos probados y experiencia técnica. Ya sea que necesites una solución lista para usar o un desarrollo a medida, mi enfoque es siempre el ROI.
                </p>
                <a href="#contacto" className="text-blue-600 font-bold hover:text-blue-800 flex items-center">
                  Hablemos de tu proyecto <ArrowRightIcon className="w-5 h-5 ml-2"/>
                </a>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Reveal delay={100}>
                <ServiceCard 
                  icon={CodeIcon}
                  title="Venta de Código Fuente"
                  description="Adquiere la licencia de AdminPro, Ojecars o SitemVentas. Ahorra meses de desarrollo y lanza tu propio SaaS bajo tu marca (White Label)."
                />
              </Reveal>
              <Reveal delay={200}>
                <ServiceCard 
                  icon={ChartIcon}
                  title="Desarrollo SaaS a Medida"
                  description="Transformo tu idea de negocio en una aplicación web escalable, enfocada en la experiencia de usuario y la conversión."
                />
              </Reveal>
              <Reveal delay={300}>
                <ServiceCard 
                  icon={UsersIcon}
                  title="Consultoría de Digitalización"
                  description="Auditoría de procesos para colegios y PyMEs. Implementación de herramientas para automatizar cobros e inventarios."
                />
              </Reveal>
              <Reveal delay={400}>
                <div className="p-6 bg-blue-600 rounded-xl flex flex-col justify-center items-center text-center text-white h-full">
                  <h3 className="text-xl font-bold mb-2">¿Listo para empezar?</h3>
                  <p className="text-blue-100 text-sm mb-4">Lleva tu negocio al siguiente nivel.</p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                    Contactar Ahora
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Planes Flexibles</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Elige cómo quieres trabajar: utiliza el software como servicio (SaaS) o adquiere el código fuente para tener el control total.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-4">
            {/* Plan Básico */}
            <Reveal delay={0} className="h-full">
              <PricingCard 
                title="Básico (SaaS)"
                price="$49"
                period="/ mes"
                description="Para colegios, talleres o negocios que quieren usar el software de inmediato en la nube."
                buttonText="Solicitar Acceso"
                features={[
                  "Acceso a 1 instancia del software",
                  "Hosting y mantenimiento incluido",
                  "Soporte técnico por email",
                  "Actualizaciones automáticas",
                  "Backups diarios",
                  "Hasta 5 usuarios administrativos"
                ]}
              />
            </Reveal>

            {/* Plan Profesional - Best Value */}
            <Reveal delay={150} className="h-full">
              <PricingCard 
                title="Profesional (Source)"
                price="$499"
                period="pago único"
                description="Para desarrolladores y emprendedores. Obtén el código fuente y despliégalo donde quieras."
                recommended={true}
                buttonText="Comprar Licencia"
                features={[
                  "Código Fuente Completo (React/Node)",
                  "Documentación técnica de despliegue",
                  "Derechos de uso comercial ilimitado",
                  "Licencia 'White Label' (Tu marca)",
                  "Sin costos mensuales recurrentes",
                  "Acceso a repositorio de Git privado"
                ]}
              />
            </Reveal>

            {/* Plan Empresarial */}
            <Reveal delay={300} className="h-full">
              <PricingCard 
                title="Empresarial"
                price="A Medida"
                description="Para instituciones grandes que requieren adaptaciones específicas y soporte dedicado."
                buttonText="Contactar Ventas"
                features={[
                  "Todo lo del plan Profesional",
                  "Personalización de módulos a medida",
                  "Instalación On-Premise (Tu servidor)",
                  "Migración de datos históricos",
                  "Soporte prioritario 24/7 (SLA)",
                  "Capacitación al personal"
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
              <p className="text-lg text-slate-600">
                Resolvemos tus dudas sobre licencias, tecnología y modelos de trabajo.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-4">
              <AccordionItem 
                question="¿Cuál es la diferencia real entre el Plan SaaS y el Plan Source Code?" 
                answer="El Plan SaaS es un servicio de 'alquiler': nosotros alojamos la aplicación, mantenemos los servidores y tú pagas una mensualidad por usarla. El Plan Source Code es una 'compra': recibes el código fuente completo para alojarlo en tus propios servidores, modificarlo como desees y no pagar mensualidades recurrentes a nosotros."
              />
              <AccordionItem 
                question="¿Puedo personalizar el software si compro el código fuente?" 
                answer="Sí, absolutamente. Al adquirir el plan 'Profesional (Source)', recibes acceso al repositorio completo (Frontend + Backend). Tienes libertad total para modificar diseño, lógica de negocio e integraciones. Si no tienes equipo técnico, también ofrecemos servicios de personalización bajo el plan Empresarial."
              />
              <AccordionItem 
                question="¿Puedo revender el software a mis propios clientes?" 
                answer="Sí. La licencia del código fuente incluye derechos 'White Label' (Marca Blanca). Esto significa que puedes poner tu propio logotipo, marca y colores, y vender el acceso al software a tus clientes finales (colegios, talleres, negocios) cobrándoles lo que tú decidas. Lo único que NO permitimos es revender el código fuente crudo a otros desarrolladores."
              />
              <AccordionItem 
                question="¿Qué tipo de soporte técnico incluye cada plan?" 
                answer="El plan SaaS incluye soporte técnico continuo y actualizaciones automáticas mientras tu suscripción esté activa. El plan Source Code incluye 3 meses de soporte técnico dedicado para ayudarte con la instalación inicial, despliegue y corrección de posibles errores. Después de ese periodo, puedes contratar paquetes de soporte por horas."
              />
              <AccordionItem 
                question="¿Qué necesito para instalar la versión Source Code?" 
                answer="Nuestras aplicaciones utilizan tecnologías estándar y modernas: Node.js para el backend, React/Next.js para el frontend y bases de datos SQL (PostgreSQL/MySQL). Entregamos una documentación detallada de despliegue. Si prefieres, podemos realizar la instalación en tu servidor (VPS, AWS, DigitalOcean) por un costo único adicional."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer / Contact CTA */}
      <footer id="contacto" className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-6">Trabajemos Juntos</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Si estás interesado en adquirir alguno de mis productos o necesitas una solución a medida, envíame un mensaje. Respondo en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
              <ContactButton href="mailto:analistadedatosnova@gmail.com" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition-colors">
                Enviar Email
              </ContactButton>
              <ContactButton href="https://wa.me/584144415403" className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold transition-colors">
                <span className="flex items-center justify-center gap-2">
                  <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                </span>
              </ContactButton>
              <ContactButton href="#" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-8 py-3 rounded-lg font-bold transition-colors">
                LinkedIn / Twitter
              </ContactButton>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-800 text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} DevSolutions. Todos los derechos reservados.
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);