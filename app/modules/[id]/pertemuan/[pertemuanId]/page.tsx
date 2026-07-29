"use client"

import { useState, useEffect, use } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { supabase } from "@/lib/supabaseClient"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  PenTool,
  Send,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Clock,
  Music,
  Video,
  Headphones,
  Calendar,
  ChevronRight,
  ChevronLeft,
  HeartHandshake,
  CheckCircle,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { MindfulBreathingVisualizer } from "@/components/modules/mindful-breathing-visualizer"
import { DailyHabitTrackerCard } from "@/components/modules/daily-habit-tracker-card"
import { GratitudeJournalCard } from "@/components/modules/gratitude-journal-card"
import { SmartGoalCard } from "@/components/modules/smart-goal-card"
import { SelfCheckinCard } from "@/components/modules/self-checkin-card"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 13 },
  },
}

export interface QuestionObject {
  title?: string
  question: string
}

const DEFAULT_BLOCK_ORDER = [
  "text",
  "image",
  "audio",
  "video",
  "breathing",
  "habit_tracker",
  "gratitude_journal",
  "smart_goal",
  "self_checkin",
]

export default function PertemuanSesiDetailPage({
  params,
}: {
  params: Promise<{ id: string; pertemuanId: string }>
}) {
  const resolvedParams = use(params)
  const moduleId = parseInt(resolvedParams.id, 10) || 1
  const pertemuanId = parseInt(resolvedParams.pertemuanId, 10) || 1

  const { user } = useAuth()
  const [pertemuanDetail, setPertemuanDetail] = useState<any | null>(null)
  const [interventions, setInterventions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Journal form states
  const [participantName, setParticipantName] = useState("")
  const [journalText, setJournalText] = useState("")
  const [reflectionAnswers, setReflectionAnswers] = useState<{ [key: number]: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (user) {
      setParticipantName(user.user_metadata?.full_name || "")
    }
  }, [user])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // 1. Fetch Pertemuan details
        const { data: pData, error: pErr } = await supabase
          .from("pertemuan")
          .select("*")
          .eq("id", pertemuanId)
          .single()

        if (!pErr && pData) {
          setPertemuanDetail(pData)
        } else {
          setPertemuanDetail({
            id: pertemuanId,
            pertemuan_number: `Pertemuan 0${pertemuanId}`,
            title: `Pertemuan 0${pertemuanId}`,
            subtitle: "Intervensi Psikoedukasi MBPP",
            duration: "130 Menit",
          })
        }

        // 2. Fetch Sesi (Interventions) for this specific Pertemuan from Supabase Database
        const { data: intData, error: intErr } = await supabase
          .from("interventions")
          .select("*")
          .eq("pertemuan_id", pertemuanId)
          .order("order_index", { ascending: true })

        if (!intErr && intData && intData.length > 0) {
          setInterventions(intData)
        } else {
          setInterventions([])
        }
      } catch (err) {
        console.error("Gagal memuat data sesi dari Supabase:", err)
        setInterventions([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pertemuanId])

  const activeIntervention = interventions[activeIndex]
  const progressPercent = Math.round(((activeIndex + 1) / (interventions.length || 1)) * 100)

  // Parse questions / steps
  const parseQuestions = (rawQuestions: any): QuestionObject[] => {
    if (!rawQuestions) return []
    let items: any[] = []
    if (Array.isArray(rawQuestions)) items = rawQuestions
    else if (typeof rawQuestions === "string") {
      try {
        const parsed = JSON.parse(rawQuestions)
        if (Array.isArray(parsed)) items = parsed
      } catch (e) {
        if (rawQuestions.trim()) items = [{ question: rawQuestions }]
      }
    }

    return items
      .map((item) => {
        if (typeof item === "string") return { title: "", question: item.trim() }
        if (typeof item === "object" && item !== null) {
          return { title: item.title?.trim() || "", question: item.question?.trim() || "" }
        }
        return { title: "", question: "" }
      })
      .filter((item) => Boolean(item.question))
  }

  const currentQuestions = parseQuestions(activeIntervention?.reflection_questions)

  // Compute block display sequence
  const blockSequence: string[] = (() => {
    let list = DEFAULT_BLOCK_ORDER
    if (activeIntervention?.content_order) {
      let raw = activeIntervention.content_order
      if (typeof raw === "string") {
        try {
          raw = JSON.parse(raw)
        } catch (e) {
          raw = []
        }
      }
      if (Array.isArray(raw) && raw.length > 0) {
        list = raw
      }
    }
    return Array.from(new Set([...list, ...DEFAULT_BLOCK_ORDER]))
  })()

  const handleSendJournal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeIntervention) return

    const targetParticipantName =
      activeIntervention.has_participant_name !== false
        ? participantName.trim()
        : (user?.user_metadata?.full_name || participantName || "Peserta MBPP").trim()

    if (!targetParticipantName) return

    let finalJournalText = ""
    if (currentQuestions.length > 0) {
      finalJournalText = currentQuestions
        .map((q, idx) => {
          const titlePrefix = q.title ? `[${q.title}] ` : ""
          return `Pertanyaan ${idx + 1}: ${titlePrefix}${q.question}\nJawaban: ${reflectionAnswers[idx] || "-"}`
        })
        .join("\n\n")
    } else {
      finalJournalText = journalText
    }

    if (!finalJournalText.trim()) return

    setSubmitting(true)
    try {
      const { error } = await supabase.from("journal_entries").insert([
        {
          participant_name: targetParticipantName,
          intervention_title: `${pertemuanDetail?.pertemuan_number || 'Pertemuan ' + pertemuanId} - ${activeIntervention.title}`,
          journal_text: finalJournalText,
        },
      ])
      if (error) throw error

      setSubmitted(true)
      setJournalText("")
      setReflectionAnswers({})
      setTimeout(() => {
        setSubmitted(false)
      }, 4000)
    } catch (error) {
      alert("Gagal mengirim jurnal: " + (error as any).message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBF6ED] flex flex-col items-center justify-center gap-3">
        <Navbar />
        <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
        <p className="text-sm font-semibold text-[#2a1845]/70">Memuat alur pembelajaran interaktif...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Dynamic Header Banner with Progress Indicator */}
        <section className="relative bg-gradient-to-br from-[#2a1845] via-[#1d1033] to-[#120a21] pt-32 pb-16 px-6 text-center">
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
                href={`/modules/${moduleId}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors border border-white/10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Daftar Pertemuan Modul
              </Link>
            </div>

            <p className="mb-2 text-xs font-bold tracking-widest text-[#f5c6d0] uppercase">
              {pertemuanDetail?.pertemuan_number || `Pertemuan 0${pertemuanId}`} • Interaktif Online Flow
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              {pertemuanDetail?.title}
            </h1>
            <p className="text-xs md:text-sm text-white/80 max-w-2xl mx-auto italic font-light mb-6">
              {pertemuanDetail?.subtitle || "Modul Intervensi Kesadaran Penuh & Penguatan Karakter Mahasiswa"}
            </p>

            {/* Stepper Progress Bar */}
            <div className="max-w-md mx-auto bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#f5c6d0]" />
                  Langkah {activeIndex + 1} dari {interventions.length} Sesi
                </span>
                <span className="text-[#f5c6d0]">{progressPercent}% Selesai</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7c4fd4] to-[#f5c6d0]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stepper Steps Navigation Pills ("Alur Mengalir") */}
        {interventions.length > 0 ? (
          <>
            <section className="relative px-6 -mt-6 z-20">
              <div className="mx-auto max-w-4xl bg-white p-3 rounded-3xl border border-purple-100 shadow-lg flex items-center justify-between overflow-x-auto gap-2">
                {interventions.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeIndex === idx
                        ? "bg-[#2a1845] text-white shadow-md scale-102"
                        : idx < activeIndex
                        ? "bg-purple-50 text-[#7c4fd4] hover:bg-purple-100"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-white/20 shrink-0">
                      {idx < activeIndex ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : idx + 1}
                    </span>
                    <span className="truncate">Sesi {idx + 1}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Interactive Active Session Content */}
            <section className="relative px-6 py-12">
              <div className="mx-auto max-w-4xl">
                <AnimatePresence mode="wait">
                  {activeIntervention && (
                    <motion.div
                      key={activeIntervention.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* Card Main Sesi Header */}
                      <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-900/5 space-y-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-[#7c4fd4] text-[11px] font-bold">
                            Sesi {activeIndex + 1} Pembelajaran
                          </span>
                          {activeIntervention.audio_url && (
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                              <Music className="h-3 w-3" /> Audio Guide
                            </span>
                          )}
                          {activeIntervention.image_url && (
                            <span className="px-3 py-1 rounded-full bg-purple-100 text-[#7c4fd4] text-[11px] font-bold flex items-center gap-1">
                              <ImageIcon className="h-3 w-3" /> Gambar Panduan
                            </span>
                          )}
                        </div>

                        <div>
                          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2a1845] leading-snug">
                            {activeIntervention.title}
                          </h2>
                          {activeIntervention.subtitle && (
                            <p className="text-xs font-semibold text-[#7c4fd4] italic mt-1">
                              {activeIntervention.subtitle}
                            </p>
                          )}
                        </div>

                        {/* RENDER CONTENT BLOCKS IN DYNAMIC ORDER (blockSequence) */}
                        <div className="space-y-6 pt-2">
                          {blockSequence.map((blockKey) => {
                            switch (blockKey) {
                              case "text":
                                return activeIntervention.has_text_instruction !== false &&
                                  (Boolean(activeIntervention.desc_text?.trim()) ||
                                    parseQuestions(activeIntervention.instruction_steps).length > 0) ? (
                                  <div
                                    key={blockKey}
                                    className="p-6 rounded-2xl bg-[#FBF6ED]/60 border border-purple-50 text-sm md:text-base text-foreground/85 leading-relaxed space-y-4 shadow-xs"
                                  >
                                    {activeIntervention.desc_text?.trim() && (
                                      <div className="whitespace-pre-line leading-relaxed text-[#2a1845]/90">
                                        {activeIntervention.desc_text}
                                      </div>
                                    )}

                                    {parseQuestions(activeIntervention.instruction_steps).length > 0 && (
                                      <div className="pt-3 border-t border-purple-100/60 space-y-3">
                                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#7c4fd4]">
                                          Langkah-Langkah Instruksi Latihan:
                                        </h4>
                                        <div className="space-y-2.5">
                                          {parseQuestions(activeIntervention.instruction_steps).map(
                                            (stepItem, sIdx) => (
                                              <div
                                                key={sIdx}
                                                className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-purple-100/80 shadow-xs text-xs md:text-sm"
                                              >
                                                <span className="w-6 h-6 rounded-full bg-[#7c4fd4] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                  {sIdx + 1}
                                                </span>
                                                <span className="text-[#2a1845] font-medium leading-relaxed mt-0.5">
                                                  {stepItem.question}
                                                </span>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : null

                              case "image":
                                return activeIntervention.image_url ? (
                                  <div
                                    key={blockKey}
                                    className="p-6 rounded-2xl bg-white border border-purple-100 shadow-md space-y-3"
                                  >
                                    {activeIntervention.image_title && (
                                      <h4 className="text-sm font-serif font-bold text-[#2a1845] flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-[#7c4fd4]" />
                                        <span>{activeIntervention.image_title}</span>
                                      </h4>
                                    )}
                                    <div className="rounded-2xl overflow-hidden border border-purple-100 max-h-96 bg-[#FAF8F5] flex items-center justify-center">
                                      <img
                                        src={activeIntervention.image_url}
                                        alt={activeIntervention.image_title || "Gambar Contoh Gerakan"}
                                        className="w-full h-full object-contain max-h-96"
                                      />
                                    </div>
                                  </div>
                                ) : null

                              case "audio":
                                return activeIntervention.audio_url ? (
                                  <div
                                    key={blockKey}
                                    className="p-6 rounded-2xl bg-gradient-to-r from-[#2a1845] to-[#452778] text-white shadow-lg space-y-3"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#f5c6d0]">
                                        <Headphones className="h-5 w-5 animate-pulse" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                          Panduan Suara Latihan (Guided Mindfulness Audio)
                                        </h4>
                                        <p className="text-xs text-white/70">
                                          Dengarkan audio pemandu latihan kesadaran napas & relaksasi.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                                      <audio
                                        controls
                                        controlsList="nodownload"
                                        src={activeIntervention.audio_url}
                                        className="w-full h-9 rounded-lg focus:outline-hidden"
                                      >
                                        Browser Anda tidak mendukung pemutar audio.
                                      </audio>
                                    </div>
                                  </div>
                                ) : null

                              case "video":
                                return activeIntervention.video_url ? (
                                  <div
                                    key={blockKey}
                                    className="p-4 rounded-2xl bg-black text-white shadow-lg space-y-2"
                                  >
                                    <span className="text-xs font-bold text-sky-400 block px-1">
                                      Video Panduan Latihan Sesi
                                    </span>
                                    <video
                                      controls
                                      src={activeIntervention.video_url}
                                      className="w-full max-h-80 object-cover rounded-xl"
                                    />
                                  </div>
                                ) : null

                              default:
                                return null
                            }
                          })}
                        </div>
                      </div>

                      {/* RENDERING WIDGET INTERAKTIF SESUAI URUTAN REORDER */}
                      {blockSequence.map((blockKey) => {
                        switch (blockKey) {
                          case "breathing":
                            return activeIntervention.has_breathing_visualizer ? (
                              <MindfulBreathingVisualizer key={blockKey} />
                            ) : null

                          case "habit_tracker":
                            return activeIntervention.has_habit_tracker ? (
                              <DailyHabitTrackerCard
                                key={blockKey}
                                slogan={activeIntervention.slogan || "Satu Langkah, Tetap Melangkah"}
                                characterStrength={
                                  activeIntervention.character_strength ||
                                  activeIntervention.characterStrength ||
                                  "Ketekunan (Perseverance)"
                                }
                              />
                            ) : null

                          case "gratitude_journal":
                            return (
                              activeIntervention.has_gratitude_journal ||
                              activeIntervention.title?.toLowerCase().includes("jurnal syukur") ||
                              activeIntervention.title?.toLowerCase().includes("gratitude") ||
                              activeIntervention.subtitle?.toLowerCase().includes("jurnal syukur")
                            ) ? (
                              <GratitudeJournalCard key={blockKey} />
                            ) : null

                          case "smart_goal":
                            return activeIntervention.has_smart_goal ? (
                              <SmartGoalCard key={blockKey} />
                            ) : null

                          case "self_checkin":
                            return activeIntervention.has_self_checkin ? (
                              <SelfCheckinCard key={blockKey} />
                            ) : null

                          default:
                            return null
                        }
                      })}

                      {/* Flow Stepper Bottom Navigation Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-purple-100 shadow-md">
                        <button
                          onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                          disabled={activeIndex === 0}
                          className="px-5 py-3 rounded-2xl bg-[#FAF8F5] hover:bg-purple-50 text-[#2a1845] text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-purple-100 cursor-pointer"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Sesi Sebelumnya</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {activeIndex < interventions.length - 1 ? (
                            <button
                              onClick={() => setActiveIndex((prev) => Math.min(interventions.length - 1, prev + 1))}
                              className="px-6 py-3 rounded-2xl bg-[#7c4fd4] hover:bg-[#683cb8] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <span>Lanjut ke Sesi {activeIndex + 2}</span>
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <a
                              href="#jurnal-refleksi"
                              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <PenTool className="h-4 w-4" />
                              <span>Lanjut Isi Jurnal Refleksi</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Interactive Journal Reflection Form */}
                      <div id="jurnal-refleksi" className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-900/5 space-y-6">
                        <div className="flex items-center gap-3 border-b border-purple-50 pb-4">
                          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#7c4fd4] flex items-center justify-center shrink-0">
                            <PenTool className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl font-bold text-[#2a1845]">
                              {activeIntervention.reflection_title || `Refleksi Aktivitas Sesi ${activeIndex + 1}`}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {activeIntervention.reflection_subtitle || "Tuliskan pengalaman dan jawaban refleksi Anda secara jujur dan mendalam."}
                            </p>
                          </div>
                        </div>

                        {/* Slogan Banner - HANYA jika has_slogan_banner diaktifkan oleh Admin */}
                        {activeIntervention.has_slogan_banner && (activeIntervention.slogan || activeIntervention.character_strength) && (
                          <div className="p-5 rounded-2xl bg-purple-200/60 border border-purple-300 text-center space-y-1 shadow-xs">
                            {activeIntervention.slogan && (
                              <h4 className="font-serif font-bold text-[#2a1845] text-base">
                                &quot;{activeIntervention.slogan.trim().replace(/^["'“«]+|["'”»]+$/g, "")}&quot;
                              </h4>
                            )}
                            {activeIntervention.character_strength && (
                              <p className="text-xs text-[#2a1845]/80 italic">
                                {activeIntervention.character_strength}
                              </p>
                            )}
                          </div>
                        )}

                        {submitted ? (
                          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                            <h4 className="font-bold text-sm">Jurnal Refleksi Berhasil Terkirim!</h4>
                            <p className="text-xs mt-1">Terima kasih telah berbagi refleksi Anda. Catatan ini tersimpan secara aman di database.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleSendJournal} className="space-y-6">
                            {/* Input Nama Peserta - HANYA jika has_participant_name diaktifkan oleh Admin */}
                            {activeIntervention.has_participant_name !== false && (
                              <div>
                                <label className="block text-xs font-bold text-[#2a1845] mb-1.5">Nama / Identitas Peserta</label>
                                <input
                                  type="text"
                                  required
                                  value={participantName}
                                  onChange={(e) => setParticipantName(e.target.value)}
                                  placeholder="Masukkan nama Anda..."
                                  className="w-full px-4 py-3 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
                                />
                              </div>
                            )}

                            {/* Custom Dynamic Questions or Fallback Single Input */}
                            {currentQuestions.length > 0 ? (
                              <div className="space-y-5">
                                {currentQuestions.map((qItem, qIdx) => (
                                  <div key={qIdx} className="space-y-1.5">
                                    {qItem.title && (
                                      <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider block">
                                        {qItem.title}
                                      </span>
                                    )}
                                    <label className="block text-xs font-bold text-[#2a1845] leading-relaxed">
                                      {qItem.question}
                                    </label>
                                    <textarea
                                      required
                                      rows={3}
                                      value={reflectionAnswers[qIdx] || ""}
                                      onChange={(e) =>
                                        setReflectionAnswers({
                                          ...reflectionAnswers,
                                          [qIdx]: e.target.value,
                                        })
                                      }
                                      placeholder="Tuliskan jawaban refleksi Anda di sini..."
                                      className="w-full px-4 py-3 rounded-2xl border border-purple-200 bg-white text-xs outline-none focus:border-[#7c4fd4] resize-none shadow-xs"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <label className="block text-xs font-bold text-[#2a1845] mb-1.5">Catatan Refleksi Mandiri</label>
                                <textarea
                                  required
                                  rows={4}
                                  value={journalText}
                                  onChange={(e) => setJournalText(e.target.value)}
                                  placeholder="Apa yang Anda pelajari, rasakan, atau sadari setelah menyelesaikan sesi ini?"
                                  className="w-full px-4 py-3 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4] resize-none"
                                />
                              </div>
                            )}

                            <button
                              type="submit"
                              disabled={submitting}
                              className="px-6 py-3 rounded-2xl bg-[#7c4fd4] hover:bg-[#683cb8] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                              <span>Kirim Jurnal Refleksi</span>
                            </button>
                          </form>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </>
        ) : (
          <section className="relative px-6 py-16">
            <div className="mx-auto max-w-xl text-center bg-white rounded-3xl p-8 border border-purple-100 shadow-sm my-8">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7c4fd4] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2a1845]">Sesi Latihan Belum Tersedia</h3>
              <p className="text-xs text-foreground/70 mt-2 max-w-md mx-auto leading-relaxed">
                Sesi latihan dan materi intervensi untuk pertemuan ini sedang disiapkan oleh tim peneliti. Silakan kembali lagi beberapa saat lagi.
              </p>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
