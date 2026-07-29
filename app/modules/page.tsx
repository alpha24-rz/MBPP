"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, ChevronRight, Sparkles, Loader2, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

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
  const [modulesList, setModulesList] = useState<any[]>([])
  const [pertemuanList, setPertemuanList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Modules from Supabase Database
        const { data: modData, error: modErr } = await supabase
          .from("modules")
          .select("*")
          .order("order_index", { ascending: true })

        if (!modErr && modData) {
          setModulesList(modData)
        }

        // Fetch Pertemuan from Supabase Database
        const { data: pData, error: pErr } = await supabase
          .from("pertemuan")
          .select("*")
          .order("order_index", { ascending: true })

        if (!pErr && pData) {
          setPertemuanList(pData)
        }
      } catch (e) {
        console.error("Gagal mengambil data modul dari Supabase:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
              Kurikulum Modul Utama MBPP
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 max-w-2xl mx-auto text-sm text-foreground/75 leading-relaxed">
              Program ini terdiri dari modul psikoedukasi berkesinambungan yang memandu Anda secara bertahap menuju kesadaran digital penuh.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
              <p className="text-sm font-semibold text-[#2a1845]/70">Menyiapkan kurikulum pembelajaran MBPP...</p>
            </div>
          ) : modulesList.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF8F5] rounded-3xl border border-purple-100 p-8 max-w-xl mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7c4fd4] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2a1845]">Kurikulum Pembelajaran Sedang Disiapkan</h3>
              <p className="text-xs text-foreground/70 mt-2 max-w-md mx-auto leading-relaxed">
                Materi modul dan intervensi psikoedukasi sedang disiapkan oleh tim peneliti. Silakan kembali lagi beberapa saat lagi.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {modulesList.map((mod, idx) => {
                // Filter pertemuan associated with this module
                const modPertemuan = pertemuanList.filter(
                  (item) => Number(item.module_id) === Number(mod.id)
                )

                return (
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -6, boxShadow: "0 10px 30px -15px rgba(42, 24, 69, 0.15)" }}
                    key={mod.id}
                    className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-3xl border border-[#e8e0f7] bg-white transition-all duration-300 shadow-sm"
                  >
                    {/* Visual Image */}
                    <div className="relative w-full lg:w-[280px] shrink-0 aspect-[4/3] rounded-2xl overflow-hidden shadow-md group bg-purple-50">
                      <Image
                        src={mod.image_url || "/images/module-01.png"}
                        alt={mod.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md shadow-sm ${mod.badge_color || "bg-violet-100 text-violet-700"}`}>
                          <Sparkles className="mr-1 h-3 w-3" />
                          {mod.badge || "Modul MBPP"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col w-full">
                      <h3 className="text-2xl font-serif font-bold text-[#2a1845] leading-tight mb-1">
                        {mod.title}
                      </h3>
                      <p className="text-xs font-semibold italic text-[#7c4fd4]/80 mb-4">
                        {mod.subtitle}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                        {mod.desc_text}
                      </p>

                      {/* Integrated Pertemuan List from DB */}
                      {modPertemuan.length > 0 && (
                        <div className="mb-6 p-4 rounded-2xl bg-[#FBF6ED]/50 border border-purple-100/60">
                          <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#7c4fd4]" />
                            Pertemuan Terintegrasi Dalam Modul Ini ({modPertemuan.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {modPertemuan.map((item, idx) => (
                              <div key={item.id} className="p-2.5 rounded-xl border border-purple-50 bg-white shadow-xs hover:shadow-sm transition-shadow">
                                <span className="text-[9px] font-bold text-[#7c4fd4]">{item.pertemuan_number || `Pertemuan 0${idx + 1}`}</span>
                                <h5 className="text-xs font-bold text-[#2a1845] line-clamp-1">{item.title}</h5>
                                <p className="text-[11px] text-[#2a1845]/70 leading-relaxed mt-0.5 line-clamp-1">{item.subtitle}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-4 text-xs font-semibold text-[#7c4fd4]">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {modPertemuan.length} Pertemuan
                          </span>
                        </div>

                        <Link href={`/modules/${mod.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-1 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] px-4 py-2 text-xs font-semibold text-white shadow transition-all duration-200 cursor-pointer"
                          >
                            Buka Modul & Daftar Pertemuan
                            <ChevronRight className="h-3.5 w-3.5" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
