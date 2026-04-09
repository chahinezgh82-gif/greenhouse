'use client'

import { Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  isActive: boolean
  onToggle: () => void
}

export function EconomyToggle({ isActive, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className="w-full glass p-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-green-500/20 transition-all group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{ backgroundColor: isActive ? '#22c55e20' : 'transparent' }}
    >
      <motion.div
        className="w-3 h-3 rounded-full shadow-glow"
        animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
      <Leaf className={`w-5 h-5 transition-colors ${isActive ? 'text-green-400' : 'opacity-75'}`} />
      <span className={`font-medium ${isActive ? 'text-green-400' : ''}`}>
        {isActive ? '🌿 Mode Économie Active' : '🌿 Mode Économie'}
      </span>
    </motion.button>
  )
}

