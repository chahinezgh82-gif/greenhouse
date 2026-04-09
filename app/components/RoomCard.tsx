'use client'

import { Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  name: string
  lightStatus: boolean
  onToggle: () => void
}

export function RoomCard({ name, lightStatus, onToggle }: Props) {
  return (
    <motion.div
      layout
      className={`glass p-6 rounded-2xl flex flex-col items-center space-y-4 cursor-pointer hover:shadow-glow transition-all group relative overflow-hidden ${
        lightStatus ? 'shadow-glow bg-green-500/10' : ''
      }`}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onToggle}
    >
      {lightStatus && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 -skew-x-12"
          animate={{ skewX: 0 }}
        />
      )}
      
      <div className={`w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 ${
        lightStatus ? 'shadow-glow bg-yellow-400/20' : 'bg-gray-800/50'
      }`}>
        <Lightbulb 
          className={`w-8 h-8 transition-all ${
            lightStatus ? 'text-yellow-400 shadow-glow drop-shadow-lg' : 'text-gray-500'
          }`} 
        />
      </div>

      <div className="text-center space-y-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className={`text-sm font-medium ${
          lightStatus ? 'text-green-400' : 'text-gray-400'
        }`}>
          {lightStatus ? 'Allumé' : 'Éteint'}
        </p>
      </div>
    </motion.div>
  )
}

