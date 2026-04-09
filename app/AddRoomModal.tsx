'use client'

import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAddRoom: (name: string) => void
}

import { useState } from 'react'

export function AddRoomModal({ isOpen, onClose, onAddRoom }: Props) {
  if (!isOpen) return null

  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddRoom(name.trim())
      setName('')
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-8 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">➕ Add New Room</h2>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter room name (e.g. Bathroom)"
            className="w-full glass p-4 rounded-xl text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/20 transition-all"
            autoFocus
          />
          <motion.button
            type="submit"
            className="w-full glass p-4 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-glow hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Room
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

