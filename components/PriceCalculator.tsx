'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Home, Building2, Layers } from 'lucide-react'

interface CalculatorProps {
  serviceType: 'residential' | 'commercial' | 'specialized'
}

export default function PriceCalculator({ serviceType }: CalculatorProps) {
  const [surface, setSurface] = useState('')
  const [rooms, setRooms] = useState('')
  const [frequency, setFrequency] = useState('one-time')
  const [height, setHeight] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const calculatePrice = () => {
    let basePrice = 0

    if (serviceType === 'residential') {
      basePrice = 50 // Base price per room
      const roomCount = parseInt(rooms) || 0
      const surfaceArea = parseInt(surface) || 0
      basePrice = roomCount * 50 + (surfaceArea * 0.5)
    } else if (serviceType === 'commercial') {
      basePrice = 100 // Base price
      const surfaceArea = parseInt(surface) || 0
      basePrice = 100 + (surfaceArea * 1.5)
    } else if (serviceType === 'specialized') {
      basePrice = 200 // Base price for specialized
      const heightValue = parseInt(height) || 0
      basePrice = 200 + (heightValue * 10)
    }

    // Frequency discount
    if (frequency === 'weekly') {
      basePrice = basePrice * 0.85
    } else if (frequency === 'monthly') {
      basePrice = basePrice * 0.9
    }

    setEstimatedPrice(Math.round(basePrice))
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-primary-200">
      <div className="flex items-center space-x-3 mb-6">
        {/* @ts-ignore */}
        <Calculator className="w-8 h-8 text-primary-600" />
        <h3 className="text-2xl font-bold text-gray-900">Calculateur de Prix</h3>
      </div>

      <div className="space-y-6">
        {serviceType === 'residential' && (
          <>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre de pièces
              </label>
              <input
                type="number"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                placeholder="Ex: 3"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Surface (m²)
              </label>
              <input
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                placeholder="Ex: 80"
              />
            </div>
          </>
        )}

        {serviceType === 'commercial' && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Surface (m²)
            </label>
            <input
              type="number"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              placeholder="Ex: 200"
            />
          </div>
        )}

        {serviceType === 'specialized' && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Hauteur (mètres)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
              placeholder="Ex: 30"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Fréquence
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="one-time">Une fois</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
          </select>
        </div>

        <button
          onClick={calculatePrice}
          className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Calculer le Prix
        </button>

        {estimatedPrice !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border-4 border-primary-200"
          >
            <p className="text-gray-700 font-semibold mb-2">Estimation:</p>
            <p className="text-3xl font-bold text-primary-600">
              {estimatedPrice} CHF
            </p>
            <p className="text-sm text-gray-600 mt-2">
              * Prix indicatif. Contactez-nous pour un devis personnalisé.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

