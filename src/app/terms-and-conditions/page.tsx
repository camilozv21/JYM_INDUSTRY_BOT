import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | J&M Industry",
  description:
    "Lee nuestros términos y condiciones para el uso de nuestros servicios de automatización e IA.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Términos y Condiciones | J&M Industry",
    description:
      "Lee nuestros términos y condiciones para el uso de nuestros servicios de automatización e IA.",
  },
};

export default function TermsAndConditions() {
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
          Términos y Condiciones
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
              1. Aceptación de los Términos
            </h2>
            <p className="mb-4 text-neutral-600">
              Al acceder y utilizar el sitio web y los servicios de J&amp;M
              Industry (&quot;la Empresa&quot;), usted acepta estar sujeto a
              estos Términos y Condiciones y a todas las leyes y regulaciones
              aplicables. Si no está de acuerdo con alguno de estos términos,
              tiene prohibido usar o acceder a este sitio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              2. Servicios de Automatización e IA
            </h2>
            <p className="mb-4 text-neutral-600">
              J&amp;M Industry proporciona sistemas conversacionales avanzados,
              automatización de procesos y agentes virtuales inteligentes. Al
              contratarnos, usted acepta que:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-4">
              <li>
                <strong>Tecnología Tercerizada:</strong> Utilizamos proveedores
                de Inteligencia Artificial de terceros (modelos propietarios
                como GPT-4, Claude, ElevenLabs, entre otros) para generar
                respuestas y contenido. Si bien estos proveedores cumplen con
                altos estándares de seguridad, sus datos (texto, voz) son
                procesados por ellos para el funcionamiento del servicio.
              </li>
              <li>
                <strong>Precisión:</strong> Aunque nuestros agentes son
                entrenados con su información específica, la IA puede, en
                ocasiones, producir respuestas imprecisas o generalizadas.
                J&amp;M Industry monitorea constantemente la calidad, pero la
                tecnología no es infalible.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              3. Pagos y Cancelaciones
            </h2>
            <p className="mb-4 text-neutral-600">
              Todos los cobros y suscripciones se gestionan de manera segura a
              través de <strong>Stripe</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-4">
              <li>
                Usted acepta que al contratar un servicio recurrente, se le
                cobrará automáticamente según la frecuencia pactada.
              </li>
              <li>
                J&amp;M Industry no almacena sus datos financieros completos;
                estos son manejados exclusivamente por Stripe.
              </li>
              <li>
                Para cancelaciones, debe contactarnos con al menos 3 días de
                antelación a su próxima fecha de facturación.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              4. Propiedad Intelectual
            </h2>
            <p className="mb-4 text-neutral-600">
              El contenido, las características y la funcionalidad de nuestro
              sitio web y servicios (incluidos, entre otros, toda la
              información, software, texto, pantallas, imágenes, video y audio)
              son propiedad de J&amp;M Industry y están protegidos por derechos
              de autor, marcas comerciales y otras leyes de propiedad
              intelectual.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              5. Limitación de Responsabilidad
            </h2>
            <p className="mb-4 text-neutral-600">
              En ningún caso J&amp;M Industry, ni sus directores, empleados,
              socios, agentes, proveedores o afiliados, serán responsables de
              daños indirectos, incidentales, especiales, consecuentes o
              punitivos, incluidos, entre otros, la pérdida de beneficios,
              datos, uso, buena voluntad u otras pérdidas intangibles,
              resultantes de su acceso o uso o la imposibilidad de acceder o
              usar el servicio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              6. Modificaciones
            </h2>
            <p className="mb-4 text-neutral-600">
              Nos reservamos el derecho, a nuestra entera discreción, de
              modificar o reemplazar estos Términos en cualquier momento. Es su
              responsabilidad revisar estos Términos periódicamente. El uso
              continuado de nuestros servicios después de cualquier cambio
              constituye la aceptación de los nuevos Términos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              7. Ley Aplicable
            </h2>
            <p className="mb-4 text-neutral-600">
              Estos Términos se regirán e interpretarán de acuerdo con las
              leyes vigentes en la jurisdicción donde opera J&amp;M Industry,
              sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
              8. Contacto
            </h2>
            <p className="mb-4 text-neutral-600">
              Si tiene alguna pregunta sobre estos Términos, por favor
              contáctenos a través de los canales proporcionados en nuestro
              sitio web.
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
