'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-12"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center space-y-12 max-w-lg mx-auto">
        {/* Single Minimalist Lightbulb Icon */}
        <motion.div
          className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          animate={{ 
            opacity: [0.6, 1, 0.6], 
            scale: [0.98, 1, 0.98] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Lightbulb 
            size={200} 
            className="text-[#10b981]"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="glass p-8 rounded-3xl text-center backdrop-blur-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 mx-auto mb-6 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1 
            className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing Greenhouse System
          </motion.h1>
          <p className="text-lg opacity-80">Smart Management System Loading...</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

