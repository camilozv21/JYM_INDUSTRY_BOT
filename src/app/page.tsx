"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Brain, 
  Menu, 
  X, 
  ChevronRight, 
  BarChart,
  Cpu,
  Zap,
  CheckCircle,
  FileText,
  UploadCloud,
  Database,
  ArrowRight
} from "lucide-react";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, easeOut: true } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/">
            <img 
              src="https://df50lbm4qcrt6.cloudfront.net/JYM_INDUSTRY/jym_website_logo-removebg.png" 
              alt="J&M Industry Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <Link href="/auth/signin" className="hover:text-neutral-500 transition-colors">Iniciar Sesión</Link>
            <Link href="/auth/signup" className="px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors">
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-2xl font-medium">
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
              <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>Registrarse</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 border border-neutral-200 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>RAG Knowledge Base</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              Alimenta la <br /> Inteligencia de <br /> Tu Bot.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
              Sube documentación y datos a la base de conocimiento de J&M Industry. 
              Optimiza las respuestas de tu asistente con información precisa y actualizada.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-4 pt-4">
              <Link href="/upload" className="group inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white rounded-full font-medium transition-transform hover:scale-105">
                Subir Archivos
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/signin" className="inline-flex items-center justify-center px-8 py-4 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-colors">
                Ingresar al Panel
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Abstract Decorative Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 -z-10 opacity-5 pointer-events-none select-none">
           <svg width="800" height="800" viewBox="0 0 100 100" className="w-[200] h-[200]">
             <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
             <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
             <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
           </svg>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-neutral-900 text-white px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:flex justify-between items-start gap-12"
          >
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                No solo almacenamos datos. <br />
                <span className="text-neutral-400">Creamos contexto inteligente.</span>
              </h2>
            </div>
            <div className="md:w-1/2 space-y-6 text-lg text-neutral-300">
              <p>
                El panel de administración de J&M Industry te permite gestionar la memoria de tu bot.
                Sube manuales, políticas y guías para que tu asistente responda con autoridad.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Indexación vectorial automática</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Soporte para múltiples formatos (PDF, TXT, MD)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Consultas contextuales precisas</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="py-24 bg-neutral-50 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Capacidades del Sistema</h2>
            <p className="text-neutral-600 max-w-xl text-lg">Tecnología RAG (Retrieval-Augmented Generation) al servicio de tu negocio.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<UploadCloud className="w-8 h-8" />}
              title="Carga Masiva"
              description="Sube grandes volúmenes de documentación técnica, legal o comercial. El sistema procesa y segmenta la información automáticamente."
            />
            <ServiceCard 
              icon={<Database className="w-8 h-8" />}
              title="Vector Store Seguro"
              description="Tus datos se convierten en embeddings vectoriales de alta dimensión, permitiendo búsquedas semánticas instantáneas."
            />
            <ServiceCard 
              icon={<Brain className="w-8 h-8" />}
              title="Aprendizaje Continuo"
              description="Actualiza la base de conocimiento en tiempo real. Tu bot aprende tan rápido como tú subes nueva información."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Flujo de Trabajo</h2>
            <p className="text-neutral-600 text-lg">
              De documento estático a respuesta inteligente en segundos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep 
              number="01" 
              title="Subida" 
              description="Carga tus archivos PDF, Word o Texto plano a través de nuestro panel seguro."
              icon={<FileText className="w-6 h-6" />}
            />
            <ProcessStep 
              number="02" 
              title="Procesamiento" 
              description="El sistema extrae, limpia y fragmenta el texto en chunks manejables."
              icon={<Cpu className="w-6 h-6" />}
            />
            <ProcessStep 
              number="03" 
              title="Embeddings" 
              description="Generación de vectores semánticos para entender el significado, no solo palabras clave."
              icon={<Zap className="w-6 h-6" />}
            />
            <ProcessStep 
              number="04" 
              title="Consulta" 
              description="El bot recupera la información exacta para responder al usuario final."
              icon={<Bot className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Success Story / Use Case Section */}
      <section className="py-24 px-6 md:px-12 bg-neutral-900 text-white overflow-hidden relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-green-400 font-semibold tracking-wide uppercase text-sm mb-4 block">Potenciado por J&M Bot</span>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Tu Conocimiento,<br/>Disponible 24/7</h2>
                  <p className="text-neutral-400 text-xl leading-relaxed mb-8">
                    Centraliza la información dispersa de tu empresa en una única fuente de verdad accesible para tu IA.
                  </p>
                  
                  <div className="bg-neutral-800/50 p-6 rounded-2xl border border-neutral-700 inline-block">
                    <div className="text-5xl font-bold text-white mb-2">99%</div>
                    <div className="text-neutral-400">Precisión en recuperación de datos</div>
                  </div>
               </motion.div>
            </div>
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-video bg-neutral-800 rounded-2xl border border-neutral-700 p-8 flex flex-col justify-center items-center shadow-2xl">
                  <div className="w-full space-y-4">
                    {/* Mock chat bubbles */}
                    <div className="bg-neutral-700/50 p-4 rounded-2xl rounded-tl-none self-start w-3/4">
                      <p className="text-sm text-neutral-300">¿Cuál es la política de devoluciones publicada ayer?</p>
                    </div>
                    <div className="bg-green-600/20 p-4 rounded-2xl rounded-tr-none self-end w-3/4 ml-auto border border-green-500/30">
                      <p className="text-sm text-green-100">Según el documento "Politicas_2025.pdf", las devoluciones se aceptan hasta 30 días después de la compra...</p>
                    </div>
                  </div>
                  <p className="mt-8 text-sm text-neutral-500 font-mono">Respuesta generada vía RAG</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-neutral-100 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold tracking-tighter">
            J&M Industry Bot Panel
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} J&M Industry. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="p-8 border border-neutral-200 rounded-2xl hover:border-neutral-400 transition-colors bg-white group h-full flex flex-col"
    >
      <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center mb-6 text-neutral-900 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed text-sm md:text-base grow">{description}</p>
      
      <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center text-sm font-medium text-neutral-900">
        <span className="group-hover:mr-2 transition-all">Empezar</span>
        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

function ProcessStep({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-6 pt-12 border-t border-neutral-200"
    >
      <div className="absolute top-0 left-0 -translate-y-1/2 bg-white pr-4">
         <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
            {number}
         </div>
      </div>
      <div className="mb-4 text-neutral-900">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}


