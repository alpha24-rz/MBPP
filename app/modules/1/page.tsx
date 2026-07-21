"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { supabase } from "@/lib/supabaseClient"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, BookOpen, CheckCircle2, PenTool, Send, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 13 },
  },
}

export default function ModuleDetailPage() {
  const [interventions, setInterventions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Journal form states
  const [participantName, setParticipantName] = useState("")
  const [journalText, setJournalText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      } catch (error) {
        console.error("Gagal memuat intervensi:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInterventions()
  }, [])

  const handleSendJournal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!participantName.trim() || !journalText.trim()) return

    const activeIntervention = interventions[activeIndex]
    if (!activeIntervention) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from("journal_entries")
        .insert([
          {
            participant_name: participantName,
            intervention_title: activeIntervention.title,
            journal_text: journalText,
          }
        ])
      if (error) throw error

      setSubmitted(true)
      setJournalText("")
      setTimeout(() => {
        setSubmitted(false)
      }, 4000)
    } catch (error) {
      alert("Gagal mengirim jurnal. Apakah tabel 'journal_entries' sudah dibuat di Supabase? Error: " + (error as any).message)
    } finally {
      setSubmitting(false)
    }
  }

  const activeIntervention = interventions[activeIndex]

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-16 px-6 text-center">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 0%, #7c4fd4 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Link
            href="/modules"
            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-[#f5c6d0] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Katalog Modul
          </Link>
          <span className="text-[10px] font-bold tracking-widest text-[#f5c6d0] uppercase mb-1">
            Module 01 • Foundational Intervention
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Mengenal Diri di Era AI
          </h1>
          <p className="mt-4 text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
            Eksplorasi mendalam bagaimana tipe kepribadian Big Five Anda memengaruhi interaksi dengan AI, serta latih kesadaran diri melalui latihan refleksi mandiri terstruktur.
          </p>
        </div>
      </section>

      {/* Main interactive grid */}
      <section className="px-6 py-16 bg-white min-h-[60vh]">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-[#7c4fd4] animate-spin" />
              <p className="text-xs text-[#2a1845]/60 animate-pulse">Menghubungkan ke portal intervensi...</p>
            </div>
          ) : interventions.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-200 rounded-3xl max-w-lg mx-auto p-6">
              <BookOpen className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
              <h3 className="text-base font-bold text-[#2a1845] mb-2">Belum Ada Sesi Intervensi</h3>
              <p className="text-xs text-foreground/60 leading-relaxed mb-6">
                Tampaknya tim peneliti belum menambahkan sesi intervensi apa pun untuk Modul 1 ini di panel admin.
              </p>
              <Link href="/admin" className="inline-flex rounded-xl bg-[#7c4fd4] text-white px-5 py-2.5 text-xs font-bold shadow hover:bg-[#5e35b8] transition-all">
                Buka Admin Console untuk Menambahkan Sesi
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interventions List (Timeline/Selector) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-[#FBF6ED]/30 rounded-2xl border border-purple-100/50 mb-2">
                  <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-1">
                    Daftar Sesi Modul
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Pilih sesi di bawah untuk membaca panduan dan mengisi jurnal refleksi harian Anda.
                  </p>
                </div>

                <div className="space-y-3">
                  {interventions.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <motion.button
                        whileHover={{ x: isActive ? 0 : 4 }}
                        onClick={() => {
                          setActiveIndex(index)
                          setSubmitted(false)
                        }}
                        key={item.id}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex gap-4 items-start ${
                          isActive
                            ? "bg-[#2a1845] border-[#2a1845] text-white shadow-lg shadow-purple-900/10"
                            : "bg-white border-neutral-200 text-[#2a1845] hover:bg-[#FBF6ED]/10"
                        }`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border ${
                          isActive ? "bg-white text-[#2a1845] border-white" : "bg-purple-50 text-[#7c4fd4] border-[#e8e0f7]"
                        }`}>
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="space-y-1-5">
                          <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                          <p className={`text-[10px] line-clamp-1 leading-normal ${isActive ? "text-white/70" : "text-foreground/60"}`}>
                            {item.desc_text}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Intervention Detail & Interactive Reflection Journal */}
              <div className="lg:col-span-7 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIntervention.id}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="p-6 rounded-3xl border border-[#e8e0f7] bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-[#7c4fd4] mb-3">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Panduan Sesi {(activeIndex + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#2a1845] mb-3">
                      {activeIntervention.title}
                    </h2>

                    <p className="text-xs text-foreground/80 leading-relaxed bg-[#FBF6ED]/30 p-4 rounded-xl border border-purple-50 mb-6">
                      {activeIntervention.desc_text}
                    </p>

                    {/* JURNAL REFLEKSI FORM */}
                    <div className="border-t border-[#e8e0f7] pt-6">
                      <div className="flex items-center gap-2 text-[#2a1845] mb-4">
                        <PenTool className="h-4 w-4 text-[#7c4fd4]" />
                        <h3 className="text-sm font-bold">Jurnal Refleksi Mandiri</h3>
                      </div>

                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center justify-center"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h4 className="text-xs font-bold text-emerald-950 mb-1">Jurnal Berhasil Dikirim!</h4>
                            <p className="text-[10px] text-emerald-950/70 max-w-sm">
                              Terima kasih. Jurnal refleksi Anda telah tersimpan secara aman di database riset dan akan digunakan sebagai bahan evaluasi intervensi oleh peneliti.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSendJournal}
                            className="space-y-4 text-xs"
                          >
                            <div className="flex flex-col gap-1.5">
                              <label className="font-bold text-[#2a1845]">Nama Lengkap / ID Partisipan</label>
                              <input
                                type="text"
                                required
                                value={participantName}
                                onChange={(e) => setParticipantName(e.target.value)}
                                placeholder="Masukkan nama atau kode ID responden Anda..."
                                className="rounded-xl border border-neutral-200 bg-[#FBF6ED]/10 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="font-bold text-[#2a1845]">
                                Tuliskan Refleksi Anda untuk Sesi Ini
                              </label>
                              <textarea
                                required
                                rows={5}
                                value={journalText}
                                onChange={(e) => setJournalText(e.target.value)}
                                placeholder="Tuliskan apa saja kesadaran baru yang Anda dapatkan, perubahan emosi saat interaksi dengan AI, atau kendala latihan yang dihadapi..."
                                className="rounded-xl border border-neutral-200 bg-[#FBF6ED]/10 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors resize-none leading-relaxed"
                              />
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="submit"
                              disabled={submitting}
                              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 font-bold text-white shadow shadow-purple-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                              {submitting ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" /> Mengirimkan...
                                </>
                              ) : (
                                <>
                                  Kirim Jurnal Refleksi <Send className="h-3.5 w-3.5" />
                                </>
                              )}
                            </motion.button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
