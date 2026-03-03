"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";

interface UploadedFile {
  fileName: string;
  originalName: string;
  signedUrl: string;
  publicUrl: string;
}

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // Avoid duplicates
      setSelectedFiles((prev) => {
        const uniqueNewFiles = newFiles.filter(nf => 
          !prev.some(pf => pf.name === nf.name && pf.size === nf.size)
        );
        return [...prev, ...uniqueNewFiles];
      });
      setUploadStatus("idle");
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir archivos");
      }

      setUploadedFiles(data.files || []);
      setUploadStatus("success");
      setSelectedFiles([]);
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 p-6 font-sans">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Subir Archivos
            </h1>
            <p className="text-slate-400 text-sm">
            Sube tus documentos, imágenes o videos al bucket seguro de Industry Bot.
            </p>
        </div>

        {/* Dropzone Area */}
        <div 
          className="relative group border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer bg-black/20 hover:border-blue-500 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <div className="text-5xl mb-4 transform transition-transform group-hover:scale-110 duration-300">☁️</div>
          <p className="text-lg font-medium text-slate-200 mb-1 group-hover:text-white transition-colors">
            Haz clic o arrastra archivos aquí
          </p>
          <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
            Soporta múltiples archivos simultáneos
          </p>
        </div>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <ul className="mt-6 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="text-sm font-medium text-slate-200 truncate">{file.name}</div>
                  <div className="text-xs text-slate-500">{formatFileSize(file.size)}</div>
                </div>
                {!isUploading && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(index); }} 
                    className="p-1.5 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    aria-label="Eliminar archivo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-8">
            <Link 
            href="/"
            className="px-6 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white transition-colors hover:bg-white/5"
            >
            Volver
            </Link>
          {(selectedFiles.length > 0) && (
            <>
              <button 
                onClick={clearAll} 
                className="px-6 py-2.5 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                Limpiar
              </button>
              <button 
                onClick={handleUpload} 
                className="px-6 py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </>
                ) : (
                  `Subir ${selectedFiles.length} archivo${selectedFiles.length > 1 ? 's' : ''}`
                )}
              </button>
            </>
          )}
          {selectedFiles.length === 0 && uploadStatus === 'success' && (
             <button 
             onClick={() => setUploadStatus("idle")} 
             className="px-6 py-2.5 rounded-xl font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition-all"
           >
             Subir más archivos
           </button>
          )}
        </div>

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mt-6 p-4 rounded-xl text-center text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20 animate-in fade-in slide-in-from-top-2">
            ¡Archivos subidos correctamente!
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-6 p-4 rounded-xl text-center text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 animate-in fade-in slide-in-from-top-2">
            Error: {errorMessage}
          </div>
        )}

        {/* Results List */}
        {uploadedFiles.length > 0 && uploadStatus === "success" && (
          <div className="mt-10 pt-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">Archivos disponibles</h3>
            <div className="grid grid-cols-1 gap-3">
              {uploadedFiles.map((file, idx) => (
                <a 
                  key={idx} 
                  href={file.signedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xl">📄</span>
                    <span className="text-sm font-medium text-slate-200 truncate group-hover:text-blue-300 transition-colors">{file.originalName}</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded flex items-center gap-1 group-hover:bg-blue-400/20 transition-colors">
                    Abrir <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
