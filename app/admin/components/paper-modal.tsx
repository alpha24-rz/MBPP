"use client"

import { useState } from "react"
import { X, Upload, FileText, Loader2 } from "lucide-react"
import { BADGE_COLOR_PRESETS } from "./constants"

interface PaperModalProps {
  isOpen: boolean
  onClose: () => void
  editingPaper: any | null
  form: {
    title: string
    authors: string
    journal: string
    year: string
    badge: string
    badge_color: string
    doi: string
    download_url: string
    desc_text: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string
      authors: string
      journal: string
      year: string
      badge: string
      badge_color: string
      doi: string
      download_url: string
      desc_text: string
    }>
  >
  onSave: (e: React.FormEvent) => void
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => Promise<void>
}

export function PaperModal({
  isOpen,
  onClose,
  editingPaper,
  form,
  setForm,
  onSave,
  handlePdfUpload,
}: PaperModalProps) {
  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    try {
      await handlePdfUpload(e, (url) => setForm((prev) => ({ ...prev, download_url: url })))
    } catch (err: any) {
      alert(err.message || "Gagal mengupload file PDF.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-purple-100 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground hover:bg-purple-50 rounded-full transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="text-lg font-serif font-bold text-[#2a1845] mb-1">
          {editingPaper ? "Edit Publikasi Riset" : "Tambah Publikasi Riset Baru"}
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Isi metadata naskah artikel ilmiah atau jurnal riset MBPP.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Judul Riset / Publikasi</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="mis. Efektivitas Intervensi Psikoedukasi MBPP..."
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Penulis (Authors)</label>
              <input
                type="text"
                value={form.authors}
                onChange={(e) => setForm({ ...form, authors: e.target.value })}
                placeholder="mis. Tim Peneliti MBPP 2026"
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Nama Jurnal / Penerbit</label>
              <input
                type="text"
                value={form.journal}
                onChange={(e) => setForm({ ...form, journal: e.target.value })}
                placeholder="mis. Jurnal Psikologi Intervensi Indonesia"
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Tahun Publikasi</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2026"
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Teks Badge / Label</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="mis. Publikasi RCT 2026"
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Warna Badge</label>
              <select
                value={form.badge_color}
                onChange={(e) => setForm({ ...form, badge_color: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              >
                {BADGE_COLOR_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">DOI Link (Opsional)</label>
            <input
              type="text"
              value={form.doi}
              onChange={(e) => setForm({ ...form, doi: e.target.value })}
              placeholder="https://doi.org/10.1016/..."
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Abstrak / Ringkasan Penelitian</label>
            <textarea
              rows={3}
              value={form.desc_text}
              onChange={(e) => setForm({ ...form, desc_text: e.target.value })}
              placeholder="Jelaskan ringkasan temuan atau ruang lingkup publikasi..."
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          {/* PDF Upload / Link Input */}
          <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-purple-100">
            <label className="block text-xs font-bold text-[#2a1845]">File PDF Naskah / Link Unduhan</label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={form.download_url}
                onChange={(e) => setForm({ ...form, download_url: e.target.value })}
                placeholder="URL File PDF (mis. /downloads/naskah.pdf atau http://...)"
                className="flex-1 px-4 py-2 rounded-xl border border-purple-100 bg-white text-xs outline-none focus:border-[#7c4fd4]"
              />

              <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0">
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                <span>{uploading ? "Uploading..." : "Upload PDF"}</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  disabled={uploading}
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {form.download_url && (
              <p className="text-[11px] text-emerald-600 font-mono truncate flex items-center gap-1">
                <FileText className="h-3 w-3 shrink-0" />
                <span>Selected: {form.download_url}</span>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-purple-100 text-xs font-bold text-[#2a1845]/70 hover:bg-purple-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              Simpan Riset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
