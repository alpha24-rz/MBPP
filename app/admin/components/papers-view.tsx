"use client"

import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, FileText, ExternalLink, Download } from "lucide-react"
import { fadeInUp } from "./constants"

interface PapersViewProps {
  papers: any[]
  onAddPaper: () => void
  onEditPaper: (paper: any) => void
  onDeletePaper: (id: number) => void
}

export function PapersView({ papers, onAddPaper, onEditPaper, onDeletePaper }: PapersViewProps) {
  return (
    <motion.div key="papers" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-[#B08D57]" />
            <h2 className="text-xl font-serif font-bold text-[#2a1845]">Publikasi Riset Utama</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Kelola naskah artikel ilmiah, publikasi hasil eksperimen RCT, dan jurnal internasional.
          </p>
        </div>

        <button
          onClick={onAddPaper}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Publikasi Riset</span>
        </button>
      </div>

      {/* Papers List */}
      {papers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-purple-100 text-center space-y-3">
          <FileText className="h-10 w-10 text-purple-300 mx-auto" />
          <h3 className="text-sm font-bold text-[#2a1845]">Belum ada publikasi riset</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Klik &quot;Tambah Publikasi Riset&quot; untuk menambahkan naskah penelitian atau jurnal ilmiah ke website.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {paper.badge && (
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md ${paper.badge_color || "bg-purple-100 text-purple-700 border border-purple-200"}`}>
                      {paper.badge}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#7c4fd4]">
                    {paper.journal || "Jurnal Ilmiah"} {paper.year ? `(${paper.year})` : ""}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#2a1845] leading-snug">{paper.title}</h3>
                <p className="text-xs text-muted-foreground">Penulis: {paper.authors}</p>

                {paper.desc_text && (
                  <p className="text-xs text-foreground/70 bg-[#FAF8F5] p-3 rounded-2xl border border-purple-50">
                    {paper.desc_text}
                  </p>
                )}

                <div className="flex items-center gap-4 pt-1 flex-wrap">
                  {paper.doi && (
                    <a
                      href={paper.doi.startsWith("http") ? paper.doi : `https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7c4fd4] hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>DOI: {paper.doi}</span>
                    </a>
                  )}

                  {paper.download_url && (
                    <a
                      href={paper.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      <span>File PDF Terlampir</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => onEditPaper(paper)}
                  className="p-2 rounded-xl border border-purple-100 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                  title="Edit Publikasi"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onDeletePaper(paper.id)}
                  className="p-2 rounded-xl border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Hapus Publikasi"
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
