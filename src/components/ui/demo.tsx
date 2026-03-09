'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-120 md:h-125 bg-black/96 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="w-full md:flex-1 p-6 sm:p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400">
            IA que Trabaja por Ti
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-sm sm:text-base">
            Nuestros agentes virtuales operan 24/7, entienden a tus clientes y ejecutan tareas complejas de forma autónoma. Tecnología invisible, resultados visibles.
          </p>
        </div>

        {/* Right content */}
        <div className="w-full md:flex-1 relative h-64 sm:h-80 md:h-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
