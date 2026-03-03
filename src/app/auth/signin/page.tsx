import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Accede a tu cuenta de J&M Industry Bot para gestionar tus procesos.",
  alternates: {
    canonical: "/auth/signin",
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:px-8">
      <div className="w-full max-w-md transform rounded-3xl bg-slate-900/50 p-10 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all hover:shadow-blue-500/10 animate-in fade-in zoom-in duration-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Bienvenido de nuevo
          </h2>
          <p className="text-slate-400 text-sm">
            Ingresa a tu cuenta para gestionar tus procesos
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <GoogleAuthButton />
          
          <div className="border-t border-slate-700/50 pt-6 text-center">
            <p className="text-sm text-slate-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/auth/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Regístrate ahora
              </Link>
            </p>
            <div className="mt-6">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1 group">
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

