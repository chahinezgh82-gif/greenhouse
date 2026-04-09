'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AddRoomModal } from '../AddRoomModal'
import { Sidebar } from '../components/Sidebar'
import { Clock, Shield, Leaf, Lightbulb, Users, Edit3, Trash2, Plus, Check, X } from 'lucide-react'
import { useRooms, type Room } from '../hooks/useRooms';

const users = [
  { name: 'Jean Dupont', role: 'Admin' },
  { name: 'Marie Martin', role: 'User' },
  { name: 'Pierre Lefèvre', role: 'User' }
]

export default function SettingsPage() {
  const { rooms, addRoom, deleteRoom, editRoom } = useRooms();
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  
  const [ecoBrightness, setEcoBrightness] = useState(50)
  const [cameraFeed, setCameraFeed] = useState(true)
  const [motionDetection, setMotionDetection] = useState(false)
  const [securityPin, setSecurityPin] = useState('****')
  const [lightingTime, setLightingTime] = useState('06:00')

  const toggleCamera = () => setCameraFeed(prev => !prev)
const toggleMotion = () => setMotionDetection(prev => !prev)

  const handleAddRoom = useCallback((name: string) => {
    addRoom(name)
  }, [addRoom])




  const startEdit = useCallback((room: Room) => {
    setEditingRoom(room)
  }, [])

  const saveEdit = useCallback((newName: string) => {
    if (editingRoom && newName.trim()) {
      editRoom(editingRoom!.id, newName.trim())
    }
    setEditingRoom(null)
  }, [editingRoom, editRoom])

  const cancelEdit = useCallback(() => {
    setEditingRoom(null)
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/10 to-slate-900">
      {/* Header */}
      <div className="glass max-w-7xl mx-auto px-8 pt-8 pb-4 rounded-b-3xl shadow-2xl border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.3)] border border-white/20">
            <img src="/logo.jpg" alt="Greenhouse Logo" className="w-14 h-14 rounded-xl object-contain shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
              Settings
            </h1>
            <p className="text-lg opacity-80">GreenHouse Configuration</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8 lg:flex-row flex-col lg:items-start">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <Sidebar onAddRoom={() => setShowAddModal(true)} isEconomyMode={false} toggleEconomy={() => {}} />

        </div>

        {/* Main Content */}
        <main className="flex-1 lg:min-w-0 space-y-8">
          {/* Room Management */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </span>
              <span>Room Management</span>
            </h2>
            <AnimatePresence>
              <div className="space-y-4">
                {rooms.map((room) => (

                  <motion.div 
                    key={room.id} 
                    className="flex items-center justify-between p-4 glass rounded-2xl" 
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {editingRoom?.id === room.id ? (
                      <div className="flex-1 flex items-center space-x-3">
                        <input
                          value={editingRoom.name}
                          onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                          className="flex-1 glass px-3 py-2 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all"
                          autoFocus
                        />
                        <motion.button
                          onClick={() => saveEdit(editingRoom.name)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-green-400 hover:text-green-300"
                          title="Save"
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={cancelEdit}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-gray-400 hover:text-gray-300"
                          title="Cancel"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <>
                        <span className="font-semibold text-lg">{room.name}</span>
                        <div className="flex items-center space-x-2">
                          <motion.button 
                            onClick={() => startEdit(room)}
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors" 
                            aria-label="Edit room" 
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5" />
                          </motion.button>
                          <motion.button 
                            onClick={() => deleteRoom(room.id)}
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors" 
                            aria-label="Delete room" 
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
            <motion.button 
              onClick={() => setShowAddModal(true)}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-xl border-2 border-green-400/50 p-4 rounded-2xl font-semibold text-green-400 hover:bg-green-500/30 transition-all shadow-glow"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              + Add New Room
            </motion.button>
          </motion.section>

          {/* Automation */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </span>
              <span>Automation & Scheduling</span>
            </h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl">
                <label className="block text-lg font-semibold mb-4 flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  Exterior Lighting
                </label>
                <div className="flex items-center space-x-4">
                  <span>Turn OFF at</span>
                  <input 
                    type="time" 
                    value={lightingTime}
                    onChange={(e) => setLightingTime(e.target.value)}
                    className="glass px-4 py-3 rounded-xl text-lg font-mono backdrop-blur-xl border border-white/20 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all w-32"
                    id="lighting-time"
                    aria-label="Exterior lighting off time"
                  />
                  <span className="font-mono text-green-400">{lightingTime}</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Security Settings */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </span>
              <span>Security Settings</span>
            </h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl flex items-center justify-between" onClick={toggleCamera}>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full transition-all ${cameraFeed ? 'bg-green-400 shadow-glow' : 'bg-gray-600'}`} />
                  <span>Camera Feed</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 bg-gray-700 relative transition-all ${cameraFeed ? 'bg-green-500/30' : ''}`}>
                  <motion.div className="w-5 h-5 bg-white rounded-full shadow-lg" animate={{ x: cameraFeed ? 19 : 1 }} />
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-center justify-between" onClick={toggleMotion}>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full transition-all ${motionDetection ? 'bg-green-400 shadow-glow' : 'bg-gray-600'}`} />
                  <span>Motion Detection</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 bg-gray-700 relative transition-all ${motionDetection ? 'bg-green-500/30' : ''}`}>
                  <motion.div className="w-5 h-5 bg-white rounded-full shadow-lg" animate={{ x: motionDetection ? 19 : 1 }} />
                </div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <label className="block text-lg font-semibold mb-4">Security PIN</label>
                <input 
                  type="password" 
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  maxLength={4}
                  className="w-full glass px-6 py-4 rounded-2xl text-2xl font-mono text-center backdrop-blur-xl border border-white/20 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all tracking-widest"
                  id="security-pin"
                  placeholder="0000"
                  aria-label="Security PIN"
                />
              </div>
            </div>
          </motion.section>

          {/* Eco-Mode */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <span className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </span>
              <span>Eco-Mode Configuration</span>
            </h2>
            <div className="glass p-8 rounded-2xl text-center">
              <label className="block text-lg font-semibold mb-6">Brightness Level in Mode Économie</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={ecoBrightness}
                  onChange={(e) => setEcoBrightness(Number(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 shadow-glow"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-2xl font-bold text-green-400 drop-shadow-lg">
                    {ecoBrightness}%
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* User Management */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </span>
              <span>User Management</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user, index) => (
                <motion.div key={index} className="glass p-6 rounded-2xl border-l-4 border-green-400 bg-green-500/5" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{user.name}</h4>
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mt-1">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Right Panel Placeholder */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="glass p-8 rounded-3xl h-64 flex items-center justify-center text-gray-500">
            Settings Panel
          </div>
        </div>

        {/* Add Room Modal */}
        <AddRoomModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddRoom={handleAddRoom}
        />
      </div>
    </div>
  )
}
