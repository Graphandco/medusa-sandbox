"use client"

import Image from "next/image"
import { useHeaderHeight } from "@lib/hooks/use-element-height"
import { Button } from "@medusajs/ui"

const Hero = () => {
  // Initialise le hook - définit automatiquement --header-height
  useHeaderHeight()

  return (
    <div className="md:h-[calc(100dvh-var(--header-height,4rem))] relative flex flex-col justify-center gap-4">
      <Image
        src="/hero.avif"
        alt="Hero"
        width={1900}
        height={1280}
        className="relative md:absolute inset-0 object-cover w-full h-full"
      />
      <div className=" relative z-10 wrapper space-y-3">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
          Jewels & Co
        </h1>
        <p className="text-xl md:text-2xl font-medium">
          Bienvenue sur notre boutique de bijoux
        </p>
        <Button
          variant="primary"
          size="xlarge"
          className=""
          data-testid="add-product-button"
        >
          Trouvez votre bijou préféré
        </Button>
      </div>
    </div>
  )
}

export default Hero
