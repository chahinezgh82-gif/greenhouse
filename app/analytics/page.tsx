'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, DollarSign, ThermometerSun, Lightbulb } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { EconomyToggle } from '../components/EconomyToggle'

export default function AnalyticsPage() {
  // Mock data matching rooms: Cuisine, Salon, Chambre
  const [energyData, setEnergyData] = useState({ Cuisine: 45, Salon: 32, Chambre: 28 })
  const [tempData, setTempData] = useState({
    indoor: [22, 23, 21.5, 22.8, 23.2],
    outdoor: [18, 17.5, 19, 16.8, 18.2]
  })
  const [lightingHours, setLightingHours] = useState({ Cuisine: 3.2, Salon: 4.1, Chambre: 1.8 })
  const [totalSavings, setTotalSavings] = useState(247.50)
  const [isEconomyMode, setIsEconomyMode] = useState(false)

  useEffect(() => {
    // Simulate data updates
    const interval = setInterval(() => {
      setEnergyData(prev => ({
Cuisine: prev.Cuisine + (Math.random() - 0.5),
Salon: prev.Salon + (Math.random() - 0.5),
Chambre: prev.Chambre + (Math.random() - 0.5)
      }))
setTotalSavings(prev => prev + Math.random() * 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const maxEnergy = Math.max(...Object.values(energyData))
  const maxLighting = Math.max(...Object.values(lightingHours))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="glass max-w-7xl mx-auto px-8 pt-8 pb-4 rounded-b-3xl shadow-2xl border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.3)] border border-white/20">
            <img src="/logo.jpg" alt="Greenhouse Logo" className="w-14 h-14 rounded-xl object-contain shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
              Analytics Dashboard
            </h1>
            <p className="text-lg opacity-80">Real-time energy & climate insights</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8 lg:flex-row flex-col lg:items-start">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <Sidebar onAddRoom={() => {}} isEconomyMode={isEconomyMode} toggleEconomy={() => setIsEconomyMode(!isEconomyMode)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:min-w-0 space-y-8">
          {/* Energy Consumption Bar Chart */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-green-400" />
              <span>Energy Consumption Today</span>
            </h2>
            <div className="space-y-6">
              {['Cuisine', 'Salon', 'Chambre'].map((room) => (
                <motion.div key={room} className="flex items-end space-x-4 h-20" whileHover={{ scale: 1.02 }}>
                  <span className="font-mono text-lg font-bold text-green-400 min-w-[80px]">
{Number(energyData[room as keyof typeof energyData]).toFixed(1)} kWh
                  </span>
                  <div className="flex-1 bg-white/5 rounded-xl h-full border border-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-t from-green-500/80 to-emerald-400/90 border-r-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                      style={{ width: `${(Number(energyData[room as keyof typeof energyData]) / maxEnergy) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                  <span className="text-sm opacity-75">{room}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Savings Card */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl border border-white/10 lg:col-span-1">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <DollarSign className="w-7 h-7 text-green-400" />
                <span>Total Savings</span>
              </h3>
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
                ${totalSavings.toFixed(2)}
              </div>
              <div className="glass-border inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 border-green-400/40">
                Mode Économie Active
              </div>
            </motion.section>

            {/* Climate Graph */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl border border-white/10 lg:col-span-1">
<h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
                <ThermometerSun className="w-7 h-7 text-blue-400" />
                <span>Internal Climate (°C)</span>
              </h3>
              <div className="overflow-hidden h-48 mb-6">
                <div className="grid grid-cols-5 gap-4 h-full items-end justify-items-center pt-6">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex flex-col items-center space-y-1 w-12">
                      {/* Indoor bar */}
                      <motion.div 
                        className="w-2.5 bg-gradient-to-t from-blue-400/70 to-cyan-300/90 rounded-lg shadow-glow backdrop-blur-sm border border-white/20 mx-1"
                        style={{ height: `${Math.min(tempData.indoor[i] / 25 * 100, 100)}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                      {/* Outdoor bar */}
                      <motion.div 
                        className="w-2.5 bg-gradient-to-t from-orange-400/70 to-yellow-300/90 rounded-lg shadow-glow backdrop-blur-sm border border-white/20 mx-1 -mt-8"
                        style={{ height: `${Math.min(tempData.outdoor[i] / 25 * 100, 100)}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                      />
                      <span className="text-xs font-mono">{i + 1}h</span>
                    </div>
                  ))}
                </div>
                {/* Decorative dot */}
                <div className="absolute top-1/2 right-2 -translate-y-1/2 w-2.5 h-2.5 bg-green-400 rounded-full shadow-glow border border-white/30" />
              </div>
              <div className="flex justify-center items-center space-x-8 text-sm">
                <span className="flex items-center space-x-2 text-blue-400 font-medium">
                  <span className="w-3.5 h-3.5 bg-blue-400 rounded-full block shadow-glow"></span>
                  Indoor
                </span>
                <span className="flex items-center space-x-2 text-orange-400 font-medium">
                  <span className="w-3.5 h-3.5 bg-orange-400 rounded-full block shadow-glow"></span>
                  Outdoor
                </span>
              </div>
            </motion.section>
          </div>

          {/* Lighting Statistics */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-8 flex items-center space-x-3">
              <Lightbulb className="w-7 h-7 text-yellow-400" />
              <span>Lighting Statistics Today</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(lightingHours).map(([room, hours]) => (
                <motion.div key={room} className="glass p-6 rounded-2xl text-center border border-white/10 group hover:bg-white/15 transition-all" whileHover={{ y: -8 }}>
                  <div className="w-16 h-16 glass mx-auto mb-4 rounded-2xl flex items-center justify-center backdrop-blur-md border border-yellow-400/30 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <Lightbulb className="w-8 h-8 text-yellow-400" />
                  </div>
{Number(hours).toFixed(1)}h
                  <div className="text-sm opacity-75 capitalize">{room}</div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                      style={{ width: `${(hours / maxLighting) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Right Panel - Reuse StatusPanel or empty */}
        <div className="lg:w-96 flex-shrink-0" />
      </div>
    </div>
  )
}

