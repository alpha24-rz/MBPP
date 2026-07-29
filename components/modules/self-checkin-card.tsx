"use client"

import { useState } from "react"
import { CheckCircle2, Sparkles, Send, Award } from "lucide-react"

export function SelfCheckinCard() {
  const statements = [
    "Saya lebih sadar akan napas dan tubuh saya.",
    "Saya mampu berhenti sejenak sebelum bereaksi.",
    "Saya lebih berbelas kasih terhadap diri sendiri.",
    "Saya merasa lebih bersyukur setiap hari.",
    "Saya memiliki tujuan yang jelas untuk latihan mindfulness.",
    "Saya merasa lebih tenang dibanding sebelumnya.",
    "Saya mampu mengenali perilaku automatic pilot.",
    "Saya lebih sering hadir sepenuhnya dalam aktivitas.",
  ]

  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (index: number, score: number) => {
    setRatings((prev) => ({
      ...prev,
      [index]: score,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
    }, 4000)
  }

  const answeredCount = Object.keys(ratings).length
  const totalScore = Object.values(ratings).reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="w-full rounded-3xl bg-white border border-purple-100 p-6 shadow-xl shadow-purple-900/5 my-6">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-[#2a1845] to-indigo-900 text-white mb-6 shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5c6d0] bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-white/10">
              Aktivitas 4: Evaluasi Keberlanjutan
            </span>
            <h4 className="font-serif text-lg font-bold text-white leading-snug">
              Cek Diri Mandiri (Self Check-In)
            </h4>
            <p className="text-xs text-purple-200/90 mt-1 italic">
              Berikan penilaian 1-5 untuk setiap pernyataan berikut (1 = Sangat Tidak Setuju, 5 = Sangat Setuju)
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#f5c6d0] shrink-0 border border-white/10">
            <Award className="h-5 w-5" />
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <h4 className="font-bold text-sm">Self Check-In Berhasil Disimpan!</h4>
          <p className="text-xs mt-1">Total Skor Kesadaran Diri Anda: <strong>{totalScore} / 40</strong></p>
          <p className="text-xs text-emerald-700/80 mt-1">Terima kasih telah melakukan evaluasi perjalanan mindful ini secara jujur.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#7c4fd4] bg-purple-50 p-3 rounded-2xl border border-purple-100">
            <span>Progress Pengisian: {answeredCount} / {statements.length} Pernyataan</span>
            {answeredCount > 0 && <span>Skor Sementara: {totalScore} Poin</span>}
          </div>

          <div className="space-y-3">
            {statements.map((stmt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs font-semibold text-[#2a1845] flex-1">
                  <span className="text-[#7c4fd4] font-bold mr-2">{idx + 1}.</span>
                  {stmt}
                </p>
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleRating(idx, score)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        ratings[idx] === score
                          ? "bg-[#7c4fd4] text-white border-[#7c4fd4] shadow-md scale-105"
                          : "bg-white text-[#2a1845]/70 border-purple-100 hover:bg-purple-50"
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={answeredCount < statements.length}
            className="w-full py-3.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683cb8] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            <span>Simpan Hasil Self Check-In Saya</span>
          </button>
        </form>
      )}
    </div>
  )
}
