"use client"

import { motion, AnimatePresence } from "framer-motion"
import { XMark } from "@medusajs/icons"
import { Text, useToggleState } from "@medusajs/ui"
import { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Accueil: "/",
  Boutique: "/store",
  Compte: "/account",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleState = useToggleState()

  return (
    <>
      {/* Menu Desktop - Liens visibles */}
      <nav className="hidden small:flex items-center gap-x-6 h-full">
        {Object.entries(SideMenuItems).map(([name, href]) => (
          <LocalizedClientLink
            key={name}
            href={href}
            className="hover:text-ui-fg-base transition-colors"
            data-testid={`${name.toLowerCase()}-link`}
          >
            {name}
          </LocalizedClientLink>
        ))}
      </nav>

      {/* Menu Mobile - Burger */}
      <div className="small:hidden h-full flex items-center">
        {/* Bouton Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base p-4"
          data-testid="nav-menu-button"
          aria-label="Ouvrir le menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className="block h-0.5 w-full bg-current transition-all" />
            <span className="block h-0.5 w-full bg-current transition-all" />
            <span className="block h-0.5 w-full bg-current transition-all" />
          </div>
        </button>

        {/* Overlay & Panel avec Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay sombre */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                data-testid="menu-overlay"
              />

              {/* Panel du menu */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
                className="fixed left-0 top-0 bottom-0 w-[300px] sm:w-[350px] bg-white z-50 shadow-2xl"
                data-testid="nav-menu-popup"
              >
                <div className="flex flex-col h-full">
                  {/* Header avec bouton fermeture */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">
                      Menu
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      data-testid="close-menu-button"
                      aria-label="Fermer le menu"
                    >
                      <XMark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Liste des liens avec animation échelonnée */}
                  <nav className="flex-1 overflow-y-auto p-6">
                    <ul className="flex flex-col gap-4">
                      {Object.entries(SideMenuItems).map(
                        ([name, href], index) => (
                          <motion.li
                            key={name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <LocalizedClientLink
                              href={href}
                              className="block text-2xl py-3 text-gray-900 hover:text-ui-fg-base transition-colors"
                              onClick={() => setIsOpen(false)}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </nav>

                  {/* Footer avec sélecteur de pays */}
                  <div className="border-t border-gray-200 p-6 space-y-4">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onMouseEnter={toggleState.open}
                      onMouseLeave={toggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={toggleState}
                          regions={regions}
                        />
                      )}
                    </div>
                    <Text className="text-xs text-gray-500">
                      © {new Date().getFullYear()} Graph and Shop
                    </Text>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default SideMenu
