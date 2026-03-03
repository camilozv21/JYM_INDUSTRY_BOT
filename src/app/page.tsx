import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 font-sans text-center">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-3xl shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
          J&M Industry Bot
        </h1>
        <p className="text-xl text-slate-300 font-light mb-10 leading-relaxed">
          Bienvenido a la nueva generación de automatización y gestión inteligente. 
          <br />
          Optimiza tus procesos y toma el control.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link 
            href="/auth/signin" 
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transform"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/auth/signup" 
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm border border-white/10 transition-all duration-300 hover:-translate-y-1 transform"
          >
            Registrarse
          </Link>
          <Link 
            href="/upload" 
            className="px-8 py-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1 transform border border-white/5"
          >
            Subir Archivos
          </Link>
        </div>

        <footer className="text-slate-500 text-sm mt-8 border-t border-white/5 pt-8">
          © {new Date().getFullYear()} J&M Industry, LLC
        </footer>
      </div>
    </main>
  );
}
