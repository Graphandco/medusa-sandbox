import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

// Composant pour afficher le nom du client
async function CustomerName() {
  const customer = await retrieveCustomer()

  return (
    <LocalizedClientLink
      className="hover:text-ui-fg-base"
      href="/account"
      data-testid="nav-account-link"
    >
      {customer?.first_name || "Compte"}
    </LocalizedClientLink>
  )
}

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative py-4 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-x-4">
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                <Image src="/logo.svg" alt="Logo" width={30} height={30} />
              </LocalizedClientLink>
            </div>
            <SideMenu regions={regions} />
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base"
                    href="/account"
                    data-testid="nav-account-link"
                  >
                    Compte
                  </LocalizedClientLink>
                }
              >
                <CustomerName />
              </Suspense>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Panier (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
