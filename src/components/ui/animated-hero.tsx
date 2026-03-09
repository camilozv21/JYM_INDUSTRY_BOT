"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["inteligente", "autónomo", "eficiente", "escalable", "competitivo"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex gap-8 py-16 sm:py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-3 rounded-full border border-neutral-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              RAG Knowledge Base
            </Button>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-neutral-900">Tu negocio, ahora más</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-neutral-900"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              J&amp;M Industry transforma operaciones complejas en sistemas autónomos eficientes.
              Alimenta la inteligencia de tu bot con documentación y datos precisos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
            <Button
              size="lg"
              className="gap-4 rounded-full cursor-pointer border border-neutral-900 hover:bg-neutral-100"
              variant="outline"
              asChild
            >
              <Link href="/upload">
                Subir Archivos <UploadCloud className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4 rounded-full text-white bg-neutral-900 hover:bg-neutral-800" asChild>
              <Link href="/dashboard">
                Ingresar al Panel <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
