'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const heroImage = { url: '/cleaning-4.webp', name: 'Eldivenli El Cam Temizliği' }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }


  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-20 sm:pt-24 w-full pb-20 lg:pb-32"
    >
      {/* Background Image - Seçilen görsel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient overlay - Yazıların okunabilirliği için, görsel renklerine uyumlu */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/25 via-blue-800/15 to-yellow-50/35 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/25 z-10"></div>
        
        {/* Profesyonel temizlik görseli - Net ve görünür */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={heroImage.url}
            alt="Services de nettoyage professionnel à Genève - Vertnetgeneve Excellence"
            fill
            className="object-cover object-center"
            style={{
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              opacity: 0.7,
              filter: 'brightness(0.95) contrast(1.0) saturate(1.0)',
            }}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        
        {/* Ek dekoratif element - daha az görünür */}
        <div className="absolute bottom-20 right-10 md:right-20 lg:right-32 w-32 h-32 md:w-40 md:h-40 opacity-10 z-5">
          <div className="w-full h-full bg-gradient-to-br from-primary-300/20 to-primary-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-50/95 via-white/95 to-yellow-50/95 backdrop-blur-md rounded-full text-gray-800 text-xs sm:text-sm md:text-base font-bold mb-6 sm:mb-8 md:mb-10 border-2 border-white/90 shadow-xl [text-shadow:_1px_1px_2px_rgba(255,255,255,0.8)]">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.2] tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] [text-shadow:_2px_2px_8px_rgba(255,255,255,0.8),_-2px_-2px_8px_rgba(255,255,255,0.8)]"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] [text-shadow:_2px_2px_8px_rgba(255,255,255,0.8)]">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 sm:mb-10 md:mb-12 leading-[1.7] max-w-3xl mx-auto font-semibold px-4 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)] [text-shadow:_1px_1px_6px_rgba(255,255,255,0.8),_-1px_-1px_6px_rgba(255,255,255,0.8)]"
          >
            Services de nettoyage professionnel de qualité supérieure pour les
            entreprises et particuliers à Genève. Disponible 24h/24 et 7j/7.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-7 justify-center mb-8 sm:mb-12 md:mb-16 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/booking" prefetch={true} className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Demander un Devis
                  <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/services"
                prefetch={true}
                className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden"
              >
                <span className="relative z-10">Nos Services</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Sosyal Medya Butonları - Hareketli */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <span className="text-sm sm:text-base text-gray-600 font-medium hidden sm:block">Suivez-nous:</span>
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-500 to-blue-600' },
                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 via-purple-500 to-orange-500' },
                { icon: MessageCircle, href: 'https://wa.me/41766212183', label: 'WhatsApp', color: 'from-green-500 to-green-600' },
              ].map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center group overflow-hidden border-2 border-white/50"
                    whileHover={{ scale: 1.15, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    aria-label={social.label}
                  >
                    {/* Gradient arka plan */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    {/* Icon */}
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-white relative z-10 transition-colors duration-300" />
                    {/* Glow efekti */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full blur-md opacity-0 group-hover:opacity-50`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Yumuşak geçiş - Alt kısım */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none z-10"></div>
    </section>
  )
}
