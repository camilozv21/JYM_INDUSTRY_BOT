"use client";

import { useState, useRef, ChangeEvent } from "react";
import styles from "./upload.module.css";

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
      // Evitar duplicados basados en nombre y tamaño
      setSelectedFiles((prev) => {
        const combined = [...prev, ...newFiles];
        const unique = combined.filter((file, index, self) =>
          index === self.findIndex((f) => (
            f.name === file.name && f.size === file.size
          ))
        );
        return unique;
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

      setUploadedFiles(data.files);
      setUploadStatus("success");
      setSelectedFiles([]); // Limpiar selección tras éxito
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Subir Archivos</h1>
        <p className={styles.subtitle}>
          Sube tus documentos, imágenes o videos al bucket seguro de Industry Bot.
        </p>

        {/* Dropzone Area */}
        <div className={styles.dropzone}>
          <input
            type="file"
            multiple
            className={styles.fileInput}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <div className={styles.icon}>☁️</div>
          <p className={styles.uploadText}>Arrastra archivos aquí o haz clic para seleccionar</p>
          <p className={styles.uploadHint}>Soporta múltiples archivos simultáneos</p>
        </div>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <ul className={styles.fileList}>
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className={styles.fileItem}>
                <div>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                </div>
                {!isUploading && (
                  <button 
                    onClick={() => removeFile(index)} 
                    className={styles.removeBtn}
                    aria-label="Eliminar archivo"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          {(selectedFiles.length > 0) && (
            <>
              <button 
                onClick={clearAll} 
                className={`${styles.button} ${styles.clearBtn}`}
                disabled={isUploading}
              >
                Limpiar
              </button>
              <button 
                onClick={handleUpload} 
                className={`${styles.button} ${styles.uploadBtn}`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className={styles.spinner}></span> Subiendo...
                  </>
                ) : (
                  `Subir ${selectedFiles.length} archivo${selectedFiles.length > 1 ? 's' : ''}`
                )}
              </button>
            </>
          )}
          {/* Botón para volver si no hay archivos y se completó una carga */}
          {selectedFiles.length === 0 && uploadStatus === 'success' && (
             <button 
             onClick={() => setUploadStatus("idle")} 
             className={`${styles.button} ${styles.clearBtn}`}
           >
             Subir más archivos
           </button>
          )}
        </div>

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className={`${styles.statusMessage} ${styles.success}`}>
            ¡Archivos subidos correctamente!
          </div>
        )}

        {uploadStatus === "error" && (
          <div className={`${styles.statusMessage} ${styles.error}`}>
            Error: {errorMessage}
          </div>
        )}

        {/* Results List */}
        {uploadedFiles.length > 0 && uploadStatus === "success" && (
          <div className={styles.results}>
            <h3 className={styles.resultTitle}>Archivos disponibles:</h3>
            <div className={styles.linkGroup}>
              {uploadedFiles.map((file, idx) => (
                <a 
                  key={idx} 
                  href={file.signedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.linkItem}
                >
                  <span>📄 {file.originalName}</span>
                  <span style={{fontSize: '0.8rem', opacity: 0.7}}>Abrir ↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
