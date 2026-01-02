'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Vernetgeneve</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-blue-600 transition">Accueil</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">Services</a>
            <a href="#apropos" className="text-gray-700 hover:text-blue-600 transition">À Propos</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#accueil" className="block py-2 text-gray-700 hover:text-blue-600">Accueil</a>
            <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
            <a href="#apropos" className="block py-2 text-gray-700 hover:text-blue-600">À Propos</a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
          </div>
        )}
      </div>
    </nav>
  )
}

