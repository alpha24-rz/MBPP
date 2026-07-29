"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Heart, Sparkles } from "lucide-react"

export function MindfulBreathingVisualizer() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [counter, setCounter] = useState(4)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive) {
      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1

          // Cycle to next phase
          if (phase === "inhale") {
            setPhase("hold")
            return 4
          } else if (phase === "hold") {
            setPhase("exhale")
            return 4
          } else {
            setPhase("inhale")
            setCyclesCompleted((c) => c + 1)
            return 4
          }
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isActive, phase])

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setCounter(4)
    setCyclesCompleted(0)
  }

  const phaseConfig = {
    inhale: {
      text: "Tarik Napas Perlahan...",
      subtext: "Rasakan udara memenuhi paru-parumu",
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-100/80",
      borderColor: "border-purple-300",
      scale: 1.35,
    },
    hold: {
      text: "Tahan Sejenak...",
      subtext: "Rasakan ketenangan di dalam dada",
      color: "from-amber-400 to-orange-500",
      textColor: "text-amber-600",
      bgColor: "bg-amber-100/80",
      borderColor: "border-amber-300",
      scale: 1.35,
    },
    exhale: {
      text: "Hembuskan Perlahan...",
      subtext: "Lepaskan seluruh ketegangan & ketakutan",
      color: "from-teal-400 to-emerald-600",
      textColor: "text-teal-600",
      bgColor: "bg-teal-100/80",
      borderColor: "border-teal-300",
      scale: 0.9,
    },
  }

  const currentConfig = phaseConfig[phase]

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-[#1d1233] via-[#2a1845] to-[#120a21] p-8 text-white shadow-2xl border border-purple-500/20 relative overflow-hidden my-6">
      {/* Glow Effect Background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f5c6d0] text-xs font-semibold mb-3 backdrop-blur-sm border border-white/10">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Breathing Visualizer
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-1">
          Latihan Pernapasan Penuh Kesadaran
        </h3>
        <p className="text-xs text-white/70 max-w-md mb-6">
          Ikuti lingkaran ritme pernapasan 4-4-4 untuk melepaskan pikiran yang menumpuk dan kembali hadir saat ini.
        </p>

        {/* Breathing Circle Animation Widget */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* Outer Pulsing Aura */}
          <motion.div
            animate={{
              scale: isActive ? currentConfig.scale * 1.1 : 1,
              opacity: isActive ? 0.4 : 0.2,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentConfig.color} blur-xl`}
          />

          {/* Main Breathing Circle */}
          <motion.div
            animate={{
              scale: isActive ? currentConfig.scale : 1,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className={`w-44 h-44 rounded-full bg-gradient-to-tr ${currentConfig.color} shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-white/20 relative cursor-pointer`}
            onClick={() => setIsActive(!isActive)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phase + counter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <span className="text-4xl font-extrabold text-white drop-shadow-md">
                  {isActive ? counter : <Heart className="h-10 w-10 text-white animate-pulse" />}
                </span>
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest mt-1">
                  {isActive ? phase : "Mulai"}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-4 min-h-[45px] flex flex-col items-center">
          <p className="text-base font-bold text-white transition-all">
            {isActive ? currentConfig.text : "Siap Memulai Latihan?"}
          </p>
          <p className="text-xs text-[#f5c6d0] italic">
            {isActive ? currentConfig.subtext : "Tekan tombol Mulai atau klik lingkaran di atas."}
          </p>
        </div>

        {/* Controls & Cycle Counter */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
              isActive
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-[#7c4fd4] hover:bg-[#683cb8] text-white"
            }`}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isActive ? "Jeda Latihan" : "Mulai Latihan"}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          {cyclesCompleted > 0 && (
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Selesai {cyclesCompleted} Putaran
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
