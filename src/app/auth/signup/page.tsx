import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Registrarse",
  description: "Crea una cuenta en J&M Industry Bot y empieza a optimizar tu industria.",
  alternates: {
    canonical: "/auth/signup",
  },
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:px-8 bg-white text-neutral-900">
      
      {/* Background Subtle Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]`"></div>
      </div>

      <div className="w-full max-w-md transform rounded-3xl bg-white p-10 border border-neutral-200 shadow-xl shadow-neutral-100 ring-1 ring-neutral-200/50 transition-all hover:shadow-2xl animate-in fade-in zoom-in duration-500 delay-100 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            Crear cuenta
          </h2>
          <p className="text-neutral-500 text-sm">
            Empieza a optimizar tu industria hoy
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <GoogleAuthButton isSignUp />
          
          <div className="border-t border-neutral-200 pt-6 text-center">
            <p className="text-sm text-neutral-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/signin" className="font-semibold text-neutral-900 hover:text-neutral-600 transition-colors underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">
                Inicia sesión
              </Link>
            </p>
            <div className="mt-6">
              <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 group">
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

