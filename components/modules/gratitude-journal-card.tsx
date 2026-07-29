"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Calendar, Bookmark, Save, Lock, Clock } from "lucide-react"

interface DayGratitudeEntry {
  goodThing: string
  whyHappened: string
  meaning: string
  whatCanDoAgain: string
  savedAt?: string
}

export function GratitudeJournalCard({
  title = "Mengenal Gratitude dan Jurnal Syukur Harian",
  subtitle = "Gratitude merupakan ungkapan rasa syukur harian untuk memperkuat daya tahan emosional dan kesehatan mental.",
  totalDays = 31,
}: {
  title?: string
  subtitle?: string
  totalDays?: number
}) {
  // Real life start date (default to today if first time check-in)
  const [startDateStr, setStartDateStr] = useState<string>("")
  const [entries, setEntries] = useState<Record<number, DayGratitudeEntry>>({})
  const [activeDay, setActiveDay] = useState<number>(1)
  const [savedDayNotice, setSavedDayNotice] = useState<number | null>(null)

  // Initialize start date and entries from localStorage on client side
  useEffect(() => {
    try {
      const storedStartDate = localStorage.getItem("mbpp_gratitude_start_date")
      const todayIso = new Date().toISOString().split("T")[0]

      if (storedStartDate) {
        setStartDateStr(storedStartDate)
      } else {
        localStorage.setItem("mbpp_gratitude_start_date", todayIso)
        setStartDateStr(todayIso)
      }

      const storedEntries = localStorage.getItem("mbpp_gratitude_entries")
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries))
      }
    } catch (e) {
      console.log("Local storage error:", e)
    }
  }, [])

  // Calculate current unlocked day based on real life dates
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  const startDate = startDateStr ? new Date(startDateStr) : new Date()
  startDate.setHours(0, 0, 0, 0)

  const diffTime = Math.max(0, todayDate.getTime() - startDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const unlockedDay = Math.min(totalDays, Math.max(1, diffDays + 1))

  // Set initial active day to today's real-life unlocked day once calculated
  useEffect(() => {
    setActiveDay(unlockedDay)
  }, [unlockedDay])

  // Helper date calculator for Day X
  const getCalendarDateForDay = (dayNum: number): string => {
    const d = new Date(startDate)
    d.setDate(d.getDate() + (dayNum - 1))
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const currentEntry: DayGratitudeEntry = entries[activeDay] || {
    goodThing: "",
    whyHappened: "",
    meaning: "",
    whatCanDoAgain: "",
  }

  const handleFieldChange = (field: keyof DayGratitudeEntry, value: string) => {
    const updated = {
      ...entries,
      [activeDay]: {
        ...(entries[activeDay] || { goodThing: "", whyHappened: "", meaning: "", whatCanDoAgain: "" }),
        [field]: value,
      },
    }
    setEntries(updated)
  }

  const handleSaveCurrentDay = () => {
    const nowIso = new Date().toLocaleString("id-ID")
    const updated = {
      ...entries,
      [activeDay]: {
        ...(entries[activeDay] || { goodThing: "", whyHappened: "", meaning: "", whatCanDoAgain: "" }),
        savedAt: nowIso,
      },
    }
    setEntries(updated)

    try {
      localStorage.setItem("mbpp_gratitude_entries", JSON.stringify(updated))
    } catch (e) {
      console.log("Error saving to local storage:", e)
    }

    setSavedDayNotice(activeDay)
    setTimeout(() => {
      setSavedDayNotice(null)
    }, 3000)
  }

  // Count filled days
  const filledDaysCount = Object.keys(entries).filter((dayKey) => {
    const e = entries[Number(dayKey)]
    return e && (e.goodThing.trim() || e.whyHappened.trim() || e.meaning.trim() || e.whatCanDoAgain.trim())
  }).length

  const progressPercent = Math.round((filledDaysCount / totalDays) * 100)

  const isDayLocked = (dayNum: number) => dayNum > unlockedDay
  const isTodayActive = activeDay === unlockedDay

  return (
    <div className="w-full rounded-3xl bg-white border border-pink-100 p-6 md:p-8 shadow-xl shadow-pink-900/5 my-6 space-y-6">
      {/* Header Title Section */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
          <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
          <span>Jurnal Syukur 31 Hari — Daily Check-In</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2a1845] leading-tight">
          {title}
        </h3>
        <div className="w-16 h-1 bg-pink-400 rounded-full mx-auto mt-1" />
      </div>

      {/* Pink Highlight Banner */}
      <div className="p-5 rounded-2xl bg-pink-100/70 border border-pink-200 text-center space-y-1 shadow-xs">
        <h4 className="font-serif font-bold text-[#2a1845] text-base">
          Gratitude merupakan
        </h4>
        <p className="text-xs text-[#2a1845]/80 italic max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Progress & Real Life Date Status Bar */}
      <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-pink-100">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#2a1845]">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-pink-600 animate-pulse" />
            <span>Check-In Hari Ini: Hari {unlockedDay} ({getCalendarDateForDay(unlockedDay)})</span>
          </span>
          <span className="text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full text-[11px]">
            {filledDaysCount} dari {totalDays} Hari Selesai ({progressPercent}%)
          </span>
        </div>

        {/* Real-Life Day Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-purple-scrollbar pb-2 pt-1">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNum) => {
            const locked = isDayLocked(dayNum)
            const isFilled = Boolean(
              entries[dayNum] &&
                (entries[dayNum].goodThing.trim() ||
                  entries[dayNum].whyHappened.trim() ||
                  entries[dayNum].meaning.trim() ||
                  entries[dayNum].whatCanDoAgain.trim())
            )
            const isActive = activeDay === dayNum
            const isToday = dayNum === unlockedDay

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => {
                  if (!locked) setActiveDay(dayNum)
                }}
                disabled={locked}
                className={`min-w-[50px] h-10 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer shrink-0 border relative ${
                  isActive
                    ? "bg-pink-600 text-white shadow-md border-pink-600 scale-105"
                    : locked
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                    : isToday
                    ? "bg-pink-100 text-pink-700 border-pink-300 ring-2 ring-pink-400/50"
                    : isFilled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-gray-600 hover:bg-pink-50 border-gray-200"
                }`}
                title={locked ? `Terkunci — Buka tanggal ${getCalendarDateForDay(dayNum)}` : `Hari ${dayNum} (${getCalendarDateForDay(dayNum)})`}
              >
                <div className="flex items-center gap-0.5 text-[11px]">
                  <span>H{dayNum}</span>
                  {locked && <Lock className="h-2.5 w-2.5" />}
                  {isFilled && !locked && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />}
                </div>
                <span className="text-[8px] opacity-75 font-normal">
                  {getCalendarDateForDay(dayNum).split(" ")[0]} {getCalendarDateForDay(dayNum).split(" ")[1]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Day Journal Form Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl border border-pink-200 bg-white p-6 shadow-md space-y-5"
        >
          {/* Day Card Header */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 fill-pink-500 text-pink-500" />
              <div>
                <h4 className="font-serif text-xl font-bold text-pink-600 flex items-center gap-2">
                  <span>Hari {activeDay}</span>
                  {isTodayActive && (
                    <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Check-In Hari Ini
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {getCalendarDateForDay(activeDay)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeDay === 1}
                onClick={() => setActiveDay((prev) => Math.max(1, prev - 1))}
                className="p-1.5 rounded-xl border border-pink-100 bg-[#FAF8F5] text-pink-700 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Hari Sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold text-[#2a1845]">
                {activeDay} / {totalDays}
              </span>
              <button
                type="button"
                disabled={activeDay >= unlockedDay}
                onClick={() => setActiveDay((prev) => Math.min(unlockedDay, prev + 1))}
                className="p-1.5 rounded-xl border border-pink-100 bg-[#FAF8F5] text-pink-700 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title={activeDay >= unlockedDay ? "Hari berikutnya belum terbuka (Buka besok)" : "Hari Berikutnya"}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Locked Notice if day is locked */}
          {isDayLocked(activeDay) ? (
            <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
              <Lock className="h-8 w-8 text-gray-400 mx-auto" />
              <h5 className="font-bold text-sm text-[#2a1845]">Hari {activeDay} Masih Terkunci</h5>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Latihan jurnal syukur ini dirancang untuk dilakukan 1 hari sekali sesuai tanggal kalender real-life. Sesi Hari {activeDay} akan terbuka pada tanggal **{getCalendarDateForDay(activeDay)}**.
              </p>
            </div>
          ) : (
            /* 4 Standard Gratitude Reflection Prompts */
            <div className="space-y-4">
              {/* 1. Hal baik hari ini */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2a1845]">
                  Hal baik hari ini:
                </label>
                <textarea
                  rows={2}
                  value={currentEntry.goodThing}
                  onChange={(e) => handleFieldChange("goodThing", e.target.value)}
                  placeholder="Tuliskan pengalaman menyenangkan atau hal positif kecil yang kamu alami hari ini..."
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 bg-[#FAF8F5] text-xs text-[#2a1845] outline-none focus:border-pink-500 focus:bg-white resize-none shadow-xs transition-all"
                />
              </div>

              {/* 2. Mengapa itu terjadi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2a1845]">
                  Mengapa itu terjadi:
                </label>
                <textarea
                  rows={2}
                  value={currentEntry.whyHappened}
                  onChange={(e) => handleFieldChange("whyHappened", e.target.value)}
                  placeholder="Alasan atau faktor yang membuat hal baik tersebut terjadi..."
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 bg-[#FAF8F5] text-xs text-[#2a1845] outline-none focus:border-pink-500 focus:bg-white resize-none shadow-xs transition-all"
                />
              </div>

              {/* 3. Apa maknanya bagiku */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2a1845]">
                  Apa maknanya bagiku:
                </label>
                <textarea
                  rows={2}
                  value={currentEntry.meaning}
                  onChange={(e) => handleFieldChange("meaning", e.target.value)}
                  placeholder="Arti penting atau pelajaran emosional yang kamu dapatkan..."
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 bg-[#FAF8F5] text-xs text-[#2a1845] outline-none focus:border-pink-500 focus:bg-white resize-none shadow-xs transition-all"
                />
              </div>

              {/* 4. Apa yang bisa kulakukan lagi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2a1845]">
                  Apa yang bisa kulakukan lagi:
                </label>
                <textarea
                  rows={2}
                  value={currentEntry.whatCanDoAgain}
                  onChange={(e) => handleFieldChange("whatCanDoAgain", e.target.value)}
                  placeholder="Langkah atau tindakan sederhana yang ingin kamu ulangi di esok hari..."
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 bg-[#FAF8F5] text-xs text-[#2a1845] outline-none focus:border-pink-500 focus:bg-white resize-none shadow-xs transition-all"
                />
              </div>
            </div>
          )}

          {/* Action Bar */}
          {!isDayLocked(activeDay) && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-pink-100">
              {savedDayNotice === activeDay ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="h-4 w-4" /> Check-In Hari {activeDay} ({getCalendarDateForDay(activeDay)}) Berhasil Tersimpan!
                </span>
              ) : currentEntry.savedAt ? (
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Terakhir disimpan: {currentEntry.savedAt}
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground">
                  Isi 4 bidang refleksi di atas lalu klik &quot;Simpan Check-In Hari {activeDay}&quot;.
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCurrentDay}
                  className="px-5 py-2.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Simpan Check-In Hari {activeDay}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
