"use client"

import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Download, FileText } from "lucide-react"
import { fadeInUp } from "./constants"

interface DownloadsViewProps {
  downloads: any[]
  onAddDownload: () => void
  onEditDownload: (dl: any) => void
  onDeleteDownload: (id: number) => void
}

export function DownloadsView({
  downloads,
  onAddDownload,
  onEditDownload,
  onDeleteDownload,
}: DownloadsViewProps) {
  return (
    <motion.div key="downloads" variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Download className="h-5 w-5 text-[#B08D57]" />
            <h2 className="text-xl font-serif font-bold text-[#2a1845]">Bahan Unduhan PDF & Modul</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Kelola modul intervensi, panduan latihan mandiri, jurnal syukur PDF, dan lembar observasi.
          </p>
        </div>

        <button
          onClick={onAddDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah PDF Baru</span>
        </button>
      </div>

      {/* Downloads List */}
      {downloads.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-purple-100 text-center space-y-3">
          <Download className="h-10 w-10 text-purple-300 mx-auto" />
          <h3 className="text-sm font-bold text-[#2a1845]">Belum ada bahan unduhan PDF</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Klik &quot;Tambah PDF Baru&quot; untuk menambahkan dokumen modul atau panduan unduhan.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((dl) => {
            const title = dl.title || dl.name || "Dokumen PDF"
            const url = dl.download_url || dl.url || "#"
            return (
              <div
                key={dl.id}
                className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-[#7c4fd4] border border-purple-100 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2a1845]">{title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {dl.type || "PDF Document"} {dl.size ? `• ${dl.size}` : ""}
                    </p>
                    {dl.desc_text && (
                      <p className="text-[11px] text-foreground/70 mt-1">{dl.desc_text}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {url !== "#" && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-purple-100 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                      title="Lihat / Download File PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => onEditDownload(dl)}
                    className="p-2 rounded-xl border border-purple-100 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                    title="Edit Detail PDF"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteDownload(dl.id)}
                    className="p-2 rounded-xl border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus PDF"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
