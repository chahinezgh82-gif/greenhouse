'use client'

import { Shield, Lightbulb, BatteryCharging } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  exteriorLight: boolean
  onToggleExterior: () => void
  securityActive: boolean
  onToggleSecurity: () => void
  batteryLevel: number
}

export function StatusPanel({ 
  exteriorLight, 
  onToggleExterior, 
  securityActive, 
  onToggleSecurity, 
  batteryLevel 
}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-6 rounded-2xl space-y-6 w-full max-w-sm"
    >
      <h3 className="font-bold text-lg mb-6 flex items-center space-x-2">
        <Shield className="w-5 h-5" />
        <span>Status Panel</span>
      </h3>

      {/* Exterior Lighting */}
      <motion.div 
        className="glass p-4 rounded-xl flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div className={`w-3 h-3 rounded-full shadow-lg transition-all ${
            exteriorLight 
              ? 'bg-[#10b981] shadow-[0_0_10px_#10b981] animate-pulse' 
              : 'bg-gray-600'
          }`} />
          <Lightbulb className="w-5 h-5" />
          <span>Exterior Lighting</span>
        </div>
        <motion.button
          onClick={onToggleExterior}
          className={`w-12 h-6 rounded-full relative p-1 transition-all duration-300 ring-2 ring-transparent ${
            exteriorLight 
              ? 'bg-[#10b981] shadow-[0_0_15px_#10b981] ring-[#10b981]/50' 
              : 'bg-gray-700 hover:bg-gray-600 ring-gray-600/50'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className={`w-5 h-5 rounded-full shadow-xl transition-shadow ${
              exteriorLight ? 'bg-white/90 shadow-[0_0_10px_#10b981]' : 'bg-white/80 shadow-lg'
            }`}
            animate={{ x: exteriorLight ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </motion.div>

      {/* Security */}
      <motion.button
        onClick={onToggleSecurity}
        className={`w-full glass p-4 rounded-xl flex items-center justify-between hover:bg-red-500/20 transition-all ${
          securityActive ? 'border-l-4 border-red-400 bg-red-500/10' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3">
          <Shield className={`w-5 h-5 ${securityActive ? 'text-red-400' : 'opacity-75'}`} />
          <span className="font-medium">
            {securityActive ? '🔒 Security Active' : 'Activate Security'}
          </span>
        </div>
        {securityActive && (
          <motion.div 
            className="w-2 h-2 bg-red-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.button>

      {/* Battery */}
      <motion.div 
        className="glass p-4 rounded-xl text-center space-y-2"
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <BatteryCharging className="w-12 h-12 mx-auto mb-2 opacity-75" />
        <div className="relative w-20 h-20 mx-auto border-4 border-gray-700 rounded-full">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path 
              className="stroke-green-400 stroke-[3px] fill-none"
              strokeDasharray="100, 100"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDashoffset={100 - batteryLevel}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg">
            {Math.round(batteryLevel)}%
          </span>
        </div>
        <p className="text-sm text-green-400 font-medium">Battery Health</p>
      </motion.div>
    </motion.div>
  )
}
