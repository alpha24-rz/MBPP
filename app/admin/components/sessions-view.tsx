"use client"

import { motion } from "framer-motion"
import { Plus, Edit3, Trash2 } from "lucide-react"
import { fadeInUp } from "./constants"

interface SessionsViewProps {
  interventions: any[]
  pertemuan: any[]
  onAddSesi: () => void
  onEditSesi: (s: any) => void
  onDeleteSesi: (id: number) => void
}

export function SessionsView({
  interventions,
  pertemuan,
  onAddSesi,
  onEditSesi,
  onDeleteSesi,
}: SessionsViewProps) {
  return (
    <motion.div key="sessions" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2a1845]">Daftar Sesi Konten (Level 3)</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Sesi memuat materi, instruksi, audio instrumen, dan video guide.</p>
        </div>
        <button
          onClick={onAddSesi}
          className="px-4 py-2 rounded-2xl bg-[#7c4fd4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#683cb8] transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah Sesi Konten
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {interventions.map((s, idx) => {
          const parentP = pertemuan.find((p) => Number(p.id) === Number(s.pertemuan_id))

          return (
            <div key={s.id} className="bg-white p-5 rounded-3xl border border-purple-100 flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold bg-purple-100 text-[#7c4fd4] px-2.5 py-0.5 rounded-full uppercase">
                    {parentP ? parentP.pertemuan_number : `Pertemuan #${s.pertemuan_id || 1}`}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground">Sesi #{idx + 1}</span>
                  {s.audio_url && <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">🎧 Audio Guide</span>}
                  {s.video_url && <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">🎥 Video Guide</span>}
                </div>

                <h4 className="text-sm font-bold text-[#2a1845]">{s.title}</h4>
                <p className="text-xs text-foreground/80 leading-relaxed bg-[#FAF8F5] p-3 rounded-2xl border border-purple-50">{s.desc_text}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEditSesi(s)}
                  className="p-2 border border-purple-100 rounded-xl text-[#7c4fd4] cursor-pointer hover:bg-purple-50 transition-colors"
                  title="Edit Sesi"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteSesi(s.id)}
                  className="p-2 border border-red-100 rounded-xl text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
                  title="Hapus Sesi"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
