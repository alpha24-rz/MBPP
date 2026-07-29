"use client"

import { motion } from "framer-motion"
import { Plus, Edit3, Trash2 } from "lucide-react"
import { fadeInUp } from "./constants"

interface PertemuanViewProps {
  pertemuan: any[]
  modules: any[]
  interventions: any[]
  onAddPertemuan: () => void
  onEditPertemuan: (p: any) => void
  onDeletePertemuan: (id: number) => void
  onAddSesi: (pertemuanId: string) => void
  onEditSesi: (s: any) => void
  onDeleteSesi: (id: number) => void
}

export function PertemuanView({
  pertemuan,
  modules,
  interventions,
  onAddPertemuan,
  onEditPertemuan,
  onDeletePertemuan,
  onAddSesi,
  onEditSesi,
  onDeleteSesi,
}: PertemuanViewProps) {
  return (
    <motion.div key="pertemuan" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2a1845]">Daftar Pertemuan Tatap Muka (Level 2)</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Pertemuan memuat sesi-sesi latihan & psikoedukasi.</p>
        </div>
        <button
          onClick={onAddPertemuan}
          className="px-4 py-2 rounded-2xl bg-[#7c4fd4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#683cb8] transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah Pertemuan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pertemuan.map((p) => {
          const parentMod = modules.find((m) => Number(m.id) === Number(p.module_id))
          const pSesiList = interventions.filter((s) => Number(s.pertemuan_id) === Number(p.id))

          return (
            <div key={p.id} className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-purple-100 text-[#7c4fd4] px-2.5 py-0.5 rounded-full uppercase">
                      {p.pertemuan_number}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Modul: {parentMod ? parentMod.title : `Modul #${p.module_id}`}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2a1845] mt-1">{p.title}</h3>
                  <p className="text-xs font-semibold text-[#7c4fd4]/80 italic">{p.subtitle}</p>
                  <p className="text-xs text-foreground/75 mt-1">{p.desc_text}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onAddSesi(String(p.id))}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#7c4fd4] border border-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-purple-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Tambah Sesi
                  </button>
                  <button
                    onClick={() => onEditPertemuan(p)}
                    className="p-2 border border-purple-100 rounded-xl text-[#7c4fd4] cursor-pointer hover:bg-purple-50 transition-colors"
                    title="Edit Pertemuan"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeletePertemuan(p.id)}
                    className="p-2 border border-red-100 rounded-xl text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
                    title="Hapus Pertemuan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* List Sesi inside Pertemuan */}
              <div className="pt-3 border-t border-purple-50">
                <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-2">
                  Sesi Konten Terdaftar ({pSesiList.length})
                </h4>
                {pSesiList.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">Belum ada sesi di dalam pertemuan ini.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pSesiList.map((s, idx) => (
                      <div key={s.id} className="p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-[#7c4fd4]">Sesi {idx + 1}</span>
                          <h5 className="text-xs font-bold text-[#2a1845]">{s.title}</h5>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onEditSesi(s)}
                            className="p-1 text-[#7c4fd4] hover:bg-purple-100 rounded transition-colors cursor-pointer"
                            title="Edit Sesi"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => onDeleteSesi(s.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors cursor-pointer"
                            title="Hapus Sesi"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
