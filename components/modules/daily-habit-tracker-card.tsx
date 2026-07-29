"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Sparkles, HeartHandshake } from "lucide-react"

export function DailyHabitTrackerCard({
  slogan = "Satu Langkah, Tetap Melangkah",
  characterStrength = "Ketekunan (Perseverance)",
}: {
  slogan?: string
  characterStrength?: string
}) {
  const days = [
    { id: "sen", label: "Sen" },
    { id: "sel", label: "Sel" },
    { id: "rab", label: "Rab" },
    { id: "kam", label: "Kam" },
    { id: "jum", label: "Jum" },
    { id: "sab", label: "Sab" },
    { id: "min", label: "Min" },
  ]

  const [checkedDays, setCheckedDays] = useState<Record<string, boolean>>({
    sen: true,
    sel: true,
  })

  const [dailyGoal, setDailyGoal] = useState("Menuliskan jurnal perasaan sebelum membuka aplikasi AI")

  const toggleDay = (dayId: string) => {
    setCheckedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }))
  }

  const completedCount = Object.values(checkedDays).filter(Boolean).length

  return (
    <div className="w-full rounded-3xl bg-white border border-purple-100 p-6 shadow-xl shadow-purple-900/5 my-6">
      {/* Slogan Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-[#2a1845] to-indigo-900 text-white mb-6 shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5c6d0] bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-white/10">
              Character Strength Slogan
            </span>
            <h4 className="font-serif text-lg font-bold text-white leading-snug">
              &quot;{slogan.trim().replace(/^["'“«]+|["'”»]+$/g, "")}&quot;
            </h4>
            <p className="text-xs text-purple-200/90 mt-1 italic">
              Penguatan Karakter: {characterStrength}
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#f5c6d0] shrink-0 border border-white/10">
            <HeartHandshake className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Habit Check-in Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#7c4fd4]" />
            <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider">
              Kalender Latihan Harian (Online Check-in)
            </h4>
          </div>
          <span className="text-xs font-bold text-[#7c4fd4] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            {completedCount} / 7 Hari Terlaksana
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#2a1845]/70 mb-1">
            Komitmen Tujuan Kecil Harian Anda:
          </label>
          <input
            type="text"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(e.target.value)}
            placeholder="Tuliskan tujuan harian sederhana..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 bg-[#FAF8F5] text-xs font-medium outline-none focus:border-[#7c4fd4]"
          />
        </div>

        {/* Days Checklist */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {days.map((day) => {
            const isChecked = checkedDays[day.id]
            return (
              <button
                key={day.id}
                onClick={() => toggleDay(day.id)}
                className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  isChecked
                    ? "bg-[#7c4fd4] text-white border-[#7c4fd4] shadow-md scale-105"
                    : "bg-[#FAF8F5] text-[#2a1845]/70 border-purple-100 hover:bg-purple-50"
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{day.label}</span>
                <CheckCircle className={`h-4 w-4 ${isChecked ? "text-[#f5c6d0]" : "text-gray-300"}`} />
              </button>
            )
          })}
        </div>

        <p className="text-[11px] text-muted-foreground italic text-center pt-1">
          <Sparkles className="h-3 w-3 inline mr-1 text-[#7c4fd4]" />
          Klik pada hari saat Anda berhasil melakukan komitmen harian.
        </p>
      </div>
    </div>
  )
}
