"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import UserAvatar from "@/components/auth/UserAvatar";
import { UploadCloud, X, FileText, CheckCircle, AlertCircle, ArrowLeft, Loader2, ExternalLink, LayoutDashboard } from "lucide-react";

interface UploadedFile {
  fileName: string;
  originalName: string;
  signedUrl: string;
  publicUrl: string;
}

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error" | "warning">("idle");
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
      
      if (data.warning) {
        setUploadStatus("warning");
        setErrorMessage(data.warning);
      } else {
        setUploadStatus("success");
      }
      
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
    <main className="min-h-screen flex justify-center items-center bg-white p-6 font-sans text-neutral-900 relative">
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <Link 
          href="/dashboard"
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:text-neutral-900 transition-colors shadow-sm"
        >
          <LayoutDashboard className="w-4 h-4" />
          Mis Archivos
        </Link>
        <UserAvatar />
      </div>
      
      {/* Background Subtle Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white border border-neutral-200 p-8 md:p-12 rounded-3xl shadow-xl shadow-neutral-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-neutral-900">
            Subir Archivos
            </h1>
            <p className="text-neutral-500 text-base max-w-sm mx-auto">
            Sube tus documentos al bucket seguro de Industry Bot para procesamiento RAG.
            </p>
        </div>

        {/* Dropzone Area */}
        <div 
          className={`relative group border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer 
            ${isUploading ? 'opacity-50 pointer-events-none border-neutral-200 bg-neutral-50' : 'border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50'}`}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={isUploading}
          />
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
             <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-lg font-medium text-neutral-900 mb-1">
            Haz clic o arrastra archivos aquí
          </p>
          <p className="text-sm text-neutral-500">
            PDF, TXT, MD, DOCX soportados
          </p>
        </div>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <div className="mt-8">
             <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 ml-1">Archivos Seleccionados ({selectedFiles.length})</h3>
             <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {selectedFiles.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-100 group hover:border-neutral-300 transition-colors">
                    <div className="flex items-center min-w-0 gap-3">
                      <div className="p-2 bg-white rounded border border-neutral-200 text-neutral-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-neutral-900 truncate max-w-50">{file.name}</div>
                        <div className="text-xs text-neutral-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    {!isUploading && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(index); }} 
                        className="p-2 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Eliminar archivo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center mt-10 pt-6 border-t border-neutral-100">
            <Link 
              href="/"
              className="px-6 py-3 rounded-full text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors hover:bg-neutral-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </Link>

          <div className="flex gap-3 w-full sm:w-auto">
            {(selectedFiles.length > 0) && (
              <>
                <button 
                  onClick={clearAll} 
                  className="px-6 py-3 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all disabled:opacity-50"
                  disabled={isUploading}
                >
                  Limpiar
                </button>
                <button 
                  onClick={handleUpload} 
                  className="flex-1 sm:flex-none px-8 py-3 rounded-full text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg shadow-neutral-900/20 hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Subiendo...
                    </>
                  ) : (
                    `Subir Archivos`
                  )}
                </button>
              </>
            )}
            {selectedFiles.length === 0 && (uploadStatus === 'success' || uploadStatus === 'warning') && (
               <button 
               onClick={() => setUploadStatus("idle")} 
               className="ml-auto px-6 py-3 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-all flex items-center gap-2"
             >
               <UploadCloud className="w-4 h-4" /> Subir más
             </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mt-8 p-4 rounded-xl flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">¡Archivos subidos y procesados correctamente!</span>
          </div>
        )}

        {uploadStatus === "warning" && (
          <div className="mt-8 p-4 rounded-xl flex items-center gap-3 bg-yellow-50 text-yellow-800 border border-yellow-200 animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-8 p-4 rounded-xl flex items-center gap-3 bg-red-50 text-red-700 border border-red-200 animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Error: {errorMessage}</span>
          </div>
        )}

        {/* Results List */}
        {uploadedFiles.length > 0 && (uploadStatus === "success" || uploadStatus === "warning") && (
          <div className="mt-8 pt-8 border-t border-neutral-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-xs font-semibold mb-4 text-neutral-400 uppercase tracking-wider">Archivos en Base de Conocimiento</h3>
            <div className="grid grid-cols-1 gap-3">
              {uploadedFiles.map((file, idx) => (
                <a 
                  key={idx} 
                  href={file.signedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-white rounded-lg border border-neutral-200 text-neutral-900 group-hover:scale-105 transition-transform">
                       <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700 truncate group-hover:text-neutral-900 transition-colors">{file.originalName}</span>
                  </div>
                  <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    <ExternalLink className="w-4 h-4" />
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
