import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container py-6 relative"
        data-testid="product-container"
      >
        {/* Layout mobile : titre/description/infos en haut, galerie en bas */}
        <div className="flex flex-col md:hidden gap-y-8">
          <div className="flex flex-col gap-y-6">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
          </div>
          <div className="block w-full relative">
            <ImageGallery images={product?.images || []} />
          </div>
          {/* ProductActionsWrapper nécessaire pour MobileActions (MobileActions se cache lui-même sur desktop) */}
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>

        {/* Layout desktop : 2 colonnes */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:items-start">
          {/* Colonne gauche : Carrousel d'images */}
          <div className="block w-full relative">
            <ImageGallery images={product?.images || []} />
          </div>

          {/* Colonne droite : Titre, description, actions, infos */}
          <div className="flex flex-col gap-y-8">
            <ProductInfo product={product} />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductTabs product={product} />
          </div>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
