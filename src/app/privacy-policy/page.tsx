import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | J&M Industry",
  description:
    "Conoce nuestra política de privacidad y cómo protegemos tus datos personales en J&M Industry.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Política de Privacidad | J&M Industry",
    description:
      "Conoce nuestra política de privacidad y cómo protegemos tus datos personales en J&M Industry.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-20">
      <nav className="border-b border-neutral-100 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <span className="text-sm font-semibold text-neutral-800">
            J&amp;M Industry
          </span>
        </div>
      </nav>

      <main className="container mx-auto px-6 max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
          Política de Privacidad
        </h1>

        <div className="prose prose-neutral prose-lg max-w-none">
          <p className="text-neutral-600 mb-8 text-xl leading-relaxed">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              1. Introducción
            </h2>
            <p className="mb-4 text-neutral-600">
              En J&amp;M Industry (&quot;nosotros&quot;, &quot;nuestro&quot; o
              &quot;la Empresa&quot;), respetamos su privacidad y nos
              comprometemos a proteger sus datos personales. Esta Política de
              Privacidad explica cómo recopilamos, utilizamos, divulgamos y
              protegemos su información cuando visita nuestro sitio web o
              utiliza nuestros servicios de automatización e inteligencia
              artificial.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              2. Información que recopilamos
            </h2>
            <p className="mb-4 text-neutral-600">
              Podemos recopilar y procesar los siguientes tipos de información:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-4">
              <li>
                <strong>Información personal:</strong> Nombre, dirección de
                correo electrónico, número de teléfono y otros datos de
                contacto que nos proporcione voluntariamente al solicitar
                información o contratar nuestros servicios.
              </li>
              <li>
                <strong>Datos técnicos:</strong> Dirección IP, tipo de
                navegador, sistema operativo, páginas visitadas y tiempos de
                acceso, recopilados automáticamente a través de cookies y
                tecnologías similares.
              </li>
              <li>
                <strong>Datos de uso:</strong> Información sobre cómo utiliza
                nuestro sitio web y servicios para ayudarnos a mejorar la
                experiencia del usuario.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              3. Uso de la información
            </h2>
            <p className="mb-4 text-neutral-600">
              Utilizamos la información recopilada para los siguientes fines:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-4">
              <li>
                Proveer, operar y mantener nuestros servicios de automatización
                e IA.
              </li>
              <li>
                Mejorar, personalizar y expandir nuestro sitio web y servicios.
              </li>
              <li>Comprender y analizar cómo utiliza nuestros servicios.</li>
              <li>
                Desarrollar nuevos productos, servicios, características y
                funcionalidades.
              </li>
              <li>
                Comunicarnos con usted, ya sea directamente o a través de uno
                de nuestros socios, para servicio al cliente, actualizaciones y
                fines promocionales.
              </li>
              <li>Detectar y prevenir fraudes.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              4. Compartir información y Procesadores Terceros
            </h2>
            <p className="mb-4 text-neutral-600">
              J&amp;M Industry colabora con proveedores de servicios de
              confianza para operar, mejorar y asegurar nuestros servicios. Al
              utilizar nuestras soluciones, usted reconoce y acepta el uso de
              los siguientes terceros:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-4">
              <li>
                <strong>Procesamiento de Pagos (Stripe):</strong> Utilizamos{" "}
                <strong>Stripe</strong> para procesar transacciones financieras
                de manera segura. J&amp;M Industry no almacena ni tiene acceso
                a los datos completos de su tarjeta de crédito o cuenta
                bancaria. Toda la información financiera es gestionada
                directamente por Stripe bajo sus propios estándares de
                seguridad y política de privacidad.
              </li>
              <li>
                <strong>Servicios de IA (Terceros):</strong> Nuestros agentes
                virtuales y sistemas de automatización utilizan modelos de
                Inteligencia Artificial de proveedores líderes (como OpenAI,
                Anthropic, ElevenLabs, entre otros) para el procesamiento de
                lenguaje natural y generación de contenido.
              </li>
              <li>
                <strong>Seguridad de sus Datos:</strong> Aunque estos modelos
                son tercerizados, J&amp;M Industry implementa capas de
                seguridad y anonimización de datos donde es posible. Sus datos
                son procesados por estos proveedores únicamente con el fin de
                generar las respuestas y acciones requeridas por el servicio.
                Estos proveedores están obligados a cumplir con regulaciones de
                protección de datos, asegurando que su información está a
                salvo.
              </li>
            </ul>
            <p className="mb-4 text-neutral-600">
              No vendemos, comercializamos ni alquilamos su información personal
              a terceros para fines comerciales o de marketing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              5. Seguridad de los datos
            </h2>
            <p className="mb-4 text-neutral-600">
              Implementamos medidas de seguridad adecuadas para proteger contra
              el acceso no autorizado, la alteración, la divulgación o la
              destrucción de su información personal.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              6. Sus derechos
            </h2>
            <p className="mb-4 text-neutral-600">
              Dependiendo de su ubicación, puede tener derechos relacionados
              con sus datos personales, incluyendo el derecho a acceder,
              corregir, eliminar o restringir el uso de sus datos. Para ejercer
              estos derechos, contáctenos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              7. Contacto
            </h2>
            <p className="mb-4 text-neutral-600">
              Si tiene preguntas sobre esta Política de Privacidad, por favor
              contáctenos a través de nuestro sitio web o envíenos un correo
              electrónico.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-100 py-12 bg-neutral-50">
        <div className="container mx-auto px-6 text-center text-neutral-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} J&amp;M Industry. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
