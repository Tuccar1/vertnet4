'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#services', label: 'Services' },
    { href: '#apropos', label: 'À Propos' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-silver-100/95 backdrop-blur-xl shadow-md border-b border-silver-200'
          : 'bg-silver-50/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-400 via-accent-400 to-secondary-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                {/* @ts-ignore */}
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-gray-900 leading-tight">
                Genève Nettoyage
              </span>
              <span className="text-xs text-gray-600 font-medium hidden sm:block">
                Excellence en Nettoyage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 rounded-lg hover:bg-primary-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+4123456789"
              className="flex items-center space-x-2 text-gray-700 hover:text-accent-600 transition-colors group"
            >
              <div className="p-2 bg-accent-50 rounded-lg group-hover:bg-accent-100 transition-colors">
                {/* @ts-ignore */}
                <Phone className="w-4 h-4 text-accent-600" />
              </div>
                    <span className="font-semibold text-sm">+41 77 215 22 55</span>
            </a>
            
            <Link
              href="#contact"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-gray-900 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-silver-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              /* @ts-ignore */
              <X className="w-6 h-6" />
            ) : (
              /* @ts-ignore */
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-silver-200"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-silver-200 space-y-3">
                  <a
                    href="tel:+4123456789"
                    className="flex items-center space-x-3 px-4 py-3 bg-accent-50 rounded-lg text-accent-600 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* @ts-ignore */}
                    <Phone className="w-5 h-5" />
                          <span>+41 77 215 22 55</span>
                  </a>
                  <Link
                    href="#contact"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-gray-900 rounded-lg font-semibold shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Devis Gratuit
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
