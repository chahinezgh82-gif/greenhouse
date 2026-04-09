'use client'

import { Home, BarChart3, Settings, Plus, Leaf } from 'lucide-react'
import { useState } from 'react'
import { EconomyToggle } from './EconomyToggle'
import { motion } from 'framer-motion'

export function Sidebar({ onAddRoom, isEconomyMode, toggleEconomy }: {
  onAddRoom: () => void
  isEconomyMode: boolean
  toggleEconomy: () => void
}) {
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 glass p-6 flex flex-col h-screen sticky top-0"
    >
      <div className="glass p-4 rounded-xl mb-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-glow">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl">GreenHouse</h1>
          <p className="text-sm opacity-75">Smart Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 mb-8">
        {[
{ icon: Home, label: 'Dashboard', href: '/' },
          { icon: BarChart3, label: 'Analytics', href: '/analytics' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ].map(({ icon: Icon, label, href }) => (
          <motion.a
            key={label}
            href={href}
            className="glass p-4 rounded-xl flex items-center space-x-3 hover:bg-white/20 transition-all group data-[active=true]:bg-white/30 data-[active=true]:shadow-glow data-[active=true]:ring-2 data-[active=true]:ring-green-400/50"
            whileHover={{ x: 4 }}
          >
            <Icon className="w-5 h-5 opacity-75 group-hover:opacity-100" />
            <span>{label}</span>
          </motion.a>
        ))}
      </nav>

      <div className="space-y-4">
        <motion.button
          onClick={onAddRoom}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full glass p-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-white/20 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Room</span>
        </motion.button>

        <EconomyToggle isActive={isEconomyMode} onToggle={toggleEconomy} />
      </div>
    </motion.aside>
  )
}

