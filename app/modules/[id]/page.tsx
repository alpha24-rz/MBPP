"use client"

import { useState, useEffect, use } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { supabase } from "@/lib/supabaseClient"
import { motion, type Variants } from "framer-motion"
import { Sparkles, BookOpen, Clock, ChevronRight, ArrowLeft, Loader2, Calendar } from "lucide-react"
import Link from "next/link"

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 13 },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

export default function ModulePertemuanListPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const moduleId = parseInt(resolvedParams.id, 10) || 1

  const [moduleDetail, setModuleDetail] = useState<any | null>(null)
  const [pertemuanList, setPertemuanList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // 1. Fetch Modul details
        const { data: mData, error: mErr } = await supabase
          .from("modules")
          .select("*")
          .eq("id", moduleId)
          .single()

        if (!mErr && mData) {
          setModuleDetail(mData)
        } else {
          setModuleDetail({
            id: moduleId,
            title: "Modul MBPP - Mindfulness & Digital Wellbeing",
            subtitle: "Program Psikoedukasi Kesadaran Penuh & Penguatan Karakter Mahasiswa",
            desc_text: "Kurikulum intervensi psikoedukasi memadukan latihan kesadaran penuh dengan penguatan 24 kekuatan karakter.",
          })
        }

        // 2. Fetch Pertemuan list for this Modul from Supabase Database
        const { data: pData, error: pErr } = await supabase
          .from("pertemuan")
          .select("*")
          .order("order_index", { ascending: true })

        if (!pErr && pData && pData.length > 0) {
          const filtered = pData.filter((item) => Number(item.module_id) === Number(moduleId))
          setPertemuanList(filtered.length > 0 ? filtered : pData)
        } else {
          setPertemuanList([])
        }
      } catch (err) {
        console.error("Gagal memuat daftar pertemuan dari Supabase:", err)
        setPertemuanList([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [moduleId])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBF6ED] flex flex-col items-center justify-center gap-3">
        <Navbar />
        <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
        <p className="text-sm font-semibold text-[#2a1845]/70">Menyiapkan daftar pertemuan interaktif MBPP...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-20 px-6 text-center">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 0%, #7c4fd4 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Link
              href="/modules"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Katalog Modul
            </Link>
          </div>

          <p className="mb-2 text-xs font-bold tracking-widest text-[#f5c6d0] uppercase">
            {moduleDetail?.badge || `Modul ${moduleId}`}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
            {moduleDetail?.title}
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto italic font-light mb-6">
            {moduleDetail?.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Pertemuan List Section */}
      <section className="relative px-6 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <p className="mb-2 text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase">
              Schedule & Meetings
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#2a1845]">
              Daftar Pertemuan Dalam Modul Ini
            </h2>
            <p className="mt-2 text-xs text-foreground/75 max-w-xl mx-auto">
              Pilih salah satu pertemuan di bawah ini untuk mengakses sesi-sesi materi, panduan suara, dan latihan refleksi.
            </p>
          </motion.div>

          {pertemuanList.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF8F5] rounded-3xl border border-purple-100 p-8 max-w-xl mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7c4fd4] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2a1845]">Daftar Pertemuan Sedang Disiapkan</h3>
              <p className="text-xs text-foreground/70 mt-2 max-w-md mx-auto leading-relaxed">
                Materi dan jadwal pertemuan untuk modul ini sedang disiapkan oleh tim peneliti. Silakan kembali lagi beberapa saat lagi.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6"
            >
              {pertemuanList.map((p) => (
                <motion.div
                  key={p.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, boxShadow: "0 10px 30px -15px rgba(42, 24, 69, 0.15)" }}
                  className="p-6 rounded-3xl border border-purple-100 bg-[#FAF8F5] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold bg-purple-100 text-[#7c4fd4] px-3 py-1 rounded-full uppercase tracking-wider">
                        {p.pertemuan_number || `Pertemuan 0${p.id}`}
                      </span>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${p.badge_color || 'bg-purple-100 text-purple-700'}`}>
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#2a1845]">{p.title}</h3>
                    <p className="text-xs font-semibold text-[#7c4fd4]/80 italic">{p.subtitle}</p>
                    <p className="text-xs text-foreground/80 leading-relaxed max-w-2xl mt-1">{p.desc_text}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#2a1845]/70 pt-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#7c4fd4]" />
                        {p.duration || "130 Menit"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-[#7c4fd4]" />
                        {p.sessions_count || "3 Sesi Pembelajaran"}
                      </span>
                    </div>
                  </div>

                  <Link href={`/modules/${moduleId}/pertemuan/${p.id}`} className="shrink-0 self-end md:self-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 rounded-2xl bg-[#2a1845] hover:bg-[#1a0f2d] px-5 py-3 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
                    >
                      <span>Buka Sesi Pertemuan</span>
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
