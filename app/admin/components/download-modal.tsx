"use client"

import { useState } from "react"
import { X, Upload, FileText, Loader2 } from "lucide-react"

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  editingDownload: any | null
  form: {
    title: string
    type: string
    size: string
    download_url: string
    desc_text: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string
      type: string
      size: string
      download_url: string
      desc_text: string
    }>
  >
  onSave: (e: React.FormEvent) => void
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => Promise<void>
}

const PRESET_TYPES = [
  "Modul Intervensi Utama",
  "Panduan Latihan Mandiri",
  "Instrumen Observer",
  "Skala Asesmen Psikologi",
  "PDF Document",
]

export function DownloadModal({
  isOpen,
  onClose,
  editingDownload,
  form,
  setForm,
  onSave,
  handlePdfUpload,
}: DownloadModalProps) {
  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Auto compute file size formatting e.g. "3.2 MB"
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB"
      setForm((prev) => ({ ...prev, size: sizeMB }))

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
          {editingDownload ? "Edit Bahan Unduhan PDF" : "Tambah Bahan Unduhan PDF Baru"}
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Isi detail file PDF modul, jurnal, atau instrumen penelitian.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Nama / Judul Dokumen PDF</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="mis. Modul Eksperimen MBPP Revisi 2026.pdf"
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Tipe / Kategori Dokumen</label>
              <input
                type="text"
                list="type-presets"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="mis. Modul Intervensi Utama"
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
              <datalist id="type-presets">
                {PRESET_TYPES.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Ukuran File (mis. 2.4 MB)</label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="mis. 2.4 MB"
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Keterangan Singkat Dokumen</label>
            <textarea
              rows={2}
              value={form.desc_text}
              onChange={(e) => setForm({ ...form, desc_text: e.target.value })}
              placeholder="Berikan penjelasan singkat isi file ini..."
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          {/* PDF Upload / Link Input */}
          <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-purple-100">
            <label className="block text-xs font-bold text-[#2a1845]">File PDF Unduhan</label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={form.download_url}
                onChange={(e) => setForm({ ...form, download_url: e.target.value })}
                placeholder="URL File PDF (mis. /downloads/Modul_MBPP.pdf atau http://...)"
                className="flex-1 px-4 py-2 rounded-xl border border-purple-100 bg-white text-xs outline-none focus:border-[#7c4fd4]"
              />

              <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0">
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                <span>{uploading ? "Uploading..." : "Upload File PDF"}</span>
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
              Simpan PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
