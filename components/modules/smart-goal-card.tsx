"use client"

import { useState } from "react"
import { Target, CheckCircle2, Sparkles, Send } from "lucide-react"

export function SmartGoalCard({
  title = "Menentukan Tujuan dengan Metode SMART",
  subtitle = "Tentukan satu tujuan latihan mindfulness-mu menggunakan metode SMART:",
}: {
  title?: string
  subtitle?: string
}) {
  const [specific, setSpecific] = useState("")
  const [measurable, setMeasurable] = useState("")
  const [achievable, setAchievable] = useState("")
  const [relevant, setRelevant] = useState("")
  const [timeBound, setTimeBound] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 4000)
  }

  return (
    <div className="w-full rounded-3xl bg-white border border-purple-100 p-6 shadow-xl shadow-purple-900/5 my-6">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-[#2a1845] to-indigo-900 text-white mb-6 shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5c6d0] bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-white/10">
              SMART Goal Setting
            </span>
            <h4 className="font-serif text-lg font-bold text-white leading-snug">
              {title}
            </h4>
            <p className="text-xs text-purple-200/90 mt-1 italic">
              {subtitle}
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#f5c6d0] shrink-0 border border-white/10">
            <Target className="h-5 w-5" />
          </div>
        </div>
      </div>

      {saved ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <h4 className="font-bold text-sm">Target SMART Berhasil Disimpan!</h4>
          <p className="text-xs mt-1">Komitmen tujuan latihan Anda telah tersimpan secara lokal dan siap untuk dipraktikkan.</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specific */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#7c4fd4] font-bold text-xs flex items-center justify-center">
                  S
                </span>
                <label className="text-xs font-bold text-[#2a1845]">Specific (Spesifik)</label>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">Apa tepatnya yang ingin kamu capai?</p>
              <input
                type="text"
                value={specific}
                onChange={(e) => setSpecific(e.target.value)}
                placeholder="Misal: Menulis jurnal sebelum membuka aplikasi AI..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-purple-100 text-xs font-medium outline-none focus:border-[#7c4fd4]"
              />
            </div>

            {/* Measurable */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#7c4fd4] font-bold text-xs flex items-center justify-center">
                  M
                </span>
                <label className="text-xs font-bold text-[#2a1845]">Measurable (Terukur)</label>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">Bagaimana kamu tahu sudah tercapai?</p>
              <input
                type="text"
                value={measurable}
                onChange={(e) => setMeasurable(e.target.value)}
                placeholder="Misal: Berhasil tercentang 5x seminggu di kalender..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-purple-100 text-xs font-medium outline-none focus:border-[#7c4fd4]"
              />
            </div>

            {/* Achievable */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#7c4fd4] font-bold text-xs flex items-center justify-center">
                  A
                </span>
                <label className="text-xs font-bold text-[#2a1845]">Achievable (Dapat Dicapai)</label>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">Apakah realistis dengan kondisimu?</p>
              <input
                type="text"
                value={achievable}
                onChange={(e) => setAchievable(e.target.value)}
                placeholder="Misal: Ya, cukup 5 menit setiap malam..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-purple-100 text-xs font-medium outline-none focus:border-[#7c4fd4]"
              />
            </div>

            {/* Relevant */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#7c4fd4] font-bold text-xs flex items-center justify-center">
                  R
                </span>
                <label className="text-xs font-bold text-[#2a1845]">Relevant (Relevan)</label>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">Mengapa ini penting untukmu?</p>
              <input
                type="text"
                value={relevant}
                onChange={(e) => setRelevant(e.target.value)}
                placeholder="Misal: Agar saya lebih sadar emosi & mandiri..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-purple-100 text-xs font-medium outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          {/* Time-Bound */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#7c4fd4] font-bold text-xs flex items-center justify-center">
                T
              </span>
              <label className="text-xs font-bold text-[#2a1845]">Time-Bound (Batas Waktu)</label>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2">Kapan target ini harus tercapai / dimulai?</p>
            <input
              type="text"
              value={timeBound}
              onChange={(e) => setTimeBound(e.target.value)}
              placeholder="Misal: Mulai malam ini selama 30 hari ke depan..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-purple-100 text-xs font-medium outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#7c4fd4] hover:bg-[#683cb8] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Simpan Target SMART Saya</span>
          </button>
        </form>
      )}
    </div>
  )
}
