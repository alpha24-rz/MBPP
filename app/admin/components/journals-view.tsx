"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "./constants"

interface JournalsViewProps {
  journals: any[]
}

export function JournalsView({ journals }: JournalsViewProps) {
  return (
    <motion.div key="journals" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2a1845]">Jurnal Refleksi Peserta</h2>
          <p className="text-xs text-muted-foreground mt-1">Respon refleksi yang dikirimkan siswa pada tiap sesi.</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-2xl bg-purple-50 text-[#7c4fd4] text-xs font-bold">Total: {journals.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {journals.map((j) => (
          <div key={j.id} className="bg-white p-5 rounded-3xl border border-purple-100 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-[#2a1845]">{j.participant_name}</h4>
              <span className="text-[10px] text-muted-foreground">{j.intervention_title}</span>
            </div>
            <p className="text-xs italic bg-[#FAF8F5] p-3 rounded-2xl border border-purple-50">&quot;{j.journal_text}&quot;</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
