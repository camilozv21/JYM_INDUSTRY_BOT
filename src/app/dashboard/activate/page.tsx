"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UserAvatar from "@/components/auth/UserAvatar";
import { ArrowLeft, KeyRound, Loader2, CheckCircle, UploadCloud, LogOut, ShieldCheck } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ActivatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.accountStatus === "active") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error activating account");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/upload"); // Redirect to upload/dashboard after success
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
       {/* Background Effects */}
       <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 relative z-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-neutral-900" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Activar Cuenta</h1>
            <p className="text-neutral-500">
                Para acceder a la plataforma, ingresa la API Key que te enviamos por correo.
            </p>
        </div>

        {success ? (
          <div className="text-center py-8 animate-in fade-in zoom-in">
             <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
             </div>
             <h2 className="text-xl font-semibold text-green-700 mb-2">¡Cuenta Activada!</h2>
             <p className="text-neutral-500">Redirigiendo al panel...</p>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-neutral-700 mb-1">
                API Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  id="apiKey"
                  type="text"
                  required
                  placeholder="sk_live_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                 {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-neutral-900/10 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Verificando...
                </>
              ) : (
                "Activar Acceso"
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-400 mb-4">¿No tienes una API Key? Contacta a soporte.</p>
            <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-2 mx-auto transition-colors"
            >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
        </div>
      </div>
    </main>
  );
}
