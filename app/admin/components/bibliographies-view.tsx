"use client"

import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Quote, ExternalLink } from "lucide-react"
import { fadeInUp } from "./constants"

interface BibliographiesViewProps {
  bibliographies: any[]
  onAddBibliography: () => void
  onEditBibliography: (bib: any) => void
  onDeleteBibliography: (id: number) => void
}

export function BibliographiesView({
  bibliographies,
  onAddBibliography,
  onEditBibliography,
  onDeleteBibliography,
}: BibliographiesViewProps) {
  return (
    <motion.div key="bibliographies" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Quote className="h-5 w-5 text-[#B08D57]" />
            <h2 className="text-xl font-serif font-bold text-[#2a1845]">Daftar Pustaka & Sitasi (APA 7th Format)</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Kelola daftar referensi ilmiah, jurnal, dan rujukan akademis yang menjadi landasan MBPP.
          </p>
        </div>

        <button
          onClick={onAddBibliography}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Sitasi Baru</span>
        </button>
      </div>

      {/* Bibliographies List */}
      {bibliographies.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-purple-100 text-center space-y-3">
          <Quote className="h-10 w-10 text-purple-300 mx-auto" />
          <h3 className="text-sm font-bold text-[#2a1845]">Belum ada data sitasi</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Klik tombol &quot;Tambah Sitasi Baru&quot; untuk menambahkan referensi akademis ke halaman Resources.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bibliographies.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-md bg-[#5e35b8]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#5e35b8] border border-[#5e35b8]/15">
                    {item.category || "Umum"}
                  </span>
                  {item.tag && (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                      {item.tag}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#B08D57]">Urutan: #{item.order_index || 1}</span>
                </div>

                <p className="text-xs font-medium text-[#2a1845] leading-relaxed">
                  <span className="font-semibold text-[#2a1845]">{item.authors}</span> ({item.year}).{" "}
                  <span className="italic">{item.title}</span> {item.source}
                </p>

                {item.doi && (
                  <a
                    href={item.doi.startsWith("http") ? item.doi : `https://doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#7c4fd4] hover:underline"
                  >
                    <span>DOI Link: {item.doi}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => onEditBibliography(item)}
                  className="p-2 rounded-xl border border-purple-100 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                  title="Edit Sitasi"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onDeleteBibliography(item.id)}
                  className="p-2 rounded-xl border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Hapus Sitasi"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
