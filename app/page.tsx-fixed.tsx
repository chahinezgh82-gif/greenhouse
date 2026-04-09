"use client"

import { useState, useEffect, useCallback } from "react"
import { Leaf, User, Clock, Sun, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { RoomCard } from "./components/RoomCard"
import { StatusPanel } from "./components/StatusPanel"
import { Sidebar } from "./components/Sidebar"
import { AddRoomModal } from "./AddRoomModal"  // // استيراد مودال إضافة الغرفة الذي كان مفقوداً
import SplashScreen from "./components/SplashScreen"
import { useRooms } from "./hooks/useRooms"

export default function Page() {
  // // إدارة الحالة المحلية للتحكم في إضاءة الخارج ونظام الأمان ومودال الغرفة
  const [isEconomyMode, setIsEconomyMode] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [exteriorLight, setExteriorLight] = useState(false)  // // حالة إضاءة الخارج
  const [securityActive, setSecurityActive] = useState(false)  // // حالة تفعيل الأمان
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)  // // حالة فتح مودال إضافة الغرفة

  const { rooms, addRoom, toggleLight } = useRooms()  // // استخدام هوك إدارة الغرف
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // // دالة تبديل وضع الاقتصاد
  const toggleEconomy = useCallback(() => {
    setIsEconomyMode(prev => !prev)
  }, [])

  // // دالة فتح مودال إضافة الغرفة (الآن تعمل فعلياً)
  const handleAddRoom = useCallback(() => {
    setShowAddRoomModal(true)
  }, [])

  // // دالة إغلاق مودال إضافة الغرفة
  const handleCloseModal = useCallback(() => {
    setShowAddRoomModal(false)
  }, [])

  // // دوال تبديل إضاءة الخارج ونظام الأمان (الآن تعمل مع تغيير الحالة)
  const toggleExteriorLight = useCallback(() => {
    setExteriorLight(prev => !prev)
  }, [])

  const toggleSecurity = useCallback(() => {
    setSecurityActive(prev => !prev)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/50 to-teal-900 relative overflow-hidden">
        {/* // الخلفية المتحركة */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="flex">
          {/* // الشريط الجانبي */}
          <Sidebar 
            onAddRoom={handleAddRoom}
            isEconomyMode={isEconomyMode}
            toggleEconomy={toggleEconomy}
          />
          
          <main className="flex-1 flex flex-col p-8">
            {/* // الـ Header الجديد مع تأثير glassmorphism - الآن مرئي */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass sticky top-0 z-40 p-6 rounded-2xl mb-8 backdrop-blur-xl border-white/30 shadow-2xl max-w-7xl mx-auto w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-glow">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
                      لوحة تحكم المنزل الذكي
                    </h1>
                    <p className="text-white/60 text-sm">Smart Home Dashboard</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="glass p-3 rounded-xl flex items-center space-x-2 backdrop-blur-xl">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium">{new Date().toLocaleTimeString('ar-EG')}</span>
                  </div>
                  <motion.div 
                    className="glass p-3 rounded-2xl cursor-pointer hover:shadow-glow-neon transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-6 h-6" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* // المحتوى الرئيسي */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto relative z-10 flex-1"
            >
              {/* // لوحة الحالة مع الـ handlers الحقيقية */}
              <StatusPanel 
                exteriorLight={exteriorLight} 
                onToggleExterior={toggleExteriorLight}
                securityActive={securityActive} 
                onToggleSecurity={toggleSecurity}
                batteryLevel={75} 
              />
              
              {/* // شبكة الغرف */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
                    الغرف // Rooms
                  </h2>
                  <motion.button 
                    onClick={handleAddRoom}
                    whileHover={{ scale: 1.05 }}
                    className="glass px-6 py-3 text-white font-bold rounded-xl shadow-glow hover:shadow-glow-neon transition-all flex items-center space-x-2 backdrop-blur-xl border border-white/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>إضافة غرفة // Add Room</span>
                  </motion.button>
                </div>

                {rooms.length === 0 ? (
                  <div className="text-center py-24">
                    <Leaf className="w-24 h-24 text-emerald-300/50 mx-auto mb-6 drop-shadow-lg" />
                    <h3 className="text-2xl font-bold text-white/80 mb-2">لا توجد غرف مضافة // No rooms configured</h3>
                    <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">ابدأ بإضافة غرفتك الأولى // Get started by adding your first smart room.</p>
                    <motion.button 
                      onClick={handleAddRoom}
                      whileHover={{ scale: 1.05 }}
                      className="glass px-8 py-4 text-white font-bold rounded-xl shadow-glow hover:shadow-glow-neon backdrop-blur-xl border border-white/30 transition-all"
                    >
                      + إضافة الغرفة الأولى // Add First Room
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                      <RoomCard key={room.id} name={room.name} lightStatus={room.lightStatus} onToggle={() => toggleLight(room.id)} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>

        {/* // مودال إضافة الغرفة المتكامل الآن */}
        <AddRoomModal 
          isOpen={showAddRoomModal}
          onClose={handleCloseModal}
          onAddRoom={addRoom}
        />
      </div>
    </>
  )
}

