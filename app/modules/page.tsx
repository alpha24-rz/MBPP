"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, ChevronRight, Sparkles, Loader2, Calendar } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 12,
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const DEFAULT_MODULES_LIST = [
  {
    id: "pertemuan-1",
    title: "Pertemuan 1: Menyapa Diri dan Menyadari Saat Ini",
    subtitle: "Pernapasan Sadar, Body Scan, & Ketekunan",
    desc_text: "Sesi pembuka untuk membangun komitmen kelompok, mengukur baseline kesadaran diri (CAIDS-20 & IPIP-BFM-50), serta melatih teknik pernapasan sadar dan pemindaian tubuh (body scan) sebagai fondasi ketekunan.",
    image_url: "/images/why-mbpp-harmony.png",
    badge: "Mindfulness & Body Scan",
    badge_color: "bg-[#7c4fd4]/10 text-[#7c4fd4] border border-[#7c4fd4]/20",
    defaultPertemuan: [
      { id: "p1-1", title: "Rapport & Pretest", subtitle: "Norma Kelompok & CAIDS-20", pertemuan_number: "Sub-sesi 1.1" },
      { id: "p1-2", title: "Mindful Breathing & Body Scan", subtitle: "Latihan Pernapasan & Pemanasan Tubuh", pertemuan_number: "Sub-sesi 1.2" },
      { id: "p1-3", title: "Character Strengths: Ketekunan", subtitle: "Kalender Latihan Harian Mandiri", pertemuan_number: "Sub-sesi 1.3" },
    ]
  },
  {
    id: "pertemuan-2",
    title: "Pertemuan 2: Hadir Sepenuhnya, Berpikir Sebelum Bertindak",
    subtitle: "Automatic Pilot, Mindful Eating, & Prudence",
    desc_text: "Psikoedukasi mekanisme automatic pilot saat impulsif curhat ke AI. Melatih mindful eating & listening serta menerapkan prinsip Prudence (Berhenti, Pikirkan, Bertindak) sebelum berinteraksi secara digital.",
    image_url: "/images/why-mbpp-harmony.png",
    badge: "Automatic Pilot & Prudence",
    badge_color: "bg-amber-100 text-amber-800 border border-amber-200/60",
    defaultPertemuan: [
      { id: "p2-1", title: "Psikoedukasi Automatic Pilot", subtitle: "Mengenali Refleks Curhat AI", pertemuan_number: "Sub-sesi 2.1" },
      { id: "p2-2", title: "Mindful Eating & Listening", subtitle: "Latihan Kesadaran Indrawi", pertemuan_number: "Sub-sesi 2.2" },
      { id: "p2-3", title: "Character Strengths: Kehati-hatian", subtitle: "Prudence & Jeda Sadar Digital", pertemuan_number: "Sub-sesi 2.3" },
    ]
  },
  {
    id: "pertemuan-3",
    title: "Pertemuan 3: Welas Asih dan Kebersyukuran",
    subtitle: "Self-Compassion, Gratitude, & Love of Learning",
    desc_text: "Mengembangkan daya tahan emosional internal melalui Loving-Kindness Meditation dan Jurnal Syukur Harian sebagai alternatif dukungan emosional alami tanpa ketergantungan pada respon kecerdasan buatan.",
    image_url: "/images/why-mbpp-harmony.png",
    badge: "Self-Compassion & Gratitude",
    badge_color: "bg-emerald-100 text-emerald-800 border border-emerald-200/60",
    defaultPertemuan: [
      { id: "p3-1", title: "Psikoedukasi Self-Compassion", subtitle: "Alternatif Dukungan Internal AI", pertemuan_number: "Sub-sesi 3.1" },
      { id: "p3-2", title: "Loving-Kindness & Namaku", subtitle: "Meditasi 5 Sosok & Daftar Syukur", pertemuan_number: "Sub-sesi 3.2" },
      { id: "p3-3", title: "Love of Learning", subtitle: "Refleksi Jurnal Syukur Harian", pertemuan_number: "Sub-sesi 3.3" },
    ]
  },
  {
    id: "pertemuan-4",
    title: "Pertemuan 4: Evaluasi dan Penutupan",
    subtitle: "Posttest, Manipulation Check, & Fidelitas",
    desc_text: "Evaluasi menyeluruh efektivitas intervensi MBPP dengan Posttest (CAIDS-20), lembar observasi fidelitas intervensi, refleksi akhir kelompok, serta komitmen kedaulatan kognitif jangka panjang.",
    image_url: "/images/why-mbpp-harmony.png",
    badge: "Evaluasi & Posttest",
    badge_color: "bg-blue-100 text-blue-800 border border-blue-200/60",
    defaultPertemuan: [
      { id: "p4-1", title: "Presentasi Latihan Mandiri", subtitle: "Refleksi Pengalaman Mindfulness", pertemuan_number: "Sub-sesi 4.1" },
      { id: "p4-2", title: "Posttest CAIDS-20 & Fidelitas", subtitle: "Evaluasi & Manipulation Check", pertemuan_number: "Sub-sesi 4.2" },
    ]
  }
]

export default function ModulesPage() {
  const [modulesList, setModulesList] = useState<any[]>([])
  const [pertemuanList, setPertemuanList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: modData, error: modErr } = await supabase
          .from("modules")
          .select("*")
          .order("order_index", { ascending: true })

        if (!modErr && modData && modData.length > 0) {
          setModulesList(modData)
        } else {
          setModulesList(DEFAULT_MODULES_LIST)
        }

        const { data: pData, error: pErr } = await supabase
          .from("pertemuan")
          .select("*")
          .order("order_index", { ascending: true })

        if (!pErr && pData) {
          setPertemuanList(pData)
        }
      } catch (e) {
        console.error("Gagal mengambil data modul dari Supabase:", e)
        setModulesList(DEFAULT_MODULES_LIST)
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
                const modPertemuan = pertemuanList.filter(
                  (item) => Number(item.module_id) === Number(mod.id)
                )
                const displayPertemuan = modPertemuan.length > 0 ? modPertemuan : (mod.defaultPertemuan || [])

                return (
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -6, boxShadow: "0 10px 30px -15px rgba(42, 24, 69, 0.15)" }}
                    key={mod.id}
                    className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 p-6 rounded-3xl border border-[#e8e0f7] bg-white transition-all duration-300 shadow-sm"
                  >
                    {/* Visual Image */}
                    <div className="relative w-full lg:w-[280px] shrink-0 aspect-[4/3] lg:aspect-auto lg:h-auto rounded-2xl overflow-hidden shadow-md group bg-purple-50">
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

                      {/* Integrated Pertemuan List */}
                      {displayPertemuan.length > 0 && (
                        <div className="mb-6 p-4 rounded-2xl bg-[#FBF6ED]/50 border border-purple-100/60">
                          <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#7c4fd4]" />
                            Sub-sesi Terintegrasi ({displayPertemuan.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {displayPertemuan.map((item: any, idx: number) => (
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
                            {displayPertemuan.length} Sesi Terstruktur
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
