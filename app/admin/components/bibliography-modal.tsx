"use client"

import { X } from "lucide-react"

interface BibliographyModalProps {
  isOpen: boolean
  onClose: () => void
  editingBibliography: any | null
  form: {
    category: string
    authors: string
    year: string
    title: string
    source: string
    doi: string
    tag: string
    order_index: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      category: string
      authors: string
      year: string
      title: string
      source: string
      doi: string
      tag: string
      order_index: string
    }>
  >
  onSave: (e: React.FormEvent) => void
}

const PRESET_CATEGORIES = [
  "Mindfulness & Intervensi Psikoedukasi",
  "Ketergantungan AI & Cyberpsychology (AI Intimacy)",
  "Big Five Personality & Character Strengths",
  "Metodologi Eksperimen & Treatment Fidelity",
  "Umum & Referensi Akademis",
]

export function BibliographyModal({
  isOpen,
  onClose,
  editingBibliography,
  form,
  setForm,
  onSave,
}: BibliographyModalProps) {
  if (!isOpen) return null

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
          {editingBibliography ? "Edit Sitasi APA 7th" : "Tambah Sitasi APA 7th Baru"}
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Isi detail rujukan ilmiah yang akan ditampilkan pada tab Daftar Pustaka.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Kategori Referensi</label>
            <input
              type="text"
              list="category-presets"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Pilih atau ketik nama kategori..."
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
            <datalist id="category-presets">
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Penulis (Authors)</label>
              <input
                type="text"
                value={form.authors}
                onChange={(e) => setForm({ ...form, authors: e.target.value })}
                placeholder="mis. Güldal, S., & Satan, A."
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Tahun Terbit</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="mis. 2022"
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Judul Artikel / Buku</label>
            <textarea
              rows={2}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="mis. The effect of a mindfulness-based psychoeducation program..."
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Sumber / Nama Jurnal & Volume</label>
            <input
              type="text"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              placeholder="mis. Journal of Rational-Emotive & Cognitive-Behavior Therapy, 40(3), 512–531."
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Link DOI (Opsional)</label>
              <input
                type="text"
                value={form.doi}
                onChange={(e) => setForm({ ...form, doi: e.target.value })}
                placeholder="mis. https://doi.org/10.1007/..."
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2a1845] mb-1">Tag / Label Pendukung</label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="mis. Adaptasi Utama Intervensi MBPP"
                className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2a1845] mb-1">Order Index (Nomor Urut Tampil)</label>
            <input
              type="number"
              value={form.order_index}
              onChange={(e) => setForm({ ...form, order_index: e.target.value })}
              placeholder="1"
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
            />
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
              className="px-5 py-2.5 rounded-2xl bg-[#7c4fd4] hover:bg-[#683ab7] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Simpan Sitasi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
