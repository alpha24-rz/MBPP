"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

interface PertemuanModalProps {
  isOpen: boolean
  onClose: () => void
  editingPertemuan: any
  pertemuanForm: {
    module_id: string
    pertemuan_number: string
    title: string
    subtitle: string
    desc_text: string
    duration: string
    sessions_count: string
    badge: string
    badge_color: string
    image_url: string
    order_index: string
  }
  setPertemuanForm: React.Dispatch<React.SetStateAction<any>>
  modules: any[]
  onSave: (e: React.FormEvent) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => void
}

export function PertemuanModal({
  isOpen,
  onClose,
  editingPertemuan,
  pertemuanForm,
  setPertemuanForm,
  modules,
  onSave,
  handleImageUpload,
}: PertemuanModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 relative my-8 max-h-[85vh] overflow-y-auto border border-purple-100 shadow-2xl space-y-4"
      >
        <div className="sticky top-0 bg-white pt-1 pb-3 border-b border-purple-100 flex items-center justify-between z-10">
          <h3 className="text-base font-serif font-bold text-[#2a1845]">
            {editingPertemuan ? "Edit Pertemuan" : "Buat Pertemuan Baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-[#2a1845] hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSave} className="space-y-3 text-xs">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Pilih Modul Pemilik</label>
            <select
              value={pertemuanForm.module_id}
              onChange={(e) => setPertemuanForm({ ...pertemuanForm, module_id: e.target.value })}
              className="rounded-xl border border-purple-200 p-2.5 font-bold"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#2a1845]">Nomor Pertemuan</label>
              <input
                type="text"
                required
                value={pertemuanForm.pertemuan_number}
                onChange={(e) => setPertemuanForm({ ...pertemuanForm, pertemuan_number: e.target.value })}
                placeholder="Pertemuan 01"
                className="rounded-xl border border-purple-200 p-2.5"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#2a1845]">Durasi</label>
              <input
                type="text"
                value={pertemuanForm.duration}
                onChange={(e) => setPertemuanForm({ ...pertemuanForm, duration: e.target.value })}
                placeholder="130 Menit"
                className="rounded-xl border border-purple-200 p-2.5"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Judul Utama Pertemuan</label>
            <input
              type="text"
              required
              value={pertemuanForm.title}
              onChange={(e) => setPertemuanForm({ ...pertemuanForm, title: e.target.value })}
              placeholder="Contoh: Menyapa Diri dan Menyadari Saat Ini"
              className="rounded-xl border border-purple-200 p-2.5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Sub-Judul & Character Strength</label>
            <input
              type="text"
              value={pertemuanForm.subtitle}
              onChange={(e) => setPertemuanForm({ ...pertemuanForm, subtitle: e.target.value })}
              placeholder="Mindfulness Napas & Tubuh • Character Strength: Ketekunan"
              className="rounded-xl border border-purple-200 p-2.5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Deskripsi Pertemuan</label>
            <textarea
              rows={3}
              value={pertemuanForm.desc_text}
              onChange={(e) => setPertemuanForm({ ...pertemuanForm, desc_text: e.target.value })}
              className="rounded-xl border border-purple-200 p-2.5 resize-none outline-none focus:border-[#7c4fd4]"
            />
          </div>

          {/* Upload Gambar Pertemuan */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100">
            <label className="font-bold text-[#2a1845] flex items-center justify-between">
              <span>Upload Gambar Pertemuan</span>
              <span className="text-[10px] text-muted-foreground font-normal">PNG, JPG, WEBP</span>
            </label>
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, (url) => setPertemuanForm({ ...pertemuanForm, image_url: url }))}
              className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#7c4fd4] hover:file:bg-purple-200 cursor-pointer"
            />

            {pertemuanForm.image_url && (
              <div className="mt-1.5 relative w-full h-24 rounded-xl overflow-hidden border border-purple-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pertemuanForm.image_url} alt="Pratinjau Gambar" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPertemuanForm({ ...pertemuanForm, image_url: "" })}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1 rounded-full text-[10px]"
                  title="Hapus Gambar"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="w-full rounded-xl bg-[#7c4fd4] hover:bg-[#683cb8] py-3 font-bold text-white shadow-md transition-all cursor-pointer mt-2">
            Simpan Pertemuan
          </button>
        </form>
      </motion.div>
    </div>
  )
}
