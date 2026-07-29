"use client"

import { motion } from "framer-motion"
import { Plus, Edit3, Trash2, ArrowRight } from "lucide-react"
import { fadeInUp } from "./constants"
import { AdminViewType } from "./admin-tabs"

interface ModulesViewProps {
  modules: any[]
  pertemuan: any[]
  onAddModule: () => void
  onEditModule: (mod: any) => void
  onDeleteModule: (id: number) => void
  onAddPertemuan: (modId: string) => void
  onNavigateToSessions: (pertemuanId: string) => void
}

export function ModulesView({
  modules,
  pertemuan,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onAddPertemuan,
  onNavigateToSessions,
}: ModulesViewProps) {
  return (
    <motion.div key="modules" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2a1845]">Daftar Modul Utama (Level 1)</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Modul utama memayungi kumpulan pertemuan tatap muka.</p>
        </div>
        <button
          onClick={onAddModule}
          className="px-4 py-2 rounded-2xl bg-[#7c4fd4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#683cb8] transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah Modul Utama
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map((mod) => {
          const modPertemuanList = pertemuan.filter((p) => Number(p.module_id) === Number(mod.id))

          return (
            <div key={mod.id} className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#7c4fd4] uppercase bg-purple-100 px-3 py-1 rounded-full">
                    Modul ID #{mod.id}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2a1845] mt-1">{mod.title}</h3>
                  <p className="text-xs font-semibold text-[#7c4fd4]/80 italic">{mod.subtitle}</p>
                  <p className="text-xs text-foreground/75 mt-1">{mod.desc_text}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAddPertemuan(String(mod.id))}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#7c4fd4] border border-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-purple-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Tambah Pertemuan
                  </button>
                  <button
                    onClick={() => onEditModule(mod)}
                    className="p-2 border border-purple-100 rounded-xl text-[#7c4fd4] cursor-pointer hover:bg-purple-50 transition-colors"
                    title="Edit Modul"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteModule(mod.id)}
                    className="p-2 border border-red-100 rounded-xl text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
                    title="Hapus Modul"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* List Pertemuan inside Modul */}
              <div className="pt-3 border-t border-purple-50">
                <h4 className="text-xs font-bold text-[#2a1845] uppercase tracking-wider mb-2">
                  Pertemuan Di Dalam Modul Ini ({modPertemuanList.length})
                </h4>
                {modPertemuanList.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">Belum ada pertemuan terdaftar di modul ini.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modPertemuanList.map((p) => (
                      <div key={p.id} className="p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-[#7c4fd4]">{p.pertemuan_number}</span>
                          <h5 className="text-xs font-bold text-[#2a1845]">{p.title}</h5>
                        </div>
                        <button
                          onClick={() => onNavigateToSessions(String(p.id))}
                          className="text-[10px] font-bold text-[#7c4fd4] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          Kelola Sesi <ArrowRight className="h-3 w-3" />
                        </button>
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
