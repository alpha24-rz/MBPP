"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Loader2 } from "lucide-react"

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
  handleImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    bucketName?: string
  ) => void
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
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  if (!isOpen) return null

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("")
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      await handleImageUpload(e, (url) => setPertemuanForm((prev: any) => ({ ...prev, image_url: url })), "pertemuan-images")
    } catch (err: any) {
      setUploadError(err?.message || "Gagal mengupload gambar.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 relative my-8 max-h-[85vh] overflow-y-auto custom-purple-scrollbar border border-purple-100 shadow-2xl space-y-4"
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
              <span className="text-[10px] text-muted-foreground font-normal">Maks: 5MB (PNG, JPG, WEBP)</span>
            </label>
            
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={onFileChange}
              className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#7c4fd4] hover:file:bg-purple-200 cursor-pointer disabled:opacity-50"
            />

            {uploading && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7c4fd4] bg-purple-50 p-2 rounded-xl border border-purple-100">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Mengupload gambar ke Supabase Storage...</span>
              </div>
            )}

            {uploadError && (
              <div className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-xl border border-red-100">
                {uploadError}
              </div>
            )}

            {pertemuanForm.image_url && !uploading && (
              <div className="mt-1.5 relative w-full h-24 rounded-xl overflow-hidden border border-purple-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pertemuanForm.image_url} alt="Pratinjau Gambar" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPertemuanForm({ ...pertemuanForm, image_url: "" })}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1 rounded-full text-[10px] hover:bg-black/80 transition-colors"
                  title="Hapus Gambar"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-xl bg-[#7c4fd4] hover:bg-[#683cb8] py-3 font-bold text-white shadow-md transition-all cursor-pointer mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Mengupload Gambar...</span>
              </>
            ) : (
              "Simpan Pertemuan"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
