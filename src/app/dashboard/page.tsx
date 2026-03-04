"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserAvatar from "@/components/auth/UserAvatar";
import { ArrowLeft, Trash2, Download, FileText, Loader2, AlertCircle, RefreshCw, UploadCloud } from "lucide-react";

interface FileItem {
  name: string;      // The relative name (e.g. "123-doc.pdf")
  fullName: string;  // The full path in bucket (e.g. "users/abc/123-doc.pdf")
  size: number;
  updated: string;
  url: string;       // Signed download URL
}

export default function DashboardPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/files");
      if (!res.ok) throw new Error("Failed to load files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${file.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setDeleting(file.fullName);
    try {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.fullName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }

      // Optimistically update UI
      setFiles((prev) => prev.filter((f) => f.fullName !== file.fullName));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Panel de Archivos</h1>
          </div>
          <div className="flex items-center gap-4">
             <Link 
              href="/upload" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full shadow-lg shadow-neutral-900/20 hover:shadow-xl text-white bg-neutral-900 hover:bg-neutral-800 transition-all transform active:scale-95"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Subir Nuevo</span>
             </Link>
            <UserAvatar />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Mis Archivos ({files.length})</h2>
            <button 
                onClick={fetchFiles} 
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded-full transition-all"
                title="Actualizar lista"
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>

        {/* Error State */}
        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
            </div>
        )}

        {/* Loading State */}
        {loading && files.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>Cargando archivos...</p>
            </div>
        )}

        {/* Empty State */}
        {!loading && files.length === 0 && !error && (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                    <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No hay archivos aún</h3>
                <p className="text-neutral-500 mb-6 max-w-sm mx-auto">Sube documentos para empezar a construir tu base de conocimiento.</p>
                <Link 
                    href="/upload" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-neutral-900 hover:bg-neutral-800 transition-all"
                >
                    Ir a subir archivos
                </Link>
            </div>
        )}

        {/* Files Grid/List */}
        {files.length > 0 && (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nombre</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Tamaño</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Fecha</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                            {files.map((file) => (
                                <tr key={file.fullName} className="hover:bg-neutral-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-neutral-900 max-w-50 sm:max-w-xs truncate" title={file.name}>
                                                    {file.name.split('-').slice(1).join('-') || file.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 hidden sm:table-cell">
                                        {formatSize(file.size)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 hidden md:table-cell">
                                        {formatDate(file.updated)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <a 
                                                href={file.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-neutral-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                                                title="Descargar"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(file)}
                                                disabled={deleting === file.fullName}
                                                className="text-neutral-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
                                                title="Eliminar"
                                            >
                                                {deleting === file.fullName ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
