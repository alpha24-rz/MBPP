"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import Image from "next/image"
import Link from "next/link"
import { Clock, BookOpen, ChevronRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

const modules = [
  {
    id: 1,
    number: "Module 01",
    image: "/images/module-01.png",
    badge: "Foundational Intervention",
    badgeColor: "bg-violet-100 text-violet-700 border border-violet-200/50",
    title: "Mengenal Diri di Era AI",
    subtitle: "AI Awareness & Self-Discovery",
    desc: "Membangun landasan kesadaran diri sebagai titik awal perjalanan intervensi. Modul ini membimbing peserta untuk mengeksplorasi bagaimana profil kepribadian unik mereka — berdasarkan kerangka psikologis Big Five Personality — memengaruhi kecenderungan, motivasi, dan pola interaksi mereka dengan teknologi Artificial Intelligence (AI) sehari-hari.",
    duration: "90 Menit",
    sessions: "1 Sesi",
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function ModulesPage() {
  const [interventions, setInterventions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInterventions() {
      try {
        const { data, error } = await supabase
          .from("interventions")
          .select("*")
          .order("created_at", { ascending: true })
        if (!error && data) {
          setInterventions(data)
        }
      } catch (e) {
        console.error("Gagal mengambil data intervensi, menggunakan fallback kosong:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchInterventions()
  }, [])
  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-20 px-6 text-center">
        {/* Glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 0%, #7c4fd4 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="mb-3 font-script text-2xl text-[#f5c6d0] drop-shadow-sm">
            Interactive Interventions
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            Learning Modules
          </h1>
        </motion.div>
      </section>

      {/* Catalog Grid */}
      <section className="relative px-6 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="mb-2 text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase">
              Program Curriculums
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl font-bold text-[#2a1845] md:text-4xl">
              Kurikulum Modul MBPP
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 max-w-2xl mx-auto text-sm text-foreground/75 leading-relaxed">
              Program ini terdiri dari 5 modul psikoedukasi berkesinambungan yang memandu Anda secara bertahap menuju kesadaran digital penuh.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {modules.map((mod) => (
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, boxShadow: "0 10px 30px -15px rgba(42, 24, 69, 0.15)" }}
                key={mod.id}
                className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-3xl border border-[#e8e0f7] bg-white transition-all duration-300"
              >
                {/* Visual Image */}
                <div className="relative w-full lg:w-[280px] shrink-0 aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={mod.image}
                    alt={mod.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md shadow-sm ${mod.badgeColor}`}>
                      <Sparkles className="mr-1 h-3 w-3" />
                      {mod.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase mb-1">
                    {mod.number}
                  </span>
                  <h3 className="text-xl font-bold text-[#2a1845] leading-tight mb-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs font-semibold italic text-[#7c4fd4]/80 mb-4">
                    {mod.subtitle}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                    {mod.desc}
                  </p>

                  {mod.id === 1 && (
                    <div className="mb-6 p-5 rounded-2xl bg-[#FBF6ED]/40 border border-purple-100/50">
                      <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#7c4fd4]" />
                        Sesi Intervensi Terintegrasi
                      </h4>
                      {loading ? (
                        <p className="text-xs text-muted-foreground animate-pulse">Memuat intervensi dari database...</p>
                      ) : interventions.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">Belum ada sesi intervensi yang ditambahkan oleh peneliti.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {interventions.map((item, idx) => (
                            <div key={item.id} className="p-3 rounded-xl border border-purple-50 bg-white shadow-sm hover:shadow transition-shadow">
                              <h5 className="text-xs font-bold text-[#2a1845]">{idx + 1}. {item.title}</h5>
                              <p className="text-[11px] text-[#2a1845]/70 leading-relaxed mt-1">{item.desc_text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#7c4fd4]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {mod.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {mod.sessions}
                      </span>
                    </div>

                    <Link href={`/modules/${mod.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-1 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] px-4 py-2 text-xs font-semibold text-white shadow transition-all duration-200 cursor-pointer"
                      >
                        Buka Modul
                        <ChevronRight className="h-3.5 w-3.5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
